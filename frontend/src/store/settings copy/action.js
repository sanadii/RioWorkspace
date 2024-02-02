import {
  GET_OPTION_CHOICES,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

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