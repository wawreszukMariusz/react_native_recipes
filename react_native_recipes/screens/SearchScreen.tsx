import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import axios from "axios";
import MealList from "../components/MealList";
import Header from "../components/Header";
import { FavoritesContext } from "../App";
import { Meal } from "../types";

export default function SearchScreen({ navigation }) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [query, setQuery] = useState<string>("");
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query && query.length > 0) {
        searchMeals();
      } else {
        setMeals([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const searchMeals = () => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((response) => {
        setMeals(response.data.meals || []);
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Header />
      <TextInput
        style={styles.searchInput}
        placeholder="Search for meals..."
        value={query}
        onChangeText={(text) => setQuery(text || "")}
      />
      {meals.length === 0 ? (
        <Text>No meals found. Try another search.</Text>
      ) : (
        <MealList
          meals={meals}
          navigation={navigation}
          favorites={favorites}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
