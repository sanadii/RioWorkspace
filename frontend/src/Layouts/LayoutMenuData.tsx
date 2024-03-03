import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [iscurrentState, setIscurrentState] = useState("Scheduler");

  // Scheduler Invoice
  const [isScheduler, setIsScheduler] = useState(false);
  const [isCalendar, setIsCalendar] = useState(false);
  const [isCalendarTest, setIsCalendarTest] = useState(false);
  const [isInvoice, setIsInvoice] = useState(false);

  // Finance
  const [isRevenues, setIsRevenues] = useState(false);
  const [isExpenses, setIsExpenses] = useState(false);

  // Staff
  const [isStaff, setIsStaff] = useState(false);

  // Client
  const [isClients, setIsClients] = useState(false);

  // Services
  const [isServices, setIsServices] = useState(false);
  const [isResources, setIsResources] = useState(false);

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

    // Scheduler
    if (iscurrentState !== "Scheduler") {
      setIsScheduler(false);
    }
    if (iscurrentState !== "Calendar") {
      setIsCalendar(false);
    }
    if (iscurrentState !== "CalendarTest") {
      setIsCalendarTest(false);
    }
    if (iscurrentState !== "Invoice") {
      setIsInvoice(false);
    }

    if (iscurrentState !== "Staff") {
      setIsStaff(false);
    }

    // Finance
    if (iscurrentState !== "Revenues") {
      setIsRevenues(false);
    }
    if (iscurrentState !== "Expenses") {
      setIsExpenses(false);
    }

    // Clients
    if (iscurrentState !== "Clients") {
      setIsClients(false);
    }

    // Services
    if (iscurrentState !== "Services") {
      setIsServices(false);
    }
    if (iscurrentState !== "Resources") {
      setIsResources(false);
    }
    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
  }, [history, iscurrentState, isDashboard, isScheduler, isInvoice, isRevenues, isExpenses, isApps]);

  const menuItems: any = [
    // Scheduler Invoice
    {
      label: "Calendar",
      isHeader: true,
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: "ri-dashboard-2-line",
      link: "/calendar",
      stateVariables: isScheduler,
      click: function (e: any) {
        e.preventDefault();
        setIsCalendar(!isCalendar);
        setIscurrentState("Calendar");
        updateIconSidebar(e);
      },
    },
    {
      id: "calendar-test",
      label: "CalendarTest",
      icon: "ri-dashboard-2-line",
      link: "/calendar-test",
      stateVariables: isScheduler,
      click: function (e: any) {
        e.preventDefault();
        setIsCalendarTest(!isCalendarTest);
        setIscurrentState("CalendarTest");
        updateIconSidebar(e);
      },
    },
    {
      label: "Scheduler",
      isHeader: true,
    },

    {
      id: "scheduler",
      label: "Scheduler",
      icon: "ri-dashboard-2-line",
      link: "/scheduler",
      stateVariables: isScheduler,
      click: function (e: any) {
        e.preventDefault();
        setIsScheduler(!isScheduler);
        setIscurrentState("Scheduler");
        updateIconSidebar(e);
      },
    },
    {
      id: "invoice",
      label: "Invoice",
      icon: "ri-dashboard-2-line",
      link: "/invoice",
      stateVariables: isInvoice,
      click: function (e: any) {
        e.preventDefault();
        setIsInvoice(!isInvoice);
        setIscurrentState("Invoice");
        updateIconSidebar(e);
      },
    },

    // Finance
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

    // Services
    {
      label: "Services",
      isHeader: true,
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
    {
      id: "resources",
      label: "Resources",
      icon: "ri-dashboard-2-line",
      link: "/resources",
      stateVariables: isResources,
      click: function (e: any) {
        e.preventDefault();
        setIsResources(!isResources);
        setIscurrentState("Resources");
        updateIconSidebar(e);
      },
    },
    // Clients
    {
      label: "Clients",
      isHeader: true,
    },
    {
      id: "clients",
      label: "Clients",
      icon: "ri-dashboard-2-line",
      link: "/clients",
      stateVariables: isClients,
      click: function (e: any) {
        e.preventDefault();
        setIsClients(!isClients);
        setIscurrentState("Clients");
        updateIconSidebar(e);
      },
    },
    // Staff
    {
      label: "Clients",
      isHeader: true,
    },

    {
      id: "Staff",
      label: "Staff",
      icon: "ri-dashboard-2-line",
      link: "/staff",
      stateVariables: isStaff,
      click: function (e: any) {
        e.preventDefault();
        setIsStaff(!isStaff);
        setIscurrentState("Staff");
        updateIconSidebar(e);
      },
    },
  ];

  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
