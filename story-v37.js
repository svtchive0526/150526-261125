/* SHINDO v37 — VN story, after the new Kamille mail is read. */
(()=>{
const KEY='shindo_story_progress_v37';
// v61: slide-out phone panel. Visible only after the story has begun.
const inventoryStyle=document.createElement('style');
inventoryStyle.textContent=`
#shindo-phone-drawer{--phone-w:min(38vw,650px);--phone-gap:23px;--phone-btn-w:31px;--phone-btn-gap:23px;position:fixed;inset:0 auto 0 0;width:calc(var(--phone-w) + var(--phone-gap) + var(--phone-btn-gap) + var(--phone-btn-w));height:100dvh;z-index:32000;pointer-events:none;display:none;transform:translateX(calc(-1 * (var(--phone-w) + var(--phone-btn-gap))));transition:transform .65s cubic-bezier(.22,1,.36,1);will-change:transform}
#shindo-phone-drawer.is-visible{display:block}
#shindo-phone-drawer.is-open{transform:translateX(0)}
#shindo-phone-panel{position:absolute;top:6.5%;bottom:6.5%;left:var(--phone-gap);width:var(--phone-w);border-radius:12px;background:#303030;pointer-events:auto}
#shindo-phone-toggle{position:absolute;left:calc(var(--phone-gap) + var(--phone-w) + var(--phone-btn-gap));top:50%;transform:translateY(-50%);width:var(--phone-btn-w);height:230px;max-height:32vh;border:0;border-radius:16px;background:#393939;color:white;display:flex;align-items:center;justify-content:center;padding:0;pointer-events:auto;cursor:pointer;-webkit-tap-highlight-color:transparent}
#shindo-phone-toggle svg{width:20px;height:26px;stroke:#fff;stroke-width:2.7;fill:none;stroke-linecap:round;stroke-linejoin:round;transition:transform .65s cubic-bezier(.22,1,.36,1)}
#shindo-phone-drawer.is-open #shindo-phone-toggle svg{transform:rotate(180deg)}
#shindo-phone-putaway{display:none}
#shindo-phone-toggle:focus-visible,#shindo-phone-putaway:focus-visible{outline:2px solid #fff;outline-offset:4px}
@media(max-width:750px){
 #shindo-phone-drawer{--phone-w:calc(100vw - 46px);--phone-gap:23px;--phone-btn-gap:0px;--phone-btn-w:16px;width:100vw;transform:translateX(calc(-1 * (var(--phone-w) + var(--phone-gap))))}
 #shindo-phone-drawer.is-open{transform:translateX(0)}
 #shindo-phone-panel{top:10%;bottom:28%;left:23px;width:calc(100vw - 46px);border-radius:12px}
 #shindo-phone-toggle{left:calc(var(--phone-w) + 2 * var(--phone-gap));top:50%;height:115px;max-height:16vh;border-radius:9px;transform:translateY(-50%)}
 #shindo-phone-toggle svg{width:10px;height:13px;stroke-width:3}
 #shindo-phone-drawer.is-open #shindo-phone-toggle{pointer-events:none;opacity:0}
 #shindo-phone-putaway{position:absolute;left:50%;top:calc(72% + 24px);transform:translateX(-50%);display:block;width:40%;max-width:280px;min-width:145px;height:52px;border:0;border-radius:12px;background:#303030;color:white;font:700 18px Pretendard,sans-serif;pointer-events:auto;cursor:pointer;opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}
 #shindo-phone-drawer.is-open #shindo-phone-putaway{opacity:1;visibility:visible}
}
@media(prefers-reduced-motion:reduce){#shindo-phone-drawer,#shindo-phone-toggle svg{transition-duration:.01ms}}
`;
document.head.appendChild(inventoryStyle);
const phoneDrawer=document.createElement('div');
phoneDrawer.id='shindo-phone-drawer';
phoneDrawer.setAttribute('aria-label','인벤토리 휴대폰');
phoneDrawer.innerHTML='<div id="shindo-phone-panel" aria-label="휴대폰 화면"></div><button type="button" id="shindo-phone-toggle" aria-label="휴대폰 꺼내기" aria-expanded="false"><svg viewBox="0 0 24 32" aria-hidden="true"><path d="M7 5l11 11L7 27"/></svg></button><button type="button" id="shindo-phone-putaway">집어넣기</button>';
document.body.appendChild(phoneDrawer);
const phoneToggle=phoneDrawer.querySelector('#shindo-phone-toggle');
function setPhoneOpen(open){
 phoneDrawer.classList.toggle('is-open',open);
 phoneToggle.setAttribute('aria-expanded',String(open));
 phoneToggle.setAttribute('aria-label',open?'휴대폰 집어넣기':'휴대폰 꺼내기');
}
function refreshInventoryVisibility(){
 const started=localStorage.getItem('shindo_story_started_v37')==='1';
 phoneDrawer.classList.toggle('is-visible',started);
 if(!started)setPhoneOpen(false);
}
phoneToggle.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();setPhoneOpen(!phoneDrawer.classList.contains('is-open'))});
phoneDrawer.querySelector('#shindo-phone-putaway').addEventListener('click',e=>{e.preventDefault();e.stopPropagation();setPhoneOpen(false)});
phoneDrawer.addEventListener('click',e=>e.stopPropagation());
window.addEventListener('storage',refreshInventoryVisibility);
refreshInventoryVisibility();

