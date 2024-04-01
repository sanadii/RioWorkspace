import React, { useEffect, useState } from "react";
import { Collapse, NavLink } from "reactstrap";
import classnames from "classnames";
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";

const SettingSidebar = ({ activeTab, setActiveTab }) => {
  const [activeSection, setActiveSection] = useState("1");

  const toggleSection = (sectionId) => {
    if (activeSection !== sectionId) {
      setActiveSection(sectionId);
    }
  };

  const toggleSectionItem = (itemId) => {
    if (activeTab !== itemId) {
      setActiveTab(itemId);
    }
  };

  const settingSections = [
    {
      id: 1,
      label: "YOUR BUSINESS",
      items: [
        { id: 1, label: "Business details" },
        { id: 2, label: "Services" },
        { id: 3, label: "Locations" },
        { id: 4, label: "Staff" },
        { id: 5, label: "Resources" },
        { id: 6, label: "Calendar settings" },
        { id: 7, label: "Online bookings" },
        { id: 8, label: "Payment providers" },
        { id: 9, label: "Online payments" },
        { id: 10, label: "Add-ons" },
      ],
    },
    {
      id: 2,
      label: "STOCK",
      items: [
        { id: 1, label: "test 1" },
        { id: 2, label: "test 2" },
      ],
    },
    {
      id: 3,
      label: "SALES TOOLS",
      items: [
        { id: 1, label: "test 1" },
        { id: 2, label: "test 2" },
      ],
    },
    {
      id: 4,
      label: "NOTIFICATIONS",
      items: [
        { id: 1, label: "test 1" },
        { id: 2, label: "test 2" },
      ],
    },
    {
      id: 5,
      label: "CONSULT",
      items: [
        { id: 1, label: "test 1" },
        { id: 2, label: "test 2" },
      ],
    },
    {
      id: 6,
      label: "PROMOTE",
      items: [
        { id: 1, label: "test 1" },
        { id: 2, label: "test 2" },
      ],
    },
    {
      id: 7,
      label: "ADMINISTRATION",
      items: [
        { id: 1, label: "test 1" },
        { id: 2, label: "test 2" },
      ],
    },
  ];

  return (
    <React.Fragment>
      <div className="file-manager-sidebar border bg-white">
        <div className="p-3 d-flex flex-column h-100">
          <SimpleBar>
            <ul className="navbar-nav" id="navbar-nav">
              {settingSections.map((section, sectionIndex) => (
                <li key={sectionIndex} className="nav-item">
                  <NavLink
                    href="#"
                    className={classnames({ active: activeSection === section.id.toString() })}
                    onClick={() => toggleSection(section.id.toString())}
                  >
                    {section.label}
                  </NavLink>
                  <Collapse isOpen={activeSection === section.id.toString()}>
                    <ul className="nav nav-sm flex-column">
                      {section.items.map((item, itemKey) => (
                        <li className="nav-item" key={itemKey} onClick={() => toggleSectionItem(item.id.toString())}>
                          <Link to="#" className="nav-link">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Collapse>
                </li>
              ))}
            </ul>
            {/* <div className="sidebar-background"></div> */}
          </SimpleBar>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SettingSidebar;
