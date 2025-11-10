import React, { useState, useEffect } from "react";

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", number: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    const next = { ...user, [name]: value };
    setUser(next);
    // autosave draft
    try {
      localStorage.setItem("register_draft", JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    try {
      const draft = localStorage.getItem("register_draft");
      if (draft) setUser(JSON.parse(draft));
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("registering:", user);
    try {
      // append to users array in localStorage
      const raw = localStorage.getItem("users") || "[]";
      const users = JSON.parse(raw);
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.removeItem("register_draft");
    } catch (err) {
      console.error("localStorage error:", err);
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 1600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-sky-800 p-6">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-400 to-yellow-300 flex items-center justify-center text-white font-bold text-xl shadow-md">
            R
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Create account</h2>
            <p className="text-sm text-white/70">Join us — it's free and only takes a minute.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            aria-label="Full name"
            name="username"
            onChange={handleInput}
            required
            placeholder="Full name"
            className="w-full p-3 rounded-lg bg-white/90 placeholder:text-slate-500 focus:outline-none ring-1 ring-white/20"
          />
          <input
            aria-label="Email"
            name="email"
            type="email"
            onChange={handleInput}
            required
            placeholder="Email address"
            className="w-full p-3 rounded-lg bg-white/90 placeholder:text-slate-500 focus:outline-none ring-1 ring-white/20"
          />
          <input
            aria-label="Phone"
            name="number"
            type="tel"
            onChange={handleInput}
            placeholder="Phone (optional)"
            className="w-full p-3 rounded-lg bg-white/90 placeholder:text-slate-500 focus:outline-none ring-1 ring-white/20"
          />
          <input
            aria-label="Password"
            name="password"
            type="password"
            onChange={handleInput}
            required
            placeholder="Create password"
            className="w-full p-3 rounded-lg bg-white/90 placeholder:text-slate-500 focus:outline-none ring-1 ring-white/20"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold shadow hover:opacity-95 transition-opacity"
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
