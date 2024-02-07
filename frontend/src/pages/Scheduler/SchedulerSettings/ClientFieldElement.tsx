import React, { useEffect, useState, useRef, useCallback } from "react";
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import { Button, ButtonComponent } from "@syncfusion/ej2-react-buttons";
import doctorsIcon from "assets/Icons/Doctors.svg";
import { DropDownListComponent, ComboBox, ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { NumericTextBoxComponent, TextBoxComponent } from "@syncfusion/ej2-react-inputs";

import { Row, Table } from "reactstrap";

const ClientFieldElement = ({ clients, clientValue }) => {
  return (
    <Row>
      <div className="client-field-container table-responsive">
        <Table className="tabl-success">
          <tr>
            <td>
              <ComboBoxComponent
                dataSource={clients}
                allowFiltering={true}
                fields={{ text: "name", value: "id" }}
                floatLabelType="Always"
                placeholder="Client Name"
                change={(e: any) => (clientValue.current = e.value)}
                // select={ () => {
                //   if (!isNullOrUndefined(document.querySelector(".custom-field-row .field-error"))) {
                //     (document.querySelector(".custom-field-row .field-error") as HTMLElement).style.display = "none";
                //   }}
              />
            </td>
            <td>
              <NumericTextBoxComponent
                id="clientMobile"
                format="c2" // Format as currency with 2 decimal places
                placeholder="Mobile"
                // value=""
                // change={(e) => !autoPopulated && handleServicePriceChange(e.value, serviceIndex)}
              />
            </td>
          </tr>
        </Table>
      </div>
    </Row>
  );
};

export { ClientFieldElement };

{
  /* <div className="custom-field-container">
          <ButtonComponent
            type="button"
            name="ServiceButton"
            iconCss="e-icons e-add-icon"
            cssClass="e-small e-round e-small e-icons e-add-icon e-btn-icon"
            isPrimary={true}
          /> */
}
