import {
  GET_SETTING_OPTIONS,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  UPDATE_SETTING_OPTION,
  UPDATE_SETTING_OPTION_SUCCESS,
  UPDATE_SETTING_OPTION_FAIL,
} from "./actionType";

// common success
export const SettingOptionApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const SettingOptionApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getSettingOptions = () => ({
  type: GET_SETTING_OPTIONS,
});

export const updateSettingOption = settingOption => ({
  type: UPDATE_SETTING_OPTION,
  payload: settingOption,
});

export const updateSettingOptionsuccess = settingOption => ({
  type: UPDATE_SETTING_OPTION_SUCCESS,
  payload: settingOption,
});

export const updateSettingOptionFail = error => ({
  type: UPDATE_SETTING_OPTION_FAIL,
  payload: error,
});