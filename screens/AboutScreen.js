import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>About Us</Text>
      </View>
      <Text style={styles.text}>Team Members:</Text>
      <Text style={styles.text}>1. Nut Jaroensri 101422089</Text>
      <Text style={styles.text}>2. Paradee Supapian 101374958</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 60,
    padding: 15,
    backgroundColor: '#2A9D8F',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',

  },
  text: {
    fontSize: 18,
    color: '#000000',
    margin: 5,
  },
});

export default AboutScreen;
