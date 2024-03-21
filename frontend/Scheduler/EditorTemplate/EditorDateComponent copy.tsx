import React, { useState, useCallback } from "react";
import { Row, Button } from "reactstrap";
import { DialogComponent, AnimationSettingsModel } from "@syncfusion/ej2-react-popups";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useButtonClickActions } from "../SchedulerActions";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { setTime } from '@syncfusion/ej2-react-schedule';
const EditorDateComponent = ({ data }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const animationSettings: AnimationSettingsModel = { effect: "None" };

  const [appointmentData, setAppointmentData] = useState(null);

  const buttonClickActions = useButtonClickActions(data);
  console.log("what is the index data?", data);

  const getAppointmentDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  // const toggleModal = useCallback(() => {
  //   setIsModalOpen(!isModalOpen);
  //   if (!isModalOpen) {
  //     setAppointmentData(null);
  //   }
  // }, [isModalOpen]);

  const handleAppointmentDateClick = useCallback(() => {
    setAppointmentData({
      id: data.id,
      startTime: setTime(new Date(data.startTime), 12*60*60*1000),
      endTime: setTime(new Date(data.endTime), 12*60*60*1000),
    });
    // toggleModal();
    // console.log("toggle:", isModalOpen);
  }, [data.current]);

  const startDate = getAppointmentDate(data?.startTime);

  return (
    <React.Fragment>
      <DialogComponent
        id="editDateDialog"
        header="Edit Appointment Date"
        visible={isDialogOpen}
        showCloseIcon={true}
        animationSettings={animationSettings}
        width="400px"
        close={handleDialogClose}
      >
        {/* Add your date editing form or component here */}
        <p>Content of the dialog goes here.</p>
        <DatePickerComponent
          value={data.current?.startDate}
          id="appointmentDate"
          data-name="appointmentDate"
          format="yyy-MM-dd"
          placeholder="Appointment Date"
          // change={handleClientBirthdayChange}
        />

        <Row>
          <ButtonComponent
            id="update"
            // cssClass="e-flat"
            content="Update"
            onClick={(e) => buttonClickActions(e)}
          />
          <ButtonComponent
            id="cancel"
            // cssClass="e-flat"
            content="Cancel"
            isPrimary={true}
            onClick={(e) => buttonClickActions(e)}
          />
        </Row>
      </DialogComponent>

      <div className="add-appt__row">
        <div className="add-appt__icon add-appt__icon-date" title="Date"></div>
        <div className="add-appt__date-time">
          <p className="form-control-static">
            {startDate}
            <a
              className="change-booking add-appt__edit-button modal-close"
              onClick={handleDialogOpen}
              title="Change date"
            ></a>
            <ButtonComponent
              id="update"
              // cssClass="e-flat"
              content="Update"
              onClick={(e) => buttonClickActions(e)}
            />
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export { EditorDateComponent };
