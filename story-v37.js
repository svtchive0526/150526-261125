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
 #shindo-phone-putaway{position:absolute;left:50%;top:calc(72% + 40px);transform:translateX(-50%);display:block;width:40%;max-width:280px;min-width:145px;height:52px;border:0;border-radius:12px;background:#303030;color:white;font:700 18px Pretendard,sans-serif;pointer-events:auto;cursor:pointer;opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}
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
 {kind:'transition',text:'1일차 아침'},
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
 {kind:"dialogue",speaker:"주인공",text:"(이 단체를 지키는 데에, 더 나아가 카밀레교에 그만큼 진심인 거겠지.)",inner:true,clearPortrait:true},
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
 {kind:"event",eventFootsteps:true,silentFootsteps:true},
 {kind:"dialogue",speaker:"주인공",text:"(교주다.)",inner:true,portrait:"elder-default"},
 {kind:"dialogue",speaker:"주인공",text:"(짜 맞춘 것도 아니고 '사이비 교주'스럽게 생긴 노인이군...)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(회백색의 머리에 수북한 하얀 수염이라...)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(기껏 늘어놓는 '설교'가 정말 형편없군...)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(죄다 홈페이지 짜깁기잖아? '살아있는 복음'이니 '영적 성장'이니…)",inner:true},
 {kind:"narration",text:"흐름에 관한 이야기가 무의미하게 이어졌다. 하품을 참느라 고역이었다."},
 {kind:"dialogue",speaker:"주인공",text:"(이 노인이 정말 수백 수천의 신도를 이끄는 자라고?)",inner:true},
 {kind:"narration",text:"그때였다. 교주의 입에서 처음으로 구미가 당기는 말이 나온 게."},
 {kind:"dialogue",speaker:"교주",text:"…그러므로 우리는 '공양'을 통해 탁한 것을 덜어내고, 죄 사함을 받아 맑은 흐름으로 돌아갑니다.",portrait:"elder-default",boldWord:"공양"},
 {kind:"narration",text:"최대한 침착하게 '공양'의 선출 방식을 물어봤다. 돌아오는 대답은 모호하기 그지없었다."},
 {kind:"dialogue",speaker:"교주",text:"성실히 흐르는 이에게는 걱정할 일이 없습니다.",portrait:"elder-default"},
 {kind:"dialogue",speaker:"교주",text:"다만 흐름에서 탈락하는 불온한 자는 고해를 통해 드러나니, 마음속에 감추는 것이 없도록 하십시오.",portrait:"elder-default",bellOnce:true},
 {kind:"dialogue",speaker:"주인공",text:"(그래, 뭐. 들어온 지 반나절도 안 된 신입에게 '인신 공양'을 털어놓을 리 없겠지.)",inner:true,boldWord:"인신 공양"},
 {kind:"dialogue",speaker:"주인공",text:"(그런 건 내가 알아내야만 한다.)",inner:true},
 {kind:"narration",text:"그 뒤로는 면접 아닌 면접이 이어졌다. 준비해간 이야기를 늘어놓았다."},
 {kind:"narration",text:"21세기 대한민국에서 밥 벌어먹고 살기 여간 힘들고 팍팍한 게 아니라서..."},
 {kind:"narration",text:"종교로 귀의하고 싶었다는 이야기… 다행히도 믿는 눈치였다."},
 {kind:"dialogue",speaker:"교주",text:"처음 입교한 신도는 무조건 고해성사를 해야 합니다.",portrait:"elder-default"},
 {kind:"dialogue",speaker:"교주",text:"밖에서 쌓은 수많은 죄를 토해내 사하기 위해서죠.",portrait:"elder-default"},
 {kind:"dialogue",speaker:"교주",text:"원우 사제님은 이 중요한 업무를 맡은 고해성사 담당 사제입니다.",portrait:"elder-default",maskWonwoo:true},
 {kind:"dialogue",speaker:"교주",text:"죄를 토해내고 꾸짖음이 필요하시다면 사제님을 찾아가세요.",portrait:"elder-default"},
 {kind:"narration",text:"본당을 나설 때쯤엔 온몸이 녹초가 되어있었다.",leaveSanctuary:true,clearPortrait:true},
 {kind:"dialogue",speaker:"주인공",text:"(이렇게 피곤한데 고해성사까지 해야 한다니...)",inner:true},
 {kind:"dialogue",speaker:"주인공",text:"(해가 벌써 서녘에 뉘엿거리네... 고해소로 가봐야겠다.)",inner:true},
 {kind:"narration",text:"고해소는 본당 옆에 있는 작은 경당이었다."},
 {kind:"narration",text:"하얀 벽 탓에 모르고 보면 동화 속 예배당으로 착각할 만했다."},
 {kind:"narration",text:"문 옆에는 고해 시간을 적은 안내판이 걸려 있고, 그 아래 명패에는 상주 사제의 이름이 적혀 있었다.",sound:"nameplate"},
 {kind:"dialogue",speaker:"주인공",text:"…전원우."},
 {kind:"narration",text:"고해소 내부로 입장한다. 문이 닫히자, 나긋하되 중압감 있는 목소리가 좁은 공간에 울린다.",sound:"confessionDoor",enterConfession:true},
 {kind:"dialogue",speaker:"원우",text:"고해소는 신성한 장소입니다. 거짓을 고하지 않을 것임을 맹세하십니까?",portrait:"wonwoo-body2-eyes-closed",clockTickLouder:true},
 {kind:"narration",text:"뭔가… 기존에 알던 고해성사와는 느낌이 다르다. 좀 더, 조여오는 기분.",tickSpeed:1,tickVolume:.52},
 {kind:"narration",text:"마치 심문받는 것만 같다."},
 {kind:"dialogue",speaker:"주인공",text:"…예. 맹세합니다.",tickSpeed:1,tickVolume:.27},
 {kind:"dialogue",speaker:"주인공",text:"(기자 신분으로 여기에 잠입한 것부터가 거짓이지만, 뭐. 알 리가 있나.)",inner:true},
 {kind:"dialogue",speaker:"원우",text:"김봉봉 신도님은 바깥에서 어떤 일을 하셨습니까?",tickSpeed:1,delayedConfessionBlackout:true},
 {kind:"dialogue",speaker:"주인공",text:"(젠장, 첫 질문부터 무서운 거잖아...)",inner:true},
 {kind:"choice"},
 {kind:"narration",text:"동료들의 이중적이고 자극적인 것만 쫓는 태도에 신물 나 오게 되었다고 대답했다.",branch:1,tickSpeed:1},
 {kind:"dialogue",speaker:"주인공",text:"(벽 너머의 사제는 내 말을 믿어주는 걸까?)",inner:true,branch:1},
 {kind:"narration",text:"알기 힘들다. 날카롭고 무서운 질문이 연이어 날아 왔다.",branch:1},
 {kind:"narration",text:"하지만, 이곳의 비밀을 밝혀내기 위해서는 모든 것을 철저하게 숨기고 또 연기해야 한다.",branch:1},
 {kind:"narration",text:"고해성사가 끝난 듯 하다. 무사히 잘 넘겼을까?",branch:1},
 {kind:"dialogue",speaker:"원우",text:"이로써 당신의 죄는 모두 토해져, 신께 닿아 사해졌습니다. 당신의 생활에 행복과 안식이 있기를.",portrait:"wonwoo-body1-smile",branch:1},
 {kind:"narration",text:"다행히 의심은 피했다. 이제 생활관으로 넘어가 하루를 마무리하자.",branch:1,stopTick:true,backdrop:"bg-living-quarters-exterior.png"},
 {kind:"dialogue",speaker:"주인공",text:"정말 힘든 하루였어.. 이제 자고 내일을 시작해야겠다.",branch:1,backdrop:"bg-living-quarters-interior.png",clearPortrait:true},
 {kind:"sleep-transition",text:"2일차",branch:1,day:2,backdrop:"bg-living-quarters-interior.png"},
 {kind:"dialogue",speaker:"주인공",text:"어, 지금 몇 시지..?",branch:1,backdrop:"bg-living-quarters-interior.png",wakeFadeIn:true},
 {kind:"narration",text:"고해소의 사제라면 신도들의 모든 정보를 알고 있으리라.",branch:2,tickSpeed:1},
 {kind:"dialogue",speaker:"주인공",text:"(그를 내 편으로 포섭한다면 이곳에서 살아남기 수월할지도 모른다.)",inner:true,branch:2},
 {kind:"narration",text:"나는 그에게 이곳에 들어온 목적을 솔직하게 털어놓았다.",branch:2},
 {kind:"narration",text:"그 과정에서 카밀레교에 대한 부정적인 발언들도 가감 없이 쏟아냈다.",branch:2},
 {kind:"dialogue",speaker:"원우",text:"그렇군요… 그럴 수 있습니다, 단체 생활이란 그런 것이지요…",portrait:"wonwoo-body2-eyes-closed",tickSpeed:1,branch:2},
 {kind:"dialogue",speaker:"원우",text:"신도님께서 고민이 많으시겠습니다.",portrait:"wonwoo-body2-eye-smile",branch:2},
 {kind:"dialogue",speaker:"주인공",text:"네 네, 그렇지요.. 이해해주셔서 감사합니다.",branch:2},
 {kind:"dialogue",speaker:"주인공",text:"(잘 넘어간건가?)",inner:true,branch:2,stopTick:true},
 {kind:"narration",text:"(그렇게 잠든 다음 날. 김봉봉은 공양자로 선정되어 신도들의 이끌려 공양실로 향하게 된다.)",branch:2,blackout:true,fade:true},
 {kind:"narration",text:"뎅- 종소리가 울릴 때 원우는 누군가에게 말한다.",branch:2,bellLoop:true},
 {kind:"dialogue",speaker:"원우",text:"오늘도 한 명의 어린 양이 주님 곁으로 갔습니다.",largeText:true,redText:true,portrait:"wonwoo-body2-default",branch:2},
 {kind:"dialogue",speaker:"원우",text:"걱정 마십시오 교주님.",largeText:true,redText:true,portrait:"wonwoo-body2-eyes-closed",branch:2,bellStop:true},
 {kind:"dialogue",speaker:"원우",text:"우리는 굳건하고 흔들리지 않을 것입니다. 제가 그리 만들 것입니다.",largeText:true,redText:true,portrait:"wonwoo-body2-default",branch:2},
 {kind:"dialogue",speaker:"주인공",text:"(그가 카밀레교의 누구보다도 신실한 신도였다니...)",inner:true,branch:2,bellLoud:true},
 {kind:"ending",branch:2},
 {"kind":"dialogue","speaker":"??","text":"봉봉 씨! 새벽기도 안 가세요?","branch":1,"wakeShake":true,"portraitPlaceholder":true,"backdrop":"bg-living-quarters-interior.png"},
 {"kind":"dialogue","speaker":"주인공","text":"맞다, 여기 새벽기도가 있지…","branch":1,"backdrop":"bg-living-quarters-interior.png"},
 {"kind":"narration","text":"참석은 자율이다. 지금은 꼭두새벽. 하품이 마구 터져 나온다. 피곤하다.","branch":1,"backdrop":"bg-living-quarters-interior.png"},
 {kind:"day2-prayer-choice",branch:1,backdrop:"bg-living-quarters-interior.png"},
 {"kind":"narration","text":"일어난다. 신실한 모습을 보이면 누군가의 호감을 살지도 모른다.","branch":1,"prayer":1,"backdrop":"bg-living-quarters-interior.png"},
 {"kind":"narration","text":"다시 잔다. 기도는 개뿔. 체력이나 아끼자.","branch":1,"prayer":2,"backdrop":"bg-living-quarters-interior.png"},
 {"kind":"narration","text":"아침이 밝았다. 중앙광장으로 가볼까...","branch":1,"sound":"footsteps","square":true},
 {"kind":"narration","text":"중앙 광장은 이미 사람들로 가득했다. 발소리와 옷깃 스치는 소리만 간간이 들렸다.","branch":1},
 {"kind":"narration","text":"기이한 정적 위로 새소리가 들려왔다.","branch":1,"sound":"birds"},
 {"kind":"narration","text":"아침 예배가 끝나기가 무섭게 전달이 돌았다. 모두 중앙 광장으로 모이라고.","branch":1},
 {"kind":"narration","text":"어쩌면 ‘공양’을 할지도 모른다. 라고,","branch":1,"squareBlack":true,"fade":true},
 {"kind":"narration","text":"다행히도 다들 신입 신자에게 설명해주는 데 매우 호의적이었다.","branch":1},
 {"kind":"narration","text":"‘공양’은 죄를 지은 자의 죄를 밝히고 이를 사하기 위해 인도받는 자리라고 했다.","branch":1},
 {"kind":"dialogue","speaker":"주인공","text":"듣기로는 고해성사와 크게 다르진 않아 보이는데...","branch":1},
 {"kind":"dialogue","speaker":"주인공","text":"몹시 두려워하는 신도들의 태도만 아니었더라면, 그렇게 생각했을 것 같기도...","branch":1},
 {"kind":"narration","text":"그들에 의하면 ‘공양’은 매일 일어나는 게 아니었다.","branch":1},
 {"kind":"narration","text":"어떨 때는 보름이 지나도록 별일이 없다고도 했다.","branch":1,"square":true},
 {"kind":"dialogue","speaker":"주인공","text":"…‘공양제’만 아니라면...?","branch":1,"boldWord":"공양제"},
 {"kind":"narration","text":"도대체 그 ‘공양제’라는 게 뭘까. 영 좋지 않은 게 분명하다.","branch":1,"boldWord":"공양제"},
 {"kind":"narration","text":"그때였다.","branch":1,"gongyangBell":"01"},
 {"kind":"narration","text":"비명과 함께 한 남자가 앞으로 끌려 나왔다. 아침 식사 때 내게 친절하게 말을 걸어준 신도였다.","branch":1},
 {"kind":"dialogue","speaker":"교주","text":"성도들이여! 우리 가운데 배도자가 있었습니다!","branch":1,"portrait":"elder-frown"},
 {"kind":"dialogue","speaker":"교주","text":"지금 앞에 선 이 죄인은 하나 됨을 깨트렸습니다. 우리 모두를, 섭리 앞에서 배반했습니다!","branch":1,"portrait":"elder-frown"},
 {"kind":"dialogue","speaker":"교주","text":"그 죄가 참으로 큽니다!","branch":1,"portrait":"elder-frown","screenShake":true},
 {"kind":"narration","text":"웅성거림이 들불처럼 번져나갔다.","branch":1,"sound":"murmur"},
 {"kind":"narration","text":"어제 본 교주가 본당 계단 위에 서 있었다. 무시무시한 얼굴로 모두를 내려다보면서.","branch":1},
 {"kind":"dialogue","speaker":"교주","text":"공양에 대한 말이 새어나갔습니다.","branch":1,"portrait":"elder-frown"},
 {"kind":"dialogue","speaker":"교주","text":"누가 흐름을 의심했습니까?","branch":1,"portrait":"elder-frown","boldAll":true},
 {"kind":"dialogue","speaker":"교주","text":"대체 누가 감히 우리와 발맞추어 걸으면서, 그 눈과 심장은 죄악을 향해 있었습니까?","branch":1,"portrait":"elder-frown","boldAll":true,"largeText":true},
 {"kind":"dialogue","speaker":"교주","text":"이에 신께서는 진노하셨습니다. 그 진노 앞에서 우리는 하나가 되어야 합니다!","branch":1,"portrait":"elder-furious","boldAll":true},
 {"kind":"narration","text":"교주가 손을 들자 웅성거림이 순식간에 가라앉았다.","branch":1},
 {"kind":"dialogue","speaker":"교주","text":"죄악으로 탁해진 것을 씻고 속죄하기 위하여.","branch":1,"portrait":"elder-frown"},
 {"kind":"dialogue","speaker":"교주","text":"지금 이 시간 부로, 공양제를 시작하겠습니다.","branch":1,"portrait":"elder-frown","redWord":"공양제"},
 {"kind":"narration","text":"목덜미가 서늘해졌다.","branch":1},
 {"kind":"dialogue","speaker":"교주","text":"이 죄인이 바로 그 첫 열매입니다.","branch":1,"portrait":"elder-frown"},
 {"kind":"dialogue","speaker":"교주","text":"역경을 지나, 번성으로!","branch":1,"portrait":"elder-furious","leaderShout":true},
 {"kind":"narration","text":"신도들 사이에서 우레와 같은 박수 소리가 터져 나왔다.","branch":1,"gongyangApplause":"start","clearPortrait":true},
 {"kind":"narration","text":"발버둥 쳐봐도 소용없었다. 그 남자는 공양실 방향으로 질질 끌려갔다.","branch":1,"gongyangApplause":"continue"},
 {"kind":"narration","text":"풀잎 위로 상쾌한 바람이 불었다. 눈이 시리도록 맑은 아침이었다. 그래서 더 끔찍했다.","branch":1},
 {"kind":"narration","text":"교주의 말인즉슨, 최근 한 내부고발자가 인신 공양의 실태를 바깥으로 흘렸다.","branch":1,"squareBlack":true,"fade":true},
 {"kind":"narration","text":"그래서 내부 결속을 다지려고 연속 공양을 시작했다.","branch":1},
 {"kind":"dialogue","speaker":"주인공","text":"그 시작이 오늘.","branch":1},
 {"kind":"dialogue","speaker":"주인공","text":"하필 오늘.","branch":1},
 {"kind":"dialogue","speaker":"주인공","text":"내가 여기 온 바로 다음 날.","branch":1},
 {"kind":"narration","text":"그리고 언제 끝날지는, 아무도 모른다.","branch":1},
 {"kind":"narration","text":"사방을 찢어놓는 무시무시한 종소리가 울려 퍼졌다.","branch":1,"gongyangBell":"01"},
 {"kind":"narration","text":"공양제의 시작이었다.","branch":1},
 {"kind":"narration","text":"속이 메스껍다. 당장에라도 이 미친 사이비 집단에서 탈출하고 싶다.","branch":1},
 {"kind":"dialogue","speaker":"주인공","text":"그렇지만… 어디로 갈 수 있는데? 핸드폰도 안 터지는 이 산속에서.","branch":1},
 {"kind":"narration","text":"이 상태로라도 정보를 얻어야 한다. 아니, 이렇기에 더더욱 정보를 얻어야만 한다.","branch":1},
 {"kind":"narration","text":"악착같이 살아남아 <카밀레교>를 해체해주마.","branch":1},
 {"kind":"narration","text":"우선은 신도들 틈에 자연스레 섞여 하루 일과를 시작하자.","branch":1},
 {"kind":"narration","text":"오전에는 종교 활동을, 오후에는 관리 업무를 해야 한다.","branch":1},
 {kind:"day2-morning-choice",branch:1}
];

