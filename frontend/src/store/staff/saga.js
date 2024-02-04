import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Staff Redux States
import {
  GET_ALL_STAFF,
  ADD_STAFF,
  DELETE_STAFF,
  UPDATE_STAFF
} from "./actionType";

import {
  StaffApiResponseSuccess,
  StaffApiResponseError,
  addAllStaffuccess,
  addStaffFail,
  updateAllStaffuccess,
  updateStaffFail,
  deleteAllStaffuccess,
  deleteStaffFail
} from "./action";

//Include Both Helper File with needed methods
import {
  getAllStaff as getAllStaffApi,
  addStaff,
  updateStaff,
  deleteStaff
} from "helpers/backend_helper";

function* getAllStaff() {

  try {
    const response = yield call(getAllStaffApi);
    yield put(StaffApiResponseSuccess(GET_ALL_STAFF, response.data));
  } catch (error) {
    yield put(StaffApiResponseError(GET_ALL_STAFF, error));
  }
}

function* onAddStaff({ payload: staff }) {
  try {
    const response = yield call(addStaff, staff);

    yield put(addAllStaffuccess(response));
    toast.success("Staff Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addStaffFail(error));
    toast.error("Staff Added Failed", { autoClose: 3000 });
  }
}

function* onUpdateStaff({ payload: staff }) {
  try {
    const response = yield call(updateStaff, staff);
    yield put(updateAllStaffuccess(response));
    toast.success("Staff Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateStaffFail(error));
    toast.error("Staff Updated Failed", { autoClose: 3000 });
  }
}

function* onDeleteStaff({ payload: staff }) {
  try {
    const response = yield call(deleteStaff, staff);
    yield put(deleteAllStaffuccess({ staff, ...response }));
    toast.success("Staff Delete Successfully", { autoClose: 3000 });

  } catch (error) {
    yield put(deleteStaffFail(error));
    toast.error("Staff Delete Failed", { autoClose: 3000 });
  }
}

export function* watchGetAllStaff() {
  yield takeEvery(GET_ALL_STAFF, getAllStaff);
}

export function* watchUpdateStaff() {
  yield takeEvery(UPDATE_STAFF, onUpdateStaff);
}

export function* watchDeleteStaff() {
  yield takeEvery(DELETE_STAFF, onDeleteStaff);
}

export function* watchAddStaff() {
  yield takeEvery(ADD_STAFF, onAddStaff);
}

function* AllStaffaga() {
  yield all([
    fork(watchGetAllStaff),
    fork(watchAddStaff),
    fork(watchDeleteStaff),
    fork(watchUpdateStaff),
  ]);
}

export default AllStaffaga;