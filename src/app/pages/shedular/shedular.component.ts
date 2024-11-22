import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../common/header/header.component";

interface Event {
  title: string;
  time: string;
}

interface CalendarDay {
  date: number;
  isToday: boolean;
  isActive: boolean;
  isPrevDate: boolean;
  isNextDate: boolean;
}

@Component({
  selector: 'app-shedular',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent],
  templateUrl: './shedular.component.html',
  styleUrl: './shedular.component.css'
})
export class ShedularComponent implements OnInit{
  today: Date = new Date();
  month: number = this.today.getMonth();
  year: number = this.today.getFullYear();
  activeDay: number | null = this.today.getDate();
  days: CalendarDay[] = [];
  eventsArr: { day: number; month: number; year: number; events: Event[] }[] = [];
  events: Event[] = [];
  inputDate: string = '';
  newEventTitle: string = '';
  newEventTimeFrom: string = '';
  newEventTimeTo: string = '';
  showAddEvent: boolean = false;
  
  monthName: string = '';
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  activeDayName: string = '';
  activeDate: string = '';

  ngOnInit(): void {
    this.loadEvents();
    this.initCalendar();
  }

  initCalendar(): void {
    const firstDay = new Date(this.year, this.month, 1);
    const lastDay = new Date(this.year, this.month + 1, 0);
    const prevLastDay = new Date(this.year, this.month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const dayOfWeek = firstDay.getDay();

    this.monthName = this.getMonthName(this.month);
    this.days = [];
    
    // Days from the previous month
    for (let x = dayOfWeek; x > 0; x--) {
      this.days.push({ date: prevDays - x + 1, isToday: false, isActive: false, isPrevDate: true, isNextDate: false });
    }

    // Current month days
    for (let i = 1; i <= lastDate; i++) {
      const isToday = i === this.today.getDate() && this.year === this.today.getFullYear() && this.month === this.today.getMonth();
      const isActive = i === this.activeDay;
      this.days.push({ date: i, isToday, isActive, isPrevDate: false, isNextDate: false });
    }

    // Days from the next month
    const nextDays = 7 - lastDay.getDay() - 1;
    for (let j = 1; j <= nextDays; j++) {
      this.days.push({ date: j, isToday: false, isActive: false, isPrevDate: false, isNextDate: true });
    }
  }

  getMonthName(monthIndex: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
  }

  prevMonth(): void {
    this.month--;
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    }
    this.initCalendar();
  }

  nextMonth(): void {
    this.month++;
    if (this.month > 11) {
      this.month = 0;
      this.year++;
    }
    this.initCalendar();
  }

  goToToday(): void {
    this.today = new Date();
    this.month = this.today.getMonth();
    this.year = this.today.getFullYear();
    this.initCalendar();
  }

  gotoDate(): void {
    const dateArr = this.inputDate.split('/');
    if (dateArr.length === 2) {
      const month = Number(dateArr[0]) - 1;
      const year = Number(dateArr[1]);
      if (month >= 0 && month <= 11 && year > 1000) {
        this.month = month;
        this.year = year;
        this.initCalendar();
        return;
      }
    }
    alert('Invalid Date');
  }

  selectDay(day: CalendarDay): void {
    if (day.isPrevDate) {
      this.prevMonth();
      this.selectDayByDate(day.date);
      return;
    }
    if (day.isNextDate) {
      this.nextMonth();
      this.selectDayByDate(day.date);
      return;
    }
    this.activeDay = day.date;
    this.updateActiveDay(day.date);
    this.updateEvents(day.date);
  }

  selectDayByDate(date: number): void {
    setTimeout(() => {
      const day = this.days.find(d => d.date === date && !d.isPrevDate && !d.isNextDate);
      if (day) this.selectDay(day);
    }, 100);
  }

  updateActiveDay(date: number): void {
    const day = new Date(this.year, this.month, date);
    this.activeDayName = day.toLocaleString('en-US', { weekday: 'short' });
    this.activeDate = `${date} ${this.getMonthName(this.month)} ${this.year}`;
  }

  updateEvents(date: number): void {
    this.events = this.getEventsForDate(date, this.month + 1, this.year);
  }

  toggleAddEvent(): void {
    this.showAddEvent = !this.showAddEvent;
  }

  addEvent(): void {
    if (this.newEventTitle && this.newEventTimeFrom && this.newEventTimeTo) {
      const event: Event = {
        title: this.newEventTitle,
        time: `${this.newEventTimeFrom} - ${this.newEventTimeTo}`
      };
      this.saveEvent(event);
      this.newEventTitle = '';
      this.newEventTimeFrom = '';
      this.newEventTimeTo = '';
      this.toggleAddEvent();
      if (this.activeDay !== null) this.updateEvents(this.activeDay);
    } else {
      alert('Please fill all fields');
    }
  }

  deleteEvent(event: Event): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.removeEvent(event);
      if (this.activeDay !== null) this.updateEvents(this.activeDay);
    }
  }

  loadEvents(): void {
    this.eventsArr = JSON.parse(localStorage.getItem('events') || '[]');
  }

  getEventsForDate(day: number, month: number, year: number): Event[] {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const dateEvents = storedEvents.find((e: any) => e.day === day && e.month === month && e.year === year);
    return dateEvents ? dateEvents.events : [];
  }

  saveEvent(event: Event): void {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    let dateEvents = storedEvents.find((e: any) => e.day === this.activeDay && e.month === this.month + 1 && e.year === this.year);
    
    if (!dateEvents) {
      dateEvents = { day: this.activeDay, month: this.month + 1, year: this.year, events: [] };
      storedEvents.push(dateEvents);
    }

    dateEvents.events.push(event);
    localStorage.setItem('events', JSON.stringify(storedEvents));
  }

  removeEvent(event: Event): void {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const dateEvents = storedEvents.find((e: any) => e.day === this.activeDay && e.month === this.month + 1 && e.year === this.year);
    
    if (dateEvents) {
      const eventIndex = dateEvents.events.findIndex((e: Event) => e.title === event.title && e.time === event.time);
      if (eventIndex > -1) {
        dateEvents.events.splice(eventIndex, 1);
        if (dateEvents.events.length === 0) {
          storedEvents.splice(storedEvents.indexOf(dateEvents), 1);
        }
      }
      localStorage.setItem('events', JSON.stringify(storedEvents));
    }
  }

}
