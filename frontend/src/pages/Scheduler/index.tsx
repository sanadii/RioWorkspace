import React, { useEffect, useState, useRef, useCallback } from "react";
import { BreadCrumb } from "Components/Common";
import { Button, ButtonComponent } from "@syncfusion/ej2-react-buttons";
import "./scheduler.css";

// Redux and selectors
import { getAppointments, getClients, getAllStaff, getServices } from "store/actions";
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

} from "@syncfusion/ej2-react-schedule";
import { closest, Browser, L10n,   Internationalization, extend, isNullOrUndefined, createElement } from "@syncfusion/ej2-base";
import { DropDownListComponent, ComboBox } from "@syncfusion/ej2-react-dropdowns";
import { Query, Predicate, DataManager } from "@syncfusion/ej2-data";

// React Scheduler
import { calendarSettings, onDragStart, onResizeStart } from "./SchedulerSettings";
import { SchedulerEditorTemplate } from "./SchedulerEditorTemplate";
import { dateHeaderTemplate } from "./DateHeaderTemplate";

import { onPopupOpen } from "./onPopupOpen";
import getEventSettings from './eventSettings';
import { errorPlacement, updateActiveItem, loadImage, getString } from "Components/Utils/util";


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

  const comboBox = useRef<ComboBox>(null);
  const clientValue = useRef(null);
  const addEditClientObj = useRef(null);
  const eventSettings = getEventSettings(transformedAppointments, clients, calendarSettings);
  const instance: Internationalization = new Internationalization();

  useEffect(() => {
    if (!appointments || appointments.length === 0) {
      dispatch(getAppointments());
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
  const buttonObj = useRef<any>(null); // Using 'any' to bypass type checking

  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentDate = useRef(selectedDate);


  // Now you can use calendarSettings in your component
  const onNavigation = (args: NavigatingEventArgs): void => {
    currentDate.current = args.currentDate || new Date();
    if (args.action === "dateNavigate") {
      setSelectedDate(currentDate.current);
    }
    // if (activeDoctorData.current.length > 0) {
    //   updateBreakHours(currentDate.current);
    //   eventData.current = generateEvents(activeDoctorData.current[0]);
    //   scheduleObj.current.eventSettings.dataSource = eventData.current;
    //   treeObj.current.updateWaitingList(activeDoctorData.current[0]["DepartmentId"], null);
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

  const getEventDetails = (data: Record<string, any>): string => {
    return (
      instance.formatDate(new Date(data["StartTime"]), { type: "date", skeleton: "long" }) +
      "(" +
      getString(new Date(data["StartTime"]), "hm", instance) +
      "-" +
      getString(new Date(data["EndTime"]), "hm", instance) +
      ")"
    );
  };

  const getBackGroundColor = (data: Record<string, any>): Record<string, string> => {
    let color: string;
    if (calendarSettings.bookingColor === "Doctors" && !isNullOrUndefined(data["DoctorId"])) {
      color = (allStaff.filter((item: Record<string, any>) => item["Id"] === data["DoctorId"])[0]["Color"] as string) || "#7575ff";
    } else {
      color = services.filter((item: Record<string, any>) => item["DepartmentId"] === data["DepartmentId"])[0]["Color"] as string;
    }
    return { backgroundColor: color, color: "#FFFFFF" };
  };

  const getPatientName = (data: Record<string, any>): string => {
    return clients.filter((item: Record<string, any>) => item["Id"] === data["PatientId"])[0]["Name"].toString();
  };

  const getDoctorName = (data: Record<string, any>): string => {
    if (!isNullOrUndefined(data["DoctorId"])) {
      return "Dr. " + allStaff.filter((item: Record<string, any>) => item["Id"] === data["DoctorId"])[0]["Name"].toString();
    } else {
      return services.filter((item: Record<string, any>) => item["DepartmentId"] === data["DepartmentId"])[0]["Text"].toString();
    }
  };

  const header = useCallback((props: Record<string, any>): JSX.Element => {
    if (props.elementType === "cell") {
      return <></>;
    }
    return (
      <div>
        <div className="quick-info-header">
          <div className="quick-info-header-content" style={getBackGroundColor(props)}>
            <div className="quick-info-title">Appointment Details</div>
            <div className="duration-text">{getEventDetails(props)}</div>
          </div>
        </div>
      </div>
    );
  }, []);

  const content = useCallback((props: Record<string, any>): JSX.Element => {
    if (props.elementType === "cell") {
      return (
        <div className="e-cell-content">
          <form className="e-schedule-form">
            <div style={{ padding: "10px" }}>
              <input className="subject e-field" type="text" name="Subject" placeholder="Title" style={{ width: "100%" }} />
            </div>
            <div style={{ padding: "10px" }}>
              <input className="location e-field" type="text" name="Location" placeholder="Location" style={{ width: "100%" }} />
            </div>
          </form>
        </div>
      );
    }
    return (
      <div>
        <div className="event-content">
          <div className="patient-name-wrap">
            <label>Patient Name</label>:
            <div>
              <span>{getPatientName(props)}</span>
            </div>
          </div>
          <div className="doctor-name-wrap">
            <label>{props.DoctorId ? "Doctor Name" : "Department Name"}</label>:
            <div>
              <span>{getDoctorName(props)}</span>
            </div>
          </div>
          <div className="notes-wrap">
            <label>Notes</label>:
            <div>
              <span>{props.Symptoms}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }, []);

  const quickInfoTemplates = { header: header, content: content };

  return (
    <React.Fragment>
      <div className="page-content">
        <BreadCrumb title="Appointment Scheduler" pageTitle="Appointment Scheduler" />

        <ScheduleComponent
          ref={scheduleObj}
          width="100%"
          height="650px"
          cssClass={"doctor-appointment-planner"}
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
          dateHeaderTemplate={dateHeaderTemplate}

          quickInfoTemplates={quickInfoTemplates}

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
