# Enhanced Random Username Generator

A Node.js package to generate random usernames with multiple customization options.
This module provides a simple and customizable way to generate random usernames.
It includes predefined lists of adjectives and nouns to construct usernames, and it supports adding random numbers or using custom lists.

## Installation

```bash
npm install enhanced-random-username-generator.

# Usage

const {
    generateBasicUsername,
    generateUsernameWithNumbers,
    generateCustomUsername,
} = require('enhanced-random-username-generator');

console.log(generateBasicUsername()); // "CoolTiger"
console.log(generateUsernameWithNumbers()); // "CoolTiger123"
console.log(generateCustomUsername(['Brilliant', 'Kind'], ['Penguin', 'Giraffe'])); // "BrilliantGiraffe"


# Functions 
1. generateBasicUsername
Generates a random username by combining a predefined adjective and noun.

syntax: generateBasicUsername()

Examples: 
const username = generateBasicUsername();
console.log(username); // Example: "BrilliantTiger"

2. generateUsernameWithNumbers
Generates a random username by appending a random number (0-999) to a basic username.

syntax: generateUsernameWithNumbers()

Examples: 
const usernameWithNumbers = generateUsernameWithNumbers();
console.log(usernameWithNumbers); // Example: "CreativePanda123"


3. generateCustomUsername
Generates a random username using custom lists of adjectives and nouns provided by the user.

syntax: generateCustomUsername(adjectives, nouns)

Examples:
const customAdjectives = ["Bright", "Cheerful", "Quick"];
const customNouns = ["Fox", "Hawk", "Otter"];

const customUsername = generateCustomUsername(customAdjectives, customNouns);
console.log(customUsername); // Example: "CheerfulFox"

