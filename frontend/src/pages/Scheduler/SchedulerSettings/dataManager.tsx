import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentServices, getClients, getAllStaff, getServices } from "store/actions";
import { appointmentsSelector, clientsSelector, servicesSelector, resourceSelector, staffSelector } from "Selectors";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";

const baseApiUrl = process.env.REACT_APP_PUBLIC_URL;

const DataSource = () => {
  const [dataManager, setDataManager] = useState(null);

  useEffect(() => {
    // Instantiating the DataManager
    const manager = new DataManager({
      url: `${baseApiUrl}appointments/getScheduleData`,
      insertUrl: `${baseApiUrl}appointments/addAppointment`,
      updateUrl: `${baseApiUrl}appointments/updateAppointment`,
      removeUrl: `${baseApiUrl}appointments/deleteAppointment`,
      adaptor: new UrlAdaptor(),
    });
    setDataManager(manager);
  }, []);

  useEffect(() => {
    // Log dataManager to check if it's set
    if (dataManager) {
      console.log("DataManager is set: ", dataManager);
    }
  }, [dataManager]);

  console.log("dataManager: ", dataManager);
};

export default DataSource;
