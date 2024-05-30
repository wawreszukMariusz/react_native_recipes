import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Meal } from "../types";

interface IngredientListProps {
  meal: Meal;
}

const IngredientList: React.FC<IngredientListProps> = ({ meal }) => {
  const getIngredients = () => {
    const ingredients: { ingredient: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  const ingredients = getIngredients();

  return (
    <View>
      {ingredients.map((item, index) => (
        <View key={index} style={styles.ingredientItem}>
          <Image
            source={{
              uri: `https://www.themealdb.com/images/ingredients/${item.ingredient}.png`,
            }}
            style={styles.ingredientImage}
          />
          <Text style={styles.ingredientText}>
            {item.ingredient} - {item.measure}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ingredientImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 16,
  },
});

export default IngredientList;
