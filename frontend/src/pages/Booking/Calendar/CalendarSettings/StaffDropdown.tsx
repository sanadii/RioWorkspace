import React from "react";

const StaffDropdown = ({ selectedStaff, onChange }) => {
  // Function to get the label of the selected staff
  const getSelectedStaffLabel = () => {
    switch (selectedStaff) {
      case "all-rostered":
        return "All rostered staff";
      case "false":
        return "All staff";
      case "445024":
        return "Neia";
      case "280034":
        return "Laura";
      // Add more cases as needed
      default:
        return "Select staff";
    }
  };

  return (
    <React.Fragment>
      <span className="drop-arrow caret"></span>
      <i className="fa fa-user"></i>
      <span className="drop-label">{getSelectedStaffLabel()}</span>
      <select
        className="drop-select staff-select select-menu"
        style={{ width: "204px" }}
        value={selectedStaff}
        onChange={onChange}
      >
        <optgroup label="Staff">
          <option value="all-rostered">All rostered staff</option>
          <option value="false">All staff</option>
          <option value="445024">Neia</option>
          <option value="280034">Laura</option>
        </optgroup>
        <optgroup label="Color Station">
          <option value="rg19803" data-select-label="All (Color Station)">
            All
          </option>
          <option value="r43136">Loreal 4.1</option>
          <option value="r43135">Loreal 5.3</option>
        </optgroup>
      </select>
    </React.Fragment>
  );
};

export default StaffDropdown;
