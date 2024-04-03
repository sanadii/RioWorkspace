import React, { useState } from "react";
import { Modal, Form, Button } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormFields } from "Components/Common";
import { Staff, Service, Product, Package, Voucher, SummaryItemModalProps } from "../../../types/invoiceTypes";

const SummaryItemModal: React.FC<SummaryItemModalProps> = ({
  isEditModal,
  setIsEditModal,
  toggleEditModal,
  selectedItem,
  invoiceItemList,
  staff,
  setInvoiceItemList,
  selectedIndex,
  discountOptions,
  itemType,
}) => {
  const bookableStaff = staff?.filter((staffMember) => staffMember.bookable) || [];

  const handleRemoveItem = () => {
    if (selectedIndex !== null) {
      const updatedItemList = [...invoiceItemList];
      updatedItemList.splice(selectedIndex, 1);
      setInvoiceItemList(updatedItemList);
    }
    setIsEditModal(false);
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: null,
      name: selectedItem?.name || "",
      service: itemType === "service" ? (selectedItem as Service)?.id || null : undefined,
      package: itemType === "package" ? (selectedItem as Package)?.id || null : undefined,
      voucher: itemType === "voucher" ? (selectedItem as Voucher)?.id || null : undefined,
      product: itemType === "product" ? (selectedItem as Product)?.id || null : undefined,
      duration: itemType === "service" ? (selectedItem as Service)?.service || null : undefined,
      staff: selectedItem?.staff || null,
      price: selectedItem?.price || 0,
      discount: selectedItem?.discount || 0,
    },
    validationSchema: Yup.object({
      staff: Yup.number().integer("Staff must be an integer").nullable().required("Staff is required"),
      price: Yup.number().positive("Price must be a positive number").nullable().required("Price is required"),
    }),
    onSubmit: (values) => {
      const updatedItem = {
        id: null,
        name: values.name,
        service: itemType === "service" ? values.id : undefined,
        package: itemType === "package" ? values.id : undefined,
        voucher: itemType === "voucher" ? values.id : undefined,
        product: itemType === "product" ? values.id : undefined,
        duration: itemType === "service" ? values.duration : undefined,
        staff: values.staff,
        price: values.price,
        discount: values.discount,
      };

      if (selectedIndex !== null) {
        const updatedItemList = [...invoiceItemList];
        updatedItemList[selectedIndex] = updatedItem;
        setInvoiceItemList(updatedItemList);
      } else {
        setInvoiceItemList([...invoiceItemList, updatedItem]);
      }

      validation.resetForm();
      toggleEditModal();
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
      inputGroupIcon: "mdi mdi-face-woman",

      options: bookableStaff.map((item) => ({
        id: item.id,
        label: item.name,
        value: item.id.toString(),
      })),
    },
    {
      id: "discount-field",
      name: "discount",
      label: "Discount",
      type: "select",
      inputGroupIcon: "mdi mdi-content-cut",
      options: discountOptions?.map((item) => ({
        id: item.id,
        label: item.name,
        value: item.value.toString(),
      })),
    },
  ];

  console.log("selectedItem: ", selectedItem);
  return (
    <Modal id="showModal" size="md" className="sale__modal" isOpen={isEditModal} toggle={toggleEditModal} centered>
      <div className="sale__modal-head">HH {selectedItem?.name}</div>
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
            <button className="sale__button-remove" onClick={handleRemoveItem}>
              Remove
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default SummaryItemModal;
