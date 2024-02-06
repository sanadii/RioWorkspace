// useScheduleData.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments, getClients, getAllStaff, getServices } from "store/actions";
import { appointmentsSelector, clientsSelector, servicesSelector, staffSelector } from "Selectors";

interface Appointment {
  id: number;
  clientName: string,
  startTime: string;
  endTime: string;
  categoryColor: string;
  services: string;
  mobile: string;
}

const useScheduleData = () => {
  const dispatch = useDispatch();
  const { appointments: appointmentData } = useSelector(appointmentsSelector);
  const { clients } = useSelector(clientsSelector);
  const { services } = useSelector(servicesSelector);
  const { staff } = useSelector(staffSelector);

  const [appointments, setappointments] = useState([]);

  useEffect(() => {
    if (!appointmentData || appointmentData.length === 0) {
      dispatch(getAppointments());
      dispatch(getAllStaff());
      dispatch(getServices());
      dispatch(getClients());
    } else {
      const transformed = appointmentData.map((appointment: Appointment) => ({
        Id: appointment.id,
        Subject: appointment.clientName,
        clientName: appointment.clientName,
        services: appointment.services,
        StartTime: new Date(appointment.startTime),
        EndTime: new Date(appointment.endTime),
        CategoryColor: appointment.categoryColor,
        mobile: appointment.mobile,
      }));
      setappointments(transformed);
    }
  }, [dispatch, appointmentData]);

  const scheduleData = {
    appointments: appointments,
    clients,
    services,
    staff,
  };

  return scheduleData;
};

export { useScheduleData };
