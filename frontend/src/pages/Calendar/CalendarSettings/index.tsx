// FullCalendarOptions.js
import { useDispatch } from "react-redux";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { onActions } from './onActions';

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

import { onActions } from "./onActions";
import {
  dayEventLimits,
  dayDimensions,
  AllDaySettings,
  WholeDaySettings,
  DayHeaderRenderHooks,
  DayCellRenderHooks,
  DateRangeSeparatorOptions,
} from "./DaySettings";

import { useCalendarActions } from "./path/to/useCalendarActions";


import TimeAxisSettings from "./TimeAxisSettings";
import SlotRenderHooks from "./SlotRenderHooks";
import { EventRenderHooks, EventDisplay } from "./EventOptions";
import DragingAndResizingSettings from "./DragingAndResizingSettings";
import { InteractionSettings, EventDisplaySettings, SelectAndClickSettings } from "./OtherSettings";

import { WeekNumberSettings, WeekTextSettings } from "./AllOptions/WeekSettings";
import { DateSettings, TimeAndLocaleSettings } from "./DateTimeSettings";
import NowIndicatorRenderHooks from "./NowIndicatorRenderHooks";
//

const { onDrag, onDrop } = onActions(dispatch);

// Higher-order function to create full calendar options
const createCalendarSettings = (customButtons) => ({


  plugins,
  customButtons,

  ...CalendarSettings,

  // View Settings
  ...viewOptions,
  //
  ...ThemeSettings,
  ...TimeAxisSettings,
  ...ToolbarSettings,
  ...NowIndicatorRenderHooks,
  ...BusinessHours,
  ...DateSettings,

  ...SelectAndClickSettings,
  ...DragingAndResizingSettings,
  ...onActions,

  ...EventDisplay,
  ...EventRenderHooks,

  // ...EventDurationAndHeaders,
  // ...WholeDaySettings,

  // // Hooks
  // ...DayHeaderRenderHooks,
  // ...DayCellRenderHooks,

  // ...TimeAndLocaleSettings,
  // ...InteractionSettings,
  // ...WeekNumberSettings,

  // ...WeekTextSettings,

  // ...SlotRenderHooks,

  // ...dayEventLimits,
  // ...dayDimensions,
  // ...AllDaySettings,

  ...DateRangeSeparatorOptions,
});

export default createCalendarSettings;
