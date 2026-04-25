"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X, Lock, User, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminLoginModal({ isOpen, onClose }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        toast.success("Login Successful");
        setTimeout(() => {
          window.location.href = "/admin-dashboard";
        }, 500);
      } else {
        toast.error("Invalid credentials");
        setLoading(false);
      }
    } catch {
      toast.error("Network error");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-midnight/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-45%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-45%" }}
            className="fixed left-1/2 top-1/2 w-[90%] max-w-sm bg-white dark:bg-[#0f0f17] rounded-3xl overflow-hidden z-[101] border border-gray-100 dark:border-white/10 shadow-luxury"
          >
            <div className="absolute top-4 right-4 z-10">
              <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-white/5 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                <X className="w-4 h-4 text-midnight dark:text-white" />
              </button>
            </div>

            <div className="p-8">
              <div className="w-16 h-16 rounded-2xl bg-champagne/10 flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-8 h-8 text-champagne" />
              </div>
              
              <h2 className="font-serif text-2xl font-bold text-midnight dark:text-white text-center mb-2">Admin Access</h2>
              <p className="text-sm text-warmgray dark:text-gray-400 font-sans text-center mb-8">Please enter your credentials to access the secure dashboard.</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-4 h-4 text-warmgray" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-sans focus:outline-none focus:border-champagne transition-colors text-midnight dark:text-white"
                    placeholder="Username"
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-warmgray" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-sans focus:outline-none focus:border-champagne transition-colors text-midnight dark:text-white"
                    placeholder="Password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3.5 mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Login securely <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
