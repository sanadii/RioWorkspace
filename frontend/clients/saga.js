import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Client Redux States
import {
  GET_CLIENTS,
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
  addClient,
  updateClient,
  deleteClient
} from "helpers/backend_helper";

function* getClients() {

  try {
    const response = yield call(getClientsApi);
    yield put(ClientApiResponseSuccess(GET_CLIENTS, response.data));
  } catch (error) {
    yield put(ClientApiResponseError(GET_CLIENTS, error));
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

export function* watchGetClients() {
  yield takeEvery(GET_CLIENTS, getClients);
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
    fork(watchAddClient),
    fork(watchDeleteClient),
    fork(watchUpdateClient),
  ]);
}

export default ClientSaga;