import classNames from 'classnames';

import './styles/styles.css';

interface ProblemCardProps {
  icon: string;
  alt: string;
  title: string;
  description: string;
  titleClass: string;
  descriptionClass: string;
}
export const ProblemCard = ({
  icon,
  alt,
  title,
  description,
  titleClass,
  descriptionClass,
}: ProblemCardProps): JSX.Element => (
  <div className={classNames('problem-card')}>
    <div className={classNames('newspapper')}>
      <div className={classNames('newspapper-wrapper')}>
        <img src={icon} alt={alt} />
      </div>
    </div>
    <div className={classNames(titleClass)}>
      <h3 className={classNames('problem-cards-title')}>{title}</h3>
    </div>
    <div className={classNames(descriptionClass)}>
      <p>{description}</p>
    </div>
  </div>
);
