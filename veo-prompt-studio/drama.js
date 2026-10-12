const CONFIG = { url: 'https://pxzerharmpbxvmuomsfo.supabase.co', anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXAiLCJyZWYiOiJweHplcmhhcm1wYnh2bXVvbXNmbyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzkwODQwLCJleHAiOjIxMDY0MTYyNDh9.9O5gSipGaZ66XSnp9FjI9tkIvcir3XZnvp6JBNyPV4A' };
CONFIG.anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4emVyaGFybXBieHZtdW9tc2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NDAyNDAsImV4cCI6MjEwNjQxNjI0MH0.9O5gSipGaZ66XSnp9FjI9tkIvcir3XZnvp6JBNyPV4A';
const $ = id => document.getElementById(id);
const STORY_MODES = ['비밀을 추적하는 미스터리', '엇갈린 기억의 로맨스', '상처를 회복하는 성장극', '관계를 시험하는 휴먼 드라마', '시간 제한이 있는 스릴러', '현실과 환상이 겹치는 판타지'];
const CLIP_BEATS = ['강한 도입 이미지와 인물의 즉각적 목표', '작은 단서 또는 관계의 균열', '행동으로 드러나는 갈등', '예상 밖의 정보 또는 감정 전환', '선택을 강요하는 압박', '감정이 꺾이거나 깊어지는 반응', '다음 편을 부르는 결정적 행동', '마지막 1초의 훅'];
const NAME_HEADS = ['가온', '노을', '다온', '라온', '루아', '마린', '미온', '보름', '새론', '소담', '시온', '아린', '여울', '유담', '이든', '자온', '채온', '하린'];
const NAME_TAILS = ['결', '린', '온', '솔', '담', '율', '윤', '람', '빈', '별', '하', '루'];
const RANDOM_KEYWORD_SETS = [
  ['환생', '쌍둥이 남매', '숨겨진 신분', '궁중 복수', '냉정한 장군'],
  ['계약결혼', '가짜 신분', '재벌가 상속', '복수', '숨겨진 아이'],
  ['천재 의사', '가문 몰락', '잃어버린 딸', '첫사랑', '반격'],
  ['시간 회귀', '무너진 약혼', '가족의 배신', '새로운 동맹', '명예 회복'],
  ['도망친 신부', '비밀스러운 CEO', '유산', '질투하는 자매', '진실 폭로'],
  ['마법 능력', '왕실의 비밀', '가짜 후계자', '운명적 동맹', '구원']
];
const RANDOM_TONES = ['사이다 복수와 가족 감정이 공존하는 세로형 연속극', '고밀도 로맨스와 신분 반전', '긴장감 있는 궁중 판타지와 감정 드라마', '따뜻한 가족 회복과 통쾌한 반격', '강한 엔딩 훅이 이어지는 현대 멜로 스릴러'];
const STORY_VARIANTS = [
  { id: 'hidden-letter', premise: '사라진 편지 한 통이 현재의 관계를 되돌리는 출발점이 된다', conflict: '편지를 먼저 읽은 사람이 진실의 일부를 숨긴다', twist: '편지는 과거의 고백이 아니라 미래를 막으려는 경고였다', ending: '두 사람은 편지를 태우지 않고 함께 마지막 문장을 완성한다' },
  { id: 'borrowed-time', premise: '단 하루만 되돌릴 수 있는 기회가 주어진다', conflict: '시간을 되돌릴수록 두 사람의 공통 기억 하나가 사라진다', twist: '기회를 만든 사람은 상대역이 아니라 주인공 자신이었다', ending: '잃어버린 기억 대신 오늘의 선택을 기록하며 끝낸다' },
  { id: 'sealed-room', premise: '닫혀 있던 장소가 키워드와 연결된 흔적을 드러낸다', conflict: '문을 열려면 두 사람 중 한 명의 비밀을 공개해야 한다', twist: '장소는 감춰진 공간이 아니라 둘의 기억을 재현하는 장치였다', ending: '문을 연 뒤에도 떠나지 않고 서로의 곁에 남는다' },
  { id: 'wrong-sender', premise: '주인공에게 온 메시지가 사실은 다른 사람에게 보내진 것이었다', conflict: '메시지의 수신자를 찾는 과정에서 관계가 의심받는다', twist: '보낸 이는 둘을 갈라놓으려는 사람이 아니라 두 사람의 과거였다', ending: '메시지의 답장을 함께 쓰며 새로운 시작을 선택한다' },
  { id: 'last-recording', premise: '멈춰 있던 녹음 파일이 매일 다른 문장을 재생한다', conflict: '마지막 문장을 들으면 누군가를 떠나보내야 한다', twist: '녹음 속 목소리는 사라진 인물이 아니라 주인공의 미래 목소리였다', ending: '마지막 재생을 멈추고 직접 상대에게 진심을 말한다' },
  { id: 'quiet-bargain', premise: '작은 부탁 하나가 두 사람만의 위험한 약속으로 바뀐다', conflict: '약속을 지키면 목표를 잃고, 깨면 관계를 잃는다', twist: '상대역은 처음부터 주인공을 시험한 것이 아니라 보호하고 있었다', ending: '조건 없는 선택으로 약속의 의미를 새로 쓴다' },
  { id: 'missing-object', premise: '사라진 물건 하나가 키워드와 얽힌 오래된 사건을 깨운다', conflict: '물건을 찾을수록 서로 다른 기억이 충돌한다', twist: '물건은 잃어버린 증거가 아니라 관계를 끊으려 했던 선택의 흔적이다', ending: '물건을 제자리에 두고 두 사람은 다른 길을 함께 걷는다' },
  { id: 'two-versions', premise: '같은 사건을 전혀 다르게 기억하는 두 사람이 마주한다', conflict: '한 사람의 기억을 믿는 순간 다른 한 사람을 배신하게 된다', twist: '두 기억 모두 맞지만, 누군가 중요한 순간을 의도적으로 비워 두었다', ending: '정답 대신 서로의 기억을 받아들이며 관계를 회복한다' }
];
const SCRIPT_STYLES = {
  'korean-short': { label: '한국형 감정 드라마', rhythm: '인물의 감정과 선택을 충분히 보여 주되, 장면마다 다음 장면으로 이어지는 작은 질문을 남긴다.', instruction: 'Naturalistic Korean short-drama pacing: grounded reactions, emotionally precise dialogue, and restrained but clear turns.' },
  'koreanized-cdrama': { label: '중국 숏드라마식 한국화', rhythm: '각 회차 첫 3초 안에 전 회차의 질문을 이어받아 새로운 압박을 보여 주고, 중간에는 억울함·모함·신분의 단서·반격 중 하나를 행동으로 전환한다. 회차 끝은 다음 화에서 답이 필요한 질문 또는 선택으로 끝낸다. 단, 한국 현대극의 자연스러운 대사와 현실적인 감정선을 유지한다.', instruction: 'High-density Korean-localized vertical mini-drama pacing: resolve or complicate the prior cliffhanger in the opening seconds, create one concrete escalation or reversal, and end on a new unanswered stake. Original Korean setting only; use genre conventions without imitating any named Chinese drama, actor, script, or existing work.' }
};
const DEFAULT_SCRIPT_STYLE = 'koreanized-cdrama';
const GEMINI_STORAGE_KEY = 'tailframe-gemini-api-key';
const GEMINI_MODEL = 'gemini-2.5-flash';
const PRODUCTION_FORMATS = {
  drama: { label: '실사 한국 드라마', visual: 'grounded live-action Korean drama', direction: '현실적인 동선, 절제된 표정 연기, 소품과 침묵으로 감정을 보여 준다', audio: '현장음과 절제된 음악으로 감정의 빈자리를 남긴다' },
  animation: { label: '애니메이션 시리즈', visual: 'original cinematic animation series', direction: '인물의 동작과 상징적인 소품을 명료하게 보여 주되, 기존 애니메이션 작품의 화풍이나 캐릭터를 모방하지 않는다', audio: '행동과 감정을 돕는 절제된 효과음과 연속적인 음악 동기를 사용한다' },
  film: { label: '영화형 시네마틱 시리즈', visual: 'cinematic Korean film chapter', direction: '장면마다 하나의 시각적 은유와 명확한 카메라 동선을 사용해 영화적 여운을 만든다', audio: '공간감 있는 현장음과 최소한의 음악으로 긴장과 여운을 만든다' }
};
let dbClient = null, userId = null, archive = [], current = null, openedFromArchive = false;
let geminiApiKey = localStorage.getItem(GEMINI_STORAGE_KEY) || '';
const normal = value => String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
const hasFinalConsonant = value => { const code = String(value || '').trim().charCodeAt(String(value || '').trim().length - 1); return code >= 0xAC00 && code <= 0xD7A3 && (code - 0xAC00) % 28 !== 0; };
const topic = value => `${value}${hasFinalConsonant(value) ? '은' : '는'}`;
const object = value => `${value}${hasFinalConsonant(value) ? '을' : '를'}`;
const withWord = value => `${value}${hasFinalConsonant(value) ? '과' : '와'}`;
const subject = value => `${value}${hasFinalConsonant(value) ? '이' : '가'}`;
const localKey = () => `tailframe-drama-archive:${userId || 'signed-out'}`;
const setSync = (text, online = false) => { $('sync-status').textContent = text; $('sync-status').parentElement.classList.toggle('online', online); };
const readLocal = () => { try { const data = JSON.parse(localStorage.getItem(localKey()) || '[]'); return Array.isArray(data) ? data : []; } catch { return []; } };
const writeLocal = items => localStorage.setItem(localKey(), JSON.stringify(items));
const splitKeywords = text => [...new Set(String(text || '').split(/[\n,/#]+/).map(v => v.trim()).filter(Boolean))];
const randomItem = list => list[Math.floor(Math.random() * list.length)];
function randomDramaInputs() { return { keys: [...randomItem(RANDOM_KEYWORD_SETS)].sort(() => Math.random() - .5), tone: randomItem(RANDOM_TONES) }; }
function setGeminiStatus(text) { const node = $('gemini-status'); if (node) node.textContent = text; }
function extractJson(text) { const cleaned = String(text || '').replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim(); return JSON.parse(cleaned); }
async function callGeminiJson(instruction, maxOutputTokens = 16000) {
  if (!geminiApiKey) throw new Error('Google AI Studio API 키를 먼저 저장해 주세요.');
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(geminiApiKey)}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: instruction }] }], generationConfig: { responseMimeType: 'application/json', temperature: 1, maxOutputTokens } })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || `Gemini 요청 실패 (${response.status})`);
  const text = data?.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('') || '';
  if (!text) throw new Error('Gemini이 응답 내용을 반환하지 않았습니다. 무료 티어 한도를 확인해 주세요.');
  return extractJson(text);
}
function aiSeriesPrompt(keys, tone, seconds, format) {
  const formatName = (PRODUCTION_FORMATS[format] || PRODUCTION_FORMATS.drama).label;
  return `You are a Korean vertical microdrama showrunner. Create an ORIGINAL ${formatName} series production bible and episode plan in Korean. Do not imitate or reference any existing drama, film, animation, actor, celebrity, franchise, or copyrighted character. The audience is TikTok/Google Flow. Keywords: ${keys.join(', ') || 'random original premise'}. Tone: ${tone || 'high-stakes Korean-localized vertical microdrama'}. Each episode is approximately ${seconds} seconds. Create exactly 30 episodes. Every episode must have a different concrete incident, a changed relationship state, and a non-repeating cliffhanger. Use an ensemble of 6 original characters: two leads, confidant, rival, secret keeper, wildcard. Return JSON only: {"title":"","logline":"","seriesBible":"","characters":[{"name":"","role":"","goal":"","secret":""}],"episodes":[{"number":1,"title":"","openingHook":"","goal":"","incident":"","relationshipTurn":"","endingHook":""}]}.`;
}
function aiEpisodePrompt() {
  const savedEpisode = current?.episodes?.[current.aiEpisodeNumber - 1];
  const outline = current?.aiPlan?.episodes?.find(item => item.number === current.aiEpisodeNumber) || savedEpisode?.aiOutline || {};
  const cast = current?.aiPlan?.characters || Object.entries(current?.cast || {}).map(([role, name]) => ({ name, role }));
  return `You are a Korean vertical microdrama screenwriter and Google Flow prompt director. Write ONE original episode in Korean from the approved series plan below. Do not copy any existing work. Keep all character names, relationships, continuity, props, setting, and unresolved conflicts consistent. The episode must have natural, specific dialogue that advances this exact incident; do not reuse generic phrases. Return JSON only: {"screenplay":"full Korean screenplay for this episode, with concise action and speaker-labelled dialogue","clips":[{"action":"Korean action and continuity note","leadLine":"speaker — Korean line","counterpartLine":"speaker — Korean line","thirdLine":"optional speaker — Korean line","flowPrompt":"detailed English Google Flow 9:16 video prompt, include exact actions, Korean dialogue, sound, continuity from prior clip and no subtitles"}]}. Series bible: ${current.aiPlan?.seriesBible || current.script || ''}. Cast: ${JSON.stringify(cast)}. Episode outline: ${JSON.stringify(outline)}. Episode length: ${current.duration_seconds} seconds and ${savedEpisode?.clips?.length || 4} clips.`;
}
const episodeCountFor = keys => Math.max(30, 28 + Math.ceil(keys.length / 2));
const clipCountFor = seconds => seconds === 30 ? 4 : seconds === 45 ? 6 : 8;
function makeOriginalName(used = new Set()) { let name = ''; do { name = `${NAME_HEADS[Math.floor(Math.random() * NAME_HEADS.length)]}${NAME_TAILS[Math.floor(Math.random() * NAME_TAILS.length)]}`; } while (used.has(name)); used.add(name); return name; }
function signatureFor(keys, tone, seconds, mode, cast, style, format) { return [keys.map(normal).sort().join('|'), normal(tone), seconds, mode, style, format, cast.lead, cast.counterpart].join('::'); }
function keywordKey(keys, tone, seconds) { return [keys.map(normal).sort().join('|'), seconds].join('::'); }
function usedVariantIds(keys, tone, seconds) {
  const key = keywordKey(keys, tone, seconds);
  return new Set(archive.filter(item => keywordKey(String(item.keywords || '').split(/,\s*/), item.tone || '', item.duration_seconds || seconds) === key)
    .map(item => item.story_variant || (String(item.script || '').match(/\[기획 코드: ([^\]]+)\]/) || [])[1]).filter(Boolean));
}
function titleFor(keys, mode) {
  const [a = '비밀', b = '약속'] = keys;
  const endings = ['의 밤', '의 계절', '에게 남긴 이름', '이 멈춘 날', '이 돌아온 순간', '의 마지막 선택', '을 건너는 법', '이 들려준 진실'];
  const templates = [`${a}${endings[Math.floor(Math.random() * endings.length)]}`, `${b}${endings[Math.floor(Math.random() * endings.length)]}`, `${a}와 ${b}`, `${a}를 품은 ${b}`, `${b}가 부른 ${a}`];
  let candidate = templates[Math.floor(Math.random() * templates.length)];
  const used = new Set(archive.map(item => normal(item.title)));
  let retries = 0;
  while (used.has(normal(candidate)) && retries++ < 12) candidate = `${templates[Math.floor(Math.random() * templates.length)]} ${['첫 번째', '낯선', '숨은', '다시 온'][Math.floor(Math.random() * 4)]} 이야기`;
  return candidate;
}
function hasKeyword(keys, pattern) { return pattern.test(keys.join(' ')); }
function buildMicroDramaBlueprint(keys, cast) {
  const historical = hasKeyword(keys, /궁|왕|황|장군|전생|환생|무림|사극|조선|고려/);
  const children = hasKeyword(keys, /아이|아기|쌍둥이|딸|아들|육아|가족/);
  const revenge = hasKeyword(keys, /복수|배신|모함|억울|상속|재벌|신분|가문/);
  const romance = hasKeyword(keys, /결혼|사랑|연인|약혼|로맨스|남편|아내/);
  const setting = historical ? '가상의 한국풍 궁중·가문 세계. 계급과 가문은 갈등의 장치이며, 실제 역사 인물·사건을 재현하지 않는다.' : '현대 한국을 배경으로 한 가상의 상류층·직장·가족 세계.';
  const hooks = [historical ? '숨겨진 출생과 가문의 명분' : '숨겨진 신분과 재산·명예의 충돌', revenge ? '모함을 증거와 행동으로 뒤집는 반격' : '믿었던 관계의 배신과 회복', romance ? '위험한 상황에서 깊어지는 두 주연의 동맹과 감정' : '주연 사이의 신뢰와 의심의 반복', children ? '아이의 시선이 어른들의 거짓말을 드러내는 가족 축' : '조연의 비밀이 주연의 선택을 뒤집는 관계 축'];
  const roles = {
    lead: `${revenge ? '모함을 뒤집고 자기 자리를 되찾아야 하는' : '자신의 삶을 다시 선택해야 하는'} 중심 인물`,
    counterpart: `${historical ? '권력과 책임을 동시에 지닌' : '사회적 영향력과 비밀을 지닌'} 공동 주연`,
    confidant: children ? '주인공 편에 서지만 어른들의 거짓말을 먼저 알아차리는 가족 조연' : '주인공의 가장 가까운 편이지만 사실과 증거를 먼저 믿는 핵심 조연',
    rival: `${revenge ? '주인공의 자리와 명예를 빼앗으려는' : '같은 목표를 두고 경쟁하는'} 핵심 대립 조연`,
    guardian: '과거의 선택과 출생의 비밀을 알고 있는 조연',
    wildcard: '중반 이후 새로운 증거나 거래를 들고 와 판을 바꾸는 조연'
  };
  return { setting, hooks, roles, hookRule: '매 회차는 첫 3초에 직전 훅의 결과를 행동으로 보여 주고, 한 개의 관계 축을 악화 또는 역전시킨 뒤, 마지막 1초에는 다음 회차에서만 답할 수 있는 새로운 선택을 남긴다.' };
}
const SERIAL_INCIDENTS = [
  '봉인된 장부에서 지워진 이름을 발견한다', '공개된 자리에서 뒤바뀐 증언이 나온다', '사라진 물건이 전혀 다른 사람의 손에서 발견된다', '익명의 메시지가 다음 만남의 장소를 지정한다',
  '가족회의에서 숨겨진 거래가 폭로된다', '오래된 영상과 현재의 기억이 충돌한다', '위조된 문서의 날짜가 사건을 뒤집는다', '누군가가 일부러 끊어 둔 연락 기록이 복원된다',
  '가장 믿었던 사람이 상대편에 서 있는 장면을 목격한다', '주인공의 이름으로 위험한 약속이 체결돼 있다', '감춰 둔 아이의 그림이 과거의 장소를 가리킨다', '상대역의 방에서 같은 물건의 두 번째 조각을 찾는다',
  '라이벌이 공개적으로 선택을 강요한다', '비밀을 아는 사람이 입을 열기 직전 사라진다', '회복될 수 없던 관계에 새로운 증인이 나타난다', '가문의 오래된 규칙이 주인공에게만 적용된다',
  '돌아온 사람이 과거와 전혀 다른 조건을 내건다', '보호하려던 사람이 사실 가장 큰 위험에 놓인다', '결정적인 증거가 거짓처럼 보이도록 조작된다', '마지막 순간, 진짜 목적을 알고 있던 인물이 모습을 드러낸다'
];
const DIALOGUE_GOALS = {
  lead: ['사실을 직접 확인하겠다고 선언한다', '더 이상 희생양이 되지 않겠다고 선을 긋는다', '상대의 침묵에 답을 요구한다', '잃더라도 자기 선택을 하겠다고 말한다', '가장 아픈 기억을 인정하고 앞으로 나아간다', '증거보다 사람을 먼저 지키겠다는 결심을 드러낸다'],
  counterpart: ['감춘 이유를 일부만 고백한다', '주인공을 막으면서도 떠나지 못한다', '자신이 감당할 대가를 받아들인다', '관계보다 먼저 해결해야 할 비밀을 인정한다', '주인공에게 선택권을 돌려준다', '처음으로 편을 명확히 정한다'],
  confidant: ['감정 대신 확인할 사실을 제시한다', '주인공이 놓친 연결고리를 짚는다', '두 주연이 피한 질문을 꺼낸다', '위험을 감수하고 증거를 맡는다'],
  rival: ['주인공의 약점을 공개적으로 건드린다', '거래처럼 보이는 제안을 던진다', '둘의 신뢰를 갈라놓을 말 한마디를 고른다', '이겼다고 믿는 순간의 속내를 드러낸다'],
  guardian: ['과거를 덮은 자신의 책임을 인정한다', '다음 선택에 필요한 대가를 경고한다', '감춰 둔 진실의 일부를 내놓는다'],
  wildcard: ['누구도 예상하지 못한 조건을 제시한다', '판을 뒤집을 증거의 출처를 밝힌다', '누구의 편도 아니라는 사실을 행동으로 보인다']
};
const pickSeeded = (list, seed) => list[Math.abs(seed) % list.length];
function episodeIncident(number, keys) {
  const focus = keys[(number - 1) % keys.length];
  const pressure = keys[number % keys.length];
  const incident = pickSeeded(SERIAL_INCIDENTS, number * 7 + keys.join('').length);
  return { focus, pressure, incident, object: `${focus}와 ${pressure}의 연결` };
}
function serializedDialogue(role, number, clip, phase, incident, cast) {
  const aim = pickSeeded(DIALOGUE_GOALS[role], number * 11 + clip * 3 + incident.focus.length);
  const character = cast[role];
  const clauses = {
    lead: [`“${incident.incident}. 이제 ${incident.focus}을 숨기는 쪽에 서지 않겠어.”`, `“${incident.pressure} 때문에 또 물러나라는 말은 하지 마. ${aim}.”`, `“${incident.object}을 확인하기 전에는 누구도 믿지 않겠어. 그래도 ${character}의 선택은 내가 할게.”`],
    counterpart: [`“${incident.incident}는 내가 막으려 했던 일이야. 하지만 ${aim}.”`, `“${incident.focus}의 진실을 말하면 네가 다칠 수 있어. 그래도 이번에는 숨기지 않겠어.”`, `“${incident.pressure}을 피하려고 널 밀어냈어. 이제는 네가 결정해.”`],
    confidant: [`“${incident.incident}은 우연이 아니야. ${incident.object}을 확인해야 해.”`, `“둘 다 멈춰. ${incident.pressure}을 먼저 건드린 사람이 이 판을 설계했어.”`, `“${aim}. 그러니 증거는 내가 들고 있을게.”`],
    rival: [`“${incident.incident}을 보고도 네가 이길 수 있다고 믿어?”`, `“${incident.focus}을 원하면 ${incident.pressure}을 포기해. 그게 내가 주는 마지막 선택이야.”`, `“${aim}. 네가 망설인 순간부터 이미 늦었어.”`],
    guardian: [`“${incident.incident}은 내가 오래전 묻어 둔 일이다. ${aim}.”`, `“${incident.focus}의 값은 생각보다 크다. 그래도 지금 말하지 않으면 더 많은 사람이 다친다.”`, `“${incident.pressure}을 막으려면 과거의 거짓말부터 끝내야 한다.”`],
    wildcard: [`“${incident.incident}을 찾은 건 나야. ${aim}.”`, `“${incident.object}은 내가 넘기지. 대신 모두가 보는 앞에서 진실을 말해.”`, `“${incident.pressure}은 네가 생각한 적이 아니야. 이제부터 조건은 내가 정한다.”`]
  };
  return `${pickSeeded(clauses[role], number * 5 + clip)} — ${character}`;
}
function episodeArc(index, total) {
  if (index === 1) return '세계관과 주인공의 결핍을 보여 주고, 피할 수 없는 사건을 시작한다.';
  if (index === total) return '처음의 결핍을 다른 선택으로 마주하고, 감정적 결말과 여운을 남긴다.';
  if (index === Math.ceil(total / 2)) return '사건의 진짜 의미를 뒤집는 중간 반전을 드러낸다.';
  return '새 단서가 관계를 흔들고, 주인공이 더 큰 대가를 치르는 선택을 하게 한다.';
}
function seasonArc(total, variant, cast) {
  const boundary = ratio => Math.max(1, Math.min(total, Math.ceil(total * ratio)));
  const ranges = [[1, boundary(.16), '발단', variant.premise], [boundary(.16) + 1, boundary(.42), '추적과 확장', variant.conflict], [boundary(.42) + 1, boundary(.66), '중반 반전', variant.twist], [boundary(.66) + 1, total - 1, '반격과 결전', `${cast.lead}과 ${cast.counterpart}가 감춘 대가를 선택으로 증명한다`], [total, total, '결말', variant.ending]];
  return ranges.filter(([start, end]) => start <= end).map(([start, end, name, text]) => `${start === end ? `${start}화` : `${start}~${end}화`} · ${name}: ${text}`).join('\n');
}
function makeEpisodePlan(number, total, keys, variant, cast, clipCount) {
  const focus = keys[(number - 1) % keys.length];
  const pressure = keys[number % keys.length];
  const progress = (number - 1) / Math.max(1, total - 1);
  const phase = number === 1 ? '시작' : number === total ? '결말' : progress < .16 ? '추적' : progress < .42 ? '확장' : progress < .66 ? '반전' : '위기';
  const phaseData = {
    시작: { goal: `${withWord(focus)} 관련된 흔적의 의미를 확인한다`, turn: variant.premise, hook: `${pressure}에 대한 첫 단서가 예상 밖의 인물에게 닿는다` },
    추적: { goal: `${focus}의 출처를 따라 진실에 가까워진다`, turn: variant.conflict, hook: `상대가 숨긴 선택 때문에 두 사람의 신뢰가 흔들린다` },
    확장: { goal: `${withWord(focus)} 얽힌 이해관계를 드러내고 동맹과 의심을 가른다`, turn: '작은 단서가 개인의 비밀이 아니라 더 큰 관계의 거래였음이 드러난다', hook: `주인공이 믿어 온 편이 가장 위험한 선택을 요구한다` },
    반전: { goal: `서로 다른 기억을 대조해 사건의 빈칸을 채운다`, turn: variant.twist, hook: `지금까지 믿었던 사실이 거꾸로 읽힌다` },
    위기: { goal: `${object(focus)} 포기할지, 관계를 지킬지 결정한다`, turn: '가장 가까운 사람이 가장 아픈 진실을 꺼낸다', hook: `결정의 대가가 바로 다음 회차에 닥친다` },
    결말: { goal: `처음의 상처를 외면하지 않고 새로운 선택을 한다`, turn: variant.ending, hook: '두 사람은 잃어버린 답 대신 앞으로의 약속을 고른다' }
  }[phase];
  const serial = episodeIncident(number, keys);
  const carryOver = number === 1 ? `${serial.incident}. 평범했던 일상에 처음 균열이 생긴다.` : `${number - 1}화 마지막 질문의 결과로 ${serial.incident}.`;
  const actions = [
    `${carryOver} ${topic(cast.lead)} ${withWord(focus)} 연결된 작은 흔적을 발견하고, 아무에게도 말하지 않은 이유를 떠올린다.`,
    `${topic(cast.counterpart)} 그 흔적을 숨기려 하지만, ${topic(cast.lead)} 이미 달라진 표정을 놓치지 않는다.`,
    `두 사람은 같은 기억을 서로 다르게 말하며, ${subject(pressure)} 사건의 중심에 있음을 깨닫는다.`,
    `${topic(cast.lead)} 피하지 않고 직접 확인하겠다고 말하고, ${topic(cast.counterpart)} 잠시 망설인 뒤 길을 연다.`,
    `확인된 단서는 이전 선택을 완전히 다른 의미로 바꾸고, 두 사람 사이에 조용한 긴장이 흐른다.`,
    `${topic(cast.counterpart)} 감추고 있던 대가를 털어놓고, ${topic(cast.lead)} 그 말을 끝까지 듣는다.`,
    `${topic(cast.lead)} 관계를 끊는 대신 진실을 택할 수 있었지만, 다른 선택을 하기로 결심한다.`,
    `마지막 순간, ${phaseData.hook}.`
  ];
  const exchanges = [
    [`“왜 이제야 이 흔적을 보여 준 거야?”`, `“내가 준비될 때까지 기다렸어. 하지만 더는 미룰 수 없어.”`],
    [`“네가 숨긴 건 물건이 아니라 이유였지?”`, `“맞아. 그 이유를 말하면 네가 나를 떠날까 봐.”`],
    [`“우리가 기억하는 그날이 정말 같은 날이었을까?”`, `“아니. 누군가 우리에게 다른 이야기를 남겼어.”`],
    [`“그 문을 열면 되돌아갈 수 없을 거야.”`, `“그래도 열어야 해. 모른 척한 시간도 이제 끝낼래.”`],
    [`“이 단서가 맞다면, 내가 믿었던 사람이 틀린 거야.”`, `“틀린 건 네가 아니라, 네가 들은 이야기였어.”`],
    [`“처음부터 말했으면 덜 아팠을까?”`, `“아마 더 아팠겠지. 그래도 지금은 거짓말보다 나아.”`],
    [`“진실을 택하면 우리 사이도 끝날 수 있어.”`, `“끝나더라도 네가 혼자 남게 두진 않을게.”`],
    [`“이제 선택해. 여기서 멈출지, 끝까지 갈지.”`, `“끝까지 갈게. 이번에는 내 발로.”`]
  ];
  const leadVariations = [
    `“${object(focus)} 더는 모른 척하지 않을 거야.”`, `“이번에는 내가 먼저 확인할게.”`, `“네가 숨긴 이유까지 듣고 판단하겠어.”`, `“두려워도 여기서 돌아가진 않아.”`,
    `“내가 잃은 시간을 되찾겠다는 뜻은 아니야.”`, `“진실이 아프더라도 내 선택은 달라지지 않아.”`, `“네 말보다 네가 망설인 순간을 믿을게.”`, `“이번에는 누구도 혼자 두지 않겠어.”`,
    `“이 단서가 끝이 아니라 시작이라는 걸 알아.”`, `“나를 위한 거짓말이라도 이제는 필요 없어.”`, `“우리가 다른 기억을 가졌다면, 같이 맞춰 보면 돼.”`, `“끝까지 듣고, 그다음에 떠날지 결정할게.”`
  ];
  const counterpartVariations = [
    `“${object(focus)} 꺼내면 모든 것이 달라질 수 있어.”`, `“내가 침묵한 건 널 속이려는 마음만은 아니었어.”`, `“지금의 널 지키려다 과거의 너를 놓쳤어.”`, `“네가 원한다면 더는 숨기지 않을게.”`,
    `“그날의 진실은 하나가 아니야.”`, `“네가 나를 미워해도, 이 문은 함께 열어야 해.”`, `“내가 먼저 말하지 못한 건 비겁해서였어.”`, `“이번만큼은 네 선택을 막지 않겠어.”`,
    `“그 단서는 네가 생각하는 사람을 가리키지 않아.”`, `“나도 답을 찾고 있었어. 혼자였을 뿐이야.”`, `“네가 떠나도 이해해. 그래도 사실은 남길게.”`, `“마지막까지 네 편이 되고 싶어.”`
  ];
  const supporterVariations = [
    `“둘 다 감정으로 결정하지 마. 지금 필요한 건 확인할 시간뿐이야.”`, `“내가 본 장면은 네가 들은 이야기와 달라.”`, `“그 물건을 찾는 사람은 너희 둘만이 아니야.”`, `“한 사람씩 말해. 그래야 숨긴 말이 보일 거야.”`,
    `“네가 혼자 감당할 일이 아니야. 증거는 내가 지킬게.”`, `“지금 떠나면 그 사람 뜻대로 되는 거야.”`
  ];
  const pressureVariations = [
    `“그 단서를 넘기면 조용히 끝낼 수 있어.”`, `“진실을 알고도 네 편에 설 수 있을까?”`, `“다음 선택은 네가 잃을 것을 먼저 정하게 될 거야.”`, `“그 문 뒤의 이야기는 네가 감당할 수 있는 게 아니야.”`,
    `“내가 원하는 건 거짓말이 아니야. 네가 포기하는 순간이지.”`, `“이번에는 네가 직접 대가를 치러.”`
  ];
  const guardianVariations = [
    `“너희가 모르는 선택 하나가 아직 남아 있다.”`, `“그날의 이야기는 내가 끝까지 책임질게.”`, `“진실은 늦게 와도, 선택은 지금 해야 한다.”`, `“누구의 편을 들기 전에 먼저 끝까지 들어라.”`
  ];
  const wildcardVariations = [
    `“내가 왜 여기 왔는지, 아직 아무도 묻지 않았네.”`, `“그 증거는 내가 먼저 찾았어. 거래할 생각은 없어.”`, `“당신들이 믿은 순서가 처음부터 틀렸어.”`, `“이제부터는 내가 규칙을 정할게.”`
  ];
  const beats = Array.from({ length: clipCount }, (_, index) => {
    const source = Math.floor(index * actions.length / clipCount);
    const counterpartLine = serializedDialogue('counterpart', number, index + 1, phase, serial, cast);
    const leadLine = serializedDialogue('lead', number, index + 1, phase, serial, cast);
    const bringsPressure = phase === '확장' || phase === '반전' || (phase === '위기' && index === clipCount - 1);
    const thirdRole = bringsPressure ? 'rival' : 'confidant';
    const thirdLine = index === 1 || index === clipCount - 2 ? serializedDialogue(thirdRole, number, index + 1, phase, serial, cast) : '';
    const guestRole = phase === '시작' || phase === '결말' ? 'guardian' : 'wildcard';
    const guestLine = index === 3 || (clipCount === 4 && index === 2) ? serializedDialogue(guestRole, number, index + 1, phase, serial, cast) : '';
    const action = `${actions[source]} 이번 회차의 고유 사건은 “${serial.incident}”이며, ${serial.object}이 다음 선택의 대가가 된다.`;
    return { action, counterpartLine, leadLine, thirdLine, guestLine };
  });
  return { phase, ...phaseData, beats };
}
function dialogueFor(key, clip, episode, cast) {
  const lines = [
    `“${object(key)} 찾는 건, 잊기 위해서가 아니야.”`,
    `“그날 네가 떠난 이유를 이제야 묻는 거야.”`,
    `“진실을 말하면, 우리 둘 다 예전으로 돌아갈 수 없어.”`,
    `“그래도 이번에는 내가 먼저 손을 놓지 않을게.”`,
    `“이 단서는 우연이 아니야. 누군가 우리를 여기로 데려왔어.”`,
    `“나를 믿지 않아도 돼. 하지만 그 문은 혼자 열지 마.”`,
    `“이번 선택이 틀려도, 네 곁에 남겠어.”`,
    `“이제야 알겠어. 내가 지키려던 건 물건이 아니라 너였어.”`
  ];
  return `${lines[(episode + clip - 2) % lines.length]} — ${cast.lead}`;
}
function counterpartDialogueFor(key, clip, episode, cast) {
  const lines = [
    `“그걸 찾는다고 달라질 건 없어. 그래도 네가 원하면 함께 갈게.”`,
    `“내가 말하지 못한 이유는 하나야. 네가 다칠까 봐서였어.”`,
    `“지금 돌아서면 편해져. 하지만 넌 그러지 않을 거잖아.”`,
    `“그 선택의 대가는 내가 감당할게. 넌 네 진심만 말해.”`,
    `“${key}에 대한 답은 내가 아니라 네가 이미 알고 있어.”`,
    `“한 번만 더 믿어 줘. 이번에는 내가 네 곁을 지킬게.”`,
    `“모든 게 끝나도, 네가 돌아올 곳은 여기야.”`,
    `“이제 숨기지 않을게. 너를 잃는 게 가장 무서웠어.”`
  ];
  return `${lines[(episode * 2 + clip - 2) % lines.length]} — ${cast.counterpart}`;
}
function sceneDirection(episode, clip, clipCount, keys, cast) {
  const focus = keys[(episode + clip - 2) % keys.length];
  const pressure = keys[(episode + clip - 1) % keys.length];
  const starts = ['낡은 소품을 손끝으로 확인하며', '상대의 표정을 읽으려 한 박자 멈췄다가', '닫히려는 문을 붙잡으며', '숨긴 메시지를 발견한 뒤', '한 걸음 물러서며', '결심한 듯 시선을 들며', '상대에게 선택을 건네며', '대답 대신 행동으로 옮기며'];
  const turns = ['의심을 확신으로 바꾼다', '감춘 상처가 드러난다', '둘 사이의 신뢰가 흔들린다', '이전 장면의 단서가 다른 의미를 얻는다', '피할 수 없던 선택을 받아들인다', '관계의 주도권이 뒤바뀐다', '작지만 돌이킬 수 없는 약속을 한다', '다음 장면을 강하게 요구하는 결정을 내린다'];
  return `${topic(cast.lead)} ${starts[(clip - 1) % starts.length]} “${focus}”의 의미를 좇는다. ${cast.counterpart}의 짧은 반응으로 ${pressure}가 새로운 압박으로 떠오르고, ${topic(cast.lead)} ${turns[(episode + clip - 2) % turns.length]}.`;
}
function makeClip(episode, clip, clipCount, keys, tone, mode, cast, style, plan, format = 'drama', blueprint = null) {
  const formatProfile = PRODUCTION_FORMATS[format] || PRODUCTION_FORMATS.drama;
  const focus = keys[(episode + clip - 2) % keys.length];
  const next = keys[(episode + clip - 1) % keys.length];
  const beat = CLIP_BEATS[Math.min(clip - 1, CLIP_BEATS.length - 1)];
  const end = clip === clipCount ? `End on a decisive unresolved image involving ${next}; keep motion and room tone alive through the final frame.` : `End mid-action with the character's eye-line, prop position, lighting, camera axis, and ambient sound ready to continue into clip ${clip + 1}.`;
  const plannedBeat = plan?.beats?.[clip - 1];
  const direction = plannedBeat?.action || sceneDirection(episode, clip, clipCount, keys, cast);
  const line = plannedBeat?.leadLine || dialogueFor(focus, clip, episode, cast);
  const counterpartLine = plannedBeat?.counterpartLine || counterpartDialogueFor(focus, clip, episode, cast);
  const thirdLine = plannedBeat?.thirdLine || '';
  const guestLine = plannedBeat?.guestLine || '';
  const extraDialogue = thirdLine ? ` / ${thirdLine.split(' — ')[1]}: "${thirdLine.replace(/^“|”\s*—.*$/g, '')}"` : '';
  const guestDialogue = guestLine ? ` / ${guestLine.split(' — ')[1]}: "${guestLine.replace(/^“|”\s*—.*$/g, '')}"` : '';
  const world = blueprint ? `Series world: ${blueprint.setting} Active conflict axes: ${blueprint.hooks.join('; ')}. Episode hook rule: ${blueprint.hookRule}` : '';
  const prompt = `Generate an 8-second vertical 9:16 clip for an original Korean serialized story, episode ${episode}, clip ${clip} of ${clipCount}. Production format: ${formatProfile.visual}. Genre: ${mode}. Tone: ${tone || 'emotionally grounded cinematic drama'}. Directing: ${formatProfile.direction}. Narrative rhythm: ${SCRIPT_STYLES[style].instruction} ${world} Keep ${cast.lead}, ${cast.counterpart}, ${cast.confidant}, ${cast.rival}, ${cast.guardian}, and ${cast.wildcard} as consistent original fictional Korean characters when they appear. They must never resemble, imitate, or be named after a real person, celebrity, famous fictional character, existing franchise, or copyrighted character identity. Story action: ${direction} Focus on ${focus}; ${next} becomes the pressure point. Start from the preceding final frame with matching pose, eye-line, prop placement, time of day, lighting direction, lens, camera axis, and continuous room tone. One sustained action, one visible emotional turn, and if dialogue is needed use this brief natural Korean exchange only: ${cast.counterpart}: "${counterpartLine.replace(/^“|”\s*—.*$/g, '')}" / ${cast.lead}: "${line.replace(/^“|”\s*—.*$/g, '')}"${extraDialogue}${guestDialogue}. Sound: ${formatProfile.audio}; continuous subtle room tone, footsteps/fabric/prop foley synced to movement, and a restrained score motif that carries over without restarting. No captions, subtitles, logo, montage, unexplained person, jump cut, reset, face drift, costume change, or music restart. ${end}`;
  return { clip, beat, focus, direction, line, counterpartLine, thirdLine, guestLine, prompt };
}
function makeEpisodeScreenplays(title, episodes, cast, style, format = 'drama') {
  const styleNote = style === 'koreanized-cdrama' ? '빠른 반전과 강한 엔딩 훅을 유지하되, 감정은 한국어 대사와 행동으로 설득력 있게 쌓는다.' : '인물의 행동과 침묵으로 감정을 쌓고, 장면 끝에 다음 선택을 남긴다.';
  const formatProfile = PRODUCTION_FORMATS[format] || PRODUCTION_FORMATS.drama;
  return episodes.map(ep => {
    const beats = ep.clips.map(c => `${c.direction || c.beat || '인물의 선택이 다음 갈등으로 이어진다.'}\n\n${c.guestLine ? `${String(c.guestLine).split(' — ')[1]}: “${String(c.guestLine).replace(/^“|”\s*—.*$/g, '')}”\n` : ''}${c.thirdLine ? `${String(c.thirdLine).split(' — ')[1]}: “${String(c.thirdLine).replace(/^“|”\s*—.*$/g, '')}”\n` : ''}${cast.counterpart}: “${String(c.counterpartLine || '한 번만 더 나를 믿어 줘.').replace(/^“|”\s*—.*$/g, '')}”\n${cast.lead}: “${String(c.line || '이제는 내가 선택할게.').replace(/^“|”\s*—.*$/g, '')}”`).join('\n\n');
    return `[${title} · ${ep.number}화 한국어 대본]\n\n오프닝 훅: ${ep.openingHook || ep.arc}\n이번 회차의 목표: ${ep.goal || ep.arc}\n전환점: ${ep.turn || ep.arc}\n연출 원칙: ${formatProfile.direction}. ${styleNote}\n\n${beats}\n\n(회차 엔딩 훅) ${ep.ending}`;
  });
}
function buildDrama(keys, tone, seconds, style = DEFAULT_SCRIPT_STYLE, format = 'drama', attempt = 0) {
  const mode = STORY_MODES[attempt % STORY_MODES.length];
  const usedVariants = usedVariantIds(keys, tone, seconds);
  const candidates = STORY_VARIANTS.filter(variant => !usedVariants.has(variant.id));
  const variant = (candidates.length ? candidates : STORY_VARIANTS)[Math.floor(Math.random() * (candidates.length || STORY_VARIANTS.length))];
  const usedNames = new Set();
  const cast = { lead: makeOriginalName(usedNames), counterpart: makeOriginalName(usedNames), confidant: makeOriginalName(usedNames), rival: makeOriginalName(usedNames), guardian: makeOriginalName(usedNames), wildcard: makeOriginalName(usedNames) };
  const blueprint = buildMicroDramaBlueprint(keys, cast);
  const signature = signatureFor(keys, tone, seconds, mode, cast, style, format);
  if (archive.some(item => item.signature === signature) && attempt < STORY_MODES.length - 1) return buildDrama(keys, tone, seconds, style, format, attempt + 1);
  const episodeCount = episodeCountFor(keys), clipCount = clipCountFor(seconds), title = titleFor(keys, mode);
  const episodes = Array.from({ length: episodeCount }, (_, offset) => {
    const number = offset + 1, arc = episodeArc(number, episodeCount);
    const plan = makeEpisodePlan(number, episodeCount, keys, variant, cast, clipCount);
    const clips = Array.from({ length: clipCount }, (_, clipOffset) => makeClip(number, clipOffset + 1, clipCount, keys, tone, mode, cast, style, plan, format, blueprint));
    const premiseBeat = number === 1 ? variant.premise : number === Math.ceil(episodeCount / 2) ? variant.twist : number === episodeCount ? variant.ending : variant.conflict;
    return { number, phase: plan.phase, goal: plan.goal, turn: plan.turn, openingHook: number === 1 ? variant.premise : `${number - 1}화 마지막 질문을 즉시 행동으로 이어받는다.`, arc: `${arc} 이번 회차 핵심 사건: ${premiseBeat}`, clips, ending: number === episodeCount ? variant.ending : `${keys[(number + 1) % keys.length]}에 대한 답을 미루는 다음 화 훅.` };
  });
  const formatProfile = PRODUCTION_FORMATS[format] || PRODUCTION_FORMATS.drama;
  const header = `[드라마 제작 패키지]\n\n제목: ${title}\n작품 형식: ${formatProfile.label}\n장르: ${mode}\n핵심 키워드: ${keys.join(' · ')}\n톤: ${tone || '감정선이 선명한 시네마틱 드라마'}\n총 ${episodeCount}편 · 회당 약 ${clipCount * 8}초 · 회당 ${clipCount}개 클립(각 8초)\n\n[로그라인]\n${variant.premise}. ${variant.conflict}.\n\n[앙상블 등장인물]\n- ${cast.lead}: 주연. ${keys[0]}을(를) 피하려 하지만 결국 그 진실을 스스로 선택해야 하는 인물.\n- ${cast.counterpart}: 주연. 주인공이 원하는 답을 알고 있으나, 답을 주는 대가를 감추고 있는 인물.\n- ${cast.confidant}: 핵심 조연. 주인공의 가장 가까운 편이지만, 사실과 증거를 먼저 믿는 인물.\n- ${cast.rival}: 핵심 조연. 주인공과 같은 목표를 두고 맞서며, 자신의 승리를 위해 관계의 약점을 파고드는 인물.\n- ${cast.guardian}: 비밀을 아는 조연. 과거의 선택을 알고 있고, 결정적 순간에 진실의 무게를 드러내는 인물.\n- ${cast.wildcard}: 변수를 만드는 조연. 누구의 편인지 쉽게 드러내지 않으며, 중반 이후의 판을 바꾸는 인물.\n이름·외형·인물 설정은 이 시리즈를 위해 새로 만들었다. 유명인·실존 인물·기존 작품·프랜차이즈·저작권 캐릭터를 닮게 하거나 사용하지 않는다.\n\n[시리즈 성경]\n${cast.lead}과 ${cast.counterpart}의 관계가 이야기의 중심이지만, ${cast.confidant}는 주인공의 선택을 검증하고, ${cast.rival}는 목표를 경쟁으로 바꾸며, ${cast.guardian}은 과거의 진실을, ${cast.wildcard}은 새로운 변수를 가져온다. 각 인물은 자신만의 목표·비밀·대가를 가지고 등장하며, 한 회차에 필요 없는 인물을 억지로 넣지 않는다. 대사는 설명이 아니라 선택과 감정을 드러내야 하며, 침묵·시선·손의 움직임 같은 행동으로도 감정을 전달한다. ${formatProfile.direction}. 모든 회차는 같은 인물 외형, 핵심 소품, 세계관, 색보정, 사운드 질감을 유지한다. 클립을 연결할 때 다음 클립은 직전 마지막 프레임의 자세·시선·소품·조명·카메라 축에서 시작한다.\n\n[시즌 아크]\n${seasonArc(episodeCount, variant, cast)}\n`;
  const body = episodes.map(ep => `\n━━━━━━━━━━━━━━━━━━\n\n[${ep.number}화 · 약 ${clipCount * 8}초]\n회차 목표: ${ep.arc}\n엔딩 훅: ${ep.ending}\n\n` + ep.clips.map(c => `[클립 ${c.clip} · 8초]\n장면 기능: ${c.beat}\n대본: ${c.direction}\n${c.guestLine ? `조연 대사: ${c.guestLine}\n` : ''}${c.thirdLine ? `조연 대사: ${c.thirdLine}\n` : ''}상대역 대사: ${c.counterpartLine}\n주인공 대사: ${c.line}\n연출/Flow 프롬프트:\n${c.prompt}`).join('\n\n')).join('');
  const uniqueHeader = header.replace('[오리지널 등장인물]', `[기획 코드: ${variant.id}]\n\n[세로형 연속 숏드라마 규칙]\n배경: ${blueprint.setting}\n갈등 축: ${blueprint.hooks.join(' · ')}\n${blueprint.hookRule}\n\n[배역 구도]\n- ${cast.lead}: ${blueprint.roles.lead}\n- ${cast.counterpart}: ${blueprint.roles.counterpart}\n- ${cast.confidant}: ${blueprint.roles.confidant}\n- ${cast.rival}: ${blueprint.roles.rival}\n- ${cast.guardian}: ${blueprint.roles.guardian}\n- ${cast.wildcard}: ${blueprint.roles.wildcard}\n\n[오리지널 등장인물]`);
  const screenplayEpisodes = makeEpisodeScreenplays(title, episodes, cast, style, format);
  return { id: crypto.randomUUID(), title, signature, story_variant: variant.id, script_style: style, production_format: format, keywords: keys, tone, cast, duration_seconds: clipCount * 8, episode_count: episodeCount, episodes, screenplayEpisodes, screenplay: screenplayEpisodes.join('\n\n━━━━━━━━━━━━━━━━━━\n\n'), script: uniqueHeader + body, summary: `${formatProfile.label} · ${mode} · ${cast.lead}·${cast.counterpart} · ${episodeCount}편 · 회당 ${clipCount * 8}초`, created_at: new Date().toISOString() };
}
function renderCopyButtons() {
  const root = $('clip-copy-actions'); root.innerHTML = '';
  if (!current) { root.hidden = true; return; }
  root.hidden = false;
  const label = document.createElement('span'); label.textContent = '회차·클립별 복사'; root.append(label);
  current.episodes.forEach(ep => ep.clips.forEach(clip => { const button = document.createElement('button'); button.textContent = `${ep.number}-${clip.clip}`; button.title = `${ep.number}화 ${clip.clip}클립 복사`; button.onclick = async () => { await navigator.clipboard.writeText(clip.prompt); const original = button.textContent; button.textContent = '복사됨'; setTimeout(() => button.textContent = original, 900); }; root.append(button); }));
}
async function archiveCurrent() {
  if (!current) return;
  const local = readLocal(); if (!local.some(item => item.signature === current.signature)) { local.unshift(current); writeLocal(local); }
  if (dbClient && userId) { const payload = { id: current.id, user_id: userId, title: current.title, keywords: current.keywords.join(', '), signature: current.signature, duration_seconds: current.duration_seconds, episode_count: current.episode_count, script: current.script, episodes: current.episodes, summary: current.summary }; const { error } = await dbClient.from('drama_archive').upsert(payload, { onConflict: 'id' }); if (error) { alert(`PC에는 보관했지만 Supabase 저장에 실패했습니다: ${error.message}`); return; } }
  archive = readLocal(); $('archive').disabled = true; $('archive').textContent = '보관됨';
}
function episodePreviews() {
  if (Array.isArray(current?.screenplayEpisodes) && current.screenplayEpisodes.length) return current.screenplayEpisodes;
  if (current?.episodes?.length) { const fallback = makeEpisodeScreenplays(current.title, current.episodes, current.cast || { lead: '주인공', counterpart: '상대역' }, current.script_style || DEFAULT_SCRIPT_STYLE, current.production_format || 'drama'); return current.episodes.map((episode, index) => episode.screenplay || fallback[index]); }
  return [current?.screenplay || '대본을 다시 생성해 주세요.'];
}
function showEpisodePreview(index = 0) {
  const previews = episodePreviews();
  const safeIndex = Math.max(0, Math.min(index, previews.length - 1));
  $('script-preview').textContent = previews[safeIndex];
  const root = $('episode-preview-actions'); root.innerHTML = ''; root.hidden = false;
  const label = document.createElement('span'); label.textContent = '회차별 대본'; root.append(label);
  previews.forEach((_, i) => { const button = document.createElement('button'); button.textContent = `${i + 1}화`; button.classList.toggle('accent', i === safeIndex); button.onclick = () => showEpisodePreview(i); root.append(button); });
  if (current?.aiPlan && geminiApiKey) { const aiButton = document.createElement('button'); aiButton.textContent = `AI로 ${safeIndex + 1}화 대본·프롬프트 생성`; aiButton.classList.add('accent'); aiButton.onclick = () => generateAiEpisode(safeIndex); root.append(aiButton); }
}
function showCurrent(fromArchive = false) {
  openedFromArchive = fromArchive;
  $('result-title').textContent = `${current.title} · ${current.episode_count}부작`;
  $('output').textContent = current.script;
  $('copy').disabled = false;
  $('preview-script').disabled = false;
  $('preview-script').textContent = '대본 미리보기';
  $('output').hidden = false;
  $('script-preview').hidden = true;
  $('episode-preview-actions').hidden = true;
  $('archive').disabled = fromArchive || archive.some(item => item.signature === current.signature);
  $('archive').textContent = $('archive').disabled ? '보관됨' : '보관';
  $('regenerate-latest').hidden = !fromArchive;
  $('regenerate-latest').disabled = !fromArchive;
  renderCopyButtons();
}
function generateDrama({ forceRandom = false } = {}) {
  let keys = splitKeywords($('keywords').value);
  let tone = $('tone').value.trim();
  if (forceRandom || keys.length < 2) {
    const random = randomDramaInputs();
    keys = random.keys;
    tone = tone || random.tone;
    $('keywords').value = keys.join(', ');
    $('tone').value = tone;
  }
  current = buildDrama(keys, tone, Number($('episode-duration').value), DEFAULT_SCRIPT_STYLE, $('production-format').value);
  showCurrent(false);
}
function episodeOutlinePreview(title, episode) { return `[${title} · ${episode.number}화 대본 설계]\n\n오프닝 훅: ${episode.openingHook}\n이번 회차의 목표: ${episode.goal}\n고유 사건: ${episode.incident}\n관계 전환: ${episode.relationshipTurn}\n\n엔딩 훅: ${episode.endingHook}\n\n이 회차를 선택한 뒤 “AI로 ${episode.number}화 대본·프롬프트 생성”을 누르면, 이 설계를 바탕으로 실제 한국어 대본과 Google Flow 클립 프롬프트를 작성합니다.`; }
async function generateAiSeries() {
  let keys = splitKeywords($('keywords').value); let tone = $('tone').value.trim();
  if (keys.length < 2) { const random = randomDramaInputs(); keys = random.keys; tone = tone || random.tone; $('keywords').value = keys.join(', '); $('tone').value = tone; }
  const button = $('generate-ai-drama'); button.disabled = true; button.textContent = 'AI 시리즈 기획 생성 중…';
  try {
    const seconds = Number($('episode-duration').value), format = $('production-format').value;
    const plan = await callGeminiJson(aiSeriesPrompt(keys, tone, seconds, format), 24000);
    if (!Array.isArray(plan.episodes) || plan.episodes.length < 30 || !Array.isArray(plan.characters) || plan.characters.length < 6) throw new Error('AI 기획이 30개 회차 또는 6명 앙상블 조건을 충족하지 못했습니다. 다시 시도해 주세요.');
    current = buildDrama(keys, tone, seconds, DEFAULT_SCRIPT_STYLE, format);
    current.title = plan.title || current.title; current.aiPlan = plan; current.summary = `AI 시리즈 기획 · ${current.summary}`;
    const names = plan.characters.map(person => person.name).filter(Boolean);
    ['lead', 'counterpart', 'confidant', 'rival', 'guardian', 'wildcard'].forEach((role, i) => { if (names[i]) current.cast[role] = names[i]; });
    current.episodes.forEach((episode, index) => { const source = plan.episodes[index]; if (!source) return; episode.aiOutline = source; episode.goal = source.goal || episode.goal; episode.turn = source.relationshipTurn || episode.turn; episode.openingHook = source.openingHook || episode.openingHook; episode.arc = source.incident || episode.arc; episode.ending = source.endingHook || episode.ending; });
    current.screenplayEpisodes = plan.episodes.slice(0, current.episodes.length).map(item => episodeOutlinePreview(current.title, item));
    current.script = `[AI 시리즈 기획]\n\n제목: ${current.title}\n로그라인: ${plan.logline || ''}\n\n[시리즈 성경]\n${plan.seriesBible || ''}\n\n[앙상블]\n${plan.characters.map(person => `- ${person.name}: ${person.role}. 목표: ${person.goal}. 비밀: ${person.secret}.`).join('\n')}\n\n[회차 설계]\n${current.screenplayEpisodes.join('\n\n━━━━━━━━━━━━━━━━━━\n\n')}`;
    showCurrent(false); setGeminiStatus('AI 시리즈 기획 생성 완료 · 회차를 선택해 대본을 확장하세요.');
  } catch (error) { alert(`AI 시리즈 기획 생성에 실패했습니다: ${error.message}`); setGeminiStatus('AI 요청 실패 · 키와 무료 티어 한도를 확인하세요.'); }
  finally { button.disabled = false; button.textContent = 'AI 시리즈 기획 생성'; }
}
async function generateAiEpisode(index) {
  if (!current?.aiPlan) return; current.aiEpisodeNumber = index + 1;
  try {
    const result = await callGeminiJson(aiEpisodePrompt(), 16000);
    if (!Array.isArray(result.clips) || !result.clips.length || !result.screenplay) throw new Error('회차 대본 형식이 올바르지 않습니다. 다시 시도해 주세요.');
    const episode = current.episodes[index];
    episode.clips = result.clips.slice(0, episode.clips.length).map((clip, clipIndex) => ({ ...episode.clips[clipIndex], direction: clip.action || episode.clips[clipIndex].direction, line: clip.leadLine || episode.clips[clipIndex].line, counterpartLine: clip.counterpartLine || episode.clips[clipIndex].counterpartLine, thirdLine: clip.thirdLine || '', prompt: clip.flowPrompt || episode.clips[clipIndex].prompt }));
    episode.screenplay = result.screenplay; current.screenplayEpisodes[index] = result.screenplay; current.script = `${current.script}\n\n━━━━━━━━━━━━━━━━━━\n\n[AI 완성 ${index + 1}화]\n${result.screenplay}`;
    renderCopyButtons(); showEpisodePreview(index); setGeminiStatus(`AI ${index + 1}화 대본과 Google Flow 프롬프트 생성 완료`);
  } catch (error) { alert(`AI ${index + 1}화 생성에 실패했습니다: ${error.message}`); setGeminiStatus('AI 회차 생성 실패 · 잠시 후 다시 시도해 주세요.'); }
  finally { delete current.aiEpisodeNumber; }
}
$('generate-drama').onclick = () => generateDrama();
$('generate-random-drama').onclick = () => generateDrama({ forceRandom: true });
$('generate-ai-drama').onclick = generateAiSeries;
$('gemini-api-key').value = geminiApiKey;
setGeminiStatus(geminiApiKey ? '이 PC에 Google AI Studio API 키가 저장되어 있습니다.' : 'API 키를 저장하면 AI 대본 생성이 가능합니다.');
$('save-gemini-key').onclick = () => { const key = $('gemini-api-key').value.trim(); if (!key) return alert('Google AI Studio API 키를 입력해 주세요.'); geminiApiKey = key; localStorage.setItem(GEMINI_STORAGE_KEY, key); $('gemini-api-key').value = ''; setGeminiStatus('API 키를 이 PC에 저장했습니다. Supabase에는 저장하지 않습니다.'); };
$('clear-gemini-key').onclick = () => { geminiApiKey = ''; localStorage.removeItem(GEMINI_STORAGE_KEY); $('gemini-api-key').value = ''; setGeminiStatus('이 PC에 저장된 API 키를 삭제했습니다.'); };
$('regenerate-latest').onclick = () => {
  if (!current) return;
  const seconds = current.duration_seconds <= 32 ? 30 : current.duration_seconds <= 48 ? 45 : 60;
  $('keywords').value = current.keywords.join(', ');
  $('tone').value = current.tone || '';
  $('episode-duration').value = String(seconds);
  $('production-format').value = current.production_format || 'drama';
  current = buildDrama(current.keywords, current.tone || '', seconds, DEFAULT_SCRIPT_STYLE, $('production-format').value);
  showCurrent(false);
};
$('preview-script').onclick = () => {
  if (!current) return;
  const preview = $('script-preview');
  const isOpen = !preview.hidden;
  if (!isOpen) {
    showEpisodePreview(0);
    preview.hidden = false;
    $('output').hidden = true;
    $('preview-script').textContent = '클립 프롬프트 보기';
  } else {
    preview.hidden = true;
    $('episode-preview-actions').hidden = true;
    $('output').hidden = false;
    $('preview-script').textContent = '대본 미리보기';
  }
};
$('copy').onclick = async () => { if (!current) return; await navigator.clipboard.writeText(current.script); $('copy').textContent = '복사됨'; setTimeout(() => $('copy').textContent = '전체 복사', 1100); };
$('archive').onclick = archiveCurrent;
window.connectSupabase = async () => { try { dbClient = window.supabase.createClient(CONFIG.url, CONFIG.anonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } }); const { data: { session } } = await dbClient.auth.getSession(); userId = session?.user?.is_anonymous ? null : session?.user?.id; if (!userId) { setSync('PC 드라마 보관함 사용 중'); return; } const { data, error } = await dbClient.from('drama_archive').select('*').order('created_at', { ascending: false }); if (error) { setSync('PC 드라마 보관함 사용 중'); return; } archive = [...(data || []), ...readLocal().filter(l => !(data || []).some(c => c.signature === l.signature))]; setSync('Supabase 드라마 보관함 연결됨', true); } catch { setSync('PC 드라마 보관함 사용 중'); } };
if (location.search.includes('opened=archive')) { try { current = JSON.parse(localStorage.getItem('tailframe-opened-drama') || 'null'); if (current) showCurrent(true); } catch {} }
archive = readLocal();
