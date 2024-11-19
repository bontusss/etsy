// Arrays for adjectives, nouns, and professions
const adjectives = [
    "Able", "Active", "Adventurous", "Affectionate", "Alert", "Ambitious", "Amused", "Artistic", "Attentive",
    "Authentic", "Beautiful", "Benevolent", "Bold", "Brave", "Brilliant", "Calm", "Careful", "Caring", 
    "Charming", "Cheerful", "Clever", "Compassionate", "Confident", "Considerate", "Content", "Creative", 
    "Curious", "Daring", "Dedicated", "Dependable", "Determined", "Diligent", "Dynamic", "Eager", "Easygoing",
    "Efficient", "Elegant", "Empathetic", "Energetic", "Enthusiastic", "Ethical", "Experienced", "Fair", 
    "Faithful", "Fearless", "Focused", "Forgiving", "Friendly", "Funny", "Generous", "Gentle", "Genuine", 
    "Graceful", "Grateful", "Hardworking", "Harmonious", "Helpful", "Honest", "Hopeful", "Humble", "Imaginative",
    "Impartial", "Independent", "Innovative", "Insightful", "Inspiring", "Intelligent", "Intuitive", "Inventive",
    "Joyful", "Kind", "Knowledgeable", "Lively", "Logical", "Loyal", "Loving", "Mindful", "Motivated", "Noble", 
    "Observant", "Open-Minded", "Optimistic", "Organized", "Original", "Outgoing", "Passionate", "Patient", 
    "Peaceful", "Perceptive", "Persistent", "Philosophical", "Playful", "Polite", "Positive", "Powerful", 
    "Practical", "Proactive", "Productive", "Protective", "Proud", "Punctual", "Quiet", "Rational", "Realistic", 
    "Reliable", "Resilient", "Respectful", "Responsible", "Resourceful", "Responsive", "Sincere", "Skillful", 
    "Sociable", "Spirited", "Spontaneous", "Stable", "Strategic", "Strong", "Successful", "Supportive", "Sympathetic",
    "Talented", "Thoughtful", "Tolerant", "Trustworthy", "Understanding", "Unique", "Upbeat", "Versatile", 
    "Vibrant", "Vigilant", "Warm", "Wise", "Witty", "Youthful", "Zealous", "Zesty"
];

const nouns = [
    "Aaron", "Abby", "Adam", "Alex", "Alice", "Andrew", "Anna", "Anthony", "Aria", "Arthur", 
    "Bella", "Ben", "Blake", "Brian", "Caitlyn", "Caleb", "Carla", "Carlos", "Carter", "Chloe", 
    "David", "Daisy", "Daniel", "Derek", "Diana", "Dylan", "Eleanor", "Elijah", "Ella", "Emma", 
    "Ethan", "Evelyn", "Finn", "Fiona", "Frank", "Gabriel", "Grace", "Hannah", "Harper", "Henry", 
    "Isabella", "Isaac", "Ivy", "Jack", "Jacob", "James", "Jane", "Jasmine", "Jason", "Jenna", 
    "Jessica", "John", "Jonathan", "Jordan", "Joseph", "Julia", "Justin", "Kaitlyn", "Kara", "Katie", 
    "Kevin", "Liam", "Lily", "Logan", "Lucas", "Lucy", "Mason", "Madison", "Maggie", "Maria", 
    "Matthew", "Megan", "Michael", "Mila", "Nathan", "Natalie", "Nicholas", "Noah", "Olivia", "Oscar", 
    "Owen", "Paige", "Patrick", "Penelope", "Peter", "Phoebe", "Rachel", "Rebecca", "Richard", "Riley", 
    "Robert", "Ryan", "Samuel", "Sarah", "Sophie", "Stephanie", "Thomas", "Tristan", "Tyler", "Victoria", 
    "Violet", "William", "Zachary", "Zoe", "Bear", "Beagle", "Bulldog", "Cheetah", "Chimpanzee", "Coyote", 
    "Deer", "Dolphin", "Duck", "Eagle", "Elephant", "Falcon", "Fox", "Frog", "Giraffe", "Goat", 
    "Hawk", "Hippo", "Horse", "Jaguar", "Kangaroo", "Koala", "Leopard", "Lion", "Llama", "Monkey", 
    "Moose", "Otter", "Owl", "Panda", "Parrot", "Penguin", "Rabbit", "Raccoon", "Seal", "Shark", 
    "Sheep", "Sloth", "Sparrow", "Tiger", "Turtle", "Walrus", "Whale", "Wolf", "Zebra"
];

