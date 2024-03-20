import React, { useEffect, useState, useRef, useCallback } from "react";
import { CalenderProps } from "types";
import EventPopover from "./CalendarSettings/EventOptions/EventPopover";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSchedule, getClients } from "store/actions";
import { appointmentsSelector, clientsSelector } from "Selectors";
import { createSelector } from "reselect";

// Calendar
import FullCalendar from "@fullcalendar/react";
import createCalendarSettings from "./CalendarSettings"; // Adjust the path as needed
import { DeleteModal } from "Components/Common";

const Calender = () => {
  const dispatch: any = useDispatch();
  const [appointment, setAppointment] = useState<any>({});
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedNewDay, setSelectedNewDay] = useState<any>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [eventName, setEventName] = useState<string>("");

  // popover take 2
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverTarget, setPopoverTarget] = useState(null); // Initialize as null

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
    setShowBackdrop(true); // Show the backdrop when the popover is opened
  };

  const handleEventClick = (arg) => {
    setAppointment(arg.event);
    setPopoverTarget(arg.el); // Use the event's element as the popover target
    setPopoverOpen(true); // Open the popover
    setShowBackdrop(true); // Show the backdrop when the popover is opened
  };

  console.log("popoverTarget:: ", popoverTarget);

  const closePopover = () => {
    setPopoverOpen(false);
    setShowBackdrop(false); // Hide the backdrop when the popover is closed
  };

  // Close popover and backdrop when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverOpen && popoverTarget && !popoverTarget.contains(event.target)) {
        closePopover();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverOpen, popoverTarget]);

  document.title = "Calendar | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <FullCalendar
        events={appointments}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        {...fullCalendarOptions}
      />
      <EventPopover
        eventEl={popoverTarget}
        event={appointment}
        isOpen={popoverOpen}
        toggle={() => setPopoverOpen(false)}
      />
    </React.Fragment>
  );
};

export default Calender;
