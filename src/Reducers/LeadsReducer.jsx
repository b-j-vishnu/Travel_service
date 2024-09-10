import * as LeadsTypes from "../ActionTypes/LeadsActionTypes";

const initialState = {
  LeadsInformation: [],
};

export const LeadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LeadsTypes.GET_LEADS:
      return {
        ...state,
        LeadsInformation: action.payload,
      };

    default:
      return state;
  }
};