// v99: Day 02 / morning prayer hall. Branches are mutually exclusive and keep their own scenes.
const PRAYER_SCENE_START=scenes.length;
scenes.push(
 {kind:'narration',text:'기도관 내부는 고풍스럽다. 은은한 햇빛이 고동색 장의자 위로 드리운다.',prayerRoom:true,prayerStart:true,clearPortrait:true},
 {kind:'narration',text:'신도들 틈에 섞여 기도해야겠다. 신성한 기분마저 드는 것 같다.',prayerRoom:true},
 {kind:'prayer-wait',duration:3000,prayerRoom:true},
 {kind:'narration',text:'기도는 끝났다. 이제 슬슬 정보를 캘 시간이다.',prayerRoom:true},
 {kind:'narration',text:'마침 일손이 필요해 보이는 신도들이 눈에 들어왔다.',prayerRoom:true},
 {kind:'prayer-choice',prayerRoom:true},
 // 1. 단상 위 청소 / 한솔
 {kind:'narration',text:'지저분한 단상 위를 치우고 있는데, 웬 사제복을 입은 남자가 이쪽으로 걸어오는 듯 하다.',prayerBranch:1,prayerRoom:true,prayerAudio:'clean-start',clearPortrait:true},
 {kind:'dialogue',speaker:'한솔',text:'어이구, 감사합니다… 이거 제 일인데.',prayerBranch:1,prayerRoom:true,maskSpeaker:true,portrait:'hansol-body1-smile-v103'},
 {kind:'dialogue',speaker:'주인공',inner:true,text:'(감사는 한데 그닥 죄송하게는 안 보이는 얼굴...)',prayerBranch:1,prayerRoom:true,portrait:'hansol-body1-smile-v103'},
 {kind:'dialogue',speaker:'주인공',inner:true,text:'(약간 이국적인 느낌이 나는 미남같다.)',prayerBranch:1,prayerRoom:true,portrait:'hansol-body1-smile-v103'},
 {kind:'dialogue',speaker:'주인공',inner:true,text:'(이야, 이목구비가 여기 풍경보다 훤하다...)',prayerBranch:1,prayerRoom:true,portrait:'hansol-body1-smile-v103',prayerAudio:'clean-fade'},
 {kind:'narration',text:'말을 섞다 보니 알게 된 것들이 있었다.',prayerBranch:1,prayerRoom:true,portrait:'hansol-body1-default-v103'},
 {kind:'narration',text:'우선, 그의 이름은 최한솔이다. 무려 사제다.',prayerBranch:1,prayerRoom:true,portrait:'hansol-body1-default-v103',revealHansol:true},
 {kind:'narration',text:'그리고 여기 기도관은 그의 관할이다.',prayerBranch:1,prayerRoom:true,portrait:'hansol-body1-default-v103'},
 {kind:'dialogue',speaker:'주인공',inner:true,text:'(하지만 사제라기엔 그는 어딘가… 헐랭한걸..?)',prayerBranch:1,prayerRoom:true,portrait:'hansol-body1-default-v103'},
 {kind:'dialogue',speaker:'주인공',inner:true,text:'(영어로 된 성경을 웅얼대며 읽거나, 창밖을 멍하니 쳐다보는 게 대부분...)',prayerBranch:1,prayerRoom:true,portrait:'hansol-body1-default-v103'},
 {kind:'narration',text:'신도들의 기도에도 크게 진실된 반응을 보이지 않는다.',prayerBranch:1,prayerRoom:true,portrait:'hansol-body1-default-v103'},
 {kind:'narration',text:'사제임에도 크게 신앙심이 있는 것처럼 보이진 않는 듯 하다.',prayerBranch:1,prayerRoom:true,portrait:'hansol-body1-annoyed-v103'},
 {kind:'dialogue',speaker:'주인공',inner:true,text:'(대체 무슨 생각을 하는 거지?)',prayerBranch:1,prayerRoom:true,clearPortrait:true},
 {kind:'dialogue',speaker:'주인공',inner:true,text:'(흠… 파고들만 할지도 모르겠다.)',prayerBranch:1,prayerRoom:true},
 {kind:'prayer-end',prayerBranch:1,prayerRoom:true},
 // 2. 자는 사람 깨우기 / 승철
 {kind:'prayer-sfx-wait',prayerBranch:2,prayerRoom:true,prayerAudio:'wake-4',duration:4000},
 {kind:'narration',text:'덩치 큰 남자를 쿡쿡 찔렀다.',prayerBranch:2,prayerRoom:true,portrait:'seungcheol-body1-default',silhouette:true,clearPortrait:true},
 {kind:'dialogue',speaker:'주인공',text:'저기요, 사제님이 이쪽 보시는 거 같은데요….',prayerBranch:2,prayerRoom:true,portrait:'seungcheol-body1-default',silhouette:true},
 {kind:'dialogue',speaker:'승철',text:'어, 어어? 감사합니다….',prayerBranch:2,prayerRoom:true,portrait:'seungcheol-body2-flustered'},
 {kind:'dialogue',speaker:'주인공',text:'어? 어제 보신 분이죠, 이름이... 최승철?',prayerBranch:2,prayerRoom:true,portrait:'seungcheol-body1-smile'},
 {kind:'narration',text:'그도 나를 알아본 모양이다.',prayerBranch:2,prayerRoom:true,portrait:'seungcheol-body1-smile'},
 {kind:'narration',text:'아무리 그래도 여기서 자다니, 보통 배짱이 아니다.',prayerBranch:2,prayerRoom:true,portrait:'seungcheol-body1-smile'},
 {kind:'narration',text:'승철이 웃으며 교단에 선 사제를 가리킨다.',prayerBranch:2,prayerRoom:true,portrait:'seungcheol-body2-smile'},
 {kind:'dialogue',speaker:'주인공',text:'…졸면서도 굳이 설교를 듣는 이유가 있나요?',prayerBranch:2,prayerRoom:true,portrait:'seungcheol-body2-smile'},
 {kind:'dialogue',speaker:'승철',text:'이제 일상이죠, 뭐.',prayerBranch:2,prayerRoom:true,portrait:'seungcheol-body2-squintsmile'},
 {kind:'dialogue',speaker:'주인공',inner:true,text:'(조는 게 일상이란 걸까, 설교가 일상이란 걸까.)',prayerBranch:2,prayerRoom:true,clearPortrait:true},
 {kind:'dialogue',speaker:'주인공',inner:true,text:'(어느 쪽인지가 중요하다. 더 친해져 봐도 좋겠다.)',prayerBranch:2,prayerRoom:true},
 {kind:'prayer-end',prayerBranch:2,prayerRoom:true},
 // 3. 성경 한 장 넘기기 / 석민
 {kind:'narration',text:'낭독이 한창인데, 옆자리 남자는 성경을 쥔 채 허둥지둥하고 있다.',prayerBranch:3,prayerRoom:true,clearPortrait:true},
 {kind:'narration',text:'손가락이 같은 구절 위를 뱅뱅 돈다. 딱 봐도 진도를 놓친 얼굴이다.',prayerBranch:3,prayerRoom:true},
 {kind:'narration',text:'결국 보다 못하고 그의 성경 위로 손을 뻗었다.',prayerBranch:3,prayerRoom:true},
 {kind:'prayer-sfx-wait',prayerBranch:3,prayerRoom:true,prayerAudio:'book-2',duration:1000},
 {kind:'narration',text:'한 장, 조용히 넘겼다. 낭독 중인 구절이 있는 쪽이었다.',prayerBranch:3,prayerRoom:true},
 {kind:'dialogue',speaker:'석민',text:'와 깜짝, 가, 감사합니다….',prayerBranch:3,prayerRoom:true,maskSpeaker:true,portrait:'seokmin-body2-surprised'},
 {kind:'narration',text:'그가 놀란 눈으로 나를 본다.',prayerBranch:3,prayerRoom:true,portrait:'seokmin-body2-surprised'},
 {kind:'narration',text:'나는 시선을 앞에 둔 채 입만 달싹여 읽는 시늉을 했다.',prayerBranch:3,prayerRoom:true,clearPortrait:true},
 {kind:'narration',text:'예배가 끝난 뒤 남자가 먼저 말을 걸어왔다.',prayerBranch:3,prayerRoom:true,portrait:'seokmin-body2-smile',prayerAudio:'single-bell'},
 {kind:'narration',text:'이름은 이석민. 나처럼 여기 들어온 지 얼마 안 된, 신입이다.',prayerBranch:3,prayerRoom:true,portrait:'seokmin-body1-smile'},
 {kind:'dialogue',speaker:'석민',text:'아까는 정말 감사했습니다.',prayerBranch:3,prayerRoom:true,portrait:'seokmin-body1-eyesmile',revealSeokmin:true},
 {kind:'dialogue',speaker:'석민',text:'입교한 지 얼마 안 되어서, 진도를 도통 못 따라잡겠더라고요.',prayerBranch:3,prayerRoom:true,portrait:'seokmin-body1-eyesmile'},
 {kind:'dialogue',speaker:'주인공',text:'저도 최근에 들어 온 걸요. 아직 여기 길도 잘 몰라요.',prayerBranch:3,prayerRoom:true,portrait:'seokmin-body1-smile'},
 {kind:'narration',text:'아까는 소심해 보였는데, 이렇게 보니 쾌활한 쪽이다.',prayerBranch:3,prayerRoom:true,portrait:'seokmin-body2-eyesmile'},
 {kind:'dialogue',speaker:'주인공',inner:true,text:'(중요하게는, 상견례 때 데려오면 \'니 이 사람 상대로 약점 잡았냐?\' 소리를 들을 만한 얼굴이다.)',prayerBranch:3,prayerRoom:true,portrait:'seokmin-body2-eyesmile'},
 {kind:'dialogue',speaker:'주인공',text:'혹시 시간 나실 때 함께 교리 공부하실래요?',prayerBranch:3,prayerRoom:true,portrait:'seokmin-body1-default'},
 {kind:'dialogue',speaker:'주인공',inner:true,text:'(맹세하건대 흑심이 아니다.)',prayerBranch:3,prayerRoom:true,portrait:'seokmin-body1-default'},
 {kind:'dialogue',speaker:'주인공',inner:true,text:'(초심자라면 모르는 사이에 정보를 이끌어 내기 쉬울지도 모른다는, 기자의 경험적 판단이다.)',prayerBranch:3,prayerRoom:true,portrait:'seokmin-body1-default'},
 {kind:'dialogue',speaker:'석민',text:'저야 너무 좋죠!',prayerBranch:3,prayerRoom:true,portrait:'seokmin-body1-eyesmile'},
 {kind:'dialogue',speaker:'석민',text:"안 그래도 요즘 이 '공양제'에 관심이 가서… 보다 깊은 공부를 해볼까 합니다.",prayerBranch:3,prayerRoom:true,portrait:'seokmin-body2-smile',boldWord:'공양제'},
 {kind:'dialogue',speaker:'주인공',inner:true,text:'(잭팟이다!)',prayerBranch:3,prayerRoom:true,clearPortrait:true},
 {kind:'prayer-end',prayerBranch:3,prayerRoom:true},
 // 4. 청소 돕기 / 찬
 {kind:'narration',text:'구석에서 열심히 청소 중인 청년이 눈에 띈다. 아직 앳된 티가 나는데?',prayerBranch:4,prayerRoom:true,clearPortrait:true},
 {kind:'narration',text:'청년은 장의자 다리 하나를 한참 닦고 있다. 열성적으로.',prayerBranch:4,prayerRoom:true},
 {kind:'narration',text:'열성적이다. 열성적인데…',prayerBranch:4,prayerRoom:true},
 {kind:'dialogue',speaker:'주인공',inner:true,text:'(왜 같은 자리만 닦지?)',prayerBranch:4,prayerRoom:true},
 {kind:'narration',text:'여분의 걸레를 집어 들고 맞은편에 쭈그려 앉았다.',prayerBranch:4,prayerRoom:true},
 {kind:'prayer-sfx',prayerBranch:4,prayerRoom:true,prayerAudio:'clean-5'},
 {kind:'dialogue',speaker:'주인공',text:'저도 같이 해도 될까요?',prayerBranch:4,prayerRoom:true},
 {kind:'dialogue',speaker:'찬',text:'정말요? 너무 좋죠! 와, 이런 날이 다 있네요.',prayerBranch:4,prayerRoom:true,maskSpeaker:true,portrait:'chan-body1-determined'},
 {kind:'dialogue',speaker:'찬',text:'처음 뵈는 분이네요. 신도님들 얼굴은 다 외우고 있거든요!',prayerBranch:4,prayerRoom:true,portrait:'chan-body1-eyesmile',maskSpeaker:true},
 {kind:'dialogue',speaker:'찬',text:'저는 찬이라고 합니다.',prayerBranch:4,prayerRoom:true,portrait:'chan-body2-eyesmile',revealChan:true},
 {kind:'narration',text:'이찬. 외 자랬다.',prayerBranch:4,prayerRoom:true,portrait:'chan-body1-smile'},
 {kind:'narration',text:'혹시, 빛날 찬을 쓰세요? 하니 얼굴이 확 밝아진다.',prayerBranch:4,prayerRoom:true,portrait:'chan-body1-eyesmile'},
 {kind:'narration',text:'대화를 이어 나가려다, 나도 모르게 시선이 그의 손에 닿았다.',prayerBranch:4,prayerRoom:true,portrait:'chan-body1-eyesmile'},
 {kind:'narration',text:'손이 온통 빨갛게 트고 갈라져 있다.',prayerBranch:4,prayerRoom:true,portrait:'chan-body2-eyesmile'},
 {kind:'dialogue',speaker:'주인공',inner:true,text:'(…아플 텐데.)',prayerBranch:4,prayerRoom:true,portrait:'chan-body1-eyesmile'},
 {kind:'dialogue',speaker:'주인공',inner:true,text:'(고통도 느끼지 못하는지 찬은 닦은 자리만을, 같은 곳을 문지르고 또 문지른다.)',prayerBranch:4,prayerRoom:true,portrait:'chan-body2-default'},
 {kind:'dialogue',speaker:'주인공',text:'손이… 괜찮으세요? 좀 쉬어 가면서 하세요.',prayerBranch:4,prayerRoom:true,portrait:'chan-body2-default'},
 {kind:'dialogue',speaker:'찬',text:'아이 괜찮아요.',prayerBranch:4,prayerRoom:true,portrait:'chan-body2-default'},
 {kind:'dialogue',speaker:'찬',text:'정체란 곧 부패니까요. 손을 멈추면 마음이 먼저 썩어요.',prayerBranch:4,prayerRoom:true,portrait:'chan-body3-eyesmile'},
 {kind:'dialogue',speaker:'주인공',text:'…….',prayerBranch:4,prayerRoom:true,portrait:'chan-body3-eyesmile'},
 {kind:'dialogue',speaker:'찬',text:'하지만 제 마음은 늘 흘러갑니다.',prayerBranch:4,prayerRoom:true,portrait:'chan-body2-determined'},
 {kind:'dialogue',speaker:'찬',text:'그러니 더할 나위 없이 행복할 수밖에요.',prayerBranch:4,prayerRoom:true,portrait:'chan-body2-determined'},
 {kind:'narration',text:'환하게 웃는 얼굴이다. 거짓은 없어 보인다.',prayerBranch:4,prayerRoom:true,portrait:'chan-body3-default'},
 {kind:'dialogue',speaker:'찬',text:'저희는 모두 가족이니까요!',prayerBranch:4,prayerRoom:true,portrait:'chan-body3-eyesmile'},
 {kind:'narration',text:'요즘 보기 드문, 성실하고 곧은 청년이다.',prayerBranch:4,prayerRoom:true,clearPortrait:true},
 {kind:'narration',text:'방향이 옳은지는... 모르겠지만.',prayerBranch:4,prayerRoom:true},
 {kind:'dialogue',speaker:'찬',text:'저는 늘 여기 있으니까요, 다음에도 오시면 말을 걸어주세요!',prayerBranch:4,prayerRoom:true,portrait:'chan-body2-smile'},
 {kind:'dialogue',speaker:'주인공',inner:true,text:'(눈동자에서 열렬한 야망이 읽히는데... 믿어도 되는 걸까?)',prayerBranch:4,prayerRoom:true,clearPortrait:true},
 {kind:'prayer-end',prayerBranch:4,prayerRoom:true}
);


// v105 — Day 02 / Art Hall. Branches are separate; no background artwork is required yet.
const ART_SCENE_START=scenes.length;
scenes.push(
 {"kind":"narration","text":"예술당 안은 나무 향으로 가득하다.","artHall":true,"artStart":true,"clearPortrait":true},
 {"kind":"narration","text":"목조 벽과 원목 작업대 곳곳에 캔버스와 각종 미술용품이 놓여 있다.","artHall":true},
 {"kind":"dialogue","text":"(아름다운 공간이다. 죄다 캐모마일에 잠식되어 있단 것만 제외하면.)","artHall":true,"speaker":"주인공","inner":true},
 {"kind":"dialogue","text":"(신도들에게 예술을 통해 신앙심을 기른다나 뭐라나.)","artHall":true,"speaker":"주인공","inner":true},
 {"kind":"narration","text":"붓통과 물감 상자, 흩어진 비품을 정리하며 안을 둘러봐야 겠다.","artHall":true},
 {"kind":"art-choice","artHall":true},
 {"kind":"dialogue","text":"웬 생뚱맞은 호랑이 그림이?","artHall":true,"speaker":"주인공","inner":false,"artBranch":1,"artImage":"tiger","artFade":true,"clearPortrait":true},
 {"kind":"narration","text":"자동으로 몸이 이끌렸다.","artHall":true,"artBranch":1,"artImage":"tiger"},
 {"kind":"narration","text":"멍하니 구경하고 있는데 옆으로 웬 남자가 다가왔다.","artHall":true,"artBranch":1,"portrait":"soonyoung-body2-smile","silhouette":true},
 {"kind":"dialogue","text":"와! 여기 들어와서 이 그림부터 보는 사람이 있다니!","artHall":true,"speaker":"순영","artBranch":1,"portrait":"soonyoung-body2-smile","maskSpeaker":true},
 {"kind":"dialogue","text":"저 말고 처음 봐요!","artHall":true,"speaker":"순영","artBranch":1,"portrait":"soonyoung-body2-smile","maskSpeaker":true},
 {"kind":"dialogue","text":"잠깐, 호랑이? 호랑이를 닮...","artHall":true,"speaker":"주인공","inner":false,"artBranch":1,"portrait":"soonyoung-body1-smile"},
 {"kind":"dialogue","text":"?...","artHall":true,"speaker":"주인공","inner":false,"artBranch":1,"portrait":"soonyoung-body1-smile"},
 {"kind":"dialogue","text":"아니.. 햄...?","artHall":true,"speaker":"주인공","inner":false,"artBranch":1,"portrait":"soonyoung-body1-smile"},
 {"kind":"dialogue","text":"엥? 무슨 문제라도?","artHall":true,"speaker":"순영","artBranch":1,"portrait":"soonyoung-body1-default","maskSpeaker":true},
 {"kind":"dialogue","text":"햄...","artHall":true,"speaker":"주인공","inner":false,"artBranch":1,"portrait":"soonyoung-body1-default"},
 {"kind":"dialogue","text":"네?","artHall":true,"speaker":"순영","artBranch":1,"portrait":"soonyoung-body1-confused","maskSpeaker":true},
 {"kind":"dialogue","text":"...버거가 먹고 싶네요.","artHall":true,"speaker":"주인공","inner":false,"artBranch":1,"portrait":"soonyoung-body1-confused"},
 {"kind":"dialogue","text":"아 난 또 뭐라고. 권순영이라고 해요.","artHall":true,"speaker":"순영","artBranch":1,"portrait":"soonyoung-body1-smile","revealSoonyoung":true},
 {"kind":"dialogue","text":"김…봉봉입니다.","artHall":true,"speaker":"주인공","inner":false,"artBranch":1,"portrait":"soonyoung-body1-confused"},
 {"kind":"dialogue","text":"네? 봉봉이요? 이름 참 특이하시네.","artHall":true,"speaker":"순영","artBranch":1,"portrait":"soonyoung-body1-confused"},
 {"kind":"dialogue","text":"네 그런 말 자주 들어요.","artHall":true,"speaker":"주인공","inner":false,"artBranch":1,"portrait":"soonyoung-body1-default"},
 {"kind":"dialogue","text":"아, 나쁘단 말 아니에요! 정감 가네요, 엄청. 낯익어요.","artHall":true,"speaker":"순영","artBranch":1,"portrait":"soonyoung-body2-smile"},
 {"kind":"dialogue","text":"뭔가 어디서 들어본 것도 같고…","artHall":true,"speaker":"순영","artBranch":1,"portrait":"soonyoung-body2-thinking"},
 {"kind":"dialogue","text":"(참 웃긴 남자가 다 있네.)","artHall":true,"speaker":"주인공","inner":true,"artBranch":1,"portrait":"soonyoung-body1-default"},
 {"kind":"narration","text":"잠깐 뒤를 돌자 뭔가 느껴진다.","artHall":true,"artBranch":1,"portrait":"soonyoung-body1-glare","silhouette":true},
 {"kind":"dialogue","text":"(흠칫)","artHall":true,"speaker":"주인공","inner":true,"artBranch":1,"portrait":"soonyoung-body1-glare","artAudio":"surprise"},
 {"kind":"narration","text":"날카로운 시선이 느껴지는 것 같다.","artHall":true,"artBranch":1,"portrait":"soonyoung-body1-glare"},
 {"kind":"narration","text":"뒤도니 다시 순박한 얼굴의 권순영이다.","artHall":true,"artBranch":1,"portrait":"soonyoung-body1-smile"},
 {"kind":"narration","text":"화병을 들고 ‘왜용?’하는 표정으로 나를 보고 있다.","artHall":true,"artBranch":1,"portrait":"soonyoung-body2-smile"},
 {"kind":"dialogue","text":"(…수상한데. 틀림없다. 기자의 감이 외치는 거다.)","artHall":true,"speaker":"주인공","inner":true,"artBranch":1,"portrait":"soonyoung-body2-smile"},
 {"kind":"dialogue","text":"(이 사람, 대체 정체가 뭐지?)","artHall":true,"speaker":"주인공","inner":true,"artBranch":1,"clearPortrait":true},
 {"kind":"art-end","artHall":true,"artBranch":1},
 {"kind":"dialogue","text":"어, 무거울 텐데.","artHall":true,"speaker":"명호","artBranch":2,"portrait":"minghao-body1-smile","silhouette":true,"maskSpeaker":true,"clearPortrait":true},
 {"kind":"narration","text":"등 뒤에서 나긋한 목소리가 들린다.","artHall":true,"artBranch":2},
 {"kind":"narration","text":"깜짝 놀라 캔버스를 떨어트릴 뻔했다.","artHall":true,"artBranch":2},
 {"kind":"narration","text":"인기척을 아예 못 느꼈는데. 언제 다가온 거지?","artHall":true,"artBranch":2},
 {"kind":"dialogue","text":"…도와주셔서 감사합니다. 서명호예요.","artHall":true,"speaker":"명호","artBranch":2,"portrait":"minghao-body1-smile","revealMinghao":true},
 {"kind":"dialogue","text":"(이곳 예술당을 담당하는 사제라...)","artHall":true,"speaker":"주인공","inner":true,"artBranch":2,"portrait":"minghao-body1-default"},
 {"kind":"dialogue","text":"(목소리도, 표정도 부드러운데 어쩐지 서늘한 인상을 주는 것 같아.)","artHall":true,"speaker":"주인공","inner":true,"artBranch":2,"portrait":"minghao-body1-default"},
 {"kind":"dialogue","text":"(모델을 했다면 잘 어울렸을 거 같은데…)","artHall":true,"speaker":"주인공","inner":true,"artBranch":2,"portrait":"minghao-body1-default"},
 {"kind":"dialogue","text":"(아니, 다시 보니 이 화실과도 잘 어울린다.)","artHall":true,"speaker":"주인공","inner":true,"artBranch":2,"portrait":"minghao-body1-default"},
 {"kind":"dialogue","text":"그리고 싶은 계시가 있다면 언제든 여기로 오세요.","artHall":true,"speaker":"명호","artBranch":2,"portrait":"minghao-body1-smile"},
 {"kind":"dialogue","text":"신께서는 모두에게 열려 있으니까요.","artHall":true,"speaker":"명호","artBranch":2,"portrait":"minghao-body1-eyesclosed"},
 {"kind":"narration","text":"온화하게 말을 마치고 돌아서는 그의 뒷모습을 유심히 살피게 된다.","artHall":true,"artBranch":2,"clearPortrait":true},
 {"kind":"narration","text":"사제나 화가치고는 손에 굳은살이 지나치게 많다.","artHall":true,"artBranch":2},
 {"kind":"dialogue","text":"(이곳에 자주 드나들다 보면, 그의 비밀을 캘 수 있을지도 모른다.)","artHall":true,"speaker":"주인공","inner":true,"artBranch":2},
 {"kind":"art-end","artHall":true,"artBranch":2},
 {"kind":"narration","text":"물감을 가지러 간다고 둘러댔다.","artHall":true,"artBranch":3,"clearPortrait":true},
 {"kind":"dialogue","text":"예술당 안을 살펴봐야지.","artHall":true,"speaker":"주인공","inner":false,"artBranch":3},
 {"kind":"narration","text":"아무도 이쪽을 신경 쓰지 않는 틈에, 서둘러 복도로 빠져나왔다.","artHall":true,"artBranch":3,"artLocation":"corridor","artFade":true,"artAudio":"walk"},
 {"kind":"narration","text":"이어진 방들 중 <서명호 사제> 팻말이 적힌 문이 눈에 들어왔다.","artHall":true,"artBranch":3,"artLocation":"corridor-door"},
 {"kind":"narration","text":"문고리를 잡았다. 잠겨있지 않다.","artHall":true,"artBranch":3},
 {"kind":"narration","text":"몰래 안으로 들어선다.","artHall":true,"artBranch":3,"artLocation":"office","artFade":true,"artAudio":"door"},
 {"kind":"dialogue","text":"(개인 집무실로 보이는 공간이네...)","artHall":true,"speaker":"주인공","inner":true,"artBranch":3},
 {"kind":"narration","text":"그리다 만 미완성의 캔버스가 끝도 없이 늘어서 있다.","artHall":true,"artBranch":3},
 {"kind":"narration","text":"짙은 초록과 푸른 저녁, 군데군데 노란색과 하얀색 물감이 거칠게 찍혀 있다.","artHall":true,"artBranch":3},
 {"kind":"dialogue","text":"(꼭 밤하늘의 별 같다.)","artHall":true,"speaker":"주인공","inner":true,"artBranch":3},
 {"kind":"dialogue","text":"(...개인 작업인 걸까?)","artHall":true,"speaker":"주인공","inner":true,"artBranch":3},
 {"kind":"narration","text":"이럴 때가 아니지. 시선을 떼고 서둘러 주변을 훑는게 좋겠다.","artHall":true,"artBranch":3},
 {"kind":"narration","text":"물건이 빼곡한 선반이 눈에 들어온다.","artHall":true,"artBranch":3},
 {"kind":"narration","text":"그중 유독 낡은 일기장 하나를 집어 든다.","artHall":true,"artBranch":3,"artBlackout":true,"artFade":true},
 {"kind":"evidence-popup","artHall":true,"artBranch":3,"evidenceId":"destroyed-document-3","evidenceTitle":"파기된 문서3","evidenceDescription":"누군가의 일기. 심하게 훼손되어 읽을 수 있는 페이지가 거의 없다."},
 {"kind":"narration","text":"멀쩡한 장을 찾아 넘겨 보았다.","artHall":true,"artBranch":3,"artImage":"diary-cover"},
 {"kind":"narration","text":"첫 장에는 이렇게 적혀 있었다.","artHall":true,"artBranch":3,"artImage":"diary-cover"},
 {"kind":"dialogue","text":"첫 번째 공양은 …다. 우리 모두 한배를 탔다...?","artHall":true,"speaker":"주인공","inner":false,"artBranch":3,"artImage":"diary-evidence"},
 {"kind":"dialogue","text":"이름에는 재가 묻어 보이지 않네...","artHall":true,"speaker":"주인공","inner":false,"artBranch":3,"artImage":"diary-evidence"},
 {"kind":"narration","text":"일기장은 몰래 안주머니에 숨겨야겠다.","artHall":true,"artBranch":3,"artLocation":"office","artImageClear":true,"artFade":true},
 {"kind":"dialogue","text":"훗날 증거품이 될지도 모르니까.","artHall":true,"speaker":"주인공","inner":false,"artBranch":3},
 {"kind":"dialogue","text":"이제 다시 나가야겠다.","artHall":true,"speaker":"주인공","inner":false,"artBranch":3},
 {"kind":"art-end","artHall":true,"artBranch":3}
);


