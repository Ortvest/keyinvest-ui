import Select from 'react-select';

import { DropDownIndicator } from '@modules/PersInformation/layout/CountrySelect/layout/DropDownIndicator';
import { CountrySelectProps } from '@modules/PersInformation/layout/shared/interfaces/CountrySelect.inteface';

export const CountrySelect = ({ options, value, onChange, isDisabled = false }: CountrySelectProps): JSX.Element => {
  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  return (
    <Select
      options={options}
      value={selectedOptions}
      onChange={(option) => onChange(option ? option.value : '')}
      isClearable={true}
      isSearchable={true}
      isDisabled={isDisabled}
      placeholder="Select country"
      components={{
        DropdownIndicator: DropDownIndicator,
        IndicatorSeparator: () => null,
        ClearIndicator: () => null,
      }}
      styles={{
        container: (provided) => ({
          ...provided,
          width: '202px',
          height: '40px',
          marginBottom: '15px',
          position: 'relative',
        }),
        control: (provided) => ({
          ...provided,
          backgroundColor: '#F6F6F6',
          width: '202px',
          height: '40px',
          minHeight: '40px',
          borderColor: provided.borderColor,
          boxShadow: provided.boxShadow,
          borderRadius: '10px',
        }),
        valueContainer: (provided) => ({
          ...provided,
          height: '40px',
          padding: '0 10px 0 10px',
          display: 'flex',
          alignItems: 'center',
        }),
        singleValue: (provided) => ({
          ...provided,
          fontSize: '14px',
          lineHeight: '40px',
          margin: 0,
          padding: 0,
          paddingLeft: '2px',
          display: 'block',
        }),
        input: (provided) => ({
          ...provided,
          fontSize: '14px',
          lineHeight: '40px',
          margin: 0,
          padding: 0,
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
          height: '40px',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingLeft: '5px',
        }),
        menu: (provided) => ({
          ...provided,
          zIndex: 9999,
          borderRadius: '10px',
        }),
      }}
      filterOption={(candidate, input) => {
        const inputLower = input.toLowerCase();
        return candidate.label.toLowerCase().includes(inputLower);
      }}
    />
  );
};
