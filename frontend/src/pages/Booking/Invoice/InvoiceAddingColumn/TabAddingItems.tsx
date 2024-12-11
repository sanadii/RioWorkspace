import React from "react";
import { Service, Package, Product, Voucher } from "types/invoiceTypes";
type Item = Service | Product | Package | Voucher;

const TabAddingItems = ({ items, setModal, setSelectedItem, itemType }) => {
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

  const handleItemSelectionClick = (item, itemType) => {
    const selectedItem = { ...item, itemType }; // Spread the item's properties and add itemType
    setSelectedItem(selectedItem);
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

  const itemIcon = getEntryIconClassName(itemType);

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
                      className={`sale__card ${itemType !== "service" && "item-type-product"}`}
                      onClick={() => handleItemSelectionClick(item, itemType)}
                    >
                      <div className={`calendar-balloon__icon ${itemIcon} flex-shrink`} title="Date"></div>
                      <div className="sale__item-name">
                        {item.name}
                        {"duration" in item && <span className="sale__item-duration"> - {item.duration} mins</span>}
                      </div>
                      <div>{item.price}KD</div>
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
    </React.Fragment>
  );
};

export default TabAddingItems;
