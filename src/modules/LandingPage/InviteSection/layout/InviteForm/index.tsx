import classNames from 'classnames';
import { useForm } from 'react-hook-form';

import './styles/styles.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { inviteSendSchema } from '@shared/validation/invite-send.schema';

type InviteFormInputs = {
  fullName: string;
  email: string;
  investmentExperience:
    | 'I`m just starting out'
    | 'I have some experience'
    | 'I`m a confident investor'
    | 'I`m an investment expert';
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
          <h3>Your full name</h3>
          <input
            className={classNames({ error: errors.fullName })}
            {...register('fullName')}
            placeholder="John Doe"
            type="text"
            name="fullName"
          />
          {errors.fullName && <span className="error-message">{errors.fullName.message}</span>}
        </div>

        <div className="form-group">
          <h3>Your email</h3>
          <input
            className={classNames({ error: errors.email })}
            {...register('email')}
            placeholder="your@mail.com"
            type="email"
            name="email"
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <h3>Your investment experience</h3>
          <select className={classNames({ error: errors.investmentExperience })} {...register('investmentExperience')}>
            <option value="">Select your investment experience</option>
            <option value="I'm just starting out">I`m just starting out</option>
            <option value="I have some experience">I have some experience</option>
            <option value="I'm a confident investor">I`m a confident investor</option>
            <option value="I'm an investment expert">I`m an investment expert</option>
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
