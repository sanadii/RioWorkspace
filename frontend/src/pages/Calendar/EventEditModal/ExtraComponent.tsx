import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { AppointmentStatusOptions } from "Components/constants";
import ExtraStatusComponent from "./ExtraStatusComponent";

const ExtraComponent = ({ appointment, statusRef, validation }) => {
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
        <ExtraStatusComponent appointment={appointment} statusRef={statusRef} validation={validation} />
      </div>
    </React.Fragment>
  );
};

export { ExtraComponent };
