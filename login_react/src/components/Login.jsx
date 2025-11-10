import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Login = ({ onSwitch }) => {
  const [data, setData] = useState({ email: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const next = { ...data, [name]: type === "checkbox" ? checked : value };
    setData(next);
    
    // Save draft (exclude password for security)
    try {
      const { password: _password, ...draft } = next;
      localStorage.setItem("login_draft", JSON.stringify(draft));
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    try {
      const draft = localStorage.getItem("login_draft");
      if (draft) {
        const parsed = JSON.parse(draft);
        setData(prev => ({ ...prev, email: parsed.email || "", remember: parsed.remember || false }));
      }
      const remembered = localStorage.getItem("remember_email");
      if (remembered) setData((p) => ({ ...p, email: remembered, remember: true }));
    } catch {
      // ignore parsing errors
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await login(data.email, data.password);
      
      // Handle remember me
      if (data.remember) {
        localStorage.setItem("remember_email", data.email);
      } else {
        localStorage.removeItem("remember_email");
      }
      
      localStorage.removeItem("login_draft");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-indigo-900 to-sky-800 p-6">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-white">Welcome back</h1>
          <p className="text-sm text-white/70">Sign in to continue to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-3 rounded-lg bg-white/90 placeholder:text-slate-500 focus:outline-none ring-1 ring-white/20"
          />
          <input
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg bg-white/90 placeholder:text-slate-500 focus:outline-none ring-1 ring-white/20"
          />

          <div className="flex items-center justify-between text-sm text-white/80">
            <label className="flex items-center gap-2">
              <input name="remember" type="checkbox" checked={data.remember} onChange={handleChange} className="accent-rose-500" />
              Remember me
            </label>
            <button type="button" className="underline" onClick={() => alert('Forgot password flow not implemented')}>Forgot?</button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-linear-to-r from-emerald-400 to-teal-500 text-white font-semibold shadow hover:opacity-95 transition-opacity"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/80">
          Don’t have an account?{' '}
          <button onClick={onSwitch} className="font-semibold underline">
            Create one
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
