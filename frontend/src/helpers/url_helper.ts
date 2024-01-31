// Authentications
export const POST_LOGIN = "/account/signin";
export const POST_JWT_LOGIN = "/account/userLogin";
export const POST_PASSWORD_FORGET = "/account/forgot-password";
export const POST_JWT_PASSWORD_FORGET = "/account/forget-pwd";
export const POST_REGISTER = "/account/signup";


// USERS
export const GET_USERS = "/account/getUsers";
export const GET_CURRENT_USER = "/account/getCurrentUser";
export const GET_USER_DETAILS = "/account/getUserDetails";
export const ADD_NEW_USER = "/account/addNewUser";
export const UPDATE_USER_PROFILE = "/account/updateUser";
export const CHANGE_USER_PASSWORD = "/account/changeUserPassword";
export const DELETE_USER = "/account/deleteUser";




//REGISTER
export const POST_FAKE_REGISTER = "/auth/signup";

//LOGIN
export const POST_FAKE_LOGIN = "/auth/signin";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_PASSWORD_FORGET = "/auth/forgot-password";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/user";


// DailyRevenue
export const GET_DAILY_REVENUES = "/finance/getDailyRevenues";
export const ADD_NEW_DAILY_REVENUE = "/finance/addNewDailyRevenue";
export const UPDATE_DAILY_REVENUE = "/finance/editDailyRevenue";
export const DELETE_DAILY_REVENUE = "/finance/deleteDailyRevenue";

// Dashboard Ecommerce
// Revenue
export const GET_ALLREVENUE_DATA = "/allRevenue-data";
export const GET_MONTHREVENUE_DATA = "/monthRevenue-data";
export const GET_HALFYEARREVENUE_DATA = "/halfYearRevenue-data";
export const GET_YEARREVENUE_DATA = "/yearRevenue-data";
