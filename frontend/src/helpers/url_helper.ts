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


// Calendar
export const GET_EVENTS = "/events";
export const GET_CATEGORIES = "/categories";
export const GET_UPCOMMINGEVENT = "/upcommingevents";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";

// Revenue
export const GET_REVENUES = "/finance/getRevenues";
export const ADD_REVENUE = "/finance/addRevenue";
export const UPDATE_REVENUE = "/finance/updateRevenue";
export const DELETE_REVENUE = "/finance/deleteRevenue";

// Expenses
export const GET_EXPENSES = "/finance/getExpenses";
export const ADD_EXPENSE = "/finance/addExpense";
export const UPDATE_EXPENSE = "/finance/updateExpense";
export const DELETE_EXPENSE = "/finance/deleteExpense";



// Schedule
export const GET_SCHEDULE = "/appointments/getSchedule";

// Appointments
export const GET_APPOINTMENTS = "/appointments/getAppointments";
export const GET_APPOINTMENT = "/appointments/getAppointment";
export const ADD_APPOINTMENT = "/appointments/addAppointment";
export const UPDATE_APPOINTMENT = "/appointments/updateAppointment";
export const DELETE_APPOINTMENT = "/appointments/deleteAppointment";

// AppointmentServices
export const GET_APPOINTMENT_SERVICES = "/appointments/getAppointmentServices";
export const ADD_APPOINTMENT_SERVICE = "/appointments/addAppointmentService";
export const UPDATE_APPOINTMENT_SERVICE = "/appointments/updateAppointmentService";
export const DELETE_APPOINTMENT_SERVICE = "/appointments/deleteAppointmentService";

// Clients
export const GET_CLIENTS = "/clients/getClients";
export const GET_CLIENT_SEARCH = "/clients/getClientSearch";
export const GET_CLIENT = "/clients/getClient";
export const ADD_CLIENT = "/clients/addClient";
export const UPDATE_CLIENT = "/clients/updateClient";
export const DELETE_CLIENT = "/clients/deleteClient";


// Services
export const GET_SERVICES = "/services/getServices";
export const ADD_SERVICE = "/services/addService";
export const UPDATE_SERVICE = "/services/updateService";
export const DELETE_SERVICE = "/services/deleteService";

// Resources
export const GET_RESOURCES = "/resources/getResources";
export const ADD_RESOURCE = "/resources/addResource";
export const UPDATE_RESOURCE = "/resources/updateResource";
export const DELETE_RESOURCE = "/resources/deleteResource";


// AllStaff
export const GET_ALL_STAFF = "/staff/getAllStaff";
export const ADD_STAFF = "/staff/addStaff";
export const UPDATE_STAFF = "/staff/updateStaff";
export const DELETE_STAFF = "/staff/deleteStaff";



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
