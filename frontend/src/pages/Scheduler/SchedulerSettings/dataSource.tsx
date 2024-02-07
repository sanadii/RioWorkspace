import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments, getClients, getAllStaff, getServices, getResources } from "store/actions";
import { appointmentsSelector, clientsSelector, servicesSelector, resourceSelector, staffSelector } from "Selectors";

const DataSource = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector(appointmentsSelector);
  const { clients } = useSelector(clientsSelector);
  const { services } = useSelector(servicesSelector);
  const { resources } = useSelector(resourceSelector);
  const { staff } = useSelector(staffSelector);

  const [dataSource, setDataSource] = useState({
    appointmentData: [],
    // appServiceData: [],
    clientData: [],
    serviceData: [],
    staffData: [],
    resourceData: [],
  });

  useEffect(() => {
    // Fetch data if not already loaded
    if (!appointments.length || !clients.length || !services.length || !staff.length) {
      dispatch(getAppointments());
      dispatch(getAllStaff());
      dispatch(getServices());
      dispatch(getClients());
      dispatch(getResources());
    } else {
      // Set the data in state
      setDataSource({
        appointmentData: appointments,
        clientData: clients,
        serviceData: services,
        resourceData: resources,
        staffData: staff,
      });
    }
  }, [dispatch, appointments, clients, services, resources, staff,]);

  return dataSource;
};

export default DataSource;
