import { FullPageLoading } from '@/components/Loading/FullPageLoading';

import { useJob } from '@/hooks/useJob';
import { useCurrentUserDetail } from '@/hooks/useUser';

import ProfileForm from './ProfileForm';

export default function Profile() {
  const { data: userDetail } = useCurrentUserDetail();
  const { jobOptions } = useJob();

  if (!userDetail) {
    return <FullPageLoading />;
  }

  return <ProfileForm userDetail={userDetail} jobOptions={jobOptions} />;
}
