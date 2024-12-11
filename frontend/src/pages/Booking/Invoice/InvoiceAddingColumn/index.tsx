import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { TabContent, TabPane } from "reactstrap";
import { appointmentsSelector } from "Selectors";

// Components
import AddingColumnNav from "./InvoiceAddingNavigation";
import AddingTabItems from "./TabAddingItems";
import AddingTabCredit from "./TabAddingCredit";
import AddingTabAppointment from "./TabAddingAppointment";
import ItemModal from "./ItemModal";

const InvoiceAddingColumn = ({ invoiceItemList, setInvoiceItemList }) => {
  const { services, products, packages, vouchers, staff } = useSelector(appointmentsSelector);
  const [activeTab, setActiveTab] = useState("1");
  const [selectedItem, setSelectedItem] = useState(null);
  const [modal, setModal] = useState(false);

  console.log("invoiceItemList: ", invoiceItemList);
  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const tabConfig = [
    { tabId: "1", itemType: "service", items: services, itemList: invoiceItemList?.serviceList },
    { tabId: "2", itemType: "product", items: products, itemList: invoiceItemList?.productList },
    { tabId: "3", itemType: "package", items: packages, itemList: invoiceItemList?.packageList },
    { tabId: "4", itemType: "voucher", items: vouchers, itemList: invoiceItemList?.voucherList },
  ];

  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  return (
    <React.Fragment>
      <div className="sale__adding-col">
        {/* Invoice Navigations */}
        <AddingColumnNav activeTab={activeTab} onTabClick={toggleTab} />
        {/* Invoice Content */}
        <TabContent activeTab={activeTab}>
          {tabConfig.map(({ tabId, itemType, items }) => (
            <TabPane tabId={tabId} key={tabId}>
              <AddingTabItems items={items} setModal={setModal} itemType={itemType} setSelectedItem={setSelectedItem} />
            </TabPane>
          ))}
          <TabPane tabId="5">
            <AddingTabCredit />
          </TabPane>
          <TabPane tabId="6">
            <AddingTabAppointment />
          </TabPane>
        </TabContent>{" "}
      </div>

      <ItemModal
        modal={modal}
        toggle={toggle}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        staff={staff}
        setInvoiceItemList={setInvoiceItemList}
      />
    </React.Fragment>
  );
};

export default InvoiceAddingColumn;
