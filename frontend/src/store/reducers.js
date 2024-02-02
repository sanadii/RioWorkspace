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


// Apps
import DailyRevenue from "./dailyRevenues/reducer";
import Expense from "./expenses/reducer";


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
    DailyRevenue,
    Expense,
});

export default rootReducer;