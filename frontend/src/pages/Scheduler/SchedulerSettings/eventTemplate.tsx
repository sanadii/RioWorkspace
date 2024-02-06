import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  closest,
  Browser,
  L10n,
  Internationalization,
  extend,
  isNullOrUndefined,
  createElement,
} from "@syncfusion/ej2-base";

const getBorderColor = (roomId: number, floorId: number): string => {
  const key: string = `${roomId}_${floorId}`;
  // return borderColor[key] || '#000';
  return "#000";
};

const SvgIcon = (props: Record<string, any>) => {
  return (
    <React.Fragment>
      <div className="subject" style={{ color: "#343A40" }}>
        {props.subject}
      </div>
      <div className="image">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Frame">
            <path
              id="Vector"
              d="M5.25 10.5C5.25 10.5 4.5 10.5 4.5 9.75C4.5 9 5.25 6.75 8.25 6.75C11.25 6.75 12 9 12 9.75C12 10.5 11.25 10.5 11.25 10.5H5.25ZM8.25 6C8.84674 6 9.41903 5.76295 9.84099 5.34099C10.2629 4.91903 10.5 4.34674 10.5 3.75C10.5 3.15326 10.2629 2.58097 9.84099 2.15901C9.41903 1.73705 8.84674 1.5 8.25 1.5C7.65326 1.5 7.08097 1.73705 6.65901 2.15901C6.23705 2.58097 6 3.15326 6 3.75C6 4.34674 6.23705 4.91903 6.65901 5.34099C7.08097 5.76295 7.65326 6 8.25 6ZM3.912 10.5C3.80082 10.2659 3.74537 10.0092 3.75 9.75C3.75 8.73375 4.26 7.6875 5.202 6.96C4.73182 6.81513 4.24196 6.74428 3.75 6.75C0.75 6.75 0 9 0 9.75C0 10.5 0.75 10.5 0.75 10.5H3.912ZM3.375 6C3.87228 6 4.34919 5.80246 4.70083 5.45083C5.05246 5.09919 5.25 4.62228 5.25 4.125C5.25 3.62772 5.05246 3.15081 4.70083 2.79917C4.34919 2.44754 3.87228 2.25 3.375 2.25C2.87772 2.25 2.40081 2.44754 2.04917 2.79917C1.69754 3.15081 1.5 3.62772 1.5 4.125C1.5 4.62228 1.69754 5.09919 2.04917 5.45083C2.40081 5.80246 2.87772 6 3.375 6Z"
              fill={props.color}
            />
          </g>
        </svg>
        <span style={{ color: "#343A40", marginRight: "4%" }}> {props.child + props.adult}</span>
        &nbsp;
        <span className="e-icons e-night">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Frame">
              <path
                id="Vector"
                d="M4.5 0.208724C4.57321 0.297683 4.61806 0.406553 4.62876 0.521266C4.63945 0.635979 4.6155 0.751263 4.56 0.852224C4.12639 1.64833 3.89995 2.54069 3.9015 3.44722C3.9015 6.46297 6.36 8.90497 9.39 8.90497C9.78525 8.90497 10.17 8.86372 10.5398 8.78497C10.6531 8.76043 10.7712 8.76982 10.8792 8.81197C10.9872 8.85412 11.0805 8.92716 11.1473 9.02197C11.2177 9.12056 11.2537 9.23968 11.2495 9.3608C11.2453 9.48192 11.2012 9.59826 11.124 9.69172C10.5358 10.4143 9.79369 10.9965 8.95188 11.3959C8.11007 11.7952 7.18974 12.0017 6.258 12.0002C2.8005 12.0002 0 9.21472 0 5.78272C0 3.19972 1.5855 0.984224 3.843 0.0452239C3.95545 -0.00230223 4.08029 -0.0120568 4.19876 0.0174256C4.31723 0.046908 4.42294 0.114035 4.5 0.208724Z"
                fill={props.color}
              />
            </g>
          </svg>
        </span>
        <span style={{ color: "#343A40" }}>{props.night}</span>
      </div>
    </React.Fragment>
  );
};

const instance: Internationalization = new Internationalization();

const getTimeString = (value: Date) => {
  return instance.formatDate(value, { skeleton: "hm" });
};

export const eventTemplate = (props) => {
  console.log("props:", props);
  return (
    <div className="template-wrap" style={{ background: props.SecondaryColor }}>
      <div className="subject" style={{ background: props.PrimaryColor }}>
        <strong>{props.clientName}</strong> {getTimeString(props.StartTime)}
      </div>
      <div className="time" style={{ background: props.PrimaryColor }}>
        {" "}
        {/* {getTimeString(props.StartTime)} - {getTimeString(props.EndTime)} */}
        <div>
          {props.services.map((service, index) => (
            <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
              <h6>
                {service.name}
                <span> - {service.price}</span>
              </h6>
            </div>
          ))}
        </div>
      </div>
      <div className="event-description">{props.Description}</div>
      <div className="footer" style={{ background: props.PrimaryColor }}></div>
    </div>
  );
};
// export const eventTemplate = (data: Record<string, any>): React.JSX.Element => {
//   console.log("data: ", data);
//   const imageColor: string = getBorderColor(data.Room, data.Floor);
//   return (
//     <div className="template-wrap">
//       <SvgIcon
//         color={imageColor}
//         subject={data.ClientName}
//         child={data.Child}
//         adult={data.Adults}
//         night={data.Nights}
//       />
//     </div>
//   );
// };
