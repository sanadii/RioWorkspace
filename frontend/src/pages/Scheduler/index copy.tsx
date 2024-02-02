import React, { useEffect, useState, useRef } from "react";
import { BreadCrumb } from "Components/Common";
import { Button } from "reactstrap";

// Redux and selectors
import { getAppointments } from "store/actions";
import { useSelector, useDispatch } from "react-redux";
import { appointmentsSelector } from "Selectors";

// React Scheduler
import { ScheduleComponent, Inject, Agenda, Day, Month, Week, WorkWeek, ViewDirective, ViewsDirective, EventSettingsModel, DragAndDrop, Resize } from "@syncfusion/ej2-react-schedule";
import { onDragStart, onResizeStart } from "./SchedulerSettings";
import { SchedulerEditorTemplate } from "./SchedulerEditorTemplate";
interface Appointment {
  id: number;
  subject: string;
  location: string;
  startTime: string;
  endTime: string;
  categoryColor: string;
  // Add other fields as necessary
}


const Scheduler = () => {
  const dispatch = useDispatch();
  const { appointments, isAppointmentSuccess, error } = useSelector(appointmentsSelector);

  // State to hold the transformed appointments
  const [transformedAppointments, setTransformedAppointments] = useState([]);



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

  let scheduleData = [
    {
      Id: 3,
      Subject: "Testing",
      StartTime: new Date(2018, 1, 11, 9, 0),
      EndTime: new Date(2018, 1, 11, 10, 0),
      IsAllDay: false,
    },
    {
      Id: 4,
      Subject: "Vacation",
      StartTime: new Date(2018, 1, 13, 9, 0),
      EndTime: new Date(2018, 1, 13, 10, 0),
      IsAllDay: false,
    },
  ];
  const eventSettings = { dataSource: scheduleData };

  const onAddClick = () => {
    let Data = [
      {
        Id: 1,
        Subject: "Conference",
        StartTime: new Date(2018, 1, 12, 9, 0),
        EndTime: new Date(2018, 1, 12, 10, 0),
        IsAllDay: false,
      },
      {
        Id: 2,
        Subject: "Meeting",
        StartTime: new Date(2018, 1, 15, 10, 0),
        EndTime: new Date(2018, 1, 15, 11, 30),
        IsAllDay: false,
      },
    ];
    if (scheduleObj.current && buttonObj.current) {
      scheduleObj.current.addEvent(Data);
      buttonObj.current.setAttribute("disabled", "true");
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <BreadCrumb title="Appointment Scheduler" pageTitle="Appointment Scheduler" />
        <ScheduleComponent
          ref={scheduleObj}
          selectedDate={new Date(2018, 1, 15)}
          eventSettings={eventSettings}
          currentView="Week"
          // eventSettings={{ dataSource: transformedAppointments }}
          editorTemplate={SchedulerEditorTemplate} // Use the function directly
          views={["Day", "Week", "Month"]}
          width="100%"
          height="650px"
          dragStart={onDragStart}
          resizeStart={onResizeStart}
        >
          <ViewsDirective>
            <ViewDirective option="Day" />
            <ViewDirective option="Week" />
            <ViewDirective option="WorkWeek" />
            <ViewDirective option="Month" />
          </ViewsDirective>
          <Button id="add" title="Add" ref={buttonObj as any} onClick={onAddClick}>
            Add
          </Button>

          <Inject services={[Agenda, Day, Month, Week, WorkWeek, DragAndDrop, Resize]} />
        </ScheduleComponent>
      </div>
    </React.Fragment>
  );
};

export default Scheduler;
