import {
  GET_CLIENTS,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAIL,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAIL,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAIL,
} from "./actionType";

const INIT_STATE = {
  resources: [],
  error: {},
};

const Rsource = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_CLIENTS:
          return {
            ...state,
            resources: action.payload.data,
            isRsourceCreated: false,
            isRsourceSuccess: true
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
            isRsourceCreated: false,
            isRsourceSuccess: false
          };
        default:
          return { ...state };
      }

    case ADD_CLIENT_SUCCESS:
      return {
        ...state,
        isRsourceCreated: true,
        resources: [...state.resources, action.payload.data],
        isRsourceAdd: true,
        isRsourceAddFail: false,

      };

    case ADD_CLIENT_FAIL:
      return {
        ...state,
        error: action.payload,
        isRsourceAdd: false,
        isRsourceAddFail: true,
      };

    case UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        resources: state.resources.map((resource) =>
          resource.id.toString() === action.payload.data.id.toString()
            ? { ...resource, ...action.payload.data }
            : resource
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
        resources: state.resources.filter(
          (resource) => resource.id.toString() !== action.payload.resource.toString()
        ),
        isRsourceDelete: true,
        isRsourceFail: false,
      };

    case DELETE_CLIENT_FAIL:
      return {
        ...state,
        error: action.payload,
        isRsourceDelete: false,
        isRsourceFail: true,

      };

    default:
      return { ...state };
  }
};

export default Rsource;