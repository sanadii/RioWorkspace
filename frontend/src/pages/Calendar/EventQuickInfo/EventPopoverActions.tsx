import React, { useEffect, useState, useRef } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { formatTime } from "Components/Hooks";
import { createPortal } from "react-dom";


// import CalendarModal from "CalendarModal"
const EventPopoverActions = ({ event, toggle, setModal }) => {
  // const [event, setEvent] = useState<any>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const handleEditAction = (e) => {
    console.log("Handling Edit Action");
    toggle()
    setModal(true);
    setIsEdit(true);
  };

  return (
    <React.Fragment>
      <div className="calendar-balloon__action-buttons">
        <button
          id="edit"
          // disabled={loader && true}
          className="btn btn-soft-secondary w-100 waves-effect waves-light material-shadow-none"
          // className="btn btn-primary-light btn-small bln-close"
          onClick={(e) => handleEditAction(e)}
        >
          Edit
        </button>

        <button
          id="edit"
          // disabled={loader && true}
          className="btn btn-soft-secondary w-100 p-2 waves-effect waves-light material-shadow-none"
          // className="btn btn-primary-light btn-small bln-close"
          onClick={(e) => handleEditAction(e)}
        >
          Reschedule
        </button>
        <button
          id="edit"
          // disabled={loader && true}
          className="btn btn-soft-secondary w-100 waves-effect waves-light material-shadow-none"
          // className="btn btn-primary-light btn-small bln-close"
          onClick={(e) => handleEditAction(e)}
        >
          Book Next
        </button>
      </div>

    </React.Fragment>
  );
};

export default EventPopoverActions;
