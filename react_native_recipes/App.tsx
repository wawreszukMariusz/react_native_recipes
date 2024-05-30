import React, { createContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailScreen";
import SearchScreen from "./screens/SearchScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const FavoritesContext = createContext();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function FavoritesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorites", error);
      }
    };

    loadFavorites();
  }, []);

  const saveFavorites = async (favorites) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites", error);
    }
  };

  const addToFavorites = (meal) => {
    const updatedFavorites = [...favorites, meal];
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Search") {
                iconName = "search";
              } else if (route.name === "Favorites") {
                iconName = "heart";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false,
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Search" component={SearchStack} />
          <Tab.Screen name="Favorites" component={FavoritesStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesContext.Provider>
  );
}
