import { zodResolver } from '@hookform/resolvers/zod';
import { Resolver, useForm, useWatch } from 'react-hook-form';

import Button from '@/components/Button';
import { Input } from '@/components/Input';
import { SelectBox } from '@/components/SelectBox';
import { Textarea } from '@/components/Textarea';

import {
  AlcoholEnum,
  EducationEnum,
  HolidayEnum,
  IncomeEnum,
  LivingArrangementEnum,
  MarriageIntentionEnum,
  MeetingPreferenceEnum,
  SmokingEnum,
  UserResponse,
} from '@/api/generated/models';
import { LOCATION_OPTIONS } from '@/lib/constants';
import { enumToOptions } from '@/lib/enum';

import ImageGallery from '../ImageGallery';
import { ImageItem, ProfileFormValues, profileSchema } from '../schemas/profileSchema';
import styles from './ProfileForm.module.css';

type ProfileFormProps = {
  userDetail: UserResponse;
  jobOptions: {
    value: number;
    label: string;
  }[];
  onSubmit: (formValues: ProfileFormValues) => void;
  isSubmitting?: boolean;
};

const ProfileForm = ({ userDetail, jobOptions, onSubmit, isSubmitting }: ProfileFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema) as Resolver<ProfileFormValues>,
    defaultValues: {
      bio: userDetail.bio ?? '',
      birth_location_id: userDetail.birth_location_id ?? null,
      current_location_id: userDetail.current_location_id ?? null,
      education: userDetail.education ?? null,
      job_id: userDetail.job_id ?? null,
      income: userDetail.income ?? null,
      height: userDetail.height ?? null,
      marriage_intention: userDetail.marriage_intention ?? null,
      holiday: userDetail.holiday ?? null,
      alcohol: userDetail.alcohol ?? null,
      smoking: userDetail.smoking ?? null,
      living_arrangement: userDetail.living_arrangement ?? null,
      meeting_preference: userDetail.meeting_preference ?? null,
      images:
        userDetail.images?.map((img) => ({
          id: img.id,
          url: img.image_url,
          file: null,
        })) ?? [],
    },
  });

  const images =
    useWatch({
      control,
      name: 'images',
    }) ?? [];

  const handleAddFiles = (files: File[]) => {
    const newItems: ImageItem[] = files.map((file) => ({
      id: null,
      url: URL.createObjectURL(file),
      file: file,
    }));

    setValue('images', [...images, ...newItems], { shouldValidate: true });
  };

  const handleRemoveImage = (index: number) => {
    setValue(
      'images',
      images.filter((_, i) => i !== index),
      { shouldValidate: true },
    );
  };

  return (
    <form id="profile-form" className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.labelField}>
        <span className={styles.label}>画像</span>

        <ImageGallery
          images={images.map((img) => img.url)}
          onAddFiles={handleAddFiles}
          onRemove={handleRemoveImage}
          maxImages={10}
        />
        {errors.images && <p className={styles.errorMessage}>{errors.images.message}</p>}
      </div>

      <Textarea
        {...register('bio')}
        label="自己紹介"
        name="bio"
        placeholder="自己紹介文を入力してください"
        minRows={3}
        maxLength={300}
        error={errors.bio?.message}
      />

      <div className={styles.profileDetail}>
        <SelectBox
          {...register('birth_location_id', { valueAsNumber: true })}
          label="出身地"
          name="birth_location_id"
          options={LOCATION_OPTIONS}
          error={errors.birth_location_id?.message}
        />
        <SelectBox
          {...register('current_location_id', { valueAsNumber: true })}
          label="居住地"
          name="current_location_id"
          options={LOCATION_OPTIONS}
          error={errors.current_location_id?.message}
        />
        <SelectBox
          {...register('education')}
          label="学歴"
          name="education"
          options={enumToOptions(EducationEnum)}
          error={errors.education?.message}
        />
        <SelectBox
          {...register('job_id', { valueAsNumber: true })}
          label="職種"
          name="job_id"
          options={jobOptions}
          error={errors.job_id?.message}
        />
        <SelectBox
          {...register('income')}
          label="年収"
          name="income"
          options={enumToOptions(IncomeEnum)}
          error={errors.income?.message}
        />
        <Input
          {...register('height')}
          label="身長"
          name="height"
          type="number"
          unit="cm"
          placeholder="170"
          error={errors.height?.message}
        />
        <SelectBox
          {...register('marriage_intention')}
          label="結婚に対する意思"
          name="marriage_intention"
          options={enumToOptions(MarriageIntentionEnum)}
          error={errors.marriage_intention?.message}
        />
        <SelectBox
          {...register('holiday')}
          label="休日"
          name="holiday"
          options={enumToOptions(HolidayEnum)}
          error={errors.holiday?.message}
        />
        <SelectBox
          {...register('alcohol')}
          label="お酒"
          name="alcohol"
          options={enumToOptions(AlcoholEnum)}
          error={errors.alcohol?.message}
        />
        <SelectBox
          {...register('smoking')}
          label="タバコ"
          name="smoking"
          options={enumToOptions(SmokingEnum)}
          error={errors.smoking?.message}
        />
        <SelectBox
          {...register('living_arrangement')}
          label="同居人"
          name="living_arrangement"
          options={enumToOptions(LivingArrangementEnum)}
        />
        <SelectBox
          {...register('meeting_preference')}
          label="出会うまでの希望"
          name="meeting_preference"
          options={enumToOptions(MeetingPreferenceEnum)}
          error={errors.meeting_preference?.message}
        />
      </div>

      <Button fullWidth size="lg" variant="secondary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? '保存中...' : '保存'}
      </Button>
    </form>
  );
};

export default ProfileForm;
