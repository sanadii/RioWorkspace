// Selectors/electorSelector.js
import { createSelector } from 'reselect';

const selectAppointmentsState = state => state.Appointments;

export const appointmentsSelector = createSelector(
  selectAppointmentsState,
  (appointmentsSelector) => ({
    
    // Daily Revenues Selectors
    appointments: appointmentsSelector.appointments,
    appointment: appointmentsSelector.appointment,
    client: appointmentsSelector.client,
    staff: appointmentsSelector.staff,
    services: appointmentsSelector.services,
    products: appointmentsSelector.products,
    packages: appointmentsSelector.packages,
    vouchers: appointmentsSelector.vouchers,
    appointmentServices: appointmentsSelector.appointmentServices,
    isAppointmentSuccess: appointmentsSelector.isAppointmentSuccess,
    error: appointmentsSelector.error,

  })
);
