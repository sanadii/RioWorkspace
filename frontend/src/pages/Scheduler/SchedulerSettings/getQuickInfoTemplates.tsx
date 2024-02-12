import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { buttonClickActions } from "../SchedulerSettings";

const getQuickInfoTemplates = (scheduleObj, clientRef) => {
  const headerTemplate = (props) => {
    // console.log("scheduleObj: ", scheduleObj);
    // console.log("clientRef: ", clientRef);
    // console.log("props: ", props)

    const clientName = props.clientName;
    const clientMobile = props.clientMobile;

    return (
      <div className="quick-info-header">
        {/* <div className="quick-info-header-content" style={getBackGroundColor(props)}> */}
        <div className="quick-info-header-content h5 p-3 bg-grey">
          <div>
            <h5>
              <i className="ri-booklet-line"></i> {clientName}
            </h5>
          </div>
          <div>
            <h6>
              <i className=" ri-contacts-line"></i> {clientMobile}
            </h6>
          </div>
          {/* <div className="quick-info-title">Appointment Details</div>
          <div className="duration-text">{getEventDetails(props)}</div> */}
        </div>
      </div>
    );
  };

  const contentTemplate = (props) => {
    const formatTime = (date) => {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }).toLowerCase();
    };

    const startTime = formatTime(props.startTime);
    const endTime = formatTime(props.endTime);
    const services = props.services;

    if (!Array.isArray(services) || services.length === 0) {
      return <div>No services available</div>;
    }

    // if (props.elementType === "cell") {
    //   return <></>;
    // }

    return (
      <div className="event-content">
        {services.map((service) => (
          <div key={service.id}>
            <div>
              {" "}
              <b>{service.name}</b>
            </div>{" "}
            <p>
              {service.staff}: {startTime} - {endTime}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const footerTemplate = (props) => {
    return (
      <div className="quick-info-footer">
        {props.elementType == "cell" ? (
          <div className="cell-footer p-2">
            <ButtonComponent
              id="more-details"
              cssClass="e-flat"
              content="More Details"
              onClick={(e) => buttonClickActions(e, scheduleObj, props)}
            />
            <ButtonComponent
              id="add"
              cssClass="e-flat"
              content="Add"
              isPrimary={true}
              onClick={(e) => buttonClickActions(e, scheduleObj, clientRef)}
            />
          </div>
        ) : (
          <div className="event-footer">
            <div>
              <p>
                <ButtonComponent
                  id="edit"
                  // cssClass="e-flat"
                  content="Edit"
                  onClick={(e) => buttonClickActions(e, scheduleObj, clientRef)}
                />
                <ButtonComponent
                  id="reschedule"
                  cssClass="e-flat"
                  content="Reschedule"
                  isPrimary={true}
                  onClick={(e) => buttonClickActions(e, scheduleObj, clientRef)}
                />
                <ButtonComponent
                  id="book-next"
                  // cssClass="e-flat"
                  content="Book Next"
                  isPrimary={true}
                  onClick={(e) => buttonClickActions(e, scheduleObj, clientRef)}
                />
              </p>
            </div>
            <div>
              <ButtonComponent
                id="delete"
                // cssClass="e-flat"
                content="Delete"
                onClick={(e) => buttonClickActions(e, scheduleObj, clientRef)}
              />
              <ButtonComponent
                id="cancel"
                // cssClass="e-flat"
                content="Cancel"
                isPrimary={true}
                onClick={(e) => buttonClickActions(e, scheduleObj, clientRef)}
              />
              <ButtonComponent
                id="book-next"
                // cssClass="e-flat"
                content="Book Next"
                isPrimary={true}
                onClick={(e) => buttonClickActions(e, scheduleObj, clientRef)}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return { header: headerTemplate.bind(this), content: contentTemplate.bind(this), footer: footerTemplate.bind(this) };
};
// return { header, content, footer };

export { getQuickInfoTemplates };

// const getEventDetails = (data) => {
//   return (
//     instance.formatDate(new Date(data["StartTime"]), { type: "date", skeleton: "long" }) +
//     " (" +
//     instance.formatDate(new Date(data["StartTime"]), { skeleton: "hm" }) +
//     "-" +
//     instance.formatDate(new Date(data["EndTime"]), { skeleton: "hm" }) +
//     ")"
//   );
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
