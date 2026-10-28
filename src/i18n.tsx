import {createContext,useContext,useEffect,useMemo,useState,type ReactNode} from 'react';

export type Language='pt-BR'|'en-US';
const STORAGE_KEY='publishhub.language';

type LangContextValue={language:Language;setLanguage:(language:Language)=>void};
const LanguageContext=createContext<LangContextValue|null>(null);

const pairs:[string,string][]=[
['Publicação do seu jeito','Publishing, your way'],['Como funciona','How it works'],['Benefícios','Benefits'],['Entrar','Sign in'],
['SUA FERRAMENTA DE PUBLICAÇÃO PERSONALIZADA','YOUR PERSONALIZED PUBLISHING TOOL'],['Publique quando quiser\ne como quiser.','Publish whenever you want\nand however you want.'],
['Organize seus conteúdos, escolha onde publicar, prepare cada postagem e programe tudo no seu ritmo. O Publish Hub transforma sua rotina de publicação em um fluxo simples, visual e adaptado ao seu projeto.','Organize your content, choose where to publish, prepare each post and schedule everything at your own pace. Publish Hub turns your publishing routine into a simple, visual workflow tailored to your project.'],
['Entre e comece pelo seu próprio workspace.','Sign in and start from your own workspace.'],['Seus projetos, mídias, canais e calendários ficam organizados separadamente.','Your projects, media, channels and calendars stay organized separately.'],
['Validando sua sessão…','Validating your session…'],['Seu projeto','Your project'],['Workspace de publicação','Publishing workspace'],['Organize','Organize'],['Biblioteca de mídia por projeto','Project media library'],['Prepare','Prepare'],['Títulos, descrições, formatos e destinos','Titles, descriptions, formats and destinations'],['Programe','Schedule'],['Fila e calendário de publicação','Publishing queue and calendar'],['Publique','Publish'],['Cada conteúdo no canal certo','Each piece of content on the right channel'],['Um fluxo. Vários projetos. Do seu jeito.','One workflow. Multiple projects. Your way.'],
['COMO FUNCIONA','HOW IT WORKS'],['Da mídia à publicação, sem bagunça.','From media to publishing, without the mess.'],['Você escolhe o projeto, trabalha apenas com o conteúdo daquele workspace e controla todo o ciclo de publicação em um só lugar.','Choose a project, work only with that workspace content, and control the entire publishing cycle in one place.'],['Crie seu projeto','Create your project'],['Defina os canais que realmente usa e mantenha cada marca, cliente ou iniciativa em um workspace independente.','Choose the channels you actually use and keep each brand, client or initiative in its own workspace.'],['Organize sua biblioteca','Organize your library'],['Importe ou adicione mídias, pesquise arquivos, acompanhe status e mantenha o histórico de publicação por destino.','Import or add media, search files, track statuses, and keep publishing history by destination.'],['Programe do seu jeito','Schedule your way'],['Monte sua fila, escolha o melhor momento e visualize tudo no calendário antes de publicar.','Build your queue, choose the best time, and preview everything on the calendar before publishing.'],
['POR QUE PUBLISH HUB','WHY PUBLISH HUB'],['Mais controle que um agendador genérico.','More control than a generic scheduler.'],['Em vez de obrigar todos os projetos a seguirem o mesmo modelo, o Publish Hub foi pensado para adaptar o fluxo de publicação ao seu conteúdo e aos canais que você realmente usa.','Instead of forcing every project into the same model, Publish Hub adapts the publishing workflow to your content and the channels you actually use.'],['Projetos isolados','Isolated projects'],['Cada workspace tem sua própria biblioteca, canais, fila, calendário, integrações e contas sociais.','Each workspace has its own library, channels, queue, calendar, integrations, and social accounts.'],['Publicação por destino','Publishing by destination'],['Um mesmo arquivo pode ter estados diferentes para vídeo, short, reel, feed ou outros formatos.','The same file can have different states for video, short, reel, feed, or other formats.'],['Fluxo personalizado','Personalized workflow'],['Ative apenas os canais necessários para cada projeto e evite telas e opções que não fazem sentido para você.','Enable only the channels each project needs and avoid screens and options that do not matter to you.'],['Integrações sob medida','Tailored integrations'],['Conecte fontes de conteúdo e ferramentas externas ao projeto certo, sem misturar seus fluxos de trabalho.','Connect content sources and external tools to the right project without mixing workflows.'],['Seu conteúdo. Seu calendário. Suas regras.','Your content. Your calendar. Your rules.'],['Centralize a preparação e a publicação sem perder a liberdade de trabalhar do seu jeito.','Centralize preparation and publishing without losing the freedom to work your way.'],['Entrar no Publish Hub ↑','Sign in to Publish Hub ↑'],['Sua ferramenta de publicação personalizada.','Your personalized publishing tool.'],
['Project workspaces','Workspaces de projetos'],['Your Projects','Seus Projetos'],['Choose a project to start working.','Escolha um projeto para começar.'],['Open workspace →','Abrir workspace →'],['Create New Project','Criar Novo Projeto'],['Create an isolated publishing workspace and select publishing channels.','Crie um workspace de publicação isolado e selecione os canais de publicação.'],['No projects are mapped to this Google account yet.','Ainda não há projetos associados a esta conta Google.'],['Sign out','Sair'],['NEW WORKSPACE','NOVO WORKSPACE'],['Project Name','Nome do Projeto'],['Description','Descrição'],['Publishing Channels','Canais de Publicação'],['Cancel','Cancelar'],['Create Project','Criar Projeto'],
['Project workspace','Workspace do projeto'],['PROJECT','PROJETO'],['CONTENT','CONTEÚDO'],['Overview','Visão Geral'],['Library','Biblioteca'],['Publishing Queue','Fila de Publicação'],['Create New Video','Criar Novo Vídeo'],['Publishing Calendar','Calendário de Publicação'],['CONNECTIONS','CONEXÕES'],['Social Accounts','Contas Sociais'],['Integrations','Integrações'],['Settings','Configurações'],['Back to Projects','Voltar aos Projetos'],['ACTIVE PROJECT','PROJETO ATIVO'],['New media','Nova mídia'],['PROJECT WORKSPACE','WORKSPACE DO PROJETO'],['Media','Mídias'],['Scheduled','Agendados'],['Connected accounts','Contas conectadas'],['Next publication','Próxima publicação'],['None','Nenhuma'],['Open Library','Abrir Biblioteca'],['Manage project media','Gerenciar mídias do projeto'],['Pull videos from WebSeer','Importar vídeos do WebSeer'],['Import generated media','Importar mídias geradas'],['Upload or import media','Enviar ou importar mídia'],
['Project Library','Biblioteca do Projeto'],['visible items','itens visíveis'],['Search filename or title…','Buscar nome do arquivo ou título…'],['All','Todos'],['Ready to Publish','Pronto para Publicar'],['Published','Publicado'],['Archive','Arquivo'],['Preview','Prévia'],['File Name','Nome do Arquivo'],['Type','Tipo'],['Size','Tamanho'],['Imported','Importado'],['Duration','Duração'],['Publishing','Publicação'],['Not published','Não publicado'],['No media in this folder or search.','Nenhuma mídia nesta pasta ou busca.'],['Only publications from this project.','Apenas publicações deste projeto.'],['No scheduled publications for this project.','Nenhuma publicação agendada para este projeto.'],['Choose how media enters this project.','Escolha como a mídia entra neste projeto.'],['Upload existing media','Enviar mídia existente'],['Create a project-scoped media record.','Criar um registro de mídia exclusivo deste projeto.'],['Import media','Importar mídia'],['Prepare an import from another source.','Preparar uma importação de outra fonte.'],['Create / Import from WebSeer','Criar / Importar do WebSeer'],['Use the WebSeer integration.','Usar a integração com o WebSeer.'],['Project-scoped week view.','Visão semanal exclusiva deste projeto.'],
['Connections belong only to this project.','As conexões pertencem somente a este projeto.'],['Connect the YouTube channel for this project.','Conecte o canal do YouTube deste projeto.'],['Connect YouTube','Conectar YouTube'],['Reconnect','Reconectar'],['Project-scoped architecture ready. Meta publishing API is not implemented.','Arquitetura por projeto pronta. A API de publicação da Meta ainda não está implementada.'],['Not connected','Não conectado'],['Integration coming soon.','Integração em breve.'],['Coming soon','Em breve'],['External content-generation systems connected to this project.','Sistemas externos de geração de conteúdo conectados a este projeto.'],['No external integrations configured.','Nenhuma integração externa configurada.'],['General','Geral'],['Publishing Channels','Canais de Publicação'],['No integrations configured.','Nenhuma integração configurada.'],['Project Management','Gerenciamento do Projeto'],['Archive Project','Arquivar Projeto'],['Delete Project','Excluir Projeto'],['Destructive actions remain disabled in local-storage mode.','Ações destrutivas permanecem desativadas no modo de armazenamento local.'],['MEDIA','MÍDIA'],['Title','Título'],['Caption','Legenda'],['Publishing destinations','Destinos de publicação'],['Close','Fechar'],['Save changes','Salvar alterações'],['Schedule next slot','Agendar próximo horário'],['Google Sign-In is not configured yet.','O login Google ainda não está configurado.'],['Loading Publish Hub…','Carregando Publish Hub…']
];

