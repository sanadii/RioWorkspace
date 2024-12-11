import React, { useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { getSchedule } from "store/actions";

// Utilities & CSS
import Select from "react-select";
import { Button } from "reactstrap";

const LeftToolbarChunk = ({ calendarRef, staff, showLeftSidebar, setShowLeftSidebar }) => {
  const dispatch: any = useDispatch();
  const [selectedSingle, setSelectedSingle] = useState<any>(null);
  const [selectedStaff, setSelectedStaff] = useState("all-rostered");

  const toggLeLeftSidebar = () => {
    setShowLeftSidebar(!showLeftSidebar);
  };

  function handleSelectSingle(selectedSingle: any) {
    setSelectedSingle(selectedSingle);
  }

  const handleRefreshClick = () => {
    dispatch(getSchedule());
  };

  const handleStaffChange = (event) => {
    setSelectedStaff(event.target.value);
  };
  // Additional logic if needed
  return (
    <React.Fragment>
      <div className="hstack gap-1">
        <Button className="btn-sm tip-init" title="Print calendar to report" onClick={toggLeLeftSidebar}>
          <i className={`mdi ${showLeftSidebar ? "mdi-arrow-expand-horizontal" : "mdi-arrow-collapse-left"}`}></i>
        </Button>
        <Select
          value={selectedSingle}
          onChange={(selectedSingle: any) => {
            handleSelectSingle(selectedSingle);
          }}
          options={staff}
        />{" "}
        <Button className="btn-sm btn-soft-secondary tip-init" title="Refresh calendar" onClick={handleRefreshClick}>
          <i className="mdi mdi-refresh"></i>
        </Button>
        <Button className="btn-sm btn-soft-secondary tip-init" title="Print calendar to report">
          <i className="mdi mdi-printer"></i>
        </Button>
      </div>
    </React.Fragment>
  );
};

export default LeftToolbarChunk;
