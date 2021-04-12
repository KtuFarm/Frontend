/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/api/v1/Medicaments': {
    get: {
      parameters: {
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            'text/plain': components['schemas']['GetMedicamentsDTO'];
            'application/json': components['schemas']['GetMedicamentsDTO'];
            'text/json': components['schemas']['GetMedicamentsDTO'];
          };
        };
      };
    };
    post: {
      parameters: {
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: unknown;
      };
      requestBody: {
        content: {
          'application/json-patch+json': components['schemas']['CreateMedicamentDTO'];
          'application/json': components['schemas']['CreateMedicamentDTO'];
          'text/json': components['schemas']['CreateMedicamentDTO'];
          'application/*+json': components['schemas']['CreateMedicamentDTO'];
        };
      };
    };
  };
  '/api/v1/Medicaments/{id}': {
    get: {
      parameters: {
        path: {
          id: number;
        };
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            'text/plain': components['schemas']['GetMedicamentDTO'];
            'application/json': components['schemas']['GetMedicamentDTO'];
            'text/json': components['schemas']['GetMedicamentDTO'];
          };
        };
      };
    };
    put: {
      parameters: {
        path: {
          id: number;
        };
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: unknown;
      };
      requestBody: {
        content: {
          'application/json-patch+json': components['schemas']['EditMedicamentDTO'];
          'application/json': components['schemas']['EditMedicamentDTO'];
          'text/json': components['schemas']['EditMedicamentDTO'];
          'application/*+json': components['schemas']['EditMedicamentDTO'];
        };
      };
    };
    delete: {
      parameters: {
        path: {
          id: number;
        };
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: unknown;
      };
    };
  };
  '/api/v1/PaymentTypes': {
    get: {
      parameters: {
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            'text/plain': components['schemas']['GetEnumerableDTO'];
            'application/json': components['schemas']['GetEnumerableDTO'];
            'text/json': components['schemas']['GetEnumerableDTO'];
          };
        };
      };
    };
  };
  '/api/v1/PharmaceuticalForms': {
    get: {
      parameters: {
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            'text/plain': components['schemas']['GetEnumerableDTO'];
            'application/json': components['schemas']['GetEnumerableDTO'];
            'text/json': components['schemas']['GetEnumerableDTO'];
          };
        };
      };
    };
  };
  '/api/v1/Pharmacies': {
    get: {
      parameters: {
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            'text/plain': components['schemas']['GetPharmaciesDTO'];
            'application/json': components['schemas']['GetPharmaciesDTO'];
            'text/json': components['schemas']['GetPharmaciesDTO'];
          };
        };
      };
    };
    post: {
      parameters: {
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: unknown;
      };
      requestBody: {
        content: {
          'application/json-patch+json': components['schemas']['CreatePharmacyDTO'];
          'application/json': components['schemas']['CreatePharmacyDTO'];
          'text/json': components['schemas']['CreatePharmacyDTO'];
          'application/*+json': components['schemas']['CreatePharmacyDTO'];
        };
      };
    };
  };
  '/api/v1/Pharmacies/all': {
    get: {
      parameters: {
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            'text/plain': components['schemas']['GetPharmaciesDTO'];
            'application/json': components['schemas']['GetPharmaciesDTO'];
            'text/json': components['schemas']['GetPharmaciesDTO'];
          };
        };
      };
    };
  };
  '/api/v1/Pharmacies/{id}': {
    get: {
      parameters: {
        path: {
          id: number;
        };
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            'text/plain': components['schemas']['GetPharmacyDTO'];
            'application/json': components['schemas']['GetPharmacyDTO'];
            'text/json': components['schemas']['GetPharmacyDTO'];
          };
        };
      };
    };
    put: {
      parameters: {
        path: {
          id: number;
        };
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: unknown;
      };
      requestBody: {
        content: {
          'application/json-patch+json': components['schemas']['EditPharmacyDTO'];
          'application/json': components['schemas']['EditPharmacyDTO'];
          'text/json': components['schemas']['EditPharmacyDTO'];
          'application/*+json': components['schemas']['EditPharmacyDTO'];
        };
      };
    };
    delete: {
      parameters: {
        path: {
          id: number;
        };
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: unknown;
      };
    };
  };
  '/api/v1/Pharmacies/{id}/products': {
    get: {
      parameters: {
        path: {
          id: number;
        };
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            'text/plain': components['schemas']['GetProductBalancesDTO'];
            'application/json': components['schemas']['GetProductBalancesDTO'];
            'text/json': components['schemas']['GetProductBalancesDTO'];
          };
        };
      };
    };
  };
  '/api/v1/Pharmacies/{id}/transactions': {
    get: {
      parameters: {
        path: {
          id: number;
        };
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            'text/plain': components['schemas']['GetTransactionsDTO'];
            'application/json': components['schemas']['GetTransactionsDTO'];
            'text/json': components['schemas']['GetTransactionsDTO'];
          };
        };
      };
    };
  };
  '/api/v1/Transactions': {
    post: {
      parameters: {
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: unknown;
      };
      requestBody: {
        content: {
          'application/json-patch+json': components['schemas']['CreateTransactionDTO'];
          'application/json': components['schemas']['CreateTransactionDTO'];
          'text/json': components['schemas']['CreateTransactionDTO'];
          'application/*+json': components['schemas']['CreateTransactionDTO'];
        };
      };
    };
  };
  '/api/v1/Users': {
    get: {
      parameters: {
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            'text/plain': components['schemas']['UserDTO'];
            'application/json': components['schemas']['UserDTO'];
            'text/json': components['schemas']['UserDTO'];
          };
        };
      };
    };
    post: {
      parameters: {
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: unknown;
      };
      requestBody: {
        content: {
          'application/json-patch+json': components['schemas']['CreateUserDTO'];
          'application/json': components['schemas']['CreateUserDTO'];
          'text/json': components['schemas']['CreateUserDTO'];
          'application/*+json': components['schemas']['CreateUserDTO'];
        };
      };
    };
  };
  '/api/v1/Users/{id}': {
    get: {
      parameters: {
        path: {
          id: number;
        };
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            'text/plain': components['schemas']['GetPharmacyDTO'];
            'application/json': components['schemas']['GetPharmacyDTO'];
            'text/json': components['schemas']['GetPharmacyDTO'];
          };
        };
      };
    };
    put: {
      parameters: {
        path: {
          id: number;
        };
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: unknown;
      };
      requestBody: {
        content: {
          'application/json-patch+json': components['schemas']['EditUserDTO'];
          'application/json': components['schemas']['EditUserDTO'];
          'text/json': components['schemas']['EditUserDTO'];
          'application/*+json': components['schemas']['EditUserDTO'];
        };
      };
    };
  };
  '/api/v1': {
    get: {
      parameters: {
        header: {
          /** Api Request header */
          'X-Api-Request': string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            'application/json': components['schemas']['MessageDTO'];
          };
        };
      };
    };
  };
}

