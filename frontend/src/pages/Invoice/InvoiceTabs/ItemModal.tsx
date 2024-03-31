import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clientsSelector } from "Selectors";

import { Modal, Form, Button } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormFields } from "Components/Common";
import { Staff, ItemTabModalProps } from "../../../types/invoiceTypes"; // Adjust the path as necessary

import { getClientSearch, getClients } from "store/actions";

const ItemTabModal: React.FC<ItemTabModalProps> = ({
  modal,
  setModal,
  toggle,
  selectedItem,
  setSelectedItem,
  itemTypeList = [], // Provide a default empty array
  staff,
  setInvoiceItemList,
  itemType,
}) => {
  const dispatch = useDispatch();

  const { clientSearch, clients } = useSelector(clientsSelector);

  useEffect(() => {
    if (!clients || clients.length === 0) {
      dispatch(getClients());
    }
  }, [dispatch, clients]);

  const clientOptions = clients.map((client) => ({
    label: `${client.name} | ${client.mobile}`,
    value: client.id,
  }));

  const [clientList, setClientList] = useState(clientSearch);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const bookableStaff = staff.filter((staffMember) => staffMember.bookable);

  const lastItemEndTime =
    itemTypeList.length > 0 ? new Date(itemTypeList[itemTypeList.length - 1].endTime) : new Date();

  const handleClientSearch = (e) => {
    dispatch(getClientSearch(e.value));
  };
  const handleStaffSelection = (staffId: number) => {
    setSelectedOption(staffId);
    if (selectedItem) {
      setSelectedItem({ ...selectedItem, staff: staffId.toString() });
    }
  };

  const updateInvoiceItemList = (newItem, itemType) => {
    console.log("newItem: ", newItem);

    setInvoiceItemList((prevItemList) => {
      let updatedList;

      let newInvoiceItem = {
        itemId: newItem.id,
        itemName: newItem.name,
        quantity: newItem.name,
        unit_price: newItem.price,
        staff: newItem.staff,
      };

      switch (itemType) {
        case "service":
          updatedList = [...prevItemList.serviceList, newItem];
          return { ...prevItemList, serviceList: updatedList };
        case "product":
          updatedList = [...prevItemList.productList, newItem];
          return { ...prevItemList, productList: updatedList };
        case "package":
          updatedList = [...prevItemList.packageList, newItem];
          return { ...prevItemList, packageList: updatedList };
        case "voucher":
          updatedList = [...prevItemList.voucherList, newItem];
          return { ...prevItemList, voucherList: updatedList };
        default:
          // Handle unknown itemType or throw an error
          return prevItemList;
      }
    });
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
        unit_price: parseFloat(values.price),
        quantity: values.quantity || 0,

        itemId: values.item,
        ...(itemType === "service" && {
          duration: values.duration,
          startTime: lastItemEndTime,
          endTime: new Date(lastItemEndTime.getTime() + values.duration * 60000),
        }),
        ...(itemType === "package" &&
          {
            // Here we need to add new enty clientPackage in data base for client's package details to add and like it to both client and invoice
          }),
        ...(itemType === "product" &&
          {
            //
          }),
      };

      updateInvoiceItemList(newItem, itemType);
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

    // Voucher
    ...(itemType === "voucher"
      ? [
          {
            id: "to-field",
            name: "to",
            label: "To",
            type: "select2",
            options: clientOptions,
            placeHolder: "Enter Recipient's Name.",
          },
          {
            id: "from-field",
            name: "from",
            label: "From",
            type: "select2",
            options: clientOptions,
            placeHolder: "Enter Sender's Name.",
          },
          {
            id: "message-field",
            name: "message",
            label: "Message",
            placeHolder: "Optional",
            type: "text",
          },
          {
            id: "code-field",
            name: "code",
            label: "Custom voucher code",
            placeHolder: "Leave blank for a generated code",
            type: "text",
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
            <button
              type="submit"
              className="btn-primary-charcoal btn sale__button-save button-module_btn-width-fit__Q4Slu button-module_btn-primary-charcoal__2P0M6"
              id="add-btn"
            >
              Add To Sale
            </button>
            <button className="sale__button-link sale__button-cancel sale__button-full-width" onClick={() => toggle()}>
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ItemTabModal;