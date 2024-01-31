import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Button, Row, Form } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FormFields } from "Components/Common";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addNewDailyRevenue as onAddNewDailyRevenue } from "store/actions";

interface DailyRevenueModalProps {
  isEdit: boolean;
  setModal: (modal: boolean) => void;
  modal: boolean;
  toggle: () => void;
  dailyRevenue: any; // Define a more specific type if possible
}

const DailyRevenueModal = ({
  isEdit,
  setModal,
  modal,
  toggle,
  dailyRevenue,
}: DailyRevenueModalProps) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  document.title =
    "Create DailyRevenue | Velzon - React Admin & Dashboard Template";

  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: "",
      date: "",
      cash: "",
      credit: "",
      link: "",
      others: "",
      notes: "",
      status: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      const newDailyRevenue = {
        _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
        date: values.date,
        cash: values.cash,
        credit: values.credit,
        link: values.link,
        others: values.others,
        notes: values.notes,
        status: values.status,
      };
      dispatch(onAddNewDailyRevenue(newDailyRevenue));
      history("/apps-DailyRevenues-list");
      validation.resetForm();
    },
  });

  const fields = [
    // Existing fields
    {
      id: "date-field",
      name: "date",
      label: "Date",
      type: "info",
      colSize: 12,
    },
    {
      id: "cash-field",
      name: "cash",
      label: "Cash",
      type: "text",
      colSize: 3,

    },
    {
      id: "credit-field",
      name: "credit",
      label: "Credit",
      type: "text",
      colSize: 3,
    },
    {
      id: "link-field",
      name: "link",
      label: "Link",
      type: "text",
      colSize: 3,

    },
    {
      id: "others-field",
      name: "others",
      label: "Others",
      type: "text",
      colSize: 3,
    },
    {
      id: "notes-field",
      name: "notes",
      label: "Notes",
      type: "text",
      colSize: 12,
    },
  ];

  return (
    <Modal
      isOpen={modal}
      centered
      size="lg"
      className="border-2"
      modalClassName="modal fadeInLeft zoomIn"
    >
      <ModalHeader className="p-3 bg-soft-danger" toggle={toggle}>
        {isEdit ? "Edit Daily Revenue" : "Add Daily Revenue"}
      </ModalHeader>
      <Row className="g-3">
        {fields.map((field) => {
          return (
            <FormFields
              key={field.id}
              field={field}
              validation={validation}
              inLineStyle={false} // Add this prop or make it optional in FormFields component
            />
          );
        })}
      </Row>
    </Modal>
  );
};

export default DailyRevenueModal;
