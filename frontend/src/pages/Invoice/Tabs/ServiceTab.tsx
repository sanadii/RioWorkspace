import React, { useState, useCallback, Dispatch } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormFields } from "Components/Common";

const ServiceSchema = Yup.object().shape({
  staff: Yup.string().required("Staff is required"),
  price: Yup.number().required("Price is required"),
});

interface Service {
  id: Number;
  name: string;
  duration: number;
  categoryName?: string;
  staff: string;
  price: string;
}

interface Staff {
  id: Number;
  name: string;
  bookable: boolean;
}

interface ServiceTabProps {
  serviceList: any; // existing type
  services: Service[]; // add this line
  staff: Staff[]; // add this line
  setServiceList: Dispatch<any>; // existing type
}

const ServiceTab: React.FC<ServiceTabProps> = ({ services, staff, serviceList, setServiceList }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  const bookableStaff = staff.filter(staffMember => staffMember.bookable);

  const groupServicesByCategory = (services: Service[]) => {
    return services.reduce((acc: Record<string, Service[]>, service: Service) => {
      const categoryName = service.categoryName || "Others";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(service);
      return acc;
    }, {});
  };

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      // setLead("");
    } else {
      setModal(true);
    }
  }, [modal]);

  const handleServiceSelectionClick = (service: Service) => {
    setSelectedService(service);
    setModal(true);
  };

  const handleAddServiceClick = (values) => {
    const newService = {
      ...selectedService,
      staff: values.staff,
      price: values.price,
    };
    setServiceList([...serviceList, newService]);
    setModal(false);
  };

  const closeModal = () => {
    setModal(false);
  };

  const servicesByCategory = groupServicesByCategory(services);

  // validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: selectedService?.id || "", // Assuming staff is a string
      name: selectedService?.name || "", // Assuming staff is a string
      staff: selectedService?.staff || "", // Assuming staff is a string
      price: selectedService?.price || "", // Assuming price is a string
    },
    validationSchema: Yup.object({
      staff: Yup.number().integer("Staff must be an integer").nullable().notRequired(), // If staff is optional
      price: Yup.number().positive("Price must be a positive number").nullable().notRequired(), // If price is optional
    }),
    onSubmit: (values) => {
      const newService = {
        staff: parseInt(values.staff, 10), // Convert to integer if staff is a string
        price: parseFloat(values.price), // Convert to float if price is a string
      };
      // Handle form submission
      console.log(newService);
    },
  });

  const fields = [
    {
      id: "staff-field",
      name: "staff",
      label: "Staff",
      type: "imageSelect",
      options: bookableStaff.map((item) => ({
        id: item.id,
        label: item.name,
        value: item.id,
      })),
      // onClick: setSelectedServiceStaff (id) 
    },
    {
      id: "price-field",
      name: "price",
      label: "Price",
      type: "number",
    },
  ];

  return (
    <React.Fragment>
      <div>
        <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
          <ModalHeader> {selectedService?.name} - {selectedService?.price} - {selectedService?.duration}</ModalHeader>{" "}
          <ModalBody>
            <Formik
              initialValues={{ staff: "", price: "" }}
              validationSchema={ServiceSchema}
              onSubmit={handleAddServiceClick}
            >
              <Form>
                {fields.map((field) => (
                  <FormFields key={field.id} field={field} validation={validation} inLineStyle="" />
                ))}
              </Form>
            </Formik>
            <div className="hstack flex-wrap gap-2">
              <Button color="primary" onClick={() => closeModal()}>
                Cancel
              </Button>

              <Button color="info" onClick={() => handleAddServiceClick}>
                Add To Invoice
              </Button>
            </div>

          </ModalBody>
        </Modal>
        {Object.keys(servicesByCategory).length ? (
          Object.entries(servicesByCategory).map(([categoryName, services]) => (
            <div className="sale__service-category" key={categoryName}>
              <h3>{categoryName}</h3>
              <div className="sale__service-category-services">
                {services.map((service, index) => (
                  <div
                    className="sale__service sale__card"
                    data-testid="sale__service-item"
                    key={index}
                    onClick={() => handleServiceSelectionClick(service)}
                  >
                    <div className="sale__service-row">
                      <div className="sale__service-details">
                        <div className="sale__service-name">
                          {service.name} <span> - {service.duration} mins</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>Nothing to show</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default ServiceTab;
