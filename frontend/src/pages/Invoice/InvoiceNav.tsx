import classnames from "classnames";
import {Nav, NavItem, NavLink } from "reactstrap";

const InvoiceNav = ({ activeTab, onTabClick }) => {
  const tabs = [
    { id: "1", name: "Services" },
    { id: "2", name: "Products" },
    { id: "3", name: "Packages" },
    { id: "4", name: "Vouchers" },
    { id: "5", name: "Credit" },
    { id: "6", name: "Appointments" },
  ];

  return (
    <div className="sale__search-head bg-secondary-light">
      <Nav pills className="animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1" role="tablist">
        {tabs.map((tab) => (
          <NavItem key={tab.id} className="fs-14">
            <NavLink
              href={`#${tab.name.toLowerCase()}-tab`}
              className={classnames({ active: activeTab === tab.id })}
              onClick={() => onTabClick(tab.id)}
            >
              <h6 className="text-primary">{tab.name}</h6>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </div>
  );
};

export default InvoiceNav;
