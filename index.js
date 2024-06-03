import { question } from 'readline-sync';
import _ from 'lodash';

const hasWinner = (field) => {
  const senquences = [
    ..._.cloneDeep(field),
    ..._.zip(...field),
    [field[0][0], field[1][1], field[2][2]],
    [field[0][2], field[1][1], field[2][0]],
  ].map((s) => s.join(''));
  return senquences.includes('ooo') || senquences.includes('xxx');
};

const parseField = (field) => {
  const inxs = [1, 2, 3];
  const colInxs = `    ${inxs.join('   ')}`;
  const line = `  ${'-'.repeat(13)}`;
  const printedField = field.map((row, i) => `${inxs[i]} | ${row.join(' | ')} |\n${line}`);
  return `${colInxs}\n${line}\n${printedField.join('\n')}`;
};

const field = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

const switchTurn = { x: 'o', o: 'x' };

export default () => {
  const curr = _.cloneDeep(field);
  const vacant = _.flatten(field).map((_e, i) => `${Math.floor(i / 3) + 1}${(i % 3) + 1}`);
  let turn = 'x';
  let row;
  let col;

  console.log(parseField(curr));

  while (!_.isEmpty(vacant)) {
    [row, col] = question(`${turn} turn: `, { limit: vacant, limitMessage: 'invalid input' })
      .split('')
      .map(Number);
    _.pull(vacant, `${row}${col}`);
    curr[row - 1][col - 1] = turn;
    console.log(parseField(curr));
    if (hasWinner(curr)) {
      console.log(`${turn} won!`);
      return;
    }
    turn = switchTurn[turn];
  }

  console.log('It\'s a tie.');
};
