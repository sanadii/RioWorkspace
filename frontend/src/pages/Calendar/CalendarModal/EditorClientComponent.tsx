import React, { useState } from "react";
import { Form, Row, Table, Badge } from "reactstrap";
import { useDispatch } from "react-redux";

// Form and Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { FormFields } from "Components/Common";
import "react-toastify/dist/ReactToastify.css";

const EditorClientComponent = ({ appointment, clients, isEdit, setClientDetails, clientDetails }) => {
  // console.log("appointment: ", appointment);
  const [isDisplayClientDetails, setIsDisplayClientDetails] = useState(appointment.client ? true : false);

  // Creating Client List
  const clientList = clients.map((client) => {
    return {
      label: `${client.name} | ${client.mobile}`,
      value: client.id,
    };
  });

  // Client Constants
  const onClientNameChange = (event) => {
    const selectedClient = event.itemData;
    if (selectedClient) {
      setClientDetails((prevState) => ({
        ...prevState,
        id: Number.isInteger(selectedClient.id) ? selectedClient.id : null,
        name: selectedClient.name || "",
        mobile: selectedClient.mobile || "",
        email: selectedClient.email || "",
        dateOfBirth: selectedClient.dateOfBirth || "",
      }));
      setIsDisplayClientDetails(true);

      // Set input value to the selected client
      // setInputValue(selectedClient.name || "");
    }
  };

  const handleClientMobileChange = (event) => {
    setClientDetails((prevState) => ({
      ...prevState,
      mobile: event ? event : "",
    }));
  };

  const handleClientEmailChange = (event) => {
    setClientDetails((prevState) => ({
      ...prevState,
      email: event ? event : "",
    }));
  };

  const handleClientBirthdayChange = (event) => {
    const newDate = event.value ? event.value.toLocaleDateString("en-CA") : "";
    setClientDetails((prevState) => ({
      ...prevState,
      dateOfBirth: newDate,
    }));
  };

  const initialValues = {
    id: (appointment && appointment.client && appointment.client.id) || 1,
    name: (appointment && appointment.client && appointment.client.name) || "",
    mobile: (appointment && appointment.client && appointment.client.mobile) || "",
    email: (appointment && appointment.client && appointment.client.email) || "",
    dateOfBirth: (appointment && appointment.client && appointment.client.dateOfBirth) || "",
  };

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      // start: Yup.date().required("Start Time is required"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updatedAppointment = {
          id: appointment.id,
          name: values.name,
          mobile: values.mobile,
          email: values.email,
          dateOfBirth: values.dateOfBirth,
        };

        // update event
        // dispatch(updateAppointment(updatedAppointment));
        validation.resetForm();
      } else {
        const newEvent = {
          id: Math.floor(Math.random() * 100),
          name: values["name"] || 1,
          mobile: values["mobile"] || "",
          email: values["email"] || 1,
          dateOfBirth: values["dateOfBirth"] || 1,
        };
        // save new event
        console.log("newEvent: ", newEvent);
        // dispatch(addAppointment(newEvent));
        validation.resetForm();
      }

      // setSelectedDay(null);
      // setSelectedNewDate(null);
    },
  });

  const fields = [
    {
      id: "client-name-field",
      name: "name",
      label: "Client Name",
      type: "select2",
      className: "basic-single",
      isSearchable: true,
      isClearable: true,
      options: clientList,
      onChange: (e) => {
        validation.handleChange(e);
        onClientNameChange(e);
      },
    },
    {
      id: "client-mobile-field",
      name: "mobile",
      label: "Mobile",
      type: "text",
      onChange: (e) => {
        validation.handleChange(e);
        // handleClientMobileChange(e);
      },
    },
    {
      id: "client-email-field",
      name: "email",
      label: "Client Email",
      type: "email",
      onChange: (e) => {
        validation.handleChange(e);
        handleClientEmailChange(e);
      },
    },
    {
      id: "client-date-of-birth-field",
      name: "dateOfBirth",
      label: "Client Date of Birth",
      type: "date",
      onChange: (e) => {
        validation.handleChange(e);
        // setSelectedNewDate(e);
        handleClientBirthdayChange(e);
      },
    },
  ];
  const { id, name, mobile, email, dateOfBirth } = clientDetails;

  return (
    <React.Fragment>
      <div className="d-flex mb-8">
        <div className="add-appt__icon add-appt__icon-customer" title="Client"></div>
        <div className="add-appt__customer-col"></div>
        {isDisplayClientDetails ? (
          <Row style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="add-appt__customer-selected">
              <h4 className="customer-name-holder">
                <span className="customer-name-text pe-2">{clientDetails.name}</span>
                <Badge text-size="12" color="success" pill>
                  {" "}
                  New{" "}
                </Badge>
                <a href="href">
                  <i className="ri-pencil-line"></i>
                </a>
              </h4>
              <p className="selected-client">
                <span className="pe-2">Mob. {clientDetails.mobile}</span>
                <span className="pe-2">Email. {clientDetails.email}</span>
                <span className="pe-2">Dob. {clientDetails.dateOfBirth}</span>
              </p>
            </div>
            <div>
              {/* Content of the second div */}
              End
            </div>
          </Row>
        ) : (
          <Table className="table-cell-background-grey">
            {/* <thead>
              {fields.map((field) => (
                <th>{field.label}</th>
              ))}{" "}
            </thead> */}
            <Form
              className="tablelist-form"
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <tbody>
                <tr>
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
                </tr>
              </tbody>
            </Form>
          </Table>
        )}
      </div>
    </React.Fragment>
  );
};

export { EditorClientComponent };
