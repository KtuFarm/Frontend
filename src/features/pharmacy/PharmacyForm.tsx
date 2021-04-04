import React, { useState } from 'react';

import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
import { Radio } from 'components/Radio';

enum Weekday {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

const Weekdays = [
  Weekday.Monday,
  Weekday.Tuesday,
  Weekday.Wednesday,
  Weekday.Thursday,
  Weekday.Friday,
  Weekday.Saturday,
  Weekday.Sunday,
];

const dayAbbreviations = {
  [Weekday.Monday]: 'P',
  [Weekday.Tuesday]: 'A',
  [Weekday.Wednesday]: 'T',
  [Weekday.Thursday]: 'K',
  [Weekday.Friday]: 'Pn',
  [Weekday.Saturday]: 'Š',
  [Weekday.Sunday]: 'S',
};

interface WorkingHours {
  id: number;
  openTime: string;
  closeTime: string;
  days: Weekday[];
}

const initialWorkingHours: WorkingHours = {
  id: 0,
  openTime: '',
  closeTime: '',
  days: [],
};

export const PharmacyForm = (): JSX.Element => {
  const [id, setId] = useState(1);
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([
    initialWorkingHours,
  ]);

  const addNewWorkingHours = (): void => {
    setWorkingHours([...workingHours, { ...initialWorkingHours, id }]);
    setId(id + 1);
  };

  const removeWorkingHours = (id: number): void => {
    setWorkingHours((prevTimes) => prevTimes.filter((time) => time.id !== id));
  };

  const handleOpenTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ): void => {
    const newOpenTime = event.target.value;

    setWorkingHours((previousHours) => {
      const workingHourIndex = previousHours.findIndex(
        (time) => time.id === id
      );

      if (workingHourIndex === -1) return previousHours;

      const newHours = [...previousHours];

      newHours[workingHourIndex] = {
        ...newHours[workingHourIndex],
        openTime: newOpenTime,
      };

      return newHours;
    });
  };

  const handleCloseTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ): void => {
    const newClosingHours = event.target.value;

    setWorkingHours((previousHours) => {
      const workingHourIndex = previousHours.findIndex(
        (time) => time.id === id
      );

      if (workingHourIndex === -1) return previousHours;

      const newHours = [...previousHours];

      newHours[workingHourIndex] = {
        ...newHours[workingHourIndex],
        closeTime: newClosingHours,
      };

      return newHours;
    });
  };

  const handleChangeDay = (id: number, weekday: Weekday): void => {
    setWorkingHours((previousHours) => {
      const workingHourIndex = previousHours.findIndex(
        (time) => time.id === id
      );

      if (workingHourIndex === -1) return previousHours;

      const newHours = [...previousHours].map((hour) => ({
        ...hour,
        days: hour.days.filter((day) => day !== weekday),
      }));

      const selectedHour = newHours[workingHourIndex];

      if (selectedHour.days.includes(weekday)) return previousHours;

      newHours[workingHourIndex] = {
        ...selectedHour,
        days: [...selectedHour.days, weekday],
      };

      return newHours;
    });
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
          <div className="md:w-2/3">
            <div className="flex flex-wrap -m-2">
              <div className="w-1/2 p-2">
                <div className="relative">
                  <Label htmlFor="address">Adresas</Label>
                  <Input type="text" id="address" name="address" />
                </div>
              </div>

              <div className="w-1/2 p-2">
                <div className="relative">
                  <Label htmlFor="city">Miestas</Label>
                  <Input type="text" id="city" name="city" />
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
                <Button.Secondary onClick={addNewWorkingHours}>
                  Pridėti darbo laiką
                </Button.Secondary>
              </div>

              {workingHours.map((workTime) => (
                <div key={workTime.id} className="w-full px-2 mb-4">
                  <div className="flex">
                    <div className="relative">
                      <Label htmlFor="openingHours">Atidarymo laikas</Label>
                      <Input
                        type="time"
                        id="openingHours"
                        name="openingHours"
                        value={workTime.openTime}
                        onChange={(event) =>
                          handleOpenTimeChange(event, workTime.id)
                        }
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
                          handleCloseTimeChange(event, workTime.id)
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
                            onChange={() =>
                              handleChangeDay(workTime.id, weekday)
                            }
                          />
                        </div>
                      );
                    })}
                    <div className="flex flex-col justify-end sm:ml-4">
                      <Button.Danger
                        onClick={() => removeWorkingHours(workTime.id)}
                      >
                        Pašalinti laiką
                      </Button.Danger>
                    </div>
                  </div>
                </div>
              ))}

              <div className="w-full p-2">
                <Button.Primary>Pridėti vaistinę</Button.Primary>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
