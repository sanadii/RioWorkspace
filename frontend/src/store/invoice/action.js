import {
  GET_REVENUES,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  UPDATE_REVENUE,
  UPDATE_REVENUE_SUCCESS,
  UPDATE_REVENUE_FAIL,
  ADD_REVENUE,
  ADD_REVENUE_SUCCESS,
  ADD_REVENUE_FAIL,
  DELETE_REVENUE,
  DELETE_REVENUE_SUCCESS,
  DELETE_REVENUE_FAIL,
} from "./actionType";

// common success
export const RevenueApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const RevenueApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getRevenues = () => ({
  type: GET_REVENUES,
});

export const updateRevenue = dailyRevenue => ({
  type: UPDATE_REVENUE,
  payload: dailyRevenue,
});

export const updateRevenueSuccess = dailyRevenue => ({
  type: UPDATE_REVENUE_SUCCESS,
  payload: dailyRevenue,
});

export const updateRevenueFail = error => ({
  type: UPDATE_REVENUE_FAIL,
  payload: error,
});

export const addRevenue = dailyRevenue => ({
  type: ADD_REVENUE,
  payload: dailyRevenue,
});

export const addRevenueSuccess = dailyRevenue => ({
  type: ADD_REVENUE_SUCCESS,
  payload: dailyRevenue,
});

export const addRevenueFail = error => ({
  type: ADD_REVENUE_FAIL,
  payload: error,
});

export const deleteRevenue = dailyRevenue => ({
  type: DELETE_REVENUE,
  payload: dailyRevenue,
});

export const deleteRevenueSuccess = dailyRevenue => ({
  type: DELETE_REVENUE_SUCCESS,
  payload: dailyRevenue,
});

export const deleteRevenueFail = error => ({
  type: DELETE_REVENUE_FAIL,
  payload: error,
});