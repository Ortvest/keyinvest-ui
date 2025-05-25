import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/styles.css';

import { useGetInvestmentPackagesQuery } from '@global/api/templates/investmentApi';

export const TemplatesPackages = (): JSX.Element => {
  const { user } = useTypedSelector((state) => state.userReducer);
  const { data, error, isLoading } = useGetInvestmentPackagesQuery(user?._id || '');
  const navigate = useNavigate();

  const getAvatarInitials = (packageName: string): string => {
    const words = packageName.split(' ');
    return words
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  useEffect(() => {
    if (error) {
      console.error('Failed to fetch investment packages:', error);
    }
  }, [error]);

  if (isLoading) {
    return <div className="templates-text-loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="templates-text-wrapper">
        <p className="templates-text-title"> You dont have any packages yet</p>
        <p className="templates-text-description">Complete the briefing to create your first one.</p>
        <button className="templates-text-button" onClick={() => navigate('/system/briefing')}>
          Start Brief
        </button>
      </div>
    );
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

            return (
              <div key={packageItem._id}>
                <li className="trades-column">
                  <article className="templates-item">
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
                </li>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};
