// schedulerSettings.ts
import { DragEventArgs, ResizeEventArgs } from "@syncfusion/ej2-react-schedule";

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



