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
}

const useScheduleData = () => {
  const dispatch = useDispatch();
  const { appointments: appointmentData } = useSelector(appointmentsSelector);
  const { clients } = useSelector(clientsSelector);
  const { services } = useSelector(servicesSelector);
  const { staff } = useSelector(staffSelector);

  const [transformedAppointments, setTransformedAppointments] = useState([]);

  useEffect(() => {
    if (!appointmentData || appointmentData.length === 0) {
      dispatch(getAppointments());
      dispatch(getAllStaff());
      dispatch(getServices());
      dispatch(getClients());
    } else {
      const transformed = appointmentData.map((appointment: Appointment) => ({
        Id: appointment.id,
        ClientName: appointment.clientName,
        StartTime: new Date(appointment.startTime),
        EndTime: new Date(appointment.endTime),
        CategoryColor: appointment.categoryColor,
      }));
      setTransformedAppointments(transformed);
    }
  }, [dispatch, appointmentData]);

  const scheduleData = {
    appointments: transformedAppointments,
    clients,
    services,
    staff,
  };

  return scheduleData;
};

export { useScheduleData };
