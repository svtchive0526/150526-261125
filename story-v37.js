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
 {kind:"dialogue",speaker:"주인공",text:"정말 힘든 하루였어.. 이제 자고 내일을 시작해야겠다.",branch:1,backdrop:"bg-living-quarters-exterior.png",clearPortrait:true},
 {kind:"sleep-transition",text:"2일차",branch:1,day:2},
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
 {"kind":"narration","text":"어쩌면 ‘공양’을 할지도 모른다. 라고,","branch":1},
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
 {"kind":"dialogue","speaker":"교주","text":"역경을 지나, 번성으로!","branch":1,"portrait":"elder-furious","leaderShout":true,"fontScale":2,"boldAll":true},
 {"kind":"narration","text":"신도들 사이에서 우레와 같은 박수 소리가 터져 나왔다.","branch":1,"gongyangApplause":"start","clearPortrait":true},
 {"kind":"narration","text":"발버둥 쳐봐도 소용없었다. 그 남자는 공양실 방향으로 질질 끌려갔다.","branch":1,"gongyangApplause":"continue"},
 {"kind":"narration","text":"풀잎 위로 상쾌한 바람이 불었다. 눈이 시리도록 맑은 아침이었다. 그래서 더 끔찍했다.","branch":1},
 {"kind":"narration","text":"교주의 말인즉슨, 최근 한 내부고발자가 인신 공양의 실태를 바깥으로 흘렸다.","branch":1},
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


