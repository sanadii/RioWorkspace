import React, { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { clientsSelector } from "Selectors";
import { getClientSearch, getClients } from "store/actions";

import { useFormik } from "formik";
import * as Yup from "yup";
import { FormFields } from "Components/Common";
import { Staff, ItemTabModalProps } from "types/invoiceTypes"; // Adjust the path as necessary

import { Modal, Form, Button } from "reactstrap";

const ItemTabModal: React.FC<ItemTabModalProps> = ({
  modal,
  toggle,
  selectedItem,
  setSelectedItem,
  staff,
  setInvoiceItemList,
}) => {
  const dispatch = useDispatch();
  const { clientSearch, clients } = useSelector(clientsSelector);
  const [clientList, setClientList] = useState(clientSearch);
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  const bookableStaff = staff?.filter((staffMember) => staffMember.bookable) || [];

  useEffect(() => {
    if (clients.length === 0) dispatch(getClients());
  }, [dispatch, clients]);

  const clientOptions = clients.map((client) => ({
    label: `${client.name} | ${client.mobile}`,
    value: client.id,
  }));

  // const lastItemEndTime =
  //   itemTypeList.length > 0 ? new Date(itemTypeList[itemTypeList.length - 1].endTime) : new Date();

  const handleClientSearch = (e) => {
    dispatch(getClientSearch(e.value));
  };
  const handleStaffSelection = (staffId: number) => {
    setSelectedStaff(staffId);
    if (selectedItem) {
      setSelectedItem({ ...selectedItem, staff: staffId.toString() });
    }
  };

  const updateInvoiceItemList = (newItem, itemType) => {
    setInvoiceItemList((prevItemList) => {
      const updatedList = { ...prevItemList };
      switch (itemType) {
        case "service":
          const updatedServices = prevItemList.appointmentList[0]
            ? [...prevItemList.appointmentList[0].services, newItem]
            : [newItem];
          updatedList.appointmentList = [{ ...prevItemList.appointmentList[0], services: updatedServices }];
          break;
        case "product":
          updatedList.productList = [...prevItemList.productList, newItem];
          break;
        case "package":
          updatedList.packageList = [...prevItemList.packageList, newItem];
          break;
        case "voucher":
          updatedList.voucherList = [...prevItemList.voucherList, newItem];
          break;
        default:
        // Log error or handle unknown type
      }
      return updatedList;
    });
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      item: selectedItem?.id || null,
      name: selectedItem?.name || "",
      staff: selectedItem?.staff || null,
      unitPrice: selectedItem?.price || "0",
      ...(selectedItem?.itemType === "service" && { duration: selectedItem?.duration || null }),
      ...(selectedItem?.itemType === "product" && { quantity: selectedItem?.quantity || 1 }),
    },
    validationSchema: Yup.object({
      // staff: Yup.number().integer("Staff must be an integer").nullable().required("Staff is required"),
      unitPrice: Yup.number().positive("Price must be a positive number").nullable().required("Price is required"),
      quantity:
        selectedItem?.itemType === "product"
          ? Yup.number().positive("Quantity must be a positive number").nullable().required("Quantity is required")
          : undefined,
    }),
    onSubmit: (values) => {
      const newItem = {
        name: values.name,
        staff: selectedStaff,
        unitPrice: parseFloat(values.unitPrice),
        quantity: values.quantity || 0,
        itemId: values.item,
        ...(selectedItem?.itemType === "service" && {
          duration: values.duration,
          // startTime: lastItemEndTime,
          // endTime: new Date(lastItemEndTime.getTime() + values.duration * 60000),
        }),
        ...(selectedItem?.itemType === "package" &&
          {
            // Here we need to add new enty clientPackage in data base for client's package details to add and like it to both client and invoice
          }),
        ...(selectedItem?.itemType === "product" &&
          {
            //
          }),
      };

      updateInvoiceItemList(newItem, selectedItem?.itemType);

      setSelectedStaff(null);
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
        value: 1,
        image: item.image,
        onClick: () => handleStaffSelection(item.id),
      })),
    },
    {
      id: "unitPrice-field",
      name: "unitPrice",
      label: "unit Price",
      type: "number",
      inputGroupText: "KD",
    },
    ...(selectedItem?.itemType === "product"
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
    ...(selectedItem?.itemType === "voucher"
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
        {selectedItem?.name} - {selectedItem?.unitPrice}{" "}
        {selectedItem?.itemType === "service" && `- ${selectedItem?.duration}`}
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
            <FormFields key={field.id} field={field} validation={validation} selectedOption={selectedStaff} />
          ))}
          <div className="hstack flex-wrap gap-2">
            <button type="submit" className="btn-primary-charcoal btn sale__button-save" id="add-btn">
              Add To Sale
            </button>
            <button className="sale__button-link sale__button-cancel" onClick={() => toggle()}>
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ItemTabModal;
