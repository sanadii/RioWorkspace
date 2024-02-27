import React, { useState } from "react";
import { Modal, Form, Button } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormFields } from "Components/Common";
import { Staff } from "../../../interfaces/InvoiceInterfaces"; // Adjust the path as necessary

interface ItemTabModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  selectedItem: any; // Adjust the type as necessary
  setSelectedItem: React.Dispatch<any>; // Adjust the type as necessary
  itemList: any[]; // Adjust the type as necessary
  staff: Staff[];
  setItemList: React.Dispatch<any>; // Adjust the type as necessary
  itemType: "service" | "product" | "package";
}

const ItemTabModal: React.FC<ItemTabModalProps> = ({
  modal,
  setModal,
  toggle,
  selectedItem,
  setSelectedItem,
  itemList,
  staff,
  setItemList,
  itemType,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const bookableStaff = staff.filter((staffMember) => staffMember.bookable);

  const lastItemEndTime = itemList.length > 0 ? new Date(itemList[itemList.length - 1].endTime) : new Date();

  const handleStaffSelection = (staffId: number) => {
    setSelectedOption(staffId);
    if (selectedItem) {
      setSelectedItem({ ...selectedItem, staff: staffId.toString() });
    }
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      item: selectedItem?.id || null,
      name: selectedItem?.name || "",
      staff: selectedItem?.staff || null,
      price: selectedItem?.price || "0",
      ...(itemType === "service" && {
        duration: selectedItem?.duration || null,
      }),
      ...(itemType === "product" && {
        quantity: selectedItem?.quantity || 1,
      }),
  
    },
    validationSchema: Yup.object({
      staff: Yup.number().integer("Staff must be an integer").nullable().required("Staff is required"),
      price: Yup.number().positive("Price must be a positive number").nullable().required("Price is required"),
      quantity:
        itemType === "product"
          ? Yup.number().positive("Quantity must be a positive number").nullable().required("Quantity is required")
          : undefined,
    }),
    onSubmit: (values) => {
      const newItem = {
        name: values.name,
        staff: parseInt(values.staff, 10),
        price: parseFloat(values.price),
        ...(itemType === "service" && {
          service: values.item,
          duration: values.duration,
          startTime: lastItemEndTime,
          endTime: new Date(lastItemEndTime.getTime() + values.duration * 60000),
        }),
        ...(itemType === "package" && {
          package: values.item,
        }),
        ...(itemType === "product" && {
          product: values.item,
          quantity: values.quantity,
        }),
      };
      setItemList([...itemList, newItem]);
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
        id: item.id,
        label: item.name,
        value: item.id.toString(),
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
    ...(itemType === "product"
      ? [
          {
            id: "quantity-field",
            name: "quantity",
            label: "Quantity",
            type: "number",
          },
        ]
      : []),
  ];

  return (
    <Modal id="showModal" className="sale__modal" isOpen={modal} toggle={toggle} centered>
      <div className="sale__modal-head">
        {selectedItem?.name} - {selectedItem?.price} {itemType === "service" && `- ${selectedItem?.duration}`}
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

export default ItemTabModal;
