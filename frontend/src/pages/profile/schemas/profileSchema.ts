import { z } from 'zod';

import {
  AlcoholEnum,
  EducationEnum,
  HolidayEnum,
  IncomeEnum,
  LivingArrangementEnum,
  MarriageIntentionEnum,
  MeetingPreferenceEnum,
  SmokingEnum,
} from '@/api/generated/models';

export const imageItemSchema = z.object({
  id: z.number().nullable().optional(),
  url: z.string(),
  file: z.instanceof(File).nullable().optional(),
});

export const profileSchema = z.object({
  images: z.array(imageItemSchema),
  bio: z.string().max(300, '自己紹介は300文字以内で入力してください').optional(),
  birth_location_id: z.number().nullable().optional(),
  current_location_id: z.number().nullable().optional(),
  education: z
    .enum(Object.values(EducationEnum) as [string, ...string[]])
    .nullable()
    .optional(),
  job_id: z.number().nullable().optional(),
  income: z
    .enum(Object.values(IncomeEnum) as [string, ...string[]])
    .nullable()
    .optional(),
  height: z
    .union([
      z.coerce
        .number()
        .min(50, '50cm以上で入力してください')
        .max(250, '250cm以下で入力してください'),
      z.literal(''),
      z.null(),
    ])
    .optional(),
  marriage_intention: z
    .enum(Object.values(MarriageIntentionEnum) as [string, ...string[]])
    .nullable()
    .optional(),
  holiday: z
    .enum(Object.values(HolidayEnum) as [string, ...string[]])
    .nullable()
    .optional(),
  alcohol: z
    .enum(Object.values(AlcoholEnum) as [string, ...string[]])
    .nullable()
    .optional(),
  smoking: z
    .enum(Object.values(SmokingEnum) as [string, ...string[]])
    .nullable()
    .optional(),
  living_arrangement: z
    .enum(Object.values(LivingArrangementEnum) as [string, ...string[]])
    .nullable()
    .optional(),
  meeting_preference: z
    .enum(Object.values(MeetingPreferenceEnum) as [string, ...string[]])
    .nullable()
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type ImageItem = z.infer<typeof imageItemSchema>;
