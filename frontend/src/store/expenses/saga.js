import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Expense Redux States
import {
  GET_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_EXPENSE
} from "./actionType";

import {
  ExpenseApiResponseSuccess,
  ExpenseApiResponseError,
  addExpenseSuccess,
  addExpenseFail,
  updateExpenseSuccess,
  updateExpenseFail,
  deleteExpenseSuccess,
  deleteExpenseFail
} from "./action";

//Include Both Helper File with needed methods
import {
  getExpenses as getExpensesApi,
  addExpense,
  updateExpense,
  deleteExpense
} from "helpers/backend_helper";

function* getExpenses() {

  try {
    const response = yield call(getExpensesApi);
    yield put(ExpenseApiResponseSuccess(GET_EXPENSES, response.data));
  } catch (error) {
    yield put(ExpenseApiResponseError(GET_EXPENSES, error));
  }
}

function* onAddExpense({ payload: expense }) {
  try {
    const response = yield call(addExpense, expense);

    yield put(addExpenseSuccess(response));
    toast.success("Expense Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addExpenseFail(error));
    toast.error("Expense Added Failed", { autoClose: 3000 });
  }
}

function* onUpdateExpense({ payload: expense }) {
  try {
    const response = yield call(updateExpense, expense);
    yield put(updateExpenseSuccess(response));
    toast.success("Expense Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateExpenseFail(error));
    toast.error("Expense Updated Failed", { autoClose: 3000 });
  }
}

function* onDeleteExpense({ payload: expense }) {
  try {
    const response = yield call(deleteExpense, expense);
    yield put(deleteExpenseSuccess({ expense, ...response }));
    toast.success("Expense Delete Successfully", { autoClose: 3000 });

  } catch (error) {
    yield put(deleteExpenseFail(error));
    toast.error("Expense Delete Failed", { autoClose: 3000 });
  }
}

export function* watchGetExpenses() {
  yield takeEvery(GET_EXPENSES, getExpenses);
}

export function* watchUpdateExpense() {
  yield takeEvery(UPDATE_EXPENSE, onUpdateExpense);
}

export function* watchDeleteExpense() {
  yield takeEvery(DELETE_EXPENSE, onDeleteExpense);
}

export function* watchAddExpense() {
  yield takeEvery(ADD_EXPENSE, onAddExpense);
}

function* ExpenseSaga() {
  yield all([
    fork(watchGetExpenses),
    fork(watchAddExpense),
    fork(watchDeleteExpense),
    fork(watchUpdateExpense),
  ]);
}

export default ExpenseSaga;