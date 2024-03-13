import React, { KeyboardEventHandler, useState, useEffect } from "react";
import { Form, Table, Row, Col, Container } from "reactstrap";
import { FieldComponent } from "Components/Common";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSchedule, getClientSearch } from "store/actions";
import { clientsSelector } from "Selectors";

// Form and Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";

const CalendarTest = () => {
  const dispatch = useDispatch();
  const { clientSearch } = useSelector(clientsSelector);
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const [focusedClient, setFocusedClient] = useState(null);

  const [clientDetails, setClientDetails] = useState({
    id: null,
    name: "",
    mobile: "",
    email: "",
    dateOfBirth: "",
  });

  const [clientSearchValue, setClientSearchValue] = React.useState("");
  const [clientList, setClientList] = React.useState([]);

  // console.log("clientSearchValue: ", clientSearchValue)
  useEffect(() => {
    dispatch(getSchedule());
  }, [dispatch]);

  // Creating Client List
  useEffect(() => {
    const clientList = clientSearch.map((client) => ({
      id: client.id,
      name: client.name,
      mobile: client.mobile,
      email: "example@gmail.com",
      label: `${client.name} | ${client.mobile}`,
      value: client.id,
    }));

    setClientList(clientList);
  }, [clientSearch]);

  const handleClientSearch = (clientSearchValue) => {
    setClientSearchValue(clientSearchValue);
    if (clientSearchValue.length > 0) {
      dispatch(getClientSearch(clientSearchValue));
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  };

  const handleSelectClient = (client) => {
    setClientDetails(client);
    setDropdownVisible(false);
    // Set other form fields here if needed
  };

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
      id: "clientName",
      name: "name", // Not "id"
      label: "Client Name",
      placeholder: "First and Last Name OR Mobile",
      type: "textSearch",
      onChange: (e) => {
        validation.handleChange(e);
        handleClientSearch(e.target.value);
      },
      options: clientList,
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
      <div className="page-content">
        <Container fluid>
          <div className="add-appt__customer-col">
            <Form>
              <Row>
                <div>
                  {fields.map((field) => (
                    <Col lg={6} key={field.id}>
                      <FieldComponent formStructure="table" field={field} validation={validation} />
                    </Col>
                  ))}
                </div>
                {/* <ClientDropdown
                  clientSearchValue={clientSearchValue}
                  clients={clientList}
                  onSelectClient={handleSelectClient}
                /> */}
              </Row>
            </Form>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

// ClientDropdown.js

export default CalendarTest;
