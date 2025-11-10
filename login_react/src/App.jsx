
import './App.css';
import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [view, setView] = useState('login');

  return (
    <>
      <header className="fixed top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="text-white font-extrabold text-lg bg-white/5 px-3 py-2 rounded-lg">MyApp</div>
        <nav className="bg-white/5 p-2 rounded-lg">
          <button onClick={() => setView('login')} className={`mr-2 px-3 py-1 rounded-md ${view==='login' ? 'bg-white/20 text-white' : 'text-white/80'}`}>Login</button>
          <button onClick={() => setView('register')} className={`${view==='register' ? 'bg-white/20 text-white' : 'text-white/80'} px-3 py-1 rounded-md`}>Register</button>
        </nav>
      </header>

      {view === 'login' ? <Login onSwitch={() => setView('register')} /> : <Register />}
    </>
  );
}

export default App;
