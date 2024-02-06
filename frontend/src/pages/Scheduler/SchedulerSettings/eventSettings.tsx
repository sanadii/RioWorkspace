// EventSettingsConfig.ts
import { Query } from "@syncfusion/ej2-data";

// Assuming clients is an array of client objects with a 'name' property
export const nameValidation = (clients, args) => {
  console.log("clients", clients);
  return clients.some((client) => client.name === args.value);
};

const getEventSettings = (appointments, clients, calendarSettings) => {
  
  return {
    
    dataSource: appointments,
    query: new Query(),
    fields: {
      // subject: { name: "clientName", title: "Client Name"}
      // subject: {
      //   name: "clientName",
      //   validation: {
      //     required: [true, "Enter valid Client Name"],
      //     // range: [nameValidation, "Entered Client name is not present, please add new Client or select from list"],
      //   },
      // },
      // title: { title: "mobile", validation: { required: true } },
      // startTime: { title: "from", validation: { required: true } },
      // endTime: { title: "to", validation: { required: true } },
      // description: { name: "notes", title: "Notes" },
    },
    resourceColorField: calendarSettings.bookingColor,
  };

};

export { getEventSettings };
