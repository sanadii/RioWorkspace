import { DataManager, JsonAdaptor, Query, Predicate } from "@syncfusion/ej2-data";

const useDataManager = (appointments, services, staff) => {
  // Initialize DataManager for appointments
  const appointmentData = new DataManager({
    json: appointments || [],
    adaptor: new JsonAdaptor(),
  });

  const serviceData = new DataManager({
    json: services || [],
    adaptor: new JsonAdaptor(),
  });

  // Initialize DataManager for staff if they are to be used as resources
  const staffData = new DataManager({
    json: staff || [],
    adaptor: new JsonAdaptor(),
  });



  return { appointmentData, serviceData, staffData };
};

export { useDataManager };

// const fieldsData = {
//   id: "id",
//   subject: { name: "clientName" },
//   location: { name: "ShipCountry" },
//   description: { name: "ShipAddress" },
//   startTime: { name: "startTime" },
//   endTime: { name: "endTime" },
//   recurrenceRule: { name: "ShipRegion" },
// };

// export default useDataManagers;
