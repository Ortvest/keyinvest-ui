import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { SectionTitle } from '@modules/LandingPage/shared/SectionTitle';

import './styles/styles.css';

interface CountdownTimerProps {
  targetTime: string;
}

export const CountdownTimer = ({ targetTime }: CountdownTimerProps): JSX.Element => {
  const calculateTimeLeft = (): {
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return (): void => clearInterval(timer);
  }, [targetTime]);

  return (
    <section className={classNames('timer-section-wrapper')}>
      <SectionTitle
        title="Beta Launch Countdown"
        description="We’re almost ready! Be among the first to test 
		KeyInvest and explore AI-powered investment insights in action."
      />

      <div className={classNames('timer')}>
        <span className={classNames('time-block')}>{String(timeLeft.days).padStart(2, '0')} </span> :
        <span className={classNames('time-block')}>{String(timeLeft.hours).padStart(2, '0')}</span> :
        <span className={classNames('time-block')}>{String(timeLeft.minutes).padStart(2, '0')}</span> :
        <span className={classNames('time-block')}>{String(timeLeft.seconds).padStart(2, '0')}</span>
      </div>
    </section>
  );
};
