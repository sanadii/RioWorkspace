import React, { useEffect, useState, useRef, useCallback } from "react";
import { BreadCrumb } from "Components/Common";
import "./SchedulerSettings/scheduler.css";

// Redux and selectors
import { addAppointment } from "store/actions";
import { useDispatch } from "react-redux";

// @syncfusion
import {
  ScheduleComponent,
  NavigatingEventArgs,
  Inject,
  Agenda,
  Day,
  Month,
  Week,
  WorkWeek,
  ViewDirective,
  ViewsDirective,
  EventSettingsModel,
  DragAndDrop,
  Resize,
  PopupOpenEventArgs,

  // New Features
  TimelineViews,
  TimelineMonth,
  ActionEventArgs,
  CellClickEventArgs,
  TimeScaleModel,
  GroupModel,
  ResourcesDirective,
  ResourceDirective,
  getWeekFirstDate,
  addDays,
  View,
  PopupCloseEventArgs,
  type EventRenderedArgs,
  type EJ2Instance,
} from "@syncfusion/ej2-react-schedule";

import { DialogComponent } from "@syncfusion/ej2-react-popups";

import {
  closest,
  Browser,
  L10n,
  Internationalization,
  extend,
  isNullOrUndefined,
  createElement,
} from "@syncfusion/ej2-base";
import { DropDownListComponent, ComboBox } from "@syncfusion/ej2-react-dropdowns";
import { Query, Predicate, DataManager } from "@syncfusion/ej2-data";

import { Button, ButtonComponent } from "@syncfusion/ej2-react-buttons";

// React Scheduler
import { calendarSettings, onDragStart, onResizeStart } from "./SchedulerSettings/SchedulerSettings";
import {
  getEventSettings,
  EditorTemplate,
  DateHeaderTemplate,
  getQuickInfoTemplates,
  useScheduleData,
  // onPopupOpen,
  eventTemplate,
} from "./SchedulerSettings";

import { errorPlacement, updateActiveItem, loadImage, getString } from "Components/Utils/util";

import doctorsIcon from "assets/Icons/Doctors.svg";

L10n.load({
  "en-US": {
    schedule: {
      newEvent: "Add Appointment",
      editEvent: "Edit Appointment",
    },
  },
});

