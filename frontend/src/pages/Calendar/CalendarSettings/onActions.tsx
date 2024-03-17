import { useDispatch } from "react-redux";
import { addAppointment } from "store/actions";

// onActions.js
export const onActions = (dispatch) => ({
  onDrag: (event) => {
    event.preventDefault();
  },

  onDrop: (event) => {
    const date = event.date;
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMin = currentDate.getMinutes();
    const currentSec = currentDate.getSeconds();
    const modifiedDate = new Date(year, month, day, currentHour, currentMin, currentSec);

    const draggedEl = event.draggedEl;
    const draggedElClass = draggedEl.className;
    if (draggedEl.classList.contains("external-event") && draggedElClass.indexOf("fc-event-draggable") === -1) {
      const modifiedData = {
        id: Math.floor(Math.random() * 1000),
        title: draggedEl.innerText,
        start: modifiedDate,
        className: draggedEl.className,
      };
      dispatch(addAppointment(modifiedData));
    }
  },
});
