import {
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  GET_CLIENTS,
  GET_CLIENT_SEARCH,
  GET_CLIENT_INFO,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAIL,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAIL,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAIL,
} from "./actionType";

const INIT_STATE = {
  clients: [],
  clientSearch: [],
  clientInfo: [],
  error: {},
};

const Client = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_CLIENTS:
          return {
            ...state,
            clients: action.payload.data,
            isClientCreated: false,
            isClientSuccess: true
          };
        case GET_CLIENT_SEARCH:
          return {
            ...state,
            clientSearch: action.payload.data,
            isClientCreated: false,
            isClientSearchSuccess: true
          };
        case GET_CLIENT_INFO:
          return {
            ...state,
            clientInfo: action.payload.data,
            isClientCreated: false,
            isClientSuccess: true
          };

        default:
          return { ...state };
      }

    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_CLIENTS:
          return {
            ...state,
            error: action.payload.error,
            isClientCreated: false,
            isClientSuccess: false
          };
        case GET_CLIENT_INFO:
          return {
            ...state,
            error: action.payload.error,
            isClientCreated: false,
            isClientInfoSuccess: false
          };
          case GET_CLIENT_SEARCH:
            return {
              ...state,
              error: action.payload.error,
              isClientCreated: false,
              isClientSearchSuccess: false
            };

        default:
          return { ...state };
      }

    case ADD_CLIENT_SUCCESS:
      return {
        ...state,
        isClientCreated: true,
        clients: [...state.clients, action.payload.data],
        isClientAdd: true,
        isClientAddFail: false,

      };

    case ADD_CLIENT_FAIL:
      return {
        ...state,
        error: action.payload,
        isClientAdd: false,
        isClientAddFail: true,
      };

    case UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: state.clients.map((client) =>
          client.id.toString() === action.payload.data.id.toString()
            ? { ...client, ...action.payload.data }
            : client
        ),
      };

    case UPDATE_CLIENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_CLIENT_SUCCESS:

      return {
        ...state,
        clients: state.clients.filter(
          (client) => client.id.toString() !== action.payload.client.toString()
        ),
        isClientDelete: true,
        isClientFail: false,
      };

    case DELETE_CLIENT_FAIL:
      return {
        ...state,
        error: action.payload,
        isClientDelete: false,
        isClientFail: true,

      };

    default:
      return { ...state };
  }
};

export default Client;