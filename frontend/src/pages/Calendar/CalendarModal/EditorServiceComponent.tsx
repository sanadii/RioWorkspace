import React, { useEffect, useState } from "react";
import { Table, Row, Col } from "reactstrap";

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

  const start = appointment.start;

  // console.log("start: ", start)

  const [serviceStartTime, setServiceStartTime] = useState(start);
  const [autoPopulated, setAutoPopulated] = useState<boolean>(false);

  // TimePicker Settings
  const minTime = new Date();
  minTime.setHours(10, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(20, 0, 0);

  useEffect(() => {
    if (appointment && appointment.services) {
      const initialServices = appointment.services.map((service) => ({
        id: service.id, // Assuming serviceId is the ID of the service
        service: service.serviceId, // Assuming serviceId is the ID of the service
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
        start: start,
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
      const start = new Date(startTimeValue); // Convert start time to Date object
      const end = new Date(start.getTime() + durationValue * 60000); // Calculate end time (add duration in milliseconds)

      updatedServiceList[serviceIndex] = {
        ...updatedServiceList[serviceIndex],
        start: startTimeValue,
        end: end,
      };
      setServiceDetails(updatedServiceList);
    } else {
      console.error("Duration value is not a number");
    }
  };

  const handleServiceDurationChange = (serviceObj, serviceIndex) => {
    const updatedServiceList = [...serviceDetails];
    const durationValue = serviceObj.itemData ? serviceObj.itemData.value : ""; // Duration value in minutes
    const startTimeValue = updatedServiceList[serviceIndex].start; // Start time value
    const start = new Date(startTimeValue); // Convert start time to Date object
    const end = new Date(start.getTime() + durationValue * 60000); // Calculate end time (add duration in milliseconds)

    updatedServiceList[serviceIndex] = {
      ...updatedServiceList[serviceIndex],
      duration: durationValue,
      end: end,
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
    for (let i = 0; i <= 8 * 4; i++) {
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
    const previousEndTime = serviceDetails.length > 0 ? serviceDetails[serviceDetails.length - 1].end : start;
    const newServiceList = [
      ...serviceDetails,
      {
        id: null, // You can set this to null or omit it entirely
        service: null,
        staff: null,
        start: previousEndTime,
        end: start,
        duration: "",
        price: "",
      },
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

  const flattenServices = (servicesArray) => {
    const flattened = {};
    servicesArray.forEach((service, index) => {
      Object.keys(service).forEach((key) => {
        flattened[`${key}_${index}`] = service[key];
      });
    });
    return flattened;
  };

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: appointment && appointment.services ? flattenServices(appointment.services) : {},
    validationSchema: Yup.object({
      // start: Yup.date().required("Start Time is required"),
    }),
    onSubmit: () => {
      // No submission
    },
  });

  const fields = [
    {
      id: "service-field",
      name: "Service",
      label: "Service",
      type: "select",
      options: services.map((items) => ({
        id: items.id,
        label: items.name,
        value: items.id,
      })),
      // onChange: (e) => handleServiceChange(e, serviceIndex),
    },
    {
      id: "service-staff-field",
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
      id: "service-start-field",
      name: "ServiceStart",
      label: "Start at",
      type: "date",
      // onChange: (e) => handleStartTimeChange(e, serviceIndex),
    },
    {
      id: "service-duration-field",
      name: "serviceDuration",
      label: "Duration",
      type: "select",
      // onChange: (e) => handleServiceDurationChange(e, serviceIndex),
    },
    {
      id: "service-price-field",
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
                  {fields.map((field) => (
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
              <button onClick={handleAddService}>Add More Service</button>
            </Col>
            <Col lg={6}></Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export { EditorServiceComponent };
