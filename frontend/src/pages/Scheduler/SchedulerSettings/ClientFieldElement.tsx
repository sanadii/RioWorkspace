import React, { useEffect, useState, useRef, useCallback } from "react";
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import { Button, ButtonComponent } from "@syncfusion/ej2-react-buttons";
import doctorsIcon from "assets/Icons/Doctors.svg";
import { DropDownListComponent, ComboBox, ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";

const ClientFieldElement = ({ clients, clientValue }) => {
  return (
    <div className="custom-field-row">
      <div className="custom-field-container">
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
        <div className="custom-field-container">
          <ButtonComponent
            type="button"
            name="ServiceButton"
            iconCss="e-icons e-add-icon"
            cssClass="e-small e-round e-small e-icons e-add-icon e-btn-icon"
            isPrimary={true}
          />
        </div>
      </div>
    </div>
  );
};

export { ClientFieldElement };
