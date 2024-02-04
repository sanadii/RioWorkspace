import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments, getClients, getAllStaff, getServices } from "store/actions";
import { appointmentsSelector, clientsSelector, servicesSelector, staffSelector } from "Selectors";

const DataSource = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector(appointmentsSelector);
  const { clients } = useSelector(clientsSelector);
  const { services } = useSelector(servicesSelector);
  const { allStaff } = useSelector(staffSelector);

  const [dataSource, setDataSource] = useState({
    appointmentData: [],
    clientData: [],
    serviceData: [],
    staffData: [],
  });

  useEffect(() => {
    // Fetch data if not already loaded
    if (!appointments || !clients || !services || !allStaff) {
      dispatch(getAppointments());
      dispatch(getAllStaff());
      dispatch(getServices());
      dispatch(getClients());
    } else {
      // Transform the appointments data
      const transformedAppointments = appointments.map(appointment => ({
        Id: appointment.id,
        Subject: appointment.subject,
        StartTime: appointment.startTime,
        EndTime: appointment.endTime,
        CategoryColor: appointment.categoryColor,
        // Add other fields as necessary
      }));

      // Set the data in state
      setDataSource({
        appointmentData: transformedAppointments,
        clientData: clients,  // Assuming clients data doesn't need transformation
        serviceData: services, // Assuming services data doesn't need transformation
        staffData: allStaff,  // Assuming staff data doesn't need transformation
      });
    }
  }, [dispatch, appointments, clients, services, allStaff]);

  return dataSource;
};

export default DataSource;
