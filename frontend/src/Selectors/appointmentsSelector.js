// Selectors/electorSelector.js
import { createSelector } from 'reselect';

const selectAppointmentsState = state => state.Appointments;

export const appointmentsSelector = createSelector(
  selectAppointmentsState,
  (appointmentsSelector) => ({
    
    // Daily Revenues Selectors
    appointments: appointmentsSelector.appointments,
    isAppointmentSuccess: appointmentsSelector.isAppointmentSuccess,
    error: appointmentsSelector.error,

  })
);