// V114: special Minghao 60+ branch. Append scenes without shifting saved V113 indices.
scenes.push(
 {"kind": "narration", "text": "예술당 잡무를 도맡다 보니, 어느덧 서명호 사제와 제법 가까워졌다.", "artHall": true, "artBranch": 4, "specialMinghao": true, "clearPortrait": true},
 {"kind": "narration", "text": "속마음을 터놓을 정도는 아니지만, 그래도 내가 누구냐.", "artHall": true, "artBranch": 4, "specialMinghao": true},
 {"kind": "narration", "text": "솜씨 좋은 기자란 말이다.", "artHall": true, "artBranch": 4, "specialMinghao": true},
 {"kind": "narration", "text": "서명호가 조슈아, 문준휘, 최한솔...", "artHall": true, "artBranch": 4, "specialMinghao": true},
 {"kind": "narration", "text": "이 셋과 유독 각별하다는 것도 알아냈다.", "artHall": true, "artBranch": 4, "specialMinghao": true},
 {"kind": "dialogue", "speaker": "주인공", "text": "그 애정이, 겉으로 보이는 것보다 훨씬 깊은 것 같군…", "artHall": true, "artBranch": 4, "specialMinghao": true},
 {"kind": "narration", "text": "오늘도 들어가려던 찰나, 남자 둘이 언성을 높이는 소리가 들린다.", "artHall": true, "artBranch": 4, "specialMinghao": true, "duo": ["hansol-body2-mocking", "minghao-body1-flustered"], "duoMask": "both"},
 {"kind": "narration", "text": "재빨리 나무 뒤로 숨어야겠다.", "artHall": true, "artBranch": 4, "specialMinghao": true, "duo": ["hansol-body2-mocking", "minghao-body1-flustered"], "duoMask": "both"},
 {"kind": "dialogue", "speaker": "주인공", "text": "대체 무슨 일이지?", "artHall": true, "artBranch": 4, "specialMinghao": true, "duo": ["hansol-body2-mocking", "minghao-body1-flustered"], "duoMask": "both"},
 {"kind": "dialogue", "speaker": "주인공", "text": "서명호 사제와 목에 핏대를 세우며 싸우는 건…", "artHall": true, "artBranch": 4, "specialMinghao": true, "duo": ["hansol-body2-mocking", "minghao-body1-flustered"], "duoMask": "hansol"},
 {"kind": "dialogue", "speaker": "주인공", "text": "최한솔 사제잖아?", "artHall": true, "artBranch": 4, "specialMinghao": true, "duo": ["hansol-body2-mocking", "minghao-body1-flustered"], "duoMask": "none", "specialMeetHansol": true},
 {"kind": "dialogue", "speaker": "한솔", "text": "형. 몇 번을 말해야 알아들어.", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "hansol-body3-mocking"},
 {"kind": "dialogue", "speaker": "한솔", "text": "여기 남아있는 게 훨씬 좋다니까?", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "hansol-body3-mocking"},
 {"kind": "dialogue", "speaker": "한솔", "text": "여기서 원하는 그림도 마음껏 그릴 수 있는데, 대체 뭐가 불만인데?", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "hansol-body2-mocking"},
 {"kind": "dialogue", "speaker": "명호", "text": "원하는 그림?", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "minghao-body3-angry"},
 {"kind": "dialogue", "speaker": "명호", "text": "너 지금 이 미친 꽃대가리 그림이 원하는 그림으로 보여?", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "minghao-body3-angry", "boldAll": true, "fontScale": 1.25},
 {"kind": "dialogue", "speaker": "명호", "text": "내가 그리고 싶은 건 내 감정이고 내 마음이지!", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "minghao-body3-angry", "boldAll": true, "fontScale": 1.3},
 {"kind": "dialogue", "speaker": "명호", "text": "이 사람 세뇌하는 곳의 가짜 신앙 따위가 아니야!", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "minghao-body3-angry", "boldAll": true, "fontScale": 1.35},
 {"kind": "dialogue", "speaker": "명호", "text": "한솔아, 제발…. 우리는 대체 여기서 뭘 얻을 수 있어?", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "minghao-body3-eyesclosed"},
 {"kind": "dialogue", "speaker": "한솔", "text": "뭘 얻긴? 확실한 안전이지.", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "hansol-body3-mocking"},
 {"kind": "dialogue", "speaker": "한솔", "text": "안전한 것 중에 가장 확실한, 그리고 확실한 것 중에 가장 안전한.", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "hansol-body3-mocking", "boldAll": true},
 {"kind": "dialogue", "speaker": "한솔", "text": "또 도망이나 다니면서 살고 싶은 건 아니지?", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "hansol-body2-annoyed", "boldAll": true, "fontScale": 1.3},
 {"kind": "dialogue", "speaker": "주인공", "text": "(…도대체 무슨 얘기를 하는 거지? 안전? 도망?)", "artHall": true, "artBranch": 4, "specialMinghao": true, "duo": ["hansol-body2-annoyed", "minghao-body3-eyesclosed"]},
 {"kind": "dialogue", "speaker": "주인공", "text": "(대체 저들 정체가 뭐야?)", "artHall": true, "artBranch": 4, "specialMinghao": true, "duo": ["hansol-body2-annoyed", "minghao-body3-eyesclosed"]},
 {"kind": "dialogue", "speaker": "한솔", "text": "그렇게 나가고 싶어? 그럼 준휘 형한테 말해.", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "hansol-body2-annoyed", "boldWord": "준휘 형"},
 {"kind": "dialogue", "speaker": "한솔", "text": "그까짓 외출쯤이야 그 형 손 쓰면 쉽게 되는 걸 왜 자꾸…", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "hansol-body2-annoyed", "redWord": "외출"},
 {"kind": "dialogue", "speaker": "한솔", "text": "…답답할 때마다 문준휘가 몰래 몰래 내보내 줬잖아.", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "hansol-body2-default"},
 {"kind": "dialogue", "speaker": "한솔", "text": "교주도 딱히 관심 없어 보이고.", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "hansol-body2-default"},
 {"kind": "dialogue", "speaker": "명호", "text": "그건 나도 알아! 하지만.", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "minghao-body1-flustered"},
 {"kind": "dialogue", "speaker": "한솔", "text": "형. 진짜 진지하게, 여기 나가서 혼자 살 수 있어? 지금 당장.", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "hansol-body2-default"},
 {"kind": "dialogue", "speaker": "명호", "text": "…….", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "minghao-body1-flustered"},
 {"kind": "dialogue", "speaker": "한솔", "text": "지금 여기서 나가고 싶어 하는 건 형밖에 없어. 그거 하나만 알아 둬.", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "hansol-body2-mocking"},
 {"kind": "narration", "text": "더 오래 있다간 들키겠다. 재빨리 자리를 빠져나가야 한다.", "artHall": true, "artBranch": 4, "specialMinghao": true, "artFade": true, "clearPortrait": true},
 {"kind": "narration", "text": "심장이 쿵쾅거렸다.", "artHall": true, "artBranch": 4, "specialMinghao": true, "artBlackout": true},
 {"kind": "dialogue", "speaker": "주인공", "text": "세상에, 방금 뭘 들은 거지.", "artHall": true, "artBranch": 4, "specialMinghao": true, "artBlackout": true},
 {"kind": "narration", "text": "그러니까 서명호는 사제임에도 불구하고, 카밀레교에 불만을 품고 있다.", "artHall": true, "artBranch": 4, "specialMinghao": true, "artBlackout": true, "boldPhrase": "카밀레교에 불만을 품고 있다."},
 {"kind": "dialogue", "speaker": "명호", "text": "내가 그리고 싶은 건 내 감정이고 내 마음이지!", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "minghao-body3-angry", "boldAll": true, "fontScale": 1.3, "recall": true},
 {"kind": "dialogue", "speaker": "명호", "text": "이 사람 세뇌하는 곳의 가짜 신앙 따위가 아니야!", "artHall": true, "artBranch": 4, "specialMinghao": true, "portrait": "minghao-body3-angry", "boldAll": true, "fontScale": 1.35, "recall": true},
 {"kind": "dialogue", "speaker": "주인공", "text": "(이걸 어떻게 잘 이용해볼 수 있을까?)", "artHall": true, "artBranch": 4, "specialMinghao": true, "clearPortrait": true},
 {"kind": "dialogue", "speaker": "주인공", "text": "(오늘 고해성사는 골치 아프게 생겼네.)", "artHall": true, "artBranch": 4, "specialMinghao": true},
 {"kind": "art-end", "artHall": true, "artBranch": 4, "specialMinghao": true}
);

