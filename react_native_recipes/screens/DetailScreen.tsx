import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FavoritesContext } from "../App";
import IngredientList from "../components/IngredientList";
import { Meal } from "../types";

interface RouteParams {
  meal: Meal;
}

export default function DetailsScreen({
  route,
  navigation,
}: {
  route: { params: RouteParams };
  navigation: any;
}) {
  const { meal } = route.params;
  const { addToFavorites, removeFromFavorites, favorites } =
    useContext(FavoritesContext);

  const isFavorite = favorites.some(
    (favorite: Meal) => favorite.idMeal === meal.idMeal
  );

  const handleToggleFavorite = () => {
    isFavorite ? removeFromFavorites(meal.idMeal) : addToFavorites(meal);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.infoContainer}>
          <Image source={{ uri: meal.strMealThumb }} style={styles.mealImage} />
          <View style={styles.textsContainer}>
            <Text style={styles.title}>
              {meal.strMeal}{" "}
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color="tomato"
                onPress={handleToggleFavorite}
                style={styles.favoriteIcon}
              />
            </Text>
            <Text style={styles.category}>
              {meal.strCategory} - {meal.strArea}
            </Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <IngredientList meal={meal} />
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructions}>{meal.strInstructions}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  content: {
    paddingHorizontal: 20,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: "#ccc",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
  mealImage: {
    width: "30%",
    height: 70,
    borderRadius: 10,
  },
  textsContainer: {
    marginLeft: 20,
    flexDirection: "column",
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 20,
  },
  favoriteIcon: {
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
  },
});
