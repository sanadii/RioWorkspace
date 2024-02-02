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
export const ADD_USER = "/account/addUser";
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
export const ADD_DAILY_REVENUE = "/finance/addDailyRevenue";
export const UPDATE_DAILY_REVENUE = "/finance/updateDailyRevenue";
export const DELETE_DAILY_REVENUE = "/finance/deleteDailyRevenue";

// Expenses
export const GET_EXPENSES = "/finance/getExpenses";
export const ADD_EXPENSE = "/finance/addExpense";
export const UPDATE_EXPENSE = "/finance/updateExpense";
export const DELETE_EXPENSE = "/finance/deleteExpense";



// Setting
export const GET_SETTING_OPTIONS = "/settings/getSettingOptions";

// Option Categories
export const GET_OPTION_CATEGORIES = "/settings/getOptionCategories";
export const ADD_OPTION_CATEGORY = "/settings/addOptionCategory";
export const UPDATE_OPTION_CATEGORY = "/settings/updateOptionCategory";
export const DELETE_OPTION_CATEGORY = "/finance/deleteOptionCategory";

// Option Choices
export const GET_OPTION_CHOICES = "/settings/getOptionChoices";
export const ADD_OPTION_CHOICE = "/settings/addOptionChoice";
export const UPDATE_OPTION_CHOICE = "/settings/updateOptionChoice";
export const DELETE_OPTION_CHOICE = "/settings/deleteOptionChoice";
