import React, { useState, useCallback } from "react";
import { Card, CardHeader } from "reactstrap";
import { Service } from "./InvoiceInterfaces"; // Adjust the path as necessary
import InvoiceSidbarServiceModal from "./InvoiceSidbarServiceModal";
import { InvoiceSidebarProps } from "./InvoiceInterfaces"; // Adjust the path as necessary

const InvoiceSidebar: React.FC<InvoiceSidebarProps> = ({
  appointment,
  client,
  staff,
  services,
  serviceList,
  setServiceList,
  discountOptions,
}) => {
  console.log("serviceList:", serviceList);

  const appointmentStartTime = appointment.startTime;
  const clientName = appointment.client?.name;
  const clientMobile = appointment.client?.mobile;


  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const handleServiceSelectionClick = (service: Service, index: number) => {
    setSelectedService(service);
    setSelectedIndex(index); // Set the index of the selected service
    setModal(true);
  };

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setModal(true);
  };

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
      <InvoiceSidbarServiceModal
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        serviceList={serviceList}
        staff={staff}
        setServiceList={setServiceList}
        selectedIndex={selectedIndex}
        discountOptions={discountOptions}
      />
      <Card>
        <h2>{clientName}</h2>
        <h6>{clientMobile}</h6>
        <h5>{appointmentStartTime}</h5>

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
      </Card>
    </React.Fragment>
  );
};

export default InvoiceSidebar;
