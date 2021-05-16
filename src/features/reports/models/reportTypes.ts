export enum ReportType {
  Daily = 1,
  Weekly = 2,
  Custom = 3,
}

export const reportTypeToId: Record<string, ReportType> = {
  Daily: ReportType.Daily,
  Weekly: ReportType.Weekly,
  Custom: ReportType.Custom,
};

export const reportTypes = [
  ReportType.Daily,
  ReportType.Weekly,
  ReportType.Custom,
];

export const reportTypeTranslations = {
  [ReportType.Daily]: 'Kiekvieną dieną',
  [ReportType.Weekly]: 'Kiekvieną savaitę',
  [ReportType.Custom]: 'Pasirinktinis',
};
