import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useForm } from 'react-hook-form';
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
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');

  const [sendVerificationSMS] = useSendVerificationSMSMutation();
  const [verifySms] = useVerifySmsMutation();
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const { data: countries = [], isLoading } = useGetAllCountriesQuery();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      username: user?.username ?? '',
      email: user?.email ?? '',
      phoneNumber: user?.phoneNumber ?? '',
      country: user?.country ?? '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber ?? '',
        country: user.country ?? '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: {
    username: string;
    email: string;
    phoneNumber: string;
    country: string;
  }): Promise<void> => {
    if (!user?._id) return;

    const updatedFields: UpdateUserInfoPayload = {
      userId: user._id,
      username: data.username,
      email: data.email,
      country: data.country,
    };

    if (data.phoneNumber !== user.phoneNumber) {
      updatedFields.phoneNumber = data.phoneNumber;
    }

    try {
      await updateUserInfo(updatedFields).unwrap();
      dispatch(setUserData({ ...user, ...updatedFields }));
      setEditMode(false);
    } catch (error) {
      console.error('Update failed:', error);
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={classNames('section-info-header')}>
                <h2>Personal Info</h2>
                {editMode ? (
                  <button type="submit" className={classNames('save-button')}>
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    className={classNames('edit-button')}
                    onClick={(e) => {
                      e.preventDefault();
                      setEditMode(true);
                    }}>
                    Edit account info
                  </button>
                )}
              </div>

              <div className={classNames('section-info-content')}>
                {editMode ? (
                  <>
                    <div className={classNames('field-row')}>
                      <label htmlFor="username" className={classNames('field-label')}>
                        Username:
                      </label>
                      <input id="username" {...register('username')} className={classNames('field-input')} />
                    </div>

                    <div className={classNames('field-row')}>
                      <label htmlFor="email" className={classNames('field-label')}>
                        Email:
                      </label>
                      <input id="email" {...register('email')} className={classNames('field-input')} />
                    </div>

                    <div className={classNames('field-row')}>
                      <label htmlFor="country" className={classNames('field-label')}>
                        Country:
                      </label>
                      {isLoading ? (
                        <p className={classNames('field-loading')}>Loading countries...</p>
                      ) : (
                        <select id="country" {...register('country')} className={classNames('field-input')}>
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
                    </div>

                    <div className={classNames('field-row')}>
                      <label htmlFor="phoneNumber" className={classNames('field-label')}>
                        Phone number:
                      </label>
                      <input id="phoneNumber" {...register('phoneNumber')} className={classNames('field-input')} />
                    </div>
                  </>
                ) : (
                  <>
                    <p className={classNames('field-row')}>
                      <span className={classNames('field-label')}>Username:</span>
                      <span className={classNames('field-value')}>{user?.username ?? 'Not specified'}</span>
                    </p>
                    <p className={classNames('field-row')}>
                      <span className={classNames('field-label')}>Email:</span>
                      <span className={classNames('field-value')}>{user?.email ?? 'Not specified'}</span>
                    </p>
                    <p className={classNames('field-row')}>
                      <span className={classNames('field-label')}>Country:</span>
                      <span className={classNames('field-value')}>{user?.country || 'Not specified'}</span>
                    </p>
                    <p className={classNames('field-row')}>
                      <span className={classNames('field-label')}>Phone number:</span>
                      <span className={classNames('field-value')}>
                        {user?.phoneNumber || 'Not specified'}{' '}
                        {user?.phoneNumber && !(user?.phoneVerified || user?.status === 'confirmed') && (
                          <button className={classNames('verify-link')} onClick={handleSendVerification}>
                            Verify
                          </button>
                        )}
                      </span>
                    </p>
                  </>
                )}

                <p className={classNames('field-row')}>
                  <span className={classNames('field-label')}>Password:</span>
                  <Link
                    to={AppRoutes.AUTH_SEND_PASSWORD_RESET.path}
                    className={classNames('reset-link', 'field-value')}>
                    Reset Password
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <hr className={classNames('divider')} />

          <div className={classNames('section')}>
            <div className={classNames('section-info-header')}>
              <h2>Billing</h2>
              <button className={classNames('edit-button')}>Update billing info</button>
            </div>
            <div className={classNames('section-info-content')}>
              <p className={classNames('field-row')}>
                <span className={classNames('field-label')}>Payment method:</span>
                <span className={classNames('field-value')}>Card ending in 1424</span>
              </p>
              <p className={classNames('field-row')}>
                <span className={classNames('field-label')}>Billing Email:</span>
                <span className={classNames('field-value')}>user@gmail.com</span>
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
