import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/routes/router';
import { AppQueryProvider } from '@/app/providers/QueryProvider';
import { AuthProvider } from '@/app/providers/AuthContext';

export function App() {
  return (
    <AppQueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppQueryProvider>
  );
}