const sceneBackdropRanges=[
 {start:5,end:17,file:"bg-van-interior.png"},
 {start:18,end:57,file:"bg-forest-path.png"},
 {start:58,end:62,file:"bg-village-front.png"},
 {start:63,end:68,file:"bg-sanctuary-front.png"},
 {start:69,end:94,file:"bg-sanctuary-inside.png"},
 {start:95,end:99,file:"bg-confession-outside.png"},
 {start:100,end:133,file:"bg-confession-inside.png"},
 {start:134,end:139,file:"bg-living-quarters-interior.png"},
 {start:140,end:143,file:"bg-central-square.png"},
 {start:150,end:172,file:"bg-central-square.png"}
];
function getSceneBackdrop(sceneNumber,scene){
 if(scene&&scene.backdrop)return scene.backdrop;
 for(const range of sceneBackdropRanges){
  if(sceneNumber>=range.start && sceneNumber<=range.end)return range.file;
 }
 return "";
}
const style=document.createElement('style');style.textContent=`
/* V114 -- special scene two-character composition and memory presentation */
#shindo-vn .vn-duo{position:absolute;inset:0;z-index:2;pointer-events:none;overflow:hidden;display:none}
#shindo-vn .vn-duo.is-active{display:block}
#shindo-vn .vn-duo img{position:absolute;bottom:clamp(155px,23vh,245px);height:min(47vh,560px);width:auto;max-width:48vw;object-fit:contain;object-position:bottom;transform-origin:center bottom}
#shindo-vn .vn-duo .duo-left{left:31%;transform:translateX(-50%)}
#shindo-vn .vn-duo .duo-right{left:69%;transform:translateX(-50%)}
#shindo-vn .vn-duo img.is-shadow{filter:brightness(0)!important}
#shindo-vn.is-recall .vn-portrait{filter:grayscale(1) brightness(.75)!important}
#shindo-vn.is-recall .vn-box{filter:grayscale(1)}
#shindo-vn.is-recall .vn-text{color:#b9b9b9!important}
#shindo-vn .special-memory-kicker{position:absolute;top:11%;left:50%;transform:translateX(-50%);color:#888;letter-spacing:.24em;font-size:12px;z-index:8;display:none}
#shindo-vn.is-recall .special-memory-kicker{display:block}
#shindo-vn .art-branch-options .shindo-special-test{border:1px dashed #956868!important;color:#e0b0b0!important;margin-top:13px}
@media(max-width:650px){#shindo-vn .vn-duo img{height:min(32vh,375px);width:auto;max-width:47vw;bottom:clamp(165px,21vh,230px)}#shindo-vn .vn-duo .duo-left{left:29%}#shindo-vn .vn-duo .duo-right{left:71%}}

#shindo-vn{position:fixed;inset:0;z-index:30000;background:transparent;color:#fff;display:none;align-items:flex-end;justify-content:center;font-family:Pretendard,'Pretendard Variable',system-ui,sans-serif;cursor:pointer;touch-action:manipulation;user-select:none}
#shindo-vn.active{display:flex;animation:shindo-story-fade-in 1.1s ease both}@keyframes shindo-story-fade-in{from{opacity:0}to{opacity:1}}
#shindo-vn.day{background:transparent;transition:background 2s}
#shindo-vn .vn-box{width:min(1000px,calc(100% - 36px));min-height:155px;margin:0 auto clamp(40px,10vh,110px);border:1px solid #777;background:rgba(15,16,18,.985);border-radius:8px;padding:30px 34px 27px;box-sizing:border-box;display:flex;align-items:center;position:relative;line-height:1.85;font-size:clamp(16px,1.65vw,20px);letter-spacing:-.055em}
#shindo-vn .vn-box:after{content:'▼';position:absolute;right:20px;bottom:10px;font-size:11px;color:#aaa;animation:vn-pulse 1.2s infinite}
#shindo-vn .vn-center{align-self:center;margin:auto;text-align:center;font-size:clamp(27px,5vw,52px);font-weight:700;letter-spacing:-.055em}
#shindo-vn .vn-hint{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);color:#aaa;font-size:12px;white-space:nowrap}
@keyframes vn-pulse{50%{opacity:.25}}
@media(max-width:750px){#shindo-vn .vn-box{padding:19px 17px 26px;min-height:145px;margin-bottom:calc(35px + env(safe-area-inset-bottom));font-size:14px;letter-spacing:-.065em;line-height:1.7}#shindo-vn .vn-center{font-size:clamp(27px,8vw,40px);letter-spacing:-.065em}#shindo-vn .vn-hint{font-size:10px}}

#shindo-vn .vn-box{z-index:2;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding-top:38px}
#shindo-vn .vn-speaker{position:absolute;top:-18px;left:25px;padding:5px 19px;border:1px solid #777;border-radius:6px;background:#202124;font-weight:700;font-size:16px;min-width:54px;text-align:center}
#shindo-vn .vn-speaker:empty{display:none}
#shindo-vn .vn-portrait{position:absolute;bottom:clamp(160px,23vh,245px);left:50%;transform:translate(var(--portrait-offset-x,-50%),var(--portrait-offset-y,0px)) scale(var(--portrait-scale,1));transform-origin:center bottom;height:min(66vh,740px);width:auto;max-width:95vw;object-fit:contain;object-position:center bottom;pointer-events:none;z-index:1}
#shindo-vn .vn-portrait[hidden]{display:none}
/* v91: Fade Wonwoo's portrait after the complete question, then cut the background to black. */
#shindo-vn .vn-portrait.vn-question-fade{opacity:0;transition:opacity .75s ease-in-out}
#shindo-vn .vn-box{position:relative}
#shindo-vn.confession-blackout .vn-box{z-index:6!important}
#shindo-vn.confession-blackout .vn-hint{z-index:6!important}
#shindo-vn .vn-text{position:relative;z-index:2}
#shindo-vn.sanctuary{background:transparent!important;color:#fff;transition:background 1.2s ease;isolation:isolate}
#shindo-vn.sanctuary::before{content:none!important}
#shindo-vn.sanctuary .vn-box,#shindo-vn.sanctuary .vn-portrait,#shindo-vn.sanctuary .vn-illustration,#shindo-vn.sanctuary .vn-hint{z-index:2}
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

/* v71: The story layer must remain fully opaque during the confession flash.
   Otherwise the underlying SVTER mail-login screen can bleed through. */
#shindo-vn.active{animation:none!important;opacity:1!important}
#shindo-vn.confession-blackout{background-color:#000!important;background-image:none!important;opacity:1!important;isolation:isolate}
#shindo-vn.confession-blackout{background:#000!important}
#shindo-vn.confession-fade:before{content:"";position:absolute;inset:0;background:#000;z-index:5;animation:shindo-confession-flash 1.1s ease both;pointer-events:none}
@keyframes shindo-confession-flash{0%{opacity:0}45%{opacity:1}100%{opacity:0}}
@keyframes day2-screen-shake{0%,100%{transform:translate(0,0)}20%{transform:translate(-9px,5px)}40%{transform:translate(8px,-5px)}60%{transform:translate(-5px,-4px)}80%{transform:translate(5px,3px)}}
#shindo-vn.day2-shake .vn-box{animation:day2-screen-shake .32s linear 5}
#shindo-vn .shindo-choices{position:absolute;z-index:8;left:50%;top:50%;transform:translate(-50%,-50%);width:min(610px,calc(100vw - 36px));padding:30px 28px;background:#141414;border:1px solid #555;border-radius:8px;display:none;flex-direction:column;gap:14px;animation:vn-image-appear 1.2s ease both;box-sizing:border-box;text-align:center}
#shindo-vn .shindo-choices h2{font-size:clamp(22px,3vw,32px);margin:0;color:white}
#shindo-vn .shindo-choices p{font-size:15px;color:#bbb;margin:0 0 12px}
#shindo-vn .shindo-choices button{border:1px solid #555;border-radius:5px;background:#202020;color:white;text-align:left;padding:16px;font:inherit;font-size:clamp(14px,1.6vw,17px);cursor:pointer}
#shindo-vn .shindo-choices button:hover{background:#333;border-color:#999}
#shindo-vn .shindo-choices .shindo-day1-restart{margin-top:8px;text-align:center;font-size:clamp(12px,1.4vw,14px);color:#bbb;background:#242424;border:1px dashed #666;padding:12px 10px;letter-spacing:-.045em}
#shindo-vn .shindo-ending{position:absolute;inset:0;z-index:15;background:#000;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;padding:24px;box-sizing:border-box;cursor:default}
#shindo-vn .shindo-ending-copy{animation:vn-image-appear 1s ease both;max-width:900px}
#shindo-vn .shindo-ending h1{font-family:serif;font-size:clamp(72px,12vw,140px);color:#c00000;margin:0 0 28px;line-height:1.2}
#shindo-vn .shindo-ending-title-image{display:block;width:min(32vw,240px);max-width:100%;height:auto;margin:0 auto 10px;animation:vn-image-appear 1s ease both}
#shindo-vn .shindo-ending p{font-size:clamp(14px,1.6vw,19px);line-height:1.8;color:#fff;margin:0}
#shindo-vn .shindo-ending-logo{font-family:serif;font-size:clamp(64px,12vw,145px);font-weight:800;color:#bd0000;animation:vn-image-appear 1s ease both}
#shindo-vn .shindo-ending-logo span{font-size:.65em;margin-left:.08em}
#shindo-vn .shindo-restart{position:absolute;top:calc(50% + 115px);left:50%;transform:translateX(-50%);background:transparent;border:1px solid #999;color:#fff;padding:14px 26px;font:600 17px Pretendard,sans-serif;cursor:pointer;white-space:nowrap;animation:vn-image-appear 1s ease both}

/* v74: independent opaque backing guarantees the mail UI cannot bleed through transitions. */
#shindo-story-backdrop{position:fixed;inset:0;z-index:29999;background:#050607 center center / cover no-repeat;display:none;opacity:1;pointer-events:none;transition:opacity .38s ease}
#shindo-story-backdrop.visible{display:block}
/* V127: The opaque shield stays visible when only the photograph fades.
   It prevents the underlying mail/login UI from bleeding into scene transitions. */
#shindo-story-underlay{position:fixed;inset:0;z-index:29998;background:#000;pointer-events:none;display:none;opacity:1}
#shindo-story-underlay.visible{display:block}
#shindo-vn.sleep-fadeout::after,#shindo-vn.sleep-fadein::after{content:"";position:absolute;inset:0;background:#000;pointer-events:none}
#shindo-vn.sleep-fadeout::after{z-index:6;animation:shindo-sleep-fadeout .95s ease forwards}
#shindo-vn.sleep-fadein::after{z-index:1;animation:shindo-sleep-fadein .95s ease forwards}
@keyframes shindo-sleep-fadeout{from{opacity:0}to{opacity:1}}
@keyframes shindo-sleep-fadein{from{opacity:1}to{opacity:0}}
#shindo-vn,#shindo-vn.active{opacity:1!important;filter:none!important;mix-blend-mode:normal!important}
/* v84: Keep the story overlay transparent so scene photography in #shindo-story-backdrop remains visible. */
#shindo-vn.day:not(.confession-blackout){background-color:transparent!important;background-image:none!important}
#shindo-vn.confession-fade:before{background:#000!important}
/* v78: Fade only the scene/background artwork, never the dialogue UI.
   Keep the blackout opaque so the underlying SVTER login stays hidden. */
#shindo-vn.confession-fade::before{z-index:1!important}
#shindo-vn.confession-fade .vn-portrait,
#shindo-vn.confession-fade .vn-illustration{z-index:0!important}
#shindo-vn.confession-fade .vn-box,
#shindo-vn.confession-fade .vn-hint,
#shindo-vn.confession-fade .vn-center{z-index:6!important}


#shindo-vn .vn-portrait.prayer-silhouette{filter:brightness(0) invert(.18)!important;opacity:.95}
#shindo-vn .shindo-prayer-grid{width:min(660px,calc(100vw - 36px))}
#shindo-vn .shindo-prayer-grid .shindo-morning-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
#shindo-vn .shindo-prayer-grid .shindo-morning-options button{text-align:center;min-width:0}
@media(max-width:450px){#shindo-vn .shindo-prayer-grid .shindo-morning-options{gap:8px}#shindo-vn .shindo-prayer-grid .shindo-morning-options button{font-size:13px;padding:14px 8px}}

/* v105: Art Hall and reusable evidence acquisition UI */

/* V119: Normalized portraits for the Minghao special branch, without changing other story characters. */
#shindo-vn .vn-portrait.special-solo{height:min(56vh,650px)!important;max-width:none!important;width:auto!important;--portrait-scale:1!important;--portrait-offset-x:-50%!important;--portrait-offset-y:0px!important;bottom:clamp(160px,23vh,245px)!important;object-fit:contain}
@media(max-width:750px){#shindo-vn .vn-portrait.special-solo{height:min(49vh,600px)!important;bottom:170px!important}}

#shindo-vn .vn-portrait.art-silhouette{filter:brightness(0)!important}
#shindo-vn .shindo-evidence-overlay{position:absolute;inset:0;z-index:32;background:#000;display:flex;align-items:center;justify-content:center;padding:22px;box-sizing:border-box;cursor:default}
#shindo-vn .shindo-evidence-card{width:min(560px,100%);background:#101012;border:1px solid #5a5a5d;border-radius:9px;padding:30px 25px;color:#fff;text-align:center;display:flex;flex-direction:column;align-items:center;gap:19px;box-sizing:border-box;animation:vn-image-appear .65s ease both}
#shindo-vn .shindo-evidence-kicker{font-size:13px;color:#aaa;letter-spacing:-.02em}
#shindo-vn .shindo-evidence-title{font-size:clamp(22px,4vw,31px);font-weight:750;line-height:1.5;letter-spacing:-.055em}
#shindo-vn .shindo-evidence-desc{font-size:clamp(14px,1.7vw,17px);color:#ccc;line-height:1.8;letter-spacing:-.045em}
#shindo-vn .shindo-evidence-confirm{background:#252529;border:1px solid #666;border-radius:6px;padding:12px 34px;color:#fff;font:inherit;cursor:pointer}
#shindo-vn .shindo-evidence-confirm:hover{background:#333}
#shindo-vn .art-branch-options{display:grid;grid-template-columns:1fr;gap:11px}
#shindo-vn .art-branch-options button{text-align:center}
#shindo-vn .shindo-choices .shindo-morning-return{font-size:clamp(13px,1.6vw,16px);text-align:center}
`;document.head.appendChild(style);
const storyUnderlay=document.createElement('div');storyUnderlay.id='shindo-story-underlay';document.body.appendChild(storyUnderlay);
const storyBackdrop=document.createElement('div');storyBackdrop.id='shindo-story-backdrop';document.body.appendChild(storyBackdrop);
let currentSceneBackdropKey="";
let backdropSwapTimer=null;
function setSceneBackdropImage(file){
 if(file){
  storyBackdrop.style.backgroundImage=`linear-gradient(rgba(0,0,0,.28),rgba(0,0,0,.46)), url("story-backgrounds/${file}")`;
 }else{
  storyBackdrop.style.backgroundImage='linear-gradient(rgba(5,6,7,1),rgba(5,6,7,1))';
 }
}
function applySceneBackdrop(sceneIndex,scene){
 const file=getSceneBackdrop(sceneIndex+1,scene);
 const key=file||'__none';
 if(currentSceneBackdropKey===key)return;
 currentSceneBackdropKey=key;
 if(backdropSwapTimer){clearTimeout(backdropSwapTimer);backdropSwapTimer=null}
 if(!storyBackdrop.dataset.backdropReady){
  setSceneBackdropImage(file);
  storyBackdrop.dataset.backdropReady='1';
  storyBackdrop.style.opacity='1';
  return;
 }
 storyBackdrop.style.opacity='0';
 backdropSwapTimer=setTimeout(()=>{
  setSceneBackdropImage(file);
  requestAnimationFrame(()=>{storyBackdrop.style.opacity='1'});
 },220);
}
const overlay=document.createElement('div');overlay.id='shindo-vn';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-label','1일차 스토리');overlay.innerHTML='<div class="vn-box"><span class="vn-text"></span></div><div class="vn-hint">화면을 터치하거나 클릭하여 진행</div>';document.body.appendChild(overlay);
const box=overlay.querySelector('.vn-box'),content=overlay.querySelector('.vn-text');
const portrait=document.createElement('img');portrait.className='vn-portrait';portrait.alt='';portrait.hidden=true;overlay.insertBefore(portrait,box);
const speakerTag=document.createElement('div');speakerTag.className='vn-speaker';box.insertBefore(speakerTag,content);
let currentPortrait='',revealed=false;
const portraits={};
const DEFAULT_PORTRAIT_PROFILE={scale:1,x:'-50%',y:'0px',bottom:'',height:'',maxWidth:''};
const PORTRAIT_PROFILES=[
 {match:/^hansol-/,scale:1.04,y:'0px',height:'min(60vh,620px)'},
 {match:/^soonyoung-/,scale:1.02},
 {match:/^minghao-/,scale:1.04,y:'0px',height:'min(60vh,620px)'},
 {match:/^wonwoo-/,scale:1.08},
 {match:/^jihoon-/,scale:1.03},
 {match:/^seungcheol-/,scale:.97},
 {match:/^seokmin-/,scale:1},
 {match:/^chan-/,scale:1},
 {match:/^elder-/,scale:1.02}
];
function getPortraitProfile(name){
 const hit=PORTRAIT_PROFILES.find(profile=>profile.match.test(name||''))||{};
 return Object.assign({},DEFAULT_PORTRAIT_PROFILE,hit);
}
function applyPortraitProfile(name){
 const profile=getPortraitProfile(name);
 portrait.style.setProperty('--portrait-scale',String(profile.scale??1));
 portrait.style.setProperty('--portrait-offset-x',profile.x||'-50%');
 portrait.style.setProperty('--portrait-offset-y',profile.y||'0px');
 portrait.style.bottom=profile.bottom||'';
 portrait.style.height=profile.height||'';
 portrait.style.maxWidth=profile.maxWidth||'';
 // Use a consistent display box for all expressions of the same character.
 portrait.style.width='auto';
}
// V136: the official artwork folder is the ONLY source for character portraits.
// Add future expressions by choosing a key from this complete 212-image registry.
const OFFICIAL_PORTRAITS=Object.freeze({"chan-body1-default":"chan/찬_바디1_기본.png","chan-body1-desperate":"chan/찬_바디1_절박.png","chan-body1-determined":"chan/찬_바디1_의지가득.png","chan-body1-dismissive":"chan/찬_바디1_무시.png","chan-body1-eyesmile":"chan/찬_바디1_눈웃음.png","chan-body1-jealous":"chan/찬_바디1_질투.png","chan-body1-smile":"chan/찬_바디1_미소.png","chan-body2-default":"chan/찬_바디2_기본.png","chan-body2-desperate":"chan/찬_바디2_절박.png","chan-body2-determined":"chan/찬_바디2_의지가득.png","chan-body2-dismissive":"chan/찬_바디2_무시.png","chan-body2-eyesmile":"chan/찬_바디2_눈웃음.png","chan-body2-jealous":"chan/찬_바디2_질투.png","chan-body2-smile":"chan/찬_바디2_미소.png","chan-body3-default":"chan/찬_바디3_기본.png","chan-body3-desperate":"chan/찬_바디3_절박.png","chan-body3-determined":"chan/찬_바디3_의지가득.png","chan-body3-dismissive":"chan/찬_바디3_무시.png","chan-body3-eyesmile":"chan/찬_바디3_눈웃음.png","chan-body3-jealous":"chan/찬_바디3_질투.png","chan-body3-smile":"chan/찬_바디3_미소.png","chan/찬_바디1_기본":"chan/찬_바디1_기본.png","chan/찬_바디1_눈웃음":"chan/찬_바디1_눈웃음.png","chan/찬_바디1_무시":"chan/찬_바디1_무시.png","chan/찬_바디1_미소":"chan/찬_바디1_미소.png","chan/찬_바디1_의지가득":"chan/찬_바디1_의지가득.png","chan/찬_바디1_절박":"chan/찬_바디1_절박.png","chan/찬_바디1_질투":"chan/찬_바디1_질투.png","chan/찬_바디2_기본":"chan/찬_바디2_기본.png","chan/찬_바디2_눈웃음":"chan/찬_바디2_눈웃음.png","chan/찬_바디2_무시":"chan/찬_바디2_무시.png","chan/찬_바디2_미소":"chan/찬_바디2_미소.png","chan/찬_바디2_의지가득":"chan/찬_바디2_의지가득.png","chan/찬_바디2_절박":"chan/찬_바디2_절박.png","chan/찬_바디2_질투":"chan/찬_바디2_질투.png","chan/찬_바디3_기본":"chan/찬_바디3_기본.png","chan/찬_바디3_눈웃음":"chan/찬_바디3_눈웃음.png","chan/찬_바디3_무시":"chan/찬_바디3_무시.png","chan/찬_바디3_미소":"chan/찬_바디3_미소.png","chan/찬_바디3_의지가득":"chan/찬_바디3_의지가득.png","chan/찬_바디3_절박":"chan/찬_바디3_절박.png","chan/찬_바디3_질투":"chan/찬_바디3_질투.png","duo-hansol-body2-annoyed":"hansol/한솔_바디2_귀찮음.png","duo-hansol-body2-mocking":"hansol/한솔_바디2_비아냥.png","duo-minghao-body1-angry":"minghao/명호_바디1_분노.png","duo-minghao-body2-flustered":"minghao/명호_바디2_당황.png","elder-default":"elder/노인네_기본.png","elder-frown":"elder/노인네_찌푸림.png","elder-furious":"elder/노인네_극대노.png","elder/노인네_극대노":"elder/노인네_극대노.png","elder/노인네_기본":"elder/노인네_기본.png","elder/노인네_찌푸림":"elder/노인네_찌푸림.png","hansol-body1-annoyed":"hansol/한솔_바디1_귀찮음.png","hansol-body1-annoyed-v103":"hansol/한솔_바디1_귀찮음.png","hansol-body1-default":"hansol/한솔_바디1_기본.png","hansol-body1-default-v103":"hansol/한솔_바디1_기본.png","hansol-body1-eyesmile":"hansol/한솔_바디1_눈웃음.png","hansol-body1-madness":"hansol/한솔_바디1_광기.png","hansol-body1-mocking":"hansol/한솔_바디1_비아냥.png","hansol-body1-rapture":"hansol/한솔_바디1_휴거.png","hansol-body1-smile":"hansol/한솔_바디1_미소.png","hansol-body1-smile-v103":"hansol/한솔_바디1_미소.png","hansol-body1-thinking":"hansol/한솔_바디1_고민.png","hansol-body2-annoyed":"hansol/한솔_바디2_귀찮음.png","hansol-body2-default":"hansol/한솔_바디2_기본.png","hansol-body2-eyesmile":"hansol/한솔_바디2_눈웃음.png","hansol-body2-madness":"hansol/한솔_바디2_광기.png","hansol-body2-mocking":"hansol/한솔_바디2_비아냥.png","hansol-body2-rapture":"hansol/한솔_바디2_휴거.png","hansol-body2-smile":"hansol/한솔_바디2_미소.png","hansol-body2-thinking":"hansol/한솔_바디2_고민.png","hansol-body3-annoyed":"hansol/한솔_바디3_귀찮음.png","hansol-body3-default":"hansol/한솔_바디3_기본.png","hansol-body3-eyesmile":"hansol/한솔_바디3_눈웃음.png","hansol-body3-madness":"hansol/한솔_바디3_광기.png","hansol-body3-mocking":"hansol/한솔_바디3_비아냥.png","hansol-body3-rapture":"hansol/한솔_바디3_휴거.png","hansol-body3-smile":"hansol/한솔_바디3_미소.png","hansol-body3-thinking":"hansol/한솔_바디3_고민.png","hansol/한솔_바디1_고민":"hansol/한솔_바디1_고민.png","hansol/한솔_바디1_광기":"hansol/한솔_바디1_광기.png","hansol/한솔_바디1_귀찮음":"hansol/한솔_바디1_귀찮음.png","hansol/한솔_바디1_기본":"hansol/한솔_바디1_기본.png","hansol/한솔_바디1_눈웃음":"hansol/한솔_바디1_눈웃음.png","hansol/한솔_바디1_미소":"hansol/한솔_바디1_미소.png","hansol/한솔_바디1_비아냥":"hansol/한솔_바디1_비아냥.png","hansol/한솔_바디1_휴거":"hansol/한솔_바디1_휴거.png","hansol/한솔_바디2_고민":"hansol/한솔_바디2_고민.png","hansol/한솔_바디2_광기":"hansol/한솔_바디2_광기.png","hansol/한솔_바디2_귀찮음":"hansol/한솔_바디2_귀찮음.png","hansol/한솔_바디2_기본":"hansol/한솔_바디2_기본.png","hansol/한솔_바디2_눈웃음":"hansol/한솔_바디2_눈웃음.png","hansol/한솔_바디2_미소":"hansol/한솔_바디2_미소.png","hansol/한솔_바디2_비아냥":"hansol/한솔_바디2_비아냥.png","hansol/한솔_바디2_휴거":"hansol/한솔_바디2_휴거.png","hansol/한솔_바디3_고민":"hansol/한솔_바디3_고민.png","hansol/한솔_바디3_광기":"hansol/한솔_바디3_광기.png","hansol/한솔_바디3_귀찮음":"hansol/한솔_바디3_귀찮음.png","hansol/한솔_바디3_기본":"hansol/한솔_바디3_기본.png","hansol/한솔_바디3_눈웃음":"hansol/한솔_바디3_눈웃음.png","hansol/한솔_바디3_미소":"hansol/한솔_바디3_미소.png","hansol/한솔_바디3_비아냥":"hansol/한솔_바디3_비아냥.png","hansol/한솔_바디3_휴거":"hansol/한솔_바디3_휴거.png","jeonghan-body1-default":"jeonghan/정한_바디1_기본.png","jeonghan-body1-eyesmile":"jeonghan/정한_바디1_눈웃음.png","jeonghan-body1-flustered":"jeonghan/정한_바디1_당황.png","jeonghan-body1-smile":"jeonghan/정한_바디1_미소.png","jeonghan-body1-subtle":"jeonghan/정한_바디1_미묘.png","jeonghan-body2-default":"jeonghan/정한_바디2_기본.png","jeonghan-body2-eyesmile":"jeonghan/정한_바디2_눈웃음.png","jeonghan-body2-flustered":"jeonghan/정한_바디2_당황.png","jeonghan-body2-smile":"jeonghan/정한_바디2_미소.png","jeonghan-body2-subtle":"jeonghan/정한_바디2_미묘.png","jeonghan/정한_바디1_기본":"jeonghan/정한_바디1_기본.png","jeonghan/정한_바디1_눈웃음":"jeonghan/정한_바디1_눈웃음.png","jeonghan/정한_바디1_당황":"jeonghan/정한_바디1_당황.png","jeonghan/정한_바디1_미묘":"jeonghan/정한_바디1_미묘.png","jeonghan/정한_바디1_미소":"jeonghan/정한_바디1_미소.png","jeonghan/정한_바디2_기본":"jeonghan/정한_바디2_기본.png","jeonghan/정한_바디2_눈웃음":"jeonghan/정한_바디2_눈웃음.png","jeonghan/정한_바디2_당황":"jeonghan/정한_바디2_당황.png","jeonghan/정한_바디2_미묘":"jeonghan/정한_바디2_미묘.png","jeonghan/정한_바디2_미소":"jeonghan/정한_바디2_미소.png","jihoon-body1-default":"jihoon/지훈_바디1_기본.png","jihoon-body1-eyesmile":"jihoon/지훈_바디1_눈웃음.png","jihoon-body1-flustered":"jihoon/지훈_바디1_당황.png","jihoon-body1-serious":"jihoon/지훈_바디1_정색.png","jihoon-body1-smile":"jihoon/지훈_바디1_미소.png","jihoon-body2-default":"jihoon/지훈_바디2_기본.png","jihoon-body2-eyesmile":"jihoon/지훈_바디2_눈웃음.png","jihoon-body2-flustered":"jihoon/지훈_바디2_당황.png","jihoon-body2-serious":"jihoon/지훈_바디2_정색.png","jihoon-body2-smile":"jihoon/지훈_바디2_미소.png","jihoon/지훈_바디1_기본":"jihoon/지훈_바디1_기본.png","jihoon/지훈_바디1_눈웃음":"jihoon/지훈_바디1_눈웃음.png","jihoon/지훈_바디1_당황":"jihoon/지훈_바디1_당황.png","jihoon/지훈_바디1_미소":"jihoon/지훈_바디1_미소.png","jihoon/지훈_바디1_정색":"jihoon/지훈_바디1_정색.png","jihoon/지훈_바디2_기본":"jihoon/지훈_바디2_기본.png","jihoon/지훈_바디2_눈웃음":"jihoon/지훈_바디2_눈웃음.png","jihoon/지훈_바디2_당황":"jihoon/지훈_바디2_당황.png","jihoon/지훈_바디2_미소":"jihoon/지훈_바디2_미소.png","jihoon/지훈_바디2_정색":"jihoon/지훈_바디2_정색.png","joshua-바디-member-광기-leader":"joshua/조슈아_바디(신도)_광기(교주).png","joshua-바디-member-기본-leader":"joshua/조슈아_바디(신도)_기본(교주).png","joshua-바디-member-기본-member":"joshua/조슈아_바디(신도)_기본(신도).png","joshua-바디-member-미소":"joshua/조슈아_바디(신도)_미소.png","joshua-바디-member-미소-leader":"joshua/조슈아_바디(신도)_미소(교주).png","joshua-바디1-leader-광기-leader":"joshua/조슈아_바디1(교주)_광기(교주).png","joshua-바디1-leader-기본-leader":"joshua/조슈아_바디1(교주)_기본(교주).png","joshua-바디1-leader-기본-member":"joshua/조슈아_바디1(교주)_기본(신도).png","joshua-바디1-leader-미소":"joshua/조슈아_바디1(교주)_미소.png","joshua-바디1-leader-미소-leader":"joshua/조슈아_바디1(교주)_미소(교주).png","joshua-바디2-leader-광기-leader":"joshua/조슈아_바디2(교주)_광기(교주).png","joshua-바디2-leader-기본-leader":"joshua/조슈아_바디2(교주)_기본(교주).png","joshua-바디2-leader-기본-member":"joshua/조슈아_바디2(교주)_기본(신도).png","joshua-바디2-leader-미소":"joshua/조슈아_바디2(교주)_미소.png","joshua-바디2-leader-미소-leader":"joshua/조슈아_바디2(교주)_미소(교주).png","joshua/조슈아_바디(신도)_광기(교주)":"joshua/조슈아_바디(신도)_광기(교주).png","joshua/조슈아_바디(신도)_기본(교주)":"joshua/조슈아_바디(신도)_기본(교주).png","joshua/조슈아_바디(신도)_기본(신도)":"joshua/조슈아_바디(신도)_기본(신도).png","joshua/조슈아_바디(신도)_미소":"joshua/조슈아_바디(신도)_미소.png","joshua/조슈아_바디(신도)_미소(교주)":"joshua/조슈아_바디(신도)_미소(교주).png","joshua/조슈아_바디1(교주)_광기(교주)":"joshua/조슈아_바디1(교주)_광기(교주).png","joshua/조슈아_바디1(교주)_기본(교주)":"joshua/조슈아_바디1(교주)_기본(교주).png","joshua/조슈아_바디1(교주)_기본(신도)":"joshua/조슈아_바디1(교주)_기본(신도).png","joshua/조슈아_바디1(교주)_미소":"joshua/조슈아_바디1(교주)_미소.png","joshua/조슈아_바디1(교주)_미소(교주)":"joshua/조슈아_바디1(교주)_미소(교주).png","joshua/조슈아_바디2(교주)_광기(교주)":"joshua/조슈아_바디2(교주)_광기(교주).png","joshua/조슈아_바디2(교주)_기본(교주)":"joshua/조슈아_바디2(교주)_기본(교주).png","joshua/조슈아_바디2(교주)_기본(신도)":"joshua/조슈아_바디2(교주)_기본(신도).png","joshua/조슈아_바디2(교주)_미소":"joshua/조슈아_바디2(교주)_미소.png","joshua/조슈아_바디2(교주)_미소(교주)":"joshua/조슈아_바디2(교주)_미소(교주).png","junhui-body1-default":"junhui/준휘_바디1_기본.png","junhui-body1-eyesmile":"junhui/준휘_바디1_눈웃음.png","junhui-body1-smile":"junhui/준휘_바디1_미소.png","junhui-body1-의심":"junhui/준휘_바디1_의심.png","junhui-body2-default":"junhui/준휘_바디2_기본.png","junhui-body2-eyesmile":"junhui/준휘_바디2_눈웃음.png","junhui-body2-smile":"junhui/준휘_바디2_미소.png","junhui-body2-snacking":"junhui/준휘_바디2_과자먹음이.png","junhui-body2-의심":"junhui/준휘_바디2_의심.png","junhui-body3-default":"junhui/준휘_바디3_기본.png","junhui-body3-eyesmile":"junhui/준휘_바디3_눈웃음.png","junhui-body3-smile":"junhui/준휘_바디3_미소.png","junhui-body3-snacking":"junhui/준휘_바디3_과자먹음이.png","junhui-body3-의심":"junhui/준휘_바디3_의심.png","junhui-execution-default":"junhui/준휘_즉결처형_기본.png","junhui-execution-execution":"junhui/준휘_즉결처형_즉결처형.png","junhui-execution-eyesmile":"junhui/준휘_즉결처형_눈웃음.png","junhui-execution-smile":"junhui/준휘_즉결처형_미소.png","junhui-execution-snacking":"junhui/준휘_즉결처형_과자먹음이.png","junhui-execution-의심":"junhui/준휘_즉결처형_의심.png","junhui/준휘_바디1_기본":"junhui/준휘_바디1_기본.png","junhui/준휘_바디1_눈웃음":"junhui/준휘_바디1_눈웃음.png","junhui/준휘_바디1_미소":"junhui/준휘_바디1_미소.png","junhui/준휘_바디1_의심":"junhui/준휘_바디1_의심.png","junhui/준휘_바디2_과자먹음이":"junhui/준휘_바디2_과자먹음이.png","junhui/준휘_바디2_기본":"junhui/준휘_바디2_기본.png","junhui/준휘_바디2_눈웃음":"junhui/준휘_바디2_눈웃음.png","junhui/준휘_바디2_미소":"junhui/준휘_바디2_미소.png","junhui/준휘_바디2_의심":"junhui/준휘_바디2_의심.png","junhui/준휘_바디3_과자먹음이":"junhui/준휘_바디3_과자먹음이.png","junhui/준휘_바디3_기본":"junhui/준휘_바디3_기본.png","junhui/준휘_바디3_눈웃음":"junhui/준휘_바디3_눈웃음.png","junhui/준휘_바디3_미소":"junhui/준휘_바디3_미소.png","junhui/준휘_바디3_의심":"junhui/준휘_바디3_의심.png","junhui/준휘_즉결처형_과자먹음이":"junhui/준휘_즉결처형_과자먹음이.png","junhui/준휘_즉결처형_기본":"junhui/준휘_즉결처형_기본.png","junhui/준휘_즉결처형_눈웃음":"junhui/준휘_즉결처형_눈웃음.png","junhui/준휘_즉결처형_미소":"junhui/준휘_즉결처형_미소.png","junhui/준휘_즉결처형_의심":"junhui/준휘_즉결처형_의심.png","junhui/준휘_즉결처형_즉결처형":"junhui/준휘_즉결처형_즉결처형.png","minghao-body1-angry":"minghao/명호_바디1_분노.png","minghao-body1-default":"minghao/명호_바디1_기본.png","minghao-body1-despair":"minghao/명호_바디1_절망.png","minghao-body1-eyesclosed":"minghao/명호_바디1_감은눈.png","minghao-body1-eyesmile":"minghao/명호_바디1_눈웃음.png","minghao-body1-flustered":"minghao/명호_바디1_당황.png","minghao-body1-hatred":"minghao/명호_바디1_증오.png","minghao-body1-smile":"minghao/명호_바디1_미소.png","minghao-body2-angry":"minghao/명호_바디2_분노.png","minghao-body2-default":"minghao/명호_바디2_기본.png","minghao-body2-despair":"minghao/명호_바디2_절망.png","minghao-body2-eyesclosed":"minghao/명호_바디2_감은눈.png","minghao-body2-eyesmile":"minghao/명호_바디2_눈웃음.png","minghao-body2-flustered":"minghao/명호_바디2_당황.png","minghao-body2-hatred":"minghao/명호_바디2_증오.png","minghao-body2-smile":"minghao/명호_바디2_미소.png","minghao-body3-angry":"minghao/명호_바디3_분노.png","minghao-body3-default":"minghao/명호_바디3_기본.png","minghao-body3-execution":"minghao/명호_바디3_즉결처형.png","minghao-body3-eyesclosed":"minghao/명호_바디3_감은눈.png","minghao-body3-flustered":"minghao/명호_바디3_당황.png","minghao-body3-hatred":"minghao/명호_바디3_증오.png","minghao-body3-smile":"minghao/명호_바디3_미소.png","minghao-body4-execution":"minghao/명호_바디4_즉결처형.png","minghao/명호_바디1_감은눈":"minghao/명호_바디1_감은눈.png","minghao/명호_바디1_기본":"minghao/명호_바디1_기본.png","minghao/명호_바디1_눈웃음":"minghao/명호_바디1_눈웃음.png","minghao/명호_바디1_당황":"minghao/명호_바디1_당황.png","minghao/명호_바디1_미소":"minghao/명호_바디1_미소.png","minghao/명호_바디1_분노":"minghao/명호_바디1_분노.png","minghao/명호_바디1_절망":"minghao/명호_바디1_절망.png","minghao/명호_바디1_증오":"minghao/명호_바디1_증오.png","minghao/명호_바디2_감은눈":"minghao/명호_바디2_감은눈.png","minghao/명호_바디2_기본":"minghao/명호_바디2_기본.png","minghao/명호_바디2_눈웃음":"minghao/명호_바디2_눈웃음.png","minghao/명호_바디2_당황":"minghao/명호_바디2_당황.png","minghao/명호_바디2_미소":"minghao/명호_바디2_미소.png","minghao/명호_바디2_분노":"minghao/명호_바디2_분노.png","minghao/명호_바디2_절망":"minghao/명호_바디2_절망.png","minghao/명호_바디2_증오":"minghao/명호_바디2_증오.png","minghao/명호_바디3_감은눈":"minghao/명호_바디3_감은눈.png","minghao/명호_바디3_기본":"minghao/명호_바디3_기본.png","minghao/명호_바디3_당황":"minghao/명호_바디3_당황.png","minghao/명호_바디3_미소":"minghao/명호_바디3_미소.png","minghao/명호_바디3_분노":"minghao/명호_바디3_분노.png","minghao/명호_바디3_즉결처형":"minghao/명호_바디3_즉결처형.png","minghao/명호_바디3_증오":"minghao/명호_바디3_증오.png","minghao/명호_바디4_즉결처형":"minghao/명호_바디4_즉결처형.png","mingyu-body1-default":"mingyu/민규_바디1_기본.png","mingyu-body1-eyesmile":"mingyu/민규_바디1_눈웃음.png","mingyu-body1-pleading":"mingyu/민규_바디1_부탁.png","mingyu-body1-pouting":"mingyu/민규_바디1_삐짐.png","mingyu-body2-default":"mingyu/민규_바디2_기본.png","mingyu-body2-eyesmile":"mingyu/민규_바디2_눈웃음.png","mingyu-body2-pleading":"mingyu/민규_바디2_부탁.png","mingyu-body2-pouting":"mingyu/민규_바디2_삐짐.png","mingyu/민규_바디1_기본":"mingyu/민규_바디1_기본.png","mingyu/민규_바디1_눈웃음":"mingyu/민규_바디1_눈웃음.png","mingyu/민규_바디1_부탁":"mingyu/민규_바디1_부탁.png","mingyu/민규_바디1_삐짐":"mingyu/민규_바디1_삐짐.png","mingyu/민규_바디2_기본":"mingyu/민규_바디2_기본.png","mingyu/민규_바디2_눈웃음":"mingyu/민규_바디2_눈웃음.png","mingyu/민규_바디2_부탁":"mingyu/민규_바디2_부탁.png","mingyu/민규_바디2_삐짐":"mingyu/민규_바디2_삐짐.png","seokmin-body1-anxious":"seokmin/석민_바디1_초조.png","seokmin-body1-converted":"seokmin/석민_바디1_신도화.png","seokmin-body1-default":"seokmin/석민_바디1_기본.png","seokmin-body1-eyesmile":"seokmin/석민_바디1_눈웃음.png","seokmin-body1-madness":"seokmin/석민_바디1_광기.png","seokmin-body1-smile":"seokmin/석민_바디1_미소.png","seokmin-body1-surprised":"seokmin/석민_바디1_놀람.png","seokmin-body2-anxious":"seokmin/석민_바디2_초조.png","seokmin-body2-converted":"seokmin/석민_바디2_신도화.png","seokmin-body2-default":"seokmin/석민_바디2_기본.png","seokmin-body2-eyesmile":"seokmin/석민_바디2_눈웃음.png","seokmin-body2-madness":"seokmin/석민_바디2_광기.png","seokmin-body2-smile":"seokmin/석민_바디2_미소.png","seokmin-body2-surprised":"seokmin/석민_바디2_놀람.png","seokmin/석민_바디1_광기":"seokmin/석민_바디1_광기.png","seokmin/석민_바디1_기본":"seokmin/석민_바디1_기본.png","seokmin/석민_바디1_놀람":"seokmin/석민_바디1_놀람.png","seokmin/석민_바디1_눈웃음":"seokmin/석민_바디1_눈웃음.png","seokmin/석민_바디1_미소":"seokmin/석민_바디1_미소.png","seokmin/석민_바디1_신도화":"seokmin/석민_바디1_신도화.png","seokmin/석민_바디1_초조":"seokmin/석민_바디1_초조.png","seokmin/석민_바디2_광기":"seokmin/석민_바디2_광기.png","seokmin/석민_바디2_기본":"seokmin/석민_바디2_기본.png","seokmin/석민_바디2_놀람":"seokmin/석민_바디2_놀람.png","seokmin/석민_바디2_눈웃음":"seokmin/석민_바디2_눈웃음.png","seokmin/석민_바디2_미소":"seokmin/석민_바디2_미소.png","seokmin/석민_바디2_신도화":"seokmin/석민_바디2_신도화.png","seokmin/석민_바디2_초조":"seokmin/석민_바디2_초조.png","seungcheol-body1-angry":"seungcheol/승철_바디1_분노.png","seungcheol-body1-default":"seungcheol/승철_바디1_기본.png","seungcheol-body1-despair":"seungcheol/승철_바디1_절망.png","seungcheol-body1-eyesmile":"seungcheol/승철_바디1_눈웃음.png","seungcheol-body1-flustered":"seungcheol/승철_바디1_당황.png","seungcheol-body1-smile":"seungcheol/승철_바디1_미소.png","seungcheol-body2-angry":"seungcheol/승철_바디2_분노.png","seungcheol-body2-default":"seungcheol/승철_바디2_기본.png","seungcheol-body2-despair":"seungcheol/승철_바디2_절망.png","seungcheol-body2-eyesmile":"seungcheol/승철_바디2_눈웃음.png","seungcheol-body2-flustered":"seungcheol/승철_바디2_당황.png","seungcheol-body2-smile":"seungcheol/승철_바디2_미소.png","seungcheol-body2-squintsmile":"seungcheol/승철_바디2_눈웃음.png","seungcheol/승철_바디1_기본":"seungcheol/승철_바디1_기본.png","seungcheol/승철_바디1_눈웃음":"seungcheol/승철_바디1_눈웃음.png","seungcheol/승철_바디1_당황":"seungcheol/승철_바디1_당황.png","seungcheol/승철_바디1_미소":"seungcheol/승철_바디1_미소.png","seungcheol/승철_바디1_분노":"seungcheol/승철_바디1_분노.png","seungcheol/승철_바디1_절망":"seungcheol/승철_바디1_절망.png","seungcheol/승철_바디2_기본":"seungcheol/승철_바디2_기본.png","seungcheol/승철_바디2_눈웃음":"seungcheol/승철_바디2_눈웃음.png","seungcheol/승철_바디2_당황":"seungcheol/승철_바디2_당황.png","seungcheol/승철_바디2_미소":"seungcheol/승철_바디2_미소.png","seungcheol/승철_바디2_분노":"seungcheol/승철_바디2_분노.png","seungcheol/승철_바디2_절망":"seungcheol/승철_바디2_절망.png","seungkwan-body1-converted":"seungkwan/승관_바디1_신도화.png","seungkwan-body1-default":"seungkwan/승관_바디1_기본.png","seungkwan-body1-despair":"seungkwan/승관_바디1_절망.png","seungkwan-body1-eyesmile":"seungkwan/승관_바디1_눈웃음.png","seungkwan-body1-shocked":"seungkwan/승관_바디1_기겁.png","seungkwan-body1-smile":"seungkwan/승관_바디1_미소.png","seungkwan-body1-surprised":"seungkwan/승관_바디1_놀람.png","seungkwan-body1-sweating":"seungkwan/승관_바디1_삐질삐질.png","seungkwan-body1-thinking":"seungkwan/승관_바디1_고민.png","seungkwan-body2-converted":"seungkwan/승관_바디2_신도화.png","seungkwan-body2-default":"seungkwan/승관_바디2_기본.png","seungkwan-body2-despair":"seungkwan/승관_바디2_절망.png","seungkwan-body2-eyesmile":"seungkwan/승관_바디2_눈웃음.png","seungkwan-body2-shocked":"seungkwan/승관_바디2_기겁.png","seungkwan-body2-smile":"seungkwan/승관_바디2_미소.png","seungkwan-body2-surprised":"seungkwan/승관_바디2_놀람.png","seungkwan-body2-sweating":"seungkwan/승관_바디2_삐질삐질.png","seungkwan-body2-thinking":"seungkwan/승관_바디2_고민.png","seungkwan-body3-converted":"seungkwan/승관_바디3_신도화.png","seungkwan-body3-default":"seungkwan/승관_바디3_기본.png","seungkwan-body3-despair":"seungkwan/승관_바디3_절망.png","seungkwan-body3-eyesmile":"seungkwan/승관_바디3_눈웃음.png","seungkwan-body3-shocked":"seungkwan/승관_바디3_기겁.png","seungkwan-body3-smile":"seungkwan/승관_바디3_미소.png","seungkwan-body3-surprised":"seungkwan/승관_바디3_놀람.png","seungkwan-body3-sweating":"seungkwan/승관_바디3_삐질삐질.png","seungkwan-body3-thinking":"seungkwan/승관_바디3_고민.png","seungkwan/승관_바디1_고민":"seungkwan/승관_바디1_고민.png","seungkwan/승관_바디1_기겁":"seungkwan/승관_바디1_기겁.png","seungkwan/승관_바디1_기본":"seungkwan/승관_바디1_기본.png","seungkwan/승관_바디1_놀람":"seungkwan/승관_바디1_놀람.png","seungkwan/승관_바디1_눈웃음":"seungkwan/승관_바디1_눈웃음.png","seungkwan/승관_바디1_미소":"seungkwan/승관_바디1_미소.png","seungkwan/승관_바디1_삐질삐질":"seungkwan/승관_바디1_삐질삐질.png","seungkwan/승관_바디1_신도화":"seungkwan/승관_바디1_신도화.png","seungkwan/승관_바디1_절망":"seungkwan/승관_바디1_절망.png","seungkwan/승관_바디2_고민":"seungkwan/승관_바디2_고민.png","seungkwan/승관_바디2_기겁":"seungkwan/승관_바디2_기겁.png","seungkwan/승관_바디2_기본":"seungkwan/승관_바디2_기본.png","seungkwan/승관_바디2_놀람":"seungkwan/승관_바디2_놀람.png","seungkwan/승관_바디2_눈웃음":"seungkwan/승관_바디2_눈웃음.png","seungkwan/승관_바디2_미소":"seungkwan/승관_바디2_미소.png","seungkwan/승관_바디2_삐질삐질":"seungkwan/승관_바디2_삐질삐질.png","seungkwan/승관_바디2_신도화":"seungkwan/승관_바디2_신도화.png","seungkwan/승관_바디2_절망":"seungkwan/승관_바디2_절망.png","seungkwan/승관_바디3_고민":"seungkwan/승관_바디3_고민.png","seungkwan/승관_바디3_기겁":"seungkwan/승관_바디3_기겁.png","seungkwan/승관_바디3_기본":"seungkwan/승관_바디3_기본.png","seungkwan/승관_바디3_놀람":"seungkwan/승관_바디3_놀람.png","seungkwan/승관_바디3_눈웃음":"seungkwan/승관_바디3_눈웃음.png","seungkwan/승관_바디3_미소":"seungkwan/승관_바디3_미소.png","seungkwan/승관_바디3_삐질삐질":"seungkwan/승관_바디3_삐질삐질.png","seungkwan/승관_바디3_신도화":"seungkwan/승관_바디3_신도화.png","seungkwan/승관_바디3_절망":"seungkwan/승관_바디3_절망.png","solo-hansol-body2-annoyed":"hansol/한솔_바디2_귀찮음.png","solo-hansol-body2-default":"hansol/한솔_바디2_기본.png","solo-hansol-body2-mocking":"hansol/한솔_바디2_비아냥.png","solo-hansol-body3-mocking":"hansol/한솔_바디3_비아냥.png","solo-minghao-body1-flustered":"minghao/명호_바디1_당황.png","solo-minghao-body2-angry":"minghao/명호_바디2_분노.png","solo-minghao-body2-eyesclosed":"minghao/명호_바디2_감은눈.png","solo-minghao-body2-flustered":"minghao/명호_바디2_당황.png","soonyoung-body1-confused":"soonyoung/순영_바디1_의아.png","soonyoung-body1-default":"soonyoung/순영_바디1_기본.png","soonyoung-body1-disgusted":"soonyoung/순영_바디1_질색.png","soonyoung-body1-flustered":"soonyoung/순영_바디1_당황.png","soonyoung-body1-glare":"soonyoung/순영_바디1_노려봄.png","soonyoung-body1-smile":"soonyoung/순영_바디1_미소.png","soonyoung-body1-thinking":"soonyoung/순영_바디1_고민.png","soonyoung-body2-confused":"soonyoung/순영_바디2_의아.png","soonyoung-body2-default":"soonyoung/순영_바디2_기본.png","soonyoung-body2-disgusted":"soonyoung/순영_바디2_질색.png","soonyoung-body2-flustered":"soonyoung/순영_바디2_당황.png","soonyoung-body2-glare":"soonyoung/순영_바디2_노려봄.png","soonyoung-body2-smile":"soonyoung/순영_바디2_미소.png","soonyoung-body2-thinking":"soonyoung/순영_바디2_고민.png","soonyoung/순영_바디1_고민":"soonyoung/순영_바디1_고민.png","soonyoung/순영_바디1_기본":"soonyoung/순영_바디1_기본.png","soonyoung/순영_바디1_노려봄":"soonyoung/순영_바디1_노려봄.png","soonyoung/순영_바디1_당황":"soonyoung/순영_바디1_당황.png","soonyoung/순영_바디1_미소":"soonyoung/순영_바디1_미소.png","soonyoung/순영_바디1_의아":"soonyoung/순영_바디1_의아.png","soonyoung/순영_바디1_질색":"soonyoung/순영_바디1_질색.png","soonyoung/순영_바디2_고민":"soonyoung/순영_바디2_고민.png","soonyoung/순영_바디2_기본":"soonyoung/순영_바디2_기본.png","soonyoung/순영_바디2_노려봄":"soonyoung/순영_바디2_노려봄.png","soonyoung/순영_바디2_당황":"soonyoung/순영_바디2_당황.png","soonyoung/순영_바디2_미소":"soonyoung/순영_바디2_미소.png","soonyoung/순영_바디2_의아":"soonyoung/순영_바디2_의아.png","soonyoung/순영_바디2_질색":"soonyoung/순영_바디2_질색.png","wonwoo-body1-default":"wonwoo/원우_바디1_기본.png","wonwoo-body1-eyesclosed":"wonwoo/원우_바디1_눈감음.png","wonwoo-body1-eyesmile":"wonwoo/원우_바디1_눈웃음.png","wonwoo-body1-scheming":"wonwoo/원우_바디1_계략.png","wonwoo-body1-smile":"wonwoo/원우_바디1_미소.png","wonwoo-body2-default":"wonwoo/원우_바디2_기본.png","wonwoo-body2-eye-smile":"wonwoo/원우_바디2_눈웃음.png","wonwoo-body2-eyes-closed":"wonwoo/원우_바디2_눈감음.png","wonwoo-body2-eyesclosed":"wonwoo/원우_바디2_눈감음.png","wonwoo-body2-eyesmile":"wonwoo/원우_바디2_눈웃음.png","wonwoo-body2-scheming":"wonwoo/원우_바디2_계략.png","wonwoo-body2-smile":"wonwoo/원우_바디2_미소.png","wonwoo/원우_바디1_계략":"wonwoo/원우_바디1_계략.png","wonwoo/원우_바디1_기본":"wonwoo/원우_바디1_기본.png","wonwoo/원우_바디1_눈감음":"wonwoo/원우_바디1_눈감음.png","wonwoo/원우_바디1_눈웃음":"wonwoo/원우_바디1_눈웃음.png","wonwoo/원우_바디1_미소":"wonwoo/원우_바디1_미소.png","wonwoo/원우_바디2_계략":"wonwoo/원우_바디2_계략.png","wonwoo/원우_바디2_기본":"wonwoo/원우_바디2_기본.png","wonwoo/원우_바디2_눈감음":"wonwoo/원우_바디2_눈감음.png","wonwoo/원우_바디2_눈웃음":"wonwoo/원우_바디2_눈웃음.png","wonwoo/원우_바디2_미소":"wonwoo/원우_바디2_미소.png"});
// V138: Always use the existing GitHub official folder, with original Korean filenames.
// GitHub uploads may preserve different folder depth or Unicode (NFD/NFC) normalization.
// Resolve the actual committed pathname by the GitHub tree and never request legacy portrait PNGs.
const OFFICIAL_ROOT='story-portraits/official/';
const OFFICIAL_REPOSITORY='svtchive0526/150526-261125';
const OFFICIAL_KOREAN_FOLDERS=Object.freeze({
 seungcheol:'01 승철',jeonghan:'02 정한',joshua:'03 조슈아',junhui:'04 준휘',
 soonyoung:'05 순영',wonwoo:'06 원우',jihoon:'07 지훈',minghao:'08 명호',
 mingyu:'09 민규',seokmin:'10 석민',seungkwan:'11 승관',hansol:'12 한솔',
 chan:'13 찬',elder:'14 노인네'
});
const OFFICIAL_PATH_CACHE=new Map();
let officialTreePromise;
function encodeOfficialSegments(path){return String(path).split('/').map(encodeURIComponent).join('/')}
function normalizeOfficialText(value){return String(value||'').normalize('NFC')}
function officialKeyToFilename(key){
 const normalized=String(key||'').replace(/^(?:solo|duo)-/,'');
 return OFFICIAL_PORTRAITS[key]||OFFICIAL_PORTRAITS[normalized]||null;
}
function getOfficialTree(){
 if(!officialTreePromise){
  officialTreePromise=(async()=>{
   const controller=new AbortController();
   const timeout=setTimeout(()=>controller.abort(),6500);
   try{
    const response=await fetch('https://api.github.com/repos/'+OFFICIAL_REPOSITORY+'/git/trees/main?recursive=1',
      {signal:controller.signal,headers:{Accept:'application/vnd.github+json'}});
    if(!response.ok)throw new Error('GitHub tree HTTP '+response.status);
    const body=await response.json();
    if(body.truncated)console.warn('[SHINDO V138] GitHub file listing is truncated');
    const paths=(body.tree||[]).filter(entry=>entry.type==='blob'&&/\.png$/i.test(entry.path||'')&&
     entry.path.split('/').some(segment=>normalizeOfficialText(segment).toLowerCase()==='official')).map(entry=>entry.path);
    const byFilename=new Map();
    for(const path of paths){
     const filename=normalizeOfficialText(path.slice(path.lastIndexOf('/')+1));
     if(!byFilename.has(filename))byFilename.set(filename,[]);
     byFilename.get(filename).push(path);
    }
    return byFilename;
   }catch(error){
    console.warn('[SHINDO V138] Could not read GitHub official file listing; using Korean-path candidates:',error);
    return null;
   }finally{clearTimeout(timeout)}
  })();
 }
 return officialTreePromise;
}
function getOfficialCandidatePaths(relative){
 const parts=relative.split('/');
 const character=parts[0],filename=parts.at(-1);
 const paths=[OFFICIAL_ROOT+relative];
 const korean=OFFICIAL_KOREAN_FOLDERS[character];
 if(korean)paths.push(OFFICIAL_ROOT+korean+'/'+filename);
 paths.push(OFFICIAL_ROOT+filename);
 // Some repositories received an additional parent folder during web uploads.
 paths.push(OFFICIAL_ROOT+'official/'+relative);
 if(korean)paths.push(OFFICIAL_ROOT+'official/'+korean+'/'+filename);
 // macOS can store Hangul as decomposed Unicode; do not rename the remote original.
 return [...new Set(paths.flatMap(p=>[p,p.normalize('NFD')]))];
}
function getOfficialPortraitURL(key){
 const relative=officialKeyToFilename(key);
 if(!relative){console.error('[SHINDO V138] Unmapped official portrait:',key);return null;}
 return encodeOfficialSegments(OFFICIAL_ROOT+relative);
}
async function resolveOfficialPortrait(key){
 const relative=officialKeyToFilename(key);
 if(!relative)return [];
 if(OFFICIAL_PATH_CACHE.has(relative))return [OFFICIAL_PATH_CACHE.get(relative)];
 const candidates=[];
 const tree=await getOfficialTree();
 if(tree){
  const filename=normalizeOfficialText(relative.slice(relative.lastIndexOf('/')+1));
  const hits=tree.get(filename)||[];
  const expectedCharacter=relative.slice(0,relative.indexOf('/'));
  hits.sort((a,b)=>{
   const score=path=>{
    const clean=normalizeOfficialText(path);
    let n=clean.startsWith(OFFICIAL_ROOT)?20:0;
    if(clean.includes('/'+expectedCharacter+'/'))n+=10;
    if(clean.includes('/'+(OFFICIAL_KOREAN_FOLDERS[expectedCharacter]||'')+'/'))n+=8;
    return n-clean.split('/').length*.01;
   };
   return score(b)-score(a);
  });
  candidates.push(...hits);
 }
 candidates.push(...getOfficialCandidatePaths(relative));
 return [...new Set(candidates.map(encodeOfficialSegments))];
}
// V140: Resolve and decode offscreen. Keep the already-rendered picture visible
// until the replacement has loaded; identical expressions never re-request assets.
const OFFICIAL_PRELOAD_CACHE=new Map();
const OFFICIAL_PRELOAD_LIMIT=55;
function preloadOfficialPortrait(key){
 const relative=officialKeyToFilename(key);
 if(!relative)return Promise.reject(new Error('Unknown official portrait: '+key));
 if(OFFICIAL_PRELOAD_CACHE.has(relative))return OFFICIAL_PRELOAD_CACHE.get(relative);
 const loading=resolveOfficialPortrait(key).then(async paths=>{
  if(!paths.length)throw new Error('No official candidate for '+key);
  let lastError;
  for(const path of paths){
   try{
    const image=new Image();
    image.decoding='async';
    await new Promise((resolve,reject)=>{
     image.onload=resolve;
     image.onerror=()=>reject(new Error('Failed official image: '+path));
     image.src=path;
    });
    if(typeof image.decode==='function'){try{await image.decode()}catch(_){/* already loaded */}}
    OFFICIAL_PATH_CACHE.set(relative,path);
    return path;
   }catch(error){lastError=error;}
  }
  throw lastError||new Error('No usable official portrait: '+key);
 }).catch(error=>{OFFICIAL_PRELOAD_CACHE.delete(relative);throw error});
 OFFICIAL_PRELOAD_CACHE.set(relative,loading);
 // Bound the number of decoded images retained by our JS promise cache.
 if(OFFICIAL_PRELOAD_CACHE.size>OFFICIAL_PRELOAD_LIMIT){
  const oldest=OFFICIAL_PRELOAD_CACHE.keys().next().value;
  if(oldest!==relative)OFFICIAL_PRELOAD_CACHE.delete(oldest);
 }
 return loading;
}
function assignOfficialPortrait(img,key){
 const relative=officialKeyToFilename(key);
 img.dataset.officialShouldShow=img.dataset.officialShouldShow||'1';
 if(!relative){console.error('[SHINDO V140] Unmapped official portrait:',key);return false;}
 const requestedShow=img.dataset.officialShouldShow!=='0';
 // A text-only scene may follow a portraited scene: keep source warm but hide it.
 if(!requestedShow){img.hidden=true;return true;}
 // Do not touch the DOM if the same official artwork is already on screen.
 if(img.dataset.officialDisplayedKey===relative && img.getAttribute('src')){
  img.hidden=false;
  return true;
 }
 img.dataset.officialRequest=String((Number(img.dataset.officialRequest)||0)+1);
 const request=img.dataset.officialRequest;
 // Deliberately DO NOT set img.hidden or remove src here: this is the flicker fix.
 preloadOfficialPortrait(key).then(path=>{
  if(img.dataset.officialRequest!==request || img.dataset.officialShouldShow==='0')return;
  img.src=path;
  img.dataset.officialDisplayedKey=relative;
  img.dataset.officialValid='1';
  img.hidden=false;
 }).catch(error=>{
  if(img.dataset.officialRequest!==request)return;
  console.error('[SHINDO V140] Official image load failed:',key,error);
  // Keep the last valid image, if any. Never display the browser's broken icon.
  if(!img.getAttribute('src'))img.hidden=true;
 });
 return true;
}
// Warm nearby story expressions without uploading or renaming any official image.
function warmUpcomingPortraits(fromIndex){
 const keys=new Set();
 for(let n=fromIndex+1;n<Math.min(scenes.length,fromIndex+6);n++){
  const scene=scenes[n];
  if(scene.portrait)keys.add(scene.portrait);
  if(scene.duo)for(const key of scene.duo)keys.add('duo-'+key);
 }
 for(const key of keys)preloadOfficialPortrait(key).catch(()=>{});
}
function attachPortraitErrorHandler(img){
 // Error handling and fallback are managed centrally by assignOfficialPortrait.
 img.dataset.officialShouldShow='1';
}
attachPortraitErrorHandler(portrait);
// V114: secondary portrait layer for a two-person conversation.
const duoLayer=document.createElement('div');duoLayer.className='vn-duo';
const duoLeft=document.createElement('img'),duoRight=document.createElement('img');
duoLeft.className='duo-left';duoRight.className='duo-right';duoLeft.alt='';duoRight.alt='';
duoLayer.append(duoLeft,duoRight);overlay.insertBefore(duoLayer,box);
attachPortraitErrorHandler(duoLeft);attachPortraitErrorHandler(duoRight);
const recallKicker=document.createElement('div');recallKicker.className='special-memory-kicker';recallKicker.textContent='회상';overlay.appendChild(recallKicker);
function setSpecialPortraits(scene){
 overlay.classList.toggle('is-recall',!!scene.recall);
 if(!scene.duo){duoLayer.classList.remove('is-active');for(const image of [duoLeft,duoRight]){image.dataset.officialRequest=String((Number(image.dataset.officialRequest)||0)+1);image.hidden=true;image.removeAttribute('src')}return false}
 duoLeft.style.visibility='visible';duoRight.style.visibility='visible';
 duoLeft.hidden=false;duoRight.hidden=false;
 duoLeft.dataset.portraitKey='duo-'+scene.duo[0];duoRight.dataset.portraitKey='duo-'+scene.duo[1];
 duoLeft.dataset.officialShouldShow='1';duoRight.dataset.officialShouldShow='1';
 assignOfficialPortrait(duoLeft,'duo-'+scene.duo[0]);assignOfficialPortrait(duoRight,'duo-'+scene.duo[1]);
 duoLeft.classList.toggle('is-shadow',scene.duoMask==='both'||scene.duoMask==='hansol');
 duoRight.classList.toggle('is-shadow',scene.duoMask==='both');
 portrait.hidden=true; // V116: always suppress previous solo portrait during duo scenes
  duoLayer.classList.add('is-active');return true;
}
function getMinghaoAffinity(){
 try{const data=JSON.parse(localStorage.getItem('shindo_affinity_v107')||'{}');
 const raw=data['명호']??data.minghao??0;return Math.max(0,Math.min(100,Number(raw)||0))}catch(_){return 0}
}
const illustration=document.createElement('img');illustration.className='vn-illustration';illustration.alt='';illustration.hidden=true;overlay.insertBefore(illustration,box);
let jihoonRevealed=false,pencilAudio=null;
function stopPencil(){if(pencilAudio){pencilAudio.pause();pencilAudio.currentTime=0;pencilAudio=null}}
function keepPencil(){if(pencilAudio)return;pencilAudio=new Audio('story-audio/pencil-17s.mp3');pencilAudio.loop=true;pencilAudio.volume=.65;pencilAudio.play().catch(()=>{})}

