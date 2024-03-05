import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Import Icons
import { Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";

import { Draggable } from "@fullcalendar/interaction";
import Flatpickr from "react-flatpickr";

//redux
import { useSelector, useDispatch } from "react-redux";

import {
  getEvents as onGetEvents,
  getCategories as onGetCategories,
  addNewEvent as onAddNewEvent,
  updateEvent as onUpdateEvent,
  getUpCommingEvent as onGetUpCommingEvent,
} from "store/actions";
import { createSelector } from "reselect";

const Calender = ({ modal, id, isEdit, setModal, toggle, event, setEvent, setDeleteModal }) => {
  const dispatch: any = useDispatch();
  const [selectedNewDay, setSelectedNewDay] = useState<any>();
  const [isEditButton, setIsEditButton] = useState<boolean>(true);
  const [eventName, setEventName] = useState<string>("");

  const selectLayoutState = (state: any) => state.Calendar;
  const calendarDataProperties = createSelector(selectLayoutState, (state: any) => ({
    events: state.events,
    categories: state.categories,
    isEventUpdated: state.isEventUpdated,
  }));
  // Inside your component
  const { events, categories, isEventUpdated } = useSelector(calendarDataProperties);

  useEffect(() => {
    dispatch(onGetEvents());
    dispatch(onGetCategories());
    dispatch(onGetUpCommingEvent());
    new Draggable(document.getElementById("external-events") as HTMLElement, {
      itemSelector: ".external-event",
    });
  }, [dispatch]);

  //   useEffect(() => {
  //     if (isEventUpdated) {
  //       setIsEdit(false);
  //       setEvent({});
  //     }
  //   }, [dispatch, isEventUpdated]);

  // events validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (event && event.id) || "",
      title: (event && event.title) || "",
      category: (event && event.category) || "",
      location: (event && event.location) || "",
      description: (event && event.description) || "",
      defaultDate: (event && event.defaultDate) || [],
      datetag: (event && event.datetag) || "",
      start: (event && event.start) || "",
      end: (event && event.end) || "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Event Name"),
      category: Yup.string().required("Please Select Your Category"),
      location: Yup.string().required("Please Enter Your Location"),
      description: Yup.string().required("Please Enter Your Description"),
      start: Yup.date().required("Start Time is required"),
      end: Yup.date().required("End Time is required"),
      defaultDate: Yup.array().of(Yup.date()).required("Date range is required").min(2, "Select at least two dates"),
    }),
    onSubmit: (values) => {
      var updatedDay: any = "";
      if (selectedNewDay) {
        updatedDay = new Date(selectedNewDay[1]);
        updatedDay.setDate(updatedDay.getDate() + 1);
      }

      if (isEdit) {
        const updateEvent = {
          id: event.id,
          title: values.title,
          className: values.category,
          start: selectedNewDay ? selectedNewDay[0] : event.start,
          end: selectedNewDay ? updatedDay : event.end,
          location: values.location,
          description: values.description,
        };
        // update event
        dispatch(onUpdateEvent(updateEvent));
        validation.resetForm();
      } else {
        const newEvent = {
          id: Math.floor(Math.random() * 100),
          title: values["title"],
          start: selectedNewDay[0],
          end: updatedDay,
          className: values["category"],
          location: values["location"],
          description: values["description"],
        };
        // save new event
        dispatch(onAddNewEvent(newEvent));
        validation.resetForm();
      }

      // setSelectedDay(null);
      setSelectedNewDay(null);
      toggle();
    },
  });

  const submitOtherEvent = () => {
    document.getElementById("form-event")?.classList.remove("view-event");

    document.getElementById("event-title")?.classList.replace("d-none", "d-block");
    document.getElementById("event-category")?.classList.replace("d-none", "d-block");
    (document.getElementById("event-start-date")?.parentNode as HTMLElement).classList.remove("d-none");
    document.getElementById("event-start-date")?.classList.replace("d-none", "d-block");
    document.getElementById("event-location")?.classList.replace("d-none", "d-block");
    document.getElementById("event-description")?.classList.replace("d-none", "d-block");
    document.getElementById("event-start-date-tag")?.classList.replace("d-block", "d-none");
    document.getElementById("event-location-tag")?.classList.replace("d-block", "d-none");
    document.getElementById("event-description-tag")?.classList.replace("d-block", "d-none");

    setIsEditButton(true);
  };

  document.title = "Calendar | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <Modal
        isOpen={modal}
        // toggle={toggle}
        centered
        id="event-modal"
        className="border-0"
        modalClassName="modal fadeInLeft zoomIn"
      >
        <ModalHeader toggle={toggle} tag="h5" className="p-3 bg-info-subtle modal-title">
          {!!isEdit ? eventName : "Add Event"}
        </ModalHeader>
        <ModalBody>
          <Form
            className={!!isEdit ? "needs-validation view-event" : "needs-validation"}
            name="event-form"
            id="form-event"
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            {!!isEdit ? (
              <div className="text-end">
                <Link
                  to="#"
                  className="btn btn-sm btn-soft-primary"
                  id="edit-event-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    submitOtherEvent();
                    return false;
                  }}
                >
                  Edit
                </Link>
              </div>
            ) : null}
            <div className="event-details">
              <div className="d-flex mb-2">
                <div className="flex-grow-1 d-flex align-items-center">
                  <div className="flex-shrink-0 me-3">
                    <i className="ri-calendar-event-line text-muted fs-16"></i>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="d-block fw-semibold mb-0" id="event-start-date-tag">
                      {event ? event.datetag : ""}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="flex-shrink-0 me-3">
                  <i className="ri-time-line text-muted fs-16"></i>
                </div>
                <div className="flex-grow-1">
                  <h6 className="d-block fw-semibold mb-0">
                    <span id="event-timepicker1-tag">12:00 AM</span> - <span id="event-timepicker2-tag">5:30 AM</span>
                  </h6>
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="flex-shrink-0 me-3">
                  <i className="ri-map-pin-line text-muted fs-16"></i>
                </div>
                <div className="flex-grow-1">
                  <h6 className="d-block fw-semibold mb-0">
                    <span id="event-location-tag">
                      {event && event.location !== undefined ? event.location : "No Location"}
                    </span>
                  </h6>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="flex-shrink-0 me-3">
                  <i className="ri-discuss-line text-muted fs-16"></i>
                </div>
                <div className="flex-grow-1">
                  <p className="d-block text-muted mb-0" id="event-description-tag">
                    {event && event.description !== undefined ? event.description : "No Description"}
                  </p>
                </div>
              </div>
            </div>
            <Row className="event-form">
              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Type</Label>
                  <Input
                    className={!!isEdit ? "form-select d-none" : "form-select d-block"}
                    name="category"
                    id="event-category"
                    type="select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.category || ""}
                  >
                    <option value="bg-danger-subtle">Danger</option>
                    <option value="bg-success-subtle">Success</option>
                    <option value="bg-primary-subtle">Primary</option>
                    <option value="bg-info-subtle">Info</option>
                    <option value="bg-dark-subtle">Dark</option>
                    <option value="bg-warning-subtle">Warning</option>
                  </Input>
                  {validation.touched.category && validation.errors.category ? (
                    <FormFeedback type="invalid" className="d-block">
                      {validation.errors.category}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Event Name</Label>
                  <Input
                    className={!!isEdit ? "d-none" : "d-block"}
                    placeholder="Enter event name"
                    type="text"
                    name="title"
                    id="event-title"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.title || ""}
                  />
                  {validation.touched.title && validation.errors.title ? (
                    <FormFeedback type="invalid" className="d-block">
                      {validation.errors.title}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xs={12}>
                <div className="mb-3">
                  <Label>Event Date</Label>
                  <div className={!!isEdit ? "input-group d-none" : "input-group"}>
                    <Flatpickr
                      className="form-control"
                      id="event-start-date"
                      name="defaultDate"
                      placeholder="Select Date"
                      value={validation.values.defaultDate || ""}
                      options={{
                        mode: "range",
                        dateFormat: "Y-m-d",
                      }}
                      onChange={(date: any) => {
                        setSelectedNewDay(date);
                        validation.setFieldValue("defaultDate", date);
                      }}
                    />
                    <span className="input-group-text">
                      <i className="ri-calendar-event-line"></i>
                    </span>
                  </div>
                  {validation.touched.defaultDate && validation.errors.defaultDate ? (
                    <FormFeedback type="invalid" className="d-block">
                      {validation.errors.defaultDate}{" "}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xs={6}>
                <div className="mb-3">
                  <Label>Start Time</Label>
                  <div className="input-group">
                    <Flatpickr
                      className="form-control"
                      name="start"
                      value={validation.values.start || ""}
                      onChange={(date: any) => validation.setFieldValue("start", date[0])}
                      options={{
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: "H:i",
                      }}
                    />
                    <span className="input-group-text">
                      {" "}
                      <i className="ri-calendar-event-line"></i>{" "}
                    </span>
                  </div>
                  {validation.touched.start && validation.errors.start ? (
                    <FormFeedback type="invalid" className="d-block">
                      {validation.errors.start}{" "}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col xs={6}>
                <div className="mb-3">
                  <Label>End Time</Label>
                  <div className="input-group">
                    <Flatpickr
                      className="form-control input-group"
                      name="end"
                      value={validation.values.end || ""}
                      onChange={(date: any) => validation.setFieldValue("end", date[0])}
                      options={{
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: "H:i",
                      }}
                    />
                    <span className="input-group-text">
                      {" "}
                      <i className="ri-calendar-event-line"></i>{" "}
                    </span>
                  </div>
                  {validation.touched.end && validation.errors.end ? (
                    <FormFeedback type="invalid" className="d-block">
                      {validation.errors.end}{" "}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xs={12}>
                <div className="mb-3">
                  <Label htmlFor="event-location">Location</Label>
                  <div>
                    <Input
                      type="text"
                      className={!!isEdit ? "d-none" : "d-block"}
                      name="location"
                      id="event-location"
                      placeholder="Event location"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.location}
                    />
                    {validation.touched.location && validation.errors.location ? (
                      <FormFeedback type="invalid" className="d-block">
                        {validation.errors.location}
                      </FormFeedback>
                    ) : null}
                  </div>
                </div>
              </Col>
              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Description</Label>
                  <textarea
                    className={!!isEdit ? "form-control d-none" : "form-control d-block"}
                    id="event-description"
                    name="description"
                    placeholder="Enter a description"
                    rows={3}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description}
                  ></textarea>
                  {validation.touched.description && validation.errors.description ? (
                    <FormFeedback type="invalid" className="d-block">
                      {validation.errors.description}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <div className="hstack gap-2 justify-content-end">
              {!!isEdit && (
                <button
                  type="button"
                  className="btn btn-soft-danger"
                  id="btn-delete-event"
                  onClick={() => {
                    toggle();
                    setDeleteModal(true);
                  }}
                >
                  <i className="ri-close-line align-bottom"></i> Delete
                </button>
              )}
              {isEditButton && (
                <button type="submit" className="btn btn-success" id="btn-save-event">
                  {!!isEdit ? "Edit Event" : "Add Event"}
                </button>
              )}
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

Calender.propTypes = {
  events: PropTypes.any,
  categories: PropTypes.array,
  className: PropTypes.string,
  onGetEvents: PropTypes.func,
  onAddNewEvent: PropTypes.func,
  onUpdateEvent: PropTypes.func,
  onDeleteEvent: PropTypes.func,
  onGetCategories: PropTypes.func,
};

export default Calender;
