import classNames from 'classnames';

import IconGoogle from '@shared/assets/icons/Google_Icon.svg';

import './styles/styles.css';

export const SocialAuth = (): JSX.Element => {
  return (
    <div className={classNames('social-auth-container')}>
      <div className={classNames('social-auth-divider')}>
        <span className={classNames('social-auth-divider-text')}>OR</span>
      </div>

      <button className={classNames('social-auth-button')}>
        <img src={IconGoogle} alt="Google Logo" />
        Continue with Google
      </button>
    </div>
  );
};
