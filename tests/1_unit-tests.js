const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {

    test('81 characters and valid', (done) => {
        let input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
        assert.equal(solver.validate(input), true);
        done();
    })

    test('invalid characters in string', (done) => {
        let input = 'B.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
        assert.equal(solver.validate(input).error, 'Invalid characters in puzzle');
        done();
    })

    test('input string not 81 chars', (done) => {
        let input = '.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
        assert.equal(solver.validate(input).error, 'Expected puzzle to be 81 characters long');
        done();
    })

    test('valid row placement', (done) => {
        let board = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
        let row = 0
        let col
        let value = 3

        assert.equal(solver.checkRowPlacement(board, row, col, value).valid, true)
        done();
    })

    test('invalid row placement', (done) => {
        let board = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
        let row = 0
        let col
        let value = 1

        assert.equal(solver.checkRowPlacement(board, row, col, value).valid, false)
        done();
    })

    test('valid col placement', (done) => {
        let board = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
        let row
        let col = 1
        let value = 3

        assert.equal(solver.checkColPlacement(board, row, col, value).valid, true)
        done();
    })

    test('invalid col placement', (done) => {
        let board = '1.5..2.841.63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
        let row
        let col = 0
        let value = 1

        assert.equal(solver.checkColPlacement(board, row, col, value).valid, false)
        done();
    })

    test('valid region placement', (done) => {
        let board = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
        let row = 0
        let col = 1
        let value = 3

        assert.equal(solver.checkRegionPlacement(board, row, col, value).valid, true)
        done();
    })

    test('invalid region placement', (done) => {
        let board = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
        let row = 1
        let col = 1
        let value = 1

        assert.equal(solver.checkRegionPlacement(board, row, col, value).valid, false)
        done();
    })

    test('Valid puzzle strings pass the solver', (done) => {
        let board = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
        let solution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378'

        assert.equal(solver.solve(board).solution, solution)
        done();
    })

    test('Invalid puzzle strings fail the solver', (done) => {
        const puzzle = '..9..5.1.8434....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.equal(solver.solve(puzzle).error,'Puzzle cannot be solved');
        done();

    })
    test('Solver returns the the expected solution for an incomplete puzzzle', (done) => {
        let board = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6'
        let solution = '473891265851726394926345817568913472342687951197254638734162589685479123219538746'

        assert.equal(solver.solve(board).solution, solution)
        done();
    })




});