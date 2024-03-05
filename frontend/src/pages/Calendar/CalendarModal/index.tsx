import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import * as Yup from "yup";
import { useFormik } from "formik";

import { Draggable } from "@fullcalendar/interaction";
import Flatpickr from "react-flatpickr";

import { Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";
import {
  getEvents as onGetEvents,
  getCategories as onGetCategories,
  addNewEvent as onAddNewEvent,
  updateEvent as onUpdateEvent,
  getUpCommingEvent as onGetUpCommingEvent,
} from "store/actions";

import { EditorDateComponent } from "./EditorDateComponent";
import { EditorClientComponent } from "./EditorClientComponent";
import { EditorServiceComponent } from "./EditorServiceComponent";
import { EditorProductComponent } from "./EditorProductComponent";
import { EditorPackageComponent } from "./EditorPackageComponent";
import { EditorStatusComponent } from "./EditorStatusComponent";

type ClientItem = {
  id: number;
  name: string;
  mobile: string;
  email: string;
  dateOfBirth: string;
};

// Define the type for a service item
type ServiceItem = {
  id: number;
  service: number;
  staff: number;
  startTime: Date; // Change the type to Date
  endTime: Date; // Change the type to Date
  duration: string;
  price: string;
};

type AppointmentItem = {
  id: number;
  startTime: Date;
  endTime: Date;
  status: number;
  client: ClientItem[];
  services: ServiceItem[];
};

// const CalendarModal = ({ data, scheduleObj, services, staff, clients, appointmentRef }) => {
const CalendarModal = ({
  modal,
  isEdit,
  toggle,
  event,
  services,
  staff,
  clients,
  appointmentRef,

  // data,
  // id,
  // setEvent,
  // setDeleteModal,
  // scheduleObj,
}) => {
  const dispatch: any = useDispatch();
  const [selectedNewDay, setSelectedNewDay] = useState<any>();
  const [isEditButton, setIsEditButton] = useState<boolean>(true);
  const [eventName, setEventName] = useState<string>("");

  const selectLayoutState = (state: any) => state.Calendar;
  const calendarDataProperties = createSelector(selectLayoutState, (state: any) => ({
    events: state.events,
    categories: state.categories,
    isEventUpdated: state.isEventUpdated,
  }));
  // Inside your component
  const { events, categories, isEventUpdated } = useSelector(calendarDataProperties);

  useEffect(() => {
    dispatch(onGetEvents());
    dispatch(onGetCategories());
    dispatch(onGetUpCommingEvent());
    new Draggable(document.getElementById("external-events") as HTMLElement, {
      itemSelector: ".external-event",
    });
  }, [dispatch]);

  //   useEffect(() => {
  //     if (isEventUpdated) {
  //       setIsEdit(false);
  //       setEvent({});
  //     }
  //   }, [dispatch, isEventUpdated]);

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

  document.title = "Calendar | Velzon - React Admin & Dashboard Template";

  const clientRef = useRef(null);
  const serviceRef = useRef([]);
  const statusRef = useRef([]);
  const productRef = useRef([]);
  const packageRef = useRef([]);

  // console.log("scheduleObj: ", scheduleObj);
  // Set Appointment Details
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentItem>({
    id: event.id || null,
    startTime: event.startTime || "",
    endTime: event.endTime || "",
    status: event.status || 1,
    client: event.client || [],
    services: event.services || [],
  });

  // console.log("appointmentDetails Services: ", appointmentDetails.services);

  // Set Client Details
  const [clientDetails, setClientDetails] = useState<ClientItem>({
    id: event.client?.id || null,
    name: event.client?.name || "",
    mobile: event.client?.mobile || "",
    dateOfBirth: event.client?.dateOfBirth || "",
    email: event.client?.email || "",
  });

  const [serviceDetails, setServiceDetails] = useState<ServiceItem[]>([
    {
      id: event.service?.id || null,
      service: event.service?.service || null,
      staff: event.service?.staffId || null,
      startTime: event.startTime,
      endTime: event.endTime,
      duration: event.duration,
      price: event.price,
    },
  ]);

  event = appointmentDetails;
  clientRef.current = clientDetails;
  serviceRef.current = serviceDetails;

  useEffect(() => {
    // Update event.client when clientRef.current changes
    if (event && clientRef.current) {
      event.client = clientRef.current;
    }

    // Update event.service when serviceRef.current changes
    if (event && serviceRef.current) {
      event.services = serviceRef.current;
    }
  }, [clientRef.current, serviceRef.current]); // Dependency array includes clientRef.current

  // console.log("event.services: ", event.services);

  return (
    <React.Fragment>
      <Modal
        isOpen={modal}
        // toggle={toggle}
        centered
        id="event-modal"
        className="border-0"
        modalClassName="modal fadeInLeft zoomIn"
      >
        <ModalHeader toggle={toggle} tag="h5" className="p-3 bg-info-subtle modal-title">
          {!!isEdit ? eventName : "Add Event"}
        </ModalHeader>
        <ModalBody>
          <EditorDateComponent
            data={event}
            appointmentDetails={appointmentDetails}
            setAppointmentDetails={setAppointmentDetails}
          />

          <EditorClientComponent
            data={event}
            clients={clients}
            clientDetails={clientDetails}
            setClientDetails={setClientDetails}
          />
          {/* <EditorServiceComponent
            data={event}
            services={services}
            staff={staff}
            serviceDetails={serviceDetails}
            setServiceDetails={setServiceDetails}
          />

          <EditorStatusComponent
            data={event}
            appointmentDetails={appointmentDetails}
            setAppointmentDetails={setAppointmentDetails}
          /> */}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default CalendarModal;
