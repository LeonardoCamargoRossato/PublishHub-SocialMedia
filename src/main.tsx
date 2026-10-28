import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AuthProvider,useAuth} from './auth/AuthContext';
import PublicHome from './auth/PublicHome';
import './styles.css';

function Root(){
  const {profile,loading,signOut}=useAuth();
  if(loading&&!profile) return <div className="auth-loading"><div className="brand-mark">PH</div><b>Loading Publish Hub…</b></div>;
  if(!profile) return <PublicHome/>;
  return <div className="authenticated-root"><App/><div className="session-pill">{profile.picture?<img src={profile.picture} alt="" referrerPolicy="no-referrer"/>:<span>{profile.name.slice(0,1).toUpperCase()}</span>}<div><b>{profile.name}</b><small>{profile.email}</small></div><button onClick={signOut}>Sign out</button></div></div>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><AuthProvider><Root /></AuthProvider></React.StrictMode>);
