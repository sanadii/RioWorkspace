import React, { useState, useEffect } from "react";
import { Form } from "reactstrap";
import { FieldComponent } from "Components/Common";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSchedule, getClients, getClientSearch } from "store/actions";
import { clientsSelector } from "Selectors";

// Form and Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import CreatableSelect from "react-select/creatable";

import { Card } from "reactstrap";
const CalendarTest = () => {
  const dispatch = useDispatch();
  const { clients } = useSelector(clientsSelector);

  const [clientDetails, setClientDetails] = useState({
    id: null,
    name: "",
    mobile: "",
    email: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    dispatch(getSchedule());
    dispatch(getClients());
  }, [dispatch]);

  // Creating Client List
  const clientList = clients.map((client) => ({
    id: client.id,
    name: client.name,
    mobile: client.mobile,
    email: "example@gmail.com",
    label: `${client.name} | ${client.mobile}`,
    value: client.id,
  }));

  // Handling Client Change
  const handleClientNameChange = (selectedOption) => {
    if (selectedOption) {
      console.log("selectedOption: ", selectedOption);
      // Set Formik values for each field
      validation.setFieldValue("name", selectedOption.name || "");
      validation.setFieldValue("mobile", selectedOption.mobile || "");
      validation.setFieldValue("email", selectedOption.email || "");
      validation.setFieldValue("dateOfBirth", selectedOption.dateOfBirth || "");

      // Update the local state
      setClientDetails({
        id: selectedOption.id || null,
        name: selectedOption.name || "",
        mobile: selectedOption.mobile || "",
        email: selectedOption.email || "",
        dateOfBirth: selectedOption.dateOfBirth || "",
      });
    } else {
      // Clear the fields if selection is cleared
      ["name", "mobile", "email", "dateOfBirth"].forEach((field) => {
        validation.setFieldValue(field, "");
      });
      setClientDetails({
        id: null,
        name: "",
        mobile: "",
        email: "",
        dateOfBirth: "",
      });
    }
  };

  const initialValues = {
    id: (clientDetails && clientDetails.id) || null,
    name: (clientDetails && clientDetails.name) || "",
    mobile: (clientDetails && clientDetails.mobile) || "",
    email: (clientDetails && clientDetails.email) || "",
    dateOfBirth: (clientDetails && clientDetails.dateOfBirth) || "",
  };

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      // start: Yup.date().required("Start Time is required"),
    }),
    onSubmit: () => {
      // No onSubmit
    },
  });

  const fields = [
    {
      id: "client-name-field",
      name: "name", // Not "id"
      label: "Client Name",
      placeholder: "First and Last Name OR Mobile",
      type: "creatableSelect",
      options: clientList,
      onChange: handleClientNameChange, // Use the custom change handler
    },
    {
      id: "client-mobile-field",
      name: "mobile",
      label: "Mobile",
      type: "text",
      onChange: (e) => {
        validation.handleChange(e.value);
      },
    },
    {
      id: "client-email-field",
      name: "email",
      label: "Client Email",
      type: "email",
      onChange: (e) => {
        validation.handleChange(e);
      },
    },
    {
      id: "client-date-of-birth-field",
      name: "dateOfBirth",
      label: "Client Date of Birth",
      type: "date",
      onChange: (e) => {
        validation.handleChange(e);
      },
    },
  ];

  return (
    <React.Fragment>
      <CreatableSelect isClearable options={clientList} />
      <Form>
        {fields.map((field) => (
          <td key={field.id}>
            <FieldComponent formStructure="table" field={field} validation={validation} />
          </td>
        ))}
      </Form>
    </React.Fragment>
  );
};

export default CalendarTest;
