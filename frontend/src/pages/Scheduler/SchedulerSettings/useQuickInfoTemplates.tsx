import { extend, Internationalization, isNullOrUndefined, closest } from "@syncfusion/ej2-base";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useButtonClickActions } from "../SchedulerActions";

const useQuickInfoTemplates = (scheduleObj) => {
  const currentAppointment = scheduleObj.current?.activeEventData?.event;
  console.log("currentAppointment: ", currentAppointment);
  console.log("currentAppointment: 2 ", scheduleObj.current?.activeEventData);
  console.log("currentAppointment: 3 ", scheduleObj.current?.activeEventData?.event);
  console.log("currentAppointment: ", currentAppointment);
  console.log("WHAT IS THE SCHEDULEQUICK?", scheduleObj);
  const intl = new Internationalization();

  const getHeaderTitle = (data) => {
    return data.elementType === "cell" ? "Add Appointment" : "Appointment Details";
  };
  const getHeaderDetails = (data) => {
    return (
      intl.formatDate(data.startTime, { type: "date", skeleton: "full" }) +
      " (" +
      intl.formatDate(data.startTime, { skeleton: "hm" }) +
      ")"
    );
  };

  const buttonClickActions = useButtonClickActions(scheduleObj);

  const headerTemplate = (props) => {
    console.log("headerTemplate scheduleObj: ", scheduleObj);
    // console.log("clientRef: ", clientRef);
    console.log(" headerTemplateprops: ", props);

    const clientName = props.client?.name;
    const clientMobile = props.client?.mobile;

    return (
      <h3 className="popover-title">
        <a
          className="fc-customer-name goto-customer"
          data-customer-id="70716693"
          title="View details"
          href="/customer/customers/70716693?tab=details"
        >
          {clientName}{" "}
        </a>
        &nbsp;
        <a
          className="customer-edit modal-open bln-close"
          title="Edit customer"
          href="/customer/customeredit/70716693?tab=details&amp;fromCalendar=true"
        >
          <i className="ri-edit-line"></i>
        </a>
        <a
          className="customer-edit modal-open bln-close"
          title="Send an SMS or email"
          href="/message/adhoccontactcustomer/70716693?bookingId=384951115"
        >
          <i className="ri-message-2-line"></i>
        </a>
        <a
          className="customer-edit bln-close print-booking"
          href="javascript:void(0);"
          title="Print appointment details"
          data-booking-group-id="306621923"
          data-booking-id="384951115"
        >
          <i className="ri-printer-fill"></i>
        </a>
        <a className="close bln-close">×</a>
        <p>
          <a href="tel:+965201068811086">
            <i className="ri-smartphone-line">&nbsp;</i>+{clientMobile}
          </a>
        </p>
      </h3>
    );
    // return (
    //   <div className="quick-info-header-content h5 p-3 bg-grey">
    //     <div className="quick-info-title">{getHeaderTitle(props)}</div>
    //     <div className="duration-text">{getHeaderDetails(props)}</div>

    //     {/* <div className="quick-info-header-content" style={getBackGroundColor(props)}> */}
    //     {props.elementType === "cell" ? (
    //       <></>
    //     ) : (
    //       <div>
    //         <div>

    //         </div>
    //         <div className="fc-event-body">
    //           <h6>
    //             <i className="ri-contacts-line"></i>
    //           </h6>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // );
  };

  const contentTemplate = (props) => {
    const formatTime = (date) => {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }).toLowerCase();
    };

    const startTime = formatTime(props.startTime);
    const endTime = formatTime(props.endTime);
    const services = props.services;

    return (
      <div className="">
        {props.elementType === "cell" ? (
          <div className="cell-footer p-2">
            <ButtonComponent id="add-busy-time" content="Add Busy Time" onClick={(e) => buttonClickActions(e)} />
            <ButtonComponent
              id="add"
              content="Add Appointment"
              isPrimary={true}
              onClick={(e) => buttonClickActions(e)}
            />
          </div>
        ) : (
          <div className="calendar-balloon__event-details">
            {services.map((service) => (
              <div key={service.id} className="calendar-balloon__service-entry">
                <div className="fc-event-body calendar-balloon__detail-line">
                  <div className="calendar-balloon__icon service-icon"></div>
                  <div>
                    {service.name.substring(0, 30)}
                    <span className="fc-price"> - {service.price} KD</span>
                  </div>
                </div>

                <div className="calendar-balloon__detail-line">
                  <div className="calendar-balloon__icon staff-icon"></div>
                  <div className="calendar-balloon__staff-time">{service.staff}</div>
                  <div className="calendar-balloon__icon time-icon"></div>
                  <div className="calendar-balloon__time">{startTime}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const footerTemplate = (props) => {
    return (
      <div className="quick-info-footer">
        {props.elementType === "cell" ? (
          <></>
        ) : (
          <div className="event-footer">
            <div className="calendar-balloon__action-buttons">
              <ButtonComponent
                id="edit"
                // cssClass="e-flat"
                content="Edit"
                onClick={(e) => buttonClickActions(e)}
              />
              <ButtonComponent
                id="reschedule"
                cssClass="e-flat"
                content="Reschedule"
                isPrimary={true}
                onClick={(e) => buttonClickActions(e)}
              />
              <ButtonComponent
                id="book-next"
                // cssClass="e-flat"
                content="Book Next"
                isPrimary={true}
                onClick={(e) => buttonClickActions(e)}
              />
            </div>
            <div className="calendar-balloon__action-buttons">
              <ButtonComponent
                id="delete"
                // cssClass="e-flat"
                content="Delete"
                onClick={(e) => buttonClickActions(e)}
              />

              <ButtonComponent
                id="decline"
                iconPosition= 'Left'
                iconCss= 'ri-close-line'
                content="Decline"
                cssClass="e-grey"
                onClick={(e) => buttonClickActions(e)}
              />
              <ButtonComponent
                id="cancel"
                cssClass="e-danger e-outline"
                content="Cancel"
                isPrimary={true}
                onClick={(e) => buttonClickActions(e)}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return {
    header: headerTemplate.bind(this),
    content: contentTemplate.bind(this),
    footer: footerTemplate.bind(this),
  };
};

export { useQuickInfoTemplates };

// };

// const getBackGroundColor = (data) => {
//   let color;
//   if (calendarSettings.bookingColor === "Staffs" && !isNullOrUndefined(data["StaffId"])) {
//     color = allStaff.find((item) => item["Id"] === data["StaffId"])?.["Color"] || "#7575ff";
//   } else {
//     color = services.find((item) => item["ServiceId"] === data["ServiceId"])?.["Color"];
//   }
//   return { backgroundColor: color, color: "#FFFFFF" };
// };

// const getClientName = (data) => {
//   return clients.find((item) => item["Id"] === data["ClientId"])?.["name"] || "";
// };

// const getStaffName = (data) => {
//   if (!isNullOrUndefined(data["StaffId"])) {
//     return "Dr. " + allStaff.find((item) => item["Id"] === data["StaffId"])?.["name"] || "";
//   } else {
//     return services.find((item) => item["ServiceId"] === data["ServiceId"])?.["name"] || "";
//   }
// };
