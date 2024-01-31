import {
  GET_DAILY_REVENUES,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  ADD_DAILY_REVENUE_SUCCESS,
  ADD_DAILY_REVENUE_FAIL,
  UPDATE_DAILY_REVENUE_SUCCESS,
  UPDATE_DAILY_REVENUE_FAIL,
  DELETE_DAILY_REVENUE_SUCCESS,
  DELETE_DAILY_REVENUE_FAIL,
} from "./actionType";

const INIT_STATE = {
  dailyRevenues: [],
  error: {},
};

const DailyRevenue = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_DAILY_REVENUES:
          return {
            ...state,
            dailyRevenues: action.payload.data,
            isDailyRevenueCreated: false,
            isDailyRevenueSuccess: true
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_DAILY_REVENUES:
          return {
            ...state,
            error: action.payload.error,
            isDailyRevenueCreated: false,
            isDailyRevenueSuccess: false
          };
        default:
          return { ...state };
      }

    case ADD_DAILY_REVENUE_SUCCESS:
      return {
        ...state,
        isDailyRevenueCreated: true,
        dailyRevenues: [...state.dailyRevenues, action.payload.data],
      };

    case ADD_DAILY_REVENUE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_DAILY_REVENUE_SUCCESS:
      return {
        ...state,
        dailyRevenues: state.dailyRevenues.map(DailyRevenue =>
          DailyRevenue.id.toString() === action.payload.data._id.toString()
            ? { ...DailyRevenue, ...action.payload.data }
            : DailyRevenue
        ),
      };

    case UPDATE_DAILY_REVENUE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_DAILY_REVENUE_SUCCESS:
      
      return {
        ...state,
        dailyRevenues: state.dailyRevenues.filter(
          (dailyRevenue) => dailyRevenue.id.toString() !== action.payload.dailyRevenue.toString()
        ),
        isDailyRevenueDelete: true,
        isDailyRevenueFail: false,
      };

    case DELETE_DAILY_REVENUE_FAIL:
      return {
        ...state,
        error: action.payload,
        isDailyRevenueDelete: false,
        isDailyRevenueFail: true,

      };

    default:
      return { ...state };
  }
};

export default DailyRevenue;