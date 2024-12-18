import { combineReducers } from "redux";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";
import Users from "./auth/users/reducer";

// Front
import Layout from "./layouts/reducer";
import Apps from "./apps/reducer";
import Settings from "./settings/reducer";

// Calendar
import Calendar from "./calendar/reducer";

// 
// FINANCE
// 
import Revenue from "./revenues/reducer";
import Expense from "./expenses/reducer";
import Invoice from "./invoices/reducer";

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
    Apps,
    Settings,

    // Authentication
    Login,
    Account,
    ForgetPassword,
    Profile,
    Users,

    // Finance
    Revenue,
    Expense,
    Invoice,

    // Calendar
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