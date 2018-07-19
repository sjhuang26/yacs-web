import { Component, Input, AfterViewInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { ConstantsService } from '../../services/constants';
import { ScheduleEvent } from '../../models/schedule-event.model';
import { Schedule } from '../../models/schedule.model';
import { Section } from '../../models/section.model';
import { SelectionService } from '../../services/selection.service'

@Component({
  selector: 'schedule',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  // don't need to specify ConstantsService here as long as
  // it's on the AppComponent
  providers: [
    // ConstantsService,
  ],
})

export class ScheduleComponent implements AfterViewInit {
  @Input() schedule: Schedule;
  constants: ConstantsService;
  @ViewChild('mySchedule')
  public mySchedule:ElementRef
  public scheduleNode;

  @Input() excludedCells: object;
  @Output() excludedCellsChange = new EventEmitter<object>();

  // this uses constants - inject the constants service
  constructor(constants: ConstantsService) {
    this.constants = constants;
  }

  public longDayName(day: number) {
    return this.constants.longDayName(day);
  }

  public hourName(hour: number){
    hour = hour / 60;
    if (hour === 0) {
        return '12 AM';
      }
      else if (hour < 12) {
        return hour + ' AM';
      }
      else if (hour === 12) {
        return 'Noon';
      }
      else {
        return (hour - 12) + ' PM';
      }
  }

  /* Filter and return only the periods on a given day. */
  public periodsOnDay(day: number) {
    return this.schedule.periods.filter(p => (p.day === day));
  }

  public get getDayWidth(): number {
    return (100 / this.schedule.getDaySpan);
  }

  public get getHourHeight(){
    return (60 * 100 / this.schedule.getTimeSpan);
  }

  public eventPosition(eventStart: number){
    return (this.schedule.height * ((eventStart - this.schedule.earliestStart) / this.schedule.getTimeSpan));
  }

  public eventHeight(eventDuration: number){
    return (this.schedule.height  * (eventDuration / this.schedule.getTimeSpan));
  }

  public getBackgroundColor(color: number){
    return Schedule.COLORS[color];
  }

  public getBorderColor(color: number){
    return Schedule.BORDER_COLORS[color];
  }

  public getTextColor(color: number){
    return Schedule.TEXT_COLORS[color];
  }

  ngAfterViewInit() {
      this.scheduleNode = this.mySchedule.nativeElement;
  }

}
