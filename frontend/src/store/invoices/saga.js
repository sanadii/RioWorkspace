import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Invoice Redux States
import {
  // Invoices
  GET_INVOICES,
  ADD_INVOICE,
  DELETE_INVOICE,
  UPDATE_INVOICE,

  // Transactions
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION

} from "./actionType";

import {
  // Invoices
  InvoiceApiResponseSuccess,
  InvoiceApiResponseError,
  addInvoiceSuccess,
  addInvoiceFail,
  updateInvoiceSuccess,
  updateInvoiceFail,
  deleteInvoiceSuccess,
  deleteInvoiceFail,

  // Transactions
  TransactionApiResponseSuccess,
  TransactionApiResponseError,
  addTransactionSuccess,
  addTransactionFail,
  updateTransactionSuccess,
  updateTransactionFail,
  deleteTransactionSuccess,
  deleteTransactionFail

} from "./action";

//Include Both Helper File with needed methods
import {
  // Invoices
  getInvoices as getInvoicesApi,
  addInvoice,
  updateInvoice,
  deleteInvoice,

  // Transactions
  getTransactions as getTransactionsApi,
  addTransaction,
  updateTransaction,
  deleteTransaction
} from "helpers/backend_helper";


// 
// Invoices
// 
function* getInvoices() {

  try {
    const response = yield call(getInvoicesApi);
    yield put(InvoiceApiResponseSuccess(GET_INVOICES, response.data));
  } catch (error) {
    yield put(InvoiceApiResponseError(GET_INVOICES, error));
  }
}

function* onAddInvoice({ payload: dailyInvoice }) {
  try {
    const response = yield call(addInvoice, dailyInvoice);

    yield put(addInvoiceSuccess(response));
    toast.success("Invoice Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addInvoiceFail(error));
    toast.error("Invoice Added Failed", { autoClose: 3000 });
  }
}

function* onUpdateInvoice({ payload: dailyInvoice }) {
  try {
    const response = yield call(updateInvoice, dailyInvoice);
    yield put(updateInvoiceSuccess(response));
    toast.success("Invoice Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateInvoiceFail(error));
    toast.error("Invoice Updated Failed", { autoClose: 3000 });
  }
}

function* onDeleteInvoice({ payload: dailyInvoice }) {
  try {
    const response = yield call(deleteInvoice, dailyInvoice);
    yield put(deleteInvoiceSuccess({ dailyInvoice, ...response }));
    toast.success("Invoice Delete Successfully", { autoClose: 3000 });

  } catch (error) {
    yield put(deleteInvoiceFail(error));
    toast.error("Invoice Delete Failed", { autoClose: 3000 });
  }
}

// 
// Transactions
// 
function* getTransactions() {

  try {
    const response = yield call(getTransactionsApi);
    yield put(TransactionApiResponseSuccess(GET_TRANSACTIONS, response.data));
  } catch (error) {
    yield put(TransactionApiResponseError(GET_TRANSACTIONS, error));
  }
}

function* onAddTransaction({ payload: dailyTransaction }) {
  try {
    const response = yield call(addTransaction, dailyTransaction);

    yield put(addTransactionSuccess(response));
    toast.success("Transaction Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addTransactionFail(error));
    toast.error("Transaction Added Failed", { autoClose: 3000 });
  }
}

function* onUpdateTransaction({ payload: dailyTransaction }) {
  try {
    const response = yield call(updateTransaction, dailyTransaction);
    yield put(updateTransactionSuccess(response));
    toast.success("Transaction Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateTransactionFail(error));
    toast.error("Transaction Updated Failed", { autoClose: 3000 });
  }
}

function* onDeleteTransaction({ payload: dailyTransaction }) {
  try {
    const response = yield call(deleteTransaction, dailyTransaction);
    yield put(deleteTransactionSuccess({ dailyTransaction, ...response }));
    toast.success("Transaction Delete Successfully", { autoClose: 3000 });

  } catch (error) {
    yield put(deleteTransactionFail(error));
    toast.error("Transaction Delete Failed", { autoClose: 3000 });
  }
}


// 
// Watchers
// 
// Invoices

export function* watchGetInvoices() {
  yield takeEvery(GET_INVOICES, getInvoices);
}

export function* watchUpdateInvoice() {
  yield takeEvery(UPDATE_INVOICE, onUpdateInvoice);
}

export function* watchDeleteInvoice() {
  yield takeEvery(DELETE_INVOICE, onDeleteInvoice);
}

export function* watchAddInvoice() {
  yield takeEvery(ADD_INVOICE, onAddInvoice);
}

// Transactions
export function* watchGetTransactions() {
  yield takeEvery(GET_TRANSACTIONS, getTransactions);
}

export function* watchUpdateTransaction() {
  yield takeEvery(UPDATE_TRANSACTION, onUpdateTransaction);
}

export function* watchDeleteTransaction() {
  yield takeEvery(DELETE_TRANSACTION, onDeleteTransaction);
}

export function* watchAddTransaction() {
  yield takeEvery(ADD_TRANSACTION, onAddTransaction);
}


function* InvoiceSaga() {
  yield all([
    // Invoices
    fork(watchGetInvoices),
    fork(watchAddInvoice),
    fork(watchDeleteInvoice),
    fork(watchUpdateInvoice),

    // Transactions
    fork(watchGetTransactions),
    fork(watchAddTransaction),
    fork(watchDeleteTransaction),
    fork(watchUpdateTransaction),

  ]);
}

export default InvoiceSaga;