if(localStorage.getItem(KEY)==='complete'&&!localStorage.getItem('shindo_story_v55_extended')){
 try{localStorage.setItem(KEY,'66');localStorage.setItem('shindo_story_v55_extended','1')}catch(e){}
}

const scenes=[
 {kind:'line',text:'뭔가 찝찝하지만 어떻게든 되겠지...'},
 {kind:'line',text:'내일 아침이면 정말 그곳에 가는 건가.'},
 {kind:'line',text:'일단 자야겠다.'},
 {kind:'transition',text:'1일차 아침',sound:'birds'},
 {kind:'line',text:'…얼마나 잤지?',sound:'birds'},
 {kind:'line',text:'이제 진짜 나서야겠군.',sound:'door'},
 {kind:'line',text:'저 차인가 보다.',sound:'walk'},
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
 {kind:'line',text:'주변이 전부 산이다. 이런 데라면 쥐도 새도 모르게 사라지기 딱 좋겠지…',sound:'forest'},
 {kind:"dialogue",speaker:"승철",text:"좋은 계절입니다.",inner:false,portrait:"seungcheol-body1-default"},
 {kind:"dialogue",speaker:"주인공",text:"(나를 픽업해 온 사람이다. 눈썹이 짙고 몸이 다부지다.)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(중요하게는, 잘생겼다.)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"네… 풍경이 참 멋있네요.",inner:false},
 {kind:"dialogue",speaker:"승철",text:"그렇죠? 바깥 세상과는 다르게, 여기 있으면 마음이 온화해져요. 평화롭죠.",inner:false,portrait:"seungcheol-body1-smile"},
 {kind:"dialogue",speaker:"주인공",text:"(명심하자 김봉봉. 잘생겨도 사이비는 사이비다.)",inner:true},
 {kind:"dialogue",speaker:"승철",text:"소개가 늦었네요. 제 이름은 최승철입니다.",inner:false,portrait:"seungcheol-body2-default",reveal:true},
 {kind:"dialogue",speaker:"주인공",text:"김봉봉입니다. 앞으로 잘 부탁드리겠습니다!",inner:false},
 {kind:"dialogue",speaker:"승철",text:"새 신자는 늘 환영이죠.",inner:false,portrait:"seungcheol-body1-smile"},
 {kind:"dialogue",speaker:"승철",text:"이제 생활관 가시면서 수칙 몇 가지만 설명 드릴 건데…",inner:false,portrait:"seungcheol-body1-default"},
 {kind:"dialogue",speaker:"승철",text:"얘가 늦네. 왜 이렇게 안 오지?",inner:false,portrait:"seungcheol-body1-default"},
 {kind:"sfx",sound:"footsteps_fast"},
 {kind:"dialogue",speaker:"지훈",text:"아, 죄송합니다. 오다가 길을 잃는 바람에.",inner:false,portrait:"jihoon-body1-default"},
 {kind:"dialogue",speaker:"승철",text:"야 너는 평생 여기 살아놓고 아직도 길을 잃냐?",inner:false,portrait:"seungcheol-body1-flustered"},
 {kind:"dialogue",speaker:"주인공",text:"(투닥대는 두 사람은 제법 친해 보인다.)",inner:true},
 {kind:"sfx",sound:"footsteps",clearPortrait:true},
 {kind:"dialogue",speaker:"주인공",text:"(좁은 산길을 따라 10분쯤 걸었을까. 저 앞에 제법 번듯한 건축물들이 보이기 시작한다.)",inner:true,clearPortrait:true},
 {kind:"dialogue",speaker:"주인공",text:"(여전히. 사이비 마을이라곤 생각되지 않을 정도로 깔끔하고 평범하다.)",inner:true,clearPortrait:true},
 {kind:"dialogue",speaker:"지훈",text:"생활관으로 가시기 전에, 저희 교주님을 먼저 만나뵐 겁니다.",portrait:"jihoon-body1-default"},
 {kind:"dialogue",speaker:"주인공",text:"교주…님이요?"},
 {kind:"dialogue",speaker:"지훈",text:"가벼운 면담 후 입소가 절차라서요. 신청서는 챙겨오셨죠?",portrait:"jihoon-body1-default"},
 {kind:"dialogue",speaker:"주인공",text:"…….네, 챙겨왔죠"},
 {kind:"dialogue",speaker:"주인공",text:"(어두운 내 표정을 알아챈 걸까. 그가 황급히 말을 덧붙인다.)",inner:true},
 {kind:"dialogue",speaker:"지훈",text:"어려울 거 없고요, 가셔서 기본 목회 듣는 게 전부입니다. 그리 오래 걸리지도 않아요.",portrait:"jihoon-body1-default"},
 {kind:"dialogue",speaker:"지훈",text:"기본 생활 수칙은 미리 설명드리겠습니다. 제 담당이라서요. 아, 제 이름은 이지훈입니다.",portrait:"jihoon-body2-default",revealJihoon:true},
 {kind:"dialogue",speaker:"주인공",text:"(참 빨리도 알려준다.)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(지훈이 설명한 생활 수칙은 다음과 같았다.)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(아침 식사는 7-9시, 점심 식사는 11-1시, 저녁 식사는 6-8시. 이 외 시간에는 식사가 제공되지 않는다.)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"아, 받아적어야지... 저, 메모지 하나만 주시겠어요?"},
 {kind:"dialogue",speaker:"주인공",text:"(색이 왜이래?)",inner:true,illustration:"memo-01"},
 {kind:"dialogue",speaker:"주인공",text:"아, 잠시만요 (받아적기 시작한다.)",illustration:"memo-02",pencil:true},
 {kind:"dialogue",speaker:"주인공",text:"(소등은 밤 11시. 소등 후에는 야간 순찰 담당자 외에는 외출 금지.)",inner:true,illustration:"memo-03",pencil:true},
 {kind:"dialogue",speaker:"주인공",text:"(세탁 및 청소 일정과 당번은 매달 1일에 발표하며 주별로 변경된다.)",inner:true,illustration:"memo-04",pencil:true},
 {kind:"dialogue",speaker:"주인공",text:"(그 외에도 종교활동에 충실할 것, 불온자를 발견시 반드시 사제에게 전달할 것.)",inner:true,illustration:"memo-05",pencil:true},
 {kind:"narration",text:"그리고 마지막은 잠시 뜸을 들이더니, 아주 중요하다는 듯이 강조했다."},
 {kind:"dialogue",speaker:"지훈",text:"우리는 가족입니다. 서로를 배려합시다.",portrait:"jihoon-body1-smile"},
 {kind:"dialogue",speaker:"주인공",text:"(오케이, 이지훈. 규칙을 철저하게 수호하는 사람 같다.)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(이 단체를 지키는 데에, 더 나아가 카밀레교에 그만큼 진심인 거겠지.)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(…고요 속에 걷다 보니 어느덧 마을 입구 앞이다.)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(심장이 쿵쾅거린다. 해낼 수 있을까? 과연 내가 혈혈단신으로, 이단의 소굴에서…)",inner:true},
 {kind:"image",illustration:"mail-01",duration:6000},
 {kind:"dialogue",speaker:"주인공",text:"(아냐, 김봉봉. 해낸다. 해낼 수 있다. 해내야만 한다.)",inner:true,clearPortrait:true},
 {kind:"narration",text:"마음을 다잡고 승철과 지훈의 안내를 따랐다.",sound:"footsteps",clearPortrait:true},
 {kind:"dialogue",speaker:"주인공",text:"(정신을 차리고 보니 어느덧 본당 앞이었다.)",inner:true,clearPortrait:true},
 {kind:"dialogue",speaker:"주인공",text:"(승철과 지훈은 내게 행운을 빌었다. 아니, 교인들이 그러하듯 축복을 빌었다.)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(당신의 생활에 행복과 안식이 있기를... 이라.)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(듣기엔 참 좋은 말이다. 그 뒤로 어떤 내막이 숨어있을지는 모르지만 말이다.)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(자, 이제 카밀레교의 교주를 만나볼 차례다.)",inner:true},
 {kind:"narration",text:"숨을 크게 들이마시고, 본당 문을 열어젖혔다.",enterSanctuary:true},
 {kind:"dialogue",speaker:"주인공",text:"(본당은 제법 그럴싸한 교회의 모습을 하고 있네... 아닌가, 성당인가.)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(특이한 점이라면 사방에 캐모마일 꽃이 장식되어 있었다.)",inner:true},
 {kind:"event",eventFootsteps:true},
 {kind:"dialogue",speaker:"주인공",text:"(교주다.)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(짜 맞춘 것도 아니고 '사이비 교주'스럽게 생긴 노인이군...)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(회백색의 머리에 수북한 하얀 수염이라...)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(기껏 늘어놓는 '설교'가 정말 형편없군...)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(죄다 홈페이지 짜깁기잖아? '살아있는 복음'이니 '영적 성장'이니…)",inner:true},
 {kind:"narration",text:"흐름에 관한 이야기가 무의미하게 이어졌다. 하품을 참느라 고역이었다."},
 {kind:"dialogue",speaker:"주인공",text:"(이 노인이 정말 수백 수천의 신도를 이끄는 자라고?)",inner:true},
 {kind:"narration",text:"그때였다. 교주의 입에서 처음으로 구미가 당기는 말이 나온 게."},
 {kind:"dialogue",speaker:"교주",text:"…그러므로 우리는 '공양'을 통해 탁한 것을 덜어내고, 죄 사함을 받아 맑은 흐름으로 돌아갑니다.",boldWord:"공양"},
 {kind:"narration",text:"최대한 침착하게 '공양'의 선출 방식을 물어봤다. 돌아오는 대답은 모호하기 그지없었다."},
 {kind:"dialogue",speaker:"교주",text:"성실히 흐르는 이에게는 걱정할 일이 없습니다."},
 {kind:"dialogue",speaker:"교주",text:"다만 흐름에서 탈락하는 불온한 자는 고해를 통해 드러나니, 마음속에 감추는 것이 없도록 하십시오.",bellOnce:true},
 {kind:"dialogue",speaker:"주인공",text:"(그래, 뭐. 들어온 지 반나절도 안 된 신입에게 '인신 공양'을 털어놓을 리 없겠지.)",inner:true,boldWord:"인신 공양"},
 {kind:"dialogue",speaker:"주인공",text:"(그런 건 내가 알아내야만 한다.)",inner:true},
 {kind:"narration",text:"그 뒤로는 면접 아닌 면접이 이어졌다. 준비해간 이야기를 늘어놓았다."},
 {kind:"narration",text:"21세기 대한민국에서 밥 벌어먹고 살기 여간 힘들고 팍팍한 게 아니라서..."},
 {kind:"narration",text:"종교로 귀의하고 싶었다는 이야기… 다행히도 믿는 눈치였다."},
 {kind:"dialogue",speaker:"교주",text:"처음 입교한 신도는 무조건 고해성사를 해야 합니다."},
 {kind:"dialogue",speaker:"교주",text:"밖에서 쌓은 수많은 죄를 토해내 사하기 위해서죠."},
 {kind:"dialogue",speaker:"교주",text:"원우 사제님은 이 중요한 업무를 맡은 고해성사 담당 사제입니다.",maskWonwoo:true},
 {kind:"dialogue",speaker:"교주",text:"죄를 토해내고 꾸짖음이 필요하시다면 사제님을 찾아가세요."},
 {kind:"narration",text:"본당을 나설 때쯤엔 온몸이 녹초가 되어있었다.",leaveSanctuary:true},
 {kind:"dialogue",speaker:"주인공",text:"(이렇게 피곤한데 고해성사까지 해야 한다니...)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(해가 벌써 서녘에 뉘엿거리네... 고해소로 가봐야겠다.)",inner:true,sound:"walk"},
 {kind:"narration",text:"고해소는 본당 옆에 있는 작은 경당이었다."},
 {kind:"narration",text:"하얀 벽 탓에 모르고 보면 동화 속 예배당으로 착각할 만했다."},
 {kind:"narration",text:"문 옆에는 고해 시간을 적은 안내판이 걸려 있고, 그 아래 명패에는 상주 사제의 이름이 적혀 있었다.",sound:"nameplate"},
 {kind:"dialogue",speaker:"주인공",text:"…전원우."},
 {kind:"narration",text:"고해실 내부로 입장한다. 문이 닫히자, 나긋하되 중압감 있는 목소리가 좁은 공간에 울린다.",sound:"confessionDoor",enterConfession:true},
 {kind:"dialogue",speaker:"원우",text:"고해소는 신성한 장소입니다. 거짓을 고하지 않을 것임을 맹세하십니까?",portrait:"wonwoo-body2-eyes-closed",clockTickLouder:true}
];
const style=document.createElement('style');style.textContent=`
#shindo-vn{position:fixed;inset:0;z-index:30000;background:#050607;color:#fff;display:none;align-items:flex-end;justify-content:center;font-family:Pretendard,'Pretendard Variable',system-ui,sans-serif;cursor:pointer;touch-action:manipulation;user-select:none}
#shindo-vn.active{display:flex;animation:shindo-story-fade-in 1.1s ease both}@keyframes shindo-story-fade-in{from{opacity:0}to{opacity:1}}
#shindo-vn.day{background:radial-gradient(ellipse at 50% 20%,#313a3b 0%,#111719 50%,#050607 100%);transition:background 2s}
#shindo-vn .vn-box{width:min(1000px,calc(100% - 36px));min-height:155px;margin:0 auto clamp(40px,10vh,110px);border:1px solid #777;background:rgba(15,16,18,.91);border-radius:8px;padding:30px 34px 27px;box-sizing:border-box;display:flex;align-items:center;position:relative;line-height:1.85;font-size:clamp(16px,1.65vw,20px);letter-spacing:-.055em}
#shindo-vn .vn-box:after{content:'▼';position:absolute;right:20px;bottom:10px;font-size:11px;color:#aaa;animation:vn-pulse 1.2s infinite}
#shindo-vn .vn-center{align-self:center;margin:auto;text-align:center;font-size:clamp(27px,5vw,52px);font-weight:700;letter-spacing:-.055em}
#shindo-vn .vn-hint{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);color:#aaa;font-size:12px;white-space:nowrap}
@keyframes vn-pulse{50%{opacity:.25}}
@media(max-width:750px){#shindo-vn .vn-box{padding:19px 17px 26px;min-height:145px;margin-bottom:calc(35px + env(safe-area-inset-bottom));font-size:14px;letter-spacing:-.065em;line-height:1.7}#shindo-vn .vn-center{font-size:clamp(27px,8vw,40px);letter-spacing:-.065em}#shindo-vn .vn-hint{font-size:10px}}

#shindo-vn .vn-box{z-index:2;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding-top:38px}
#shindo-vn .vn-speaker{position:absolute;top:-18px;left:25px;padding:5px 19px;border:1px solid #777;border-radius:6px;background:#202124;font-weight:700;font-size:16px;min-width:54px;text-align:center}
#shindo-vn .vn-speaker:empty{display:none}
#shindo-vn .vn-portrait{position:absolute;bottom:clamp(160px,23vh,245px);left:50%;transform:translateX(-50%);height:min(66vh,740px);max-width:95vw;object-fit:contain;object-position:bottom;pointer-events:none;z-index:1}
#shindo-vn .vn-portrait[hidden]{display:none}
#shindo-vn .vn-text{position:relative;z-index:2}
#shindo-vn.sanctuary{background:#fff!important;color:#fff;transition:background 1.2s ease}
#shindo-vn.sanctuary-leaving{transition:background 1.5s ease}
#shindo-vn .vn-text.vn-inner{font-style:italic;color:#e3e3e3}
@media(max-width:750px){#shindo-vn .vn-portrait{height:min(60vh,620px);bottom:170px}#shindo-vn .vn-speaker{top:-17px;left:12px;font-size:13px;padding:4px 13px}#shindo-vn .vn-box{padding-top:29px}}

#shindo-vn .vn-illustration{position:absolute;left:50%;top:43%;transform:translate(-50%,-50%);width:min(92vw,960px);max-height:70vh;object-fit:contain;z-index:1;pointer-events:none}
#shindo-vn .vn-illustration[hidden]{display:none}
#shindo-vn .vn-illustration.vn-fade{animation:vn-image-appear 1s ease-out both}
#shindo-vn .vn-illustration.vn-mail-zoom{animation:vn-mail-zoom-out 6s ease-in-out both;transform-origin:center center}
@keyframes vn-mail-zoom-out{0%{opacity:0;transform:translate(-50%,-50%) scale(1)}12%{opacity:1}70%{opacity:1}100%{opacity:0;transform:translate(-50%,-50%) scale(1.22)}}
@keyframes vn-image-appear{from{opacity:0}to{opacity:1}}
@media(max-width:750px){#shindo-vn .vn-illustration{width:98vw;max-height:63vh;top:41%}}
`;document.head.appendChild(style);
const overlay=document.createElement('div');overlay.id='shindo-vn';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-label','1일차 스토리');overlay.innerHTML='<div class="vn-box"><span class="vn-text"></span></div><div class="vn-hint">화면을 터치하거나 클릭하여 진행</div>';document.body.appendChild(overlay);
const box=overlay.querySelector('.vn-box'),content=overlay.querySelector('.vn-text');
const portrait=document.createElement('img');portrait.className='vn-portrait';portrait.alt='';portrait.hidden=true;overlay.insertBefore(portrait,box);
const speakerTag=document.createElement('div');speakerTag.className='vn-speaker';box.insertBefore(speakerTag,content);
let currentPortrait='',revealed=false;
const portraits={};
const illustration=document.createElement('img');illustration.className='vn-illustration';illustration.alt='';illustration.hidden=true;overlay.insertBefore(illustration,box);
let jihoonRevealed=false,pencilAudio=null;
function stopPencil(){if(pencilAudio){pencilAudio.pause();pencilAudio.currentTime=0;pencilAudio=null}}
function keepPencil(){if(pencilAudio)return;pencilAudio=new Audio('story-audio/pencil-17s.mp3');pencilAudio.loop=true;pencilAudio.volume=.65;pencilAudio.play().catch(()=>{})}

let index=0,locked=false, timer=null, audio=null,ambient=null;let storySfx=null,storySfxTimer=null;
let sanctuaryTickTimer=null,sanctuaryTickAudio=null,confessionDoorAudio=null;
function stopSanctuaryTick(){if(sanctuaryTickTimer){clearInterval(sanctuaryTickTimer);sanctuaryTickTimer=null}if(sanctuaryTickAudio){sanctuaryTickAudio.pause();sanctuaryTickAudio.currentTime=0;sanctuaryTickAudio=null}}
function startSanctuaryTick(){
 stopSanctuaryTick();
 sanctuaryTickAudio=new Audio('story-audio/clock_tick_single.mp3');
 sanctuaryTickAudio.volume=.18;sanctuaryTickAudio.preload='auto';
 const tick=()=>{if(!sanctuaryTickAudio)return;sanctuaryTickAudio.pause();sanctuaryTickAudio.currentTime=0;sanctuaryTickAudio.play().catch(()=>{})};
 tick();sanctuaryTickTimer=setInterval(tick,2000);
}
function playExtraAudio(filename,volume=.7){const a=new Audio('story-audio/'+filename);a.volume=volume;a.play().catch(()=>{});return a}
function bell(times){for(let i=0;i<times;i++)setTimeout(()=>playExtraAudio('oath-bell-05.mp3',.75),i*3600)}
let confessionTickAudio=null,confessionTickLouder=false;
function stopConfessionTick(){if(confessionTickAudio){confessionTickAudio.pause();confessionTickAudio.currentTime=0;confessionTickAudio=null}}
function startConfessionTick(){
 if(confessionTickAudio)return;
 confessionTickAudio=new Audio('story-audio/clock_1s_sound.mp3');
 confessionTickAudio.loop=true;confessionTickAudio.preload='auto';
 confessionTickAudio.volume=confessionTickLouder?.43:.27;
 confessionTickAudio.play().catch(()=>{});
}
function audioContext(){try{audio=audio||new(window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')audio.resume();return audio}catch(e){return null}}
function tone(freq,duration,vol=.05,type='sine',start=0){const a=audioContext();if(!a)return;const o=a.createOscillator(),g=a.createGain(),t=a.currentTime+start;o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+duration);o.connect(g).connect(a.destination);o.start(t);o.stop(t+duration+.03)}
function playStoryClip(number,rate=1){
 if(storySfxTimer){clearTimeout(storySfxTimer);storySfxTimer=null}
 if(storySfx){storySfx.pause();storySfx.currentTime=0;storySfx=null}
 const clip=new Audio('story-audio/01-'+number+'.mp3');
 storySfx=clip;clip.volume=.7;clip.preload='auto';clip.playbackRate=rate;
 clip.play().catch(()=>{});
 storySfxTimer=setTimeout(()=>{if(storySfx===clip){clip.pause();clip.currentTime=0;storySfx=null}},6000);
}
function sound(name){if(!name)return;
 if(name==='footsteps_fast'){playStoryClip(4,2);return}
 if(name==='footsteps'){playStoryClip(4,1);return}
 if(name==='walk'){playStoryClip(1);return}
 if(name==='nameplate'){playExtraAudio('wood_sound_01.wav',.7);return}
 if(name==='confessionDoor'){confessionDoorAudio=playExtraAudio('church_wood_open.wav',.75);return}
 if(name==='drive'){playStoryClip(2);return}
 if(name==='stop'){playStoryClip(3);return}
 if(name==='forest'){playStoryClip(4);return}

 if(name==='birds'){tone(900,.16,.016,'sine');tone(1250,.12,.013,'sine',.22);if(name==='forest'){tone(140,.09,.035,'triangle',.45);tone(120,.1,.03,'triangle',.83)}}
 if(name==='door'){tone(170,.35,.07,'sawtooth');tone(105,.18,.035,'triangle',.3)}
 
 
 
}
function save(){try{localStorage.setItem(KEY,String(index));localStorage.setItem('shindo_story_started_v37','1');localStorage.setItem('shindo_sleep_gate_v48','0')}catch(e){}refreshInventoryVisibility()}
function render(){clearTimeout(timer);const scene=scenes[index];if(!scene){finish();return}
overlay.classList.toggle('day',index>=3);
if(scene.kind==='sfx'){if(scene.clearPortrait){currentPortrait='';portrait.hidden=true}sound(scene.sound);index++;save();render();return}
if(!(scene.sound==='forest'&&index===22))sound(scene.sound);
if(scene.reveal)revealed=true;
if(scene.revealJihoon)jihoonRevealed=true;
if(scene.enterSanctuary){overlay.classList.add('sanctuary');bell(2);startSanctuaryTick()}
if(scene.bellOnce)bell(1);
if(scene.leaveSanctuary){stopSanctuaryTick();overlay.classList.remove('sanctuary');overlay.classList.add('sanctuary-leaving');setTimeout(()=>overlay.classList.remove('sanctuary-leaving'),1600)}
if(scene.enterConfession){const start=()=>{startConfessionTick()};if(confessionDoorAudio){confessionDoorAudio.addEventListener('ended',start,{once:true});setTimeout(start,4500)}else setTimeout(start,1000)}
if(scene.eventFootsteps){sound('footsteps');portrait.hidden=true;currentPortrait='';box.style.display='none';locked=true;timer=setTimeout(()=>{locked=false;next()},3000);return}
if(scene.pencil)keepPencil();else stopPencil();
if(scene.clockTickLouder){confessionTickLouder=true;if(confessionTickAudio)confessionTickAudio.volume=.43;else startConfessionTick()}
illustration.hidden=!scene.illustration;
illustration.classList.toggle('vn-fade',scene.kind==='image'&&scene.illustration!=='mail-01');
illustration.classList.toggle('vn-mail-zoom',scene.kind==='image'&&scene.illustration==='mail-01');
if(scene.illustration)illustration.src='story-illustrations/'+scene.illustration+'.png';
if(scene.kind==='image'){
 portrait.hidden=true;speakerTag.textContent='';content.textContent='';box.style.display='none';
 overlay.querySelector('.vn-hint').style.display='none';locked=true;
 timer=setTimeout(()=>{locked=false;next()},scene.duration||3000);return;
}

if(scene.kind==='dialogue'){
 if(scene.clearPortrait){currentPortrait='';portrait.hidden=true}
 if(scene.portrait)currentPortrait=scene.portrait;
 speakerTag.textContent=scene.speaker==='주인공'?'김봉봉':(scene.speaker==='승철'&&!revealed?'??':scene.speaker==='지훈'&&!jihoonRevealed?'??':scene.speaker);
 content.classList.toggle('vn-inner',!!scene.inner);
 if(currentPortrait){portrait.src='story-portraits/'+currentPortrait+'.png';portrait.hidden=!!scene.illustration}
}else{
 speakerTag.textContent='';content.classList.remove('vn-inner');
 portrait.hidden=true;
}

 if(scene.kind==='transition'){box.style.display='none';let center=overlay.querySelector('.vn-center');if(!center){center=document.createElement('div');center.className='vn-center';overlay.appendChild(center)}center.textContent=scene.text;center.style.display='block';overlay.querySelector('.vn-hint').style.display='none';locked=true;timer=setTimeout(()=>{locked=false;next()},scene.text?2300:3300);return}
 const center=overlay.querySelector('.vn-center');if(center)center.style.display='none';box.style.display='flex';overlay.querySelector('.vn-hint').style.display='block';content.textContent=scene.maskWonwoo?scene.text.replace('원우','??'):scene.text;
 if(scene.boldWord){const target=scene.boldWord;const at=content.textContent.indexOf(target);if(at>=0){const txt=content.textContent;content.textContent='';content.append(document.createTextNode(txt.slice(0,at)));const b=document.createElement('strong');b.textContent=target;content.append(b,document.createTextNode(txt.slice(at+target.length)))}}
 if(scene.follow){locked=true;timer=setTimeout(()=>{locked=false;next()},1600)}
 else if(index===12){locked=true;timer=setTimeout(()=>{locked=false;next()},2000)}
 else locked=false;
}
function finish(){
 stopPencil();stopConfessionTick();stopSanctuaryTick();
 // Only finish after the player explicitly advances past the final dialogue.
 try{localStorage.setItem(KEY,'complete');localStorage.setItem('shindo_story_started_v37','1');localStorage.setItem('shindo_sleep_gate_v48','0')}catch(e){}
 window.SHINDO_openFeedback?.();
}
function next(){if(locked)return; if(index>=scenes.length-1){finish();return;} index++;save();render()}
overlay.addEventListener('click',()=>{audioContext();next()});document.addEventListener('keydown',e=>{if(!overlay.classList.contains('active'))return;/* Never hijack typing in feedback, including spaces and line breaks. */if(document.getElementById('shindo-feedback')?.classList.contains('sf-open'))return;if(e.target.closest('textarea,input,select,[contenteditable="true"],[role="textbox"]'))return;if(e.key===' '||e.key==='Enter'){e.preventDefault();audioContext();next()}});
window.SHINDO_startStory=()=>{
 if(localStorage.getItem(KEY)==='complete'&&!localStorage.getItem('shindo_story_v66_sanctuary')){localStorage.setItem(KEY,'66');localStorage.setItem('shindo_story_v66_sanctuary','1')}

 // Players who finished the previous release continue at the newly added dialogue.
 if(localStorage.getItem(KEY)==='complete'){
  const migrated=localStorage.getItem('shindo_story_v55_extended');
  if(!migrated){localStorage.setItem(KEY,'66');localStorage.setItem('shindo_story_v55_extended','1')}
  else{window.SHINDO_openFeedback?.();return}
 }
try{localStorage.setItem('shindo_story_started_v37','1');localStorage.setItem('shindo_sleep_gate_v48','0')}catch(e){};const n=Number(localStorage.getItem(KEY));index=Number.isInteger(n)&&n>=0&&n<scenes.length?n:0;revealed=scenes.slice(0,index+1).some(x=>x.reveal);jihoonRevealed=scenes.slice(0,index+1).some(x=>x.revealJihoon);
currentPortrait='';for(const scene of scenes.slice(0,index+1)){if(scene.clearPortrait)currentPortrait='';if(scene.portrait)currentPortrait=scene.portrait}
overlay.classList.add('active');refreshInventoryVisibility();render()};
})();
