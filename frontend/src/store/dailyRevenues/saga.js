import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// DailyRevenue Redux States
import {
  GET_DAILY_REVENUES,
  ADD_DAILY_REVENUE,
  DELETE_DAILY_REVENUE,
  UPDATE_DAILY_REVENUE
} from "./actionType";

import {
  DailyRevenueApiResponseSuccess,
  DailyRevenueApiResponseError,
  addDailyRevenueSuccess,
  addDailyRevenueFail,
  updateDailyRevenueSuccess,
  updateDailyRevenueFail,
  deleteDailyRevenueSuccess,
  deleteDailyRevenueFail
} from "./action";

//Include Both Helper File with needed methods
import {
  getDailyRevenues as getDailyRevenuesApi,
  addDailyRevenue,
  updateDailyRevenue,
  deleteDailyRevenue
} from "helpers/backend_helper";

function* getDailyRevenues() {

  try {
    const response = yield call(getDailyRevenuesApi);
    yield put(DailyRevenueApiResponseSuccess(GET_DAILY_REVENUES, response.data));
  } catch (error) {
    yield put(DailyRevenueApiResponseError(GET_DAILY_REVENUES, error));
  }
}

function* onAddDailyRevenue({ payload: dailyRevenue }) {
  try {
    const response = yield call(addDailyRevenue, dailyRevenue);

    yield put(addDailyRevenueSuccess(response));
    toast.success("DailyRevenue Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addDailyRevenueFail(error));
    toast.error("DailyRevenue Added Failed", { autoClose: 3000 });
  }
}

function* onUpdateDailyRevenue({ payload: dailyRevenue }) {
  try {
    const response = yield call(updateDailyRevenue, dailyRevenue);
    yield put(updateDailyRevenueSuccess(response));
    toast.success("DailyRevenue Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateDailyRevenueFail(error));
    toast.error("DailyRevenue Updated Failed", { autoClose: 3000 });
  }
}

function* onDeleteDailyRevenue({ payload: dailyRevenue }) {
  try {
    const response = yield call(deleteDailyRevenue, dailyRevenue);
    yield put(deleteDailyRevenueSuccess({ dailyRevenue, ...response }));
    toast.success("DailyRevenue Delete Successfully", { autoClose: 3000 });

  } catch (error) {
    yield put(deleteDailyRevenueFail(error));
    toast.error("DailyRevenue Delete Failed", { autoClose: 3000 });
  }
}

export function* watchGetDailyRevenues() {
  yield takeEvery(GET_DAILY_REVENUES, getDailyRevenues);
}

export function* watchUpdateDailyRevenue() {
  yield takeEvery(UPDATE_DAILY_REVENUE, onUpdateDailyRevenue);
}

export function* watchDeleteDailyRevenue() {
  yield takeEvery(DELETE_DAILY_REVENUE, onDeleteDailyRevenue);
}

export function* watchAddDailyRevenue() {
  yield takeEvery(ADD_DAILY_REVENUE, onAddDailyRevenue);
}

function* DailyRevenueSaga() {
  yield all([
    fork(watchGetDailyRevenues),
    fork(watchAddDailyRevenue),
    fork(watchDeleteDailyRevenue),
    fork(watchUpdateDailyRevenue),
  ]);
}

export default DailyRevenueSaga;