import type { Notification } from '../types';
import { MOCK_NOTIFICATIONS } from '@/services/mock/data';
import { mockDelay } from '@/services/mock/utils';

export interface NotificationService {
  list(): Promise<Notification[]>;
  markAsRead(id: string): Promise<Notification>;
  markAllAsRead(): Promise<void>;
}

const store: Notification[] = [...MOCK_NOTIFICATIONS];

class MockNotificationService implements NotificationService {
  async list(): Promise<Notification[]> {
    return mockDelay(
      [...store].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)),
      450,
    );
  }

  async markAsRead(id: string): Promise<Notification> {
    const idx = store.findIndex((n) => n.id === id);
    if (idx === -1) throw new Error('الإشعار غير موجود.');
    store[idx] = { ...store[idx], isRead: true };
    return mockDelay(store[idx], 250);
  }

  async markAllAsRead(): Promise<void> {
    for (let i = 0; i < store.length; i += 1) {
      store[i] = { ...store[i], isRead: true };
    }
    return mockDelay(undefined, 250);
  }
}

export const notificationService: NotificationService = new MockNotificationService();
