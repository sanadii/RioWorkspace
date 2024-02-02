import {
  GET_EXPENSES,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  UPDATE_EXPENSE,
  UPDATE_EXPENSE_SUCCESS,
  UPDATE_EXPENSE_FAIL,
  ADD_EXPENSE,
  ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_FAIL,
  DELETE_EXPENSE,
  DELETE_EXPENSE_SUCCESS,
  DELETE_EXPENSE_FAIL,
} from "./actionType";

// common success
export const ExpenseApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const ExpenseApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getExpenses = () => ({
  type: GET_EXPENSES,
});

export const updateExpense = expense => ({
  type: UPDATE_EXPENSE,
  payload: expense,
});

export const updateExpenseSuccess = expense => ({
  type: UPDATE_EXPENSE_SUCCESS,
  payload: expense,
});

export const updateExpenseFail = error => ({
  type: UPDATE_EXPENSE_FAIL,
  payload: error,
});

export const addExpense = expense => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const addExpenseSuccess = expense => ({
  type: ADD_EXPENSE_SUCCESS,
  payload: expense,
});

export const addExpenseFail = error => ({
  type: ADD_EXPENSE_FAIL,
  payload: error,
});

export const deleteExpense = expense => ({
  type: DELETE_EXPENSE,
  payload: expense,
});

export const deleteExpenseSuccess = expense => ({
  type: DELETE_EXPENSE_SUCCESS,
  payload: expense,
});

export const deleteExpenseFail = error => ({
  type: DELETE_EXPENSE_FAIL,
  payload: error,
});