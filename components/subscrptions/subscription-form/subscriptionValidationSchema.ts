import { z } from 'zod';
import { buildRequiredErrorMessage } from '../../../utils/build-required-error-message';

export const subscriptionValidationSchema = z.object({
  name: z.string().min(1, { message: buildRequiredErrorMessage('Name') }),
  description: z.string(),
  price: z.number().min(1, { message: buildRequiredErrorMessage('Price') }),
  pay_date: z.date(),
  pay_plan: z.string().min(1, { message: buildRequiredErrorMessage('Pay plan') }),
  color: z.string().min(3, { message: buildRequiredErrorMessage('Color') }),
  icon: z.any(),
});

export type SubscriptionValidationSchemaType = z.infer<typeof subscriptionValidationSchema>;
