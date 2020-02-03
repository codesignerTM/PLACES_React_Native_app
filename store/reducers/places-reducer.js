import { ADD_PLACE, SET_PLACES } from "../actions/places-actions";
import Place from "../../models/place";

const initialState = {
  places: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      console.log("aaaction", action);
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.coordinates.lat,
        action.placeData.coordinates.lng
      );
      return {
        places: state.places.concat(newPlace)
      };
      break;
    case SET_PLACES:
      return {
        places: action.places.map(
          pl =>
            new Place(
              pl.id.toString(),
              pl.title,
              pl.imageUrl,
              pl.address,
              pl.lat,
              pl.lng
            )
        )
      };
      break;
    default:
      return state;
      break;
  }
};
