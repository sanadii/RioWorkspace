import React, { useState } from "react";
import { Modal, Form, ModalHeader, ModalBody, Button } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormFields } from "Components/Common";

import { Package, PackageTabModalProps } from "../InvoiceInterfaces"; // Adjust the path as necessary

const PackageTabModal: React.FC<PackageTabModalProps> = ({
  modal,
  setModal,
  toggle,
  selectedPackage,
  setSelectedPackage,
  packageList,
  staff,
  setPackageList,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const bookableStaff = staff.filter((staffMember) => staffMember.bookable);

  console.log("selectedPackage: ", selectedPackage);
  const handleStaffSelection = (staffId: number) => {
    setSelectedOption(staffId);
    if (selectedPackage) {
      setSelectedPackage({ ...selectedPackage, staff: staffId.toString() });
    }
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: selectedPackage?.id || null,
      name: selectedPackage?.name || "",
      staff: selectedPackage?.staff || null,
      price: selectedPackage?.price || "0",
    },
    validationSchema: Yup.object({
      staff: Yup.number().integer("Staff must be an integer").nullable().required("Staff is required"),
      price: Yup.number().positive("Price must be a positive number").nullable().required("Price is required"),
    }),
    onSubmit: (values) => {
      const newPackage = {
        id: values.id,
        name: values.name,
        staff: parseInt(values.staff, 10),
        price: parseFloat(values.price),
      };
      setPackageList([...packageList, newPackage]);
      setSelectedOption(null);
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
      inputGroupText: "KD",
    },
  ];

  return (
    <Modal id="showModal" className="sale__modal" isOpen={modal} toggle={toggle} centered>
      <div className="sale__modal-head">
        {" "}
        {selectedPackage?.name} - {selectedPackage?.price}
      </div>
      <div className="sale__modal-body">
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
      </div>
    </Modal>
  );
};

export default PackageTabModal;
