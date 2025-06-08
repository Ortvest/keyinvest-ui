import React, { useRef } from 'react';

import Modal from 'react-modal';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './styles/styles.css';

interface PhoneSectionProps {
  isOpen: boolean;
  code: string;
  setCode: (value: string) => void;
  onVerify: () => void;
  onCancel: () => void;
}

export const PhoneSection = ({ isOpen, code, setCode, onVerify, onCancel }: PhoneSectionProps): JSX.Element => {
  const { user } = useTypedSelector((state) => state.userReducer);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
    const newCode = code.split('');
    newCode[index] = value;
    setCode(newCode.join(''));

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    } else if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      className="phone-section-container"
      overlayClassName="modal-overlay"
      contentLabel="Phone verification modal">
      <table className="confirmation-table">
        <tbody>
          <tr>
            <td>
              <div className="message">A confirmation code has been sent to {user?.phoneNumber}</div>
              <div className="subtext">
                Please enter the code below to complete verification.
                <br />
                Once verified, you will gain access to the brief.
              </div>

              <div className="code-inputs">
                {Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputsRef.current[index] = el)}
                      type="text"
                      maxLength={1}
                      className="code-box"
                      value={code[index] || ''}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}
              </div>

              <div className="verify-container">
                <button className="verify-button" onClick={onVerify}>
                  Verify
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
};
