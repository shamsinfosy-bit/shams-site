import { useUserStore } from '../../store';

export default function Profile() {
  const user = useUserStore(s => s.user);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold text-shams-400 mb-6">
        Profile
      </h1>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-lg">
        <p className="mb-3">
          <strong>Name:</strong> {user?.name || 'Unknown'}
        </p>

        <p className="mb-3">
          <strong>Email:</strong> {user?.email || 'Unknown'}
        </p>

        <p className="mb-3">
          <strong>Role:</strong> {user?.role || 'user'}
        </p>

        <p>
          <strong>Status:</strong> {user?.status || 'active'}
        </p>
      </div>
    </div>
  );
}
