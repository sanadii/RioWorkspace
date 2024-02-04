// EventSettingsConfig.ts
import { Query } from "@syncfusion/ej2-data";

// Assuming clients is an array of client objects with a 'name' property
export const nameValidation = (clients, args) => {
  console.log("clients", clients);
  return clients.some((client) => client.name === args.value);
};

const getEventSettings = (transformedAppointments, clients, calendarSettings) => {
  return {
    dataSource: transformedAppointments,
    query: new Query(),
    fields: {
      subject: {
        name: "client",
        validation: {
          required: [true, "Enter valid Client Name"],
          // range: [nameValidation, "Entered Client name is not present, please add new Client or select from list"],
        },
      },
      title: { title: "Mobile", validation: { required: true } },
      startTime: { title: "From", validation: { required: true } },
      endTime: { title: "To", validation: { required: true } },
      description: {
        name: "notes",
        title: "Notes",
      },
    },
    resourceColorField: calendarSettings.bookingColor,
  };
};

export default getEventSettings;
