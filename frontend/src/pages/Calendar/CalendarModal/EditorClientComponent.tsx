import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSchedule, getClientSearch } from "store/actions";
import { clientsSelector } from "Selectors";

// Form and Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { FieldComponent } from "Components/Common";

// Styling
import { Form, Table, Row, Badge } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";

type ClientItem = {
  id: number;
  name: string;
  mobile: string;
  email: string;
  dateOfBirth: string;
};

const EditorClientComponent = ({ clientRef, appointment, clients, isEdit }) => {
  const dispatch = useDispatch();

  // Set Client Details
  const [clientDetails, setClientDetails] = useState<ClientItem>({
    id: (appointment && appointment.client && appointment.client.id) || null,
    name: (appointment && appointment.client && appointment.client.name) || "",
    mobile: (appointment && appointment.client && appointment.client.mobile) || "",
    dateOfBirth: (appointment && appointment.client && appointment.client.dateOfBirth) || null,
    email: (appointment && appointment.client && appointment.client.email) || "",
  });

  // console.log("appointment: ", appointment);
  // console.log("clientDetails: ", clientDetails);

  // console.log("appointment: ", appointment);
  const [isDisplayClientDetails, setIsDisplayClientDetails] = useState(clientDetails.id ? true : false);

  const { clientSearch } = useSelector(clientsSelector);
  const [clientList, setClientList] = React.useState([]);

  // Creating Client List for the form selection
  useEffect(() => {
    const clientList = clientSearch.map((client) => ({
      id: client.id,
      name: client.name,
      mobile: client.mobile,
      email: client.email,
      label: `${client.name} | ${client.mobile}`,
      value: client.id,
    }));

    setClientList(clientList);
  }, [clientSearch]);

  const handleClientSearch = (clientSearchValue) => {
    if (clientSearchValue.length > 1) {
      dispatch(getClientSearch(clientSearchValue));
    }
  };

  // Client Constants
  const onClientNameChange = (event) => {
    const selectedClient = event;
    if (selectedClient) {
      setClientDetails((prevState) => ({
        ...prevState,
        id: Number.isInteger(selectedClient.id) ? selectedClient.id : null,
        name: selectedClient.name || "",
        mobile: selectedClient.mobile || "",
        email: selectedClient.email || "",
        dateOfBirth: selectedClient.dateOfBirth || null,
      }));

      setIsDisplayClientDetails(true);
    }
    clientRef.current = selectedClient;
    // console.log("clientRef.current: ", clientRef.current);
  };

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      id: (clientDetails && clientDetails.id) || null,
      name: (clientDetails && clientDetails.name) || "",
      mobile: (clientDetails && clientDetails.mobile) || "",
      email: (clientDetails && clientDetails.email) || "",
      dateOfBirth: (clientDetails && clientDetails.dateOfBirth) || null,
    },
    validationSchema: Yup.object({
      // start: Yup.date().required("Start Time is required"),
    }),
    onSubmit: () => {
      // No submission
    },
  });

  clientRef.current = validation.values;
  // console.log("clientRef: ", clientRef.current);
  const fields = [
    {
      id: "clientName",
      name: "name",
      label: "Client Name",
      placeholder: "First and Last Name OR Mobile",
      type: "searchDropdown",
      onChange: (e) => {
        validation.handleChange(e);
        const inputValue = e.target.value;
        if (inputValue.length > 1) {
          handleClientSearch(inputValue);
        }
      },
      onSelect: (client) => {
        onClientNameChange(client);
      },
      options: clientList,
    },
    {
      id: "client-mobile-field",
      name: "mobile",
      label: "Mobile",
      type: "text",
      prefix: { type: "text", text: "P" },
    },
    {
      id: "client-email-field",
      name: "email",
      label: "Client Email",
      type: "email",
      prefix: { type: "text", text: "@" },
    },
    {
      id: "client-date-of-birth-field",
      name: "dateOfBirth",
      label: "BirthDay",
      type: "date",
      prefix: { type: "text", text: "D" },
    },
  ];

  return (
    <React.Fragment>
      <div className="d-flex mb-8">
        <div className="add-appt__icon add-appt__icon-customer" title="Client"></div>
        <div className="client-group">
          {isDisplayClientDetails ? (
            <div className="add-appt__customer-selected">
              <h4 className="customer-name-holder">
                <span className="customer-name-text pe-2">{clientDetails.name}</span>
                <Badge text-size="10" color="success" pill>
                  New
                </Badge>

                <li className="list-inline-item edit">
                  <Link
                    to="#"
                    className="text-primary d-inline-block edit-item-btn"
                    onClick={() => {
                      // const orderData = cellProps.row.original;
                      // handleOrderClick(orderData);
                    }}
                  >
                    <i className="ri-pencil-fill fs-16"></i>
                  </Link>
                </li>
              </h4>
              <div className="table">
                <Table>
                  <tbody>
                    <tr>
                      <td>Mobile:</td>
                      <td>{clientDetails.mobile}</td>
                      <td>Email:</td>
                      <td>{clientDetails.email}</td>
                      <td>DOB:</td>
                      <td>{clientDetails.dateOfBirth}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
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
      </div>
    </React.Fragment>
  );
};

export { EditorClientComponent };
