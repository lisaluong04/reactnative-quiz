import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '@rneui/themed';
import QuestionScreen from './screens/QuestionScreen';
import SummaryScreen from './screens/SummaryScreen';
import questions from './data/questions';

// Named exports so test suites can import the screens directly
export { QuestionScreen as Question, SummaryScreen as Summary };

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            // Prevent navigating back to a previous question
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        >
          <Stack.Screen
            name="Question"
            component={QuestionScreen}
            initialParams={{ questions, currentIndex: 0, answers: [] }}
            options={{ title: 'Quiz' }}
          />
          <Stack.Screen
            name="Summary"
            component={SummaryScreen}
            options={{ title: 'Results' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
