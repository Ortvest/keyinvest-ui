//this code is not used yet

import React from 'react';

import classNames from 'classnames';

type PasswordConditionsProps = {
  conditions: {
    minLength: boolean;
    hasDigit: boolean;
    hasSpecialChar: boolean;
  };
};

export const PasswordConditions: React.FC<PasswordConditionsProps> = ({ conditions }) => {
  const conditionItems = [
    {
      isValid: conditions.minLength,
      label: 'Minimum 8 characters',
    },
    {
      isValid: conditions.hasDigit,
      label: 'Minimum one digit (1, 2, 3...)',
    },
    {
      isValid: conditions.hasSpecialChar,
      label: 'Minimum one special character (@, ?, %...)',
    },
  ];

  return (
    <div className="password-conditions">
      {conditionItems.map((item, index) => (
        <div
          key={index}
          className={classNames('condition', {
            valid: item.isValid,
            invalid: !item.isValid,
          })}>
          {item.isValid ? '✔' : '✘'} {item.label}
        </div>
      ))}
    </div>
  );
};
