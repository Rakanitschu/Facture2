import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import {
  GestureHandlerRootView,
  Swipeable,
} from 'react-native-gesture-handler';
import { ArrowRight } from 'lucide-react-native';
import { ProgressBar } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import batteryFullImage from '../assets/images/battery.png';
import placeholderImage from '../assets/images/separator.png'; // Placeholder image

const batteryParts = [
    {
    name: 'Anode',
    description:
      'Die Anode ist die negative Elektrode der Batterie. Sie besteht meist aus Graphit und speichert die Lithium-Ionen während des Ladevorgangs. Bei der Entladung gibt sie diese Ionen wieder ab.',
    materials:
      'Hauptsächlich Graphit, manchmal mit Silizium-Zusätzen für erhöhte Kapazität.',
    icon: 'minus-circle',
  },
  {
    name: 'Kathode',
    description:
      'Die Kathode ist die positive Elektrode. Sie nimmt die Lithium-Ionen während der Entladung auf und gibt sie beim Laden wieder ab.',
    materials: 'Lithium-Metalloxide wie LiCoO2, LiMn2O4 oder LiFePO4.',
    icon: 'plus-circle',
  },
  {
    name: 'Elektrolyt',
    description:
      'Der Elektrolyt ermöglicht den Ionentransport zwischen Anode und Kathode. Er ist entscheidend für die Leistung und Sicherheit der Batterie.',
    materials: 'Meist organische Lösungsmittel mit Lithiumsalzen wie LiPF6.',
    icon: 'tint',
  },
  {
    name: 'Separator',
    description:
      'Der Separator trennt Anode und Kathode, verhindert Kurzschlüsse und lässt nur Ionen passieren.',
    materials:
      'Dünne, poröse Polymermembranen wie Polyethylen oder Polypropylen.',
    icon: 'layer-group',
  },
  {
    name: 'Gehäuse',
    description:
      'Das Gehäuse schützt die inneren Komponenten und gibt der Batterie ihre Form. Es enthält auch Sicherheitsmechanismen.',
    materials:
      'Aluminium oder verstärkter Kunststoff, je nach Batterietyp und Anwendung.',
    icon: 'box',
  },
];

const zoomStates = [
  { transform: [{ scale: 1.3 }, { translateX: -100 }, { translateY: 10 }], style: {} },  // right quarter
  { transform: [{ scale: 1.3 }, { translateX: 100 }, { translateY: 10 }], style: {} },  // left quarter
  { transform: [{ scale: 4 }, { translateX: 50 }, { translateY: -50 }], style: { height: '60%', top: '20%' } },  // bottom left half
 { 
  transform: [{ scale: 0.9 }, { translateY: 0 }], 
  style: {  }
},  // middle cut-out
  { transform: [{ scale: 1 }], style: { borderWidth: 5, borderColor: 'black' } },  // black frame
  { transform: [{ scale: 1 }], style: {} },  // default settings
];

