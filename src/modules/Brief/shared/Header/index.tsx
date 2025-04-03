import React from 'react';
import classNames from 'classnames';

import './styles/styles.css'

interface BriefHeaderProps {
  title: string;
  subtitle: string;
}
export const BriefHeader = ({title, subtitle}: BriefHeaderProps): React.ReactNode => {


  return (
    <header className={classNames('brief-header')}>
      <div>
        <h1 className={classNames('brief-header-title')}>{title}</h1>
      </div>
      <div>
        <p className={classNames('brief-header-subtitle')}>{subtitle}</p>
      </div>
    </header>
  )
}