import {readFileSync} from "fs";

const testInput = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';
const input = readFileSync('input.txt', 'utf-8');
const splitInput = input.split('');

const findFirstUniqueString = (input, stringSize) => {
    for (let i = 0; i < input.length; i++) {
        const set = new Set();
        for (let j = i; j < i+stringSize; j++) {
            set.add(input[j]);
        }

        if (set.size === stringSize) {
            return i + stringSize;
        }
    }
    return null;
};

console.log('Part 1: ', findFirstUniqueString(splitInput,4));
console.log('Part 2: ', findFirstUniqueString(splitInput,14));