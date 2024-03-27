import React, { useState, useEffect, useRef } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { appointmentsSelector, clientsSelector } from "Selectors";

import * as Yup from "yup";
import { useFormik } from "formik";

import { Button, Form, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { updateAppointment, addAppointment } from "store/actions";

import { NavigationComponent } from "./Navigation";
import { DateComponent } from "./DateComponent";
import { ClientComponent } from "./ClientComponent";
import { ServiceComponent } from "./ServiceComponent";
import { ProductComponent } from "./ProductComponent";
import { PackageComponent } from "./PackageComponent";
import ExtraStatusComponent from "./ExtraStatusComponent";

import { AppointmentItem, ServiceItem, ClientItem } from "types";

const EventEditModal = ({ isOpen, isEdit, toggle, appointment }) => {
  const dispatch: any = useDispatch();

  const { services, staff } = useSelector(appointmentsSelector);
  const { clients } = useSelector(clientsSelector);

  // Refs
  const clientRef = useRef([]);
  const serviceRef = useRef([]);
  const statusRef = useRef([]);
  const productRef = useRef([]);
  const packageRef = useRef([]);

  // console.log("initialValues: ", initialValues);
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      title: (appointment && appointment.title) || "",
      start: (appointment && appointment.start) || "",
      end: (appointment && appointment.end) || "",

      // ExtendedProps
      status: (appointment && appointment.status) || statusRef.current,
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
          services: serviceRef.current || [],
          packages: (appointment && appointment.packages) || [],
          products: (appointment && appointment.products) || [],
        };

        // update event
        dispatch(updateAppointment(updatedAppointment));
        validation.resetForm();
      } else {
        const newEvent = {
          id: Math.floor(Math.random() * 100),
          title: values["title"],
          start: values["start"],
          end: values["start"],

          client: values["clientName"] || clientRef.current,
          services: serviceRef.current,
          status: values["status"],
          location: values["location"],
          description: values["description"],

          //
        };
        dispatch(addAppointment(newEvent));
        validation.resetForm();
      }
      toggle();
    },
  });

  // clientRef.current = clientDetails || [];

  return (
    <React.Fragment>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
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
              <DateComponent appointment={appointment} validation={validation} />
              <ClientComponent appointment={appointment} clientRef={clientRef} clients={clients} isEdit={isEdit} />
              <ServiceComponent appointment={appointment} serviceRef={serviceRef} services={services} staff={staff} />
              <div id="appointment-modal-extras" className="add-appt__extras">
                {/* <ExtraVideoComponent /> */}
                {/* <ExtraPromoComponent /> */}
                <ExtraStatusComponent appointment={appointment} statusRef={statusRef} validation={validation} />
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="modal-footer booking-modal__footer">
            <Button
              size="sm"
              color="danger"
              className="btn-decline "
              data-refresh-cal="yes"
              data-href="/Dashboard/DeclineBooking/387979370"
            >
              Decline appointment
            </Button>
            <Button size="sm" className="btn-light waves-effect waves-light btn-cancel">
              Cancel
            </Button>

            <Button
              size="sm"
              className="btn-checkout btn-soft-secondary waves-effect waves-light"
              data-modal-className="invoice-modal"
              href="/Billing/InvoiceAdd?bookingId=387979370&amp;updateCalendar=True"
            >
              Checkout
            </Button>
            {clients.length === 2 ? (
              <Button
                size="sm"
                className="btn-secondary waves-effect waves-light btn-save"
                data-original-title="Edit recurring booking<a class='close bln-close'>×</a>"
                data-content='<p>Would you like to change only this event, or this and all following events in the series?</p><a class="btn btn-block just-this">This only</a><a class="btn btn-block this-and-future">This and future</a>'
                // style="display: none;"
              >
                Save
              </Button>
            ) : (
              <Button size="sm" className="btn-secondary waves-effect waves-light btn-save" name="commit" type="submit">
                Save
              </Button>
            )}
            {/* <div className="d-flex justify-content-between w-100">
              {isEdit && (
                <div className="add-appt__row add-appt__row-cancel">
                  <a
                    className="add-appt__icon add-appt__icon-cancel manual-modal"
                    // href="/Calendar/BookingCancel/388386003"
                  ></a>
                  <div className="add-appt__cancel">
                    <a className="manual-modal" href="/Calendar/BookingCancel/388386003">
                      Cancel <span className="hidden-xs">appointment</span>
                    </a>
                  </div>
                </div>
              )}

              <div className="hstack gap-2">
                <button
                  type="button"
                  className="btn btn-secondary-dark modal-close update-calendar  pe-12 ps-12"
                  onClick={toggle}
                >
                  Close
                </button>

                {isEdit ? (
                  <button
                    type="submit"
                    className="btn btn-primary save-recurring pe-12 ps-12"
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
                    className="btn btn-primary save-normal  pe-12 ps-12"
                    id="btn-save-event"
                    // onClick={saveEvent}
                  >
                    Save
                  </button>
                )}
              </div>
            </div> */}
          </ModalFooter>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default EventEditModal;
