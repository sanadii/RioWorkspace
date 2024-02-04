import React, { useEffect, useState, useRef, useCallback } from "react";
import { BreadCrumb } from "Components/Common";
import "./SchedulerSettings/scheduler.css";

// Redux and selectors
import { getAppointments, addAppointment, getClients, getAllStaff, getServices } from "store/actions";
import { useSelector, useDispatch } from "react-redux";
import { clientsSelector, appointmentsSelector, servicesSelector, staffSelector } from "Selectors";

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
} from "@syncfusion/ej2-react-schedule";

import { DialogComponent } from "@syncfusion/ej2-react-popups";

import { closest, Browser, L10n, Internationalization, extend, isNullOrUndefined, createElement } from "@syncfusion/ej2-base";
import { DropDownListComponent, ComboBox } from "@syncfusion/ej2-react-dropdowns";
import { Query, Predicate, DataManager } from "@syncfusion/ej2-data";

// React Scheduler
import { calendarSettings, onDragStart, onResizeStart } from "./SchedulerSettings/SchedulerSettings";
import { SchedulerEditorTemplate } from "./SchedulerSettings/SchedulerEditorTemplate";
import { DateHeaderTemplate, getQuickInfoTemplates, onPopupOpen } from "./SchedulerSettings";

import getEventSettings from "./SchedulerSettings/eventSettings";
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

interface Appointment {
  id: number;
  subject: string;
  location: string;
  startTime: string;
  endTime: string;
  categoryColor: string;
}

const Scheduler = () => {
  const dispatch = useDispatch();
  const { appointments, isAppointmentSuccess, error } = useSelector(appointmentsSelector);
  const { clients, isClientSuccess } = useSelector(clientsSelector);
  const { services, isServiceSuccess } = useSelector(servicesSelector);
  const { allStaff, isStaffSuccess } = useSelector(staffSelector);

  const [transformedAppointments, setTransformedAppointments] = useState([]);
  const QuickInfoTemplates = getQuickInfoTemplates(clients, services, allStaff);

  const comboBox = useRef<ComboBox>(null);
  const clientValue = useRef(null);
  const addEditClientObj = useRef(null);
  const eventSettings = getEventSettings(transformedAppointments, clients, calendarSettings);
  const instance: Internationalization = new Internationalization();

  // New Features
  const specialistObj = useRef<DialogComponent>(null);
  const activeDoctorData = useRef([]);

  useEffect(() => {
    if (!appointments || appointments.length === 0) {
      dispatch(getAppointments());
      dispatch(getAllStaff());
      dispatch(getServices());
      dispatch(getClients());
    } else {
      // Transform the appointments data
      const transformed = appointments.map((appointment: Appointment) => ({
        Id: appointment.id,
        Subject: appointment.subject,
        Location: appointment.location,
        StartTime: appointment.startTime,
        EndTime: appointment.endTime,
        CategoryColor: appointment.categoryColor,
        // Add other fields as necessary
      }));
      setTransformedAppointments(transformed);
    }
  }, [dispatch, appointments]);

  const scheduleObj = useRef<ScheduleComponent | null>(null);
  // const data = extend([], dataSource.zooEventsData, null, true);

  const buttonObj = useRef<any>(null); // Using 'any' to bypass type checking

  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentDate = useRef(selectedDate);

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

  // const eventSettings: EventSettingsModel = {
  //   dataSource: transformedAppointments,
  //   fields: {
  //     subject: { name: 'GuestName' },
  //     startTime: { name: 'CheckIn' },
  //     endTime: { name: 'CheckOut' },
  //   },
  // };

  const onActionComplete = (args: ActionEventArgs): void => {
    if (args.requestType === "toolBarItemRendered") {
      if (Browser.isDevice) {
        const doctorIconContainer: HTMLElement = scheduleObj.current.element.querySelector(".app-doctor-icon") as HTMLElement;
        const doctorIcon: HTMLElement = doctorIconContainer.querySelector(".doctor-icon");
        const doctorImage: HTMLElement = createElement("img", { className: "active-doctor", attrs: { src: doctorsIcon } });
        doctorIcon.appendChild(doctorImage);
        doctorIconContainer.style.display = "block";
        doctorIconContainer.onclick = () => specialistObj.current.show();
      }
    }
    if (document.body.style.cursor === "not-allowed") {
      document.body.style.cursor = "";
    }
    if (args.requestType === "eventCreated" || args.requestType === "eventChanged" || args.requestType === "eventRemoved") {
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

          // Calendar Settings Props
          startHour={calendarSettings.calendar["start"]}
          endHour={calendarSettings.calendar["end"]}
          currentView={calendarSettings.currentView}
          firstDayOfWeek={calendarSettings.firstDayOfWeek}
          timeScale={calendarSettings.timeScale}
          // The data to show
          eventSettings={eventSettings}
          popupOpen={(args) => onPopupOpen(args, clients, clientValue, comboBox, onAddClient, scheduleObj)}
          // editorTemplate={SchedulerEditorTemplate}
          views={["Day", "Week", "Month"]}
          selectedDate={new Date(2024, 2, 2)}
          dragStart={onDragStart}
          resizeStart={onResizeStart}
          // New Features
          navigating={onNavigation}
          // Date Header
          dateHeaderTemplate={DateHeaderTemplate}
          quickInfoTemplates={QuickInfoTemplates}
          actionComplete={onActionComplete}
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
