import React from "react";
import { configureStore } from "../../../store";
import { Provider } from 'react-redux';

import { EditorClientComponent } from "./EditorClientComponent";
import { EditorServiceComponent } from "./EditorServiceComponent";
import { EditorProductComponent } from "./EditorProductComponent";
import { EditorPackageComponent } from "./EditorPackageComponent";
import { EditorStatusComponent } from "./EditorStatusComponent";

const EditorComponent = ({
  args,
  services,
  staff,
  clientRef,
  serviceRef,
  productRef,
  packageRef,
  statusRef,
}) => {
  return (
    <Provider store={configureStore({})}>

    <React.Fragment>
      <EditorClientComponent args={args} clientRef={clientRef} />

      <EditorServiceComponent args={args} services={services} staff={staff} serviceRef={serviceRef} />

      <EditorProductComponent productRef={productRef} />

      <EditorPackageComponent packageRef={packageRef} />

      <EditorStatusComponent statusRef={statusRef} />
    </React.Fragment>
    </Provider>
  );
};

export default EditorComponent;