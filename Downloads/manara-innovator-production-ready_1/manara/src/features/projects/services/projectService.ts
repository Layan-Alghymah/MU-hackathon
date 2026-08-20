import type { Project } from '../types';
import { MOCK_PROJECTS } from '@/services/mock/data';
import { mockDelay } from '@/services/mock/utils';

/**
 * projectService abstraction — the innovator only ever sees projects tied
 * to their own approved ideas (enforced server-side eventually; the mock
 * here simply returns the seeded subset).
 */
export interface ProjectService {
  list(): Promise<Project[]>;
  getById(id: string): Promise<Project>;
}

class MockProjectService implements ProjectService {
  async list(): Promise<Project[]> {
    return mockDelay([...MOCK_PROJECTS], 500);
  }

  async getById(id: string): Promise<Project> {
    const project = MOCK_PROJECTS.find((p) => p.id === id);
    if (!project) throw new Error('المشروع غير موجود.');
    return mockDelay(project, 400);
  }
}

export const projectService: ProjectService = new MockProjectService();
