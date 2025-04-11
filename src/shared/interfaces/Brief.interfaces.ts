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

export interface Company {
  logo: string;
  ticker: string;
  weburl: string;
  name: string;
  marketCapitalization: number;
  finnhubIndustry: string;
}

export interface BrokerInfo {
  name: string;
  domain: string;
  website: string;
}
export interface StocksPicks {
  companies: Company[];
  brokers: BrokerInfo[];
}

export interface InvestmentPackagePayload {
  userId: string;
  packageName: string;
  stocks: Company[];
}
