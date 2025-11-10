# React Authentication App

A modern React application with user authentication, featuring attractive UI and localStorage persistence.

## Features

- ✅ **Attractive UI Design**: Modern glassmorphism design with gradient backgrounds
- ✅ **User Registration**: Create new user accounts with validation
- ✅ **User Login**: Authenticate existing users
- ✅ **localStorage Persistence**: 
  - Auto-save form drafts (excluding passwords for security)
  - Store registered users
  - Remember login preferences
  - Maintain authentication state
- ✅ **Form Validation**: Real-time validation with error messages
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Dashboard**: Protected dashboard view for authenticated users

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Usage

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and visit: `http://localhost:5173`

## How to Use

### Registration
1. Click "Register" in the top navigation
2. Fill in your details (all fields except phone are required)
3. Form data is automatically saved as you type (draft persistence)
4. Click "Create account" to register
5. You'll be automatically logged in after successful registration

### Login
1. Click "Login" in the top navigation  
2. Enter your email and password
3. Optionally check "Remember me" to save your email for future logins
4. Click "Sign in" to authenticate
5. You'll be redirected to the dashboard upon successful login

### Dashboard
- View your profile information
- See session details (last login, total users)
- Logout when done

## Authentication Features

### Security
- Passwords are base64 encoded (not suitable for production - use proper hashing in real apps)
- Form drafts exclude passwords for security
- Session management with automatic cleanup

### localStorage Data Structure
```javascript
// Registered users
"registeredUsers": [
  {
    "id": "timestamp",
    "username": "John Doe", 
    "email": "john@example.com",
    "number": "+1234567890",
    "passwordHash": "base64EncodedPassword",
    "createdAt": "2024-11-10T..."
  }
]

// Current session
"currentUser": {
  "id": "timestamp",
  "username": "John Doe",
  "email": "john@example.com", 
  "number": "+1234567890"
}

// Auto-save drafts
"register_draft": { "username": "John", "email": "john@..." }
"login_draft": { "email": "john@...", "remember": true }

// Other data
"lastLogin": "2024-11-10T..."
"remember_email": "john@example.com"
```

## Technical Stack

- **React 19**: Latest React with hooks
- **Vite**: Fast development and build tool  
- **Tailwind CSS**: Utility-first CSS framework
- **Context API**: State management for authentication
- **localStorage API**: Client-side data persistence

## File Structure

```
src/
├── components/
│   ├── Login.jsx          # Login form component
│   ├── Register.jsx       # Registration form component
│   └── Dashboard.jsx      # Protected dashboard component
├── context/
│   └── AuthContext.jsx    # Authentication context and logic
├── App.jsx               # Main app component with routing
├── App.css              # Global styles
└── main.jsx             # React app entry point
```

## Development Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production  
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## Production Considerations

For production use, consider:

1. **Security**: Replace base64 encoding with proper password hashing (bcrypt, scrypt, etc.)
2. **Backend**: Implement proper server-side authentication
3. **Validation**: Add comprehensive client and server-side validation
4. **Session Management**: Use JWT tokens or secure session cookies
5. **HTTPS**: Ensure all authentication happens over HTTPS
6. **Error Handling**: Implement comprehensive error boundaries
7. **Testing**: Add unit and integration tests
