import React, { useEffect, useRef, useState } from 'react';
import {
  ScheduleComponent, Day, Week, DragAndDrop, Inject, ViewsDirective, ViewDirective,
  RecurrenceEditorComponent
} from '@syncfusion/ej2-react-schedule';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { L10n } from '@syncfusion/ej2-base';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import moment from 'moment';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointment, updateAppointment, deleteAppointment } from "store/actions";

import {
  calendarSettings,
  getEventSettings,
  DateHeaderTemplate,
  useQuickInfoTemplates,
  useDataManager,
  eventTemplate,
} from "../SchedulerSettings";
L10n.load({
  'en-US': {
    schedule: {
      saveButton: 'Save',
      cancelButton: 'Cancel',
      deleteButton: 'Remove',
      newEvent: 'Add Time Slot',
      editEvent: 'Update Time Slot',
      deleteEvent: 'Delete Time Slot',
    },
  },
});

function Scheduler() {
  const { appointments: schedules, services, staff } = useDataManager();

  const scheduleObj = useRef();
  // const recurrenceObj = useRef();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'))?.user;
  const [visibility, setDialogVisibility] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    setTimeSlots(schedules);
  }, []);

  const dialogClose = () => {
    setDialogVisibility(false);
  };

  const onActionBegin = (args) => {
    if (args.requestType === 'eventCreate') {
      dispatch(addAppointment({
        startTime: args.data[0].startTime.toISOString(),
        endTime: args.data[0].endTime.toISOString(),
        sessionType: args.data[0].sessionType,
        // mhp: user.id,
      }));
    } else if (args.requestType === 'eventChange') {
      if (args.data.isBooked) {
        // eslint-disable-next-line
        args.cancel = true;
      }

    } else if (args.requestType === 'eventRemove') {
      if (args.data.isBooked) {
        // eslint-disable-next-line
        args.cancel = true;
      } else {
        dispatch(deleteAppointment(args.data[0].id));
      }
    }
  };

  const sendRescheduleRequest = (scheduleId) => {
    dispatch(deleteAppointment(scheduleId))
      .then(() => {
        setDialogVisibility(false);
      });
  };

  const cancelRescheduleRequest = (scheduleId) => {
    dispatch(deleteAppointment(scheduleId));
  };

  const rescheduleFooter = (props) => {
    return (
      <button
        type="button"
        className="e-control e-btn e-lib rescheduleModal__button e-primary e-flat"
        onClick={() => {
          if (!props.rescheduleRequested) {
            sendRescheduleRequest(props.id);
          } else {
            cancelRescheduleRequest(props.id);
          }
        }}
      >
        {props.rescheduleRequested ? 'Cancel Reschedule Request' : 'Request to Reschedule'}
      </button>
    );
  };

  const eventTemplate = (props) => {
    if (props.sessionType === 'Therapy Session') {
      if (props.isBooked) {
        return (
          <div onClick={() => setDialogVisibility(props.id)} role="button">
            <div className="schedulePage__schedulerEvent" style={{ background: '#AB70CA' }} role="button">
              <div>
                {props.rescheduleRequested ? (
                  <div>
                    Reschedule
                    <br />
                    Requested
                  </div>
                ) : 'Booked'}
              </div>
            </div>
            <DialogComponent
              width="400px"
              target="#dialog-target-schedule"
              isModal
              animationSettings={{ effect: 'Zoom', duration: 400, delay: 0 }}
              close={() => dialogClose()}
              header=""
              visible={visibility === props.id}
              showCloseIcon
              className="reschedule__modal"
              footerTemplate={() => rescheduleFooter(props)}
            >
              <div className="modal__clientProfile">
                <img src={props.user.image ? props.user.image.url : ''} alt="client profile pic" />
                <h2>{props.user.displayName}</h2>
              </div>
              <div className="modal__clientSchedule">
                <h4>{moment(props.startTime.toString()).utc().format('MMMM DD, YYYY')}</h4>
                <div className="modal__clientTime">
                  <h5>{moment(props.startTime.toString()).format('h:mma')}</h5>
                  <div className="modal__timeBar" />
                  <h5>{moment(props.endTime.toString()).format('h:mma')}</h5>
                </div>
              </div>
            </DialogComponent>
          </div>
        );
      }
      return (
        <div className="schedulePage__schedulerEvent" style={{ background: '#AB70CA' }} />
      );
    }

    if (props.isBooked) {
      return (
        <div onClick={() => setDialogVisibility(props.id)} role="button">
          <div className="schedulePage__schedulerEvent" style={{ background: '#FA8A8A' }} role="button">
            <div>Booked</div>
          </div>
          <DialogComponent
            width="400px"
            target="#dialog-target-schedule"
            isModal
            animationSettings={{ effect: 'Zoom', duration: 400, delay: 0 }}
            close={() => dialogClose()}
            header=""
            visible={visibility === props.id}
            showCloseIcon
            className="reschedule__modal"
            footerTemplate={() => rescheduleFooter(props)}
          >
            <div className="modal__clientProfile">
              <img src={props.user.image ? props.user.image.url : ''} alt="client profile pic" />
              <h2>{props.user.displayName}</h2>
            </div>
            <div className="modal__clientSchedule">
              <h4>{moment(props.startTime.toString()).utc().format('MMMM DD, YYYY')}</h4>
              <div className="modal__clientTime">
                <h5>{moment(props.startTime.toString()).format('h:mma')}</h5>
                <div className="modal__timeBar" />
                <h5>{moment(props.endTime.toString()).format('h:mma')}</h5>
              </div>
            </div>
          </DialogComponent>
        </div>
      );
    }
    return (
      <div className="schedulePage__schedulerEvent" style={{ background: '#FA8A8A' }} />
    );
  };

  const onSessionTypeChange = (args) => {
    if (args.itemData !== null) {
      const startObj = document.querySelector('#startTime')?.ej2_instances[0];
      const endObj = document.querySelector('#endTime')?.ej2_instances[0];
  
      if (!startObj || !endObj) {
        console.error("Start time or end time element not found.");
        return;
      }
  
      // Using optional chaining and nullish coalescing to provide a fallback value
      const sessionDuration = user?.sessionDuration ?? 30; // Default to 30 if not set
  
      if (args.itemData.value === 'Consultation Call') {
        endObj.value = startObj.value ? new Date(startObj.value.getTime() + 15 * 60000) : new Date();
      } else {
        endObj.value = startObj.value ? new Date(startObj.value.getTime() + sessionDuration * 60000) : new Date();
      }
    }
  };
  
  

  const onStartTimeChange = (args) => {
    const sessionObj = document.querySelector('#sessionType')?.ej2_instances[0];
    const endObj = document.querySelector('#endTime')?.ej2_instances[0];
  
    if (!sessionObj || !endObj) {
      console.error("Session or End Time element not found.");
      return;
    }
  
    // Use optional chaining and nullish coalescing to provide a fallback value
    const sessionDuration = user?.sessionDuration ?? 30; // Default to 30 if not set
  
    if (sessionObj.value === 'Consultation Call') {
      endObj.value = new Date(args.value.getTime() + 15 * 60000);
    } else {
      endObj.value = new Date(args.value.getTime() + sessionDuration * 60000);
    }
  };
  

  const editorTemplate = (props) => {
    return (props !== undefined ? (
      <table className="custom-event-editor" style={{ width: '100%', cellpadding: '5' }}>
        <tbody>
          <tr>
            <td className="e-textlabel">Session Type</td>
            <td className="custom-dropdown" colSpan={4}>
              <DropDownListComponent
                id="sessionType"
                placeholder="Session Type"
                data-name="sessionType"
                className="e-field"
                style={{ width: '100%' }}
                dataSource={[
                  { text: 'Therapy Session', value: '1' },
                  { text: 'Consultation Call', value: '2' },
                ]}
                fields={{ text: 'text', value: 'value' }}
                value={props.sessionType || 'null'}
                change={onSessionTypeChange}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Start Time</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                step={user?.sessionDuration ?? 30}  // Providing a default value if user or sessionDuration is undefined
                id="startTime"
                data-name="startTime"
                value={new Date(props.startTime || props.StartTime)}
                className="e-field"
                change={onStartTimeChange}
              />

            </td>
          </tr>
          <tr>
            <td className="e-textlabel">End Time</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                step={user?.sessionDuration ?? 30}
                id="endTime"
                data-name="endTime"
                value={new Date(props.endTime || props.EndTime)}
                className="e-field"
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Recurrence</td>
            <td colSpan={4}>
              {/* <RecurrenceEditorComponent ref={recurrenceObj} id="RecurrenceEditor" /> */}
            </td>

          </tr>
        </tbody>
      </table>
    ) : <div />);
  };

  const onPopupOpen = (args) => {
    if (args.data.isBooked) {
      args.cancel = true;
      return;  // Add return to exit the function early
    }
  
    if (args.type === 'Editor') {
      // scheduleObj.current.eventWindow.recurrenceEditor = recurrenceObj.current;
  
      const statusElement = args.element.querySelector('#sessionType');
      if (statusElement) {
        statusElement.setAttribute('name', 'sessionType');
  
        const sessionObj = document.querySelector('#sessionType').ej2_instances[0];
        sessionObj.value = args.data.sessionType ? args.data.sessionType : 'Therapy Session';
  
        const endObj = document.querySelector('#endTime').ej2_instances[0];
        if (endObj) {
          endObj.value = args.data.endTime ? args.data.endTime : new Date(endObj.value.getTime() + (user?.sessionDuration ?? 30 - 30) * 60000);
        }
      }
    }
  };
  

  const onCellClick = (args) => {
    scheduleObj.current.openEditor(args, 'Add');
  };

  const onEventClick = (args) => {
    if (!args.event.RecurrenceRule) {
      scheduleObj.current.openEditor(args.event, 'Save');
    } else {
      scheduleObj.current.quickPopup.openRecurrenceAlert();
    }
  };

  return (
    <ScheduleComponent
      ref={scheduleObj}
      showQuickInfo={false}
      eventClick={onEventClick}
      cellClick={onCellClick}
      eventSettings={{
        dataSource: timeSlots,
        template: eventTemplate,
        fields: {
          id: 'id',
          isBooked: 'isBooked',
          sessionType: { name: 'sessionType', validation: { required: true } },
          startTime: { name: 'startTime', validation: { required: true } },
          endTime: { name: 'endTime', validation: { required: true } },
        },
      }}
      popupOpen={onPopupOpen}
      actionBegin={onActionBegin}
      editorTemplate={editorTemplate}
      className="schedulePage__scheduler"
      width="100%"
      height="75vh"
      selectedDate={new Date()}
      enablePersistence
    >
      <ViewsDirective>
        <ViewDirective option="Week" />
        <ViewDirective option="Day" />
      </ViewsDirective>
      <Inject services={[Day, Week, DragAndDrop]} />
    </ScheduleComponent>
  );
}

export default Scheduler;
