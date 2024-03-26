import React, { useEffect, useState, useRef, useCallback } from "react";
import { CalenderProps, BookingModalProps, BookingMoodProps } from "types";

// import moment from 'moment-timezone';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { appointmentsSelector } from "Selectors";

// Calendar
import FullCalendar from "@fullcalendar/react";
import createCalendarSettings from "./CalendarSettings"; // Adjust the path as needed
import { getSchedule, updateAppointment } from "store/actions";

import EventEditModal from "./EventEditModal";
import EventCancelModal from "./EventCancelModal";
import EventQuickInfo from "./EventQuickInfo";

import { UncontrolledAlert } from "reactstrap";

const Calender = () => {
  const dispatch: any = useDispatch();

  // Data
  const { appointments } = useSelector(appointmentsSelector);
  const [appointment, setAppointment] = useState<any>({});
  const [bookingMood, setBookingMood] = useState<BookingMoodProps>("");
  const [bookingModal, setBookingModal] = useState<BookingModalProps>("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [popoverTarget, setPopoverTarget] = useState(null); // Initialize as null
  const [modal, setModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isRebook, setIsRebook] = useState<boolean>(false);
  const [selectedNewDay, setSelectedNewDay] = useState<any>();

  //
  // getDate
  //
  useEffect(() => {
    dispatch(getSchedule());
  }, [dispatch]);

  console.log("show me the appointment: ", appointment);
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

  // Handle Reebook
  const handleRebookCancel = () => {
    setIsRebook(false);
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
   * Handling click on date on calendar
   */

  const handleDateClick = (arg) => {
    document.title = "Calendar | options.name";

    const now = new Date();
    const startDate = new Date(arg.date);
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 2);

    // Convert to UTC if necessary
    const adjustedStart = new Date(startDate.getTime());
    const adjustedEnd = new Date(endDate.getTime());

    if (bookingMood === "bookNextEvent") {
      setBookingMood("");
      setAppointment({
        start: adjustedStart.toISOString(),
        end: adjustedEnd.toISOString(),
        client: appointment.client,
      });
    } else if (bookingMood === "rescheduleEvent") {
      setBookingMood("");
      setAppointment({
        start: adjustedStart.toISOString(),
        id: appointment.id,
        client: appointment.client,
        services: appointment.services,
      });
    } else {
      setAppointment({
        start: adjustedStart.toISOString(),
        end: adjustedEnd.toISOString(),
      });
    }
    toggle();
  };

  const calendarRef = useRef(null);

  /**
   * Handling click on event on calendar
   */
  const handleEventClick = useCallback((arg: any) => {
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
      status: appointment.extendedProps.status,

      duration: appointment.duration,
      price: appointment.price,

      // category: appointment.classNames[0],
      note: appointment._def.extendedProps.note,
      defaultDate: er_date,
      datetag: r_date,
    });

    setPopoverTarget(arg.el); // Use the event's element as the popover target
    // setIsPopoverOpen(true); // Open the popover
    setBookingModal("quickInfo");
    setIsEdit(true);
  }, []);

  const handleEventResize = (arg) => {
    const { id, start, end } = arg.event;
    const updatedAppointment = {
      id,
      start: start.toISOString(),
      end: end.toISOString(),
    };
    dispatch(updateAppointment(updatedAppointment));
  };

  const handleEventDrop = (arg) => {
    const { id, start, end } = arg.event;
    const updatedAppointment = {
      id,
      start: start.toISOString(),
      end: end.toISOString(),
    };
    dispatch(updateAppointment(updatedAppointment));
  };

  const fullCalendarOptions = createCalendarSettings();
  return (
    <React.Fragment>
      {bookingMood === ("bookNextEvent" || "rescheduleEvent") && (
        <BookAnotherAppointment bookingMood={bookingMood} setBookingMood={setBookingMood} appointment={appointment} />
      )}
      {isRebook && (
        <UncontrolledAlert
          color="warning"
          className="alert-solid alert-dismissible bg-warning text-white alert-label-icon material-shadow fade show"
        >
          <i className="ri-alert-line label-icon"></i>
          <a className="rebook-cancel" onClick={handleRebookCancel}>
            &times;
          </a>
        </UncontrolledAlert>
      )}

      <FullCalendar
        ref={calendarRef}
        events={appointments}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventResize={handleEventResize}
        eventDrop={handleEventDrop}
        {...fullCalendarOptions}
      />
      <EventQuickInfo
        eventEl={popoverTarget}
        event={appointment}
        setAppointment={setAppointment}
        isOpen={bookingModal}
        toggle={() => setBookingModal("quickInfo")}
        setBookingModal={setBookingModal}
        setBookingMood={setBookingMood}
      />
      <EventEditModal isOpen={bookingModal === "quickInfo"} toggle={toggle} appointment={appointment} isEdit={isEdit} />
      <EventCancelModal modal={modal} toggle={toggle} appointment={appointment} isEdit={isEdit} />
    </React.Fragment>
  );
};

const BookAnotherAppointment = ({ appointment, setBookingMood, bookingMood }) => {
  const handleCloseButton = () => {
    setBookingMood("");
  };
  return (
    <div
      className="bg-primary fc-messages"
      // style="display: block;"
    >
      {bookingMood === "bookNextEvent" ? "Book Next Appointment " : "Reschedule Appointment "}- Choose a new time.
      <a className="rebook-cancel" onClick={handleCloseButton}>
        ×
      </a>
    </div>
  );
};

export default Calender;
