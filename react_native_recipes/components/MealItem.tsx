import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Meal } from "../types";

interface MealItemProps {
  item: Meal;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPress: () => void;
}

const MealItem: React.FC<MealItemProps> = ({
  item,
  isFavorite,
  onToggleFavorite,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.mealItem}>
        <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />
        <Text style={styles.mealTitle}>{item.strMeal}</Text>
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={24}
          color="tomato"
          onPress={onToggleFavorite}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  mealImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  mealTitle: {
    marginLeft: 15,
    flex: 1,
    fontSize: 16,
  },
});

export default MealItem;
