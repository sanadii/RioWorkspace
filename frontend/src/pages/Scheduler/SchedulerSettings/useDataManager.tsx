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
      dispatch(getClients());
    }
  }, [dispatch, appointments]);
  
  return { appointments, services, staff, clients };
};

export { useDataManager };