let day2Prayer=Number(localStorage.getItem("shindo_day2_prayer")||0),day2Morning=localStorage.getItem("shindo_day2_morning")||"";
let prayerBranch=Number(localStorage.getItem("shindo_prayer_branch_v99")||0),hansolRevealed=localStorage.getItem("shindo_hansol_known_v99")==="1",seokminRevealed=localStorage.getItem("shindo_seokmin_known_v99")==="1",chanRevealed=localStorage.getItem("shindo_chan_known_v99")==="1";
let index=0,locked=false, timer=null, audio=null,ambient=null;let selectedBranch=Number(localStorage.getItem("shindo_confession_branch")||0),endingTimers=[],endingBell=null,endingBellTimer=null;let storySfx=null,storySfxTimer=null;
let sanctuaryTickTimer=null,sanctuaryTickAudio=null,confessionDoorAudio=null,confessionTickStartTimer=null;
// Keep each clock strike independent: never seek the audio element that is still playing.
// Reuse the browser's decoded media cache while avoiding simultaneous seek/play artifacts.
const activeClockStrikes=new Set();
const clockStrikeTemplate=new Audio('story-audio/clock_tick_single.mp3');
clockStrikeTemplate.preload='auto';
function stopClockStrikes(){
 for(const strike of activeClockStrikes){strike.pause();strike.removeAttribute('src');strike.load()}
 activeClockStrikes.clear();
}
function playClockStrike(volume){
 if(activeClockStrikes.size>=2)return;
 const strike=clockStrikeTemplate.cloneNode(true);
 strike.volume=volume;
 activeClockStrikes.add(strike);
 const release=()=>activeClockStrikes.delete(strike);
 strike.addEventListener('ended',release,{once:true});
 strike.addEventListener('error',release,{once:true});
 strike.play().catch(release);
}
function stopSanctuaryTick(){
 if(sanctuaryTickTimer!==null){clearInterval(sanctuaryTickTimer);sanctuaryTickTimer=null}
 sanctuaryTickAudio=null;
 stopClockStrikes();
}
function startSanctuaryTick(){stopSanctuaryTick(); /* v97: sanctuary clock disabled */}
// Prayer hall has its own ambient clock, separate from the disabled day-one sanctuary/confessional.
let prayerClockTimer=null,prayerSceneAudio=null,prayerAudioTimeout=null,prayerFadeTimer=null,prayerBellAudio=null;
function stopPrayerClock(){if(prayerClockTimer!==null){clearInterval(prayerClockTimer);prayerClockTimer=null}stopClockStrikes()}
function startPrayerClock(){stopPrayerClock();playClockStrike(.12);prayerClockTimer=setInterval(()=>playClockStrike(.12),1000)}
function stopPrayerBell(){if(prayerBellAudio){prayerBellAudio.pause();prayerBellAudio.currentTime=0;prayerBellAudio=null}}
function stopPrayerAudio(){if(prayerAudioTimeout){clearTimeout(prayerAudioTimeout);prayerAudioTimeout=null}if(prayerFadeTimer){clearInterval(prayerFadeTimer);prayerFadeTimer=null}if(prayerSceneAudio){prayerSceneAudio.pause();prayerSceneAudio.currentTime=0;prayerSceneAudio=null}}
function playPrayerAudio(file,volume=.6,maxDuration=0){stopPrayerAudio();const a=new Audio('story-audio/'+file);a.volume=volume;prayerSceneAudio=a;a.play().catch(()=>{});if(maxDuration){prayerAudioTimeout=setTimeout(()=>{if(prayerSceneAudio===a)stopPrayerAudio()},maxDuration)}}
function fadePrayerAudio(){if(!prayerSceneAudio)return;if(prayerFadeTimer)clearInterval(prayerFadeTimer);const a=prayerSceneAudio,initial=a.volume;let step=0;prayerFadeTimer=setInterval(()=>{if(prayerSceneAudio!==a){clearInterval(prayerFadeTimer);prayerFadeTimer=null;return}step++;a.volume=Math.max(0,initial*(1-step/12));if(step>=12)stopPrayerAudio()},85)}
function prayerAudioCue(cue){if(cue==='clean-start')playPrayerAudio('clean_room_sound01.wav',.42);else if(cue==='clean-fade')fadePrayerAudio();else if(cue==='clean-5')playPrayerAudio('clean_room_sound01.wav',.42,5000);else if(cue==='wake-4')playPrayerAudio('human_touch_sound01.mp3',.62,4000);else if(cue==='book-2')playPrayerAudio('browsing_book_sound01.wav',.65,1000);else if(cue==='single-bell'){stopPrayerBell();prayerBellAudio=playExtraAudio('oath-bell-05.mp3',.65)}}