const professions = [
    "Accountant", "Actor", "Actress", "Adviser", "Architect", "Artist", "Athlete", "Attorney", "Baker", 
    "Barber", "Biologist", "Blacksmith", "Blogger", "Bookkeeper", "Butcher", "Carpenter", "Chef", "Chemist", 
    "Coach", "Consultant", "Dentist", "Designer", "Doctor", "Economist", "Editor", "Electrician", "Engineer", 
    "Farmer", "Filmmaker", "Firefighter", "Fisherman", "Florist", "Hairdresser", "Historian", "Illustrator", 
    "Journalist", "Judge", "Lawyer", "Librarian", "Manager", "Marketer", "Mechanic", "Musician", "Nurse", 
    "Optician", "Painter", "Pharmacist", "Photographer", "Pilot", "Plumber", "Police", "Programmer", "Psychologist", 
    "Reporter", "Researcher", "Scientist", "Secretary", "Security", "Software", "Surgeon", "Teacher", "Therapist", 
    "Veterinarian", "Waiter", "Writer", "Zoologist", "Actuary", "Archivist", "Astronomer", "Auctioneer", "Banker", 
    "Barista", "Biochemist", "Brewer", "Builder", "Butcher", "Caterer", "Clerk", "Counselor", "Critic", "Curator", 
    "Dancer", "Denturist", "Dietitian", "Driver", "Economist", "Editor", "Embalmer", "Engineer", "Geologist", 
    "Hairdresser", "Immunologist", "Instruments", "Librarian", "Manager", "Marketer", "Mechanic", "Molecular", 
    "Nurse", "Pediatrician", "Pharmacist", "Photographer", "Physicist", "Plumber", "Programmer", "Psychologist", 
    "Researcher", "Reporter", "Scientist", "Server", "Sculptor", "Software", "Technician", "Veterinarian", 
    "Waiter", "Writer", "Astronaut", "Baker", "Barber", "Biologist", "Boxer", "Busker", "Cameraman", "Choreographer", 
    "Coach", "Consultant", "Counselor", "Curator", "Decorator", "Diver", "Drafter", "Driver", "Educator", "Electrician", 
    "Fisher", "Forester", "Gardener", "Geologist", "Hacker", "Hypnotist", "Insurance", "Lecturer", "Librarian", "Lifeguard", 
    "Nurse", "Optician", "Operator", "Pilot", "Plumber", "Programmer", "Ranger", "Reporter", "Scientist", "Servant", 
    "Spiritualist", "Stenographer", "Teacher", "Trader", "Translator", "Typist", "Waiter", "Welder", "Writer", 
    "Zookeeper", "Analyst", "Artist", "Auctioneer", "Consultant", "Counselor", "Copywriter", "Dentist", "Developer", 
    "Director", "Doctor", "Engineer", "Facilitator", "Gardener", "Hairdresser", "Historian", "Judge", "Librarian", 
    "Musician", "Nurse", "Photographer", "Producer", "Programmer", "Researcher", "Salesperson", "Secretary", 
    "Social Worker", "Trainer", "Veteran", "Waiter", "Writer", "Translator", "Artist", "Baker", "Carter", "Clerk"
];

/**
 * Calculates the total possible combinations based on the selected type.
 * 
 * @param {number} type - The type of combination to calculate:
 *  - 1: Adjective + Noun
 *  - 2: Adjective + Noun + Number
 *  - 3: Profession + Number
 * @returns {number} - The total number of possible combinations.
 */
const totalCombinations = (type) => {
    if (type === 1) return adjectives.length * nouns.length; // Adjective + Noun
    if (type === 2) return adjectives.length * nouns.length * 1000; // Adjective + Noun + Number
    if (type === 3) return professions.length * 1000; // Profession + Number
    return 0;
};

/**
 * Validates if the input array is a valid non-empty array.
 * 
 * @param {Array} array - The array to validate.
 * @returns {boolean} - True if the array is valid and non-empty, false otherwise.
 */
const isValidArray = (array) => Array.isArray(array) && array.length > 0;

/**
 * Generates a random username based on adjectives, nouns, professions, and numbers.
 * 
 * The username can be in one of the following formats:
 *  - Type 1: Adjective + Noun (e.g., "HappyTiger")
 *  - Type 2: Adjective + Noun + Number (e.g., "CheerfulLion123")
 *  - Type 3: Profession + Number (e.g., "Teacher456")
 * 
 * @throws {Error} - Throws an error if the adjective, noun, or profession arrays are invalid or empty.
 * @returns {string} - The randomly generated username.
 */
const createUsername = () => {
    const totalType1 = totalCombinations(1);
    const totalType2 = totalCombinations(2);
    const totalType3 = totalCombinations(3);

    if (!isValidArray(adjectives) || !isValidArray(nouns) || !isValidArray(professions)) {
        throw new Error("Adjectives, nouns, or professions array is empty or invalid.");
    }

    // Randomly select username type
    const type = Math.floor(Math.random() * 3) + 1;

    let username = '';
    if (type === 1) {
        const randomIndex = Math.floor(Math.random() * totalType1);
        const adjIndex = Math.floor(randomIndex / nouns.length);
        const nounIndex = randomIndex % nouns.length;
        username = `${adjectives[adjIndex]}${nouns[nounIndex]}`;
    } else if (type === 2) {
        const randomIndex = Math.floor(Math.random() * totalType2);
        const adjIndex = Math.floor(randomIndex / (nouns.length * 1000));
        const nounIndex = Math.floor((randomIndex % (nouns.length * 1000)) / 1000);
        const number = randomIndex % 1000;
        username = `${adjectives[adjIndex]}${nouns[nounIndex]}${number}`;
    } else {
        const randomIndex = Math.floor(Math.random() * totalType3);
        const professionIndex = Math.floor(randomIndex / 1000);
        const number = randomIndex % 1000;
        username = `${professions[professionIndex]}${number}`;
    }

    return username;
};

module.exports = createUsername;
