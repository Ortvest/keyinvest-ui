import { BenefitsSection } from '@modules/LandingPage/BenefitsSection';
import { CountdownTimer } from '@modules/LandingPage/CountdownTimer';
import { FaqSection } from '@modules/LandingPage/FAQ';
import { MainSection } from '@modules/LandingPage/MainSection';
import { PlanSection } from '@modules/LandingPage/PlanSection';
import { ProblemSection } from '@modules/LandingPage/ProblemSection';
import { SolutionSection } from '@modules/LandingPage/SolutionSection';
import { TestimonialsSection } from '@modules/LandingPage/TestimonialsSections';

export const LandingPage = (): JSX.Element => {
  return (
    <div>
      <MainSection />
      <CountdownTimer targetTime={'2025-04-30 00:00:00'} />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <TestimonialsSection />
      <PlanSection />
      <FaqSection />
    </div>
  );
};
