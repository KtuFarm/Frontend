import { Weekday } from './WeekdayModel';

export interface WorkingHours {
  openTime: string;
  closeTime: string;
  days: Weekday[];
}
