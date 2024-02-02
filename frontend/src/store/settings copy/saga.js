import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// OptionChoice Redux States
import {
  GET_OPTION_CHOICES,
  ADD_OPTION_CHOICE,
  DELETE_OPTION_CHOICE,
  UPDATE_OPTION_CHOICE
} from "./actionType";

import {
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
  getOptionChoices as getOptionChoicesApi,
  addOptionChoice,
  updateOptionChoice,
  deleteOptionChoice
} from "helpers/backend_helper";

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

function* OptionChoiceSaga() {
  yield all([
    fork(watchGetOptionChoices),
    fork(watchAddOptionChoice),
    fork(watchDeleteOptionChoice),
    fork(watchUpdateOptionChoice),
  ]);
}

export default OptionChoiceSaga;