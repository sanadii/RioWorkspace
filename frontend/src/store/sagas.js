import { all, fork } from "redux-saga/effects";

// Authentication
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import UsersSaga from "./auth/users/saga";


// Settings
import LayoutSaga from "./layouts/saga";
import SettingOptionSaga from "./settingOptions/saga";


// Apps - Finance
import DailyRevenueSaga from "./dailyRevenues/saga";
import ExpenseSaga from "./expenses/saga";

export default function* rootSaga() {
  yield all([
    // Authentication
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(UsersSaga),

    // System / Settings
    fork(LayoutSaga),
    fork(SettingOptionSaga),
    
    // Apps - Finance
    fork(DailyRevenueSaga),
    fork(ExpenseSaga)


  ]);
}
