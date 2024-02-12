import { closest } from "@syncfusion/ej2-base";
import { useDispatch } from "react-redux";
import { addAppointment, updateAppointment, deleteAppointment } from "store/actions";

// Define the structure of the event object
type AddObject = {
  id: number;
  clientName: string;
  clientMobile: string;
  startTime: Date;
  endTime: Date;
};

const useButtonClickActions = (scheduleObj, clientRef) => {
  const dispatch = useDispatch();

  const buttonClickActions = (e) => {
    if (!scheduleObj?.current) {
      console.error("Scheduler object is not defined.");
      return;
    }

    const quickPopup = closest(e.target, ".e-quick-popup-wrapper");

    // Extracts data for a new event or the active cell's data
    const getSlotData = () => {
      const currentEvent = scheduleObj.current.activeCellsData;
      if (!currentEvent) {
        console.error("No active cell data found.");
        return null;
      }

      return {
        id: 218, // Ensure this is set correctly, possibly dynamically
        clientName: currentEvent.clientName || "",
        clientMobile: "123", // Replace with actual logic to get mobile number
        startTime: new Date(currentEvent.startTime),
        endTime: new Date(currentEvent.endTime),
      };
    };

    // Acions
    // Handles the edit action

    const handleEditAction = (e, scheduleObj, clientRef, quickPopup, getSlotData) => {
      const activeEventData = scheduleObj.current.activeEventData;
      if (!activeEventData) {
        console.error("No active event data found.");
        return;
      }

      const currentEvent = activeEventData.event;
      clientRef.current = {
        id: currentEvent.id,
        clientName: currentEvent.clientName,
        clientMobile: currentEvent.clientMobile,
        startTime: new Date(currentEvent.startTime),
        endTime: new Date(currentEvent.endTime),
      };

      const isCellPopup = quickPopup.firstElementChild?.classList.contains("e-cell-popup");
      const eventDetails = isCellPopup ? getSlotData() : activeEventData.event;
      let currentAction = isCellPopup ? "Add" : "Save";
      if (eventDetails?.RecurrenceRule) {
        currentAction = "EditOccurrence";
      }

      scheduleObj.current.openEditor(eventDetails, currentAction, true);
    };

    // Handles the delete action
    const handleDeleteAction = (scheduleObj) => {
      const eventDetails = scheduleObj.current.activeEventData?.event;
      if (!eventDetails) {
        console.error("No active event data found for deletion.");
        return;
      }

      const { id } = eventDetails; // Assuming event object has an 'id' property

      // Dispatch the deleteAppointment action with the correct id
      dispatch(deleteAppointment(id));

      let currentAction = eventDetails.RecurrenceRule ? "DeleteOccurrence" : "Delete";
      scheduleObj.current.deleteEvent(eventDetails, currentAction);
    };

    // Handle different button actions
    switch (e.target.id) {
      case "edit":
        handleEditAction(e, scheduleObj, clientRef, quickPopup, getSlotData);
        break;
      case "add":
        const addObj = getSlotData();
        // if (addObj) scheduleObj.current.addEvent(addObj);
        break;
      case "delete":
        handleDeleteAction(scheduleObj);
        break;
      default:
        // Handle other actions or ignore
        break;
    }

    scheduleObj.current.closeQuickInfoPopup();
  };

  return buttonClickActions;
};

export { useButtonClickActions };
