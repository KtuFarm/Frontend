import { WorkingHoursDTO } from './WorkingHoursDTO';

export interface PharmacyDTO {
  address: string;
  city: string;
  workingHours: WorkingHoursDTO[];
}
