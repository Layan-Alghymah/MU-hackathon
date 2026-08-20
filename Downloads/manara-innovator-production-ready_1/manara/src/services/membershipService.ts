/**
 * membershipService abstraction.
 *
 * Per the Phase 1 decision, `submitterType` (internal/external) is NEVER a
 * property of the user or the session — it's determined per-idea, at
 * submission time, from the user's relationship to the receiving
 * organization at that moment. This service is the only place that
 * relationship is checked.
 *
 * MOCK LIMITATION: there is no real membership backend yet. The mock table
 * below hardcodes the one seeded relationship our demo data assumes (the
 * seeded internal user is a member of org-1 only). Every other
 * user/organization pair — including any freshly-registered external
 * account — resolves to "not an internal member". Replace this
 * implementation with a real membership lookup once the backend exists;
 * no caller (ideaWorkflow) needs to change.
 */
export interface MembershipService {
  isInternalMember(userId: string, organizationId: string): Promise<boolean>;
}

const MOCK_INTERNAL_MEMBERSHIPS: Record<string, string[]> = {
  'user-1': ['org-1'],
};

class MockMembershipService implements MembershipService {
  async isInternalMember(userId: string, organizationId: string): Promise<boolean> {
    return MOCK_INTERNAL_MEMBERSHIPS[userId]?.includes(organizationId) ?? false;
  }
}

export const membershipService: MembershipService = new MockMembershipService();
