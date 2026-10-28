declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {client_id:string;callback:(response:{credential:string})=>void;nonce?:string;auto_select?:boolean;ux_mode?:'popup'|'redirect';cancel_on_tap_outside?:boolean}) => void;
          renderButton: (element: HTMLElement, options: {type?:string;theme?:string;size?:string;text?:string;shape?:string;width?:number;locale?:string}) => void;
          disableAutoSelect: () => void;
        };
        oauth2: {
          initTokenClient:(config:{client_id:string;scope:string;callback:(response:{access_token?:string;error?:string})=>void})=>{requestAccessToken:()=>void};
        };
      };
    };
  }
}

export function loadGoogle(){
  return new Promise<void>((resolve,reject)=>{
    if(window.google) return resolve();
    const existing=document.querySelector<HTMLScriptElement>('script[data-google-identity]');
    if(existing){
      existing.addEventListener('load',()=>resolve(),{once:true});
      existing.addEventListener('error',()=>reject(new Error('Could not load Google Identity Services.')),{once:true});
      return;
    }
    const script=document.createElement('script');
    script.src='https://accounts.google.com/gsi/client';
    script.async=true;
    script.defer=true;
    script.dataset.googleIdentity='true';
    script.onload=()=>resolve();
    script.onerror=()=>reject(new Error('Could not load Google Identity Services.'));
    document.head.appendChild(script);
  });
}

export {};
