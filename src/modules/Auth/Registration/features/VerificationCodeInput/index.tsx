import React from 'react';

import classNames from 'classnames';

import './styles/styles.css';

type VerificationCodeInputProps = {
  verificationCode: string;
  onVerificationCodeChange: (newCode: string) => void;
};

export const VerificationCodeInput = ({
  verificationCode,
  onVerificationCodeChange,
}: VerificationCodeInputProps): JSX.Element => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const value = e.target.value;
    const newVerificationCode = verificationCode.split('');

    if (/^[a-zA-Z0-9]$/.test(value)) {
      newVerificationCode[index] = value.toUpperCase();
      onVerificationCodeChange(newVerificationCode.join(''));

      const nextInput = document.getElementById(`verification-input-${index + 1}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === 'Backspace') {
      const newVerificationCode = verificationCode.split('');

      if (!newVerificationCode[index]) {
        const prevInput = document.getElementById(`verification-input-${index - 1}`) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
        }
      }

      newVerificationCode[index] = '';
      onVerificationCodeChange(newVerificationCode.join(''));
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text').toUpperCase();

    const filteredText = pastedText.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6);

    if (filteredText.length > 0) {
      onVerificationCodeChange(filteredText);

      const lastIndex = Math.min(filteredText.length, 5);
      const lastInput = document.getElementById(`verification-input-${lastIndex}`) as HTMLInputElement;
      if (lastInput) {
        lastInput.focus();
      }
    }
  };

  return (
    <div className={classNames('verification-code-input')}>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <input
          key={index}
          id={`verification-input-${index}`}
          type="text"
          name="verificationCode"
          maxLength={1}
          value={verificationCode[index] || ''}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className={classNames('verification-input-field')}
        />
      ))}
    </div>
  );
};
