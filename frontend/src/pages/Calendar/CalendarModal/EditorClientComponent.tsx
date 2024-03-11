import React, { useState } from "react";
import { Form, Row, Table, Badge } from "reactstrap";
import { useDispatch } from "react-redux";

// Form and Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { FieldComponent } from "Components/Common";
import "react-toastify/dist/ReactToastify.css";

const EditorClientComponent = ({ appointment, clients, isEdit, setClientDetails, clientDetails }) => {
  // console.log("appointment: ", appointment);
  const [isDisplayClientDetails, setIsDisplayClientDetails] = useState(appointment.client ? true : false);

  // Creating Client List
  const clientList = clients.map((client) => {
    return {
      id: client.id,
      name: client.name,
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
    id: (appointment && appointment.client && appointment.client.id) || null,
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
        const updatedClient = {
          // id: values.id,
          // name: values.name,
          mobile: values.mobile,
          email: values.email,
          dateOfBirth: values.dateOfBirth,
        };

        // update event
        // dispatch(updateAppointment(updatedClient));
        validation.resetForm();
      } else {
        const newClient = {
          // id: Math.floor(Math.random() * 100),
          // name: values["name"] || "",
          mobile: values["mobile"] || "",
          email: values["email"] || 1,
          dateOfBirth: values["dateOfBirth"] || "",
        };
        // save new event
        console.log("newClient: ", newClient);
        // dispatch(addAppointment(newClient));
        validation.resetForm();
      }

      // setSelectedDay(null);
      // setSelectedNewDate(null);
    },
  });

  const fields = [
    {
      id: "client-name-field",
      name: "id",
      label: "Client Name",
      type: "select2",
      className: "basic-single",
      isSearchable: true,
      isClearable: true,
      options: clientList,
      onChange: (client) => {
        // validation.handleChange(client);
        console.log("client: ", client);
        // onClientNameChange(e);
      },
    },
    {
      id: "client-mobile-field",
      name: "mobile",
      label: "Mobile",
      type: "text",
      onChange: (e) => {
        validation.handleChange(e.value);
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
          <Form
            className="tablelist-form"
            on={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <Table className="table-cell-background-grey">
              <tbody>
                <tr>
                  {fields.map((field) => (
                    <td key={field.id}>
                      <FieldComponent formStructure="table" field={field} validation={validation} />
                    </td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </Form>
        )}
      </div>
    </React.Fragment>
  );
};

export { EditorClientComponent };
