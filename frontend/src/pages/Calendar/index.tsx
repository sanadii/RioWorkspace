import React, { useEffect, useState, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "store";
import { createPortal } from "react-dom";

import { CalenderProps, BookingModalProps, BookingMoodProps } from "types";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { appointmentsSelector } from "Selectors";
import { getSchedule, updateAppointment } from "store/actions";

// Calendar
import FullCalendar from "@fullcalendar/react";
import useFullCalendarSettings from "./CalendarSettings"; // Adjust the path as needed

import { LeftToolbarChunk, CenterToolbarChunk } from "./CalendarToolbar";
import CalendarLeftSidebar from "./CalendarLeftSidebar";
import EventEditModal from "./EventEditModal";
import EventCancelModal from "./EventCancelModal";
import EventQuickInfo from "./EventQuickInfo";

import { Row, Col, UncontrolledAlert } from "reactstrap";

const Calender = () => {
  const dispatch: any = useDispatch();

  // Data
  const calendarRef = useRef(null);
  const calendarApi = calendarRef?.current?.getApi();
  console.log("calendarApi: index:", calendarApi);

  const { appointments, staff } = useSelector(appointmentsSelector);
  const [appointment, setAppointment] = useState<any>({});
  const [bookingMood, setBookingMood] = useState<BookingMoodProps>("");
  const [bookingModal, setBookingModal] = useState<BookingModalProps>("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [popoverTarget, setPopoverTarget] = useState(null); // Initialize as null
  const [modal, setModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isRebook, setIsRebook] = useState<boolean>(false);
  const [selectedNewDay, setSelectedNewDay] = useState<any>();

  const [showLeftSidebar, setShowLeftSidebar] = useState(true); // or false, based on initial visibility
  console.log("we are toggling", showLeftSidebar);

  const toggLeLeftSidebar = () => {
    setShowLeftSidebar(!showLeftSidebar);
  };

  //
  // getDate
  //
  useEffect(() => {
    dispatch(getSchedule());
  }, [dispatch]);

  /**
   * Handling the modal state
   */

  const calendarWrapperRef = useRef(null);

  // useEffect(() => {
  //   if (calendarWrapperRef.current) {
  //     const headerToolbar = calendarWrapperRef.current.querySelector(".fc-header-toolbar");
  //     const headerToolbarChild = headerToolbar?.querySelector(".fc-toolbar-chunk");
  //     console.log("headerToolbar: ", headerToolbar);
  //     console.log("headerToolbarChild: ", headerToolbarChild);

  //     if (headerToolbarChild) {
  //       headerToolbar.removeChild(headerToolbarChild);
  //     }
  //   }
  // }, []);

  const [leftToolbarContainer, setLeftToolbarContainer] = useState(null);
  const [centerToolbarContainer, setCenterToolbarContainer] = useState(null);

  useEffect(() => {
    const leftToolbarChunk = document.querySelector(".fc-toolbar .fc-toolbar-chunk:first-child");
    const centerToolbarChunk = document.querySelector(".fc-toolbar .fc-toolbar-chunk:nth-child(2)");
    const RightToolbarChunk = document.querySelector(".fc-toolbar .fc-toolbar-chunk:nth-child(3)");

    if (leftToolbarChunk && !leftToolbarChunk.querySelector(".fc-header-toolbar-left")) {
      const container = document.createElement("span");
      container.className = "fc-header-toolbar-left";
      leftToolbarChunk.appendChild(container);
      setLeftToolbarContainer(container);
    }

    if (centerToolbarChunk && !centerToolbarChunk.querySelector(".fc-header-toolbar-center")) {
      const container = document.createElement("span");
      container.className = "fc-header-toolbar-center";
      centerToolbarChunk.appendChild(container);
      setCenterToolbarContainer(container);
    }
  }, []);

  // useEffect(() => {
  //   const leftToolbarChunk = document.querySelector(".fc-toolbar .fc-toolbar-chunk:first-child");
  //   const centerToolbarChunk = document.querySelector(".fc-toolbar .fc-toolbar-chunk:nth-child(2)");

  //   if (leftToolbarChunk) {
  //     let leftToolbarContainer = leftToolbarChunk.querySelector(".fc-header-toolbar-left");
  //     if (!leftToolbarContainer) {
  //       leftToolbarContainer = document.createElement("span");
  //       leftToolbarContainer.className = "fc-header-toolbar-left";
  //       leftToolbarChunk.appendChild(leftToolbarContainer);

  //       const root = createRoot(leftToolbarContainer); // Create a root
  //       root.render(
  //         <Provider store={configureStore({})}>
  //           <BrowserRouter basename={process.env.PUBLIC_URL}>
  //             <LeftToolbarChunk
  //               calendarRef={calendarRef}
  //               staff={staff}
  //               showLeftSidebar={showLeftSidebar}
  //               setShowLeftSidebar={setShowLeftSidebar}
  //               toggLeLeftSidebar={toggLeLeftSidebar}
  //             />
  //           </BrowserRouter>
  //         </Provider>
  //       );
  //     }
  //   }

  //   if (centerToolbarChunk) {
  //     let centerToolbarContainer = centerToolbarChunk.querySelector(".fc-header-toolbar-left");
  //     if (!centerToolbarContainer) {
  //       centerToolbarContainer = document.createElement("span");
  //       centerToolbarContainer.className = "fc-header-toolbar-left";
  //       centerToolbarChunk.appendChild(centerToolbarContainer);

  //       const root = createRoot(centerToolbarContainer); // Create a root
  //       root.render(
  //         <Provider store={configureStore({})}>
  //           <BrowserRouter basename={process.env.PUBLIC_URL}>
  //             <CenterToolbarChunk calendarRef={calendarRef} />
  //           </BrowserRouter>
  //         </Provider>
  //       );
  //     }
  //   }
  // }, [calendarRef, staff]);

  const toggle = useCallback(() => {
    console.log("you are toggling me");
    if (bookingModal) {
      setBookingModal("");
      setAppointment(null);
      setIsEdit(false);
    } else {
      setBookingModal("");
    }
  }, [bookingModal]);

  // Handle Reebook
  const handleRebookCancel = () => {
    setIsRebook(false);
  };

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
    setBookingModal("quickInfoEvent");
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
  console.log("calendarRef:: ", calendarRef);
  const fullCalendarOptions = useFullCalendarSettings();
  return (
    <React.Fragment>
      <Row>
        {showLeftSidebar && (
          <Col lg={2}>
            <CalendarLeftSidebar />
          </Col>
        )}
        <Col lg={showLeftSidebar ? 10 : 12}>
          <div ref={calendarWrapperRef}>
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
          {leftToolbarContainer &&
            createPortal(
              <LeftToolbarChunk
                calendarRef={calendarRef}
                staff={staff}
                showLeftSidebar={showLeftSidebar}
                setShowLeftSidebar={setShowLeftSidebar}
                toggLeLeftSidebar={toggLeLeftSidebar}
              />,
              leftToolbarContainer
            )}
          {centerToolbarContainer &&
            createPortal(<CenterToolbarChunk calendarRef={calendarRef} />, centerToolbarContainer)}
        </Col>
      </Row>

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

      <EventQuickInfo
        eventEl={popoverTarget}
        event={appointment}
        setAppointment={setAppointment}
        isOpen={bookingModal === "quickInfoEvent"}
        toggle={toggle}
        setBookingModal={setBookingModal}
        setBookingMood={setBookingMood}
      />
      <EventEditModal isOpen={bookingModal === "editEvent"} toggle={toggle} appointment={appointment} isEdit={isEdit} />
      <EventCancelModal isOpen={bookingModal === "cancelEvent"} toggle={toggle} appointment={appointment} />
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
