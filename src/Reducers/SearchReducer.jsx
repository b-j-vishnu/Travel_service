import * as searchTypes from "../ActionTypes/SearchTypes";

const initialState = {
  searchInformation: {},
};

export const SearchReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case searchTypes.GET_SEARCHED_BY_ID:
      return {
        ...state,
        searchInformation: action.payload,
      };

    default:
      return state;
  }
};
