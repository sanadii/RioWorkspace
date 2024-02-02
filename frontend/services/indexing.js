// Actions
export * from "./services/action";

// Reducer
import Service from "./services/reducer";
Service,

// Saga
import ServiceSaga from "./services/saga";
fork(ServiceSaga),



// Selectors
export { servicesSelector } from './servicesSelector';


// Backend_Helper
// Services
export const getServices = () => api.get(url.GET_SERVICES);
export const addService = (service : any) => api.create(url.ADD_SERVICE, service);
export const updateService = (service : any) => api.update(url.UPDATE_SERVICE + '/' + service.id, service); //+ '/' + Service._id
export const deleteService = (service : any) => api.delete(url.DELETE_SERVICE + '/' + service); //+ '/' + Service 

// URL_HELPER
// Services
export const GET_SERVICES = "/services/getServices";
export const ADD_SERVICE = "/services/addService";
export const UPDATE_SERVICE = "/services/updateService";
export const DELETE_SERVICE = "/services/deleteService";


// Routing
// Services
import ServiceList from "../pages/Services/ServiceList";
import ServiceCreate from "../pages/Services/ServiceCreate";
import ServiceDetails from "../pages/Services/ServiceDetails";


  // Services
  { path: "/services", component: <ServiceList /> },
  { path: "/service-details", component: <ServiceDetails /> },
  { path: "/service-create", component: <ServiceCreate /> },


  // Menu
  const [isServices, setIsServices] = useState(false);


  if (iscurrentState !== "Services") {
    setIsServices(false);
  }

  {
    id: "services",
    label: "Services",
    icon: "ri-dashboard-2-line",
    link: "/services",
    stateVariables: isServices,
    click: function (e: any) {
      e.preventDefault();
      setIsServices(!isServices);
      setIscurrentState("Services");
      updateIconSidebar(e);
    },
  },