import React, { useEffect, useState, useRef, useCallback } from "react";
import { BreadCrumb } from "Components/Common";
import "./SchedulerSettings/scheduler.css";
import ReactDOM from "react-dom";

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
  DragAndDrop,
  Resize,
  PopupOpenEventArgs,
} from "@syncfusion/ej2-react-schedule";
import { DialogComponent } from "@syncfusion/ej2-react-popups";

import { L10n, createElement } from "@syncfusion/ej2-base";

// React Scheduler
import {
  calendarSettings,
  onDragStart,
  onResizeStart,
  getEventSettings,
  // EditorTemplate,
  DateHeaderTemplate,
  getQuickInfoTemplates,
  useDataManager,
  // onPopupOpen,
  eventTemplate,
} from "./SchedulerSettings";

import EditorComponent from "./EditorComponent";
import EditorTemplate from "./EditorComponent/EditorTemplate";

import { errorPlacement, updateActiveItem, loadImage, getString } from "Components/Utils/util";

import doctorsIcon from "assets/Icons/Doctors.svg";
import "./schedule.css";

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
  const scheduleObj = useRef<ScheduleComponent | null>(null);

  const { appointments, services, staff } = useDataManager();
  const eventSettings = getEventSettings(appointments, calendarSettings);

  // console.log("appointmentData :", appointmentData);
  // console.log("serviceData :", serviceData);
  // console.log("staffData :", staffData);

  // Working - Commented
  //   const appointmentRef = {
  //     clientRef: useRef(null),
  //     serviceRef: useRef([]),
  //     statusRef: useRef([]),
  //     productRef: useRef([]),
  //     packageRef: useRef([])
  // };

  const clientRef = useRef(null);
  const serviceRef = useRef([]);
  const statusRef = useRef([]);
  const productRef = useRef([]);
  const packageRef = useRef([]);

  // Templates
  const quickInfoTemplates = getQuickInfoTemplates(scheduleObj, clientRef);
  // New Features
  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentDate = useRef(selectedDate);

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

  // const clientRef = useRef(null);
  // const serviceRef = useRef([]);
  // const statusRef = useRef([]);
  // const productRef = useRef([]);
  // const packageRef = useRef([]);

  const onPopupOpen = (args: PopupOpenEventArgs): void => {
    // console.log("scheduleObj: ", scheduleObj);
    if (args.type === "Editor") {
      // additional field customization
      if (!args.element.querySelector(".custom-field-row")) {
        const row: HTMLElement = createElement("div", { className: "custom-field-row" });
        const formElement: HTMLElement = args.element.querySelector(".e-schedule-form");
        if (formElement) {
          // Check if formElement exists
          const firstChild: Element | null = formElement.firstElementChild;
          if (firstChild) {
            // Check if firstChild exists
            firstChild.insertBefore(row, args.element.querySelector(".e-title-location-row"));

            // Render Client Component
            const editorComponent: HTMLElement = createElement("div", { className: "field-element-container" });
            ReactDOM.render(
              <EditorComponent
                args={args}
                services={services}
                staff={staff}
                clientRef={clientRef}
                serviceRef={serviceRef}
                productRef={productRef}
                packageRef={packageRef}
                statusRef={statusRef}
              />,
              editorComponent
            );
            row.appendChild(editorComponent);
          }
        }
      }
    }
  };

  // const onPopupOpen = (args: PopupOpenEventArgs): void => {
  //   if (args.type === "Editor") {
  //     // additional field customization
  //     if (!args.element.querySelector(".custom-field-row")) {
  //       const row: HTMLElement = createElement("div", { className: "custom-field-row" });
  //       const formElement: HTMLElement = args.element.querySelector(".e-schedule-form");
  //       formElement.firstChild.insertBefore(row, args.element.querySelector(".e-title-location-row"));
  //       const container: HTMLElement = createElement("div", { className: "custom-field-container" });
  //       // const serviceContainer: HTMLElement = createElement("div", { className: "custom-field-container" });

  //       // Render the custom React component within the container
  //       ReactDOM.render(<ClientFieldElement clients={clients} clientRef={clientRef} />, container);
  //       // ReactDOM.render(<ServiceFieldElement services={services} serviceRef={serviceRef} />, serviceContainer);

  //       row.appendChild(container);
  //       // row.appendChild(serviceContainer);
  //     }
  //   }
  // };

  // const onActionBegin = (args: ActionEventArgs): void => {
  //   if (args.requestType === "eventCreate" || args.requestType === "eventChange") {
  //     const data: Record<string, any> =
  //       args.requestType === "eventCreate"
  //         ? (args.data as Record<string, any>[])[0]
  //         : (args.changedRecords as Record<string, any>[])[0];
  //     if (clientRef.current) {
  //       data["clientData"] = clientRef.current;
  //     }

  //     if (serviceRef.current) {
  //       data["serviceData"] = serviceRef.current;
  //     }
  //     let eventCollection: Record<string, any>[] = scheduleObj.current.eventBase.filterEvents(
  //       data["StartTime"] as Date,
  //       data["EndTime"] as Date
  //     );
  //     const predicate: Predicate = new Predicate("Id", "notequal", data["Id"] as number)
  //       .and(new Predicate("DepartmentId", "equal", data["DepartmentId"] as number))
  //       .and(new Predicate("DoctorId", "equal", data["DoctorId"] as number))
  //       .and(new Predicate("Id", "notequal", data["RecurrenceID"] as number));
  //     eventCollection = new DataManager({ json: eventCollection }).executeLocal(new Query().where(predicate));
  //     if (eventCollection.length > 0) {
  //       args.cancel = true;
  //     }
  //   }
  // };

  // const onActionComplete = (args: ActionEventArgs): void => {
  //   console.log("args: ", args);
  //   if (args.requestType === "eventCreated") {
  //     dispatch(addAppointment(args.addedRecords[0]));
  //   }
  // };

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

  // const onAddService = (): void => {
  //   addEditServiceObj.current.onAddService();
  // };

  // const onEventCheck = (args: Record<string, any>): boolean => {
  //   let eventObj: Record<string, any> = args.data instanceof Array ? args.data[0] : args.data;
  //   const today = new Date();
  //   today.setDate(today.getDate() - 1);
  //   return eventObj.CheckIn < today;
  // };

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
          popupOpen={onPopupOpen}
          // popupOpen={(args) => onPopupOpen(args, clients, clientRef, comboBox, onAddClient, scheduleObj)}
          views={["Day", "Week", "Month"]}
          // selectedDate={new Date(2024, 2, 2)}
          dragStart={onDragStart}
          resizeStart={onResizeStart}
          // New Features
          navigating={onNavigation}
          // Date Header
          quickInfoTemplates={quickInfoTemplates}
          // Templates
          dateHeaderTemplate={DateHeaderTemplate}
          editorTemplate={EditorTemplate}
          eventRendered={onEventRendered}
          // Actions
          // actionBegin={onActionBegin}
          // actionComplete={onActionComplete}

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
