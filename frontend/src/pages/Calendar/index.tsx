import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Card, CardBody, Container, Row, Col } from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";

// Calendar
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import listPlugin from "@fullcalendar/list";

// Calendar Settings
import useCalendarToolbar from "./CalendarSettings/useCalendarToolbar";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getSchedule, getClients } from "store/actions";
import { appointmentsSelector, clientsSelector } from "Selectors";

import { DeleteModal } from "Components/Common";

import {
  getEvents as onGetEvents,
  getCategories as onGetCategories,
  addNewEvent as onAddNewEvent,
  deleteEvent as onDeleteEvent,
  updateEvent as onUpdateEvent,
  getUpCommingEvent as onGetUpCommingEvent,
} from "store/actions";
import { createSelector } from "reselect";

import createFullCalendarOptions from "./CalendarSettings/FullCalendarOptions"; // Adjust the path as needed
import CalendarModal from "./CalendarModal";

const Calender = () => {
  const dispatch: any = useDispatch();
  const [event, setEvent] = useState<any>({});
  const [modal, setModal] = useState<boolean>(false);
  const [selectedNewDay, setSelectedNewDay] = useState<any>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditButton, setIsEditButton] = useState<boolean>(true);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteEvent, setDeleteEvent] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");

  // Data
  const { appointments, services, staff } = useSelector(appointmentsSelector);
  const { clients } = useSelector(clientsSelector);

  // useEffect(() => {
  //   if (!appointments || appointments.length === 0) {
  //     dispatch(getSchedule());
  //     dispatch(getClients());
  //   }
  // }, [dispatch, appointments]);

  // Hooks
  const { customButtons, selectedStaff } = useCalendarToolbar();
  const fullCalendarOptions = createFullCalendarOptions(customButtons);

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
    new Draggable(document.getElementById("external-events") as HTMLElement, {
      itemSelector: ".external-event",
    });
  }, [dispatch]);

  useEffect(() => {
    if (isEventUpdated) {
      setIsEdit(false);
      setEvent({});
    }
  }, [dispatch, isEventUpdated]);

  /**
   * Handling the modal state
   */
  const toggle = () => {
    if (modal) {
      setModal(false);
      setEvent(null);
      setIsEdit(false);
      setIsEditButton(true);
    } else {
      setModal(true);
    }
  };
  /**
   * Handling date click on calendar
   */

  const handleDateClick = (arg: any) => {
    const date = arg["date"];
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

  const handleEventClick = (arg: any) => {
    const event = arg.event;
    console.log("arg:", arg)
    console.log("arg.event:", event)

    const st_date = event.start;
    const ed_date = event.end;
    const r_date = ed_date == null ? str_dt(st_date) : str_dt(st_date) + " to " + str_dt(ed_date);
    const er_date = ed_date === null ? [st_date] : [st_date, ed_date];

    setEvent({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      className: event.classNames,
      category: event.classNames[0],
      location: event._def.extendedProps.location ? event._def.extendedProps.location : "No Loaction",
      description: event._def.extendedProps.description,
      defaultDate: er_date,
      datetag: r_date,
    });
    setEventName(event.title);
    setDeleteEvent(event.id);
    setIsEdit(true);
    setIsEditButton(false);
    toggle();
  };
  /**
   * On delete event
   */
  const handleDeleteEvent = () => {
    dispatch(onDeleteEvent(deleteEvent));
    setDeleteModal(false);
  };

  // events validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (event && event.id) || "",
      title: (event && event.title) || "",
      category: (event && event.category) || "",
      location: (event && event.location) || "",
      description: (event && event.description) || "",
      defaultDate: (event && event.defaultDate) || [],
      datetag: (event && event.datetag) || "",
      start: (event && event.start) || "",
      end: (event && event.end) || "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Event Name"),
      category: Yup.string().required("Please Select Your Category"),
      location: Yup.string().required("Please Enter Your Location"),
      description: Yup.string().required("Please Enter Your Description"),
      start: Yup.date().required("Start Time is required"),
      end: Yup.date().required("End Time is required"),
      defaultDate: Yup.array().of(Yup.date()).required("Date range is required").min(2, "Select at least two dates"),
    }),
    onSubmit: (values) => {
      var updatedDay: any = "";
      if (selectedNewDay) {
        updatedDay = new Date(selectedNewDay[1]);
        updatedDay.setDate(updatedDay.getDate() + 1);
      }

      if (isEdit) {
        const updateEvent = {
          id: event.id,
          title: values.title,
          className: values.category,
          start: selectedNewDay ? selectedNewDay[0] : event.start,
          end: selectedNewDay ? updatedDay : event.end,
          location: values.location,
          description: values.description,
        };
        // update event
        dispatch(onUpdateEvent(updateEvent));
        validation.resetForm();
      } else {
        const newEvent = {
          id: Math.floor(Math.random() * 100),
          title: values["title"],
          start: selectedNewDay[0],
          end: updatedDay,
          className: values["category"],
          location: values["location"],
          description: values["description"],
        };
        // save new event
        dispatch(onAddNewEvent(newEvent));
        validation.resetForm();
      }

      // setSelectedDay(null);
      setSelectedNewDay(null);
      toggle();
    },
  });

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

      {/* <FullCalendar
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        plugins={[BootstrapTheme, dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        handleWindowResize={true}
        themeSystem="bootstrap"
        // Toolbar
        headerToolbar={{
          left: "refresh print hide",
          center: "prev,today,next",
          right: "timeGridDay,timeGridWeek,dayGridMonth",
        }}
        // Buttons
        buttonText={{
          timeGridDay: "Day",
          timeGridWeek: "Week",
          dayGridMonth: "Month",
        }}
        buttonIcons={{
          prev: "fa fa-angle-left",
          next: "fa fa-angle-right",
        }}
        allDaySlot={false} // This hides the all-day section
        // Slot Duration and settings
        slotMinTime="10:00:00" // 10 AM
        slotMaxTime="20:00:00" // 8 PM
        slotDuration="01:00:00" // 15 minutes
        slotLabelInterval="00:15:00" // Subdivision labels every 15 minutes
        events={appointments}
        editable={true}
        droppable={true}
        selectable={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        drop={onDrop}
      /> */}

      <FullCalendar
        handleWindowResize={true}
        themeSystem="bootstrap"
        events={appointments}
        editable={true}
        droppable={true}
        selectable={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        drop={onDrop}
        {...fullCalendarOptions}
      />

      <Card className="card-h-100">
        <CardBody>
          <button className="btn btn-primary w-100" id="btn-new-event" onClick={toggle}>
            <i className="mdi mdi-plus"></i> Create New Event
          </button>

          <div id="external-events">
            <br />
            <p className="text-muted">Drag and drop your event or click in the calendar</p>
          </div>
        </CardBody>
      </Card>

      <div style={{ clear: "both" }}></div>

      <CalendarModal
        modal={modal}
        id="event-modal"
        toggle={toggle}
        event={event}
        setEvent={setEvent}
        isEdit={isEdit}
        setModal={setModal}
        setDeleteModal={setDeleteModal}
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
