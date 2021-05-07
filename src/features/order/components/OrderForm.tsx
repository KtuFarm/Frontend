import React, { useEffect, useState } from 'react';
import { ProductSelect } from 'features/sale/components/ProductSelect';
import {
  CreateOrderDTO,
  MedicamentDTO,
  ProductBalanceDTO,
} from 'swagger/models';

import { Button } from 'components/Button';

interface OrderItem {
  product: ProductBalanceDTO;
  amount: number;
}

const formatMoney = (amount: number): string =>
  amount.toLocaleString('lt-LT', { style: 'currency', currency: 'EUR' });

interface OrderFormProps {
  loading?: boolean;
  error: string;
  submitting: boolean;
  onSubmit: (order: CreateOrderDTO) => unknown;
  onClearError: () => unknown;
}

export const OrderForm = ({
  submitting,
  error,
  loading,
  onClearError,
  onSubmit,
}: OrderFormProps): JSX.Element => {
  const [orderItems, setOrdetItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    onClearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderItems]);

  const handleAdd = (medicament: MedicamentDTO): void => {
    setOrdetItems([...orderItems, { product: medicament, amount: 1 }]);
  };

  const handleRemove = (id: number | undefined): void => {
    if (id === undefined) return;

    setOrdetItems(orderItems.filter((item) => item.product.id !== id));
  };

  const handleChangeAmount = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number | undefined
  ): void => {
    if (id === undefined) return;

    const newAmount = Number(event.target.value);

    if (Number.isNaN(newAmount)) return;

    const newSaleItems = [...orderItems];
    const index = newSaleItems.findIndex((item) => item.product.id === id);
    newSaleItems[index].amount = newAmount;

    setOrdetItems(newSaleItems);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const products = orderItems.map((item) => ({
      amount: item.amount,
      productBalanceId: item.product.id,
    }));

    const order: CreateOrderDTO = {
      products,
      pharmacyId: 1,
      registerId: 130,
    };

    onSubmit(order);
  };

  if (loading) {
    return <p>Kraunama...</p>;
  }

  return (
    <form className="md:w-2/3" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -m-2">
        <div className="w-full p-2">
          <ProductSelect clearOnSelect={false} onSelect={handleAdd} />
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
                        Adresas
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase"
                      >
                        Kiekis
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orderItems.map((orderItem) => {
                      const price = orderItem.product.price ?? 0;
                      const totalPrice = price * orderItem.amount;
                      return (
                        <tr key={orderItem.product.id}>
                          <td className="px-6 py-4 text-left text-gray-900 whitespace-nowrap">
                            {formatMoney(price)}
                          </td>
                          <td className="px-6 py-4 text-right text-gray-900 whitespace-nowrap">
                            {formatMoney(totalPrice)}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <button
                              className="text-indigo-600 outline-none hover:text-indigo-900 focus:outline-none"
                              onClick={() => handleRemove(orderItem.product.id)}
                            >
                              Pridėti
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
                        className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase whitespace-nowrap"
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
                    {orderItems.map((saleItem) => {
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
            Užbaigti užsakymą
          </Button.Primary>
        </div>
      </div>
    </form>
  );
};
