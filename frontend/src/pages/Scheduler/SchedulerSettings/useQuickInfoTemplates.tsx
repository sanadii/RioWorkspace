import { extend, Internationalization, isNullOrUndefined, closest } from "@syncfusion/ej2-base";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useButtonClickActions } from "../SchedulerActions";

const useQuickInfoTemplates = (scheduleObj, clientRef) => {
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

  const buttonClickActions = useButtonClickActions(scheduleObj, clientRef);

  const headerTemplate = (props) => {
    // console.log("scheduleObj: ", scheduleObj);
    // console.log("clientRef: ", clientRef);
    // console.log("props: ", props)

    const clientName = props.clientName;
    const clientMobile = props.clientMobile;

    return (
      <div className="quick-info-header-content h5 p-3 bg-grey">
        <div className="quick-info-title">{getHeaderTitle(props)}</div>
        <div className="duration-text">{getHeaderDetails(props)}</div>

        {/* <div className="quick-info-header-content" style={getBackGroundColor(props)}> */}
        {props.elementType === "cell" ? (
          <></>
        ) : (
          <div>
            <div>
              <h5>
                <i className="ri-booklet-line"></i> {clientName}
              </h5>
            </div>
            <div>
              <h6>
                <i className="ri-contacts-line"></i> {clientMobile}
              </h6>
            </div>
          </div>
        )}
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

    return (
      <div className="event-content">
        {props.elementType === "cell" ? (
          <div className="cell-footer p-2">
            <ButtonComponent
              id="add-busy-time"
              content="Add Busy Time"
              onClick={(e) => buttonClickActions(e)}
            />
            <ButtonComponent
              id="add"
              content="Add Appointment"
              isPrimary={true}
              onClick={(e) => buttonClickActions(e)}
            />
          </div>
        ) : (
          <div>
            {services.map((service) => (
              <div key={service.id}>
                <div>
                  <b>{service.name}</b>
                </div>
                <p>
                  {service.staff}: {startTime} - {endTime}
                </p>
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
            <div>
              <p>
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
              </p>
            </div>
            <div>
              <ButtonComponent
                id="delete"
                // cssClass="e-flat"
                content="Delete"
                onClick={(e) => buttonClickActions(e)}
              />

              <ButtonComponent
                id="decline"
                // cssClass="e-flat"
                content="Decline"
                isPrimary={true}
                onClick={(e) => buttonClickActions(e)}
              />
              <ButtonComponent
                id="cancel"
                // cssClass="e-flat"
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
