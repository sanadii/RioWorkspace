import React, { useState, useCallback } from "react";
import ServiceTabModal from "./ServiceTabModal";
import { Service, ServiceTabProps } from "../InvoiceInterfaces"; // Adjust the path as necessary


const ServiceTab: React.FC<ServiceTabProps> = ({ services, staff, serviceList, setServiceList }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modal, setModal] = useState<boolean>(false);


  const groupServicesByCategory = (services: Service[]) => {
    return services.reduce((acc: Record<string, Service[]>, service: Service) => {
      const categoryName = service.categoryName || "Others";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(service);
      return acc;
    }, {});
  };
  const servicesByCategory = groupServicesByCategory(services);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      // setLead("");
    } else {
      setModal(true);
    }
  }, [modal]);

  const handleServiceSelectionClick = (service: Service) => {
    setSelectedService(service);
    setModal(true);
  };

  return (
    <React.Fragment>
      <div>
        <ServiceTabModal
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        serviceList={serviceList}
        staff={staff}
        setServiceList={setServiceList}
        />

        {Object.keys(servicesByCategory).length ? (
          Object.entries(servicesByCategory).map(([categoryName, services]) => (
            <div className="sale__service-category" key={categoryName}>
              <h3>{categoryName}</h3>
              <div className="sale__service-category-services">
                {services.map((service, index) => (
                  <div
                    className="sale__service sale__card"
                    data-testid="sale__service-item"
                    key={index}
                    onClick={() => handleServiceSelectionClick(service)}
                  >
                    <div className="sale__service-row">
                      <div className="sale__service-details">
                        <div className="sale__service-name">
                          {service.name} <span> - {service.duration} mins</span>
                        </div>
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
    </React.Fragment>
  );
};

export default ServiceTab;
