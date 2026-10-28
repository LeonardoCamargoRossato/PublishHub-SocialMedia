import {initialWorkspace} from './data';
import type {WorkspaceState} from './types';

const KEY='publishhub.v0.2.workspace';

export function loadWorkspace():WorkspaceState{
 try{
  const raw=localStorage.getItem(KEY);
  if(raw){const parsed=JSON.parse(raw) as WorkspaceState;if(parsed?.version==='0.2')return parsed;}
 }catch{/* fall through to seed */}
 const seeded=structuredClone(initialWorkspace);
 try{localStorage.setItem(KEY,JSON.stringify(seeded));}catch{/* storage may be unavailable */}
 return seeded;
}

export function saveWorkspace(state:WorkspaceState){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{/* storage may be unavailable */}}
export function getProjectsForEmail(state:WorkspaceState,email:string){const normalized=email.trim().toLowerCase();return state.projects.filter(p=>!p.archived&&p.ownerEmail===normalized);}
