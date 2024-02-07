import {
  GET_RESOURCES,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  ADD_RESOURCE_SUCCESS,
  ADD_RESOURCE_FAIL,
  UPDATE_RESOURCE_SUCCESS,
  UPDATE_RESOURCE_FAIL,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_FAIL,
} from "./actionType";

const INIT_STATE = {
  resources: [],
  error: {},
};

const Resource = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_RESOURCES:
          return {
            ...state,
            resources: action.payload.data,
            isResourceCreated: false,
            isResourceSuccess: true
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_RESOURCES:
          return {
            ...state,
            error: action.payload.error,
            isResourceCreated: false,
            isResourceSuccess: false
          };
        default:
          return { ...state };
      }

    case ADD_RESOURCE_SUCCESS:
      return {
        ...state,
        isResourceCreated: true,
        resources: [...state.resources, action.payload.data],
        isResourceAdd: true,
        isResourceAddFail: false,

      };

    case ADD_RESOURCE_FAIL:
      return {
        ...state,
        error: action.payload,
        isResourceAdd: false,
        isResourceAddFail: true,
      };

    case UPDATE_RESOURCE_SUCCESS:
      return {
        ...state,
        resources: state.resources.map((resource) =>
          resource.id.toString() === action.payload.data.id.toString()
            ? { ...resource, ...action.payload.data }
            : resource
        ),
      };

    case UPDATE_RESOURCE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_RESOURCE_SUCCESS:

      return {
        ...state,
        resources: state.resources.filter(
          (resource) => resource.id.toString() !== action.payload.resource.toString()
        ),
        isResourceDelete: true,
        isResourceFail: false,
      };

    case DELETE_RESOURCE_FAIL:
      return {
        ...state,
        error: action.payload,
        isResourceDelete: false,
        isResourceFail: true,

      };

    default:
      return { ...state };
  }
};

export default Resource;