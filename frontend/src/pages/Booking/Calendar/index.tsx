import React, { useEffect, useState, useRef, useCallback } from "react";
import { CalenderProps, BookingModalProps, BookingMoodProps } from "types";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { appointmentsSelector } from "Selectors";
import { getSchedule, updateAppointment } from "store/actions";

// Calendar
import FullCalendar from "@fullcalendar/react";
import useFullCalendarSettings from "./CalendarSettings"; // Adjust the path as needed

import CalenderHeaderToolbar from "./CalenderHeaderToolbar";
import CalendarSidebar from "./CalendarSidebar";
import EventQuickInfo from "./EventQuickInfo";
import EventEditModal from "./EventEditModal";
import EventCancelModal from "./EventCancelModal";
import { UncontrolledAlert } from "reactstrap";

const Calender = () => {
  const dispatch: any = useDispatch();
  const calendarRef = useRef(null);
  const calendarApi = calendarRef?.current?.getApi();

  const { appointments, staff } = useSelector(appointmentsSelector);
  const [appointment, setAppointment] = useState<any>({});

  // Modals & Popover
  const [isQuickInfoModal, setIsQuickInfoModal] = useState<boolean>(null);
  const [isEventBookingModal, setIsEventBookingModal] = useState<boolean>(null);
  const [isCancelEventModal, setIsCancelEventModal] = useState<boolean>(null);
  const [bookingMood, setBookingMood] = useState<BookingMoodProps>("");
  const [bookingModal, setBookingModal] = useState<BookingModalProps>("");
  const [popoverTarget, setPopoverTarget] = useState(null); // Initialize as null
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isRebookEvent, setIsRebookEvent] = useState<boolean>(false);
  const [selectedNewDay, setSelectedNewDay] = useState<any>();
  const [showLeftSidebar, setShowLeftSidebar] = useState(true); // or false, based on initial visibility

  //
  // getDate
  //
  useEffect(() => {
    dispatch(getSchedule());
  }, [dispatch]);

  console.log("bookingModal: ", bookingModal);
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
   * Handling the modal state
   */

  const toggleModal = useCallback(() => {
    if (isEventBookingModal) {
      setIsEventBookingModal(false);
      setAppointment(null);
      setIsEdit(false);
    } else {
      setIsEventBookingModal(true);
    }
  }, [isEventBookingModal]);

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
      setIsEdit(false);
      setAppointment({
        start: adjustedStart.toISOString(),
        end: adjustedEnd.toISOString(),
        client: appointment.client,
      });
    } else if (bookingMood === "rescheduleEvent") {
      setIsEdit(true);
      setAppointment({
        start: adjustedStart.toISOString(),
        end: adjustedEnd.toISOString(),
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

    if (isRebookEvent) {
      setIsRebookEvent(false);
      setBookingMood("");
    }

    toggleModal();
  };

  /**
   * Handling click on event on calendar
   */
  const handleEventClick = useCallback(
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
        status: appointment.extendedProps.status,

        duration: appointment.duration,
        price: appointment.price,

        // category: appointment.classNames[0],
        note: appointment._def.extendedProps.note,
        defaultDate: er_date,
        datetag: r_date,
      });

      setPopoverTarget(arg.el); // Use the event's element as the popover target
      setIsQuickInfoModal(true);
      setIsEdit(true);

      if (isRebookEvent) {
        setIsRebookEvent(false);
        setBookingMood("");
      }
    },
    [isRebookEvent]
  );

  // Handle Reebook
  const handleCloseRebookClick = () => {
    setIsRebookEvent(false);
    setBookingMood("");
  };

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

  console.log("calendarRef:: ", calendarRef);
  const fullCalendarOptions = useFullCalendarSettings();
  return (
    <React.Fragment>
      <div className="d-lg-flex gap-1">
        {showLeftSidebar && (
          <div id="flex-pane">
            <CalendarSidebar />
          </div>
        )}

        <div className="w-100">
          <CalenderHeaderToolbar
            calendarRef={calendarRef}
            staff={staff}
            showLeftSidebar={showLeftSidebar}
            setShowLeftSidebar={setShowLeftSidebar}
          />
          <FullCalendar
            ref={calendarRef}
            events={appointments}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventResize={handleEventResize}
            eventDrop={handleEventDrop}
            {...fullCalendarOptions}
          />
        </div>
      </div>

      {isRebookEvent && (
        <UncontrolledAlert
          color="primary"
          className="fc-messages alert-solid alert-dismissible bg-primary text-white alert-label-icon material-shadow fade show"
        >
          <i className="ri-alert-line label-icon"></i>
          {bookingMood === "bookNextEvent" ? "Book Next Appointment " : "Reschedule Appointment "}- Choose a new time.
          <a className="rebook-cancel" onClick={handleCloseRebookClick}>
            ×
          </a>
        </UncontrolledAlert>
      )}

      {/* Event Quick Info */}
      <EventQuickInfo
        event={appointment}
        setAppointment={setAppointment}
        eventEl={popoverTarget}
        // Popover & Modals
        isOpen={isQuickInfoModal}
        setIsQuickInfoModal={setIsQuickInfoModal}
        setIsEventBookingModal={setIsEventBookingModal}
        toggleModal={toggleModal}
        setBookingMood={setBookingMood}
        setIsRebookEvent={setIsRebookEvent}
        setIsCancelEventModal={setIsCancelEventModal}
      />

      {/* Event Edit Modal */}
      <EventEditModal
        isOpen={isEventBookingModal}
        // isOpen={bookingModal === "editEvent"}
        toggleModal={toggleModal}
        appointment={appointment}
        isEdit={isEdit}
      />

      {/* Event Cancel Modal */}
      <EventCancelModal isOpen={isCancelEventModal} toggleModal={toggleModal} appointment={appointment} />

      {/* Event Change Date Alert */}
    </React.Fragment>
  );
};

export default Calender;
