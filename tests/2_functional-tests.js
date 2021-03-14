const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  test('puzzle solve', (done) => {
  let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
  let expected = '769235418851496372432178956174569283395842761628713549283657194516924837947381625'
  chai.request(server)
  .post('/api/solve')
  .send({puzzle: puzzleString})
  .end((err,res) => {
    assert.equal(res.status, 200);
   assert.property(res.body, 'solution')
    assert.equal(res.body.solution, expected)
    done();
  })
  })

  test('Solve a puzzle with missing puzzle string', (done) => {
  let puzzleString = ''
  chai.request(server)
  .post('/api/solve')
  .send({puzzle: puzzleString})
  .end((err,res) => {
    assert.equal(res.status, 200);
    assert.equal(res.body.error, 'Required field missing')
    done();
  })
  })

  test('Solve a puzzle with invalid characters', (done) => {
  let puzzleString = 'J.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
  chai.request(server)
  .post('/api/solve')
  .send({puzzle: puzzleString})
  .end((err,res) => {
    assert.equal(res.status, 200);
    assert.equal(res.body.error, 'Invalid characters in puzzle')
    done();
  })
  })

  test('Solve a puzzle with incorrect length', (done) => {
  let puzzleString = '...9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
  chai.request(server)
  .post('/api/solve')
  .send({puzzle: puzzleString})
  .end((err,res) => {
    assert.equal(res.status, 200);
    assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
    done();
  })
  })

    test('Solve a puzzle with incorrect length', (done) => {
  let puzzleString = '129..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
  chai.request(server)
  .post('/api/solve')
  .send({puzzle: puzzleString})
  .end((err,res) => {
    assert.equal(res.status, 200);
    assert.equal(res.body.error, 'Puzzle cannot be solved')
    done();
  })
  })

  test('Check a puzzle placement with all fields', (done) => {
  let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
  let coordinate = 'A1';
  let value = 7
  chai.request(server)
  .post('/api/check')
  .send({puzzle: puzzleString, coordinate: coordinate, value: value})
  .end((err,res) => {
    assert.equal(res.status, 200);
    assert.equal(res.body.valid, true)
    done();
  })
  })

    test('Check a puzzle placement with single placement conflict', (done) => {
  let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
  let coordinate = 'A1';
  let value = 2
  chai.request(server)
  .post('/api/check')
  .send({puzzle: puzzleString, coordinate: coordinate, value: value})
  .end((err,res) => {
    assert.equal(res.status, 200);
    assert.equal(res.body.conflict.length, 1)
    done();
  })
  })

      test('Check a puzzle placement with multiple placement conflicts', (done) => {
  let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
  let coordinate = 'A1';
  let value = 1
  chai.request(server)
  .post('/api/check')
  .send({puzzle: puzzleString, coordinate: coordinate, value: value})
  .end((err,res) => {
    assert.equal(res.status, 200);
    assert.equal(res.body.conflict.length, 2)
    done();
  })
  })
  
  test('Check a puzzle placement with all placement conflicts', (done) => {
  let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
  let coordinate = 'A1';
  let value = 5
  chai.request(server)
  .post('/api/check')
  .send({puzzle: puzzleString, coordinate: coordinate, value: value})
  .end((err,res) => {
    assert.equal(res.status, 200);
    assert.equal(res.body.conflict.length, 3)
    done();
  })
  })

  test('Check a puzzle placement with missing required fields', (done) => {
  let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
  let coordinate = 'A1';
  let value = 5
  chai.request(server)
  .post('/api/check')
  .send({coordinate: coordinate, value: value})
  .end((err,res) => {
    assert.equal(res.status, 200);
    assert.equal(res.body.error, 'Required field(s) missing')
    done();
  })
  })
  
    test('Check a puzzle placement invalid characters', (done) => {
  let puzzleString = '.J9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
  let coordinate = 'A1';
  let value = 5
  chai.request(server)
  .post('/api/check')
  .send({puzzle: puzzleString, coordinate: coordinate, value: value})
  .end((err,res) => {
    assert.equal(res.status, 200);
    assert.equal(res.body.error, 'Invalid characters in puzzle')
    done();
  })
  })

     test('Check a puzzle placement invalid length', (done) => {
  let puzzleString = '.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
  let coordinate = 'A1';
  let value = 5
  chai.request(server)
  .post('/api/check')
  .send({puzzle: puzzleString, coordinate: coordinate, value: value})
  .end((err,res) => {
    assert.equal(res.status, 200);
    assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
    done();
  })
  })

  test('Check a puzzle placement invalid placement', (done) => {
  let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
  let coordinate = 'A1';
  let value = 5
  chai.request(server)
  .post('/api/check')
  .send({puzzle: puzzleString, coordinate: coordinate, value: value})
  .end((err,res) => {
    assert.equal(res.status, 200);
    assert.equal(res.body.valid, false)
    done();
  })
  })

    test('Check a puzzle placement valid placement', (done) => {
  let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
  let coordinate = 'A1';
  let value = 7
  chai.request(server)
  .post('/api/check')
  .send({puzzle: puzzleString, coordinate: coordinate, value: value})
  .end((err,res) => {
    assert.equal(res.status, 200);
    assert.equal(res.body.valid, true)
    done();
  })
  })

  
});

