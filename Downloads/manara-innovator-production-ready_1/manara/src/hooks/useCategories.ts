import { useQuery } from '@tanstack/react-query';
import { organizationService } from '@/services/organizationService';
import { queryKeys } from '@/constants/queryKeys';

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.organizations.categories(),
    queryFn: () => organizationService.listCategories(),
  });
}
