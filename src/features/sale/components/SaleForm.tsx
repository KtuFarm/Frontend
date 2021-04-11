import React, { useState } from 'react';
import { MedicamentDTO } from 'swagger/models';

import { Button } from 'components/Button';

import { MedicamentSelect } from './MedicamentSelect';

interface SaleItem {
  medicament: MedicamentDTO;
  amount: number;
}

const formatMoney = (amount: number): string =>
  amount.toLocaleString('lt-LT', { style: 'currency', currency: 'EUR' });

export const SaleForm = (): JSX.Element => {
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);

  const handleAdd = (medicament: MedicamentDTO): void => {
    setSaleItems([...saleItems, { medicament, amount: 1 }]);
  };

  const handleRemove = (id: number | undefined): void => {
    if (id === undefined) return;

    setSaleItems(saleItems.filter((item) => item.medicament.id !== id));
  };

  const handleChangeAmount = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number | undefined
  ): void => {
    if (id === undefined) return;

    const newAmount = Number(event.target.value);

    if (Number.isNaN(newAmount)) return;

    const newSaleItems = [...saleItems];
    const index = newSaleItems.findIndex((item) => item.medicament.id === id);
    newSaleItems[index].amount = newAmount;

    setSaleItems(newSaleItems);
  };

  return (
    <form className="md:w-2/3">
      <div className="flex flex-wrap -m-2">
        <div className="w-full p-2">
          <MedicamentSelect onSelect={handleAdd} />
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
                      const price = saleItem.medicament.price ?? 0;
                      const totalPrice = price * saleItem.amount;
                      return (
                        <tr key={saleItem.medicament.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {saleItem.medicament.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {saleItem.medicament.activeSubstance}
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
                                  handleChangeAmount(
                                    event,
                                    saleItem.medicament.id
                                  )
                                }
                              />
                            </div>
                            {/* <Input
                              type="text"
                              value={saleItem.amount}
                              onChange={(event) =>
                                handleChangeAmount(
                                  event,
                                  saleItem.medicament.id
                                )
                              }
                              style={{ width: 30 }}
                            /> */}
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
                              onClick={() =>
                                handleRemove(saleItem.medicament.id)
                              }
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

        <div className="w-full p-2">
          <Button.Primary type="submit">Užbaigti pardavimą</Button.Primary>
        </div>
      </div>
    </form>
  );
};
