import { APIClient } from "./api_helper";
import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postFakeRegister = (data : any) => api.create(url.POST_FAKE_REGISTER, data);

// Login Method
export const postFakeLogin = (data : any) => api.create(url.POST_FAKE_LOGIN, data);

// postForgetPwd
export const postFakeForgetPwd = (data : any) => api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = (data : any) => api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postFakeProfile = (data : any) => api.update(url.POST_EDIT_PROFILE + '/' + data.idx, data);


// Register Method
export const postJwtRegister = (url : string, data  :any) => {
  return api.create(url, data)
    .catch(err => {
      var message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message = "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};




// Login Method
export const postJwtLogin = (data : any) => api.create(url.POST_JWT_LOGIN, data);
export const postJwtForgetPwd = (data : any) => api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);
export const postSocialLogin = (data : any) => api.create(url.SOCIAL_LOGIN, data);


// Calendar
export const getEvents = () => api.get(url.GET_EVENTS);
export const getCategories = () => api.get(url.GET_CATEGORIES);
export const getUpCommingEvent = () => api.get(url.GET_UPCOMMINGEVENT);
export const addNewEvent = event => api.create(url.ADD_NEW_EVENT, event);
export const updateEvent = event => api.put(url.UPDATE_EVENT, event);
export const deleteEvent = event => api.delete(url.DELETE_EVENT, { headers: { event } });

// Revenues
export const getRevenues = () => api.get(url.GET_REVENUES);
export const addRevenue = (dailyRevenue : any) => api.create(url.ADD_REVENUE, dailyRevenue);
export const updateRevenue = (dailyRevenue : any) => api.update(url.UPDATE_REVENUE + '/' + dailyRevenue.id, dailyRevenue); //+ '/' + Revenue._id
export const deleteRevenue = (dailyRevenue : any) => api.delete(url.DELETE_REVENUE + '/' + dailyRevenue); //+ '/' + Revenue 

// Expenses
export const getExpenses = () => api.get(url.GET_EXPENSES);
export const addExpense = (expense : any) => api.create(url.ADD_EXPENSE, expense);
export const updateExpense = (expense : any) => api.update(url.UPDATE_EXPENSE + '/' + expense.id, expense); //+ '/' + Expense._id
export const deleteExpense = (expense : any) => api.delete(url.DELETE_EXPENSE + '/' + expense); //+ '/' + Expense 


// Appointments
export const getSchedule = () => api.get(url.GET_SCHEDULE);

// Appointments
// export const getAppointment = () => api.get(url.GET_APPOINTMENT);
export const getAppointments = () => api.get(url.GET_APPOINTMENTS);
export const getAppointment = (appointmentId) => api.get(`${url.GET_APPOINTMENT}/${appointmentId}`);
export const addAppointment = (appointment : any) => api.create(url.ADD_APPOINTMENT, appointment);
export const updateAppointment = (appointment : any) => api.update(url.UPDATE_APPOINTMENT + '/' + appointment.id, appointment); //+ '/' + Appointment._id
export const deleteAppointment = (appointment : any) => api.delete(url.DELETE_APPOINTMENT + '/' + appointment); //+ '/' + Appointment 

// AppointmentServices
export const getAppointmentServices = () => api.get(url.GET_APPOINTMENT_SERVICES);
export const addAppointmentService = (appointmentService : any) => api.create(url.ADD_APPOINTMENT_SERVICE, appointmentService);
export const updateAppointmentService = (appointmentService : any) => api.update(url.UPDATE_APPOINTMENT_SERVICE + '/' + appointmentService.id, appointmentService); //+ '/' + AppointmentService._id
export const deleteAppointmentService = (appointmentService : any) => api.delete(url.DELETE_APPOINTMENT_SERVICE + '/' + appointmentService); //+ '/' + AppointmentService 


// Clients
export const getClients = () => api.get(url.GET_CLIENTS);
export const getClientSearch = (client : any) => api.get(url.GET_CLIENT_SEARCH, client);
export const getClient = (client : any) => api.get(url.GET_CLIENT, client);
export const addClient = (client : any) => api.create(url.ADD_CLIENT, client);
export const updateClient = (client : any) => api.update(url.UPDATE_CLIENT + '/' + client.id, client); //+ '/' + Client._id
export const deleteClient = (client : any) => api.delete(url.DELETE_CLIENT + '/' + client); //+ '/' + Client 


// Services
export const getServices = () => api.get(url.GET_SERVICES);
export const addService = (service : any) => api.create(url.ADD_SERVICE, service);
export const updateService = (service : any) => api.update(url.UPDATE_SERVICE + '/' + service.id, service); //+ '/' + Service._id
export const deleteService = (service : any) => api.delete(url.DELETE_SERVICE + '/' + service); //+ '/' + Service 

// Resources
export const getResources = () => api.get(url.GET_RESOURCES);
export const addResource = (resource : any) => api.create(url.ADD_RESOURCE, resource);
export const updateResource = (resource : any) => api.update(url.UPDATE_RESOURCE + '/' + resource.id, resource); //+ '/' + Resource._id
export const deleteResource = (resource : any) => api.delete(url.DELETE_RESOURCE + '/' + resource); //+ '/' + Resource 


// AllStaff
export const getAllStaff = () => api.get(url.GET_ALL_STAFF);
export const addStaff = (staff : any) => api.create(url.ADD_STAFF, staff);
export const updateStaff = (staff : any) => api.update(url.UPDATE_STAFF + '/' + staff.id, staff); //+ '/' + Staff._id
export const deleteStaff = (staff : any) => api.delete(url.DELETE_STAFF + '/' + staff); //+ '/' + Staff 




// Users
export const getUsers = () => api.get(url.GET_USERS);
export const getCurrentUser = () => api.get(url.GET_CURRENT_USER);
export const getUserDetails = (user : any) => api.get(url.GET_USER_DETAILS + "/" + user.id);
export const addUser = (user : any) => api.create(url.ADD_USER, user);
export const updateUser = (user : any) => api.update(url.UPDATE_USER_PROFILE + "/" + user.id, user);
export const changeUserPassword = (user : any) => api.update(url.CHANGE_USER_PASSWORD + "/" + user.id, user);
export const deleteUser = (user : any) => api.delete(url.DELETE_USER + "/" + user);





// SettingOptions
export const getSettingOptions = () => api.get(url.GET_SETTING_OPTIONS);

// Option Categories
export const getOptionCategories = () => api.get(url.GET_OPTION_CATEGORIES);
export const addOptionCategory = (optionCategory : any) => api.create(url.ADD_OPTION_CATEGORY, optionCategory);
export const updateOptionCategory = (optionCategory : any) => api.update(url.UPDATE_OPTION_CATEGORY + '/' + optionCategory.id, optionCategory);
export const deleteOptionCategory = (optionCategory : any) => api.delete(url.DELETE_OPTION_CATEGORY + '/' + optionCategory.id);

// Option Choices
export const getOptionChoices = () => api.get(url.GET_OPTION_CHOICES);
export const addOptionChoice = (optionChoice : any) => api.create(url.ADD_OPTION_CHOICE, optionChoice);
export const updateOptionChoice = (optionChoice : any) => api.update(url.UPDATE_OPTION_CHOICE + '/' + optionChoice.id, optionChoice);
export const deleteOptionChoice = (optionChoice : any) => api.delete(url.DELETE_OPTION_CHOICE + '/' + optionChoice.id);
