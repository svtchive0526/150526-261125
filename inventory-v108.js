/* SHINDO v108 — preallocated locked character slots; reveal at encounter. */
(()=>{
 'use strict';
 const panel=document.getElementById('shindo-phone-panel');
 const drawer=document.getElementById('shindo-phone-drawer');
 if(!panel||!drawer)return;
 const HISTORY='shindo_play_history_v107';
 const AFFINITY='shindo_affinity_v107';
 const EVIDENCE='shindo_evidence_items_v105';
 const MET='shindo_met_characters_v108';
 const PEOPLE=[
  ['승철','seungcheol-body1-default.png'],['지훈','jihoon-body1-default.png'],
  ['원우','wonwoo-body2-default.png'],['순영','soonyoung-body1-default.png'],
  ['명호','minghao-body1-default.png'],['한솔','hansol-body1-default.png'],
  ['석민','seokmin-body1-default.png'],['찬','chan-body1-default.png'],
  ['정한',null],['조슈아',null],['준',null],['민규',null],['승관',null],['교주',null]
 ];
 const LEGACY_KNOWN={
  '한솔':'shindo_hansol_known_v99','석민':'shindo_seokmin_known_v99','찬':'shindo_chan_known_v99',
  '순영':'shindo_soonyoung_known_v105','명호':'shindo_minghao_known_v105'
 };
 function isMet(name){
  if(load(MET,[]).includes(name))return true;
  if(LEGACY_KNOWN[name]&&localStorage.getItem(LEGACY_KNOWN[name])==='1')return true;
  // The initial encounter and name introductions are in the linear prologue.
  // Do not infer encounters in branching chapters from the global scene index.
  const index=Number(localStorage.getItem('shindo_story_progress_v37'));
  if(Number.isFinite(index)){
   if(name==='승철'&&index>=81)return true;
   if(name==='지훈'&&index>=99)return true;
  }
  return false;
 }
 window.SHINDO_markCharacterMet=(name)=>{
  if(!PEOPLE.some(p=>p[0]===name))return;
  const seen=load(MET,[]);if(!Array.isArray(seen)||seen.includes(name))return;
  seen.push(name);save(MET,seen);
  document.dispatchEvent(new Event('shindo-inventory-change'));
 };
 const evidenceInfo={
  'destroyed-document-3':{name:'파기된 문서3',description:'누군가의 일기. 심하게 훼손되어 읽을 수 있는 페이지가 거의 없다.'}
 };
 function load(k,fallback){try{const v=JSON.parse(localStorage.getItem(k));return v===null?fallback:v}catch(_){return fallback}}
 function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(_){}}
 window.SHINDO_addPlayRecord=(type,label)=>{
  if(!type||!label)return;
  const records=load(HISTORY,[]);if(!Array.isArray(records))return;
  const id=type+'|'+label;
  if(records.some(r=>r.id===id))return;
  records.push({id,type,label,date:new Date().toISOString()});
  save(HISTORY,records.slice(-400));
  document.dispatchEvent(new Event('shindo-inventory-change'));
 };
 // No affinity rules have been supplied; values remain at 0 until explicitly set by authored story rules.
 window.SHINDO_setAffinity=(person,score)=>{
  if(!PEOPLE.some(p=>p[0]===person))return;
  const next=load(AFFINITY,{});
  next[person]=Math.max(0,Math.min(100,Math.round(Number(score)||0)));
  save(AFFINITY,next);document.dispatchEvent(new Event('shindo-inventory-change'));
 };
 const style=document.createElement('style');
 style.textContent=`
 #shindo-phone-panel{color:#eee;overflow:hidden;font-family:Pretendard,system-ui,sans-serif;box-sizing:border-box}
 #shindo-phone-panel *{box-sizing:border-box}
 #shindo-phone-panel .inv-shell{height:100%;display:flex;flex-direction:column;padding:clamp(12px,2vw,24px);gap:14px}
 #shindo-phone-panel .inv-kicker{font-size:10px;letter-spacing:.13em;color:#aaa}
 #shindo-phone-panel .inv-title{font-size:clamp(18px,2vw,26px);font-weight:750}
 #shindo-phone-panel .inv-tabs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
 #shindo-phone-panel button{font:inherit;cursor:pointer;color:#eee}
 #shindo-phone-panel .inv-tab{font-size:13px;padding:10px 6px;border-radius:6px;border:1px solid #777;background:#393939}
 #shindo-phone-panel .inv-tab[aria-selected=true]{background:#eee;color:#161616}
 #shindo-phone-panel .inv-content{min-height:0;flex:1;overflow-y:auto;overscroll-behavior:contain;padding:1px 3px 14px}
 #shindo-phone-panel .inv-muted{color:#bbb;font-size:12px;line-height:1.65}
 #shindo-phone-panel .inv-card{border:1px solid #575757;background:#252525;border-radius:8px;padding:12px;margin-bottom:9px}
 #shindo-phone-panel .inv-item-name{font-size:15px;font-weight:700;margin-bottom:5px}
 #shindo-phone-panel .inv-person{display:flex;gap:12px;align-items:center}
 #shindo-phone-panel .inv-avatar{width:66px;height:78px;flex:none;object-fit:cover;object-position:top;background:#3f3f3f;border-radius:5px}
 #shindo-phone-panel .inv-avatar-unknown{display:flex;align-items:center;justify-content:center;font-weight:700;font-size:21px;color:#aaa;border:1px solid #555}
 #shindo-phone-panel .inv-person-main{min-width:0;flex:1}
 #shindo-phone-panel .inv-person-top{display:flex;justify-content:space-between;gap:6px;font-size:14px;font-weight:700}
 #shindo-phone-panel .inv-person-score{font-variant-numeric:tabular-nums;white-space:nowrap}
 #shindo-phone-panel .inv-meter{height:7px;background:#595959;border-radius:5px;overflow:hidden;margin:11px 0 0}
 #shindo-phone-panel .inv-fill{height:100%;background:#b05555}
 #shindo-phone-panel .inv-history{display:flex;flex-direction:column;gap:5px;font-size:13px}
 #shindo-phone-panel .inv-time{font-size:11px;color:#999}
 #shindo-phone-panel .inv-feedback{width:100%;padding:14px 10px;border-radius:8px;background:#4b3434;border:1px solid #9e6767}
 @media(max-width:750px){#shindo-phone-panel .inv-shell{gap:9px;padding:12px}#shindo-phone-panel .inv-tabs{grid-template-columns:repeat(4,minmax(0,1fr));gap:4px}#shindo-phone-panel .inv-tab{font-size:11px;padding:9px 2px}#shindo-phone-panel .inv-avatar{width:48px;height:60px}}
 `;
 document.head.appendChild(style);
 panel.innerHTML='<div class="inv-shell"><div><div class="inv-kicker">KAMILLE · PERSONAL ARCHIVE</div><div class="inv-title">기록 보관함</div></div><div class="inv-tabs" role="tablist"><button class="inv-tab" data-tab="evidence" role="tab">증거품</button><button class="inv-tab" data-tab="people" role="tab">인물 관계</button><button class="inv-tab" data-tab="history" role="tab">플레이 기록</button><button class="inv-tab" data-tab="feedback" role="tab">피드백</button></div><div class="inv-content" id="shindo-inv-content" role="tabpanel"></div></div>';
 const content=panel.querySelector('.inv-content');let active='evidence';
 function make(tag,klass,txt){const el=document.createElement(tag);if(klass)el.className=klass;if(txt!==undefined)el.textContent=txt;return el}
 function empty(message){content.appendChild(make('p','inv-muted',message))}
 function evidence(){const items=load(EVIDENCE,[]);if(!Array.isArray(items)||!items.length){empty('아직 획득한 증거품이 없습니다.');return}
  items.forEach(id=>{const info=evidenceInfo[id]||{name:id,description:'획득한 증거품'};const card=make('div','inv-card');card.append(make('div','inv-item-name',info.name),make('div','inv-muted',info.description));content.append(card)})
 }
 function people(){const values=load(AFFINITY,{});PEOPLE.forEach(([name,portrait])=>{
  const known=isMet(name);
  const score=Math.max(0,Math.min(100,Number(values[name])||0));
  const card=make('div','inv-card inv-person');
  if(known&&portrait){const img=make('img','inv-avatar');img.src='story-portraits/'+portrait;img.alt=name+' 프로필';img.loading='lazy';img.onerror=()=>{img.replaceWith(make('div','inv-avatar inv-avatar-unknown','??'))};card.append(img)}
  else{card.append(make('div','inv-avatar inv-avatar-unknown',known?'??':'??'))}
  const main=make('div','inv-person-main'),top=make('div','inv-person-top');
  top.append(make('span','',known?name:'??'),make('span','inv-person-score',known?(score+' / 100'):'??'));
  const meter=make('div','inv-meter'),fill=make('div','inv-fill');fill.style.width=known?score+'%':'0%';
  meter.append(fill);main.append(top,meter);card.append(main);content.append(card)
 })}
 function history(){const saved=load(HISTORY,[]);const records=Array.isArray(saved)?saved.slice():[];
  // Only read persisted values from older builds. These are snapshots, not invented historic click logs.
  const past=[['shindo_day2_prayer',['','새벽기도 참석','새벽기도 불참'],'새벽기도 선택'],['shindo_confession_branch',['','긍정적 발언','사제 포섭 시도'],'고해실 선택'],['shindo_day2_morning',null,'오전 활동 장소'],['shindo_prayer_branch_v99',['','단상 위 청소','자는 사람 깨우기','성경 한 장 넘기기','청소 돕기'],'기도관 활동'],['shindo_art_branch_v105',['','호랑이 그림 보기','캔버스 옮기기','예술당 조사하기'],'예술당 활동']];
  const seen=new Set(records.map(x=>x.label));past.forEach(([key,options,title])=>{const value=localStorage.getItem(key);if(!value)return;const label=title+': '+(options?(options[Number(value)]||value):value);if(!seen.has(label))records.unshift({label,type:'이전 저장 상태',date:null})});
  const progress=localStorage.getItem('shindo_story_progress_v37');if(progress!==null){const label=progress==='complete'?'현재 스토리 완료':'스토리 진행 위치 저장됨';records.unshift({label,type:'진행 상태',date:null})}
  if(!records.length){empty('아직 기록된 플레이 이력이 없습니다. 앞으로 선택하는 활동과 획득한 증거품이 이곳에 저장됩니다.');return}
  records.slice().reverse().forEach(r=>{const card=make('div','inv-card inv-history');card.append(make('strong','',r.label),make('span','inv-muted',r.type));if(r.date){let date=r.date;try{date=new Date(r.date).toLocaleString('ko-KR')}catch(_){}card.append(make('span','inv-time',date))}content.append(card)})
 }
 function feedback(){empty('기존 베타테스트 피드백 페이지로 이동합니다. 진행 중인 게임 기록은 유지됩니다.');const btn=make('button','inv-feedback','피드백 페이지 열기');btn.type='button';btn.addEventListener('click',()=>{if(typeof window.SHINDO_openFeedback!=='function'){empty('현재 피드백 페이지를 열 수 없습니다.');return}drawer.classList.remove('is-open');document.getElementById('shindo-phone-toggle')?.setAttribute('aria-expanded','false');window.SHINDO_openFeedback()});content.append(btn)}
 function render(){panel.querySelectorAll('.inv-tab').forEach(b=>{b.setAttribute('aria-selected',String(b.dataset.tab===active))});content.replaceChildren();({evidence,people,history,feedback})[active]()}
 panel.querySelectorAll('.inv-tab').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();active=b.dataset.tab;render()}));
 document.addEventListener('shindo-inventory-change',render);
 document.getElementById('shindo-phone-toggle')?.addEventListener('click',()=>{render()});
 window.addEventListener('storage',render);render();
})();
