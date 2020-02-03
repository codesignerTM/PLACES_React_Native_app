import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helpers/db";
import ENV from "../../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image, location) => {
  return async dispatch => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleAPI}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong during reverse geocoding");
    }

    const resData = await response.json();

    if (!resData.results === 0) {
      throw new Error("Something went wrong here jófiu");
    }

    const address = resData.results[0].formatted_address;

    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      console.log("dbResult", dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coordinates: {
            lat: location.lat,
            lng: location.lng
          }
        }
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces();
      console.log("loadingplaces", dbResult);
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
