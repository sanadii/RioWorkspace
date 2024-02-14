import React, { useState } from "react";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Row, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getClientSearch } from "store/actions";
import { clientsSelector } from "Selectors";

type AppointmentItem = {
  id: number;
  startTime: Date;
  endTime: Date;
};

type ClientItem = {
  id: number;
  name: string;
  dateOfBirth: string;
  mobile: string;
};

const EditorClientComponent = ({ args, clients, appointmentRef, clientRef }) => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const { clientSearch } = useSelector(clientsSelector);
  const [isDisplayClientDetails, setIsDisplayClientDetails] = useState(false);
  // console.log("isDisplayClientDetails: ", isDisplayClientDetails);
  function getAppointmentDate(date) {
    if (!date) return "";

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "short", // Short name of the day
      day: "numeric", // Numeric day
      month: "short", // Short name of the month
      year: "numeric", // Numeric year
    });

    return formattedDate;
  }

  const startDate = getAppointmentDate(args.data?.startTime);

  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentItem>({
    id: args.id || null,
    startTime: args.startTime || "",
    endTime: args.endTime || "",
  });

  // Use optional chaining to safely access properties of clientRef.current
  const [clientDetails, setClientDetails] = useState<ClientItem>({
    id: clientRef.current?.id || null,
    name: clientRef.current?.name || "",
    mobile: clientRef.current?.mobile || "",
    dateOfBirth: clientRef.current?.dateOfBirth || "",
  });

  appointmentRef.current = appointmentDetails;
  clientRef.current = clientDetails;

  appointmentRef.current.clientId = clientDetails.id;
  console.log("clientDetails: ", clientDetails);
  console.log("clientRef.current: ", clientRef.current);

  const onClientNameChange = (event) => {
    const selectedClient = event.itemData;

    setClientDetails((prevState) => ({
      ...prevState,
      id: Number.isInteger(selectedClient.id) ? selectedClient.id : null,
      name: selectedClient.name,
      mobile: selectedClient.mobile ?? "",
    }));

    setIsDisplayClientDetails(true);
    // Set input value to the selected client
    // setInputValue(selectedClient ? selectedClient.name : "");
  };

  const handleClientMobileChange = (event) => {
    setClientDetails((prevState) => ({
      ...prevState,
      mobile: event ? event : "",
    }));
  };

  const handleClientBirthdayChange = (event) => {
    setClientDetails((prevState) => ({
      ...prevState,
      dateOfBirth: event ? event : "",
    }));
  };

  const onFiltering = (e) => {
    // const query = e.text; // Get the query typed by the user
    // const filteredData = clientSearch.filter((client) => client.name.toLowerCase().includes(query.toLowerCase())); // Filter the data source based on the query
    // e.updateData(filteredData); // Update the ComboBoxComponent with the filtered data

    const clientSearched = {
      client: e.text,
    };
    // dispatch(getClientSearch(clientSearched));
  };

  return (
    <Row>
      <div className="d-flex">
        <h5>{startDate}</h5>
      </div>
      <b>Client</b>
      {/* {isDisplayClientDetails ? (
        <div>
          <p>x</p>
          <p>{clientDetails.id}</p>
          <p>{clientDetails.name}</p>
          <p>{clientDetails.mobile}</p>
          <p>{clientDetails.dateOfBirth}</p>
        </div>
      ) : ( */}
      <Table className="table-cell-background-grey">
        <tbody>
          <tr>
            <td>
              <ComboBoxComponent
                value={clientRef.current?.id || ""}
                dataSource={clients}
                allowFiltering={true}
                fields={{ text: "name", value: "id" }}
                change={onClientNameChange}
                filtering={onFiltering} // Call onFiltering function when filtering occurs
                placeholder="Client Name"
              />
            </td>
            <td>
              <TextBoxComponent
                id="clientMobile"
                placeholder="Mobile"
                // value={clientRef.current?.mobile || ""}
                change={(e) => handleClientMobileChange(e.value)}
              />
            </td>
            <td>
              <DatePickerComponent
                id="appointmentDate"
                format="dd/MM/yyyy"
                placeholder="Client Birthday"
                change={(e) => handleClientBirthdayChange(e.value)}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      {/* )} */}
    </Row>
  );
};

export { EditorClientComponent };
