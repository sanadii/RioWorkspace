import React, { useState } from "react";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Row, Table, Badge } from "reactstrap";
import { useDispatch } from "react-redux";

const EditorClientComponent = ({ data, clients, setClientDetails, clientDetails }) => {
  // console.log("data: ", data);
  const [isDisplayClientDetails, setIsDisplayClientDetails] = useState(data.client ? true : false);

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
            <thead>
              {/* <th>Client</th>
          <th>Mobile</th>
          <th>Mobile</th>
          <th>
            {name} - {dateOfBirth}
          </th> */}
            </thead>
            <tbody>
              <tr>
                <td>
                  <ComboBoxComponent
                    value={id || name}
                    data-name="client"
                    dataSource={clients}
                    allowFiltering={true}
                    fields={{ text: "name", value: "id" }}
                    change={onClientNameChange}
                    placeholder="Client Name"
                  />
                </td>
                <td>
                  <TextBoxComponent
                    value={mobile}
                    id="mobile"
                    data-name="ClientMobile"
                    placeholder="Mobile"
                    // value={clientRef.current?.mobile || ""}
                    change={(e) => handleClientMobileChange(e.value)}
                  />
                </td>
                <td>
                  <TextBoxComponent
                    value={email}
                    id="email"
                    data-name="ClientEmail"
                    placeholder="Client Email"
                    change={(e) => handleClientEmailChange(e.value)}
                  />
                </td>
                <td>
                  <DatePickerComponent
                    value={dateOfBirth ? new Date(dateOfBirth) : null}
                    id="dateOfBirth"
                    data-name="dateOfBirth"
                    format="yyy-MM-dd"
                    placeholder="Client Birthday"
                    change={handleClientBirthdayChange}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </div>
    </React.Fragment>
  );
};

export { EditorClientComponent };
