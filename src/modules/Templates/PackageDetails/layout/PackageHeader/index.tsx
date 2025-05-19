interface PackageHeaderProps {
  name: string;
  stockCount: number;
  totalChangePercent?: number;
}

export const PackageHeader = ({ name, stockCount, totalChangePercent }: PackageHeaderProps): JSX.Element => (
  <div className="name-info-package">
    <h2 className="name-package-details">{name}</h2>
    <div className="percent-amount-info">
      {totalChangePercent !== undefined && (
        <p
          className={`package-percent-value ${
            totalChangePercent >= 0 ? 'positive-change-percent' : 'negative-change-percent'
          }`}>
          {totalChangePercent >= 0 ? `+${totalChangePercent}%` : `${totalChangePercent}%`}
        </p>
      )}
      <p className="package-stock-length">{stockCount} Stocks</p>
    </div>
  </div>
);
