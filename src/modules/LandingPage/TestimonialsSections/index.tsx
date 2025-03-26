import classNames from 'classnames';
import Slider from 'react-slick';

import { SectionTitle } from '@modules/LandingPage/shared/SectionTitle';
import { TestimonialCard } from '@modules/LandingPage/TestimonialsSections/layout/TestimonialCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/styles.css';

const testimonials = [
  {
    name: 'Jonas Sousa',
    role: 'UI Designer',
    text: `KeyInvest helped me make informed investment 
	decisions with AI-powered insights. My portfolio has never been stronger!`,
  },
  {
    name: 'Maria Johnson',
    role: 'Investor',
    text: `I've never felt more confident about my investments. 
	KeyInvest provides real-time insights that truly work!`,
  },
  {
    name: 'Alex Smith',
    role: 'Financial Analyst',
    text: 'The AI recommendations from KeyInvest have given me an edge in the stock market. Highly recommended!',
  },
  {
    name: 'Sophia Lee',
    role: 'Trader',
    text: 'Thanks to KeyInvest, I can make strategic investment choices without second-guessing myself!',
  },
];

const extendedTestimonials = [...testimonials, ...testimonials];

export const TestimonialsSection = (): JSX.Element => {
  const sliderSettingsLTR = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 12000,
    cssEase: 'linear',
    arrows: false,
    dots: false,
    pauseOnHover: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const sliderSettingsRTL = {
    ...sliderSettingsLTR,
    rtl: true,
  };

  return (
    <section className={classNames('testimonials-section-wrapper')}>
      <SectionTitle section={'Testimonials'} title={'What our customers say'} />

      <div className={classNames('testimonials-items-columns')}>
        <Slider {...sliderSettingsLTR}>
          {extendedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </Slider>
        <Slider {...sliderSettingsRTL}>
          {extendedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </Slider>
      </div>
    </section>
  );
};
