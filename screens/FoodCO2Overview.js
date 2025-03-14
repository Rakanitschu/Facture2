import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const foodData = [
  {
    name: 'Rindfleisch',
    image:
      'https://images.unsplash.com/photo-1588347785102-2944ba63d0c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmluZGZsZWlzY2h8ZW58MHx8MHx8fDI%3D',
    co2: 27.0,
  },
  {
    name: 'Schweinefleisch',
    image:
      'https://images.unsplash.com/photo-1547050605-2f268cd5daf0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2Nod2VpbmVmbGVpc2h8ZW58MHx8MHx8fDI%3D',
    co2: 12.1,
  },
  {
    name: 'Hühnchen',
    image:
      'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpY2tlbiUyMG1lYXR8ZW58MHx8MHx8fDI%3D',
    co2: 6.9,
  },
  {
    name: 'Eier',
    image:
      'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWdnc3xlbnwwfHwwfHx8Mg%3D%3D',
    co2: 4.8,
  },
  {
    name: 'Reis',
    image:
      'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmljZXxlbnwwfHwwfHx8Mg%3D%3D',
    co2: 4.0,
  },
  {
    name: 'Tomaten',
    image:
      'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dG9tYXRvZXxlbnwwfHwwfHx8Mg%3D%3D',
    co2: 2.5,
  },
  {
    name: 'Milch',
    image:
      'https://images.unsplash.com/photo-1634141510639-d691d86f47be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1pbGt8ZW58MHx8MHx8fDI%3D',
    co2: 1.3,
  },
  {
    name: 'Brot',
    image:
      'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJlYWR8ZW58MHx8MHx8fDI%3D',
    co2: 0.8,
  },
  {
    name: 'Äpfel',
    image:
      'https://images.unsplash.com/photo-1589217157232-464b505b197f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGV8ZW58MHx8MHx8fDI%3D',
    co2: 0.4,
  },
  {
    name: 'Kartoffeln',
    image:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FydG9mZmVsbnxlbnwwfHwwfHx8Mg%3D%3D',
    co2: 0.3,
  },
];

const FoodCO2Overview = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>CO2-Emissionen pro 100g</Text>
      {foodData.map((food) => (
        <View key={food.name} style={styles.foodContainer}>
          <View style={styles.co2Container}>
            <Text style={styles.co2Value}>{food.co2} kg CO2</Text>
          </View>
          <Image source={{ uri: food.image }} style={styles.image} />
          <View style={styles.nameContainer}>
            <Text style={styles.foodName}>{food.name}</Text>
          </View>
        </View>
      ))}
      <View style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  foodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  co2Container: {
    width: 100, // Adjust width as needed to align items
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  co2Value: {
    fontSize: 16,
    color: '#555',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  nameContainer: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    color: '#333',
  },
  footer: {
    height: 50, // Adjust height as needed for desired padding
  },
});

export default FoodCO2Overview;
