export interface CountryOption {
  value: string;
  label: string;
}

export interface CountrySelectProps {
  options: CountryOption[];
  value: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
}
