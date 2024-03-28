import React, { useEffect, useState, useCallback, useRef } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { appointmentsSelector } from "Selectors";

// Utilities & CSS
import Select from "react-select";
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const CalendarToolbar = () => {
  return <p>hello</p>;
};

const TimePeriodDropdown = ({ calendarApi, direction }) => {
  const timePeriods = [
    { name: "1 week", value: 1 },
    { name: "2 weeks", value: 2 },
    { name: "3 weeks", value: 3 },
    { name: "4 weeks", value: 4 },
    { name: "5 weeks", value: 5 },
    { name: "6 weeks", value: 6 },
    { name: "6 months", value: 26 },
    { name: "1 year", value: 52 },
  ];

  const handleTimePeriodChange = (period) => {
    const weeks = direction === "left" ? -period.value : period.value;
    calendarApi.incrementDate({ weeks });
  };

  return (
    <DropdownMenu>
      {timePeriods.map((period, index) => (
        <DropdownItem key={index} onClick={() => handleTimePeriodChange(period)}>
          {period.name}
        </DropdownItem>
      ))}
    </DropdownMenu>
  );
};

const LeftToolbarChunk = ({ calendarRef, staff, showLeftSidebar, setShowLeftSidebar }) => {
  console.log("showLeftSidebar: ", showLeftSidebar);
  const [selectedSingle, setSelectedSingle] = useState<any>(null);
  const [selectedStaff, setSelectedStaff] = useState("all-rostered");

  const toggleLeftSidebar = () => {
    console.log("we are toggling", showLeftSidebar);
    setShowLeftSidebar(true);
  };

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
        <Button className="btn-sm tip-init" title="Print calendar to report" onClick={(e) => toggleLeftSidebar()}>
          <i className={`mdi mdi-arrow-collapse-${showLeftSidebar ? "right" : "left"}`}></i>
        </Button>
        <Select
          value={selectedSingle}
          onChange={(selectedSingle: any) => {
            handleSelectSingle(selectedSingle);
          }}
          options={staff}
        />{" "}
        <Button className="btn-sm btn-soft-secondary tip-init" title="Refresh calendar">
          <i className="mdi mdi-refresh"></i>
        </Button>
        <Button className="btn-sm btn-soft-secondary tip-init" title="Print calendar to report">
          <i className="mdi mdi-printer"></i>
        </Button>
        <Button className="btn-sm btn-soft-secondary tip-init" title="Hide customer names & prices">
          <i className="mdi mdi-eye"></i>
        </Button>
      </div>
    </React.Fragment>
  );
};

const CenterToolbarChunk = ({ calendarRef }) => {
  const calendarApi = calendarRef?.current?.getApi();
  const [showDropdown, setShowDropdown] = useState(false);

  //
  // Previous & Next Handlers
  //
  const handlePrevClick = useCallback(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
    }
  }, [calendarRef]);

  const handleNextClick = useCallback(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
    }
  }, [calendarRef]);

  //
  // Today Handler
  //
  const handleTodayClick = useCallback(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();
    }
  }, [calendarRef]);

  //
  // Date Selection Handlers
  //

  const [dateRange, setDateRange] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentWeekRange, setCurrentWeekRange] = useState([]);

  const updateCurrentWeekRange = () => {
    if (calendarApi) {
      const view = calendarApi.view;
      const start = view.activeStart;
      const end = view.activeEnd;
      setCurrentWeekRange([start, end]);
    }
  };

  // Call updateCurrentWeekRange when the calendar view changes
  useEffect(() => {
    if (calendarApi) {
      updateCurrentWeekRange();
      calendarApi.on("datesSet", updateCurrentWeekRange);
    }

    // Cleanup
    return () => {
      if (calendarApi) {
        calendarApi.off("datesSet", updateCurrentWeekRange);
      }
    };
  }, [calendarApi]);

  const handleDateSelection = (dates) => {
    if (dates.length === 1 && calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(dates[0]); // Navigate the calendar to the selected start date
      setSelectedDates(dates); // Update the selected dates state
    }
  };

  const [isJumpLeftDropdownOpen, setIsJumpLeftDropdownOpen] = useState(false);
  const [isJumpRightDropdownOpen, setIsJumpRightDropdownOpen] = useState(false);

  // Toggle function for "Jump Left" dropdown
  const toggleJumpLeftDropdown = () => {
    setIsJumpLeftDropdownOpen(!isJumpLeftDropdownOpen);
    if (isJumpRightDropdownOpen) {
      setIsJumpRightDropdownOpen(false); // Close "Jump Right" dropdown if it's open
    }
  };

  // Toggle function for "Jump Right" dropdown
  const toggleJumpRightDropdown = () => {
    setIsJumpRightDropdownOpen(!isJumpRightDropdownOpen);
    if (isJumpLeftDropdownOpen) {
      setIsJumpLeftDropdownOpen(false); // Close "Jump Left" dropdown if it's open
    }
  };

  return (
    <React.Fragment>
      <ButtonGroup>
        <Button className="btn-sm btn-soft-secondary tip-init" title="Previous Week" onClick={(e) => handlePrevClick()}>
          <i className="mdi mdi-chevron-left"></i>
        </Button>

        <Dropdown isOpen={isJumpLeftDropdownOpen} toggle={toggleJumpLeftDropdown} className="btn-group">
          <DropdownToggle className="btn-soft-secondary btn-sm tip-init btn" tag="button">
            <i className="mdi mdi-chevron-double-left"></i>
          </DropdownToggle>
          <TimePeriodDropdown calendarApi={calendarApi} direction="left" />
        </Dropdown>

        <Button className="btn-soft-secondary btn-sm tip-init" title="Go To Today" onClick={(e) => handleTodayClick()}>
          Today
        </Button>
        <div className="btn-group">
          <Flatpickr
            className="btn btn-soft-secondary btn-sm tip-init"
            name="start"
            value={currentWeekRange}
            options={{
              altInput: true,
              dateFormat: "F j, Y",
              showMonths: 2,
            }}
            onChange={handleDateSelection}
          />
        </div>

        <Dropdown isOpen={isJumpRightDropdownOpen} toggle={toggleJumpRightDropdown} className="btn-group">
          <DropdownToggle className="btn-sm btn-soft-secondary tip-init btn" title="Jump Right" tag="button">
            <i className="mdi mdi-chevron-double-right"></i>
          </DropdownToggle>
          <TimePeriodDropdown calendarApi={calendarApi} direction="right" />
        </Dropdown>

        <Button className="btn-sm btn-soft-secondary tip-init" title="Next Week" onClick={(e) => handleNextClick()}>
          <i className="mdi mdi-chevron-right"></i>
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
};

export { LeftToolbarChunk, CenterToolbarChunk };
