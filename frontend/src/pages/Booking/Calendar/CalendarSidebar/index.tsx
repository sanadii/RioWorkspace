import React, { useEffect, useState, useRef, useCallback } from "react";
import { CalenderProps, BookingModalProps, BookingMoodProps } from "types";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { clientsSelector } from "Selectors";
import { getSchedule, updateAppointment } from "store/actions";

import { Button, UncontrolledTooltip, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Spinners } from "Components/Common";
import SimpleBar from "simplebar-react";

import { Link } from "react-router-dom";

import { createSelector } from "reselect";
import classnames from "classnames";

interface DirectContact {
  id: number;
  roomId: number;
  status: string;
  name: string;
  image: string;
  number: string;
  email: string;
  bgColor: string;
  badge: string | number;
  location: string;
}
interface channelsListType {
  id: number;
  name: string;
  unReadMessage?: number;
  image: string;
}
interface chatContactType {
  direactContact?: DirectContact[];
  channelsList?: channelsListType[];
}
interface contact {
  id: number;
  name: string;
  status: string;
  roomId: number;
  image?: string;
}
interface chatContactDataTye {
  id: number;
  title: string;
  contacts?: contact[];
}
type UserMessage = {
  id: number;
  from_id: number;
  to_id: number;
  msg: string | null;
  reply: { sender: string; msg: string; id: number };
  isImages: boolean;
  has_images: { id: number; image: string }[];
  datetime: string;
};

type userMessagesType = {
  id: number;
  roomId: number;
  sender: string;
  createdAt: string;
  usermessages: UserMessage[];
};

