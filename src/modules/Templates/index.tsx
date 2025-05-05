import { Header } from '@modules/Templates/shared/Header';
import { TemplatesPackages } from '@modules/Templates/TemplatesPackages';

export const Templates = (): JSX.Element => {
  return (
    <>
      <Header
        title={'Your stock’s packages'}
        description={'Review your saved stock packages and explore detailed analytics for each.'}
      />
      <TemplatesPackages />
    </>
  );
};
