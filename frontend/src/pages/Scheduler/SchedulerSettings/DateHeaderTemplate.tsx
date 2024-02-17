import React from "react";
import { Internationalization } from "@syncfusion/ej2-base";

// Header
const intl = new Internationalization();

const getFormattedDate = (value: Date): string => intl.formatDate(value, { format: 'E dd MMM' });

export const DateHeaderTemplate = (props: any): React.JSX.Element => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {getFormattedDate(props.date)} <i className="ri-time-line" style={{ marginLeft: '5px' }}></i>
    </div>
  );
};
