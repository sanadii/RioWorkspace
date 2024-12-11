import React, { useState } from "react";

const timePeriods = [
  { name: "1 week", value: 1 },
  { name: "2 weeks", value: 2 },
  { name: "3 weeks", value: 3 },
  { name: "4 weeks", value: 4 },
  { name: "5 weeks", value: 5 },
  { name: "6 weeks", value: 6 },
  { name: "6 months", value: 26 }, // Assuming 26 weeks in 6 months
  { name: "1 year", value: 52 },
];

const JumpLeft = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleJumpLeft = (value) => {
    console.log(`Jump ${value} week(s)`);
    setDropdownOpen(false); // Close dropdown after selection
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <React.Fragment>
      <div className="dropdown btn fc-jump fc-jump-left-button open" onClick={toggleDropdown}>
        <span className="fa fa-angle-double-left fa-lg fa-fw" title="Jump back"></span>
        {dropdownOpen && (
          <ul className="dropdown-menu">
            {timePeriods.map((period, index) => (
              <li key={index} className="jump-calendar">
                <a href="#" className="jump-calendar" onClick={() => handleJumpLeft(period.value)}>
                  {period.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </React.Fragment>
  );
};

const JumpRight = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleJumpRight = (value) => {
    console.log(`Jump ${value} week(s)`);
    setDropdownOpen(false); // Close dropdown after selection
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <React.Fragment>
      <div title="Header Title" aria-pressed="false" className="fc-header-title-button btn btn-primary">
        <span>Feb 25 — Mar 2, 2024</span>
      </div>
      <div className="dropdown btn fc-jump fc-jump-right-button open" onClick={toggleDropdown}>
        <span className="fa fa-angle-double-right fa-lg fa-fw" title="Jump back"></span>
        {dropdownOpen && (
          <ul className="dropdown-menu">
            {timePeriods.map((period, index) => (
              <li key={index} className="jump-calendar">
                <a href="#" className="jump-calendar" onClick={() => handleJumpRight(period.value)}>
                  {period.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </React.Fragment>
  );
};

const HeaderTitle = () => {
  // Function to get the label of the selected staff

  return (
    <React.Fragment>
      <button
        type="button"
        title="Header Title"
        aria-pressed="false"
        className="fc-header-title-button btn btn-primary"
      >
        <span>Feb 25 — Mar 2, 2024</span>
      </button>
    </React.Fragment>
  );
};

export { JumpLeft, JumpRight, HeaderTitle };
