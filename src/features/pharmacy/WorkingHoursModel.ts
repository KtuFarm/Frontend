import { Weekday } from './WeekdayModel';

export interface WorkingHours {
  id: number;
  openTime: string;
  closeTime: string;
  days: Weekday[];
}
