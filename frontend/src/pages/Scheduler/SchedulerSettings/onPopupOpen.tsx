import React, { useEffect, useState, useRef } from "react";

import { PopupOpenEventArgs } from "@syncfusion/ej2-react-schedule";
import { closest, Browser, L10n, extend, isNullOrUndefined, createElement } from "@syncfusion/ej2-base";
import { ComboBox } from "@syncfusion/ej2-react-dropdowns";
import { Button, ButtonComponent } from "@syncfusion/ej2-react-buttons";


export const onPopupOpen = (args: PopupOpenEventArgs, clients, clientValue, comboBox, onAddClient, scheduleObj) => {
    if (args.type === "Editor") {
    // additional field customization
    if (!args.element.querySelector(".custom-field-row")) {
      // Access the popup element and set the width
      const popupElement = args.element as HTMLElement; // Type assertion to HTMLElement
      popupElement.style.width = "600px"; // Set your desired width
      popupElement.style.left = "50%"; // Start at the middle of the screen
      popupElement.style.marginLeft = "-300px"; // Half of the width, to truly center it

      const row: HTMLElement = createElement("div", { className: "custom-field-row" });
      const formElement: HTMLElement = args.element.querySelector(".e-schedule-form");
      formElement.firstChild.insertBefore(row, args.element.querySelector(".e-title-location-row"));
      const container: HTMLElement = createElement("div", { className: "custom-field-container" });
      const comboBoxElement: HTMLInputElement = createElement("input", { attrs: { id: "ClientName" } }) as HTMLInputElement;
      container.appendChild(comboBoxElement);
      row.appendChild(container);
      comboBox.current = new ComboBox({
        dataSource: clients,
        allowFiltering: true,
        fields: { text: "name", value: "id" },
        floatLabelType: "Always",
        placeholder: "Client Name",
        change: (e: any) => (clientValue.current = e.value),
        select: () => {
          if (!isNullOrUndefined(document.querySelector(".custom-field-row .field-error"))) {
            (document.querySelector(".custom-field-row .field-error") as HTMLElement).style.display = "none";
          }
        },
      });
      comboBox.current.appendTo(comboBoxElement);
      comboBoxElement.setAttribute("name", "Name");
      const buttonEle: HTMLInputElement = createElement("button", { attrs: { name: "ClientButton" } }) as HTMLInputElement;
      buttonEle.onclick = onAddClient.bind(this);
      container.appendChild(buttonEle);
      const button: Button = new Button({ iconCss: "e-icons e-add-icon", cssClass: "e-small e-round", isPrimary: true });
      button.appendTo(buttonEle);
    }
    const clientId = args.data["ClientId"];
    const clientExists = clients.some((client) => client.id === clientId);
    comboBox.current.value = clientExists ? clientId : null;
  }

  if (args.type === "QuickInfo") {
    if (args.target.classList.contains("e-work-cells") || args.target.classList.contains("e-header-cells")) {
      scheduleObj.current.closeQuickInfoPopup();
      args.cancel = true;
    } else if (args.target.classList.contains("e-appointment")) {
      (args.element as HTMLElement).style.boxShadow = `1px 2px 5px 0 ${(args.target as HTMLElement).style.backgroundColor}`;
    }
  }

  if (args.type === "EventContainer") {
    const eventElements: NodeListOf<HTMLElement> = args.element.querySelectorAll(".e-appointment");
    eventElements.forEach((element: HTMLElement) => {
      (element.querySelector(".e-subject") as HTMLElement).style.color = "#fff";
    });
  }
};
