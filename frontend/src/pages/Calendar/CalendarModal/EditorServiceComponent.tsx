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

const EditorServiceComponent = ({ serviceRef, appointment, services, staff }) => {
  // Initialize with an empty service if no services are available in the appointment

  const [serviceDetails, setServiceDetails] = useState<ServiceItem[]>([]);

  const serviceList = useGroupedServices(services);
  const defaultStaffId = staff.length > 0 ? staff[0].id : null;
  const durationOptions = useDurationOptions();
  const totalPrice = useTotalPrice(serviceDetails);
  const totalTime = useTotalTime(serviceDetails);

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

  // Add and Remove Services
  const handleAddService = () => {
    setServiceDetails([
      ...serviceDetails,
      {
        id: null,
        service: null,
        staff: defaultStaffId,
        start: new Date(),
        end: new Date(),
        duration: "",
        price: null,
      },
    ]);
  };

  const handleServiceChange = (event, serviceIndex) => {
    const selectedService = event;
    // console.log("selectedService: ", selectedService);

    const updatedServiceDetails = [...serviceDetails];
    updatedServiceDetails[serviceIndex] = {
      ...updatedServiceDetails[serviceIndex],
      service: selectedService.value, // Update with the service ID
      staff: defaultStaffId,
      duration: selectedService.duration || null,
      price: selectedService.price || null,
    };
    setServiceDetails(updatedServiceDetails);
  };

  const handleFieldChange = (event, serviceIndex, fieldName) => {
    const updatedServiceDetails = [...serviceDetails];
    updatedServiceDetails[serviceIndex] = {
      ...updatedServiceDetails[serviceIndex],
      [fieldName]: event.target.value,
    };
    setServiceDetails(updatedServiceDetails);
  };

  const handleDeleteService = (index) => {
    const updatedServiceList = [...serviceDetails];
    updatedServiceList.splice(index, 1);

    // Update the state with the new serviceDetails
    setServiceDetails(updatedServiceList);
  };

  const fields = (serviceIndex) => [
    {
      id: `service-field-${serviceIndex}`,
      name: "service",
      label: "Service",
      type: "reactSelect",
      // value: serviceList.find(option => option.value === servicesInitialValues[serviceIndex].service),
      value: serviceList
        .flatMap((group) => group.options)
        .find((option) => option.value === serviceDetails[serviceIndex].service),

      options: serviceList,
      width: "30%", // Set width for the first column
      onChange: (event) => handleServiceChange(event, serviceIndex),
    },
    {
      id: `service-staff-field-${serviceIndex}`,
      name: "serviceStaff",
      label: "Staff",
      type: "select",
      width: "25%", // Set width for the first column
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
      onChange: (event) => handleFieldChange(event, serviceIndex, "start"),
    },
    {
      id: `service-duration-field-${serviceIndex}`,
      name: "serviceDuration",
      label: "Duration",
      type: "select",
      width: "15%", // Set width for the first column
      value: serviceDetails[serviceIndex].duration,
      onChange: (event) => handleFieldChange(event, serviceIndex, "duration"),
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
      <div className="d-flex mb-8">
        <div className="add-appt__icon add-appt__icon-service" title="Date"></div>
        <div className="services-group">
          <Table className="table-responsive table-cell-background-grey" id="services_table">
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
                      <Link
                        className="btn-secondary btn-link pop delete-service inline"
                        to="#"
                        data-original-class="delete-service"
                        title="Delete service"
                        data-original-title="Delete this service?"
                        data-content='<a class="btn  bln-close"><i class="fa fa-times"></i> Cancel</a> <div class="btn btn-danger deleter bln-close multi-book-remove" data-delete-service="service-0"><i class="fa fa-trash-o"></i> Delete</div>'
                        onClick={() => handleDeleteService(serviceIndex)}
                      >
                        ×
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tr className="mt-3">
              <td>
                <Button onClick={handleAddService}>Add More Service</Button>
              </td>
              <td></td>
              <td></td>
              <td>
                <b>{totalTime} Hrs</b>
              </td>
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

export { EditorServiceComponent };
