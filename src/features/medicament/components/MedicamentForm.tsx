import { useState } from 'react';
import { PharmaceuticalFormDTO } from 'swagger/models';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
import { Select } from 'components/Select';

import { pharmaceuticalFormTranslation } from '../models/PharmaceuticalForms';

interface MedicamentFormProps {
  pharmaceuticalForms: PharmaceuticalFormDTO[];
  loading: boolean;
  error: string;
}

export const MedicamentForm = ({
  pharmaceuticalForms,
}: MedicamentFormProps): JSX.Element => {
  const [isReimbursed, setIsReimbursed] = useState(false);

  const handleChangeReimbursed = (): void => {
    setIsReimbursed(!isReimbursed);
  };

  return (
    <form className="md:w-2/3">
      <div className="flex flex-wrap -m-2">
        <div className="w-full px-2 py-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Vaistas
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Informacija apie vaistą, jo sudėtį, formą ir kilmę.
          </p>
        </div>

        <div className="w-full p-2">
          <div className="relative">
            <Label htmlFor="name">Pavadinimas</Label>
            <Input type="text" id="name" name="name" />
          </div>
        </div>

        <div className="w-full p-2">
          <div className="relative">
            <Label htmlFor="activeSubstance">Veiklioji medžiaga</Label>
            <Input type="text" id="activeSubstance" name="activeSubstance" />
          </div>
        </div>

        <div className="w-1/2 p-2">
          <div className="relative">
            <Label htmlFor="pharmaceuticalForm">Vaisto forma</Label>
            <Select id="pharmaceuticalForm" name="pharmaceuticalForm">
              {pharmaceuticalForms.map((form) => {
                const formName = pharmaceuticalFormTranslation[form.name ?? ''];
                return (
                  <option key={form.id} value={form.id}>
                    {formName}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>

        <div className="w-1/2 p-2">
          <div className="relative">
            <Label htmlFor="country">Kilmės šalis</Label>
            <Input type="text" id="country" name="country" />
          </div>
        </div>

        <hr className="w-full m-2 border-gray-200" />

        <div className="w-full px-2 py-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Pardavimas
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Su vaistu susijusi pardavimo informacija
          </p>
        </div>

        <div className="w-full p-2">
          <div className="relative">
            <Label htmlFor="barCode">Brūkšninis kodas</Label>
            <Input type="text" id="barCode" name="barCode" />
          </div>
        </div>

        <div className="w-full p-2">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="isPrescriptionRequired"
                name="isPrescriptionRequired"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <Label htmlFor="isPrescriptionRequired">
                Ar reikalingas receptas?
              </Label>
              <p className="text-gray-500">
                Pažymėkite jei šio vaistui vartojimui reikalingas gydytojo
                receptas.
              </p>
            </div>
          </div>
        </div>

        <hr className="w-full m-2 border-gray-200" />

        <div className="w-full px-2 py-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Kaina</h3>
          {/* <p className="mt-1 text-sm text-gray-600">
            Su Valstybine Ligonių Kasa susijusi kompensacijos informacija
          </p> */}
        </div>

        <div className="w-full p-2">
          <div className="relative">
            <Label htmlFor="basePrice">Bazinė kaina</Label>
            <Input
              type="number"
              name="basePrice"
              id="basePrice"
              min="0"
              step="0.01"
              prepend="€"
            />
          </div>
        </div>

        <div className="w-full p-2">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="isReimbursed"
                name="isReimbursed"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                checked={!isReimbursed}
                onChange={handleChangeReimbursed}
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="isReimbursed"
                className="font-medium text-gray-700"
              >
                Ar tai kompensuojamas vaistas?
              </label>
              <p className="text-gray-500">
                Pažymėkite jei šis vaistas yra priskirtas į kompensuojamųjų
                vaistų sąrašą.
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2 p-2">
          <div className="relative">
            <Label htmlFor="reimbursePercentage">Kompensacija</Label>
            <Input
              type="number"
              name="reimbursePercentage"
              id="reimbursePercentage"
              min="0"
              max="100"
              step="1"
              disabled={isReimbursed}
              prepend="%"
            />
          </div>
        </div>

        <div className="w-1/2 p-2">
          <div className="relative">
            <Label>Kaina su kompensacija</Label>
            <Input type="number" disabled defaultValue={120} prepend="€" />
          </div>
        </div>

        <div className="w-1/2 p-2">
          <div className="relative">
            <Label htmlFor="surcharge">Antkainis</Label>
            <Input
              type="number"
              name="surcharge"
              id="surcharge"
              min="0"
              max="100"
              step="1"
              prepend="%"
            />
          </div>
        </div>

        <div className="w-1/2 p-2">
          <div className="relative">
            <Label>Galutinė kaina</Label>
            <Input type="number" disabled defaultValue={120} prepend="€" />
          </div>
        </div>

        <p className="mx-2 text-red-700">error</p>

        <div className="w-full p-2">
          <Button.Primary type="submit">Pridėti vaistą</Button.Primary>
        </div>
      </div>
    </form>
  );
};
