import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";

interface InvoiceSidebarProps {
  client: any; // Define the type more specifically if possible
  startTime: any; // Define the type more specifically if possible
  serviceList: any;
  appointment: any;
}

const InvoiceSidebar: React.FC<InvoiceSidebarProps> = ({ appointment, client, startTime, serviceList }) => {
  console.log("serviceList:", serviceList);

  return ( 
    <React.Fragment>
      <h2>{appointment.client.name}</h2>
      <h6>{appointment.client.mobile}</h6>
      <h5>{appointment.startTime}</h5>

      <Card>
        {serviceList && (
          <>
            <CardHeader className="align-items-center d-flex border-bottom-dashed">
              <h4 className="card-title mb-0 flex-grow-1">Services</h4>
            </CardHeader>

            <CardBody>
              <SimpleBar data-simplebar style={{ height: "235px" }} className="mx-n3 px-3">
                <div className="vstack gap-3">
                  {serviceList.map((service, index) => (
                    <div key={index} className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h5 className="fs-13 mb-0">
                          <Link to="#" className="text-body d-block">
                            {service.name}
                          </Link>
                        </h5>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="d-flex align-items-center gap-1">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              type="button"
                              className="btn btn-icon btn-sm fs-16 text-muted dropdown"
                              tag="button"
                            >
                              <i className="ri-more-fill"></i>
                            </DropdownToggle>
                            <DropdownMenu>
                              <li>
                                <DropdownItem>
                                  <i className="ri-star-fill text-muted me-2 align-bottom"></i>Edit
                                </DropdownItem>
                              </li>
                              <li>
                                <DropdownItem>
                                  <i className="ri-delete-bin-5-fill text-muted me-2 align-bottom"></i>Delete
                                </DropdownItem>
                              </li>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SimpleBar>
            </CardBody>
          </>
        )}
      </Card>
    </React.Fragment>
  );
};

export default InvoiceSidebar;
