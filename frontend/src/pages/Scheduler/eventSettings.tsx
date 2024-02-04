// EventSettingsConfig.ts
import { Query } from '@syncfusion/ej2-data';

// Assuming clients is an array of client objects with a 'name' property
export const nameValidation = (clients, args) => {
    return clients.some(client => client.name === args.value);
  };
  
  export const minValidation = (args) => {
    return args.value.length >= 5;
  };

  
const getEventSettings = (transformedAppointments, clients, calendarSettings) => {
  return {
    dataSource: transformedAppointments,
    query: new Query(),
    fields: {
      subject: {
        name: "name",
        validation: {
          required: [true, "Enter valid Client Name"],
          range: [nameValidation, "Entered Client name is not present, please add new Client or select from list"],
        },
      },
      startTime: { title: "From", validation: { required: true } },
      endTime: { title: "To", validation: { required: true } },
      description: {
        name: "notes",
        title: "Notes",
        validation: {
          required: [true, "Please enter disease Symptoms"],
          minLength: [minValidation, "Need at least 5 letters to be entered"],
        },
      },
    },
    resourceColorField: calendarSettings.bookingColor,
  };
};

export default getEventSettings;
