import React from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Alert, Input, Label } from "reactstrap";
import Select from "react-select";
import { formatServiceDate, findStaffNameById } from "Components/Hooks";
import { useSelector } from "react-redux";
import { appointmentsSelector } from "Selectors";

const cancelationReasonOptions = [
  { value: 1, label: "Did not specify" },
  { value: 2, label: "Other commitments" },
  { value: 3, label: "Not necessary now" },
  { value: 4, label: "Did not show" },
  { value: 4, label: "Appointment made in error" },
  { value: 4, label: "Other" },
];

const EventCancelModal = ({ isOpen, toggle, appointment }) => {
  const { staff } = useSelector(appointmentsSelector);
  const appointmentServices = appointment?.services;

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered
      size="md"
      id="event-modal"
      className="border-0 modal fadeInLeft zoomIn"
    >
      <ModalHeader toggle={toggle} tag="h5" className="booking-modal__header">
        Cancel Appointment
      </ModalHeader>
      <ModalBody className="booking-modal__body">
        <Label className="form-label bold">The following services will be cancelled:</Label>
        {appointmentServices && appointmentServices.length > 1 && (
          <ServiceList services={appointmentServices} staff={staff} />
        )}
        <CancellationReasonSelect />
        <DeleteAlert />
      </ModalBody>
      <ModalFooter>
        <Button className="btn btn-padded btn-light" onClick={toggle}>
          Close
        </Button>
        <Button className="btn btn-padded btn-danger" name="commit" type="submit" onClick={toggle}>
          Cancel appointment
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const ServiceList = ({ services, staff }) => {
  return (
    <React.Fragment>
      {services.map((service) => {
        const serviceStaffName = findStaffNameById(service.staff, staff);
        const formattedServiceDate = formatServiceDate(service);

        return (
          <ul className="ps-4" key={service.id}>
            <li>
              <b>{service.name}</b> <br />
              with {serviceStaffName} {formattedServiceDate}
            </li>
          </ul>
        );
      })}
    </React.Fragment>
  );
};

const CancellationReasonSelect = () => (
  <div className="form-group pb-3">
    <Label className="form-label bold">Reason for cancellation</Label>
    <Select aria-label="Default select example" options={cancelationReasonOptions} />
  </div>
);

const DeleteAlert = () => (
  <Alert color="info" className="alert-additional material-shadow">
    <div className="alert-body">
      <div className="d-flex">
        <div className="flex-shrink-0 me-3">
          <i className="ri-error-warning-line fs-24 align-middle"></i>
        </div>
        <div className="flex-grow-1">
          <b className="alert-heading">Do you want to permanently delete this appointment?</b>
          <p className="mb-0"> No email notifications will be sent to customers. . </p>
        </div>
      </div>
    </div>

    <div className="alert-content">
      <div className="form-check">
        <Input className="form-check-input" type="checkbox" id="formCheck1" />
        <Label className="form-check-label" for="formCheck1">
          Permanently delete
        </Label>
        <i className="fa fa-question-circle"></i>
      </div>
    </div>
  </Alert>
);

export default EventCancelModal;
