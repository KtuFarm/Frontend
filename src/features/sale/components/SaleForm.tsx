import React, { useEffect, useState } from 'react';
import {
  CreateTransactionDTO,
  EnumDTO,
  MedicamentDTO,
  ProductBalanceDTO,
} from 'swagger/models';

import { Button } from 'components/Button';
import { Label } from 'components/Label';
import { Select } from 'components/Select';

import { paymentTypeTranslation } from '../models/PaymentTypes';

import { ProductSelect } from './ProductSelect';

interface SaleItem {
  product: ProductBalanceDTO;
  amount: number;
}

const formatMoney = (amount: number): string =>
  amount.toLocaleString('lt-LT', { style: 'currency', currency: 'EUR' });

interface SaleFormProps {
  paymentTypes: EnumDTO[];
  loading: boolean;
  error: string;
  submitting: boolean;
  onSubmit: (transaction: CreateTransactionDTO) => unknown;
  onClearError: () => unknown;
}

export const SaleForm = ({
  paymentTypes,
  submitting,
  error,
  loading,
  onClearError,
  onSubmit,
}: SaleFormProps): JSX.Element => {
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [paymentTypeId, setPaymentTypeId] = useState(1);

  useEffect(() => {
    onClearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saleItems, paymentTypeId]);

  const handleChangePaymentType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setPaymentTypeId(Number(event.target.value));
  };

  const handleAdd = (medicament: MedicamentDTO): void => {
    setSaleItems([...saleItems, { product: medicament, amount: 1 }]);
  };

  const handleRemove = (id: number | undefined): void => {
    if (id === undefined) return;

    setSaleItems(saleItems.filter((item) => item.product.id !== id));
  };

  const handleChangeAmount = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number | undefined
  ): void => {
    if (id === undefined) return;

    const newAmount = Number(event.target.value);

    if (Number.isNaN(newAmount)) return;

    const newSaleItems = [...saleItems];
    const index = newSaleItems.findIndex((item) => item.product.id === id);
    newSaleItems[index].amount = newAmount;

    setSaleItems(newSaleItems);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const products = saleItems.map((item) => ({
      amount: item.amount,
      productBalanceId: item.product.id,
    }));

    const transaction: CreateTransactionDTO = {
      products,
      registerId: 130,
      paymentTypeId,
    };

    onSubmit(transaction);
  };

  if (loading) {
    return <p>Kraunama...</p>;
  }

  return (
    <form className="md:w-2/3" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -m-2">
        <div className="w-full p-2">
          <div className="relative">
            <Label htmlFor="paymentType">Mokėjimo būdas</Label>
            <Select
              id="paymentType"
              name="paymentType"
              value={paymentTypeId}
              onChange={handleChangePaymentType}
            >
              {paymentTypes.map((type) => {
                const typeName = paymentTypeTranslation[type.name ?? ''];
                return (
                  <option key={type.id} value={type.id}>
                    {typeName}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>

        <div className="w-full p-2">
          <ProductSelect onSelect={handleAdd} />
        </div>

        <div className="flex flex-col w-full p-2">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Vaistas
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                      >
                        Kiekis
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase"
                      >
                        Vieneto kaina
                      </th>
                      <th
                        scope="col"
                        className="w-40 px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase"
                      >
                        Kaina
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {saleItems.map((saleItem) => {
                      const price = saleItem.product.price ?? 0;
                      const totalPrice = price * saleItem.amount;
                      return (
                        <tr key={saleItem.product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {saleItem.product.medicamentName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {
                                    (
                                      saleItem.product.expirationDate ?? ''
                                    ).split('T')[0]
                                  }
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <div className="flex items-center">
                              <input
                                type="text"
                                className="flex-1 block w-0 border-gray-300 rounded-md disabled:cursor-not-allowed disabled:bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={saleItem.amount}
                                onChange={(event) =>
                                  handleChangeAmount(event, saleItem.product.id)
                                }
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right text-gray-900 whitespace-nowrap">
                            {formatMoney(price)}
                          </td>
                          <td className="px-6 py-4 text-right text-gray-900 whitespace-nowrap">
                            {formatMoney(totalPrice)}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <button
                              className="text-red-600 outline-none hover:text-red-900 focus:outline-none"
                              onClick={() => handleRemove(saleItem.product.id)}
                            >
                              Pašalinti
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {error != null && error !== '' ? (
          <p className="mx-2 text-red-700">{error}</p>
        ) : null}

        <div className="w-full p-2">
          <Button.Primary type="submit" disabled={submitting}>
            Užbaigti pardavimą
          </Button.Primary>
        </div>
      </div>
    </form>
  );
};
