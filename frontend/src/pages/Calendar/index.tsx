import React, { useEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Card, CardBody } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getSchedule, getClients } from "store/actions";
import { appointmentsSelector, clientsSelector } from "Selectors";
import {
  getEvents as onGetEvents,
  getCategories as onGetCategories,
  addNewEvent as onAddNewEvent,
  deleteEvent as onDeleteEvent,
  updateEvent as onUpdateEvent,
  getUpCommingEvent as onGetUpCommingEvent,
} from "store/actions";
import { createSelector } from "reselect";

// Calendar
import FullCalendar from "@fullcalendar/react";
import { Draggable } from "@fullcalendar/interaction";

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
  const [isEditButton, setIsEditButton] = useState<boolean>(true);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteEvent, setDeleteEvent] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");

  // console.log("event: ", event);
  // Data
  const { appointments, services, staff } = useSelector(appointmentsSelector);
  const { clients } = useSelector(clientsSelector);

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

  const handleDateClick = (arg: any) => {
    // console.log("ARG PLZ: ", arg);
    const date = arg["date"];
    console.log("dataaaa: ", arg)
    console.log("dataaaa: ", arg["date"])
    setSelectedNewDay(date);
    toggle();
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

        client: appointment.extendedProps.client,
        services: appointment.extendedProps.services,
        packages: appointment.extendedProps.packages,
        products: appointment.extendedProps.products,
        // event: event || "",

        duration: appointment.duration,
        price: appointment.price,

        className: appointment.classNames,
        category: appointment.classNames[0],
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

  const submitOtherEvent = () => {
    document.getElementById("form-event")?.classList.remove("view-event");

    document.getElementById("event-title")?.classList.replace("d-none", "d-block");
    document.getElementById("event-category")?.classList.replace("d-none", "d-block");
    (document.getElementById("event-start-date")?.parentNode as HTMLElement).classList.remove("d-none");
    document.getElementById("event-start-date")?.classList.replace("d-none", "d-block");
    document.getElementById("event-location")?.classList.replace("d-none", "d-block");
    document.getElementById("event-description")?.classList.replace("d-none", "d-block");
    document.getElementById("event-start-date-tag")?.classList.replace("d-block", "d-none");
    document.getElementById("event-location-tag")?.classList.replace("d-block", "d-none");
    document.getElementById("event-description-tag")?.classList.replace("d-block", "d-none");

    setIsEditButton(true);
  };

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

  // Define the customButtons object

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
  className: PropTypes.string,
  onGetEvents: PropTypes.func,
  onAddNewEvent: PropTypes.func,
  onUpdateEvent: PropTypes.func,
  onDeleteEvent: PropTypes.func,
  onGetCategories: PropTypes.func,
};

export default Calender;
