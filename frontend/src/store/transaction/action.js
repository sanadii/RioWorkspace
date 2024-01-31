import {
  GET_TRANSACTIONS,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  UPDATE_TRANSACTION,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAIL,
  ADD_NEW_TRANSACTION,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAIL,
  DELETE_TRANSACTION,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAIL,
} from "./actionType";

// common success
export const transactionApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const transactionApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getTransactions = () => ({
  type: GET_TRANSACTIONS,
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

export const addNewTransaction = transaction => ({
  type: ADD_NEW_TRANSACTION,
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