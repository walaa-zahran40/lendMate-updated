import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CalendarOptions, DatesSetArg } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
const viewTypeMap: any = {
  month: 'dayGridMonth',
  week: 'timeGridWeek',
  day: 'timeGridDay',
};
@Component({
  selector: 'app-save-meeting',
  standalone: false,
  templateUrl: './save-meeting.component.html',
  styleUrl: './save-meeting.component.scss',
})
export class SaveMeetingComponent implements AfterViewInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  selectedView: string = 'week';

  currentMonth: string = '';

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    weekends: true,
    headerToolbar: false,
    allDayText: 'GMT +07',
    locale: 'en-US',
    events: [
      {
        title: 'Meeting',
        start: new Date(),
        end: new Date(new Date().setHours(20, 0, 0, 0)), // 8 PM today
      },
    ],
    datesSet: this.handleDatesSet.bind(this),
    height: 'auto',
    contentHeight: 'auto',
    slotDuration: '01:00:00',
    slotLabelInterval: '01:00',
    handleWindowResize: true,
  };

  ngAfterViewInit() {
    const calendarApi = this.calendarComponent.getApi();
    this.currentMonth = calendarApi.view.title;
  }

  handleDatesSet(args: DatesSetArg) {
    this.currentMonth = args.view.title;
  }

  goNext() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next();
    this.currentMonth = calendarApi.view.title; // correct
  }

  goPrev() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.prev();
    this.currentMonth = calendarApi.view.title;
  }

  today() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.today();
    this.currentMonth = calendarApi.view.title;
  }

  changeView(viewType: string) {
    this.calendarComponent.getApi().changeView(viewTypeMap[viewType]);
    this.currentMonth = this.calendarComponent.getApi().view.title;
    this.selectedView = viewType; // for styling
  }
}
