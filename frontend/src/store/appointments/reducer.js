import {
  GET_APPOINTMENTS,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  ADD_APPOINTMENT_SUCCESS,
  ADD_APPOINTMENT_FAIL,
  UPDATE_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_FAIL,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAIL,
} from "./actionType";

const INIT_STATE = {
  appointments: [],
  error: {},
};

const Appointments = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_APPOINTMENTS:
          return {
            ...state,
            appointments: action.payload.data,
            isAppointmentCreated: false,
            isAppointmentSuccess: true
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_APPOINTMENTS:
          return {
            ...state,
            error: action.payload.error,
            isAppointmentCreated: false,
            isAppointmentSuccess: false
          };
        default:
          return { ...state };
      }

    case ADD_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isAppointmentCreated: true,
        appointments: [...state.appointments, action.payload.data],
        isAppointmentAdd: true,
        isAppointmentAddFail: false,

      };

    case ADD_APPOINTMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        isAppointmentAdd: false,
        isAppointmentAddFail: true,
      };

    case UPDATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        appointments: state.appointments.map((appointment) =>
          appointment.id.toString() === action.payload.data.id.toString()
            ? { ...appointment, ...action.payload.data }
            : appointment
        ),
      };

    case UPDATE_APPOINTMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_APPOINTMENT_SUCCESS:

      return {
        ...state,
        appointments: state.appointments.filter(
          (appointment) => appointment.id.toString() !== action.payload.appointment.toString()
        ),
        isAppointmentDelete: true,
        isAppointmentFail: false,
      };

    case DELETE_APPOINTMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        isAppointmentDelete: false,
        isAppointmentFail: true,

      };

    default:
      return { ...state };
  }
};

export default Appointments;