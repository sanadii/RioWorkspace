import React, { useEffect, useState, useRef, useCallback } from "react";
import { CalenderProps } from "types";
import EventQuickInfo from "./EventQuickInfo";
// import moment from " ";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSchedule, getClients } from "store/actions";
import { appointmentsSelector } from "Selectors";

// Calendar
import FullCalendar from "@fullcalendar/react";
import createCalendarSettings from "./CalendarSettings"; // Adjust the path as needed
import { DeleteModal } from "Components/Common";

import EventEditModal from "./EventEditModal";
import { UncontrolledAlert } from "reactstrap";

const Calender = () => {
  const dispatch: any = useDispatch();

  // Data
  const { appointments, services, staff } = useSelector(appointmentsSelector);

  // States: appointment(Event), Event Modal, Popover, and Edit mode
  const [appointment, setAppointment] = useState<any>({});
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [popoverTarget, setPopoverTarget] = useState(null); // Initialize as null
  const [modal, setModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isRebook, setIsRebook] = useState<boolean>(false);
  const [isReschedule, setIsReschedule] = useState<boolean>(false);
  const [isBookNext, setIsBookNext] = useState<boolean>(false);
  const [selectedNewDay, setSelectedNewDay] = useState<any>();

  useEffect(() => {
    dispatch(getSchedule());
  }, [dispatch]);

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
  // const handleDateClick = (arg) => {
  //   console.log("handleDateClick: ", arg);
  //   const now = moment(); // Current time using moment
  //   const startDate = moment(arg.date).tz("Asia/Kuwait"); // Start date in Kuwait timezone
  //   const endDate = moment(startDate).add(2, "hours"); // End date 2 hours later

  //   setAppointment({
  //     start: startDate.toISOString(),
  //     end: endDate.toISOString(),
  //   });
  //   setSelectedNewDay(startDate.toISOString());

  //   // Create a unique ID for the popover target
  //   const popoverTargetId = `popover-${arg.dateStr.replace(/:/g, "_").replace(/\+/g, "plus")}`;
  //   arg.dayEl.id = popoverTargetId; // Assign the ID to the clicked date element

  //   setModal(true);
  //   setPopoverTarget(popoverTargetId);
  // };

  const handleDateClick = (arg) => {
    document.title = "Calendar | options.name";

    const now = new Date();
    const startDate = new Date(arg.date);
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 2);

    // Adjust for timezone offset before converting to ISO string
    const timezoneOffset = startDate.getTimezoneOffset() * 60000; // offset in milliseconds
    const adjustedStart = new Date(startDate.getTime() - timezoneOffset);
    const adjustedEnd = new Date(endDate.getTime() - timezoneOffset);

    // console.log(`CHECKING TIME --- NOW: ${now}\nstartTime: ${startDate}\nendTime: ${endDate}`);

    if (isRebook) {
      setAppointment({
        start: adjustedStart.toISOString(),
        end: adjustedEnd.toISOString(),
        client: appointment.client,
      });
    } else if (isReschedule) {
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

    setSelectedNewDay(startDate.toISOString());
    toggle();
  };

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

      duration: appointment.duration,
      price: appointment.price,

      // category: appointment.classNames[0],
      note: appointment._def.extendedProps.note,
      defaultDate: er_date,
      datetag: r_date,
    });

    setPopoverTarget(arg.el); // Use the event's element as the popover target
    setIsPopoverOpen(true); // Open the popover
    setIsEdit(true);
  }, []);

  const fullCalendarOptions = createCalendarSettings();

  return (
    <React.Fragment>
      {(isBookNext || isReschedule) && (
        <BookAnotherAppointment
          isBookNext={isBookNext}
          isReschedule={isReschedule}
          appointment={appointment}
          setIsBookNext={setIsBookNext}
        />
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
        events={appointments}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        {...fullCalendarOptions}
      />
      <EventQuickInfo
        eventEl={popoverTarget}
        event={appointment}
        setAppointment={setAppointment}
        isOpen={isPopoverOpen}
        toggle={() => setIsPopoverOpen(false)}
        setModal={setModal}
        setIsBookNext={setIsBookNext}
      />
      <EventEditModal
        modal={modal}
        // id="event-modal"
        toggle={toggle}
        appointment={appointment}
        // setEvent={setEvent}
        isEdit={isEdit}
        // setModal={setModal}
        // setDeleteModal={setDeleteModal}
      />
    </React.Fragment>
  );
};

const BookAnotherAppointment = ({ appointment, isBookNext, isReschedule, setIsBookNext }) => {
  const handleCloseButton = () => {
    setIsBookNext(false);
  };
  return (
    <div
      className="bg-primary fc-messages"
      // style="display: block;"
    >
      {isBookNext ? "Book Next" : "Reschedule"}
      Choose a new time for this appointment.{" "}
      <a className="rebook-cancel" onClick={handleCloseButton}>
        ×
      </a>
    </div>
  );
};

export default Calender;
