import React, { useState, useEffect, useRef } from "react";

import { EditorDateComponent } from "./EditorDateComponent";
import { EditorClientComponent } from "./EditorClientComponent";
import { EditorServiceComponent } from "./EditorServiceComponent";
import { EditorProductComponent } from "./EditorProductComponent";
import { EditorPackageComponent } from "./EditorPackageComponent";
import { EditorStatusComponent } from "./EditorStatusComponent";

type ClientItem = {
  id: number;
  name: string;
  mobile: string;
  email: string;
  dateOfBirth: string;
};

// Define the type for a service item
type ServiceItem = {
  id: number;
  service: number;
  staff: number;
  startTime: Date; // Change the type to Date
  endTime: Date; // Change the type to Date
  duration: string;
  price: string;
};

type AppointmentItem = {
  id: number;
  startTime: Date;
  endTime: Date;
  status: number;
  client: ClientItem[];
  services: ServiceItem[];
};

const EditorTemplate = ({ data, scheduleObj, services, staff, clients, appointmentRef }) => {
  const clientRef = useRef(null);
  const serviceRef = useRef([]);
  const statusRef = useRef([]);
  const productRef = useRef([]);
  const packageRef = useRef([]);

  // console.log("scheduleObj: ", scheduleObj);
  // Set Appointment Details
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentItem>({
    id: data.id || null,
    startTime: data.startTime || "",
    endTime: data.endTime || "",
    status: data.status || 1,
    client: data.client || [],
    services: data.services || [],
  });

  console.log("appointmentDetails Services: ", appointmentDetails.services);
  
  // Set Client Details
  const [clientDetails, setClientDetails] = useState<ClientItem>({
    id: data.client?.id || null,
    name: data.client?.name || "",
    mobile: data.client?.mobile || "",
    dateOfBirth: data.client?.dateOfBirth || "",
    email: data.client?.email || "",
  });

  const [serviceDetails, setServiceDetails] = useState<ServiceItem[]>([
    {
      id: data.service?.id || null,
      service: data.service?.service || null,
      staff: data.service?.staffId || null,
      startTime: data.startTime,
      endTime: data.endTime,
      duration: data.duration,
      price: data.price,
    },
  ]);


  appointmentRef.current = appointmentDetails;
  clientRef.current = clientDetails;
  serviceRef.current = serviceDetails;

  useEffect(() => {
    // Update appointmentRef.current.client when clientRef.current changes
    if (appointmentRef.current && clientRef.current) {
      appointmentRef.current.client = clientRef.current;
    }

    // Update appointmentRef.current.service when serviceRef.current changes
    if (appointmentRef.current && serviceRef.current) {
      appointmentRef.current.services = serviceRef.current;
    }
  }, [clientRef.current, serviceRef.current]); // Dependency array includes clientRef.current

  console.log("appointmentRef.current.services: ", appointmentRef.current.services);

  return (
    <React.Fragment>
      <div className="">
        <EditorDateComponent
          data={data}
          appointmentDetails={appointmentDetails}
          setAppointmentDetails={setAppointmentDetails}
        />

        <EditorClientComponent
          data={data}
          clients={clients}
          clientDetails={clientDetails}
          setClientDetails={setClientDetails}
        />
        <EditorServiceComponent
          data={data}
          services={services}
          staff={staff}
          serviceDetails={serviceDetails}
          setServiceDetails={setServiceDetails}
        />

        <EditorStatusComponent
          data={data}
          appointmentDetails={appointmentDetails}
          setAppointmentDetails={setAppointmentDetails}
        />
      </div>
    </React.Fragment>
  );
};

export default EditorTemplate;
