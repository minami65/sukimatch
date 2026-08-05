import { useGetJobListJobGet } from '@/api/generated/endpoints/api';

export const useJob = () => {
  const { data: jobList, isLoading, error } = useGetJobListJobGet();

  const jobOptions =
    jobList?.map((job) => ({
      value: job.id,
      label: job.job_name,
    })) || [];

  return {
    jobOptions,
    isLoading,
    error,
  };
};
