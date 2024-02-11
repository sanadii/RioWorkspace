// useDataManager.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSchedule, getClients } from "store/actions";
import { appointmentsSelector, clientsSelector } from "Selectors";
import { DataManager, JsonAdaptor, Query, Predicate } from "@syncfusion/ej2-data";

const useDataManager = () => {
  const dispatch = useDispatch();

  const { appointments, services, staff } = useSelector(appointmentsSelector);
  const { clients } = useSelector(clientsSelector);

  useEffect(() => {
    if (!appointments || appointments.length === 0) {
      dispatch(getSchedule());
    }
  }, [dispatch, appointments]);

  // const appointmentData = new DataManager({
  //   json: appointments || [],
  //   adaptor: new JsonAdaptor(),
  // });

  // const serviceData = new DataManager({
  //   json: services || [],
  //   adaptor: new JsonAdaptor(),
  // });

  // // Initialize DataManager for staff if they are to be used as resources
  // const staffData = new DataManager({
  //   json: staff || [],
  //   adaptor: new JsonAdaptor(),
  // });

  return { appointments, services, staff };
};

export { useDataManager };
