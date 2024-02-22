import React, { useState } from "react";
import { Modal, Form, ModalHeader, ModalBody, Button } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormFields } from "Components/Common";

import { Product, ProductTabModalProps } from "../InvoiceInterfaces"; // Adjust the path as necessary

const ProductTabModal: React.FC<ProductTabModalProps> = ({
  modal,
  setModal,
  toggle,
  selectedProduct,
  setSelectedProduct,
  productList,
  staff,
  setProductList,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const bookableStaff = staff.filter((staffMember) => staffMember.bookable);

  console.log("selectedProduct: ", selectedProduct);
  const handleStaffSelection = (staffId: number) => {
    setSelectedOption(staffId);
    if (selectedProduct) {
      setSelectedProduct({ ...selectedProduct, staff: staffId.toString() });
    }
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: selectedProduct?.id || null,
      name: selectedProduct?.name || "",
      staff: selectedProduct?.staff || null,
      price: selectedProduct?.price || "0",
    },
    validationSchema: Yup.object({
      staff: Yup.number().integer("Staff must be an integer").nullable().required("Staff is required"),
      price: Yup.number().positive("Price must be a positive number").nullable().required("Price is required"),
    }),
    onSubmit: (values) => {
      const newProduct = {
        id: values.id,
        name: values.name,
        staff: parseInt(values.staff, 10),
        price: parseFloat(values.price),
      };
      setProductList([...productList, newProduct]);
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
    {
      id: "quantity-field",
      name: "quantity",
      label: "Quantity",
      type: "number",
    },
  ];

  return (
    <Modal id="showModal" className="sale__modal" isOpen={modal} toggle={toggle} centered>
      <div className="sale__modal-head">
        {" "}
        {selectedProduct?.name} - {selectedProduct?.price} - {selectedProduct?.duration}
      </div>{" "}
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

export default ProductTabModal;
