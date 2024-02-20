import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Client Redux States
import {
  GET_CLIENTS,
  GET_CLIENT_SEARCH,
  GET_CLIENT,
  ADD_CLIENT,
  DELETE_CLIENT,
  UPDATE_CLIENT
} from "./actionType";

import {
  ClientApiResponseSuccess,
  ClientApiResponseError,
  addClientSuccess,
  addClientFail,
  updateClientSuccess,
  updateClientFail,
  deleteClientSuccess,
  deleteClientFail
} from "./action";

//Include Both Helper File with needed methods
import {
  getClients as getClientsApi,
  getClientSearch as getClientSearchApi,
  getClient as getClientApi,
  addClient,
  updateClient,
  deleteClient
} from "helpers/backend_helper";

function* getClients({ payload: client }) {

  try {
    const response = yield call(getClientsApi, client);
    yield put(ClientApiResponseSuccess(GET_CLIENTS, response.data));
  } catch (error) {
    yield put(ClientApiResponseError(GET_CLIENTS, error));
  }
}

function* getClientSearch({ payload: client }) {
  try {
    const response = yield call(getClientSearchApi, client);
    yield put(ClientApiResponseSuccess(GET_CLIENT_SEARCH, response.data));
  } catch (error) {
    yield put(ClientApiResponseError(GET_CLIENT_SEARCH, error));
  }
}

function* getClient({ payload: client }) {
  try {
    const response = yield call(getClientApi, client);
    yield put(ClientApiResponseSuccess(GET_CLIENT, response.data));
  } catch (error) {
    yield put(ClientApiResponseError(GET_CLIENT, error));
  }
}

function* onAddClient({ payload: client }) {
  try {
    const response = yield call(addClient, client);

    yield put(addClientSuccess(response));
    toast.success("Client Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addClientFail(error));
    toast.error("Client Added Failed", { autoClose: 3000 });
  }
}

function* onUpdateClient({ payload: client }) {
  try {
    const response = yield call(updateClient, client);
    yield put(updateClientSuccess(response));
    toast.success("Client Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateClientFail(error));
    toast.error("Client Updated Failed", { autoClose: 3000 });
  }
}

function* onDeleteClient({ payload: client }) {
  try {
    const response = yield call(deleteClient, client);
    yield put(deleteClientSuccess({ client, ...response }));
    toast.success("Client Delete Successfully", { autoClose: 3000 });

  } catch (error) {
    yield put(deleteClientFail(error));
    toast.error("Client Delete Failed", { autoClose: 3000 });
  }
}

// Whatchers
export function* watchGetClients() {
  yield takeEvery(GET_CLIENTS, getClients);
}


export function* watchGetClientSearch() {
  yield takeEvery(GET_CLIENT_SEARCH, getClientSearch);
}

export function* watchGetClient() {
  yield takeEvery(GET_CLIENT, getClient);
}

export function* watchUpdateClient() {
  yield takeEvery(UPDATE_CLIENT, onUpdateClient);
}

export function* watchDeleteClient() {
  yield takeEvery(DELETE_CLIENT, onDeleteClient);
}

export function* watchAddClient() {
  yield takeEvery(ADD_CLIENT, onAddClient);
}

function* ClientSaga() {
  yield all([
    fork(watchGetClients),
    fork(watchGetClientSearch),
    fork(watchGetClient),
    fork(watchAddClient),
    fork(watchDeleteClient),
    fork(watchUpdateClient),
  ]);
}

export default ClientSaga;