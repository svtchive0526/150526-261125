/* Shared persistent story entry across mail/browser/church. */
(()=>{
'use strict';
const GATE='shindo_sleep_gate_v48', START='shindo_story_started_v37', PROGRESS='shindo_story_progress_v37';
const onChurch=location.pathname.replace(/\/$/,'').endsWith('/church');
const root=onChurch?'../':'./';
const read=k=>{try{return localStorage.getItem(k)}catch(e){return null}};
const write=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const started=()=>read(START)==='1';
const done=()=>read(PROGRESS)==='complete';
const style=document.createElement('style');style.textContent=`
#shindo-sleep-button{position:fixed;bottom:max(18px,env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);z-index:20000;padding:14px 30px;border:1px solid #888;border-radius:13px;background:#17191d;color:white;font:700 17px Pretendard,system-ui,sans-serif;box-shadow:0 5px 22px #0004;cursor:pointer;white-space:nowrap}
#shindo-sleep-button[hidden]{display:none!important}
#shindo-vn.active~#shindo-sleep-button{display:none!important}
`;document.head.appendChild(style);
const btn=document.createElement('button');btn.id='shindo-sleep-button';btn.type='button';btn.textContent='잠드시겠습니까?';btn.hidden=true;document.body.appendChild(btn);
const locked=()=>{const lock=document.getElementById('svter-lock');return !!lock&&lock.getAttribute('aria-hidden')!=='true'&&(lock.classList.contains('lock-visible')||getComputedStyle(lock).visibility==='visible');};
function refresh(){const story=document.getElementById('shindo-vn');btn.hidden=read(GATE)!=='1'||started()||done()||locked()||!!(story&&story.classList.contains('active'));}
window.SHINDO_unlockSleepButton=()=>{if(!started()&&!done()){write(GATE,'1');refresh();}};
btn.addEventListener('click',()=>{write(START,'1');write(GATE,'0');write(PROGRESS,'0');refresh();if(onChurch){location.href=root+'?shindo_story_resume=1';return;}window.SHINDO_startStory?.();});
// A started game always resumes at the saved story index, not at the lock/login screen.
if(started()&&!done()&&!onChurch){
 const resume=()=>{const lock=document.getElementById('svter-lock');if(lock){lock.style.setProperty('display','none','important');lock.setAttribute('aria-hidden','true');}['fiction-disclaimer','loading','title-interlude'].forEach(id=>{const e=document.getElementById(id);if(e)e.style.setProperty('display','none','important')});const app=document.getElementById('app');if(app)app.classList.add('ready');window.SHINDO_startStory?.();};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',resume,{once:true});else resume();
}
if(started()&&!done()&&onChurch){location.replace(root+'?shindo_story_resume=1');return;}
refresh();setInterval(refresh,450);
})();
