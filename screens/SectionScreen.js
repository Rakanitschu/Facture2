import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import QuestionCard from '../components/QuestionCard';
import {
  energieversorgungQuestions,
  waermewendeQuestions,
  mobilitaetswendeQuestions,
  ernaehrungQuestions,
} from '../data/questions';

const SectionScreen = ({ route }) => {
  const { section } = route.params;

  let questions = [];
  switch (section) {
    case 'Energieversorgung':
      questions = energieversorgungQuestions;
      break;
    case 'Wärmewende':
      questions = waermewendeQuestions;
      break;
    case 'Mobilitätswende':
      questions = mobilitaetswendeQuestions;
      break;
    case 'Ernaehrung':
      questions = ernaehrungQuestions;
      break;
    default:
      questions = [];
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
      {questions.map((item, index) => (
        <QuestionCard
          key={index}
          question={item.question}
          answer={item.answer}
          source={item.source}
          sourceLink={item.sourceLink}
          imageUrl={item.imageUrl}
          summary={item.summary}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
});

export default SectionScreen;