// V156: Day 2 living-quarters common scene and four branches.
const LIVING_SCENE_START=scenes.length;
scenes.push(
 {"kind":"narration","livingHall":true,"text":"나를 포함한 신도 대부분이 생활하는 생활관이다.","livingLocation":"interior","clearPortrait":true},
 {"kind":"narration","livingHall":true,"text":"여기서는 신도들이 오늘 하루 먹을 식사 준비를 한다고 한다.","livingLocation":"interior","clearPortrait":true},
 {"kind":"narration","livingHall":true,"text":"나 역시 한쪽에 자리잡고 채소를 다듬으며 일손을 보태는 중이다.","livingLocation":"interior","clearPortrait":true},
 {"kind":"narration","livingHall":true,"text":"어느새 준비가 얼추 끝났다.","livingLocation":"interior","clearPortrait":true},
 {"kind":"narration","livingHall":true,"text":"슬슬 정보라도 수집하러 가볼까나.","livingLocation":"interior","clearPortrait":true},
 {"kind":"living-choice","livingHall":true,"livingLocation":"interior"},
 {"kind":"narration","livingHall":true,"text":"내 방에서 이제껏 모은 자료를 정리하는 중이다.","livingBranch":1,"livingLocation":"bongbong"},
 {"kind":"narration","livingHall":true,"text":"그리고…","livingBranch":1,"livingLocation":"bongbong"},
 {"kind":"narration","livingHall":true,"text":"정신을 차려 보니 하늘이 어둑어둑해지는 중이다.","livingBranch":1,"livingLocation":"bongbong"},
 {"kind":"narration","livingHall":true,"text":"아뿔싸.","livingBranch":1,"livingLocation":"bongbong"},
 {"kind":"dialogue","livingHall":true,"text":"집중하느라 시간 가는 줄 몰랐네..","livingBranch":1,"livingLocation":"bongbong","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"종교활동을 놓쳐버렸잖아...","livingBranch":1,"livingLocation":"bongbong","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"큰일이네...","livingBranch":1,"livingLocation":"bongbong","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"지훈이 알려준 수칙을 어겨버렸잖아.","livingBranch":1,"livingLocation":"bongbong","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"별 일 없어야 할텐데.","livingBranch":1,"livingLocation":"bongbong","speaker":"주인공"},
 {"kind":"living-end","livingHall":true,"livingBranch":1,"livingLocation":"bongbong"},
 {"kind":"narration","livingHall":true,"text":"복도 가운데 빈 방들이 눈에 띈다.","livingBranch":2,"livingLocation":"corridor"},
 {"kind":"dialogue","livingHall":true,"text":"신도가 수백이라도 공양을 당하다 보니 빈 방이 생기겠지…","livingBranch":2,"livingLocation":"corridor","speaker":"주인공"},
 {"kind":"narration","livingHall":true,"text":"누군가가 두고 나온 소지품이 있을지도 모른다.","livingBranch":2,"livingLocation":"corridor"},
 {"kind":"dialogue","livingHall":true,"text":"잠깐 들어가볼까?","livingBranch":2,"livingLocation":"corridor","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"아!","livingBranch":2,"portrait":"jeonghan-body1-flustered","livingLocation":"eunjae","speaker":"정한","maskSpeaker":true},
 {"kind":"dialogue","livingHall":true,"text":"(하필 누가 있던 방이라니.)","livingBranch":2,"portrait":"jeonghan-body1-flustered","livingLocation":"eunjae","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"(…빨간 머리?)","livingBranch":2,"portrait":"jeonghan-body1-default","livingLocation":"eunjae","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"아, 그, 와, 아니, 제가 그, 최근에 입교해서요,","livingBranch":2,"portrait":"jeonghan-body1-default","livingLocation":"eunjae","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"죄송합니다. 길을 잠시…","livingBranch":2,"portrait":"jeonghan-body1-default","livingLocation":"eunjae","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"(잠깐, 텅 빈 방에서 뭘 하던 거지? 아니 그보다도,)","livingBranch":2,"portrait":"jeonghan-body1-default","livingLocation":"eunjae","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"아~ 그 뉴비?","livingBranch":2,"portrait":"jeonghan-body1-eyesmile","livingLocation":"eunjae","speaker":"정한","maskSpeaker":true},
 {"kind":"dialogue","livingHall":true,"text":"(연예인… 인가?)","livingBranch":2,"portrait":"jeonghan-body1-eyesmile","livingLocation":"eunjae","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"(여기 알고 보니 아이돌 기획사 연습실이었나?)","livingBranch":2,"portrait":"jeonghan-body1-default","livingLocation":"eunjae","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"( 왜, 비밀리에 산골 수련하는 그런 거.)","livingBranch":2,"portrait":"jeonghan-body1-default","livingLocation":"eunjae","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"어쩌다 오셨대.","livingBranch":2,"portrait":"jeonghan-body1-eyesmile","livingLocation":"eunjae","speaker":"정한","maskSpeaker":true},
 {"kind":"dialogue","livingHall":true,"text":"네? 아 그게,","livingBranch":2,"portrait":"jeonghan-body1-eyesmile","livingLocation":"eunjae","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"나가는 길은 쉽지.","livingBranch":2,"portrait":"jeonghan-body1-smile","livingLocation":"eunjae","speaker":"정한","maskSpeaker":true},
 {"kind":"dialogue","livingHall":true,"text":"바로 저기. 비상문도 있고.","livingBranch":2,"portrait":"jeonghan-body1-eyesmile","livingLocation":"eunjae","speaker":"정한","maskSpeaker":true},
 {"kind":"dialogue","livingHall":true,"text":"네??, 아니 그보다 누구..?","livingBranch":2,"portrait":"jeonghan-body1-eyesmile","livingLocation":"eunjae","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"농담인데ㅎㅎ. 윤정한이라고 해요.","livingBranch":2,"portrait":"jeonghan-body1-smile","livingLocation":"eunjae","speaker":"정한","revealJeonghan":true},
 {"kind":"dialogue","livingHall":true,"text":"??? 아, 전 김봉봉이라고 합니다.","livingBranch":2,"portrait":"jeonghan-body1-eyesmile","livingLocation":"eunjae","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"이름이 봉봉씨야? 특이한 이름이네~","livingBranch":2,"portrait":"jeonghan-body1-eyesmile","livingLocation":"eunjae","speaker":"정한"},
 {"kind":"dialogue","livingHall":true,"text":"(대화 방향을 종잡을 수가 없네...)","livingBranch":2,"portrait":"jeonghan-body1-eyesmile","livingLocation":"eunjae","speaker":"주인공"},
 {"kind":"narration","livingHall":true,"text":"다들 기도하고, 제각기 일하느라 바쁜데…","livingBranch":2,"portrait":"jeonghan-body1-default","livingLocation":"eunjae"},
 {"kind":"narration","livingHall":true,"text":"그에 비해 이 남자는 아쉬울 게 없어 보인다.","livingBranch":2,"portrait":"jeonghan-body1-default","livingLocation":"eunjae"},
 {"kind":"dialogue","livingHall":true,"text":"(여유롭달까.)","livingBranch":2,"portrait":"jeonghan-body1-default","livingLocation":"eunjae","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"얼른 가요~ 바이바이~","livingBranch":2,"portrait":"jeonghan-body1-eyesmile","livingLocation":"eunjae","speaker":"정한"},
 {"kind":"dialogue","livingHall":true,"text":"정신 차리고 나니 생활관 밖으로 나와버렸네..","livingBranch":2,"livingLocation":"exterior","speaker":"주인공","clearPortrait":true},
 {"kind":"dialogue","livingHall":true,"text":"뭔가에 홀린 기분이야...","livingBranch":2,"livingLocation":"exterior","speaker":"주인공"},
 {"kind":"living-end","livingHall":true,"livingBranch":2,"livingLocation":"exterior"},
 {"kind":"narration","livingHall":true,"text":"복도 한가운데 멍하니 서 있는 남자가 있다.","livingBranch":3,"portrait":"jihoon-body1-default","livingLocation":"corridor","livingSilhouette":true,"livingJihoonEntrance":true},
 {"kind":"narration","livingHall":true,"text":"어라? 아는 얼굴이다.","livingBranch":3,"portrait":"jihoon-body1-default","livingLocation":"corridor","livingSilhouette":true},
 {"kind":"narration","livingHall":true,"text":"이렇게 피부가 하얀 사람은 드물다. 이름이 분명…","livingBranch":3,"portrait":"jihoon-body1-default","livingLocation":"corridor","livingSilhouette":true},
 {"kind":"dialogue","livingHall":true,"text":"저기 혹시, 뭐 찾으시는 거 있으세요?","livingBranch":3,"portrait":"jihoon-body1-default","livingLocation":"corridor","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"아니, 그건 아니고 그...","livingBranch":3,"portrait":"jihoon-body1-default","livingLocation":"corridor","speaker":"지훈"},
 {"kind":"dialogue","livingHall":true,"text":"그?","livingBranch":3,"portrait":"jihoon-body1-flustered","livingLocation":"corridor","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"...도서실이 어디였죠?","livingBranch":3,"portrait":"jihoon-body1-flustered","livingLocation":"corridor","speaker":"지훈"},
 {"kind":"dialogue","livingHall":true,"text":"아! 도서실은 생활관이 아니라 본당에 있어요.","livingBranch":3,"portrait":"jihoon-body1-flustered","livingLocation":"corridor","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"(아무래도 여긴 모든 신도가 머무르는 곳이라.)","livingBranch":3,"portrait":"jihoon-body1-flustered","livingLocation":"corridor","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"(건물이 크고 복잡하긴 한데...)","livingBranch":3,"portrait":"jihoon-body1-flustered","livingLocation":"corridor","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"(그렇다고 해도 나보다 길을 못 찾는 건…)","livingBranch":3,"portrait":"jihoon-body1-flustered","livingLocation":"corridor","speaker":"주인공"},
 {"kind":"living-recall","livingHall":true,"text":"야 너는, 평생 여기 살아놓고 아직도 길을 잃냐?","livingBranch":3,"livingLocation":"corridor","recallSpeaker":"승철"},
 {"kind":"dialogue","livingHall":true,"text":"그게, 제가 여기를 잠시 떠났다가 돌아와서요.","livingBranch":3,"portrait":"jihoon-body1-flustered","livingLocation":"corridor","speaker":"지훈"},
 {"kind":"dialogue","livingHall":true,"text":"다시 돌아오니 건물도 그렇고…","livingBranch":3,"portrait":"jihoon-body1-flustered","livingLocation":"corridor","speaker":"지훈"},
 {"kind":"dialogue","livingHall":true,"text":"이것저것 바뀌어 있었습니다.","livingBranch":3,"portrait":"jihoon-body1-flustered","livingLocation":"corridor","speaker":"지훈"},
 {"kind":"dialogue","livingHall":true,"text":"(어쩌다 그랬던 걸까?)","livingBranch":3,"portrait":"jihoon-body1-flustered","livingLocation":"corridor","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"(자꾸 비집고 나오는 호기심을 꾹 참고 일단 웃어본다.)","livingBranch":3,"portrait":"jihoon-body1-flustered","livingLocation":"corridor","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"와, 이곳 생활이 그만큼 좋으니까 다시 돌아오신 거겠네요.","livingBranch":3,"portrait":"jihoon-body1-smile","livingLocation":"corridor","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"아무래도 그렇죠?","livingBranch":3,"portrait":"jihoon-body2-smile","livingLocation":"corridor","speaker":"지훈"},
 {"kind":"narration","livingHall":true,"text":"지훈의 목소리가 조금 차분해졌다.","livingBranch":3,"portrait":"jihoon-body2-smile","livingLocation":"corridor"},
 {"kind":"dialogue","livingHall":true,"text":"편합니다. 규칙적인 생활도 그렇고, 사람들도요.","livingBranch":3,"portrait":"jihoon-body1-smile","livingLocation":"corridor","speaker":"지훈"},
 {"kind":"dialogue","livingHall":true,"text":"…신도들은 가족이니깐요.","livingBranch":3,"portrait":"jihoon-body1-smile","livingLocation":"corridor","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"가족 이상으로 소중하죠.","livingBranch":3,"portrait":"jihoon-body1-eyesmile","livingLocation":"corridor","speaker":"지훈"},
 {"kind":"narration","livingHall":true,"text":"단칼에 돌아오는 대답.","livingBranch":3,"portrait":"jihoon-body1-eyesmile","livingLocation":"corridor"},
 {"kind":"narration","livingHall":true,"text":"흠… 아무래도 이곳 신도들은 서로 유독 끈끈한 모양이다.","livingBranch":3,"portrait":"jihoon-body1-eyesmile","livingLocation":"corridor"},
 {"kind":"living-end","livingHall":true,"livingBranch":3,"livingLocation":"corridor"},
 {"kind":"narration","livingHall":true,"text":"세탁실엔 사람들이 좀 있지 않을까?","livingBranch":4,"livingLocation":"laundry"},
 {"kind":"narration","livingHall":true,"text":"빨랫거리를 모아 세탁실로 향했다.","livingBranch":4,"livingLocation":"laundry"},
 {"kind":"narration","livingHall":true,"text":"문을 열고 들어가려는데, 때마침 뒷걸음질로 나오던 사람의 등짝에...","livingBranch":4,"livingLocation":"laundry"},
 {"kind":"narration","livingHall":true,"text":"코를 박았다. 그것도 아주 세게.","livingBranch":4,"portrait":"mingyu-body2-pleading","livingLocation":"laundry","livingSilhouette":true},
 {"kind":"dialogue","livingHall":true,"text":"...아빠!","livingBranch":4,"portrait":"mingyu-body2-pleading","livingLocation":"laundry","speaker":"주인공","livingSilhouette":true},
 {"kind":"dialogue","livingHall":true,"text":"어? 와 잠깐, 어? 헉 죄송합니다!","livingBranch":4,"portrait":"mingyu-body2-pleading","livingLocation":"laundry","speaker":"민규","maskSpeaker":true},
 {"kind":"dialogue","livingHall":true,"text":"(아파! 라고 할 걸, 혀를 씹는 바람에 아빠! 하고 외쳐버렸다.)","livingBranch":4,"portrait":"mingyu-body2-pleading","livingLocation":"laundry","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"(아빠는 뭔 아빠야.)","livingBranch":4,"portrait":"mingyu-body2-pleading","livingLocation":"laundry","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"악 죄송해요, 많이 다치셨어요?!","livingBranch":4,"portrait":"mingyu-body2-pleading","livingLocation":"laundry","speaker":"민규","maskSpeaker":true},
 {"kind":"narration","livingHall":true,"text":"남자는 스스로를 김민규라고 소개했다.","livingBranch":4,"portrait":"mingyu-body2-pleading","livingLocation":"laundry","revealMingyu":true},
 {"kind":"narration","livingHall":true,"text":"빨래 바구니를 들고나오다가 문 뒤의 나를 못 봤다고.","livingBranch":4,"portrait":"mingyu-body2-pleading","livingLocation":"laundry"},
 {"kind":"narration","livingHall":true,"text":"몹시 미안해하는 눈치였다.","livingBranch":4,"portrait":"mingyu-body2-pleading","livingLocation":"laundry"},
 {"kind":"dialogue","livingHall":true,"text":"(사람이 좀 뭐랄까, 사고 많이 치는 대형견 같기도 하고.)","livingBranch":4,"portrait":"mingyu-body1-default","livingLocation":"laundry","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"아! 저 그쪽 알아요. 최근에 오신 분이죠?","livingBranch":4,"portrait":"mingyu-body1-default","livingLocation":"laundry","speaker":"민규"},
 {"kind":"dialogue","livingHall":true,"text":"밖에는 재밌는 게 많죠? 좋겠다~.","livingBranch":4,"portrait":"mingyu-body1-default","livingLocation":"laundry","speaker":"민규"},
 {"kind":"dialogue","livingHall":true,"text":"저는 여기서만 평생을 살아서, 밖에는 뭐가 있는지 잘 몰라요.","livingBranch":4,"portrait":"mingyu-body1-default","livingLocation":"laundry","speaker":"민규"},
 {"kind":"dialogue","livingHall":true,"text":"(딱 생긴 것만 봐도 인싸 상인데...)","livingBranch":4,"portrait":"mingyu-body1-default","livingLocation":"laundry","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"(모태 신앙이었을까..?)","livingBranch":4,"portrait":"mingyu-body1-default","livingLocation":"laundry","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"(...안쓰럽다)","livingBranch":4,"portrait":"mingyu-body1-default","livingLocation":"laundry","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"밖에도 뭐… 별거 없어요.","livingBranch":4,"portrait":"mingyu-body1-default","livingLocation":"laundry","speaker":"주인공"},
 {"kind":"dialogue","livingHall":true,"text":"에이 별거 없기는. 거짓말이죠?","livingBranch":4,"portrait":"mingyu-body1-eyesmile","livingLocation":"laundry","speaker":"민규"},
 {"kind":"dialogue","livingHall":true,"text":"나가서 영화도 보고~ 그래보고 싶어요.","livingBranch":4,"portrait":"mingyu-body2-default","livingLocation":"laundry","speaker":"민규"},
 {"kind":"dialogue","livingHall":true,"text":"저 늘 여기 있거든요? 자주 오셔서 얘기 나눠요.","livingBranch":4,"portrait":"mingyu-body2-eyesmile","livingLocation":"laundry","speaker":"민규"},
 {"kind":"dialogue","livingHall":true,"text":"약속해요! 진짜 꼭이요!","livingBranch":4,"portrait":"mingyu-body2-pleading","livingLocation":"laundry","speaker":"민규"},
 {"kind":"narration","livingHall":true,"text":"…얼결에 약속해버렸다.","livingBranch":4,"livingLocation":"laundry","clearPortrait":true},
 {"kind":"living-end","livingHall":true,"livingBranch":4,"livingLocation":"laundry"}
);

// V160: 2일차 오전 본당 - 공통 장면, 사무실, 도서실
const MAIN_SCENE_START=scenes.length;
scenes.push(
 {"kind":"narration","mainHall":true,"mainLocation":"inside","text":"본당 안은 서늘하고 고요하다. 높은 천장 아래로 대예배당의 제단이 한눈에 들어온다.","clearPortrait":true},
 {"kind":"narration","mainHall":true,"mainLocation":"inside","text":"신도들 틈에 섞여 제단 둘레에 꽃을 꽂으며 장식을 거드는 중이다.","clearPortrait":true},
 {"kind":"narration","mainHall":true,"mainLocation":"inside","text":"하얀 캐모마일이 한 송이씩 제자리를 찾아가고 있다.","clearPortrait":true},
 {"kind":"dialogue","mainHall":true,"mainLocation":"inside","text":"(이 건물이 교단의 심장이다.)","speaker":"주인공","clearPortrait":true},
 {"kind":"dialogue","mainHall":true,"mainLocation":"inside","text":"( 사무실도, 도서실도, 교주실도 전부 이 안에 있다.)","speaker":"주인공","clearPortrait":true},
 {"kind":"main-choice","mainHall":true,"mainLocation":"inside"},
 {"kind":"narration","mainHall":true,"mainLocation":"office","text":"대예배당 뒤 복도를 따라 걷자 사무실이 나왔다.","mainBranch":1,"clearPortrait":true},
 {"kind":"narration","mainHall":true,"mainLocation":"office","text":"접수 창구와 대기 의자, 빼곡한 서류 캐비닛.","mainBranch":1,"clearPortrait":true},
 {"kind":"narration","mainHall":true,"mainLocation":"office","text":"종교 건물이라기보단 행정복지센터 같다.","mainBranch":1,"clearPortrait":true},
 {"kind":"dialogue","mainHall":true,"mainLocation":"office","text":"확실히 요즘 건물같군.","mainBranch":1,"speaker":"주인공","clearPortrait":true},
 {"kind":"dialogue","mainHall":true,"mainLocation":"office","text":"통합민원도 받을 거 같은…","mainBranch":1,"speaker":"주인공","portrait":"joshua-바디-member-기본-member","mainSilhouette":true},
 {"kind":"dialogue","mainHall":true,"mainLocation":"office","text":"뭐 찾으시는 거라도 있으세요?","mainBranch":1,"speaker":"조슈아","portrait":"joshua-바디-member-기본-member","maskSpeaker":true},
 {"kind":"dialogue","mainHall":true,"mainLocation":"office","text":"(깜짝이야.)","mainBranch":1,"portrait":"joshua-바디-member-기본-member","speaker":"주인공"},
 {"kind":"dialogue","mainHall":true,"mainLocation":"office","text":"(청년 같기도, 소년 같기도.)","mainBranch":1,"portrait":"joshua-바디-member-기본-member","speaker":"주인공"},
 {"kind":"narration","mainHall":true,"mainLocation":"office","text":"오묘한 인상의 남자가 나를 빤히 바라보고 있다.","mainBranch":1,"portrait":"joshua-바디-member-기본-member"},
 {"kind":"narration","mainHall":true,"mainLocation":"office","text":"𝑯𝒐𝒍𝒚… 성스러운 얼굴이다.","mainBranch":1,"portrait":"joshua-바디-member-기본-member"},
 {"kind":"dialogue","mainHall":true,"mainLocation":"office","text":"아, 예배 끝나고 시간이 남아서 둘러보는 중이에요.","mainBranch":1,"portrait":"joshua-바디-member-기본-member","speaker":"주인공"},
 {"kind":"dialogue","mainHall":true,"mainLocation":"office","text":"그나저나, 여기는 뭐 하는 곳이에요?","mainBranch":1,"portrait":"joshua-바디-member-기본-member","speaker":"주인공"},
 {"kind":"dialogue","mainHall":true,"mainLocation":"office","text":"신도 여러분의 불편을 듣고, 생활을 편하게 해 드리는 곳이에요.","mainBranch":1,"speaker":"조슈아","portrait":"joshua-바디-member-미소","maskSpeaker":true},
 {"kind":"dialogue","mainHall":true,"mainLocation":"office","text":"저는 ‘조슈아’라고 해요.","mainBranch":1,"speaker":"조슈아","portrait":"joshua-바디-member-미소","revealJoshua":true},
 {"kind":"dialogue","mainHall":true,"mainLocation":"office","text":"불편한 점이 있으면 언제든 저를 찾아주세요.","mainBranch":1,"speaker":"조슈아","portrait":"joshua-바디-member-미소"},
 {"kind":"dialogue","mainHall":true,"mainLocation":"office","text":"(특이한 이름이다.)","mainBranch":1,"speaker":"주인공","clearPortrait":true},
 {"kind":"narration","mainHall":true,"mainLocation":"office","text":"뇨롱- 하는 웃음을 남기고, 조슈아는 다시 서류 정리로 돌아갔다.","mainBranch":1,"clearPortrait":true},
 {"kind":"dialogue","mainHall":true,"mainLocation":"office","text":"(여기서 일하는 신도인가 보군.)","mainBranch":1,"speaker":"주인공"},
 {"kind":"narration","mainHall":true,"mainLocation":"office","text":"안쪽 책상엔 서류가 산더미처럼 쌓여 있다.","mainBranch":1},
 {"kind":"dialogue","mainHall":true,"mainLocation":"office","text":"(그렇게 할 일이 많은 걸까?)","mainBranch":1,"speaker":"주인공"},
 {"kind":"main-end","mainHall":true,"mainLocation":"office","mainBranch":1},
 {"kind":"narration","mainHall":true,"mainLocation":"library","text":"본당 도서실로 향했다. 작지만 고즈넉한 공간이다.","mainBranch":2,"clearPortrait":true},
 {"kind":"narration","mainHall":true,"mainLocation":"library","text":"안에는 아무도 없다.","mainBranch":2,"clearPortrait":true},
 {"kind":"dialogue","mainHall":true,"mainLocation":"library","text":"현대인 독서량이 부족하다더니, 진짜네.","mainBranch":2,"speaker":"주인공","clearPortrait":true},
 {"kind":"dialogue","mainHall":true,"mainLocation":"library","text":"오히려 좋지.","mainBranch":2,"speaker":"주인공","clearPortrait":true},
 {"kind":"narration","mainHall":true,"mainLocation":"library","text":"자유롭게 도서실 내부 자료들을 뒤져본다.","mainBranch":2},
 {"kind":"evidence-popup","mainHall":true,"mainLocation":"library","mainBranch":2,"evidenceId":"destroyed-document-2","evidenceTitle":"파기된 문서2","evidenceDescription":"마을의 내부 지도다. 밖으로 이어지는 길마다 전부 X자가 쳐진 채다.","evidenceArt":"destroyed-document-2"},
 {"kind":"dialogue","mainHall":true,"mainLocation":"library","text":"공양실 옆 쓰레기장에만 작게 동그라미가 있다. 이건 뭘까?","mainBranch":2,"speaker":"주인공","illustration":"destroyed-document-2"},
 {"kind":"dialogue","mainHall":true,"mainLocation":"library","text":"…저 길들은 전부 막혔다는 뜻이겠지.","mainBranch":2,"speaker":"주인공"},
 {"kind":"dialogue","mainHall":true,"mainLocation":"library","text":"(하지만 탈출 방법은 분명 있을 거다.)","mainBranch":2,"speaker":"주인공"},
 {"kind":"dialogue","mainHall":true,"mainLocation":"library","text":"(증거를 열심히 모으고, 여기저기 찾아다녀 봐야지.)","mainBranch":2,"speaker":"주인공"},
 {"kind":"main-end","mainHall":true,"mainLocation":"library","mainBranch":2}
);

// V163: 2일차 오전 고해소 분기
const CONFESSIONAL_MORNING_START=scenes.length;
scenes.push(
 {"kind":"dialogue","confMorning":true,"confLocation":"outside","text":"대낮에, 그것도 스스로 고해소에 오다니.","speaker":"주인공","clearPortrait":true},
 {"kind":"narration","confMorning":true,"confLocation":"outside","text":"고해소의 문을 두드린다.","sound":"knock","clearPortrait":true},
 {"kind":"narration","confMorning":true,"confLocation":"inside","text":"원우 사제가 의문스러운 표정으로 나를 쳐다본다.","portrait":"wonwoo-body2-default"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"고해성사를 하러 오신 겁니까?","speaker":"원우","portrait":"wonwoo-body2-default"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"정보를 캐러 왔다고 할 수도 없고, 놀러 왔다고 둘러댈 수도 없고...","speaker":"주인공","portrait":"wonwoo-body2-default"},
 {"kind":"conf-morning-choice","confMorning":true,"confLocation":"inside"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","confMorningBranch":1,"text":"♪어찌 합…니까...♪","speaker":"주인공","portrait":"wonwoo-body2-default","fontScale":0.75,"boxShakeSoft":true},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","confMorningBranch":1,"text":"♪어떻게 할...까요...♪","speaker":"주인공","portrait":"wonwoo-body2-default","fontScale":0.5,"boxShakeSoft":true},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","confMorningBranch":1,"text":"(그래 내가 감히 드립을 쳤다.)","speaker":"주인공","portrait":"wonwoo-body2-default"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","confMorningBranch":1,"text":"(그것도 하필 찔러도 피 한 방울 나오지 않을 거 같은 사제 앞에서.)","speaker":"주인공","portrait":"wonwoo-body2-default"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","confMorningBranch":1,"text":"…? 여긴 코인 노래방이 아닙니다만.","speaker":"원우","portrait":"wonwoo-body1-default"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","confMorningBranch":1,"text":"…죄송합니다.","speaker":"주인공","portrait":"wonwoo-body1-default"},
 {"kind":"conf-morning-shared-start","confMorning":true,"confLocation":"inside"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"저 실은, 제 안의 불안을 고백하고자 왔습니다.","speaker":"주인공","portrait":"wonwoo-body1-default"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"그리고 사제님께 조언을 구하고자 왔습니다.","speaker":"주인공","portrait":"wonwoo-body1-default"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"이곳 생활에 조금 더 빨리 적응하고 싶습니다.","speaker":"주인공","portrait":"wonwoo-body1-default"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"어떻게 하면 신께 가까워질 수 있을까요?","speaker":"주인공","portrait":"wonwoo-body1-default"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"(물론 연기다.)","speaker":"주인공","portrait":"wonwoo-body1-default"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"(최대한 간절한 척하면, 아무리 사이비라도 사제면 못 본 척은 못 할 거다.)","speaker":"주인공","portrait":"wonwoo-body1-smile"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"음, 저 역시 혼란을 겪은 적 있습니다.","speaker":"원우","portrait":"wonwoo-body1-eyesmile"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"불안이란 고인 물과도 같아서,","speaker":"원우","portrait":"wonwoo-body1-eyesmile"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"쌓일수록 흐르지 못하고 마음 바닥에 무겁게 가라앉기만 합니다.","speaker":"원우","portrait":"wonwoo-body1-eyesmile"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"그걸 풀어 주는 건 결국엔 사람, 가족입니다.","speaker":"원우","portrait":"wonwoo-body1-eyesmile"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"봉봉 씨도 사람에 지쳐 이곳을 찾으셨겠지요.","speaker":"원우","portrait":"wonwoo-body1-smile"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"카밀레교에서 참된 가족을,","speaker":"원우","portrait":"wonwoo-body1-eyesclosed","boldAll":true,"fontScale":1.15},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"원래의 흐름을,","speaker":"원우","portrait":"wonwoo-body1-eyesclosed","boldAll":true,"fontScale":1.15},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"진정한 믿음을 찾으시길 바랍니다.","speaker":"원우","portrait":"wonwoo-body1-eyesmile","boldAll":true,"fontScale":1.2},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"(따듯한 말이다. 그래서 더 서늘하다.)","speaker":"주인공","portrait":"wonwoo-body1-eyesclosed"},
 {"kind":"narration","confMorning":true,"confLocation":"inside","text":"그래도 원우 사제의 표정이 전보다는 풀어진 듯 하다.","portrait":"wonwoo-body1-eyesmile"},
 {"kind":"dialogue","confMorning":true,"confLocation":"inside","text":"(조금 더 친근해졌다고 믿, 믿을 수 있을까?!)","speaker":"주인공","portrait":"wonwoo-body1-eyesclosed"},
 {"kind":"conf-morning-end","confMorning":true,"confLocation":"inside"}
);

// V167: 2일차 오전 공양실 분기
const GONGYANG_SCENE_START=scenes.length;
scenes.push(
 {"kind":"narration","gongyangHall":true,"gongyangLocation":"square","text":"...공양실","clearPortrait":true},
 {"kind":"narration","gongyangHall":true,"gongyangLocation":"square","text":"매일 사람이 하나씩 죽어 나가는 곳. 생각만 해도 무섭다.","clearPortrait":true},
 {"kind":"narration","gongyangHall":true,"gongyangLocation":"square","text":"하지만 가장 큰 비밀이 거기 숨겨져 있을지도 모른다.","clearPortrait":true},
 {"kind":"narration","gongyangHall":true,"gongyangLocation":"outside","text":"공양실에 가까워지자, 옆으로 난 작은 샛길이 눈에 들어온다.","clearPortrait":true},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"차라리 저기로 가볼까...","speaker":"주인공","portrait":"junhui-body1-의심","silhouette":true},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"어라, 여기서 뭐 해요?","speaker":"준휘","portrait":"junhui-body1-의심","maskSpeaker":true},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"(…젠장. 하필 공양실에서 나오던 사제랑 마주쳤잖아.)","speaker":"주인공","portrait":"junhui-body1-의심"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"이상하다, 여기는 다들 무서워서 잘 안 오던데~","speaker":"준휘","portrait":"junhui-body2-의심","maskSpeaker":true},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"아, 그… 길을 잃어서.","speaker":"주인공","portrait":"junhui-body2-의심"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"엉? 지훈이 정도가 아닌 이상 여기 길은 잘 안 잃던데.","speaker":"준휘","portrait":"junhui-body2-의심","maskSpeaker":true},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"이상하다, 이상해~","speaker":"준휘","portrait":"junhui-body1-의심","maskSpeaker":true},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"...아! 알았다. 새로 온 신도분이죠?","speaker":"준휘","portrait":"junhui-body1-의심","maskSpeaker":true},
 {"kind":"narration","gongyangHall":true,"gongyangLocation":"outside","text":"(끄덕였다.)","portrait":"junhui-body1-의심"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"그럼... 그럴 수 있어요.","speaker":"준휘","portrait":"junhui-body1-default","maskSpeaker":true},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"이름 엄청 귀엽다고 생각했어~ 봉봉 씨.","speaker":"준휘","portrait":"junhui-body1-smile","maskSpeaker":true},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"초콜릿 봉봉! 그거 알아요? 비슷하다고 생각했어요.","speaker":"준휘","portrait":"junhui-body1-smile","maskSpeaker":true},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"초콜릿 좋아해요?","speaker":"준휘","portrait":"junhui-body1-eyesmile","maskSpeaker":true},
 {"kind":"narration","gongyangHall":true,"gongyangLocation":"outside","text":"엄청난 미남이 숨도 안 쉬고 말을 우다다 쏘아붙인다","portrait":"junhui-body1-eyesmile"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"(나를 의심했다 말았다, 천당과 지옥을 자유자재로 넘나드는 기분이다.)","speaker":"주인공","portrait":"junhui-body1-eyesmile"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"내 이름은 문준휘예요.","speaker":"준휘","portrait":"junhui-body1-smile","revealJunhui":true},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"준휘 사제님…은 처음 뵈는 거 같아요.","speaker":"주인공","portrait":"junhui-body1-smile"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"아무래도 그렇죠!","speaker":"준휘","portrait":"junhui-body1-eyesmile"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"왜냐하면 저는, 음… 아! 그거다. 외출 담당.","speaker":"준휘","portrait":"junhui-body2-smile","boldWord":"외출 담당"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"마을에서 나가고 싶으면 저한테 허락 맡으러 오세요.","speaker":"준휘","portrait":"junhui-body2-smile"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"그럼 저는 교주님한테 가서 허락을 맡고~","speaker":"준휘","portrait":"junhui-body1-smile","boldWord":"교주님"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"교주님한테서 오케이! 가 떨어지면 그때 나갈 수 있어요.","speaker":"준휘","portrait":"junhui-body1-eyesmile","boldWord":"교주님"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"물론 뭐, 온지 얼마 안 됐는데 나가고 싶다고 할 리는 없고…?","speaker":"준휘","portrait":"junhui-body1-default"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"…에이 설마?!","speaker":"준휘","portrait":"junhui-body2-의심"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"미안해요. 밍하오는 저보고 의심 좀 덜 하라던데.","speaker":"준휘","portrait":"junhui-body2-smile","boldWord":"밍하오"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"그게 말이 쉽지.","speaker":"준휘","portrait":"junhui-body1-default"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"여기 좋아요. 고양이도 많고. 단 것도 많고.","speaker":"준휘","portrait":"junhui-body1-eyesmile"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"바깥은 별로지~ 여기서 오래오래 함께 해요, 우리랑.","speaker":"준휘","portrait":"junhui-body1-smile","boldWord":"바깥은 별로지~"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"(겠냐고.)","speaker":"주인공","portrait":"junhui-body1-smile"},
 {"kind":"narration","gongyangHall":true,"gongyangLocation":"outside","text":"하지만 일단은 웃어 보였다. 하하.","portrait":"junhui-body1-eyesmile"},
 {"kind":"narration","gongyangHall":true,"gongyangLocation":"outside","text":"이 사람이야말로 정말 위험해 보인다.","portrait":"junhui-body1-eyesmile"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"(혹시, 단 걸 주면 호의적으로 반응할지도 모른다.)","speaker":"주인공","portrait":"junhui-body1-smile"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","text":"나한테 먹을 게 있나?","speaker":"주인공","portrait":"junhui-body1-smile"},
 {"kind":"gongyang-item-check","gongyangHall":true,"gongyangLocation":"outside"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","gongyangItemBranch":1,"text":"아, 탈출패키지!","speaker":"주인공","portrait":"junhui-body1-smile"},
 {"kind":"narration","gongyangHall":true,"gongyangLocation":"outside","gongyangItemBranch":1,"text":"혹시 몰라 패키지의 비상식량 중 초코바를 들고 다녔다.","portrait":"junhui-body1-smile"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","gongyangItemBranch":1,"text":"(이게 유용하게 쓰일 줄이야.)","speaker":"주인공","portrait":"junhui-body1-smile"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","gongyangItemBranch":1,"text":"이거… 드실래요? 전 단 건 별로라.","speaker":"주인공","portrait":"junhui-body1-smile"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","gongyangItemBranch":1,"text":"와!","speaker":"준휘","portrait":"junhui-body2-smile"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","gongyangItemBranch":1,"text":"진짜 감동이에요, 고마워요!","speaker":"준휘","portrait":"junhui-body3-eyesmile"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","gongyangItemBranch":1,"text":"한솔이가 그랬어요. 먹을 거 주는 사람, 좋은 사람이라고.","speaker":"준휘","portrait":"junhui-body3-snacking","boldWord":"한솔이"},
 {"kind":"narration","gongyangHall":true,"gongyangLocation":"outside","gongyangItemBranch":1,"text":"활짝 웃으며 초코바를 먹는 준휘다.","portrait":"junhui-body3-snacking"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","gongyangItemBranch":1,"text":"(그럼, 나가다 잡혀도 한 번은 봐주나?)","speaker":"주인공","portrait":"junhui-body3-snacking"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","gongyangItemBranch":1,"text":"그래도, 나쁜 짓 하다가 잡히면 못 봐줘요!","speaker":"준휘","portrait":"junhui-body3-eyesmile"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","gongyangItemBranch":1,"text":"(에라이, 얄짤없네.)","speaker":"주인공","portrait":"junhui-body3-eyesmile"},
 {"kind":"gongyang-end","gongyangHall":true,"gongyangLocation":"outside","gongyangItemBranch":1},
 {"kind":"narration","gongyangHall":true,"gongyangLocation":"outside","gongyangItemBranch":2,"text":"(…아쉽게도 지금으로서는 없다.)","portrait":"junhui-body1-smile"},
 {"kind":"narration","gongyangHall":true,"gongyangLocation":"outside","gongyangItemBranch":2,"text":"나중에 구하게 되면, 여기 다시 와서 준휘 사제에게 줘도 좋을 듯 하다.","portrait":"junhui-body1-eyesmile"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","gongyangItemBranch":2,"text":"(혹시 모르지.)","speaker":"주인공","portrait":"junhui-body1-eyesmile"},
 {"kind":"dialogue","gongyangHall":true,"gongyangLocation":"outside","gongyangItemBranch":2,"text":"(어떤 표정을 지을지.)","speaker":"주인공","portrait":"junhui-body1-eyesmile","boldAll":true},
 {"kind":"gongyang-end","gongyangHall":true,"gongyangLocation":"outside","gongyangItemBranch":2}
);

// V173: 2일차 전용 저녁 고해소 스토리 (향후 일차에 자동 적용하지 않음)
const EVENING_DAY2_START=scenes.length;
scenes.push(
 {"kind":"narration","eveningDay2":true,"eveningLocation":"square","text":"오전 활동을 마치고 이것저것 하다보니, 어느새 해가 기울고 있었다.","clearPortrait":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"square","text":"오늘은 뭘 건졌을까. 아니, 뭘 말해야 할까.","speaker":"주인공","clearPortrait":true},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"outside","text":"신도들이 하나둘 고해소 쪽으로 걸음을 옮기고 있다.","clearPortrait":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"outside","text":"고해성사 시간이구나.","speaker":"주인공","clearPortrait":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"outside","eveningMorningConfessionalOnly":true,"text":"오전에도 갔는데, 또 가야하는군.","speaker":"주인공","clearPortrait":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"inside","eveningMorningConfessionalOnly":true,"text":"김봉봉씨. 또 보네요.","speaker":"원우","portrait":"wonwoo-body2-default","sound":"confessionDoor"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"inside","text":"고해소는 신성한 장소입니다.","speaker":"원우","portrait":"wonwoo-body2-default","sound":"confessionDoor","soundOnlyWithoutMorningConfessional":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"inside","text":"거짓을 고하지 않을 것임을 맹세하십니까?","speaker":"원우","portrait":"wonwoo-body2-default"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"inside","text":"예. 맹세합니다.","speaker":"주인공","portrait":"wonwoo-body2-default"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"inside","text":"오늘도 되는대로 지어냈다.","portrait":"wonwoo-body2-default"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"inside","text":"나의 잘못에 대해, 지은 죄에 대해.","portrait":"wonwoo-body2-default"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"inside","text":"(실은 매일 고해성사를 해야 하는 것부터가 고역이지만.)","speaker":"주인공","portrait":"wonwoo-body2-eyesclosed"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"inside","text":"(칸막이 너머 전원우 사제는 내가 하는 이야기들을 정말로 믿는 걸까.)","speaker":"주인공","portrait":"wonwoo-body2-eyesclosed"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"inside","text":"(알 수 없지.)","speaker":"주인공","portrait":"wonwoo-body2-eyesclosed"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"inside","text":"(그래도 내 간절함만은 닿았길.)","speaker":"주인공","portrait":"wonwoo-body2-eyesclosed"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"inside","text":"…이로써 당신의 죄는 모두 토해져, 신께 닿아 사해졌습니다.","speaker":"원우","portrait":"wonwoo-body2-eyesclosed"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"inside","text":"당신의 생활에 행복과 안식이 있기를.","speaker":"원우","portrait":"wonwoo-body2-default"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"inside","text":"감사합니다. 사제님께도 행복과 안식이 함께하기를.","speaker":"주인공","portrait":"wonwoo-body2-default"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"dark","text":"신도님,","speaker":"원우","portrait":"wonwoo-body2-eyesclosed","eveningShade":0.1,"boldAll":true,"fontScale":1.2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"dark","text":"혹시 더 궁금한 건 없으십니까?","speaker":"원우","portrait":"wonwoo-body2-eyesclosed","eveningShade":0.1,"boldAll":true,"fontScale":1.2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"dark","text":"(뭐지?)","speaker":"주인공","portrait":"wonwoo-body2-eyesclosed","eveningShade":0.1},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"dark","text":"차마 고개도 들지 못하겠다.","portrait":"wonwoo-body2-eyesclosed","eveningShade":0.2},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"dark","text":"고해소의 나무 바닥을 뚫어져라 노려보게 된다.","portrait":"wonwoo-body2-eyesclosed","eveningShade":0.3},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"dark","text":"(질문의 의중을 파악해야 하는데...)","speaker":"주인공","portrait":"wonwoo-body2-eyesclosed","eveningShade":0.4},
 {"kind":"evening-choice","eveningDay2":true,"eveningLocation":"dark"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"dark","text":"카밀레교에 대해 좋은 기사를 쓰고 싶다고 얘기했다.","portrait":"wonwoo-body2-eyesclosed","eveningShade":0.5,"eveningBranch":1},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"dark","text":"그러나 그는 정보를 묻는 나에게...","portrait":"wonwoo-body2-eyesclosed","eveningShade":0.5,"eveningBranch":1},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"dark","text":"대답이 없다.","portrait":"wonwoo-body2-eyesclosed","eveningShade":0.5,"eveningBranch":1},

 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"dark","text":"(...섣불렀던 걸까?)","speaker":"주인공","portrait":"wonwoo-body2-eyesclosed","eveningShade":0.5,"eveningBranch":1},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","text":"생활관으로 돌아가는 내내 불안감에 시달렸다.","eveningBranch":1,"clearPortrait":true},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","text":"생활관으로 가는 중인데...","eveningBranch":1,"clearPortrait":true},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","text":"서늘한 저녁 공기 사이로 누군가의 어깨가 툭 와 부딪혔다.","eveningBranch":1,"portrait":"seungkwan-body1-sweating","livingSilhouette":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"아이고, 죄송합니다!","speaker":"승관","portrait":"seungkwan-body1-sweating","eveningBranch":1,"maskSpeaker":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"어떡하지, 다친 데는 없으시죠?","speaker":"승관","portrait":"seungkwan-body1-sweating","eveningBranch":1,"maskSpeaker":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(방금 이거… 일부러 부딪힌 거 같은데?)","speaker":"주인공","portrait":"seungkwan-body1-sweating","eveningBranch":1},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","text":"그러나 따질 새도 없었다.","portrait":"seungkwan-body1-smile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"어, 어어!","speaker":"승관","portrait":"seungkwan-body1-smile","eveningBranch":1,"maskSpeaker":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"새로 들어오신 분, 맞으시죠?","speaker":"승관","portrait":"seungkwan-body1-smile","eveningBranch":1,"maskSpeaker":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"생활관 가시는 거예요? 저도 딱 가는 길인데!","speaker":"승관","portrait":"seungkwan-body1-smile","eveningBranch":1,"maskSpeaker":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"같이 가요. 혼자 걷기 심심했거든요.","speaker":"승관","portrait":"seungkwan-body1-eyesmile","eveningBranch":1,"maskSpeaker":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"아, 저는 부승관이라고 해요.","speaker":"승관","portrait":"seungkwan-body2-eyesmile","eveningBranch":1,"revealSeungkwan":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"들어온 지 얼마 안 됐어요. 완전 뉴비랄까?","speaker":"승관","portrait":"seungkwan-body2-eyesmile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"그나저나 여기 도서실은 가 보셨어요?","speaker":"승관","portrait":"seungkwan-body1-eyesmile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"아주 넓진 않은데 되게 깔끔해요.","speaker":"승관","portrait":"seungkwan-body2-eyesmile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"장서나 자료도 많고. 근데 사람은 잘 없더라구요.","speaker":"승관","portrait":"seungkwan-body2-smile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(친화력이 엄청나다.)","speaker":"주인공","portrait":"seungkwan-body2-smile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(묻지도 않은 이야기를 술술 풀어놓는다.)","speaker":"주인공","portrait":"seungkwan-body2-smile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(근데 그 흐름이 지나치게 자연스럽다.)","speaker":"주인공","portrait":"seungkwan-body2-eyesmile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(어딜 가도 싹싹하니 예쁨받을 사람의 전형이랄까.)","speaker":"주인공","portrait":"seungkwan-body2-eyesmile","eveningBranch":1},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","text":"게다가 나에게 쓸모 있는 정보를 술술 털어놓는 중이다..","portrait":"seungkwan-body2-eyesmile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(밤에는 사람이 아무도 없어 은근히 으스스하다는 말까지.)","speaker":"주인공","portrait":"seungkwan-body2-smile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(그렇다는건 밤에 몰래 나와 여기저기 들러봐도 괜찮다는거겠지.)","speaker":"주인공","portrait":"seungkwan-body2-smile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"어떻게, 여기 생활은 좀 할 만하세요?","speaker":"승관","portrait":"seungkwan-body2-eyesmile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"음… 아직은 많이 어색해요.","speaker":"주인공","portrait":"seungkwan-body2-eyesmile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"그래도 밥은 맛있던데요.","speaker":"주인공","portrait":"seungkwan-body2-eyesmile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"그쵸? 여기 닭꼬치가 진짜 맛있거든요.","speaker":"승관","portrait":"seungkwan-body1-smile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"족발도. 나중에 꼭 드셔보세요.","speaker":"승관","portrait":"seungkwan-body1-smile","eveningBranch":1},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","text":"슬슬 핑계를 대고 빠져나올 수도 있다.","portrait":"seungkwan-body2-smile","eveningBranch":1},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","text":"그런데도 이야기를 더 나눠보고 싶어진다.","portrait":"seungkwan-body2-smile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(뭔가 이곳의 다른 사람들과 달라 보여.)","speaker":"주인공","portrait":"seungkwan-body2-eyesmile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(곧고 바른 눈빛?)","speaker":"주인공","portrait":"seungkwan-body2-eyesmile","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(사회에서 만났으면 일 잘해서 예뻐했을 상이지.)","speaker":"주인공","portrait":"seungkwan-body1-default","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"물론 아침 공양 이후로 밥이 제대로 안 들어가긴 하지만….","speaker":"승관","portrait":"seungkwan-body1-thinking","eveningBranch":1},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","text":"승관은 주변을 살피더니, 목소리를 낮췄다.","portrait":"seungkwan-body1-thinking","eveningBranch":1,"eveningBgShade":0.3},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"…사실 저는요, 이곳의 ‘공양’이 잘 이해가 안 가요.","speaker":"승관","portrait":"seungkwan-body1-thinking","eveningBranch":1,"eveningBgShade":0.3,"boldWord":"공양"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"종교는 결속력이 중요한 게 맞지만…","speaker":"승관","portrait":"seungkwan-body2-thinking","eveningBranch":1,"eveningBgShade":0.3},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"사람을 죽여가고, 서로 밀고하면서까지 이러는 게 맞을까요?","speaker":"승관","portrait":"seungkwan-body2-thinking","eveningBranch":1,"eveningBgShade":0.3},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"봉봉씨.","speaker":"승관","portrait":"seungkwan-body2-thinking","eveningBranch":1,"eveningBgShade":0.4,"boldAll":true,"fontScale":1.2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"어, …잠깐. 내 이름을 말한 적 있던가?","speaker":"주인공","portrait":"seungkwan-body2-thinking","eveningBranch":1,"eveningBgShade":0.4},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"맞으시죠? 봉봉아티클의 취재기자.","speaker":"승관","portrait":"seungkwan-body2-default","eveningBranch":1,"eveningBgShade":0.4,"boldAll":true,"fontScale":1.2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"제가 그쪽을 도와드릴 수 있어요.","speaker":"승관","portrait":"seungkwan-body1-default","eveningBranch":1,"eveningBgShade":0.4,"boldAll":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"저한테만 진실을 말해주세요.","speaker":"승관","portrait":"seungkwan-body1-default","eveningBranch":1,"eveningBgShade":0.5,"boldAll":true,"fontScale":1.2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"후회하지 않으실 거예요.","speaker":"승관","portrait":"seungkwan-body1-default","eveningBranch":1,"eveningBgShade":0.5,"boldAll":true,"fontScale":1.2},
 {"kind":"seungkwan-choice","eveningDay2":true,"eveningLocation":"living","eveningBranch":1},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"dark","text":"...그렇다면","speaker":"주인공","portrait":"wonwoo-body2-eyesclosed","eveningShade":0.5,"eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"dark","text":"...여기 수건은 어디서 더 받을 수... 있을까요?","speaker":"주인공","portrait":"wonwoo-body2-eyesclosed","eveningShade":0.5,"eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"dark","text":"......","speaker":"원우","portrait":"wonwoo-body2-eyesclosed","eveningShade":0.5,"eveningBranch":2},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","text":"그런 건 사무실, 아니 세탁실에 문의하면 된다는 대답이 돌아왔다.","eveningBranch":2,"clearPortrait":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"조금 어이없어하는 목소리였던 것 같기도.","speaker":"주인공","eveningBranch":2,"clearPortrait":true},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","text":"생활관으로 돌아가는 발길이 가볍다.","eveningBranch":2,"clearPortrait":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(그래, 괜히 대놓고 책잡힐 짓 하기보다는...)","speaker":"주인공","eveningBranch":2,"clearPortrait":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(차라리 오늘 밤, 몰래 행동을 하자.)","speaker":"주인공","eveningBranch":2,"clearPortrait":true},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","text":"생활관으로 가는 중인데...","eveningBranch":2,"clearPortrait":true},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","text":"서늘한 저녁 공기 사이로 누군가의 어깨가 툭 와 부딪혔다.","eveningBranch":2,"portrait":"seungkwan-body1-sweating","livingSilhouette":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"아이고, 죄송합니다!","speaker":"승관","portrait":"seungkwan-body1-sweating","eveningBranch":2,"maskSpeaker":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"어떡하지, 다친 데는 없으시죠?","speaker":"승관","portrait":"seungkwan-body1-sweating","eveningBranch":2,"maskSpeaker":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(방금 이거… 일부러 부딪힌 거 같은데?)","speaker":"주인공","portrait":"seungkwan-body1-sweating","eveningBranch":2},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","text":"그러나 따질 새도 없었다.","portrait":"seungkwan-body1-smile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"어, 어어!","speaker":"승관","portrait":"seungkwan-body1-smile","eveningBranch":2,"maskSpeaker":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"새로 들어오신 분, 맞으시죠?","speaker":"승관","portrait":"seungkwan-body1-smile","eveningBranch":2,"maskSpeaker":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"생활관 가시는 거예요? 저도 딱 가는 길인데!","speaker":"승관","portrait":"seungkwan-body1-smile","eveningBranch":2,"maskSpeaker":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"같이 가요. 혼자 걷기 심심했거든요.","speaker":"승관","portrait":"seungkwan-body1-eyesmile","eveningBranch":2,"maskSpeaker":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"아, 저는 부승관이라고 해요.","speaker":"승관","portrait":"seungkwan-body2-eyesmile","eveningBranch":2,"revealSeungkwan":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"들어온 지 얼마 안 됐어요. 완전 뉴비랄까?","speaker":"승관","portrait":"seungkwan-body2-eyesmile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"그나저나 여기 도서실은 가 보셨어요?","speaker":"승관","portrait":"seungkwan-body1-eyesmile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"아주 넓진 않은데 되게 깔끔해요.","speaker":"승관","portrait":"seungkwan-body2-eyesmile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"장서나 자료도 많고. 근데 사람은 잘 없더라구요.","speaker":"승관","portrait":"seungkwan-body2-smile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(친화력이 엄청나다.)","speaker":"주인공","portrait":"seungkwan-body2-smile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(묻지도 않은 이야기를 술술 풀어놓는다.)","speaker":"주인공","portrait":"seungkwan-body2-smile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(근데 그 흐름이 지나치게 자연스럽다.)","speaker":"주인공","portrait":"seungkwan-body2-eyesmile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(어딜 가도 싹싹하니 예쁨받을 사람의 전형이랄까.)","speaker":"주인공","portrait":"seungkwan-body2-eyesmile","eveningBranch":2},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","text":"게다가 나에게 쓸모 있는 정보를 술술 털어놓는 중이다..","portrait":"seungkwan-body2-eyesmile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(밤에는 사람이 아무도 없어 은근히 으스스하다는 말까지.)","speaker":"주인공","portrait":"seungkwan-body2-smile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(그렇다는건 밤에 몰래 나와 여기저기 들러봐도 괜찮다는거겠지.)","speaker":"주인공","portrait":"seungkwan-body2-smile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"어떻게, 여기 생활은 좀 할 만하세요?","speaker":"승관","portrait":"seungkwan-body2-eyesmile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"음… 아직은 많이 어색해요.","speaker":"주인공","portrait":"seungkwan-body2-eyesmile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"그래도 밥은 맛있던데요.","speaker":"주인공","portrait":"seungkwan-body2-eyesmile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"그쵸? 여기 닭꼬치가 진짜 맛있거든요.","speaker":"승관","portrait":"seungkwan-body1-smile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"족발도. 나중에 꼭 드셔보세요.","speaker":"승관","portrait":"seungkwan-body1-smile","eveningBranch":2},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","text":"슬슬 핑계를 대고 빠져나올 수도 있다.","portrait":"seungkwan-body2-smile","eveningBranch":2},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","text":"그런데도 이야기를 더 나눠보고 싶어진다.","portrait":"seungkwan-body2-smile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(뭔가 이곳의 다른 사람들과 달라 보여.)","speaker":"주인공","portrait":"seungkwan-body2-eyesmile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(곧고 바른 눈빛?)","speaker":"주인공","portrait":"seungkwan-body2-eyesmile","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"(사회에서 만났으면 일 잘해서 예뻐했을 상이지.)","speaker":"주인공","portrait":"seungkwan-body1-default","eveningBranch":2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"물론 아침 공양 이후로 밥이 제대로 안 들어가긴 하지만….","speaker":"승관","portrait":"seungkwan-body1-thinking","eveningBranch":2},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","text":"승관은 주변을 살피더니, 목소리를 낮췄다.","portrait":"seungkwan-body1-thinking","eveningBranch":2,"eveningBgShade":0.3},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"…사실 저는요, 이곳의 ‘공양’이 잘 이해가 안 가요.","speaker":"승관","portrait":"seungkwan-body1-thinking","eveningBranch":2,"eveningBgShade":0.3,"boldWord":"공양"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"종교는 결속력이 중요한 게 맞지만…","speaker":"승관","portrait":"seungkwan-body2-thinking","eveningBranch":2,"eveningBgShade":0.3},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"사람을 죽여가고, 서로 밀고하면서까지 이러는 게 맞을까요?","speaker":"승관","portrait":"seungkwan-body2-thinking","eveningBranch":2,"eveningBgShade":0.3},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"봉봉씨.","speaker":"승관","portrait":"seungkwan-body2-thinking","eveningBranch":2,"eveningBgShade":0.4,"boldAll":true,"fontScale":1.2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"어, …잠깐. 내 이름을 말한 적 있던가?","speaker":"주인공","portrait":"seungkwan-body2-thinking","eveningBranch":2,"eveningBgShade":0.4},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"맞으시죠? 봉봉아티클의 취재기자.","speaker":"승관","portrait":"seungkwan-body2-default","eveningBranch":2,"eveningBgShade":0.4,"boldAll":true,"fontScale":1.2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"제가 그쪽을 도와드릴 수 있어요.","speaker":"승관","portrait":"seungkwan-body1-default","eveningBranch":2,"eveningBgShade":0.4,"boldAll":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"저한테만 진실을 말해주세요.","speaker":"승관","portrait":"seungkwan-body1-default","eveningBranch":2,"eveningBgShade":0.5,"boldAll":true,"fontScale":1.2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","text":"후회하지 않으실 거예요.","speaker":"승관","portrait":"seungkwan-body1-default","eveningBranch":2,"eveningBgShade":0.5,"boldAll":true,"fontScale":1.2},
 {"kind":"seungkwan-choice","eveningDay2":true,"eveningLocation":"living","eveningBranch":2}
);


