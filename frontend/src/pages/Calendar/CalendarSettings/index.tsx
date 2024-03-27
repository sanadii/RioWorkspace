// FullCalendarOptions.js
import { useDispatch } from "react-redux";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

// import { onActions } from "./useCalendarActions";

// Setting Imports
import {
  plugins,
  CalendarSettings,
  ThemeSettings,
  BusinessHours,
  EventDurationAndHeaders,
} from "./GeneralSettings";

import { ToolbarSettings } from "./CalendarToolbar/ToolbarSettings";
import { useCalendarToolbar } from "./CalendarToolbar";
import { CalendarToolbar } from "./CalendarToolbar";

import { viewOptions } from "./ViewSettings";
import SlotRenderHooks from "./SlotRenderHooks";
import { EventRenderHooks, EventDisplaySettings } from "./EventOptions";
import { InteractionSettings, SelectAndClickSettings } from "./OtherSettings";
import { DaySettings } from "./DaySettings";
import { WeekNumberSettings, WeekTextSettings } from "./WeekSettings";
import { DragAndDrop } from "./DragAndDrop";

// Hooks
import useCalendarEventHandlers from "./EventOptions/useCalendarEventHandlers";

const useFullCalendarSettings = () => {
  const dragAndDropSettings = DragAndDrop();
  const toolbarSettings = CalendarToolbar();
  // const { handleEventResize, handleEventDrag } = useCalendarEventHandlers();
  const { customButtons } = useCalendarToolbar();

  // Define other settings and configurations for FullCalendar
  const fullCalendarOptions = {
    plugins,
    customButtons,
    ...CalendarSettings,
    // ...toolbarSettings,
    // View Settings
    ...viewOptions,
    // Event Settings
    ...EventDisplaySettings,
    ...EventRenderHooks,
    //
    ...ThemeSettings,
    ...ToolbarSettings,
    ...BusinessHours,

    ...SelectAndClickSettings,
    // ...onActions,
    ...dragAndDropSettings, // Spread the DragAndDrop settings
    // ...EventDurationAndHeaders,
    // ...WholeDaySettings,

    // // Hooks
    // ...DayHeaderRenderHooks,
    // ...DayCellRenderHooks,

    // ...TimeAndLocaleSettings,
    // ...InteractionSettings,
    // ...WeekNumberSettings,

    // ...WeekTextSettings,

    ...SlotRenderHooks,

    // ...dayEventLimits,
    // ...dayDimensions,
    // ...AllDaySettings,

    // ...DateRangeSeparatorOptions,

    // Hooks
    // eventResize: { handleEventResize },
    // eventDrop: { handleEventDrag },
  };

  return fullCalendarOptions;
};

export default useFullCalendarSettings;
