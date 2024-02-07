import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Resource Redux States
import {
  GET_RESOURCES,
  ADD_RESOURCE,
  DELETE_RESOURCE,
  UPDATE_RESOURCE
} from "./actionType";

import {
  ResourceApiResponseSuccess,
  ResourceApiResponseError,
  addResourceSuccess,
  addResourceFail,
  updateResourceSuccess,
  updateResourceFail,
  deleteResourceSuccess,
  deleteResourceFail
} from "./action";

//Include Both Helper File with needed methods
import {
  getResources as getResourcesApi,
  addResource,
  updateResource,
  deleteResource
} from "helpers/backend_helper";

function* getResources() {

  try {
    const response = yield call(getResourcesApi);
    yield put(ResourceApiResponseSuccess(GET_RESOURCES, response.data));
  } catch (error) {
    yield put(ResourceApiResponseError(GET_RESOURCES, error));
  }
}

function* onAddResource({ payload: resource }) {
  try {
    const response = yield call(addResource, resource);

    yield put(addResourceSuccess(response));
    toast.success("Resource Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addResourceFail(error));
    toast.error("Resource Added Failed", { autoClose: 3000 });
  }
}

function* onUpdateResource({ payload: resource }) {
  try {
    const response = yield call(updateResource, resource);
    yield put(updateResourceSuccess(response));
    toast.success("Resource Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateResourceFail(error));
    toast.error("Resource Updated Failed", { autoClose: 3000 });
  }
}

function* onDeleteResource({ payload: resource }) {
  try {
    const response = yield call(deleteResource, resource);
    yield put(deleteResourceSuccess({ resource, ...response }));
    toast.success("Resource Delete Successfully", { autoClose: 3000 });

  } catch (error) {
    yield put(deleteResourceFail(error));
    toast.error("Resource Delete Failed", { autoClose: 3000 });
  }
}

export function* watchGetResources() {
  yield takeEvery(GET_RESOURCES, getResources);
}

export function* watchUpdateResource() {
  yield takeEvery(UPDATE_RESOURCE, onUpdateResource);
}

export function* watchDeleteResource() {
  yield takeEvery(DELETE_RESOURCE, onDeleteResource);
}

export function* watchAddResource() {
  yield takeEvery(ADD_RESOURCE, onAddResource);
}

function* ResourceSaga() {
  yield all([
    fork(watchGetResources),
    fork(watchAddResource),
    fork(watchDeleteResource),
    fork(watchUpdateResource),
  ]);
}

export default ResourceSaga;