import { useState, useEffect } from "react";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";

const useDataManager = () => {
  const baseApiUrl = process.env.REACT_APP_PUBLIC_URL;
  const [dataManager, setDataManager] = useState(null);

  useEffect(() => {
    const manager = new DataManager({
      url: `${baseApiUrl}appointments/getScheduleData`,
      insertUrl: `${baseApiUrl}appointments/addAppointment`,
      updateUrl: `${baseApiUrl}appointments/updateAppointment`,
      removeUrl: `${baseApiUrl}appointments/deleteAppointment`,
      adaptor: new UrlAdaptor(),
    });
    setDataManager(manager);
  }, [baseApiUrl]);

  return dataManager;
};

export default useDataManager;
