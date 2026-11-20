/* SHINDO v109 — dated play log and compact inventory spacing. */
(()=>{
 'use strict';
 const panel=document.getElementById('shindo-phone-panel');
 const drawer=document.getElementById('shindo-phone-drawer');
 if(!panel||!drawer)return;
 const HISTORY='shindo_play_history_v107';
 const AFFINITY='shindo_affinity_v107';
 const AFFINITY_EVENTS='shindo_affinity_events_v111';
 const EVIDENCE='shindo_evidence_items_v105';
 const MET='shindo_met_characters_v108';
 const HISTORY_DAY='shindo_current_story_day_v109';
 const PEOPLE=[
  ['승철','seungcheol-body1-default.png'],['지훈','jihoon-body1-default.png'],
  ['원우','wonwoo-body2-default.png'],['순영','soonyoung-body1-default.png'],
  ['명호','minghao-body1-default.png'],['한솔','hansol-body1-default.png'],
  ['석민','seokmin-body1-default.png'],['찬','chan-body1-default.png'],
  ['정한',null],['조슈아',null],['준휘',null],['민규',null],['승관',null],['교주',null]
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
 // Story runtime supplies the day; old records are migrated only where their labels are unambiguous.
 window.SHINDO_addPlayRecord=(type,label,day)=>{
  if(!type||!label)return;
  const records=load(HISTORY,[]);if(!Array.isArray(records))return;
  const resolvedDay=Number(day)||Number(localStorage.getItem(HISTORY_DAY))||null;
  const id=(resolvedDay||'unknown')+'|'+type+'|'+label;
  if(records.some(r=>r.id===id||(r.type===type&&r.label===label&&(!r.day||r.day===resolvedDay))))return;
  records.push({id,type,label,day:resolvedDay,date:new Date().toISOString()});
  save(HISTORY,records.slice(-400));
  document.dispatchEvent(new Event('shindo-inventory-change'));
 };
 // Confirmed affiliation and location rosters. Values are NOT inferred from character introductions.
 const GROUPS={
  '신도':['승철','민규','지훈','찬'],
  '사제':['조슈아','원우','명호','준휘','한솔'],
  '경찰':['정한','승관','석민','순영']
 };
 const ROOMS={
  '기도관':['한솔','승철','석민','찬'],
  '예술당':['순영','명호']
 };
 const PERSON_EVENTS={
  '기도관 활동: 단상 위 청소':'한솔',
  '기도관 활동: 자는 사람 깨우기':'승철',
  '기도관 활동: 성경 한 장 넘기기':'석민',
  '기도관 활동: 청소 돕기':'찬',
  '예술당 활동: 호랑이 그림 보기':'순영',
  '예술당 활동: 캔버스 옮기기':'명호'
 };
 // All participants start at zero except Joshua. Do not wipe existing scores on upgrades.
 function getAffinity(){const result=load(AFFINITY,{});if(!result||typeof result!=='object'||Array.isArray(result))return {};
  if(!Object.prototype.hasOwnProperty.call(result,'조슈아') || Number(result['조슈아'])===0)result['조슈아']=100;
  return result;
 }
 function updateAffinity(person,score){const values=getAffinity();values[person]=Math.max(0,Math.min(100,Math.round(Number(score)||0)));save(AFFINITY,values)}
 window.SHINDO_setAffinity=(person,score)=>{if(!PEOPLE.some(p=>p[0]===person))return;updateAffinity(person,score);document.dispatchEvent(new Event('shindo-inventory-change'))};
 // Each authored event may be granted only once per day, even after a reload or revisit.
 // All negative values are clamped at zero; positive values at 100.
 function grantAffinity(kind,label,day=2){
  const d=Math.max(1,Math.floor(Number(day)||2));
  let changes=null, eventId=null;
  if(kind==='prayer'){
   if(label!=='참석'&&label!=='불참')return false;
   eventId=d+'|새벽기도';
   const sign=label==='참석'?1:-1;
   changes=[...GROUPS['신도'].map(name=>[name,5*sign]),...GROUPS['사제'].map(name=>[name,5*sign]),...GROUPS['경찰'].map(name=>[name,-5*sign])];
  }else if(kind==='room'){
   if(!ROOMS[label])return false;
   eventId=d+'|장소|'+label;
   changes=ROOMS[label].map(name=>[name,5]);
  }else if(kind==='person'){
   const person=PERSON_EVENTS[label];if(!person)return false;
   eventId=d+'|개별|'+label;
   changes=[[person,15]];
  }else return false;
  const ledger=load(AFFINITY_EVENTS,[]);if(!Array.isArray(ledger))return false;
  if(ledger.includes(eventId))return false;
  const values=getAffinity();
  for(const [name,delta] of changes)values[name]=Math.max(0,Math.min(100,Math.round((Number(values[name])||0)+delta)));
  // Preserve the completed-event marker as part of the same synchronous operation.
  save(AFFINITY,values);ledger.push(eventId);save(AFFINITY_EVENTS,ledger);
  document.dispatchEvent(new Event('shindo-inventory-change'));
  return true;
 }
 window.SHINDO_applyAffinityEvent=grantAffinity;
 // Repair existing V107-V110 saves using only recorded, actually selected actions.
 // Inferred progress positions are NOT sufficient evidence for an affinity grant.
 function restoreAffinityFromHistory(){
  const records=load(HISTORY,[]);const seen=new Set();
  if(Array.isArray(records))for(const r of records){if(typeof r?.label==='string')seen.add(r.label)}
  const legacy=(key,mapper)=>{const v=localStorage.getItem(key);if(v!==null){const val=mapper(v);if(val)seen.add(val)}};
  legacy('shindo_day2_prayer',v=>({'1':'새벽기도: 새벽기도에 참석한다','2':'새벽기도: 새벽기도에 참석하지 않는다'})[v]);
  legacy('shindo_day2_morning',v=>'오전 활동 장소: '+v);
  legacy('shindo_prayer_branch_v99',v=>({'1':'기도관 활동: 단상 위 청소','2':'기도관 활동: 자는 사람 깨우기','3':'기도관 활동: 성경 한 장 넘기기','4':'기도관 활동: 청소 돕기'})[v]);
  legacy('shindo_art_branch_v105',v=>({'1':'예술당 활동: 호랑이 그림 보기','2':'예술당 활동: 캔버스 옮기기','3':'예술당 활동: 예술당 조사하기'})[v]);
  for(const label of seen){
   if(label.includes('새벽기도')){
    if(/불참|않는다/.test(label))grantAffinity('prayer','불참',2);
    else if(/참석/.test(label))grantAffinity('prayer','참석',2);
   }
   if(label.startsWith('오전 활동 장소: '))grantAffinity('room',label.slice('오전 활동 장소: '.length),2);
   if(PERSON_EVENTS[label]){
    const room=label.startsWith('기도관')?'기도관':'예술당';
    // Room visit is implied by an authored individual selection.
    grantAffinity('room',room,2);
    grantAffinity('person',label,2);
   }
  }
 }
 restoreAffinityFromHistory();
 // V113: Older saves may contain a completed room event without every
 // participant's corresponding +5 in the saved aggregate. Recalculate the
 // minimum earned affinity from the chronological, once-only event ledger.
 // Never reset a score or add the same entrance bonus a second time.
 function reconcileRoomBonuses(){
  const ledger=load(AFFINITY_EVENTS,[]);
  if(!Array.isArray(ledger)||!ledger.some(id=>typeof id==='string'&&id.includes('|장소|')))return;
  const expected={'조슈아':100};
  let hasRoom=false;
  for(const id of ledger){
   if(typeof id!=='string')continue;
   const parts=id.split('|');
   if(parts.length<2)continue;
   let changes=[];
   if(parts[1]==='새벽기도'){
    // The original event ledger records the prayer choice only through the
    // saved player history. Its absence should not invent a choice.
    const records=load(HISTORY,[]);
    const prayerRecord=Array.isArray(records)?records.find(r=>Number(r.day||2)===Number(parts[0])&&typeof r.label==='string'&&r.label.includes('새벽기도')):null;
    let selected=prayerRecord?.label||'';
    if(!selected){const v=localStorage.getItem('shindo_day2_prayer');selected=v==='1'?'참석':v==='2'?'불참':''}
    if(!selected)continue;
    const sign=/불참|않는다/.test(selected)?-1:1;
    changes=[...GROUPS['신도'].map(n=>[n,5*sign]),...GROUPS['사제'].map(n=>[n,5*sign]),...GROUPS['경찰'].map(n=>[n,-5*sign])];
   }else if(parts[1]==='장소'&&ROOMS[parts.slice(2).join('|')]){
    hasRoom=true;
    changes=ROOMS[parts.slice(2).join('|')].map(n=>[n,5]);
   }else if(parts[1]==='개별'){
    const person=PERSON_EVENTS[parts.slice(2).join('|')];
    if(person)changes=[[person,15]];
   }
   for(const [name,delta] of changes){
    expected[name]=Math.max(0,Math.min(100,(expected[name]||0)+delta));
   }
  }
  if(!hasRoom)return;
  const actual=getAffinity();let changed=false;
  for(const [name,value] of Object.entries(expected)){
   if(value>(Number(actual[name])||0)){
    actual[name]=value;changed=true;
   }
  }
  if(changed){save(AFFINITY,actual);document.dispatchEvent(new Event('shindo-inventory-change'))}
 }
 reconcileRoomBonuses();
 const style=document.createElement('style');
 style.textContent=`
 #shindo-phone-panel{color:#eee;overflow:hidden;font-family:Pretendard,system-ui,sans-serif;box-sizing:border-box}
 #shindo-phone-panel *{box-sizing:border-box}
 #shindo-phone-panel .inv-shell{height:100%;display:flex;flex-direction:column;padding:clamp(12px,2vw,24px);gap:14px}
 #shindo-phone-panel .inv-title{font-size:clamp(18px,2vw,26px);font-weight:750}
 #shindo-phone-panel .inv-tabs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
 #shindo-phone-panel button{font:inherit;cursor:pointer;color:#eee}
 #shindo-phone-panel .inv-tab{font-size:13px;padding:10px 6px;border-radius:6px;border:1px solid #777;background:#393939}
 #shindo-phone-panel .inv-tab[aria-selected=true]{background:#eee;color:#161616}
 #shindo-phone-panel .inv-content{min-height:0;flex:1;overflow-y:auto;overscroll-behavior:contain;padding:9px 3px 14px;margin-top:7px}
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
 @media(max-width:750px){#shindo-phone-panel .inv-shell{gap:10px;padding:12px}#shindo-phone-panel .inv-content{margin-top:7px;padding-top:8px}#shindo-phone-panel .inv-tabs{grid-template-columns:repeat(4,minmax(0,1fr));gap:4px}#shindo-phone-panel .inv-tab{font-size:11px;padding:9px 2px}#shindo-phone-panel .inv-avatar{width:48px;height:60px}}
 `;
 document.head.appendChild(style);
 panel.innerHTML='<div class="inv-shell"><div><div class="inv-title">기록 보관함</div></div><div class="inv-tabs" role="tablist"><button class="inv-tab" data-tab="evidence" role="tab">증거품</button><button class="inv-tab" data-tab="people" role="tab">인물 관계</button><button class="inv-tab" data-tab="history" role="tab">플레이 기록</button><button class="inv-tab" data-tab="feedback" role="tab">피드백</button></div><div class="inv-content" id="shindo-inv-content" role="tabpanel"></div></div>';
 const content=panel.querySelector('.inv-content');let active='evidence';
 function make(tag,klass,txt){const el=document.createElement(tag);if(klass)el.className=klass;if(txt!==undefined)el.textContent=txt;return el}
 function empty(message){content.appendChild(make('p','inv-muted',message))}
 function evidence(){const items=load(EVIDENCE,[]);if(!Array.isArray(items)||!items.length){empty('아직 획득한 증거품이 없습니다.');return}
  items.forEach(id=>{const info=evidenceInfo[id]||{name:id,description:'획득한 증거품'};const card=make('div','inv-card');card.append(make('div','inv-item-name',info.name),make('div','inv-muted',info.description));content.append(card)})
 }
 function people(){const values=getAffinity();PEOPLE.forEach(([name,portrait])=>{
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
 function history(){
  const saved=load(HISTORY,[]);const records=Array.isArray(saved)?saved.slice():[];
  // Reconstruct only known saved selections. Do not fabricate missing clicks or timestamps.
  const past=[
   ['shindo_day2_prayer',['','새벽기도 참석','새벽기도 불참'],'새벽기도 선택',2],
   ['shindo_confession_branch',['','긍정적 발언','사제 포섭 시도'],'고해실 선택',1],
   ['shindo_day2_morning',null,'오전 활동 장소',2],
   ['shindo_prayer_branch_v99',['','단상 위 청소','자는 사람 깨우기','성경 한 장 넘기기','청소 돕기'],'기도관 활동',2],
   ['shindo_art_branch_v105',['','호랑이 그림 보기','캔버스 옮기기','예술당 조사하기'],'예술당 활동',2]
  ];
  const seen=new Set(records.map(x=>x.label));
  past.forEach(([key,options,title,day])=>{const value=localStorage.getItem(key);if(!value)return;
   const label=title+': '+(options?(options[Number(value)]||value):value);
   if(!seen.has(label)){records.unshift({label,type:'이전 저장 상태',day,date:null});seen.add(label)}
  });
  const progress=localStorage.getItem('shindo_story_progress_v37');
  if(progress!==null){const label=progress==='complete'?'현재 스토리 완료':'스토리 진행 위치 저장됨';
   const day=Number(localStorage.getItem(HISTORY_DAY))||null;
   records.unshift({label,type:'진행 상태',day,date:null})}
  if(!records.length){empty('아직 기록된 플레이 이력이 없습니다. 앞으로 선택하는 활동과 획득한 증거품이 이곳에 저장됩니다.');return}
  function knownDay(r){if(Number(r.day)>0)return Number(r.day);
   if(/새벽기도|오전 활동|기도관 활동|예술당 활동/.test(r.label||''))return 2;
   if(/고해실 선택/.test(r.label||''))return 1;
   return null;
  }
  records.slice().reverse().forEach(r=>{
   const card=make('div','inv-card inv-history');
   const day=knownDay(r);
   const title=(day?day+'일차 ':'일차 미확인 · ')+(r.label||'기록');
   card.append(make('strong','',title),make('span','inv-muted',r.type||'플레이 기록'));
   if(r.date){let date=r.date;try{date=new Date(r.date).toLocaleString('ko-KR')}catch(_){}card.append(make('span','inv-time',date))}
   content.append(card)
  });
 }
 function feedback(){empty('기존 베타테스트 피드백 페이지로 이동합니다. 진행 중인 게임 기록은 유지됩니다.');const btn=make('button','inv-feedback','피드백 페이지 열기');btn.type='button';btn.addEventListener('click',()=>{if(typeof window.SHINDO_openFeedback!=='function'){empty('현재 피드백 페이지를 열 수 없습니다.');return}drawer.classList.remove('is-open');document.getElementById('shindo-phone-toggle')?.setAttribute('aria-expanded','false');window.SHINDO_openFeedback()});content.append(btn)}
 function render(){panel.querySelectorAll('.inv-tab').forEach(b=>{b.setAttribute('aria-selected',String(b.dataset.tab===active))});content.replaceChildren();({evidence,people,history,feedback})[active]()}
 panel.querySelectorAll('.inv-tab').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();active=b.dataset.tab;render()}));
 document.addEventListener('shindo-inventory-change',render);
 document.getElementById('shindo-phone-toggle')?.addEventListener('click',()=>{render()});
 window.addEventListener('storage',render);render();
})();
