import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { AppointmentStatusOptions } from "Components/constants";

const StatusComponent = ({ appointment, statusRef, validation }) => {
  const [appointmentStatus, setAppointmentStatus] = useState((appointment && appointment.status) || 1);

  useEffect(() => {
    statusRef.current = appointmentStatus;
  }, [statusRef, appointmentStatus]);

  const handleStatusChange = (newStatus) => {
    setAppointmentStatus(newStatus);
  };

  return (
    <React.Fragment>
      <div id="appointment-modal-extras" className="add-appt__extras">
        <div className="add-appt__row add-appt__row-booking-status">
          <div className="add-appt__icon add-appt__icon-status" title="Booking status"></div>
          <div className="add-appt__booking-status booking-status">
            <div className="booking-status__options">
              <Button
                className={`booking-type ${appointmentStatus === 1 ? "btn-secondary" : "btn-soft-secondary"}`}
                onClick={() => handleStatusChange(1)}
              >
                Pencilled-in
              </Button>
              <Button
                className={`booking-type ${appointmentStatus === 2 ? "btn-secondary" : "btn-soft-secondary"}`}
                onClick={() => handleStatusChange(2)}
              >
                Confirmed
              </Button>
              {appointmentStatus === 2 && (
                <select
                  id="appointment-confirmed-status"
                  name="appointmentConfirmationStatus"
                  className="booking-confirmation-status form-control"
                  value={appointmentStatus}
                  onChange={(e) => handleStatusChange(Number(e.target.value))}
                >
                  {AppointmentStatusOptions.filter((option) => option.id !== 1).map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export { StatusComponent };
