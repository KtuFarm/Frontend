import { CreateReportDTO } from 'swagger/models';

import { getHeadersWithAuth } from 'utils/headers';

import { API_HOST } from '../../../constants';

export const getReports = async (): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Reports`, {
    headers: getHeadersWithAuth(),
  });
};

export const getReport = async (id: number | string): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Reports/${id}`, {
    headers: getHeadersWithAuth(),
  });
};

export const createReport = async (
  report: CreateReportDTO
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Reports`, {
    method: 'POST',
    headers: getHeadersWithAuth(),
    body: JSON.stringify(report),
  });
};
