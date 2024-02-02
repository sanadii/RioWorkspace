import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Appointment Redux States
import {
  GET_APPOINTMENTS,
  ADD_APPOINTMENT,
  DELETE_APPOINTMENT,
  UPDATE_APPOINTMENT
} from "./actionType";

import {
  AppointmentApiResponseSuccess,
  AppointmentApiResponseError,
  addAppointmentSuccess,
  addAppointmentFail,
  updateAppointmentSuccess,
  updateAppointmentFail,
  deleteAppointmentSuccess,
  deleteAppointmentFail
} from "./action";

//Include Both Helper File with needed methods
import {
  getAppointments as getAppointmentsApi,
  addAppointment,
  updateAppointment,
  deleteAppointment
} from "helpers/backend_helper";

function* getAppointments() {

  try {
    const response = yield call(getAppointmentsApi);
    yield put(AppointmentApiResponseSuccess(GET_APPOINTMENTS, response.data));
  } catch (error) {
    yield put(AppointmentApiResponseError(GET_APPOINTMENTS, error));
  }
}

function* onAddAppointment({ payload: appointment }) {
  try {
    const response = yield call(addAppointment, appointment);

    yield put(addAppointmentSuccess(response));
    toast.success("Appointment Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addAppointmentFail(error));
    toast.error("Appointment Added Failed", { autoClose: 3000 });
  }
}

function* onUpdateAppointment({ payload: appointment }) {
  try {
    const response = yield call(updateAppointment, appointment);
    yield put(updateAppointmentSuccess(response));
    toast.success("Appointment Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateAppointmentFail(error));
    toast.error("Appointment Updated Failed", { autoClose: 3000 });
  }
}

function* onDeleteAppointment({ payload: appointment }) {
  try {
    const response = yield call(deleteAppointment, appointment);
    yield put(deleteAppointmentSuccess({ appointment, ...response }));
    toast.success("Appointment Delete Successfully", { autoClose: 3000 });

  } catch (error) {
    yield put(deleteAppointmentFail(error));
    toast.error("Appointment Delete Failed", { autoClose: 3000 });
  }
}

export function* watchGetAppointments() {
  yield takeEvery(GET_APPOINTMENTS, getAppointments);
}

export function* watchUpdateAppointment() {
  yield takeEvery(UPDATE_APPOINTMENT, onUpdateAppointment);
}

export function* watchDeleteAppointment() {
  yield takeEvery(DELETE_APPOINTMENT, onDeleteAppointment);
}

export function* watchAddAppointment() {
  yield takeEvery(ADD_APPOINTMENT, onAddAppointment);
}

function* AppointmentSaga() {
  yield all([
    fork(watchGetAppointments),
    fork(watchAddAppointment),
    fork(watchDeleteAppointment),
    fork(watchUpdateAppointment),
  ]);
}

export default AppointmentSaga;