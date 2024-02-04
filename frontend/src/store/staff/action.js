import {
  GET_ALL_STAFF,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  UPDATE_STAFF,
  UPDATE_STAFF_SUCCESS,
  UPDATE_STAFF_FAIL,
  ADD_STAFF,
  ADD_STAFF_SUCCESS,
  ADD_STAFF_FAIL,
  DELETE_STAFF,
  DELETE_STAFF_SUCCESS,
  DELETE_STAFF_FAIL,
} from "./actionType";

// common success
export const StaffApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const StaffApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getAllStaff = () => ({
  type: GET_ALL_STAFF,
});

export const updateStaff = staff => ({
  type: UPDATE_STAFF,
  payload: staff,
});

export const updateAllStaffuccess = staff => ({
  type: UPDATE_STAFF_SUCCESS,
  payload: staff,
});

export const updateStaffFail = error => ({
  type: UPDATE_STAFF_FAIL,
  payload: error,
});

export const addStaff = staff => ({
  type: ADD_STAFF,
  payload: staff,
});

export const addAllStaffuccess = staff => ({
  type: ADD_STAFF_SUCCESS,
  payload: staff,
});

export const addStaffFail = error => ({
  type: ADD_STAFF_FAIL,
  payload: error,
});

export const deleteStaff = staff => ({
  type: DELETE_STAFF,
  payload: staff,
});

export const deleteAllStaffuccess = staff => ({
  type: DELETE_STAFF_SUCCESS,
  payload: staff,
});

export const deleteStaffFail = error => ({
  type: DELETE_STAFF_FAIL,
  payload: error,
});