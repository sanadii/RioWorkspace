import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Transaction Redux States
import {
  GET_TRANSACTIONS,
  ADD_NEW_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION
} from "./actionType";

import {
  transactionApiResponseSuccess,
  transactionApiResponseError,
  addTransactionSuccess,
  addTransactionFail,
  updateTransactionSuccess,
  updateTransactionFail,
  deleteTransactionSuccess,
  deleteTransactionFail
} from "./action";

//Include Both Helper File with needed methods
import {
  getTransactions as getTransactionsApi,
  addNewTransaction,
  updateTransaction,
  deleteTransaction
} from "helpers/backend_helper";

function* getTransactions() {
  try {
    const response = yield call(getTransactionsApi);
    yield put(transactionApiResponseSuccess(GET_TRANSACTIONS, response.data));
  } catch (error) {
    yield put(transactionApiResponseError(GET_TRANSACTIONS, error));
  }
}

function* onAddNewTransaction({ payload: transaction }) {
  try {
    const response = yield call(addNewTransaction, transaction);

    yield put(addTransactionSuccess(response));
    toast.success("Transaction Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addTransactionFail(error));
    toast.error("Transaction Added Failed", { autoClose: 3000 });
  }
}

function* onUpdateTransaction({ payload: transaction }) {
  try {
    const response = yield call(updateTransaction, transaction);
    yield put(updateTransactionSuccess(response));
    toast.success("Transaction Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateTransactionFail(error));
    toast.error("Transaction Updated Failed", { autoClose: 3000 });
  }
}

function* onDeleteTransaction({ payload: transaction }) {
  try {
    const response = yield call(deleteTransaction, transaction);
    yield put(deleteTransactionSuccess({ transaction, ...response }));
    toast.success("Transaction Delete Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(deleteTransactionFail(error));
    toast.error("Transaction Delete Failed", { autoClose: 3000 });
  }
}

export function* watchGetTransactions() {
  yield takeEvery(GET_TRANSACTIONS, getTransactions);
}

export function* watchUpdateTransaction() {
  yield takeEvery(UPDATE_TRANSACTION, onUpdateTransaction);
}

export function* watchDeleteTransaction() {
  yield takeEvery(DELETE_TRANSACTION, onDeleteTransaction);
}

export function* watchAddNewTransaction() {
  yield takeEvery(ADD_NEW_TRANSACTION, onAddNewTransaction);
}

function* transactionSaga() {
  yield all([
    fork(watchGetTransactions),
    fork(watchAddNewTransaction),
    fork(watchDeleteTransaction),
    fork(watchUpdateTransaction),
  ]);
}

export default transactionSaga;