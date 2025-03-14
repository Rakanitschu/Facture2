import { StatusBar } from 'react-native';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import QuestionCard from '../components/QuestionCard';
import { actionsData } from '../data/actions';

const WhatYouCanDoScreen = () => {StatusBar.setHidden(true);
  return (
    <ScrollView style={styles.container}>
      {actionsData.map((action, index) => (
        <QuestionCard
          key={index}
          title={action.title}
          summary={action.summary}
          imageUrl={action.imageUrl}
          detail={action.detail}
          benefit={action.benefit}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});

export default WhatYouCanDoScreen;
