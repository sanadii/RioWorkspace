import {
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  GET_SCHEDULE,

  // Appointments
  GET_APPOINTMENTS,
  GET_APPOINTMENT,
  ADD_APPOINTMENT_SUCCESS,
  ADD_APPOINTMENT_FAIL,
  UPDATE_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_FAIL,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAIL,

  // AppointmentServices
  GET_APPOINTMENT_SERVICES,
  ADD_APPOINTMENT_SERVICE_SUCCESS,
  ADD_APPOINTMENT_SERVICE_FAIL,
  UPDATE_APPOINTMENT_SERVICE_SUCCESS,
  UPDATE_APPOINTMENT_SERVICE_FAIL,
  DELETE_APPOINTMENT_SERVICE_SUCCESS,
  DELETE_APPOINTMENT_SERVICE_FAIL,
} from "./actionType";

const INIT_STATE = {
  appointments: [],
  appointment: [],
  appointmentServicess: [],
  error: {},
};

const Appointments = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_SCHEDULE:
          return {
            ...state,
            appointments: action.payload.data.appointments,
            staff: action.payload.data.staff,
            services: action.payload.data.services,
            isAppointmentCreated: false,
            isAppointmentSuccess: true
          };

        case GET_APPOINTMENTS:
          return {
            ...state,
            appointments: action.payload.data,
            isAppointmentCreated: false,
            isAppointmentSuccess: true
          };

        case GET_APPOINTMENT:
          return {
            ...state,
            appointment: action.payload.data,
            isAppointmentCreated: false,
            isAppointmentSuccess: true
          };

        case GET_APPOINTMENT_SERVICES:
          return {
            ...state,
            appointmentServicess: action.payload.data,
            isAppointmentServicesCreated: false,
            isAppointmentServicesSuccess: true
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_SCHEDULE:
          return {
            ...state,
            error: action.payload.error,
            isScheduleCreated: false,
            isScheduleSuccess: false
          };
        case GET_APPOINTMENTS:
          return {
            ...state,
            error: action.payload.error,
            isAppointmentCreated: false,
            isAppointmentSuccess: false
          };
        case GET_APPOINTMENT:
          return {
            ...state,
            error: action.payload.error,
            isAppointmentCreated: false,
            isAppointmentSuccess: false
          };
        case GET_APPOINTMENT_SERVICES:
          return {
            ...state,
            error: action.payload.error,
            isAppointmentServiceCreated: false,
            isAppointmentServiceSuccess: false
          };
        default:
          return { ...state };
      }
    // Appointments
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

    // AppointmentServiceServices
    case ADD_APPOINTMENT_SERVICE_SUCCESS:
      return {
        ...state,
        isAppointmentServiceCreated: true,
        appointmentServices: [...state.appointmentServices, action.payload.data],
        isAppointmentServiceAdd: true,
        isAppointmentServiceAddFail: false,

      };

    case ADD_APPOINTMENT_SERVICE_FAIL:
      return {
        ...state,
        error: action.payload,
        isAppointmentServiceAdd: false,
        isAppointmentServiceAddFail: true,
      };

    case UPDATE_APPOINTMENT_SERVICE_SUCCESS:
      return {
        ...state,
        appointmentServices: state.appointmentServices.map((appointmentService) =>
          appointmentService.id.toString() === action.payload.data.id.toString()
            ? { ...appointmentService, ...action.payload.data }
            : appointmentService
        ),
      };

    case UPDATE_APPOINTMENT_SERVICE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_APPOINTMENT_SERVICE_SUCCESS:

      return {
        ...state,
        appointmentServices: state.appointmentServices.filter(
          (appointmentService) => appointmentService.id.toString() !== action.payload.appointmentService.toString()
        ),
        isAppointmentServiceDelete: true,
        isAppointmentServiceFail: false,
      };

    case DELETE_APPOINTMENT_SERVICE_FAIL:
      return {
        ...state,
        error: action.payload,
        isAppointmentServiceDelete: false,
        isAppointmentServiceFail: true,

      };

    default:
      return { ...state };
  }
};

export default Appointments;