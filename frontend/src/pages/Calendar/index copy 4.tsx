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
import useCalendarToolbar from "./CalendarSettings/useCalendarToolbar";
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

  // console.log("event: ", event);
  // Data
  const { appointments, services, staff } = useSelector(appointmentsSelector);
  const { clients } = useSelector(clientsSelector);

  console.log("THE APPOINTMENTS: ", appointments);

  // Hooks
  const { customButtons, selectedStaff } = useCalendarToolbar();
  const fullCalendarOptions = createCalendarSettings(customButtons);

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
    const now = new Date();
    const startDate = new Date(arg.date);
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 2);

    // Adjust for timezone offset before converting to ISO string
    const timezoneOffset = startDate.getTimezoneOffset() * 60000; // offset in milliseconds
    const adjustedStart = new Date(startDate.getTime() - timezoneOffset);
    const adjustedEnd = new Date(endDate.getTime() - timezoneOffset);

    // console.log(`CHECKING TIME --- NOW: ${now}\nstartTime: ${startDate}\nendTime: ${endDate}`);

    setAppointment({
      start: adjustedStart.toISOString(),
      end: adjustedEnd.toISOString(),
    });
    setSelectedNewDay(startDate.toISOString());
    toggle();
  };

  // console.log("CHECKING TIME --- AppointmentTime: ", appointment);

  const displayLocalTime = (isoString) => {
    return new Date(isoString).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZoneName: "short",
    });
  };

  // console.log("123 Local Start Time: ", displayLocalTime(appointment?.start));
  // console.log("123 Local End Time: ", displayLocalTime(appointment?.end));

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
      console.log("check arg: appointment: ", appointment);
      console.log("check arg: arg", arg);
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

  // fc-timegrid-slot fc-timegrid-slot-lane

  /**
   * On category darg event
   */
  const onDrag = (event: any) => {
    event.preventDefault();
  };

  /**
   * On calendar drop event
   */
  const onDrop = (event: any) => {
    const date = event["date"];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(year, month, day, currentHour, currentMin, currentSec);

    const draggedEl = event.draggedEl;
    const draggedElclass = draggedEl.className;
    if (draggedEl.classList.contains("external-event") && draggedElclass.indexOf("fc-event-draggable") === -1) {
      const modifiedData = {
        id: Math.floor(Math.random() * 1000),
        title: draggedEl.innerText,
        start: modifiedDate,
        className: draggedEl.className,
      };
      dispatch(onAddNewEvent(modifiedData));
    }
  };

  function formatTime(timeString) {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hoursInt = parseInt(hours, 10);
    const ampm = hoursInt >= 12 ? "pm" : "am";
    const formattedHours = ((hoursInt + 11) % 12) + 1; // Convert 24h to 12h format
    return `${formattedHours}:${minutes} ${ampm}`;
  }

  const generateTimeSlots = () => {
    // Select all the relevant <td> elements, excluding those with 'fc-timegrid-slot-minor'
    const timeSlots = document.querySelectorAll(".fc-timegrid-slot.fc-timegrid-slot-lane:not(.fc-timegrid-slot-minor)");

    // Iterate over each <td> element
    timeSlots.forEach((slot) => {
      // Check if the slot already contains the 'fc-slot-times' div
      if (!slot.querySelector(".fc-slot-times")) {
        // Extract the time from the data-time attribute
        const time = slot.getAttribute("data-time");
        const formattedTime = formatTime(time);

        // Create the div structure to be inserted
        const div = document.createElement("div");
        div.className = "fc-slot-times";
        div.style.position = "relative";

        // Add multiple divs inside the main div
        for (let i = 0; i < 7; i++) {
          const innerDiv = document.createElement("div");
          innerDiv.className = "fc-slot-time";

          const span = document.createElement("span");
          span.className = "fc-slot-time-inner";
          span.textContent = formattedTime + " "; // Set the time as content

          innerDiv.appendChild(span);
          div.appendChild(innerDiv);
        }

        // Append the created div structure to the <td> element
        slot.appendChild(div);
      }
    });
  };

  document.title = "Calendar | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => {
          setDeleteModal(false);
        }}
      />

      <FullCalendar
        timeZone="local" // the default (unnecessary to specify)
        handleWindowResize={true}
        themeSystem="bootstrap"
        events={appointments}
        editable={true}
        droppable={true}
        selectable={true}
        dateClick={handleDateClick}
        eventClick={handleAppointmentClick}
        drop={onDrop}
        {...fullCalendarOptions}
        datesSet={() => generateTimeSlots()} // Call the function here
        // slotLaneRender={slotLaneRender}
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
