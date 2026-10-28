import {useState} from 'react';
import {useLanguage,type Language} from './i18n';

const options:{value:Language;flag:string;label:string}[]=[
  {value:'pt-BR',flag:'🇧🇷',label:'PT-BR'},
  {value:'en-US',flag:'🇺🇸',label:'EN-US'}
];

export default function LanguageSwitcher(){
  const {language,setLanguage}=useLanguage();
  const [open,setOpen]=useState(false);
  const active=options.find(option=>option.value===language)!;
  return <div className="language-switcher">
    <button className="language-trigger" onClick={()=>setOpen(value=>!value)} aria-label={language==='pt-BR'?'Alterar idioma':'Change language'} aria-expanded={open}>
      <span className="language-globe">🌐</span><span className="language-flag">{active.flag}</span><b>{active.label}</b><span className="language-chevron">▾</span>
    </button>
    {open&&<div className="language-menu">
      {options.map(option=><button key={option.value} className={language===option.value?'active':''} onClick={()=>{setLanguage(option.value);setOpen(false)}}>
        <span>{option.flag}</span><div><b>{option.label}</b><small>{option.value==='pt-BR'?'Português (Brasil)':'English (United States)'}</small></div>{language===option.value&&<strong>✓</strong>}
      </button>)}
    </div>}
  </div>
}