const ptToEn=new Map(pairs);
const enToPt=new Map(pairs.map(([pt,en])=>[en,pt]));

function translateExact(text:string,language:Language){
  const trimmed=text.trim();
  if(!trimmed)return text;
  const map=language==='pt-BR'?enToPt:ptToEn;
  const translated=map.get(trimmed);
  if(translated){const leading=text.match(/^\s*/)?.[0]??'';const trailing=text.match(/\s*$/)?.[0]??'';return leading+translated+trailing}
  let result=text;
  const replacements=language==='pt-BR'?[...enToPt.entries()]:[...ptToEn.entries()];
  for(const [from,to] of replacements){if(result.includes(from))result=result.split(from).join(to)}
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
    const originals=new WeakMap<Node,string>();
    const attrOriginals=new WeakMap<Element,Map<string,string>>();
    const translateNode=(node:Node)=>{
      if(node.nodeType===Node.TEXT_NODE){
        const text=node.nodeValue??'';
        if(!originals.has(node))originals.set(node,text);
        const base=originals.get(node)??text;
        const next=translateExact(base,language);
        if(node.nodeValue!==next)node.nodeValue=next;
      }
      if(node.nodeType===Node.ELEMENT_NODE){
        const el=node as Element;
        for(const attr of ['placeholder','title','aria-label']){
          const current=el.getAttribute(attr);if(current==null)continue;
          let map=attrOriginals.get(el);if(!map){map=new Map();attrOriginals.set(el,map)}
          if(!map.has(attr))map.set(attr,current);
          const base=map.get(attr)??current;const next=translateExact(base,language);if(current!==next)el.setAttribute(attr,next);
        }
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
