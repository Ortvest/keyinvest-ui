import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { SectionTitle } from '@modules/LandingPage/shared/SectionTitle';

import './styles/styles.css';

interface CountdownTimerProps {
  targetTime: string;
}

const calculateTimeLeft = (
  targetTime: string
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} => {
  const difference = new Date(targetTime).getTime() - new Date().getTime();
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export const CountdownTimer = ({ targetTime }: CountdownTimerProps): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);

    return (): void => clearInterval(timer);
  }, [targetTime]);

  return (
    <section className="timer-section-wrapper" aria-labelledby="countdown-heading">
      <SectionTitle
        title="Beta Launch Countdown"
        description="We’re almost ready! Be among the first to test 
		KeyInvest and explore AI-powered investment insights in action."
      />

      <time
        className={classNames('timer')}
        dateTime={`P${timeLeft.days}DT${timeLeft.hours}H${timeLeft.minutes}M${timeLeft.seconds}S`}
        aria-live="polite"
        aria-labelledby="countdown-heading">
        <ul className={classNames('timer-line')}>
          {[
            { value: timeLeft.days },
            { value: timeLeft.hours },
            { value: timeLeft.minutes },
            { value: timeLeft.seconds },
          ].map((unit, index, arr) => (
            <li key={index} className={classNames('timer-items')}>
              <div className={classNames('time-block')}>
                <span>{String(unit.value).padStart(2, '0')}</span>
              </div>
              {index < arr.length - 1 && <span>:</span>}
            </li>
          ))}
        </ul>
      </time>
    </section>
  );
};
