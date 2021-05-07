import { components } from './definitions';

export type GetPharmaciesDTO = components['schemas']['PharmacyDTOGetListDTO'];
export type PharmacyDTO = components['schemas']['PharmacyDTO'];
export type CreatePharmacyDTO = components['schemas']['CreatePharmacyDTO'];
export type WorkingHoursDTO = components['schemas']['WorkingHoursDTO'];
export type PharmacyFullDTO = components['schemas']['PharmacyFullDTO'];
export type EditPharmacyDTO = components['schemas']['EditPharmacyDTO'];
export type GetProductBalancesDTO = components['schemas']['ProductBalanceDTOGetListDTO'];
export type ProductBalanceDTO = components['schemas']['ProductBalanceDTO'];

export type GetMedicamentsDTO = components['schemas']['MedicamentDTOGetListDTO'];
export type MedicamentDTO = components['schemas']['MedicamentDTO'];
export type CreateMedicamentDTO = components['schemas']['CreateMedicamentDTO'];
export type MedicamentFullDTO = components['schemas']['MedicamentFullDTO'];
export type EditMedicamentDTO = components['schemas']['EditMedicamentDTO'];

export type EnumDTO = components['schemas']['EnumDTO'];
export type GetEnumerableDTO = components['schemas']['EnumDTOGetListDTO'];

export type CreateTransactionDTO = components['schemas']['CreateTransactionDTO'];
export type GetTransactionsDTO = components['schemas']['TransactionDTOGetListDTO'];
export type TransactionDTO = components['schemas']['TransactionDTO'];
