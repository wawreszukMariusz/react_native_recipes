import React from "react";
import { FlatList } from "react-native";
import MealItem from "./MealItem";
import { Meal } from "../types";

interface MealListProps {
  meals: Meal[];
  navigation: any;
  favorites: Meal[];
  addToFavorites?: (meal: Meal) => void;
  removeFromFavorites: (mealId: string) => void;
}

const MealList: React.FC<MealListProps> = ({
  meals,
  navigation,
  favorites,
  addToFavorites,
  removeFromFavorites,
}) => {
  const isFavorite = (mealId: string) =>
    favorites.some((meal: Meal) => meal.idMeal === mealId);

  const handleToggleFavorite = (meal: Meal) => () => {
    isFavorite(meal.idMeal)
      ? removeFromFavorites(meal.idMeal)
      : addToFavorites && addToFavorites(meal);
  };

  const handlePressMeal = (meal: Meal) => () => {
    navigation.navigate("Details", { meal });
  };

  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.idMeal}
      renderItem={({ item }) => (
        <MealItem
          item={item}
          isFavorite={isFavorite(item.idMeal)}
          onToggleFavorite={handleToggleFavorite(item)}
          onPress={handlePressMeal(item)}
        />
      )}
    />
  );
};

export default MealList;
