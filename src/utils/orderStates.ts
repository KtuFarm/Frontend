import { Department } from './departments';

export enum OrderState {
  Created = 'Created',
  Approved = 'Approved',
  InPreparation = 'InPreparation',
  Ready = 'Ready',
  InTransit = 'InTransit',
  Delivered = 'Delivered',
  Returning = 'Returning',
  Returned = 'Returned',
  Canceled = 'Canceled',
}

export const stateTranslations = {
  [OrderState.Created]: 'Sukurtas',
  [OrderState.Approved]: 'Patvirtintas',
  [OrderState.InPreparation]: 'Ruošiamas',
  [OrderState.Ready]: 'Paruoštas',
  [OrderState.InTransit]: 'Pristatomas',
  [OrderState.Delivered]: 'Pristatytas',
  [OrderState.Returning]: 'Grąžinamas',
  [OrderState.Returned]: 'Grąžintas',
  [OrderState.Canceled]: 'Atšauktas',
};

export const canCancel = (state: OrderState, department: Department): boolean =>
  [OrderState.Created, OrderState.Approved].includes(state) &&
  department === Department.Pharmacy;

export const canEdit = (state: OrderState, department: Department): boolean =>
  ([OrderState.Created, OrderState.Approved].includes(state) &&
    department === Department.Pharmacy) ||
  department === Department.Warehouse;

export const canApprove = (
  state: OrderState,
  department: Department
): boolean =>
  state === OrderState.Created && department === Department.Pharmacy;

export const canPrepare = (
  state: OrderState,
  department: Department
): boolean =>
  state === OrderState.Approved && department === Department.Warehouse;
