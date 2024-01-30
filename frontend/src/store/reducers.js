import { combineReducers } from "redux";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";
import Users from "./auth/users/reducer";

// Front
import Layout from "./layouts/reducer";


//API Key
const rootReducer = combineReducers({

    // Theme
    Layout,
    Login,
    Account,
    ForgetPassword,
    Profile,
    Users,
});

export default rootReducer;