import React, { useEffect, useState } from 'react';
import { CreateReportDTO } from 'swagger/models';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
import { Select } from 'components/Select';

import {
  ReportType,
  reportTypes,
  reportTypeTranslations,
} from '../models/reportTypes';
interface ReportFormProps {
  loading?: boolean;
  error: string;
  submitting: boolean;
  onSubmit: (report: CreateReportDTO) => unknown;
  onClearError: () => unknown;
}

export const ReportForm = ({
  submitting,
  error,
  loading,
  onClearError,
  onSubmit,
}: ReportFormProps): JSX.Element => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [reportTypeId, setReportTypeId] = useState(-1);

  useEffect(() => {
    onClearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeDateFrom = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDateFrom(event.target.value);
  };

  const handleChangeDateTo = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDateTo(event.target.value);
  };

  const handleChangeReportType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setReportTypeId(event.target.value ? Number(event.target.value) : -1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const report: CreateReportDTO = {
      ...(dateFrom && { dateFrom }),
      ...(dateTo && { dateTo }),
      reportTypeId,
    };

    onSubmit(report);
  };

  if (loading) {
    return <p>Kraunama...</p>;
  }

  const isCustomTypeSelected = reportTypeId === ReportType.Custom;

  return (
    <form className="md:w-2/3" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -m-2">
        <div className="w-full p-2">
          <div className="relative">
            <Label htmlFor="registerCount">Ataskaitos tipas</Label>
            <Select
              id="reportTypeId"
              name="reportTypeId"
              value={reportTypeId}
              onChange={handleChangeReportType}
            >
              <option value="-1">Pasirinkite ataskaitos tipą</option>
              {reportTypes.map((type) => {
                return (
                  <option key={type} value={type}>
                    {reportTypeTranslations[type]}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>

        {isCustomTypeSelected ? (
          <>
            <div className="w-1/2 p-2">
              <div className="relative">
                <Label htmlFor="address">Nuo</Label>
                <Input
                  type="date"
                  id="dateFrom"
                  name="dateFrom"
                  value={dateFrom}
                  onChange={handleChangeDateFrom}
                />
              </div>
            </div>

            <div className="w-1/2 p-2">
              <div className="relative">
                <Label htmlFor="city">Iki</Label>
                <Input
                  type="date"
                  id="dateTo"
                  name="dateTo"
                  value={dateTo}
                  onChange={handleChangeDateTo}
                />
              </div>
            </div>
          </>
        ) : null}

        {error != null && error !== '' ? (
          <p className="mx-2 text-red-700">{error}</p>
        ) : null}

        <div className="w-full p-2">
          <Button.Primary type="submit" disabled={submitting}>
            Sugenertuoti ataskaitą
          </Button.Primary>
        </div>
      </div>
    </form>
  );
};
