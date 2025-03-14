import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import WhatYouCanDoScreen from "./screens/WhatYouCanDoScreen";
import FoodCO2Overview from "./screens/FoodCO2Overview";
import SectionScreen from "./screens/SectionScreen";
import WebViewScreen from "./screens/WebViewScreen";
import Icon from "react-native-vector-icons/FontAwesome5";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Section"
        component={SectionScreen}
        options={({ route }) => ({ title: route.params.sectionTitle })}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="WhatYouCanDo" component={WhatYouCanDoScreen} />
      <Stack.Screen name="FoodCO2Overview" component={FoodCO2Overview} />
      <Stack.Screen name="WebView" component={WebViewScreen} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case "Home":
                iconName = "home";
                break;
              case "Food":
                iconName = "utensils";
                break;
              case "Quiz":
                iconName = "quiz";
                break;
              case "WYCD":
                iconName = "hand-rock";
                break;
              default:
                iconName = "circle";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#1cca96",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#f8fbfb",
            borderTopColor: "transparent",
            height: 70,
            paddingBottom: 20,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
        })}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            title: "Green Horizon",
            tabBarLabel: "Home",
          }}
        />
        <Tab.Screen
          name="Food"
          component={FoodCO2Overview}
          options={{
            title: "Food Overview",
            tabBarLabel: "Food",
          }}
        />
        <Tab.Screen
          name="WYCD"
          component={WhatYouCanDoScreen}
          options={{
            title: "What You Can Do",
            tabBarLabel: "Actions",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
