// Actions

// Reducer

// Saga



// Selectors
export { servicesSelector } from './servicesSelector';


// Backend_Helper

// URL_HELPER


// Routing
// Services
import ServiceList from "../pages/Services/ServiceList";
import ServiceCreate from "../pages/Services/ServiceCreate";
import ServiceDetails from "../pages/Services/ServiceDetails";


import { APIClient } from "helper/api_helper";

  // Services
  { path: "/services", component: <ServiceList /> },
  { path: "/service-details", component: <ServiceDetails /> },
  { path: "/service-create", component: <ServiceCreate /> },