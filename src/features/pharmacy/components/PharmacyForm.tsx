import { useEffect, useState } from 'react';

import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
import { Radio } from 'components/Radio';

import { PharmacyDTO } from '../dtos/PharmacyDTO';
import { WorkingHoursDTO } from '../dtos/WorkingHoursDTO';
import {
  dayAbbreviations,
  dayToInt,
  Weekday,
  Weekdays,
} from '../models/WeekdayModel';
import { WorkingHours } from '../models/WorkingHoursModel';

const initialWorkingHours: WorkingHours = {
  openTime: '',
  closeTime: '',
  days: [],
};

interface PharmacyFormProps {
  pharmacy?: PharmacyDTO;
  loading?: boolean;
  submitting: boolean;
  error?: string;
  onSubmit: (pharmacy: PharmacyDTO) => unknown;
  onClearError: () => unknown;
}

export const PharmacyForm = ({
  onSubmit,
  submitting,
  onClearError,
  error,
}: PharmacyFormProps): JSX.Element => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([
    { ...initialWorkingHours },
  ]);

  useEffect(() => {
    onClearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, city, workingHours]);

  const handleAddNewWorkingHours = (): void => {
    setWorkingHours([...workingHours, { ...initialWorkingHours }]);
  };

  const handleRemoveWorkingHours = (index: number): void => {
    setWorkingHours(workingHours.filter((_hours, i) => i !== index));
  };

  const handleOpenTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const newOpenTime = event.target.value;
    const newWorkingHours = [...workingHours];
    newWorkingHours[index].openTime = newOpenTime;

    setWorkingHours(newWorkingHours);
  };

  const handleCloseTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const newCloseTime = event.target.value;
    const newWorkingHours = [...workingHours];
    newWorkingHours[index].closeTime = newCloseTime;

    setWorkingHours(newWorkingHours);
  };

  const handleChangeDay = (index: number, weekday: Weekday): void => {
    if (workingHours[index].days.includes(weekday)) return;

    const newWorkingHours = workingHours.map((hour) => ({
      ...hour,
      days: hour.days.filter((day) => day !== weekday),
    }));

    const selectedHour = newWorkingHours[index];

    newWorkingHours[index] = {
      ...selectedHour,
      days: [...selectedHour.days, weekday],
    };

    setWorkingHours(newWorkingHours);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const workingHoursDto = workingHours.reduce<WorkingHoursDTO[]>(
      (allHours, currentHours) => {
        const { openTime, closeTime } = currentHours;

        const newHours = currentHours.days.map<WorkingHoursDTO>((day) => ({
          openTime,
          closeTime,
          dayOfWeek: dayToInt[day],
        }));

        return [...allHours, ...newHours];
      },
      []
    );

    const pharmacyDto: PharmacyDTO = {
      address,
      city,
      workingHours: workingHoursDto,
    };

    onSubmit(pharmacyDto);
  };

  const handleCityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCity(event.target.value);
  };

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAddress(event.target.value);
  };

  return (
    <div className="h-screen bg-gray-100">
      <Header />
      <section className="relative px-6 text-gray-600 body-font">
        <div className="container p-8 mx-auto my-16 bg-white rounded shadow">
          <div className="flex flex-col w-full mb-6">
            <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
              Pridėti vaistinę
            </h1>
          </div>
          <form className="md:w-2/3" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -m-2">
              <div className="w-1/2 p-2">
                <div className="relative">
                  <Label htmlFor="address">Adresas</Label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>

              <div className="w-1/2 p-2">
                <div className="relative">
                  <Label htmlFor="city">Miestas</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    onChange={handleCityChange}
                  />
                </div>
              </div>

              <div className="w-full px-2 py-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Darbo laikas
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Nurodykite vaistinės darbo valandas
                </p>
              </div>

              <div className="w-full px-2 mb-4">
                <Button.Secondary onClick={handleAddNewWorkingHours}>
                  Pridėti darbo laiką
                </Button.Secondary>
              </div>

              {workingHours.map((workTime, index) => (
                <div key={index} className="w-full px-2 mb-4">
                  <div className="flex">
                    <div className="relative">
                      <Label htmlFor="openingHours">Atidarymo laikas</Label>
                      <Input
                        type="time"
                        id="openingHours"
                        name="openingHours"
                        value={workTime.openTime}
                        onChange={(event) => handleOpenTimeChange(event, index)}
                      />
                    </div>
                    <div className="relative sm:ml-4 sm:mr-2">
                      <Label htmlFor="closingHours">Uždarymo laikas</Label>
                      <Input
                        type="time"
                        id="closingHours"
                        name="closingHours"
                        value={workTime.closeTime}
                        onChange={(event) =>
                          handleCloseTimeChange(event, index)
                        }
                      />
                    </div>
                    {Weekdays.map((weekday) => {
                      return (
                        <div
                          key={weekday}
                          className="flex flex-col items-center px-1 sm:ml-2"
                        >
                          <Label htmlFor={weekday}>
                            {dayAbbreviations[weekday]}
                          </Label>
                          <Radio
                            id={weekday}
                            name={weekday}
                            className="mt-4"
                            onChange={() => handleChangeDay(index, weekday)}
                          />
                        </div>
                      );
                    })}
                    <div className="flex flex-col justify-end sm:ml-4">
                      <Button.Danger
                        onClick={() => handleRemoveWorkingHours(index)}
                      >
                        Pašalinti laiką
                      </Button.Danger>
                    </div>
                  </div>
                </div>
              ))}

              {error !== '' ? (
                <p className="mx-2 text-red-700">{error}</p>
              ) : null}

              <div className="w-full p-2">
                <Button.Primary type="submit" disabled={submitting}>
                  Pridėti vaistinę
                </Button.Primary>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
