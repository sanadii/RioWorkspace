import {
  GET_SERVICES,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  UPDATE_SERVICE,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAIL,
  ADD_SERVICE,
  ADD_SERVICE_SUCCESS,
  ADD_SERVICE_FAIL,
  DELETE_SERVICE,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAIL,
} from "./actionType";

// common success
export const ServiceApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const ServiceApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getServices = () => ({
  type: GET_SERVICES,
});

export const updateService = service => ({
  type: UPDATE_SERVICE,
  payload: service,
});

export const updateServiceSuccess = service => ({
  type: UPDATE_SERVICE_SUCCESS,
  payload: service,
});

export const updateServiceFail = error => ({
  type: UPDATE_SERVICE_FAIL,
  payload: error,
});

export const addService = service => ({
  type: ADD_SERVICE,
  payload: service,
});

export const addServiceSuccess = service => ({
  type: ADD_SERVICE_SUCCESS,
  payload: service,
});

export const addServiceFail = error => ({
  type: ADD_SERVICE_FAIL,
  payload: error,
});

export const deleteService = service => ({
  type: DELETE_SERVICE,
  payload: service,
});

export const deleteServiceSuccess = service => ({
  type: DELETE_SERVICE_SUCCESS,
  payload: service,
});

export const deleteServiceFail = error => ({
  type: DELETE_SERVICE_FAIL,
  payload: error,
});