import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);

  // Apps
  const [isScheduler, setIsScheduler] = useState(false);
  const [isRevenues, setIsRevenues] = useState(false);
  const [isExpenses, setIsExpenses] = useState(false);

  // Services
  const [isServices, setIsServices] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Scheduler");

  function updateIconSidebar(e: any) {
    if (e && e.target && e.target.getAttribute("sub-items")) {
      const ul: any = document.getElementById("two-column-menu");
      const iconItems: any = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("sub-items");
        const getID = document.getElementById(id) as HTMLElement;
        if (getID) getID.classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    
    if (iscurrentState !== "Scheduler") {
      setIsScheduler(false);
    }
    if (iscurrentState !== "Revenues") {
      setIsRevenues(false);
    }
    if (iscurrentState !== "Expenses") {
      setIsExpenses(false);
    }

    // Services
    if (iscurrentState !== "Services") {
      setIsServices(false);
    }


    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
  }, [history, iscurrentState, isDashboard, isScheduler, isRevenues, isExpenses, isApps]);

  const menuItems: any = [
    {
      label: "Finance",
      isHeader: true,
    },
    {
      id: "revenues",
      label: "Revenues",
      icon: "ri-dashboard-2-line",
      link: "/revenues",
      stateVariables: isRevenues,
      click: function (e: any) {
        e.preventDefault();
        setIsRevenues(!isRevenues);
        setIscurrentState("Revenues");
        updateIconSidebar(e);
      },
    },
    {
      id: "expenses",
      label: "Expenses",
      icon: "ri-dashboard-2-line",
      link: "/expenses",
      stateVariables: isExpenses,
      click: function (e: any) {
        e.preventDefault();
        setIsExpenses(!isExpenses);
        setIscurrentState("Expenses");
        updateIconSidebar(e);
      },
    },
    {
      id: "services",
      label: "Services",
      icon: "ri-dashboard-2-line",
      link: "/services",
      stateVariables: isServices,
      click: function (e: any) {
        e.preventDefault();
        setIsServices(!isServices);
        setIscurrentState("Services");
        updateIconSidebar(e);
      },
    },
  ];

  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
