import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// SettingOption Redux States
import {
  // Setting
  GET_SETTINGS,

  // Setting Options
  GET_SETTING_OPTIONS,
  UPDATE_SETTING_OPTION,

  // Option Categories
  GET_OPTION_CATEGORIES,
  ADD_OPTION_CATEGORY,
  DELETE_OPTION_CATEGORY,
  UPDATE_OPTION_CATEGORY,

  // Option Choices
  GET_OPTION_CHOICES,
  ADD_OPTION_CHOICE,
  DELETE_OPTION_CHOICE,
  UPDATE_OPTION_CHOICE

} from "./actionType";

import {

  // Settings
  getSettingApiResponseSuccess,
  getSettingApiResponseError,

  // Setting Options
  updateSettingOptionFail,
  updateSettingOptionsuccess,

  // Setting Option Categories
  OptionCategoryApiResponseSuccess,
  OptionCategoryApiResponseError,
  addOptionCategorySuccess,
  addOptionCategoryFail,
  updateOptionCategorySuccess,
  updateOptionCategoryFail,
  deleteOptionCategorySuccess,
  deleteOptionCategoryFail,

  // Option Choices
  OptionChoiceApiResponseSuccess,
  OptionChoiceApiResponseError,
  addOptionChoiceSuccess,
  addOptionChoiceFail,
  updateOptionChoiceSuccess,
  updateOptionChoiceFail,
  deleteOptionChoiceSuccess,
  deleteOptionChoiceFail

} from "./action";

//Include Both Helper File with needed methods
import {
  getSettings as getSettingApi,

  // Setting Options
  getSettingOptions as getSettingOptionsApi,
  updateSettingOption,

  // Setting Option Categories
  getOptionCategories as getOptionCategoriesApi,
  addOptionCategory,
  updateOptionCategory,
  deleteOptionCategory,

  // Setting Option Choices
  getOptionChoices as getOptionChoicesApi,
  addOptionChoice,
  updateOptionChoice,
  deleteOptionChoice

} from "helpers/backend_helper";

// Settings

function* getSettings() {

  try {
    const response = yield call(getSettingApi);
    yield put(getSettingApiResponseSuccess(GET_SETTINGS, response.data));
  } catch (error) {
    yield put(getSettingApiResponseError(GET_SETTINGS, error));
  }
}

// Setting Options
function* getSettingOptions() {

  try {
    const response = yield call(getSettingOptionsApi);
    yield put(getSettingApiResponseSuccess(GET_SETTING_OPTIONS, response.data));
  } catch (error) {
    yield put(updateSettingOptionFail(GET_SETTING_OPTIONS, error));
  }
}

