import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import JCIlogo from '../assets/logo-JCI.png';

// Match the theme from JCI.tsx
const THEME = {
  BG_PRIMARY: '#3E2723',
  BG_SECONDARY: '#211E1E',
  TEXT_PRIMARY: '#F4F1E8',
  ACCENT_RED: '#A83232',
  ACCENT_YELLOW: '#FFBC00',
};

const FONTS = {
  HEADLINE: "'Pirata One', cursive",
  BODY: "'Outfit', sans-serif",
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: THEME.BG_PRIMARY }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&family=Pirata+One&display=swap');
      `}</style>

      {/* Tribal Pattern Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-5">
        <svg className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke={THEME.ACCENT_YELLOW} strokeWidth="0.5">
          <path d="M10,10 Q30,5 50,10 Q70,15 90,10 V90 Q70,95 50,90 Q30,85 10,90 Z" />
          <path d="M20,20 Q40,15 50,20 Q60,25 80,20 V80 Q60,85 50,80 Q40,75 20,80 Z" />
          <circle cx="50" cy="50" r="15" />
          <path d="M50,35 V65 M35,50 H65" />
        </svg>
      </div>

      {/* Gradient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ backgroundColor: `${THEME.ACCENT_RED}20` }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ backgroundColor: `${THEME.ACCENT_YELLOW}20` }}></div>

      <motion.div 
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Main Card */}
        <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="p-8 text-center">
            <motion.div 
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: THEME.BG_SECONDARY }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={JCIlogo} alt="JCI Logo" className="w-14 h-14 object-contain" />
            </motion.div>

            <h1 className="text-3xl mb-2" style={{ color: THEME.TEXT_PRIMARY, fontFamily: FONTS.HEADLINE }}>
              JCI <span style={{ color: THEME.ACCENT_RED }}>Admin</span>
            </h1>
            <p className="text-sm" style={{ color: THEME.ACCENT_YELLOW, fontFamily: FONTS.BODY }}>
              Sign in to continue
            </p>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: THEME.TEXT_PRIMARY, fontFamily: FONTS.BODY }}>
                  Email
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: THEME.ACCENT_YELLOW }} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      fontFamily: FONTS.BODY
                    }}
                    onFocus={(e) => e.target.style.borderColor = THEME.ACCENT_YELLOW}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    placeholder="admin@jci.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: THEME.TEXT_PRIMARY, fontFamily: FONTS.BODY }}>
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: THEME.ACCENT_YELLOW }} />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      fontFamily: FONTS.BODY
                    }}
                    onFocus={(e) => e.target.style.borderColor = THEME.ACCENT_YELLOW}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg text-sm"
                  style={{ 
                    backgroundColor: `${THEME.ACCENT_RED}20`,
                    color: THEME.TEXT_PRIMARY,
                    fontFamily: FONTS.BODY
                  }}
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
                style={{ 
                  backgroundColor: loading ? '#666' : THEME.ACCENT_RED,
                  color: THEME.TEXT_PRIMARY,
                  fontFamily: FONTS.BODY
                }}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? 'Signing in...' : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>

              {/* Demo Credentials */}
              <div className="pt-4 text-center">
                <p className="text-xs mb-2" style={{ color: THEME.ACCENT_YELLOW, fontFamily: FONTS.BODY }}>
                  Demo Credentials
                </p>
                <code className="text-sm px-3 py-1 rounded inline-block" style={{ 
                  color: THEME.TEXT_PRIMARY,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  fontFamily: 'monospace'
                }}>
                  admin@jci.com / admin123
                </code>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-sm opacity-60" style={{ color: THEME.TEXT_PRIMARY, fontFamily: FONTS.BODY }}>
          © 2025 JCI Cebu Lakan Bahaghari
        </p>
      </motion.div>
    </div>
  );
}
