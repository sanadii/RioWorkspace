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
    this.bookingColor = '#008000'; // Default value
    this.calendar = { start: '10:00', end: '23:00' }; // Default value
    this.currentView = 'Week'; // Default value
    this.interval = 60; // Default value
    this.firstDayOfWeek = 0; // Default value
    this.timeScale = { enable: true, interval: this.interval }; // Using this.interval
  }
}

export const calendarSettings = new CalendarSettings();
