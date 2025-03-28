import classNames from 'classnames';

import { FooterCategory } from '@modules/Footer/layout/FooterCategory';

import IconLogo from '@shared/assets/icons/IconLogo.svg';
import In from '@shared/assets/icons/in.svg';
import Tiktok from '@shared/assets/icons/tiktok.svg';
import Twitter from '@shared/assets/icons/twitter.svg';
import Youtube from '@shared/assets/icons/youtube.svg';

import './styles/styles.css';

const companyLinks = [
  { label: 'Blog', href: '#' },
  { label: 'Careers', href: '#' },
];

const productLinks = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About us', href: '/about' },
  { label: 'Contact us', href: '/contact' },
  { label: 'Benefits', href: '/benefits' },
];

const pagesLinks = [
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Support', href: '/support' },
];

const socialLinks = [
  { label: 'Twitter', icon: Twitter, href: '#' },
  { label: 'LinkedIn', icon: In, href: '#' },
  { label: 'TikTok', icon: Tiktok, href: '#' },
  { label: 'YouTube', icon: Youtube, href: '#' },
];

export const Footer = (): JSX.Element => {
  return (
    <footer className={classNames('footer')}>
      <div className={classNames('name-and-category')}>
        <div className={classNames('market-text')}>
          <h2 className={classNames('market-main-text')}>KeyInvest – AI</h2>
          <p className={classNames('market-title')}>AI-Driven Market Analysis</p>
        </div>

        <nav className={classNames('list-categories')} aria-label="Footer Navigation">
          <FooterCategory title="Company" links={companyLinks} />
          <FooterCategory title="Product" links={productLinks} isColumned />
          <FooterCategory title="Pages" links={pagesLinks} />
        </nav>
      </div>

      <div className={classNames('logo-and-socials')} role="banner">
        <div className={classNames('logo-title')}>
          <img className={classNames('logo-icon')} alt="KeyInvest Logo" src={IconLogo} />
          <p>KeyInvest</p>
        </div>

        <div className={classNames('socials-media')}>
          {socialLinks.map(({ label, icon, href }) => (
            <a className={classNames('footer-link')} key={label} href={href} aria-label={`Follow us on ${label}`}>
              <img src={icon} alt={label} className={classNames('footer-social-icon')} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
