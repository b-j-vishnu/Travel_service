import { GET_SEARCHED_BY_ID } from "../ActionTypes/SearchTypes";

export const getSearchedResult = (params) => ({
  type: GET_SEARCHED_BY_ID,
  payload: params,
});