const CalendarSidebar = () => {
  const userclientshow: any = useRef();
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab: any) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  const dispatch = useDispatch<any>();
  const { clientSearch, loading } = useSelector(clientsSelector);

  const [Chat_Box_Username, setChat_Box_Username] = useState<any>("Lisa Parker");
  const [user_Status, setUser_Status] = useState<string | null>("online");
  const [currentRoomId, setCurrentRoomId] = useState<any>(1);

  // LeftSide
  // Inside your component
  // Inside your component
  // const { loading } = useSelector(chatProperties);
  const [isLoading, setLoading] = useState(loading);

  //Use For Chat Box
  const userChatOpen = (clients: any) => {
    setChat_Box_Username(clients.name);
    setCurrentRoomId(clients.roomId);
    // setChat_Box_Image(clients.image);
    setUser_Status(clients.status);
    // dispatch(getMessages(clients.roomId));
    if (window.innerWidth < 892) {
      userclientshow.current.classList.add("user-chat-show");
    }
    // remove unread msg on read in chat
    var unreadMessage: any = document.getElementById("unread-msg-user" + clients.id);
    if (unreadMessage) {
      unreadMessage.style.display = "none";
    }
  };

  return (
    <React.Fragment>
      <div className="gap-1">
        <div className="px-4 pt-2 mb-2">
          <div className="search-box">
            <input
              // onKeyUp={searchUsers}
              id="search-user"
              type="text"
              className="form-control bg-light border-light"
              placeholder="Search here..."
            />
            <i className="ri-search-2-line search-icon"></i>
          </div>
        </div>

        <Nav tabs className="nav nav-tabs nav-tabs-custom nav-success nav-justified mb-3">
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={classnames({
                active: customActiveTab === "1",
              })}
              onClick={() => {
                toggleCustom("1");
              }}
            >
              Upcoming
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={classnames({
                active: customActiveTab === "2",
              })}
              onClick={() => {
                toggleCustom("2");
              }}
            >
              Waitlist
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={customActiveTab} className="text-muted">
          <TabPane tabId="1" id="clients">
            {isLoading ? (
              <Spinners setLoading={setLoading} />
            ) : (
              <SimpleBar className="chat-room-list pt-3" style={{ margin: "-16px 0px 0px" }}>
                <div className="d-flex align-items-center px-4 mb-2">
                  <div className="flex-grow-1">
                    <h4 className="mb-0 fs-11 text-muted text-uppercase">Direct Messages</h4>
                  </div>
                  <div className="flex-shrink-0">
                    <UncontrolledTooltip placement="bottom" target="addnewmsg">
                      New Message
                    </UncontrolledTooltip>

                    <button type="button" id="addnewmsg" className="btn btn-soft-success btn-sm">
                      <i className="ri-add-line align-bottom"></i>
                    </button>
                  </div>
                </div>

                <div className="chat-message-list p-4">
                  <div
                    id="future-appointments"
                    data-bind="visible: futureAppointments().any"
                    // style=""
                  >
                    <h4>Coming up:</h4>
                    <div data-bind="foreach: futureAppointments().groupings">
                      <div className="day">
                        <h6 data-bind="text: dayFormatted, visible : $parent.futureAppointments().showDayHeadings">
                          Thursday, 28 March 2024
                        </h6>
                        <div data-bind="template: { name : $root.resolveAppointmentTemplate, foreach: appointments }">
                          <div className="appointment">
                            <span className="header">
                              <a
                                href="#"
                                className="title"
                                data-bind="text : customerName, click : $root.selectCustomer"
                              >
                                Khadeja Mukthar
                              </a>

                              <i
                                className="fa fa-refresh tip-init"
                                data-bind="visible : isRecurring, tooltip: {'title': 'Recurring'}"
                                // style="display: none;"
                                data-original-title=""
                              ></i>
                              <i
                                className="fa fa-cloud tip-init"
                                data-bind="visible : isOnlineBooking, tooltip: {'title': 'Booked online'}"
                                // style="display: none;"
                                data-original-title=""
                              ></i>
                            </span>
                            <div data-bind="foreach: items">
                              <div
                                className="item"
                                data-bind="style: { 'border-color': serviceUIColor }"
                                // style="border-color: rgb(27, 188, 157);"
                              >
                                <a
                                  href="/calendar?bookingid=393237147"
                                  className="show-booking"
                                  data-close-flexpane-on-click=""
                                  data-bind="visible: $index() == 0, attr: { 'data-date': startDate, 'data-booking-id': bookingId, href : '/calendar?bookingid=' + bookingId }"
                                  data-date="2024-03-28T20:00:00.0000000"
                                  data-booking-id="393237147"
                                >
                                  <i className="mdi mdi-calendar-month"></i>
                                </a>
                                <span data-bind="text : serviceName">Consult - Straightening</span> with{" "}
                                <span data-bind="text : staffName">Laura .</span> at{" "}
                                <span data-bind="text : startTime">8:00pm</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="day">
                        <h6 data-bind="text: dayFormatted, visible : $parent.futureAppointments().showDayHeadings">
                          Friday, 29 March 2024
                        </h6>
                        <div data-bind="template: { name : $root.resolveAppointmentTemplate, foreach: appointments }">
                          <div className="appointment">
                            <span className="header">
                              <a
                                href="#"
                                className="title"
                                data-bind="text : customerName, click : $root.selectCustomer"
                              >
                                Katherine Taglivia
                              </a>

                              <i
                                className="fa fa-refresh tip-init"
                                data-bind="visible : isRecurring, tooltip: {'title': 'Recurring'}"
                                // style="display: none;"
                                data-original-title=""
                              ></i>
                              <i
                                className="fa fa-cloud tip-init"
                                data-bind="visible : isOnlineBooking, tooltip: {'title': 'Booked online'}"
                                // style="display: none;"
                                data-original-title=""
                              ></i>
                            </span>
                            <div data-bind="foreach: items">
                              <div
                                className="item"
                                data-bind="style: { 'border-color': serviceUIColor }"
                                // style="border-color: rgb(27, 188, 157);"
                              >
                                <a
                                  href="/calendar?bookingid=392504149"
                                  className="show-booking"
                                  data-close-flexpane-on-click=""
                                  data-bind="visible: $index() == 0, attr: { 'data-date': startDate, 'data-booking-id': bookingId, href : '/calendar?bookingid=' + bookingId }"
                                  data-date="2024-03-29T15:00:00.0000000"
                                  data-booking-id="392504149"
                                >
                                  <i className="mdi mdi-calendar-month"></i>
                                </a>
                                <span data-bind="text : serviceName">Brazilian Hair Straightening - Long</span> with{" "}
                                <span data-bind="text : staffName">Laura .</span> at{" "}
                                <span data-bind="text : startTime">3:00pm</span>
                              </div>
                            </div>
                          </div>

                          <div className="appointment">
                            <span className="header">
                              <a
                                href="#"
                                className="title"
                                data-bind="text : customerName, click : $root.selectCustomer"
                              >
                                Nada{" "}
                              </a>

                              <i
                                className="fa fa-refresh tip-init"
                                data-bind="visible : isRecurring, tooltip: {'title': 'Recurring'}"
                                // style="display: none;"
                                data-original-title=""
                              ></i>
                              <i
                                className="fa fa-cloud tip-init"
                                data-bind="visible : isOnlineBooking, tooltip: {'title': 'Booked online'}"
                                // style="display: none;"
                                data-original-title=""
                              ></i>
                            </span>
                            <div data-bind="foreach: items">
                              <div
                                className="item"
                                data-bind="style: { 'border-color': serviceUIColor }"
                                // style="border-color: rgb(27, 188, 157);"
                              >
                                <a
                                  href="/calendar?bookingid=393007268"
                                  className="show-booking"
                                  data-close-flexpane-on-click=""
                                  data-bind="visible: $index() == 0, attr: { 'data-date': startDate, 'data-booking-id': bookingId, href : '/calendar?bookingid=' + bookingId }"
                                  data-date="2024-03-29T15:00:00.0000000"
                                  data-booking-id="393007268"
                                >
                                  <i className="mdi mdi-calendar-month"></i>
                                </a>
                                <span data-bind="text : serviceName">Brazilian Hair Straightening - Long</span> with{" "}
                                <span data-bind="text : staffName">Laura .</span> at{" "}
                                <span data-bind="text : startTime">3:00pm</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="day">
                        <h6 data-bind="text: dayFormatted, visible : $parent.futureAppointments().showDayHeadings">
                          Saturday, 30 March 2024
                        </h6>
                        <div data-bind="template: { name : $root.resolveAppointmentTemplate, foreach: appointments }">
                          <div className="appointment">
                            <span className="header">
                              <a
                                href="#"
                                className="title"
                                data-bind="text : customerName, click : $root.selectCustomer"
                              >
                                Noura Alajami
                              </a>

                              <i
                                className="fa fa-refresh tip-init"
                                data-bind="visible : isRecurring, tooltip: {'title': 'Recurring'}"
                                // style="display: none;"
                                data-original-title=""
                              ></i>
                              <i
                                className="fa fa-cloud tip-init"
                                data-bind="visible : isOnlineBooking, tooltip: {'title': 'Booked online'}"
                                // style="display: none;"
                                data-original-title=""
                              ></i>
                            </span>
                            <div data-bind="foreach: items">
                              <div
                                className="item"
                                data-bind="style: { 'border-color': serviceUIColor }"
                                // style="border-color: rgb(27, 188, 157);"
                              >
                                <a
                                  href="/calendar?bookingid=392732034"
                                  className="show-booking"
                                  data-close-flexpane-on-click=""
                                  data-bind="visible: $index() == 0, attr: { 'data-date': startDate, 'data-booking-id': bookingId, href : '/calendar?bookingid=' + bookingId }"
                                  data-date="2024-03-30T19:00:00.0000000"
                                  data-booking-id="392732034"
                                >
                                  <i className="mdi mdi-calendar-month"></i>
                                </a>
                                <span data-bind="text : serviceName">Brazilian Hair Straightening - Long</span> with{" "}
                                <span data-bind="text : staffName">Laura .</span> at{" "}
                                <span data-bind="text : startTime">7:00pm</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="day">
                        <h6 data-bind="text: dayFormatted, visible : $parent.futureAppointments().showDayHeadings">
                          Monday, 1 April 2024
                        </h6>
                        <div data-bind="template: { name : $root.resolveAppointmentTemplate, foreach: appointments }">
                          <div className="appointment">
                            <span className="header">
                              <a
                                href="#"
                                className="title"
                                data-bind="text : customerName, click : $root.selectCustomer"
                              >
                                Rita{" "}
                              </a>

                              <i
                                className="fa fa-refresh tip-init"
                                data-bind="visible : isRecurring, tooltip: {'title': 'Recurring'}"
                                // style="display: none;"
                                data-original-title=""
                              ></i>
                              <i
                                className="fa fa-cloud tip-init"
                                data-bind="visible : isOnlineBooking, tooltip: {'title': 'Booked online'}"
                                // style="display: none;"
                                data-original-title=""
                              ></i>
                            </span>
                            <div data-bind="foreach: items">
                              <div
                                className="item"
                                data-bind="style: { 'border-color': serviceUIColor }"
                                // style="border-color: rgb(27, 188, 157);"
                              >
                                <a
                                  href="/calendar?bookingid=389825932"
                                  className="show-booking"
                                  data-close-flexpane-on-click=""
                                  data-bind="visible: $index() == 0, attr: { 'data-date': startDate, 'data-booking-id': bookingId, href : '/calendar?bookingid=' + bookingId }"
                                  data-date="2024-04-01T16:00:00.0000000"
                                  data-booking-id="389825932"
                                >
                                  <i className="mdi mdi-calendar-month"></i>
                                </a>
                                <span data-bind="text : serviceName">Consult - Color</span> with{" "}
                                <span data-bind="text : staffName">Laura .</span> at{" "}
                                <span data-bind="text : startTime">4:00pm</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="chat-message-list">
                  <ul className="list-unstyled chat-list chat-user-list mb-0 users-list" id="channelList">
                    {/* {(clients || []).map(
                      (clientsChannel: chatContactType) =>
                        clientsChannel.channelsList &&
                        (clientsChannel.channelsList || [])?.map((channel, key: number) => (
                          <React.Fragment key={key}>
                            <li className={Chat_Box_Username === channel.name ? "active" : ""}>
                              <Link to="#" className="unread-msg-user" onClick={() => userChatOpen(channel)}>
                                <div className="d-flex align-items-center">
                                  <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                                    <div className="avatar-xxs">
                                      <div className="avatar-title bg-light rounded-circle text-body">#</div>
                                    </div>
                                  </div>
                                  <div className="flex-grow-1 overflow-hidden">
                                    <p className="text-truncate mb-0">{channel.name}</p>
                                  </div>
                                  {channel.unReadMessage && (
                                    <div className="flex-shrink-0" id={"unread-msg-user" + channel.id}>
                                      <span className="badge bg-dark-subtle text-body rounded p-1">
                                        {channel.unReadMessage}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </Link>
                            </li>
                          </React.Fragment>
                        ))
                    )} */}
                  </ul>
                </div>
              </SimpleBar>
            )}
          </TabPane>
          <TabPane tabId="2" id="contacts">
            <SimpleBar className="chat-room-list pt-3" style={{ margin: "-16px 0px 0px" }}>
              {isLoading ? (
                <Spinners setLoading={setLoading} />
              ) : (
                <div className="sort-contact">
                  {/* {(chatContactData || []).map((contact: chatContactDataTye, key: number) => (
                    <div className="mt-3" key={key}>
                      <div className="contact-list-title">{contact.title}</div>
                      <ul id={"contact-sort-" + contact.title} className="list-unstyled contact-list">
                        {contact.contacts &&
                          contact.contacts.map((item, key: number) => (
                            <li key={key} className={Chat_Box_Username === item.name ? "active" : ""}>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 me-2">
                                  <div className="avatar-xxs">
                                    {item.image ? (
                                      <img src={item.image} className="img-fluid rounded-circle" alt="" />
                                    ) : (
                                      <span className="avatar-title rounded-circle bg-primary fs-10">
                                        {item.name.charAt(0) + item.name.split(" ").slice(-1).toString().charAt(0)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-grow-1" onClick={() => userChatOpen(item)}>
                                  <p className="text-truncate contactlist-name mb-0">{item.name}</p>
                                </div>
                                <div className="flex-shrink-0">
                                  <UncontrolledDropdown>
                                    <DropdownToggle tag="a" className="text-muted">
                                      <i className="ri-more-2-fill" />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                      <DropdownItem>
                                        <i className="ri-pencil-line text-muted me-2 align-bottom" />
                                        Edit
                                      </DropdownItem>
                                      <DropdownItem>
                                        <i className="ri-forbid-2-line text-muted me-2 align-bottom" />
                                        Block
                                      </DropdownItem>
                                      <DropdownItem>
                                        <i className="ri-delete-bin-6-line text-muted me-2 align-bottom" /> Remove
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))} */}
                </div>
              )}
            </SimpleBar>
          </TabPane>
        </TabContent>
      </div>
    </React.Fragment>
  );
};

export default CalendarSidebar;
