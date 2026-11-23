
(function(){
const main=document.querySelector('#app .main');if(!main)return;
const bar=document.createElement('div');bar.id='sh-browserbar';bar.innerHTML=`<div class="sh-tab-strip"><div class="sh-tab-shell" aria-label="현재 탭"><span class="sh-tab-favicon" aria-hidden="true">✉</span><span class="sh-tablabel" id="sh-tab-a">SVTER 메일함</span><button type="button" class="sh-tab-close" id="sh-tab-close" title="현재 탭 닫기" aria-label="현재 탭 닫기">×</button></div><button type="button" class="sh-circle" id="sh-plus" title="새 탭 열기" aria-label="새 탭 열기">+</button></div><div class="sh-toolbar"><span class="sh-browser-nav" aria-hidden="true">‹</span><span class="sh-browser-nav sh-browser-nav-disabled" aria-hidden="true">›</span><span class="sh-browser-nav sh-browser-reload" aria-hidden="true">↻</span><div class="sh-address" id="sh-address">mail.svter.com/mailinventory</div><span class="sh-tablabel" id="sh-tab-b" hidden>열려있는 탭 주소</span><div class="sh-chrome-spacer"></div><button type="button" class="sh-count" id="sh-count" title="현재 열려있는 탭" aria-label="현재 열려있는 탭">1</button><button type="button" class="sh-menu" id="sh-menu" title="메뉴" aria-label="메뉴">⋮</button></div>`;
main.prepend(bar);
// V250: A visible, temporary desktop tab for the browser's own utility pages.
// This is a presentation tab, not a stored mail/church/document tab.
const originalTab=bar.querySelector('.sh-tab-shell');
const utilityTab=document.createElement('div');
utilityTab.id='sh-utility-tab';
utilityTab.className='sh-tab-shell sh-utility-tab';
utilityTab.setAttribute('role','tab');
utilityTab.setAttribute('aria-selected','true');
utilityTab.innerHTML='<span class="sh-tab-favicon sh-utility-favicon" aria-hidden="true">▤</span><span class="sh-utility-label" id="sh-utility-label">새 탭 열기</span><button type="button" class="sh-tab-close" id="sh-utility-close" title="화면 닫기" aria-label="현재 탭 관리 화면 닫기">×</button>';
originalTab.after(utilityTab);
// On phones, the browser chrome must live above the embedded church iframe,
// outside the scrolling game content's stacking context.
const mobileChrome=window.matchMedia('(max-width:750px)');
function placeChrome(){if(mobileChrome.matches){if(bar.parentNode!==document.body)document.body.append(bar)}else{if(bar.parentNode!==main)main.prepend(bar)}}
placeChrome();
mobileChrome.addEventListener?.('change',placeChrome);
const view=document.createElement('div');view.id='sh-browserview';view.innerHTML='<div class="sh-view-inner"><div class="sh-view-head"><div class="sh-view-titles"><h2 id="sh-view-title">새 탭 열기</h2><p id="sh-view-description" class="sh-view-description"></p></div><button type="button" class="sh-return" id="sh-view-return">← 돌아가기</button></div><div class="sh-view-section" id="sh-view-section"></div><div class="sh-list" id="sh-list"></div><div class="sh-list-add-wrap" id="sh-list-add-wrap"></div></div>';main.append(view);
const church=document.createElement('div');church.id='sh-church-layer';church.innerHTML='<iframe id="sh-church-frame" src="church/" title="카밀레교 홈페이지"></iframe>';main.append(church);
const documentLayer=document.createElement('div');documentLayer.id='sh-document-layer';documentLayer.innerHTML='<img src="shindo_application.png" alt="카밀레교 신도 신청서">';main.append(documentLayer);
const toast=document.createElement('div');toast.id='sh-toast';toast.textContent='아직 이용할 수 없습니다.';document.body.append(toast);
// V245: No artificial loading overlay for mail clicks, church navigation or tab changes.
// V246: Soft, original mouse-click sound for the pre-story fictional browser only.
// This intentionally excludes the lock screen, opening animation, and the visual novel.
const browserClickAudio=Array.from({length:4},()=>{
 const audio=new Audio('browser-click.wav');audio.preload='auto';audio.volume=0.78;return audio;
});
let browserClickAudioIndex=0;
function browserClickEnabled(){
 if(!document.body.classList.contains('sh-browser-unlocked'))return false;
 if(document.querySelector('#shindo-vn.active'))return false;
 try{if(localStorage.getItem('shindo_story_started_v37')==='1')return false}catch(e){}
 return true;
}
function playBrowserClick(e){
 if(e&&!e.isTrusted)return;
 if(!browserClickEnabled())return;
 const audio=browserClickAudio[browserClickAudioIndex++%browserClickAudio.length];
 try{audio.pause();audio.currentTime=0;const playback=audio.play();if(playback?.catch)playback.catch(()=>{});}catch(e){}
}
// Capture clicks on both buttons and empty browser surfaces, including mobile taps.
document.addEventListener('click',playBrowserClick,true);
function attachChurchClickSound(){
 try{
  const frame=document.getElementById('sh-church-frame');
  const doc=frame?.contentDocument;
  if(!doc||doc.__shBrowserClickBound)return;
  doc.__shBrowserClickBound=true;
  doc.addEventListener('click',e=>{if(church.classList.contains('active'))playBrowserClick(e)},true);
 }catch(e){/* Cross-origin frames cannot be instrumented; local church/ is same-origin. */}
}
const STORAGE_KEY='shindo_browser_tabs_v21';
// The church shortcut is unlocked only by the link in the welcome mail.
const CHURCH_UNLOCK_KEY='shindo_church_link_unlocked_v30';
const DOCUMENT_UNLOCK_KEY='shindo_attachment_unlocked_v31';
const documentUnlocked=()=>localStorage.getItem(DOCUMENT_UNLOCK_KEY)==='1';
const churchUnlocked=()=>localStorage.getItem(CHURCH_UNLOCK_KEY)==='1';
function lockedNotice(){toast.textContent='해금되지 않았습니다';toast.style.display='block';clearTimeout(window.__shToastTimer);window.__shToastTimer=setTimeout(()=>toast.style.display='none',2200)}
const initialTab={id:1,type:'mail',label:'SVTER 메일함',address:'mail.svter.com/mailinventory'};
let saved=null;try{saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null')}catch(e){}
let tabs=Array.isArray(saved?.tabs)?saved.tabs.filter(t=>t&&['mail','church','document'].includes(t.type)&&Number.isInteger(t.id)&& (t.type!=='church'||churchUnlocked())&&(t.type!=='document'||documentUnlocked())):[initialTab];
let active=tabs.some(t=>t.id===saved?.active)?saved.active:(tabs[0]?.id??null);
let seq=Math.max(1,...tabs.map(t=>t.id)),mode='',previous=active;
function persist(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify({tabs,active}))}catch(e){}}
function scrollTopNow(){if('scrollRestoration' in history)history.scrollRestoration='manual';window.scrollTo({top:0,left:0,behavior:'instant'});document.documentElement.scrollTop=0;document.body.scrollTop=0;for(const el of [main,view,documentLayer,church])if(el)el.scrollTop=0;}

const byId=id=>document.getElementById(id);
const titleOf=t=>t.type==='mail'?'SVTER 메일함':t.type==='church'?'카밀레교':t.type==='document'?'첨부파일: 카밀레 새 가족':'새 탭 열기';
const urlOf=t=>t.type==='mail'?mailAddress():t.type==='church'?churchAddress():t.type==='document'?'mail.svter.com/download:카밀레 새 가족':'새 탭 열기';
function mailAddress(){const panel=byId('mail-panel');if(!panel||!panel.classList.contains('active'))return 'mail.svter.com/mailinventory';if(panel.querySelector('.send-confirm'))return 'mail.svter.com/send';if(panel.querySelector('.compose-area'))return panel.querySelector('#compose-to')?.readOnly?'mail.svter.com/myself-send':'mail.svter.com/send-edit';const detail=panel.querySelector('[data-detail-kind]');if(detail)return 'mail.svter.com/'+(detail.dataset.detailKind==='sent'?'outbox':'inbox')+String(Number(detail.dataset.detailIndex)+1).padStart(2,'0');return 'mail.svter.com/mailinventory'}
function churchAddress(){try{const doc=byId('sh-church-frame').contentDocument;const hash=byId('sh-church-frame').contentWindow.location.hash;const p=decodeURIComponent(hash.replace(/^#/,''));const m={'카밀레교의 소명':'info01','카밀레교의 역사':'info02','자주 묻는 질문':'info02','카밀레교의 교리':'info03','신도 등록':'newfam01','신도 새 모임':'newfam02','카밀레교 지도':'newfam03','예배 시간':'cele01','기도회 안내':'cele02','고해성사 안내':'cele03','교회 수련회':'training01','새 신도 환영회':'training02','교리대학':'training03'};return 'www.KamilleChurch.net/'+(m[p]||'home')}catch(e){return 'www.KamilleChurch.net/home'}}
function sync(){
 const real=tabs.find(t=>t.id===active)||tabs[0]||null;
 const t=real||{type:'new'};
 const utilityActive=mode==='new'||mode==='tabs';
 byId('sh-address').textContent=mode==='new'?'새 탭 열기':mode==='tabs'?'현재 열려있는 탭':t.type==='new'?'새 탭 열기':urlOf(t);
 byId('sh-count').textContent=tabs.filter(t=>t.type!=='new').length;
 // The first desktop tab keeps showing the previous real page; the second
 // tab is the active new-tabs / open-tabs view, without changing tab storage.
 byId('sh-tab-a').textContent=real?titleOf(real):'SVTER 메일함';
 bar.classList.toggle('sh-utility-open',utilityActive);
 bar.classList.toggle('sh-no-real-tab',!real);
 utilityTab.setAttribute('aria-selected',utilityActive?'true':'false');
 originalTab.setAttribute('role','tab');
 originalTab.setAttribute('aria-selected',utilityActive?'false':'true');
 byId('sh-utility-label').textContent=mode==='tabs'?'현재 열려 있는 탭':'새 탭 열기';
 utilityTab.querySelector('.sh-utility-favicon').textContent=mode==='tabs'?'▤':'＋';
 byId('sh-tab-b').textContent=mode==='new'?'새 탭 열기':mode==='tabs'?'현재 열려있는 탭':t.type==='new'?'새 탭 열기':urlOf(t);
 church.classList.toggle('active',!mode&&t.type==='church');
 documentLayer.classList.toggle('active',!mode&&t.type==='document');
 view.classList.toggle('active',!!mode);
 if(t.type==='mail'&&!mode){document.querySelector('#login-page')?.removeAttribute('inert');}
}
function select(id){const selected=tabs.find(t=>t.id===id);if(selected?.type==='document'&&!documentUnlocked()){lockedNotice();return}if(selected?.type==='church'&&!churchUnlocked()){lockedNotice();return}active=id;mode=tabs.length?'':'new';persist();if(!tabs.length){openNew();return}sync();scrollTopNow()}
function create(type){if((type==='church'&&!churchUnlocked())||(type==='document'&&!documentUnlocked())){lockedNotice();return}const label=type==='mail'?'SVTER 메일함':type==='church'?'카밀레교':'첨부파일: 카밀레 새 가족';const tab={id:++seq,type,label};tabs.push(tab);select(tab.id)}
// V249: White, monochrome C-style portal lists for both tab views.
const shTabIcons={
 mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="m4.5 7 7.5 6 7.5-6"/></svg>',
 church:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v4m-2-2h4M6 21V10l6-4 6 4v11M3 21h18M10 21v-6h4v6"/></svg>',
 document:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M9 12h6m-6 4h6"/></svg>'
};
function tile(t,forNew){
 const row=document.createElement('div');row.className='sh-listrow';
 const current=!forNew&&t.id===active;
 if(current)row.classList.add('sh-listrow-current');
 const primary=document.createElement('button');primary.type='button';primary.className='sh-list-primary';
 primary.setAttribute('aria-label',titleOf(t)+(forNew?' 새 탭에서 열기':' 탭으로 이동'));
 const icon=document.createElement('span');icon.className='sh-list-icon';icon.innerHTML=shTabIcons[t.type]||shTabIcons.mail;
 const copy=document.createElement('span');copy.className='sh-list-copy';
 const title=document.createElement('span');title.className='sh-list-title';title.textContent=titleOf(t);
 if(current){const status=document.createElement('span');status.className='sh-list-current-label';status.textContent='현재 탭';title.append(status)}
 const address=document.createElement('span');address.className='sh-list-address';
 address.textContent=forNew?({mail:'mail.svter.com',church:'www.KamilleChurch.net',document:'mail.svter.com/download'}[t.type]||''):urlOf(t);
 copy.append(title,address);
 const arrow=document.createElement('span');arrow.className='sh-list-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent=forNew?'↗':'›';
 primary.append(icon,copy,arrow);
 primary.addEventListener('click',()=>forNew?create(t.type):select(t.id));
 row.append(primary);
 const matching=forNew?tabs.find(x=>x.type===t.type):t;
 if(matching){
  const close=document.createElement('button');close.className='sh-list-remove';close.type='button';close.textContent='×';
  close.setAttribute('aria-label',titleOf(t)+' 탭 닫기');close.title='탭 닫기';
  close.addEventListener('click',e=>{e.stopPropagation();closeTab(matching.id)});
  row.append(close);
 }
 return row;
}
function shAddNewTabRow(){
 const wrap=byId('sh-list-add-wrap');wrap.replaceChildren();
 const section=document.createElement('div');section.className='sh-view-section sh-list-extra-section';section.textContent='더하기';
 const button=document.createElement('button');button.className='sh-list-add';button.type='button';
 button.innerHTML='<span class="sh-list-add-icon" aria-hidden="true">＋</span><span>새 탭 열기</span><span class="sh-list-add-arrow" aria-hidden="true">›</span>';
 button.addEventListener('click',openNew);wrap.append(section,button);
}
function closeTab(id){
 const index=tabs.findIndex(t=>t.id===id);if(index<0)return;
 tabs.splice(index,1);
 if(active===id)active=tabs[Math.max(0,index-1)]?.id??null;
 if(previous===id)previous=active;
 persist();
 if(mode==='new')openNew();
 else if(mode==='tabs')openTabs();
 else if(tabs.length)select(active);
 else openNew();
}
function openNew(){previous=active;mode='new';scrollTopNow();byId('sh-view-title').textContent='새 탭 열기';byId('sh-view-description').textContent='접속할 페이지를 선택해 주세요.';byId('sh-view-return').textContent='← 돌아가기';byId('sh-view-section').textContent='페이지 선택';const list=byId('sh-list');list.replaceChildren();[{type:'mail'},{type:'church'},{type:'document'}].forEach(t=>list.append(tile(t,true)));byId('sh-list-add-wrap').replaceChildren();sync()}
function openTabs(){previous=active;mode='tabs';scrollTopNow();byId('sh-view-title').textContent='현재 열려 있는 탭';byId('sh-view-description').textContent='열려 있는 페이지를 선택하거나 탭을 닫을 수 있어요.';byId('sh-view-return').textContent='← 돌아가기';byId('sh-view-section').textContent='열려 있는 페이지 · '+tabs.length+'개';const list=byId('sh-list');list.replaceChildren();tabs.forEach(t=>list.append(tile(t,false)));shAddNewTabRow();sync()}
// Closing the temporary utility tab or clicking the underlying real tab returns
// to the original page. The underlying tab's X still closes that real tab.
function returnToRealTab(){if(tabs.length)select(tabs.some(t=>t.id===previous)?previous:(tabs.some(t=>t.id===active)?active:tabs[0].id));else openNew();}
byId('sh-utility-close').addEventListener('click',e=>{e.stopPropagation();returnToRealTab()});
originalTab.addEventListener('click',e=>{if(mode&&!e.target.closest('button'))returnToRealTab()});
originalTab.tabIndex=0;
originalTab.addEventListener('keydown',e=>{if(mode&&(e.key==='Enter'||e.key===' ')){e.preventDefault();returnToRealTab()}});
byId('sh-tab-close').addEventListener('click',()=>{if(active!=null)closeTab(active)});byId('sh-plus').addEventListener('click',openNew);byId('sh-count').addEventListener('click',openTabs);byId('sh-view-return').addEventListener('click',returnToRealTab);byId('sh-menu').addEventListener('click',()=>{toast.style.display='block';clearTimeout(window.__shToastTimer);window.__shToastTimer=setTimeout(()=>toast.style.display='none',2200)});
// The mail attachment and church links navigate inside the fictional browser, not away from the game.
document.addEventListener('click',e=>{const attachment=e.target.closest('.pending-attachment');if(attachment){e.preventDefault();e.stopImmediatePropagation();localStorage.setItem(DOCUMENT_UNLOCK_KEY,'1');create('document');return}const link=e.target.closest('a.church-site-link');if(link){e.preventDefault();e.stopImmediatePropagation();localStorage.setItem(CHURCH_UNLOCK_KEY,'1');create('church');return}},true);
// Keep the visible address in sync with the existing mail panel and church navigation.
const observer=new MutationObserver(()=>{if(!mode)requestAnimationFrame(sync)});observer.observe(byId('mail-panel'),{childList:true,subtree:true});
byId('sh-church-frame').addEventListener('load',()=>{attachChurchClickSound();sync();try{byId('sh-church-frame').contentWindow.addEventListener('hashchange',sync);byId('sh-church-frame').contentDocument.addEventListener('click',()=>setTimeout(sync,50))}catch(e){}});
attachChurchClickSound();
// A browser tab remains open while another tab is selected; the underlying mail DOM stays mounted.
// Persist the browser session across refresh/lock; reset the viewport on each page transition.
if('scrollRestoration' in history)history.scrollRestoration='manual';
window.addEventListener('pageshow',()=>{scrollTopNow();sync()});
window.addEventListener('load',()=>scrollTopNow());
const resetOnNavigation=e=>{if(e.target.closest('#sh-browserbar,#sh-browserview'))return;const hit=e.target.closest('button,a,.folder,.mail-row,.tab-item');if(hit){setTimeout(()=>{if(!mode)scrollTopNow()},70)}};
document.addEventListener('click',resetOnNavigation);
const panel=byId('mail-panel');if(panel){const navObserver=new MutationObserver(()=>{if(!mode)scrollTopNow()});navObserver.observe(panel,{attributes:true,attributeFilter:['class','style']});}
persist();if(!tabs.length)openNew();else sync();scrollTopNow();window.SHINDO_browser={openNew,openTabs,openAttachment:()=>create('document'),openChurch:()=>create('church'),selectMail:()=>{const mail=tabs.find(t=>t.type==='mail');if(mail)select(mail.id);else create('mail')}};
})();
