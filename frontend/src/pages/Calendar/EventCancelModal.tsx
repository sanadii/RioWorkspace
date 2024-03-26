import React from "react";
import { Button, Form, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { formatServiceDate, findStaffNameById } from "Components/Hooks";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { appointmentsSelector, clientsSelector } from "Selectors";

const EventCancelModal = ({ modal, isEdit, toggle, appointment }) => {
  const { services, staff } = useSelector(appointmentsSelector);
  const appointmentServices = appointment?.services;
  console.log("appointmentServices: ", appointmentServices);

  return (
    <React.Fragment>
      <Modal
        isOpen={modal}
        // toggle={toggle}
        centered
        size="md"
        id="event-modal"
        className="border-0"
        modalClassName="modal fadeInLeft zoomIn"
      >
        <ModalHeader toggle={toggle} tag="h5" className="booking-modal__header">
          Cancel Appointment
        </ModalHeader>

        <ModalBody className="booking-modal__body">
          <div>
            <h3>The following services will be cancelled:</h3>

            {appointmentServices && appointmentServices.length > 1 && appointmentServices.map((service) => (
              <ServiceEntry key={service.id} service={service} staff={staff} />
            ))}
          </div>
          <div className="form-group ">
            <label>Reason for cancellation</label>
            <select
              className="form-control booking-confirmation-status"
              id="BookingCancellationReasonId"
              name="BookingCancellationReasonId"
            >
              <option value="1">Did not specify</option>
              <option value="2">Other commitments</option>
              <option value="3">Not necessary now</option>
              <option value="4">Did not show</option>
              <option value="5">Appointment made in error</option>
              <option value="6">Other</option>
            </select>
          </div>
          {/* <div className="form-group">
            <p className="form-control-static">
              <a href="/Settings/BusinessCalendar#cancel">
                Add cancellation reasons&nbsp;
                <i className="fa ri-arrow-right-s-line"></i>
              </a>
            </p>
          </div> */}

          <div className="alert alert-info">
            <div>
              <strong>Do you want to permanently delete this appointment?</strong>
              <br />
              No email notifications will be sent to customers.
            </div>
            <div className="checkbox">
              <label htmlFor="DeleteBooking">
                <input id="DeleteBooking" name="DeleteBooking" type="checkbox" value="true" />
                <input type="hidden" name="DeleteBooking" value="false" />
                Permanently delete
                <a
                  href="#"
                  rel="popover"
                  data-content="Ticking this box will remove the record of this appointment from the customer's appointment history and will not show the booking in reports. No email notifications will be sent to customers."
                  data-original-title="Delete appointment record"
                  className="tip-init"
                >
                  <i className="fa fa-question-circle"></i>
                </a>
              </label>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

const ServiceEntry = ({ service, staff }) => {
  const serviceStaffName = findStaffNameById(service.staff, staff);
  const formattedServiceDate = formatServiceDate(service);

  return (
    <React.Fragment>
      <ul>
        <li>
          {service.name} with <b>{serviceStaffName}</b> {formattedServiceDate}
        </li>
      </ul>
    </React.Fragment>
  );
};

export default EventCancelModal;
