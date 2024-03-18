import { useEffect, useState, useRef } from "react";
import ReactDOM, { createPortal } from "react-dom";
import { createRoot } from "react-dom/client"; // Import createRoot
import StaffDropdown from "../StaffDropdown"; // Adjust the path as needed
import { HeaderTitle, JumpLeft, JumpRight } from "./ToolbarButtons"; // Adjust the path as needed

const useCalendarToolbar = () => {
  const [selectedStaff, setSelectedStaff] = useState("all-rostered");
  const calendarRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleRefreshClick = () => {
    alert("Refresh button clicked!");
    // Implement your refresh logic here
  };

  const handleStaffChange = (event) => {
    setSelectedStaff(event.target.value);
    // Additional logic if needed
  };
  const renderDropdown = () => {
    const refreshButton = document.querySelector(".fc-refresh-button");
    const prevButton = document.querySelector(".fc-prev-button");
    const jumpLeftButton = document.querySelector(".fc-jump-left-button");
    const jumpRightButton = document.querySelector(".fc-jump-right-button");
    const todayButton = document.querySelector(".fc-today-button");
    const headerTitle = document.querySelector(".fc-header-title-button");

    // Toolbar - Left
    if (refreshButton) {
      let dropdownContainer = document.querySelector(".staff-dropdown-container");
      if (!dropdownContainer) {
        dropdownContainer = document.createElement("span");
        dropdownContainer.className = "drop-container btn staff-dropdown-container";
        refreshButton.parentNode.insertBefore(dropdownContainer, refreshButton);
        const dropdownRoot = createRoot(dropdownContainer); // Create a root
        dropdownRoot.render(<StaffDropdown selectedStaff={selectedStaff} onChange={handleStaffChange} />);
      }
    }

    // Toolbar - Center
    // if (prevButton && !document.querySelector(".fc-jump-left-button")) {
    //   const jumpLeftButton = document.createElement("span");
    //   prevButton.parentNode.insertBefore(jumpLeftButton, prevButton);
    //   const jumpLeftRoot = createRoot(jumpLeftButton);
    //   jumpLeftRoot.render(<JumpLeft />);
    // }

    if (todayButton && !document.querySelector(".fc-jump-left-button")) {
      const jumpLeftButton = document.createElement("span");
      todayButton.parentNode.insertBefore(jumpLeftButton, todayButton);
      const jumpLeftRoot = createRoot(jumpLeftButton);
      jumpLeftRoot.render(<JumpLeft />);
    }

    if (todayButton && !document.querySelector(".fc-jump-right-button")) {
      const jumpRightContainer = document.createElement("span");
      jumpRightContainer.className = "fc-jump-right";
      todayButton.parentNode.insertBefore(jumpRightContainer, todayButton.nextSibling);
      const jumpRightRoot = createRoot(jumpRightContainer);
      jumpRightRoot.render(<JumpRight />);
    }
  };

  useEffect(() => {
    renderDropdown();
    const interval = setInterval(renderDropdown, 100);
    return () => clearInterval(interval);
  }, [selectedStaff]);

  // Define custom buttons here
  const customButtons = {
    // Start
    refresh: {
      bootstrapFontAwesome: "fa-refresh",
      click: handleRefreshClick,
    },
    print: {
      bootstrapFontAwesome: "fa-print",
      click: handleRefreshClick,
    },
    hide: {
      bootstrapFontAwesome: "fa-eye-slash",
      click: handleRefreshClick,
    },

    // Center
    // jumpLeft: {
    //   bootstrapFontAwesome: "fa-print",
    // },

    // selectDate: {
    //   bootstrapFontAwesome: "fa-print",
    // },

    // jumpRight: {
    //   bootstrapFontAwesome: "fa-print",
    // },
  };

  return { customButtons, selectedStaff };
};

export const CalendarToolbar = () => {
  const { customButtons } = useCalendarToolbar();

  return {
    customButtons: customButtons,
  };
};

export default CalendarToolbar;
