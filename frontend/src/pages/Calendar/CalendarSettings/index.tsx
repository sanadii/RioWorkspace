// FullCalendarOptions.js
import { useDispatch } from "react-redux";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
// import { onActions } from "./useCalendarActions";

// Setting Imports
import {
  plugins,
  CalendarSettings,
  ToolbarSettings,
  ThemeSettings,
  BusinessHours,
  EventDurationAndHeaders,
} from "./GeneralSettings";
import { viewOptions } from "./ViewSettings";
import TimeAxisSettings from "./TimeAxisSettings";
import { EventRenderHooks, EventDisplay } from "./EventOptions";
import { InteractionSettings, EventDisplaySettings, SelectAndClickSettings } from "./OtherSettings";
import { DaySettings } from "./DaySettings";
import { WeekNumberSettings, WeekTextSettings } from "./AllOptions/WeekSettings";
import SlotRenderHooks from "./SlotRenderHooks";
import { DragAndDrop } from "./DragAndDrop";
import { CalendarToolbar } from "./CalendarToolbar";

const useFullCalendarSettings = () => {
  const dragAndDropSettings = DragAndDrop();
  const toolbarSettings = CalendarToolbar();

  // Define other settings and configurations for FullCalendar
  const fullCalendarOptions = {
    plugins,
    // customButtons,
    ...CalendarSettings,
    ...toolbarSettings,
    // View Settings
    ...viewOptions,
    // Event Settings
    ...EventDisplay,
    ...EventRenderHooks,

    //
    ...ThemeSettings,
    ...TimeAxisSettings,
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
  };

  return fullCalendarOptions;
};

export default useFullCalendarSettings;
