import React, { useEffect, useState } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Table, Row, Col, Button, Input, Label, ButtonGroup } from "reactstrap";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";

const EditorServiceComponent = ({ data, services, staff, serviceDetails, setServiceDetails }) => {

  const startTime = data.startTime;
  // console.log("startTime: ", startTime)

  const [serviceStartTime, setServiceStartTime] = useState(startTime);
  const [autoPopulated, setAutoPopulated] = useState<boolean>(false);

  // TimePicker Settings
  const minTime = new Date();
  minTime.setHours(10, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(20, 0, 0);

  useEffect(() => {
    if (data && data.services) {
      const initialServices = data.services.map(service => ({
        id: service.id, // Assuming serviceId is the ID of the service
        service: service.serviceId, // Assuming serviceId is the ID of the service
        staff: service.staff, // Assuming staff is the ID of the staff
        startTime: new Date(service.startTime), // Convert to Date object if necessary
        endTime: new Date(service.endTime), // Convert to Date object if necessary
        duration: service.duration,
        price: service.price.toString(), // Convert to string if necessary
      }));
      setServiceDetails(initialServices);
    }
  }, [data, setServiceDetails]);

  // Form Field Functions
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
    // console.log("selectedService: ", selectedService)
    setServiceDetails((prevServiceList) => {
      const updatedServiceList = [...prevServiceList];
      const updatedServiceItem = {
        ...updatedServiceList[serviceIndex],
        service: selectedService ? selectedService.id : null,
        duration: selectedService ? selectedService.duration : 0,
        price: selectedService ? selectedService.price : 0,
        startTime: startTime,
      };
      updatedServiceList[serviceIndex] = updatedServiceItem;
      // console.log("updatedServiceList: ", updatedServiceList)

      return updatedServiceList;
    });
    setAutoPopulated(false); // Reset autoPopulated to false after the auto-population
  };

  const handleStaffChange = (serviceObj, serviceIndex) => {
    const updatedServiceList = [...serviceDetails];
    updatedServiceList[serviceIndex] = {
      ...updatedServiceList[serviceIndex],
      staff: serviceObj.itemData ? serviceObj.itemData.id : null,
    };
    setServiceDetails(updatedServiceList);
  };

  const handleStartTimeChange = (serviceObj, serviceIndex) => {
    const updatedServiceList = [...serviceDetails];
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
      setServiceDetails(updatedServiceList);
    } else {
      console.error("Duration value is not a number");
    }
  };

  const handleServiceDurationChange = (serviceObj, serviceIndex) => {
    const updatedServiceList = [...serviceDetails];
    const durationValue = serviceObj.itemData ? serviceObj.itemData.value : ""; // Duration value in minutes
    const startTimeValue = updatedServiceList[serviceIndex].startTime; // Start time value
    const startTime = new Date(startTimeValue); // Convert start time to Date object
    const endTime = new Date(startTime.getTime() + durationValue * 60000); // Calculate end time (add duration in milliseconds)

    updatedServiceList[serviceIndex] = {
      ...updatedServiceList[serviceIndex],
      duration: durationValue,
      endTime: endTime,
    };
    setServiceDetails(updatedServiceList);
  };

  const handleServicePriceChange = (serviceObj, serviceIndex) => {
    setServiceDetails((prevServiceList) => {
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
    serviceDetails.forEach((serviceItem) => {
      totalPrice += parseFloat(serviceItem.price) || 0; // Ensure price is always a number
    });
    return totalPrice.toFixed(2); // Round to 2 decimal places
  };

  const calcualteTotalTime = () => {
    let totalTimeDuration = 0;

    // Step 1: Iterate through each item in the serviceDetails
    serviceDetails.forEach((serviceItem) => {
      // Step 2: Sum up the duration of each service item
      totalTimeDuration += parseFloat(serviceItem.duration) || 0; // Ensure duration is always a number
    });

    // Step 3: Convert the total duration to Hh:Mm format
    const hours = Math.floor(totalTimeDuration / 60);
    const minutes = totalTimeDuration % 60;
    const formattedTotalTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    // Step 4: Return the formatted total time
    return formattedTotalTime;
  };

  const handleAddService = () => {
    const previousEndTime = serviceDetails.length > 0 ? serviceDetails[serviceDetails.length - 1].endTime : startTime; // Get the end time of the last service or set it to the current time if there are no services
    const newServiceList = [
      ...serviceDetails,
      { service: null, staff: null, startTime: previousEndTime, endTime: startTime, duration: "", price: "" },
    ];
    setServiceDetails(newServiceList);
    setServiceStartTime(previousEndTime);
  };

  const handleDeleteService = (index) => {
    const updatedServiceList = [...serviceDetails];
    updatedServiceList.splice(index, 1);

    // Update the state with the new serviceDetails
    setServiceDetails(updatedServiceList);
  };

  return (
    <React.Fragment>
      <div className="d-flex mb-8">
        <div className="add-appt__icon add-appt__icon-service" title="Date"></div>
        <div className="add-appt__date-time">
          <Table className="table-responsive table-cell-background-grey">
            <thead>
              <th>Service</th>
              <th>Staff</th>
              <th>Start at</th>
              <th>Duration</th>
              <th>Price</th>
            </thead>
            <tbody>
              {serviceDetails.map((serviceItem, serviceIndex) => (
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
                      value={serviceItem.startTime || serviceStartTime}
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
                      type="number"
                      change={(e) => !autoPopulated && handleServicePriceChange(e.value, serviceIndex)}
                    />
                  </td>
                  <td className="justify-content-center align-items-center">
                    <button
                      className="btn btn-sm text-danger remove-list"
                      onClick={() => handleDeleteService(serviceIndex)}
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tr className="mt-3">
              <td></td>
              <td></td>
              <td></td>
              <td>
                <b>Duration: {calcualteTotalTime()} Hrs</b>
              </td>
              <td>
                <b>Total: {calculateTotalPrice()} KD</b>
              </td>
              <td></td>
            </tr>
          </Table>

          <Row>
            <Col lg={6}>
              <ButtonComponent onClick={handleAddService}>Add More Service</ButtonComponent>
            </Col>
            <Col lg={6}></Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export { EditorServiceComponent };