// v105: Separate Art Hall audio sources continue across dialogue until their own time limit.
let artBranch=0,artLocation='main',artImage='',artActiveAudio=new Set(),artAudioTimers=new Set();
let soonyoungRevealed=localStorage.getItem('shindo_soonyoung_known_v105')==='1';
let minghaoRevealed=localStorage.getItem('shindo_minghao_known_v105')==='1';
function stopArtAudio(){for(const timeout of artAudioTimers)clearTimeout(timeout);artAudioTimers.clear();for(const a of artActiveAudio){a.pause();a.currentTime=0}artActiveAudio.clear()}
function playArtAudio(cue){
 const defs={surprise:['surprise_sound01.mp3',.7,0],walk:['walk_foot01.mp3',.65,5500],door:['open_close_door01.wav',.7,2500]};
 const config=defs[cue];if(!config)return;
 const a=new Audio('story-audio/'+config[0]);a.volume=config[1];artActiveAudio.add(a);
 const dispose=()=>{artActiveAudio.delete(a);a.pause()};
 a.addEventListener('ended',dispose,{once:true});a.addEventListener('error',dispose,{once:true});a.play().catch(dispose);
 if(config[2]){const id=setTimeout(()=>{artAudioTimers.delete(id);dispose()},config[2]);artAudioTimers.add(id)}
}
function setArtSceneArtwork(scene){
 if(scene.artStart){artLocation='main';artImage=''}
 if(scene.artLocation)artLocation=scene.artLocation;
 if(scene.artImageClear)artImage='';
 if(scene.artImage)artImage=scene.artImage;
 // Location/image placeholders: keep a solid dark backing until the images are supplied.
 storyBackdrop.style.backgroundImage='linear-gradient(#080808,#080808)';
 overlay.classList.toggle('art-blackout',!!scene.artBlackout);
 if(scene.artFade){overlay.classList.add('confession-fade');setTimeout(()=>overlay.classList.remove('confession-fade'),1100)}
 if(scene.artAudio)playArtAudio(scene.artAudio);
}
function collectEvidence(id){
 const key='shindo_evidence_items_v105';let existing=[];
 try{existing=JSON.parse(localStorage.getItem(key)||'[]');if(!Array.isArray(existing))existing=[]}catch(e){}
 if(!existing.includes(id)){existing.push(id);localStorage.setItem(key,JSON.stringify(existing));window.SHINDO_addPlayRecord?.('증거품','증거품 획득: '+id);document.dispatchEvent(new Event('shindo-inventory-change'))}
}
function showEvidencePopup(scene){
 locked=true;box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
 collectEvidence(scene.evidenceId);
 const pop=document.createElement('div');pop.className='shindo-evidence-overlay';
 pop.innerHTML='<div class="shindo-evidence-card"><div class="shindo-evidence-kicker">증거품을 획득했다.</div><div class="shindo-evidence-title"></div><div class="shindo-evidence-desc"></div><button class="shindo-evidence-confirm" type="button">확인</button></div>';
 pop.querySelector('.shindo-evidence-title').textContent='['+scene.evidenceTitle+' 획득]';
 pop.querySelector('.shindo-evidence-desc').textContent=scene.evidenceDescription;
 overlay.appendChild(pop);
 pop.querySelector('button').onclick=e=>{e.stopPropagation();pop.remove();locked=false;next()};
}
function playExtraAudio(filename,volume=.7){const a=new Audio('story-audio/'+filename);a.volume=volume;a.play().catch(()=>{});return a}
function bell(times){for(let i=0;i<times;i++)setTimeout(()=>playExtraAudio('oath-bell-05.mp3',.75),i*3600)}
// v141: Both central-square bell cues use gongyang-bell-01.wav.
// Each cue plays once for no more than 6 seconds, then stops automatically.
let gongyangBellAudio=null,gongyangApplauseAudio=null,gongyangBellTimer=null,leaderShoutAudio=null;
function stopLeaderShout(){if(leaderShoutAudio){leaderShoutAudio.pause();leaderShoutAudio.currentTime=0;leaderShoutAudio=null}}
function playLeaderShout(){stopLeaderShout();const a=playExtraAudio('gongyang-leader-shout.mp3',.85);leaderShoutAudio=a;a.addEventListener('ended',()=>{if(leaderShoutAudio===a)leaderShoutAudio=null},{once:true})}
function stopGongyangBell(){
 if(gongyangBellTimer!==null){clearTimeout(gongyangBellTimer);gongyangBellTimer=null}
 if(gongyangBellAudio){gongyangBellAudio.pause();gongyangBellAudio.currentTime=0;gongyangBellAudio=null}
}
function stopGongyangApplause(){if(gongyangApplauseAudio){gongyangApplauseAudio.pause();gongyangApplauseAudio.currentTime=0;gongyangApplauseAudio=null}}
function playGongyangBell(id){
 stopGongyangBell();
 // Single official bell source for both central-square cues; never loop.
 const audio=playExtraAudio('gongyang-bell-01.wav',.9);
 gongyangBellAudio=audio;
 audio.loop=false;
 gongyangBellTimer=setTimeout(()=>{if(gongyangBellAudio===audio)stopGongyangBell()},6000);
 audio.addEventListener('ended',()=>{if(gongyangBellAudio===audio)stopGongyangBell()},{once:true});
}
function startGongyangApplause(){
 // Do not cut off the continuous bell when applause begins.
 stopGongyangApplause();
 gongyangApplauseAudio=playExtraAudio('gongyang-applause-01.wav',.85);
 gongyangApplauseAudio.addEventListener('ended',()=>{gongyangApplauseAudio=null},{once:true});
}

