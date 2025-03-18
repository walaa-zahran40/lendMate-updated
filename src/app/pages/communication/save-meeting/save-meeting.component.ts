import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CalendarOptions, DatesSetArg } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
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
  meetingTypeOptions = [
    { value: 'inPerson', label: 'In-Person Meeting', checked: false },
    { value: 'zoom', label: 'Zoom Meeting', checked: false },
    { value: 'teamMeeting', label: 'Team Meeting', checked: false },
    // Add more if needed
  ];
  holidays: Date[] = [new Date(2025, 2, 20), new Date(2025, 2, 25)];
  currentMonth: string = '';
  private isSameDay(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  handleDateClick = (arg: DateClickArg) => {
    this.selectedDate = arg.date;
  };

  dayCellClassNames = (arg: any) => {
    // If the date is in our holiday list
    const isHoliday = this.holidays.some((holiday) =>
      this.isSameDay(holiday, arg.date)
    );
    if (isHoliday) {
      return ['holiday-day'];
    }

    return [];
  };
  selectedDateForCalendar: Date = new Date();

  private isHoliday(date: Date): boolean {
    return this.holidays.some((h) => this.isSameDay(h, date));
  }
  dayHeaderClassNames = (arg: any) => {
    if (this.isHoliday(arg.date)) {
      return ['holiday-day'];
    }
    return [];
  };
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
        start: new Date(2025, 2, 18, 19, 0, 0, 0),
        end: new Date(2025, 2, 18, 20, 0, 0, 0),
        extendedProps: {
          members: [
            { name: 'Alice', avatarUrl: '/assets/images/calendar/alice.svg' },
            { name: 'Bob', avatarUrl: '/assets/images/calendar/bob.svg' },
          ],
        },
      },
      {
        title: 'Meeting',
        start: new Date(2025, 2, 19, 18, 0, 0, 0),
        end: new Date(2025, 2, 19, 20, 0, 0, 0),
      },
    ],
    eventContent: (arg) => {
      // Grab the event title, plus any extended props
      const event = arg.event;
      const { title, extendedProps } = event;
      const timeText = arg.timeText; // e.g. "10:00 - 11:00"

      // Extract the members array (if any)
      const members = extendedProps['members'] || [];

      // Build HTML for the member photos
      const photosHtml = members
        .map(
          (member: any) => `
            <img 
              class="event-member-img" 
              src="${member.avatarUrl}" 
              alt="${member.name}" 
              title="${member.name}" 
            />
          `
        )
        .join('');

      // Return a snippet of HTML that includes:
      // 1) The event title
      // 2) A "members" section with photos
      return {
        html: `
          <div class="custom-event-content">
            <div class="custom-event-title">${title}</div>
            <div class="custom-event-time">${timeText}</div>
            <div class="custom-event-members d-flex justify-content-end">${photosHtml}</div>
          </div>
        `,
      };
    },

    dayHeaderFormat: { weekday: 'short', day: 'numeric' },
    dateClick: this.handleDateClick,
    dayCellClassNames: this.dayCellClassNames,
    datesSet: this.handleDatesSet.bind(this),
    dayHeaderContent: (arg) => {
      const [dayName, dayNumber] = arg.text.split(' ');
      const uppercaseDayName = dayName.toUpperCase();

      const isHoliday = this.isHoliday(arg.date);

      if (isHoliday) {
        return {
          html: `
            <div class="fc-day-number">${dayNumber}</div>
            <div class="fc-day-name">${uppercaseDayName}</div>
            <div class="fc-holiday-label">Holiday</div>
          `,
        };
      } else {
        // Default (non-holiday) header
        return {
          html: `
            <div class="fc-day-number">${dayNumber}</div>
            <div class="fc-day-name">${uppercaseDayName}</div>
          `,
        };
      }
    },
    height: 'auto',
    contentHeight: 'auto',
    slotDuration: '01:00:00',
    slotLabelInterval: '01:00',
    dayHeaderClassNames: this.dayHeaderClassNames,
    handleWindowResize: true,
  };

  selectedDate: Date | null = null;

  ngAfterViewInit() {
    const calendarApi = this.calendarComponent.getApi();
    this.currentMonth = calendarApi.view.title;
  }

  handleDatesSet(args: DatesSetArg) {
    this.currentMonth = args.view.title;
  }
  onAddMeeting() {
    // This is where you might open a modal or navigate to another page
    // or push a new event into the calendar.
    // For a quick example, let's just log a message:
    console.log('Add Meeting button clicked!');
    // Or you could do something like:
    // this.calendarComponent.getApi().addEvent({
    //   title: 'New Meeting',
    //   start: new Date(),
    //   end: new Date(new Date().setHours(new Date().getHours() + 1)),
    // });
  }
  onDateSelect(date: Date) {
    console.log('User picked date: ', date);
    // If you want the calendar to jump to that date:
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate(date);
    // Optionally switch to a day view if you want:
    // calendarApi.changeView('timeGridDay', date);
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
