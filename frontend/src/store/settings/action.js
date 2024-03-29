import {
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  GET_SETTINGS,

  
  GET_SETTING_OPTIONS,
  UPDATE_SETTING_OPTION,
  UPDATE_SETTING_OPTION_SUCCESS,
  UPDATE_SETTING_OPTION_FAIL,

  
  GET_OPTION_CATEGORIES,
  UPDATE_OPTION_CATEGORY,
  UPDATE_OPTION_CATEGORY_SUCCESS,
  UPDATE_OPTION_CATEGORY_FAIL,
  ADD_OPTION_CATEGORY,
  ADD_OPTION_CATEGORY_SUCCESS,
  ADD_OPTION_CATEGORY_FAIL,
  DELETE_OPTION_CATEGORY,
  DELETE_OPTION_CATEGORY_SUCCESS,
  DELETE_OPTION_CATEGORY_FAIL,

  GET_OPTION_CHOICES,
  UPDATE_OPTION_CHOICE,
  UPDATE_OPTION_CHOICE_SUCCESS,
  UPDATE_OPTION_CHOICE_FAIL,
  ADD_OPTION_CHOICE,
  ADD_OPTION_CHOICE_SUCCESS,
  ADD_OPTION_CHOICE_FAIL,
  DELETE_OPTION_CHOICE,
  DELETE_OPTION_CHOICE_SUCCESS,
  DELETE_OPTION_CHOICE_FAIL,
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



// Setting Option Choices
// common success
export const getSettingApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const getSettingApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});


// common success
export const OptionCategoryApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const OptionCategoryApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getSettings = () => ({
  type: GET_SETTINGS,
});


// Setting Options Categories
export const getOptionCategories = () => ({
  type: GET_OPTION_CATEGORIES,
});

export const updateOptionCategory = optionCategory => ({
  type: UPDATE_OPTION_CATEGORY,
  payload: optionCategory,
});

export const updateOptionCategorySuccess = optionCategory => ({
  type: UPDATE_OPTION_CATEGORY_SUCCESS,
  payload: optionCategory,
});

export const updateOptionCategoryFail = error => ({
  type: UPDATE_OPTION_CATEGORY_FAIL,
  payload: error,
});

export const addOptionCategory = optionCategory => ({
  type: ADD_OPTION_CATEGORY,
  payload: optionCategory,
});

export const addOptionCategorySuccess = optionCategory => ({
  type: ADD_OPTION_CATEGORY_SUCCESS,
  payload: optionCategory,
});

export const addOptionCategoryFail = error => ({
  type: ADD_OPTION_CATEGORY_FAIL,
  payload: error,
});

export const deleteOptionCategory = optionCategory => ({
  type: DELETE_OPTION_CATEGORY,
  payload: optionCategory,
});

export const deleteOptionCategorySuccess = optionCategory => ({
  type: DELETE_OPTION_CATEGORY_SUCCESS,
  payload: optionCategory,
});

export const deleteOptionCategoryFail = error => ({
  type: DELETE_OPTION_CATEGORY_FAIL,
  payload: error,
});


// OptionChoices
// common success
export const OptionChoiceApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const OptionChoiceApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getOptionChoices = () => ({
  type: GET_OPTION_CHOICES,
});

export const updateOptionChoice = optionChoice => ({
  type: UPDATE_OPTION_CHOICE,
  payload: optionChoice,
});

export const updateOptionChoiceSuccess = optionChoice => ({
  type: UPDATE_OPTION_CHOICE_SUCCESS,
  payload: optionChoice,
});

export const updateOptionChoiceFail = error => ({
  type: UPDATE_OPTION_CHOICE_FAIL,
  payload: error,
});

export const addOptionChoice = optionChoice => ({
  type: ADD_OPTION_CHOICE,
  payload: optionChoice,
});

export const addOptionChoiceSuccess = optionChoice => ({
  type: ADD_OPTION_CHOICE_SUCCESS,
  payload: optionChoice,
});

export const addOptionChoiceFail = error => ({
  type: ADD_OPTION_CHOICE_FAIL,
  payload: error,
});

export const deleteOptionChoice = optionChoice => ({
  type: DELETE_OPTION_CHOICE,
  payload: optionChoice,
});

export const deleteOptionChoiceSuccess = optionChoice => ({
  type: DELETE_OPTION_CHOICE_SUCCESS,
  payload: optionChoice,
});

export const deleteOptionChoiceFail = error => ({
  type: DELETE_OPTION_CHOICE_FAIL,
  payload: error,
});