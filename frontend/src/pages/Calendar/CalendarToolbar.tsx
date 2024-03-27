import React, { useEffect, useState, useCallback } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { appointmentsSelector } from "Selectors";

import Select from "react-select";
import { Button, ButtonGroup } from "reactstrap";

const LeftToolbarChunk = (calendarRef, staff) => {
  const [selectedSingle, setSelectedSingle] = useState<any>(null);
  const [selectedStaff, setSelectedStaff] = useState("all-rostered");

  function handleSelectSingle(selectedSingle: any) {
    setSelectedSingle(selectedSingle);
  }

  const handleRefreshClick = () => {
    alert("Refresh button clicked!");
    // Implement your refresh logic here
  };

  const handleStaffChange = (event) => {
    setSelectedStaff(event.target.value);
  };
  // Additional logic if needed
  return (
    <React.Fragment>
      <div className="hstack gap-1">
        <Button className="btn-sm tip-init" title="Print calendar to report">
          <i className="mdi mdi-arrow-collapse-left"></i>
        </Button>
        <Select
          value={selectedSingle}
          onChange={(selectedSingle: any) => {
            handleSelectSingle(selectedSingle);
          }}
          options={staff}
        />{" "}
        <Button className="btn-sm tip-init" title="Refresh calendar">
          <i className="mdi mdi-refresh"></i>
        </Button>
        <Button className="btn-sm tip-init" title="Print calendar to report">
          <i className="mdi mdi-printer"></i>
        </Button>
        <Button className="btn-sm tip-init" title="Hide customer names & prices">
          <i className="mdi mdi-eye"></i>
        </Button>
      </div>
    </React.Fragment>
  );
};

const CenterToolbarChunk = ({ calendarRef }) => {
  const handleNext = useCallback(() => {
    calendarRef.current.next();
  }, [calendarRef]);

  const handlePrev = useCallback(() => {
    calendarRef.current.prev();
  }, []);

  const handleToday = useCallback(() => {
    calendarRef.current.today();
  }, []);

  return (
    <React.Fragment>
      <ButtonGroup>
        <Button className="btn-sm tip-init" title="Hide customer names & prices" onClick={(e) => handleNext()}>
          <i className="mdi mdi-chevron-left"></i>
        </Button>
        <Button className="btn-sm tip-init" title="Hide customer names & prices" onClick={(e) => handleNext()}>
          <i className="mdi mdi-chevron-double-left"></i>
        </Button>
        <Button className="btn-sm tip-init" title="Hide customer names & prices" onClick={(e) => handleNext()}>
          Today
        </Button>
        <Button className="btn-sm tip-init" title="Hide customer names & prices" onClick={(e) => handleNext()}>
          Aug 4 — 10, 2024
        </Button>
        <Button className="btn-sm tip-init" title="Hide customer names & prices" onClick={(e) => handleNext()}>
          <i className="mdi mdi-chevron-double-right"></i>
        </Button>
        <Button className="btn-sm tip-init" title="Hide customer names & prices" onClick={(e) => handleNext()}>
          <i className="mdi mdi-chevron-right"></i>
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
};

export { LeftToolbarChunk, CenterToolbarChunk };
