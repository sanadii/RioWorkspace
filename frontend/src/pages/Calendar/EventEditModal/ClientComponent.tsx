import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getClientSearch } from "store/actions";
import { clientsSelector } from "Selectors";

// Form and Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { FieldComponent } from "Components/Common";

// Styling
import { Form, Table, UncontrolledAlert } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";

type ClientItem = {
  id: number;
  name: string;
  mobile: string;
  email: string;
  dateOfBirth: string;
};

const ClientComponent = ({ clientRef, appointment, clients, isEdit }) => {
  const dispatch = useDispatch();

  // Set Client Details
  const [clientDetails, setClientDetails] = useState<ClientItem>({
    id: (appointment && appointment.client && appointment.client.id) || null,
    name: (appointment && appointment.client && appointment.client.name) || "",
    mobile: (appointment && appointment.client && appointment.client.mobile) || "",
    dateOfBirth: (appointment && appointment.client && appointment.client.dateOfBirth) || null,
    email: (appointment && appointment.client && appointment.client.email) || "",
  });

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
      <div className="add-appt__row add-app__client-section">
        <div className="add-appt__icon add-appt__icon-customer" title="Client"></div>
        <div className="add-appt__customer-col">
          <div className="client-group">
            {isDisplayClientDetails ? (
              <>
                <ClientSelected clientDetails={clientDetails} />
                {/* <ClientAlerts clientDetails={clientDetails} /> */}
              </>
            ) : (
              <ClientForm validation={validation} fields={fields} />
            )}
          </div>
        </div>
        <a href="javascript:void(0);" title="Remove customer from appointment" className="clear-customer">
          <i className="ri-close-line fs-16"></i>
        </a>
      </div>
    </React.Fragment>
  );
};

const ClientForm = ({ validation, fields }) => {
  return (
    <Form
      className="tablelist-form"
      on={(e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
      }}
    >
      <Table className="table-cell-background-gray">
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
  );
};

const ClientSelected = ({ clientDetails }) => {
  return (
    <div className="add-appt__customer-selected">
      <span className="customer-name-holder">
        <span className="customer-name-text">{clientDetails.name}</span>
        <span className="customer-type-label badge bg-success-subtle text-success badge-border me-2">New</span>

        <li className="list-inline-item edit">
          <Link
            to="#"
            className="text-primary d-inline-block edit-item-btn"
            onClick={() => {
              // const orderData = cellProps.row.original;
              // handleOrderClick(orderData);
            }}
          >
            <i className="ri-pencil-line fs-16"></i>
          </Link>
        </li>
      </span>
      <p className="form-control-static customer-contact-details ">
        <span className="selected-mobile-holder ">
          Mobile: +<span className="selected-mobile">{clientDetails.mobile}</span> &nbsp; &nbsp;
        </span>
        <span className="selected-email-holder">
          Email: <span className="selected-email">{clientDetails.email}</span> &nbsp; &nbsp;
        </span>
        <span className="selected-date-of-birth-holder">
          DOB: <span className="selected-date-of-birth-telephone">{clientDetails.dateOfBirth}</span>
        </span>
      </p>
    </div>
  );
};

const ClientStatus = ({ clientDetails }) => {
  // clientDetails.blocked;
  // clientDetails.mobile;
  // clientDetails.vaccinationStatus;
  // clientDetails.NoShowUps;

  return (
    <UncontrolledAlert color="" className="alert-label-icon label-arrow material-shadow">
      <i className="ri-alert-line label-icon"></i>
      text
    </UncontrolledAlert>
  );
};

const ClientBlocked = ({ clientDetails }) => {
  return (
    <UncontrolledAlert color="dark" className="alert-label-icon label-arrow material-shadow">
      <i className="ri-alert-line label-icon"></i>
      <strong>{clientDetails.name}</strong> is blocked.
    </UncontrolledAlert>
  );
};

const ClientMobile = ({ clientDetails }) => {
  return (
    <UncontrolledAlert color="info" className="alert-label-icon label-arrow material-shadow">
      <i className="ri-alert-line label-icon"></i>
      <strong>{clientDetails.name}</strong> doesn't have a mobile number. <br />
      We strongly recommend one so your client can login.
    </UncontrolledAlert>
  );
};

const ClientAlert = ({ clientDetails }) => {
  return (
    <UncontrolledAlert color="warning" className="alert-label-icon label-arrow material-shadow">
      <i className="ri-alert-line label-icon"></i>
      <strong>{clientDetails.name}</strong> has failed to show 1 time.
    </UncontrolledAlert>
  );
};

const ClientVaccination = () => {
  return (
    <UncontrolledAlert color="danger" className="alert-label-icon label-arrow material-shadow">
      <i className="ri-alert-line label-icon"></i>
      <strong>Warning</strong> - The selected client is not vaccinated
    </UncontrolledAlert>
  );
};

// import React from 'react';
// import { UncontrolledAlert } from 'reactstrap';

// const ClientAlert = ({ clientDetails }) => {
//   let alertColor = "info";
//   let alertIcon = "ri-alert-line";
//   let alertMessage = "";

//   if (clientDetails.blocked) {
//     alertColor = "dark";
//     alertMessage = <strong>{clientDetails.name}</strong> is blocked.;
//   } else if (!clientDetails.mobile) {
//     alertColor = "info";
//     alertMessage = (
//       <>
//         <strong>{clientDetails.name}</strong> doesn't have a mobile number. <br />
//         We strongly recommend one so your client can login.
//       </>
//     );
//   } else if (clientDetails.NoShowUps > 0) {
//     alertColor = "warning";
//     alertMessage = (
//       <strong>{clientDetails.name}</strong> has failed to show {clientDetails.NoShowUps} time(s).
//     );
//   } else if (!clientDetails.vaccinationStatus) {
//     alertColor = "danger";
//     alertMessage = <strong>Warning</strong> - The selected client is not vaccinated;
//   }

//   return (
//     <UncontrolledAlert color={alertColor} className="alert-label-icon label-arrow material-shadow">
//       <i className={`${alertIcon} label-icon`}></i>
//       {alertMessage}
//     </UncontrolledAlert>
//   );
// };

// export default ClientAlert;

export { ClientComponent };
