import * as ItineraryTypes from "../ActionTypes/ItineraryActionTypes";

const initialState = {
  ItineraryInformation: [],
};

export const ItineraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ItineraryTypes.GET_ITINERARY_DETAILS:
      return {
        ...state,
        ItineraryInformation: action.payload,
      };

    default:
      return state;
  }
};
