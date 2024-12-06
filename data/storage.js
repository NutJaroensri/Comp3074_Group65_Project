import AsyncStorage from '@react-native-async-storage/async-storage';

// Save a new restaurant
export const saveRestaurant = async (restaurant) => {
  try {
    const existingRestaurants = await AsyncStorage.getItem('restaurants');
    const restaurants = existingRestaurants ? JSON.parse(existingRestaurants) : [];
    restaurants.push(restaurant);
    await AsyncStorage.setItem('restaurants', JSON.stringify(restaurants));
    console.log('Restaurant saved!');
  } catch (error) {
    console.error('Error saving restaurant:', error);
  }
};

// Fetch all restaurants
export const fetchRestaurants = async () => {
  try {
    const existingRestaurants = await AsyncStorage.getItem('restaurants');
    return existingRestaurants ? JSON.parse(existingRestaurants) : [];
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return [];
  }
};

// Delete a restaurant
export const deleteRestaurant = async (id) => {
  try {
    const existingRestaurants = await AsyncStorage.getItem('restaurants');
    const restaurants = existingRestaurants ? JSON.parse(existingRestaurants) : [];
    const updatedRestaurants = restaurants.filter(restaurant => restaurant.id !== id);
    await AsyncStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
    console.log('Restaurant deleted!');
  } catch (error) {
    console.error('Error deleting restaurant:', error);
  }
};

// Edit a restaurant
export const editRestaurant = async (updatedRestaurant) => {
  try {
    const existingRestaurants = await AsyncStorage.getItem('restaurants');
    const restaurants = existingRestaurants ? JSON.parse(existingRestaurants) : [];
    const updatedRestaurants = restaurants.map(restaurant =>
      restaurant.id === updatedRestaurant.id ? updatedRestaurant : restaurant
    );
    await AsyncStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
    console.log('Restaurant updated!');
  } catch (error) {
    console.error('Error updating restaurant:', error);
  }
};