let confessionTickAudio=null,confessionTickLouder=false;
function stopEndingBell(){if(endingBellTimer){clearInterval(endingBellTimer);endingBellTimer=null}if(endingBell){endingBell.pause();endingBell.currentTime=0;endingBell=null}}
function stopConfessionTick(){
 if(confessionTickStartTimer!==null){clearInterval(confessionTickStartTimer);confessionTickStartTimer=null}
 if(confessionDoorAudio)confessionDoorAudio.removeEventListener('ended',onConfessionDoorEnded);
 if(confessionTickAudio){
  if(confessionTickAudio!==clockStrikeTemplate){confessionTickAudio.pause();confessionTickAudio.currentTime=0}
  confessionTickAudio=null;
 }
 stopClockStrikes();
}
function onConfessionDoorEnded(){/* v97: confession clock disabled */}
function setConfessionTick(speed,volume){stopConfessionTick(); /* v97: confession clock disabled */}
function startConfessionTick(){stopConfessionTick(); /* v97: confession clock disabled */}
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
 if(name==='murmur'||name==='applause'||name==='wake-rustle'){playExtraAudio(name+'.wav',name==='applause'?.85:.6);return}
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
// v85: Typewriter for dialogue, inner monologue, and narration (scene descriptions).
// Preserve existing inline <strong> highlights and allow a second click to reveal the full line.
let vnTypingTimer=null, vnTypingFinish=null, vnTypingOnComplete=null;
let confessionQuestionTimers=[];
function clearConfessionQuestionTimers(){for(const t of confessionQuestionTimers)clearTimeout(t);confessionQuestionTimers=[];portrait.classList.remove('vn-question-fade')}
function runVnTypingComplete(){const callback=vnTypingOnComplete;vnTypingOnComplete=null;if(callback)callback()}
function stopVnTyping(reveal=false){
 if(vnTypingTimer!==null){cancelAnimationFrame(vnTypingTimer);vnTypingTimer=null}
 const done=vnTypingFinish;vnTypingFinish=null;
 if(reveal && done){done();runVnTypingComplete()}
 if(!reveal)vnTypingOnComplete=null;
}
function beginVnTyping(onComplete=null){
 stopVnTyping(false);
 vnTypingOnComplete=onComplete;
 const walker=document.createTreeWalker(content,NodeFilter.SHOW_TEXT);
 const nodes=[];let n;
 while((n=walker.nextNode()))nodes.push(n);
 const originals=nodes.map(node=>Array.from(node.nodeValue||''));
 const total=originals.reduce((sum,chars)=>sum+chars.length,0);
 if(!total){runVnTypingComplete();return;}
 for(const node of nodes)node.nodeValue='';
 let shown=0, activeNode=0, activeOffset=0, lastStamp=null, remainder=0;
 // Append only newly visible characters; don't rewrite the entire dialogue DOM every 30ms.
 function revealUpTo(goal){
  let increment=goal-shown;
  while(increment>0&&activeNode<nodes.length){
   const chars=originals[activeNode];
   const take=Math.min(increment,chars.length-activeOffset);
   if(take>0){nodes[activeNode].appendData(chars.slice(activeOffset,activeOffset+take).join(''));activeOffset+=take;shown+=take;increment-=take}
   if(activeOffset>=chars.length){activeNode++;activeOffset=0}
  }
 }
 vnTypingFinish=()=>revealUpTo(total);
 function frame(stamp){
  if(vnTypingTimer===null)return;
  if(lastStamp===null){lastStamp=stamp}
  // Catch up after slow frames without blocking the UI or changing the overall typing rate.
  remainder+=Math.max(0,Math.min(stamp-lastStamp,250));lastStamp=stamp;
  const count=Math.floor(remainder/30);
  if(count>0){remainder-=count*30;revealUpTo(Math.min(total,shown+count))}
  if(shown>=total){vnTypingOnComplete=null;stopVnTyping(false);if(onComplete)onComplete();return}
  vnTypingTimer=requestAnimationFrame(frame);
 }
 vnTypingTimer=requestAnimationFrame(frame);
}
function startConfessionQuestionTransition(){
 // Dialogue stays visible and legible; only the portrait fades.
 locked=true;
 portrait.classList.remove('vn-question-fade');
 // Force a style flush so the opacity transition starts from the current visible portrait.
 void portrait.offsetWidth;
 portrait.classList.add('vn-question-fade');
 confessionQuestionTimers.push(setTimeout(()=>{
   // Cut the entire scene behind the dialogue to fully opaque black in one beat.
   overlay.classList.add('confession-blackout');
   portrait.hidden=true;
   portrait.classList.remove('vn-question-fade');
   confessionQuestionTimers.push(setTimeout(()=>{locked=false},130));
 },780));
}
function save(){try{localStorage.setItem(KEY,String(index));localStorage.setItem('shindo_story_started_v37','1');localStorage.setItem('shindo_sleep_gate_v48','0')}catch(e){}refreshInventoryVisibility()}
const DAY2_START=scenes.findIndex(x=>x.day===2 || (x.text&&x.text.includes("봉봉 씨! 새벽기도 안 가세요?")));
function findPrayerBranchStart(branch){
 return scenes.findIndex((scene,sceneIndex)=>sceneIndex>PRAYER_SCENE_START&&scene.prayerBranch===branch);
}
function render(){clearTimeout(timer);clearConfessionQuestionTimers();stopVnTyping(false);const scene=scenes[index];if(!scene){finish();return}
 // Keep the day in sync with real story progress, including refreshed sessions.
 try{localStorage.setItem('shindo_current_story_day_v109',String(index>=DAY2_START?2:1))}catch(_){}
const existingChoiceModal=overlay.querySelector('.shindo-choices');if(existingChoiceModal&&scene.kind!=='art-choice'&&scene.kind!=='art-end'&&scene.kind!=='prayer-choice'&&scene.kind!=='prayer-end'&&scene.kind!=='day2-morning-choice'&&scene.kind!=='day2-prayer-choice'&&scene.kind!=='choice')existingChoiceModal.style.display='none';
if(!scene.specialMinghao){duoLayer.classList.remove('is-active');overlay.classList.remove('is-recall');}
applySceneBackdrop(index,scene);
 if(scene.prayerRoom){storyBackdrop.style.backgroundImage='linear-gradient(#080808,#080808)';overlay.classList.remove('confession-blackout')}else{stopPrayerClock();stopPrayerAudio();stopPrayerBell()}
 if(scene.prayerStart)startPrayerClock();
 if(scene.artHall){stopPrayerClock();stopPrayerAudio();stopPrayerBell();overlay.classList.remove('confession-blackout');setArtSceneArtwork(scene)}else{stopArtAudio();overlay.classList.remove('art-blackout')}

// Central-square bells: two identical 6-second bell-01 cues.
// Both stop on leaving the square/morning-activity sequence.
const squareBellStart=scenes.findIndex(x=>x.text==='그때였다.' && x.gongyangBell==='01');
const squareBellExit=scenes.findIndex(x=>x.kind==='day2-morning-choice' && x.branch===1);
const insideSquareStory=squareBellStart>=0 && squareBellExit>=0 && index>=squareBellStart && index<squareBellExit && selectedBranch===1;
if(!insideSquareStory){
 stopGongyangBell();
 stopLeaderShout();
}
if(index>=DAY2_START){stopConfessionTick();stopSanctuaryTick()}
if(scene.prayer&&day2Prayer&&scene.prayer!==day2Prayer){index++;save();render();return}
if(scene.branch&&selectedBranch&&scene.branch!==selectedBranch){index++;save();render();return}
 if(scene.prayerBranch&&prayerBranch&&scene.prayerBranch!==prayerBranch){index++;save();render();return}
 if(scene.artBranch&&artBranch&&scene.artBranch!==artBranch){index++;save();render();return}
 if(scene.prayerAudio)prayerAudioCue(scene.prayerAudio);
if(scene.wakeFadeIn){overlay.classList.remove('confession-blackout');overlay.classList.remove('sleep-fadeout');overlay.classList.add('sleep-fadein');setTimeout(()=>overlay.classList.remove('sleep-fadein'),980)}
if(scene.kind==='sleep-transition'){
 const center=overlay.querySelector('.vn-center')||(()=>{const el=document.createElement('div');el.className='vn-center';overlay.appendChild(el);return el})();
 box.style.display='none';portrait.hidden=true;illustration.hidden=true;speakerTag.textContent='';content.textContent='';overlay.querySelector('.vn-hint').style.display='none';
 overlay.classList.remove('sleep-fadein');
 overlay.classList.add('sleep-fadeout');
 locked=true;
 timer=setTimeout(()=>{
  overlay.classList.remove('sleep-fadeout');
  overlay.classList.add('confession-blackout');
  center.textContent=scene.text||'';
  center.style.display='block';
  timer=setTimeout(()=>{center.style.display='none';locked=false;next()},1700);
 },950);
 return
}
if(scene.kind==='choice'){showChoice();return}
if(scene.kind==='day2-prayer-choice'){showDay2Choice('prayer');return}
if(scene.prayerStart)window.SHINDO_applyAffinityEvent?.('room','기도관',2);
if(index===ART_SCENE_START)window.SHINDO_applyAffinityEvent?.('room','예술당',2);
if(scene.kind==='day2-morning-choice'){showDay2Choice('morning');return}
 if(scene.kind==='art-choice'){stopArtAudio();showArtChoice();return}
 if(scene.kind==='art-end'){stopArtAudio();showArtEnd();return}
 if(scene.kind==='evidence-popup'){showEvidencePopup(scene);return}
 if(scene.kind==='prayer-choice'){stopPrayerClock();showPrayerChoice();return}
 if(scene.kind==='prayer-end'){stopPrayerClock();stopPrayerAudio();stopPrayerBell();showPrayerEnd();return}
 if(scene.kind==='prayer-wait'||scene.kind==='prayer-sfx-wait'){
  box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';locked=true;
  timer=setTimeout(()=>{locked=false;next()},scene.duration||3000);return;
 }
 if(scene.kind==='prayer-sfx'){index++;save();render();return}

if(scene.kind==='ending'){showEnding();return}
if(scene.square)overlay.classList.remove("confession-blackout");
if(scene.squareBlack)overlay.classList.add("confession-blackout");
if(scene.wakeShake){sound('wake-rustle');overlay.classList.add("day2-shake");setTimeout(()=>overlay.classList.remove("day2-shake"),2000)}
if(scene.screenShake){overlay.classList.add("day2-shake");setTimeout(()=>overlay.classList.remove("day2-shake"),800)}
if(scene.gongyangBell)playGongyangBell(scene.gongyangBell);
if(scene.leaderShout)playLeaderShout();
if(scene.gongyangApplause==='start')startGongyangApplause();
if(gongyangApplauseAudio && scene.gongyangApplause!=='start' && scene.gongyangApplause!=='continue')stopGongyangApplause();
// v97: ignore confession tick-speed cues; no clock plays inside the confessional.
if(scene.stopTick)stopConfessionTick();
// v97: no delayed confession ticks.
if(scene.bellLoop){stopEndingBell();const ring=()=>{endingBell=playExtraAudio('oath-bell-05.mp3',.12)};ring();endingBellTimer=setInterval(ring,3900)}
if(scene.bellStop)stopEndingBell();
if(scene.bellLoud)playExtraAudio('oath-bell-05.mp3',1);
if(scene.blackout)overlay.classList.add('confession-blackout');
if(scene.fade){overlay.classList.add('confession-fade');setTimeout(()=>overlay.classList.remove('confession-fade'),1100)}
overlay.classList.toggle('day',index>=3);
if(scene.kind==='sfx'){if(scene.clearPortrait){currentPortrait='';portrait.hidden=true}sound(scene.sound);index++;save();render();return}
if(!(scene.sound==='forest'&&index===22))sound(scene.sound);
if(scene.reveal)revealed=true;
if(scene.revealJihoon)jihoonRevealed=true;
 if(scene.revealHansol){hansolRevealed=true;localStorage.setItem('shindo_hansol_known_v99','1')}
 if(scene.revealSeokmin){seokminRevealed=true;localStorage.setItem('shindo_seokmin_known_v99','1')}
 if(scene.revealChan){chanRevealed=true;localStorage.setItem('shindo_chan_known_v99','1')}
 if(scene.revealSoonyoung){soonyoungRevealed=true;localStorage.setItem('shindo_soonyoung_known_v105','1')}
 if(scene.revealMinghao){minghaoRevealed=true;localStorage.setItem('shindo_minghao_known_v105','1')}
 // Character slots unlock only on an actual introduction/encounter.
 const metByReveal={reveal:'승철',revealJihoon:'지훈',revealHansol:'한솔',revealSeokmin:'석민',revealChan:'찬',revealSoonyoung:'순영',revealMinghao:'명호'};
 for(const [flag,name] of Object.entries(metByReveal)){if(scene[flag])window.SHINDO_markCharacterMet?.(name)}

if(scene.enterSanctuary){overlay.classList.add('sanctuary');stopSanctuaryTick();bell(2)}
if(scene.bellOnce)bell(1);
if(scene.leaveSanctuary){stopSanctuaryTick();currentPortrait='';portrait.hidden=true;overlay.classList.remove('sanctuary');overlay.classList.add('sanctuary-leaving');setTimeout(()=>overlay.classList.remove('sanctuary-leaving'),1600)}
if(scene.enterConfession){stopConfessionTick();/* Keep the confession door sound; do not schedule ticking. */}
if(scene.eventFootsteps){if(!scene.silentFootsteps)sound('footsteps');portrait.hidden=true;currentPortrait='';box.style.display='none';locked=true;timer=setTimeout(()=>{locked=false;next()},3000);return}
if(scene.pencil)keepPencil();else stopPencil();
// v97: ignore volume-up cue for the removed confession clock.
illustration.hidden=!scene.illustration;
illustration.classList.toggle('vn-fade',scene.kind==='image'&&scene.illustration!=='mail-01');
illustration.classList.toggle('vn-mail-zoom',scene.kind==='image'&&scene.illustration==='mail-01');
if(scene.illustration)illustration.src='story-illustrations/'+scene.illustration+'.png';
if(scene.kind==='image'){
 portrait.hidden=true;speakerTag.textContent='';content.textContent='';box.style.display='none';
 overlay.querySelector('.vn-hint').style.display='none';locked=true;
 timer=setTimeout(()=>{locked=false;next()},scene.duration||3000);return;
}

if(scene.kind==='dialogue'&&scene.speaker==='원우'&&!scene.maskSpeaker)window.SHINDO_markCharacterMet?.('원우');
const duoVisible=scene.specialMinghao?setSpecialPortraits(scene):false;
// V115: the special branch has its own recognition moments, independent of earlier branches.
// Minghao has already been met at the start of this 60+ story. Hansol remains
// unidentified until the protagonist explicitly recognises him.
if(scene.specialMinghao){
 minghaoRevealed=true;
 localStorage.setItem('shindo_minghao_known_v105','1');
 window.SHINDO_markCharacterMet?.('명호');
 const hansolRevealIndex=scenes.findIndex(s=>s.specialMeetHansol===true);
 if(scene.specialMeetHansol || (hansolRevealIndex>=0 && index>hansolRevealIndex)){
  hansolRevealed=true;
  localStorage.setItem('shindo_hansol_known_v99','1');
  window.SHINDO_markCharacterMet?.('한솔');
 }
}
if(scene.kind==='dialogue'||(scene.kind==='narration'&&(scene.prayerRoom||scene.artHall)&&(scene.portrait||duoVisible))){
 if(scene.clearPortrait){currentPortrait='';portrait.hidden=true}
 if(duoVisible){currentPortrait='';portrait.dataset.officialRequest=String((Number(portrait.dataset.officialRequest)||0)+1);portrait.hidden=true;portrait.removeAttribute('src');} // V116: prevent lingering solo portrait behind two-person scene
 if(scene.portrait)currentPortrait=scene.portrait;
 if(scene.portraitPlaceholder)currentPortrait='';
 speakerTag.textContent=scene.kind==='narration'||scene.inner?'':(scene.maskSpeaker||scene.speaker==='한솔'&&!hansolRevealed||scene.speaker==='석민'&&!seokminRevealed||scene.speaker==='찬'&&!chanRevealed?'??':scene.speaker==='순영'&&!soonyoungRevealed?'??':scene.speaker==='명호'&&!minghaoRevealed?'??':scene.speaker==='주인공'?'김봉봉':scene.speaker==='승철'&&!revealed?'??':scene.speaker==='지훈'&&!jihoonRevealed?'??':scene.speaker);
 content.classList.toggle('vn-inner',!!scene.inner);
 if(currentPortrait){
  const specialSolo=!!(scene.specialMinghao&&scene.portrait&&!duoVisible);
  applyPortraitProfile(currentPortrait);
  portrait.classList.toggle('special-solo',specialSolo);
  portrait.dataset.portraitKey=(specialSolo?'solo-':'')+currentPortrait;
  portrait.dataset.officialShouldShow=scene.illustration||duoVisible?'0':'1';
  assignOfficialPortrait(portrait,portrait.dataset.portraitKey);
  portrait.classList.toggle('prayer-silhouette',!!scene.silhouette);
  portrait.classList.toggle('art-silhouette',!!(scene.artHall&&scene.silhouette));
 }else{portrait.classList.remove('special-solo');portrait.dataset.officialRequest=String((Number(portrait.dataset.officialRequest)||0)+1);portrait.hidden=true;portrait.removeAttribute('src')}
}else{
 if(scene.clearPortrait||scene.specialMinghao)currentPortrait='';
 speakerTag.textContent='';content.classList.remove('vn-inner');
 portrait.hidden=true;
}

 if(scene.kind==='transition'){box.style.display='none';let center=overlay.querySelector('.vn-center');if(!center){center=document.createElement('div');center.className='vn-center';overlay.appendChild(center)}center.textContent=scene.text;center.style.display='block';overlay.querySelector('.vn-hint').style.display='none';locked=true;timer=setTimeout(()=>{locked=false;next()},scene.text?2300:3300);return}
 const center=overlay.querySelector('.vn-center');if(center)center.style.display='none';box.style.display='flex';overlay.querySelector('.vn-hint').style.display='block';content.textContent=scene.maskWonwoo?scene.text.replace('원우','??'):scene.text;content.style.fontSize=scene.fontScale?String(scene.fontScale)+'em':(scene.largeText?'1.25em':'');content.style.fontWeight=scene.boldAll?'800':'';content.style.color=scene.redText?'#e02020':'';
 if(scene.redWord){const at=content.textContent.indexOf(scene.redWord);if(at>=0){const txt=content.textContent;content.textContent='';content.append(document.createTextNode(txt.slice(0,at)));const b=document.createElement('strong');b.style.color='#d41616';b.textContent=scene.redWord;content.append(b,document.createTextNode(txt.slice(at+scene.redWord.length)))}}
 if(scene.boldPhrase){const at=content.textContent.indexOf(scene.boldPhrase);if(at>=0){const txt=content.textContent;content.textContent='';content.append(document.createTextNode(txt.slice(0,at)));const b=document.createElement('strong');b.textContent=scene.boldPhrase;content.append(b,document.createTextNode(txt.slice(at+scene.boldPhrase.length)))}}
 if(scene.boldWord){const target=scene.boldWord;const at=content.textContent.indexOf(target);if(at>=0){const txt=content.textContent;content.textContent='';content.append(document.createTextNode(txt.slice(0,at)));const b=document.createElement('strong');b.textContent=target;content.append(b,document.createTextNode(txt.slice(at+target.length)))}}
 if(scene.kind==='dialogue'||scene.kind==='narration')queueMicrotask(()=>warmUpcomingPortraits(index));
 if(scene.kind==='dialogue'||scene.kind==='narration'||scene.kind==='line')beginVnTyping(scene.recall?(()=>{timer=setTimeout(()=>{locked=false;next()},1300)}):(scene.delayedConfessionBlackout?startConfessionQuestionTransition:null));
 if(scene.follow){locked=true;timer=setTimeout(()=>{locked=false;next()},1600)}
 else if(index===12){locked=true;timer=setTimeout(()=>{locked=false;next()},2000)}
 else locked=!!scene.delayedConfessionBlackout||!!scene.recall;
}
function day2Ring(times,volume){for(let i=0;i<times;i++)setTimeout(()=>{if(overlay.classList.contains('active'))playExtraAudio('oath-bell-05.mp3',volume)},i*3300)}
// Temporary development shortcut: return to DAY 01 without resetting the mail login or browser state.
function restartFromDay1(){
 duoLayer.classList.remove('is-active');overlay.classList.remove('is-recall');
 clearTimeout(timer);timer=null;clearConfessionQuestionTimers();
 stopVnTyping(false);stopGongyangBell();stopLeaderShout();stopGongyangApplause();stopPencil();
 stopConfessionTick();stopEndingBell();stopSanctuaryTick();stopPrayerClock();stopPrayerAudio();stopPrayerBell();stopArtAudio();prayerBranch=0;artBranch=0;artLocation='main';artImage='';localStorage.removeItem('shindo_art_branch_v105');
 if(confessionTickStartTimer){clearTimeout(confessionTickStartTimer);confessionTickStartTimer=null}
 if(confessionDoorAudio){confessionDoorAudio.pause();confessionDoorAudio.currentTime=0;confessionDoorAudio=null}
 if(storySfxTimer){clearTimeout(storySfxTimer);storySfxTimer=null}
 if(storySfx){storySfx.pause();storySfx.currentTime=0;storySfx=null}
 const choices=overlay.querySelector('.shindo-choices');if(choices)choices.style.display='none';
 overlay.classList.remove('sanctuary','sanctuary-leaving','day','confession-blackout','confession-fade','day2-shake','sleep-fadeout','sleep-fadein');
 const end=overlay.querySelector('.shindo-ending');if(end)end.remove();overlay.querySelectorAll('.shindo-evidence-overlay').forEach(x=>x.remove());
 endingTimers.forEach(clearTimeout);endingTimers=[];
 selectedBranch=0;day2Prayer=0;day2Morning='';revealed=false;jihoonRevealed=false;soonyoungRevealed=false;minghaoRevealed=false;
 currentPortrait='';portrait.hidden=true;illustration.hidden=true;confessionTickLouder=false;
 ['shindo_confession_branch','shindo_day2_prayer','shindo_day2_morning','shindo_prayer_branch_v99','shindo_soonyoung_known_v105','shindo_minghao_known_v105','shindo_evidence_items_v105','shindo_art_branch_v105','shindo_play_history_v107','shindo_affinity_v107','shindo_affinity_events_v111','shindo_affinity_unread_v125','shindo_current_story_day_v109'].forEach(k=>localStorage.removeItem(k));
 const day1Start=scenes.findIndex(s=>s.kind==='transition'&&s.text==='1일차 아침');
 index=day1Start>=0?day1Start:0;
 locked=false;save();render();
}
function showDay2Choice(type){locked=true;box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 const prayer=type==='prayer';const options=prayer?['새벽기도에 참석한다','새벽기도에 참석하지 않는다']:['기도관','예술당','생활관','본당','고해소','공양실'];
 el.classList.toggle('shindo-morning-grid',!prayer);
 el.innerHTML='<h2>'+(prayer?'새벽기도에 참석할까?':'오전 활동이다. 어디로 가볼까?')+'</h2>'+(prayer?options.map((t,i)=>'<button data-choice="'+(i+1)+'">'+t+'</button>').join(''):'<div class="shindo-morning-options">'+options.map((t,i)=>'<button data-choice="'+(i+1)+'">'+t+'</button>').join('')+'</div><button type="button" class="shindo-day1-restart">↺ 1일차부터 다시 시작 (임시)</button>');el.style.display='flex';
 if(!prayer)el.querySelector('.shindo-day1-restart').onclick=e=>{e.stopPropagation();restartFromDay1()};
 el.querySelectorAll('[data-choice]').forEach(b=>b.onclick=e=>{e.stopPropagation();if(prayer){day2Prayer=Number(b.dataset.choice);window.SHINDO_addPlayRecord?.('선택','새벽기도: '+options[day2Prayer-1]);localStorage.setItem('shindo_day2_prayer',String(day2Prayer));window.SHINDO_applyAffinityEvent?.('prayer',day2Prayer===1?'참석':'불참',2);el.style.display='none';locked=false;next()}else{day2Morning=options[Number(b.dataset.choice)-1];window.SHINDO_addPlayRecord?.('선택','오전 활동 장소: '+day2Morning);localStorage.setItem('shindo_day2_morning',day2Morning);window.SHINDO_applyAffinityEvent?.('room',day2Morning,2);
 if(day2Morning==='예술당'){
  artBranch=0;artLocation='main';artImage='';stopArtAudio();el.style.display='none';currentPortrait='';portrait.hidden=true;index=ART_SCENE_START;locked=false;save();render();
 }else if(day2Morning==='기도관'){
  prayerBranch=0;localStorage.removeItem('shindo_prayer_branch_v99');el.style.display='none';currentPortrait='';portrait.hidden=true;index=PRAYER_SCENE_START;locked=false;save();render();
 }else{
  el.innerHTML='<h2>'+day2Morning+'</h2><p>이후 이야기는 다음 업데이트에서 이어집니다.</p><button type="button" class="shindo-morning-return">오전 활동 선택지 돌아가기</button><button type="button" class="shindo-day1-restart">↺ 1일차부터 다시 시작 (임시)</button>';el.querySelector('.shindo-morning-return').onclick=e=>{e.stopPropagation();returnToMorningActivities()};el.querySelector('.shindo-day1-restart').onclick=e=>{e.stopPropagation();restartFromDay1()};locked=true;
 }}})
}
function showPrayerChoice(){
 locked=true;box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid');el.classList.add('shindo-prayer-grid');
 const options=['단상 위 청소','자는 사람 깨우기','성경 한 장 넘기기','청소 돕기'];
 el.innerHTML='<h2>뭐부터 거들어 볼까?</h2><div class="shindo-morning-options">'+options.map((t,i)=>'<button data-prayer="'+(i+1)+'">'+t+'</button>').join('')+'</div>';
 el.style.display='flex';el.querySelectorAll('[data-prayer]').forEach(b=>b.onclick=e=>{e.stopPropagation();stopPrayerClock();stopPrayerAudio();stopPrayerBell();stopVnTyping(false);prayerBranch=Number(b.dataset.prayer);window.SHINDO_addPlayRecord?.('선택','기도관 활동: '+options[prayerBranch-1]);localStorage.setItem('shindo_prayer_branch_v99',String(prayerBranch));window.SHINDO_applyAffinityEvent?.('person','기도관 활동: '+options[prayerBranch-1],2);const branchStart=findPrayerBranchStart(prayerBranch);el.style.display='none';el.classList.remove('shindo-prayer-grid');currentPortrait='';portrait.hidden=true;illustration.hidden=true;if(branchStart!==-1){index=branchStart;locked=false;save();render();return}locked=false;next()});
}

