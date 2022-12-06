import {readFileSync} from 'fs';

const input = readFileSync('input.txt', 'utf8');
const testInput = '    [D]    \n' +
    '[N] [C]    \n' +
    '[Z] [M] [P]\n' +
    ' 1   2   3 \n' +
    '\n' +
    'move 1 from 2 to 1\n' +
    'move 3 from 1 to 3\n' +
    'move 2 from 2 to 1\n' +
    'move 1 from 1 to 2';


const [inputStacks, instructions] = input.split('\n\n');
const rows = inputStacks
    .split('\n')
    .filter((row) => row.includes('['))
    .reverse();

const numberOfStacks = Math.round(rows[0].length / 4);
const stacks = Array(numberOfStacks).fill(null).map(() => Array());

rows.map(row => {
    let counter = 0;
    return row
        .split('')
        .map((char, index) => {
            if (char.match(/[A-Z]/)) {
                stacks[counter].push(char);
            }
            if (index % 4 === 3) {
                counter++;
            }
        });
});
console.log(stacks)
const splitInstructions = instructions.split('\n');
console.log(splitInstructions.length);
const instructionsArray = splitInstructions.map(instruction => {
    const [_, amount, from, to] = instruction.match(/move (\d+) from (\d) to (\d)/);
    return [parseInt(amount), parseInt(from), parseInt(to)];

});
const doInstruction = ([amount, from, to]) => {
    const fromStack = stacks[from - 1];
    const toStack = stacks[to - 1];
    const itemsToMove = fromStack.splice(fromStack.length - amount, amount).reverse();//Remove the reverse for part2
    toStack.push(...itemsToMove);
}

instructionsArray.map(doInstruction);
const part1 = [];
stacks.map(stack => {
    part1.push(stack.pop());
});


console.log({ rows, numberOfStacks, stacks,instructionsArray,part1 });