import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Rsource Redux States
import {
  GET_CLIENTS,
  ADD_CLIENT,
  DELETE_CLIENT,
  UPDATE_CLIENT
} from "./actionType";

import {
  RsourceApiResponseSuccess,
  RsourceApiResponseError,
  addRsourceSuccess,
  addRsourceFail,
  updateRsourceSuccess,
  updateRsourceFail,
  deleteRsourceSuccess,
  deleteRsourceFail
} from "./action";

//Include Both Helper File with needed methods
import {
  getRsources as getRsourcesApi,
  addRsource,
  updateRsource,
  deleteRsource
} from "helpers/backend_helper";

function* getRsources() {

  try {
    const response = yield call(getRsourcesApi);
    yield put(RsourceApiResponseSuccess(GET_CLIENTS, response.data));
  } catch (error) {
    yield put(RsourceApiResponseError(GET_CLIENTS, error));
  }
}

function* onAddRsource({ payload: resource }) {
  try {
    const response = yield call(addRsource, resource);

    yield put(addRsourceSuccess(response));
    toast.success("Rsource Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addRsourceFail(error));
    toast.error("Rsource Added Failed", { autoClose: 3000 });
  }
}

function* onUpdateRsource({ payload: resource }) {
  try {
    const response = yield call(updateRsource, resource);
    yield put(updateRsourceSuccess(response));
    toast.success("Rsource Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateRsourceFail(error));
    toast.error("Rsource Updated Failed", { autoClose: 3000 });
  }
}

function* onDeleteRsource({ payload: resource }) {
  try {
    const response = yield call(deleteRsource, resource);
    yield put(deleteRsourceSuccess({ resource, ...response }));
    toast.success("Rsource Delete Successfully", { autoClose: 3000 });

  } catch (error) {
    yield put(deleteRsourceFail(error));
    toast.error("Rsource Delete Failed", { autoClose: 3000 });
  }
}

export function* watchGetRsources() {
  yield takeEvery(GET_CLIENTS, getRsources);
}

export function* watchUpdateRsource() {
  yield takeEvery(UPDATE_CLIENT, onUpdateRsource);
}

export function* watchDeleteRsource() {
  yield takeEvery(DELETE_CLIENT, onDeleteRsource);
}

export function* watchAddRsource() {
  yield takeEvery(ADD_CLIENT, onAddRsource);
}

function* RsourceSaga() {
  yield all([
    fork(watchGetRsources),
    fork(watchAddRsource),
    fork(watchDeleteRsource),
    fork(watchUpdateRsource),
  ]);
}

export default RsourceSaga;