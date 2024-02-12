import React, { useEffect, useState, useRef, useCallback } from "react";
import { BreadCrumb } from "Components/Common";
import "./SchedulerSettings/scheduler.css";
import ReactDOM from "react-dom";

// Redux and selectors
import { useDispatch } from "react-redux";
import { addAppointment, updateAppointment, deleteAppointment } from "store/actions";

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
  ActionEventArgs,
} from "@syncfusion/ej2-react-schedule";
import { DialogComponent } from "@syncfusion/ej2-react-popups";

import { L10n, createElement } from "@syncfusion/ej2-base";

// React Scheduler
import {
  calendarSettings,
  getEventSettings,
  DateHeaderTemplate,
  useQuickInfoTemplates,
  useDataManager,
  eventTemplate,
} from "./SchedulerSettings";

import { onDragStart, onResizeStart } from "./SchedulerActions";

import EditorTemplate from "./EditorTemplate";

import { errorPlacement, updateActiveItem, loadImage, getString } from "Components/Utils/util";

import doctorsIcon from "assets/Icons/Doctors.svg";
import "./schedule.css";
import { ActionArgs } from "@syncfusion/ej2-react-grids";

L10n.load({
  "en-US": {
    schedule: {
      newEvent: "Add Appointment",
      editEvent: "Edit Appointment",
    },
  },
});

const Scheduler = () => {
  const dispatch = useDispatch();

  // Revised
  const scheduleObj = useRef<ScheduleComponent | null>(null);
  // console.log("scheduleObj: ", scheduleObj);
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

  const appointmentRef = useRef(null);
  const clientRef = useRef(null);
  const serviceRef = useRef([]);
  const statusRef = useRef([]);
  const productRef = useRef([]);
  const packageRef = useRef([]);

  // Templates
  const quickInfoTemplates = useQuickInfoTemplates(scheduleObj, clientRef);
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
  };

  const onActionBegin = (args: ActionEventArgs): void => {
    console.log("onActionBegin called", args);

    if (args.requestType === "eventCreate") {
      const newEvent = {
        appointment: appointmentRef.current,
        client: clientRef.current,
        services: serviceRef.current,
        product: productRef.current,
        package: packageRef.current,
        status: statusRef.current,
      };
      console.log("newEvent", newEvent);

      // Dispatch the addAppointment action with the new event data
      dispatch(addAppointment(newEvent));
    }
  };

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
    console.log("onEventRendered is called");

    if (args.element.classList.contains("e-appointment")) {
      const data: Record<string, any> = args.data as Record<string, any>;
      // Check if the appointment is even
      args.element.style.backgroundColor = "#F4FCFA";
      args.element.style.color = "#000000";
      args.element.style.border = "1px solid #7cca7c";
      args.element.style.borderLeft = "3px solid #7cca7c";
    }
  };

  const onActionComplete = (args: ActionEventArgs): void => {
    if (args.requestType === "eventCreated") {
      // Manually construct the event data from refs or state
      const newEvent = {
        appointment: appointmentRef.current,
        client: clientRef.current,
        services: serviceRef.current,
        product: productRef.current,
        package: packageRef.current,
        status: statusRef.current,
      };

      // Check if you can directly modify args.addedRecords
      if (Array.isArray(args.addedRecords)) {
        args.addedRecords[0] = newEvent;
      }

      // Dispatch the addAppointment action with the new event data
      dispatch(addAppointment(newEvent));
    }
  };

  const onCreated = (args: Record<string, any>): void => {
    console.log("onCreated is called");
    const newEvent = {
      appointment: appointmentRef.current,
      client: clientRef.current,
      services: serviceRef.current,
      product: productRef.current,
      package: packageRef.current,
      status: statusRef.current,
    };

    // Check if you can directly modify args.addedRecords
    if (Array.isArray(args.addedRecords)) {
      args.addedRecords[0] = newEvent;
    }

    // Dispatch the addAppointment action with the new event data
    dispatch(addAppointment(newEvent));
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

  // const dataToCheck = data as Record<string, any>[] }

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
          views={["Day", "Week", "Month"]}
          dragStart={onDragStart}
          resizeStart={onResizeStart}
          // // New Features
          // navigating={onNavigation}
          // // Date Header
          quickInfoTemplates={quickInfoTemplates}
          // // Templates
          // dateHeaderTemplate={DateHeaderTemplate}
          editorTemplate={(args) => (
            <EditorTemplate
              args={args}
              services={services}
              staff={staff}
              appointmentRef={appointmentRef}
              clientRef={clientRef}
              serviceRef={serviceRef}
              productRef={productRef}
              packageRef={packageRef}
              statusRef={statusRef}
            />
          )}
          // eventRendered={onEventRendered}
          // // Actions
          actionBegin={onActionBegin}
          // actionComplete={onActionComplete}
          // created={onCreated}
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
