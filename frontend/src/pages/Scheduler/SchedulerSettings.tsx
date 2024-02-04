// schedulerSettings.ts
import { View, TimeScaleModel, DragEventArgs, ResizeEventArgs } from "@syncfusion/ej2-react-schedule";

export class CalendarSettings {
  bookingColor: string;
  calendar: Record<string, any>;
  currentView: View;
  interval: number;
  firstDayOfWeek: number;
  timeScale: TimeScaleModel;

  constructor() {
    this.bookingColor = 'YourBookingColor'; // Default value
    this.calendar = { start: '10:00', end: '23:00' }; // Default value
    this.currentView = 'Week'; // Default value
    this.interval = 60; // Default value
    this.firstDayOfWeek = 0; // Default value
    this.timeScale = { enable: true, interval: this.interval }; // Using this.interval
  }
}

export const calendarSettings = new CalendarSettings();



export const onDragStart = (args: DragEventArgs): void => {
  if (args.scroll) {
    args.scroll.enable = false;
  }
  if (args.navigation) {
    args.navigation.enable = true;
  }
  args.excludeSelectors = "e-all-day-cells";
};

export const onResizeStart = (args: ResizeEventArgs): void => {
  if (args.scroll) {
    args.scroll.enable = false;
  }
};



