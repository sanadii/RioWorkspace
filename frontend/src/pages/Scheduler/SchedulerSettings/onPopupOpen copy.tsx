import React, { useEffect, useState, useRef } from "react";

import { PopupOpenEventArgs } from "@syncfusion/ej2-react-schedule";
import { closest, Browser, L10n, extend, isNullOrUndefined, createElement } from "@syncfusion/ej2-base";
import { ComboBox } from "@syncfusion/ej2-react-dropdowns";
import { Button, ButtonComponent } from "@syncfusion/ej2-react-buttons";

export const onPopupOpen = (args: PopupOpenEventArgs, clients, clientValue, comboBox, onAddClient, scheduleObj) => {
  if (args.type === "Editor") {
    // additional field customization
    if (!args.element.querySelector(".custom-field-row")) {
      // ...
    }
    const clientId = args.data["ClientId"];
    const clientExists = clients.some((client) => client.id === clientId);
    if (comboBox.current) {
      comboBox.current.value = clientExists ? clientId : null;
    }
  }

  if (args.type === "QuickInfo") {
    if (args.target.classList.contains("e-work-cells") || args.target.classList.contains("e-header-cells")) {
      scheduleObj.current.closeQuickInfoPopup();
      args.cancel = true;
    } else if (args.target.classList.contains("e-appointment")) {
      (args.element as HTMLElement).style.boxShadow = `1px 2px 5px 0 ${
        (args.target as HTMLElement).style.backgroundColor
      }`;
    }
  }

  if (args.type === "EventContainer") {
    const eventElements: NodeListOf<HTMLElement> = args.element.querySelectorAll(".e-appointment");
    eventElements.forEach((element: HTMLElement) => {
      (element.querySelector(".e-subject") as HTMLElement).style.color = "#fff";
    });
  }
};
