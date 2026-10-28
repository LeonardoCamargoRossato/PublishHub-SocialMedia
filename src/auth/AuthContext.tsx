import {createContext,useContext,useEffect,useMemo,useState,type ReactNode} from 'react';
import {createRemoteJWKSet,jwtVerify} from 'jose';

export const GOOGLE_CLIENT_ID=(import.meta.env.VITE_GOOGLE_CLIENT_ID??'').trim();
export const ALLOWED_GOOGLE_EMAIL=(import.meta.env.VITE_ALLOWED_GOOGLE_EMAIL??'').trim().toLowerCase();
const SESSION_KEY='publishhub.google.idToken';
const keys=createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));

export type GoogleProfile={id:string;name:string;email:string;picture?:string;expiresAt:number};
type AuthValue={profile:GoogleProfile|null;loading:boolean;error:string;signIn:(credential:string,nonce:string)=>Promise<void>;signOut:()=>void};
const AuthContext=createContext<AuthValue|null>(null);

async function verifyCredential(credential:string,nonce?:string):Promise<GoogleProfile>{
  if(!GOOGLE_CLIENT_ID) throw new Error('Google Client ID is not configured.');
  const {payload}=await jwtVerify(credential,keys,{audience:GOOGLE_CLIENT_ID,issuer:['https://accounts.google.com','accounts.google.com'],algorithms:['RS256']});
  if(nonce&&payload.nonce!==nonce) throw new Error('Google sign-in nonce is invalid.');
  if(!payload.sub||typeof payload.email!=='string'||payload.email_verified!==true||!payload.exp) throw new Error('Google did not return a complete verified profile.');
  const email=payload.email.toLowerCase();
  if(ALLOWED_GOOGLE_EMAIL&&email!==ALLOWED_GOOGLE_EMAIL) throw new Error(`This Google account is not authorized for Publish Hub (${email}).`);
  const name=typeof payload.name==='string'&&payload.name.trim()?payload.name:email;
  return {id:payload.sub,name,email,picture:typeof payload.picture==='string'?payload.picture:undefined,expiresAt:payload.exp*1000};
}

export function AuthProvider({children}:{children:ReactNode}){
  const [profile,setProfile]=useState<GoogleProfile|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  useEffect(()=>{let live=true;(async()=>{try{const saved=sessionStorage.getItem(SESSION_KEY);if(saved&&GOOGLE_CLIENT_ID){const user=await verifyCredential(saved);if(live)setProfile(user)}}catch{sessionStorage.removeItem(SESSION_KEY)}finally{if(live)setLoading(false)}})();return()=>{live=false}},[]);
  useEffect(()=>{if(!profile)return;const timer=window.setTimeout(()=>signOut(),Math.max(0,profile.expiresAt-Date.now()));return()=>window.clearTimeout(timer)},[profile]);
  async function signIn(credential:string,nonce:string){setLoading(true);setError('');try{const user=await verifyCredential(credential,nonce);sessionStorage.setItem(SESSION_KEY,credential);setProfile(user)}catch(e){sessionStorage.removeItem(SESSION_KEY);setProfile(null);setError(e instanceof Error?e.message:'Google sign-in failed.')}finally{setLoading(false)}}
  function signOut(){sessionStorage.removeItem(SESSION_KEY);sessionStorage.removeItem('publishhub.youtubeToken');setProfile(null);setError('');window.google?.accounts.id.disableAutoSelect()}
  const value=useMemo(()=>({profile,loading,error,signIn,signOut}),[profile,loading,error]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(){const value=useContext(AuthContext);if(!value)throw new Error('AuthProvider is missing.');return value}
