import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from "react-native";
import Colors from "../constants/Colors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapPreview from "../components/MapPreview";

const LocationPicker = props => {
  const [location, setLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const pickedLocation = props.navigation.getParam("pickedLocation");

  //pull out
  const { onLocationChanged } = props;

  useEffect(() => {
    if (pickedLocation) {
      setLocation(pickedLocation);
      //because of useEffect onLocationChanged should be specified as a dependency that is why it must be pulled out among props
      //props.onLocationChanged(pickedLocation);
      onLocationChanged(pickedLocation);
    }
  }, [pickedLocation, onLocationChanged]);

  const verifyPermission = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "Location permissions are needed to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandeler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
      props.onLocationChanged({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    } catch (error) {
      Alert.alert(
        "Could not fetch location",
        "Please try again or pick a location on the map.",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  const pickonMapHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={location}
        onPress={pickonMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen here!</Text>
        )}
      </MapPreview>
      <View style={styles.action}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandeler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickonMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1
  },
  action: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around"
  }
});

export default LocationPicker;
