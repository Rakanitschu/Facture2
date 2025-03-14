import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  Linking,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import FoodCO2Overview from './FoodCO2Overview'; // Importiere die neue Seite
import BatteryInfo from './BatteryInfoScreen';

const DetailScreen = ({ route, navigation }) => {
  const { question, answer, source, sourceLink, imageUrl, summary } =
    route.params;

    const handleLinkPress = (url) => {
      navigation.navigate('WebView', { url });
    };

  if (question.question === 'Tipps für eine nachhaltige Ernährung') {
    return <FoodCO2Overview />;
  }

   if (question.question === 'Elektrobatterie') {
    return <BatteryInfo />;
  }

  if (question.question === 'Was sind eigentlich genau seltene Erden?' || question.question === 'Wie entwickelt sich die Ladeinfrastruktur?') {
      return (
    <ScrollView style={styles.container}>
      <Image source={ question.imageUrl } style={styles.image} />
      <RenderHtml contentWidth={Dimensions.get('window').width} source={{ html: question.summary }} />
      <Text style={styles.source}>Source: {question.source}</Text>
      <Text style={styles.sourceText}>Source: {question.source}</Text>
      {question.sourceLink ? (
        <TouchableOpacity onPress={() => handleLinkPress(question.sourceLink)}>
          <Text style={styles.linkText}>Read more</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </ScrollView>
  );
  }

  return (
    <ScrollView style={styles.container}>
    <StatusBar hidden={true} />
      <Image source={ question.imageUrl } style={styles.image} />
      <Text style={styles.summary}>{question.summary}</Text>
      <Text style={styles.source}>Source: {question.source}</Text>
      <Text style={styles.sourceText}>Source: {question.source}</Text>
      {question.sourceLink ? (
        <TouchableOpacity onPress={() => handleLinkPress(question.sourceLink)}>
          <Text style={styles.linkText}>Read more</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'justify',
  },
  source: {
    fontSize: 14,
    color: 'grey',
    marginTop: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#1cca96',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#1cca96',
    marginTop: 10,
  },
  closeButton: {
    marginBottom: 20,
  },
});

export default DetailScreen;
