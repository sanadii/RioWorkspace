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

const getBorderColor = (status: number): string => {
  const key: string = `${status}`;
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

const eventAppointmentStatusColor = (data: Record<string, any>): React.JSX.Element => {
  const imageColor: string = getBorderColor(data.status);
  return (
    <div className="template-wrap">
      <SvgIcon color={imageColor} subject={data.GuestName} child={data.Child} adult={data.Adults} night={data.Nights} />
    </div>
  );
};

const getTimeString = (value: Date) => {
  return instance.formatDate(value, { skeleton: "hm" });
};

export const eventTemplate = (props) => {
  console.log("props::: ", props);
  return (
    // <div className="template-wrap" style={{ background: props.SecondaryColor }}>
    //    <div className="subject" style={{ background: props.PrimaryColor }}>

    <div
      className="

    "
    >
      <div className="fc-event-content">
        <div className="fc-event-title">
          <b className="fc-customer-name tip-init"> {props.client.name}</b>
        </div>
        <div
          className="fc-event-notes"
          // style="color: #13846e"
        >
          <i className="fc-completed-icon tip-init" data-original-title="Appointment completed" data-placement="left">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
              <path
                fill="none"
                fill-rule="evenodd"
                stroke="#13846e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M14 2.5L7.703 12.625c-.283.455-.716.738-1.186.78-.47.04-.931-.167-1.266-.568L2 8.916"
              ></path>
            </svg>
          </i>
          <i className="fc-paid-icon tip-init" data-original-title="Invoice paid" data-placement="left">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
              <path
                fill="none"
                fill-rule="evenodd"
                stroke="#13846e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M15 10l-1.93 4.629a.667.667 0 0 1-.949.321L10 13.73m-4.806-3.578c.427.56 1.1.876 1.804.848C8.103 11 9 10.328 9 9.5s-.894-1.499-1.999-1.499C5.897 8.001 5 7.329 5 6.5 5 5.67 5.897 5 7.001 5a2.157 2.157 0 0 1 1.804.848M7 11.001V12m0-8v.999M7 15H2.333A1.333 1.333 0 0 1 1 13.667V2.333C1 1.597 1.597 1 2.333 1H9.29c.33 0 .646.121.891.341l2.377 2.133c.282.253.443.614.443.993V7"
              ></path>
            </svg>
          </i>
          <i className="fc-comment-icon tip-init" data-original-title="Comment or note" data-placement="left">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
              <path
                fill="none"
                fill-rule="evenodd"
                stroke="#13846e"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M1.932 7.515a6.528 6.528 0 0 0 .985 3.456L1 15l4.025-1.918a6.524 6.524 0 0 0 8.99-2.099 6.537 6.537 0 0 0-2.097-8.998A6.524 6.524 0 0 0 8.46 1a6.521 6.521 0 0 0-6.528 6.515z"
              ></path>
            </svg>
          </i>
        </div>
        <span>
          <i className="fc-new-customer">(new) &nbsp;</i> {getTimeString(props.startTime)}
        </span>

        {/* <div className="fc-event-body">Rinsage<span className="fc-price"> - K.D.28</span><br></div></div> */}

        <div className="fc-event-body">
          {props.services.map((service, index) => (
            <div key={service.id} className="fc-event-body" style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
              {service.name} -<span>{service.price}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="event-description">{props.Description}</div>
      <div className="footer" style={{ background: props.PrimaryColor }}></div>
      <div className="fc-event-bg"></div>
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
