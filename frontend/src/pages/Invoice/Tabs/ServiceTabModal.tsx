import React, { useState } from "react";
import { Modal, Form, ModalHeader, ModalBody, Button } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormFields } from "Components/Common";

import { Service, ServiceTabModalProps} from "../InvoiceInterfaces"; // Adjust the path as necessary

const ServiceTabModal: React.FC<ServiceTabModalProps> = ({ modal, setModal, toggle, selectedService, setSelectedService, serviceList, staff, setServiceList }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const bookableStaff = staff.filter((staffMember) => staffMember.bookable);

  const lastServiceEndTime = serviceList.length > 0 ? new Date(serviceList[serviceList.length - 1].endTime) : new Date();

  console.log("selectedService: ", selectedService)
  const handleStaffSelection = (staffId: number) => {
    setSelectedOption(staffId);
    if (selectedService) {
      setSelectedService({ ...selectedService, staff: staffId.toString() });
    }
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: selectedService?.id || null,
      name: selectedService?.name || "",
      duration: selectedService?.duration || null,
      staff: selectedService?.staff || null,
      price: selectedService?.price || "0",
    },
    validationSchema: Yup.object({
      staff: Yup.number().integer("Staff must be an integer").nullable().required("Staff is required"),
      price: Yup.number().positive("Price must be a positive number").nullable().required("Price is required"),
    }),
    onSubmit: (values) => {
      const newService = {
        id: values.id,
        name: values.name,
        duration: values.duration,
        startTime: lastServiceEndTime,
        endTime: new Date(lastServiceEndTime.getTime() + (values.duration * 60000)), // Assuming duration is in minutes
        staff: parseInt(values.staff, 10),
        price: parseFloat(values.price),
      };
      setServiceList([...serviceList, newService]);
      setSelectedOption(null)
      validation.resetForm();
      toggle();
    },
  });

  const fields = [
    {
      id: "staff-field",
      name: "staff",
      label: "Staff",
      type: "imageSelect",
      options: bookableStaff.map((item) => ({
        id: item.id, // This should already be a number
        label: item.name,
        value: item.id.toString(), // Convert to string if necessary
        image: item.image,
        onClick: () => handleStaffSelection(item.id),
      })),
    },
    {
      id: "price-field",
      name: "price",
      label: "Price",
      type: "number",
    },
  ];

  return (
    <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
      <ModalHeader>
        {" "}
        {selectedService?.name} - {selectedService?.price} - {selectedService?.duration}
      </ModalHeader>{" "}
      <ModalBody>
        <Form
          className="tablelist-form"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          {fields.map((field) => (
            <FormFields key={field.id} field={field} validation={validation} selectedOption={selectedOption} />
          ))}

          <div className="hstack flex-wrap gap-2">
            <Button color="primary" onClick={() => setModal(false)}>
              Cancel
            </Button>
            <button type="submit" className="btn btn-success" id="add-btn">
              Add To Invoice
            </button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ServiceTabModal;
