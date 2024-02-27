import React from "react";
import { Card, CardHeader } from "reactstrap";

const SummaryItemList = ({ title, invoiceItemList, onItemClick, iconPath }) => {
  return (
    <div className="sale__card">
      <div className="sale__category">
        <h4 className="sale__category-name">{title}</h4>
      </div>
      {invoiceItemList.map((item, index) => (
        // Move the key to this div
        <div className="sale__item sale__item-confirmed" key={index} onClick={() => onItemClick(item, index)}>
          <div className="sale__item-row">
            <div className="sale__item-left">
              <h5 className="sale__item-name">{item.name}</h5>
            </div>
            <div className="sale__item-right">
              <div className="sale__item-price">
                <div className="sale__item-price">{item.price} KD</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryItemList;
