/* SHINDO v37 — VN story, after the new Kamille mail is read. */
(()=>{
const KEY='shindo_story_progress_v37';
const scenes=[
 {kind:'line',text:'아 뭔가 찝찝하지만 어떻게든 되겠지...'},
 {kind:'line',text:'내일 아침이면 정말 그 곳에 가는 건가.'},
 {kind:'line',text:'일단 자야겠다.'},
 {kind:'transition',text:'1일차 아침',sound:'birds'},
 {kind:'line',text:'…얼마나 잤지?',sound:'birds'},
 {kind:'line',text:'이제 진짜 나서야겠군.',sound:'door'},
 {kind:'line',text:'저 차인가보다.',sound:'walk'},
 {kind:'transition',text:'',sound:'drive'},
 {kind:'line',text:'봉고차가 천천히 속도를 줄인다.',sound:'stop'},
 {kind:'line',text:'엔진 소리가 낮아지고 덜컹거림이 멎는다. 몸이 앞으로 살짝 쏠렸다가 제자리로 돌아왔다.'},
 {kind:'line',text:'시동이 꺼졌다. 도착한 모양이다.'},
 {kind:'line',text:'…얼마나 잤지?'},
 {kind:'line',text:'하필 이런 데서 졸다니. 사이비교 본거지로 걸어 들어가면서, 태평하게 쿨쿨 잠이나 자는 기자가 어디 있단 말이냐.'},
 {kind:'line',text:'...여기 있다.',delay:2000},
 {kind:'line',text:'특종 쫓느라 며칠 밤낮으로 고생했더니 몸이 먼저 항복해버렸다.'},
 {kind:'line',text:'내 이름은 김봉봉. 어리버리한 새 신도인 척하고 있지만, 사실은 기자다.',follow:true},
 {kind:'line',text:'그것도 특종에 아주 목마른.'},
 {kind:'line',text:'요즘 기삿거리라고 해 봤자 멧돼지 출몰 소식이나 이상 기상현상 따위가 고작이다.'},
 {kind:'line',text:'그런 판에 <카밀레교>라는 취재 아이템이 굴러왔다. 이게 웬 떡이냐.'},
 {kind:'line',text:'그야말로 하늘이 내려준 선물이 아닐 수 없다.'},
 {kind:'line',text:'그래서 미친 척하고 이곳, <카밀레교>의 본거지까지 찾아오게 된 거다.'},
 {kind:'line',text:'와, 공기 죽여준다.',sound:'forest'},
 {kind:'line',text:'주변이 전부 산이다. 이런 데라면 쥐도 새도 모르게 사라지기 딱 좋겠지…',sound:'forest'}
];
const style=document.createElement('style');style.textContent=`
#shindo-vn{position:fixed;inset:0;z-index:30000;background:#050607;color:#fff;display:none;align-items:flex-end;justify-content:center;font-family:Pretendard,system-ui,sans-serif;cursor:pointer;touch-action:manipulation;user-select:none}
#shindo-vn.active{display:flex}
#shindo-vn.day{background:radial-gradient(ellipse at 50% 20%,#313a3b 0%,#111719 50%,#050607 100%);transition:background 2s}
#shindo-vn .vn-box{width:min(1000px,calc(100% - 36px));min-height:155px;margin:0 auto clamp(40px,10vh,110px);border:1px solid #777;background:rgba(15,16,18,.91);border-radius:8px;padding:30px 34px 27px;box-sizing:border-box;display:flex;align-items:center;position:relative;line-height:1.85;font-size:clamp(17px,2vw,23px);letter-spacing:-.04em}
#shindo-vn .vn-box:after{content:'▼';position:absolute;right:20px;bottom:10px;font-size:11px;color:#aaa;animation:vn-pulse 1.2s infinite}
#shindo-vn .vn-center{align-self:center;margin:auto;text-align:center;font-size:clamp(30px,6vw,62px);font-weight:700;letter-spacing:.04em}
#shindo-vn .vn-hint{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);color:#aaa;font-size:12px;white-space:nowrap}
@keyframes vn-pulse{50%{opacity:.25}}
@media(max-width:750px){#shindo-vn .vn-box{padding:24px 20px 30px;min-height:170px;margin-bottom:calc(35px + env(safe-area-inset-bottom))}}
`;document.head.appendChild(style);
const overlay=document.createElement('div');overlay.id='shindo-vn';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-label','1일차 스토리');overlay.innerHTML='<div class="vn-box"><span class="vn-text"></span></div><div class="vn-hint">화면을 터치하거나 클릭하여 진행</div>';document.body.appendChild(overlay);
const box=overlay.querySelector('.vn-box'),content=overlay.querySelector('.vn-text');
let index=0,locked=false, timer=null, audio=null,ambient=null;
function audioContext(){try{audio=audio||new(window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')audio.resume();return audio}catch(e){return null}}
function tone(freq,duration,vol=.05,type='sine',start=0){const a=audioContext();if(!a)return;const o=a.createOscillator(),g=a.createGain(),t=a.currentTime+start;o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+duration);o.connect(g).connect(a.destination);o.start(t);o.stop(t+duration+.03)}
function sound(name){if(!name)return;
 if(name==='birds'||name==='forest'){tone(900,.16,.016,'sine');tone(1250,.12,.013,'sine',.22);if(name==='forest'){tone(140,.09,.035,'triangle',.45);tone(120,.1,.03,'triangle',.83)}}
 if(name==='door'){tone(170,.35,.07,'sawtooth');tone(105,.18,.035,'triangle',.3)}
 if(name==='walk'){for(let n=0;n<4;n++)tone(95,.10,.045,'triangle',n*.43)}
 if(name==='drive'){for(let n=0;n<9;n++)tone(66+n%2*4,.35,.025,'sawtooth',n*.35)}
 if(name==='stop'){tone(95,.8,.065,'sawtooth');tone(68,.4,.05,'triangle',.5)}
}
function save(){try{localStorage.setItem(KEY,String(index))}catch(e){}}
function render(){clearTimeout(timer);const scene=scenes[index];if(!scene){finish();return}overlay.classList.toggle('day',index>=3);sound(scene.sound);
 if(scene.kind==='transition'){box.style.display='none';let center=overlay.querySelector('.vn-center');if(!center){center=document.createElement('div');center.className='vn-center';overlay.appendChild(center)}center.textContent=scene.text;center.style.display='block';overlay.querySelector('.vn-hint').style.display='none';locked=true;timer=setTimeout(()=>{locked=false;next()},scene.text?2300:3300);return}
 const center=overlay.querySelector('.vn-center');if(center)center.style.display='none';box.style.display='flex';overlay.querySelector('.vn-hint').style.display='block';content.textContent=scene.text;
 if(scene.follow){locked=true;timer=setTimeout(()=>{locked=false;next()},1600)}
 else if(index===12){locked=true;timer=setTimeout(()=>{locked=false;next()},2000)}
 else locked=false;
}
function next(){if(locked)return;index++;save();render()}
function finish(){overlay.classList.remove('active');overlay.classList.remove('day');try{localStorage.setItem(KEY,'complete')}catch(e){} }
overlay.addEventListener('click',()=>{audioContext();next()});document.addEventListener('keydown',e=>{if(!overlay.classList.contains('active'))return;if(e.key===' '||e.key==='Enter'){e.preventDefault();audioContext();next()}});
window.SHINDO_startStory=()=>{if(localStorage.getItem(KEY)==='complete')return;const n=Number(localStorage.getItem(KEY));index=Number.isInteger(n)&&n>=0&&n<scenes.length?n:0;overlay.classList.add('active');render()};
})();
