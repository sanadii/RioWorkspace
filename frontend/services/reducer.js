import {
  GET_SERVICES,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  ADD_SERVICE_SUCCESS,
  ADD_SERVICE_FAIL,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAIL,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAIL,
} from "./actionType";

const INIT_STATE = {
  services: [],
  error: {},
};

const Service = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_SERVICES:
          return {
            ...state,
            services: action.payload.data,
            isServiceCreated: false,
            isServiceSuccess: true
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_SERVICES:
          return {
            ...state,
            error: action.payload.error,
            isServiceCreated: false,
            isServiceSuccess: false
          };
        default:
          return { ...state };
      }

    case ADD_SERVICE_SUCCESS:
      return {
        ...state,
        isServiceCreated: true,
        services: [...state.services, action.payload.data],
        isServiceAdd: true,
        isServiceAddFail: false,

      };

    case ADD_SERVICE_FAIL:
      return {
        ...state,
        error: action.payload,
        isServiceAdd: false,
        isServiceAddFail: true,
      };

    case UPDATE_SERVICE_SUCCESS:
      return {
        ...state,
        services: state.services.map((service) =>
          service.id.toString() === action.payload.data.id.toString()
            ? { ...service, ...action.payload.data }
            : service
        ),
      };

    case UPDATE_SERVICE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_SERVICE_SUCCESS:

      return {
        ...state,
        services: state.services.filter(
          (service) => service.id.toString() !== action.payload.service.toString()
        ),
        isServiceDelete: true,
        isServiceFail: false,
      };

    case DELETE_SERVICE_FAIL:
      return {
        ...state,
        error: action.payload,
        isServiceDelete: false,
        isServiceFail: true,

      };

    default:
      return { ...state };
  }
};

export default Service;