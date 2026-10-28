import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AuthProvider,useAuth} from './auth/AuthContext';
import PublicHome from './auth/PublicHome';
import './styles.css';
import './public.css';

function Root(){
  const {profile,loading}=useAuth();
  if(loading&&!profile) return <div className="auth-loading"><div className="brand-mark">PH</div><b>Loading Publish Hub…</b></div>;
  if(!profile) return <PublicHome/>;
  return <App/>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><AuthProvider><Root /></AuthProvider></React.StrictMode>);
