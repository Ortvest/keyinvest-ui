import Select from 'react-select';

import { CustomDropdownIndicator } from '@modules/PersInformation/layout/PhoneCodeSelect/layout/CustomDropdownIndicator';
import { PhoneCodeSelectProps } from '@modules/PersInformation/layout/shared/interfaces/PhoneCode.interface';

export const PhoneCodeSelect = ({ options, value, onChange }: PhoneCodeSelectProps): JSX.Element => {
  const selectedOption = options.find((opt) => opt.value === value) || null;

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if ((event.key === 'Backspace' || event.key === 'Delete') && selectedOption) {
      onChange('');
      event.preventDefault();
    }
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={(option) => onChange(option ? option.value : '')}
      isClearable={false}
      placeholder="Select country code"
      onKeyDown={handleKeyDown}
      components={{
        DropdownIndicator: CustomDropdownIndicator,
        IndicatorSeparator: () => null,
      }}
      styles={{
        container: (provided) => ({
          ...provided,
          width: '202px',
          height: '40px',
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
        }),
        input: (provided) => ({
          ...provided,
          fontSize: '14px',
          lineHeight: '40px',
          margin: 0,
          padding: 0,
        }),
        menu: (provided) => ({
          ...provided,
          zIndex: 9999,
          borderRadius: '10px',
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
          height: '40px',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingLeft: '5px',
        }),
      }}
      filterOption={(candidate, input) => {
        const inputLower = input.toLowerCase();
        return candidate.label.toLowerCase().includes(inputLower) || candidate.value.includes(input);
      }}
    />
  );
};
