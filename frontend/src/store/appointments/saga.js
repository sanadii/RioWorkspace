import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Appointment Redux States
import {
  GET_SCHEDULE,

  // Appointments
  GET_APPOINTMENTS,
  GET_APPOINTMENT,
  ADD_APPOINTMENT,
  DELETE_APPOINTMENT,
  UPDATE_APPOINTMENT,

  // AppointmentServices
  GET_APPOINTMENT_SERVICES,
  ADD_APPOINTMENT_SERVICE,
  DELETE_APPOINTMENT_SERVICE,
  UPDATE_APPOINTMENT_SERVICE,

} from "./actionType";

import {

  // Appointments
  AppointmentApiResponseSuccess,
  AppointmentApiResponseError,
  addAppointmentSuccess,
  addAppointmentFail,
  updateAppointmentSuccess,
  updateAppointmentFail,
  deleteAppointmentSuccess,
  deleteAppointmentFail,

  // AppointmentServices
  AppointmentServiceApiResponseSuccess,
  AppointmentServiceApiResponseError,
  addAppointmentServiceSuccess,
  addAppointmentServiceFail,
  updateAppointmentServiceSuccess,
  updateAppointmentServiceFail,
  deleteAppointmentServiceSuccess,
  deleteAppointmentServiceFail,
} from "./action";

//Include Both Helper File with needed methods
import {
  // Schedule
  getSchedule as getScheduleApi,

  // Appointments
  getAppointments as getAppointmentsApi,
  getAppointment as getAppointmentApi,
  addAppointment,
  updateAppointment,
  deleteAppointment,

  // AppointmentServices
  getAppointmentServices as getAppointmentServicesApi,
  addAppointmentService,
  updateAppointmentService,
  deleteAppointmentService,
} from "helpers/backend_helper";

// Schedule
function* getSchedule() {

  try {
    const response = yield call(getScheduleApi);
    yield put(AppointmentApiResponseSuccess(GET_SCHEDULE, response.data));
  } catch (error) {
    yield put(AppointmentApiResponseError(GET_SCHEDULE, error));
  }
}

// Appointments
function* getAppointments() {

  try {
    const response = yield call(getAppointmentsApi);
    yield put(AppointmentApiResponseSuccess(GET_APPOINTMENTS, response.data));
  } catch (error) {
    yield put(AppointmentApiResponseError(GET_APPOINTMENTS, error));
  }
}

function* getAppointment({ payload: appointment }) {

  try {
    const response = yield call(getAppointmentApi, appointment);
    yield put(AppointmentApiResponseSuccess(GET_APPOINTMENT, response.data));
  } catch (error) {
    yield put(AppointmentApiResponseError(GET_APPOINTMENT, error));
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



// AppointmentServices
function* getAppointmentServices() {

  try {
    const response = yield call(getAppointmentServicesApi);
    yield put(AppointmentServiceApiResponseSuccess(GET_APPOINTMENT_SERVICES, response.data));
  } catch (error) {
    yield put(AppointmentServiceApiResponseError(GET_APPOINTMENT_SERVICES, error));
  }
}

function* onAddAppointmentService({ payload: appointmentService }) {
  try {
    const response = yield call(addAppointmentService, appointmentService);

    yield put(addAppointmentServiceSuccess(response));
    toast.success("AppointmentService Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addAppointmentServiceFail(error));
    toast.error("AppointmentService Added Failed", { autoClose: 3000 });
  }
}

function* onUpdateAppointmentService({ payload: appointmentService }) {
  try {
    const response = yield call(updateAppointmentService, appointmentService);
    yield put(updateAppointmentServiceSuccess(response));
    toast.success("AppointmentService Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateAppointmentServiceFail(error));
    toast.error("AppointmentService Updated Failed", { autoClose: 3000 });
  }
}

function* onDeleteAppointmentService({ payload: appointmentService }) {
  try {
    const response = yield call(deleteAppointmentService, appointmentService);
    yield put(deleteAppointmentServiceSuccess({ appointmentService, ...response }));
    toast.success("AppointmentService Delete Successfully", { autoClose: 3000 });

  } catch (error) {
    yield put(deleteAppointmentServiceFail(error));
    toast.error("AppointmentService Delete Failed", { autoClose: 3000 });
  }
}


// Schedule
export function* watchGetSchedule() {
  yield takeEvery(GET_SCHEDULE, getSchedule);
}

// Appointments
export function* watchGetAppointments() {
  yield takeEvery(GET_APPOINTMENTS, getAppointments);
}

export function* watchGetAppointment() {
  yield takeEvery(GET_APPOINTMENT, getAppointment);
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


// AppointmentServices
export function* watchGetAppointmentServices() {
  yield takeEvery(GET_APPOINTMENT_SERVICES, getAppointmentServices);
}

export function* watchUpdateAppointmentService() {
  yield takeEvery(UPDATE_APPOINTMENT_SERVICE, onUpdateAppointmentService);
}

export function* watchDeleteAppointmentService() {
  yield takeEvery(DELETE_APPOINTMENT_SERVICE, onDeleteAppointmentService);
}

export function* watchAddAppointmentService() {
  yield takeEvery(ADD_APPOINTMENT_SERVICE, onAddAppointmentService);
}

function* AppointmentSaga() {
  yield all([

    fork(watchGetSchedule),

    // Appointment
    fork(watchGetAppointments),
    fork(watchGetAppointment),
    fork(watchAddAppointment),
    fork(watchDeleteAppointment),
    fork(watchUpdateAppointment),

    // AppointmentService
    fork(watchGetAppointmentServices),
    fork(watchAddAppointmentService),
    fork(watchDeleteAppointmentService),
    fork(watchUpdateAppointmentService),
  ]);
}

export default AppointmentSaga;