import React from "react";
import { EditorClientComponent } from "./EditorClientComponent";
import { EditorServiceComponenet } from "./EditorServiceComponenet";
import { EditorProductComponent } from "./EditorProductComponent";
import { EditorPackageComponent } from "./EditorPackageComponent";
import { EditorStatusComponent } from "./EditorStatusComponent";

const EditorComponent = ({
  args,
  clients,
  services,
  staff,
  clientRef,
  serviceRef,
  productRef,
  packageRef,
  statusRef,
}) => {
  return (
    <React.Fragment>
      <EditorClientComponent args={args} clients={clients} clientRef={clientRef} />

      <EditorServiceComponenet args={args} services={services} staff={staff} serviceRef={serviceRef} />

      <EditorProductComponent productRef={productRef} />

      <EditorPackageComponent packageRef={packageRef} />

      <EditorStatusComponent statusRef={statusRef} />
    </React.Fragment>
  );
};

export default EditorComponent;
