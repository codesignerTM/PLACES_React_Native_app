import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button
} from "react-native";
import { useDispatch } from "react-redux";
import * as placesActions from "../store/actions/places-actions";
import ImagePicker from "../components/ImagePicker";

import Colors from "../constants/Colors";

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();

  const dispatch = useDispatch();

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
  };

  const titleChangeHandler = text => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChange={event => titleChangeHandler(event.nativeEvent.text)}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place"
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;
