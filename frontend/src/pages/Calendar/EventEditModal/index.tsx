import React, { useState, useEffect, useRef } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { appointmentsSelector, clientsSelector } from "Selectors";

import * as Yup from "yup";
import { useFormik } from "formik";

import { Form, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { updateAppointment, addAppointment } from "store/actions";

import { NavigationComponent } from "./Navigation";
import { DateComponent } from "./DateComponent";
import { ClientComponent } from "./ClientComponent";
import { ServiceComponent } from "./ServiceComponent";
import { ProductComponent } from "./ProductComponent";
import { PackageComponent } from "./PackageComponent";
import ExtraStatusComponent from "./ExtraStatusComponent";

import { AppointmentItem, ServiceItem, ClientItem } from "types";

const EventEditModal = ({ modal, isEdit, toggle, appointment }) => {
  const dispatch: any = useDispatch();

  const { appointments, services, staff } = useSelector(appointmentsSelector);
  const { clients } = useSelector(clientsSelector);
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
    services: (appointment && appointment.services) || serviceRef.current,
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
    initialValues: {
      title: (appointment && appointment.title) || "",
      start: (appointment && appointment.start) || "",
      end: (appointment && appointment.end) || "",
      status: (appointment && appointment.status) || statusRef.current,

      // ExtendedProps
      client: (appointment && appointment.client) || clientRef.current,
      services: (appointment && appointment.services) || serviceRef.current,
      packages: (appointment && appointment.packages) || [],
      products: (appointment && appointment.products) || [],

      // Not used yes
      category: (appointment && appointment.category) || "",
      location: (appointment && appointment.location) || "",
      description: (appointment && appointment.description) || "",
      defaultDate: (appointment && appointment.defaultDate) || [],
      datetag: (appointment && appointment.datetag) || "",
    },
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
          status: values.status,
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
          services: values["services"],
          status: values["status"],
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
          <ModalHeader toggle={toggle} tag="h5" className="booking-modal__header">
            {!!isEdit ? `Edit Appointment of ${appointment.title}` : "Add Event"}
          </ModalHeader>
          <ModalBody className="booking-modal__body">
            <NavigationComponent />

            <div className="tab-content tight-grid">
              <DateComponent
                appointment={appointment}
                setSelectedNewDate={setSelectedNewDate}
                validation={validation}
              />
              <ClientComponent clientRef={clientRef} appointment={appointment} clients={clients} isEdit={isEdit} />
              <ServiceComponent serviceRef={serviceRef} appointment={appointment} services={services} staff={staff} />
              <div id="appointment-modal-extras" className="add-appt__extras">
                {/* <ExtraVideoComponent /> */}
                {/* <ExtraPromoComponent /> */}
                <ExtraStatusComponent appointment={appointment} statusRef={statusRef} validation={validation} />
              </div>
            </div>
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

export default EventEditModal;
