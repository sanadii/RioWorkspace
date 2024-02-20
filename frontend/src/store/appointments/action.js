import {
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  GET_SCHEDULE,
  GET_APPOINTMENTS,
  GET_APPOINTMENT,
  UPDATE_APPOINTMENT,
  UPDATE_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_FAIL,
  ADD_APPOINTMENT,
  ADD_APPOINTMENT_SUCCESS,
  ADD_APPOINTMENT_FAIL,
  DELETE_APPOINTMENT,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAIL,

  GET_APPOINTMENT_SERVICES,
  UPDATE_APPOINTMENT_SERVICE,
  UPDATE_APPOINTMENT_SERVICE_SUCCESS,
  UPDATE_APPOINTMENT_SERVICE_FAIL,
  ADD_APPOINTMENT_SERVICE,
  ADD_APPOINTMENT_SERVICE_SUCCESS,
  ADD_APPOINTMENT_SERVICE_FAIL,
  DELETE_APPOINTMENT_SERVICE,
  DELETE_APPOINTMENT_SERVICE_SUCCESS,
  DELETE_APPOINTMENT_SERVICE_FAIL,
} from "./actionType";


// Appointments
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

export const getSchedule = () => ({
  type: GET_SCHEDULE,
});

export const getAppointments = () => ({
  type: GET_APPOINTMENTS,
});

export const getAppointment = (appointment) => ({
  type: GET_APPOINTMENT,
  payload: appointment,

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

// AppointmentServices
// common success
export const AppointmentServiceApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const AppointmentServiceApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getAppointmentServices = () => ({
  type: GET_APPOINTMENT_SERVICES,
});

export const updateAppointmentService = appointmentService => ({
  type: UPDATE_APPOINTMENT_SERVICE,
  payload: appointmentService,
});

export const updateAppointmentServiceSuccess = appointmentService => ({
  type: UPDATE_APPOINTMENT_SERVICE_SUCCESS,
  payload: appointmentService,
});

export const updateAppointmentServiceFail = error => ({
  type: UPDATE_APPOINTMENT_SERVICE_FAIL,
  payload: error,
});

export const addAppointmentService = appointmentService => ({
  type: ADD_APPOINTMENT_SERVICE,
  payload: appointmentService,
});

export const addAppointmentServiceSuccess = appointmentService => ({
  type: ADD_APPOINTMENT_SERVICE_SUCCESS,
  payload: appointmentService,
});

export const addAppointmentServiceFail = error => ({
  type: ADD_APPOINTMENT_SERVICE_FAIL,
  payload: error,
});

export const deleteAppointmentService = appointmentService => ({
  type: DELETE_APPOINTMENT_SERVICE,
  payload: appointmentService,
});

export const deleteAppointmentServiceSuccess = appointmentService => ({
  type: DELETE_APPOINTMENT_SERVICE_SUCCESS,
  payload: appointmentService,
});

export const deleteAppointmentServiceFail = error => ({
  type: DELETE_APPOINTMENT_SERVICE_FAIL,
  payload: error,
});