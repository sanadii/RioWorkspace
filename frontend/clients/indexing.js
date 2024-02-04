// Actions
export * from "./clients/action";

// Reducer
import Client from "./clients/reducer";
Client,

// Saga
import ClientSaga from "./clients/saga";
fork(ClientSaga),



// Selectors
export { clientsSelector } from './clientsSelector';


// Backend_Helper
// Clients
export const getClients = () => api.get(url.GET_CLIENTS);
export const addClient = (client : any) => api.create(url.ADD_CLIENT, client);
export const updateClient = (client : any) => api.update(url.UPDATE_CLIENT + '/' + client.id, client); //+ '/' + Client._id
export const deleteClient = (client : any) => api.delete(url.DELETE_CLIENT + '/' + client); //+ '/' + Client 

// URL_HELPER
// Clients
export const GET_CLIENTS = "/clients/getClients";
export const ADD_CLIENT = "/clients/addClient";
export const UPDATE_CLIENT = "/clients/updateClient";
export const DELETE_CLIENT = "/clients/deleteClient";


// Routing
// Clients
import ClientList from "../pages/Clients/ClientList";
import ClientCreate from "../pages/Clients/ClientCreate";
import ClientDetails from "../pages/Clients/ClientDetails";


  // Clients
  { path: "/clients", component: <ClientList /> },
  { path: "/client-details", component: <ClientDetails /> },
  { path: "/client-create", component: <ClientCreate /> },


  // Menu
  const [isClients, setIsClients] = useState(false);


  if (iscurrentState !== "Clients") {
    setIsClients(false);
  }

  {
    id: "clients",
    label: "Clients",
    icon: "ri-dashboard-2-line",
    link: "/clients",
    stateVariables: isClients,
    click: function (e: any) {
      e.preventDefault();
      setIsClients(!isClients);
      setIscurrentState("Clients");
      updateIconSidebar(e);
    },
  },