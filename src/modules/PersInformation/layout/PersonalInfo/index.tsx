import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setUserData } from '@global/store/slices/user.slice';

import { AppRoutes } from '@global/router/routes.constants';

import { PhoneSection } from '@modules/PersInformation/layout/PhoneSection';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './styles/styles.css';

import {
  useSendVerificationSMSMutation,
  useUpdateUserInfoMutation,
  useVerifySmsMutation,
} from '@global/api/auth/auth.api';
import { useGetAllCountriesQuery } from '@global/api/country/country.api';
import { UserStatusClass, UserStatusLabel } from '@shared/enums/UserStatus.enums';
import { Country } from '@shared/interfaces/Country.interfaces';
import { UpdateUserInfoPayload } from '@shared/interfaces/User.interfaces';

const EXCLUDED_COUNTRIES = ['Russia', 'Belarus'];

export const PersonalForm = (): JSX.Element => {
  const { user } = useTypedSelector((state) => state.userReducer);
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [sendVerificationSMS] = useSendVerificationSMSMutation();
  const [verifySms] = useVerifySmsMutation();
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const { data: countries = [], isLoading } = useGetAllCountriesQuery();

  const [formData, setFormData] = useState({
    username: user?.username,
    email: user?.email,
    phoneNumber: user?.phoneNumber || '',
    region: user?.region || '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;
    setFormData({
      username: user?.username,
      email: user?.email,
      phoneNumber: user?.phoneNumber || '',
      region: user?.region || '',
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (): Promise<void> => {
    const payload: UpdateUserInfoPayload = {
      userId: user?._id || '',
      username: formData?.username || '',
      email: formData?.email || '',
      phoneNumber: formData.phoneNumber,
    };

    try {
      await updateUserInfo(payload).unwrap();
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  };

  const handleSendVerification = async (): Promise<void> => {
    if (!user?.phoneNumber) return;
    try {
      await sendVerificationSMS({ phoneNumber: user?.phoneNumber || '' }).unwrap();
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to send SMS verification:', error);
    }
  };

  const handleVerifyCode = async (): Promise<void> => {
    if (!user?.phoneNumber) return;
    try {
      await verifySms({ phoneNumber: user?.phoneNumber || '', code }).unwrap();
      setIsModalOpen(false);
      if (user) {
        dispatch(setUserData({ ...user, phoneVerified: true }));
      }
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  return (
    <div className={classNames('personal-info-container')}>
      <div className={classNames('status-bar')}>
        Status:{' '}
        <span className={classNames(UserStatusClass[user?.status ?? 'to-confirm'])}>
          {UserStatusLabel[user?.status ?? 'to-confirm']}
        </span>
      </div>

      <div className={classNames('table-container')}>
        <div className={classNames('info-grid')}>
          <div className={classNames('info-section')}>
            <div className={classNames('section-info-header')}>
              <h2>Personal Info</h2>
              {editMode ? (
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
              ) : (
                <button className="edit-button" onClick={() => setEditMode(true)}>
                  Edit account info
                </button>
              )}
            </div>

            <div className={classNames('section-info-content')}>
              {editMode ? (
                <>
                  <label>
                    Username:
                    <input name="username" value={formData.username} onChange={handleChange} />
                  </label>
                  <label>
                    Email:
                    <input name="email" value={formData.email} onChange={handleChange} />
                  </label>
                  <label>
                    Country:
                    {isLoading ? (
                      <p>Loading countries...</p>
                    ) : (
                      <select name="region" value={formData.region} onChange={handleChange}>
                        <option value="">Select country</option>
                        {countries
                          .filter((c: Country) => !EXCLUDED_COUNTRIES.includes(c.name.common))
                          .sort((a, b) => a.name.common.localeCompare(b.name.common))
                          .map((c) => (
                            <option key={c.name.common} value={c.name.common}>
                              {c.name.common}
                            </option>
                          ))}
                      </select>
                    )}
                  </label>
                  <label>
                    Phone number:
                    <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                  </label>
                </>
              ) : (
                <>
                  <p>
                    <strong>Username:</strong> {user?.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {user?.email}
                  </p>
                  <p>
                    <strong>Country:</strong> {user?.region || 'Not specified'}
                  </p>
                  <p>
                    <strong>Phone number:</strong> {user?.phoneNumber || 'Not specified'}{' '}
                    {user?.phoneNumber && !(user.phoneVerified || user.status === 'confirmed') && (
                      <button className="verify-link" onClick={handleSendVerification}>
                        Verify
                      </button>
                    )}
                  </p>
                </>
              )}

              <p>
                <strong>Password:</strong>
                <Link to={AppRoutes.AUTH_SEND_PASSWORD_RESET.path} className={classNames('reset-link')}>
                  Reset Password
                </Link>
              </p>
            </div>
          </div>

          <hr className={classNames('divider')} />

          <div className={classNames('section')}>
            <div className={classNames('section-info-header')}>
              <h2>Billing</h2>
              <button className={classNames('edit-button')}>Update billing info</button>
            </div>
            <div className={classNames('section-info-content')}>
              <p>
                <strong>Payment method:</strong> Card ending in 1424
              </p>
              <p>
                <strong>Billing Email:</strong> user@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <PhoneSection
          isOpen={isModalOpen}
          code={code}
          setCode={setCode}
          onVerify={handleVerifyCode}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
