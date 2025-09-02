function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomName(): string {
  const adjectives = [
    "sleepy",
    "blind",
    "angry",
    "shadow",
    "ancient",
    "golden",
    "whispering",
    "cursed",
    "frozen",
    "wild",
    "drunken",
    "brave",
  ];

  const nouns = [
    "goblin",
    "wizard",
    "dragon",
    "troll",
    "elf",
    "dwarf",
    "sorcerer",
    "wolf",
    "giant",
    "fairy",
    "knight",
    "witch",
  ];

  const number = getRandomNumber(1, 100);

  return `${getRandomElement(adjectives)}-${getRandomElement(nouns)}-${number}`;
}
