import {
  GET_ALL_STAFF,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  ADD_STAFF_SUCCESS,
  ADD_STAFF_FAIL,
  UPDATE_STAFF_SUCCESS,
  UPDATE_STAFF_FAIL,
  DELETE_STAFF_SUCCESS,
  DELETE_STAFF_FAIL,
} from "./actionType";

const INIT_STATE = {
  allStaff: [],
  error: {},
};

const Staff = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_ALL_STAFF:
          return {
            ...state,
            allStaff: action.payload.data,
            isStaffCreated: false,
            isAllStaffuccess: true
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_ALL_STAFF:
          return {
            ...state,
            error: action.payload.error,
            isStaffCreated: false,
            isAllStaffuccess: false
          };
        default:
          return { ...state };
      }

    case ADD_STAFF_SUCCESS:
      return {
        ...state,
        isStaffCreated: true,
        allStaff: [...state.allStaff, action.payload.data],
        isStaffAdd: true,
        isStaffAddFail: false,

      };

    case ADD_STAFF_FAIL:
      return {
        ...state,
        error: action.payload,
        isStaffAdd: false,
        isStaffAddFail: true,
      };

    case UPDATE_STAFF_SUCCESS:
      return {
        ...state,
        allStaff: state.allStaff.map((staff) =>
          staff.id.toString() === action.payload.data.id.toString()
            ? { ...staff, ...action.payload.data }
            : staff
        ),
      };

    case UPDATE_STAFF_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_STAFF_SUCCESS:

      return {
        ...state,
        allStaff: state.allStaff.filter(
          (staff) => staff.id.toString() !== action.payload.staff.toString()
        ),
        isStaffDelete: true,
        isStaffFail: false,
      };

    case DELETE_STAFF_FAIL:
      return {
        ...state,
        error: action.payload,
        isStaffDelete: false,
        isStaffFail: true,

      };

    default:
      return { ...state };
  }
};

export default Staff;