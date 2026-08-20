import type { Organization } from '@/types/common';
import { MOCK_ORGANIZATIONS, MOCK_CATEGORIES } from './mock/data';
import { mockDelay } from './mock/utils';

export interface OrganizationService {
  list(): Promise<Organization[]>;
  getBySlug(slug: string): Promise<Organization>;
  listCategories(): Promise<string[]>;
}

class MockOrganizationService implements OrganizationService {
  async list(): Promise<Organization[]> {
    return mockDelay([...MOCK_ORGANIZATIONS], 400);
  }

  async getBySlug(slug: string): Promise<Organization> {
    const org = MOCK_ORGANIZATIONS.find((o) => o.slug === slug);
    if (!org) throw new Error('الجهة غير موجودة.');
    return mockDelay(org, 400);
  }

  async listCategories(): Promise<string[]> {
    return mockDelay([...MOCK_CATEGORIES], 300);
  }
}

export const organizationService: OrganizationService = new MockOrganizationService();
