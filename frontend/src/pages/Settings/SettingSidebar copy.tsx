import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormFeedback,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

import SimpleBar from "simplebar-react";

const SettingSidebar = () => {
  return (
    <React.Fragment>
      <div className="file-manager-sidebar border bg-white">
        <div className="p-3 d-flex flex-column h-100">
          <div className="mb-3">
            <h5 className="mb-0 fw-semibold">Business details</h5>
          </div>
          <SimpleBar className="mt-3 mx-n4 px-4 file-menu-sidebar-scroll">
            <ul className="list-unstyled file-manager-menu">
              <li>
                <a
                  data-bs-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="true"
                  aria-controls="collapseExample"
                >
                  <i className="ri-folder-2-line align-bottom me-2"></i>{" "}
                  <span className="file-list-link">My Drive</span>
                </a>
                <div className="collapse show" id="collapseExample">
                  <ul className="sub-menu list-unstyled">
                    <li>
                      <a href="#!">Business Details</a>
                    </li>
                    <li>
                      <a href="#!">Assets</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </SimpleBar>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SettingSidebar;