// V178: Day 2 night / Eunjae room police and Dogodai ending.
const V178_OFFSET=scenes.length;
scenes.push(
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","v178":true,"text":"사람 잘못 보신 것 같습니다.","speaker":"주인공","portrait":"seungkwan-body1-thinking","portraitFadeOutAfter":true},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","v178":true,"text":"차갑게 말하고 돌아섰다. 심장이 몹시 두근거린다.","clearPortrait":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","v178":true,"text":"(부승관, 그는 누구고 어째서 내 정체를 알고 있는 거지?)","speaker":"주인공","clearPortrait":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","v178":true,"text":"아니, 지금은 이럴 때가 아니다.","speaker":"주인공","clearPortrait":true},
 {"kind":"v178-hold","eveningDay2":true,"eveningLocation":"living","v178":true,"v178Hold":"deny"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","v178":true,"text":"…꼭 비밀로 해주셔야 해요.","speaker":"주인공","portrait":"seungkwan-body2-default"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","v178":true,"text":"그간의 이야기를 털어놓았다.","portrait":"seungkwan-body2-default"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","v178":true,"text":"익명의 제보자에게서 받은 고발 이메일,","portrait":"seungkwan-body2-default"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","v178":true,"text":"그리고 이 교단을 취재해 달라는 부탁까지.","portrait":"seungkwan-body2-default"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","v178":true,"text":"말을 하는 내내 손끝이 잘게 떨렸다.","portrait":"seungkwan-body2-default"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","v178":true,"text":"혹시라도 여길 보는 시선이 없는지 몇 번이나 확인했다.","portrait":"seungkwan-body2-default"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","v178":true,"text":"솔직하게 말씀해주셔서 감사해요.","speaker":"승관","portrait":"seungkwan-body1-eyesmile"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","v178":true,"text":"어려운 선택이었을 거 알아요.","speaker":"승관","portrait":"seungkwan-body1-smile"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","v178":true,"text":"저녁 기도가 끝나고 소등된 뒤에 <은재의 방>으로 오세요.","speaker":"승관","portrait":"seungkwan-body1-smile","boldAll":true,"portraitFadeOutAfter":true},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","v178":true,"text":"승관이 알려준 건 처음 들어보는 호실이었다.","clearPortrait":true},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"living","v178":true,"text":"되묻기도 전에, 승관은 아무 일도 없었다는 듯 신도들 사이로 섞여 멀어져 갔다.","clearPortrait":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"living","v178":true,"text":"…무슨 일인 걸까.","speaker":"주인공","clearPortrait":true},
 {"kind":"v178-intertitle","eveningDay2":true,"eveningLocation":"dark","v178":true,"text":"저녁 기도 이후"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"bongbong","v178":true,"text":"저녁이다. 개인실을 나서기 전 창밖부터 살폈다.","patrolDuo":"in"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"bongbong","v178":true,"text":"복도 끝에서 순찰하는 승철과 지훈의 그림자가 지나가기를 기다린다.","patrolDuo":"hold"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"corridor","v178":true,"text":"어두운 복도로 차가운 달빛이 쏟아진다.","patrolDuo":"out"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"corridor","v178":true,"text":"혹시 몰라 다른 신도들에게 ‘은재’에 대해 물어봤다.","clearPortrait":true},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"corridor","v178":true,"text":"‘여기에 은재라는 사람은 없는데요?’라는 대답만 돌아왔을 뿐이다."},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"corridor","v178":true,"text":"함정일 수도 있겠다는 생각이 스쳤다."},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"corridor","v178":true,"text":"하지만 이미 정체를 들킨 거, 끝장은 봐야지.","speaker":"주인공"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"corridor","v178":true,"text":"…<은재의 방> 앞에 도착했다."},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"corridor","v178":true,"text":"복도는 텅 비어있고, 내 숨소리만 유난히 선명하네...","speaker":"주인공"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"corridor","v178":true,"text":"뒤를 한 번 돌아본 뒤, 천천히 노크를 했다.","v178Audio":"knock"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"corridor","v178":true,"text":"승관이 알려준 대로...","speaker":"주인공"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"corridor","v178":true,"text":"은재… 씨를 찾으러 왔습니다.","speaker":"주인공"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"corridor","v178":true,"text":"고요하다."},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"corridor","v178":true,"text":"잠금장치가 풀리는 소리가 들린다.","v178Audio":"unlock"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"corridor","v178":true,"text":"문이 열렸다. 안에는 승관 외에도 사람이 셋이나 더 있었다."},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"corridor","v178":true,"text":"놀라 도망치려는 나를, 그들은 침착하게 붙잡았다."},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"진정하세요. 소리 내시면 안 됩니다.","speaker":"석민","portrait":"seokmin-body1-default","maskUntilMet":"석민","portraitFadeOutAfter":true},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"문이 닫히자마자 잠금장치가 다시 걸린다.","clearPortrait":true},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"짐이 죄다 빠지고 스산하게 텅 빈 방..."},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"…이어야 하는데."},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"방 안은 서류로 꽉 차 있었다."},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"책상 위는 물론이고 의자와 바닥, 창틀까지도."},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"벽에도 지도와 사진들이 빼곡하게 붙어 있다."},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"손으로 휘갈긴 메모와 줄을 쳐 놓은 명단까지."},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"누가 봐도 쓰고 있는 방이다."},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"아니, 오히려 비밀 본거지처럼 생겼다."},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"자기소개부터 해야 하는 거 아닌가?","speaker":"순영","portrait":"soonyoung-body2-default","maskUntilMet":"순영"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"차분하고 여유로운 ‘윤정한’.","portrait":"jeonghan-body1-default","boldWord":"윤정한","revealName":"정한"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"서늘한 무표정의 ‘권순영’.","portrait":"soonyoung-body1-default","boldWord":"권순영","revealName":"순영"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"긴장한 낯의 ‘이석민’.","portrait":"seokmin-body1-default","boldWord":"이석민","revealName":"석민"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"아까와는 전혀 다른 분위기의 승관까지.","portrait":"seungkwan-body2-default","boldWord":"승관"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"제대로 된 소개가 늦었네요.","speaker":"승관","portrait":"seungkwan-body2-default"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"세븐특별시 경찰청 강력팀 소속 형사 부승관입니다.","speaker":"승관","portrait":"seungkwan-body2-eyesmile","boldWord":"세븐특별시 경찰청 강력팀"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"현재 카밀레교에 동료 형사들과 함께 잠입 수사 중입니다.","speaker":"승관","portrait":"seungkwan-body2-default","boldAll":true,"fontScale":1.2},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"어떻게 저를…","speaker":"주인공","portrait":"seungkwan-body2-eyesmile"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"봉봉 아티클 소속 김봉봉 씨, 예전에 저희 서와 협력하셨잖습니까.","speaker":"석민","portrait":"seokmin-body2-eyesmile"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"…맞아. 그랬던 적이 있었죠.","speaker":"주인공","portrait":"seokmin-body1-eyesmile"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"입사한 지 얼마 안 됐을 때, 강력팀의 야간 단속을 밀착 취재해서 기사를 썼다.","portrait":"seokmin-body1-default"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"나름 애정이 가는 기사다. 크게 주목받진 못했지만.","portrait":"seokmin-body1-default"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"그래서 절 알아본 거군요.","speaker":"주인공","portrait":"seokmin-body1-default"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"내가 처음부터 그랬잖아. 왠지 이상했다니까?","speaker":"순영","portrait":"soonyoung-body2-smile"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"이게 바로 호랑이의 촉이지~","speaker":"순영","portrait":"soonyoung-body1-smile"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"아, 이 형 또 저러네.","speaker":"승관","portrait":"seungkwan-body2-thinking"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"쉿. 벽 얇다.","speaker":"정한","portrait":"jeonghan-body1-subtle"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"정한의 한 마디에 방 안이 순식간에 조용해졌다.","portrait":"jeonghan-body1-subtle"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"강력팀 소속 윤정한 경위입니다.","speaker":"정한","portrait":"jeonghan-body1-default"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"이번 임무에서 팀장을 맡았고요.","speaker":"정한","portrait":"jeonghan-body1-default","boldWord":"팀장"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"본론부터 들어가겠습니다.","speaker":"정한","portrait":"jeonghan-body1-default"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"잠입 취재 중이라고 들었습니다.","speaker":"정한","portrait":"jeonghan-body1-smile"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"이렇게 된 거, 비공식 협력을 요청합니다.","speaker":"정한","portrait":"jeonghan-body1-smile"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"저희 쪽에서도 현재 갖고 있는 정보가 있습니다.","speaker":"정한","portrait":"jeonghan-body2-smile"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"함께하면 카밀레교를 무너트리기는 더 쉬울 겁니다.","speaker":"정한","portrait":"jeonghan-body2-smile"},
 {"kind":"v178-coop-choice","eveningDay2":true,"eveningLocation":"dark","v178":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"예. 협력에 응하겠습니다.","speaker":"주인공","clearPortrait":true},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"경찰들은 몹시 반가워하며 알아낸 정보를 알려주었다."},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"우선 중요한 건 저녁 활동이고...","speaker":"주인공"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"이곳저곳을 둘러봐야 한다. 비록 오늘은 시간이 너무 늦었지만."},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"결국 수집해야 하는 건 ‘결정적인 물증’이구나.","speaker":"주인공"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"아, 그리고 오전에 여기 오시면 드릴 수 있는 게 있습니다.","speaker":"정한","portrait":"jeonghan-body1-eyesmile","portraitFadeOutAfter":true},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"<은재의 방>에는 오전에도 와봐야겠다.","clearPortrait":true},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"이미 자정이 넘은 시간이다."},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"bongbong","v178":true,"text":"개인실로 몰래 돌아가 침대에 몸을 파묻었다."},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"bongbong","v178":true,"text":"오늘 하루에 너무 많은 일이 있었어...","speaker":"주인공"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"bongbong","v178":true,"text":"푹 자고 내일도 파이팅해보자…","speaker":"주인공"},
 {"kind":"v178-hold","eveningDay2":true,"eveningLocation":"bongbong","v178":true,"v178Hold":"accept"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"…아무래도 그건 어려울 것 같습니다.","speaker":"주인공","clearPortrait":true},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"승관은 충격에 빠진 얼굴이고,","portrait":"seungkwan-body1-despair"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"eunjae","v178":true,"text":"정한은 예상했다는 얼굴이다.","portrait":"jeonghan-body1-default","portraitFadeOutAfter":true},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"bongbong","v178":true,"text":"그렇게 말하곤 방으로 돌아왔다.","clearPortrait":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"bongbong","v178":true,"text":"경찰의 방식이라 해도 어디까지나 바깥세상의 이야기지...","speaker":"주인공"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"bongbong","v178":true,"text":"여기서까진 통용되지 않아.","speaker":"주인공"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"bongbong","v178":true,"text":"내 마음대로 취재하고 싶어. 더 위험해지더라도.","speaker":"주인공"},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"bongbong","v178":true,"text":"…올바른 선택이었겠지?","speaker":"주인공"},
 {"kind":"v178-day3-title","eveningDay2":true,"eveningLocation":"dark","v178":true,"text":"3일차 아침"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"square","v178":true,"text":"김봉봉은 의문의 괴한들에 붙들려 중앙광장으로 끌려갔다.","v178Audio":"bell"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"square","v178":true,"text":"익숙한 얼굴들 사이에서 정한과 눈이 마주쳤다.","portrait":"jeonghan-body1-default","portraitFadeOutAfter":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"square","v178":true,"text":"아, 나를 팔았구나.","speaker":"주인공","clearPortrait":true},
 {"kind":"dialogue","eveningDay2":true,"eveningLocation":"square","v178":true,"text":"(기자 하나를 넘기면, 경찰을 향한 의심은 걷힐 테니까.)","speaker":"주인공"},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"square","v178":true,"text":"오늘도 공양은 성공적으로 끝났다."},
 {"kind":"narration","eveningDay2":true,"eveningLocation":"square","v178":true,"text":"나로 말이지."},
 {"kind":"v178-ending","eveningDay2":true,"eveningLocation":"dark","v178":true}
);
const V178_TARGETS=Object.freeze({"deny": 0, "tell": 5, "accept": 71, "refuse": 83});

