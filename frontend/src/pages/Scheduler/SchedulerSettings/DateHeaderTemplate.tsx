import React, { useEffect, useState, useRef } from "react";
import { Internationalization } from "@syncfusion/ej2-base";

// Header
const intl: Internationalization = new Internationalization();

const getDateHeaderDay = (value: Date): string => intl.formatDate(value, { skeleton: "E" });
const getDateHeaderDate = (value: Date): string => intl.formatDate(value, { skeleton: "d" });

export const DateHeaderTemplate = (props: any): React.JSX.Element => {
  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>{getDateHeaderDay(props.date)}</div>
      <div style={{ display: "flex", justifyContent: "center" }}>{getDateHeaderDate(props.date)}</div>
    </React.Fragment>
  );
};