function returnToMorningActivities(){
 duoLayer.classList.remove('is-active');overlay.classList.remove('is-recall');
 clearTimeout(timer);timer=null;stopVnTyping(false);stopPrayerClock();stopPrayerAudio();stopPrayerBell();stopArtAudio();stopGongyangBell();stopLeaderShout();stopGongyangApplause();
 currentPortrait='';portrait.hidden=true;illustration.hidden=true;portrait.classList.remove('prayer-silhouette','art-silhouette');
 prayerBranch=0;artBranch=0;artLocation='main';artImage='';
 localStorage.removeItem('shindo_prayer_branch_v99');localStorage.removeItem('shindo_art_branch_v105');
 const el=overlay.querySelector('.shindo-choices');if(el){el.style.display='none';el.classList.remove('shindo-prayer-grid','shindo-art-grid')}
 overlay.classList.remove('art-blackout','confession-fade','confession-blackout');
 index=scenes.findIndex(x=>x.kind==='day2-morning-choice');day2Morning='';localStorage.removeItem('shindo_day2_morning');
 locked=false;save();render();
}
function startMinghaoSpecial(isTest){
 stopArtAudio();stopVnTyping(false);clearTimeout(timer);
 artBranch=4;artLocation='main';artImage='';
 localStorage.setItem('shindo_art_branch_v105','4');
 const menu=overlay.querySelector('.shindo-choices');if(menu)menu.style.display='none';
 currentPortrait='';portrait.hidden=true;illustration.hidden=true;duoLayer.classList.remove('is-active');
 const first=scenes.findIndex(scene=>scene.specialMinghao===true);
 if(first<0)return;
 index=first;locked=false;save();render();
}
function showArtChoice(){
 locked=true;box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid','shindo-prayer-grid');el.classList.add('shindo-art-grid');
 const options=['호랑이 그림 보기','캔버스 옮기기','예술당 조사하기'];
 el.innerHTML='<h2>눈길이 가는 곳이 많다. 뭐부터 해볼까?</h2><div class="art-branch-options">'+options.map((text,i)=>'<button data-art="'+(i+1)+'">'+text+'</button>').join('')+'<button type="button" class="shindo-special-test">[테스트] 명호 친밀도 60+ 특별 대화</button></div>';
 el.style.display='flex';
 el.querySelector('.shindo-special-test').onclick=e=>{e.stopPropagation();startMinghaoSpecial(true)};
 el.querySelectorAll('[data-art]').forEach(b=>b.onclick=e=>{
  e.stopPropagation();stopArtAudio();stopVnTyping(false);artBranch=Number(b.dataset.art);window.SHINDO_addPlayRecord?.('선택','예술당 활동: '+options[artBranch-1]);artLocation='main';artImage='';
  localStorage.setItem('shindo_art_branch_v105',String(artBranch));window.SHINDO_applyAffinityEvent?.('person','예술당 활동: '+options[artBranch-1],2);
  if(artBranch===2&&getMinghaoAffinity()>=60){startMinghaoSpecial(false);return}
  const target=scenes.findIndex((x,i)=>i>ART_SCENE_START&&x.artBranch===artBranch);
  currentPortrait='';portrait.hidden=true;illustration.hidden=true;el.style.display='none';
  if(target>=0){index=target;locked=false;save();render()}
 });
}
function showArtEnd(){
 duoLayer.classList.remove('is-active');overlay.classList.remove('is-recall');
 locked=true;box.style.display='none';portrait.hidden=true;currentPortrait='';illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid','shindo-prayer-grid','shindo-art-grid');
 el.innerHTML='<h2>예술당 활동을 마쳤다.</h2><button type="button" class="shindo-morning-return">오전 활동 선택지 돌아가기</button><button type="button" class="shindo-day1-restart">↺ 1일차부터 다시 시작 (임시)</button><button type="button" class="shindo-feedback-direct">피드백 화면 바로가기</button>';
 el.style.display='flex';el.querySelector('.shindo-morning-return').onclick=e=>{e.stopPropagation();returnToMorningActivities()};
 el.querySelector('.shindo-day1-restart').onclick=e=>{e.stopPropagation();restartFromDay1()};
 el.querySelector('.shindo-feedback-direct').onclick=e=>{e.stopPropagation();window.SHINDO_openFeedback?.()};
}
function showPrayerEnd(){
 locked=true;box.style.display='none';portrait.hidden=true;currentPortrait='';illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid','shindo-prayer-grid');
 el.innerHTML='<h2>기도관 활동을 마쳤다.</h2><button type="button" class="shindo-prayer-reselect">오전 활동 선택지 돌아가기</button><button type="button" class="shindo-day1-restart">↺ 1일차부터 다시 시작 (임시)</button><button type="button" class="shindo-feedback-direct">피드백 화면 바로가기</button>';el.style.display='flex';
 el.querySelector('.shindo-prayer-reselect').onclick=e=>{e.stopPropagation();returnToMorningActivities()};
 el.querySelector('.shindo-day1-restart').onclick=e=>{e.stopPropagation();restartFromDay1()};
 el.querySelector('.shindo-feedback-direct').onclick=e=>{e.stopPropagation();window.SHINDO_openFeedback?.()};
}
function showChoice(){locked=true;box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}el.classList.remove('shindo-morning-grid');el.innerHTML='<h2>어떻게 대답할까?</h2><p>원우의 질문에 답해야 한다.</p><button data-branch="1">아직은 때가 아니다. 무조건 긍정적이고 헌신적인 발언을 하자.</button><button data-branch="2">사제를 포섭해보자. 중요한 자료를 얻을 수 있을지도 모른다.</button>';el.style.display='flex';el.querySelectorAll('button').forEach(b=>b.onclick=e=>{e.stopPropagation();selectedBranch=Number(b.dataset.branch);window.SHINDO_addPlayRecord?.('선택','고해소 선택: '+(selectedBranch===1?'긍정적 발언':'사제 포섭 시도'));localStorage.setItem('shindo_confession_branch',String(selectedBranch));el.style.display='none';locked=false;next()})}
function showEnding(){stopVnTyping(false);stopGongyangBell();stopLeaderShout();stopGongyangApplause();stopConfessionTick();stopEndingBell();stopSanctuaryTick();box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';overlay.classList.add('confession-blackout');locked=true;const end=document.createElement('div');end.className='shindo-ending';end.innerHTML='<div class="shindo-ending-copy"><img class="shindo-ending-title-image" src="story-illustrations/ending-doksil-title.png" alt="독실"><p>신실한 종교인의 역할은 종교와 체계에 대한 반발을 보이는 존재를 싹부터 없애는 것입니다.</p></div>';overlay.appendChild(end);const later=(fn,ms)=>endingTimers.push(setTimeout(fn,ms));later(()=>{end.innerHTML='<div class="shindo-ending-logo">신도</div>'},3000);later(()=>{end.innerHTML='<div class="shindo-ending-logo">신도<span>神道</span></div>'},5000);later(()=>{const b=document.createElement('button');b.className='shindo-restart';b.textContent='처음부터 다시 하기';b.onclick=e=>{e.stopPropagation();stopEndingBell();stopConfessionTick();localStorage.removeItem('shindo_confession_branch');localStorage.removeItem('shindo_day2_prayer');localStorage.removeItem('shindo_day2_morning');localStorage.removeItem('shindo_affinity_v107');localStorage.removeItem('shindo_affinity_events_v111');localStorage.removeItem('shindo_affinity_unread_v125');localStorage.removeItem(KEY);localStorage.removeItem('shindo_story_started_v37');localStorage.removeItem('shindo_sleep_gate_v48');localStorage.removeItem('shindo_story_v55_extended');localStorage.removeItem('shindo_story_v66_sanctuary');['svter_first_launch_at_v1','svter_lock_reached_v1','svter_lock_deleted_notices_v33','kamille_new_mail_received_v32','kamille_new_mail_read_v32','kamille_newmail_popup_ack_v51','shindo_church_link_unlocked_v30','shindo_attachment_unlocked_v31'].forEach(k=>localStorage.removeItem(k));sessionStorage.removeItem('shindo_story_started_v37');location.reload()};end.appendChild(b)},7000)}
function finish(){
 stopVnTyping(false);stopGongyangBell();stopLeaderShout();stopGongyangApplause();stopPencil();stopConfessionTick();stopEndingBell();stopSanctuaryTick();if(confessionDoorAudio){confessionDoorAudio.pause();confessionDoorAudio.currentTime=0;confessionDoorAudio=null}if(storySfxTimer){clearTimeout(storySfxTimer);storySfxTimer=null}if(storySfx){storySfx.pause();storySfx.currentTime=0;storySfx=null}storyBackdrop.classList.remove('visible');storyUnderlay.classList.remove('visible');overlay.classList.remove("active","sanctuary","sanctuary-leaving","day");
 // Only finish after the player explicitly advances past the final dialogue.
 try{localStorage.setItem(KEY,'complete');localStorage.setItem('shindo_story_started_v37','1');localStorage.setItem('shindo_sleep_gate_v48','0')}catch(e){}
 window.SHINDO_openFeedback?.();
}
// V139: Preload the user-provided click once and play it synchronously on user input.
// AudioBuffer playback avoids the latency of constructing a fresh Audio element per click.
const dialogueClickFile='story-audio/dialogue-soft-click.wav';
const dialogueClickPlayers=Array.from({length:4},()=>{
 const el=new Audio(dialogueClickFile);
 el.preload='auto';
 try{el.load()}catch(_e){}
 return el;
});
let dialogueClickPlayerIndex=0;
let dialogueClickBuffer=null;
let dialogueClickBytes=null;
let dialogueClickDecodeStarted=false;
// Fetch early, without attempting autoplay. Keep the same WAV supplied by the user.
fetch(dialogueClickFile).then(response=>{
 if(!response.ok)throw new Error('Dialogue click audio HTTP '+response.status);
 return response.arrayBuffer();
}).then(bytes=>{dialogueClickBytes=bytes;}).catch(error=>{
 console.warn('[SHINDO] Dialogue click WAV could not be preloaded:',error);
});
function prepareDialogueClickBuffer(ctx){
 if(!ctx||!dialogueClickBytes||dialogueClickDecodeStarted)return;
 dialogueClickDecodeStarted=true;
 ctx.decodeAudioData(dialogueClickBytes.slice(0)).then(buffer=>{
  dialogueClickBuffer=buffer;
 }).catch(error=>{
  console.warn('[SHINDO] Dialogue click decode failed; using HTML audio:',error);
 });
}
function playDialogueAdvanceClick(){
 const ctx=audioContext();
 if(ctx){
  prepareDialogueClickBuffer(ctx);
  if(dialogueClickBuffer){
   try{
    const source=ctx.createBufferSource();
    const gain=ctx.createGain();
    source.buffer=dialogueClickBuffer;
    gain.gain.value=0.375; // V147: half of V146 Web Audio click gain
    source.connect(gain).connect(ctx.destination);
    source.start();
    return;
   }catch(error){console.warn('[SHINDO] WebAudio click failed; using HTML audio:',error)}
  }
 }
 // Immediate fallback on the first input, while the preloaded buffer decodes.
 const player=dialogueClickPlayers[dialogueClickPlayerIndex++%dialogueClickPlayers.length];
 try{
  player.pause();
  player.currentTime=0;
  player.volume=0.25; // V147: half of V146 fallback click volume
  const playback=player.play();
  if(playback&&typeof playback.catch==='function')playback.catch(error=>{
   console.warn('[SHINDO] Dialogue click playback blocked:',error);
  });
 }catch(error){console.warn('[SHINDO] Dialogue click playback error:',error)}
}
// V144: Every real dialogue-advance input gets a click, whether it reveals
// the current typewriter line or advances to the next line.
function next(userAdvance=false){
 if(locked)return;
 if(userAdvance && ['dialogue','narration','line'].includes(scenes[index]?.kind)){
  playDialogueAdvanceClick();
 }
 if(vnTypingTimer!==null){stopVnTyping(true);return;}
 if(index>=scenes.length-1){finish();return;}
 index++;save();render();
}
overlay.addEventListener('click',()=>{audioContext();next(true)});document.addEventListener('keydown',e=>{if(!overlay.classList.contains('active'))return;if(phoneDrawer.classList.contains('is-open'))return;/* Never hijack typing in feedback, including spaces and line breaks. */if(document.getElementById('shindo-feedback')?.classList.contains('sf-open'))return;if(e.target.closest('textarea,input,select,[contenteditable="true"],[role="textbox"]'))return;if(e.key===' '||e.key==='Enter'){e.preventDefault();audioContext();next(true)}});
window.SHINDO_startStory=()=>{
 clearConfessionQuestionTimers();stopGongyangBell();stopGongyangApplause();stopPencil();stopConfessionTick();stopEndingBell();stopSanctuaryTick();if(confessionDoorAudio){confessionDoorAudio.pause();confessionDoorAudio.currentTime=0;confessionDoorAudio=null}if(storySfxTimer){clearTimeout(storySfxTimer);storySfxTimer=null}if(storySfx){storySfx.pause();storySfx.currentTime=0;storySfx=null}confessionTickLouder=false;day2Prayer=Number(localStorage.getItem("shindo_day2_prayer")||0);day2Morning=localStorage.getItem("shindo_day2_morning")||"";prayerBranch=Number(localStorage.getItem('shindo_prayer_branch_v99')||0);artBranch=Number(localStorage.getItem('shindo_art_branch_v105')||0);selectedBranch=Number(localStorage.getItem("shindo_confession_branch")||0);overlay.classList.remove("sanctuary","sanctuary-leaving","day","confession-blackout","sleep-fadeout","sleep-fadein");
 if(localStorage.getItem(KEY)==='complete'&&!localStorage.getItem('shindo_story_v66_sanctuary')){localStorage.setItem(KEY,'66');localStorage.setItem('shindo_story_v66_sanctuary','1')}

 // Players who finished the previous release continue at the newly added dialogue.
 if(localStorage.getItem(KEY)==='complete'){
  const migrated=localStorage.getItem('shindo_story_v55_extended');
  if(!migrated){localStorage.setItem(KEY,'66');localStorage.setItem('shindo_story_v55_extended','1')}
  else{window.SHINDO_openFeedback?.();return}
 }
try{localStorage.setItem('shindo_story_started_v37','1');localStorage.setItem('shindo_sleep_gate_v48','0')}catch(e){};const n=Number(localStorage.getItem(KEY));index=Number.isInteger(n)&&n>=0&&n<scenes.length?n:0;revealed=scenes.slice(0,index+1).some(x=>x.reveal);jihoonRevealed=scenes.slice(0,index+1).some(x=>x.revealJihoon);
currentPortrait='';for(const scene of scenes.slice(0,index+1)){if(scene.clearPortrait)currentPortrait='';if(scene.portrait)currentPortrait=scene.portrait}
storyUnderlay.classList.add('visible');storyBackdrop.classList.add('visible');overlay.classList.add('active');if(scenes.slice(0,index+1).some(x=>x.enterSanctuary)&&!scenes.slice(0,index+1).some(x=>x.leaveSanctuary)){overlay.classList.add("sanctuary");if(!scenes[index].enterSanctuary)stopSanctuaryTick()}refreshInventoryVisibility();render()};
})();

