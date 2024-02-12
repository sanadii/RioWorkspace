import React, { useState } from "react";
import { configureStore } from "../../../store";
import { Provider } from "react-redux";

import { EditorClientComponent } from "./EditorClientComponent";
import { EditorServiceComponent } from "./EditorServiceComponent";
import { EditorProductComponent } from "./EditorProductComponent";
import { EditorPackageComponent } from "./EditorPackageComponent";
import { EditorStatusComponent } from "./EditorStatusComponent";

const EditorTemplate = ({
  args,
  services,
  staff,
  appointmentRef,
  clientRef,
  serviceRef,
  productRef,
  packageRef,
  statusRef,
}) => {
  return (
    <React.Fragment>
      <EditorClientComponent args={args} appointmentRef={appointmentRef} clientRef={clientRef} />

      <EditorServiceComponent args={args} services={services} staff={staff} serviceRef={serviceRef} />

      <EditorProductComponent productRef={productRef} />

      <EditorPackageComponent packageRef={packageRef} />

      <EditorStatusComponent statusRef={statusRef} />
    </React.Fragment>
  );
};

export default EditorTemplate;
