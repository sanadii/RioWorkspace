// import React, { useEffect, useState, useRef } from "react";
// import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
// import { configureStore } from "store";

// // Redux
// import { useDispatch, useSelector } from "react-redux";
// import { appointmentsSelector } from "Selectors";

// import Select from "react-select";
// import { HeaderTitle, JumpLeft, JumpRight } from "./ToolbarButtons"; // Adjust the path as needed
// import { Button, ButtonGroup } from "reactstrap";

// const LeftToolbarChunk = (selectedStaff, handleStaffChange) => {
//   const { staff } = useSelector(appointmentsSelector);
//   const [selectedSingle, setSelectedSingle] = useState<any>(null);

//   function handleSelectSingle(selectedSingle: any) {
//     setSelectedSingle(selectedSingle);
//   }

//   return (
//     <React.Fragment>
//       <div className="hstack gap-1">
//         <Button className="btn-sm tip-init" title="Print calendar to report">
//           <i className="mdi mdi-arrow-collapse-left"></i>
//         </Button>
//         <Select
//           value={selectedSingle}
//           onChange={(selectedSingle: any) => {
//             handleSelectSingle(selectedSingle);
//           }}
//           options={staff}
//         />{" "}
//         <Button className="btn-sm tip-init" title="Refresh calendar">
//           <i className="mdi mdi-refresh"></i>
//         </Button>
//         <Button className="btn-sm tip-init" title="Print calendar to report">
//           <i className="mdi mdi-printer"></i>
//         </Button>
//         <Button className="btn-sm tip-init" title="Hide customer names & prices">
//           <i className="mdi mdi-eye"></i>
//         </Button>
//       </div>
//     </React.Fragment>
//   );
// };

// const CenterToolbarChunk = () => {
//   return (
//     <React.Fragment>
//       <ButtonGroup>
//         <Button className="btn-sm tip-init" title="Refresh calendar">
//           <i className="mdi mdi-chevron-left"></i>
//         </Button>
//         <Button className="btn-sm tip-init" title="Refresh calendar">
//           <i className="mdi mdi-chevron-double-left"></i>
//         </Button>
//         <Button className="btn-sm tip-init" title="Print calendar to report">
//           Today
//         </Button>
//         <Button className="btn-sm tip-init" title="Print calendar to report">
//           Aug 4 — 10, 2024
//         </Button>
//         <Button className="btn-sm tip-init" title="Hide customer names & prices">
//           <i className="mdi mdi-chevron-double-right"></i>
//         </Button>
//         <Button className="btn-sm tip-init" title="Hide customer names & prices">
//           <i className="mdi mdi-chevron-right"></i>
//         </Button>
//       </ButtonGroup>
//     </React.Fragment>
//   );
// };

// export const useCalendarToolbar = () => {
//   const [selectedStaff, setSelectedStaff] = useState("all-rostered");
//   const calendarRef = useRef(null);
//   const dropdownRef = useRef(null);

//   const handleRefreshClick = () => {
//     alert("Refresh button clicked!");
//     // Implement your refresh logic here
//   };

//   const handleStaffChange = (event) => {
//     setSelectedStaff(event.target.value);
//     // Additional logic if needed
//   };
  
//   const renderCustomButtons = () => {
//     const leftToolbarChunk = document.querySelector(".fc-toolbar .fc-toolbar-chunk:first-child");
//     const centerToolbarChunk = document.querySelector(".fc-toolbar .fc-toolbar-chunk:nth-child(2)");
//     // const centerToolbarChunk = document.querySelector(".fc-toolbar .fc-toolbar-chunk:nth-child(2) .fc-today-button");
//     const rightToolbarChunk = document.querySelector(".fc-toolbar .fc-toolbar-chunk:last-child");

//     const refreshButton = document.querySelector(".fc-refresh-button");
//     const prevButton = document.querySelector(".fc-prev-button");
//     const jumpLeftButton = document.querySelector(".fc-jump-left-button");
//     const jumpRightButton = document.querySelector(".fc-jump-right-button");
//     const todayButton = document.querySelector(".fc-today-button");
//     const headerTitle = document.querySelector(".fc-header-title-button");

//     // Ensure the left toolbar chunk exists
//     if (leftToolbarChunk) {
//       let leftToolbarContainer = leftToolbarChunk.querySelector(".fc-header-toolbar-left");

//       if (!leftToolbarContainer) {
//         leftToolbarContainer = document.createElement("span");
//         leftToolbarContainer.className = "fc-header-toolbar-left";
//         leftToolbarChunk.appendChild(leftToolbarContainer);

//         // Wrap the component in a Provider with the store
//         ReactDOM.render(
//           <Provider store={configureStore({})}>
//             <React.Fragment>
//               <BrowserRouter basename={process.env.PUBLIC_URL}>
//                 <LeftToolbarChunk />
//               </BrowserRouter>
//             </React.Fragment>
//           </Provider>,
//           leftToolbarContainer
//         );
//       }
//     }

//     if (centerToolbarChunk) {
//       let centerToolbarContainer = centerToolbarChunk.querySelector(".fc-header-toolbar-left");

//       if (!centerToolbarContainer) {
//         centerToolbarContainer = document.createElement("span");
//         centerToolbarContainer.className = "fc-header-toolbar-left";
//         centerToolbarChunk.appendChild(centerToolbarContainer);

