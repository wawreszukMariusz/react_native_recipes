import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import MealList from "../components/MealList";
import Header from "../components/Header";
import { FavoritesContext } from "../App";
import { Meal } from "../types";

export default function FavoritesScreen({ navigation }) {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  return (
    <View style={styles.container}>
      <Header />
      {favorites.length === 0 ? (
        <Text style={styles.emptyMessage}>No favorite recipes</Text>
      ) : (
        <MealList
          meals={favorites}
          navigation={navigation}
          favorites={favorites}
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
  emptyMessage: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});
