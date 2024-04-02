import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TabContent, TabPane } from "reactstrap";
import { appointmentsSelector } from "Selectors";

// Components
import AddingColumnNav from "./AddingColumnNav";
import AddingTabItems from "./AddingTabItems";
import AddingTabCredit from "./AddingTabICredit";
import AddingTabAppointment from "./AddingTabAppointment";

const InvoiceAddingColumn = ({ invoiceItemList, setInvoiceItemList }) => {
  const { services, products, packages, vouchers, staff } = useSelector(appointmentsSelector);
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const tabConfig = [
    { tabId: "1", itemType: "service", items: services, itemList: invoiceItemList?.serviceList },
    { tabId: "2", itemType: "product", items: products, itemList: invoiceItemList?.productList },
    { tabId: "3", itemType: "package", items: packages, itemList: invoiceItemList?.packageList },
    { tabId: "4", itemType: "voucher", items: vouchers, itemList: invoiceItemList?.voucherList },
  ];

  return (
    <React.Fragment>
      <div className="sale__adding-col">
        {/* Invoice Navigations */}
        <AddingColumnNav activeTab={activeTab} onTabClick={toggleTab} />

        {/* Invoice Content */}

        <TabContent activeTab={activeTab}>
          {/* Tabs for Services, Packages, Products, and Vouchers */}
          {tabConfig.map(({ tabId, itemType, items, itemList }) => (
            <TabPane tabId={tabId} key={tabId}>
              <div className={`sale__items-${itemType === "service" ? "list" : "grid"}`}>
                <AddingTabItems
                  items={items}
                  staff={staff}
                  itemTypeList={itemList}
                  setInvoiceItemList={setInvoiceItemList}
                  itemType={itemType}
                />
              </div>
            </TabPane>
          ))}
          <TabPane tabId="5">
            <AddingTabCredit />
          </TabPane>
          <TabPane tabId="6">
            <AddingTabAppointment />
          </TabPane>
        </TabContent>
      </div>
    </React.Fragment>
  );
};

export default InvoiceAddingColumn;
