import {createContext,useContext,useEffect,useMemo,useState,type ReactNode} from 'react';

export type Language='pt-BR'|'en-US';
const STORAGE_KEY='publishhub.language';
type LangContextValue={language:Language;setLanguage:(language:Language)=>void};
const LanguageContext=createContext<LangContextValue|null>(null);

type Pair=[pt:string,en:string];
const pairs:Pair[]=[
['Publicação do seu jeito','Publishing, your way'],['Como funciona','How it works'],['Benefícios','Benefits'],['Entrar','Sign in'],
['SUA FERRAMENTA DE PUBLICAÇÃO PERSONALIZADA','YOUR PERSONALIZED PUBLISHING TOOL'],['Publique quando quiser\ne como quiser.','Publish whenever you want\nand however you want.'],
['Organize seus conteúdos, escolha onde publicar, prepare cada postagem e programe tudo no seu ritmo. O Publish Hub transforma sua rotina de publicação em um fluxo simples, visual e adaptado ao seu projeto.','Organize your content, choose where to publish, prepare each post and schedule everything at your own pace. Publish Hub turns your publishing routine into a simple, visual workflow tailored to your project.'],
['Entre e comece pelo seu próprio workspace.','Sign in and start from your own workspace.'],['Seus projetos, mídias, canais e calendários ficam organizados separadamente.','Your projects, media, channels and calendars stay organized separately.'],['Validando sua sessão…','Validating your session…'],['Seu projeto','Your project'],['Workspace de publicação','Publishing workspace'],['Biblioteca de mídia por projeto','Project media library'],['Títulos, descrições, formatos e destinos','Titles, descriptions, formats and destinations'],['Programe','Schedule'],['Fila e calendário de publicação','Publishing queue and calendar'],['Publique','Publish'],['Cada conteúdo no canal certo','Each piece of content on the right channel'],['Um fluxo. Vários projetos. Do seu jeito.','One workflow. Multiple projects. Your way.'],
['COMO FUNCIONA','HOW IT WORKS'],['Da mídia à publicação, sem bagunça.','From media to publishing, without the mess.'],['Você escolhe o projeto, trabalha apenas com o conteúdo daquele workspace e controla todo o ciclo de publicação em um só lugar.','Choose a project, work only with that workspace content, and control the entire publishing cycle in one place.'],['Crie seu projeto','Create your project'],['Defina os canais que realmente usa e mantenha cada marca, cliente ou iniciativa em um workspace independente.','Choose the channels you actually use and keep each brand, client or initiative in its own workspace.'],['Organize sua biblioteca','Organize your library'],['Importe ou adicione mídias, pesquise arquivos, acompanhe status e mantenha o histórico de publicação por destino.','Import or add media, search files, track statuses, and keep publishing history by destination.'],['Programe do seu jeito','Schedule your way'],['Monte sua fila, escolha o melhor momento e visualize tudo no calendário antes de publicar.','Build your queue, choose the best time, and preview everything on the calendar before publishing.'],
['POR QUE PUBLISH HUB','WHY PUBLISH HUB'],['Mais controle que um agendador genérico.','More control than a generic scheduler.'],['Em vez de obrigar todos os projetos a seguirem o mesmo modelo, o Publish Hub foi pensado para adaptar o fluxo de publicação ao seu conteúdo e aos canais que você realmente usa.','Instead of forcing every project into the same model, Publish Hub adapts the publishing workflow to your content and the channels you actually use.'],['Projetos isolados','Isolated projects'],['Cada workspace tem sua própria biblioteca, canais, fila, calendário, integrações e contas sociais.','Each workspace has its own library, channels, queue, calendar, integrations, and social accounts.'],['Publicação por destino','Publishing by destination'],['Um mesmo arquivo pode ter estados diferentes para vídeo, short, reel, feed ou outros formatos.','The same file can have different states for video, short, reel, feed, or other formats.'],['Fluxo personalizado','Personalized workflow'],['Ative apenas os canais necessários para cada projeto e evite telas e opções que não fazem sentido para você.','Enable only the channels each project needs and avoid screens and options that do not matter to you.'],['Integrações sob medida','Tailored integrations'],['Conecte fontes de conteúdo e ferramentas externas ao projeto certo, sem misturar seus fluxos de trabalho.','Connect content sources and external tools to the right project without mixing workflows.'],['Seu conteúdo. Seu calendário. Suas regras.','Your content. Your calendar. Your rules.'],['Centralize a preparação e a publicação sem perder a liberdade de trabalhar do seu jeito.','Centralize preparation and publishing without losing the freedom to work your way.'],['Entrar no Publish Hub ↑','Sign in to Publish Hub ↑'],['Sua ferramenta de publicação personalizada.','Your personalized publishing tool.'],
['Workspaces de projetos','Project workspaces'],['Seus Projetos','Your Projects'],['Escolha um projeto para começar.','Choose a project to start working.'],['Abrir workspace →','Open workspace →'],['Criar Novo Projeto','Create New Project'],['Crie um workspace de publicação isolado e selecione os canais de publicação.','Create an isolated publishing workspace and select publishing channels.'],['Ainda não há projetos associados a esta conta Google.','No projects are mapped to this Google account yet.'],['Sair','Sign out'],['NOVO WORKSPACE','NEW WORKSPACE'],['Nome do Projeto','Project Name'],['Descrição','Description'],['Canais de Publicação','Publishing Channels'],['Cancelar','Cancel'],['Criar Projeto','Create Project'],
['Workspace do projeto','Project workspace'],['PROJETO','PROJECT'],['CONTEÚDO','CONTENT'],['Visão Geral','Overview'],['Biblioteca','Library'],['Fila de Publicação','Publishing Queue'],['Criar Novo Vídeo','Create New Video'],['Calendário de Publicação','Publishing Calendar'],['CONEXÕES','CONNECTIONS'],['Contas Sociais','Social Accounts'],['Integrações','Integrations'],['Configurações','Settings'],['Voltar aos Projetos','Back to Projects'],['PROJETO ATIVO','ACTIVE PROJECT'],['Nova mídia','New media'],['WORKSPACE DO PROJETO','PROJECT WORKSPACE'],['Mídias','Media'],['Agendados','Scheduled'],['Contas conectadas','Connected accounts'],['Próxima publicação','Next publication'],['Nenhuma','None'],['Abrir Biblioteca','Open Library'],['Gerenciar mídias do projeto','Manage project media'],['Importar vídeos do WebSeer','Pull videos from WebSeer'],['Importar mídias geradas','Import generated media'],['Enviar ou importar mídia','Upload or import media'],
['Biblioteca do Projeto','Project Library'],['itens visíveis','visible items'],['Buscar nome do arquivo ou título…','Search filename or title…'],['Todos','All'],['Pronto para Publicar','Ready to Publish'],['Publicado','Published'],['Arquivo','Archive'],['Prévia','Preview'],['Nome do Arquivo','File Name'],['Tipo','Type'],['Tamanho','Size'],['Importado','Imported'],['Duração','Duration'],['Publicação','Publishing'],['Não publicado','Not published'],['Nenhuma mídia nesta pasta ou busca.','No media in this folder or search.'],['Apenas publicações deste projeto.','Only publications from this project.'],['Nenhuma publicação agendada para este projeto.','No scheduled publications for this project.'],['Escolha como a mídia entra neste projeto.','Choose how media enters this project.'],['Enviar mídia existente','Upload existing media'],['Criar um registro de mídia exclusivo deste projeto.','Create a project-scoped media record.'],['Importar mídia','Import media'],['Preparar uma importação de outra fonte.','Prepare an import from another source.'],['Criar / Importar do WebSeer','Create / Import from WebSeer'],['Usar a integração com o WebSeer.','Use the WebSeer integration.'],['Visão semanal exclusiva deste projeto.','Project-scoped week view.'],
['As conexões pertencem somente a este projeto.','Connections belong only to this project.'],['Conecte o canal do YouTube deste projeto.','Connect the YouTube channel for this project.'],['Conectar YouTube','Connect YouTube'],['Reconectar','Reconnect'],['Arquitetura por projeto pronta. A API de publicação da Meta ainda não está implementada.','Project-scoped architecture ready. Meta publishing API is not implemented.'],['Não conectado','Not connected'],['Integração em breve.','Integration coming soon.'],['Em breve','Coming soon'],['Sistemas externos de geração de conteúdo conectados a este projeto.','External content-generation systems connected to this project.'],['Nenhuma integração externa configurada.','No external integrations configured.'],['Geral','General'],['Nenhuma integração configurada.','No integrations configured.'],['Gerenciamento do Projeto','Project Management'],['Arquivar Projeto','Archive Project'],['Excluir Projeto','Delete Project'],['Ações destrutivas permanecem desativadas no modo de armazenamento local.','Destructive actions remain disabled in local-storage mode.'],['MÍDIA','MEDIA'],['Título','Title'],['Legenda','Caption'],['Destinos de publicação','Publishing destinations'],['Fechar','Close'],['Salvar alterações','Save changes'],['Agendar próximo horário','Schedule next slot'],['O login Google ainda não está configurado.','Google Sign-In is not configured yet.'],['Carregando Publish Hub…','Loading Publish Hub…'],
['Alterar idioma','Change language'],['Português (Brasil)','Portuguese (Brazil)'],['Inglês (Estados Unidos)','English (United States)']
];

