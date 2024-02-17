import React, { useState } from "react";
import { Button, ButtonGroup, Col, Row } from "reactstrap";
import { AppointmentStatusOptions } from "Components/constants";

const EditorStatusComponent = ({ data, appointmentDetails, setAppointmentDetails }) => {
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(data.status !== 1 ? true : false);

  const handlePencilledInClick = () => {
    setAppointmentConfirmed(false);
    setAppointmentDetails((prevState) => ({
      ...prevState,
      status: 1,
    }));
  };

  const handleConfirmedClick = () => {
    setAppointmentConfirmed(true);
    setAppointmentDetails((prevState) => ({
      ...prevState,
      status: 2,
    }));
  };

  const handleOptionSelect = (value) => {
    console.log("Selected value:", value);
    setAppointmentDetails((prevState) => ({
      ...prevState,
      status: value,
    }));
  };

  return (
    <React.Fragment>
      <div id="appointment-modal-extras" className="add-appt__extras">
        <div className="add-appt__row add-appt__row-booking-status">
          <div className="add-appt__icon add-appt__icon-status" title="Booking status"></div>
          <div className="add-appt__booking-status booking-status">
            <div className="booking-status__options">
              <span className="button-group me-2" data-toggle="buttons-radio">
                <Button
                  className={`booking-type ${appointmentConfirmed ? "btn-soft-secondary" : "btn-secondary"}`}
                  id="btncheck1"
                  onClick={handlePencilledInClick}
                >
                  Pencilled-in
                </Button>
                <Button
                  className={`booking-type ${!appointmentConfirmed ? "btn-soft-secondary" : "btn-secondary"}`}
                  id="btncheck2"
                  onClick={handleConfirmedClick}
                >
                  Confirmed
                </Button>
              </span>

              {appointmentConfirmed && (
                <select
                  id="appointment-confirmed-status"
                  name="appointmentConfirmationStatus"
                  className="booking-confirmation-status form-control"
                  onChange={(e) => handleOptionSelect(Number(e.target.value))}
                >
                  {AppointmentStatusOptions.filter((option) => option.id !== 1).map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              )}
              <div className="booking-status__deposits-break"></div>
              <div className="booking-status__right">
                <div className="booking-status__deposits">
                  <input type="hidden" className="deposit-amount" value="0" />
                  <div className="booking-status__invoice">
                    <div className="add-deposit-container">
                      <Button color="primary" outline>
                        Add deposit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export { EditorStatusComponent };
