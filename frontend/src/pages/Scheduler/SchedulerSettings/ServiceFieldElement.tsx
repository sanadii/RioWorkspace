import React, { useEffect, useState, useRef, useCallback } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Table } from "reactstrap";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

const ServiceFieldElement = ({ services, staff, serviceValue }) => {
  const [serviceList, setServiceList] = useState([{ id: 1, service: "", staff: "", price: 0, duration: "" }]);

  useEffect(() => {
    serviceValue.current = serviceList;
  }, [serviceList]);

  console.log("serviceValue: ", serviceValue);
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  };

  const handleServiceChange = (serviceObj, serviceIndex) => {
    const updatedServiceList = [...serviceList];
    updatedServiceList[serviceIndex] = {
      ...updatedServiceList[serviceIndex],
      service: serviceObj.itemData ? serviceObj.itemData.id : null,
      duration: serviceObj.itemData ? formatDuration(serviceObj.itemData.duration) : "", // Set the duration based on the selected service
      price: serviceObj.itemData ? serviceObj.itemData.price : null,
      // Add any other properties you need to update
    };
    setServiceList(updatedServiceList);
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
    const updatedServiceList = [...serviceList];
    updatedServiceList[serviceIndex] = {
      ...updatedServiceList[serviceIndex],
      price: serviceObj.itemData ? serviceObj.itemData.value : 0,
    };
    setServiceList(updatedServiceList);
  };

  const generateDurationOptions = () => {
    const options = [];
    for (let i = 0; i <= 24 * 4; i++) {
      const hours = Math.floor(i / 4);
      const minutes = (i % 4) * 15;
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      options.push({ text: formattedTime, value: minutes });
    }
    return options;
  };

  const addServiceTable = () => {
    const newServiceList = [
      ...serviceList,
      { id: serviceList.length + 1, service: "", staff: "", price: 0, duration: "" },
    ];
    setServiceList(newServiceList);
  };

  console.log("serviceList: ", serviceList);

  return (
    <div className="custom-field-row">
      <h4>Services</h4>
      {serviceList.map((serviceItem, serviceIndex) => (
        <div key={serviceIndex} className="services">
          <Table>
            <tr>
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
                  change={(e) => handleStaffChange(e, serviceIndex)}
                  placeholder="Select a Staff"
                  allowFiltering={true}
                  value={serviceItem.staff}
                />
              </td>
              <td>Start</td>
              <td>
                <DropDownListComponent
                  id={`serviceDuration-${serviceIndex}`}
                  dataSource={generateDurationOptions()}
                  placeholder="Select Duration"
                  value={serviceItem.duration || "00:00"}
                  change={(e) => handleServiceDurationChange(e, serviceIndex)}
                />
              </td>
              <td>
                <TextBoxComponent
                  id={`price-${serviceIndex}`}
                  value={String(serviceItem.price || 0)}
                  placeholder="Price"
                  change={(e) => handleServicePriceChange(e, serviceIndex)}
                />
              </td>
              <td></td>
            </tr>
          </Table>
        </div>
      ))}
      <ButtonComponent onClick={addServiceTable}>Add More Service</ButtonComponent>
    </div>
  );
};

export { ServiceFieldElement };
