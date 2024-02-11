import { extend, Internationalization, isNullOrUndefined, closest } from '@syncfusion/ej2-base';
import { calendarSettings } from "./SchedulerSettings";
import { clientsSelector, servicesSelector, staffSelector } from "Selectors";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

// Assuming these are imported or defined elsewhere in your application
// import { allStaff, services, clients, calendarSettings } from 'path-to-your-data';

// Assuming these are imported or defined elsewhere in your application
// import { allStaff, services, clients, calendarSettings } from 'path-to-your-data';

const buttonClickActions = (e) => {
  let scheduleObj = useRef(null);

  const quickPopup = closest(e.target, '.e-quick-popup-wrapper');
  const getSlotData = () => {
      const addObj = {};
      addObj.Id = scheduleObj.current.getEventMaxID();
      addObj.Subject = isNullOrUndefined(titleObj.current.value) ? 'Add title' : titleObj.current.value;
      addObj.StartTime = new Date(scheduleObj.current.activeCellsData.startTime);
      addObj.EndTime = new Date(scheduleObj.current.activeCellsData.endTime);
      addObj.IsAllDay = scheduleObj.current.activeCellsData.isAllDay;
      addObj.Description = isNullOrUndefined(notesObj.current.value) ? 'Add notes' : notesObj.current.value;
      addObj.RoomId = eventTypeObj.current.value;
      return addObj;
  };
  if (e.target.id === 'add') {
      const addObj = getSlotData();
      scheduleObj.current.addEvent(addObj);
  }
  else if (e.target.id === 'delete') {
      const eventDetails = scheduleObj.current.activeEventData.event;
      let currentAction = 'Delete';
      if (eventDetails.RecurrenceRule) {
          currentAction = 'DeleteOccurrence';
      }
      scheduleObj.current.deleteEvent(eventDetails, currentAction);
  }
  else {
      const isCellPopup = quickPopup.firstElementChild.classList.contains('e-cell-popup');
      const eventDetails = isCellPopup ? getSlotData() : scheduleObj.current.activeEventData.event;
      let currentAction = isCellPopup ? 'Add' : 'Save';
      if (eventDetails.RecurrenceRule) {
          currentAction = 'EditOccurrence';
      }
      scheduleObj.current.openEditor(eventDetails, currentAction, true);
  }
  scheduleObj.current.closeQuickInfoPopup();
};

const getQuickInfoTemplates = (appointment) => {
  const instance = new Internationalization();

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


  const header = (props) => {
    console.log("props: ", props);

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
        <p>Edit - Reschedule - Book Next</p>
      </div>
    );
  };

  const content = (props) => {
    const formatTime = (date) => {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }).toLowerCase();
    };

    const startTime = formatTime(props.startTime);
    const endTime = formatTime(props.endTime);
    const clientName = props.clientName;
    const services = props.services;

    // if (props.elementType === "cell") {
    //   return <></>;
    // }

    const footerTemplate = (props) => {
      return (
        <div className="quick-info-footer">
          {props.elementType == "cell" ? (
            <div className="cell-footer">
              <ButtonComponent
                id="more-details"
                cssClass="e-flat"
                content="More Details"
                onClick={buttonClickActions.bind(this)}
              />
              <ButtonComponent
                id="add"
                cssClass="e-flat"
                content="Add"
                isPrimary={true}
                onClick={buttonClickActions.bind(this)}
              />
            </div>
          ) : (
            <div className="event-footer">
              <ButtonComponent id="delete" cssClass="e-flat" content="Delete" onClick={buttonClickActions.bind(this)} />
              <ButtonComponent
                id="more-details"
                cssClass="e-flat"
                content="More Details"
                isPrimary={true}
                onClick={buttonClickActions.bind(this)}
              />
            </div>
          )}
        </div>
      );
    };
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

  return { header, content };
};

export { getQuickInfoTemplates };
