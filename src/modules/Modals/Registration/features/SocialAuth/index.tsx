import google from '@shared/assets/icons/Google_Icon.svg';
import './styles/styles.css';
import classNames from 'classnames';

export const SocialAuth = () => {
  return (
    <div className={classNames('google-button-container')}>
      <div className={classNames('divider')}>
        <div className={classNames('divider-line')}></div>
        <span className={classNames('divider-text')}>OR</span>
        <div className={classNames('divider-line')}></div>
      </div>

      <button className={classNames('google-button')}>
        <img src={google} className={classNames('google-icon')} />
        <span className={classNames('button-text')}>Continue with Google</span>
      </button>
    </div>
  );
};
