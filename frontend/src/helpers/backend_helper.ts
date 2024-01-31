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

// postForgetPwd
export const postJwtForgetPwd = (data : any) => api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = (data : any) => api.create(url.SOCIAL_LOGIN, data);

// DailyRevenue
export const getDailyRevenues = () => api.get(url.GET_DAILY_REVENUES);
export const addNewDailyRevenue = (DailyRevenue : any) => api.create(url.ADD_NEW_DAILY_REVENUE, DailyRevenue);
export const updateDailyRevenue = (DailyRevenue : any) => api.update(url.UPDATE_DAILY_REVENUE, DailyRevenue); //+ '/' + DailyRevenue._id
export const deleteDailyRevenue = (DailyRevenue : any) => api.delete(url.DELETE_DAILY_REVENUE + '/' + DailyRevenue); //+ '/' + DailyRevenue 


// Users
export const getUsers = () => api.get(url.GET_USERS);
export const getCurrentUser = () => api.get(url.GET_CURRENT_USER);
export const getUserDetails = (user : any) => api.get(url.GET_USER_DETAILS + "/" + user.id);
export const addNewUser = (user : any) => api.create(url.ADD_NEW_USER, user);
export const updateUser = (user : any) => api.update(url.UPDATE_USER_PROFILE + "/" + user.id, user);
export const changeUserPassword = (user : any) => api.update(url.CHANGE_USER_PASSWORD + "/" + user.id, user);
export const deleteUser = (user : any) => api.delete(url.DELETE_USER + "/" + user);
