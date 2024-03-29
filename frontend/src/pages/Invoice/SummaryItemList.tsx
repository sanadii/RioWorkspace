import React from "react";
import { Card, CardHeader } from "reactstrap";

const SummaryItemList = ({ invoiceItemList, onItemClick }) => {
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

  return (
    <div className="sale__summary-items">
      {itemTypes
        .filter((type) => type.list && type.list.length > 0) // Filter out types with empty or undefined lists
        .map((type, typeIndex) => (
          <div key={typeIndex} className="sale__card">
            <div className="sale__category">
              <h4 className="sale__category-name">{type.title}</h4>
            </div>
            {type.list.map((item, itemIndex) => (
              <div
                className="sale__item sale__item-confirmed"
                key={itemIndex}
                onClick={() => onItemClick(item, itemIndex)}
              >
                <div className="sale__item-row">
                  <div className="sale__item-left">
                    <h5 className="sale__item-name">{item.name}</h5>
                  </div>
                  <div className="sale__item-right">
                    <div className="sale__item-price">{item.price} KD</div>
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
