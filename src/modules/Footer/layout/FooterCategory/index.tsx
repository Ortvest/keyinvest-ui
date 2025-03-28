import classNames from 'classnames';

import './styles/styles.css';

interface FooterCategoryProps {
  title: string;
  links: { label: string; href: string }[];
  isColumned?: boolean;
}

export const FooterCategory = ({ title, links, isColumned = false }: FooterCategoryProps): JSX.Element => (
  <article className={classNames('company-category')}>
    <h3 className={classNames('category-name')}>{title}</h3>
    <div className={classNames({ 'item-company-columns': isColumned })}>
      <ul className={classNames('items-company')}>
        {links.slice(0, Math.ceil(links.length / 2)).map(({ label, href }) => (
          <li key={label}>
            <a className={classNames('footer-link')} href={href}>
              {label}
            </a>
          </li>
        ))}
      </ul>
      {isColumned && (
        <ul className={classNames('items-company')}>
          {links.slice(Math.ceil(links.length / 2)).map(({ label, href }) => (
            <li key={label}>
              <a className={classNames('footer-link')} href={href}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  </article>
);