const sceneBackdropRanges=[
 {start:5,end:17,file:"bg-van-interior.png"},
 {start:18,end:57,file:"bg-forest-path.png"},
 {start:58,end:62,file:"bg-village-front.png"},
 {start:63,end:68,file:"bg-sanctuary-front.png"},
 {start:69,end:94,file:"bg-sanctuary-inside.png"},
 {start:95,end:99,file:"bg-confession-outside.png"},
 {start:100,end:133,file:"bg-confession-inside.png"},
 {start:134,end:139,file:"bg-living-quarters-interior.png"},
 {start:140,end:143,file:"bg-central-square.jpg"},
 {start:150,end:172,file:"bg-central-square.jpg"}
];
// V156: additional living-quarter locations use reserved file names until their JPGs arrive.
const LIVING_BACKDROPS=Object.freeze({
 interior:'bg-living-quarters-interior.png',
 exterior:'bg-living-quarters-exterior.png',
 bongbong:'bg-bongbong-room.jpg',
 corridor:'bg-living-corridor.jpg',
 eunjae:'bg-eunjae-room.jpg',
 laundry:'bg-living-laundry.jpg'
});
function getSceneBackdrop(sceneNumber,scene){
 if(scene?.kind==='living-recall')return 'bg-village-front.png';
 if(scene&&scene.livingHall){
  const location=scene.livingLocation||'interior';
  return LIVING_BACKDROPS[location]||'';
 }
 if(scene&&scene.mainHall)return {inside:'bg-sanctuary-inside.png',office:'bg-sanctuary-office.jpg',library:'bg-sanctuary-library.jpg'}[scene.mainLocation||'inside']||'';
 if(scene&&scene.confMorning)return {outside:'bg-confession-outside.png',inside:'bg-confession-inside.png'}[scene.confLocation||'outside']||'bg-confession-outside.png';
 if(scene&&scene.gongyangHall)return {square:'bg-central-square.jpg',outside:'bg-gongyang-outside.jpg'}[scene.gongyangLocation||'square']||'';
 if(scene&&scene.eveningDay2)return {square:'bg-central-square.jpg',outside:'bg-confession-outside.png',inside:'bg-confession-inside.png',dark:'',living:'bg-living-quarters-exterior.png',bongbong:LIVING_BACKDROPS.bongbong,corridor:LIVING_BACKDROPS.corridor,eunjae:LIVING_BACKDROPS.eunjae}[scene.eveningLocation||'square']||'';
 // V149: keep the sleep/title interstitial entirely black.
 if(scene&&scene.kind==='sleep-transition')return "";
 // V152: optional location photos for Day 2 activities. No scene is inserted,
 // so previously stored story indices and choices remain valid.
 if(scene&&scene.artHall){
  if(scene.artBlackout)return "";
  const where=scene.artStart?'main':(scene.artLocation||artLocation||'main');
  return where==='main'?'bg-art-hall-interior.jpg':'';
 }
 if(scene&&scene.prayerRoom)return 'bg-prayer-hall-interior.jpg';
 // Keep the Day 2 square photograph throughout the common square sequence;
 // the old numeric ranges had gaps that made the photo disappear mid-scene.
 const squareStart=scenes.findIndex(x=>x.square===true&&String(x.text||'').includes('중앙광장으로 가볼까'));
 const squareEnd=scenes.findIndex((x,i)=>i>squareStart&&x.kind==='day2-morning-choice');
 if(scene&&scene.branch===1&&squareStart>=0&&sceneNumber-1>=squareStart&&(squareEnd<0||sceneNumber-1<squareEnd))return 'bg-central-square.jpg';
 if(scene&&scene.backdrop)return scene.backdrop;
 for(const range of sceneBackdropRanges){
  if(sceneNumber>=range.start && sceneNumber<=range.end)return range.file;
 }
 return "";
}
const style=document.createElement('style');style.textContent=`
#shindo-vn .v178-dogodai-title{font-size:clamp(30px,6vw,60px);font-weight:800;letter-spacing:-.04em;margin:0 0 18px}
/* V178: independent police patrol silhouettes; fade together on entering / leaving. */
#shindo-vn .vn-duo.v178-patrol{display:block;opacity:0;transition:opacity 850ms ease;pointer-events:none}
#shindo-vn .vn-duo.v178-patrol.is-visible{opacity:1}
#shindo-vn .vn-duo.v178-patrol img{filter:brightness(0)!important}
#shindo-vn .vn-portrait.v178-fadeout{opacity:0!important;transition:opacity 550ms ease!important}
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
#shindo-vn .shindo-choices .shindo-gongyang-package-test{margin-top:8px;text-align:center;font-size:clamp(12px,1.4vw,14px);color:#c9c9c9;background:#242424;border:1px dashed #777;padding:12px 10px;letter-spacing:-.045em}
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
#shindo-story-backdrop{position:fixed;inset:0;z-index:29999;background:#050607 center center / cover no-repeat;display:none;opacity:1;pointer-events:none;transition:opacity 1.05s ease}
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
#shindo-vn .vn-portrait.living-silhouette{filter:brightness(0)!important}
#shindo-vn .vn-portrait.main-silhouette{filter:brightness(0)!important}
#shindo-vn .shindo-evidence-overlay{position:absolute;inset:0;z-index:32;background:#000;display:flex;align-items:center;justify-content:center;padding:22px;box-sizing:border-box;cursor:default}
#shindo-vn .shindo-evidence-card{width:min(560px,100%);background:#101012;border:1px solid #5a5a5d;border-radius:9px;padding:30px 25px;color:#fff;text-align:center;display:flex;flex-direction:column;align-items:center;gap:19px;box-sizing:border-box;animation:vn-image-appear .65s ease both}
#shindo-vn .shindo-evidence-kicker{font-size:13px;color:#aaa;letter-spacing:-.02em}
#shindo-vn .shindo-evidence-title{font-size:clamp(22px,4vw,31px);font-weight:750;line-height:1.5;letter-spacing:-.055em}
#shindo-vn .shindo-evidence-desc{font-size:clamp(14px,1.7vw,17px);color:#ccc;line-height:1.8;letter-spacing:-.045em}
/* V162: Put the map description on two lines only on mobile. */
@media(max-width:750px){#shindo-vn .shindo-evidence-mobile-line{display:block}}
#shindo-vn .shindo-evidence-confirm{background:#252529;border:1px solid #666;border-radius:6px;padding:12px 34px;color:#fff;font:inherit;cursor:pointer}
#shindo-vn .shindo-evidence-confirm:hover{background:#333}
#shindo-vn .art-branch-options{display:grid;grid-template-columns:1fr;gap:11px}
#shindo-vn .art-branch-options button{text-align:center}
#shindo-vn .shindo-choices .shindo-morning-return{font-size:clamp(13px,1.6vw,16px);text-align:center}
#shindo-vn .vn-box.box-shake-soft{animation:shindo-soft-box-shake .26s ease-in-out 1}
@keyframes shindo-soft-box-shake{0%,100%{transform:translate(0,0)}20%{transform:translate(-1.5px,.5px)}40%{transform:translate(1.5px,-.5px)}60%{transform:translate(-1px,-.5px)}80%{transform:translate(1px,.5px)}}
#shindo-vn .vn-box .shindo-area-skip{position:absolute;right:14px;top:8px;z-index:18;min-width:82px;padding:4px 10px;background:rgba(40,42,46,.96);border:1px solid #777;border-radius:7px;color:#f5f5f5;font-size:12px;font-weight:700;letter-spacing:-.04em;cursor:pointer;line-height:1.5}
#shindo-vn .vn-box .shindo-area-skip[hidden]{display:none!important}
@media(max-width:750px){#shindo-vn .vn-box .shindo-area-skip{right:9px;top:6px;font-size:11px;min-width:70px;padding:3px 7px}}
#shindo-vn .vn-portrait.evening-shadow{filter:brightness(var(--evening-portrait-brightness,1))!important;transition:filter .35s ease!important}
`;document.head.appendChild(style);
const storyUnderlay=document.createElement('div');storyUnderlay.id='shindo-story-underlay';document.body.appendChild(storyUnderlay);
const storyBackdrop=document.createElement('div');storyBackdrop.id='shindo-story-backdrop';document.body.appendChild(storyBackdrop);
let currentSceneBackdropKey="";
let backdropSwapTimer=null;
let backdropChangeToken=0;
function setSceneBackdropImage(file){
 if(file){
  storyBackdrop.style.backgroundImage=`linear-gradient(rgba(0,0,0,.28),rgba(0,0,0,.46)), url("story-backgrounds/${file}")`;
 }else{
  storyBackdrop.style.backgroundImage='linear-gradient(rgba(5,6,7,1),rgba(5,6,7,1))';
 }
}
function primeBackdrop(file){
 return new Promise(resolve=>{
  if(!file){resolve();return;}
  const img=new Image();
  img.onload=()=>{if(img.decode){img.decode().catch(()=>{}).then(resolve)}else resolve()};
  img.onerror=()=>{console.warn('[SHINDO] Background failed to load:',file);resolve()};
  img.src='story-backgrounds/'+file;
 });
}
function applySceneBackdrop(sceneIndex,scene){
 const file=getSceneBackdrop(sceneIndex+1,scene);
 const key=file||'__none';
 if(currentSceneBackdropKey===key)return;
 currentSceneBackdropKey=key;
 const token=++backdropChangeToken;
 if(backdropSwapTimer){clearTimeout(backdropSwapTimer);backdropSwapTimer=null;}
 if(!storyBackdrop.dataset.backdropReady){
  storyBackdrop.dataset.backdropReady='1';
  setSceneBackdropImage(file);
  storyBackdrop.style.opacity='0';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{storyBackdrop.style.opacity='1'}));
  return;
 }
 // On entering the central square, fade the new photograph in from black
 // rather than briefly retaining the previous living-quarters background.
 if(file==='bg-central-square.jpg'&&scene?.square){
  storyBackdrop.style.opacity='0';
  primeBackdrop(file).then(()=>{
   if(token!==backdropChangeToken)return;
   setSceneBackdropImage(file);
   requestAnimationFrame(()=>requestAnimationFrame(()=>{
    if(token===backdropChangeToken)storyBackdrop.style.opacity='1';
   }));
  });
  return;
 }
 // Fade the old photo away before switching. Preload the next one before
 // revealing it, preventing a white/black image-load flash.
 storyBackdrop.style.opacity='0';
 const started=performance.now();
 Promise.all([primeBackdrop(file),new Promise(done=>setTimeout(done,500))]).then(()=>{
  if(token!==backdropChangeToken)return;
  setSceneBackdropImage(file);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
   if(token===backdropChangeToken)storyBackdrop.style.opacity='1';
  }));
 });
}
// Show a new building's exterior briefly before the first interior narration.
// Keep the scene list unchanged for existing save-data compatibility.
function enterMorningBuilding(exterior,begin){
 const token=++backdropChangeToken;
 if(backdropSwapTimer){clearTimeout(backdropSwapTimer);backdropSwapTimer=null;}
 currentSceneBackdropKey='__entrance__'+exterior;
 storyBackdrop.style.opacity='0';
 box.style.display='none';
 portrait.hidden=true;
 illustration.hidden=true;
 overlay.querySelector('.vn-hint').style.display='none';
 Promise.all([primeBackdrop(exterior),new Promise(done=>setTimeout(done,400))]).then(()=>{
  if(token!==backdropChangeToken)return;
  setSceneBackdropImage(exterior);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
   if(token===backdropChangeToken)storyBackdrop.style.opacity='1';
  }));
  backdropSwapTimer=setTimeout(()=>{
   if(token!==backdropChangeToken)return;
   backdropSwapTimer=null;
   begin();
  },1750);
 });
}
const overlay=document.createElement('div');overlay.id='shindo-vn';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-label','1일차 스토리');overlay.innerHTML='<div class="vn-box"><span class="vn-text"></span></div><div class="vn-hint">화면을 터치하거나 클릭하여 진행</div>';document.body.appendChild(overlay);
const box=overlay.querySelector('.vn-box'),content=overlay.querySelector('.vn-text');
const portrait=document.createElement('img');portrait.className='vn-portrait';portrait.alt='';portrait.hidden=true;overlay.insertBefore(portrait,box);
const speakerTag=document.createElement('div');speakerTag.className='vn-speaker';box.insertBefore(speakerTag,content);
const areaSkipButton=document.createElement('button');areaSkipButton.type='button';areaSkipButton.className='shindo-area-skip';areaSkipButton.textContent='≫ 구역 스킵';areaSkipButton.hidden=true;areaSkipButton.setAttribute('aria-label','현재 구역 스킵');box.appendChild(areaSkipButton);

