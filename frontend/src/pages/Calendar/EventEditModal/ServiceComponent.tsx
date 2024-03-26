import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Row, Col, Button } from "reactstrap";
import { useDurationOptions, useTotalPrice, useTotalTime, useGroupedServices } from "Components/Hooks";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FieldComponent } from "Components/Common";

type ServiceItem = {
  id?: number;
  service: number;
  staff: number;
  start: Date;
  end?: Date;
  duration: string;
  price: number;
};

const ServiceComponent = ({ serviceRef, appointment, services, staff }) => {
  const [serviceDetails, setServiceDetails] = useState<ServiceItem[]>([]);
  const [serviceList, setServiceList] = useState(services);

  console.log("services:", services);
  useEffect(() => {
    const serviceList = services.map((service) => ({
      id: service.id,
      name: service.name,
      duration: service.duration,
      price: service.price,
      label: service.name,
      value: service.id,
      category: service.categoryName,
    }));

    setServiceList(serviceList);
  }, [services]);

  const [filteredServices, setFilteredServices] = useState([...services]);
  const groupedServices = useGroupedServices(filteredServices);

  const defaultStaffId = staff && staff.length > 0 ? staff[0].id : null;
  const durationOptions = useDurationOptions();
  const totalPrice = useTotalPrice(serviceDetails);
  const totalTime = useTotalTime(serviceDetails);

  const handleServiceSearch = (serviceSearchValue) => {
    if (serviceSearchValue.length > 0) {
      setFilteredServices(
        services.filter((service) => service.name.toLowerCase().includes(serviceSearchValue.toLowerCase()))
      );
    } else {
      setFilteredServices(serviceList);
    }
  };

  useEffect(() => {
    if (appointment && Array.isArray(appointment.services) && appointment.services.length > 0) {
      const initialServices = appointment.services.map((service) => ({
        id: service.id,
        service: service.service,
        staff: service.staff,
        start: new Date(service.start),
        end: new Date(service.end),
        duration: service.duration,
        price: service.price.toString(),
      }));
      setServiceDetails(initialServices);
    } else {
      // Start with an empty service if no services are available
      setServiceDetails([
        {
          id: null,
          service: null,
          staff: null,
          start: new Date(),
          end: new Date(),
          duration: "",
          price: null,
        },
      ]);
    }
  }, [appointment]);

  // Update serviceRef with the current state of serviceDetails
  useEffect(() => {
    serviceRef.current = serviceDetails;
  }, [serviceRef, serviceDetails]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: { services: serviceDetails },
    validationSchema: Yup.object({
      // Define your validation schema here
    }),
    onSubmit: () => {},
  });

  const handleServiceSelect = (event, serviceIndex) => {
    const selectedService = event;
    const updatedServiceDetails = [...serviceDetails];

    // Ensure start time is a Date object
    const startTime = new Date(updatedServiceDetails[serviceIndex].start);

    // Calculate end time by adding duration to start time
    // Assuming duration is in minutes and needs to be converted to milliseconds
    const durationInMilliseconds = (selectedService.duration || 0) * 60000;
    const endTime = new Date(startTime.getTime() + durationInMilliseconds);

    updatedServiceDetails[serviceIndex] = {
      ...updatedServiceDetails[serviceIndex],
      service: selectedService.value, // Update with the selected service ID
      staff: defaultStaffId,
      start: startTime, // Ensure start is a Date object
      end: endTime, // Set the calculated end time
      duration: selectedService.duration || null,
      price: selectedService.price || null,
    };

    setServiceDetails(updatedServiceDetails);
    setFilteredServices(services);
  };

  const handleFieldChange = (event, serviceIndex, fieldName) => {
    const updatedServiceDetails = [...serviceDetails];
    updatedServiceDetails[serviceIndex] = {
      ...updatedServiceDetails[serviceIndex],
      [fieldName]: event.target.value,
    };
    setServiceDetails(updatedServiceDetails);
  };

  const handleServiceDurationChange = (event, serviceIndex) => {
    // Ensure start time is a Date object
    const startTime = new Date(serviceDetails[serviceIndex].start);
    const updatedServiceDuration = event.target.value;
    // Calculate end time by adding duration to start time
    // Assuming duration is in minutes and needs to be converted to milliseconds
    const durationInMilliseconds = (updatedServiceDuration || 0) * 60000;
    const endTime = new Date(startTime.getTime() + durationInMilliseconds);

    const updatedServiceDetails = [...serviceDetails];
    updatedServiceDetails[serviceIndex] = {
      ...updatedServiceDetails[serviceIndex],
      duration: event.target.value,
      end: endTime,
    };
    setServiceDetails(updatedServiceDetails);
  };

  const handleServiceStartChange = (event, serviceIndex) => {
    console.log("EVENTT: ", event);
    // Ensure serviceDuration is treated as a number
    const serviceDuration = Number(serviceDetails[serviceIndex].duration);

    // Parse the updated start time from the event
    const updatedServiceStart = new Date(event);

    // Calculate end time by adding duration to start time
    // Assuming duration is in minutes and needs to be converted to milliseconds
    const durationInMilliseconds = serviceDuration * 60000;
    const endTime = new Date(updatedServiceStart.getTime() + durationInMilliseconds);

    const updatedServiceDetails = [...serviceDetails];
    updatedServiceDetails[serviceIndex] = {
      ...updatedServiceDetails[serviceIndex],
      start: updatedServiceStart, // Set the new start time
      end: endTime, // Set the calculated end time
    };

    setServiceDetails(updatedServiceDetails);
  };

  const handleDeleteService = (index) => {
    const updatedServiceList = [...serviceDetails];
    updatedServiceList.splice(index, 1);

    // Update the state with the new serviceDetails
    setServiceDetails(updatedServiceList);
  };

  // Add and Remove Services
  const handleAddService = (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up

    // Determine the start date for the new service
    let newStartDate;
    if (serviceDetails.length > 0) {
      const lastService = serviceDetails[serviceDetails.length - 1];
      console.log("lastService: ", lastService);

      newStartDate = new Date(lastService.end); // Set to the end date of the last service
    } else {
      newStartDate = new Date(); // Default to current date if no services are present
    }

    // Create a new service detail object
    const newServiceDetail = {
      id: null,
      service: null,
      staff: defaultStaffId,
      start: newStartDate,
      end: new Date(newStartDate.getTime() + 60 * 60 * 1000), // Example: set end date 1 hour after start
      duration: "",
      price: null,
    };

    // Add the new service detail to the existing list
    setServiceDetails([...serviceDetails, newServiceDetail]);
  };

  console.log("serviceList: ", serviceList);
  const fields = (serviceIndex) => [
    {
      id: `service-field-${serviceIndex}`,
      name: "service",
      label: "Service",
      type: "searchDropdown",
      value: serviceList.find((service) => service.id === serviceDetails[serviceIndex].service)?.label || "",
      OptionCategories: groupedServices,
      width: "30%",
      onChange: (event) => {
        handleFieldChange(event, serviceIndex, "service");
        const inputValue = event.target.value;
        if (inputValue.length > 0) {
          handleServiceSearch(inputValue);
        }
      },
      onSelect: (event) => {
        handleServiceSelect(event, serviceIndex);
      },
    },
    {
      id: `service-staff-field-${serviceIndex}`,
      name: "serviceStaff",
      label: "Staff",
      type: "select",
      width: "20%", // Set width for the first column
      value: serviceDetails[serviceIndex].staff,
      onChange: (event) => handleFieldChange(event, serviceIndex, "staff"),
      options: staff.map((items) => ({
        id: items.id,
        label: items.name,
        value: items.id,
      })),
    },
    {
      id: `service-start-field-${serviceIndex}`,
      name: "serviceStart",
      label: "StartTime",
      type: "time",
      width: "15%", // Set width for the first column
      value: serviceDetails[serviceIndex].start,
      onChange: (event) => handleServiceStartChange(event, serviceIndex),
    },
    {
      id: `service-duration-field-${serviceIndex}`,
      name: "serviceDuration",
      label: "Duration",
      type: "select",
      width: "15%", // Set width for the first column
      value: serviceDetails[serviceIndex].duration,
      onChange: (event) => handleServiceDurationChange(event, serviceIndex),
      options: durationOptions.map((items) => ({
        id: items.id,
        label: items.name,
        value: items.id,
      })),
    },
    {
      id: `service-price-field-${serviceIndex}`,
      name: "servicePrice",
      label: "Price",
      type: "text",
      width: "15%", // Set width for the first column
      value: serviceDetails[serviceIndex].price,
      suffix: { text: "KD" },
      onChange: (event) => handleFieldChange(event, serviceIndex, "price"),
    },
  ];

  return (
    <React.Fragment>
      <div className="add-appt__row add-app__service-section">
        <div className="add-appt__icon add-appt__icon-service" title="Date"></div>
        <div className="services-group">
          <Table className="table caption table-responsive table-cell-background-gray" id="services_table">
            <tbody>
              {serviceDetails.map((serviceItem, serviceIndex) => (
                <tr key={serviceIndex} className={`service-row service-${serviceIndex}`}>
                  {fields(serviceIndex).map((field) => (
                    <td key={field.id} style={{ width: field.width }}>
                      <FieldComponent formStructure="table" field={field} validation={validation} />
                    </td>
                  ))}
                  <td className="multi-book-add-cell">
                    {serviceDetails && serviceDetails.length > 1 && (
                      <span
                        title="Remove customer from appointment"
                        className="clear-customer"
                        onClick={() => handleDeleteService(serviceIndex)}
                      >
                        <i className="ri-close-line fs-16"></i>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tr className="service-totals-row">
              <td>
                <button type="button" className="multi-book-add-button" onClick={handleAddService}>
                  Add another service
                </button>
              </td>
              <td></td>
              <td></td>
              <td>{totalTime} Hrs</td>
              <td>
                <b>{totalPrice} KD</b>
              </td>
              <td></td>
            </tr>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
};

export { ServiceComponent };
