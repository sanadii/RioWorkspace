import React, { useEffect, useState, useRef } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { NumericTextBoxComponent, TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { useScheduleData } from "./useScheduleData";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";

import { Row, Col, Table } from "reactstrap";
interface SchedulerEditorTemplateProps {
  EventType?: string;
  StartTime?: Date;
  EndTime?: Date;
  services: Array<{ name: string; id: string }>;
  staff: Array<{ name: string; id: string }>;
  clientId?: string; // Add this line
  price?: number;
}

export const SchedulerEditorTemplate = (props: SchedulerEditorTemplateProps) => {
  const { appointments, clients, services, staff } = useScheduleData();

  // Client
  const [selectedClient, setSelectedClient] = useState(null);

  // Service
  const [selectedService, setSelectedService] = useState(null);
  const [serviceDuration, setServiceDuration] = useState(null);
  const [servicePrice, setServicePrice] = useState(null);
  const [serviceResources, setServiceResources] = useState([]);

  // Formats
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const initialClient = clients.find((client) => client.id === props.clientId);
    setSelectedClient(initialClient || null);
  }, [props.clientId, clients]);

  useEffect(() => {
    setSelectedClient(props.clientId || "");
  }, [props.clientId]);

  const onClientChange = (e) => {
    const clientObj = clients.find((client) => client.id === e.value);
    setSelectedClient(clientObj || null);
  };

  const handleServiceChange = (e) => {
    const serviceObj = services.find((service) => service.id === e.value);
    if (serviceObj) {
      setSelectedService(serviceObj);
      setServiceDuration(formatDuration(serviceObj.duration)); // Format the duration
      setServicePrice(serviceObj.price);
      setServiceResources(serviceObj.resources || []);
    }
  };

  const handleStaffChange = (e) => {
    // Handle staff change
    console.log("Staff selected:", e.itemData);
  };

  return (
    <div className="custom-editor p-3">
      <Row className="pb-3">
        <Col lg={12}>
          <DateTimePickerComponent
            id="appointmentDate"
            value={props.StartTime || new Date()}
            format="dd/MM/yyyy HH:mm"
            placeholder="Appointment Date"
          />
        </Col>
      </Row>
      <h4>Client</h4>
      <Row className="pb-3">
        <Col lg={6}>
          <div className="editor-section">
            <ComboBoxComponent
              id="ClientName"
              dataSource={clients}
              fields={{ text: "name", value: "id" }}
              value={selectedClient}
              change={onClientChange}
              placeholder="Select Client"
              allowFiltering={true}
            />
          </div>
        </Col>
        <Col lg={6}>
          <TextBoxComponent
            id="clientMobile"
            placeholder="Client Mobile *"
            type="text"
            value={selectedClient ? selectedClient.mobile : ""}
          />
        </Col>
        <hr />
      </Row>
      <h4>Services</h4>
      <Row className="pb-3">
        <Table>
          <tr>
            <td>
              <ComboBoxComponent
                id="serviceDropdown"
                dataSource={services}
                fields={{ text: "name", value: "id" }}
                change={handleServiceChange}
                placeholder="Select a Service"
                allowFiltering={true}
              />
            </td>
            <td>
              <ComboBoxComponent
                id="staffDropdown"
                dataSource={services}
                fields={{ text: "name", value: "id" }}
                change={handleStaffChange}
                placeholder="Select a Staff"
                allowFiltering={true}
              />
            </td>
            <td>
              <DropDownListComponent
                id="resourceDropdown"
                dataSource={serviceResources}
                fields={{ text: "name", value: "id" }}
                placeholder="Select Resource"
                allowFiltering={true}
              />
            </td>
            <td>Start</td>
            <td>
              <TextBoxComponent
                id="serviceDuration"
                value={serviceDuration || "00:00"}
                placeholder="Duration"
                readonly={true}
              />
            </td>
            <td>
              <NumericTextBoxComponent
                id="price"
                format="c2"
                value={servicePrice || 0}
                placeholder="Price"
                readonly={true}
              />
            </td>
            <td>
              <td>×</td>
            </td>
          </tr>
        </Table>
      </Row>

      {/* ... other fields ... */}
    </div>
  );
};
