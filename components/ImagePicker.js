import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Button,
  Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";

const ImgPicker = props => {
  const [pickedImage, setPickedImage] = useState(null);

  const verifyPermission = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "Camera permissions are needed to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermissions = await verifyPermission();
    if (!hasPermissions) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      //camera config
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });
    console.log(image);
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}

        <Button
          title="Take Image"
          color={Colors.primary}
          onPress={takeImageHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default ImgPicker;
