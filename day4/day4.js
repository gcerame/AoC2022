import fs from 'fs';

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const input = fs.readFileSync('input.txt', 'utf8');
const parsedInput = input.trim().split('\n')
    .map((line) => {
        return line.split(',')
            .map((assignment) => {
                const [start, end] = assignment.split('-');
                return [parseInt(start), parseInt(end)];
            });
    });

const getIntArrayInRange = ([start, end]) => {
    return Array(end - start + 1).fill(0).map((n, index) => start + index);
};

const isContained = ([elf1, elf2]) => {
    console.log({elf1, elf2});
    const firstElfSections = getIntArrayInRange(elf1);
    const secondElfSections = getIntArrayInRange(elf2);

    const firstContainsSecond = firstElfSections.every(section => secondElfSections.includes(section));
    const secondContainsFirst = secondElfSections.every(section => firstElfSections.includes(section));

    return firstContainsSecond || secondContainsFirst;
};

const isOverlapping = ([elf1, elf2]) => {
    const firstElfSections = getIntArrayInRange(elf1);
    const secondElfSections = getIntArrayInRange(elf2);

    return firstElfSections.some(section => secondElfSections.includes(section));
}

const part1 = parsedInput.map((line) => isContained(line)).filter((n) => n).length;
console.log({part1});
const part2 = parsedInput.map((line) => isOverlapping(line)).filter((n) => n).length;
console.log({part2});