let currentPortrait='',revealed=false;
const portraits={};
const DEFAULT_PORTRAIT_PROFILE={scale:1,x:'-50%',y:'0px',bottom:'',height:'',maxWidth:''};
const PORTRAIT_PROFILES=[
 // V170: Junhui's body1/body2/body3 canvases have nearly identical heights,
 // but very different widths. The global 95vw max-width was shrinking the
 // wide poses on phones. Keep one fixed portrait height across all poses,
 // allowing the illustration's wide arms to extend beyond the viewport.
 {match:/^junhui-/,scale:1,maxWidth:'none'},
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
// Normalize the *face* center, not the transparent PNG canvas center.
// The body2 wide-pose files have asymmetric transparent padding.
function junhuiCenterCompensation(name){
 if(!/^junhui-body[123]-/.test(name||''))return 0;
 let faceOffsetRatio=0;
 if(/^junhui-body2-(?:default|smile|의심)$/.test(name))faceOffsetRatio=-64/2002;
 else if(/^junhui-body2-(?:eyesmile|snacking)$/.test(name)||name==='junhui-body3-snacking')faceOffsetRatio=123.5/2021;
 else if(/^junhui-body1-/.test(name))faceOffsetRatio=3/2020;
 else if(/^junhui-body3-/.test(name))faceOffsetRatio=3.5/2020;
 const portraitHeight=Math.min(window.innerHeight*(window.innerWidth<=750?.60:.66),window.innerWidth<=750?620:740);
 return Math.round(-faceOffsetRatio*portraitHeight*100)/100;
}
function applyPortraitProfile(name){
 const profile=getPortraitProfile(name);
 portrait.style.setProperty('--portrait-scale',String(profile.scale??1));
 const correction=junhuiCenterCompensation(name);
 portrait.style.setProperty('--portrait-offset-x',correction?`calc(-50% + ${correction}px)`:(profile.x||'-50%'));
 portrait.style.setProperty('--portrait-offset-y',profile.y||'0px');
 portrait.style.bottom=profile.bottom||'';
 portrait.style.height=profile.height||'';
 portrait.style.maxWidth=profile.maxWidth||'';
 // Use a consistent display box for all expressions of the same character.
 portrait.style.width='auto';
}
window.addEventListener('resize',()=>{if(currentPortrait?.startsWith('junhui-'))applyPortraitProfile(currentPortrait)},{passive:true});
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
// V158: The Jihoon silhouette enters together with the living-corridor
// background.  Wait for both the image and the backdrop's existing 500ms
// preparation; never reveal an older asynchronous portrait after advancing.
function revealLivingJihoonOnBackgroundFade(img){
 if(img!==portrait||!scenes[index]?.livingJihoonEntrance)return;
 const sceneIndex=index;
 Promise.all([primeBackdrop('bg-living-corridor.jpg'),
   new Promise(done=>setTimeout(done,500))]).then(()=>{
  if(index!==sceneIndex||img.hidden)return;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
   if(index===sceneIndex&&!img.hidden)img.style.opacity='1';
  }));
 });
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
  revealLivingJihoonOnBackgroundFade(img);
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
  revealLivingJihoonOnBackgroundFade(img);
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
let livingBranch=Number(localStorage.getItem('shindo_living_branch_v156')||0);
let mainBranch=Number(localStorage.getItem('shindo_main_branch_v160')||0);
let joshuaRevealed=localStorage.getItem('shindo_joshua_known_v160')==='1';
let jeonghanRevealed=localStorage.getItem('shindo_jeonghan_known_v156')==='1';
let mingyuRevealed=localStorage.getItem('shindo_mingyu_known_v156')==='1';
let junhuiRevealed=localStorage.getItem('shindo_junhui_known_v167')==='1';
let seungkwanRevealed=localStorage.getItem('shindo_seungkwan_known_v177')==='1';
let seungkwanTruthBranch=Number(localStorage.getItem('shindo_seungkwan_truth_branch_v177')||0);
let prayerBranch=Number(localStorage.getItem("shindo_prayer_branch_v99")||0),hansolRevealed=localStorage.getItem("shindo_hansol_known_v99")==="1",seokminRevealed=localStorage.getItem("shindo_seokmin_known_v99")==="1",chanRevealed=localStorage.getItem("shindo_chan_known_v99")==="1";
let index=0,locked=false, timer=null, audio=null,ambient=null;let selectedBranch=Number(localStorage.getItem("shindo_confession_branch")||0),endingTimers=[],endingBell=null,endingBellTimer=null;let storySfx=null,storySfxTimer=null;
let sanctuaryTickTimer=null,sanctuaryTickAudio=null,confessionDoorAudio=null,confessionTickStartTimer=null;
let confMorningBranch=Number(localStorage.getItem('shindo_confession_morning_branch_v163')||0);
let eveningBranch=Number(localStorage.getItem('shindo_evening_branch_day2_v173')||0);
let eveningTickTimer=null;
const eveningTickSounds=new Set();
let eveningTickFadeTimer=null,eveningWalkingAudio=null,eveningLivingEntered=false;
function stopEveningWalk(){
 if(eveningWalkingAudio){eveningWalkingAudio.pause();eveningWalkingAudio.currentTime=0;eveningWalkingAudio=null}
}
function stopEveningTick(fade=false){
 if(eveningTickTimer!==null){clearInterval(eveningTickTimer);eveningTickTimer=null}
 if(eveningTickFadeTimer!==null){clearInterval(eveningTickFadeTimer);eveningTickFadeTimer=null}
 if(!fade){
  for(const tick of eveningTickSounds){tick.pause();tick.currentTime=0}
  eveningTickSounds.clear();return;
 }
 // Fade the tail of the final clock strike instead of cutting it abruptly.
 const active=[...eveningTickSounds];if(!active.length)return;
 const initial=active.map(tick=>tick.volume);const started=performance.now();
 eveningTickFadeTimer=setInterval(()=>{
  const t=Math.min(1,(performance.now()-started)/850);
  active.forEach((tick,i)=>{if(eveningTickSounds.has(tick))tick.volume=Math.max(0,initial[i]*(1-t))});
  if(t>=1){clearInterval(eveningTickFadeTimer);eveningTickFadeTimer=null;active.forEach(tick=>{tick.pause();tick.currentTime=0;eveningTickSounds.delete(tick)})}
 },35);
}
function startEveningTick(){
 if(eveningTickTimer!==null)return;
 if(eveningTickFadeTimer!==null){clearInterval(eveningTickFadeTimer);eveningTickFadeTimer=null}
 const tick=()=>{
  if(!overlay.classList.contains('active'))return;
  const a=playExtraAudio('clock_tick_single.mp3',.35);
  eveningTickSounds.add(a);
  const cleanup=()=>eveningTickSounds.delete(a);
  a.addEventListener('ended',cleanup,{once:true});a.addEventListener('error',cleanup,{once:true});
 };
 tick();eveningTickTimer=setInterval(tick,1000);
}
function enterEveningLiving(){
 // Exactly once on the fade from the black confessional to the living-quarters exterior.
 if(eveningLivingEntered)return;
 eveningLivingEntered=true;
 stopEveningTick(true);
 stopEveningWalk();
 const steps=playExtraAudio('01-4.mp3',.09); // V178: very quiet forest footsteps on the evening path
 eveningWalkingAudio=steps;
 const finish=()=>{if(eveningWalkingAudio===steps)eveningWalkingAudio=null};
 steps.addEventListener('ended',finish,{once:true});steps.addEventListener('error',finish,{once:true});
 // Keep this cue short, but do not couple it to dialogue advancement.
 setTimeout(()=>{if(eveningWalkingAudio===steps)stopEveningWalk()},6000);
}
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
 // V152: the main art hall uses its supplied photograph; unsupplied
 // corridor/office locations and intentional blackouts stay dark.
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
 const evidenceDesc=pop.querySelector('.shindo-evidence-desc');
 if(scene.evidenceId==='destroyed-document-2'){
  // Desktop: one flowing sentence; mobile: break immediately after the first sentence.
  const sentence='마을의 내부 지도다.';
  const remainder=String(scene.evidenceDescription||'').slice(sentence.length).trimStart();
  evidenceDesc.append(document.createTextNode(sentence));
  if(remainder){
   const secondLine=document.createElement('span');
   secondLine.className='shindo-evidence-mobile-line';
   secondLine.textContent=' '+remainder;
   evidenceDesc.append(secondLine);
  }
 }else evidenceDesc.textContent=scene.evidenceDescription;
 if(scene.evidenceArt){const art=document.createElement('img');art.alt=scene.evidenceTitle;art.src='story-illustrations/'+scene.evidenceArt+'.png';art.style.cssText='width:min(100%,430px);max-height:46vh;object-fit:contain';pop.querySelector('.shindo-evidence-desc').before(art)}
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
 if(name==='knock'){playExtraAudio('wood_sound_01.wav',.55);return}
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
const SKIP_REACHED='shindo_day1_reached_day2_v171';
const SKIP_REPLAY='shindo_area_skip_replay_v171';
// Old V170 saves that have reached Day 2 are eligible once they restart.
function hasCompletedDay1(){
 if(localStorage.getItem(SKIP_REACHED)==='1')return true;
 const n=Number(localStorage.getItem(KEY));
 return (Number.isInteger(n)&&n>=DAY2_START) || localStorage.getItem(KEY)==='complete' || !!localStorage.getItem('shindo_day2_start_affinity_snapshot_v169');
}
function flagReplay(){if(hasCompletedDay1())localStorage.setItem(SKIP_REPLAY,'1')}
const AREA_CHOICE_KINDS=new Set(['choice','day2-prayer-choice','day2-morning-choice','prayer-choice','art-choice','living-choice','main-choice','conf-morning-choice','evening-choice','seungkwan-choice','v178-coop-choice']);
const AREA_END_KINDS=new Set(['prayer-end','art-end','living-end','main-end','conf-morning-end','gongyang-end','evening-end']);
// V175: Day 2 morning activities flow directly into the evening confession.
// Only terminal nodes are included: common dialogue and all manual choices are untouched.
const DAY2_MORNING_AUTO_EVENING_ENDS=new Set(['prayer-end','art-end','living-end','main-end','conf-morning-end','gongyang-end']);
function findBranchEnd(prefix,branch){return scenes.findIndex((x,i)=>i>0 && x[prefix]===branch && AREA_END_KINDS.has(x.kind))}
function findCurrentAreaSkipTarget(){
 if(localStorage.getItem(SKIP_REPLAY)!=='1')return -1;
 const scene=scenes[index];if(!scene||AREA_CHOICE_KINDS.has(scene.kind)||AREA_END_KINDS.has(scene.kind)||scene.kind==='ending'||scene.kind==='sleep-transition'||scene.kind==='evidence-popup'||scene.kind==='living-recall')return -1;
 // V173: evening scene can be skipped only until its manual choice.
 if(scene.eveningDay2){const choice=scenes.findIndex((x,i)=>i>=EVENING_DAY2_START&&x.kind==='evening-choice');return index<choice?choice:-1}
 // One day-one region at a time. The confessional stops BEFORE the choice.
 const choiceIndex=scenes.findIndex(x=>x.kind==='choice');
 const early=[[4,16],[17,56],[57,61],[62,67],[68,93]];
 for(const [a,b] of early)if(index>=a&&index<b)return b;
 if(index>=94&&index<choiceIndex)return choiceIndex;
 // Day 2: the common square ends at the manual morning-activity choice.
 const squareStart=scenes.findIndex(x=>x.square && String(x.text||'').includes('중앙광장으로 가볼까'));
 const morningChoice=scenes.findIndex((x,i)=>i>squareStart && x.kind==='day2-morning-choice');
 if(squareStart>=0&&index>=squareStart&&index<morningChoice&&selectedBranch===1)return morningChoice;
 // Morning common introductions are deliberately NOT skippable.
 const match=[
  [scenes[index]?.prayerRoom,prayerBranch,'prayerBranch'],
  [scenes[index]?.artHall,artBranch,'artBranch'],
  [scenes[index]?.livingHall,livingBranch,'livingBranch'],
  [scenes[index]?.mainHall,mainBranch,'mainBranch'],
  [scenes[index]?.confMorning,confMorningBranch,'confMorningBranch'],
  [scenes[index]?.gongyangHall,1,'gongyangHall']
 ];
 for(const [active,branch,key] of match){
  if(!active||!branch)continue;
  if(key==='artBranch' && branch===4)return -1; // The Minghao 60+ special scene is protected.
  if(key==='gongyangHall')return -1; // No subchoice yet: protect the entire common dialogue.
  const starts=key==='confMorningBranch'&&branch===2
   ? scenes.findIndex(x=>x.kind==='conf-morning-shared-start')+1
   : scenes.findIndex((x,i)=>i>0&&x[key]===branch&&(
    key==='confMorningBranch'||key==='prayerBranch'||key==='artBranch'||key==='livingBranch'||key==='mainBranch'));
  if(starts<0||index<starts)return -1;
  let end=key==='confMorningBranch' ? scenes.findIndex((x,i)=>i>index&&x.kind==='conf-morning-end') : findBranchEnd(key,branch);
  if(end>index){
   // Previously designated unskippable flashbacks must actually play.
   const recall=scenes.findIndex((x,i)=>i>index&&i<end&&x.kind==='living-recall');
   if(recall>index)return recall;
   for(let i=index+1;i<end;i++)if(AREA_CHOICE_KINDS.has(scenes[i]?.kind)||scenes[i]?.kind==='ending')return -1;
   return end;
  }
 }
 return -1;
}
function updateAreaSkipButton(){
 const target=findCurrentAreaSkipTarget();
 areaSkipButton.hidden=target<=index;
 areaSkipButton.dataset.skipTarget=String(target);
}
function runSkippedSceneState(from,to){
 // Apply non-visual scene effects without running timers, sounds, or background transitions.
 for(let j=from;j<to;j++){
  const s=scenes[j];if(!s)continue;
  if(s.reveal){revealed=true;window.SHINDO_markCharacterMet?.('승철')}
  if(s.revealJihoon){jihoonRevealed=true;window.SHINDO_markCharacterMet?.('지훈')}
  for(const [flag,name,key] of [
   ['revealHansol','한솔','shindo_hansol_known_v99'],['revealSeokmin','석민','shindo_seokmin_known_v99'],
   ['revealChan','찬','shindo_chan_known_v99'],['revealSoonyoung','순영','shindo_soonyoung_known_v105'],
   ['revealMinghao','명호','shindo_minghao_known_v105'],['revealJeonghan','정한','shindo_jeonghan_known_v156'],
   ['revealMingyu','민규','shindo_mingyu_known_v156'],['revealJoshua','조슈아','shindo_joshua_known_v160'],
   ['revealJunhui','준휘','shindo_junhui_known_v167']
  ])if(s[flag]){localStorage.setItem(key,'1');window.SHINDO_markCharacterMet?.(name);
   if(name==='한솔')hansolRevealed=true;if(name==='석민')seokminRevealed=true;if(name==='찬')chanRevealed=true;
   if(name==='순영')soonyoungRevealed=true;if(name==='명호')minghaoRevealed=true;if(name==='정한')jeonghanRevealed=true;
   if(name==='민규')mingyuRevealed=true;if(name==='조슈아')joshuaRevealed=true;if(name==='준휘')junhuiRevealed=true;
  }
  if(s.enterSanctuary)overlay.classList.add('sanctuary');
  if(s.leaveSanctuary)overlay.classList.remove('sanctuary');
  if(s.kind==='evidence-popup'&&s.evidenceId)collectEvidence(s.evidenceId);
 }
}
function skipCurrentArea(e){
 e.stopPropagation();e.preventDefault();
 if(!overlay.classList.contains('active'))return;
 const target=findCurrentAreaSkipTarget();if(target<=index)return;
 // Nothing may silently cross a player decision, ending, or protected common-scene boundary.
 for(let i=index+1;i<target;i++)if(AREA_CHOICE_KINDS.has(scenes[i]?.kind)||scenes[i]?.kind==='ending')return;
 runSkippedSceneState(index,target);
 clearTimeout(timer);timer=null;clearConfessionQuestionTimers();stopVnTyping(false);
 stopGongyangBell();stopLeaderShout();stopGongyangApplause();stopPencil();stopPrayerClock();stopPrayerAudio();stopPrayerBell();stopArtAudio();stopConfessionTick();stopSanctuaryTick();stopEndingBell();
 if(storySfx){storySfx.pause();storySfx.currentTime=0;storySfx=null}
 if(storySfxTimer){clearTimeout(storySfxTimer);storySfxTimer=null}
 if(confessionDoorAudio){confessionDoorAudio.pause();confessionDoorAudio.currentTime=0;confessionDoorAudio=null}
 locked=false;currentPortrait='';portrait.hidden=true;illustration.hidden=true;
 index=target;save();render();
}
areaSkipButton.addEventListener('click',skipCurrentArea);

