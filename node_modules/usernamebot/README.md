# UsernameBot
This is a username generator package designed to generate random usernames using predefined lists of adjectives, nouns, professions, and numbers. It supports multiple formats for username generation, making it suitable for creating unique and descriptive usernames for a variety of applications.

# Features
Predefined Lists : Includes a large set of adjectives, nouns, and professions to generate diverse usernames.
Flexible Username Formats:
- Adjective + Noun (e.g., HappyTiger)
- Adjective + Noun + Number (e.g., CheerfulLion123)
- Profession + Number (e.g., Teacher456)
Random Selection: Ensures each generated username is unique and random.
Error Handling: Validates the integrity of data arrays and handles errors gracefully.

# Installation
To use this package, install it via npm or clone the repository:

**npm install usernamebot**

**git clone https://github.com/Trimaxcoder/UsernameBot.git**

# Usage
to import in your file use the code below

**const createUsername = require('usernamebot');**

to Generate a random username use the code below

**console.log(createUsername());**

OR

**const username = createUsername();**

**console.log(username);**

- Example output: "BoldRabbit47"

# Username Formats
**Type 1: Adjective + Noun**

Combines an adjective and a noun from predefined lists.

Example: HappyTiger

**Type 2: Adjective + Noun + Number**

Adds a random 3-digit number to an adjective and a noun.

Example: CheerfulLion123

**Type 3: Profession + Number**

Combines a profession and a random 3-digit number.

Example: Doctor789