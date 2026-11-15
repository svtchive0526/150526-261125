
(function(){
const main=document.querySelector('#app .main');if(!main)return;
const bar=document.createElement('div');bar.id='sh-browserbar';bar.innerHTML='<div class="sh-address" id="sh-address">mail.svter.com/mailinventory</div><div class="sh-tablabel" id="sh-tab-a">SVTER 메일함</div><div class="sh-tablabel" id="sh-tab-b">열려있는 탭 주소</div><div class="sh-chrome-spacer"></div><button class="sh-circle" id="sh-plus" title="새 탭 열기">+</button><button class="sh-count" id="sh-count" title="현재 열려있는 탭">1</button><button class="sh-menu" id="sh-menu" title="메뉴">•••</button>';
main.prepend(bar);
// On phones, the browser chrome must live above the embedded church iframe,
// outside the scrolling game content's stacking context.
const mobileChrome=window.matchMedia('(max-width:750px)');
function placeChrome(){if(mobileChrome.matches){if(bar.parentNode!==document.body)document.body.append(bar)}else{if(bar.parentNode!==main)main.prepend(bar)}}
placeChrome();
mobileChrome.addEventListener?.('change',placeChrome);
const view=document.createElement('div');view.id='sh-browserview';view.innerHTML='<div class="sh-view-inner"><div class="sh-view-head"><h2 id="sh-view-title">새 탭 열기</h2><button class="sh-return" id="sh-view-return">탭 닫기</button></div><div class="sh-grid" id="sh-grid"></div></div>';main.append(view);
const church=document.createElement('div');church.id='sh-church-layer';church.innerHTML='<iframe id="sh-church-frame" src="church/" title="카밀레교 홈페이지"></iframe>';main.append(church);
const documentLayer=document.createElement('div');documentLayer.id='sh-document-layer';documentLayer.innerHTML='<img src="shindo_application.png" alt="카밀레교 신도 신청서">';main.append(documentLayer);
const toast=document.createElement('div');toast.id='sh-toast';toast.textContent='아직 이용할 수 없습니다.';document.body.append(toast);
const loading=document.createElement('div');loading.id='sh-browser-loading';loading.setAttribute('aria-label','페이지 로딩 중');document.body.append(loading);
let loadingTimer=0;
function showLoading(ms=540){loading.classList.add('active');clearTimeout(loadingTimer);loadingTimer=setTimeout(()=>loading.classList.remove('active'),ms);}
const STORAGE_KEY='shindo_browser_tabs_v21';
const initialTab={id:1,type:'mail',label:'SVTER 메일함',address:'mail.svter.com/mailinventory'};
let saved=null;try{saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null')}catch(e){}
let tabs=Array.isArray(saved?.tabs)?saved.tabs.filter(t=>t&&['mail','church','document'].includes(t.type)&&Number.isInteger(t.id)):[initialTab];
let active=tabs.some(t=>t.id===saved?.active)?saved.active:(tabs[0]?.id??null);
let seq=Math.max(1,...tabs.map(t=>t.id)),mode='',previous=active;
function persist(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify({tabs,active}))}catch(e){}}
function scrollTopNow(){if('scrollRestoration' in history)history.scrollRestoration='manual';window.scrollTo({top:0,left:0,behavior:'instant'});document.documentElement.scrollTop=0;document.body.scrollTop=0;for(const el of [main,view,documentLayer,church])if(el)el.scrollTop=0;}

const byId=id=>document.getElementById(id);
const titleOf=t=>t.type==='mail'?'SVTER 메일함':t.type==='church'?'카밀레교':t.type==='document'?'첨부파일: 카밀레 새 가족':'새 탭 열기';
const urlOf=t=>t.type==='mail'?mailAddress():t.type==='church'?churchAddress():t.type==='document'?'mail.svter.com/download:카밀레 새 가족':'새 탭 열기';
function mailAddress(){const panel=byId('mail-panel');if(!panel||!panel.classList.contains('active'))return 'mail.svter.com/mailinventory';if(panel.querySelector('.send-confirm'))return 'mail.svter.com/send';if(panel.querySelector('.compose-area'))return panel.querySelector('#compose-to')?.readOnly?'mail.svter.com/myself-send':'mail.svter.com/send-edit';const detail=panel.querySelector('[data-detail-kind]');if(detail)return 'mail.svter.com/'+(detail.dataset.detailKind==='sent'?'outbox':'inbox')+String(Number(detail.dataset.detailIndex)+1).padStart(2,'0');return 'mail.svter.com/mailinventory'}
function churchAddress(){try{const doc=byId('sh-church-frame').contentDocument;const hash=byId('sh-church-frame').contentWindow.location.hash;const p=decodeURIComponent(hash.replace(/^#/,''));const m={'카밀레교의 소명':'info01','카밀레교의 역사':'info02','자주 묻는 질문':'info02','카밀레교의 교리':'info03','신도 등록':'newfam01','신도 새 모임':'newfam02','카밀레교 지도':'newfam03','예배 시간':'cele01','기도회 안내':'cele02','고해성사 안내':'cele03','교회 수련회':'training01','새 신도 환영회':'training02','교리대학':'training03'};return 'www.KamilleChurch.net/'+(m[p]||'home')}catch(e){return 'www.KamilleChurch.net/home'}}
function sync(){const t=tabs.find(t=>t.id===active)||tabs[0]||{type:'new'};byId('sh-address').textContent=mode==='new'?'새 탭 열기':mode==='tabs'?'현재 열려있는 탭':t.type==='new'?'새 탭 열기':urlOf(t);byId('sh-count').textContent=tabs.filter(t=>t.type!=='new').length;byId('sh-tab-a').textContent=titleOf(t);byId('sh-tab-b').textContent=mode==='new'?'새 탭 열기':mode==='tabs'?'현재 열려있는 탭':t.type==='new'?'새 탭 열기':urlOf(t);church.classList.toggle('active',!mode&&t.type==='church');documentLayer.classList.toggle('active',!mode&&t.type==='document');view.classList.toggle('active',!!mode);if(t.type==='mail'&&!mode){document.querySelector('#login-page')?.removeAttribute('inert');} }
function select(id){showLoading();active=id;mode=tabs.length?'':'new';persist();if(!tabs.length){openNew();return}sync();scrollTopNow()}
function create(type){const label=type==='mail'?'SVTER 메일함':type==='church'?'카밀레교':'첨부파일: 카밀레 새 가족';const tab={id:++seq,type,label};tabs.push(tab);select(tab.id)}
function tile(t,forNew){const btn=document.createElement('div');btn.className='sh-tile';btn.setAttribute('role','button');btn.tabIndex=0;const name=titleOf(t);btn.innerHTML='<div class="sh-tile-title"></div><div class="sh-tile-content"></div>';btn.querySelector('.sh-tile-title').textContent=name;const content=btn.querySelector('.sh-tile-content');if(!forNew&&t.type==='document'){const img=document.createElement('img');img.src='shindo_application.png';img.className='sh-thumb';content.append(img)}else if(!forNew&&t.type==='mail'){content.innerHTML='<div class="sh-mini-mail"><b>메일보관함</b><div class="bar"></div><div class="line"></div><div class="line"></div><div class="bar"></div><div class="line"></div><div class="line"></div></div>'}else if(!forNew&&t.type==='church'){content.innerHTML='<div class="sh-mini-mail"><b>카밀레교</b><div class="line"></div><div class="line"></div><div class="bar"></div><div class="line"></div></div>'}else content.textContent='사용할 수 있습니다.';btn.addEventListener('click',()=>forNew?create(t.type):select(t.id));btn.addEventListener('keydown',e=>{if(e.target===btn&&(e.key==='Enter'||e.key===' ')){e.preventDefault();forNew?create(t.type):select(t.id)}});
const matching=forNew?tabs.find(x=>x.type===t.type):t;
if(matching){
 const close=document.createElement('button');close.className='sh-tile-close';close.type='button';close.setAttribute('aria-label',titleOf(t)+' 탭 닫기');
 close.innerHTML='<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 5L15 15M15 5L5 15" stroke="white" stroke-width="3" stroke-linecap="round"/></svg>';
 close.addEventListener('click',e=>{e.stopPropagation();closeTab(matching.id);});
 btn.append(close);
}
return btn}
function closeTab(id){
 const index=tabs.findIndex(t=>t.id===id);if(index<0)return;
 tabs.splice(index,1);
 if(active===id)active=tabs[Math.max(0,index-1)]?.id??null;
 if(previous===id)previous=active;
 persist();showLoading(350);
 if(mode==='new')openNew();
 else if(mode==='tabs')openTabs();
 else if(tabs.length)select(active);
 else openNew();
}
function openNew(){showLoading(430);previous=active;mode='new';scrollTopNow();byId('sh-view-title').textContent='새 탭 열기';byId('sh-view-return').textContent='탭 닫기';const grid=byId('sh-grid');grid.replaceChildren();[{type:'mail'},{type:'church'},{type:'document'}].forEach(t=>grid.append(tile(t,true)));sync()}
function openTabs(){showLoading(430);previous=active;mode='tabs';scrollTopNow();byId('sh-view-title').textContent='현재 열려있는 탭 보기';byId('sh-view-return').textContent='돌아가기';const grid=byId('sh-grid');grid.replaceChildren();tabs.forEach(t=>grid.append(tile(t,false)));const add=document.createElement('button');add.className='sh-tile add-tile';add.innerHTML='<div class="sh-tile-content"><span class="sh-tile-add">+</span></div>';add.addEventListener('click',openNew);grid.append(add);sync()}
byId('sh-plus').addEventListener('click',openNew);byId('sh-count').addEventListener('click',openTabs);byId('sh-view-return').addEventListener('click',()=>{if(tabs.length)select(tabs.some(t=>t.id===previous)?previous:tabs[0].id);else openNew()});byId('sh-menu').addEventListener('click',()=>{toast.style.display='block';clearTimeout(window.__shToastTimer);window.__shToastTimer=setTimeout(()=>toast.style.display='none',2200)});
// The mail attachment and church links navigate inside the fictional browser, not away from the game.
document.addEventListener('click',e=>{const attachment=e.target.closest('.pending-attachment');if(attachment){showLoading(680);e.preventDefault();e.stopImmediatePropagation();create('document');return}const link=e.target.closest('a.church-site-link');if(link){showLoading(680);e.preventDefault();e.stopImmediatePropagation();create('church');return}},true);
// Keep the visible address in sync with the existing mail panel and church navigation.
const observer=new MutationObserver(()=>{if(!mode)requestAnimationFrame(sync)});observer.observe(byId('mail-panel'),{childList:true,subtree:true});
byId('sh-church-frame').addEventListener('load',()=>{sync();try{byId('sh-church-frame').contentWindow.addEventListener('hashchange',sync);byId('sh-church-frame').contentDocument.addEventListener('click',()=>setTimeout(sync,50))}catch(e){}});
// A browser tab remains open while another tab is selected; the underlying mail DOM stays mounted.
// Persist the browser session across refresh/lock; reset the viewport on each page transition.
if('scrollRestoration' in history)history.scrollRestoration='manual';
window.addEventListener('pageshow',()=>{scrollTopNow();sync()});
window.addEventListener('load',()=>scrollTopNow());
const resetOnNavigation=e=>{if(e.target.closest('#sh-browserbar,#sh-browserview'))return;const hit=e.target.closest('button,a,.folder,.mail-row,.tab-item');if(hit){showLoading(360);setTimeout(()=>{if(!mode)scrollTopNow()},70)}};
document.addEventListener('click',resetOnNavigation);
const panel=byId('mail-panel');if(panel){const navObserver=new MutationObserver(()=>{if(!mode)scrollTopNow()});navObserver.observe(panel,{attributes:true,attributeFilter:['class','style']});}
persist();if(!tabs.length)openNew();else sync();scrollTopNow();window.SHINDO_browser={openNew,openTabs,openAttachment:()=>create('document'),openChurch:()=>create('church')};
})();
