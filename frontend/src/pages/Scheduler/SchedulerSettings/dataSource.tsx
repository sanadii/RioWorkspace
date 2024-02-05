import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments, getClients, getAllStaff, getServices } from "store/actions";
import { appointmentsSelector, clientsSelector, servicesSelector, staffSelector } from "Selectors";

const DataSource = () => {
  const dispatch = useDispatch();
  const appointmentsData = useSelector(appointmentsSelector);
  const clientsData = useSelector(clientsSelector);
  const servicesData = useSelector(servicesSelector);
  const staffData = useSelector(staffSelector);

  const [dataSource, setDataSource] = useState({
    appointmentData: [],
    clientData: [],
    serviceData: [],
    staffData: [],
  });

  useEffect(() => {
    // Fetch data if not already loaded
    if (!appointmentsData || !clientsData || !servicesData || !staffData) {
      dispatch(getAppointments());
      dispatch(getAllStaff());
      dispatch(getServices());
      dispatch(getClients());
    } else {
      // Set the data in state
      setDataSource({
        appointmentData: appointmentsData.appointments || [],
        clientData: clientsData.clients || [],
        serviceData: servicesData.services || [],
        staffData: staffData.allStaff || [],
      });
    }
  }, [dispatch, appointmentsData, clientsData, servicesData, staffData]);

  return dataSource;
};

export default DataSource;
