import classNames from 'classnames';

import IconGoogle from '@shared/assets/icons/Google_Icon.svg';

import './styles/styles.css';

export const SocialAuth = (): JSX.Element => {
  return (
    <div className={classNames('google-button-wrapper')}>
      <div className={classNames('divider')}>OR</div>

      <button className={classNames('google-button')}>
        <img src={IconGoogle} className={classNames('google-icon')} alt="Google icon" />
        <span className={classNames('button-text')}>Continue with Google</span>
      </button>
    </div>
  );
};
