import { useQuery } from '@tanstack/react-query';
import { organizationService } from '@/services/organizationService';
import { queryKeys } from '@/constants/queryKeys';

export function useOrganizations() {
  return useQuery({
    queryKey: queryKeys.organizations.list(),
    queryFn: () => organizationService.list(),
  });
}
