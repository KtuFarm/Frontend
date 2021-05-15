import React, { useCallback, useEffect, useState } from 'react';
import { ProductSelect } from 'features/sale/components/ProductSelect';
import { getWarehouseProducts } from 'features/warehouse/service/WarehouseService';
import {
  CreateOrderDTO,
  GetProductBalancesDTO,
  MedicamentDTO,
  OrderFullDTO,
  ProductBalanceDTO,
  WarehouseDTO,
} from 'swagger/models';

import { Button } from 'components/Button';
import { Label } from 'components/Label';
import { Select } from 'components/Select';
import { formatMoney } from 'utils/money';

interface OrderFormProps {
  loading?: boolean;
  warehouses: WarehouseDTO[];
  error: string;
  submitting: boolean;
  order?: OrderFullDTO | null;
  onSubmit: (order: CreateOrderDTO) => unknown;
  onClearError: () => unknown;
}

export const OrderForm = ({
  submitting,
  error,
  loading,
  onClearError,
  onSubmit,
  warehouses,
  order = null,
}: OrderFormProps): JSX.Element => {
  const [orderItems, setOrderItems] = useState<ProductBalanceDTO[]>([]);
  const [warehouseId, setWarehouseId] = useState(-1);

  const getProducts = useCallback(async (): Promise<ProductBalanceDTO[]> => {
    const response = await getWarehouseProducts(warehouseId);
    const data: GetProductBalancesDTO = await response.json();
    return data.data ?? [];
  }, [warehouseId]);

  useEffect(() => {
    if (order == null) return;
    setWarehouseId(order.warehouseId ?? -1);
    setOrderItems(order.products ?? []);
  }, [order]);

  useEffect(() => {
    onClearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderItems]);

  const handleAdd = (medicament: MedicamentDTO): void => {
    setOrderItems([...orderItems, { ...medicament, amount: 1 }]);
  };

  const handleRemove = (id: number | undefined): void => {
    if (id === undefined) return;

    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  const handleChangeWarehouse = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setWarehouseId(event.target.value ? Number(event.target.value) : -1);
    setOrderItems([]);
  };

  const handleChangeAmount = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number | undefined
  ): void => {
    if (id === undefined) return;

    const newAmount = Number(event.target.value);

    if (Number.isNaN(newAmount)) return;

    const newOrderItems = [...orderItems];
    const index = newOrderItems.findIndex((item) => item.id === id);
    newOrderItems[index].amount = newAmount;

    setOrderItems(newOrderItems);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const products = orderItems.map((item) => ({
      amount: item.amount,
      productBalanceId: item.id,
    }));

    const order: CreateOrderDTO = {
      products,
      warehouseId,
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
          <div className="relative">
            <Label htmlFor="registerCount">Sandėlys</Label>
            <Select
              id="warehouseId"
              name="warehouseId"
              value={warehouseId}
              onChange={handleChangeWarehouse}
              disabled={order != null}
            >
              <option value="-1">Pasirinkite sandėlį</option>
              {warehouses.map((warehouse) => {
                return (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.city} {warehouse.address}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>

        <div className="w-full p-2">
          <ProductSelect
            onSelect={handleAdd}
            disabled={warehouseId === -1 && order == null}
            getProducts={getProducts}
          />
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
                    {orderItems.map((orderItem) => {
                      const price = orderItem.price ?? 0;
                      const amount = orderItem.amount ?? 0;
                      const totalPrice = price * amount;
                      return (
                        <tr key={orderItem.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {orderItem.medicamentName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {
                                    (orderItem.expirationDate ?? '').split(
                                      'T'
                                    )[0]
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
                                value={orderItem.amount}
                                onChange={(event) =>
                                  handleChangeAmount(event, orderItem.id)
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
                              onClick={() => handleRemove(orderItem.id)}
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
            {order == null ? 'Sukurti užsakymą' : 'Atnaujinti užsakymą'}
          </Button.Primary>
        </div>
      </div>
    </form>
  );
};
