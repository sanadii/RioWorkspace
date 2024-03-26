// useCalendarEventHandlers.js
import { useDispatch } from "react-redux";
import { updateAppointment } from "store/actions";

const useCalendarEventHandlers = () => {
  const dispatch = useDispatch();

  const handleEventResize = (arg) => {
    console.log("handleEventResize", arg);
    const { id, start, end } = arg.event;
    const updatedAppointment = {
      id,
      start: start.toISOString(),
      end: end.toISOString(),
    };
    dispatch(updateAppointment(updatedAppointment));
  };

  const handleEventDrag = (arg) => {
    console.log("handleEventDrag", arg);
    const { id, start, end } = arg.event;
    const updatedAppointment = {
      id,
      start: start.toISOString(),
      end: end.toISOString(),
    };
    dispatch(updateAppointment(updatedAppointment));
  };

  return { handleEventResize, handleEventDrag };
};

export default useCalendarEventHandlers;
