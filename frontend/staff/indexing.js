// Actions
export * from "./allStaff/action";

// Reducer
import Staff from "./allStaff/reducer";
Staff,

// Saga
import AllStaffaga from "./allStaff/saga";
fork(AllStaffaga),



// Selectors
export { allStaffSelector } from './allStaffSelector';


// Backend_Helper
// AllStaff
export const getAllStaff = () => api.get(url.GET_ALL_STAFF);
export const addStaff = (staff : any) => api.create(url.ADD_STAFF, staff);
export const updateStaff = (staff : any) => api.update(url.UPDATE_STAFF + '/' + staff.id, staff); //+ '/' + Staff._id
export const deleteStaff = (staff : any) => api.delete(url.DELETE_STAFF + '/' + staff); //+ '/' + Staff 

// URL_HELPER
// AllStaff
export const GET_ALL_STAFF = "/allStaff/getAllStaff";
export const ADD_STAFF = "/allStaff/addStaff";
export const UPDATE_STAFF = "/allStaff/updateStaff";
export const DELETE_STAFF = "/allStaff/deleteStaff";


// Routing
// AllStaff
import StaffList from "../pages/AllStaff/StaffList";
import StaffCreate from "../pages/AllStaff/StaffCreate";
import StaffDetails from "../pages/AllStaff/StaffDetails";


  // AllStaff
  { path: "/allStaff", component: <StaffList /> },
  { path: "/staff-details", component: <StaffDetails /> },
  { path: "/staff-create", component: <StaffCreate /> },


  // Menu
  const [isAllStaff, setIsAllStaff] = useState(false);


  if (iscurrentState !== "AllStaff") {
    setIsAllStaff(false);
  }

  {
    id: "allStaff",
    label: "AllStaff",
    icon: "ri-dashboard-2-line",
    link: "/allStaff",
    stateVariables: isAllStaff,
    click: function (e: any) {
      e.preventDefault();
      setIsAllStaff(!isAllStaff);
      setIscurrentState("AllStaff");
      updateIconSidebar(e);
    },
  },