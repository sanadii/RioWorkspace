import {
  GET_CLIENTS,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  UPDATE_CLIENT,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAIL,
  ADD_CLIENT,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAIL,
  DELETE_CLIENT,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAIL,
} from "./actionType";

// common success
export const RsourceApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const RsourceApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getRsources = () => ({
  type: GET_CLIENTS,
});

export const updateRsource = resource => ({
  type: UPDATE_CLIENT,
  payload: resource,
});

export const updateRsourceSuccess = resource => ({
  type: UPDATE_CLIENT_SUCCESS,
  payload: resource,
});

export const updateRsourceFail = error => ({
  type: UPDATE_CLIENT_FAIL,
  payload: error,
});

export const addRsource = resource => ({
  type: ADD_CLIENT,
  payload: resource,
});

export const addRsourceSuccess = resource => ({
  type: ADD_CLIENT_SUCCESS,
  payload: resource,
});

export const addRsourceFail = error => ({
  type: ADD_CLIENT_FAIL,
  payload: error,
});

export const deleteRsource = resource => ({
  type: DELETE_CLIENT,
  payload: resource,
});

export const deleteRsourceSuccess = resource => ({
  type: DELETE_CLIENT_SUCCESS,
  payload: resource,
});

export const deleteRsourceFail = error => ({
  type: DELETE_CLIENT_FAIL,
  payload: error,
});