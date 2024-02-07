// Actions
export * from "./resources/action";

// Reducer
import Rsource from "./resources/reducer";
Rsource,

// Saga
import RsourceSaga from "./resources/saga";
fork(RsourceSaga),



// Selectors
export { resourcesSelector } from './resourcesSelector';


// Backend_Helper
// Rsources
export const getRsources = () => api.get(url.GET_CLIENTS);
export const addRsource = (resource : any) => api.create(url.ADD_CLIENT, resource);
export const updateRsource = (resource : any) => api.update(url.UPDATE_CLIENT + '/' + resource.id, resource); //+ '/' + Rsource._id
export const deleteRsource = (resource : any) => api.delete(url.DELETE_CLIENT + '/' + resource); //+ '/' + Rsource 

// URL_HELPER
// Rsources
export const GET_CLIENTS = "/resources/getRsources";
export const ADD_CLIENT = "/resources/addRsource";
export const UPDATE_CLIENT = "/resources/updateRsource";
export const DELETE_CLIENT = "/resources/deleteRsource";


// Routing
// Rsources
import RsourceList from "../pages/Rsources/RsourceList";
import RsourceCreate from "../pages/Rsources/RsourceCreate";
import RsourceDetails from "../pages/Rsources/RsourceDetails";


  // Rsources
  { path: "/resources", component: <RsourceList /> },
  { path: "/resource-details", component: <RsourceDetails /> },
  { path: "/resource-create", component: <RsourceCreate /> },


  // Menu
  const [isRsources, setIsRsources] = useState(false);


  if (iscurrentState !== "Rsources") {
    setIsRsources(false);
  }

  {
    id: "resources",
    label: "Rsources",
    icon: "ri-dashboard-2-line",
    link: "/resources",
    stateVariables: isRsources,
    click: function (e: any) {
      e.preventDefault();
      setIsRsources(!isRsources);
      setIscurrentState("Rsources");
      updateIconSidebar(e);
    },
  },