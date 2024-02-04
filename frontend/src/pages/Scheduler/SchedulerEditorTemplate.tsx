import React, { useEffect, useState, useRef } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { NumericTextBoxComponent, TextBoxComponent } from "@syncfusion/ej2-react-inputs";

// Redux
import { getClients, getAllStaff, getServices } from "store/actions";
import { clientsSelector, servicesSelector, staffSelector } from "Selectors";
import { useSelector, useDispatch } from "react-redux";

interface SchedulerEditorTemplateProps {
  EventType?: string;
  StartTime?: Date;
  EndTime?: Date;
  services: Array<{ name: string; id: string }>;
  staff: Array<{ name: string; id: string }>;
  customerName?: string;
  price?: number;
}

export const SchedulerEditorTemplate = (props: SchedulerEditorTemplateProps) => {
  const dispatch = useDispatch();

  const { clients, isClientSuccess } = useSelector(clientsSelector);
  const { allStaff } = useSelector(staffSelector);
  const { services } = useSelector(servicesSelector);

  useEffect(() => {
    if (!clients || clients.length === 0) {
      dispatch(getClients());
    }
  }, [dispatch, clients]);

  useEffect(() => {
    if (!allStaff || allStaff.length === 0) {
      dispatch(getAllStaff());
    }
  }, [dispatch, allStaff]);

  useEffect(() => {
    if (!services || services.length === 0) {
      dispatch(getServices());
    }
  }, [dispatch, services]);

  const handleServiceChange = (e) => {
    // Handle service change
    console.log("Service selected:", e.itemData);
  };

  const handleStaffChange = (e) => {
    // Handle staff change
    console.log("Staff selected:", e.itemData);
  };

  return (
    <div className="custom-editor">
      <div className="editor-section">
        <DateTimePickerComponent id="appointmentDate" value={props.StartTime || new Date()} format="dd/MM/yyyy HH:mm" placeholder="Appointment Date" />
      </div>

      <div className="editor-section">
        <DropDownListComponent id="serviceDropdown" dataSource={services} fields={{ text: "name", value: "id" }} change={handleServiceChange} placeholder="Select a Service" />
      </div>

      <div className="editor-section">
        <DropDownListComponent id="staffDropdown" dataSource={allStaff} fields={{ text: "name", value: "id" }} change={handleStaffChange} placeholder="Select Staff" />
      </div>

      <div className="editor-section">
        <NumericTextBoxComponent
          id="price"
          format="c2"
          // Assuming you have a way to set and get price
          value={props.price || 0}
          placeholder="Price"
        />
      </div>

      {/* ... other fields ... */}
    </div>
  );
};
