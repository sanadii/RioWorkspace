// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { Card, CardBody, Container, Row, Col } from "reactstrap";
// import { DeleteModal, BreadCrumb } from "Components/Common";


// // Calendar
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
// import BootstrapTheme from "@fullcalendar/bootstrap";
// import listPlugin from "@fullcalendar/list";

// //redux
// import { useSelector, useDispatch } from "react-redux";

// import {
//   getEvents as onGetEvents,
//   getCategories as onGetCategories,
//   addNewEvent as onAddNewEvent,
//   deleteEvent as onDeleteEvent,
//   updateEvent as onUpdateEvent,
//   getUpCommingEvent as onGetUpCommingEvent,
// } from "store/actions";
// import { createSelector } from "reselect";

// import CalendarModal from "./xx";

// const Calender = () => {
//   const dispatch: any = useDispatch();
//   const [event, setEvent] = useState<any>({});
//   const [modal, setModal] = useState<boolean>(false);
//   const [selectedNewDay, setSelectedNewDay] = useState<any>();
//   const [isEdit, setIsEdit] = useState<boolean>(false);
//   const [isEditButton, setIsEditButton] = useState<boolean>(true);
//   const [deleteModal, setDeleteModal] = useState<boolean>(false);
//   const [deleteEvent, setDeleteEvent] = useState<string>("");
//   const [eventName, setEventName] = useState<string>("");

//   const selectLayoutState = (state: any) => state.Calendar;
//   const calendarDataProperties = createSelector(selectLayoutState, (state: any) => ({
//     events: state.events,
//     categories: state.categories,
//     isEventUpdated: state.isEventUpdated,
//   }));
//   // Inside your component
//   const { events, categories, isEventUpdated } = useSelector(calendarDataProperties);

//   useEffect(() => {
//     dispatch(onGetEvents());
//     dispatch(onGetCategories());
//     dispatch(onGetUpCommingEvent());
//     // new Draggable(document.getElementById("external-events") as HTMLElement, {
//     //   itemSelector: ".external-event",
//     // });
//   }, [dispatch]);

//   useEffect(() => {
//     if (isEventUpdated) {
//       setIsEdit(false);
//       setEvent({});
//     }
//   }, [dispatch, isEventUpdated]);

//   /**
//    * Handling the modal state
//    */
//   const toggle = () => {
//     if (modal) {
//       setModal(false);
//       setEvent(null);
//       setIsEdit(false);
//       setIsEditButton(true);
//     } else {
//       setModal(true);
//     }
//   };
//   /**
//    * Handling date click on calendar
//    */

//   const handleDateClick = (arg: any) => {
//     const date = arg["date"];
//     setSelectedNewDay(date);
//     toggle();
//   };

//   const str_dt = function formatDate(date: any) {
//     var monthNames = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     var d = new Date(date),
//       month = "" + monthNames[d.getMonth()],
//       day = "" + d.getDate(),
//       year = d.getFullYear();
//     if (month.length < 2) month = "0" + month;
//     if (day.length < 2) day = "0" + day;
//     return [day + " " + month, year].join(",");
//   };

//   /**
//    * Handling click on event on calendar
//    */

//   const handleEventClick = (arg: any) => {
//     const event = arg.event;

//     const st_date = event.start;
//     const ed_date = event.end;
//     const r_date = ed_date == null ? str_dt(st_date) : str_dt(st_date) + " to " + str_dt(ed_date);
//     const er_date = ed_date === null ? [st_date] : [st_date, ed_date];

//     setEvent({
//       id: event.id,
//       title: event.title,
//       start: event.start,
//       end: event.end,
//       className: event.classNames,
//       category: event.classNames[0],
//       location: event._def.extendedProps.location ? event._def.extendedProps.location : "No Loaction",
//       description: event._def.extendedProps.description,
//       defaultDate: er_date,
//       datetag: r_date,
//     });
//     setEventName(event.title);
//     setDeleteEvent(event.id);
//     setIsEdit(true);
//     setIsEditButton(false);
//     toggle();
//   };
//   /**
//    * On delete event
//    */
//   const handleDeleteEvent = () => {
//     dispatch(onDeleteEvent(deleteEvent));
//     setDeleteModal(false);
//   };

//   /**
//    * On category darg event
//    */
//   const onDrag = (event: any) => {
//     event.preventDefault();
//   };

//   /**
//    * On calendar drop event
//    */
//   const onDrop = (event: any) => {
//     const date = event["date"];
//     const day = date.getDate();
//     const month = date.getMonth();
//     const year = date.getFullYear();

//     const currectDate = new Date();
//     const currentHour = currectDate.getHours();
//     const currentMin = currectDate.getMinutes();
//     const currentSec = currectDate.getSeconds();
//     const modifiedDate = new Date(year, month, day, currentHour, currentMin, currentSec);

//     const draggedEl = event.draggedEl;
//     const draggedElclass = draggedEl.className;
//     if (draggedEl.classList.contains("external-event") && draggedElclass.indexOf("fc-event-draggable") === -1) {
//       const modifiedData = {
//         id: Math.floor(Math.random() * 1000),
//         title: draggedEl.innerText,
//         start: modifiedDate,
//         className: draggedEl.className,
//       };
//       dispatch(onAddNewEvent(modifiedData));
//     }
//   };

//   document.title = "Calendar | Velzon - React Admin & Dashboard Template";
//   return (
//     <React.Fragment>
//       <DeleteModal
//         show={deleteModal}
//         onDeleteClick={handleDeleteEvent}
//         onCloseClick={() => {
//           setDeleteModal(false);
//         }}
//       />
//       <CalendarModal
//         modal={modal}
//         id="event-modal"
//         toggle={toggle}
//         event={event}
//         setEvent={setEvent}
//         isEdit={isEdit}
//         setModal={setModal}
//         setDeleteModal={setDeleteModal}
//       />
//       <div className="page-content">
//         <Container fluid>
//           <Row>
//             <Col xs={12}>
//               <Card className="card-h-100">
//                 <CardBody>
//                   <FullCalendar
//                     plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin, listPlugin]}
//                     initialView="dayGridWeek"
//                     slotDuration={"00:01:00"}
//                     handleWindowResize={true}
//                     themeSystem="bootstrap"
//                     headerToolbar={{
//                       left: "prev,next today",
//                       center: "title",
//                       right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
//                     }}
//                     events={events}
//                     editable={true}
//                     droppable={true}
//                     selectable={true}
//                     dateClick={handleDateClick}
//                     eventClick={handleEventClick}
//                     drop={onDrop}
//                   />
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>

//           <div style={{ clear: "both" }}></div>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// Calender.propTypes = {
//   events: PropTypes.any,
//   categories: PropTypes.array,
//   className: PropTypes.string,
//   onGetEvents: PropTypes.func,
//   onAddNewEvent: PropTypes.func,
//   onUpdateEvent: PropTypes.func,
//   onDeleteEvent: PropTypes.func,
//   onGetCategories: PropTypes.func,
// };

// export default Calender;