const ptToEn=new Map<string,string>(pairs);
const enToPt=new Map<string,string>(pairs.map(([pt,en])=>[en,pt]));

function translateExact(text:string,language:Language){
  const trimmed=text.trim();
  if(!trimmed)return text;
  const map=language==='pt-BR'?enToPt:ptToEn;
  const translated=map.get(trimmed);
  if(translated){const leading=text.match(/^\s*/)?.[0]??'';const trailing=text.match(/\s*$/)?.[0]??'';return leading+translated+trailing}
  let result=text;
  for(const [from,to] of map.entries())if(result.includes(from))result=result.split(from).join(to);
  return result;
}

export function LanguageProvider({children}:{children:ReactNode}){
  const [language,setLanguageState]=useState<Language>(()=>{
    const stored=localStorage.getItem(STORAGE_KEY);
    if(stored==='pt-BR'||stored==='en-US')return stored;
    return navigator.language.toLowerCase().startsWith('pt')?'pt-BR':'en-US';
  });
  const setLanguage=(next:Language)=>{localStorage.setItem(STORAGE_KEY,next);setLanguageState(next)};
  useEffect(()=>{document.documentElement.lang=language;document.title='Publish Hub'},[language]);
  const value=useMemo(()=>({language,setLanguage}),[language]);
  return <LanguageContext.Provider value={value}><RuntimeTranslator language={language}/>{children}</LanguageContext.Provider>;
}

function RuntimeTranslator({language}:{language:Language}){
  useEffect(()=>{
    const translateNode=(node:Node)=>{
      if(node.nodeType===Node.TEXT_NODE){const text=node.nodeValue??'';const next=translateExact(text,language);if(text!==next)node.nodeValue=next}
      if(node.nodeType===Node.ELEMENT_NODE){
        const el=node as Element;
        for(const attr of ['placeholder','title','aria-label']){const current=el.getAttribute(attr);if(current!=null){const next=translateExact(current,language);if(current!==next)el.setAttribute(attr,next)}}
        el.childNodes.forEach(translateNode);
      }
    };
    translateNode(document.body);
    const observer=new MutationObserver(mutations=>{for(const m of mutations){m.addedNodes.forEach(translateNode);if(m.type==='characterData')translateNode(m.target)}});
    observer.observe(document.body,{subtree:true,childList:true,characterData:true});
    return()=>observer.disconnect();
  },[language]);
  return null;
}

export function useLanguage(){const context=useContext(LanguageContext);if(!context)throw new Error('LanguageProvider is missing.');return context}
export function translateText(text:string,language:Language){return translateExact(text,language)}
