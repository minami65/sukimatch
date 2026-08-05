import { ChangeEvent, useState } from 'react';

import Button from '@/components/Button';
import { Input } from '@/components/Input';
import { SelectBox } from '@/components/SelectBox';
import ToMyPageButton from '@/components/shared/buttons/ToMyPageButton';

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
import { LOCATION_OPTIONS } from '@/lib/constants';
import { enumToOptions } from '@/lib/enum';

import styles from './ProfileForm.module.css';

const ProfileForm = ({ userDetail, jobOptions }: { userDetail: any; jobOptions: any }) => {
  const [form, setForm] = useState({
    bio: userDetail.bio ?? '',
    birth_location_id: userDetail.birth_location_id ?? null,
    current_location_id: userDetail.current_location_id ?? null,
    education: userDetail.education ?? '',
    job_id: userDetail.job_id ?? null,
    income: userDetail.income ?? '',
    height: userDetail.height ?? '',
    marriage_intention: userDetail.marriage_intention ?? '',
    holiday: userDetail.holiday ?? '',
    alcohol: userDetail.alcohol ?? '',
    smoking: userDetail.smoking ?? '',
    living_arrangement: userDetail.living_arrangement ?? '',
    meeting_preference: userDetail.meeting_preference ?? '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className={styles.introductionText}>
        <input type="text" name="bio" value={form.bio} onChange={handleChange} />
      </div>

      <div className={styles.profileDetail}>
        <p>プロフィール</p>

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

      <div className={styles.buttonGroup}>
        <Button
          fullWidth
          size="lg"
          variant="secondary"
          onClick={() => console.log('送信データ:', form)}
        >
          登録
        </Button>
        <ToMyPageButton />
      </div>
    </>
  );
};

export default ProfileForm;
