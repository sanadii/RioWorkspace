import React, { useState, useCallback } from "react";
import ItemModal from "./ItemModal";
import { Service, Package, Product, Voucher } from "types/invoiceTypes";
type Item = Service | Product | Package | Voucher;

const AddingTabItems = ({ items, staff, itemTypeList, setInvoiceItemList, itemType }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modal, setModal] = useState(false);

  const groupItemsByCategory = (items: Item[]): Record<string, Item[]> => {
    if (!items) return {}; // Return an empty object if items are null or undefined

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

  const getEntryIconClassName = (itemType) => {
    switch (itemType) {
      case "service":
        return "service-icon";
      case "product":
        return "product-icon";
      case "package":
        return "package-icon";
      case "Voucher":
        return "voucher-icon";
      case "credit":
        return "credit-icon";
      default:
        return "";
    }
  };

  const entryIcon = getEntryIconClassName(itemType);

  return (
    <React.Fragment>
      <div className="sale__items sale__items--loaded">
        {Object.keys(itemsByCategory).length ? (
          Object.entries(itemsByCategory).map(([categoryName, items]) => (
            <div className="sale__item-category-container pb-3" key={categoryName}>
              <h4 className="card-title">{categoryName}</h4>
              <div className="sale__item-category-items">
                {items.map((item) => (
                  <div className="sale__item" key={item.id}>
                    <div
                      className="sale__card"
                      data-testid="sale__item-item"
                      onClick={() => handleItemSelectionClick(item)}
                    >
                      <div className="d-flex flex-grow-1 w-100">
                        <div className={`calendar-balloon__icon ${entryIcon} flex-shrink`} title="Date"></div>
                        <div className="flex-grow-1">
                          {item.name}
                          {"duration" in item && <span className="sale__item-duration"> - {item.duration} mins</span>}
                        </div>
                        <div className="flex-shrink">{item.price}KD</div>
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

export default AddingTabItems;
