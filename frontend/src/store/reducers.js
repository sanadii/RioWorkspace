import { combineReducers } from "redux";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";
import Users from "./auth/users/reducer";

// Front
import Layout from "./layouts/reducer";
import SettingChoices from "./settingChoices/reducer";
import SettingOptions from "./settingOptions/reducer";

// Calendar
import Calendar from "./calendar/reducer";

// Apps - Finance
import Revenue from "./revenues/reducer";
import Expense from "./expenses/reducer";

// Apps - Appointments
import Appointments from "./appointments/reducer";

// Reducer
import Client from "./clients/reducer";

// Apps - Services
import Service from "./services/reducer";
import Resource from "./resources/reducer";


// Staff
import Staff from "./staff/reducer";



//API Key
const rootReducer = combineReducers({

    // Theme
    Layout,
    SettingOptions,
    SettingChoices,

    // Authentication
    Login,
    Account,
    ForgetPassword,
    Profile,
    Users,

    // Apps
    Revenue,
    Expense,
    Appointments,
    Calendar,

    // Services
    Service,
    Resource,

    // Clients
    Client,
    Staff,
});

export default rootReducer;