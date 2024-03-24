import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { AppointmentStatusOptions } from "Components/constants";

const ExtraStatusComponent = ({ appointment, statusRef, validation }) => {
  const [appointmentStatus, setAppointmentStatus] = useState((appointment && appointment.status) || 1);

  useEffect(() => {
    statusRef.current = appointmentStatus;
  }, [statusRef, appointmentStatus]);

  const handleStatusChange = (newStatus) => {
    setAppointmentStatus(newStatus);
  };


  console.log("appointmentStatus: ", appointmentStatus);
  return (
    <React.Fragment>
      <div className="add-appt__row add-appt__row-booking-status">
        <div className="add-appt__icon add-appt__icon-status" title="Booking status"></div>
        <div className="add-appt__booking-status booking-status">
          <div className="booking-status__options">
            <ButtonGroup size="sm" className="w-100 material-shadow">
              <Button
                className={`btn-soft-dark material-shadow-none ${appointmentStatus === 1 ? "active" : ""}`}
                onClick={() => handleStatusChange(1)}
              >
                Pencilled-in
              </Button>
              <Button
                className={`btn-soft-dark material-shadow-none ${appointmentStatus !== 1 ? "active" : ""}`}
                onClick={() => handleStatusChange(2)}
              >
                Confirmed
              </Button>
            </ButtonGroup>
            {appointmentStatus !== 1 && (
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
    </React.Fragment>
  );
};

export default ExtraStatusComponent;
