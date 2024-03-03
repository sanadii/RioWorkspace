import React from "react";

const JumpLeft = () => {
  // Function to get the label of the selected staff

  return (
    <React.Fragment>
      <button type="button" title="Previous week" aria-pressed="false" className="fc-jump-left-button btn btn-primary">
        <span className="fa fa-angle-double-left fa-lg fa-fw" role="img"></span>
      </button>
    </React.Fragment>
  );
};

const JumpRight = () => {
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

      <button type="button" title="Next weeks" aria-pressed="false" className="fc-jump-right-button btn btn-primary">
        <span className="fa fa-angle-double-right fa-lg fa-fw" role="img"></span>
      </button>
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
