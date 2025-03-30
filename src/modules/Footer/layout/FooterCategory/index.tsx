import classNames from 'classnames';

import './styles/styles.css';

interface FooterCategoryProps {
  title: string;
  links: { label: string; href: string }[];
  isColumned?: boolean;
}

export const FooterCategory = ({ title, links, isColumned = false }: FooterCategoryProps): JSX.Element => {
  const middleIndex = Math.ceil(links.length / 2);

  return (
    <article className={classNames('company-category', { 'columned-category': isColumned })}>
      <h3 className={classNames('category-name')}>{title}</h3>
      <div className={classNames({ 'item-company-columns': isColumned })}>
        {isColumned ? (
          <div className="columns-wrapper">
            <ul className={classNames('items-company')}>
              {links.slice(0, middleIndex).map(({ label, href }) => (
                <li key={label}>
                  <a className={classNames('footer-link')} href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className={classNames('items-company')}>
              {links.slice(middleIndex).map(({ label, href }) => (
                <li key={label}>
                  <a className={classNames('footer-link')} href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ul className={classNames('items-company')}>
            {links.map(({ label, href }) => (
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
};
