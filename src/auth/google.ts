import {loadGoogle} from './googleSdk';

export type ConnectedYouTube={name:string;avatar?:string;channelId:string};
const scope='https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube';

export async function connectGoogle():Promise<{token:string;channel:ConnectedYouTube}>{
  const clientId=import.meta.env.VITE_GOOGLE_CLIENT_ID as string|undefined;
  if(!clientId) throw new Error('VITE_GOOGLE_CLIENT_ID is not configured.');
  await loadGoogle();
  const token=await new Promise<string>((resolve,reject)=>{
    window.google!.accounts.oauth2.initTokenClient({client_id:clientId,scope,callback:r=>r.access_token?resolve(r.access_token):reject(new Error(r.error||'Google authorization failed.'))}).requestAccessToken();
  });
  const response=await fetch('https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true',{headers:{Authorization:`Bearer ${token}`}});
  if(!response.ok) throw new Error('Google connected, but the YouTube channel could not be read.');
  const data=await response.json() as {items?:Array<{id:string;snippet:{title:string;thumbnails?:{default?:{url:string}}}}>};
  const item=data.items?.[0];
  if(!item) throw new Error('No YouTube channel found for this Google account.');
  return{token,channel:{channelId:item.id,name:item.snippet.title,avatar:item.snippet.thumbnails?.default?.url}};
}
