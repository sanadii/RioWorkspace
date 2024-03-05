// Slot Render Hooks
// The horizontal time slots in timegrid view or the vertical datetime slots in timeline view.

// Label Hooks
// Where the date/time text is displayed.
// slotLabelClassNames - a ClassName Input
// slotLabelContent - a Content Injection Input
// slotLabelDidMount
// slotLabelWillUnmount

// Lane Hooks
// The long span of content next to the slot’s date/time text. In timegrid view, this is the horizontal space that passes under all of the days. In timeline view, this is the vertical space that passes through the resources.
// slotLaneClassNames - a ClassName Input
// slotLaneContent - a Content Injection Input
// slotLaneDidMount
// slotLaneWillUnmount

// Argument
// When the above hooks are specified as a function in the form function(arg), the arg is an object with the following properties:
// date - Date object
// text
// isPast
// isFuture
// isToday
// el - the <td> element. only available in slotLabelDidMount, slotLabelWillUnmount, slotLaneDidMount, and slotLaneWillUnmount
// level - only for slot labels, and only for timeline view when slotLabelFormat is specified as an array. Indicates which tier of the header is being rendered. 0 is the topmost.

const SlotRenderHooks = {
  // Slot Label Hooks
  // Class names generator for slot labels
  slotLabelClassNames: (arg) => "",

  // Content generator for slot labels
  slotLabelContent: (arg) => "",

  // Handler invoked when a slot label is mounted
  slotLabelDidMount: (arg) => {},

  // Handler invoked when a slot label is about to be unmounted
  slotLabelWillUnmount: (arg) => {},

  // Slot Lane Hook
  // Class names generator for slot lanes
  slotLaneClassNames: (arg) => "",

  // Content generator for slot lanes
  slotLaneContent: (arg) => "",

  // Handler invoked when a slot lane is mounted
  slotLaneDidMount: (arg) => {},

  // Handler invoked when a slot lane is about to be unmounted
  slotLaneWillUnmount: (arg) => {},
};

export default SlotRenderHooks;
