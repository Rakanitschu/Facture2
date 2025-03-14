import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { energieversorgungQuestions } from "../data/questions"; // Ensure this path is correct
import { waermewendeQuestions } from "../data/questions";
import { mobilitaetswendeQuestions } from "../data/questions";
import { ernaehrungQuestions } from "../data/questions";
import Icon from "react-native-vector-icons/FontAwesome5";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [maxCardHeight, setMaxCardHeight] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [earthOvershootModalVisible, setEarthOvershootModalVisible] =
    useState(false);

  const handleCardPress = (question) => {
    setSelectedQuestion(question);
    setSelectedAnswer(question.answer);
    setModalVisible(true);
  };

  const handleEarthOvershootModalClose = () => {
    setEarthOvershootModalVisible(false);
  };

  const handleModalClose = () => {
    setSelectedQuestion(null);
  };

  const onCardLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    if (height > maxCardHeight) {
      setMaxCardHeight(height);
    }
  };

  const navigateToDetails = () => {
    setModalVisible(false);
    navigation.navigate("Detail", { question: selectedQuestion });
  };

  const handleDetailsPress = (question) => {
    setSelectedQuestion(null); // Close the modal
    navigation.navigate("Detail", { question, selectedQuestion });
  };

  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), 7, 2, 12, 0, 0); // August 2nd at 12:00 PM

    const difference = targetDate - now;

    if (difference > 0) {
      const timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      setTimeLeft(timeLeft);
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Green Horizon</Text>
      </View>
      <Text style={styles.sectionTitle}>Earth Overshoot Day</Text>
      <TouchableOpacity onPress={() => setEarthOvershootModalVisible(true)}>
        <View style={styles.overshootContainer}>
          <View style={styles.overshootItem}>
            <View style={styles.overshootValue}>
              <Text style={styles.overshootText}>
                {String(timeLeft.days).padStart(2, "0")}
              </Text>
            </View>
            <Text style={styles.overshootLabel}>Days</Text>
          </View>
          <View style={styles.overshootItem}>
            <View style={styles.overshootValue}>
              <Text style={styles.overshootText}>
                {String(timeLeft.hours).padStart(2, "0")}
              </Text>
            </View>
            <Text style={styles.overshootLabel}>Hours</Text>
          </View>
          <View style={styles.overshootItem}>
            <View style={styles.overshootValue}>
              <Text style={styles.overshootText}>
                {String(timeLeft.minutes).padStart(2, "0")}
              </Text>
            </View>
            <Text style={styles.overshootLabel}>Minutes</Text>
          </View>
          <View style={styles.overshootItem}>
            <View style={styles.overshootValue}>
              <Text style={styles.overshootText}>
                {String(timeLeft.seconds).padStart(2, "0")}
              </Text>
            </View>
            <Text style={styles.overshootLabel}>Seconds</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Energiewende</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScrollView}
        contentContainerStyle={styles.cardContainer}
      >
        {energieversorgungQuestions &&
          energieversorgungQuestions.length > 0 &&
          energieversorgungQuestions.map((question, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCardPress(question)}
            >
              <View
                style={[
                  styles.card,
                  { height: maxCardHeight ? maxCardHeight : "auto" },
                ]}
                onLayout={onCardLayout}
              >
                <Image source={question.imageUrl} style={styles.cardImage} />
                <Text style={styles.cardText}>{question.question}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <Text style={styles.sectionTitle}>Wärmewende</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScrollView}
        contentContainerStyle={styles.cardContainer}
      >
        {waermewendeQuestions &&
          waermewendeQuestions.length > 0 &&
          waermewendeQuestions.map((question, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCardPress(question)}
            >
              <View
                style={[
                  styles.card,
                  { height: maxCardHeight ? maxCardHeight : "auto" },
                ]}
                onLayout={onCardLayout}
              >
                <Image
                  source={question.imageUrl} // Use direct source for local images
                  style={styles.cardImage}
                />
                <Text style={styles.cardText}>{question.question}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <Text style={styles.sectionTitle}>Mobilitätswende</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScrollView}
        contentContainerStyle={styles.cardContainer}
      >
        {mobilitaetswendeQuestions &&
          mobilitaetswendeQuestions.length > 0 &&
          mobilitaetswendeQuestions.map((question, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCardPress(question)}
            >
              <View
                style={[
                  styles.card,
                  { height: maxCardHeight ? maxCardHeight : "auto" },
                ]}
                onLayout={onCardLayout}
              >
                <Image
                  source={question.imageUrl} // Use direct source for local images
                  style={styles.cardImage}
                />
                <Text style={styles.cardText}>{question.question}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <Text style={styles.sectionTitle}>Ernährung</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScrollView}
        contentContainerStyle={styles.cardContainer}
      >
        {ernaehrungQuestions &&
          ernaehrungQuestions.length > 0 &&
          ernaehrungQuestions.map((question, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCardPress(question)}
            >
              <View
                style={[
                  styles.card,
                  { height: maxCardHeight ? maxCardHeight : "auto" },
                ]}
                onLayout={onCardLayout}
              >
                <Image
                  source={question.imageUrl} // Use direct source for local images
                  style={styles.cardImage}
                />
                <Text style={styles.cardText}>{question.question}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
      {selectedQuestion && (
        <Modal
          visible={true}
          transparent={true}
          animationType="fade"
          onRequestClose={handleModalClose}
        >
          <TouchableWithoutFeedback onPress={handleModalClose}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text style={[styles.modalText, { paddingTop: 20 }]}>
                    {selectedQuestion.answer}
                  </Text>
                  <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => handleDetailsPress(selectedQuestion)}
                  >
                    <Text style={styles.detailsButtonText}>Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={handleModalClose}
                  >
                    <Text style={styles.modalCloseButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      {earthOvershootModalVisible && (
        <Modal
          visible={earthOvershootModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={handleEarthOvershootModalClose}
        >
          <TouchableWithoutFeedback onPress={handleEarthOvershootModalClose}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContentWrapper}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <Text style={[styles.modalText, { paddingTop: 20 }]}>
                      Der Earth Overshoot Day (Erdüberlastungstag) markiert das
                      Datum, an dem die Nachfrage der Menschheit nach
                      ökologischen Ressourcen und Dienstleistungen in einem
                      gegebenen Jahr das übersteigt, was die Erde in diesem Jahr
                      regenerieren kann. In den letzten 20 Jahren hat sich der
                      Earth Overshoot Day im Kalender immer weiter nach vorne
                      verschoben, was auf einen steigenden Verbrauch und die
                      zunehmende Erschöpfung der Ressourcen hinweist. In den
                      70ern lag dieser im November. In den 90ern bereits im
                      Oktober und mittlerweile ist die Erde bereits Anfang
                      August überlastet.
                    </Text>
                    <TouchableOpacity
                      style={styles.modalCloseButton}
                      onPress={handleEarthOvershootModalClose}
                    >
                      <Text style={styles.modalCloseButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8fbfb",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0e1b17",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0e1b17",
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: "#0e1b17",
    marginTop: 10,
  },
  startButton: {
    backgroundColor: "#1cca96",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  overshootContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  overshootItem: {
    flex: 1,
    alignItems: "center",
  },
  overshootValue: {
    backgroundColor: "#e8f3ef",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  overshootText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0e1b17",
  },
  overshootLabel: {
    fontSize: 14,
    color: "#0e1b17",
    marginTop: 5,
  },
  horizontalScrollView: {
    marginVertical: 20,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  card: {
    backgroundColor: "#fff",
    width: 200,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 2,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0e1b17",
    padding: 10,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
  modalBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalText: {
    fontSize: 16,
    color: "#0e1b17",
    marginBottom: 20,
    marginTop: 20,
  },
  modalCloseButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#1cca96",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseButtonText: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 18,
  },
  closeButton: {
    backgroundColor: "#1cca96",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  detailsButton: {
    backgroundColor: "#1cca96",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContentWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default HomeScreen;
