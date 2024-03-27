// import React, { useEffect, useState, useCallback, useRef } from "react";

// // Redux
// import { useDispatch, useSelector } from "react-redux";
// import { appointmentsSelector } from "Selectors";

// // Utilities & CSS
// import Select from "react-select";
// import {
//   Button,
//   ButtonGroup,
//   Popover,
//   PopoverBody,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
// } from "reactstrap";
// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/flatpickr.min.css";

// const LeftToolbarChunk = (calendarRef, staff) => {
//     const [selectedSingle, setSelectedSingle] = useState<any>(null);
//     const [selectedStaff, setSelectedStaff] = useState("all-rostered");
  
//     function handleSelectSingle(selectedSingle: any) {
//       setSelectedSingle(selectedSingle);
//     }
  
//     const handleRefreshClick = () => {
//       alert("Refresh button clicked!");
//       // Implement your refresh logic here
//     };
  
//     const handleStaffChange = (event) => {
//       setSelectedStaff(event.target.value);
//     };
//     // Additional logic if needed
//     return (
//       <React.Fragment>
//         <div className="hstack gap-1">
//           <Button className="btn-sm tip-init" title="Print calendar to report">
//             <i className="mdi mdi-arrow-collapse-left"></i>
//           </Button>
//           <Select
//             value={selectedSingle}
//             onChange={(selectedSingle: any) => {
//               handleSelectSingle(selectedSingle);
//             }}
//             options={staff}
//           />{" "}
//           <Button className="btn-sm btn-soft-secondary tip-init" title="Refresh calendar">
//             <i className="mdi mdi-refresh"></i>
//           </Button>
//           <Button className="btn-sm btn-soft-secondary tip-init" title="Print calendar to report">
//             <i className="mdi mdi-printer"></i>
//           </Button>
//           <Button className="btn-sm btn-soft-secondary tip-init" title="Hide customer names & prices">
//             <i className="mdi mdi-eye"></i>
//           </Button>
//         </div>
//       </React.Fragment>
//     );
//   };

//   default export LeftToolbarChunk