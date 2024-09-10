import { GET_INVOICE_DETAILS } from "../ActionTypes/InvoiceActionTypes";

GET_INVOICE_DETAILS;
export const getInvoice = (params) => ({
  type: GET_INVOICE_DETAILS,
  payload: params,
});
