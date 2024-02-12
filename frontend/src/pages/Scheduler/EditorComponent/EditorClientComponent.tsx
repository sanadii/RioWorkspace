import React, { useEffect, useState, useRef } from "react";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Row, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getClientSearch } from "store/actions";
import { clientsSelector } from "Selectors";
import { isInteger } from "lodash";

type ClientItem = {
  id: number;
  name: string;
  date_of_birth: string;
  mobile: string;
};

const EditorClientComponent = ({ args, clientRef }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const { clientSearch } = useSelector(clientsSelector);
  const startDate = args?.data?.StartTime ? args.data.StartTime.toLocaleDateString() : "";

  const [clientDetails, setClientDetails] = useState<ClientItem>({
    id: clientRef.current.id,
    name: clientRef.current.clientName,
    mobile: clientRef.current.clientMobile,
    date_of_birth: "null",
  });

  // clientRef.current = clientDetails;
  console.log("clientRef.current: ", clientRef.current);

  const handleClientMobileChange = (event) => {
    setClientDetails((prevState) => ({
      ...prevState,
      mobile: event ? event : "",
    }));
  };

  const onClientNameChange = (event) => {
    const selectedClient = event.itemData;
    console.log("event: ", event);

    setClientDetails((prevState) => ({
      ...prevState,
      id: Number.isInteger(selectedClient.id) ? selectedClient.id : null,
      name: selectedClient.name,
    }));

    // if (Number.isInteger(selectedClient)) {
    //   // Assuming `clientRef.current.clientId` and `clientRef.current.mobile` are valid properties
    //   clientRef.current.clientId = selectedClient;
    //   clientRef.current.mobile = 6000;
    // } else {
    //   // Assuming `clientRef.current.clientName` is a valid property
    //   clientRef.current.clientName = selectedClient;
    // }

    setInputValue(selectedClient); // Set input value to the selected client
  };

  const onFiltering = (e) => {
    console.log("calling");
    // const query = e.text; // Get the query typed by the user
    // const filteredData = clientSearch.filter((client) => client.name.toLowerCase().includes(query.toLowerCase())); // Filter the data source based on the query
    // e.updateData(filteredData); // Update the ComboBoxComponent with the filtered data

    const clientSearched = {
      client: e.text,
    };
    dispatch(getClientSearch(clientSearched));
  };

  console.log("clientRef.name: ", clientRef.name);
  return (
    <Row>
      <div className="d-flex">
        <h5>Date: </h5>
        <p>{startDate}</p>
      </div>
      <h5>Client</h5>
      <Table className="table-cell-background-grey">
        <tbody>
          <tr>
            <td>
              <ComboBoxComponent
                value={clientRef.current.clientName}
                dataSource={clientSearch}
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
                value={clientRef.current.clientMobile}
                // change={(e) => !autoPopulated && handleServicePriceChange(e.value, serviceIndex)}
                change={(e) => handleClientMobileChange(e.value)}

                // input={handleMobileChange}
              />
            </td>
            <td>
              <DatePickerComponent
                id="appointmentDate"
                format="dd/MM/yyyy"
                placeholder="Client Birthday"
                className="e-field e-input"
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </Row>
  );
};

export { EditorClientComponent };
