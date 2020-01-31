import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlacesDetailScreen = props => {
  return (
    <View>
      <Text>PlacesDetailScreen</Text>
    </View>
  );
};

PlacesDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle")
  };
};

const styles = StyleSheet.create({});

export default PlacesDetailScreen;
