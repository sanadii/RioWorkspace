var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNullOrUndefined, addClass, createElement, append, EventHandler, extend, remove } from '@syncfusion/ej2-base';
import { ListBase } from '@syncfusion/ej2-lists';
import { ViewBase } from '../renderer/view-base';
import * as util from '../base/util';
import * as cls from '../base/css-constant';
import * as event from '../base/constant';
var AgendaBase = /** @class */ (function (_super) {
    __extends(AgendaBase, _super);
    function AgendaBase(parent) {
        return _super.call(this, parent) || this;
    }
    // eslint-disable-next-line max-len
    AgendaBase.prototype.createAgendaContentElement = function (type, listData, aTd, groupOrder, groupIndex) {
        var _this = this;
        var listElement;
        var fieldMapping = this.parent.eventFields;
        if (type === 'noEvents') {
            var noEvents = [{ 'subject': this.parent.localeObj.getConstant('noEvents') }];
            listElement = ListBase.createList(this.parent.createElement, noEvents, {
                moduleName: 'agenda',
                listClass: this.parent.activeView.viewClass,
                itemClass: this.parent.activeView.viewClass,
                template: "<div class=\"" + cls.AGENDA_NO_EVENT_CLASS + "\">" + this.parent.localeObj.getConstant('noEvents') + "</div>"
            });
            if (listElement.querySelector('.e-agenda-item').children.length === 0) {
                listElement.firstElementChild.appendChild(createElement('div', { className: cls.AGENDA_NO_EVENT_CLASS, innerHTML: this.parent.localeObj.getConstant('noEvents') }));
            }
        }
        else {
            listElement = ListBase.createList(this.parent.createElement, listData, {
                moduleName: 'agenda',
                listClass: this.parent.activeView.viewClass,
                itemClass: this.parent.activeView.viewClass
            });
            var listElements = [].slice.call(listElement.children);
            listElements.forEach(function (element, li) {
                var appWrapper = createElement('div', {
                    className: cls.APPOINTMENT_CLASS, attrs: {
                        'data-id': 'Appointment_' + listData[li][_this.parent.eventFields.id],
                        'data-guid': listData[li].Guid,
                        'role': 'button',
                        'tabindex': '0',
                        'aria-readonly': _this.parent.eventBase.getReadonlyAttribute(listData[li]),
                        'aria-selected': 'false',
                        'aria-grabbed': 'true',
                        'aria-label': _this.parent.getAnnouncementString(listData[li])
                    }
                });
                if (!isNullOrUndefined(groupIndex)) {
                    appWrapper.setAttribute('data-group-index', groupIndex.toString());
                }
                _this.parent.eventBase.applyResourceColor(appWrapper, listData[li], 'borderColor', groupOrder);
                var templateEle;
                if (!isNullOrUndefined(_this.parent.activeViewOptions.eventTemplate)) {
                    addClass([appWrapper], cls.EVENT_TEMPLATE);
                    var scheduleId = _this.parent.element.id + '_';
                    var viewName = _this.parent.activeViewOptions.eventTemplateName;
                    var templateId = scheduleId + viewName + 'eventTemplate';
                    templateEle = _this.parent.getAppointmentTemplate()(listData[li], _this.parent, 'eventTemplate', templateId, false);
                    if (!isNullOrUndefined(listData[li][fieldMapping.recurrenceRule])) {
                        var iconClass = (listData[li][fieldMapping.id] === listData[li][fieldMapping.recurrenceID]) ?
                            cls.EVENT_RECURRENCE_ICON_CLASS : cls.EVENT_RECURRENCE_EDIT_ICON_CLASS;
                        appWrapper.appendChild(createElement('div', { className: cls.ICON + ' ' + iconClass }));
                    }
                }
                else {
                    templateEle = _this.createAppointment(listData[li]);
                }
                append([].slice.call(templateEle), appWrapper);
                util.removeChildren(element);
                element.appendChild(appWrapper);
                var args = {
                    data: extend({}, listData[li], null, true),
                    element: element, cancel: false
                };
                _this.parent.trigger(event.eventRendered, args, function (eventArgs) {
                    if (eventArgs.cancel) {
                        remove(element);
                    }
                });
            });
        }
        aTd.appendChild(listElement);
        if ((this.parent.currentView === 'MonthAgenda' && this.parent.activeViewOptions.group.resources.length > 0)
            || this.parent.currentView === 'Agenda') {
            addClass([aTd], cls.AGENDA_DAY_BORDER_CLASS);
        }
        this.parent.renderTemplates();
        return aTd;
    };
    AgendaBase.prototype.createAppointment = function (event) {
        var fieldMapping = this.parent.eventFields;
        var eventSubject = (event[fieldMapping.subject] || this.parent.eventSettings.fields.subject.default
            || this.parent.localeObj.getConstant('addTitle'));
        var eventLocation = (event[fieldMapping.location] || this.parent.eventSettings.fields.location.default);
        var appSubjectWrap = createElement('div', { className: cls.SUBJECT_WRAP });
        if (!isNullOrUndefined(eventLocation) && eventLocation !== '') {
            eventSubject += ',';
        }
        appSubjectWrap.appendChild(createElement('div', { className: cls.SUBJECT_CLASS, innerHTML: eventSubject }));
        if (!isNullOrUndefined(eventLocation) && eventLocation !== '') {
            appSubjectWrap.appendChild(createElement('div', { className: cls.LOCATION_CLASS, innerHTML: eventLocation }));
        }
        if (!isNullOrUndefined(event[fieldMapping.recurrenceRule])) {
            var iconClass = (event[fieldMapping.id] === event[fieldMapping.recurrenceID]) ?
                cls.EVENT_RECURRENCE_ICON_CLASS : cls.EVENT_RECURRENCE_EDIT_ICON_CLASS;
            appSubjectWrap.appendChild(createElement('div', { className: cls.ICON + ' ' + iconClass }));
        }
        var strDate = event[fieldMapping.startTime];
        var endDate = event[fieldMapping.endTime];
        var isAllDay = event[fieldMapping.isAllDay];
        var allDayStr = this.parent.localeObj.getConstant('allDay');
        var timeStr = this.parent.getTimeString(strDate) + ' - ' + this.parent.getTimeString(endDate);
        if (!isNullOrUndefined(event.data)) {
            var milliSeconds = (endDate.getTimezoneOffset() !== strDate.getTimezoneOffset()) ?
                (endDate.getTime() - strDate.getTime() + 3600000) : (endDate.getTime() - strDate.getTime());
            var eventString = (milliSeconds / util.MS_PER_DAY) >= 1 ? allDayStr : timeStr;
            allDayStr = eventString + ' (' + this.parent.localeObj.getConstant('day') + ' '
                + event.data.index + '/' + event.data.count + ')';
        }
        var displayStr = (!isNullOrUndefined(event.data) || isAllDay) ? allDayStr : timeStr;
        var appDateTime = createElement('div', { className: cls.DATE_TIME_CLASS, innerHTML: displayStr });
        return [appSubjectWrap, appDateTime];
    };
    AgendaBase.prototype.processAgendaEvents = function (events) {
        var eventsProcessed = [];
        if (isNullOrUndefined(events)) {
            return eventsProcessed;
        }
        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var event_1 = events_1[_i];
            var spanned = this.parent.eventBase.splitEventByDay(event_1);
            eventsProcessed = eventsProcessed.concat(spanned.length > 1 ? spanned : event_1);
        }
        return eventsProcessed;
    };
    AgendaBase.prototype.wireEventActions = function () {
        var eventElement = [].slice.call(this.parent.element.querySelectorAll('.' + cls.APPOINTMENT_CLASS));
        for (var _i = 0, eventElement_1 = eventElement; _i < eventElement_1.length; _i++) {
            var element = eventElement_1[_i];
            this.parent.eventBase.wireAppointmentEvents(element, this.parent.getEventDetails(element), true);
        }
        var dateHeaderElement = [].slice.call(this.parent.element.querySelectorAll('.e-m-date'));
        for (var _a = 0, dateHeaderElement_1 = dateHeaderElement; _a < dateHeaderElement_1.length; _a++) {
            var element = dateHeaderElement_1[_a];
            EventHandler.add(element, 'click', this.parent.agendaModule.dayNavigationClick, this);
        }
    };
    AgendaBase.prototype.calculateResourceTableElement = function (tBody, noOfDays, agendaDate) {
        if (isNullOrUndefined(this.parent.resourceBase.lastResourceLevel)) {
            var level = this.getDateSlots(this.renderDates, this.parent.activeViewOptions.workDays);
            this.parent.resourceBase.generateResourceLevels(level);
        }
        var agendaLastDate = util.addDays(new Date(agendaDate.getTime()), noOfDays);
        var days = (this.parent.activeViewOptions.group.byDate || this.parent.currentView === 'MonthAgenda') ? noOfDays : 1;
        var resColl = this.parent.resourceBase.resourceCollection;
        var resData = this.parent.resourceBase.lastResourceLevel;
        var initialDate = agendaDate;
        for (var i = 0; i < days; i++) {
            var lastLevelInfo = [];
            var tempLastLevelInfo = [];
            var tempIndex = 0;
            var eventObj = void 0;
            var dateObj = void 0;
            var firstDate = util.addDays(initialDate, i);
            var finalDate = (this.parent.activeViewOptions.group.byDate || this.parent.currentView === 'MonthAgenda')
                ? util.addDays(firstDate, 1) : agendaLastDate;
            var agendaCollection = this.parent.eventBase.filterEvents(firstDate, finalDate);
            if (agendaCollection.length > 0 || !this.parent.hideEmptyAgendaDays || this.parent.currentView === 'MonthAgenda') {
                for (var res = 0; res < resData.length; res++) {
                    noOfDays = (!this.parent.activeViewOptions.group.byDate || this.parent.currentView === 'MonthAgenda') ? noOfDays : 1;
                    var data = [];
                    agendaDate = firstDate;
                    // eslint-disable-next-line max-len
                    var resDataCollection = this.parent.eventBase.filterEvents(agendaDate, agendaLastDate, agendaCollection, resData[res]);
                    if (resDataCollection.length > 0 || !this.parent.hideEmptyAgendaDays || this.parent.currentView === 'MonthAgenda') {
                        for (var r = 0; r < noOfDays; r++) {
                            // eslint-disable-next-line max-len
                            var resDayCollection = this.parent.eventBase.filterEvents(agendaDate, util.addDays(agendaDate, 1), resDataCollection, undefined);
                            if (resDayCollection.length > 0 || !this.parent.hideEmptyAgendaDays ||
                                this.parent.currentView === 'MonthAgenda') {
                                data.push(resDayCollection[0]);
                                eventObj = {
                                    rowSpan: 1, type: 'eventColumn', resource: resColl[resColl.length - 1],
                                    groupIndex: resData[res].groupIndex, groupOrder: resData[res].groupOrder,
                                    resourceData: resData[res].resourceData, eventData: resDayCollection, date: agendaDate
                                };
                                dateObj = {
                                    rowSpan: 1, type: 'dateColumn', resource: resColl[resColl.length - 1],
                                    groupOrder: resData[res].groupOrder, resourceData: resData[res].resourceData,
                                    date: agendaDate
                                };
                                if (!lastLevelInfo[tempIndex]) {
                                    lastLevelInfo[tempIndex] = [];
                                }
                                lastLevelInfo[tempIndex].push(eventObj);
                                lastLevelInfo[tempIndex].push(dateObj);
                                tempIndex++;
                            }
                            agendaDate = util.addDays(agendaDate, 1);
                            if (agendaDate.getTime() >= agendaLastDate.getTime() || this.parent.activeViewOptions.group.byDate
                                || this.parent.currentView === 'MonthAgenda') {
                                lastLevelInfo[lastLevelInfo.length - 1][1].cssClass = cls.AGENDA_DAY_BORDER_CLASS;
                                var tempObj = {
                                    rowSpan: data.length, type: 'resourceColumn', resource: resColl[resColl.length - 1],
                                    groupOrder: resData[res].groupOrder.slice(0, -1), resourceData: resData[res].resourceData,
                                    groupIndex: (lastLevelInfo.length - data.length), className: [cls.RESOURCE_NAME],
                                    date: agendaDate
                                };
                                lastLevelInfo[lastLevelInfo.length - data.length].push(tempObj);
                                tempLastLevelInfo.push(extend({}, tempObj, null, true));
                                break;
                            }
                        }
                    }
                }
                var topResources = resColl.slice(0, -1);
                var tempGroupedData = [];
                var totalRowSpan = 0;
                for (var y = 0; y < topResources.length; y++) {
                    var data = topResources[topResources.length - (y + 1)].dataSource;
                    for (var x = 0; x < data.length; x++) {
                        var z = 0;
                        for (var u = 0; u < tempLastLevelInfo.length; u++) {
                            // eslint-disable-next-line max-len
                            if (tempLastLevelInfo[u].groupOrder[topResources.length - (y + 1)] === data[x][topResources[topResources.length - (y + 1)].idField]) {
                                totalRowSpan = totalRowSpan + tempLastLevelInfo[u].rowSpan;
                                tempGroupedData.push(extend({}, tempLastLevelInfo[u], null, true));
                            }
                            if (++z === tempLastLevelInfo.length && tempGroupedData.length > 0) {
                                tempGroupedData[0].rowSpan = totalRowSpan;
                                tempGroupedData[0].type = 'parentColumnLevel_' + (y + 1);
                                tempGroupedData[0].resource = topResources[topResources.length - (y + 1)];
                                tempGroupedData[0].resourceData = data[x];
                                tempGroupedData[0].date = agendaDate;
                                lastLevelInfo[tempGroupedData[0].groupIndex].push(tempGroupedData[0]);
                                tempGroupedData = [];
                                totalRowSpan = 0;
                            }
                        }
                    }
                }
                this.createResourceTableRow(lastLevelInfo, tBody);
            }
        }
        var totalCollection = this.parent.eventBase.filterEvents(initialDate, agendaLastDate);
        if (totalCollection.length === 0 && !this.parent.activeViewOptions.allowVirtualScrolling && this.parent.hideEmptyAgendaDays) {
            this.renderEmptyContent(tBody, initialDate);
        }
    };
    AgendaBase.prototype.createResourceTableRow = function (tContent, tBody) {
        var tr = createElement('tr', { attrs: { role: 'row' } });
        var ntr;
        var td = createElement('td', { attrs: { role: 'gridcell', 'aria-selected': 'false' } });
        var tempData;
        var rowSpan = 0;
        var level;
        if (this.parent.activeViewOptions.group.byDate || this.parent.currentView === 'MonthAgenda') {
            var tContentCollection = [];
            var parentCollection = this.parent.resourceBase.resourceCollection.slice(0, -1);
            for (var w = 0; w < tContent.length; w++) {
                tContentCollection = tContentCollection.concat(tContent[w]);
            }
            level = (parentCollection.length > 0) ? 'parentColumnLevel_' + parentCollection.length : 'resourceColumn';
            var rowSpanCollection = tContentCollection.filter(function (data) { return data.type === level; });
            for (var x = 0; x < rowSpanCollection.length; x++) {
                rowSpan = rowSpan + rowSpanCollection[x].rowSpan;
            }
        }
        for (var row = 0; row < tContent.length; row++) {
            ntr = tr.cloneNode();
            for (var col = tContent[row].length - 1; col >= 0; col--) {
                var data = tContent[row][col];
                var ntd = td.cloneNode();
                if (data.type === 'dateColumn') {
                    if (this.parent.activeViewOptions.group.byDate || this.parent.currentView === 'MonthAgenda') {
                        tempData = tContent[row][col];
                        continue;
                    }
                    ntd.setAttribute('data-date', data.date.getTime().toString());
                    ntd.appendChild(this.createDateHeaderElement(data.date));
                    var className = [cls.AGENDA_CELLS_CLASS, cls.AGENDA_DATE_CLASS];
                    if (data.cssClass) {
                        className.push(data.cssClass);
                    }
                    addClass([ntd], className);
                    ntr.appendChild(ntd);
                }
                else if (data.type === 'eventColumn') {
                    var elementType = (data.eventData.length === 0) ? 'noEvents' : 'data';
                    ntd = this.createAgendaContentElement(elementType, data.eventData, ntd, data.groupOrder, data.groupIndex);
                    ntd.setAttribute('data-date', data.date.getTime().toString());
                    if (this.parent.activeViewOptions.group.byDate || this.parent.currentView === 'MonthAgenda') {
                        addClass([ntd], [cls.AGENDA_CELLS_CLASS, cls.AGENDA_DAY_PADDING_CLASS]);
                    }
                    ntr.appendChild(ntd);
                }
                else {
                    ntd.setAttribute('rowspan', data.rowSpan.toString());
                    addClass([ntd], cls.AGENDA_RESOURCE_CLASS);
                    this.setResourceHeaderContent(ntd, data, data.className[0]);
                    ntr.appendChild(ntd);
                }
            }
            if (this.parent.activeViewOptions.group.byDate && row === 0 && this.parent.currentView !== 'MonthAgenda') {
                var ntd = td.cloneNode();
                ntd.setAttribute('data-date', tempData.date.getTime().toString());
                ntd.setAttribute('rowspan', rowSpan.toString());
                ntd.appendChild(this.createDateHeaderElement(tempData.date));
                addClass([ntd], [cls.AGENDA_CELLS_CLASS, cls.AGENDA_DATE_CLASS, cls.DATE_BORDER_CLASS]);
                var daysCount = util.getDaysCount(this.parent.selectedDate.getTime(), tempData.date.getTime());
                ntr.setAttribute('aria-rowindex', daysCount.toString());
                if (this.parent.element.querySelector(".e-agenda-view tr[aria-rowindex=\"" + daysCount + "\"]")) {
                    break;
                }
                ntr.insertBefore(ntd, ntr.childNodes[0]);
            }
            tBody.appendChild(ntr);
        }
    };
    AgendaBase.prototype.createDateHeaderElement = function (date) {
        var dateHeader;
        if (this.parent.activeViewOptions.dateHeaderTemplate) {
            dateHeader = createElement('div', { className: cls.AGENDA_HEADER_CLASS });
            var args = { date: date, type: 'dateHeader' };
            var scheduleId = this.parent.element.id + '_';
            var viewName = this.parent.activeViewOptions.dateHeaderTemplateName;
            var templateId = scheduleId + viewName + 'dateHeaderTemplate';
            var dateTemplate = [].slice.call(this.parent.getDateHeaderTemplate()(args, this.parent, 'dateHeaderTemplate', templateId, false));
            append(dateTemplate, dateHeader);
        }
        else {
            dateHeader = this.getMobileDateElement(date, cls.AGENDA_HEADER_CLASS);
        }
        return dateHeader;
    };
    AgendaBase.prototype.renderEmptyContent = function (tBody, agendaDate) {
        var eTr = this.createTableRowElement(agendaDate, 'noEvents');
        var eTd = eTr.children[0];
        var noEvents = createElement('div', {
            className: cls.AGENDA_EMPTY_EVENT_CLASS,
            innerHTML: this.parent.localeObj.getConstant('noEvents')
        });
        eTd.appendChild(noEvents);
        tBody.appendChild(eTr);
    };
    AgendaBase.prototype.createTableRowElement = function (date, type) {
        var daysCount = util.getDaysCount(this.parent.selectedDate.getTime(), date.getTime());
        var tr = createElement('tr', { attrs: { 'role': 'row', 'aria-rowindex': daysCount.toString() } });
        var td = createElement('td', {
            attrs: {
                'class': (type === 'monthHeader') ? cls.MONTH_HEADER_CLASS : cls.AGENDA_CELLS_CLASS,
                'role': 'gridcell',
                'aria-selected': 'false',
                'aria-colindex': daysCount.toString(),
                'data-date': date.getTime().toString()
            }
        });
        var dTd = td.cloneNode();
        var aTd = td.cloneNode();
        tr.appendChild(dTd);
        if (type !== 'noEvents') {
            tr.appendChild(aTd);
        }
        return tr;
    };
    AgendaBase.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return AgendaBase;
}(ViewBase));
export { AgendaBase };
