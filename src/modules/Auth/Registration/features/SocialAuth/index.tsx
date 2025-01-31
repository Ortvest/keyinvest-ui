import classNames from 'classnames';

import google from '@shared/assets/icons/Google_Icon.svg';

import './styles/styles.css';

export const SocialAuth = (): JSX.Element => {
  return (
    <div className={classNames('google-button-wrapper')}>
      <div className={classNames('divider')}>
        <p>OR</p>
      </div>

      <button className={classNames('google-button')}>
        <img src={google} className={classNames('google-icon')} alt="Google icon" />
        <span className={classNames('button-text')}>Continue with Google</span>
      </button>
    </div>
  );
};
