import classNames from 'classnames';

import google from '@shared/assets/icons/google.svg';

import './styles/styles.css';

export const SocialAuth = () => {
  return (
    <div className={classNames('social-auth-container')}>
      <div className={classNames('social-auth-divider')}>
        <div className={classNames('social-auth-divider-line')}></div>
        <span className={classNames('social-auth-divider-text')}>OR</span>
        <div className={classNames('social-auth-divider-line')}></div>
      </div>

      <button className={classNames('social-auth-button')}>
        <img src={google} alt="Google Logo" />
        Continue with Google
      </button>
    </div>
  );
};
