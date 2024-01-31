import {
  GET_DAILY_REVENUES,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  UPDATE_DAILY_REVENUE,
  UPDATE_DAILY_REVENUE_SUCCESS,
  UPDATE_DAILY_REVENUE_FAIL,
  ADD_NEW_DAILY_REVENUE,
  ADD_DAILY_REVENUE_SUCCESS,
  ADD_DAILY_REVENUE_FAIL,
  DELETE_DAILY_REVENUE,
  DELETE_DAILY_REVENUE_SUCCESS,
  DELETE_DAILY_REVENUE_FAIL,
} from "./actionType";

// common success
export const DailyRevenueApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const DailyRevenueApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getDailyRevenues = () => ({
  type: GET_DAILY_REVENUES,
});

export const updateDailyRevenue = dailyRevenue => ({
  type: UPDATE_DAILY_REVENUE,
  payload: dailyRevenue,
});

export const updateDailyRevenueSuccess = dailyRevenue => ({
  type: UPDATE_DAILY_REVENUE_SUCCESS,
  payload: dailyRevenue,
});

export const updateDailyRevenueFail = error => ({
  type: UPDATE_DAILY_REVENUE_FAIL,
  payload: error,
});

export const addNewDailyRevenue = dailyRevenue => ({
  type: ADD_NEW_DAILY_REVENUE,
  payload: dailyRevenue,
});

export const addDailyRevenueSuccess = dailyRevenue => ({
  type: ADD_DAILY_REVENUE_SUCCESS,
  payload: dailyRevenue,
});

export const addDailyRevenueFail = error => ({
  type: ADD_DAILY_REVENUE_FAIL,
  payload: error,
});

export const deleteDailyRevenue = dailyRevenue => ({
  type: DELETE_DAILY_REVENUE,
  payload: dailyRevenue,
});

export const deleteDailyRevenueSuccess = dailyRevenue => ({
  type: DELETE_DAILY_REVENUE_SUCCESS,
  payload: dailyRevenue,
});

export const deleteDailyRevenueFail = error => ({
  type: DELETE_DAILY_REVENUE_FAIL,
  payload: error,
});