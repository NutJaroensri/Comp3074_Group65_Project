import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const RestaurantDetails = ({ route, navigation }) => {
  const { restaurant } = route.params; // Restaurant details passed via navigation
  const [currentLocation, setCurrentLocation] = useState(null); 

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location access is required to get directions.');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
      } catch (error) {
        console.error('Error fetching location:', error);
        Alert.alert('Error', 'Unable to fetch your current location.');
      }
    };

    fetchCurrentLocation();
  }, []);

  const openDirections = () => {
    if (!currentLocation) {
      Alert.alert('Location Not Available', 'Your current location is not available yet.');
      return;
    }

    const { latitude: destLat, longitude: destLng } = restaurant.location;
    const { latitude: currLat, longitude: currLng } = currentLocation;

    const url = `https://www.google.com/maps/dir/?api=1&origin=${currLat},${currLng}&destination=${destLat},${destLng}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to open Google Maps.');
        }
      })
      .catch((err) => console.error('Error opening maps:', err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{restaurant.name}</Text>
      <Text style={styles.label}>Address:</Text>
      <Text style={styles.text}>{restaurant.address}</Text>

      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.text}>{restaurant.phone}</Text>

      <Text style={styles.label}>Description:</Text>
      <Text style={styles.text}>{restaurant.description}</Text>

      <Text style={styles.label}>Tags:</Text>
      <View style={styles.tagsContainer}>
        {restaurant.tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: restaurant.location.latitude,
          longitude: restaurant.location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: restaurant.location.latitude,
            longitude: restaurant.location.longitude,
          }}
          title={restaurant.name}
        />
      </MapView>

      <View style={styles.buttonContainer}>
        <Button title="Get Directions" onPress={openDirections} />
        <Button
          title="View Full-Screen Map"
          onPress={() =>
            navigation.navigate('MapScreen', {
              location: restaurant.location,
              name: restaurant.name,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  map: {
    height: 300,
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default RestaurantDetails;
