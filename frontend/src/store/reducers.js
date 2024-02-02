import { combineReducers } from "redux";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";
import Users from "./auth/users/reducer";

// Front
import Layout from "./layouts/reducer";
import SettingOptions from "./settingOptions/reducer";


// Apps - Finance
import Revenue from "./revenues/reducer";
import Expense from "./expenses/reducer";

// Apps - Appointments
import Appointments from "./appointments/reducer";


// Apps - Services
import Service from "./services/reducer";


//API Key
const rootReducer = combineReducers({

    // Theme
    Layout,
    SettingOptions,

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

    // Services
    Service,


});

export default rootReducer;