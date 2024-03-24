import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// SettingOption Redux States
import {
  GET_SETTING_OPTIONS,
  UPDATE_SETTING_OPTION
} from "./actionType";

import {
  SettingOptionApiResponseSuccess,
  SettingOptionApiResponseError,
  updateSettingOptionsuccess,
  updateSettingOptionFail,
} from "./action";

//Include Both Helper File with needed methods
import {
  getSettingOptions as getSettingOptionsApi,
  updateSettingOption,
} from "helpers/backend_helper";

function* getSettingOptions() {

  try {
    const response = yield call(getSettingOptionsApi);
    yield put(SettingOptionApiResponseSuccess(GET_SETTING_OPTIONS, response.data));
  } catch (error) {
    yield put(SettingOptionApiResponseError(GET_SETTING_OPTIONS, error));
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

export function* watchGetSettingOptions() {
  yield takeEvery(GET_SETTING_OPTIONS, getSettingOptions);
}

export function* watchUpdateSettingOption() {
  yield takeEvery(UPDATE_SETTING_OPTION, onUpdateSettingOption);
}

function* SettingOptionsaga() {
  yield all([
    fork(watchGetSettingOptions),
    fork(watchUpdateSettingOption),
  ]);
}

export default SettingOptionsaga;