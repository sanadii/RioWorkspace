import {
  GET_REVENUES,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  ADD_REVENUE_SUCCESS,
  ADD_REVENUE_FAIL,
  UPDATE_REVENUE_SUCCESS,
  UPDATE_REVENUE_FAIL,
  DELETE_REVENUE_SUCCESS,
  DELETE_REVENUE_FAIL,
} from "./actionType";

const INIT_STATE = {
  revenues: [],
  error: {},
};

const Revenue = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_REVENUES:
          return {
            ...state,
            revenues: action.payload.data,
            isRevenueCreated: false,
            isRevenueSuccess: true
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_REVENUES:
          return {
            ...state,
            error: action.payload.error,
            isRevenueCreated: false,
            isRevenueSuccess: false
          };
        default:
          return { ...state };
      }

    case ADD_REVENUE_SUCCESS:
      return {
        ...state,
        isRevenueCreated: true,
        revenues: [...state.revenues, action.payload.data],
        isRevenueAdd: true,
        isRevenueAddFail: false,

      };

    case ADD_REVENUE_FAIL:
      return {
        ...state,
        error: action.payload,
        isRevenueAdd: false,
        isRevenueAddFail: true,
      };

    case UPDATE_REVENUE_SUCCESS:
      return {
        ...state,
        revenues: state.revenues.map((dailyRevenue) =>
          dailyRevenue.id.toString() === action.payload.data.id.toString()
            ? { ...dailyRevenue, ...action.payload.data }
            : dailyRevenue
        ),
      };

    case UPDATE_REVENUE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_REVENUE_SUCCESS:

      return {
        ...state,
        revenues: state.revenues.filter(
          (dailyRevenue) => dailyRevenue.id.toString() !== action.payload.dailyRevenue.toString()
        ),
        isRevenueDelete: true,
        isRevenueFail: false,
      };

    case DELETE_REVENUE_FAIL:
      return {
        ...state,
        error: action.payload,
        isRevenueDelete: false,
        isRevenueFail: true,

      };

    default:
      return { ...state };
  }
};

export default Revenue;