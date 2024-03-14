import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import * as Yup from "yup";
import { useFormik } from "formik";

import { Form, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { updateAppointment, addAppointment } from "store/actions";

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
  start: Date; // Change the type to Date
  end: Date; // Change the type to Date
  duration: string;
  price: string;
};

type AppointmentItem = {
  id: number;
  start: Date;
  end: Date;
  status: number;
  client: ClientItem[];
  services: ServiceItem[];
};

// const CalendarModal = ({ event, scheduleObj, services, staff, clients, appointmentRef }) => {
const CalendarModal = ({ modal, isEdit, toggle, appointment, services, staff, clients, appointmentRef }) => {
  const dispatch: any = useDispatch();
  const [selectedNewDate, setSelectedNewDate] = useState<any>();
  // console.log("appointment: ", appointment);
  // Refs
  const clientRef = useRef([]);
  const serviceRef = useRef([]);
  const statusRef = useRef([]);
  const productRef = useRef([]);
  const packageRef = useRef([]);

  // console.log("clientRef:", clientRef.current);
  const initialValues = {
    title: (appointment && appointment.title) || "",
    start: (appointment && appointment.start) || "",
    end: (appointment && appointment.end) || "",

    // ExtendedProps
    client: (appointment && appointment.client) || clientRef.current,
    services: (appointment && appointment.services) || [],
    packages: (appointment && appointment.packages) || [],
    products: (appointment && appointment.products) || [],

    // Not used yes
    category: (appointment && appointment.category) || "",
    location: (appointment && appointment.location) || "",
    description: (appointment && appointment.description) || "",
    defaultDate: (appointment && appointment.defaultDate) || [],
    datetag: (appointment && appointment.datetag) || "",
  };

  // console.log("initialValues: ", initialValues);
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      // start: Yup.date().required("Start Time is required"),
    }),

    onSubmit: (values) => {
      // if (selectedNewDate) {
      //   let updatedEndDate = new Date(selectedNewDate[0]);
      //   updatedEndDate.setHours(updatedEndDate.getHours() + 1);
      //   selectedNewDate[1] = updatedEndDate.toISOString(); // Update the array with the new end date
      // }
      // console.log("selectedNewDate: ", selectedNewDate[0], "updatedEndDate: ", selectedNewDate[1]);

      if (isEdit) {
        const updatedAppointment = {
          id: appointment.id,
          title: values.title,
          className: values.category,
          start: values.start,
          end: values.end,
          duration: 60,
          location: values.location,
          description: values.description,

          client: (appointment && appointment.client && appointment.client.id) || null,
          services: (appointment && appointment.services) || [],
          packages: (appointment && appointment.packages) || [],
          products: (appointment && appointment.products) || [],
        };

        // update event
        dispatch(updateAppointment(updatedAppointment));
        validation.resetForm();
      } else {
        const newEvent = {
          id: Math.floor(Math.random() * 100),
          client: values["clientName"] || clientRef.current,

          title: values["title"],
          start: values["start"],
          end: values["start"],
          // start: selectedNewDate ? selectedNewDate[0] : appointment.start,
          // end: selectedNewDate ? selectedNewDate[1] : appointment.end,
          className: values["category"],
          location: values["location"],
          description: values["description"],

          //
        };
        // save new event
        console.log("newEvent: ", newEvent);
        dispatch(addAppointment(newEvent));
        validation.resetForm();
      }

      // setSelectedDay(null);
      setSelectedNewDate(null);
      toggle();
    },
  });

  // clientRef.current = clientDetails || [];

  return (
    <React.Fragment>
      <Modal
        isOpen={modal}
        // toggle={toggle}
        centered
        size="lg"
        id="event-modal"
        className="border-0"
        modalClassName="modal fadeInLeft zoomIn"
      >
        <Form
          className="tablelist-form"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <ModalHeader toggle={toggle} tag="h5" className="p-3 bg-info-subtle modal-title">
            {!!isEdit ? appointment.title : "Add Event"}
          </ModalHeader>
          <ModalBody>
            <EditorDateComponent
              appointment={appointment}
              setSelectedNewDate={setSelectedNewDate}
              validation={validation}
              // appointmentDetails={appointmentDetails}
              // setAppointmentDetails={setAppointmentDetails}
            />

            <EditorClientComponent clientRef={clientRef} appointment={appointment} clients={clients} isEdit={isEdit} />

            <EditorServiceComponent
              serviceRef={serviceRef}
              appointment={appointment}
              services={services}
              staff={staff}
            />
            {/* 
          <EditorStatusComponent
            appointment={appointment}
            appointmentDetails={appointmentDetails}
            setAppointmentDetails={setAppointmentDetails}
          /> */}
          </ModalBody>
          <ModalFooter>
            <div className="d-flex justify-content-between w-100">
              {isEdit && (
                <div className="add-appt__row add-appt__row-cancel">
                  <button
                    className="add-appt__icon add-appt__icon-cancel manual-modal"
                    // href="/Calendar/BookingCancel/388386003"
                  ></button>
                  <div className="add-appt__cancel">
                    <a className="manual-modal" href="/Calendar/BookingCancel/388386003">
                      Cancel <span className="hidden-xs">appointment</span>
                    </a>
                  </div>
                </div>
              )}

              <div className="hstack gap-2">
                <button type="button" className="btn btn-secondary-light modal-close update-calendar" onClick={toggle}>
                  Close
                </button>

                {isEdit ? (
                  <button
                    type="submit"
                    className="btn btn-primary save-recurring"
                    // onClick={saveEvent}
                    data-toggle="popover"
                    title="Edit recurring booking"
                    data-content="Would you like to change only this event, or this and all following events in the series?"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary save-normal"
                    id="btn-save-event"
                    // onClick={saveEvent}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </ModalFooter>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default CalendarModal;