function findPrayerBranchStart(branch){
 return scenes.findIndex((scene,sceneIndex)=>sceneIndex>PRAYER_SCENE_START&&scene.prayerBranch===branch);
}
function hadMorningConfessionalVisit(){
 // A location click alone is not enough: the player must have finished a
 // conversation branch with Wonwoo before the evening scene.
 return day2Morning==='고해소' && confMorningBranch>0;
}
let v178BellAudio=null,v178BellGain=null,v178AudioTimers=[];
function stopV178Bell(){if(v178BellGain)clearInterval(v178BellGain);v178BellGain=null;if(v178BellAudio){v178BellAudio.pause();v178BellAudio=null}}
function startV178Bell(){stopV178Bell();v178BellAudio=playExtraAudio('gongyang-bell-01.wav',.07);const a=v178BellAudio;let count=0;v178BellGain=setInterval(()=>{if(v178BellAudio!==a){clearInterval(v178BellGain);v178BellGain=null;return}count++;a.volume=Math.min(.9,.07+count*.075);if(count>=11){clearInterval(v178BellGain);v178BellGain=null}},360)}
function v178Cue(cue){if(cue==='unlock')playExtraAudio('clean_room_sound01.wav',.4);if(cue==='knock'){
 // Use the already registered first-day knock effect so sound filename stays canonical.
 sound('knock');
 }if(cue==='bell'&&!v178BellAudio)startV178Bell()}
function v178Patrol(mode){
 if(!mode){duoLayer.classList.remove('v178-patrol','is-visible','is-active');return}
 if(mode==='in'){
  duoLayer.classList.add('v178-patrol');duoLeft.hidden=false;duoRight.hidden=false;
  duoLeft.dataset.portraitKey='seungcheol-body1-default';duoRight.dataset.portraitKey='jihoon-body1-default';
  duoLeft.dataset.officialShouldShow='1';duoRight.dataset.officialShouldShow='1';
  assignOfficialPortrait(duoLeft,'seungcheol-body1-default');assignOfficialPortrait(duoRight,'jihoon-body1-default');
  duoLayer.classList.add('is-active');duoLayer.classList.remove('is-visible');requestAnimationFrame(()=>requestAnimationFrame(()=>duoLayer.classList.add('is-visible')));
 }else if(mode==='out'){
  duoLayer.classList.remove('is-visible');const captured=index;setTimeout(()=>{if(index>=captured&&duoLayer.classList.contains('v178-patrol'))v178Patrol(null)},900)
 }
}
function jumpV178(which){const target=V178_TARGETS[which];if(target===undefined)return;const el=overlay.querySelector('.shindo-choices');if(el)el.style.display='none';locked=false;index=V178_OFFSET+target;save();render()}
function render(){clearTimeout(timer);clearConfessionQuestionTimers();stopVnTyping(false);const scene=scenes[index];portrait.classList.remove('v178-fadeout');if(!scene){finish();return}
 if(scene.v178){
  // No clock ticks are allowed during the subsequent living-quarters story.
  stopEveningTick();
  if(scene.kind==='v178-coop-choice'){areaSkipButton.hidden=true;stopV178Bell();v178Patrol(null);currentPortrait='';applySceneBackdrop(index,scene);showV178CoopChoice();return}
  if(scene.kind==='v178-ending'){areaSkipButton.hidden=true;showV178Dogodai();return}
  if(scene.kind==='v178-hold'){areaSkipButton.hidden=true;showV178Holding(scene.v178Hold);return}
  if(scene.kind==='v178-intertitle'||scene.kind==='v178-day3-title'){
   areaSkipButton.hidden=true;stopV178Bell();v178Patrol(null);storyBackdrop.style.opacity='0';applySceneBackdrop(index,scene);
   box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
   const center=overlay.querySelector('.vn-center')||(()=>{const e=document.createElement('div');e.className='vn-center';overlay.appendChild(e);return e})();
   center.textContent=scene.text;center.style.display='block';locked=true;if(scene.kind==='v178-day3-title')setTimeout(()=>{if(scenes[index]===scene)startV178Bell()},1750);timer=setTimeout(()=>{center.style.display='none';locked=false;next()},2300);return;
  }
  if(scene.v178Audio)v178Cue(scene.v178Audio);
  if(scene.patrolDuo==='in'||scene.patrolDuo==='out'){currentPortrait='';portrait.hidden=true;v178Patrol(scene.patrolDuo);}
  else if(scene.patrolDuo!=='hold'&&duoLayer.classList.contains('v178-patrol'))v178Patrol(null);
  if(scene.revealName){const n=scene.revealName;window.SHINDO_markCharacterMet?.(n);
   if(n==='정한'){jeonghanRevealed=true;localStorage.setItem('shindo_jeonghan_known_v156','1')}
   if(n==='순영'){soonyoungRevealed=true;localStorage.setItem('shindo_soonyoung_known_v105','1')}
   if(n==='석민'){seokminRevealed=true;localStorage.setItem('shindo_seokmin_known_v99','1')}
  }
  if(scene.maskUntilMet){const x=scene.maskUntilMet;scene.maskSpeaker=!(x==='석민'?seokminRevealed:x==='순영'?soonyoungRevealed:true)}
 }
 if(scene.eveningMorningConfessionalOnly&&!hadMorningConfessionalVisit()){
  index++;save();render();return;
 }
 // V175: no interim selection screen after a completed Day 2 morning branch.
 // This also resumes correctly when an older save is parked on a branch-end node.
 if(DAY2_MORNING_AUTO_EVENING_ENDS.has(scene.kind)){enterEveningDay2();return}
 // Keep the day in sync with real story progress, including refreshed sessions.
 try{localStorage.setItem('shindo_current_story_day_v109',String(index>=DAY2_START?2:1))}catch(_){}
 if(index===DAY2_START)localStorage.setItem(SKIP_REACHED,'1');
 updateAreaSkipButton();
 if(index===DAY2_START&&!localStorage.getItem('shindo_day2_start_affinity_snapshot_v169')){
  try{localStorage.setItem('shindo_day2_start_affinity_snapshot_v169',localStorage.getItem('shindo_affinity_v107')||'{"조슈아":100}')}catch(_){}
 }
const existingChoiceModal=overlay.querySelector('.shindo-choices');if(existingChoiceModal&&scene.kind!=='main-choice'&&scene.kind!=='main-end'&&scene.kind!=='living-choice'&&scene.kind!=='living-end'&&scene.kind!=='art-choice'&&scene.kind!=='art-end'&&scene.kind!=='prayer-choice'&&scene.kind!=='prayer-end'&&scene.kind!=='day2-morning-choice'&&scene.kind!=='day2-prayer-choice'&&scene.kind!=='choice')existingChoiceModal.style.display='none';
if(!scene.specialMinghao&&!scene.patrolDuo){duoLayer.classList.remove('is-active');overlay.classList.remove('is-recall');}
const fadingOutOfSquare=scene.kind==='day2-morning-choice'&&currentSceneBackdropKey==='bg-central-square.jpg';
applySceneBackdrop(index,scene);
 if(scene.eveningDay2){if(scene.eveningLocation==='dark'&&!scene.v178){eveningLivingEntered=false;startEveningTick()}else if(scene.eveningLocation==='living'&&!scene.v178)enterEveningLiving();else stopEveningTick()}else{stopEveningTick();stopEveningWalk();eveningLivingEntered=false;}
 if(scene.prayerRoom){overlay.classList.remove('confession-blackout')}else{stopPrayerClock();stopPrayerAudio();stopPrayerBell()}
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
 if(scene.livingBranch&&livingBranch&&scene.livingBranch!==livingBranch){index++;save();render();return}
 if(scene.mainBranch&&mainBranch&&scene.mainBranch!==mainBranch){index++;save();render();return}
 if(scene.confMorningBranch&&confMorningBranch&&scene.confMorningBranch!==confMorningBranch){index++;save();render();return}
 if(scene.eveningBranch&&eveningBranch&&scene.eveningBranch!==eveningBranch){index++;save();render();return}
 // V150: The Day 2 central-square scene has no Wonwoo appearance.
// Portraits from the confessional (or an old asynchronous preload) must not leak
// into the square; narration with no explicit portrait always clears the slot.
const squareSceneStart=scenes.findIndex(x=>x.square===true && String(x.text||'').includes('중앙광장으로 가볼까'));
const squareSceneEnd=scenes.findIndex((x,i)=>i>squareSceneStart && x.kind==='day2-morning-choice');
const inDay2Square=squareSceneStart>=0 && index>=squareSceneStart && (squareSceneEnd<0 || index<squareSceneEnd) && selectedBranch===1;
if(inDay2Square && !scene.portrait){
 currentPortrait='';
 portrait.dataset.officialRequest=String((Number(portrait.dataset.officialRequest)||0)+1);
 portrait.dataset.officialShouldShow='0';
 portrait.dataset.officialDisplayedKey='';
 portrait.dataset.portraitKey='';
 portrait.hidden=true;
 portrait.removeAttribute('src');
}
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
if(scene.kind==='day2-morning-choice'){
  if(fadingOutOfSquare){
   locked=true;
   timer=setTimeout(()=>{
    if(scenes[index]===scene && overlay.classList.contains('active'))showDay2Choice('morning');
   },1050);
  }else showDay2Choice('morning');
  return;
 }
 if(scene.kind==='main-choice'){showMainChoice();return}
 if(scene.kind==='main-end'){showMainEnd();return}
 if(scene.kind==='conf-morning-choice'){showConfMorningChoice();return}
 if(scene.kind==='conf-morning-shared-start'){index++;save();render();return}
 if(scene.kind==='conf-morning-end'){showConfMorningEnd();return}
 if(scene.kind==='evening-choice'){startEveningTick();showEveningChoice();return}
 if(scene.kind==='evening-end'){stopEveningTick();showEveningEnd();return}
 if(scene.kind==='seungkwan-choice'){showSeungkwanChoice();return}
 if(scene.kind==='gongyang-item-check'){showGongyangItemCheck();return}
 if(scene.kind==='gongyang-end'){showGongyangEnd();return}
 if(scene.kind==='living-choice'){showLivingChoice();return}
 if(scene.kind==='living-end'){showLivingEnd();return}
 if(scene.kind==='living-recall'){showLivingRecall(scene);return}
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
// V155: all central-square dialogue keeps the background visible; no mid-scene blackouts.
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
if(!(scene.sound==='forest'&&index===22)&&!(scene.soundOnlyWithoutMorningConfessional&&hadMorningConfessionalVisit()))sound(scene.sound);
if(scene.reveal)revealed=true;
if(scene.revealJihoon)jihoonRevealed=true;
 if(scene.revealHansol){hansolRevealed=true;localStorage.setItem('shindo_hansol_known_v99','1')}
 if(scene.revealSeokmin){seokminRevealed=true;localStorage.setItem('shindo_seokmin_known_v99','1')}
 if(scene.revealChan){chanRevealed=true;localStorage.setItem('shindo_chan_known_v99','1')}
 if(scene.revealSoonyoung){soonyoungRevealed=true;localStorage.setItem('shindo_soonyoung_known_v105','1')}
 if(scene.revealMinghao){minghaoRevealed=true;localStorage.setItem('shindo_minghao_known_v105','1')}
 if(scene.revealJeonghan){jeonghanRevealed=true;localStorage.setItem('shindo_jeonghan_known_v156','1');window.SHINDO_markCharacterMet?.('정한')}
 if(scene.revealMingyu){mingyuRevealed=true;localStorage.setItem('shindo_mingyu_known_v156','1');window.SHINDO_markCharacterMet?.('민규')}
 if(scene.revealJoshua){joshuaRevealed=true;localStorage.setItem('shindo_joshua_known_v160','1');window.SHINDO_markCharacterMet?.('조슈아')}
 if(scene.revealJunhui){junhuiRevealed=true;localStorage.setItem('shindo_junhui_known_v167','1');window.SHINDO_markCharacterMet?.('준휘')}
 if(scene.revealSeungkwan){seungkwanRevealed=true;localStorage.setItem('shindo_seungkwan_known_v177','1');window.SHINDO_markCharacterMet?.('승관')}
 // Character slots unlock only on an actual introduction/encounter.
 const metByReveal={reveal:'승철',revealJihoon:'지훈',revealHansol:'한솔',revealSeokmin:'석민',revealChan:'찬',revealSoonyoung:'순영',revealMinghao:'명호',revealSeungkwan:'승관'};
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
if(scene.kind==='dialogue'||(scene.kind==='narration'&&(scene.prayerRoom||scene.artHall||scene.livingHall||scene.mainHall||scene.confMorning||scene.gongyangHall||scene.eveningDay2)&&(scene.portrait||duoVisible))){
 if(scene.clearPortrait){currentPortrait='';portrait.hidden=true}
 if(duoVisible){currentPortrait='';portrait.dataset.officialRequest=String((Number(portrait.dataset.officialRequest)||0)+1);portrait.hidden=true;portrait.removeAttribute('src');} // V116: prevent lingering solo portrait behind two-person scene
 if(inDay2Square && !scene.portrait)currentPortrait='';
 if((scene.livingHall||scene.mainHall)&&!scene.portrait)currentPortrait='';
 if(scene.portrait)currentPortrait=scene.portrait;
 if(scene.portraitPlaceholder)currentPortrait='';
 speakerTag.textContent=scene.kind==='narration'||scene.inner?'':(scene.maskSpeaker||scene.speaker==='한솔'&&!hansolRevealed||scene.speaker==='석민'&&!seokminRevealed||scene.speaker==='찬'&&!chanRevealed?'??':scene.speaker==='순영'&&!soonyoungRevealed?'??':scene.speaker==='명호'&&!minghaoRevealed?'??':scene.speaker==='조슈아'&&!joshuaRevealed?'??':scene.speaker==='정한'&&!jeonghanRevealed?'??':scene.speaker==='민규'&&!mingyuRevealed?'??':scene.speaker==='준휘'&&!junhuiRevealed?'??':scene.speaker==='주인공'?'김봉봉':scene.speaker==='승철'&&!revealed?'??':scene.speaker==='지훈'&&!jihoonRevealed?'??':scene.speaker);
 content.classList.toggle('vn-inner',!!scene.inner);
 if(currentPortrait){
  const specialSolo=!!(scene.specialMinghao&&scene.portrait&&!duoVisible);
  applyPortraitProfile(currentPortrait);
  // Do not allow the silhouette to flash ahead of the corridor photo.
  // Reset the one-shot opacity on every later scene, including refreshes.
  portrait.style.transition=scene.livingJihoonEntrance?'opacity 1.05s ease':'';
  portrait.style.opacity=scene.livingJihoonEntrance?'0':'';
  portrait.classList.toggle('special-solo',specialSolo);
  portrait.dataset.portraitKey=(specialSolo?'solo-':'')+currentPortrait;
  portrait.dataset.officialShouldShow=scene.illustration||duoVisible?'0':'1';
  assignOfficialPortrait(portrait,portrait.dataset.portraitKey);
  portrait.classList.toggle('prayer-silhouette',!!scene.silhouette);
  portrait.classList.toggle('art-silhouette',!!(scene.artHall&&scene.silhouette));
  portrait.classList.toggle('living-silhouette',!!scene.livingSilhouette);
  portrait.classList.toggle('main-silhouette',!!scene.mainSilhouette);
  portrait.classList.toggle('evening-shadow',scene.eveningShade!=null);
  portrait.style.setProperty('--evening-portrait-brightness',String(1-(scene.eveningShade||0)));
 }else{portrait.style.opacity='';portrait.style.transition='';portrait.classList.remove('special-solo','evening-shadow');portrait.dataset.officialRequest=String((Number(portrait.dataset.officialRequest)||0)+1);portrait.hidden=true;portrait.removeAttribute('src')}
}else{
 if(scene.clearPortrait||scene.specialMinghao)currentPortrait='';
 speakerTag.textContent='';content.classList.remove('vn-inner');
 portrait.style.opacity='';portrait.style.transition='';
 portrait.hidden=true;portrait.classList.remove('evening-shadow');
}

 if(scene.kind==='transition'){box.style.display='none';let center=overlay.querySelector('.vn-center');if(!center){center=document.createElement('div');center.className='vn-center';overlay.appendChild(center)}center.textContent=scene.text;center.style.display='block';overlay.querySelector('.vn-hint').style.display='none';locked=true;timer=setTimeout(()=>{locked=false;next()},scene.text?2300:3300);return}
 const center=overlay.querySelector('.vn-center');if(center)center.style.display='none';box.style.display='flex';overlay.querySelector('.vn-hint').style.display='block';box.classList.remove('box-shake-soft');if(scene.boxShakeSoft){void box.offsetWidth;box.classList.add('box-shake-soft')}content.textContent=scene.maskWonwoo?scene.text.replace('원우','??'):scene.text;content.style.fontSize=scene.fontScale?String(scene.fontScale)+'em':(scene.largeText?'1.25em':'');content.style.fontWeight=scene.boldAll?'800':'';content.style.color=scene.redText?'#e02020':'';
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
 stopV178Bell();v178Patrol(null);stopEveningTick();eveningBranch=0;seungkwanTruthBranch=0;localStorage.removeItem('shindo_evening_branch_day2_v173');localStorage.removeItem('shindo_seungkwan_truth_branch_v177');localStorage.removeItem('shindo_police_coop_v178');
 flagReplay();
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
 box.classList.remove('box-shake-soft');
 const end=overlay.querySelector('.shindo-ending');if(end)end.remove();overlay.querySelectorAll('.shindo-evidence-overlay').forEach(x=>x.remove());
 endingTimers.forEach(clearTimeout);endingTimers=[];
 selectedBranch=0;day2Prayer=0;day2Morning='';livingBranch=0;mainBranch=0;confMorningBranch=0;seungkwanTruthBranch=0;joshuaRevealed=false;revealed=false;jihoonRevealed=false;soonyoungRevealed=false;minghaoRevealed=false;jeonghanRevealed=false;mingyuRevealed=false;seungkwanRevealed=false;
 currentPortrait='';portrait.hidden=true;illustration.hidden=true;confessionTickLouder=false;
 ['shindo_confession_branch','shindo_day2_prayer','shindo_day2_morning','shindo_prayer_branch_v99','shindo_soonyoung_known_v105','shindo_minghao_known_v105','shindo_evidence_items_v105','shindo_art_branch_v105','shindo_play_history_v107','shindo_affinity_v107','shindo_affinity_events_v111','shindo_affinity_unread_v125','shindo_current_story_day_v109','shindo_living_branch_v156','shindo_jihoon_bad_conditions_v156','shindo_jeonghan_known_v156','shindo_mingyu_known_v156','shindo_main_branch_v160','shindo_joshua_known_v160','shindo_junhui_known_v167','shindo_seungkwan_known_v177','shindo_seungkwan_truth_branch_v177','shindo_escape_package_v167','shindo_gongyang_test_active_v172','shindo_evening_branch_day2_v173','shindo_confession_morning_branch_v163','shindo_day2_start_affinity_snapshot_v169'].forEach(k=>localStorage.removeItem(k));
 const day1Start=scenes.findIndex(s=>s.kind==='transition'&&s.text==='1일차 아침');
 index=day1Start>=0?day1Start:0;
 storyUnderlay.classList.add('visible');storyBackdrop.classList.add('visible');overlay.classList.add('active');refreshInventoryVisibility();
 locked=false;save();render();
}
window.SHINDO_restartFromDay1=restartFromDay1;

