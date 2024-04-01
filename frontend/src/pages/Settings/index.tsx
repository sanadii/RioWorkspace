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
import { ToastContainer } from "react-toastify";
import { DeleteModal } from "Components/Common";
import SimpleBar from "simplebar-react";

//redux
import { settingsSelector } from "Selectors";

import { useSelector, useDispatch } from "react-redux";

//import action
import { getSettingOptions } from "store/actions";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { FieldComponent } from "Components/Common";

import { Link } from "react-router-dom";

import SettingSidebar from "./SettingSidebar";
import FolderList from "./FolderList";
import BusinessDetails from "./BusinessDetails";
const Settings = () => {
  document.title = "File Manager | Velzon - React Admin & Dashboard Template";

  const { settingOptions } = useSelector(settingsSelector);

  const dispatch: any = useDispatch();

  // const [settingOptions, setSettingOptions] = useState<any>(null);

  useEffect(() => {
    dispatch(getSettingOptions());
  }, [dispatch]);

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <div className="bg-gray">
        <Container fluid>
          <div className="d-lg-flex gap-1 p-1">
            <SettingSidebar />

            <div className="file-manager-content bg-white w-100 p-3 py-0 border">
              <div className="mx-n3 pt-4 px-4 file-manager-content-scroll overflow-x-hidden overflow-y-auto">
                {/* <BusinessDetails settingOptions={settingOptions} /> */}
                <BusinessDetails />
                <div>
                  <div className="d-flex align-items-center mb-3">
                    <h5 className="flex-grow-1 fs-16 mb-0" id="filetype-title">
                      Recent File
                    </h5>
                    <div className="flex-shrink-0">
                      {/* <button className="btn btn-primary createFile-modal" onClick={() => handleFileClicks()}>
                        <i className="ri-add-line align-bottom me-1"></i> Create File
                      </button> */}
                    </div>
                  </div>

                  <ul id="pagination" className="pagination pagination-lg"></ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Settings;
