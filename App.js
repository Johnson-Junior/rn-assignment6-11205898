import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Component for the Cart screen
const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCartItems = async () => {
      const storedItems = await AsyncStorage.getItem('cartItems');
      if (storedItems) {
        setCartItems(JSON.parse(storedItems));
      }
    };
    loadCartItems();
  }, []);

  const removeFromCart = async (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    await AsyncStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.cartHeading}>Cart</Text>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Image source={item.image} style={styles.cartImage} />
            <Text style={styles.cartText}>{item.name}</Text>
            <Text style={styles.cartText}>{item.price}</Text>
            <Button title="Remove" onPress={() => removeFromCart(index)} />
          </View>
        ))
      ) : (
        <Text style={styles.cartText}>Your cart is empty</Text>
      )}
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </ScrollView>
  );
};

// Main App component
const HomeScreen = ({ navigation }) => {
  const dresses = [
    { image: require('./Images/dress1.png'), name: 'Office Wear', price: '$120' },
    { image: require('./Images/dress2.png'), name: 'Black Wear', price: '$120' },
    { image: require('./Images/dress3.png'), name: 'Church Wear', price: '$120' },
    { image: require('./Images/dress4.png'), name: 'Lamerei', price: '$120' },
    { image: require('./Images/dress5.png'), name: 'Lopo', price: '$120' },
    { image: require('./Images/dress6.png'), name: 'Lame', price: '$120' },
    { image: require('./Images/dress7.png'), name: 'Church Dress', price: '$120' },
    { image: require('./Images/dress1.png'), name: 'Dress', price: '$120' },
  ];

  const addToCart = async (item) => {
    const storedItems = await AsyncStorage.getItem('cartItems');
    const cartItems = storedItems ? JSON.parse(storedItems) : [];
    cartItems.push(item);
    await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {/* handle menu */}}>
          <Ionicons name="menu-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.openFashionHeading}>Open Fashion</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => {/* handle search */}}>
            <Ionicons name="search-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.ourStoryHeading}>Our Story</Text>

      <View style={styles.productsContainer}>
        {dresses.map((dress, index) => (
          <View key={index} style={styles.product}>
            <Image source={dress.image} style={styles.image} />
            <Text style={styles.imageText}>{dress.name} - {dress.price}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(dress)} />
          </View>
        ))}
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  openFashionHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ourStoryHeading: {
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 20,
    marginTop: 10,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  product: {
    width: '40%',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  imageText: {
    fontSize: 12,
    textAlign: 'center',
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  cartButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cartHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  cartImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  cartText: {
    fontSize: 16,
    flex: 1,
  },
});
