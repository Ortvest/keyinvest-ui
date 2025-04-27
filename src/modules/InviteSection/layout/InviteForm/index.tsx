import classNames from 'classnames';
import { useForm } from 'react-hook-form';

import './styles/styles.css';

import { useSendInviteDataMutation } from '@global/api/invite/invite.api';
import { yupResolver } from '@hookform/resolvers/yup';
import { InviteStatus, InviteStatuses } from '@shared/enums/InvestmentExperience.enums';
import { inviteSendSchema } from '@shared/validation/invite-send.schema';

type InviteFormInputs = {
  fullName: string;
  email: string;
  investmentExperience: InviteStatus;
};

export const InviteForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteFormInputs>({
    resolver: yupResolver(inviteSendSchema),
    mode: 'onTouched',
  });

  const [sendInvite, { isLoading, isSuccess, isError }] = useSendInviteDataMutation();
  const sentEmails = new Set<string>();

  const onSubmit = async (data: InviteFormInputs): Promise<void> => {
    try {
      if (sentEmails.has(data.email)) {
        console.error('Email has already been invited.');
        alert('This email has already been invited!');
        return;
      }

      const experienceKey = Object.keys(InviteStatuses).find(
        (key) => InviteStatuses[key as keyof typeof InviteStatuses] === data.investmentExperience
      );

      await sendInvite({
        fullName: data.fullName,
        email: data.email,
        investmentsExperience: experienceKey || '',
      }).unwrap();

      console.log('Invite sent:', data);
      sentEmails.add(data.email);
      reset();
    } catch (error) {
      console.error('Failed to send invite:', error);
    }
  };

  return (
    <div className="invite-section">
      <h2 className="invite-title">Introduce yourself and join the beta</h2>
      <form className="invite-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="fullName">Your full name</label>
          <input
            id="fullName"
            className={classNames({ error: errors.fullName })}
            {...register('fullName')}
            placeholder="John Doe"
            type="text"
          />
          {errors.fullName && <span className="error-message">{errors.fullName.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Your email</label>
          <input
            id="email"
            className={classNames({ error: errors.email })}
            {...register('email')}
            placeholder="your@mail.com"
            type="email"
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="investmentExperience">Your investment experience</label>
          <select
            id="investmentExperience"
            className={classNames({ error: errors.investmentExperience })}
            {...register('investmentExperience')}>
            <option value="" disabled>
              Select your investment experience
            </option>
            {Object.entries(InviteStatuses).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
          {errors.investmentExperience && <span className="error-message">{errors.investmentExperience.message}</span>}
        </div>

        <button className="join-button" type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Join'}
        </button>

        {isSuccess && <p className="success-message">Invite sent successfully!</p>}
        {isError && <p className="error-message">Failed to send invite. Try again.</p>}
      </form>
    </div>
  );
};
