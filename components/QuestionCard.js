import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuestionCard = ({ question, summary, imageUrl, detail, answer }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Detail', {
          question,
          summary,
          detail,
          answer,
          imageUrl,
        })
      }
      style={styles.card}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{question}</Text>
      <Text style={styles.summary}>{summary}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  summary: {
    fontSize: 16,
    color: '#555',
  },
  answer: {
    fontSize: 16,
    color: '#555',
  },
});

export default QuestionCard;
