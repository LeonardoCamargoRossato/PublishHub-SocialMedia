import {useEffect,useRef,useState} from 'react';
import {GOOGLE_CLIENT_ID,useAuth} from './AuthContext';
import {loadGoogle} from './googleSdk';

let initialized=false;
let nonce='';
let receiver:((credential:string)=>void)|undefined;

export default function PublicHome(){
  const {loading,error,signIn}=useAuth();
  const button=useRef<HTMLDivElement>(null);
  const [sdkError,setSdkError]=useState('');

  useEffect(()=>{
    if(!GOOGLE_CLIENT_ID) return;
    let live=true;
    const handler=(credential:string)=>{if(live)void signIn(credential,nonce)};
    receiver=handler;
    loadGoogle().then(()=>{
      if(!live||!button.current)return;
      if(!initialized){
        nonce=crypto.randomUUID();
        window.google!.accounts.id.initialize({client_id:GOOGLE_CLIENT_ID,callback:r=>receiver?.(r.credential),nonce,auto_select:false,ux_mode:'popup',cancel_on_tap_outside:true});
        initialized=true;
      }
      button.current.innerHTML='';
      window.google!.accounts.id.renderButton(button.current,{type:'standard',theme:'outline',size:'large',text:'signin_with',shape:'rectangular',width:300,locale:'en'});
    }).catch(()=>{if(live)setSdkError('Could not load Google Sign-In. Check your connection or browser blocker.')});
    return()=>{live=false;if(receiver===handler)receiver=undefined};
  },[signIn]);

  return <div className="public-site">
    <header className="public-nav"><div className="public-brand"><span className="brand-mark">PH</span><div><strong>Publish Hub</strong><small>Social publishing workspace</small></div></div><a href="#about">About</a></header>
    <main>
      <section className="public-hero">
        <div className="public-copy"><span className="eyebrow">PUBLISH HUB</span><h1>One place to prepare, schedule and publish content.</h1><p>Publish Hub is the publishing layer for WebSeer, personal portfolio content, Instituto Foton and future projects. Organize media, prepare platform-specific metadata, build queues and manage publication schedules from one workspace.</p><div className="public-actions">{GOOGLE_CLIENT_ID?<div ref={button} className="google-signin-button"/>:<div className="login-disabled"><b>Google Sign-In is not configured yet.</b><span>Add the OAuth Client ID to the GitHub Actions configuration to enable access.</span></div>}</div>{loading&&<p className="login-status">Validating Google session…</p>}{(error||sdkError)&&<p className="login-error">{error||sdkError}</p>}<small className="public-note">Access to the workspace is available only after Google authentication.</small></div>
        <div className="public-panel"><span>CONTENT SOURCES</span><div className="public-source webseer"><b>WebSeer</b><small>Analysis-generated media</small></div><div className="public-source personal"><b>Personal Portfolio</b><small>Photos, Reels and videos</small></div><div className="public-source foton"><b>Instituto Foton</b><small>Institutional content</small></div><div className="public-flow">Library <b>→</b> Queue <b>→</b> Calendar <b>→</b> Social Platforms</div></div>
      </section>
      <section id="about" className="public-features"><article><span>01</span><h2>Central Media Library</h2><p>Keep content from different projects in a single publishing library while preserving its original source.</p></article><article><span>02</span><h2>Prepare for each platform</h2><p>Separate global media data from YouTube titles, descriptions, playlists, Instagram captions and hashtags.</p></article><article><span>03</span><h2>Queue and scheduling</h2><p>Reuse WebSeer scheduling logic to distribute content across recurring publication slots.</p></article></section>
    </main>
    <footer className="public-footer"><strong>Publish Hub V0</strong><span>Built as the standalone publishing layer for Leonardo's projects.</span></footer>
  </div>;
}
