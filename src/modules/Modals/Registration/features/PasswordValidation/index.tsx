import { validatePassword } from '@shared/validations/validators/validatePassword';
import classNames from 'classnames';
import CheckIcon from '@shared/assets/icons/CheckIcon.svg';
import CheckIconGreen from '@shared/assets/icons/CheckIconGreen.svg';
import './styles/styles.css';

interface PasswordValidationProps {
  password: string;
}

export const PasswordValidation = ({ password }: PasswordValidationProps) => {
  const { isLengthValid, hasDigit, hasSpecialChar } = validatePassword(password);

  return (
    <div className="validation">
      <p className={classNames({ valid: isLengthValid, invalid: !isLengthValid })}>
        <img src={isLengthValid ? CheckIconGreen : CheckIcon} alt={isLengthValid ? 'Valid' : 'Invalid'} />
        Minimum 8 characters
      </p>
      <p className={classNames({ valid: hasDigit, invalid: !hasDigit })}>
        <img src={hasDigit ? CheckIconGreen : CheckIcon} alt={hasDigit ? 'Valid' : 'Invalid'} />
        Minimum one digit (1, 2, 3...)
      </p>
      <p className={classNames({ valid: hasSpecialChar, invalid: !hasSpecialChar })}>
        <img src={hasSpecialChar ? CheckIconGreen : CheckIcon} alt={hasSpecialChar ? 'Valid' : 'Invalid'} />
        Minimum one character (@, ?, %...)
      </p>
    </div>
  );
};
