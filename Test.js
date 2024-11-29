// Test.js

const { generateBasicUsername, generateUsernameWithNumbers, generateCustomUsername } = require('./UsernameGenerator');

console.log('Basic Username:', generateBasicUsername());
console.log('Username with Numbers:', generateUsernameWithNumbers());
console.log('Custom Username:', generateCustomUsername(['Happy', 'Sad'], ['Cat', 'Dog']));


