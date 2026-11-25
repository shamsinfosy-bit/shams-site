import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase';

export default function Profile() {

  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-8">
        <h1 className="text-3xl font-bold">
          Profile
        </h1>
        <p className="mt-5">
          No user logged in
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-lg">

        <p className="mb-3">
          <strong>Email:</strong> {user.email}
        </p>

        <p className="mb-3">
          <strong>ID:</strong> {user.uid}
        </p>

      </div>

    </div>
  );
}
