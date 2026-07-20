import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store';
import { sendTelegramOTP, generateOTP } from '../../services/telegram';

interface AdminOTPGuardProps { children: React.ReactNode; }
const CHAT_ID = '5780294238';

export default function AdminOTPGuard({ children }: AdminOTPGuardProps) {
  const user = useUserStore(s => s.user);
  const isAuthenticated = useUserStore(s => s.isAuthenticated);
  const navigate = useNavigate();
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  const isAdmin = user?.role === 'director' || user?.role === 'deputy' || user?.role === 'admin';

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return; }
    if (!isAdmin) { navigate('/'); return; }
    const adminVerified = sessionStorage.getItem('shams_admin_verified');
    if (adminVerified === 'true') { setVerified(true); }
    else { sendOTP(); }
  }, []);

  const sendOTP = async () => {
    const code = generateOTP();
    setGeneratedOTP(code);
    await sendTelegramOTP(CHAT_ID, code);
  };

  const handleVerify = () => {
    if (otpCode === generatedOTP) {
      sessionStorage.setItem('shams_admin_verified', 'true');
      setVerified(true);
    } else { setError('Invalid code'); }
  };

  if (!isAuthenticated || !isAdmin) return null;

  if (!verified) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-md w-full text-center">
          <div className="text-4xl mb-4">🔐</div>
          <h2 className="text-xl font-bold text-white mb-2">Admin Verification</h2>
          <p className="text-gray-400 mb-6">A verification code has been sent to your Telegram.</p>
          <input type="text" placeholder="000000" maxLength={6} value={otpCode} onChange={(e) => setOtpCode(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-center text-2xl tracking-widest mb-4 outline-none" />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button onClick={handleVerify} className="w-full py-3 bg-shams-500 hover:bg-shams-600 text-black font-semibold rounded-lg transition">Verify & Enter Dashboard</button>
          <button onClick={sendOTP} className="w-full mt-2 py-2 text-gray-400 hover:text-white text-sm">Resend Code</button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