export interface components {
  schemas: {
    CreateMedicamentDTO: {
      name?: string | null;
      activeSubstance?: string | null;
      barCode?: string | null;
      pharmaceuticalFormId?: number;
      country?: string | null;
      isPrescriptionRequired?: boolean;
      basePrice?: number;
      surcharge?: number;
      isReimbursed?: boolean;
      reimbursePercentage?: number | null;
    };
    CreatePharmacyDTO: {
      address?: string | null;
      city?: string | null;
      registersCount?: number;
      workingHours?: components['schemas']['WorkingHoursDTO'][] | null;
    };
    CreateTransactionDTO: {
      products?: components['schemas']['TransactionProductDTO'][] | null;
      pharmacyId?: number;
      registerId?: number;
      paymentTypeId?: number;
    };
    CreateUserDTO: {
      name?: string | null;
      surname?: string | null;
      position?: string | null;
      pharmacyId?: number | null;
    };
    EditMedicamentDTO: {
      isPrescriptionRequired?: boolean | null;
      basePrice?: number | null;
      surcharge?: number | null;
      isReimbursed?: boolean | null;
      reimbursePercentage?: number | null;
    };
    EditPharmacyDTO: {
      address?: string | null;
      city?: string | null;
      workingHours?: components['schemas']['WorkingHoursDTO'][] | null;
    };
    EditUserDTO: {
      name?: string | null;
      surname?: string | null;
      position?: string | null;
      pharmacyId?: number | null;
      dismissalDate?: string | null;
      employeeState?: string | null;
    };
    EnumDTO: {
      id?: number;
      name?: string | null;
    };
    GetEnumerableDTO: {
      meta?: components['schemas']['Meta'];
      data?: components['schemas']['EnumDTO'][] | null;
    };
    GetMedicamentDTO: {
      meta?: components['schemas']['Meta'];
      data?: components['schemas']['MedicamentFullDTO'];
    };
    GetMedicamentsDTO: {
      meta?: components['schemas']['Meta'];
      data?: components['schemas']['MedicamentDTO'][] | null;
    };
    GetPharmacyDTO: {
      meta?: components['schemas']['Meta'];
      data?: components['schemas']['PharmacyFullDTO'];
    };
    GetPharmaciesDTO: {
      meta?: components['schemas']['Meta'];
      data?: components['schemas']['PharmacyDTO'][] | null;
    };
    GetProductBalancesDTO: {
      meta?: components['schemas']['Meta'];
      data?: components['schemas']['ProductBalanceDTO'][] | null;
    };
    GetTransactionsDTO: {
      meta?: components['schemas']['Meta'];
      data?: components['schemas']['TransactionDTO'][] | null;
    };
    MedicamentDTO: {
      id?: number;
      name?: string | null;
      activeSubstance?: string | null;
      barCode?: string | null;
      price?: number;
      isPrescriptionRequired?: boolean;
    };
    MedicamentFullDTO: {
      country?: string | null;
      manufacturer?: string | null;
      pharmaceuticalForm?: string | null;
      isReimbursed?: boolean;
      reimbursePercentage?: number;
      basePrice?: number;
      surcharge?: number;
      id?: number;
      name?: string | null;
      activeSubstance?: string | null;
      barCode?: string | null;
      price?: number;
      isPrescriptionRequired?: boolean;
    };
    MessageData: {
      message?: string | null;
    };
    MessageDTO: {
      meta?: components['schemas']['Meta'];
      data?: components['schemas']['MessageData'];
    };
    Meta: { [key: string]: unknown };
    PharmacyDTO: {
      pharmacyNo?: number;
      address?: string | null;
      city?: string | null;
    };
    PharmacyFullDTO: {
      workingHours?: components['schemas']['WorkingHoursDTO'][] | null;
      registers?: components['schemas']['RegisterDTO'][] | null;
      pharmacyNo?: number;
      address?: string | null;
      city?: string | null;
    };
    ProductBalanceDTO: {
      id?: number;
      medicamentName?: string | null;
      price?: number;
      amount?: number;
      expirationDate?: string | null;
    };
    RegisterDTO: {
      id?: number;
      cash?: number;
    };
    TransactionDTO: {
      createdAt?: string | null;
      totalPrice?: number;
    };
    TransactionProductDTO: {
      productBalanceId?: number;
      amount?: number;
    };
    UserDTO: {
      id?: number;
      name?: string | null;
      surname?: string | null;
      registrationDate?: string;
      dismissalDate?: string | null;
      position?: string | null;
      employeeState?: string | null;
    };
    WorkingHoursDTO: {
      openTime?: string | null;
      closeTime?: string | null;
      dayOfWeek?: number;
    };
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface operations {}
