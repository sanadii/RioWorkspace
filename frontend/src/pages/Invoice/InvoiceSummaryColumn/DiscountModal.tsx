import React, { useState } from "react";
import { Modal, Form, ModalHeader, ModalBody, Button } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormFields } from "Components/Common";
import { Package, DiscountModalProps } from "../../../types/invoiceTypes"; // Adjust the path as necessary

const DiscountModal: React.FC<DiscountModalProps> = ({
  isDiscountModal,
  setIsDiscountModal,
  toggleDiscountModal,
  discountOptions,
  discountValue,
  setDiscountValue,
}) => {
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: discountValue?.id || null,
      type: discountValue?.name || "percentage",
      amount: discountValue?.value || 0,
    },
    validationSchema: Yup.object({
      amount: Yup.number().positive("Price must be a positive number").nullable().required("Price is required"),
    }),
    onSubmit: (values) => {
      const updatedPackage = {
        id: values.id,
        type: values.type,
        amount: values.amount,
      };

      //   if (selectedIndex !== null) {
      //     const updatedPackageList = [...packageList];
      //     updatedPackageList[selectedIndex] = updatedPackage;
      //     setPackageList(updatedPackageList);
      //   } else {
      //     setPackageList([...packageList, updatedPackage]);
      //   }

      validation.resetForm();
      toggleDiscountModal();
    },
  });

  const fields = [
    {
      id: "discount-field",
      name: "discount",
      label: "Discount",
      type: "select",
      options: discountOptions?.map((item) => ({
        id: item.id,
        label: item.name,
        value: item.value.toString(),
      })),
    },
    {
      id: "amount-field",
      name: "amount",
      label: "type",
      type: "number",
      inputGroupText: "KD",
    },
  ];

  return (
    <Modal id="showModal" size="md" className="sale__modal" isOpen={isDiscountModal} toggle={toggleDiscountModal} centered>
      <div className="sale__modal-head">{discountValue?.name}</div>
      <div className="sale__modal-body sale__modal-body--gray sale__edit-line-item">
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
            <button
              className="sale__button-remove"
              // onClick={handleRemovePackage}
            >
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

export default DiscountModal;
