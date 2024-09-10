import { GET_ITINERARY_DETAILS } from "../ActionTypes/ItineraryActionTypes";

export const getItinerary = (params) => ({
  type: GET_ITINERARY_DETAILS,
  payload: params,
});
