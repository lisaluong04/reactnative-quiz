import React from 'react';
import { ScrollView, View, Text } from 'react-native';

function isQuestionCorrect(question, answer) {
  if (answer === null || answer === undefined) return false;
  if (Array.isArray(question.correct)) {
    const userSorted = [...answer].sort((a, b) => a - b);
    const correctSorted = [...question.correct].sort((a, b) => a - b);
    return JSON.stringify(userSorted) === JSON.stringify(correctSorted);
  }
  return answer === question.correct;
}

function choiceStyle(question, choiceIndex, answer) {
  const isCorrectChoice = Array.isArray(question.correct)
    ? question.correct.includes(choiceIndex)
    : question.correct === choiceIndex;

  const isChosen = Array.isArray(answer)
    ? answer.includes(choiceIndex)
    : answer === choiceIndex;

  if (isCorrectChoice) {
    return { fontWeight: 'bold' };
  }
  if (isChosen) {
    return { textDecorationLine: 'line-through' };
  }
  return {};
}

export default function SummaryScreen({ route }) {
  const { questions, answers } = route.params;

  const score = questions.reduce((total, question, i) => {
    return total + (isQuestionCorrect(question, answers[i]) ? 1 : 0);
  }, 0);

  return (
    <ScrollView>
      <Text testID="total">
        Total Score: {score} / {questions.length}
      </Text>

      {questions.map((question, qIndex) => {
        const answer = answers[qIndex];
        const correct = isQuestionCorrect(question, answer);

        return (
          <View key={qIndex} style={{ marginBottom: 16 }}>
            <Text>
              {qIndex + 1}. {question.question}
            </Text>
            <Text>{correct ? 'Correct' : 'Incorrect'}</Text>
            {question.choices.map((choice, cIndex) => (
              <Text key={cIndex} style={choiceStyle(question, cIndex, answer)}>
                {choice}
              </Text>
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
}
