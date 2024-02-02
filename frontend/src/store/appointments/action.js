import {
  GET_APPOINTMENTS,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  UPDATE_APPOINTMENT,
  UPDATE_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_FAIL,
  ADD_APPOINTMENT,
  ADD_APPOINTMENT_SUCCESS,
  ADD_APPOINTMENT_FAIL,
  DELETE_APPOINTMENT,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAIL,
} from "./actionType";

// common success
export const AppointmentApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const AppointmentApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getAppointments = () => ({
  type: GET_APPOINTMENTS,
});

export const updateAppointment = appointment => ({
  type: UPDATE_APPOINTMENT,
  payload: appointment,
});

export const updateAppointmentSuccess = appointment => ({
  type: UPDATE_APPOINTMENT_SUCCESS,
  payload: appointment,
});

export const updateAppointmentFail = error => ({
  type: UPDATE_APPOINTMENT_FAIL,
  payload: error,
});

export const addAppointment = appointment => ({
  type: ADD_APPOINTMENT,
  payload: appointment,
});

export const addAppointmentSuccess = appointment => ({
  type: ADD_APPOINTMENT_SUCCESS,
  payload: appointment,
});

export const addAppointmentFail = error => ({
  type: ADD_APPOINTMENT_FAIL,
  payload: error,
});

export const deleteAppointment = appointment => ({
  type: DELETE_APPOINTMENT,
  payload: appointment,
});

export const deleteAppointmentSuccess = appointment => ({
  type: DELETE_APPOINTMENT_SUCCESS,
  payload: appointment,
});

export const deleteAppointmentFail = error => ({
  type: DELETE_APPOINTMENT_FAIL,
  payload: error,
});