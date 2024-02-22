import React, { useState } from "react";
import { Modal, Form, ModalHeader, ModalBody, Button } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormFields } from "Components/Common";
import { Service, SummaryServiceModalProps } from "./InvoiceInterfaces"; // Adjust the path as necessary

const SummaryServiceModal: React.FC<SummaryServiceModalProps> = ({
  modal,
  setModal,
  toggle,
  selectedService,
  serviceList,
  staff,
  setServiceList,
  selectedIndex,
  discountOptions,
}) => {
  const bookableStaff = staff.filter((staffMember) => staffMember.bookable);
  const lastServiceEndTime =
    selectedIndex > 0
      ? new Date(serviceList[selectedIndex - 1].endTime)
      : selectedIndex === 0
      ? new Date()
      : new Date(selectedService?.endTime);

  const handleRemoveService = () => {
    if (selectedIndex !== null) {
      const updatedServiceList = [...serviceList];
      updatedServiceList.splice(selectedIndex, 1);
      setServiceList(updatedServiceList);
    }
    setModal(false);
  };

  console.log("selectedIndex: ", selectedIndex)
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: selectedService?.id || null,
      name: selectedService?.name || "",
      duration: selectedService?.duration || null,
      staff: selectedService?.staff || null,
      price: selectedService?.price || 0,
      discount: selectedService?.discount || 0,
    },
    validationSchema: Yup.object({
      staff: Yup.number().integer("Staff must be an integer").nullable().required("Staff is required"),
      price: Yup.number().positive("Price must be a positive number").nullable().required("Price is required"),
    }),
    onSubmit: (values) => {
      const updatedService = {
        id: values.id,
        name: values.name,
        duration: values.duration,
        startTime: lastServiceEndTime,
        endTime: new Date(lastServiceEndTime.getTime() + values.duration * 60000), // Assuming duration is in minutes
        staff: values.staff,
        price: parseFloat(values.price),
        discount: values.discount,
      };

      if (selectedIndex !== null) {
        const updatedServiceList = [...serviceList];
        updatedServiceList[selectedIndex] = updatedService;
        setServiceList(updatedServiceList);
      } else {
        setServiceList([...serviceList, updatedService]);
      }

      validation.resetForm();
      toggle();
    },
  });

  const fields = [
    {
      id: "price-field",
      name: "price",
      label: "Price",
      type: "number",
      inputGroupText: "KD",
    },
    {
      id: "staff-field",
      name: "staff",
      label: "Staff",
      type: "select",
      options: bookableStaff.map((item) => ({
        id: item.id, // This should already be a number
        label: item.name,
        value: item.id.toString(), // Convert to string if necessary
        image: item.image,
      })),
    },
    {
      id: "discount-field",
      name: "discount",
      label: "Discount",
      type: "select",
      options: discountOptions.map((item) => ({
        id: item.id,
        label: item.name,
        value: item.value.toString(),
      })),
    },
  ];

  return (
    <Modal id="showModal" size="md" className="sale__modal" isOpen={modal} toggle={toggle} centered>
      <div className="sale__modal-head">{selectedService?.name}</div>
      <div className="sale__modal-body sale__modal-body--grey sale__edit-line-item">
        <Form
          className="tablelist-form"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          {fields.map((field) => (
            <FormFields key={field.id} field={field} validation={validation} />
          ))}

          <div className="hstack flex-wrap gap-2">
            <button
              type="submit"
              className="btn-primary-charcoal btn sale__button button-module_btn-width-fit__Q4Slu button-module_btn-primary-charcoal__2P0M6"
              id="add-btn"
            >
              Update
            </button>
            <button className="sale__button-remove" onClick={handleRemoveService}>
              Remove
            </button>
            {/* <Button type="submit" className="btn btn-danger" id="add-btn">
              Delete
            </Button> */}
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default SummaryServiceModal;
