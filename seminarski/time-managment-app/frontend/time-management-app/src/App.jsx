import React from 'react';
import { ClerkProvider, SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import './App.css';

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const appearance = {
  elements: {
    // Glavni kontejner za celu formu
    rootBox: {
      backgroundColor: '#ffffff', // pozadina kao forma (bela)
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    // Glavni card/div za login formu
    card: {
      backgroundColor: '#f9fafb', // pozadina kao LeftSidebar (gray-50)
      borderRadius: '12px',
      padding: '32px',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      border: '1px solid #e5e7eb',
      width: '100%',
      maxWidth: '400px'
    },
    // Header deo sa naslovom
    headerTitle: {
      color: '#111827',
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '8px'
    },
    headerSubtitle: {
      color: '#6b7280',
      fontSize: '14px',
      marginBottom: '24px'
    },
    // Input polja
    formFieldInput: {
      backgroundColor: '#ffffff',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '10px 12px',
      fontSize: '14px',
      color: '#111827',
      transition: 'all 0.2s',
      '&:focus': {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 3px rgb(59 130 246 / 0.1)',
        outline: 'none'
      }
    },
    // Labeli za input polja
    formFieldLabel: {
      color: '#374151',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '6px'
    },
    // Glavno submit dugme
    formButtonPrimary: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      padding: '10px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      width: '100%',
      transition: 'background-color 0.2s',
      '&:hover': {
        backgroundColor: '#2563eb'
      }
    },
    // Linkovi (Sign up, Forgot password)
    footerActionLink: {
      color: '#3b82f6',
      fontSize: '14px',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    // Divider linija
    dividerLine: {
      backgroundColor: '#e5e7eb'
    },
    dividerText: {
      color: '#6b7280',
      fontSize: '12px'
    },
    // Social dugmici (Google, GitHub)
    socialButtonsBlockButton: {
      backgroundColor: '#ffffff',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '10px 16px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      width: '100%',
      marginBottom: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      '&:hover': {
        backgroundColor: '#f9fafb',
        borderColor: '#9ca3af'
      }
    }
  },
  layout: {
    socialButtonsPlacement: 'top'
  }
};

function App() {
  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      appearance={appearance}
    >
      <Router>
        <div className="App">
          <SignedIn>
            <Dashboard />
          </SignedIn>
          <SignedOut>
            <div className="min-h-screen bg-white flex items-center justify-center p-6">
              <SignIn 
                appearance={appearance}
                redirectUrl="/"
                signUpUrl="/sign-up"
              />
            </div>
          </SignedOut>
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;