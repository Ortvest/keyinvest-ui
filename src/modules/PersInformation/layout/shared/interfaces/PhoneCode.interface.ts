export interface PhoneCodeOption {
  value: string;
  label: string;
}

export interface PhoneCodeSelectProps {
  options: PhoneCodeOption[];
  value: string;
  onChange: (value: string) => void;
}
