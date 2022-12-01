import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split(/\r?\n/);


const elfArray = [];
let tempArray = [];

for (let line of lines) {
    if (line !== '') {
        tempArray.push(parseInt((line)));
    }
    if (line === '') {
        elfArray.push(tempArray);
        tempArray= [];
    }
}

const totalsArray = elfArray.map(elf=>{
    return elf.reduce((a, b) => a + b, 0);
});

totalsArray.sort((a, b) => b - a);

console.log(totalsArray);
