import React from 'react';
import Header from './components/Header/Header'
import { AuthProvider } from './AuthContext'

function App() {
  return (
    <AuthProvider>
      <Header/>
    </AuthProvider>
  );
}

export default App;
