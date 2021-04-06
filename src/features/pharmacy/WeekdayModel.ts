export enum Weekday {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

export const Weekdays = [
  Weekday.Monday,
  Weekday.Tuesday,
  Weekday.Wednesday,
  Weekday.Thursday,
  Weekday.Friday,
  Weekday.Saturday,
  Weekday.Sunday,
];

export const dayAbbreviations = {
  [Weekday.Monday]: 'P',
  [Weekday.Tuesday]: 'A',
  [Weekday.Wednesday]: 'T',
  [Weekday.Thursday]: 'K',
  [Weekday.Friday]: 'Pn',
  [Weekday.Saturday]: 'Š',
  [Weekday.Sunday]: 'S',
};

export const dayToInt = {
  [Weekday.Monday]: 1,
  [Weekday.Tuesday]: 2,
  [Weekday.Wednesday]: 3,
  [Weekday.Thursday]: 4,
  [Weekday.Friday]: 5,
  [Weekday.Saturday]: 6,
  [Weekday.Sunday]: 7,
};
