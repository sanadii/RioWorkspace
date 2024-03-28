import { all, fork } from "redux-saga/effects";

// Authentication
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import UsersSaga from "./auth/users/saga";


// Settings
import LayoutSaga from "./layouts/saga";
import SettingsSaga from "./settings/saga";


// Apps - Finance
import RevenueSaga from "./revenues/saga";
import ExpenseSaga from "./expenses/saga";
import AppointmentSaga from "./appointments/saga";
import CalendarSaga from "./calendar/saga";

// Clients
import ClientSaga from "./clients/saga";

// Services
import ServiceSaga from "./services/saga";
import ResourceSaga from "./resources/saga";

// Staff
import StaffSaga from "./staff/saga";

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
    fork(SettingsSaga),

    // Calendar
    fork(CalendarSaga),

    // Apps - Finance
    fork(RevenueSaga),
    fork(ExpenseSaga),
    fork(AppointmentSaga),

    // Clients
    fork(ClientSaga),

    // Services
    fork(ServiceSaga),
    fork(ResourceSaga),

    // Staff
    fork(StaffSaga),


  ]);
}
