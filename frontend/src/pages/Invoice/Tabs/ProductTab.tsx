import React, { useState, useCallback } from "react";
import ProductTabModal from "./ProductTabModal";
import { Product, ProductTabProps } from "../InvoiceInterfaces"; // Adjust the path as necessary

const ProductTab: React.FC<ProductTabProps> = ({ products, staff, productList, setProductList }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  const groupProductsByCategory = (products: Product[]) => {
    return products.reduce((acc: Record<string, Product[]>, product: Product) => {
      const categoryName = product.category || "Others";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(product);
      return acc;
    }, {});
  };
  const productsByCategory = groupProductsByCategory(products);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      // setLead("");
    } else {
      setModal(true);
    }
  }, [modal]);

  const handleProductSelectionClick = (product: Product) => {
    setSelectedProduct(product);
    setModal(true);
  };

  return (
    <React.Fragment>
      <div>
        <ProductTabModal
          modal={modal}
          setModal={setModal}
          toggle={toggle}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          productList={productList}
          staff={staff}
          setProductList={setProductList}
        />

        {Object.keys(productsByCategory).length ? (
          Object.entries(productsByCategory).map(([categoryName, products]) => (
            <div className="sale__product-category" key={categoryName}>
              <div className="sale__product-category-products">
                <div className="sale__label">
                  <h3>{categoryName}</h3>
                </div>
                <div className="sale__product-items" data-testid="sale__product-item">
                  {products.map((product, index) => (
                    <div className="sale__product " key={index} onClick={() => handleProductSelectionClick(product)}>
                      <div className="sale__product-card sale__card ">
                        <div className="sale__product-card-inner">
                          <div className="sale__product-thumb">
                            <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M20.883 5.076A5.02 5.02 0 0015.97 1h0a5.017 5.017 0 00-4.9 4.05M25.398 9H6.583a1.866 1.866 0 00-1.914 1.542l-2.666 18.55a1.81 1.81 0 001.915 1.905h24.146a1.808 1.808 0 001.914-1.904l-2.666-18.551a1.866 1.866 0 00-1.913-1.543z"
                                stroke="#B1B9BE"
                                stroke-width="1.5"
                                fill="none"
                                fill-rule="evenodd"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                          </div>
                          <div className="sale__product-details">
                            <div className="sale__product-name">
                              <span>{product.name} </span>
                            </div>
                            <div className="sale__product-price">
                              <span>{product.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Products To Show</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProductTab;
