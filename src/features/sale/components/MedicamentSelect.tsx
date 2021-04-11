import { useCallback, useEffect, useState } from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { getMedicaments } from 'features/medicament/services/MedicamentService';
import debounce from 'lodash.debounce';
import { GetMedicamentsDTO, MedicamentDTO } from 'swagger/models';

interface MedicamentSelectProps {
  onSelect?: (value: MedicamentDTO) => void;
}

export const MedicamentSelect = ({
  onSelect,
}: MedicamentSelectProps): JSX.Element => {
  const [inputValue, setInputValue] = useState('');
  const [highlighted, setHighlighted] = useState<MedicamentDTO | null>(null);
  const [medicaments, setMedicaments] = useState<MedicamentDTO[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('');

  const fetchMedicaments = useCallback(async (): Promise<void> => {
    // setLoading(true);
    try {
      const response = await getMedicaments();
      const data: GetMedicamentsDTO = await response.json();
      setMedicaments(data.data as MedicamentDTO[]);
    } catch (error) {
      // setError(error?.message ?? '');
    } finally {
      // setLoading(false);
    }
  }, []);

  useEffect(() => {
    const debouncedFetchMedicaments = debounce(fetchMedicaments, 300);

    if (inputValue.length > 2) {
      debouncedFetchMedicaments();
    } else {
      setMedicaments([]);
    }

    return () => {
      debouncedFetchMedicaments.cancel();
    };
  }, [fetchMedicaments, inputValue]);

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'medicament-select',
    options: medicaments,
    clearOnBlur: true,
    value: null,
    inputValue,
    openOnFocus: false,
    getOptionLabel: (option) => option.name ?? '',
    getOptionSelected: (option, value) => option.id === value.id,
    onHighlightChange: (_event, option) => setHighlighted(option),
    onChange: (_event, value) => {
      setInputValue('');
      if (value) onSelect?.(value);
    },
    onInputChange: (_event, value) => {
      setInputValue(value);
    },
  });

  return (
    <div {...getRootProps()}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className="block text-sm font-medium text-gray-700"
        {...getInputLabelProps()}
      >
        Vaisto paieška
      </label>
      <div className="relative mt-1">
        <input
          type="text"
          {...getInputProps()}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        {groupedOptions.length > 0 ? (
          <ul
            className="absolute z-20 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
            {...getListboxProps()}
          >
            {groupedOptions.map((option, index) => {
              const isHighlighted = highlighted?.id === option.id;

              return (
                <li
                  key={index}
                  className={`relative py-2 pl-3 cursor-default select-none pr-9 ${
                    isHighlighted ? 'text-white bg-indigo-600' : 'text-gray-900'
                  }`}
                  // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
                  role="option"
                  {...getOptionProps({ option, index })}
                >
                  <div className="flex items-center">
                    <span className="block font-normal truncate">
                      {option.name}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
};
