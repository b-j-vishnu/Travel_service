import * as customerTypes from "../ActionTypes/CustomerTypes";

const initialState = {
  customerInformation: [],
};

export const CustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case customerTypes.GET_CUSTOMER_DETAILS:
      return {
        ...state,
        customerInformation: action.payload,
      };

    default:
      return state;
  }
};
