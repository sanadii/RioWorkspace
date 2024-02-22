import React, { useState, useCallback } from "react";
import { Card, CardHeader } from "reactstrap";
import { Service, Package, Product } from "./InvoiceInterfaces"; // Adjust the path as necessary
import SummaryServiceModal from "./SummaryServiceModal";
import SummaryPackageModal from "./SummaryPackageModal";
import SummaryProductModal from "./SummaryProductModal";

import { SummaryProps } from "./InvoiceInterfaces"; // Adjust the path as necessary

const Summary: React.FC<SummaryProps> = ({
  appointment,
  client,
  staff,
  services,
  packages,
  products,
  serviceList,
  packageList,
  productList,
  setServiceList,
  setPackageList,
  setProductList,
  discountOptions,
}) => {
  console.log("serviceList:", serviceList);

  const appointmentStartTime = appointment.startTime;
  const clientName = appointment.client?.name;
  const clientMobile = appointment.client?.mobile;

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleServiceSelectionClick = (service: Service, index: number) => {
    setSelectedService(service);
    setSelectedIndex(index); // Set the index of the selected service
    setModal(true);
  };

  const handlePackageSelectionClick = (servicePackage: Package, index: number) => {
    setSelectedPackage(servicePackage);
    setSelectedIndex(index); // Set the index of the selected service
    setModal(true);
  };

  const handleProductSelectionClick = (product: Product, index: number) => {
    setSelectedProduct(product);
    setSelectedIndex(index); // Set the index of the selected service
    setModal(true);
  };
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      // setLead("");
    } else {
      setModal(true);
    }
  }, [modal]);

  return (
    <React.Fragment>
      <div className="sale__summary">
        <SummaryServiceModal
          modal={modal}
          setModal={setModal}
          toggle={toggle}
          selectedService={selectedService}
          serviceList={serviceList}
          staff={staff}
          setServiceList={setServiceList}
          selectedIndex={selectedIndex}
          discountOptions={discountOptions}
        />

        <SummaryPackageModal
          modal={modal}
          setModal={setModal}
          toggle={toggle}
          selectedPackage={selectedPackage}
          packageList={packageList}
          staff={staff}
          setPackageList={setPackageList}
          selectedIndex={selectedIndex}
          discountOptions={discountOptions}
        />

        <SummaryProductModal
          modal={modal}
          setModal={setModal}
          toggle={toggle}
          selectedProduct={selectedProduct}
          productList={productList}
          staff={staff}
          setProductList={setProductList}
          selectedIndex={selectedIndex}
          discountOptions={discountOptions}
        />
        <div className="sale__summary-customer">
          <div className="sale__customer">
            <div>
              <div className="sale__customer-picker ">
                <div className="sale__customer-picker-heading sale__heading--domaine">
                  <div className="sale__customer-picker-heading-text">Select client</div>
                </div>
                <div className="sale__customer-picker-selected">
                  <div className="sale__customer-picker-selected-details">
                    <div className="sale__customer-picker-selected-name">
                      <span className="sale__customer-picker-customer-name">{clientName} </span>
                    </div>
                    <div className="sale__customer-picker-selected-phone">+{clientMobile}</div>
                  </div>
                  <div className="sale__customer-picker-selected-remove" data-testid="sale__customer-remove-button">
                    ×
                  </div>
                </div>
              </div>
            </div>
            <div className="sale__customer-selected">
              <div className="sale__customer-balances"></div>
            </div>
          </div>
        </div>

        <div className="sale__summary-items sale__summary-items--staff">
          <div className="sale__items-group-title">
            Appointment -<span className="sale__items-group-start-date sale__label">{appointmentStartTime}</span>
          </div>
          {serviceList && (
            <>
              <CardHeader className="align-items-center d-flex border-bottom-dashed">
                <h4 className="card-title mb-0 flex-grow-1">Services</h4>
              </CardHeader>

              <div className="sale__service ">
                {serviceList.map((service, index) => (
                  <div
                    className="sale__service-row d-flex align-items-center key={index}"
                    onClick={() => handleServiceSelectionClick(service, index)}
                  >
                    {" "}
                    <div className="sale__item-icon">
                      <div className=" icon-module_medium__1gKXO icon-module_streamline__13d-J">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11.75 9.75h8.5a2 2 0 012 2v8.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-8.5a2 2 0 012-2zm1 .75v11"
                            stroke="#1BBC9D"
                            stroke-width="1.5"
                            fill="none"
                            fill-rule="evenodd"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <h5 className="sale__item-name">{service.name}</h5>
                    <div className="sale__item-price">{service.price} KD</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {packageList && (
            <>
              <CardHeader className="align-items-center d-flex border-bottom-dashed">
                <h4 className="card-title mb-0 flex-grow-1">Packages</h4>
              </CardHeader>

              <div className="sale__package ">
                {packageList.map((servicePackage, index) => (
                  <div
                    className="sale__package-row d-flex align-items-center key={index}"
                    onClick={() => handlePackageSelectionClick(servicePackage, index)}
                  >
                    {" "}
                    <div className="sale__item-icon">
                      <div className=" icon-module_medium__1gKXO icon-module_streamline__13d-J">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11.75 9.75h8.5a2 2 0 012 2v8.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-8.5a2 2 0 012-2zm1 .75v11"
                            stroke="#1BBC9D"
                            stroke-width="1.5"
                            fill="none"
                            fill-rule="evenodd"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <h5 className="sale__item-name">{servicePackage.name}</h5>
                    <div className="sale__item-price">{servicePackage.price} KD</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {productList && (
            <>
              <CardHeader className="align-items-center d-flex border-bottom-dashed">
                <h4 className="card-title mb-0 flex-grow-1">Products</h4>
              </CardHeader>

              <div className="sale__product ">
                {productList.map((product, index) => (
                  <div
                    className="sale__product-row d-flex align-items-center key={index}"
                    onClick={() => handleProductSelectionClick(product, index)}
                  >
                    {" "}
                    <div className="sale__item-icon">
                      <div className=" icon-module_medium__1gKXO icon-module_streamline__13d-J">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11.75 9.75h8.5a2 2 0 012 2v8.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-8.5a2 2 0 012-2zm1 .75v11"
                            stroke="#1BBC9D"
                            stroke-width="1.5"
                            fill="none"
                            fill-rule="evenodd"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <h5 className="sale__item-name">{product.name}</h5>
                    <div className="sale__item-price">{product.price} KD</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="sale__summary-actions">
          <div className="sale__summary-actions-more">
            <div className="sale__summary-options">
              <button className="sale__button-link sale__button-link--underlined" data-testid="sale__add-note-button">
                Add note
              </button>
              &nbsp;or&nbsp;
              <button className="sale__button-link sale__button-link--underlined" data-testid="sale__add-discount">
                discount
              </button>
            </div>
            <div className="sale__summary-tax">Tax K.D.0</div>
          </div>
          <div className="sale__summary-totals"></div>
          <button
            // variant="primary"
            // size="lg"
            // loading="false"
            data-testid="sale__checkout-button"
            className="sale__summary-checkout-button tui-button tui-button--lg tui-button--primary primary hydrated"
          >
            Checkout K.D.160
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Summary;