//         // Wrap the component in a Provider with the store
//         ReactDOM.render(
//           <Provider store={configureStore({})}>
//             <React.Fragment>
//               <BrowserRouter basename={process.env.PUBLIC_URL}>
//                 <CenterToolbarChunk />
//               </BrowserRouter>
//             </React.Fragment>
//           </Provider>,
//           centerToolbarContainer
//         );
//       }
//     }

//     // if (centerToolbarChunk) {
//     //   // Check if buttons have already been added
//     //   const isButtonBeforeAdded = !!document.querySelector(".fc-jump-left-button");
//     //   const isButtonAfter1Added = !!document.querySelector(".fc-title");
//     //   const isButtonAfter2Added = !!document.querySelector(".fc-jump-right-button");

//     //   if (!isButtonBeforeAdded || !isButtonAfter1Added || !isButtonAfter2Added) {
//     //     // Create new buttons
//     //     const newButtonBefore = document.createElement("button");
//     //     newButtonBefore.textContent = "<<";
//     //     newButtonBefore.className = "fc-button fc-button-primary fc-jump-left-button";

//     //     const newButtonAfter1 = document.createElement("button");
//     //     newButtonAfter1.textContent = "The Calendar";
//     //     newButtonAfter1.className = "fc-button fc-button-primary fc-title";

//     //     const newButtonAfter2 = document.createElement("button");
//     //     newButtonAfter2.textContent = ">>";
//     //     newButtonAfter2.className = "fc-button fc-button-primary fc-jump-right-button";

//     //     // Insert the new buttons
//     //     if (!isButtonBeforeAdded) {
//     //       centerToolbarChunk.parentNode.insertBefore(newButtonBefore, centerToolbarChunk);
//     //     }
//     //     if (!isButtonAfter1Added) {
//     //       centerToolbarChunk.parentNode.insertBefore(newButtonAfter1, centerToolbarChunk.nextSibling);
//     //     }
//     //     if (!isButtonAfter2Added) {
//     //       centerToolbarChunk.parentNode.insertBefore(newButtonAfter2, newButtonAfter1.nextSibling);
//     //     }
//     //   }
//     // }

//     // Toolbar - Left
//     // if (refreshButton) {
//     //   let dropdownContainer = document.querySelector(".staff-dropdown-container");
//     //   if (!dropdownContainer) {
//     //     dropdownContainer = document.createElement("span");
//     //     dropdownContainer.className = "drop-container btn staff-dropdown-container";
//     //     refreshButton.parentNode.insertBefore(dropdownContainer, refreshButton);
//     //     const dropdownRoot = createRoot(dropdownContainer); // Create a root
//     //     dropdownRoot.render(<StaffDropdown selectedStaff={selectedStaff} onChange={handleStaffChange} />);
//     //   }
//     // }

//     // Toolbar - Left
//     // if (refreshButton) {
//     //   let dropdownContainer = document.querySelector(".staff-dropdown-container");
//     //   if (!dropdownContainer) {
//     //     dropdownContainer = document.createElement("span");
//     //     dropdownContainer.className = "drop-container btn staff-dropdown-container";
//     //     refreshButton.parentNode.insertBefore(dropdownContainer, refreshButton);
//     //     const dropdownRoot = createRoot(dropdownContainer); // Create a root
//     //     dropdownRoot.render(<StaffDropdown selectedStaff={selectedStaff} onChange={handleStaffChange} />);
//     //   }
//     // }

//     // Toolbar - Center
//     // if (prevButton && !document.querySelector(".fc-jump-left-button")) {
//     //   const jumpLeftButton = document.createElement("span");
//     //   prevButton.parentNode.insertBefore(jumpLeftButton, prevButton);
//     //   const jumpLeftRoot = createRoot(jumpLeftButton);
//     //   jumpLeftRoot.render(<JumpLeft />);
//     // }

//     // if (todayButton && !document.querySelector(".fc-jump-left-button")) {
//     //   const jumpLeftButton = document.createElement("span");
//     //   todayButton.parentNode.insertBefore(jumpLeftButton, todayButton);
//     //   const jumpLeftRoot = createRoot(jumpLeftButton);
//     //   jumpLeftRoot.render(<JumpLeft />);
//     // }

//     // if (todayButton && !document.querySelector(".fc-jump-right-button")) {
//     //   const jumpRightContainer = document.createElement("span");
//     //   jumpRightContainer.className = "fc-jump-right";
//     //   todayButton.parentNode.insertBefore(jumpRightContainer, todayButton.nextSibling);
//     //   const jumpRightRoot = createRoot(jumpRightContainer);
//     //   jumpRightRoot.render(<JumpRight />);
//     // }
//   };

//   useEffect(() => {
//     renderCustomButtons();
//     const interval = setInterval(renderCustomButtons, 100);
//     return () => clearInterval(interval);
//   }, [selectedStaff]);

//   // Define custom buttons here
//   const customButtons = {};

//   return { customButtons };
// };

// export const CalendarToolbar = () => {
//   const { customButtons } = useCalendarToolbar();

//   return {
//     customButtons: customButtons,
//   };
// };

// export default CalendarToolbar;
