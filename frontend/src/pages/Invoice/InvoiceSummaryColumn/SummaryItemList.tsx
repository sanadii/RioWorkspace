import React from "react";
import { Card, CardHeader } from "reactstrap";

const SummaryItemList = ({ activeInvoice, invoiceItemList, handleItemSelectionClick }) => {
  const appointmentStartTime = activeInvoice.startTime;

  // const itemTypes = [];

  // // Add appointments with their services
  // invoiceItemList.serviceList.forEach((appointment) => {
  //   itemTypes.push({
  //     title: `Appointment: ${appointment.title} - ${appointment.start}`, // Format the date as needed
  //     list: appointment.services, // This will include all services for the appointment
  //     iconPath: "Icon Path for Appointment", // Replace with actual icon path
  //   });
  // });

  // console.log(itemTypes); //

  // // Add packages, products, and vouchers
  // itemTypes.push(
  const itemTypes = [
    {
      title: "Services",
      list: invoiceItemList.serviceList,
      iconPath: "M11.75 9.75h8.5a2 2 0 012 2v8.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-8.5a2 2 0 012-2zm1 .75v11",
    },
    {
      title: "Packages",
      list: invoiceItemList.packageList,
      iconPath: "M11.75 9.75h8.5a2 2 0 012 2v8.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-8.5a2 2 0 012-2zm1 .75v11",
    },
    {
      title: "Products",
      list: invoiceItemList.productList,
      iconPath: "M11.75 9.75h8.5a2 2 0 012 2v8.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-8.5a2 2 0 012-2zm1 .75v11",
    },
    {
      title: "Vouchers",
      list: invoiceItemList.voucherList,
      iconPath: "M11.75 9.75h8.5a2 2 0 012 2v8.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-8.5a2 2 0 012-2zm1 .75v11",
    },
  ];
  // );

  console.log("itemTypes: ", itemTypes);
  return (
    <div className="sale__summary-items">
      <div className="sale__summary-appointment"></div>
      {itemTypes
        .filter((type) => type.list && type.list.length > 0) // Filter out types with empty or undefined lists
        .map((type, typeIndex) => (
          <div key={typeIndex} className="sale__category-card">
            <div className="sale__category">
              <p className="sale__category-name bold text-primary">{type.title}</p>
            </div>
            {type.list.map((item, itemIndex) => (
              <div
                className="sale__item sale__item-confirmed"
                key={itemIndex}
                onClick={() => handleItemSelectionClick(item, itemIndex)}
              >
                <div
                  key={itemIndex}
                  className="sale__item-row"
                  onClick={() => handleItemSelectionClick(item, itemIndex)}
                >
                  <div className="sale__item-left">
                    <div className="sale__item-name">{item.name}</div>
                  </div>
                  <div className="sale__item-right">
                    <div className="sale__item-price">{item.unitPrice || item.price} KD</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default SummaryItemList;