const Scheduler = () => {
  // Revised
  const dispatch = useDispatch();
  const { appointments, clients, services, staff } = useScheduleData();
  const eventSettings = getEventSettings(appointments, clients, calendarSettings);
  const [selectedService, setSelectedService] = useState(null);

  const quickInfoTemplates = getQuickInfoTemplates(clients, services, staff);

  const comboBox = useRef<ComboBox>(null);
  const clientValue = useRef(null);
  const addEditClientObj = useRef(null);

  // New Features
  const specialistObj = useRef<DialogComponent>(null);
  const scheduleObj = useRef<ScheduleComponent | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentDate = useRef(selectedDate);

  const buttonObj = useRef<any>(null); // Using 'any' to bypass type checking


  const serviceValue = useRef(null);
  const addEditServiceObj = useRef(null);


  // Now you can use calendarSettings in your component
  const onNavigation = (args: NavigatingEventArgs): void => {
    currentDate.current = args.currentDate || new Date();
    if (args.action === "dateNavigate") {
      setSelectedDate(currentDate.current);
    }
    // if (activeStaffData.current.length > 0) {
    //   updateBreakHours(currentDate.current);
    //   eventData.current = generateEvents(activeStaffData.current[0]);
    //   scheduleObj.current.eventSettings.dataSource = eventData.current;
    //   treeObj.current.updateWaitingList(activeStaffData.current[0]["ServiceId"], null);
    // } else {
    //   treeObj.current.updateWaitingList();
    // }
  };

  const onAddClient = (): void => {
    addEditClientObj.current.onAddClient();
  };

  const onActionComplete = (args: ActionEventArgs): void => {
    if (args.requestType === "toolBarItemRendered") {
      if (Browser.isDevice) {
        const doctorIconContainer: HTMLElement = scheduleObj.current.element.querySelector(
          ".app-doctor-icon"
        ) as HTMLElement;
        const doctorIcon: HTMLElement = doctorIconContainer.querySelector(".doctor-icon");
        const doctorImage: HTMLElement = createElement("img", {
          className: "active-doctor",
          attrs: { src: doctorsIcon },
        });
        doctorIcon.appendChild(doctorImage);
        doctorIconContainer.style.display = "block";
        doctorIconContainer.onclick = () => specialistObj.current.show();
      }
    }
    if (document.body.style.cursor === "not-allowed") {
      document.body.style.cursor = "";
    }
    if (
      args.requestType === "eventCreated" ||
      args.requestType === "eventChanged" ||
      args.requestType === "eventRemoved"
    ) {
      let updatedAppointments = [...appointments]; // Create a copy of the appointments array

      if (args.addedRecords.length > 0) {
        updatedAppointments = [...args.addedRecords];
      }

      if (args.deletedRecords.length > 0) {
        args.deletedRecords.forEach((item: Record<string, any>) => {
          updatedAppointments = updatedAppointments.filter((data: Record<string, any>) => data["Id"] !== item["Id"]);
        });
      }
      dispatch(addAppointment(updatedAppointments));
    }
  };

  const onEventRendered = (args: Record<string, any>): void => {
    if (args.element.classList.contains("e-appointment")) {
      const data: Record<string, any> = args.data as Record<string, any>;
      // Check if the appointment is even
      args.element.style.backgroundColor = "#F4FCFA";
      args.element.style.color = "#000000";
      args.element.style.border = "1px solid #7cca7c";
      args.element.style.borderLeft = "3px solid #7cca7c";
    }
  };
  console.log("Selected Service:", selectedService);

  const onAddService = (): void => {
    console.log("Selected Service:", selectedService);

    addEditServiceObj.current.onAddService();
  };
  const onPopupOpen = (args: PopupOpenEventArgs): void => {
    if (args.type === "Editor") {
      // additional field customization
      if (!args.element.querySelector(".custom-sanad")) {
        const row: HTMLElement = createElement("div", { className: "custom-sanad" });
        const formElement: HTMLElement = args.element.querySelector(".e-schedule-form");
        formElement.firstChild.insertBefore(row, args.element.querySelector(".e-title-location-row"));
        const container: HTMLElement = createElement("div", { className: "custom-field-container" });
        const comboBoxElement: HTMLInputElement = createElement("input", {
          attrs: { id: "id" },
        }) as HTMLInputElement;
        container.appendChild(comboBoxElement);
        row.appendChild(container);
        comboBox.current = new ComboBox({
          dataSource: services,
          allowFiltering: true,
          fields: { text: "name", value: "id" },
          floatLabelType: "Always",
          placeholder: "SERVICE NAME",
          change: (e: any) => setSelectedService(e.value),
          select: () => {
            if (!isNullOrUndefined(document.querySelector(".custom-field-row .field-error"))) {
              (document.querySelector(".custom-field-row .field-error") as HTMLElement).style.display = "none";
            }
          },
        });
        comboBox.current.appendTo(comboBoxElement);
        comboBoxElement.setAttribute("name", "name");
        const buttonEle: HTMLInputElement = createElement("button", {
          attrs: { name: "ServiceButton" },
        }) as HTMLInputElement;
        buttonEle.onclick = onAddService.bind(this);
        container.appendChild(buttonEle);
        const button: Button = new Button({
          iconCss: "e-icons e-add-icon",
          cssClass: "e-small e-round",
          isPrimary: true,
        });
        button.appendTo(buttonEle);
      }
      comboBox.current.value = args.data["ServiceId"] || null;
    }

    if (
      (args.target && !args.target.classList.contains("e-appointment") && args.type === "QuickInfo") ||
      args.type === "Editor"
    ) {
      args.cancel = onEventCheck(args);
      if (args.cancel) {
        return;
      }
    }
    const popupType: string[] = ["Editor", "RecurrenceAlert", "DeleteAlert"];
    if (popupType.includes(args.type)) {
      const target = ["DeleteAlert", "RecurrenceAlert"].includes(args.type) ? args.element : args.target;
      if (target?.classList.contains("e-work-cells")) {
        args.cancel =
          target.classList.contains("e-read-only-cells") ||
          !scheduleObj.current?.isSlotAvailable(args.data as Record<string, any>);
      }
      const errorTarget: HTMLElement = document.getElementById("EventType_Error") as HTMLElement;
      if (!isNullOrUndefined(errorTarget)) {
        errorTarget.style.display = "none";
        errorTarget.style.left = "351px";
      }
      setTimeout(() => {
        const formElement = args.element.querySelector(".e-schedule-form");
        if (formElement == null) return;
        // const validator = (formElement as EJ2Instance).ej2_instances[0];
        // validator.addRules("clientName", { required: true });
        // validator.addRules("StartTimezone", { required: true });
        // validator.addRules("RecurrenceRule", { required: true });
        // validator.addRules("IsAllDay", { required: true });
        // validator.addRules("EndTimezone", { required: true });
        // validator.addRules("EndTime", { required: true });
        // validator.addRules("Id", { required: true });
      }, 100);
    }
  };

  const onEventCheck = (args: Record<string, any>): boolean => {
    let eventObj: Record<string, any> = args.data instanceof Array ? args.data[0] : args.data;
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return eventObj.CheckIn < today;
  };

  const minValidation = (args: any) => {
    return args["value"].length >= 10;
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <BreadCrumb title="Appointment Scheduler" pageTitle="Appointment Scheduler" />

        <ScheduleComponent
          ref={scheduleObj}
          width="100%"
          height="650px"
          cssClass={"staff-appointment-planner"}
          // showWeekend={false}

          // // Calendar Settings Props
          startHour={calendarSettings.calendar["start"]}
          endHour={calendarSettings.calendar["end"]}
          currentView={calendarSettings.currentView}
          firstDayOfWeek={calendarSettings.firstDayOfWeek}
          timeScale={calendarSettings.timeScale}
          // // The data to show
          eventSettings={eventSettings}
          // popupOpen={onPopupOpen}
          // popupOpen={(args) => onPopupOpen(args, clients, clientValue, comboBox, onAddClient, scheduleObj)}
          views={["Day", "Week", "Month"]}
          selectedDate={new Date(2024, 2, 2)}
          dragStart={onDragStart}
          resizeStart={onResizeStart}
          // New Features
          navigating={onNavigation}
          // Date Header
          quickInfoTemplates={quickInfoTemplates}
          actionComplete={onActionComplete}
          // Templates
          dateHeaderTemplate={DateHeaderTemplate}
          editorTemplate={EditorTemplate}
          eventRendered={onEventRendered}

          // cellTemplate={cellTemplate}
        >
          <ViewsDirective>
            <ViewDirective option="Day" />
            <ViewDirective option="Week" />
            <ViewDirective option="WorkWeek" />
            <ViewDirective option="Month" />
          </ViewsDirective>

          <Inject services={[Agenda, Day, Month, Week, WorkWeek, DragAndDrop, Resize]} />
        </ScheduleComponent>
      </div>
    </React.Fragment>
  );
};

export default Scheduler;
