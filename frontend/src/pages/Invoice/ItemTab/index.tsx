import React, { useState, useCallback } from "react";
import ItemModal from "./ItemModal";
import { Service, Package, Product, Voucher } from "../../../types/invoiceTypes";

type Item = Service | Product | Package | Voucher;

const ItemTab = ({ items, staff, itemTypeList, setInvoiceItemList, itemType }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modal, setModal] = useState(false);

  const groupItemsByCategory = (items: Item[]): Record<string, Item[]> => {
    return items.reduce((acc: Record<string, Item[]>, item: Item) => {
      const categoryName = (item as any).categoryName || (item as any).category || "Others";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(item);
      return acc;
    }, {});
  };

  const itemsByCategory = groupItemsByCategory(items);

  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const handleItemSelectionClick = (item) => {
    setSelectedItem(item);
    setModal(true);
  };

  return (
    <React.Fragment>
      <div className="sale__items sale__items--loaded">
        {Object.keys(itemsByCategory).length ? (
          Object.entries(itemsByCategory).map(([categoryName, items]) => (
            <div className="sale__item-category-container" key={categoryName}>
              <div className="sale__label">
                <h3>{categoryName}</h3>
              </div>
              <div className="sale__item-category-items">
                {items.map((item) => (
                  <div className="sale__item " key={item.id}>
                    <div
                      className="sale__card"
                      data-testid="sale__item-item"
                      onClick={() => handleItemSelectionClick(item)}
                    >
                      <div className="sale__item-row">
                        <div className="calendar-balloon__icon icon-size-md icon-color-green service-icon"></div>
                        <div className="sale__item-name">
                          {item.name}{" "}
                          {"duration" in item && <span className="sale__item-duration"> - {item.duration} mins</span>}
                        </div>
                        <div className="sale__item-price">{item.price} KD</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>Nothing to show</p>
        )}
      </div>
      <ItemModal
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        itemTypeList={itemTypeList}
        staff={staff}
        setInvoiceItemList={setInvoiceItemList}
        itemType={itemType}
      />
    </React.Fragment>
  );
};

export default ItemTab;
