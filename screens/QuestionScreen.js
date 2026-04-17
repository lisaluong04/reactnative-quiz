import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { ButtonGroup } from '@rneui/themed';

export default function QuestionScreen({ route, navigation }) {
  const { questions, currentIndex, answers } = route.params;
  const question = questions[currentIndex];
  const isMultiAnswer = Array.isArray(question.correct);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const isAnswered = isMultiAnswer
    ? selectedIndexes.length > 0
    : selectedIndex !== null;

  // When selectMultiple=true RNEUI passes the full new selectedIndexes array.
  // When selectMultiple=false it passes the pressed index number.
  const handlePress = (value) => {
    if (isMultiAnswer) {
      setSelectedIndexes(value); // value is already the new array
    } else {
      setSelectedIndex(value); // value is the index number
    }
  };

  const handleNext = () => {
    const answer = isMultiAnswer ? selectedIndexes : selectedIndex;
    const newAnswers = [...answers, answer];
    const isLastQuestion = currentIndex === questions.length - 1;

    if (isLastQuestion) {
      navigation.replace('Summary', { questions, answers: newAnswers });
    } else {
      navigation.replace('Question', {
        questions,
        currentIndex: currentIndex + 1,
        answers: newAnswers,
      });
    }
  };

  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <View>
      <Text>
        Question {currentIndex + 1} of {questions.length}
      </Text>
      <Text>{question.question}</Text>
      {isMultiAnswer && <Text>(Select all that apply)</Text>}
      <ButtonGroup
        testID="choices"
        buttons={question.choices}
        selectedIndex={isMultiAnswer ? undefined : selectedIndex}
        selectedIndexes={isMultiAnswer ? selectedIndexes : undefined}
        selectMultiple={isMultiAnswer}
        onPress={handlePress}
        vertical
      />
      <Button
        testID="next-question"
        title={isLastQuestion ? 'Finish' : 'Next Question'}
        onPress={handleNext}
        disabled={!isAnswered}
      />
    </View>
  );
}
