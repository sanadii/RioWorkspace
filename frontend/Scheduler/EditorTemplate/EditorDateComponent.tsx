import React, { useState, useCallback } from "react";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { setTime } from "@syncfusion/ej2-react-schedule";

const EditorDateComponent = ({ data, appointmentDetails, setAppointmentDetails }) => {
  const [isEditDate, setIsEditDate] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);
  console.log("appointmentData: ", appointmentData);
  console.log("appointmentData data: ", data);
  
  const getAppointmentDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const startDate = getAppointmentDate(appointmentDetails.startTime);

  const handleEditDate = () => {
    setIsEditDate(true);
  };

  const handleAppointmentDateChange = (event) => {
    setIsEditDate(false);
  
    const newStartTime = new Date(event);
    const newEndTime = new Date(newStartTime.getTime() + 3600000); // Add 1 hour to startTime
  
    setAppointmentDetails((prevState) => ({
      ...prevState,
      startTime: newStartTime,
      endTime: newEndTime,
    }));
  };
  

  return (
    <React.Fragment>
      <div className="add-appt__row">
        <div className="add-appt__icon add-appt__icon-date" title="Date"></div>
        <div className="add-appt__date-time">
          {!isEditDate ? (
            <p className="form-control-static">
              {startDate}
              <a
                className="change-booking add-appt__edit-button modal-close"
                onClick={handleEditDate}
                title="Change date"
              ></a>
            </p>
          ) : (
            <DatePickerComponent
              value={appointmentDetails.startTime}
              id="appointmentDate"
              data-name="appointmentDate"
              format="yyy-MM-dd"
              placeholder="Appointment Date"
              change={(e) => handleAppointmentDateChange(e.value)}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export { EditorDateComponent };
