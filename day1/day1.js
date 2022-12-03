import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split(/\r?\n/);

const elfArray = [];
let tempArray = [];

lines.map((line) => {
    if (line !== '') {
        tempArray.push(parseInt((line)));
    } else {
        elfArray.push(tempArray);
        tempArray = [];
    }
});

const totalsArray = elfArray.map(elf => elf.reduce((a, b) => a + b, 0));

const sortedTotals = totalsArray.sort((a, b) => b - a);

const part1 = sortedTotals[0];
const part2= sortedTotals[0]+sortedTotals[1]+sortedTotals[2];

console.log('Part 1: ', part1);
console.log('Part 2: ', part2);
