import React, { useState, useCallback } from "react";
import PackageTabModal from "./PackageTabModal";
import { Package, PackageTabProps } from "../InvoiceInterfaces"; // Adjust the path as necessary

const PackageTab: React.FC<PackageTabProps> = ({ packages, staff, packageList, setPackageList }) => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  const groupPackagesByCategory = (packages: Package[]) => {
    return packages.reduce((acc: Record<string, Package[]>, servicePackage: Package) => {
      const categoryName = servicePackage.categoryName || "Others";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(servicePackage);
      return acc;
    }, {});
  };
  const packagesByCategory = groupPackagesByCategory(packages);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      // setLead("");
    } else {
      setModal(true);
    }
  }, [modal]);

  const handlePackageSelectionClick = (servicePackage: Package) => {
    setSelectedPackage(servicePackage);
    setModal(true);
  };

  return (
    <React.Fragment>
      <div>
        <PackageTabModal
          modal={modal}
          setModal={setModal}
          toggle={toggle}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
          packageList={packageList}
          staff={staff}
          setPackageList={setPackageList}
        />

        {Object.keys(packagesByCategory).length ? (
          Object.entries(packagesByCategory).map(([categoryName, packages]) => (
            <div className="sale__package-category" key={categoryName}>
              <div className="sale__package-category-packages">
                <div className="sale__label">
                  <h3>{categoryName}</h3>
                </div>
                <div className="sale__package-items" data-testid="sale__package-item">
                  {packages.map((servicePackage, index) => (
                    <div className="sale__package " key={index} onClick={() => handlePackageSelectionClick(servicePackage)}>
                      <div className="sale__package-card sale__card ">
                        <div className="sale__package-card-inner">
                          <div className="sale__package-thumb">
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
                          <div className="sale__package-details">
                            <div className="sale__package-name">
                              <span>{servicePackage.name} </span>
                            </div>
                            <div className="sale__package-price">
                              <span>{servicePackage.price}</span>
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
          <p>No Packages To Show</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default PackageTab;
