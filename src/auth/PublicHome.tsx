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
      window.google!.accounts.id.renderButton(button.current,{type:'standard',theme:'outline',size:'large',text:'signin_with',shape:'rectangular',width:300,locale:'pt-BR'});
    }).catch(()=>{if(live)setSdkError('Não foi possível carregar o login do Google. Verifique sua conexão ou bloqueador do navegador.')});
    return()=>{live=false;if(receiver===handler)receiver=undefined};
  },[signIn]);

  return <div className="public-site commercial-home">
    <header className="public-nav commercial-nav">
      <div className="public-brand"><span className="brand-mark">PH</span><div><strong>Publish Hub</strong><small>Publicação do seu jeito</small></div></div>
      <nav className="commercial-links"><a href="#como-funciona">Como funciona</a><a href="#beneficios">Benefícios</a><a href="#entrar">Entrar</a></nav>
    </header>

    <main>
      <section className="commercial-hero">
        <div className="commercial-copy">
          <span className="eyebrow">SUA FERRAMENTA DE PUBLICAÇÃO PERSONALIZADA</span>
          <h1>Publique quando quiser<br/>e como quiser.</h1>
          <p className="commercial-lead">Organize seus conteúdos, escolha onde publicar, prepare cada postagem e programe tudo no seu ritmo. O Publish Hub transforma sua rotina de publicação em um fluxo simples, visual e adaptado ao seu projeto.</p>
          <div id="entrar" className="commercial-login">
            <div><b>Entre e comece pelo seu próprio workspace.</b><span>Seus projetos, mídias, canais e calendários ficam organizados separadamente.</span></div>
            {GOOGLE_CLIENT_ID?<div ref={button} className="google-signin-button"/>:<div className="login-disabled"><b>Login Google ainda não configurado.</b><span>Adicione o OAuth Client ID na configuração do deploy.</span></div>}
          </div>
          {loading&&<p className="login-status">Validando sua sessão…</p>}
          {(error||sdkError)&&<p className="login-error">{error||sdkError}</p>}
        </div>

        <div className="commercial-product-card" aria-label="Publish Hub workflow preview">
          <div className="product-card-top"><span className="brand-mark">PH</span><div><b>Seu projeto</b><small>Workspace de publicação</small></div></div>
          <div className="product-step"><span>01</span><div><b>Organize</b><small>Biblioteca de mídia por projeto</small></div></div>
          <div className="product-step"><span>02</span><div><b>Prepare</b><small>Títulos, descrições, formatos e destinos</small></div></div>
          <div className="product-step"><span>03</span><div><b>Programe</b><small>Fila e calendário de publicação</small></div></div>
          <div className="product-step"><span>04</span><div><b>Publique</b><small>Cada conteúdo no canal certo</small></div></div>
          <div className="product-card-footer">Um fluxo. Vários projetos. Do seu jeito.</div>
        </div>
      </section>

      <section id="como-funciona" className="commercial-section">
        <div className="commercial-section-heading"><span className="eyebrow">COMO FUNCIONA</span><h2>Da mídia à publicação, sem bagunça.</h2><p>Você escolhe o projeto, trabalha apenas com o conteúdo daquele workspace e controla todo o ciclo de publicação em um só lugar.</p></div>
        <div className="commercial-grid three">
          <article><span className="feature-number">01</span><h3>Crie seu projeto</h3><p>Defina os canais que realmente usa e mantenha cada marca, cliente ou iniciativa em um workspace independente.</p></article>
          <article><span className="feature-number">02</span><h3>Organize sua biblioteca</h3><p>Importe ou adicione mídias, pesquise arquivos, acompanhe status e mantenha o histórico de publicação por destino.</p></article>
          <article><span className="feature-number">03</span><h3>Programe do seu jeito</h3><p>Monte sua fila, escolha o melhor momento e visualize tudo no calendário antes de publicar.</p></article>
        </div>
      </section>

      <section id="beneficios" className="commercial-section benefit-section">
        <div className="commercial-section-heading"><span className="eyebrow">POR QUE PUBLISH HUB</span><h2>Mais controle que um agendador genérico.</h2><p>Em vez de obrigar todos os projetos a seguirem o mesmo modelo, o Publish Hub foi pensado para adaptar o fluxo de publicação ao seu conteúdo e aos canais que você realmente usa.</p></div>
        <div className="commercial-grid four">
          <article><h3>Projetos isolados</h3><p>Cada workspace tem sua própria biblioteca, canais, fila, calendário, integrações e contas sociais.</p></article>
          <article><h3>Publicação por destino</h3><p>Um mesmo arquivo pode ter estados diferentes para vídeo, short, reel, feed ou outros formatos.</p></article>
          <article><h3>Fluxo personalizado</h3><p>Ative apenas os canais necessários para cada projeto e evite telas e opções que não fazem sentido para você.</p></article>
          <article><h3>Integrações sob medida</h3><p>Conecte fontes de conteúdo e ferramentas externas ao projeto certo, sem misturar seus fluxos de trabalho.</p></article>
        </div>
      </section>

      <section className="commercial-cta">
        <span className="eyebrow">PUBLISH HUB</span>
        <h2>Seu conteúdo. Seu calendário. Suas regras.</h2>
        <p>Centralize a preparação e a publicação sem perder a liberdade de trabalhar do seu jeito.</p>
        <a href="#entrar" className="cta-link">Entrar no Publish Hub ↑</a>
      </section>
    </main>

    <footer className="public-footer commercial-footer"><strong>Publish Hub</strong><span>Sua ferramenta de publicação personalizada.</span></footer>
  </div>;
}
