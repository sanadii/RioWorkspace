// FullCalendarOptions.js

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

// Setting Imports
import { ViewAPI, ViewRenderHooks } from "./ViewSettings";
import {
  LicenseOption,
  ToolbarSettings,
  ThemeSettings,
  BusinessHours,
  EventDurationAndHeaders,
} from "./GeneralSettings";
import {
  dayEventLimits,
  dayDimensions,
  AllDaySettings,
  WholeDaySettings,
  DayHeaderRenderHooks,
  DayCellRenderHooks,
  DateRangeSeparatorOptions,
} from "./DaySettings";

import TimeAxisSettings from "./TimeAxisSettings";
import SlotRenderHooks from "./SlotRenderHooks";
import EventRenderHooks from "./EventRenderHooks";
import DragingAndResizingSettings from "./DragingAndResizingSettings";
import { InteractionSettings, EventDisplaySettings, SelectAndClickSettings } from "./OtherSettings";

import { WeekNumberSettings, WeekTextSettings } from "./WeekSettings";
import EventSourceSettings from "./EventSourceSettings";
import { DateSettings, TimeAndLocaleSettings } from "./DateTimeSettings";
import NowIndicatorRenderHooks from "./NowIndicatorRenderHooks";
//
const plugins = [BootstrapTheme, dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin];

// Higher-order function to create full calendar options
const createCalendarSettings = (customButtons) => ({
  plugins,
  customButtons,

  ...LicenseOption,

  // View Settings
  ...ViewAPI,
  ...ViewRenderHooks,
  //
  ...ThemeSettings,
  ...TimeAxisSettings,
  ...ToolbarSettings,
  ...NowIndicatorRenderHooks,
  ...BusinessHours,
  ...DateSettings,

  ...SelectAndClickSettings,
  ...DragingAndResizingSettings,
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

  // ...EventSourceSettings,

  // ...SlotRenderHooks,

  // ...dayEventLimits,
  // ...dayDimensions,
  // ...AllDaySettings,

  ...DateRangeSeparatorOptions,
});

export default createCalendarSettings;
