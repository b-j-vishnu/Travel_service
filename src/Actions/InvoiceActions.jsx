import { GET_INVOICE_DETAILS } from "../ActionTypes/InvoiceActionTypes";

export const getInvoice = (params) => ({
  type: GET_INVOICE_DETAILS,
  payload: params,
});
