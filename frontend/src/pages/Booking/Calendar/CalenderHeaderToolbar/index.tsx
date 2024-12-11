import React, { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

import { BookingModalProps, BookingMoodProps } from "types";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { appointmentsSelector } from "Selectors";
import { getSchedule, updateAppointment } from "store/actions";

// Calendar
import LeftToolbarChunk from "./LeftToolbarChunk";
import CenterToolbarChunk from "./CenterToolbarChunk";
// import RightToolbarChunk from "./RightToolbarChunk";

const CalenderHeaderToolbar = ({ staff, calendarRef, showLeftSidebar, setShowLeftSidebar }) => {
  const dispatch: any = useDispatch();

  // Data
  const calendarApi = calendarRef?.current?.getApi();

  //
  // getDate
  //
  useEffect(() => {
    dispatch(getSchedule());
  }, [dispatch]);

  /**
   * Handling the modal state
   */

  const [leftToolbarContainer, setLeftToolbarContainer] = useState(null);
  const [centerToolbarContainer, setCenterToolbarContainer] = useState(null);

  useEffect(() => {
    const leftToolbarChunk = document.querySelector(".fc-toolbar .fc-toolbar-chunk:first-child");
    const centerToolbarChunk = document.querySelector(".fc-toolbar .fc-toolbar-chunk:nth-child(2)");
    const RightToolbarChunk = document.querySelector(".fc-toolbar .fc-toolbar-chunk:nth-child(3)");

    if (leftToolbarChunk && !leftToolbarChunk.querySelector(".fc-header-toolbar-left")) {
      const container = document.createElement("span");
      container.className = "fc-header-toolbar-left";
      leftToolbarChunk.appendChild(container);
      setLeftToolbarContainer(container);
    }

    if (centerToolbarChunk && !centerToolbarChunk.querySelector(".fc-header-toolbar-center")) {
      const container = document.createElement("span");
      container.className = "fc-header-toolbar-center";
      centerToolbarChunk.appendChild(container);
      setCenterToolbarContainer(container);
    }
  }, []);

  return (
    <React.Fragment>
      {leftToolbarContainer &&
        createPortal(
          <LeftToolbarChunk
            staff={staff}
            calendarRef={calendarRef}
            showLeftSidebar={showLeftSidebar}
            setShowLeftSidebar={setShowLeftSidebar}
          />,
          leftToolbarContainer
        )}
      {centerToolbarContainer && createPortal(<CenterToolbarChunk calendarRef={calendarRef} />, centerToolbarContainer)}
    </React.Fragment>
  );
};

export default CalenderHeaderToolbar;
