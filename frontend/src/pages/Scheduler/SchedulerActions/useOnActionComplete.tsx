import { ActionEventArgs } from "@syncfusion/ej2-react-schedule";
import { useDispatch } from "react-redux";
import { addAppointment, updateAppointment, deleteAppointment } from "store/actions";
import { createElement, compile, extend } from "@syncfusion/ej2-base";

import { Popup } from "@syncfusion/ej2-popups";

const useOnActionComplete = (appointmentRef) => {
  const dispatch = useDispatch();

  let profilePopup: Popup;

  const onActionComplete = (args: ActionEventArgs): void => {
    if (args.requestType === "eventCreated") {
      const newEvent = {
        appointment: appointmentRef.current,
      };

      if (Array.isArray(args.addedRecords)) {
        args.addedRecords[0] = newEvent;
      }

      dispatch(addAppointment(newEvent));
    }

    // Toolbar Item Render
 
  };
  return onActionComplete;
};

export { useOnActionComplete };

// const onActionComplete = (args: ActionEventArgs): void => {
//   if (args.requestType === "eventCreated") {
//     // Manually construct the event data from refs or state
//     const newEvent = {
//       appointment: appointmentRef.current,
//     };

//     // Check if you can directly modify args.addedRecords
//     if (Array.isArray(args.addedRecords)) {
//       args.addedRecords[0] = newEvent;
//     }

//     // Dispatch the addAppointment action with the new event data
//     dispatch(addAppointment(newEvent));
//   }
// };
