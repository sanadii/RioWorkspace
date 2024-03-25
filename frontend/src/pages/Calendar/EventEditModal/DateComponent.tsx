import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FieldComponent } from "Components/Common";

const DateComponent = ({
  appointment,
  setSelectedNewDate,
  validation,
  // appointment, setAppointmentDetails
}) => {
  const [isEditDate, setIsEditDate] = useState(false);

  const getAppointmentDate = (appointmentDate) => {
    if (!appointmentDate) return "";
    return new Date(appointmentDate).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getAppointmentStartTime = (appointmentStartTime) => {
    if (!appointment || !appointmentStartTime) return "";

    const appointmentDate = new Date(appointmentStartTime);
    return appointmentDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const appointmentDate = getAppointmentDate(appointment?.start);
  const appointmentStartTime = getAppointmentStartTime(appointment?.start);

  const handleEditDate = () => {
    setIsEditDate(true);
  };

  console.log("isEditDate: ", isEditDate);
  const fields = [
    {
      id: "start-field",
      name: "start",
      label: "Start",
      type: "date",
      onChange: (e) => {
        setIsEditDate(false);
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="add-appt__row add-app__date-section">
        <div className="add-appt__icon add-appt__icon-date" title="Date"></div>
        <div className="add-appt__date-time">
          {!isEditDate ? (
            <p className="form-control-static">
              <strong>{appointmentDate}</strong> {appointmentStartTime}
              <li className="list-inline-item edit">
                <Link to="#" className="text-primary d-inline-block edit-item-btn" onClick={handleEditDate}>
                  <i className="ri-pencil-line fs-16"></i>
                </Link>
              </li>
              {/* If opening the Modal from Pages other than Calendar */}
              {/* <a className="" href="/Calendar?bookingId=315758705">View on calendar</a> */}
            </p>
          ) : (
            fields.map((field) => (
              <div key={field.id}>
                <FieldComponent formStructure="table" field={field} validation={validation} />
              </div>
            ))
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export { DateComponent };
