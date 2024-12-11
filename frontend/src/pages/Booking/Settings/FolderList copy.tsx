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

const FolderList = ({ settingOptions }) => {
  // Map over settingOptions to create a new array with the desired structure
  const formattedOptions = settingOptions.map((option) => ({
    id: option.id,
    name: option.name,
    label: "Staff",
    type: "text",
    value: option.name,
  }));

  return (
    <div id="folder-list" className="mb-2">
      <Row className="justify-content-beetwen g-2 mb-3">
        <Col>
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0 me-2 d-block d-lg-none">
              <button type="button" className="btn btn-soft-success btn-icon btn-sm fs-16 file-menu-btn">
                <i className="ri-menu-2-fill align-bottom"></i>
              </button>
            </div>
            <div className="flex-grow-1">
              <h5 className="fs-16 mb-0">Folders</h5>
            </div>
          </div>
        </Col>
        <Col className="col-auto">
          <div className="d-flex gap-2 align-items-start">
            <select className="form-control" name="choices-single-default" id="file-type">
              <option value="">File Type</option>
              <option value="All" defaultValue="">
                All
              </option>
              <option value="Video">Video</option>
              <option value="Images">Images</option>
              <option value="Music">Music</option>
              <option value="Documents">Documents</option>
            </select>

            <button
              className="btn btn-primary text-nowrap create-folder-modal flex-shrink-0"
              // onClick={() => handleFolderClicks()}
            >
              <i className="ri-add-line align-bottom me-1"></i> Create Folders
            </button>
          </div>
        </Col>
      </Row>

      <Row id="folderlist-data">
        {formattedOptions.map((option) => (
          <div key={option.id}>
            <label>{option.label}: </label>
            <input type={option.type} value={option.value} />
          </div>
        ))}
      </Row>
    </div>
  );
};

export default FolderList;
