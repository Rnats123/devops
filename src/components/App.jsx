import { AuthProvider } from '../contexts/authProvider';
import { AppRoutes } from '../routes/AppRoutes';

export function App() {
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-content-center align-items-center">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}
