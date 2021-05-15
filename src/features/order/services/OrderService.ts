import { CreateOrderDTO, ProductBalanceDTO } from 'swagger/models';

import { getHeadersWithAuth } from 'utils/headers';

import { API_HOST } from '../../../constants';

export const getOrders = async (): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Orders`, {
    headers: getHeadersWithAuth(),
  });
};

export const getOrder = async (id: number | string): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Orders/${id}`, {
    headers: getHeadersWithAuth(),
  });
};

export const createOrder = async (order: CreateOrderDTO): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Orders`, {
    method: 'POST',
    headers: getHeadersWithAuth(),
    body: JSON.stringify(order),
  });
};

export const updateOrder = async (
  id: number | string,
  products: ProductBalanceDTO[]
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Orders/${id}`, {
    method: 'PUT',
    headers: getHeadersWithAuth(),
    body: JSON.stringify(products),
  });
};

export const cancelOrder = async (id: number | string): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Orders/${id}/cancel`, {
    method: 'POST',
    headers: getHeadersWithAuth(),
  });
};

export const approveOrder = async (id: number | string): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Orders/${id}/approve`, {
    method: 'POST',
    headers: getHeadersWithAuth(),
  });
};

export const prepareOrder = async (id: number | string): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Orders/${id}/prepare`, {
    method: 'POST',
    headers: getHeadersWithAuth(),
  });
};
