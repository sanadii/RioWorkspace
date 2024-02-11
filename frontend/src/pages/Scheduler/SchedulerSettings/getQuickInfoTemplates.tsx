import { extend, Internationalization, isNullOrUndefined, closest } from "@syncfusion/ej2-base";
import { calendarSettings } from "../SchedulerSettings";
import { clientsSelector, servicesSelector, staffSelector } from "Selectors";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

type AddObject = {
  id: number;
  clientName: string;
  clientMobile: Number;
  startTime: Date;
  endTime: Date;
};

const buttonClickActions = (e, scheduleObj, appointmentRef) => {
  const quickPopup = closest(e.target, ".e-quick-popup-wrapper");
  console.log("appointmentRef:", appointmentRef);
  console.log("123 scheduleObj: ", scheduleObj);
  const clientRef = appointmentRef.clientRef;

  const getSlotData = (): AddObject => {
    const addObj: AddObject = {
      id: scheduleObj.current.active.eventData.event.id,
      // Subject: isNullOrUndefined(titleObj.current?.value) ? 'Add title' : titleObj.current.value,
      clientName: scheduleObj.current.active.eventData.event.clientName,
      clientMobile: 123,
      startTime: new Date(scheduleObj.current.activeCellsData.startTime),
      endTime: new Date(scheduleObj.current.activeCellsData.endTime),
    };

    console.log("addObj: ", addObj)
    return addObj;
  };

  if (!scheduleObj || !scheduleObj.current || !scheduleObj.current.activeEventData) {
    console.error("scheduleObj or its properties are undefined.");
    return;
  }

  if (e.target.id === "add") {
    const addObj = getSlotData();
    scheduleObj.current.addEvent(addObj);
  } else if (e.target.id === "delete") {
    const eventDetails = scheduleObj.current.activeEventData.event;
    let currentAction = "Delete";
    if (eventDetails.RecurrenceRule) {
      currentAction = "DeleteOccurrence";
    }
    scheduleObj.current.deleteEvent(eventDetails, currentAction);
  } else {
    const isCellPopup = quickPopup.firstElementChild.classList.contains("e-cell-popup");
    const eventDetails = isCellPopup ? getSlotData() : scheduleObj.current.activeEventData.event;
    let currentAction = isCellPopup ? "Add" : "Save";
    if (eventDetails.RecurrenceRule) {
      currentAction = "EditOccurrence";
    }
    scheduleObj.current.openEditor(eventDetails, currentAction, true);
  }
  scheduleObj.current.closeQuickInfoPopup();
};

const getQuickInfoTemplates = (scheduleObj, appointmentRef) => {
  console.log("appointmentRef: ", appointmentRef);
  const headerTemplate = (props) => {
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
              onClick={(e) => buttonClickActions(e, scheduleObj, appointmentRef)}
            />
            <ButtonComponent
              id="add"
              cssClass="e-flat"
              content="Add"
              isPrimary={true}
              onClick={(e) => buttonClickActions(e, scheduleObj, appointmentRef)}
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
                  onClick={(e) => buttonClickActions(e, scheduleObj, appointmentRef)}
                />
                <ButtonComponent
                  id="reschedule"
                  cssClass="e-flat"
                  content="Reschedule"
                  isPrimary={true}
                  onClick={(e) => buttonClickActions(e, scheduleObj, appointmentRef)}
                />
                <ButtonComponent
                  id="book-next"
                  // cssClass="e-flat"
                  content="Book Next"
                  isPrimary={true}
                  onClick={(e) => buttonClickActions(e, scheduleObj, appointmentRef)}
                />
              </p>
            </div>
            <div>
              <ButtonComponent
                id="delete"
                // cssClass="e-flat"
                content="Delete"
                onClick={(e) => buttonClickActions(e, scheduleObj, appointmentRef)}
              />
              <ButtonComponent
                id="cancel"
                // cssClass="e-flat"
                content="Cancel"
                isPrimary={true}
                onClick={(e) => buttonClickActions(e, scheduleObj, appointmentRef)}
              />
              <ButtonComponent
                id="book-next"
                // cssClass="e-flat"
                content="Book Next"
                isPrimary={true}
                onClick={(e) => buttonClickActions(e, scheduleObj, appointmentRef)}
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
