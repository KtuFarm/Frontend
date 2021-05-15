import { components } from './definitions';

type schemas = components['schemas'];

export type GetPharmaciesDTO = schemas['PharmacyDTOGetListDTO'];
export type PharmacyDTO = schemas['PharmacyDTO'];
export type CreatePharmacyDTO = schemas['CreatePharmacyDTO'];
export type WorkingHoursDTO = schemas['WorkingHoursDTO'];
export type PharmacyFullDTO = schemas['PharmacyFullDTO'];
export type EditPharmacyDTO = schemas['EditPharmacyDTO'];
export type GetProductBalancesDTO = schemas['ProductBalanceDTOGetListDTO'];
export type ProductBalanceDTO = schemas['ProductBalanceDTO'];

export type GetMedicamentsDTO = schemas['MedicamentDTOGetListDTO'];
export type MedicamentDTO = schemas['MedicamentDTO'];
export type CreateMedicamentDTO = schemas['CreateMedicamentDTO'];
export type MedicamentFullDTO = schemas['MedicamentFullDTO'];
export type EditMedicamentDTO = schemas['EditMedicamentDTO'];

export type EnumDTO = schemas['EnumDTO'];
export type GetEnumerableDTO = schemas['EnumDTOGetListDTO'];

export type CreateTransactionDTO = schemas['CreateTransactionDTO'];
export type GetTransactionsDTO = schemas['TransactionDTOGetListDTO'];
export type TransactionDTO = schemas['TransactionDTO'];

export type UserDTO = schemas['UserFullDTO'];
export type LoginDTO = schemas['LoginDTO'];

export type OrderDTO = schemas['OrderDTO'];
export type GetOrdersDTO = schemas['OrderDTOGetListDTO'];
export type CreateOrderDTO = schemas['CreateOrderDTO'];
export type OrderFullDTO = schemas['OrderFullDTO'];

export type GetWarehousesDTO = schemas['WarehouseDTOGetListDTO'];
export type WarehouseDTO = schemas['WarehouseDTO'];
