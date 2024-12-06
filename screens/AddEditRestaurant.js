import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RestaurantContext } from '../context/RestaurantContext';

const AddEditRestaurant = ({ route, navigation }) => {
  const { addRestaurant, editRestaurant } = useContext(RestaurantContext);

  // Get the restaurant from route params if provided
  const restaurant = route.params?.restaurant || {};
  const isEditMode = Boolean(restaurant?.id); // Determine if we are editing or adding

  // State variables for form fields
  const [name, setName] = useState(restaurant.name || '');
  const [address, setAddress] = useState(restaurant.address || '');
  const [phone, setPhone] = useState(restaurant.phone || '');
  const [description, setDescription] = useState(restaurant.description || '');
  const [tags, setTags] = useState(restaurant.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [location, setLocation] = useState(
    restaurant.location || {
      latitude: 43.659328789707374,
      longitude: -79.40865124554749,
    }
  );

  // Handle map press to set location and address
  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude, longitude });

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDw016rw-Pw5TkX3p9WnWL7HAPGGf584T4`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      } else {
        Alert.alert('Error', 'Address not found for the selected location.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to fetch address.');
    }
  };

  // Add a tag to the tags array
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  // Remove a tag from the tags array
  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // Handle save button
  const handleSave = () => {
    if (!name || !address || !phone || !description) {
      Alert.alert('Validation Error', 'Please fill all required fields.');
      return;
    }

    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('Validation Error', 'Please enter a valid phone number.');
      return;
    }

    const restaurantData = {
      id: isEditMode ? restaurant.id : Date.now().toString(), // Use existing ID for edit
      name,
      address,
      phone,
      description,
      tags,
      location,
    };

    console.log('Saving restaurant:', restaurantData);

    if (isEditMode) {
      editRestaurant(restaurantData); // Call edit function
    } else {
      addRestaurant(restaurantData); // Call add function
    }

    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter restaurant name"
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        placeholder="Select a location on the map or enter manually"
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter restaurant description"
        multiline
      />

      <Text style={styles.label}>Tags</Text>
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text>{tag}</Text>
            <Button title="X" onPress={() => handleRemoveTag(tag)} />
          </View>
        ))}
      </View>
      <View style={styles.tagInputContainer}>
        <TextInput
          style={styles.input}
          value={tagInput}
          onChangeText={setTagInput}
          placeholder="Enter a tag (e.g., Vegetarian)"
        />
        <Button title="Add Tag" onPress={handleAddTag} />
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={handleMapPress}
      >
        <Marker coordinate={location} />
      </MapView>

      <Button title="Save" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
  },
  map: {
    height: 300,
    borderRadius: 5,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  tagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AddEditRestaurant;
