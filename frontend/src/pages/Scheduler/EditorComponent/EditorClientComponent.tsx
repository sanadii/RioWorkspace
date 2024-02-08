import React, { useEffect, useState, useRef, useCallback } from "react";
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import { Button, ButtonComponent } from "@syncfusion/ej2-react-buttons";
import doctorsIcon from "assets/Icons/Doctors.svg";
import { DropDownListComponent, ComboBox, ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { NumericTextBoxComponent, TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import { Row, Table } from "reactstrap";

const EditorClientComponent = ({ args, clients, clientRef }) => {
  // const startTime = args.data.StartTime; // Extract start time
  // const endTime = args.data.EndTime; // Extract end time

  const startDate = args.data.StartTime.toLocaleDateString(); // Extract start date
  const startTime = args.data.StartTime.toLocaleTimeString(); // Extract start time
  const endDate = args.data.EndTime.toLocaleDateString(); // Extract end date
  const endTime = args.data.EndTime.toLocaleTimeString(); // Extract end time

  console.log("Start Date: ", startDate);
  console.log("Start Time: ", startTime);
  console.log("End Date: ", endDate);
  console.log("End Time: ", endTime);

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
                dataSource={clients}
                allowFiltering={true}
                fields={{ text: "name", value: "id" }}
                change={(e: any) => (clientRef.current = e.value)}
                placeholder="Mobile"

                // select={ () => {
                //   if (!isNullOrUndefined(document.querySelector(".custom-field-row .field-error"))) {
                //     (document.querySelector(".custom-field-row .field-error") as HTMLElement).style.display = "none";
                //   }}
              />
            </td>
            <td>
              <TextBoxComponent
                id="clientMobile"
                placeholder="Mobile"
                // value=""
                // change={(e) => !autoPopulated && handleServicePriceChange(e.value, serviceIndex)}
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
