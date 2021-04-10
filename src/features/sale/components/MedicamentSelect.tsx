import { useState } from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';

interface Language {
  name: string;
  year: number;
}

const languages = [
  {
    name: 'C',
    year: 1972,
  },
  {
    name: 'C++',
    year: 1972,
  },
  {
    name: 'C#',
    year: 1972,
  },
  {
    name: 'Elm',
    year: 2012,
  },
];

interface MedicamentSelectProps {
  onSelect?: (value: Language) => void;
}

export const MedicamentSelect = ({
  onSelect,
}: MedicamentSelectProps): JSX.Element => {
  const [inputValue, setInputValue] = useState('');
  const [highlighted, setHighlighted] = useState<Language | null>(null);

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'medicament-select',
    options: languages,
    clearOnBlur: true,
    value: null,
    inputValue,
    getOptionLabel: (option) => option.name,
    getOptionSelected: (option, value) => option.name === value.name,
    onHighlightChange: (_event, option) => setHighlighted(option),
    onChange: (_event, value) => {
      setInputValue('');
      if (value) onSelect?.(value);
    },
  });

  return (
    <div {...getRootProps()}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className="block text-sm font-medium text-gray-700"
        {...getInputLabelProps()}
      >
        Assigned to
      </label>
      <div className="relative mt-1">
        <input
          type="text"
          {...getInputProps()}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        {groupedOptions.length > 0 ? (
          <ul
            className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
            {...getListboxProps()}
          >
            {groupedOptions.map((option, index) => {
              const isHighlighted = highlighted?.name === option.name;

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
