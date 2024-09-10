import { GET_CUSTOMER_DETAILS } from "../ActionTypes/CustomerTypes";

export const getCustomer = (params) => ({
  type: GET_CUSTOMER_DETAILS,
  payload: params,
});
