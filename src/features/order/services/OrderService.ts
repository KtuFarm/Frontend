import { CreateOrderDTO, ProductBalanceDTO } from 'swagger/models';

import { API_HOST, DEFAULT_HEADERS } from '../../../constants';

export const getOrders = async (): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Orders`, {
    headers: DEFAULT_HEADERS,
  });
};

export const getOrder = async (id: number | string): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Orders/${id}`, {
    headers: DEFAULT_HEADERS,
  });
};

export const createOrder = async (order: CreateOrderDTO): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Orders`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(order),
  });
};

export const updateOrder = async (
  id: number | string,
  products: ProductBalanceDTO[]
): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Orders/${id}`, {
    method: 'PUT',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(products),
  });
};

export const cancelOrder = async (id: number | string): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Orders/${id}/cancel`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
  });
};

export const approveOrder = async (id: number | string): Promise<Response> => {
  return fetch(`${API_HOST}/api/v1/Orders/${id}/approve`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
  });
};
