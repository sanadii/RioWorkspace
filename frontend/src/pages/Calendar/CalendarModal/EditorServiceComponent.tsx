import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button } from "reactstrap";

// Form and Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { FieldComponent } from "Components/Common";

type ServiceItem = {
  id?: number;
  service: number;
  staff: number;
  start: Date;
  end: Date;
  duration: string;
  price: string;
};

const EditorServiceComponent = ({ serviceRef, appointment, services, staff }) => {
  // Creating Client List for the form selection
  const [serviceList, setServiceList] = React.useState([]);

  useEffect(() => {
    const groupedServices = services.reduce((acc, service) => {
      // Find an existing category in the accumulator
      const category = acc.find((c) => c.label === service.categoryName);

      // Create the service option
      const serviceOption = {
        label: service.name,
        value: service.id,
        duration: service.duration,
        price: service.price,
      };

      if (category) {
        // If the category exists, push the new service into it
        category.options.push(serviceOption);
      } else {
        // Otherwise, create a new category with the service
        acc.push({
          label: service.categoryName,
          options: [serviceOption],
        });
      }

      return acc;
    }, []);

    setServiceList(groupedServices);
  }, [services]);

  const [serviceDetails, setServiceDetails] = useState<ServiceItem[]>([
    {
      id: (appointment && appointment.service && appointment.service.id) || null,
      service: (appointment && appointment.service && appointment.service.service) || null,
      staff: (appointment && appointment.service && appointment.service.staff) || null,
      start: (appointment && appointment.service && appointment.service.start) || null,
      end: (appointment && appointment.service && appointment.service.end) || null,
      duration: (appointment && appointment.service && appointment.service.duration) || 0,
      price: (appointment && appointment.service && appointment.service.price) || 0,
    },
  ]);
  console.log("serviceDetails: ", serviceDetails);

  const start = (appointment && appointment.start) || null;

  const [serviceStartTime, setServiceStartTime] = useState(start);
  const [autoPopulated, setAutoPopulated] = useState<boolean>(false);

  // TimePicker Settings
  const minTime = new Date();
  minTime.setHours(10, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(20, 0, 0);

  useEffect(() => {
    if (serviceDetails) {
      const initialServices = serviceDetails.map((service) => ({
        id: service.id, // Assuming serviceId is the ID of the service
        service: service.service, // Assuming serviceId is the ID of the service
        staff: service.staff, // Assuming staff is the ID of the staff
        start: new Date(service.start), // Convert to Date object if necessary
        end: new Date(service.end), // Convert to Date object if necessary
        duration: service.duration,
        price: service.price.toString(), // Convert to string if necessary
      }));
      setServiceDetails(initialServices);
    }
  }, [appointment, setServiceDetails]);

  // Form Field Functions
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  };

  // Client Constants
  const handleServiceChange = (event) => {
    const selectedService = event;
    if (selectedService) {
      setServiceDetails((prevState) => ({
        ...prevState,
        id: Number.isInteger(selectedService.id) ? selectedService.id : null,
        name: selectedService.name || "",
        mobile: selectedService.mobile || "",
        email: selectedService.email || "",
        dateOfBirth: selectedService.dateOfBirth || null,
      }));
    }
    serviceRef.current = selectedService;
    console.log("clientRef.current: ", serviceRef.current);
  };

  // const handleServiceChange = (e, serviceIndex) => {
  //   setAutoPopulated(true); // Set autoPopulated to true after the initial service selection
  // };

  const generateDurationOptions = () => {
    const options = [];
    for (let i = 0; i <= 8 * 4; i++) {
      const hours = Math.floor(i / 4);
      const minutes = (i % 4) * 15;
      const totalMinutes = hours * 60 + minutes;
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      options.push({ id: totalMinutes, name: formattedTime, value: totalMinutes });
    }
    return options;
  };
  const durationOptions = generateDurationOptions();

  // Service Summary
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

  // Add and Remove Services
  const handleAddService = () => {
    const newService = {
      id: null,
      service: null,
      staff: null,
      start: new Date(), // Initialize with a default date, or as required
      end: new Date(), // Initialize with a default date, or as required
      duration: "",
      price: "",
    };

    setServiceDetails((prevServiceDetails) => [...prevServiceDetails, newService]);
  };

  const handleDeleteService = (index) => {
    const updatedServiceList = [...serviceDetails];
    updatedServiceList.splice(index, 1);

    // Update the state with the new serviceDetails
    setServiceDetails(updatedServiceList);
  };

  // Assuming servicesDetails is an array of service items
  const servicesInitialValues = serviceDetails.map((serviceItem, index) => ({
    index, // Include the index
    id: serviceItem.id || null,
    service: serviceItem.service || null,
    staff: serviceItem.staff || null,
    start: serviceItem.start || null, // Assuming clientDetails.start is not an array
    duration: serviceItem.duration || 0,
    price: serviceItem.price || 0,
  }));

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: { services: servicesInitialValues },
    validationSchema: Yup.object({
      // Define your validation schema here
    }),
    onSubmit: () => {
      // Handle form submission
    },
  });

  const fields = (serviceIndex) => [
    {
      id: `service-field-${serviceIndex}`,
      name: "Service",
      label: "Service",
      type: "reactSelect",
      options: serviceList,
      onChange: (service) => {
        console.log("e is: ", service);
        // console.log("service is: ", service);

        handleServiceChange(service);
        // validation.handleChange(e.label);
      },
    },
    {
      id: `service-staff-field-${serviceIndex}`,
      name: "serviceStaff",
      label: "Staff",
      type: "select",
      options: staff.map((items) => ({
        id: items.id,
        label: items.name,
        value: items.id,
      })),
      // onChange: (e) => handleStaffChange(e, serviceIndex),
    },
    {
      id: `service-start-field-${serviceIndex}`,
      name: "ServiceStart",
      label: "Start at",
      type: "date",
      // onChange: (e) => handleStartTimeChange(e, serviceIndex),
    },
    {
      id: `service-duration-field-${serviceIndex}`,
      name: "serviceDuration",
      label: "Duration",
      type: "select",
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
      // onChange: (e) => handleServicePriceChange(e, serviceIndex),
    },
  ];

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
                  {fields(serviceIndex).map((field) => (
                    <td key={field.id}>
                      <FieldComponent formStructure="table" field={field} validation={validation} />
                    </td>
                  ))}
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
              <Button onClick={handleAddService}>Add More Service</Button>
            </Col>
            <Col lg={6}></Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export { EditorServiceComponent };
