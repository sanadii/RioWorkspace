import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Revenue Redux States
import {
  GET_REVENUES,
  ADD_REVENUE,
  DELETE_REVENUE,
  UPDATE_REVENUE
} from "./actionType";

import {
  RevenueApiResponseSuccess,
  RevenueApiResponseError,
  addRevenueSuccess,
  addRevenueFail,
  updateRevenueSuccess,
  updateRevenueFail,
  deleteRevenueSuccess,
  deleteRevenueFail
} from "./action";

//Include Both Helper File with needed methods
import {
  getRevenues as getRevenuesApi,
  addRevenue,
  updateRevenue,
  deleteRevenue
} from "helpers/backend_helper";

function* getRevenues() {

  try {
    const response = yield call(getRevenuesApi);
    yield put(RevenueApiResponseSuccess(GET_REVENUES, response.data));
  } catch (error) {
    yield put(RevenueApiResponseError(GET_REVENUES, error));
  }
}

function* onAddRevenue({ payload: dailyRevenue }) {
  try {
    const response = yield call(addRevenue, dailyRevenue);

    yield put(addRevenueSuccess(response));
    toast.success("Revenue Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addRevenueFail(error));
    toast.error("Revenue Added Failed", { autoClose: 3000 });
  }
}

function* onUpdateRevenue({ payload: dailyRevenue }) {
  try {
    const response = yield call(updateRevenue, dailyRevenue);
    yield put(updateRevenueSuccess(response));
    toast.success("Revenue Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateRevenueFail(error));
    toast.error("Revenue Updated Failed", { autoClose: 3000 });
  }
}

function* onDeleteRevenue({ payload: dailyRevenue }) {
  try {
    const response = yield call(deleteRevenue, dailyRevenue);
    yield put(deleteRevenueSuccess({ dailyRevenue, ...response }));
    toast.success("Revenue Delete Successfully", { autoClose: 3000 });

  } catch (error) {
    yield put(deleteRevenueFail(error));
    toast.error("Revenue Delete Failed", { autoClose: 3000 });
  }
}

export function* watchGetRevenues() {
  yield takeEvery(GET_REVENUES, getRevenues);
}

export function* watchUpdateRevenue() {
  yield takeEvery(UPDATE_REVENUE, onUpdateRevenue);
}

export function* watchDeleteRevenue() {
  yield takeEvery(DELETE_REVENUE, onDeleteRevenue);
}

export function* watchAddRevenue() {
  yield takeEvery(ADD_REVENUE, onAddRevenue);
}

function* RevenueSaga() {
  yield all([
    fork(watchGetRevenues),
    fork(watchAddRevenue),
    fork(watchDeleteRevenue),
    fork(watchUpdateRevenue),
  ]);
}

export default RevenueSaga;