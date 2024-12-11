import React, { useEffect, useState, useCallback } from "react";

// Redux
import { settingsSelector } from "Selectors";
import { useSelector, useDispatch } from "react-redux";
import { getSettingOptions } from "store/actions";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { FieldComponent } from "Components/Common";

import { Link } from "react-router-dom";

// Components
import SettingSidebar from "./SettingSidebar";
import BusinessDetails from "./BusinessDetails";
import BusinessLocations from "./BusinessLocations";
import CalendarSettings from "./CalendarSettings";
import { DeleteModal } from "Components/Common";
import { Container, TabPane } from "reactstrap";
import SimpleBar from "simplebar-react";
import { ToastContainer } from "react-toastify";

const Settings = () => {
  const dispatch: any = useDispatch();
  const { settingOptions } = useSelector(settingsSelector);

  useEffect(() => {
    dispatch(getSettingOptions());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState("2");

  const settingTabs = [
    { id: "1", label: "Business Details", component: BusinessDetails },
    { id: "2", label: "Business Locations", component: BusinessLocations },
    { id: "3", label: "Calendar Settings", component: CalendarSettings },
  ];

  useEffect(() => {
    document.title = `File Manager | ${settingOptions.appName} - React Admin & Dashboard Template`;
  }, [settingOptions.appName]);

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <div className="bg-gray">
        <Container fluid>
          <div className="d-lg-flex gap-1 p-1">
            <SettingSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="file-manager-content bg-white w-100 p-3 py-0 border">
              <SimpleBar className="mx-n3 pt-4 px-4 file-manager-content-scroll overflow-x-hidden overflow-y-auto">
                {settingTabs.map(
                  (tab, index) =>
                    activeTab === tab.id && (
                      <TabPane tabId={tab.id} key={index}>
                        <tab.component />
                      </TabPane>
                    )
                )}
              </SimpleBar>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Settings;