// V169: Test restart at the black "2일차" title, keeping the authenticated mail/browser.
function restartFromDay2(){
 stopV178Bell();v178Patrol(null);stopEveningTick();eveningBranch=0;localStorage.removeItem('shindo_evening_branch_day2_v173');
 flagReplay();
 const day2Start=scenes.findIndex(s=>s.kind==='sleep-transition'&&s.day===2);
 if(day2Start<0){console.error('2일차 시작 지점을 찾지 못했습니다.');return}
 duoLayer.classList.remove('is-active');overlay.classList.remove('is-recall');
 clearTimeout(timer);timer=null;clearConfessionQuestionTimers();stopVnTyping(false);
 stopGongyangBell();stopLeaderShout();stopGongyangApplause();stopPencil();
 stopConfessionTick();stopEndingBell();stopSanctuaryTick();stopPrayerClock();stopPrayerAudio();stopPrayerBell();stopArtAudio();
 if(confessionTickStartTimer){clearTimeout(confessionTickStartTimer);confessionTickStartTimer=null}
 if(confessionDoorAudio){confessionDoorAudio.pause();confessionDoorAudio.currentTime=0;confessionDoorAudio=null}
 if(storySfxTimer){clearTimeout(storySfxTimer);storySfxTimer=null}
 if(storySfx){storySfx.pause();storySfx.currentTime=0;storySfx=null}
 const choices=overlay.querySelector('.shindo-choices');if(choices)choices.style.display='none';
 overlay.querySelector('.shindo-ending')?.remove();overlay.querySelectorAll('.shindo-evidence-overlay').forEach(el=>el.remove());
 endingTimers.forEach(clearTimeout);endingTimers=[];
 overlay.classList.remove('sanctuary','sanctuary-leaving','day','confession-blackout','confession-fade','day2-shake','sleep-fadeout','sleep-fadein');
 box.classList.remove('box-shake-soft');
 // Preserve the successful Day 1 confession path, because Day 2 is reached through it.
 selectedBranch=1;localStorage.setItem('shindo_confession_branch','1');
 day2Prayer=0;day2Morning='';prayerBranch=0;artBranch=0;livingBranch=0;mainBranch=0;confMorningBranch=0;
 artLocation='main';artImage='';
 // Day 2 choices must be grantable again: keep Day 1 events, discard Day 2+.
 const affinityKey='shindo_affinity_v107',eventKey='shindo_affinity_events_v111';
 const snapshotKey='shindo_day2_start_affinity_snapshot_v169';
 try{
  const snapshot=JSON.parse(localStorage.getItem(snapshotKey)||'null');
  // Existing saves predate snapshots. Day 1 has no afternoon affinity grants;
  // restore Day 1 base affinity if a snapshot was never captured.
  const baseline=snapshot&&typeof snapshot==='object'&&!Array.isArray(snapshot)?snapshot:{'조슈아':100};
  localStorage.setItem(affinityKey,JSON.stringify(baseline));
  const events=JSON.parse(localStorage.getItem(eventKey)||'[]');
  if(Array.isArray(events))localStorage.setItem(eventKey,JSON.stringify(events.filter(id=>typeof id==='string'&&Number(id.split('|')[0])<2)));
  const history=JSON.parse(localStorage.getItem('shindo_play_history_v107')||'[]');
  if(Array.isArray(history))localStorage.setItem('shindo_play_history_v107',JSON.stringify(history.filter(item=>{
   const day=Number(item?.day);return Number.isFinite(day)&&day<2;
  })));
 }catch(err){console.warn('2일차 저장 데이터 정리 중 오류',err)}
 // Evidence and character discoveries authored on Day 2 reset; Day 1 encounters stay unlocked.
 const resetKeys=[
  'shindo_day2_prayer','shindo_day2_morning','shindo_prayer_branch_v99','shindo_art_branch_v105',
  'shindo_living_branch_v156','shindo_main_branch_v160','shindo_confession_morning_branch_v163',
  'shindo_jihoon_bad_conditions_v156','shindo_evidence_items_v105',
  'shindo_jeonghan_known_v156','shindo_mingyu_known_v156','shindo_joshua_known_v160',
  'shindo_junhui_known_v167','shindo_seungkwan_known_v177','shindo_soonyoung_known_v105','shindo_minghao_known_v105',
  'shindo_hansol_known_v99','shindo_seokmin_known_v99','shindo_chan_known_v99',
  'shindo_escape_package_v167','shindo_gongyang_test_active_v172','shindo_seungkwan_truth_branch_v177','shindo_police_coop_v178','shindo_affinity_unread_v125'
 ];
 resetKeys.forEach(key=>localStorage.removeItem(key));
 try{const names=JSON.parse(localStorage.getItem('shindo_met_characters_v108')||'[]');
  if(Array.isArray(names))localStorage.setItem('shindo_met_characters_v108',JSON.stringify(names.filter(name=>['승철','지훈','원우'].includes(name))));
 }catch(_){}
 hansolRevealed=false;seokminRevealed=false;chanRevealed=false;soonyoungRevealed=false;minghaoRevealed=false;
 jeonghanRevealed=false;mingyuRevealed=false;joshuaRevealed=false;junhuiRevealed=false;seungkwanRevealed=false;seungkwanTruthBranch=0;
 currentPortrait='';portrait.hidden=true;illustration.hidden=true;confessionTickLouder=false;
 index=day2Start;
 localStorage.setItem('shindo_current_story_day_v109','2');
 storyUnderlay.classList.add('visible');storyBackdrop.classList.add('visible');overlay.classList.add('active');refreshInventoryVisibility();
 locked=false;save();document.dispatchEvent(new Event('shindo-inventory-change'));render();
}
window.SHINDO_restartFromDay2=restartFromDay2;
function getMorningAffinityDay(){
 const stored=Math.floor(Number(localStorage.getItem('shindo_current_story_day_v109'))||2);
 return Math.max(2,Math.min(13,stored));
}
function showDay2Choice(type){locked=true;box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 const prayer=type==='prayer';const options=prayer?['새벽기도에 참석한다','새벽기도에 참석하지 않는다']:['기도관','예술당','생활관','본당','고해소','공양실'];
 el.classList.toggle('shindo-morning-grid',!prayer);
 el.innerHTML='<h2>'+(prayer?'새벽기도에 참석할까?':'오전 활동이다. 어디로 가볼까?')+'</h2>'+(prayer?options.map((t,i)=>'<button data-choice="'+(i+1)+'">'+t+'</button>').join(''):'<div class="shindo-morning-options">'+options.map((t,i)=>'<button data-choice="'+(i+1)+'">'+t+'</button>').join('')+'</div><button type="button" class="shindo-gongyang-package-test">[테스트] 탈출패키지 획득 후 공양실</button><button type="button" class="shindo-day1-restart">↺ 1일차부터 다시 시작 (임시)</button>');el.style.display='flex';
 if(!prayer){
  el.querySelector('.shindo-day1-restart').onclick=e=>{e.stopPropagation();restartFromDay1()};
  el.querySelector('.shindo-gongyang-package-test').onclick=e=>{
   e.stopPropagation();
   // Test-only state: the actual item-acquisition chapter will set this key in future.
   localStorage.setItem('shindo_gongyang_test_active_v172','1');
   // Use the same location-selection handler so ordinary room/person affinity rules are retained.
   const target=el.querySelector('[data-choice="6"]');
   if(target){target.dataset.fromPackageTest='1';target.click();delete target.dataset.fromPackageTest;}
  };
 }
 el.querySelectorAll('[data-choice]').forEach(b=>b.onclick=e=>{e.stopPropagation();
  // Only the dedicated package-test button may retain the test override.
  // Clear V168's old persistent test flag even on pre-V172 saves.
  if(!prayer){
   if(b.dataset.fromPackageTest!=='1'){
    localStorage.removeItem('shindo_gongyang_test_active_v172');
   }
   localStorage.removeItem('shindo_escape_package_v167');
  }
  if(prayer){day2Prayer=Number(b.dataset.choice);window.SHINDO_addPlayRecord?.('선택','새벽기도: '+options[day2Prayer-1]);localStorage.setItem('shindo_day2_prayer',String(day2Prayer));window.SHINDO_applyAffinityEvent?.('prayer',day2Prayer===1?'참석':'불참',2);el.style.display='none';locked=false;next()}else{day2Morning=options[Number(b.dataset.choice)-1];window.SHINDO_addPlayRecord?.('선택','오전 활동 장소: '+day2Morning);localStorage.setItem('shindo_day2_morning',day2Morning);window.SHINDO_applyAffinityEvent?.('room',day2Morning,getMorningAffinityDay());
 if(day2Morning==='예술당'){
  artBranch=0;artLocation='main';artImage='';stopArtAudio();el.style.display='none';currentPortrait='';portrait.hidden=true;index=ART_SCENE_START;save();locked=true;enterMorningBuilding('bg-art-hall-exterior.jpg',()=>{locked=false;render()});
 }else if(day2Morning==='기도관'){
  prayerBranch=0;localStorage.removeItem('shindo_prayer_branch_v99');el.style.display='none';currentPortrait='';portrait.hidden=true;index=PRAYER_SCENE_START;save();locked=true;enterMorningBuilding('bg-prayer-hall-exterior.jpg',()=>{locked=false;render()});
 }else if(day2Morning==='본당'){
  mainBranch=0;localStorage.removeItem('shindo_main_branch_v160');
  el.style.display='none';currentPortrait='';portrait.hidden=true;
  index=MAIN_SCENE_START;save();locked=false;render();
 }else if(day2Morning==='생활관'){
  livingBranch=0;localStorage.removeItem('shindo_living_branch_v156');localStorage.removeItem('shindo_main_branch_v160');
  el.style.display='none';currentPortrait='';portrait.hidden=true;
  index=LIVING_SCENE_START;save();locked=false;render();
 }else if(day2Morning==='고해소'){
  confMorningBranch=0;localStorage.removeItem('shindo_confession_morning_branch_v163');
  el.style.display='none';currentPortrait='';portrait.hidden=true;illustration.hidden=true;
  index=CONFESSIONAL_MORNING_START;save();locked=false;render();
 }else if(day2Morning==='공양실'){
  window.SHINDO_addPlayRecord?.('선택','공양실 활동: 준휘와 대화');
  window.SHINDO_applyAffinityEvent?.('person','공양실 활동: 준휘와 대화',getMorningAffinityDay());
  el.style.display='none';currentPortrait='';portrait.hidden=true;illustration.hidden=true;
  index=GONGYANG_SCENE_START;save();locked=false;render();
 }else{
  el.innerHTML='<h2>'+day2Morning+'</h2><p>이후 이야기는 다음 업데이트에서 이어집니다.</p><button type="button" class="shindo-morning-return">오전 활동 선택지 돌아가기</button><button type="button" class="shindo-day1-restart">↺ 1일차부터 다시 시작 (임시)</button>';el.querySelector('.shindo-morning-return').onclick=e=>{e.stopPropagation();returnToMorningActivities()};el.querySelector('.shindo-day1-restart').onclick=e=>{e.stopPropagation();restartFromDay1()};locked=true;
 }}})
}
function showMainChoice(){
 locked=true;box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid','shindo-prayer-grid','shindo-art-grid');
 el.innerHTML='<h2>어디부터 살펴볼까?</h2><div class="shindo-morning-options"><button type="button" data-main="1">사무실</button><button type="button" data-main="2">도서실</button></div>';
 el.style.display='flex';
 el.querySelectorAll('[data-main]').forEach(b=>b.onclick=e=>{
  e.stopPropagation();mainBranch=Number(b.dataset.main);localStorage.setItem('shindo_main_branch_v160',String(mainBranch));
  window.SHINDO_addPlayRecord?.('선택','본당 탐색: '+(mainBranch===1?'사무실':'도서실'));
  if(mainBranch===1)window.SHINDO_applyAffinityEvent?.('person','본당 탐색: 사무실',getMorningAffinityDay());
  const target=scenes.findIndex((x,i)=>i>MAIN_SCENE_START&&x.mainBranch===mainBranch);
  el.style.display='none';currentPortrait='';portrait.hidden=true;illustration.hidden=true;
  if(target>=0){index=target;save();locked=false;render()}
 });
}
function enterEveningDay2(){
 stopEveningTick();stopEveningWalk();eveningLivingEntered=false;stopVnTyping(false);clearTimeout(timer);timer=null;
 // Stop lingering morning-only cues and visual layers when changing locations.
 stopPrayerClock();stopPrayerAudio();stopPrayerBell();stopArtAudio();stopPencil();
 duoLayer.classList.remove('is-active');overlay.classList.remove('is-recall','art-blackout');
 eveningBranch=0;localStorage.removeItem('shindo_evening_branch_day2_v173');
 const menu=overlay.querySelector('.shindo-choices');if(menu)menu.style.display='none';
 currentPortrait='';portrait.hidden=true;portrait.classList.remove('evening-shadow');illustration.hidden=true;
 index=EVENING_DAY2_START;locked=false;save();render();
}
function showEveningChoice(){
 locked=true;box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid','shindo-prayer-grid','shindo-art-grid');
 const choices=['정보를 수집해보자','일단 함구하자'];
 el.innerHTML='<h2>어떻게 반응할까?</h2><div class="shindo-morning-options">'+choices.map((s,i)=>'<button type="button" data-evening="'+(i+1)+'">'+s+'</button>').join('')+'</div>';
 el.style.display='flex';
 el.querySelectorAll('[data-evening]').forEach(b=>b.onclick=e=>{e.stopPropagation();eveningBranch=Number(b.dataset.evening);localStorage.setItem('shindo_evening_branch_day2_v173',String(eveningBranch));window.SHINDO_addPlayRecord?.('선택','2일차 저녁 고해소: '+choices[eveningBranch-1]);
 const target=scenes.findIndex((x,i)=>i>EVENING_DAY2_START&&x.eveningBranch===eveningBranch);if(target<0)return;
 el.style.display='none';locked=false;index=target;save();render()});
}
function showEveningEnd(){
 locked=true;box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid','shindo-prayer-grid','shindo-art-grid');
 el.innerHTML='<h2>2일차 저녁 고해소를 마쳤다.</h2><p>이후 이야기는 다음 업데이트에서 이어집니다.</p><button type="button" class="shindo-morning-return">오전 활동 선택지 돌아가기 (테스트)</button>';
 el.style.display='flex';el.querySelector('.shindo-morning-return').onclick=e=>{e.stopPropagation();stopEveningTick();returnToMorningActivities()};
}

function showSeungkwanChoice(){
 locked=true;box.style.display='none';overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid','shindo-prayer-grid','shindo-art-grid');
 if(seungkwanTruthBranch){jumpV178(seungkwanTruthBranch===1?'tell':'deny');return}
 const options=['말한다','말하지 않는다'];
 el.innerHTML='<h2>승관에게 진실을 말할까?</h2><div class="shindo-morning-options">'+options.map((t,i)=>'<button type="button" data-seungkwan="'+(i+1)+'">'+t+'</button>').join('')+'</div>';
 el.style.display='flex';
 el.querySelectorAll('[data-seungkwan]').forEach(btn=>btn.onclick=e=>{e.stopPropagation();seungkwanTruthBranch=Number(btn.dataset.seungkwan)||0;localStorage.setItem('shindo_seungkwan_truth_branch_v177',String(seungkwanTruthBranch));window.SHINDO_addPlayRecord?.('선택','2일차 저녁 승관: '+options[seungkwanTruthBranch-1]);jumpV178(seungkwanTruthBranch===1?'tell':'deny');});
}
function showSeungkwanEnd(){
 locked=true;box.style.display='none';overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid','shindo-prayer-grid','shindo-art-grid');
 const picked=seungkwanTruthBranch===1?'말한다':seungkwanTruthBranch===2?'말하지 않는다':'미선택';
 el.innerHTML='<h2>승관과의 저녁 대화는 여기까지 구현되었습니다.</h2><p>현재 선택: '+picked+'</p><p>이후 이야기는 다음 업데이트에서 이어집니다.</p><button type="button" class="shindo-morning-return">오전 활동 선택지 돌아가기 (테스트)</button>';
 el.style.display='flex';
 el.querySelector('.shindo-morning-return').onclick=e=>{e.stopPropagation();returnToMorningActivities()};
}

