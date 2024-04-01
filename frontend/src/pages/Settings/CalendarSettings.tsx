import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getClientSearch } from "store/actions";
import { settingsSelector } from "Selectors";

// Form and Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { FieldComponent } from "Components/Common";

import { Fields } from "@syncfusion/ej2-react-dropdowns";
import { Row, Col, Label, Form, Input } from "reactstrap";

const CalendarSettings = () => {
  const dispatch = useDispatch();
  const { settingOptions } = useSelector(settingsSelector);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      calendarFirstDay: settingOptions?.calendarFirstDay || null,
      calendarFirstTimeOfDay: settingOptions?.calendarFirstTimeOfDay || null,
      calendarIntervalInMinutes: settingOptions?.calendarIntervalInMinutes || null,
      initialBookingStatus: settingOptions?.initialBookingStatus || null,
      personalPronounsEnabled: settingOptions?.personalPronounsEnabled || false,
      vaccinationPolicyEnabled: settingOptions?.vaccinationPolicyEnabled || false,
      dailyBookingSummaryEmailEnabled: settingOptions?.dailyBookingSummaryEmailEnabled || false,
      cancellationReasons: settingOptions?.cancellationReasons || [], // Assuming it's an array of reasons
      appointmentStatuses: settingOptions?.appointmentStatuses || [], // Assuming it's an array of statuses
    },

    validationSchema: Yup.object({
      calendarFirstDay: Yup.string().required("First day of the week is required"),
      calendarFirstTimeOfDay: Yup.string().required("Calendar start time is required"),
      calendarIntervalInMinutes: Yup.string().required("Calendar intervals are required"),
      initialBookingStatus: Yup.string().required("Initial booking status is required"),
      personalPronounsEnabled: Yup.boolean(),
      vaccinationPolicyEnabled: Yup.boolean(),
      dailyBookingSummaryEmailEnabled: Yup.boolean(),
      cancellationReasons: Yup.array().of(Yup.string().required("Cancellation reason is required")),
      appointmentStatuses: Yup.array().of(Yup.string().required("Appointment status is required")),
      // Add more validations as per your requirements
    }),

    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  const fields = [
    {
      header: "Display settings",
      subHeader: "Set up your calendar to match the way you work.",
      items: [
        {
          id: "CalendarFirstDay",
          name: "calendarFirstDay",
          label: "First day of the week",
          type: "select",
          options: [
            // options for days of the week
          ],
        },
        {
          id: "CalendarFirstTimeOfDay",
          name: "calendarFirstTimeOfDay",
          label: "Calendar start time",
          type: "timeSelect",
          // additional properties for time selection
        },
        {
          id: "CalendarIntervalInMinutes",
          name: "calendarIntervalInMinutes",
          label: "Calendar intervals",
          type: "select",
          options: [
            // options for intervals
          ],
        },
        // Additional fields as needed
      ],
    },
    {
      header: "Appointment settings",
      subHeader: "",
      items: [
        {
          id: "InitialBookingStatusId",
          name: "initialBookingStatus",
          label: "Initial status for new appointments",
          type: "select",
          options: [
            // options for booking status
          ],
        },
        // Additional fields as needed
      ],
    },
    {
      header: "Inclusion settings",
      subHeader: "Create a safe place for your clients and staff.",
      items: [
        {
          id: "PersonalPronounsEnabled",
          name: "personalPronounsEnabled",
          label: "Add an optional field on client and staff pages to capture pronouns",
          type: "checkbox",
        },
        // Additional fields as needed
      ],
    },
    {
      header: "Covid vaccination policy",
      subHeader: "Adds a checkbox to your online bookings...",
      items: [
        {
          id: "VaccinationPolicyToggle",
          name: "vaccinationPolicyEnabled",
          label: "Covid-19 vaccination requirements",
          type: "checkbox",
        },
        // Additional fields as needed
      ],
    },
    {
      header: "Daily appointment summary",
      subHeader: "This is sent to the account holder.",
      items: [
        {
          id: "DailyBookingSummaryEmailEnabled",
          name: "dailyBookingSummaryEmailEnabled",
          label: "Receive an email summary of all appointments for the day.",
          type: "checkbox",
        },
      ],
    },
    {
      header: "Cancellation reasons",
      subHeader: "You can choose from this list when you cancel an appointment.",
      items: [
        // A dynamic list of cancellation reasons can be implemented here
      ],
    },
    {
      header: "Appointment statuses",
      subHeader: "These can be saved against appointments and will appear in reports.",
      items: [
        // A dynamic list of appointment statuses can be implemented here
      ],
    },
  ];

  return (
    <Form
      className="tablelist-form"
      on={(e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
      }}
    >
      <div className="t-settings-head affix-top" data-spy="affix" data-offset-top="75">
        <h1>Business details</h1>
        <div className="t-settings-head__actions">
          <button type="submit" className="btn btn-primary btn-padded">
            Save
          </button>
        </div>
        <hr />
      </div>
      {fields.map((field) => (
        <Row>
          <Col lg={4}>
            <h2>{field.header}</h2>
            <p>{field.subHeader}</p>
          </Col>
          <Col lg={8}>
            {field.items.map((item) => (
              <div key={item.id}>
                <FieldComponent formStructure="table" field={item} validation={validation} />
              </div>
            ))}
          </Col>
        </Row>
      ))}
      <div className="rg-row">
        <div className="col-md-12">
          <div className="Form-actions text-right">
            <button type="submit" className="btn btn-primary btn-padded">
              Save
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CalendarSettings;
