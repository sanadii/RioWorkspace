// import React, { useEffect, useState, useCallback } from "react";
// import { createRoot } from "react-dom/client";
// import { createPortal } from "react-dom";

// import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
// import { formatTime } from "Components/Hooks";

// import { closest } from "@syncfusion/ej2-base";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addAppointment, updateAppointment, deleteAppointment } from "store/actions";

// import CalendarModal from "../../AppointmentModal";
// const EventPopover = ({ eventEl, event }) => {
//   const [popoverOpen, setPopoverOpen] = useState(false);
//   const popoverContainer = document.createElement("div");

//   // Modal
//   const [modal, setModal] = useState<boolean>(false);
//   const [isEdit, setIsEdit] = useState<boolean>(false);

//   console.log("THE MOBILE: ", event);
//   const groupId = event.groupId;
//   const publicId = event.publicId;

//   const isAllDay = event.allDay;
//   const defId = event.defId;
//   const hasEnd = event.hasEnd;

//   const clientName = event.title;
//   const clientId = event && event.client && event.client.id;
//   const appointmentStatus = event && event.extendedProps && event.extendedProps.status;
//   const ppointmentStart = formatTime(event.start);
//   const appointmentEnd = formatTime(event.end);

//   const clientMobile = event && event.extendedProps.client && event.extendedProps.client.mobile;
//   const services = (event && event.extendedProps.services) || [];

//   const toggle = useCallback(() => {
//     if (modal) {
//       setModal(false);
//       // setAppointment(null);
//       setIsEdit(false);
//     } else {
//       setModal(true);
//     }
//   }, [modal]);

//   const togglePopover = () => {
//     setPopoverOpen(!popoverOpen);
//   };

//   const closePopOver = () => {
//     setPopoverOpen(!popoverOpen);
//   };

//   const handleEditAction = (e) => {
//     console.log("handeling Edit Action");
//     toggle();
//   };

//   useEffect(() => {
//     const togglePopover = () => {
//       setPopoverOpen(!popoverOpen);
//     };

//     if (eventEl) {
//       eventEl.addEventListener("click", togglePopover);
//       document.body.appendChild(popoverContainer);

//       return () => {
//         eventEl.removeEventListener("click", togglePopover);
//         document.body.removeChild(popoverContainer);
//       };
//     }
//   }, [eventEl]);

//   return (
//     eventEl &&
//     createPortal(
//       <React.Fragment>
//         <CalendarModal
//           modal={modal}
//           // id="event-modal"
//           toggle={toggle}
//           appointment={event}
//           isEdit={isEdit}
//         />

//         <Popover placement="auto" isOpen={popoverOpen} target={eventEl} toggle={togglePopover}>
//           <PopoverHeader className="popover-title">
//             <a
//               className="fc-customer-name goto-customer"
//               data-customer-id={clientId}
//               title="View details"
//               href={`/customer/customers/${clientId}?tab=details`}
//             >
//               {clientName}{" "}
//             </a>
//             &nbsp;
//             <a
//               className="customer-edit bln-close"
//               title="Edit customer"
//               href={`/customer/customeredit/${clientId}?tab=details&fromCalendar=true`}
//             >
//               <i className="ri-edit-line"></i>
//             </a>
//             <a
//               className="customer-edit bln-close"
//               title="Send an SMS or email"
//               href={`/message/adhoccontactcustomer/${clientId}?bookingId=${publicId}`}
//             >
//               <i className="ri-message-2-line"></i>
//             </a>
//             <a
//               className="customer-edit bln-close print-booking"
//               href="#"
//               title="Print appointment details"
//               data-booking-group-id={groupId}
//               data-booking-id={publicId}
//             >
//               <i className="ri-printer-fill"></i>
//             </a>
//             <Button
//               type="button"
//               className="btn-close"
//               onClick={() => {
//                 closePopOver();
//               }}
//               aria-label="Close"
//             ></Button>
//             <p>
//               <a href={`tel:+${clientMobile}}`}>
//                 <i className="ri-smartphone-line">&nbsp;</i>+{clientMobile}
//               </a>
//             </p>
//           </PopoverHeader>
//           <PopoverBody>
//             <div className="calendar-balloon__event-details">
//               {services.map((service) => (
//                 <div key={service.id} className="calendar-balloon__service-entry">
//                   <div className="fc-event-body calendar-balloon__detail-line">
//                     <div className="calendar-balloon__icon service-icon"></div>
//                     <div>
//                       {service.name.substring(0, 30)}
//                       <span className="fc-price"> - {service.price} KD</span>
//                     </div>
//                   </div>

//                   <div className="calendar-balloon__detail-line">
//                     <div className="calendar-balloon__icon staff-icon"></div>
//                     <div className="calendar-balloon__staff-time">{service.staff}</div>
//                     <div className="calendar-balloon__icon time-icon"></div>
//                     <div className="calendar-balloon__time">{ppointmentStart}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </PopoverBody>
//           <div className="quick-info-footer">
//             <div className="event-footer">
//               <p>status: {appointmentStatus}</p>
//               <div className="calendar-balloon__action-buttons">
//                 <Button
//                   id="edit"
//                   color="success"
//                   // disabled={loader && true}
//                   className="btn btn-success w-100"
//                   // className="btn btn-primary-light btn-small bln-close"

//                   type="submit"
//                   onClick={(e) => handleEditAction(e)}
//                 >
//                   Edit
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Popover>
//       </React.Fragment>,
//       popoverContainer
//     )
//   );
// };

// export default EventPopover;

// //   // Render the popover using React Portal if the event element exists
// //   return (
// //     <React.Fragment>
// //       <div ref={popoverContentRef} />
// //       <CalendarModal
// //         modal={modal}
// //         // id="event-modal"
// //         toggle={toggle}
// //         appointment={event}
// //         isEdit={isEdit}
// //       />
// //     </React.Fragment>
// //   );
// // };

// // export default EventPopover;
