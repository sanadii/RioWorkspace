import React, { useEffect, useState } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { NumericTextBoxComponent, TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Link } from "react-router-dom";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Table, Row, Col, Button, Input, Label, ButtonGroup } from "reactstrap";

// Define the type for a service item
type ServiceItem = {
  id: number;
  service: number;
  staff: number;
  price: number;
  duration: string;
};

const ServiceFieldElement = ({ services, staff, serviceValue }) => {
  const [serviceList, setServiceList] = useState<ServiceItem[]>([
    { id: 1, service: null, staff: null, price: 0, duration: "" },
  ]);

  const [autoPopulated, setAutoPopulated] = useState<boolean>(false);

  serviceValue.current = serviceList;

  console.log("autoPopulated: ", autoPopulated);
  console.log("serviceList: ", serviceList);
  console.log("serviceValue: ", serviceValue);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  };

  const handleServiceChange = (e, serviceIndex) => {
    setAutoPopulated(true); // Set autoPopulated to true after the initial service selection
    handleAutoPopulation(e, serviceIndex);
  };

  const handleAutoPopulation = (e, serviceIndex) => {
    console.log("auto population is running");
    // console.log("selectedService:", selectedService);
    // console.log("updatedServiceList:", updatedServiceList); // Log the updated service list

    const selectedService = e.itemData;
    const duration = selectedService ? selectedService.duration : 0;

    setServiceList((prevServiceList) => {
      const updatedServiceList = [...prevServiceList];
      const updatedServiceItem = {
        ...updatedServiceList[serviceIndex],
        service: selectedService ? selectedService.id : null,
        duration: selectedService ? selectedService.duration : 0,
        price: selectedService ? selectedService.price : 0,
      };
      updatedServiceList[serviceIndex] = updatedServiceItem;
      return updatedServiceList;
    });
    setAutoPopulated(false); // Reset autoPopulated to false after the auto-population
  };

  const handleStaffChange = (serviceObj, serviceIndex) => {
    const updatedServiceList = [...serviceList];
    updatedServiceList[serviceIndex] = {
      ...updatedServiceList[serviceIndex],
      staff: serviceObj.itemData ? serviceObj.itemData.id : null,
    };
    setServiceList(updatedServiceList);
    // Handle staff change
  };

  const handleServiceDurationChange = (serviceObj, serviceIndex) => {
    const updatedServiceList = [...serviceList];
    updatedServiceList[serviceIndex] = {
      ...updatedServiceList[serviceIndex],
      duration: serviceObj.itemData ? serviceObj.itemData.value : "",
    };
    setServiceList(updatedServiceList);
  };

  const handleServicePriceChange = (serviceObj, serviceIndex) => {
    setServiceList((prevServiceList) => {
      const updatedServiceList = [...prevServiceList];
      updatedServiceList[serviceIndex] = {
        ...updatedServiceList[serviceIndex],
        price: serviceObj,
      };
      return updatedServiceList;
    });
  };

  const generateDurationOptions = () => {
    const options = [];
    for (let i = 0; i <= 24 * 4; i++) {
      const hours = Math.floor(i / 4);
      const minutes = (i % 4) * 15;
      const totalMinutes = hours * 60 + minutes;
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      options.push({ text: formattedTime, value: totalMinutes });
    }
    return options;
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    serviceList.forEach((serviceItem) => {
      totalPrice += serviceItem.price || 0;
    });
    return totalPrice.toFixed(2); // Round to 2 decimal places
  };

  const addServiceTable = () => {
    const newServiceList = [
      ...serviceList,
      { id: serviceList.length + 1, service: null, staff: null, price: 0, duration: "" },
    ];
    setServiceList(newServiceList);
  };

  return (
    <div className="custom-field-row p-3">
      <h4>Services</h4>
      <div>
        <Table size="sm">
          {serviceList.map((serviceItem, serviceIndex) => (
            <tr key={serviceIndex} className="services">
              <td>
                <DropDownListComponent
                  id={`servic-${serviceIndex}`}
                  dataSource={services}
                  fields={{ text: "name", value: "id" }}
                  change={(e) => handleServiceChange(e, serviceIndex)}
                  placeholder="Select a Service"
                  allowFiltering={true}
                  value={serviceItem.service}
                />
              </td>
              <td>
                <DropDownListComponent
                  id={`servicStaff-${serviceIndex}`}
                  dataSource={staff}
                  fields={{ text: "name", value: "id" }}
                  change={(e) => !autoPopulated && handleStaffChange(e, serviceIndex)}
                  placeholder="Select a Staff"
                  allowFiltering={true}
                  value={serviceItem.staff}
                />
              </td>
              <td>
                <DropDownListComponent
                  id={`serviceResource-${serviceIndex}`}
                  allowFiltering={true}
                  value={serviceItem.staff}
                />
              </td>
              <td>
                <DropDownListComponent
                  id={`serviceDuration-${serviceIndex}`}
                  dataSource={generateDurationOptions()}
                  placeholder="Select Duration"
                  value={formatDuration(serviceItem.duration) || 0}
                  change={(e) => !autoPopulated && handleServiceDurationChange(e, serviceIndex)}
                />
              </td>
              <td>
                <NumericTextBoxComponent
                  id={`price-${serviceIndex}`}
                  format="c2" // Format as currency with 2 decimal places
                  placeholder="Price"
                  value={serviceItem.price}
                  change={(e) => !autoPopulated && handleServicePriceChange(e.value, serviceIndex)}
                />
              </td>
              <td>
                <Button to="#" className="link-danger fs-15">
                  <i className="ri-delete-bin-line"></i>
                </Button>
              </td>
            </tr>
          ))}
          <tr className="mt-3">
            <td></td>
            <td></td>
            <td></td>
            <td>
              <h5>Time: 15 mins</h5>
            </td>
            <td>
              <h5>Total: {calculateTotalPrice()} KD</h5>
            </td>
            <td></td>
          </tr>
        </Table>
      </div>

      <Row>
        <Col lg={6}>
          <ButtonComponent onClick={addServiceTable}>Add More Service</ButtonComponent>
        </Col>
        <Col lg={6}></Col>
      </Row>
    </div>
  );
};

export { ServiceFieldElement };
