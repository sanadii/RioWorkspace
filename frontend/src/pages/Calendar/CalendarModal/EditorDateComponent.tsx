import React, { useState } from "react";
import { FieldComponent } from "Components/Common";

const EditorDateComponent = ({
  appointment,
  setSelectedNewDate,
  validation,
  // appointment, setAppointmentDetails
}) => {
  const [isEditDate, setIsEditDate] = useState(false);

  const getAppointmentDate = (appointment) => {
    if (!appointment) return "";
    return new Date(appointment).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const startDate = getAppointmentDate(appointment?.start);

  const handleEditDate = () => {
    setIsEditDate(true);
  };

  const fields = [
    {
      id: "start-field",
      name: "start",
      label: "Start",
      type: "date",
      onChange: (e) => {
        validation.handleChange(e);
        setSelectedNewDate(e);
      },

    },
  ];

  return (
    <React.Fragment>
      <div className="add-appt__row">
        <div className="add-appt__icon add-appt__icon-date" title="Date"></div>
        <div className="add-appt__date-time">
          {!isEditDate ? (
            <p>
              {startDate}
              <button
                className="change-booking add-appt__edit-button modal-close no-border"
                onClick={handleEditDate}
                title="Change date"
              ></button>
            </p>
          ) : (
            fields.map((field) => (
              <td key={field.id}>
                <FieldComponent formStructure="" field={field} validation={validation} />
              </td>
            ))
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export { EditorDateComponent };
