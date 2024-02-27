import classnames from "classnames";
import { Nav, NavItem, NavLink } from "reactstrap";

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
    <div className="sale__adding-navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`sale__button-link sale__tab ${activeTab === tab.id ? "sale__tab--active" : ""}`}
          onClick={() => onTabClick(tab.id)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default InvoiceNav;
