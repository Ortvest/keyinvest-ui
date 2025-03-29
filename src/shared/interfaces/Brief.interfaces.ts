import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

import { BriefStep } from '@shared/enums/Brief.enums';

export type CollectBriefDataInputs = {
  period?: string;
  goals?: string[];
  sectors?: string[];
  numCompanies?: string;
};

export interface BriefStepComponentProps {
  onUpdateStepHandler: (step: BriefStep) => void;
  register: UseFormRegister<CollectBriefDataInputs>;
  handleSubmit: UseFormHandleSubmit<CollectBriefDataInputs>;
  onSubmit: (data: CollectBriefDataInputs) => void;
}


export interface BriefCard {
  value: string;
}