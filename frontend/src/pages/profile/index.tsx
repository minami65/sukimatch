import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import { FullPageLoading } from '@/components/Loading/FullPageLoading';
import { PageHeader } from '@/components/PageHeader';

import { useJob } from '@/hooks/useJob';
import { useCurrentUserDetail, useUpdateProfile } from '@/hooks/useUser';

import ProfileForm, { ProfileFormState } from './ProfileForm';

export default function Profile() {
  const { data: userDetail } = useCurrentUserDetail();
  const { jobOptions } = useJob();
  const { updateProfile, isLoading } = useUpdateProfile({
    onSuccess: () => {
      console.log('プロフィール更新成功');
    },
    onError: (error: any) => {
      console.error('プロフィール更新エラー:', error);
    },
  });

  const handleSubmit = (form: ProfileFormState) => {
    updateProfile(form);
    console.log('送信データ:', form);
  };

  const navigate = useNavigate();

  if (!userDetail) {
    return <FullPageLoading />;
  }

  return (
    <>
      <PageHeader
        title="PROFILE"
        rightAction={
          <Button size="sm" form="profile-form" type="submit" disabled={isLoading}>
            {isLoading ? '保存中...' : '保存'}
          </Button>
        }
        onBack={() => navigate(-1)}
      />
      <ProfileForm
        userDetail={userDetail}
        jobOptions={jobOptions}
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      />
    </>
  );
}
