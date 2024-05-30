import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  GestureResponderEvent,
} from "react-native";
import axios from "axios";
import MealItem from "../components/MealItem";
import Header from "../components/Header";
import { FavoritesContext } from "../App";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function HomeScreen({ navigation }) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s")
      .then((response) => {
        const mealsData = response.data.meals || [];
        setMeals(mealsData);
      })
      .catch((error) => console.error(error));
  }, []);

  const isFavorite = (mealId: string) =>
    favorites.some((meal: Meal) => meal.idMeal === mealId);

  const handleToggleFavorite =
    (meal: Meal) => (event: GestureResponderEvent) => {
      isFavorite(meal.idMeal)
        ? removeFromFavorites(meal.idMeal)
        : addToFavorites(meal);
    };

  const handlePressMeal = (meal: Meal) => (event: GestureResponderEvent) => {
    navigation.navigate("Details", { meal });
  };

  const renderMeal = ({ item }: { item: Meal }) => (
    <MealItem
      item={item}
      isFavorite={isFavorite(item.idMeal)}
      onToggleFavorite={handleToggleFavorite(item)}
      onPress={handlePressMeal(item)}
    />
  );

  return (
    <View style={styles.container}>
      <Header />
      {meals.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderMeal}
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
});
