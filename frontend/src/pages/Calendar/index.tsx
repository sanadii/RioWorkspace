import React, { useEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getSchedule, getClients } from "store/actions";
import { appointmentsSelector, clientsSelector } from "Selectors";
import { addNewEvent as onAddNewEvent, deleteEvent as onDeleteEvent } from "store/actions";
import { createSelector } from "reselect";

// Calendar
import FullCalendar from "@fullcalendar/react";


// Calendar Settings
import createCalendarSettings from "./CalendarSettings"; // Adjust the path as needed
import CalendarModal from "./CalendarModal";

import { DeleteModal } from "Components/Common";

const Calender = () => {
  const dispatch: any = useDispatch();
  const [appointment, setAppointment] = useState<any>({});
  const [modal, setModal] = useState<boolean>(false);
  const [selectedNewDay, setSelectedNewDay] = useState<any>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteEvent, setDeleteEvent] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");

  // popover take 2
  const popoverContainerRef = useRef(null);

  useEffect(() => {
    // Create a container for the popover
    popoverContainerRef.current = document.createElement("div");
    document.body.appendChild(popoverContainerRef.current);

    return () => {
      // Clean up the container when the component unmounts
      document.body.removeChild(popoverContainerRef.current);
    };
  }, []);

  // Popover
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverTarget, setPopoverTarget] = useState(null); // Initialize as null


  // useEffect(() => {
  //   if (popoverTargetRef.current) {
  //     setPopoverTarget(true);
  //   }
  // }, []);

  // console.log("event: ", event);
  // Data
  const { appointments, services, staff } = useSelector(appointmentsSelector);
  const { clients } = useSelector(clientsSelector);
  const fullCalendarOptions = createCalendarSettings();

  const selectLayoutState = (state: any) => state.Calendar;
  const calendarDataProperties = createSelector(selectLayoutState, (state: any) => ({
    events: state.events,
    categories: state.categories,
    isEventUpdated: state.isEventUpdated,
  }));

  // Inside your component
  const { events, categories, isEventUpdated } = useSelector(calendarDataProperties);

  useEffect(() => {
    dispatch(getSchedule());
    dispatch(getClients());
  }, [dispatch]);

  useEffect(() => {
    if (isEventUpdated) {
      setIsEdit(false);
      setAppointment({});
    }
  }, [dispatch, isEventUpdated]);

  /**
   * Handling the modal state
   */

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setAppointment(null);
      setIsEdit(false);
    } else {
      setModal(true);
    }
  }, [modal]);

  /**
   * Handling date click on calendar
   */

  const handleDateClick = (arg) => {
    console.log("handleDateClick: ", arg);
    const now = new Date();
    const startDate = new Date(arg.date);
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 2);

    // Adjust for timezone offset before converting to ISO string
    const timezoneOffset = startDate.getTimezoneOffset() * 60000; // offset in milliseconds
    const adjustedStart = new Date(startDate.getTime() - timezoneOffset);
    const adjustedEnd = new Date(endDate.getTime() - timezoneOffset);

    setAppointment({
      start: adjustedStart.toISOString(),
      end: adjustedEnd.toISOString(),
    });
    setSelectedNewDay(startDate.toISOString());

    // Create a unique ID for the popover target
    // Replace ':' with '_' and '+' with 'plus' to create a valid ID
    const popoverTargetId = `popover-${arg.dateStr.replace(/:/g, "_").replace(/\+/g, "plus")}`;
    arg.dayEl.id = popoverTargetId; // Assign the ID to the clicked date element

    setPopoverOpen(true); // Open the popover
    setPopoverTarget(popoverTargetId); // Set the target for the popover
  };

  const displayLocalTime = (isoString) => {
    return new Date(isoString).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZoneName: "short",
    });
  };

  const str_dt = function formatDate(date: any) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var d = new Date(date),
      month = "" + monthNames[d.getMonth()],
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [day + " " + month, year].join(",");
  };

  /**
   * Handling click on event on calendar
   */

  // Update Data
  const handleAppointmentClick = useCallback(
    (arg: any) => {
      const appointment = arg.event;

      const st_date = appointment.start;
      const ed_date = appointment.end;
      const r_date = ed_date == null ? str_dt(st_date) : str_dt(st_date) + " to " + str_dt(ed_date);
      const er_date = ed_date === null ? [st_date] : [st_date, ed_date];

      setAppointment({
        id: appointment.id,
        title: appointment.title,
        start: appointment.start,
        end: appointment.end,
        classNames: appointment.classNames,

        client: appointment.extendedProps.client,

        services: appointment.extendedProps.services,
        packages: appointment.extendedProps.packages,
        products: appointment.extendedProps.products,

        duration: appointment.duration,
        price: appointment.price,

        // category: appointment.classNames[0],
        note: appointment._def.extendedProps.note,
        defaultDate: er_date,
        datetag: r_date,
      });

      setIsEdit(true);
      toggle();
    },
    [toggle]
  );

  /**
   * On delete event
   */
  const handleDeleteEvent = () => {
    dispatch(onDeleteEvent(deleteEvent));
    setDeleteModal(false);
  };


  

  document.title = "Calendar | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      {/* {popoverTarget && <AppointmentPopover isOpen={popoverOpen} toggle={togglePopover} target={popoverTarget} />} */}

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => {
          setDeleteModal(false);
        }}
      />

      <FullCalendar
        events={appointments}
        dateClick={handleDateClick}
        // eventClick={handleAppointmentClick}
        {...fullCalendarOptions}
        // slotLaneRender={slotLaneRender}

        // eventDidMount={eventDidMount}
      />

      <div style={{ clear: "both" }}></div>

      <CalendarModal
        modal={modal}
        services={services}
        staff={staff}
        clients={clients}
        appointmentRef={""}
        // id="event-modal"
        toggle={toggle}
        appointment={appointment}
        // setAppointment={setAppointment}
        isEdit={isEdit}
        // setModal={setModal}
        // setDeleteModal={setDeleteModal}
      />
    </React.Fragment>
  );
};

Calender.propTypes = {
  events: PropTypes.any,
  categories: PropTypes.array,
  onGetEvents: PropTypes.func,
  onAddNewEvent: PropTypes.func,
  onUpdateEvent: PropTypes.func,
  onDeleteEvent: PropTypes.func,
  onGetCategories: PropTypes.func,
};

export default Calender;
