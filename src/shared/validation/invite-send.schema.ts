import * as yup from 'yup';

import { InviteStatus, InviteStatuses } from '@shared/enums/InvestmentExperience.enums';

export const inviteSendSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .min(2, 'Full Name must be at least 2 characters')
    .max(50, 'Full Name cannot exceed 50 characters')
    .required('Full Name is required'),

  email: yup.string().trim().email('Invalid email format').required('Email is required'),

  investmentExperience: yup
    .mixed<InviteStatus>()
    .oneOf(Object.values(InviteStatuses), 'Invalid experience level')
    .required('Investment Experience is required'),
});
