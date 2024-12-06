import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { RestaurantContext } from '../context/RestaurantContext';

const MainScreen = ({ navigation }) => {
  const { restaurants, removeRestaurant } = useContext(RestaurantContext);

  const handleDelete = (id) => {
    removeRestaurant(id);
  };

  const renderStars = (rating) => {
    // Render stars based on the rating value (1-5)
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Text key={star} style={[styles.star, rating >= star && styles.selectedStar]}>
            ★
          </Text>
        ))}
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('RestaurantDetails', { restaurant: item })
        }
      >
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.address}>{item.address}</Text>
        {/* Display star rating */}
        {renderStars(item.rating || 0)}
      </TouchableOpacity>
      <View style={styles.actions}>
        <Button
          title="Edit"
          onPress={() =>
            navigation.navigate('EditRestaurant', { restaurant: item })
          }
        />
        <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No restaurants available</Text>}
      />
      <Button
        title="Search Restaurants"
        onPress={() => navigation.navigate('SearchScreen')}
      />
      <Button
        title="Add New Restaurant"
        onPress={() => navigation.navigate('AddRestaurant')}
      />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#666',
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  star: {
    fontSize: 20,
    color: '#ccc',
    marginRight: 2,
  },
  selectedStar: {
    color: '#FFD700',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});
