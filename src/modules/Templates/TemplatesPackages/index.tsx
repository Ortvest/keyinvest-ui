import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/styles.css';

import { useGetInvestmentPackagesQuery } from '@global/api/templates/investmentApi';

export const TemplatesPackages = (): JSX.Element => {
  const { user } = useTypedSelector((state) => state.userReducer);
  const { data, error, isLoading } = useGetInvestmentPackagesQuery(user._id);
  const [visiblePackage, setVisiblePackage] = useState<string | null>(null);
  const navigate = useNavigate();

  const getAvatarInitials = (packageName: string): string => {
    const words = packageName.split(' ');
    const initials = words
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
    return initials;
  };

  useEffect(() => {
    if (error) {
      console.error('Failed to fetch investment packages:', error);
    }
  }, [error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading packages</div>;
  }

  return (
    <section className="templates-wrapper">
      <div className="templates-column">
        <h1 className="templates-title">Packages</h1>
        <Slider
          dots={true}
          infinite={false}
          speed={500}
          slidesToShow={4}
          slidesToScroll={1}
          className="templates-slider">
          {data?.map((packageItem) => {
            const uniqueIndustries = [...new Set(packageItem.stocks.map((stock) => stock.finnhubIndustry))];
            const isOpen = visiblePackage === packageItem._id;

            return (
              <div key={packageItem._id}>
                <li className="trades-column">
                  <article
                    className="templates-item"
                    onClick={() => setVisiblePackage((prev) => (prev === packageItem._id ? null : packageItem._id))}>
                    <div className="templates-avatar-name">
                      <div className="package-avatar">{getAvatarInitials(packageItem.packageName)}</div>
                      <h3>{packageItem.packageName}</h3>
                    </div>
                    <div className="industries">
                      {uniqueIndustries.map((industry) => (
                        <em key={industry}>{industry}</em>
                      ))}
                    </div>
                  </article>

                  {isOpen && (
                    <ul className="trades-list">
                      <p className="trades-list-title">Trades</p>
                      {packageItem.stocks.map((stock) => (
                        <li className="trades-item" key={stock.ticker}>
                          <img className="trades-avatar" src={stock.logo} alt={stock.ticker} width={32} />
                          <div className="trades-name-column">
                            <p className="trades-name">{stock.name}</p>
                            <p className="trades-ticker">{stock.ticker}</p>
                          </div>
                        </li>
                      ))}
                      <button
                        className="view-all-button"
                        onClick={() => navigate(`/system/templates/${packageItem._id}`)}>
                        View all
                      </button>
                    </ul>
                  )}
                </li>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};
