import { useQuery } from '@tanstack/react-query';
import { getModels } from '@/apis/chat';

const useModelsQuery = () => {
  return useQuery({
    queryKey: ['models'],
    queryFn: () => getModels(),
    staleTime: 30 * 1000 * 60,
    refetchOnMount: false,
  });
};

export default useModelsQuery;
