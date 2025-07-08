import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setUserData } from '@global/store/slices/user.slice';

import { AppRoutes } from '@global/router/routes.constants';

import { CountrySelect } from '@modules/PersInformation/layout/CountrySelect';
import { PhoneCodeSelect } from '@modules/PersInformation/layout/PhoneCodeSelect';
import { PhoneSection } from '@modules/PersInformation/layout/PhoneSection';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './styles/styles.css';

import {
  useSendVerificationSMSMutation,
  useUpdateUserInfoMutation,
  useVerifySmsMutation,
} from '@global/api/auth/auth.api';
import { useGetAllCountriesQuery, useGetPhoneCodesQuery } from '@global/api/country/country.api';
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
  const { data: phoneCodes = [] } = useGetPhoneCodesQuery();

  const [initialPhoneCodeSet, setInitialPhoneCodeSet] = useState(false);

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      username: user?.username ?? '',
      email: user?.email ?? '',
      phoneNumber: user?.phoneNumber ?? '',
      country: user?.country ?? '',
      phoneCode: '',
    },
  });

  useEffect(() => {
    if (user && phoneCodes.length > 0 && !initialPhoneCodeSet) {
      let matchedCode = phoneCodes
        .map((p) => p.callingCode)
        .filter((code): code is string => typeof code === 'string')
        .sort((a, b) => b.length - a.length)
        .find((code) => code && user.phoneNumber?.startsWith(code));
      if (!matchedCode && user.country) {
        const countryInfo = phoneCodes.find((p) => p.name.toLowerCase() === user.country.toLowerCase());
        matchedCode = countryInfo?.callingCode || '';
      }

      const phoneNumber = matchedCode ? user.phoneNumber?.replace(matchedCode, '') || '' : user.phoneNumber || '';

      reset({
        username: user.username,
        email: user.email,
        phoneNumber,
        country: user.country ?? '',
        phoneCode: matchedCode || '',
      });

      setInitialPhoneCodeSet(true);
    }
  }, [user, phoneCodes, reset, initialPhoneCodeSet]);

  const onSubmit = async (data: {
    username: string;
    email: string;
    phoneNumber: string;
    phoneCode: string;
    country: string;
  }): Promise<void> => {
    if (!user?._id) return;

    const updatedFields: UpdateUserInfoPayload = {
      userId: user._id,
      username: data.username,
      email: data.email,
      country: data.country,
    };

    const fullPhone = `${data.phoneCode}${data.phoneNumber}`;
    if (fullPhone !== user.phoneNumber) {
      updatedFields.phoneNumber = fullPhone;
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
      await verifySms({ phoneNumber: user.phoneNumber, code }).unwrap();

      dispatch(setUserData({ ...user, status: 'confirmed' }));

      setIsModalOpen(false);
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  const phoneCodeOptions = phoneCodes.map((p) => ({
    value: p.callingCode,
    label: `${p.callingCode} (${p.name})`,
  }));

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
                        <CountrySelect
                          options={countries
                            .filter((c: Country) => !EXCLUDED_COUNTRIES.includes(c.name.common))
                            .sort((a, b) => a.name.common.localeCompare(b.name.common))
                            .map((c) => ({
                              value: c.name.common,
                              label: c.name.common,
                            }))}
                          value={watch('country')}
                          onChange={(val) => setValue('country', val)}
                          isDisabled={isLoading}
                        />
                      )}
                    </div>

                    <div className={classNames('field-row')}>
                      <label htmlFor="phoneNumber" className={classNames('field-label')}>
                        Phone number:
                      </label>
                      <div className={classNames('phone-input-wrapper')}>
                        {editMode ? (
                          <>
                            <PhoneCodeSelect
                              options={phoneCodeOptions}
                              value={watch('phoneCode')}
                              onChange={(val) => setValue('phoneCode', val)}
                            />
                            <input
                              id="phoneNumber"
                              {...register('phoneNumber')}
                              className={classNames('field-input', 'shift-left')}
                            />
                          </>
                        ) : (
                          <span className={classNames('field-value')}>
                            {user?.phoneNumber || 'Not specified'}{' '}
                            {user?.phoneNumber && !(user?.phoneVerified || user?.status === 'confirmed') && (
                              <button className={classNames('verify-link')} onClick={handleSendVerification}>
                                Verify
                              </button>
                            )}
                          </span>
                        )}
                      </div>
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
