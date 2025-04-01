import classNames from 'classnames';
import { useForm } from 'react-hook-form';

import './styles/styles.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { InvestmentExperience } from '@shared/enums/InvestmentExperience.enums';
import { inviteSendSchema } from '@shared/validation/invite-send.schema';

type InviteFormInputs = {
  fullName: string;
  email: string;
  investmentExperience: InvestmentExperience;
};

export const InviteForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteFormInputs>({
    resolver: yupResolver(inviteSendSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: InviteFormInputs): void => {
    console.log('Form submitted:', data);
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
            <option value="">Select your investment experience</option>
            {Object.values(InvestmentExperience).map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
          {errors.investmentExperience && <span className="error-message">{errors.investmentExperience.message}</span>}
        </div>

        <button className="join-button" type="submit">
          Join
        </button>
      </form>
    </div>
  );
};
