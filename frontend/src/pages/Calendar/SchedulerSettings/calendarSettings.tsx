// schedulerSettings.ts
import { View, TimeScaleModel, DragEventArgs, ResizeEventArgs } from "@syncfusion/ej2-react-schedule";

export class CalendarSettings {
  bookingColor: string;
  calendar: Record<string, any>;
  currentView: View;
  interval: number;
  slotCount: number
  firstDayOfWeek: number;
  timeScale: TimeScaleModel;

  constructor() {
    this.bookingColor = '#008000';
    this.calendar = { start: '10:00', end: '20:00' };
    this.currentView = 'Week';
    this.interval = 60;
    this.slotCount = 4;
    this.firstDayOfWeek = 0;
    this.timeScale = { enable: true, interval: this.interval, slotCount: this.slotCount }; // Using this.interval
  }
}

export const calendarSettings = new CalendarSettings();
