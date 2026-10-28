import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AuthProvider,useAuth} from './auth/AuthContext';
import PublicHome from './auth/PublicHome';
import {LanguageProvider} from './i18n';
import LanguageSwitcher from './LanguageSwitcher';
import './styles.css';
import './public.css';
import './workspace.css';
import './commercial.css';
import './i18n.css';

function Root(){
  const {profile,loading}=useAuth();
  if(loading&&!profile) return <><LanguageSwitcher/><div className="auth-loading"><div className="brand-mark">PH</div><b>Loading Publish Hub…</b></div></>;
  if(!profile) return <><LanguageSwitcher/><PublicHome/></>;
  return <><LanguageSwitcher/><App/></>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider><Root /></AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
);
