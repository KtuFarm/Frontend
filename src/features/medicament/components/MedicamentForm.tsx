import { useEffect, useState } from 'react';
import { CreateMedicamentDTO, PharmaceuticalFormDTO } from 'swagger/models';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
import { Select } from 'components/Select';

import { pharmaceuticalFormTranslation } from '../models/PharmaceuticalForms';
import { calculateReimbursedPrice } from '../utils/calculateReimbursedPrice';
import { calculateTotalPrice } from '../utils/calculateTotalPrice';

interface MedicamentFormProps {
  pharmaceuticalForms: PharmaceuticalFormDTO[];
  loading: boolean;
  error: string;
  submitting: boolean;
  onSubmit: (medicament: CreateMedicamentDTO) => unknown;
  onClearError: () => unknown;
}

export const MedicamentForm = ({
  pharmaceuticalForms,
  onClearError,
  loading,
  error,
  submitting,
  onSubmit,
}: MedicamentFormProps): JSX.Element => {
  const [name, setName] = useState('');
  const [activeSubstance, setActiveSubstance] = useState('');
  const [pharmaceuticalFormId, setPharmaceuticalFormId] = useState(-1);
  const [country, setCountry] = useState('');
  const [barCode, setBarCode] = useState('');
  const [isPrescriptionRequired, setIsPrescriptionRequired] = useState(false);
  const [basePrice, setBasePrice] = useState<number | undefined>(undefined);
  const [isReimbursed, setIsReimbursed] = useState(false);
  const [reimbursePercentage, setReimbursePercentage] = useState<
    number | undefined
  >(undefined);
  const [surcharge, setSurcharge] = useState<number>(0);

  useEffect(() => {
    onClearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    name,
    activeSubstance,
    country,
    barCode,
    basePrice,
    reimbursePercentage,
    surcharge,
  ]);

  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setName(event.target.value);
  };

  const handleChangeActiveSubstance = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setActiveSubstance(event.target.value);
  };

  const handleChangePharmaceuticalForm = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setPharmaceuticalFormId(Number(event.target.value));
  };

  const handleChangeCountry = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCountry(event.target.value);
  };

  const handleChangeBarCode = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setBarCode(event.target.value);
  };

  const handleChangePrescriptionRequired = (): void => {
    setIsPrescriptionRequired(!isPrescriptionRequired);
  };

  const handleChangeBasePrice = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setBasePrice(event.target.valueAsNumber);
  };

  const handleChangeReimbursed = (): void => {
    setIsReimbursed(!isReimbursed);
  };

  const handleChangeReimbursePercentage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setReimbursePercentage(event.target.valueAsNumber);
  };

  const handleChangeSurcharge = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSurcharge(event.target.valueAsNumber);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const medicamentDto: CreateMedicamentDTO = {
      name,
      activeSubstance,
      barCode,
      isPrescriptionRequired,
      isReimbursed,
      country,
      basePrice,
      surcharge,
      reimbursePercentage,
      pharmaceuticalFormId,
    };

    onSubmit(medicamentDto);
  };

  const reimbursedPrice =
    basePrice !== undefined && reimbursePercentage !== undefined
      ? calculateReimbursedPrice(basePrice, reimbursePercentage)
      : undefined;

  const price = isReimbursed ? reimbursedPrice : basePrice;

  const totalPrice =
    price !== undefined && surcharge !== undefined
      ? calculateTotalPrice(price, surcharge)
      : undefined;

  if (loading) {
    return <p>Kraunama...</p>;
  }

  return (
    <form className="md:w-2/3" onSubmit={handleSubmit}>
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
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChangeName}
            />
          </div>
        </div>

        <div className="w-full p-2">
          <div className="relative">
            <Label htmlFor="activeSubstance">Veiklioji medžiaga</Label>
            <Input
              type="text"
              id="activeSubstance"
              name="activeSubstance"
              value={activeSubstance}
              onChange={handleChangeActiveSubstance}
            />
          </div>
        </div>

        <div className="w-1/2 p-2">
          <div className="relative">
            <Label htmlFor="pharmaceuticalForm">Vaisto forma</Label>
            <Select
              id="pharmaceuticalForm"
              name="pharmaceuticalForm"
              value={pharmaceuticalFormId}
              onChange={handleChangePharmaceuticalForm}
            >
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
            <Input
              type="text"
              id="country"
              name="country"
              value={country}
              onChange={handleChangeCountry}
            />
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
            <Input
              type="text"
              id="barCode"
              name="barCode"
              value={barCode}
              onChange={handleChangeBarCode}
            />
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
                checked={isPrescriptionRequired}
                onChange={handleChangePrescriptionRequired}
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
              pattern="^\d+\.\d{0,3}$"
              prepend="€"
              value={basePrice}
              onChange={handleChangeBasePrice}
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
                checked={isReimbursed}
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
              disabled={!isReimbursed}
              prepend="%"
              value={reimbursePercentage}
              onChange={handleChangeReimbursePercentage}
            />
          </div>
        </div>

        <div className="w-1/2 p-2">
          <div className="relative">
            <Label>Kaina su kompensacija</Label>
            <Input
              type="number"
              disabled
              value={reimbursedPrice?.toFixed(2)}
              prepend="€"
            />
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
              value={surcharge}
              onChange={handleChangeSurcharge}
            />
          </div>
        </div>

        <div className="w-1/2 p-2">
          <div className="relative">
            <Label>Galutinė kaina</Label>
            <Input
              type="number"
              disabled
              value={totalPrice?.toFixed(2)}
              prepend="€"
            />
          </div>
        </div>

        {error != null && error !== '' ? (
          <p className="mx-2 text-red-700">{error}</p>
        ) : null}

        <div className="w-full p-2">
          <Button.Primary type="submit" disabled={submitting}>
            Pridėti vaistą
          </Button.Primary>
        </div>
      </div>
    </form>
  );
};