function showV178CoopChoice(){
 locked=true;box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid','shindo-prayer-grid','shindo-art-grid');
 const options=['협력 승낙','협력 거절'];
 el.innerHTML='<h2>어떻게 할까?</h2><div class="shindo-morning-options">'+options.map((t,i)=>'<button type="button" data-v178-coop="'+(i+1)+'">'+t+'</button>').join('')+'</div>';
 el.style.display='flex';
 el.querySelectorAll('[data-v178-coop]').forEach(button=>button.onclick=e=>{e.stopPropagation();const value=Number(button.dataset.v178Coop);localStorage.setItem('shindo_police_coop_v178',String(value));window.SHINDO_addPlayRecord?.('선택','2일차 비공식 협력: '+options[value-1]);jumpV178(value===1?'accept':'refuse')});
}
function showV178Holding(type){
 stopV178Bell();v178Patrol(null);locked=true;box.style.display='none';portrait.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid','shindo-prayer-grid','shindo-art-grid');
 el.innerHTML='<h2>2일차 저녁 스토리</h2><p>'+(type==='deny'?'승관에게 진실을 말하지 않은 이후의 이야기는 다음 업데이트에서 이어집니다.':'협력 승낙 이후의 이야기는 다음 업데이트에서 이어집니다.')+'</p><button type="button" class="shindo-morning-return">오전 활동 선택지 돌아가기 (테스트)</button>';
 el.style.display='flex';el.querySelector('.shindo-morning-return').onclick=e=>{e.stopPropagation();stopV178Bell();returnToMorningActivities()};
}
function showV178Dogodai(){
 areaSkipButton.hidden=true;stopV178Bell();stopEveningTick();stopEveningWalk();v178Patrol(null);clearTimeout(timer);stopVnTyping(false);
 box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
 applySceneBackdrop(index,scenes[index]);locked=true;
 const end=document.createElement('div');end.className='shindo-ending v178-dogodai';
 end.innerHTML='<div class="shindo-ending-copy"><h1 class="v178-dogodai-title">독고다이</h1><p>내민 손을 제때 잡는 것도 능력이다.</p></div>';
 overlay.appendChild(end);
 endingTimers.push(setTimeout(()=>{end.innerHTML='<div class="shindo-ending-logo">신도<span>神道</span></div>'},2000));
 endingTimers.push(setTimeout(()=>{const b=document.createElement('button');b.className='shindo-restart';b.textContent='1일차부터 다시 시작';b.onclick=e=>{e.stopPropagation();end.remove();restartFromDay1()};end.appendChild(b)},4000));
}
function showMainEnd(){
 locked=true;box.style.display='none';currentPortrait='';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid','shindo-prayer-grid','shindo-art-grid');
 el.innerHTML='<h2>본당 탐색을 마쳤다.</h2><button type="button" class="shindo-morning-return">오전 활동 선택지 돌아가기</button>';
 el.style.display='flex';el.querySelector('.shindo-morning-return').onclick=e=>{e.stopPropagation();returnToMorningActivities()};

}
function showConfMorningChoice(){
 locked=true;box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid','shindo-prayer-grid','shindo-art-grid');
 const options=['임재범의 「고해」를 부른다.','미쳤냐? 가만히 있는다.'];
 el.innerHTML='<h2>이걸 어떡한담.</h2><div class="shindo-morning-options">'+options.map((t,i)=>'<button type="button" data-conf-morning="'+(i+1)+'">'+t+'</button>').join('')+'</div>';
 el.style.display='flex';
 el.querySelectorAll('[data-conf-morning]').forEach(b=>b.onclick=e=>{
  e.stopPropagation();
  confMorningBranch=Number(b.dataset.confMorning);
  localStorage.setItem('shindo_confession_morning_branch_v163',String(confMorningBranch));
  window.SHINDO_addPlayRecord?.('선택','고해소 대응: '+options[confMorningBranch-1]);
  window.SHINDO_applyAffinityEvent?.('person','고해소 대응: '+options[confMorningBranch-1],getMorningAffinityDay());
  const target=confMorningBranch===1 ? scenes.findIndex((x,i)=>i>CONFESSIONAL_MORNING_START&&x.confMorningBranch===1) : scenes.findIndex((x,i)=>i>CONFESSIONAL_MORNING_START&&x.kind==='conf-morning-shared-start');
  el.style.display='none';currentPortrait='';portrait.hidden=true;illustration.hidden=true;
  if(target>=0){index=target;save();locked=false;render()}
 });
}
function showConfMorningEnd(){
 locked=true;box.style.display='none';currentPortrait='';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid','shindo-prayer-grid','shindo-art-grid');
 el.innerHTML='<h2>고해소에서의 대화를 마쳤다.</h2><button type="button" class="shindo-morning-return">오전 활동 선택지 돌아가기</button>';
 el.style.display='flex';
 el.querySelector('.shindo-morning-return').onclick=e=>{e.stopPropagation();returnToMorningActivities()};

}

function hasEscapePackage(){
 // Test mode is scoped to an explicit test launch and is cleared by any ordinary location choice.
 if(day2Morning==='공양실'&&localStorage.getItem('shindo_gongyang_test_active_v172')==='1')return true;
 // Genuine ownership must come from an acquisition/inventory source, never a narrative play log.
 for(const key of ['shindo_escape_package_owned','shindo_has_escape_package']){
  const value=localStorage.getItem(key);
  if(value==='1'||value==='true')return true;
 }
 const match=value=>{
  if(value==null)return false;
  if(typeof value==='string')return ['escape-package','탈출패키지','탈출 패키지','escape_package','escapePackage'].includes(value);
  if(Array.isArray(value))return value.some(match);
  if(typeof value==='object')return match(value.id)||match(value.key)||match(value.slug)||match(value.name);
  return false;
 };
 for(const key of ['shindo_inventory_items_v167','shindo_items_v1','shindo_item_items_v1','shindo_evidence_items_v105']){
  try{if(match(JSON.parse(localStorage.getItem(key)||'null')))return true}catch(_){}
 }
 return false;
}
function showGongyangItemCheck(){
 const hasItem=hasEscapePackage();
 const target=scenes.findIndex((x,i)=>i>GONGYANG_SCENE_START&&x.gongyangItemBranch===(hasItem?1:2));
 if(target>=0){index=target;save();locked=false;render();return}
 locked=false;next();
}
function showGongyangEnd(){
 locked=true;box.style.display='none';currentPortrait='';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid','shindo-prayer-grid','shindo-art-grid');
 el.innerHTML='<h2>공양실 인근을 둘러봤다.</h2><button type="button" class="shindo-morning-return">오전 활동 선택지 돌아가기</button>';
 el.style.display='flex';
 el.querySelector('.shindo-morning-return').onclick=e=>{e.stopPropagation();returnToMorningActivities()};

}

function showLivingChoice(){
 locked=true;box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid','shindo-prayer-grid','shindo-art-grid');
 const options=['방에서 자료 정리','??의 방에서 대화','말 걸기','빨래 수거'];
 el.innerHTML='<h2>뭐부터 해볼까?</h2><div class="shindo-morning-options">'+options.map((t,i)=>'<button data-living="'+(i+1)+'">'+t+'</button>').join('')+'</div>';
 el.style.display='flex';
 el.querySelectorAll('[data-living]').forEach(b=>b.onclick=e=>{
  e.stopPropagation();livingBranch=Number(b.dataset.living);
  localStorage.setItem('shindo_living_branch_v156',String(livingBranch));
  window.SHINDO_addPlayRecord?.('선택','생활관 활동: '+options[livingBranch-1]);
  if(livingBranch!==1)window.SHINDO_applyAffinityEvent?.('person','생활관 활동: '+options[livingBranch-1],getMorningAffinityDay());
  if(livingBranch===1){
   // Persistent, hidden story flag. The actual Jihoon bad-ending route will be
   // resolved by the later ending chapter; do not reveal it in the UI.
   const count=Number(localStorage.getItem('shindo_jihoon_bad_conditions_v156')||0);
   localStorage.setItem('shindo_jihoon_bad_conditions_v156',String(Math.min(3,count+1)));
  }
  const target=scenes.findIndex((x,i)=>i>LIVING_SCENE_START&&x.livingBranch===livingBranch);
  el.style.display='none';currentPortrait='';portrait.hidden=true;
  if(target>=0){index=target;locked=false;save();render()}
 });
}
function showLivingRecall(scene){
 // Locked, unskippable flashback to the Day 1 scene with Seungcheol.
 locked=true;
 overlay.classList.add('is-recall');
 box.style.display='flex';illustration.hidden=true;
 speakerTag.textContent='승철 · 회상';
 content.classList.remove('vn-inner');content.textContent='“'+scene.text+'”';
 content.style.fontSize='';content.style.fontWeight='';content.style.color='#b9b9b9';
 portrait.classList.remove('living-silhouette','prayer-silhouette','art-silhouette');
 portrait.dataset.portraitKey='seungcheol-body1-default';
 portrait.dataset.officialShouldShow='1';
 applyPortraitProfile('seungcheol-body1-default');
 assignOfficialPortrait(portrait,'seungcheol-body1-default');
 overlay.querySelector('.vn-hint').style.display='none';
 timer=setTimeout(()=>{
  overlay.classList.remove('is-recall');
  currentPortrait='';portrait.hidden=true;
  locked=false;next();
 },3200);
}

function showLivingEnd(){
 locked=true;box.style.display='none';portrait.hidden=true;currentPortrait='';illustration.hidden=true;
 overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid','shindo-prayer-grid','shindo-art-grid');
 el.innerHTML='<h2>생활관 활동을 마쳤다.</h2><button type="button" class="shindo-morning-return">오전 활동 선택지 돌아가기</button><button type="button" class="shindo-day1-restart">↺ 1일차부터 다시 시작 (임시)</button>';
 el.style.display='flex';
 el.querySelector('.shindo-morning-return').onclick=e=>{e.stopPropagation();returnToMorningActivities()};
 el.querySelector('.shindo-day1-restart').onclick=e=>{e.stopPropagation();restartFromDay1()};

}
function showPrayerChoice(){
 locked=true;box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';
 let el=overlay.querySelector('.shindo-choices');if(!el){el=document.createElement('div');el.className='shindo-choices';overlay.appendChild(el)}
 el.classList.remove('shindo-morning-grid');el.classList.add('shindo-prayer-grid');
 const options=['단상 위 청소','자는 사람 깨우기','성경 한 장 넘기기','청소 돕기'];
 el.innerHTML='<h2>뭐부터 거들어 볼까?</h2><div class="shindo-morning-options">'+options.map((t,i)=>'<button data-prayer="'+(i+1)+'">'+t+'</button>').join('')+'</div>';
 el.style.display='flex';el.querySelectorAll('[data-prayer]').forEach(b=>b.onclick=e=>{e.stopPropagation();stopPrayerClock();stopPrayerAudio();stopPrayerBell();stopVnTyping(false);prayerBranch=Number(b.dataset.prayer);window.SHINDO_addPlayRecord?.('선택','기도관 활동: '+options[prayerBranch-1]);localStorage.setItem('shindo_prayer_branch_v99',String(prayerBranch));window.SHINDO_applyAffinityEvent?.('person','기도관 활동: '+options[prayerBranch-1],getMorningAffinityDay());const branchStart=findPrayerBranchStart(prayerBranch);el.style.display='none';el.classList.remove('shindo-prayer-grid');currentPortrait='';portrait.hidden=true;illustration.hidden=true;if(branchStart!==-1){index=branchStart;locked=false;save();render();return}locked=false;next()});
}

function returnToMorningActivities(){
 stopEveningTick();eveningBranch=0;localStorage.removeItem('shindo_evening_branch_day2_v173');
 duoLayer.classList.remove('is-active');overlay.classList.remove('is-recall');
 clearTimeout(timer);timer=null;stopVnTyping(false);stopPrayerClock();stopPrayerAudio();stopPrayerBell();stopArtAudio();stopGongyangBell();stopLeaderShout();stopGongyangApplause();
 currentPortrait='';portrait.hidden=true;illustration.hidden=true;portrait.classList.remove('prayer-silhouette','art-silhouette','living-silhouette');
 prayerBranch=0;artBranch=0;livingBranch=0;mainBranch=0;artLocation='main';artImage='';
 localStorage.removeItem('shindo_prayer_branch_v99');localStorage.removeItem('shindo_art_branch_v105');localStorage.removeItem('shindo_living_branch_v156');
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
  localStorage.setItem('shindo_art_branch_v105',String(artBranch));window.SHINDO_applyAffinityEvent?.('person','예술당 활동: '+options[artBranch-1],getMorningAffinityDay());
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
function showEnding(){stopEveningTick();stopVnTyping(false);stopGongyangBell();stopLeaderShout();stopGongyangApplause();stopConfessionTick();stopEndingBell();stopSanctuaryTick();box.style.display='none';portrait.hidden=true;illustration.hidden=true;overlay.querySelector('.vn-hint').style.display='none';overlay.classList.add('confession-blackout');locked=true;const end=document.createElement('div');end.className='shindo-ending';end.innerHTML='<div class="shindo-ending-copy"><img class="shindo-ending-title-image" src="story-illustrations/ending-doksil-title.png" alt="독실"><p>신실한 종교인의 역할은 종교와 체계에 대한 반발을 보이는 존재를 싹부터 없애는 것입니다.</p></div>';overlay.appendChild(end);const later=(fn,ms)=>endingTimers.push(setTimeout(fn,ms));later(()=>{end.innerHTML='<div class="shindo-ending-logo">신도</div>'},3000);later(()=>{end.innerHTML='<div class="shindo-ending-logo">신도<span>神道</span></div>'},5000);later(()=>{const b=document.createElement('button');b.className='shindo-restart';b.textContent='처음부터 다시 하기';b.onclick=e=>{e.stopPropagation();stopEndingBell();stopConfessionTick();localStorage.removeItem('shindo_confession_branch');localStorage.removeItem('shindo_day2_prayer');localStorage.removeItem('shindo_day2_morning');localStorage.removeItem('shindo_affinity_v107');localStorage.removeItem('shindo_affinity_events_v111');localStorage.removeItem('shindo_affinity_unread_v125');localStorage.removeItem(KEY);localStorage.removeItem('shindo_story_started_v37');localStorage.removeItem('shindo_sleep_gate_v48');localStorage.removeItem('shindo_story_v55_extended');localStorage.removeItem('shindo_story_v66_sanctuary');['svter_first_launch_at_v1','svter_lock_reached_v1','svter_lock_deleted_notices_v33','kamille_new_mail_received_v32','kamille_new_mail_read_v32','kamille_newmail_popup_ack_v51','shindo_church_link_unlocked_v30','shindo_attachment_unlocked_v31'].forEach(k=>localStorage.removeItem(k));sessionStorage.removeItem('shindo_story_started_v37');location.reload()};end.appendChild(b)},7000)}
function finish(){
 stopEveningTick();areaSkipButton.hidden=true;stopVnTyping(false);stopGongyangBell();stopLeaderShout();stopGongyangApplause();stopPencil();stopConfessionTick();stopEndingBell();stopSanctuaryTick();if(confessionDoorAudio){confessionDoorAudio.pause();confessionDoorAudio.currentTime=0;confessionDoorAudio=null}if(storySfxTimer){clearTimeout(storySfxTimer);storySfxTimer=null}if(storySfx){storySfx.pause();storySfx.currentTime=0;storySfx=null}storyBackdrop.classList.remove('visible');storyUnderlay.classList.remove('visible');overlay.classList.remove("active","sanctuary","sanctuary-leaving","day");storyBackdrop.style.filter='';storyUnderlay.style.filter='';
 // Only finish after the player explicitly advances past the final dialogue.
 try{localStorage.setItem(KEY,'complete');localStorage.setItem('shindo_story_started_v37','1');localStorage.setItem('shindo_sleep_gate_v48','0')}catch(e){}
 window.SHINDO_openFeedback?.();
}
function next(userAdvance=false){
 if(locked)return;
 if(vnTypingTimer!==null){stopVnTyping(true);return;}
 if(scenes[index]?.portraitFadeOutAfter&&!portrait.hidden&&!portrait.classList.contains('v178-fadeout')){
  portrait.classList.add('v178-fadeout');locked=true;timer=setTimeout(()=>{portrait.classList.remove('v178-fadeout');locked=false;if(index<scenes.length-1){index++;save();render()}else finish()},560);return;
 }

 if(index>=scenes.length-1){finish();return;}
 index++;save();render();
}
overlay.addEventListener('click',()=>{audioContext();next(true)});document.addEventListener('keydown',e=>{if(!overlay.classList.contains('active'))return;if(phoneDrawer.classList.contains('is-open'))return;/* Never hijack typing in feedback, including spaces and line breaks. */if(document.getElementById('shindo-feedback')?.classList.contains('sf-open'))return;if(e.target.closest('textarea,input,select,[contenteditable="true"],[role="textbox"]'))return;if(e.key===' '||e.key==='Enter'){e.preventDefault();audioContext();next(true)}});
window.SHINDO_startStory=()=>{
 stopV178Bell();v178Patrol(null);stopEveningTick();eveningBranch=Number(localStorage.getItem('shindo_evening_branch_day2_v173')||0);
 clearConfessionQuestionTimers();stopGongyangBell();stopGongyangApplause();stopPencil();stopConfessionTick();stopEndingBell();stopSanctuaryTick();if(confessionDoorAudio){confessionDoorAudio.pause();confessionDoorAudio.currentTime=0;confessionDoorAudio=null}if(storySfxTimer){clearTimeout(storySfxTimer);storySfxTimer=null}if(storySfx){storySfx.pause();storySfx.currentTime=0;storySfx=null}confessionTickLouder=false;day2Prayer=Number(localStorage.getItem("shindo_day2_prayer")||0);day2Morning=localStorage.getItem("shindo_day2_morning")||"";livingBranch=Number(localStorage.getItem('shindo_living_branch_v156')||0);mainBranch=Number(localStorage.getItem('shindo_main_branch_v160')||0);confMorningBranch=Number(localStorage.getItem('shindo_confession_morning_branch_v163')||0);joshuaRevealed=localStorage.getItem('shindo_joshua_known_v160')==='1';jeonghanRevealed=localStorage.getItem('shindo_jeonghan_known_v156')==='1';mingyuRevealed=localStorage.getItem('shindo_mingyu_known_v156')==='1';junhuiRevealed=localStorage.getItem('shindo_junhui_known_v167')==='1';prayerBranch=Number(localStorage.getItem('shindo_prayer_branch_v99')||0);artBranch=Number(localStorage.getItem('shindo_art_branch_v105')||0);selectedBranch=Number(localStorage.getItem("shindo_confession_branch")||0);overlay.classList.remove("sanctuary","sanctuary-leaving","day","confession-blackout","sleep-fadeout","sleep-fadein");storyBackdrop.style.filter='';storyUnderlay.style.filter='';
 if(localStorage.getItem(KEY)==='complete'&&!localStorage.getItem('shindo_story_v66_sanctuary')){localStorage.setItem(KEY,'66');localStorage.setItem('shindo_story_v66_sanctuary','1')}

 // Players who finished the previous release continue at the newly added dialogue.
 if(localStorage.getItem(KEY)==='complete'){
  const migrated=localStorage.getItem('shindo_story_v55_extended');
  if(!migrated){localStorage.setItem(KEY,'66');localStorage.setItem('shindo_story_v55_extended','1')}
  else{window.SHINDO_openFeedback?.();return}
 }
try{localStorage.setItem('shindo_story_started_v37','1');localStorage.setItem('shindo_sleep_gate_v48','0')}catch(e){};
// V176 adds two scenes to the evening introduction. Correct V175 numeric saves
// once so an in-progress player is not dropped into the wrong dialogue.
try{
 if(localStorage.getItem('shindo_scene_index_migrated_v176')!=='1'){
  const old=Number(localStorage.getItem(KEY));
  if(Number.isInteger(old)&&old>=EVENING_DAY2_START+4){
   localStorage.setItem(KEY,String(old+2));
  }
  localStorage.setItem('shindo_scene_index_migrated_v176','1');
 }
}catch(_){/* no persistent storage available */}
const n=Number(localStorage.getItem(KEY));index=Number.isInteger(n)&&n>=0&&n<scenes.length?n:0;revealed=scenes.slice(0,index+1).some(x=>x.reveal);jihoonRevealed=scenes.slice(0,index+1).some(x=>x.revealJihoon);
currentPortrait='';for(const scene of scenes.slice(0,index+1)){if(scene.clearPortrait)currentPortrait='';if(scene.portrait)currentPortrait=scene.portrait}
storyUnderlay.classList.add('visible');storyBackdrop.classList.add('visible');overlay.classList.add('active');if(scenes.slice(0,index+1).some(x=>x.enterSanctuary)&&!scenes.slice(0,index+1).some(x=>x.leaveSanctuary)){overlay.classList.add("sanctuary");if(!scenes[index].enterSanctuary)stopSanctuaryTick()}refreshInventoryVisibility();render()};
})();

