import React, { useEffect, useState, useRef, useCallback } from "react";
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import { Button, ButtonComponent } from "@syncfusion/ej2-react-buttons";
import doctorsIcon from "assets/Icons/Doctors.svg";
import { DropDownListComponent, ComboBox, ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { NumericTextBoxComponent, TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import "../schedule.css"; // Import the scheduler.css file

import { Row, Table } from "reactstrap";

const EditorTemplateClient = ({ clients, clientValue }) => {
  return (
    <Row>
      <h5>Client</h5>
      <Table className="table-cell-background-grey">
        <tbody>
          <tr>
            <td>
              <ComboBoxComponent
                dataSource={clients}
                allowFiltering={true}
                fields={{ text: "name", value: "id" }}
                change={(e: any) => (clientValue.current = e.value)}
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

export { EditorTemplateClient };
