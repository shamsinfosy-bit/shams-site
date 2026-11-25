import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store';
import { sendTelegramOTP, generateOTP } from '../../services/telegram';

interface AdminOTPGuardProps { children: React.ReactNode; }

export default function AdminOTPGuard({ children }: AdminOTPGuardProps) {
  const user = useUserStore(s => s.user);
  const isAuthenticated = useUserStore(s => s.isAuthenticated);
  const authLoading = useUserStore(s => s.authLoading);
  const navigate = useNavigate();
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);

  const isAdmin = user?.role === 'director' || user?.role === 'deputy' || user?.role === 'admin';
  const telegramChatId = (user as any)?.telegramChatId as string | undefined;

  useEffect(() => {
    // ننتظر لحد ما Firebase يخلص التحقق من الجلسة الحقيقية
    // قبل ما نقرر نطرد المستخدم — وإلا بيتطرد بالغلط عند أي تحميل مباشر للصفحة
    if (authLoading) return;
    if (!isAuthenticated) { navigate('/login'); return; }
    if (!isAdmin) { navigate('/'); return; }
    const adminVerified = sessionStorage.getItem('shams_admin_verified');
    if (adminVerified === 'true') { setVerified(true); }
    else { sendOTP(); }
  }, [authLoading, isAuthenticated, isAdmin]);

  const sendOTP = async () => {
    // كل مستخدم إداري له telegramChatId خاص فيه بمستنده بـ Firestore،
    // بدل رقم ثابت واحد يشترك فيه الجميع
    if (!telegramChatId) {
      setSendFailed(true);
      return;
    }
    setSendFailed(false);
    const code = generateOTP();
    setGeneratedOTP(code);
    await sendTelegramOTP(telegramChatId, code);
  };

  const handleVerify = () => {
    if (otpCode === generatedOTP) {
      sessionStorage.setItem('shams_admin_verified', 'true');
      setVerified(true);
    } else { setError('Invalid code'); }
  };

  if (authLoading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#c9a050', background: '#000', minHeight: '100vh' }}>
        Initializing session...
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) return null;

  if (!verified) {
    if (sendFailed) {
      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-md w-full text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-white mb-2">Telegram Not Linked</h2>
            <p className="text-gray-400 mb-2">Your account doesn't have a Telegram Chat ID configured yet.</p>
            <p className="text-gray-500 text-sm">Please contact the director to link your Telegram account before accessing the dashboard.</p>
          </div>
        </div>
      );
    }
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
