import React, { useState, useContext } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { RestaurantContext } from '../context/RestaurantContext';

const SearchScreen = ({ navigation }) => {
  const { restaurants } = useContext(RestaurantContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredRestaurants(restaurants); 
      return;
    }

    const lowercasedQuery = query.toLowerCase();

    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(lowercasedQuery) || // Search by name
      restaurant.tags.some((tag) => tag.toLowerCase().includes(lowercasedQuery)) // Search by tags
    );

    setFilteredRestaurants(filtered);
  };

  const renderStars = (rating) => {
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
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RestaurantDetails', { restaurant: item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.address}>{item.address}</Text>

      {renderStars(item.rating || 0)}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search by name or tags"
      />
      <FlatList
        data={filteredRestaurants}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No restaurants found</Text>}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
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
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});