const BatteryScreen = () => {
  const [currentStateIndex, setCurrentStateIndex] = useState(-1);
  const [componentOpacity] = useState(new Animated.Value(0));
  const imageScale = useRef(new Animated.Value(1)).current;
  const imageTranslateX = useRef(new Animated.Value(0)).current;
  const imageTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const duration = currentStateIndex === 2 ? 1000 : 500;
    if (currentStateIndex >= 0) {
      Animated.parallel([
        Animated.timing(componentOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(imageScale, {
          toValue: zoomStates[currentStateIndex].transform[0].scale,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(imageTranslateX, {
          toValue: zoomStates[currentStateIndex].transform[1]?.translateX || 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(imageTranslateY, {
          toValue: zoomStates[currentStateIndex].transform[2]?.translateY || zoomStates[currentStateIndex].transform[1]?.translateY || 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      componentOpacity.setValue(0);
      Animated.parallel([
        Animated.timing(imageScale, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(imageTranslateX, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.timing(imageTranslateY, { toValue: 0, duration: 0, useNativeDriver: true }),
      ]).start();
    }
  }, [currentStateIndex]);

  const showNextState = () => {
    setCurrentStateIndex((prevIndex) => {
      if (prevIndex === zoomStates.length - 1) {
        return -1;
      }
      return prevIndex + 1;
    });
  };

  const renderRightActions = () => {
    return (
      <TouchableOpacity style={styles.swipeActionRight} onPress={showNextState}>
        <ArrowRight color="white" size={24} />
      </TouchableOpacity>
    );
  };

  const progress = ((currentStateIndex + 1) / zoomStates.length) * 100;

  const getImageSource = () => {
    if (currentStateIndex === 3) {
      return placeholderImage;
    }
    return batteryFullImage;
  };

    const getNextButtonText = () => {
    if (currentStateIndex < 0) {
      return 'Bauteile anzeigen';
    } else if (currentStateIndex === zoomStates.length - 2) {
      return 'Übersicht';
    } else if (currentStateIndex === zoomStates.length - 1) {
      return 'Wiederholen';
    } else {
      return 'Nächstes Bauteil';
    }
  };

    return (
    <GestureHandlerRootView style={styles.container}>
    <StatusBar hidden={true} />
      <View contentContainerStyle={styles.scrollContainer}>
        <ProgressBar
          progress={progress / 100}
          color="#1cca96"
          style={styles.progressBar}
        />
        <Swipeable
          renderRightActions={renderRightActions}
          onSwipeableOpen={showNextState}>
          <View style={styles.batteryContainer}>
            <Animated.View
              style={[
                styles.imageContainer,
                currentStateIndex >= 0 ? zoomStates[currentStateIndex].style : {},
                {
                  transform: [
                    { scale: imageScale },
                    { translateX: imageTranslateX },
                    { translateY: imageTranslateY },
                  ],
                },
              ]}>
              <Image source={getImageSource()} style={styles.batteryImage} />
            </Animated.View>
          </View>
        </Swipeable>
                {currentStateIndex === -1 && (
          <View style={styles.initialTextContainer}>
          <Text style={styles.headerText}>Aufbau der Batterie</Text>
            <Text style={styles.initialText}>
              Ein wichtiges Thema bei der Betrachtung von Elektrofahrzeugen ist die Struktur und Funktionsweise ihrer Batterien. Eine typische Batterie für Elektroautos besteht aus mehreren wesentlichen Komponenten, die jeweils spezifische Materialien und Aufgaben haben.
            </Text>
          </View>
        )}
        {currentStateIndex >= 0 && currentStateIndex < batteryParts.length && (
          <Animated.View
            style={[
              styles.infoContainer,
              { opacity: componentOpacity },
            ]}>
            <Text style={styles.partName}>
              {batteryParts[currentStateIndex].name}
            </Text>
            <FontAwesome5 name={batteryParts[currentStateIndex].icon} size={24} color="#1cca96" style={styles.icon} />
            <Text style={styles.partDescription}>
              {batteryParts[currentStateIndex].description}
            </Text>
            <Text style={styles.materials}>
              Materialien: {batteryParts[currentStateIndex].materials}
            </Text>
          </Animated.View>
        )}
        {currentStateIndex === zoomStates.length - 1 && (
  <View style={styles.finalTextContainer}>
    <Text style={styles.headerText}>Übersicht</Text>
    <Text style={styles.finalText}><Text style={styles.finalText}>
  Zusammenfassung: In dieser Demonstration haben wir die Hauptkomponenten einer Elektrobatterie für Elektroautos untersucht. Wir haben die Anode, Kathode, den Elektrolyt, den Separator und das Gehäuse betrachtet, sowie deren Materialien und Funktionen. Diese Komponenten arbeiten zusammen, um die Energieeffizienz und Sicherheit moderner Elektrofahrzeuge zu gewährleisten.
</Text>
</Text>
  </View>
        )}
        <TouchableOpacity style={styles.nextButton} onPress={showNextState}>
          <Text style={styles.nextButtonText}>
            {getNextButtonText()}
          </Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fbfb',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    minHeight: Dimensions.get('window').height,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d1e6e0',
    marginBottom: 30,
  },
  batteryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  batteryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    elevation: 3,
    marginLeft: 3,
    marginRight: 3,
  },
  partName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0e1b17',
    marginBottom: 10,
  },
  initialText: {
    fontSize: 16,
    color: '#0e1b17',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
    finalText: {
    fontSize: 16,
    color: '#0e1b17',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
    headerText: {
    fontSize: 24,
    color: '#0e1b17',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  icon: {
    marginBottom: 10,
  },
  partDescription: {
    fontSize: 16,
    color: '#0e1b17',
    marginBottom: 10,
  },
  materials: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
  },
  nextButton: {
    backgroundColor: '#1cca96',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  swipeActionRight: {
    backgroundColor: '#1cca96',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
});

export default BatteryScreen;
