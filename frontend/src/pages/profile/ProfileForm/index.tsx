import React, { ChangeEvent, useState } from 'react';

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
import styles from './ProfileForm.module.css';

export type ImageItem = {
  id?: number | null;
  url: string;
  file?: File | null;
};

export type ProfileFormState = Partial<Omit<UserResponse, 'images'>> & {
  images: ImageItem[];
};

type ProfileFormProps = {
  userDetail: UserResponse;
  jobOptions: {
    value: number;
    label: string;
  }[];
  onSubmit: (formValues: ProfileFormState) => void;
  isSubmitting?: boolean;
};

const ProfileForm = ({ userDetail, jobOptions, onSubmit, isSubmitting }: ProfileFormProps) => {
  const [form, setForm] = useState<ProfileFormState>({
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
  });

  const handleAddFiles = (files: File[]) => {
    const newItems: ImageItem[] = files.map((file) => ({
      id: null,
      url: URL.createObjectURL(file),
      file: file,
    }));

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...newItems],
    }));
  };

  const handleRemoveImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form id="profile-form" className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.labelField}>
        <span className={styles.label}>画像</span>

        <ImageGallery
          images={form.images.map((img) => img.url)}
          onAddFiles={handleAddFiles}
          onRemove={handleRemoveImage}
          maxImages={10}
        />
      </div>

      <Textarea
        label="自己紹介"
        name="bio"
        value={form.bio}
        onChange={handleChange}
        placeholder="自己紹介文を入力してください"
        minRows={3}
        maxLength={300}
      />

      <div className={styles.profileDetail}>
        <SelectBox
          label="出身地"
          name="birth_location_id"
          value={form.birth_location_id}
          options={LOCATION_OPTIONS}
          onChange={handleChange}
        />
        <SelectBox
          label="居住地"
          name="current_location_id"
          value={form.current_location_id}
          options={LOCATION_OPTIONS}
          onChange={handleChange}
        />
        <SelectBox
          label="学歴"
          name="education"
          value={form.education}
          options={enumToOptions(EducationEnum)}
          onChange={handleChange}
        />
        <SelectBox
          label="職種"
          name="job_id"
          value={form.job_id}
          options={jobOptions}
          onChange={handleChange}
        />
        <SelectBox
          label="年収"
          name="income"
          value={form.income}
          options={enumToOptions(IncomeEnum)}
          onChange={handleChange}
        />
        <Input
          label="身長"
          name="height"
          type="number"
          value={form.height}
          onChange={handleChange}
          unit="cm"
          placeholder="170"
        />
        <SelectBox
          label="結婚に対する意思"
          name="marriage_intention"
          value={form.marriage_intention}
          options={enumToOptions(MarriageIntentionEnum)}
          onChange={handleChange}
        />
        <SelectBox
          label="休日"
          name="holiday"
          value={form.holiday}
          options={enumToOptions(HolidayEnum)}
          onChange={handleChange}
        />
        <SelectBox
          label="お酒"
          name="alcohol"
          value={form.alcohol}
          options={enumToOptions(AlcoholEnum)}
          onChange={handleChange}
        />
        <SelectBox
          label="タバコ"
          name="smoking"
          value={form.smoking}
          options={enumToOptions(SmokingEnum)}
          onChange={handleChange}
        />
        <SelectBox
          label="同居人"
          name="living_arrangement"
          value={form.living_arrangement}
          options={enumToOptions(LivingArrangementEnum)}
          onChange={handleChange}
        />
        <SelectBox
          label="出会うまでの希望"
          name="meeting_preference"
          value={form.meeting_preference}
          options={enumToOptions(MeetingPreferenceEnum)}
          onChange={handleChange}
        />
      </div>

      <Button fullWidth size="lg" variant="secondary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? '保存中...' : '保存'}
      </Button>
    </form>
  );
};

export default ProfileForm;
