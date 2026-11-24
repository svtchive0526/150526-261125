/* SHINDO v128 — affinity indicators blink 5 times then clear automatically. */
(()=>{
 'use strict';
 const panel=document.getElementById('shindo-phone-panel');
 const drawer=document.getElementById('shindo-phone-drawer');
 if(!panel||!drawer)return;
 const HISTORY='shindo_play_history_v107';
 const AFFINITY='shindo_affinity_v107';
 const AFFINITY_EVENTS='shindo_affinity_events_v111';
 // V260: New Day-3 saves defer Jeonghan's living-hall +5 until a branch is chosen.
 // A pre-V260 save with the room event already credited retains that historical +5.
 const V260_DAY3_LIVING_DEFERRED='shindo_day3_living_room_deferred_v260';
 const EVIDENCE='shindo_evidence_items_v105';
 const MET='shindo_met_characters_v108';
 const HISTORY_DAY='shindo_current_story_day_v109';
 const AFFINITY_UNREAD='shindo_affinity_unread_v125';
 const JUNHUI_LOCK='shindo_junhui_affinity_locked_v205';
 // V222: One lock gate for every affinity write, including future locked characters.
 // Existing Junhui saves keep using their original lock key.
 const AFFINITY_LOCKS='shindo_affinity_locks_v222';
 const isAffinityLocked=name=>{
  if(name==='준휘'&&localStorage.getItem(JUNHUI_LOCK)==='1')return true;
  const stored=load(AFFINITY_LOCKS,{});
  return Array.isArray(stored)?stored.includes(name):!!(stored&&typeof stored==='object'&&stored[name]);
 };
 // Future story branches can lock a character without bypassing affinity rules.
 window.SHINDO_isAffinityLocked=isAffinityLocked;
 window.SHINDO_lockAffinity=name=>{
  if(!PEOPLE.some(p=>p[0]===name))return false;
  const current=load(AFFINITY_LOCKS,{});
  const locks=current&&typeof current==='object'&&!Array.isArray(current)?current:{};
  locks[name]=true;save(AFFINITY_LOCKS,locks);
  document.dispatchEvent(new Event('shindo-inventory-change'));
  return true;
 };
 const AFFINITY_BLINK_MS=1100;
 const AFFINITY_BLINK_COUNT=5;
 const affinityNoticeTimers=new Map();
 // V128: notices are temporary. Discard persistent unread state from V125-V127.
 try{localStorage.removeItem(AFFINITY_UNREAD)}catch(_){}
 // Only runtime changes trigger a notice; migration/repair at startup never does.
 let affinityNoticesReady=false;
 const PEOPLE=[
  ['승철','profile-seungcheol.png'],['정한','profile-jeonghan.png'],['조슈아','profile-joshua.png'],
  ['준휘','profile-junhui.png'],['순영','profile-soonyoung.png'],['원우','profile-wonwoo.png'],
  ['지훈','profile-jihoon.png'],['명호','profile-minghao.png'],['민규','profile-mingyu.png'],
  ['석민','profile-seokmin.png'],['승관','profile-seungkwan.png'],['한솔','profile-hansol.png'],['찬','profile-chan.png']
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
  'destroyed-document-1':{name:'파기된 문서1',description:'신도들의 기부 이력이다. 이 명단에 있는 이름은 거주지에 없는 사람들의 이름같다.'},
  'destroyed-document-2':{name:'파기된 문서2',description:'마을의 내부 지도다. 밖으로 이어지는 길마다 전부 X자가 쳐진 채다. 공양실 옆 쓰레기장에만 작게 동그라미가 있다. 이건 뭘까?'},
  'destroyed-document-3':{name:'파기된 문서3',description:'누군가의 일기. 심하게 훼손되어 읽을 수 있는 페이지가 거의 없다.'},
  'destroyed-document-4':{name:'파기된 문서4',description:'카밀레교의 교리에 대한 내용이지만 현재의 교리와 조금 다른 부분이 있다.'},
  'escape-route':{name:'탈출로',description:'믿기지 않겠지만, 탈출로처럼 생겼다. 누군가 도망치려 했던걸까?'},
  'missing-bracelet':{name:'실종자의 팔찌',description:'제보자 동생의 팔찌다. 분명한 증거품이 되어줄 터이다.'},
  'believer-register':{name:'신도관리명부',description:'신도 명부와 절대 복종을 강요하는 불공정 서약서다.'},
  'accounting-ledger':{name:'회계장부',description:'회계 및 송금 내역에 실종자(공양 희생자)들의 인적 사항이 있다.'},
  'escape-package':{name:'탈출패키지',description:'갈색의 낡은 가방. 안에는 손전등, 장갑, 간식거리, 포켓나이프, 나침반이 들어있다.'},
  'wonwoo-chat':{name:'전원우의 공기계 카톡 내역',description:'원우가 교주와 나눈 업무 보고 내역이다.'},
  'conversation-recording':{name:'대화녹음',description:'사제들과 교주의 대화가 녹음되어 있다.'}
 };
 // V211: item thumbnails and large artwork in the detail popup.
 const EVIDENCE_IMAGES={
  'destroyed-document-1':'story-illustrations/destroyed-document-1.png',
  'destroyed-document-2':'story-illustrations/destroyed-document-2.png',
  'destroyed-document-3':'story-illustrations/destroyed-document-3.png',
  'destroyed-document-4':'story-illustrations/destroyed-document-4.png',
  'escape-route':'story-illustrations/escape-route.png',
  'missing-bracelet':'story-illustrations/missing-bracelet.png',
  'believer-register':'story-illustrations/believer-register.png',
  'accounting-ledger':'story-illustrations/accounting-ledger.png',
  'escape-package':'story-illustrations/escape-package.png',
 };
 // V212: Full, authored item text. Stored for all items, but only unlocked items are shown.
 const EVIDENCE_DETAILS={
  "escape-package": "갈색의 낡은 가방. 안에는 손전등, 장갑, 간식거리, 포켓나이프, 나침반이 들어있다.\n간식은 넉넉하게 들어 있다. 산 속 깊은 곳에 있는 카밀레교에서 탈출하려면 꼭 필요한 것들이긴 하다. 자세히 보니 가방에 이름이 적혀 있다. **은재**...?",
  "missing-bracelet": "김제보가 보낸 동생의 팔찌와 동일하다. 큰 다이아몬드 장식이 있고 은색 체인으로 되어있다. 피인지 재인지 모를 거무튀튀한 것들이 잔뜩 묻어 지저분해졌다.",
  "destroyed-document-1": "xx년 x월 신도 기부 명단. 김명철 일백오십, 안광수 일백구십, 유은결 이백오십 이한강 삼백... 아래로 내려갈 수록 금액이 커지고 있다. 가장 마지막에는 억단위가 넘는 금액을 기부한 신도가 있다. 중간중간 페이지가 끊어져있고 찢어져있긴 하지만 신도들이 말도 안 되는 금액을 기부한 것은 확실하다. 심지어 금액이 낮은 사람에게는 건질 게 없었다는 메모까지 있다. 건질 게 없다니, 대체 뭐를? 이 거주지에 들어오기 위해서는 기부를 해야하는걸까...? 자세히 읽어보니 이 이름들... 생활관의 거주자 리스트에서 본 적 없는 이름들이다. 거주지에 있는 사람들의 이름도 없다. 잠깐, 박민우 구천팔백... 이 사람은 내가 여기에 온 첫날에 공양된 사람의 이름이다. 설마, 이 명단. 공양된 자들의 자산을 적어둔 건가...?",
  "destroyed-document-2": "**마을 내부 지도**다. 근처까지는 표시되어있지만 카밀레교가 산속 깊숙히 처박혀 있는 탓에 유의미하게 쓸 수 있는 지도는 아닌 것 같다. 군데군데 붉은 색으로 x자가 쳐져있다. 기억을 잘 되짚어보니 지도에는 없는, 하지만 동물들이 지나다녀 풀이 조금 정리된 그런 곳들이었다. 그 곳들에 전부 x자가 쳐져있다. 누군가가 탈출을 시도했다가 실패한 것일까? 아니면....",
  "destroyed-document-3": "거의 십년 전의 일기다. 누구의 일기인지 명확하지 않다.\n\n**xx년 2월 19일,** (무언가가 묻어 이름이 가려져 있다) ...정도로 화를 내는 건 처음이다. 자기 교리가 부정당했다고, 그것도 가장 믿고 사랑했던 사람이 자신의 생각을 부정했다고. 우리는 그럴 리 없다며 말렸다. 하지만 화가 진정됐을 무렵 정말 처음 볼 정도로 우울한 상태가 되더니 꼬박 일주일을 방에 처박혀 코빼기도 보이지 않았다.\n\n**xx년 2월 21일,** 방에 처박힌 지 열흘째가 되었다. 오늘 갑자기 문을 열고 나와선 자기는 깨달았다고 소리치며 기뻐했다. 무슨 얘기를 하는 건지 하나도 못 알아들었다.\n\n**xx년 2월 28일,** 우리를 모아놓고 하는 말이 가관이다. 우리는 하나였고 교주는 그 하나에서 떨어져나와 살면서 삐뚤어졌다나 뭐라나. 자기 가족한테 무슨 말을 하는 건진 알고 있는 건가...? 그러고선 공양을 해야한다고 한다. 캐모마일 꽃이 자라려면 어쩌고 저쩌고, 무슨 말인지 반은 이해 못 했다. 그냥 우리가 아끼는 형이니 그러려니 했을 뿐. 공양은 일주일 뒤에 하겠댄다. 우리에게 꼭 참여해서 증인이 되어달라는데... 진짜 뭐라는 건지 하나도 모르겠다.\n\n**xx년 3월 7일,** 씨발.\n\n**xx년 3월 8일,** (얼룩이 묻고 물에 번진 자국이 많아 군데군데  끊겨있다) 독한 술을 구해왔다. 어디서 구했냐고 물어보니 ..... 면 쉽게 구한댄다. 그걸 교주에게 선물하고 우리를 끼고 가서는 같이 식사를 했다. 교주는 술을 처먹고 골아떨어졌고, .... 로 묶어 침대에서 움직이지 못하게 했다. ...... 유를 가져와 불을 붙였다. ...... 타는 냄새가 지독했다. 계속해서 말렸지만 들은 체도 안했다. 다른 애들도 그냥, 그 형이 좋다고, 가족이라면 당연히 해야하지 않냐며 따랐다. 앞으로의 카밀레교에서는 주기적으로 공양을 할거라고 했다. ......들을 처단하고 ......확실해지기 위해선 어쩔......다. 토악질이 나온다. 활활 타버렸던 그 집을, 내일부터 정리해야한다.\n\n**xx년 3월 9일,** ...우리의 첫번째 공양은 ......다. 우리는 한 배를 탔다. 사람을 죽인 자들이 되었다. 그것도, 산채로 불구덩이에 집어넣어서 죽인, 최악의 살인마들이 됐다.\n\n**xx년 3월 21일,** 증인이 되어준 우리에는 ......를 충실......한다. ......는 우리에게 사제의 역할을 준다고 했다. 이 미친 짓이 놀이인 줄 알았는데, 엄마도 아빠도 여긴 좋은 곳이라고 했는데. ...우형은 ......의 귀가 되었고 준휘 형은 눈이 되었다. ......의 역할은 아직 정해지지 않았다. .....길 ......다.",
  "destroyed-document-4": "[3대 소명 선언문]\n\n**첫째, 자연 섭리로의 회귀**입니다. 오늘날 인간은 섭리에서 벗어나 세속의 죄악 속에서 방황합니다. 그러나 우리는 헛된 고립을 내려놓고 성스러운 자연의 흐름에 몸을 맡깁니다. 그리하여 세속의 죄악인 물욕에서 벗어나 신께서 허락하신 하나 됨 속에서 사랑과 온기를 나누는 공동체를 이룹니다.\n\n**둘째, 살아 숨 쉬는 계시의 복음**입니다. 머무르는 관념이 아닌 지금 이 순간의 생동하는 순수로 일어섭니다. 성도들은 아침저녁으로 새롭게 피어나는 진리의 말씀을 마주합니다. 성실한 신앙 활동으로 물욕에 갇힌 내부의 한계를 깨고 영적 부흥으로 나아갑니다.\n\n**셋째, 삶의 현장에서 이뤄내는 실천과 사역**입니다. 진정한 구원은 세속의 죄악인 물욕을 내려놓고 기부를 행함으로써 완성됩니다. 성도들은 베풂의 마음으로 성소의 흙을 정성껏 일구며, 하루도 쉬지 않으며 헌신합니다. 정체란 곧 부패입니다. 탁한 피를 빼면 낫는 몸처럼, 공양과 기부, 헌신과 시련으로 스스로를 채찍질하며 묵묵히 나아갑니다.\n\n과거의 카밀레교 교리인 듯 하다. 하지만 자세히 보니 군데군데 다른 곳들이 있다. 지금의 교리는 좀 더 자연추구적인 느낌이었던 것 같은데... 이상할 정도로 물욕과 기부에 집착하는 것 같다. 신도들을 무급노동시켜 고혈을 빼먹으려고 했던 건가?",
  "escape-route": "쓰레기장에 있는 유일한 탈출구다. 이것만 자물쇠도 없이 하루 종일 열려있다. 누군가가 탈출을 꿈꾸었던 것 같다. ...자세히 살펴보니 실밥이나 핏자국같은게 조금 묻어 있다. 바닥엔 무거운 걸 끌고 온 것인지 끌린 자국도 있다. 쓰레기를 옮겼다기엔... 조금 부자연스러워 보인다. 어쩌면 인신공양된 사람들을 여기를 통해 옮기고 처리하고 있었던 걸까...?",
  "believer-register": "신도 관리 명부다. 명부에는 신도들의 이름, 생년월일, 직업, 주소, 동거인 여부, 교주의 한줄 평이 적혀있다. 내가 아는 신도들을 확인 해 보니 가장 최근의 변화까지 꼼꼼하게 체크한 듯 하다. 심지어 어떤 신도들은 오늘 나눈 대화까지 적혀있다. 안에는 빈 내부 서약서가 몇 장 들어있다.\n\n**서약서**\n\n신도는 카밀레교에 투신함으로써 교에 대한 절대적인 복종과 헌신을 약속합니다.\n신도는 카밀레교의 교리를 충실히 익히고 이행하며 교리에 따른 인도의 길을 걸을 것을 약속합니다.\n신도는 카밀레교의 어떤 규칙에도 반항하지 않고 충실히 따를 것을 약속합니다.\n신도는 교단의 부정, 불온한 자를 발견시 즉시 고발하여 교단의 평온을 지킬 것을 약속합니다.\n신도는 공양되는 것에 기뻐할 것을 약속합니다.\n\n서약자 :    (서명)\n카밀레교 교주\n\n...나도 서약서를 쓰긴 했지만 이 정도면 그냥 신체포기를 하라는 것과 다를 게 없는 것 같다.",
  "accounting-ledger": "모든 신도들의 금전 내역이 적혀있다. 국세청인가 싶을 정도로 꼼꼼하게 1원 단위까지 적혀있다. 심지어 주식을 하는 신도들은 어느 종목에 몇 주를 투자했고 얼마의 손해를 봤는지도 적혀있다. 공양된 사람들의 금전 이력도 적혀있다. 자세히 살펴보니 마지막에 '**회수 완료**'라고 적혀있다. 돈 뜯어내는게 없는 종교가 어떻게 유지되는건가 했더니... 유산갈취였냐.",
  "wonwoo-chat": "[원우]\n금일 고해성사 내용입니다.\n불온자로 추정되는 이는 아래 4명입니다.\n\n이재원 - 사제를 통해 교단의 중요 정보를 캐내려는 시도를 함\n김소영 - 거주지의 신도들을 선동하여 특정 신도를 따돌림\n박유상 - 금지물품(술)을 밀반입하여 신도들에게 배부\n한시혁 - 교단 활동에 충실하지 못함, 이지훈 신도의 고발\n방성수 - 교리집 훼손\n\n추가로 신입 신도인 김봉봉에 대한 행적 보고입니다.\n-교단 활동에 충실히 임하고 있으나 신실함이 느껴지지 않음.\n-특종을 여러번 잡아낸 기자였음.\n-근무중이던 곳에서 평소 회의감을 느끼는 모습은 없었다고 함.\n\n다른 정보를 더 입수하면 추가 보고 드리겠습니다.\n\n[교주]\n확인.\n\n[교주]\n공양은 김소영. 이재원에겐 탈출로가 있다고 흘려.\n\n[원우]\n명령대로 하겠습니다.\n\n[원우]\n번견에게 전달 완료했습니다.\n내일 중 처리 후 보고드리겠습니다.",
  "conversation-recording": "[명호] 준 형, 그... 내일 바빠?\n\n[준휘] 응? 아직은 일정 없을 걸?!\n\n[명호] 갔다오고 싶은 데가 있는데... 나 며칠 전에도 나갔다 왔어서. 혹시 대신 갈 수 있나 해서 물어보려 했어.\n\n[한솔] 엥? 형이 우리 혼낸 적 없잖아.\n\n[준휘] 맞아~ 슈아 형 우리한텐 늘 친절했는데\n\n[교주?] 사제님들, 지금 밖에 신도들이 돌아다니고 있습니다...!\n\n[조슈아] 그래 얘들아. 낮에는 조심해야 한대도.\n\n[한솔] 지송~. 근데 솔직히 입에 안 붙어. 저 영감탱이가 더 교주같이 생겨서.\n\n[교주?] 죄, 죄송합니다...\n\n[조슈아] 죄송할 것 까지야. 그러려고 뽑은 건데, 역할에 충실한 게 뭐가 나쁘겠어.\n\n[준휘] 그래서 교주님, 명호 나갔다 와도 돼요? 되면 나도 같이 갔다 오고 싶은데!\n\n[조슈아] 상관은 없는데, 뭐 때문에 나가려는 거야?\n\n[명호] ...차. 이번에 박람회가 열린대서. 새로 사오고 싶어. 먹던 게 다 떨어졌거든.\n\n[조슈아] 아하. (살짝 웃는 소리) 하긴 명호는 잎차를 더 좋아하긴 했지.\n\n[조슈아] 다녀와, 대신에 준휘 말고 한솔이가 같이 갔다 와.\n\n[준휘] 에엥~~? (폴짝폴짝 뛰는 것인지 나무바닥이 끽끽거리는 소리) 그럼 나 간식 사다줘! 마라곤약! 훠궈곤약!\n\n[한솔] 와 그거 개맛있었는데. (씁, 하고 침을 삼키는 소리) 보이면 쓸어와야지. 아니 안보이면 내가 간다.\n\n[한솔] (급히 다가오는 듯한 발소리, 이어서 책상을 탕 치는 소리) 교주형, 저거 곤약 형도 먹어봐야해. 저거 훠궈 곤약이랑 마라 곤약이랑 같이 먹으면 (박수소리가 한번 크게) 땅콩 소스에 훠궈 찍어먹는 맛임.\n\n[조슈아] ...너 땅콩 알러지 있잖아.\n\n[명호] 어쨌든 나갔다 와도 되는 거지? (상기된 듯 기쁜 목소리) 많이 사와도 돼? 아, 교주님은 필요한 거 없어?\n\n[조슈아] 내가 너희를 위해서 뭘 못해주겠니. 먹고 싶은 만큼 사와. (서류뭉치를 책상에 탁탁 치는 소리) 글쎄, 나는 딱히 필요한 게 없네. 준휘한테 필요한 거나 많이 사와줘. 이번 주 내내 바쁠 예정이거든.\n\n[준휘] 진짜...? 어휴 다들 왜 이렇게 나가려고 하는 거야?\n\n[준휘] 여기 있으면 삼시세끼 다 주고, 따듯한 방에서 자고, 일도 안 해도 되는데! 바보들! 바보바보!\n\n[한솔] 내말이. 아 형, 오늘 석식 돈까쓰래.\n\n[준휘] 1등으로 가야지.\n\n[조슈아] 준아, 원우가 보고한 거 너한테도 보냈어. 잘 할 수 있지?\n\n[준휘] 당연하지~! 우리는 교주님 위해서면 뭐든 완벽하게 할 수 있어!"
};
 // Render only Markdown bold; all other characters are inserted as safe text nodes.
 // The existing white-space:pre-wrap preserves newlines and paragraph spacing.
 function renderEvidenceDescription(target,raw){
  target.replaceChildren();
  const parts=String(raw).split(/(\*\*[\s\S]+?\*\*)/g);
  for(const part of parts){
   if(!part)continue;
   if(part.startsWith('**')&&part.endsWith('**')&&part.length>4){
    const strong=document.createElement('strong');
    strong.textContent=part.slice(2,-2);
    target.appendChild(strong);
   }else target.appendChild(document.createTextNode(part));
  }
 }
 const EVIDENCE_ITEM_ALIASES={
  '탈출패키지':'escape-package', '탈출 패키지':'escape-package', 'escape_package':'escape-package',
  'escapePackage':'escape-package',
  '전원우의 공기계 카톡 내역':'wonwoo-chat', '전원우 공기계 카톡 내역':'wonwoo-chat',
  'wonwoo-chat-log':'wonwoo-chat', 'wonwoo-kakaotalk':'wonwoo-chat',
  '대화녹음':'conversation-recording', '대화 녹음':'conversation-recording', 'audio-recording':'conversation-recording'
 };
 const canonicalEvidenceId=id=>EVIDENCE_ITEM_ALIASES[id]||id;
 function inventoryItemId(value){
  if(typeof value==='string')return canonicalEvidenceId(value);
  if(value&&typeof value==='object')return inventoryItemId(value.id||value.key||value.slug||value.name);
  return '';
 }
 function ownedEvidenceIds(){
  const seen=new Set();
  const result=[];
  const append=value=>{
   if(Array.isArray(value)){value.forEach(append);return}
   const id=inventoryItemId(value);
   if(id&&evidenceInfo[id]&&!seen.has(id)){seen.add(id);result.push(id)}
  };
  // Original evidence acquisition/storage remains authoritative.
  append(load(EVIDENCE,[]));
  // Existing separate inventory keys are read-only compatibility sources.
  ['shindo_inventory_items_v167','shindo_items_v1','shindo_item_items_v1'].forEach(key=>append(load(key,[])));
  // The escape package is also owned through these existing story keys.
  if(localStorage.getItem('shindo_escape_package_owned')==='1'||localStorage.getItem('shindo_escape_package_owned')==='true'||
     localStorage.getItem('shindo_has_escape_package')==='1'||localStorage.getItem('shindo_has_escape_package')==='true')append('escape-package');
  return result;
 }

 function load(k,fallback){try{const v=JSON.parse(localStorage.getItem(k));return v===null?fallback:v}catch(_){return fallback}}
 function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(_){}}
 function getUnread(){
  const value=load(AFFINITY_UNREAD,[]);
  return Array.isArray(value)?value.filter(name=>PEOPLE.some(p=>p[0]===name)):[];
 }
 function addUnread(names){
  if(!affinityNoticesReady || !names.length)return;
  const unread=new Set(getUnread());
  let changed=false;
  names.forEach(name=>{
   if(!PEOPLE.some(p=>p[0]===name))return;
   unread.add(name);changed=true;
   const prior=affinityNoticeTimers.get(name);
   if(prior)clearTimeout(prior);
   const timer=setTimeout(()=>{affinityNoticeTimers.delete(name);acknowledgeAffinity(name)},AFFINITY_BLINK_MS*AFFINITY_BLINK_COUNT);
   affinityNoticeTimers.set(name,timer);
  });
  if(changed){save(AFFINITY_UNREAD,[...unread]);document.dispatchEvent(new Event('shindo-inventory-change'))}
 }
 function acknowledgeAffinity(name){
  const prior=affinityNoticeTimers.get(name);
  if(prior){clearTimeout(prior);affinityNoticeTimers.delete(name)}
  const unread=getUnread();
  if(!unread.includes(name))return;
  save(AFFINITY_UNREAD,unread.filter(n=>n!==name));
  render();
 }
 function refreshUnreadIndicators(){
  const any=getUnread().length>0;
  document.getElementById('shindo-phone-toggle')?.classList.toggle('shindo-affinity-unread',any);
  panel.querySelector('[data-tab="people"]')?.classList.toggle('shindo-affinity-unread',any);
 }
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
 // Morning locations: the verified cast appearing at each authored place.
 // 공양실 has no authored character introductions yet. Add its roster when the
 // story defines who is there, rather than silently awarding an arbitrary person.
 const ROOMS={
  '기도관':['한솔','승철','석민','찬'],
  '예술당':['순영','명호'],
  '생활관':['정한','지훈','민규'],
  '본당':['조슈아'],
  '고해소':['원우'],
  '공양실':['준휘']
 };
 // Day-specific cast additions must reflect authored stories, not assumptions.
 function morningRoomCast(room,day){
  const cast=ROOMS[room]||[];
  return room==='본당'&&day===3?[...cast,'승관']:cast;
 }
 // V204: Day 2 afternoon encounter / night investigation events. Each unique
 // action is recorded once per day and can be earned again after a day restart.
 const AFTERNOON_EVENTS={
  '승관 첫 만남':[['승관',10]],
  '승관 기자 신분 공개':[['승관',10]],
  '쓰레기장 수색':null,
  '분리수거함 수색':null,
  '소각로 청소':null,
  '본당 도서실 수사':null,
  '본당 사무실 수사':null
 };
 const AFTERNOON_PENALTY=[
  ...GROUPS['사제'].map(name=>[name,-10]),
  ...GROUPS['신도'].map(name=>[name,-5])
 ];
 for(const name of ['쓰레기장 수색','분리수거함 수색','소각로 청소','본당 도서실 수사','본당 사무실 수사'])AFTERNOON_EVENTS[name]=AFTERNOON_PENALTY;
 const PERSON_EVENTS={
  '기도관 활동: 단상 위 청소':'한솔',
  '기도관 활동: 자는 사람 깨우기':'승철',
  '기도관 활동: 성경 한 장 넘기기':'석민',
  '기도관 활동: 청소 돕기':'찬',
  '예술당 활동: 호랑이 그림 보기':'순영',
  '예술당 활동: 캔버스 옮기기':'명호',
  '생활관 활동: ??의 방에서 대화':'정한',
  '생활관 활동: 말 걸기':'지훈',
  '생활관 활동: 빨래 수거':'민규',
  '본당 탐색: 사무실':'조슈아',
  '본당 탐색: 도서실':'승관',
  '고해소 대응: 임재범의 「고해」를 부른다.':'원우',
  '고해소 대응: 미쳤냐? 가만히 있는다.':'원우',
  '공양실 활동: 준휘와 대화':'준휘'
 };
 // All participants start at zero except Joshua. Do not wipe existing scores on upgrades.
 function getAffinity(){const result=load(AFFINITY,{});if(!result||typeof result!=='object'||Array.isArray(result))return {};
  if(!isAffinityLocked('조슈아')&&(!Object.prototype.hasOwnProperty.call(result,'조슈아') || Number(result['조슈아'])===0))result['조슈아']=100;
  return result;
 }
 function updateAffinity(person,score){if(isAffinityLocked(person))return;const values=getAffinity();const before=Number(values[person])||0;const after=Math.max(0,Math.min(100,Math.round(Number(score)||0)));values[person]=after;save(AFFINITY,values);if(before!==after)addUnread([person])}
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
   // 고해소/공양실에는 추가 캐릭터 선택 없이 바로 1:1 대화가 시작된다.
   // 따라서 입장 즉시 +20, 별도 개별 대화 +15는 지급하지 않는다.
   changes=morningRoomCast(label,d)
    .filter(name=>!(d===3&&label==='생활관'&&name==='정한'))
    .map(name=>[name,(label==='고해소'||label==='공양실')?20:5]);
  }else if(kind==='living3-room'){
   if(d!==3||label!=='정한')return false;
   // Only newly played Day-3 entries use deferred payment. Earlier saves
   // were already credited at entrance, so they must not gain another +5.
   if(localStorage.getItem(V260_DAY3_LIVING_DEFERRED)!=='1')return false;
   eventId='3|생활관정한|장소추가';changes=[['정한',5]];
  }else if(kind==='day3-eunjae-jeonghan'){
   if(d!==3||label!=='정한')return false;
   eventId='3|은재의방|분기1·3|정한15';
   changes=[['정한',15]];
  }else if(kind==='day4-eunjae-jeonghan'){
   if(d!==4||label!=='정한')return false;
   eventId='4|은재의방|분기1·3|정한15';
   changes=[['정한',15]];
  }else if(kind==='day5-eunjae-duo'){
   if(d!==5||label!=='정한·승관')return false;
   eventId='5|은재의방|분기1·3|정한승관15';
   changes=[['정한',15],['승관',15]];
  }else if(kind==='living3-police'){
   if(d!==3||label!=='순영')return false;
   eventId='3|생활관순영|경찰협력';changes=[['순영',15]];
  }else if(kind==='afternoon'){
   if(d!==2||!Object.prototype.hasOwnProperty.call(AFTERNOON_EVENTS,label))return false;
   eventId=d+'|오후친밀도|'+label;
   changes=AFTERNOON_EVENTS[label];
  }else if(kind==='person'){
   // 특수 장소는 장소 선택 보너스 +20에 대화를 포함한다.
   if(label.startsWith('고해소 대응: ')||label==='공양실 활동: 준휘와 대화')return false;
   const person=PERSON_EVENTS[label];if(!person)return false;
   eventId=d+'|개별인물|'+person;
   // The selected person has already received the room's +5, so only +10 here.
   changes=[[person,10]];
  }else return false;
  const ledger=load(AFFINITY_EVENTS,[]);if(!Array.isArray(ledger))return false;
  if(ledger.includes(eventId))return false;
  // Existing V262 saves that already earned Day 4's +15 must not earn it twice.
  // Do not retroactively subtract V262's already-awarded Seungkwan affinity.
  if(kind==='day4-eunjae-jeonghan'&&ledger.includes('4|은재의방|분기1·3|정한승관'))return false;
  // V262 granted Jeonghan +10 through the generic per-person action on Days 3/5.
  // Complete only the missing +5 when revisiting that same day, never another +15.
  if(kind==='day3-eunjae-jeonghan'||kind==='day5-eunjae-duo'){
   const oldIndividual=d+'|개별인물|정한';
   const oldLabel=d+'|개별|생활관 활동: ??의 방에서 대화';
   if(ledger.includes(oldIndividual)||ledger.includes(oldLabel))
    changes=changes.map(([name,amount])=>[name,name==='정한'?5:amount]);
  }
  if(kind==='person'){
   const selected=PERSON_EVENTS[label];
   if(ledger.some(id=>typeof id==='string'&&(
    id===d+'|개별인물|'+selected ||
    (id.startsWith(d+'|개별|')&&PERSON_EVENTS[id.slice((d+'|개별|').length)]===selected)
   )))return false;
  }
  const values=getAffinity();
  const changed=[];
  for(const [name,delta] of changes){
   if(isAffinityLocked(name))continue;
   const before=Number(values[name])||0;
   const after=Math.max(0,Math.min(100,Math.round(before+delta)));
   values[name]=after;
   if(after!==before)changed.push(name);
  }
  // Preserve the completed-event marker as part of the same synchronous operation.
  save(AFFINITY,values);ledger.push(eventId);save(AFFINITY_EVENTS,ledger);
  if(kind==='room'&&d===3&&label==='생활관')localStorage.setItem(V260_DAY3_LIVING_DEFERRED,'1');
  addUnread(changed);
  document.dispatchEvent(new Event('shindo-inventory-change'));
  return true;
 }
 window.SHINDO_applyAffinityEvent=grantAffinity;
 // V219 awarded Seungkwan's day-3 library selection directly to the score,
 // without an event-ledger entry. Record that old award without re-awarding it.
 // This protects existing saves when the common +10 handler replaces that shim.
 (function migrateV219Seungkwan(){
  if(localStorage.getItem('shindo_v219_seungkwan_person')!=='1')return;
  const ledger=load(AFFINITY_EVENTS,[]);
  if(!Array.isArray(ledger))return;
  const id='3|개별인물|승관';
  if(!ledger.includes(id)){ledger.push(id);save(AFFINITY_EVENTS,ledger)}
 })();
 // Repair existing V107-V110 saves using only recorded, actually selected actions.
 // Inferred progress positions are NOT sufficient evidence for an affinity grant.
 function restoreAffinityFromHistory(){
  const records=load(HISTORY,[]);
  const seen=new Map();
  if(Array.isArray(records))for(const r of records){
   if(typeof r?.label==='string'){
    const day=Math.max(2,Math.floor(Number(r.day)||2));
    if(day<=13)seen.set(day+'|'+r.label,{day,label:r.label});
   }
  }
  const legacy=(key,mapper)=>{const v=localStorage.getItem(key);if(v!==null){const label=mapper(v);if(label)seen.set('2|'+label,{day:2,label})}};
  legacy('shindo_day2_prayer',v=>({'1':'새벽기도: 새벽기도에 참석한다','2':'새벽기도: 새벽기도에 참석하지 않는다'})[v]);
  legacy('shindo_day2_morning',v=>'오전 활동 장소: '+v);
  legacy('shindo_prayer_branch_v99',v=>({'1':'기도관 활동: 단상 위 청소','2':'기도관 활동: 자는 사람 깨우기','3':'기도관 활동: 성경 한 장 넘기기','4':'기도관 활동: 청소 돕기'})[v]);
  legacy('shindo_art_branch_v105',v=>({'1':'예술당 활동: 호랑이 그림 보기','2':'예술당 활동: 캔버스 옮기기','3':'예술당 활동: 예술당 조사하기'})[v]);
  legacy('shindo_living_branch_v156',v=>({'2':'생활관 활동: ??의 방에서 대화','3':'생활관 활동: 말 걸기','4':'생활관 활동: 빨래 수거'})[v]);
  legacy('shindo_main_branch_v160',v=>({'1':'본당 탐색: 사무실','2':'본당 탐색: 도서실'})[v]);
  legacy('shindo_confession_morning_branch_v163',v=>({'1':'고해소 대응: 임재범의 「고해」를 부른다.','2':'고해소 대응: 미쳤냐? 가만히 있는다.'})[v]);
  for(const {day,label} of seen.values()){
   if(label.includes('새벽기도')){
    if(/불참|않는다/.test(label))grantAffinity('prayer','불참',day);
    else if(/참석/.test(label))grantAffinity('prayer','참석',day);
   }
   if(label.startsWith('오전 활동 장소: '))grantAffinity('room',label.slice('오전 활동 장소: '.length),day);
   if(PERSON_EVENTS[label]){
    const room=label.startsWith('기도관')?'기도관':label.startsWith('예술당')?'예술당':label.startsWith('생활관')?'생활관':label.startsWith('본당')?'본당':label.startsWith('공양실')?'공양실':'고해소';
    grantAffinity('room',room,day);
    // V260: snooping in Jeonghan's room (Day-3 case ②) grants no affinity.
    if(!(day===3 && label==='생활관 활동: ??의 방에서 대화' &&
      localStorage.getItem('shindo_day3_jeonghan_case_v260')==='2'))
     grantAffinity('person',label,day);
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
  let hasRoom=false;const creditedIndividuals=new Set();
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
    const room=parts.slice(2).join('|');
    changes=morningRoomCast(room,Number(parts[0]))
     .filter(n=>!(Number(parts[0])===3&&room==='생활관'&&n==='정한'&&
       localStorage.getItem(V260_DAY3_LIVING_DEFERRED)==='1'))
     .map(n=>[n,(room==='고해소'||room==='공양실')?20:5]);
   }else if(parts[1]==='생활관정한'&&parts[2]==='장소추가'){
    changes=[['정한',5]];
   }else if(parts[1]==='생활관순영'&&parts[2]==='경찰협력'){
    changes=[['순영',15]];
   }else if(parts[1]==='오후친밀도'){
    changes=AFTERNOON_EVENTS[parts.slice(2).join('|')]||[];
   }else if(parts[1]==='개별인물'){
    const person=parts.slice(2).join('|');
    const specialRoom=person==='원우'?'고해소':person==='준휘'?'공양실':null;
    // 과거 버전 +5/+15 이력은 특수 장소의 +20 한 번으로 해석한다.
    const creditedByRoom=specialRoom&&ledger.includes(parts[0]+'|장소|'+specialRoom);
    if(!creditedByRoom&&PEOPLE.some(p=>p[0]===person))changes=[[person,10]];
   }else if(parts[1]==='개별'){
    const person=PERSON_EVENTS[parts.slice(2).join('|')];
    const specialRoom=person==='원우'?'고해소':person==='준휘'?'공양실':null;
    if(person&&!(specialRoom&&ledger.includes(parts[0]+'|장소|'+specialRoom)))changes=[[person,10]];
   }
   for(const [name,delta] of changes){
    if(parts[1]==='개별'||parts[1]==='개별인물'){
     const individualKey=parts[0]+'|'+name;
     if(creditedIndividuals.has(individualKey))continue;
     creditedIndividuals.add(individualKey);
    }
    if(isAffinityLocked(name))continue;
    expected[name]=Math.max(0,Math.min(100,(expected[name]||0)+delta));
   }
  }
  if(!hasRoom)return;
  const actual=getAffinity();let changed=false;
  for(const [name,value] of Object.entries(expected)){
   if(isAffinityLocked(name))continue;
   if(value>(Number(actual[name])||0)){
    actual[name]=value;changed=true;
   }
  }
  if(changed){save(AFFINITY,actual);document.dispatchEvent(new Event('shindo-inventory-change'))}
 }
 reconcileRoomBonuses();
 affinityNoticesReady=true;
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
 /* V125: The unread dot is centered on the TOP-LEFT CORNER of the actual control. */
 #shindo-phone-toggle.shindo-affinity-unread::after,
 #shindo-phone-panel .inv-tab.shindo-affinity-unread::after,
 #shindo-phone-panel .inv-person.shindo-affinity-unread::after{
   content:"";position:absolute;top:-6px;left:-6px;width:12px;height:12px;
   box-sizing:border-box;border-radius:50%;background:#ff1515;
   pointer-events:none;z-index:8;animation:shindo-affinity-blink 1.1s ease-in-out 5 forwards;
 }
 #shindo-phone-panel .inv-tab{position:relative;overflow:visible;}
 #shindo-phone-panel .inv-person{position:relative;}
 #shindo-phone-toggle.shindo-affinity-unread::after{top:-6px;left:-6px;}
 @keyframes shindo-affinity-blink{0%{opacity:1}50%{opacity:.14}100%{opacity:0}}
 @media(prefers-reduced-motion:reduce){
  #shindo-phone-toggle.shindo-affinity-unread::after,
  #shindo-phone-panel .inv-tab.shindo-affinity-unread::after,
  #shindo-phone-panel .inv-person.shindo-affinity-unread::after{animation:none}
 }
 #shindo-phone-panel .inv-content{min-height:0;flex:1;overflow-y:auto;overscroll-behavior:contain;padding:9px 3px 14px;margin-top:7px}
 #shindo-phone-panel .inv-muted{color:#bbb;font-size:12px;line-height:1.65}
 /* V162: Evidence item descriptions only, reduced by 10% (12px → 10.8px). */
 #shindo-phone-panel .inv-item-description{font-size:10.8px}
 #shindo-phone-panel .inv-card{border:1px solid #575757;background:#252525;border-radius:8px;padding:12px;margin-bottom:9px}
 #shindo-phone-panel .inv-item-name{font-size:15px;font-weight:700;margin-bottom:5px}
 #shindo-phone-panel .inv-evidence-card{width:100%;display:flex;align-items:center;gap:12px;text-align:left;min-height:90px;transition:background .15s,border-color .15s;cursor:pointer;touch-action:manipulation}
 #shindo-phone-panel .inv-evidence-card:hover{background:#303035;border-color:#85858b}
 #shindo-phone-panel .inv-evidence-card:focus-visible{outline:2px solid #eee;outline-offset:2px}
 #shindo-phone-panel .inv-evidence-thumbnail{flex:0 0 74px;width:74px;height:82px;display:flex;align-items:center;justify-content:center;border-radius:6px;background:#3b3b3f;border:1px solid #4a4a51;overflow:hidden}
 #shindo-phone-panel .inv-evidence-thumbnail img{display:block;width:100%;height:100%;object-fit:contain}
 #shindo-phone-panel .inv-evidence-thumbnail-fallback{font-size:11px;color:#bbb;text-align:center;padding:6px}
 #shindo-phone-panel .inv-evidence-text{min-width:0;flex:1}
 #shindo-phone-panel .inv-evidence-open{font-size:10px;color:#999;white-space:nowrap;margin-top:5px}
 #shindo-phone-panel .inv-evidence-chevron{flex:none;color:#aaa;font-size:23px;line-height:1}
 .shindo-evidence-modal{position:fixed;inset:0;z-index:40010;display:flex;justify-content:center;align-items:center;padding:16px;background:rgba(0,0,0,.82);overscroll-behavior:contain;font-family:Pretendard,system-ui,sans-serif;color:#f5f5f6;box-sizing:border-box;animation:shindo-evidence-backdrop-in .2s ease both}
 .shindo-evidence-modal[hidden]{display:none!important}
 .shindo-evidence-modal *{box-sizing:border-box}
 .shindo-evidence-detail{width:min(480px,100%);max-height:min(88dvh,750px);display:flex;flex-direction:column;background:#202125;border:1px solid #6c6c73;border-radius:13px;box-shadow:0 20px 75px rgba(0,0,0,.58);overflow:hidden;animation:shindo-evidence-dialog-in .22s ease both}
 .shindo-evidence-detail-header{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:14px 16px;border-bottom:1px solid #45464d;font-size:14px;font-weight:700}
 .shindo-evidence-close{display:flex;align-items:center;justify-content:center;width:34px;height:34px;border:1px solid #666870;border-radius:7px;background:#323338;color:#fff;font-size:22px;cursor:pointer;flex:none}
 .shindo-evidence-close:focus-visible{outline:2px solid #fff;outline-offset:2px}
 .shindo-evidence-detail-body{overflow-y:auto;overscroll-behavior:contain;padding:18px;min-height:0}
 .shindo-evidence-large-image{display:flex;justify-content:center;align-items:center;min-height:140px;height:min(38dvh,300px);padding:9px;background:#35363a;border-radius:9px;overflow:hidden}
 .shindo-evidence-large-image img{display:block;width:100%;height:100%;object-fit:contain}
 .shindo-evidence-large-image img[hidden],.shindo-evidence-large-placeholder[hidden]{display:none!important}
 .shindo-evidence-large-placeholder{font-size:13px;color:#aaa;text-align:center}
 .shindo-evidence-detail-name{margin:17px 0 12px;font-size:20px;font-weight:750;text-align:center;letter-spacing:-.04em}
 .shindo-evidence-detail-divider{border-top:1px solid #55565c;margin:0 0 14px}
 .shindo-evidence-detail-label{font-size:13px;font-weight:700;margin-bottom:8px}
 .shindo-evidence-detail-description{font-size:13px;color:#c9c9ce;line-height:1.8;white-space:pre-wrap;overflow-wrap:anywhere}
 .shindo-evidence-detail-description strong{font-weight:750;color:#f1f1f3}
 .shindo-evidence-detail-footer{padding:11px 18px 16px;border-top:1px solid #45464d}
 .shindo-evidence-detail-footer button{width:100%;padding:11px;border:1px solid #71717a;border-radius:7px;background:#35363b;color:#fff;font:inherit;cursor:pointer}
 @keyframes shindo-evidence-backdrop-in{from{opacity:0}to{opacity:1}}
 @keyframes shindo-evidence-dialog-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
 @media(max-width:750px){#shindo-phone-panel .inv-evidence-card{gap:9px;min-height:75px;padding:9px}#shindo-phone-panel .inv-evidence-thumbnail{flex-basis:56px;width:56px;height:66px}#shindo-phone-panel .inv-evidence-chevron{font-size:19px}.shindo-evidence-modal{padding:12px}.shindo-evidence-detail{max-height:calc(100dvh - 24px)}.shindo-evidence-large-image{height:min(34dvh,250px)}.shindo-evidence-detail-name{font-size:18px}.shindo-evidence-detail-body{padding:14px}}
 @media(prefers-reduced-motion:reduce){.shindo-evidence-modal,.shindo-evidence-detail{animation:none!important}}

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
 #shindo-phone-panel .inv-feedback-reset{display:block;width:calc(100% - 32px);max-width:360px;margin:9px auto 0;padding:9px 10px;min-height:36px;box-sizing:border-box;font-size:12px;line-height:1.45;text-align:center;background:#353535;border-color:#868686;color:#f3f3f3}
 @media(max-width:750px){#shindo-phone-panel .inv-shell{gap:10px;padding:12px}#shindo-phone-panel .inv-content{margin-top:7px;padding-top:8px}#shindo-phone-panel .inv-tabs{grid-template-columns:repeat(4,minmax(0,1fr));gap:4px}#shindo-phone-panel .inv-tab{font-size:11px;padding:9px 2px}#shindo-phone-panel .inv-avatar{width:48px;height:60px}#shindo-phone-panel .inv-feedback-reset{width:calc(100% - 20px);padding:9px 8px;font-size:12px}}
 `;
 document.head.appendChild(style);
 // V282: two columns, including narrow-screen phone drawer; no full-width row buttons.
 const v282GridStyle=document.createElement('style');
 v282GridStyle.textContent=`
 #shindo-phone-panel .inv-checkpoint-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:14px 6px 4px;align-items:stretch}
 #shindo-phone-panel .inv-checkpoint-grid .inv-feedback-reset{display:flex;align-items:center;justify-content:center;width:100%;max-width:none;min-width:0;min-height:42px;margin:0;padding:8px 5px;white-space:normal;overflow-wrap:break-word;font-size:11.5px;line-height:1.35;border-radius:7px}
 @media(max-width:750px){#shindo-phone-panel .inv-checkpoint-grid{gap:7px;margin:12px 2px 4px}#shindo-phone-panel .inv-checkpoint-grid .inv-feedback-reset{padding:8px 4px;font-size:11px;min-height:44px}}
 `;
 document.head.appendChild(v282GridStyle);
 panel.innerHTML='<div class="inv-shell"><div><div class="inv-title">기록 보관함</div></div><div class="inv-tabs" role="tablist"><button class="inv-tab" data-tab="evidence" role="tab">증거품</button><button class="inv-tab" data-tab="people" role="tab">친밀도</button><button class="inv-tab" data-tab="history" role="tab">플레이 기록</button><button class="inv-tab" data-tab="feedback" role="tab">피드백</button></div><div class="inv-content" id="shindo-inv-content" role="tabpanel"></div></div>';
 const content=panel.querySelector('.inv-content');let active='evidence';
 function make(tag,klass,txt){const el=document.createElement(tag);if(klass)el.className=klass;if(txt!==undefined)el.textContent=txt;return el}
 function empty(message){content.appendChild(make('p','inv-muted',message))}
 // V211: mount above the phone drawer to avoid clipping by its overflow/transform.
 const evidenceModal=make('div','shindo-evidence-modal');evidenceModal.hidden=true;
 evidenceModal.setAttribute('role','dialog');evidenceModal.setAttribute('aria-modal','true');
 evidenceModal.setAttribute('aria-labelledby','shindo-evidence-detail-name');
 evidenceModal.innerHTML='<div class="shindo-evidence-detail"><div class="shindo-evidence-detail-header"><span>증거품 상세 정보</span><button type="button" class="shindo-evidence-close" aria-label="상세 정보 닫기">×</button></div><div class="shindo-evidence-detail-body"><div class="shindo-evidence-large-image"><img alt="" hidden><div class="shindo-evidence-large-placeholder" hidden>아이템 이미지를 불러올 수 없습니다.</div></div><h2 id="shindo-evidence-detail-name" class="shindo-evidence-detail-name"></h2><div class="shindo-evidence-detail-divider"></div><div class="shindo-evidence-detail-label">상세 정보</div><div class="shindo-evidence-detail-description"></div></div><div class="shindo-evidence-detail-footer"><button type="button">닫기</button></div></div>';
 document.body.appendChild(evidenceModal);
 const detailClose=evidenceModal.querySelector('.shindo-evidence-close');
 let detailReturnFocus=null;
 function closeEvidenceDetail(){
  if(evidenceModal.hidden)return;
  evidenceModal.hidden=true;
  if(detailReturnFocus?.isConnected){detailReturnFocus.focus({preventScroll:true})}
  detailReturnFocus=null;
 }
 function openEvidenceDetail(id,trigger){
  const info=evidenceInfo[id]||{name:id,description:'획득한 증거품'};
  detailReturnFocus=trigger;
  evidenceModal.querySelector('.shindo-evidence-detail-name').textContent=info.name;
  renderEvidenceDescription(evidenceModal.querySelector('.shindo-evidence-detail-description'),EVIDENCE_DETAILS[id]||'상세 정보는 준비 중입니다.');
  const img=evidenceModal.querySelector('.shindo-evidence-large-image img');
  const fallback=evidenceModal.querySelector('.shindo-evidence-large-placeholder');
  img.onload=()=>{img.hidden=false;fallback.hidden=true};
  img.onerror=()=>{img.hidden=true;fallback.hidden=false};
  img.hidden=true;fallback.hidden=true;
  if(EVIDENCE_IMAGES[id]){img.alt=info.name+' 이미지';img.src=EVIDENCE_IMAGES[id]}
  else{img.removeAttribute('src');fallback.hidden=false}
  evidenceModal.hidden=false;
  detailClose.focus({preventScroll:true});
 }
 evidenceModal.addEventListener('click',e=>{e.stopPropagation();if(e.target===evidenceModal)closeEvidenceDetail()});
 detailClose.addEventListener('click',closeEvidenceDetail);
 evidenceModal.querySelector('.shindo-evidence-detail-footer button').addEventListener('click',closeEvidenceDetail);
 document.addEventListener('keydown',e=>{
  if(evidenceModal.hidden)return;
  if(e.key==='Escape'){e.preventDefault();e.stopPropagation();closeEvidenceDetail()}
  else if(e.key==='Tab'){
   const controls=[detailClose,evidenceModal.querySelector('.shindo-evidence-detail-footer button')];
   const ix=controls.indexOf(document.activeElement);
   if(e.shiftKey && ix<=0){e.preventDefault();controls[controls.length-1].focus()}
   else if(!e.shiftKey && ix===controls.length-1){e.preventDefault();controls[0].focus()}
  }
 },true);
 function evidence(){
  const items=ownedEvidenceIds();
  if(!items.length){empty('아직 획득한 증거품이 없습니다.');return}
  items.forEach(id=>{
   const info=evidenceInfo[id]||{name:id,description:'획득한 증거품'};
   const card=make('button','inv-card inv-evidence-card');card.type='button';
   card.setAttribute('aria-label',info.name+' 상세 정보 보기');
   const thumbnail=make('div','inv-evidence-thumbnail');
   if(EVIDENCE_IMAGES[id]){
    const img=make('img');img.src=EVIDENCE_IMAGES[id];img.alt=info.name;img.loading='lazy';
    img.onerror=()=>{img.replaceWith(make('div','inv-evidence-thumbnail-fallback','이미지 없음'))};
    thumbnail.append(img);
   }else thumbnail.append(make('div','inv-evidence-thumbnail-fallback','이미지 없음'));
   const body=make('div','inv-evidence-text');
   body.append(make('div','inv-item-name',info.name),make('div','inv-muted inv-item-description',info.description),make('div','inv-evidence-open','눌러서 자세히 보기'));
   card.append(thumbnail,body,make('span','inv-evidence-chevron','›'));
   card.addEventListener('click',e=>{e.stopPropagation();openEvidenceDetail(id,card)});
   content.append(card);
  });
 }
 function people(){const values=getAffinity();const unread=new Set(getUnread());PEOPLE.forEach(([name,portrait])=>{
  const known=isMet(name);
  const score=Math.max(0,Math.min(100,Number(values[name])||0));
  const card=make('div','inv-card inv-person');
  if(unread.has(name) && known){
   card.classList.add('shindo-affinity-unread');
   card.setAttribute('role','button');
   card.setAttribute('tabindex','0');
   card.setAttribute('aria-label',name+' 친밀도 변경 확인');
   card.addEventListener('click',()=>acknowledgeAffinity(name));
   card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();acknowledgeAffinity(name)}});
  }
  if(known&&portrait){const img=make('img','inv-avatar');img.src='story-portraits/'+portrait;img.alt=name+' 프로필';img.loading='lazy';img.onerror=()=>{img.replaceWith(make('div','inv-avatar inv-avatar-unknown','??'))};card.append(img)}
  else{card.append(make('div','inv-avatar inv-avatar-unknown',known?'??':'??'))}
  const main=make('div','inv-person-main'),top=make('div','inv-person-top');
  const frozen=isAffinityLocked(name);
  top.append(make('span','',known?name:'??'),make('span','inv-person-score',known?(score+' / 100'+(frozen?' · 🔒 잠금':'')):'??'));
  const meter=make('div','inv-meter'),fill=make('div','inv-fill');fill.style.width=known?score+'%':'0%';
  meter.append(fill);main.append(top,meter);card.append(main);content.append(card)
 })}
 function history(){
  const saved=load(HISTORY,[]);const records=(Array.isArray(saved)?saved:[]).map(r=>({...r,label:String(r.label||'').replace(/고해(?:실|소)/g,'고해소')}));
  // Reconstruct only known saved selections. Do not fabricate missing clicks or timestamps.
  const past=[
   ['shindo_day2_prayer',['','새벽기도 참석','새벽기도 불참'],'새벽기도 선택',2],
   ['shindo_confession_branch',['','긍정적 발언','사제 포섭 시도'],'고해소 선택',1],
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
   if(/고해(?:실|소) 선택/.test(r.label||''))return 1;
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
 function feedback(){
 empty('피드백 및 이미지 배치 확인 도구입니다. 아래 버튼에서 진행 지점을 선택할 수 있습니다.');
 const simButton=make('button','inv-feedback','PC · 모바일 이미지 배치 시뮬레이터');
 simButton.type='button';simButton.addEventListener('click',()=>{const url=new URL('image-simulator.html',window.location.href).href;window.open(url,'_blank','noopener')});content.append(simButton);
 const btn=make('button','inv-feedback','피드백 페이지 열기');btn.type='button';
 btn.addEventListener('click',()=>{if(typeof window.SHINDO_openFeedback!=='function'){empty('현재 피드백 페이지를 열 수 없습니다.');return}drawer.classList.remove('is-open');document.getElementById('shindo-phone-toggle')?.setAttribute('aria-expanded','false');window.SHINDO_openFeedback()});content.append(btn);
 const options=[
  ['초기화','reset'],
  ['1일차 도입','day1_intro'],
  ['1일차 본당','day1_sanctuary'],
  ['1일차 고해소','day1_confession'],
  ['2일차 도입','day2_intro'],
  ['2일차 공양제','day2_offering'],
  ['2일차 오전활동','day2_morning'],
  ['2일차 고해소','day2_confession'],
  ['2일차 접선','day2_contact'],
  ['2일차 오후활동','day2_afternoon'],
  ['3일차 도입','day3_intro'],
  ['3일차 도입(조슈아 만남)','day3_joshua'],
  ['3일차 공양제','day3_offering'],
  ['3일차 오전활동','day3_morning'],
  ['3일차 고해소','day3_confession'],
  ['3일차 오후활동','day3_afternoon']
 ];
 const grid=make('div','inv-checkpoint-grid');
 for(const [label,id] of options){
  const restart=make('button','inv-feedback inv-feedback-reset',label);restart.type='button';
  restart.setAttribute('data-checkpoint',id);
  restart.addEventListener('click',()=>{
   if(typeof window.SHINDO_restartFromCheckpointV282!=='function'){
    window.alert('재시작 기능을 불러오지 못했습니다.');return;
   }
   const legacyNote=id.startsWith('day3_')&&window.SHINDO_hasDay3RestartSnapshot?.()===false
    ?'\n\n이전 저장에는 3일차 시작 상태가 없을 수 있습니다. 그 경우 친밀도와 증거품을 임의로 역산하지 않고 장면만 이동합니다.' : '';
   const detail=id==='reset'?'게임 스토리 진행 기록을 초기화하고 첫 도입으로 돌아갑니다.':
    '이 지점으로 테스트 이동하며 건너뛴 장면의 보상이나 증거품을 자동 지급하지 않습니다.';
   if(!window.confirm(label+' — 이동할까요?\n'+detail+legacyNote))return;
   const result=window.SHINDO_restartFromCheckpointV282(id);
   if(result!==true){window.alert('해당 장면을 찾지 못해 이동하지 않았습니다.');return}
   drawer.classList.remove('is-open');document.getElementById('shindo-phone-toggle')?.setAttribute('aria-expanded','false');
  });
  grid.append(restart);
 }
 content.append(grid);
}
function render(){panel.querySelectorAll('.inv-tab').forEach(b=>{b.setAttribute('aria-selected',String(b.dataset.tab===active))});refreshUnreadIndicators();content.replaceChildren();({evidence,people,history,feedback})[active]()}
 panel.querySelectorAll('.inv-tab').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();closeEvidenceDetail();active=b.dataset.tab;render()}));
 document.addEventListener('shindo-inventory-change',render);
 document.getElementById('shindo-phone-putaway')?.addEventListener('click',closeEvidenceDetail);
 document.getElementById('shindo-phone-toggle')?.addEventListener('click',()=>{render()});
 window.addEventListener('storage',render);render();
})();
