import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", number: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    const next = { ...user, [name]: value };
    setUser(next);
    
    // autosave draft (exclude password for security)
    try {
      const { password, ...draft } = next;
      localStorage.setItem("register_draft", JSON.stringify(draft));
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    try {
      const draft = localStorage.getItem("register_draft");
      if (draft) {
        setUser(prev => ({ ...prev, ...JSON.parse(draft) }));
      }
    } catch {
      // ignore parsing errors
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      await register(user);
      setSubmitted(true);
      localStorage.removeItem("register_draft");
      setTimeout(() => setSubmitted(false), 1600);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-indigo-900 to-sky-800 p-6">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-linear-to-tr from-rose-400 to-yellow-300 flex items-center justify-center text-white font-bold text-xl shadow-md">
            R
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Create account</h2>
            <p className="text-sm text-white/70">Join us — it's free and only takes a minute.</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            aria-label="Full name"
            name="username"
            value={user.username}
            onChange={handleInput}
            required
            placeholder="Full name"
            className="w-full p-3 rounded-lg bg-white/90 placeholder:text-slate-500 focus:outline-none ring-1 ring-white/20"
          />
          <input
            aria-label="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleInput}
            required
            placeholder="Email address"
            className="w-full p-3 rounded-lg bg-white/90 placeholder:text-slate-500 focus:outline-none ring-1 ring-white/20"
          />
          <input
            aria-label="Phone"
            name="number"
            type="tel"
            value={user.number}
            onChange={handleInput}
            placeholder="Phone (optional)"
            className="w-full p-3 rounded-lg bg-white/90 placeholder:text-slate-500 focus:outline-none ring-1 ring-white/20"
          />
          <input
            aria-label="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleInput}
            required
            placeholder="Create password"
            className="w-full p-3 rounded-lg bg-white/90 placeholder:text-slate-500 focus:outline-none ring-1 ring-white/20"
          />

          <button
            type="submit"
            disabled={submitted}
            className="w-full py-3 rounded-lg bg-linear-to-r from-rose-500 to-orange-400 text-white font-semibold shadow hover:opacity-95 transition-opacity disabled:opacity-50"
          >
            {submitted ? "Registered ✓" : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/70">
          By creating an account you agree to our <span className="underline">Terms</span> and <span className="underline">Privacy</span>.
        </div>
      </div>
    </div>
  );
};

export default Register;
