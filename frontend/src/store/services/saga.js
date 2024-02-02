import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Service Redux States
import {
  GET_SERVICES,
  ADD_SERVICE,
  DELETE_SERVICE,
  UPDATE_SERVICE
} from "./actionType";

import {
  ServiceApiResponseSuccess,
  ServiceApiResponseError,
  addServiceSuccess,
  addServiceFail,
  updateServiceSuccess,
  updateServiceFail,
  deleteServiceSuccess,
  deleteServiceFail
} from "./action";

//Include Both Helper File with needed methods
import {
  getServices as getServicesApi,
  addService,
  updateService,
  deleteService
} from "helpers/backend_helper";

function* getServices() {

  try {
    const response = yield call(getServicesApi);
    yield put(ServiceApiResponseSuccess(GET_SERVICES, response.data));
  } catch (error) {
    yield put(ServiceApiResponseError(GET_SERVICES, error));
  }
}

function* onAddService({ payload: service }) {
  try {
    const response = yield call(addService, service);

    yield put(addServiceSuccess(response));
    toast.success("Service Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addServiceFail(error));
    toast.error("Service Added Failed", { autoClose: 3000 });
  }
}

function* onUpdateService({ payload: service }) {
  try {
    const response = yield call(updateService, service);
    yield put(updateServiceSuccess(response));
    toast.success("Service Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateServiceFail(error));
    toast.error("Service Updated Failed", { autoClose: 3000 });
  }
}

function* onDeleteService({ payload: service }) {
  try {
    const response = yield call(deleteService, service);
    yield put(deleteServiceSuccess({ service, ...response }));
    toast.success("Service Delete Successfully", { autoClose: 3000 });

  } catch (error) {
    yield put(deleteServiceFail(error));
    toast.error("Service Delete Failed", { autoClose: 3000 });
  }
}

export function* watchGetServices() {
  yield takeEvery(GET_SERVICES, getServices);
}

export function* watchUpdateService() {
  yield takeEvery(UPDATE_SERVICE, onUpdateService);
}

export function* watchDeleteService() {
  yield takeEvery(DELETE_SERVICE, onDeleteService);
}

export function* watchAddService() {
  yield takeEvery(ADD_SERVICE, onAddService);
}

function* ServiceSaga() {
  yield all([
    fork(watchGetServices),
    fork(watchAddService),
    fork(watchDeleteService),
    fork(watchUpdateService),
  ]);
}

export default ServiceSaga;