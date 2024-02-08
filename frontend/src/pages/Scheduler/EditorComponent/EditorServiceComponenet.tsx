import React, { useEffect, useState } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Link } from "react-router-dom";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Table, Row, Col, Button, Input, Label, ButtonGroup } from "reactstrap";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";

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

const EditorServiceComponenet = ({ args, services, staff, serviceRef }) => {
  const [serviceList, setServiceList] = useState<ServiceItem[]>([
    { id: 1, service: null, staff: null, startTime: new Date(), endTime: new Date(), duration: "", price: "" },
  ]);

  const startTime = args.data.StartTime; // Extract start time
  const [serviceStartTime, setServiceStartTime] = useState(startTime);

  // const endTime = args.data.EndTime; // Extract end time

  // const startDate = args.data.StartTime.toLocaleDateString(); // Extract start date
  // const startTime = args.data.StartTime.toLocaleTimeString(); // Extract start time
  // const endDate = args.data.EndTime.toLocaleDateString(); // Extract end date
  // const endTime = args.data.EndTime.toLocaleTimeString(); // Extract end time

  // console.log("Start Date: ", startDate);
  // console.log("Start Time: ", startTime);
  // console.log("End Date: ", endDate);
  // console.log("End Time: ", endTime);

  const minTime = new Date();
  minTime.setHours(10, 0, 0); // Set minimum time to 10:00 AM

  const maxTime = new Date();
  maxTime.setHours(20, 0, 0); // Set maximum time to 8:00 PM

  const [autoPopulated, setAutoPopulated] = useState<boolean>(false);

  serviceRef.current = serviceList;

  console.log("autoPopulated: ", autoPopulated);
  console.log("serviceList: ", serviceList);
  console.log("serviceRef: ", serviceRef);

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
    const selectedService = e.itemData;

    setServiceList((prevServiceList) => {
      const updatedServiceList = [...prevServiceList];
      const updatedServiceItem = {
        ...updatedServiceList[serviceIndex],
        service: selectedService ? selectedService.id : null,
        duration: selectedService ? selectedService.duration : 0,
        price: selectedService ? selectedService.price : 0,
        startTime: startTime,
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
  };

  const handleStartTimeChange = (serviceObj, serviceIndex) => {
    const updatedServiceList = [...serviceList];
    const startTimeValue = serviceObj.value; // Get the new start time value
    const durationValue = updatedServiceList[serviceIndex].duration; // Get the duration value in minutes

    // Ensure durationValue is a number
    if (typeof durationValue === "number") {
      const startTime = new Date(startTimeValue); // Convert start time to Date object
      const endTime = new Date(startTime.getTime() + durationValue * 60000); // Calculate end time (add duration in milliseconds)

      updatedServiceList[serviceIndex] = {
        ...updatedServiceList[serviceIndex],
        startTime: startTimeValue,
        endTime: endTime,
      };
      setServiceList(updatedServiceList);
    } else {
      console.error("Duration value is not a number");
    }
  };

  const handleServiceDurationChange = (serviceObj, serviceIndex) => {
    const updatedServiceList = [...serviceList];
    const durationValue = serviceObj.itemData ? serviceObj.itemData.value : ""; // Duration value in minutes
    const startTimeValue = updatedServiceList[serviceIndex].startTime; // Start time value
    const startTime = new Date(startTimeValue); // Convert start time to Date object
    const endTime = new Date(startTime.getTime() + durationValue * 60000); // Calculate end time (add duration in milliseconds)

    updatedServiceList[serviceIndex] = {
      ...updatedServiceList[serviceIndex],
      duration: durationValue,
      endTime: endTime,
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
      totalPrice += parseFloat(serviceItem.price) || 0; // Ensure price is always a number
    });
    return totalPrice.toFixed(2); // Round to 2 decimal places
  };

  const addServiceTable = () => {
    console.log("serviceList.length:", serviceList.length);
    const previousEndTime = serviceList.length > 1 ? serviceList[serviceList.length - 1].endTime : startTime; // Get the end time of the last service or set it to the current time if there are no services
    const newServiceList = [
      ...serviceList,
      { id: 1, service: null, staff: null, startTime: previousEndTime, endTime: startTime, duration: "", price: "" },
    ];
    setServiceList(newServiceList);
    setServiceStartTime(previousEndTime); // Set the serviceStartTime to the start time of the last service
  };

  return (
    <Row>
      <h5>Services</h5>
      <Table className="table-cell-background-grey">
        <tbody>
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
                <TimePickerComponent
                  id={`startTime-${serviceIndex}`}
                  placeholder="Select a Start Time"
                  value={serviceStartTime}
                  step={15}
                  min={minTime}
                  max={maxTime}
                  format="hh:mm a" // Set the time format to 'hh:mm AM/PM'
                  change={(e) => !autoPopulated && handleStartTimeChange(e, serviceIndex)}
                />
              </td>

              {/* <td>
                <DropDownListComponent
                  id={`serviceResource-${serviceIndex}`}
                  allowFiltering={true}
                  value={serviceItem.staff}
                />
              </td> */}
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
                <TextBoxComponent
                  id={`price-${serviceIndex}`}
                  placeholder="Price"
                  value={serviceItem.price}
                  change={(e) => !autoPopulated && handleServicePriceChange(e.value, serviceIndex)}
                />
              </td>
              <td>
                <Button color="danger" className="btn-icon">
                  <i className="ri-delete-bin-5-line" />{" "}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
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

      <Row>
        <Col lg={6}>
          <ButtonComponent onClick={addServiceTable}>Add More Service</ButtonComponent>
        </Col>
        <Col lg={6}></Col>
      </Row>
    </Row>
  );
};

export { EditorServiceComponenet };
