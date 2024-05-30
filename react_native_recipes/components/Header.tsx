import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Recipes App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    fontSize: 25,
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default Header;
