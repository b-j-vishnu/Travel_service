import { GET_LEADS } from "../ActionTypes/LeadsActionTypes";

export const getLeads = (params) => ({
  type: GET_LEADS,
  payload: params,
});
