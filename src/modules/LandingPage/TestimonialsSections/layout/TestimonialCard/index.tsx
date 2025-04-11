import classNames from 'classnames';

import avatar from '@shared/assets/icons/rew-avatar.svg';
import star from '@shared/assets/icons/star.svg';

import './styles/styles.css';

interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
}

export const TestimonialCard = ({ name, role, text }: TestimonialCardProps): JSX.Element => (
  <article className={classNames('testimonials-item')}>
    <div className={classNames('testimonials-text-mark')}>
      <div className={classNames('testimonials-text')}>
        <figure className={classNames('testimonials-avatar')}>
          <img src={avatar} alt={`${name}'s avatar`} />
        </figure>
        <div className={classNames('testimonials-title')}>
          <p className={classNames('testimonials-name')}>{name}</p>
          <p className={classNames('testimonials-role')}>{role}</p>
        </div>
      </div>
      <div className={classNames('testimonials-mark')}>
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <img key={i} className={classNames('star')} alt="star rating" src={star} />
          ))}
      </div>
    </div>
    <blockquote className={classNames('testimonials-description')}>
      <p>&quot;{text}&quot;</p>
    </blockquote>
  </article>
);
