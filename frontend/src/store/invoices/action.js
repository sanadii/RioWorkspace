import {
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  // Invoice
  GET_INVOICES,
  GET_INVOICE_BY_ID,
  UPDATE_INVOICE,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_FAIL,
  ADD_INVOICE,
  ADD_INVOICE_SUCCESS,
  ADD_INVOICE_FAIL,
  DELETE_INVOICE,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAIL,

  // Transaction
  GET_TRANSACTIONS,
  GET_TRANSACTION_BY_ID,
  UPDATE_TRANSACTION,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAIL,
  ADD_TRANSACTION,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAIL,
  DELETE_TRANSACTION,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAIL,
} from "./actionType";

// 
// Invoice
// 
// common success
export const InvoiceApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const InvoiceApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getInvoices = () => ({
  type: GET_INVOICES,
});

export const getInvoiceById = (invoice) => ({
  type: GET_INVOICE_BY_ID,
  payload: invoice,
});

export const updateInvoice = invoice => ({
  type: UPDATE_INVOICE,
  payload: invoice,
});

export const updateInvoiceSuccess = invoice => ({
  type: UPDATE_INVOICE_SUCCESS,
  payload: invoice,
});

export const updateInvoiceFail = error => ({
  type: UPDATE_INVOICE_FAIL,
  payload: error,
});

export const addInvoice = invoice => ({
  type: ADD_INVOICE,
  payload: invoice,
});

export const addInvoiceSuccess = invoice => ({
  type: ADD_INVOICE_SUCCESS,
  payload: invoice,
});

export const addInvoiceFail = error => ({
  type: ADD_INVOICE_FAIL,
  payload: error,
});

export const deleteInvoice = invoice => ({
  type: DELETE_INVOICE,
  payload: invoice,
});

export const deleteInvoiceSuccess = invoice => ({
  type: DELETE_INVOICE_SUCCESS,
  payload: invoice,
});

export const deleteInvoiceFail = error => ({
  type: DELETE_INVOICE_FAIL,
  payload: error,
});

//
// Transaction
// 

// common success
export const TransactionApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const TransactionApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getTransactions = () => ({
  type: GET_TRANSACTIONS,
});

export const getTransactionById = (transaction) => ({
  type: GET_TRANSACTION_BY_ID,
  payload: transaction,
});

export const updateTransaction = transaction => ({
  type: UPDATE_TRANSACTION,
  payload: transaction,
});

export const updateTransactionSuccess = transaction => ({
  type: UPDATE_TRANSACTION_SUCCESS,
  payload: transaction,
});

export const updateTransactionFail = error => ({
  type: UPDATE_TRANSACTION_FAIL,
  payload: error,
});

export const addTransaction = transaction => ({
  type: ADD_TRANSACTION,
  payload: transaction,
});

export const addTransactionSuccess = transaction => ({
  type: ADD_TRANSACTION_SUCCESS,
  payload: transaction,
});

export const addTransactionFail = error => ({
  type: ADD_TRANSACTION_FAIL,
  payload: error,
});

export const deleteTransaction = transaction => ({
  type: DELETE_TRANSACTION,
  payload: transaction,
});

export const deleteTransactionSuccess = transaction => ({
  type: DELETE_TRANSACTION_SUCCESS,
  payload: transaction,
});

export const deleteTransactionFail = error => ({
  type: DELETE_TRANSACTION_FAIL,
  payload: error,
});