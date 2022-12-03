import fs from "fs";

const testInput = 'vJrwpWtwJgWrhcsFMMfFFhFp\n' +
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\n' +
    'PmmdzqPrVvPwwTWBwg\n' +
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\n' +
    'ttgJtRGJQctTZtZT\n' +
    'CrZsJsPPZsGzwwsLwLmpwMDw';

const input =
    fs
    .readFileSync('input.txt', 'utf-8')
    .trim()
        .split('\n');

const rucksacks = input.map((line) => {
    return [line.substring(0, line.length / 2), line.substring(line.length / 2)];

});
const findCommonItemInRucksack = (rucksack) => {
    const commonItems = rucksacks.map(rucksack => rucksack[0].split('')
        .filter((char) => {
            return rucksack[1].indexOf(char) > -1;
        }));
    //Return an array with only the first common item
    return commonItems.map(commonItem => commonItem[0]);
};
const calculatePriority = (item) => {
    if (item === item.toLowerCase()) {
        return item.charCodeAt(0) - 96;
    } else {
        return item.charCodeAt(0) - 38;
    }
};

const findCommonItemInGroup = (elfGroup) => {
    const firstRucksack = elfGroup[0].split('');
    const commonItem = firstRucksack
        .filter((item) => elfGroup[1].indexOf(item) > -1 && elfGroup[2].indexOf(item) > -1)[0];

    return commonItem;
};

const prioritiesPartOne = findCommonItemInRucksack(rucksacks).map(item => calculatePriority(item));
const totalPriorityPartOne = prioritiesPartOne.reduce((a, b) => a + b, 0);
console.log('Part 1: ', totalPriorityPartOne);


//Part 2
const elfGroups = [];
let count = 0;
for (let i = 0; i < input.length; i = i + 3) {
    elfGroups.push([input[i], input[i + 1], input[i + 2]]);
}

const commonItems = elfGroups.map(elfGroup => {
    return findCommonItemInGroup(elfGroup);
});

const prioritiesPartTwo = commonItems.map(item => calculatePriority(item));
const totalPriorityPartTwo = prioritiesPartTwo.reduce((a, b) => a + b, 0);
console.log('Part 2: ', totalPriorityPartTwo);
