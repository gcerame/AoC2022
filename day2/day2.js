import fs from "fs";

const input = fs.readFileSync('input.txt', 'utf8')
    .trim()
    .split("\n")
    .map(line => line.split(" "));

const moves = {
    rock: 1,
    paper: 2,
    scissors: 3
};

const results = {
    lose: 1,
    draw: 2,
    win: 3
};

const inputMoves = {
    A: moves.rock,
    B: moves.paper,
    C: moves.scissors,
    X: moves.rock,
    Y: moves.paper,
    Z: moves.scissors
};
const convertToMove = (moveLetter) => {
    return inputMoves[moveLetter];
};

const calculateScore = (oponent, player) => {
    //Tie
    if (oponent === player) {
        return player + 3;
    }
    //Win
    if ((oponent === moves.rock && player === moves.paper)
        || (oponent === moves.paper && player === moves.scissors)
        || (oponent === moves.scissors && player === moves.rock)) {
        return player + 6;
    }
    //Lose
    return player;
};
const calculateMove = (oponent, result) => {
    //Tie
    if (result === results.draw) {
        return oponent;
    }
    //Win
    if (result === results.win) {
        if (oponent === moves.rock) {
            return moves.paper;
        }
        if (oponent === moves.paper) {
            return moves.scissors;
        }
        if (oponent === moves.scissors) {
            return moves.rock;
        }
    }
    //Lose
    if (result === results.lose) {
        if (oponent === moves.rock) {
            return moves.scissors;
        }
        if (oponent === moves.paper) {
            return moves.rock;
        }
        if (oponent === moves.scissors) {
            return moves.paper;
        }
    }
};

const scores = input.map((line) => {
    return calculateScore(convertToMove(line[0]), convertToMove(line[1]));
});

const totalScore = scores.reduce((a, b) => a + b, 0);

console.log('Part one: ', totalScore);

const movesPartTwo = input.map((line) => {
    return [convertToMove(line[0]), calculateMove(convertToMove(line[0]), convertToMove(line[1]))];
});
const scoresPartTwo = movesPartTwo.map((line) => {
    return calculateScore(line[0], line[1]);
});

const totalScorePartTwo = scoresPartTwo.reduce((a, b) => a + b, 0);
console.log('Part two: ', totalScorePartTwo);

