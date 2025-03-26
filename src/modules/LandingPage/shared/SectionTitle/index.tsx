import classNames from 'classnames';

import './styles/styles.css';

interface SectionTitleProps {
  section?: string;
  title: string;
  description?: string;
  changeColorTitle?: boolean;
  changeColorH2?: boolean;
}
export const SectionTitle = ({
  title,
  section,
  description,
  changeColorTitle = false,
  changeColorH2 = false,
}: SectionTitleProps): JSX.Element => {
  return (
    <div className={classNames('problem-title-wrapper')}>
      {section && <p className={classNames('problem-title', { 'color-title': changeColorTitle })}>{section}</p>}
      <h2 className={classNames('problem-title-h2', { 'color-h2': changeColorH2 })}>{title}</h2>
      {description && <p className={classNames('problem-description')}>{description}</p>}
    </div>
  );
};
