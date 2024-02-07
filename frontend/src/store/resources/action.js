import {
  GET_RESOURCES,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  UPDATE_RESOURCE,
  UPDATE_RESOURCE_SUCCESS,
  UPDATE_RESOURCE_FAIL,
  ADD_RESOURCE,
  ADD_RESOURCE_SUCCESS,
  ADD_RESOURCE_FAIL,
  DELETE_RESOURCE,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_FAIL,
} from "./actionType";

// common success
export const ResourceApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const ResourceApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getResources = () => ({
  type: GET_RESOURCES,
});

export const updateResource = resource => ({
  type: UPDATE_RESOURCE,
  payload: resource,
});

export const updateResourceSuccess = resource => ({
  type: UPDATE_RESOURCE_SUCCESS,
  payload: resource,
});

export const updateResourceFail = error => ({
  type: UPDATE_RESOURCE_FAIL,
  payload: error,
});

export const addResource = resource => ({
  type: ADD_RESOURCE,
  payload: resource,
});

export const addResourceSuccess = resource => ({
  type: ADD_RESOURCE_SUCCESS,
  payload: resource,
});

export const addResourceFail = error => ({
  type: ADD_RESOURCE_FAIL,
  payload: error,
});

export const deleteResource = resource => ({
  type: DELETE_RESOURCE,
  payload: resource,
});

export const deleteResourceSuccess = resource => ({
  type: DELETE_RESOURCE_SUCCESS,
  payload: resource,
});

export const deleteResourceFail = error => ({
  type: DELETE_RESOURCE_FAIL,
  payload: error,
});