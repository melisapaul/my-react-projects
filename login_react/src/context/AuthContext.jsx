import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = (userData) => {
    const { username, email, number, password } = userData;
    
    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if user already exists
    const userExists = existingUsers.some(u => u.email === email);
    if (userExists) {
      throw new Error('User already exists with this email');
    }

    // Create new user (don't store plain password)
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      number,
      passwordHash: btoa(password), // Simple encoding (not secure for production)
      createdAt: new Date().toISOString()
    };

    // Save to users list
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

    // Auto-login after registration
    const userSession = { id: newUser.id, username, email, number };
    setUser(userSession);
    localStorage.setItem('currentUser', JSON.stringify(userSession));
    
    return newUser;
  };

  const login = (email, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = registeredUsers.find(u => u.email === email);

    if (!user || user.passwordHash !== btoa(password)) {
      throw new Error('Invalid email or password');
    }

    // Create session (without password)
    const userSession = { 
      id: user.id, 
      username: user.username, 
      email: user.email, 
      number: user.number 
    };
    
    setUser(userSession);
    localStorage.setItem('currentUser', JSON.stringify(userSession));
    localStorage.setItem('lastLogin', new Date().toISOString());
    
    return userSession;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};