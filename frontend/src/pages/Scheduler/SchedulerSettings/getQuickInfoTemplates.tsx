import { Internationalization, isNullOrUndefined } from "@syncfusion/ej2-base";
import { calendarSettings } from "./SchedulerSettings";
import { clientsSelector, servicesSelector, staffSelector } from "Selectors";

// Assuming these are imported or defined elsewhere in your application
// import { allStaff, services, clients, calendarSettings } from 'path-to-your-data';

// Assuming these are imported or defined elsewhere in your application
// import { allStaff, services, clients, calendarSettings } from 'path-to-your-data';

const getQuickInfoTemplates = (clients, services, allStaff) => {
  const instance = new Internationalization();

  const getEventDetails = (data) => {
    return (
      instance.formatDate(new Date(data["StartTime"]), { type: "date", skeleton: "long" }) +
      " (" +
      instance.formatDate(new Date(data["StartTime"]), { skeleton: "hm" }) +
      "-" +
      instance.formatDate(new Date(data["EndTime"]), { skeleton: "hm" }) +
      ")"
    );
  };

  const getBackGroundColor = (data) => {
    let color;
    if (calendarSettings.bookingColor === "Staffs" && !isNullOrUndefined(data["StaffId"])) {
      color = allStaff.find((item) => item["Id"] === data["StaffId"])?.["Color"] || "#7575ff";
    } else {
      color = services.find((item) => item["ServiceId"] === data["ServiceId"])?.["Color"];
    }
    return { backgroundColor: color, color: "#FFFFFF" };
  };

  const getClientName = (data) => {
    return clients.find((item) => item["Id"] === data["ClientId"])?.["name"] || "";
  };

  const getStaffName = (data) => {
    if (!isNullOrUndefined(data["StaffId"])) {
      return "Dr. " + allStaff.find((item) => item["Id"] === data["StaffId"])?.["name"] || "";
    } else {
      return services.find((item) => item["ServiceId"] === data["ServiceId"])?.["name"] || "";
    }
  };

  const header = (props) => {
    if (props.elementType === "cell") {
      return <></>;
    }
    return (
      <div className="quick-info-header">
        <div className="quick-info-header-content" style={getBackGroundColor(props)}>
          <div className="quick-info-title">Appointment Details</div>
          <div className="duration-text">{getEventDetails(props)}</div>
        </div>
      </div>
    );
  };

  const content = (props) => {
    if (props.elementType === "cell") {
      return <></>;
    }
    return (
      <div className="event-content">
        <div className="client-name-wrap">
          <label>Client Name:</label>
          <span>{getClientName(props)}</span>
        </div>
        <div className="staff-name-wrap">
          <label>{props.StaffId ? "Staff Name:" : "Service Name:"}</label>
          <span>{getStaffName(props)}</span>
        </div>
        <div className="notes-wrap">
          <label>Notes:</label>
          <span>{props.Symptoms}</span>
        </div>
      </div>
    );
  };

  return { header, content };
};

export { getQuickInfoTemplates };
