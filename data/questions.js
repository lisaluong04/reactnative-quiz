// Question types:
//   - true/false:      choices: ["True", "False"],  correct: 0 or 1 (integer)
//   - multiple choice: choices: [...],              correct: integer index
//   - multiple answer: choices: [...],              correct: number[] (all correct indices)

const questions = [
  {
    // true/false
    question: 'The Earth revolves around the Sun.',
    choices: ['True', 'False'],
    correct: 0, // True
  },
  {
    // multiple choice
    question: 'Where in Florida is UCF located?',
    choices: ['Gainesville', 'Orlando', 'Tampa', 'Tallahassee'],
    correct: 1, // Orlando
  },
  {
    // multiple answer — select ALL that apply
    question: 'Which of the following are programming languages?',
    choices: ['Python', 'HTML', 'JavaScript', 'CSS'],
    correct: [0, 2], // Python and JavaScript
  },
  {
    // true/false
    question: 'The sky is blue.',
    choices: ['True', 'False'],
    correct: 0, // True
  },
  {
    // multiple choice
    question: 'How many days are in a week?',
    choices: ['5', '6', '7', '8'],
    correct: 2, // 7
  },
];

export default questions;