function* onUpdateSettingOption({ payload: settingOption }) {
  try {
    const response = yield call(updateSettingOption, settingOption);
    yield put(updateSettingOptionsuccess(response));
    toast.success("SettingOption Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateSettingOptionFail(error));
    toast.error("SettingOption Updated Failed", { autoClose: 3000 });
  }
}

// Option Categories
function* getOptionCategories() {

  try {
    const response = yield call(getOptionCategoriesApi);
    yield put(OptionCategoryApiResponseSuccess(GET_OPTION_CATEGORIES, response.data));
  } catch (error) {
    yield put(OptionCategoryApiResponseError(GET_OPTION_CATEGORIES, error));
  }
}

function* onAddOptionCategory({ payload: optionCategory }) {
  try {
    const response = yield call(addOptionCategory, optionCategory);

    yield put(addOptionCategorySuccess(response));
    toast.success("OptionCategory Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addOptionCategoryFail(error));
    toast.error("OptionCategory Added Failed", { autoClose: 3000 });
  }
}

function* onUpdateOptionCategory({ payload: optionCategory }) {
  try {
    const response = yield call(updateOptionCategory, optionCategory);
    yield put(updateOptionCategorySuccess(response));
    toast.success("OptionCategory Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateOptionCategoryFail(error));
    toast.error("OptionCategory Updated Failed", { autoClose: 3000 });
  }
}

function* onDeleteOptionCategory({ payload: optionCategory }) {
  try {
    const response = yield call(deleteOptionCategory, optionCategory);
    yield put(deleteOptionCategorySuccess({ optionCategory, ...response }));
    toast.success("OptionCategory Delete Successfully", { autoClose: 3000 });

  } catch (error) {
    yield put(deleteOptionCategoryFail(error));
    toast.error("OptionCategory Delete Failed", { autoClose: 3000 });
  }
}



// Option Choices
function* getOptionChoices() {

  try {
    const response = yield call(getOptionChoicesApi);
    yield put(OptionChoiceApiResponseSuccess(GET_OPTION_CHOICES, response.data));
  } catch (error) {
    yield put(OptionChoiceApiResponseError(GET_OPTION_CHOICES, error));
  }
}

function* onAddOptionChoice({ payload: optionChoice }) {
  try {
    const response = yield call(addOptionChoice, optionChoice);

    yield put(addOptionChoiceSuccess(response));
    toast.success("OptionChoice Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addOptionChoiceFail(error));
    toast.error("OptionChoice Added Failed", { autoClose: 3000 });
  }
}

function* onUpdateOptionChoice({ payload: optionChoice }) {
  try {
    const response = yield call(updateOptionChoice, optionChoice);
    yield put(updateOptionChoiceSuccess(response));
    toast.success("OptionChoice Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateOptionChoiceFail(error));
    toast.error("OptionChoice Updated Failed", { autoClose: 3000 });
  }
}

function* onDeleteOptionChoice({ payload: optionChoice }) {
  try {
    const response = yield call(deleteOptionChoice, optionChoice);
    yield put(deleteOptionChoiceSuccess({ optionChoice, ...response }));
    toast.success("OptionChoice Delete Successfully", { autoClose: 3000 });

  } catch (error) {
    yield put(deleteOptionChoiceFail(error));
    toast.error("OptionChoice Delete Failed", { autoClose: 3000 });
  }
}



// 
// Watchers
// 

// Setting Options
export function* watchGetSettings() {
  yield takeEvery(GET_SETTINGS, getSettings);
}

// setting Options
export function* watchGetSettingOptions() {
  yield takeEvery(GET_SETTING_OPTIONS, getSettingOptions);
}

export function* watchUpdateSettingOption() {
  yield takeEvery(UPDATE_SETTING_OPTION, onUpdateSettingOption);
}


// Option Categories Watchers
export function* watchGetOptionCategories() {
  yield takeEvery(GET_OPTION_CATEGORIES, getOptionCategories);
}

export function* watchUpdateOptionCategory() {
  yield takeEvery(UPDATE_OPTION_CATEGORY, onUpdateOptionCategory);
}

export function* watchDeleteOptionCategory() {
  yield takeEvery(DELETE_OPTION_CATEGORY, onDeleteOptionCategory);
}

export function* watchAddOptionCategory() {
  yield takeEvery(ADD_OPTION_CATEGORY, onAddOptionCategory);
}

// Option Choices Watchers
export function* watchGetOptionChoices() {
  yield takeEvery(GET_OPTION_CHOICES, getOptionChoices);
}

export function* watchUpdateOptionChoice() {
  yield takeEvery(UPDATE_OPTION_CHOICE, onUpdateOptionChoice);
}

export function* watchDeleteOptionChoice() {
  yield takeEvery(DELETE_OPTION_CHOICE, onDeleteOptionChoice);
}

export function* watchAddOptionChoice() {
  yield takeEvery(ADD_OPTION_CHOICE, onAddOptionChoice);
}


function* SettingOptionsaga() {
  yield all([

    // Settings
    fork(watchGetSettings),

    // Setting Options
    fork(watchGetSettingOptions),
    fork(watchUpdateSettingOption),


    // OptionCategories
    fork(watchGetOptionCategories),
    fork(watchAddOptionCategory),
    fork(watchDeleteOptionCategory),
    fork(watchUpdateOptionCategory),

    // OptionChoices
    fork(watchGetOptionChoices),
    fork(watchAddOptionChoice),
    fork(watchDeleteOptionChoice),
    fork(watchUpdateOptionChoice),

  ]);
}

export default SettingOptionsaga;