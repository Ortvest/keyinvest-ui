import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './styles/styles.css';

interface PhoneSectionProps {
  code: string;
  setCode: (value: string) => void;
  onVerify: () => void;
  onCancel: () => void;
}

export const PhoneSection = ({ code, setCode, onVerify, onCancel }: PhoneSectionProps): JSX.Element => {
  const { user } = useTypedSelector((state) => state.userReducer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
    const newCode = code.split('');
    newCode[index] = value;
    setCode(newCode.join(''));
  };

  return (
    <div className="modal-overlay">
      <div className="phone-section-container">
        <table className="confirmation-table">
          <tbody>
            <tr>
              <td>
                <div className="message">
                  <strong>A confirmation code has been sent to {user.phoneNumber}</strong>
                </div>
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
                        type="text"
                        maxLength={1}
                        className="code-box"
                        value={code[index] || ''}
                        onChange={(e) => handleChange(e, index)}
                      />
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button className="verify-button" onClick={onVerify}>
                    Verify
                  </button>
                  <button className="verify-button" style={{ backgroundColor: 'gray' }} onClick={onCancel}>
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
