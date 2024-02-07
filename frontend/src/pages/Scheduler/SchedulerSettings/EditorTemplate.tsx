import React, { useEffect, useState, useRef } from "react";
import { DropDownListComponent, ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { NumericTextBoxComponent, TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { useScheduleData } from "./useScheduleData";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

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

export const EditorTemplate = (data: Record<string, any>): React.JSX.Element => {
  const { appointments, clients, services, staff } = useScheduleData();

  // Client
  const [selectedClient, setSelectedClient] = useState(null);

  // Service
  const [selectedService, setSelectedService] = useState(null);
  const [serviceDuration, setServiceDuration] = useState(null);
  const [servicePrice, setServicePrice] = useState(null);
  const [serviceResources, setServiceResources] = useState([]);

  // Array of service objects
  const [serviceList, setServiceList] = useState([{ id: 1, service: "", staff: "", price: 0, duration: "" }]);


  // Formats
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  };

  const handleClienteChange = (clientObj) => {
    if (clientObj && clientObj.itemData && clientObj.itemData.id) {
      const clientId = clientObj.itemData.id;
      setSelectedClient(clientId);

      // Update a local variable with the clientId
      const updatedProps = { ...data, clientName: clientId };
    }
  };

  const handleServiceChange = (serviceObj, serviceIndex) => {
    const updatedServiceList = [...serviceList];
    updatedServiceList[serviceIndex] = {
      ...updatedServiceList[serviceIndex],
      service: serviceObj.itemData.id,
    };
    setServiceList(updatedServiceList);

    setServiceDuration(formatDuration(serviceObj.itemData.duration)); // Format the duration
    setServicePrice(serviceObj.itemData.price);
    setServiceResources(serviceObj.itemData.resources || []);
  };

  const handleStaffChange = (e, serviceIndex) => {
    const updatedServiceList = [...serviceList];
    updatedServiceList[serviceIndex] = {
      ...updatedServiceList[serviceIndex],
      staff: e.itemData.name,
    };
    setServiceList(updatedServiceList);

  };

  const allServicesString = serviceList
    .map((serviceItem) => {
      return `Service: ${serviceItem.service}, Staff: ${serviceItem.staff}, Price: ${serviceItem.price}, Duration: ${serviceItem.duration}`;
    })
    .join("\n");

  const addServiceTable = () => {
    const newServiceList = [
      ...serviceList,
      { id: serviceList.length + 1, service: "", staff: "", price: 0, duration: "" },
    ];
    setServiceList(newServiceList);
  };

  return (
    <div className="custom-editor p-3">
      <p>EditorTemplate</p>
      {/* <Row className="pb-3">
        <Col lg={12}>
          <DateTimePickerComponent
            id="appointmentDate"
            value={data.StartTime || new Date()}
            format="dd/MM/yyyy HH:mm"
            placeholder="Appointment Date"
            className="e-field e-input"
          />
        </Col>
      </Row>
      <h4>Client</h4>
      <Row className="pb-3">
        {/* <Col lg={6}>
          <div className="editor-section">
            <ComboBoxComponent
              id="clientId"
              dataSource={clients}
              fields={{ text: "name", value: "id" }}
              placeholder="Client Name"
              change={handleClienteChange}
              allowFiltering={true}
            />
          </div>
        </Col> 
        <Col lg={6}>
          <TextBoxComponent
            id="clientMobile"
            className="e-field e-input"
            placeholder="Client Mobile *"
            type="text"
            value={selectedClient ? selectedClient.mobile : ""}
          />
        </Col>
        <hr />
      </Row>
      <h4>Services</h4>
      {serviceList.map((serviceItem, serviceIndex) => (
        <div key={serviceItem.id} className="pb-3 services">
          <Table>
            <tr>
              <td>
                <DropDownListComponent
                  id={`servic-${serviceItem.id}`}
                  className="e-field e-input"
                  dataSource={services}
                  fields={{ text: "name", value: "id" }}
                  change={(e) => handleServiceChange(e, serviceIndex)}
                  placeholder="Select a Service"
                  allowFiltering={true}
                />
              </td>
              <td>
                <DropDownListComponent
                  id={`servicStaff-${serviceItem.id}`}
                  className="e-field e-input"
                  dataSource={staff}
                  fields={{ text: "name", value: "id" }}
                  change={(e) => handleStaffChange(e, serviceIndex)}
                  placeholder="Select a Staff"
                  allowFiltering={true}
                />
              </td>
              <td>Start</td>
              <td>
                <TextBoxComponent
                  id={`serviceDuration-${serviceItem.id}`}
                  className="e-field e-input"
                  value={serviceDuration || "00:00"}
                  placeholder="Duration"
                  readonly={true}
                />
              </td>
              <td>
                <TextBoxComponent
                  id={`price-${serviceItem.id}`}
                  className="e-field e-input"
                  value={servicePrice || 0}
                  placeholder="Price"
                  readonly={true}
                />
              </td>
              <td></td>
            </tr>
          </Table>
        </div>
      ))}

      <ButtonComponent onClick={addServiceTable}>Add More Service</ButtonComponent>
      <td>
        <TextBoxComponent
          id="allServices"
          className="e-field e-input"
          value={allServicesString}
          placeholder="All Services"
          readonly={true}
        />
      </td> */}
    </div>
  );
};
