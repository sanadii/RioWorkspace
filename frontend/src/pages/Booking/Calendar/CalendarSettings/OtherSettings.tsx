const InteractionSettings = {
  dragRevertDuration: 500, // Time in milliseconds for an event to revert to its original position after dragging
  dragScroll: true, // Allows the calendar to auto-scroll when an event is dragged to the edge
  eventDragMinDistance: 5, // Minimum distance in pixels an event should be dragged before it is considered a drag
  longPressDelay: 1000, // Time in milliseconds for a touch to be considered a long press
  dropAccept: (draggable) => true, // Function to specify which draggables can be dropped onto the calendar
};

// Event Displaying Settings

// Select Options
const SelectAndClickSettings = {
  /* 
  Date Clicking & Selecting
  */
  // Allows a user to highlight multiple days or timeslots by clicking and dragging. default: true
  // selectable: true,
  // Whether to draw a “placeholder” event while the user is dragging.
  // I didnt understand, but it gives the time in the selection, keep it true
  // selectMirror: true,
  // Whether clicking elsewhere on the page will cause the current selection to be cleared.
  // unselectAuto: false,
  // A way to specify elements that will ignore the unselectAuto option.
  // unselectCancel: 'x',
  // Determines whether the selection can overlap with other events
  // selectOverlap: function(event) {
  //   console.log("event (selectOverlap): ", event)
  //   console.log("event.display (selectOverlap): ", event.display)
  //   return event.display === 'background';
  // },
  // Limits user selection to certain windows of time.
  // selectConstraint: null,
  // Exact programmatic control over where the user can select.
  // I think it can be used later to show warning when there is another client
  // selectAllow: () => true,
  // The minimum distance the user’s mouse must travel after a mousedown, before a selection is allowed.
  // selectMinDistance: 0,
  /* 
  CALLBACKS
  */
  //  Triggered when the user clicks on a date or a time.
  // dateClick: function (info) {
  //   alert("Clicked on: " + info.dateStr);
  //   alert("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
  //   alert("Current view: " + info.view.type);
  //   // change the day's background color just for fun
  //   info.dayEl.style.backgroundColor = "red";
  // },
  // Triggered when a date/time selection is made. See a demo.
  // select: function (info) {
  //   alert("Clicked on: " + info.dateStr);
  //   alert("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
  //   alert("Current view: " + info.view.type);
  //   // change the day's background color just for fun
  //   // info.dayEl.style.backgroundColor = "red";
  // },
  // Triggered when the current selection is cleared.
  // unselect:  function (info) {
  //   alert("Clicked on: " + info.dateStr);
  //   alert("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
  //   alert("Current view: " + info.view.type);
  //   // change the day's background color just for fun
  //   // info.dayEl.style.backgroundColor = "red";
  // },
  /* 
  METHODS
  */
  // A method for programmatically selecting a period of time. It accepts two different signatures:
  // Calendar::select
  // Calendar::unselect
};

export { InteractionSettings, SelectAndClickSettings };
