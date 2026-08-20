import { useQuery } from '@tanstack/react-query';
import { organizationService } from '@/services/organizationService';
import { queryKeys } from '@/constants/queryKeys';

export function useOrganizationBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: queryKeys.organizations.bySlug(slug ?? ''),
    queryFn: () => organizationService.getBySlug(slug!),
    enabled: Boolean(slug),
  });
}
