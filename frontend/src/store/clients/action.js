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
export const ClientApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const ClientApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getClients = () => ({
  type: GET_CLIENTS,
});

export const updateClient = client => ({
  type: UPDATE_CLIENT,
  payload: client,
});

export const updateClientSuccess = client => ({
  type: UPDATE_CLIENT_SUCCESS,
  payload: client,
});

export const updateClientFail = error => ({
  type: UPDATE_CLIENT_FAIL,
  payload: error,
});

export const addClient = client => ({
  type: ADD_CLIENT,
  payload: client,
});

export const addClientSuccess = client => ({
  type: ADD_CLIENT_SUCCESS,
  payload: client,
});

export const addClientFail = error => ({
  type: ADD_CLIENT_FAIL,
  payload: error,
});

export const deleteClient = client => ({
  type: DELETE_CLIENT,
  payload: client,
});

export const deleteClientSuccess = client => ({
  type: DELETE_CLIENT_SUCCESS,
  payload: client,
});

export const deleteClientFail = error => ({
  type: DELETE_CLIENT_FAIL,
  payload: error,
});