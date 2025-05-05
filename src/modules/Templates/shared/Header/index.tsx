import classNames from 'classnames';

import './styles/styles.css';

export interface TemplatesHeader {
  title: string;
  description: string;
}

export const Header = ({ title, description }: TemplatesHeader): JSX.Element => {
  return (
    <header className={classNames('templates-header')}>
      <div className={classNames('templates-header-column')}>
        <p className={classNames('templates-header-title')}>{title}</p>
        <p className={classNames('templates-header-description')}>{description}</p>
      </div>
    </header>
  );
};
