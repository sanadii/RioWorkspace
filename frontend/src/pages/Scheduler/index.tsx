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
  type EJ2Instance,
  type EventRenderedArgs,
  type PopupOpenEventArgs,
  type PopupCloseEventArgs,
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
import { ActionArgs } from "@syncfusion/ej2-react-grids";

import { AppointmentStatusOptions } from "Components/constants";

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
  const { appointments, services, staff, clients } = useDataManager();
  const eventSettings = getEventSettings(appointments, calendarSettings);

  // console.log("appointmentData :", appointmentData);
  // console.log("serviceData :", serviceData);
  // console.log("staffData :", staffData);

  const appointmentRef = useRef(null);

  // Templates
  const quickInfoTemplates = useQuickInfoTemplates(scheduleObj);
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

  const onPopupOpen = (args: PopupOpenEventArgs): void => {
    console.log("scheduleObj: ", args);
    if (args.type === "Editor") {
      // additional field customization
    }
    if (args.type === "QuickInfo") {
      // Check if the target is a work cell or header cell
      if (args.target.classList.contains("e-work-cells") || args.target.classList.contains("e-header-cells")) {
        scheduleObj.current.closeQuickInfoPopup();
        args.cancel = true;
      } else if (args.target.classList.contains("e-appointment")) {
        // Style the appointment element
        (args.element as HTMLElement).style.boxShadow = `1px 2px 5px 0 ${
          (args.target as HTMLElement).style.backgroundColor
        }`;

        // Find the e-event-popup element and add a class to it
        const eventPopup = args.element.querySelector(".e-event-popup");
        if (eventPopup) {
          eventPopup.classList.add("e-event-popup-inner");
        }
      }
    }
  };

  const onPopupClose = (args: PopupCloseEventArgs): void => {
    if (args.type === "Editor" && args.data) {
      const formElement: any = args.element.querySelectorAll(".custom-event-editor .e-lib[data-name]");
      const elements: HTMLElement[] = Array.from<HTMLElement>(formElement);
      const eventObj: Record<string, any> = args.data as Record<string, any>;

      // Process form fields
      for (const element of elements) {
        const fieldName: string = element.dataset.name as string;
        const instance: any = (element as EJ2Instance).ej2_instances[0];
        if (instance) {
          eventObj[fieldName] = instance.value;
        }
      }

      // Add appointment details to the event object
      eventObj["id"] = appointmentRef.current.id;
      eventObj["startTime"] = appointmentRef.current.startTime;
      eventObj["endTime"] = appointmentRef.current.endTime;

      args.data = eventObj;
    }
  };

  // const clientRef = useRef(null);
  // const serviceRef = useRef([]);
  // const statusRef = useRef([]);
  // const productRef = useRef([]);
  // const packageRef = useRef([]);

  const onActionBegin = (args: ActionEventArgs): void => {
    let slotAvail: boolean = false;
    if (["eventCreate", "eventChange", "eventRemove"].includes(args.requestType)) {
      args.cancel = true;
      switch (args.requestType) {
        case "eventCreate":
          args.addedRecords?.forEach((data: Record<string, any>) => {
            if (scheduleObj.current?.isSlotAvailable(data)) {
              slotAvail = true;
              data.startTime = data.startTime.toISOString();
              data.endTime = data.endTime.toISOString();
              // dispatch(addData(data));
            }
          });

          const newEvent = appointmentRef.current;
          console.log("newEvent", newEvent);

          // Dispatch the addAppointment action with the new event data
          dispatch(addAppointment(newEvent));
          console.log(args);
          args.addedRecords?.forEach((data: Record<string, any>) => {});
          break;
        case "eventChange":
          args.changedRecords?.forEach((data: Record<string, any>) => {
            if (scheduleObj.current?.isSlotAvailable(data)) {
              slotAvail = true;
              data.startTime = data.startTime.toISOString();
              data.endTime = data.endTime.toISOString();
            }

            const updatedEvent = appointmentRef.current;
            console.log("updatedEvent", updatedEvent);

            // Dispatch the addAppointment action with the new event data
            dispatch(updateAppointment(updatedEvent));
            console.log(args);
            args.addedRecords?.forEach((data: Record<string, any>) => {
              // if (scheduleObj.current?.isSlotAvailable(data)) {
              //   slotAvail = true;
              //   data.CheckIn = data.CheckIn.toISOString();
              //   data.CheckOut = data.CheckOut.toISOString();
              //   dispatch(addAppointment(newEvent));
              // toastObj.current.content = "Booking has been created successfully.";
              // toastObj.current.cssClass = "e-toast-success";
              // toastObj.current.show();
              // }
            });
          });
          break;
        case "eventRemove":
          args.deletedRecords?.forEach((data: Record<string, any>) => {
            slotAvail = true;
            data.startTime = data.startTime.toISOString();
            data.endTime = data.endTime.toISOString();
            dispatch(deleteAppointment(data));
            // toastObj.current.content = "Booking has been deleted successfully.";
            // toastObj.current.cssClass = "e-toast-success";
            // toastObj.current.show();
          });
          break;
      }
      if (!slotAvail) {
        // toastObj.current.content = "Room not available for booking on the selected Dates.";
        // toastObj.current.cssClass = "e-toast-warning";
        // toastObj.current.show();
      }
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

  const onEventRendered = (args: EventRenderedArgs): void => {
    // Common classes to be added to all events
    const commonClasses = ["fc-event", "fc-event-skin"];

    // Add common classes to the event element
    args.element.querySelector('.e-appointment-details').classList.add(...commonClasses);


    // Locate the child div inside 'e-appointment-details'
    const childDiv = args.element.querySelector('.e-appointment-details > div');

    // Check if the childDiv exists
    if (childDiv) {
        // Add the 'fc-event-inner' class to the childDiv
        childDiv.classList.add('e-appointment-inner');
    }

    console.log("targetDiv: ", childDiv)

    // Additional logic based on status
    const status: number = args.data.status;
    const statusOption = AppointmentStatusOptions.find((option) => option.id === status);
    console.log("args.element: ", args.element);
    if (statusOption) {
      // Add specific classes based on the status
      args.element.querySelector('.e-appointment-details').classList.add(...statusOption.className.split(" "));
      args.element.style.backgroundColor = statusOption.color;
      args.element.style.borderColor = statusOption.color;
    }
  };

  const getAppointmentStatusClass = (status: number): string | null => {
    const statusOption = AppointmentStatusOptions.find((option) => option.id === status);
    return statusOption ? statusOption.className : null;
  };

  const getBorderColor = (status: number): string => {
    const statusOption = AppointmentStatusOptions.find((option) => option.id === status);
    return statusOption ? statusOption.badgeClass : "#000";
  };

  // const onEventRendered = (args: Record<string, any>): void => {
  //   console.log("onEventRendered is called");

  //   if (args.element.classList.contains("e-appointment")) {
  //     const data: Record<string, any> = args.data as Record<string, any>;
  //     // Check if the appointment is even
  //     args.element.style.backgroundColor = "#F4FCFA";
  //     args.element.style.color = "#000000";
  //     args.element.style.border = "1px solid #7cca7c";
  //     args.element.style.borderLeft = "3px solid #7cca7c";
  //   }
  // };

  const onActionComplete = (args: ActionEventArgs): void => {
    if (args.requestType === "eventCreated") {
      // Manually construct the event data from refs or state
      const newEvent = {
        appointment: appointmentRef.current,
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
    };

    // Check if you can directly modify args.addedRecords
    if (Array.isArray(args?.addedRecords)) {
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

  const editorTemplate = (data: Record<string, any>): React.JSX.Element => {
    // services, staff, and other refs should be defined or obtained from the context/state/hooks
    return (
      <EditorTemplate
        scheduleObj={scheduleObj}
        // scheduleObj={scheduleObj.current} // passing the current value of scheduleObj ref
        data={data}
        services={services}
        staff={staff}
        clients={clients}
        appointmentRef={appointmentRef}
      />
    );
  };

  // i want to say if the cell is an hour, not fraction of an hour, show The Hour, like 11:00PM
  const getCellContent = (date: Date) => {
    // Check for specific dates and hours
    if (date.getMinutes() === 0) {
      // Format the hour in 12-hour format with AM/PM
      let hours = date.getHours();
      let ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      return `${hours}:00${ampm}`;
    } else {
      return "";
    }
  };

  const cellTemplate = (props) => {
    console.log("cellTemplate props:", props); // Debugging

    if (props.type === "workCells") {
      return <div className="e-slot-time-inner" dangerouslySetInnerHTML={{ __html: getCellContent(props.date) }}></div>;
    }
    return;
  };

  return (
    <React.Fragment>
      <BreadCrumb title="Appointment Scheduler" pageTitle="Appointment Scheduler" />

      <ScheduleComponent
        ref={scheduleObj}
        width="100%"
        // height="650px"
        cssClass={"staff-appointment-planner"}
        // showWeekend={false}

        // Calendar Settings Props
        startHour={calendarSettings.calendar["start"]}
        endHour={calendarSettings.calendar["end"]}
        currentView={calendarSettings.currentView}
        firstDayOfWeek={calendarSettings.firstDayOfWeek}
        timeScale={calendarSettings.timeScale}
        // The data to show
        eventSettings={eventSettings}
        popupOpen={onPopupOpen}
        views={["Day", "Week", "Month"]}
        dragStart={onDragStart}
        resizeStart={onResizeStart}
        // New Features
        navigating={onNavigation}
        // Date Header
        popupClose={onPopupClose}
        quickInfoTemplates={quickInfoTemplates}
        // Templates
        dateHeaderTemplate={DateHeaderTemplate}
        editorTemplate={editorTemplate}
        eventRendered={onEventRendered}
        // Actions
        actionBegin={onActionBegin}
        actionComplete={onActionComplete}
        created={onCreated}
        cellTemplate={cellTemplate}
      >
        <ViewsDirective>
          <ViewDirective option="Day" eventTemplate={eventTemplate} />
          <ViewDirective option="Week" eventTemplate={eventTemplate} />
          <ViewDirective option="WorkWeek" eventTemplate={eventTemplate} />
          <ViewDirective option="Month" />
        </ViewsDirective>

        <Inject services={[Agenda, Day, Month, Week, WorkWeek, DragAndDrop, Resize]} />
      </ScheduleComponent>
    </React.Fragment>
  );
};

export default Scheduler;
