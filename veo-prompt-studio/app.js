/* OMNI Prompt Studio — all generated history is stored only after the user presses Archive. */
const CONFIG = {
  url: 'https://pxzerharmpbxvmuomsfo.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXAiLCJyZWYiOiJweHplcmhhcm1wYnh2bXVvbXNmbyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzkwODQwMjQwLCJleHAiOjIxMDY0MTYyNDh9.9O5gSipGaZ66XSnp9FjI9tkIvcir3XZnvp6JBNyPV4A'
};
// Supabase project's current public anon key.
CONFIG.anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4emVyaGFybXBieHZtdW9tc2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NDAyNDAsImV4cCI6MjEwNjQxNjI0MH0.9O5gSipGaZ66XSnp9FjI9tkIvcir3XZnvp6JBNyPV4A';
// The supplied legacy anon key is intentionally public client configuration; never put a service-role key here.
const $ = (id) => document.getElementById(id);
const foods = [
  ['유자 크림 다이후쿠','유자의 산뜻한 향, 부드러운 크림, 반투명 찹쌀 껍질','연노랑·우윳빛·금빛'],
  ['블루베리 치즈 마카롱','파삭한 보라 껍질, 블루베리 잼, 크림치즈 필링','블루베리·크림·은빛'],
  ['피스타치오 라즈베리 타르트','고소한 견과 크럼블, 선명한 라즈베리, 유광 타르트','연두·루비·브론즈'],
  ['청포도 소다 솜사탕','톡톡 터지는 소다 거품, 투명한 설탕실, 청포도 향','민트·라임·투명'],
  ['복숭아 밀크 푸딩','말랑한 복숭아 조각, 우유 푸딩의 흔들림, 이슬','복숭아·크림·진주빛'],
  ['메이플 버터 크루아상','바삭한 결, 녹는 버터, 호박빛 메이플 시럽','호박·버터·캐러멜'],
  ['라벤더 허니 젤라토','은은한 꽃향, 꿀의 점성, 차가운 젤라토 표면','라벤더·꿀·서리빛'],
  ['코코넛 망고 빙수','얇은 코코넛, 망고 과육, 녹는 얼음 결정','망고·화이트·아쿠아']
];
const places = ['이른 새벽의 유리 온실','비가 막 그친 골목의 작은 디저트 창가','별빛이 비치는 고요한 해변 모래언덕','해 질 무렵의 오래된 찻집 테라스','눈 녹은 숲의 이끼 낀 돌계단','노을빛 지붕 위 작은 정원'];
const mechanisms = [
  ['오른쪽 귀 끝의 작은 결정에서 목과 등으로 빛이 번지는 방식','몸의 무늬가 음식의 질감을 따라 천천히 피어나는 방식'],
  ['발바닥에 닿은 음식 부스러기가 꼬리 끝을 따라 올라가는 방식','꼬리의 결이 먼저 바뀐 뒤 등으로 퍼지는 방식'],
  ['수염 끝에 맺힌 향기 방울이 이마 문양으로 흡수되는 방식','이마 문양에서 가슴과 다리로 잔물결처럼 퍼지는 방식'],
  ['한 입 베어 문 자리에 나온 미세한 입자가 앞발에 붙는 방식','앞발에서 어깨, 꼬리로 순서대로 확산되는 방식']
];
const endings = ['아홉 꼬리 중 하나가 카메라 앞을 살짝 스쳐 첫 장면의 음식 위치를 다시 드러낸다','음식 냄새를 다시 맡고 작은 재채기를 한 뒤 귀가 동시에 쫑긋 선다','반짝이는 입자 하나를 앞발로 잡으려다 제자리에서 작게 빙글 돈다','자기 꼬리 사이에 얼굴을 묻었다가 카메라 가까이 코를 내민다','발밑 효과를 밟고 한 번만 가볍게 튀어 올라 처음의 시선 방향으로 돌아온다'];
const sounds = [
  '호기심을 보이는 아주 짧은 여우 울음, 낮고 부드러운 “mrrp?”',
  '음식 향을 맡을 때의 조용한 코숨과 작은 “hm?”',
  '놀람을 표현하는 짧고 숨 섞인 “mip!”',
  '만족한 순간의 낮은 콧소리와 부드러운 “rru…”',
  '변화를 느낀 순간의 작고 맑은 “nyu?”'
];
// Keep this distinct from the Supabase CDN's global `window.supabase` namespace.
let dbClient = null, userId = null, archive = [], current = null;
const STORYBOARD_CACHE_KEY = 'tailframe-storyboard-cache-v1';
const LOGIN_EMAIL_DOMAIN = 'tailframe.local';
function accountEmail(loginId){ return `${loginId.trim().toLowerCase()}@${LOGIN_EMAIL_DOMAIN}`; }
function validLoginId(loginId){ return /^[a-z0-9][a-z0-9._-]{2,29}$/i.test(loginId); }
function localArchiveKey(){ return `veo-prompt-archive:${userId || 'signed-out'}`; }
function storyboardKey(item){ return item?.signature || item?.title || ''; }
function readStoryboardCache(){
  try { const saved = JSON.parse(localStorage.getItem(STORYBOARD_CACHE_KEY) || '{}'); return saved && typeof saved === 'object' ? saved : {}; }
  catch { return {}; }
}
async function saveStoryboard(item, storyboard){
  const key = storyboardKey(item); if (!key) return;
  const cache = readStoryboardCache(); cache[key] = storyboard;
  localStorage.setItem(STORYBOARD_CACHE_KEY, JSON.stringify(cache));
  item.storyboard = storyboard;
  saveLocalStoryboard(item, storyboard);
  if (dbClient && userId && item.id) {
    const { error } = await dbClient.from('veo_prompt_archive').update({ storyboard }).eq('id', item.id);
    if (error) console.warn('Supabase 스토리보드 저장 실패:', error.message);
  }
}
function savedStoryboard(item){ return readStoryboardCache()[storyboardKey(item)] || ''; }
const EXTEND_MOTION_SUFFIX = 'The final frame must be caught mid-motion, never a held pose. Motion continues visibly through the last frame: ongoing head turn, ear reaction, breathing, tail arc, flowing transformation light, and slow camera drift. Do not pause, settle, freeze, or resolve the action at the end.';
const STORY_STAGE_SUFFIXES = [
  '',
  'Narrative priority for this first clip: discovery only. The character notices and approaches the whole food, ending with an active sniff and a small continuing head movement. Do not bite, do not start transformation, and do not hold still in this clip.',
  'Narrative priority for this extension: ingestion only. The character now gently bites the same food once and leaves one clear bite mark. Begin only a tiny first transformation light at one ear tip or one front paw near the end; do not spread transformation through the fur or tails yet.',
  'Narrative priority for this extension: transformation begins and develops. Continue the tiny existing light through fur toward the nine tail tips, reaching only 50–70 percent. Do not complete the transformation, do not settle, and end with the light, head turn, tail arc, and camera drift still in motion.',
  'Narrative priority for this final extension: complete the food-inspired fur texture and small forehead ornament during seconds 2–5. During the final 1.5 seconds, intentionally hold one calm finished pose with face and exactly nine tails visible. The motion stops only here because this is the final video; use no new action, no camera drift, no transformation, no fade, and no reset.'
];
function setStageCopyActions(visible){ $('stage-copy-actions').hidden = !visible; }
function stagePrompt(storyboard, stage){
  const labels = ['[0단계', '[1단계', '[2단계', '[3단계', '[4단계'];
  const start = storyboard.indexOf(labels[stage]);
  if (start < 0) return '';
  const next = stage < 4 ? storyboard.indexOf(labels[stage + 1], start + 1) : storyboard.indexOf('[32초 쇼츠 길이]', start + 1);
  const section = storyboard.slice(start, next > start ? next : undefined);
  if (stage === 0) return (section.match(/이미지 프롬프트\s*:\s*([\s\S]*?)\n이미지 체크/) || [])[1]?.trim() || '';
  const prompt = (section.match(/((?:Generate|Continue)[\s\S]*?)(?=\n\n(?:Extend 직전 확인|\[최종 검수|\[32초 쇼츠 길이|\[최우선:)|$)/) || [])[1]?.trim() || '';
  if (!prompt) return '';
  const narrative = STORY_STAGE_SUFFIXES[stage] || '';
  const motion = stage >= 2 && stage <= 3 ? EXTEND_MOTION_SUFFIX : '';
  return [prompt, narrative, motion].filter(Boolean).join('\n\n');
}
async function copyStage(stage){
  const storyboard = current?.storyboard || savedStoryboard(current);
  const text = stagePrompt(storyboard, stage);
  if (!text) return alert('이 단계의 복사할 프롬프트를 찾지 못했습니다. 스토리보드를 다시 생성해 주세요.');
  await navigator.clipboard.writeText(text);
  const button = document.querySelector(`#stage-copy-actions [data-stage="${stage}"]`);
  if (button) { const label = button.textContent; button.textContent = '복사됨'; setTimeout(() => button.textContent = label, 1200); }
}
const pick = (items) => items[Math.floor(Math.random() * items.length)];
function foodProfile(food){ return foods.find(item => item[0] === food) || [food, `${food} 고유의 질감·향·색감`, '음식 고유 색감']; }
const normalize = (value) => value.trim().toLowerCase().replace(/\s+/g,' ');
const setSync = (text, online = false) => { $('sync-status').textContent = text; document.querySelector('.sync').classList.toggle('online', online); };

function selectedInputs(){ return { food: $('food').value.trim(), place: $('place').value.trim(), action: $('action').value.trim(), notes: $('notes').value.trim() }; }
function hasConflict(signature){ return archive.some(x => x.signature === signature); }
function buildPrompt(data, attempt = 0){
  const foodData = data.food && !/랜덤/i.test(data.food) ? [data.food, `${data.food}의 실제 식감과 향`, '음식 고유 색감'] : pick(foods);
  const place = data.place && !/랜덤/i.test(data.place) ? data.place : pick(places);
  const method = pick(mechanisms), ending = pick(endings), voice = pick(sounds);
  const eating = data.action || pick(['앞발로 조심스럽게 집어 한 입 베어 문다','고개를 기울여 향을 맡은 뒤 천천히 깨문다','바닥에 놓인 조각을 코로 밀어 가까이 끌어온 뒤 먹는다','음식을 한 번 굴려 본 뒤 바삭한 가장자리를 깨문다']);
  const [food, feature, colors] = foodData;
  const signature = [normalize(food), normalize(place), method[0], ending].join('|');
  if (hasConflict(signature) && attempt < 24) return buildPrompt(data, attempt + 1);
  const title = `${food} · ${place}`;
  const notes = data.notes ? `사용자 지정 조건: ${data.notes}\n` : '';
  const text = `[이번 영상]\n\n음식 : ${food}\n\n음식 핵심 특징 : ${feature}\n\n장소 : ${place}\n\n전체 변신 컨셉 : 원래의 아홉 꼬리 캐릭터 정체성을 유지한 채, ${food}의 물성·향·색감이 털 결, 꼬리 끝, 이마 문양에 단계적으로 융합된다. TikTok 9:16 세로 화면, Google Flow VEO 3.1-LIGHT용.\n${notes}\n━━━━━━━━━━━━━━━━━━\n\n[최종 변신 디자인]\n\n신체 : 기존의 작은 네 발 체형과 얼굴 비율을 유지하고, 가슴과 앞발에 ${feature}에서 얻은 섬세한 질감 무늬가 생긴다.\n\n털 : ${colors}의 그라데이션이 원래 털 사이로 스며들며, 음식 고유의 질감이 과하지 않게 반사광으로만 보인다.\n\n귀 : 원래 귀 형태를 유지하며 가장자리에 음식 특징을 닮은 얇은 반투명 테두리가 완성된다.\n\n아홉 꼬리 : 정확히 9개. 1~3번은 향기 입자, 4~6번은 음식의 질감 결, 7~9번은 은은한 색 반사로 서로 다르게 ${food} 테마를 표현한다.\n\n머리·귀 장식 : 이마 문양을 가리지 않는 작은 음식 모티프 결정 하나.\n\n기타 장식 : 없음.\n\n주변 이펙트 : 캐릭터 가까이에서만 보이는 작고 절제된 향기 입자.\n\n발밑 효과 : 발이 닿을 때만 생기는 희미한 원형 잔광.\n\n전체 색감 : ${colors}, 원래 캐릭터의 기본색을 유지한다.\n\n━━━━━━━━━━━━━━━━━━\n\n[장면 1 — 음식 발견 / 변신 0%]\n\n이미지 생성 프롬프트 : attached reference image의 동일한 아홉 꼬리 캐릭터가 ${place}에서 ${food}를 발견한다. 원래 모습, 변신 0%, 정확히 9개 꼬리, 9:16 vertical, cinematic soft light.\n\n영상 움직임 : 음식이 화면 가장자리에서 보이고 캐릭터가 냄새를 따라 두 걸음 다가와 멈춘다.\n\n캐릭터 행동 : 코를 가까이 대고 조심스럽게 냄새를 맡는다.\n\n음식 상태 : 온전한 ${food}, 캐릭터 앞 발끝 거리.\n\n카메라 : 캐릭터 눈높이의 중간 거리, 음식에서 얼굴로 아주 느린 이동.\n\n캐릭터 소리 : ${voice.replace('!','?')}\n\n오프스크린 목소리 : 없음.\n\n효과음 : 가벼운 발소리와 음식 포장 또는 표면의 미세한 소리.\n\n장면 마지막 상태 : 캐릭터 시선은 음식에 고정, 음식은 아직 온전하다.\n\n━━━━━━━━━━━━━━━━━━\n\n[장면 2 — 음식 섭취 / 초기 변신]\n\n이미지 생성 프롬프트 : same character, same ${place}, same lighting, character bites the same ${food}; visible bite mark; early transformation only, exactly nine tails, 9:16 vertical.\n\n영상 움직임 : ${eating}. 삼킨 직후 ${method[0]}가 시작되지만 얼굴과 몸은 원래 모습에 가깝다.\n\n캐릭터 행동 : 잠시 눈을 크게 뜨고 변화가 시작된 부위를 내려다본다.\n\n음식 상태 : 한 입 베어 문 자국과 줄어든 크기가 명확히 보인다.\n\n변화 : ${method[0]}; 초기 변화만, 완전 변신 금지.\n\n카메라 : 음식 높이의 클로즈업에서 귀 또는 앞발의 최초 변화로 부드럽게 이동.\n\n캐릭터 소리 : ${voice}\n\n오프스크린 목소리 : 없음.\n\n효과음 : 한입 소리, 짧은 반짝임 소리.\n\n장면 마지막 상태 : 변화의 작은 빛이 계속 움직이며 장면 3으로 이어진다.\n\n━━━━━━━━━━━━━━━━━━\n\n[장면 3 — 본격적인 변신]\n\n이미지 생성 프롬프트 : same character continuing from scene 2, transformation visibly progresses from the first affected area through fur and nine tails; not yet complete; same ${place}; 9:16 vertical.\n\n영상 움직임 : 캐릭터가 한 걸음 뒤로 물러서며 ${method[1]}. 한 번에 여러 변화가 폭발하지 않고 순서대로 나타난다.\n\n캐릭터 행동 : 꼬리 하나를 바라보고 몸을 낮춰 변화하는 털 결을 확인한다.\n\n신체 변화 : 가슴과 앞발에 ${food} 특징을 닮은 얇은 무늬가 중간 단계로 보인다.\n\n털 변화 : 원래 털 사이에 ${colors} 반사광이 50% 정도 퍼진다.\n\n귀 변화 : 귀 끝 테두리가 천천히 반투명해진다.\n\n꼬리 변화 : 정확히 9개 꼬리의 끝에서부터 서로 다른 미세한 음식 테마가 생기고 몸 쪽으로 천천히 진행한다.\n\n장식 생성 : 이마 문양 바로 위에 작은 결정이 70% 정도 형성된다.\n\n주변 이펙트 : 향기 입자가 꼬리 사이를 느리게 흐른다.\n\n발밑 효과 : 한 번의 작은 잔광.\n\n카메라 : 꼬리 끝을 따라 짧은 아크 이동 후 얼굴로 돌아온다.\n\n캐릭터 소리 : 으응?\n\n오프스크린 목소리 : 없음.\n\n효과음 : 털 스침, 은은한 결정음, 작은 착지음.\n\n장면 마지막 상태 : 최종 변화 직전의 빛이 이마 문양에 모인다.\n\n━━━━━━━━━━━━━━━━━━\n\n[장면 4 — 완전 변신 / 변신 100%]\n\n이미지 생성 프롬프트 : same attached-reference character, fully transformed only now by ${food}, same ${place}, exact nine tails clearly visible, original identity preserved, 9:16 vertical, polished cinematic final frame.\n\n영상 움직임 : 이마 문양의 빛이 잔잔하게 가라앉으며 마지막 질감이 완성되고 캐릭터가 결과를 확인한다.\n\n캐릭터 행동 : ${ending}.\n\n완성된 신체 : 원래 체형에 ${food}의 특징이 얇은 무늬와 광택으로 융합된 모습.\n\n완성된 털 : ${colors} 반사광과 음식의 촉감을 연상시키는 부드러운 결.\n\n완성된 귀 : 원래 귀의 형태와 비율을 유지한 반투명 가장자리.\n\n완성된 아홉 꼬리 : 정확히 9개. 각각의 꼬리가 향기, 질감, 색 반사 중 하나를 미세하게 표현하며 모두 같은 원래 꼬리 구조를 유지한다.\n\n완성된 장식 : 이마 문양을 가리지 않는 작은 결정 장식 하나.\n\n주변 이펙트 : 캐릭터 주변 가까이만 흐르는 절제된 향기 입자.\n\n발밑 효과 : 마지막 발 디딤에만 짧은 원형 잔광.\n\n최종 포즈 : 음식과 장소에 어울리는 낮고 안정적인 자세, 얼굴과 9개 꼬리가 모두 보이는 방향.\n\n엔딩 : ${ending}.\n\n카메라 : 느린 줌아웃으로 얼굴과 9개 꼬리를 한 화면에 명확히 담는다.\n\n캐릭터 소리 : ${voice}\n\n오프스크린 목소리 : 없음.\n\n효과음 : 꼬리 스침, 작은 결정음, 행동과 동기화된 귀여운 마무리 소리.\n\n━━━━━━━━━━━━━━━━━━\n\n[BGM]\n\n전체 분위기 : ${food}와 ${place}에 어울리는 낮은 볼륨의 무보컬 판타지 팝.\n\n장면 1 : 호기심을 담은 가벼운 플럭.\n\n장면 2 : 한입 뒤 작은 벨 음을 추가.\n\n장면 3 : 질감 변화에 맞춘 부드러운 상승음.\n\n장면 4 : 가장 밝은 화음 뒤 자연스럽게 잔향으로 마무리.\n\n━━━━━━━━━━━━━━━━━━\n\n[장면 연결]\n\n장면 1 → 2 : 장면 1의 음식 위치·시선·카메라 축을 그대로 이어 한 입 행동으로 연결한다.\n\n장면 2 → 3 : 최초 변화의 빛이 끊기지 않고 털과 꼬리로 이동한다.\n\n장면 3 → 4 : 이마 문양에 모인 마지막 빛이 가라앉으며 최종 디자인이 완성된다.\n\n장면 4 → 루프 시작 : ${ending}의 마지막 시선 또는 꼬리 움직임을 음식이 있던 장면 1 방향으로 자연스럽게 잇는다.\n\n━━━━━━━━━━━━━━━━━━\n\n[공통 캐릭터 고정 프롬프트]\n\n첨부된 기준 이미지 속 동일한 캐릭터, 동일한 얼굴 구조·눈·코·이마 문양·귀·체형·신체 비율. 모든 장면에서 정확히 9개의 꼬리. 장면 1은 원래 모습, 장면 2부터 음식 영향이 점진적으로 나타나며 장면 4에서만 완전 변신. 캐릭터 자체는 음식으로 교체되지 않고 ${food}의 특성만 원래 캐릭터에 융합된다. 4개 장면의 ${place}, 조명, 시간대와 시각적 세계관을 연속적으로 유지.\n\n━━━━━━━━━━━━━━━━━━\n\n[공통 네거티브 프롬프트]\n\ndifferent character, inconsistent character, inconsistent face, wrong eye color, missing forehead marking, extra tails, fewer tails, more than nine tails, less than nine tails, duplicate tails, extra legs, extra ears, extra eyes, duplicate body parts, malformed anatomy, deformed face, human full body, human face, visible human head, visible human torso, crowd, background people, additional characters, additional animals, unrelated creatures, anthropomorphic food character, different food, additional food, food changing between scenes, food regenerating, missing bite marks, incorrect food interaction, food clipping through mouth, floating food without interaction, transformation before eating, instant full transformation, transformation regression, character replacement, character completely made of food, missing original character identity, teleporting character, inconsistent background, inconsistent lighting, sudden environment change, unrelated accessories, excessive accessories, unrelated magical effects, excessive particles, obscured face, obscured eyes, horror transformation, grotesque mutation, gore, injury, text, subtitles, captions, speech bubbles, logo, watermark, UI.`;
  const continuityLock = `[장면 연속성 고정 지시]\n\n모든 다음 장면의 첫 프레임은 바로 이전 장면의 마지막 프레임을 그대로 이어받는다. 캐릭터의 얼굴·눈·이마 문양·체형·정확히 9개인 꼬리·방향·발 위치를 바꾸지 않는다. ${food}의 위치와 한 입 베어 문 상태를 유지하며 음식이 되돌아오거나 새 음식이 생기지 않는다. ${place}의 시간대·조명 방향·배경 물체·카메라 축과 렌즈 거리를 유지한다. 변신 진행도는 장면 1의 0% → 장면 2의 초기 → 장면 3의 중간 → 장면 4의 100% 순서로만 증가한다. 각 장면 시작에서 순간이동, 리셋, 색만 바뀌는 점프 컷을 금지하고, 이전 장면에서 진행 중이던 행동·빛·입자·카메라 움직임을 다음 장면 첫 1초에 자연스럽게 이어간다.`;
  const omniSoundDirection = `[사운드 디렉션 — 영상 전체에서 고정]\n\nBGM 마스터 : ${place}의 공기감과 ${food}의 질감을 반영한 무보컬 판타지 팝. 같은 템포·조성·주 멜로디·악기 편성을 영상 전체에서 유지한다. 장면별로 다른 곡을 시작하지 않는다.\n\n사운드 팔레트 : 부드러운 펠트 피아노, 얇은 글로켄슈필, 따뜻한 신스 패드, 매우 낮은 볼륨의 현장 앰비언스. 리버브 공간감은 처음부터 끝까지 동일한 거리감으로 고정한다.\n\n장면 1 : 주 멜로디의 짧은 2마디 도입과 ${place}의 아주 약한 현장음.\n\n장면 2 : 같은 멜로디 위에 한입 소리와 작은 벨 한 음만 더한다.\n\n장면 3 : 같은 코드 진행을 유지하고, 변화 시작점에만 은은한 결정음을 동기화한다.\n\n장면 4 : 기존 주 멜로디의 마지막 화음으로 해결하고, 꼬리 스침과 숨소리를 남긴 채 1.5초 이상 자연스러운 잔향으로 마무리한다.\n\n믹스 규칙 : 전 컷의 음량·공간감·노이즈 바닥을 일관되게 유지한다. 갑작스러운 음악 교체, 박자 변화, 보컬곡, 과도한 효과음, 장면 전환마다 새 효과음을 금지한다.`;
  const flowClipLock = `[Google Flow · 클립 추가 연결 제작 지시]\n\n아래 장면 1~4는 각각 별도 영상 클립으로 생성한다. 단, 다음 클립의 첫 프레임은 이전 클립의 마지막 프레임을 그대로 이어받는다는 원칙을 반드시 지킨다. Flow에서 장면 1을 만든 뒤, 해당 클립의 마지막 프레임·동일한 Ingredients·아래 다음 장면 프롬프트를 사용해 장면 2를 생성하고 같은 방식으로 장면 3, 4를 ‘클립 추가’로 연결한다.\n\n모든 클립에서 동일한 캐릭터, 음식, 배경 물체, 시간대, 조명 방향, 렌즈 거리, 카메라 이동 방향, BGM 주제와 앰비언스를 유지한다. 각 장면 첫 1초는 이전 장면에서 이미 진행하던 자세·시선·빛·소리의 여운을 이어서 시작한다. 장면 전환에서 재등장, 순간이동, 포즈 초기화, 음식 복원, 검은 화면, 페이드, 음악 재시작을 금지한다.\n\n━━━━━━━━━━━━━━━━━━\n\n`;
  const finalAudioDirection = `[사운드 제작 방식 — 클립 연결 우선]\n\nGoogle Flow에서 생성하는 4개 클립에는 BGM·노래·멜로디·리듬 음악을 생성하지 않는다. 각 클립은 같은 낮은 볼륨의 ${place} 현장 앰비언스와 필요한 행동 효과음만 유지한다. 장면 2~4는 이전 클립의 마지막 1초와 동일한 앰비언스 밀도·리버브 거리·노이즈 바닥으로 시작한다.\n\n최종 편집에서만 32초 길이의 BGM 한 곡을 타임라인 전체에 한 번 깔고, 클립 경계에서 음악을 자르거나 다시 시작하지 않는다. 권장 편집용 BGM: 무보컬, 80–95 BPM, 부드러운 펠트 피아노·가벼운 글로켄슈필·따뜻한 패드, 첫 2초에는 낮게 시작하고 마지막 1.5초에만 자연스럽게 페이드아웃.\n\n생성 금지: AI가 만든 배경음악, 노래, 멜로디 변화, 장면별 음악 교체, 과장된 효과음.`;
  const effectiveFlowClipLock = flowClipLock.replace('BGM 주제와 앰비언스를 유지한다.', '무음에 가까운 동일한 현장 앰비언스만 유지한다. BGM은 생성하지 않는다.');
  const polishedText = effectiveFlowClipLock + text
    .replace('[이번 영상]', '[OMNI 연속 숏폼 제작 패키지]')
    .replace('TikTok 9:16 세로 화면, Google Flow VEO 3.1-LIGHT용.', 'OMNI용 9:16 세로 연속 영상이며, 모든 컷은 이전 컷의 마지막 프레임을 정확히 이어받는다.')
    .replace(/\[BGM\][\s\S]*?장면 4 : 가장 밝은 화음 뒤 자연스럽게 잔향으로 마무리\./, finalAudioDirection)
    .replace('캐릭터 소리 : 으응?', '캐릭터 소리 : 변화가 진행되는 동안 한 번만 들리는 짧고 숨 섞인 여우 울음. 대사나 노래처럼 길게 이어지지 않는다.')
    .replace('[장면 연결]', `${continuityLock}\n\n━━━━━━━━━━━━━━━━━━\n\n[장면 연결]`);
  const characterChangeDirection = `[캐릭터 변화 고정 규칙]\n\n0–25%: 음식은 온전한 상태로 유지하고, 원래 캐릭터의 오른쪽 귀 끝 또는 앞발 한 곳에서만 ${feature}를 닮은 미세한 빛·질감이 시작된다.\n\n25–70%: 그 시작점에서만 빛이 털 결을 따라 가슴과 정확히 9개 꼬리 끝으로 순서대로 이동한다. 얼굴 비율·눈·코·이마 문양·체형·꼬리 수는 절대 바꾸지 않는다.\n\n70–100%: ${colors} 반사광, 절제된 털 질감, 작은 이마 장식만 완성한다. 캐릭터가 음식 자체로 바뀌거나 음식이 몸에 덩어리로 붙는 변신은 금지한다. 음식은 먹은 만큼의 한입 자국·크기 감소를 계속 유지한다.\n\n변화 리듬: 매 1~2초마다 한 부위씩만 자연스럽게 진전한다. 한 프레임에 완성, 되돌림, 꼬리 수 변화, 얼굴 교체, 정지 포즈를 금지한다.`;
  const qualityDirection = `[고품질 영상 잠금]\n\n시각 품질: 캐릭터의 얼굴·눈 반사·털 한 올·음식 표면·한입 자국을 선명하게 유지하는 시네마틱 고해상도 디테일. 얕은 심도는 음식과 얼굴의 행동이 읽힐 때만 사용하고, 꼬리 수와 발 위치가 흐려지지 않게 한다.\n\n카메라 품질: 한 번의 부드러운 돌리·아크 이동만 사용한다. 과도한 줌, 흔들림, 광각 왜곡, 초점 펌핑, 갑작스러운 구도 변경을 금지한다.\n\n일관성 품질: 모든 프레임에서 동일한 캐릭터 모델·털 패턴·이마 문양·정확히 9개 꼬리·음식의 남은 크기·조명 방향·배경 소품을 유지한다. 추가 인물·동물·음식·텍스트·로고·워터마크는 절대 넣지 않는다.`;
  const omniProductionDirection = `[Gemini OMNI · 단일 연속 영상 제작 지시]\n\nTikTok 9:16 세로, 약 32초의 하나의 끊기지 않는 연속 영상으로 생성한다. 아래 4단계의 사건은 컷 분할이 아니라 하나의 카메라 이동 안에서 자연스럽게 이어진다. 동일한 캐릭터·음식·배경·시간대·조명·카메라 축을 끝까지 유지하며, 점프컷·페이드·검은 화면·리셋을 금지한다.\n\n`;
  const omniAudioDirection = `[OMNI 오디오 연출 — 영상 전체에서 일관되게]\n\nBGM: ${place}의 공기감과 ${food}의 질감을 반영한 무보컬 판타지 팝 한 곡. 86–92 BPM, 부드러운 펠트 피아노·가벼운 글로켄슈필·따뜻한 신스 패드만 사용한다. 0초부터 같은 조성·템포·주 멜로디를 유지하고, 마지막 1.5초에만 자연스럽게 잔향으로 감쇠한다. 장면마다 새 음악을 시작하거나 보컬·노래·급격한 박자 변화를 넣지 않는다.\n\n효과음: 1단계에는 ${place}의 낮은 볼륨 앰비언스와 두 번의 부드러운 발소리, 2단계에는 실제 한입 소리와 한 번의 작은 벨, 3단계에는 변화가 시작한 부위를 따라가는 아주 약한 결정음과 털 스침, 4단계에는 꼬리 스침·가벼운 착지음만 사용한다. 모든 효과음은 화면 행동과 정확히 동기화하고, 같은 리버브 거리·음량 바닥을 유지한다.\n\n캐릭터 음성: 변화 순간에만 0.5초 이하의 낮고 부드러운 여우 소리 한 번. 사람 대사, 내레이션, 긴 울음, 노래, 반복 음성은 금지한다.`;
  const flowPrompt = `${polishedText}\n\n━━━━━━━━━━━━━━━━━━\n\n${characterChangeDirection}\n\n━━━━━━━━━━━━━━━━━━\n\n${qualityDirection}`;
  const omniPrompt = `${polishedText.replace(effectiveFlowClipLock, omniProductionDirection).replace(finalAudioDirection, omniAudioDirection)}\n\n━━━━━━━━━━━━━━━━━━\n\n${characterChangeDirection}\n\n━━━━━━━━━━━━━━━━━━\n\n${qualityDirection}`;
  const combinedPrompt = `[Gemini OMNI 버전]\n\n${omniPrompt}\n\n━━━━━━━━━━━━━━━━━━\n\n[Google Flow 버전]\n\n${flowPrompt}`;
  return { title, food, signature, prompt: combinedPrompt, omniPrompt, flowPrompt, summary: `${place} · ${method[0]} · ${ending}` };
}

async function initSupabase(){
  try {
    dbClient = window.supabase.createClient(CONFIG.url, CONFIG.anonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } });
    let { data: { session } } = await dbClient.auth.getSession();
    if (session?.user?.is_anonymous) { await dbClient.auth.signOut(); session = null; }
    if (session?.user) await activateSession(session);
    else prepareAuth('로그인 없이 프롬프트를 만들 수 있습니다. 보관할 때만 ID 로그인이 필요합니다.');
  } catch (error) { console.warn(error); prepareAuth(`로그인 연결을 준비하지 못했습니다: ${error.message}`); }
}
function prepareAuth(message){
  $('auth-message').textContent = message;
  setSync('ID 로그인 필요');
}
function showAuthGate(message){ prepareAuth(message); $('auth-gate').hidden = false; }
async function activateSession(session){
  userId = session?.user?.id;
  if (!userId) throw new Error('로그인 세션을 확인할 수 없습니다.');
  $('auth-gate').hidden = true; $('sign-in-open').hidden = true; $('sign-out').hidden = false; $('sync-local').hidden = false;
  setSync('내 보관함 연결됨', true); await loadArchive();
}
async function submitAccount(create){
  if (!dbClient) return showAuthGate('연결을 준비 중입니다. 잠시 후 다시 시도해 주세요.');
  const loginId = $('login-id').value.trim().toLowerCase(), password = $('login-password').value;
  if (!validLoginId(loginId)) return $('auth-message').textContent = '아이디는 영문·숫자·._-만 사용해 3~30자로 입력해 주세요.';
  if (password.length < 8) return $('auth-message').textContent = '비밀번호는 8자 이상으로 입력해 주세요.';
  $('auth-message').textContent = create ? '새 ID를 만드는 중…' : '로그인 중…';
  const result = create
    ? await dbClient.auth.signUp({ email: accountEmail(loginId), password, options: { data: { display_id: loginId } } })
    : await dbClient.auth.signInWithPassword({ email: accountEmail(loginId), password });
  if (result.error) return $('auth-message').textContent = result.error.message;
  if (!result.data.session) return $('auth-message').textContent = '새 ID는 만들어졌지만 이메일 확인이 켜져 있습니다. Supabase 대시보드 Auth > Providers > Email에서 Confirm email을 끈 뒤 다시 로그인해 주세요.';
  await activateSession(result.data.session);
}
$('auth-form').onsubmit = async event => { event.preventDefault(); await submitAccount(false); };
$('sign-up').onclick = () => submitAccount(true);
$('sign-in-open').onclick = () => showAuthGate('ID와 비밀번호로 로그인하면 내 보관함을 불러옵니다.');
$('sign-out').onclick = async () => {
  if (dbClient) await dbClient.auth.signOut();
  userId = null; archive = []; $('sign-out').hidden = true; $('sync-local').hidden = true; $('sign-in-open').hidden = false;
  prepareAuth('로그아웃되었습니다. 프롬프트는 계속 만들 수 있으며, 보관하려면 다시 로그인해 주세요.');
};
function readLocalArchive(){
  try {
    const saved = JSON.parse(localStorage.getItem(localArchiveKey()) || '[]');
    return Array.isArray(saved) ? saved.map(item => ({ ...item, storage: 'local' })) : [];
  } catch (error) {
    console.warn('로컬 보관함을 읽지 못했습니다.', error);
    return [];
  }
}
function readArchiveKey(key){
  try { const saved = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(saved) ? saved : []; }
  catch { return []; }
}
function uploadCandidates(){
  const merged = [...readArchiveKey('veo-prompt-archive'), ...readArchiveKey('veo-prompt-archive:signed-out'), ...localArchiveEntries()];
  return merged.filter((item, index, items) => item?.signature && items.findIndex(other => other.signature === item.signature) === index);
}
function localArchiveEntries(){ return readLocalArchive().map(({ storage, ...item }) => item); }
function saveLocalArchiveItem(item){
  const entries = localArchiveEntries().filter(entry => entry.id !== item.id && entry.signature !== item.signature);
  localStorage.setItem(localArchiveKey(), JSON.stringify([{ ...item }, ...entries]));
}
function saveLocalStoryboard(item, storyboard){
  const entries = localArchiveEntries();
  const hasMatch = entries.some(entry => entry.id === item.id || (item.signature && entry.signature === item.signature));
  if (hasMatch) localStorage.setItem(localArchiveKey(), JSON.stringify(entries.map(entry =>
    (entry.id === item.id || (item.signature && entry.signature === item.signature)) ? { ...entry, storyboard } : entry
  )));
}
function loadLocalArchive(){ archive = readLocalArchive(); }
async function loadArchive(){
  const { data, error } = await dbClient.from('veo_prompt_archive').select('*').order('created_at',{ascending:false});
  if (error) { console.warn(error); loadLocalArchive(); return; }
  const cloud = (data || []).map(item => ({ ...item, storage: 'cloud' }));
  const localOnly = readLocalArchive().filter(local => !cloud.some(remote => remote.id === local.id || remote.signature === local.signature));
  archive = [...cloud, ...localOnly].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  // The archive is rendered in archive.html. Here it only prevents duplicate concepts.
}
async function uploadLocalArchive(){
  if (!dbClient || !userId) return alert('먼저 ID로 로그인해 주세요.');
  const candidates = uploadCandidates();
  if (!candidates.length) return alert('이 PC에서 업로드할 보관 결과를 찾지 못했습니다.');
  const { data: cloud, error: readError } = await dbClient.from('veo_prompt_archive').select('id,signature');
  if (readError) return alert(`수파베이스 보관함을 읽지 못했습니다.\n${readError.message}\n\nsupabase-setup.sql을 다시 실행해 주세요.`);
  const existing = new Set((cloud || []).map(item => item.signature));
  let uploaded = 0, skipped = 0, failed = 0;
  $('sync-local').disabled = true; $('sync-local').textContent = '업로드 중…';
  for (const item of candidates) {
    if (existing.has(item.signature)) { skipped++; continue; }
    const base = { user_id:userId, title:item.title, food:item.food, signature:item.signature, prompt:item.prompt, omni_prompt:item.omniPrompt || item.omni_prompt || null, flow_prompt:item.flowPrompt || item.flow_prompt || null, summary:item.summary, created_at:item.created_at || new Date().toISOString() };
    let { error } = await dbClient.from('veo_prompt_archive').insert({ ...base, storyboard:item.storyboard || null });
    if (error && /storyboard|omni_prompt|flow_prompt/i.test(error.message)) ({ error } = await dbClient.from('veo_prompt_archive').insert({ user_id:base.user_id, title:base.title, food:base.food, signature:base.signature, prompt:base.prompt, summary:base.summary, created_at:base.created_at }));
    if (error) { console.warn('로컬 보관함 업로드 실패:', error.message); failed++; }
    else { existing.add(item.signature); uploaded++; }
  }
  $('sync-local').disabled = false; $('sync-local').textContent = 'PC 보관함 업로드';
  await loadArchive();
  alert(`업로드 완료: ${uploaded}개\n이미 수파베이스에 있음: ${skipped}개${failed ? `\n실패: ${failed}개 — supabase-setup.sql을 다시 실행한 뒤 재시도해 주세요.` : ''}`);
}
async function archiveCurrent(){
  if (!current) return;
  const item = { ...current, id: crypto.randomUUID(), user_id:userId, created_at:new Date().toISOString() };
  if (hasConflict(item.signature)) return alert('동일한 구조의 결과가 이미 보관되어 있습니다. 새 프롬프트를 생성해 주세요.');
  saveLocalArchiveItem(item);
  if (dbClient && userId) {
    const base = { user_id:userId, title:item.title, food:item.food, signature:item.signature, prompt:item.prompt, omni_prompt:item.omniPrompt || item.omni_prompt || null, flow_prompt:item.flowPrompt || item.flow_prompt || null, summary:item.summary };
    let { data: saved, error } = await dbClient.from('veo_prompt_archive').insert({ ...base, storyboard:item.storyboard || null }).select('id').single();
    if (error && /storyboard|omni_prompt|flow_prompt/i.test(error.message)) ({ data: saved, error } = await dbClient.from('veo_prompt_archive').insert({ user_id:base.user_id, title:base.title, food:base.food, signature:base.signature, prompt:base.prompt, summary:base.summary }).select('id').single());
    if (error) {
      loadLocalArchive();
      $('archive').disabled = true; $('archive').textContent = '보관됨';
      return alert(`수파베이스 저장에는 실패했지만 이 PC 보관함에는 저장했습니다.\n${error.message}\n\nSupabase SQL Editor에서 supabase-setup.sql을 다시 실행해 주세요.`);
    }
    if (!saved?.id) {
      loadLocalArchive();
      $('archive').disabled = true; $('archive').textContent = '보관됨';
      return alert('수파베이스 저장 확인에 실패했습니다. 이 PC 보관함에는 저장했습니다.');
    }
    await loadArchive();
  } else { loadLocalArchive(); }
  $('archive').disabled = true; $('archive').textContent = '보관됨';
}
$('generate').onclick = () => { current = buildPrompt(selectedInputs()); $('result-title').textContent = `${current.title} · Gemini OMNI`; $('output').textContent = current.omniPrompt; setStageCopyActions(false); $('original-prompt').disabled = false; $('flow-prompt').disabled = false; $('storyboard').disabled = false; $('regenerate-storyboard').disabled = true; $('copy').disabled = false; $('archive').disabled = false; $('archive').textContent = '보관'; };
$('storyboard').onclick = async () => {
  if (!current) return;
  const preservedStoryboard = current.storyboard || savedStoryboard(current);
  if (preservedStoryboard?.includes('[Google Flow · Veo 3.1 Lite Extend 단계별 제작 v6 · TikTok 32초]')) {
    $('result-title').textContent = `${current.title} · 저장된 스토리보드`;
    $('output').textContent = preservedStoryboard;
    setStageCopyActions(true);
    $('regenerate-storyboard').disabled = false;
    $('copy').disabled = false;
    return;
  }
  const [food, place] = current.title.split(' · ');
  const [, foodFeature, foodColors] = foodProfile(food);
  const storyboardDirections = [
    '카메라는 낮은 눈높이에서 음식과 얼굴 사이를 부드럽게 반원으로 이동한다.',
    '카메라는 캐릭터의 왼쪽 앞발에서 시작해 꼬리 끝을 따라 천천히 얼굴로 올라간다.',
    '카메라는 음식의 질감 클로즈업에서 시작해 같은 축을 유지한 채 중간 거리로 물러난다.',
    '카메라는 캐릭터 정면에서 아주 느린 푸시인으로 감정 변화를 따라간다.'
  ];
  let direction = pick(storyboardDirections);
  while (current.previousStoryboard?.includes(direction)) direction = pick(storyboardDirections);
  current.previousStoryboard = null;
  const anchor = `same attached-reference nine-tailed character, identical face, eye color, forehead marking, body proportions, exact nine tails, same ${place}, consistent time of day and lighting, vertical 9:16`;
  const storyboard = `[스토리보드 — 이미지 → 연속 영상 제작]\n\n[공통 이미지 고정값]\n${anchor}. ${food}는 장면마다 같은 크기·위치·먹힌 상태를 유지한다. 캐릭터가 음식으로 교체되지 않는다.\n\n[컷 1 | 기준 이미지 | 변신 0%]\n이미지 생성 프롬프트 : ${anchor}, full original appearance, ${food} resting in front of the character, character looking toward it, medium eye-level shot, clean background, no transformation.\n이미지 체크 : 음식은 온전함, 꼬리는 정확히 9개, 캐릭터 방향과 카메라 축을 다음 컷에 유지.\n\n[컷 2 | 섭취 직후 | 초기 변신]\n이미지 생성 프롬프트 : use Cut 1 as composition reference, same camera axis and character position, character has one visible bite of the same ${food}, only one subtle first transformation detail at ear tip or paw, all other features unchanged.\n이미지 체크 : 컷 1의 마지막 자세·음식 위치를 그대로 유지하고, 한 입 베어 문 자국을 명확히 표시.\n\n[컷 3 | 진행 중 | 중간 변신]\n이미지 생성 프롬프트 : use Cut 2 as composition reference, same setting and lighting, transformation progresses continuously from the first changed area through fur and exact nine tail tips, 50–70 percent complete, no full transformation yet.\n이미지 체크 : 변화가 역행하지 않고, 음식은 컷 2의 먹힌 상태에서 더 줄어들지 않음.\n\n[컷 4 | 완성 | 변신 100%]\n이미지 생성 프롬프트 : use Cut 3 as composition reference, same character identity and exact nine tails, complete food-inspired fur texture and small forehead ornament, final pose with face and all tails visible, same ${place}.\n이미지 체크 : 컷 3의 진행 중 빛·입자·카메라 방향을 이어 최종 변화만 완성.\n\n━━━━━━━━━━━━━━━━━━\n\n[이미지 4장을 한 영상으로 잇는 VEO 프롬프트]\nUse the four supplied storyboard images as sequential keyframes. Start exactly from image 1, then move naturally into image 2, image 3, and image 4. Preserve the same character, face, forehead marking, body proportions, exact nine tails, ${food}, ${place}, background, time of day, lighting direction, and camera axis across the entire video. Between each keyframe, animate only the visible difference: food interaction first, initial change second, gradual fur-and-tail transformation third, final pose last. No teleporting, no reset, no new food, no regenerated food, no sudden environment change, no character replacement. The final motion should flow from the prior image for at least one second before reaching the next keyframe. Vertical 9:16, gentle camera motion only, physically believable contact and bite marks.\n\n[컷 연결 지시]\n1→2: 음식과 캐릭터 시선은 그대로, 고개와 앞발만 자연스럽게 움직여 한 입을 먹는다.\n2→3: 최초 변화 지점에서 시작한 빛이 끊기지 않고 털과 꼬리 끝으로 천천히 이동한다.\n3→4: 진행 중인 입자와 빛이 잔잔히 가라앉으며 최종 포즈로 완성된다.`;
  const lockedStoryboard = storyboard
    .replace(`full original appearance, ${food} resting`, `full original appearance, one locked ${food} prop only, whole and unchanged, resting`)
    .replace(`character has one visible bite of the same ${food}`, `character has one visible bite of the exact same locked ${food} prop; preserve its original shape, color, toppings, wrapper or plate, and only the single bite mark changes it`)
    .replace('same setting and lighting, transformation progresses', `same setting and lighting, the exact same ${food} from Cut 2 remains visible with identical size, shape, color, placement, and identical single bite mark; transformation progresses`)
    .replace(`same character identity and exact nine tails, complete`, `same character identity and exact nine tails, the exact same ${food} from Cuts 2 and 3 remains visible with identical size, shape, color, placement, and identical single bite mark; complete`)
    + `\n\n[음식 연속성 절대 고정 — 이미지 생성 전용]\n음식은 캐릭터와 별개의 고정 소품이다. 음식 종류·색·질감·토핑·포장·접시·크기·위치를 바꾸지 않는다. 음식이 마법처럼 변형되거나, 녹거나, 증식하거나, 다른 음식으로 교체되거나, 캐릭터 몸의 일부가 되면 안 된다. 컷 1은 온전한 음식 1개만 보인다. 컷 2에서 한 번만 베어 문 자국을 만들고, 컷 3·4에서는 그 한입 자국의 모양·크기·위치를 정확히 유지한다. 캐릭터의 변신 효과는 음식이 아닌 캐릭터의 털·꼬리·이마 문양에서만 일어난다.`;
  const omniStoryboard = `[이번 스토리보드 연출 방향]\n${direction}\n\n` + lockedStoryboard
    .replace('[스토리보드 — 이미지 → 연속 영상 제작]', '[OMNI 스토리보드 — Google Flow 클립 추가 연결]')
    .replace('[이미지 4장을 한 영상으로 잇는 VEO 프롬프트]', '[Google Flow용 4개 클립 연결 공통 프롬프트]')
    .replace('Use the four supplied storyboard images as sequential keyframes.', 'Create four separate clips, then add them in order in Google Flow. Use the storyboard images as sequential reference states: each next clip must begin exactly from the previous clip’s final frame.')
    .replace('Vertical 9:16, gentle camera motion only, physically believable contact and bite marks.', 'Vertical 9:16, gentle camera motion only, physically believable contact and bite marks. For every clip after clip 1, preserve the prior clip’s final pose for the first second, then continue only the next action. Keep one continuous sound world: the same soft felt-piano and glockenspiel motif, steady tempo, consistent room tone, and restrained matching reverb from first frame through the final tail. Do not restart music or replace ambience at any cut.')
    + `\n\n━━━━━━━━━━━━━━━━━━\n\n[OMNI 대본 · 4컷 연기 설계]\n\n컷 1 (0–2초) : ${place}의 고정된 공기감 속에서 캐릭터는 ${food}를 발견한다. 대사 없이 코끝과 시선으로 호기심을 표현하고, 마지막 0.5초에는 음식에 시선을 고정한다.\n\n컷 2 (2–4초) : 직전 자세 그대로 한 입을 먹는다. 놀람은 과장하지 않고, 짧고 숨 섞인 여우 울음 한 번만 낸다. 음악의 기존 멜로디 위에 한입 소리와 작은 벨 한 음만 얹는다.\n\n컷 3 (4–6초) : 첫 변화 지점에서 시작한 빛을 눈으로 따라가며 한 걸음 물러난다. 털·꼬리·이마 장식의 변화는 순차적으로 진행되고, 카메라는 꼬리 끝을 따라 얼굴로 되돌아온다.\n\n컷 4 (6–8초) : 변화가 멈춘 뒤 1초간 최종 모습에 적응하는 숨 고르기를 보여 준다. 음식과 장소에 어울리는 낮고 안정적인 최종 포즈를 잡고, 얼굴과 9개 꼬리를 모두 보인다. 마지막 표정과 꼬리의 미세한 움직임을 남기며 동일한 BGM의 잔향으로 종료한다.\n\n[OMNI 오디오 연속성 잠금]\n한 곡만 사용한다: 같은 템포, 조성, 2마디 주 멜로디, 펠트 피아노·글로켄슈필·패드 편성을 영상 전체에 유지한다. ${place}의 앰비언스와 동일한 리버브 거리감을 모든 컷에 유지한다. 장면 전환에서 무음, 음악 재시작, 새 배경음, 말이 많은 내레이션, 과장된 효과음을 넣지 않는다.`;
  const tiktokStoryboard = omniStoryboard
    .replace('컷 1 (0–2초)', '클립 1 (0–6초)')
    .replace('컷 2 (2–4초)', '클립 2 (6–12초)')
    .replace('컷 3 (4–6초)', '클립 3 (12–18초)')
    .replace('컷 4 (6–8초)', '클립 4 (18–24초)')
    + `\n\n[틱톡 최종 편집 길이]\n총 약 24초: 클립 1~4를 각각 6초로 생성해 순서대로 연결한다. 첫 2초 안에 음식과 캐릭터의 호기심을 명확히 보여 주고, 6~18초에 변신을 진행하며, 마지막 6초는 완성 모습과 잔향을 남긴다. 9:16 세로, 사운드 온, 마지막 프레임은 첫 장면의 시선 방향으로 이어져 반복 재생에도 자연스럽게 보이게 한다.`;
  const connectedStoryboard = tiktokStoryboard + `\n\n━━━━━━━━━━━━━━━━━━\n\n[Google Flow · 클립별 입력 프롬프트 — 반드시 순서대로 생성]\n\n[클립 1 | 0–6초 | 시작 상태 만들기]\nGenerate a 6-second vertical 9:16 clip. ${anchor}. ${food} is whole and placed directly in front of the character. ${direction} The character notices the food, takes two small steps, and ends with nose close to the food, eyes fixed on it, front paws planted, all nine tails relaxed in the same visible arrangement. Keep the final 1 second almost still: this exact pose, food position, lighting, camera axis, room tone, and soft felt-piano/glockenspiel motif become the locked handoff for clip 2. No bite yet, no transformation, no fade or cut.\n\n[클립 2 | 6–12초 | 클립 1의 마지막 프레임에서 시작]\nGenerate a 6-second vertical 9:16 continuation of clip 1, not a new scene. First 1 second: reproduce clip 1’s final pose exactly — same nose-to-food distance, paws, nine tails, food position, lighting direction, lens, camera axis, and the same BGM phrase already in progress. Then the character gently bites the same ${food}; preserve one clear bite mark and its reduced shape. Only a tiny first change begins at one ear tip or one front paw. End with the character looking at that first changed point while the small light remains in motion. No reset, no new food, no background change, no music restart.\n\n[클립 3 | 12–18초 | 클립 2의 빛과 자세를 이어받기]\nGenerate a 6-second vertical 9:16 continuation of clip 2, not a new scene. First 1 second: keep the exact final pose from clip 2, including the bite mark, the first changed area, the moving light, camera axis, background, and the same continuous BGM. The character takes one small backward step while the existing light travels continuously from the first changed area through fur and toward all nine tail tips. Transformation reaches 50–70 percent only; it never jumps ahead or reverses. End with the light gathering at the forehead marking, body facing the same direction, and the same food still visible in its already-bitten state.\n\n[클립 4 | 18–24초 | 클립 3의 마지막 프레임에서 완성]\nGenerate a 6-second vertical 9:16 continuation of clip 3, not a new scene. First 1 second: exactly preserve clip 3’s final body direction, food bite state, forehead light, camera axis, lighting, background objects, and uninterrupted BGM. Let the gathered light settle naturally; complete the food-inspired fur texture and small forehead ornament only now. The character holds a calm final pose with face and exactly nine tails visible. In the last 1.5 seconds, keep the same music resolving into one soft tail, with only tail rustle and room ambience. End facing toward the food/clip 1 sightline for a loopable TikTok ending. No fade to black, no new music, no text, no logo.\n\n[클립 연결 검수]\n1→2: 클립 2 첫 프레임이 클립 1 마지막 프레임과 일치하는가?\n2→3: 한 입 자국·최초 변화 부위·움직이는 빛이 끊기지 않는가?\n3→4: 변신 진행도와 이마의 빛이 자연스럽게 100%로만 진행하는가?\n전 구간: 같은 캐릭터·정확히 9개 꼬리·음식·배경·조명·렌즈·카메라 축·BGM 테마가 유지되는가?`;
  const finalConnectedStoryboard = connectedStoryboard + `\n\n━━━━━━━━━━━━━━━━━━\n\n[최우선 오디오 규칙 — 앞선 BGM 지시보다 우선]\nGoogle Flow에서 각 클립을 생성할 때는 BGM·노래·멜로디를 만들지 않는다. 클립 1~4에는 동일한 낮은 볼륨의 ${place} 현장 앰비언스와 행동에 필요한 최소 효과음만 사용한다. 클립 2~4는 이전 클립 마지막 1초의 앰비언스·리버브·노이즈 바닥을 정확히 이어받는다.\n\n클립 4개를 연결한 뒤에만 편집 프로그램에서 24초짜리 무보컬 BGM 한 곡을 전체 타임라인에 한 번 올린다. BGM은 80–95 BPM, 부드러운 펠트 피아노·가벼운 글로켄슈필·따뜻한 패드 구성으로 시작부터 끝까지 한 곡만 사용하고, 마지막 1.5초에만 페이드아웃한다. 클립 경계에서는 음악을 자르거나 다시 시작하지 않는다.`;
  const extendStoryboard = `[Google Flow · Veo 3.1 Lite Extend 단계별 제작]\n\n[사용 방법]\n이 작업은 독립 클립 4개를 만드는 방식이 아니다. TikTok용 약 24초 완성본을 위해 첫 8초 영상을 만든 뒤, 그 영상에서 Extend를 2회 실행한다. 각 Extend는 바로 이전 영상의 마지막 프레임과 진행 중인 움직임을 자동으로 이어받는다. 모델은 Veo 3.1 Lite, 세로 9:16, 각 단계 8초로 설정한다. 매 단계 같은 캐릭터 기준 이미지와 같은 음식 기준 이미지를 Ingredients로 유지한다.\n\n[공통 고정값]\n${anchor}. ${food}는 캐릭터와 별개의 고정 소품이다. 음식의 종류·색·크기·질감·토핑·접시·위치를 바꾸지 않는다. 한 입 자국은 한 번만 만들고 이후 정확히 유지한다. BGM·노래·멜로디는 생성하지 않고, ${place}의 낮은 현장 앰비언스와 필요한 최소 효과음만 생성한다.\n\n━━━━━━━━━━━━━━━━━━\n\n[0단계 | 첫 이미지 만들기]\n이미지 프롬프트 : ${anchor}, full original character appearance, one whole unchanged ${food} prop directly in front of the character, clean composition, medium eye-level shot, no bite, no transformation, no text. ${direction}\n이미지 체크 : 음식은 온전한 1개, 캐릭터는 정확히 9개 꼬리, 이 이미지는 첫 영상의 Start Frame으로 사용한다.\n\n[1단계 | 첫 영상 생성 | 0–8초]\nFlow에서 위 이미지를 Start Frame으로 넣고 아래 프롬프트로 첫 영상을 생성한다.\n\nGenerate an 8-second vertical 9:16 Veo 3.1 Lite video from the supplied start frame. ${anchor}. Keep the exact same whole ${food} prop, position, background, lighting, lens, and camera axis. The character notices the food, takes two small steps, gently bites it once, leaving one clear bite mark. In the final 2 seconds, do NOT settle, pose, pause, or complete the action: the first transformation light is actively traveling from one front paw toward one ear tip, the head is still turning toward that light, and one tail is mid-swing. No music, no song, no fade, no cut, no reset.\n\nExtend 직전 확인 : 마지막 프레임에서 빛·고개·꼬리가 ‘움직이는 중’이어야 한다. 멈춘 포즈면 다른 변형을 선택한다.\n\n[2단계 | 첫 Extend | 8–16초]\n1단계 영상에서 Extend를 누른 뒤, 아래만 입력한다. 새 영상이나 새 Start Frame을 만들지 않는다.\n\nContinue the exact motion already in progress from the final frame immediately. For the first second, keep the same moving paw-to-ear light, head-turn speed, tail-swing direction, bite mark, food size and placement, background, lighting, lens, camera axis, and low room ambience. Then let the transformation progress continuously through fur and toward all nine tail tips, reaching only 50–70 percent. The character takes one small backward step. End while the light is still actively moving from the tail tips toward the forehead marking; do not complete, pause, pose, fade, or introduce new music.\n\nExtend 직전 확인 : 마지막 프레임에서 이마 문양으로 향하는 빛이 여전히 이동 중이어야 한다.\n\n[3단계 | 두 번째 Extend · 완성 | 16–24초]\n2단계 결과 영상에서 다시 Extend를 누르고 아래를 입력한다.\n\nContinue the exact in-progress forehead-bound light from the final frame immediately. For the first second, preserve the existing motion, bite mark, food prop, camera axis, lighting, background, and room ambience without any reset. Let the moving light settle naturally and complete the food-inspired fur texture and small forehead ornament only during the middle of this extension. In the final 2 seconds, the character holds a calm finished pose with face and exactly nine tails visible, while one tail makes a small continuing motion toward the original food direction for a loopable TikTok ending. No music, no new food, no transformation reversal, no fade to black, no text, no logo.\n\n[최종 검수]\n- 0–8초: 음식 발견→한입→최초 변화가 진행 중인 상태로 끝남\n- 8–16초: 이전 움직임을 즉시 이어 중간 변신으로 진행\n- 16–24초: 진행 중인 빛을 이어 최종 변신과 루프 엔딩\n- 전 구간: 같은 캐릭터·정확히 9개 꼬리·동일 음식·동일 배경·조명·카메라 축·현장음 유지`;
  const foodSpecificExtendStoryboard = extendStoryboard + `\n\n━━━━━━━━━━━━━━━━━━\n\n[음식 기반 변신 설계 — 모든 단계 프롬프트에 적용]\n음식 핵심 특징: ${foodFeature}\n색감 기준: ${foodColors}\n\n1단계(0–8초): 캐릭터는 원래 모습이 중심이다. 음식의 ${foodFeature}는 앞발 또는 귀 끝에만 아주 작은 빛·반사·입자 한 가지로 시작한다. 음식 자체의 형태는 변하지 않는다.\n\n2단계(8–16초): 최초 변화 지점에서 시작해 털 결과 정확히 9개 꼬리 끝으로만 ${foodFeature}를 연상시키는 얇은 질감과 ${foodColors} 반사광이 50–70%까지 번진다. 음식 소재가 몸에 덩어리로 붙거나 캐릭터가 음식으로 바뀌지 않는다.\n\n3단계(16–24초): 원래 얼굴·체형·꼬리 구조를 보존한 상태에서, ${foodFeature}에서 얻은 절제된 털 결·색 반사·작은 이마 장식만 완성한다. 최종 변신은 ‘${food} 테마를 입은 같은 캐릭터’여야 하며, 음식 캐릭터나 음식 조각의 집합체가 되어서는 안 된다.\n\n영어 프롬프트에 추가할 핵심 문장: “Food-inspired details must be derived only from ${foodFeature} and ${foodColors}, expressed as subtle fur texture, tail-tip reflections, and one small forehead ornament. Preserve the original character identity; never transform the character or the food prop into literal food.”`;
  const motionSafeStoryboard = foodSpecificExtendStoryboard
    .replace('[Google Flow · Veo 3.1 Lite Extend 단계별 제작]', '[Google Flow · Veo 3.1 Lite Extend 단계별 제작 v6 · TikTok 32초]')
    .replace('TikTok용 약 24초 완성본을 위해 첫 8초 영상을 만든 뒤, 그 영상에서 Extend를 2회 실행한다.', 'TikTok용 약 32초 완성본을 위해 첫 8초 영상을 만든 뒤, 그 영상에서 Extend를 3회 실행한다.')
    .replace('[3단계 | 두 번째 Extend · 완성 | 16–24초]', '[3단계 | 두 번째 Extend · 후반 변신 | 16–24초]')
    .replace('Let the moving light settle naturally and complete the food-inspired fur texture and small forehead ornament only during the middle of this extension. In the final 2 seconds, the character holds a calm finished pose with face and exactly nine tails visible, while one tail makes a small continuing motion toward the original food direction for a loopable TikTok ending.', 'Let the moving light continue through the remaining tail tips and gather at the forehead marking, reaching only 85–90 percent transformation. Keep the head turn and tail swing actively moving through the final frame; do not complete or settle.')
    .replace('- 16–24초: 진행 중인 빛을 이어 최종 변신과 루프 엔딩', '- 16–24초: 후반 변신을 85–90%까지만 진행하고 움직임 유지\n- 24–32초: 세 번째 Extend로 최종 변신과 루프 엔딩')
    .replace('3단계(16–24초): 원래 얼굴·체형·꼬리 구조를 보존한 상태에서,', '3단계(16–24초): 원래 얼굴·체형·꼬리 구조를 보존한 상태에서 변화가 85–90%까지만 진행되며,')
    .replace('No music, no song, no fade, no cut, no reset.', 'No music, no song, no fade, no cut, no reset. Motion must continue through the entire clip. Do not pause, settle into a pose, hold still, or end the action. Keep the head turn, tail swing, and transformation light actively moving until the final frame.')
    .replace('do not complete, pause, pose, fade, or introduce new music.', 'do not complete, pause, pose, fade, or introduce new music. Motion must continue through the entire clip. Do not pause, settle into a pose, hold still, or end the action. Keep the head turn, tail swing, and transformation light actively moving until the final frame.')
    .replace('No music, no new food, no transformation reversal, no fade to black, no text, no logo.', 'No music, no new food, no transformation reversal, no fade to black, no text, no logo. Motion must continue naturally through most of the clip. Do not pause, freeze, or settle before the final 2 seconds. Keep the head turn, tail swing, and transformation light actively moving until the final 2 seconds. Only in the final 2 seconds, let the character settle into a calm finished pose.')
    + `\n\n━━━━━━━━━━━━━━━━━━\n\n[4단계 | 세 번째 Extend · 완성 및 루프 엔딩 | 24–32초]\n3단계 결과 영상에서 다시 Extend를 누르고 아래만 입력한다.\n\nContinue the exact in-progress forehead light, head turn, and tail swing from the final frame immediately. For the first second, preserve the bite mark, food prop, camera axis, lighting, background, and room ambience without any reset. During seconds 2–6, let the moving light settle naturally and complete only the food-inspired fur texture and small forehead ornament. During the final 2 seconds, let the character ease into a calm finished pose with face and exactly nine tails visible, while one tail still makes a small continuing motion toward the original food direction for a loopable TikTok ending. No music, no new food, no transformation reversal, no fade to black, no text, no logo.\n\n[32초 쇼츠 길이 기준]\n총 32초는 TikTok 숏폼에서 음식 발견(0–8초)·한입과 초기 변화(8–16초)·후반 변신(16–24초)·완성 및 루프 엔딩(24–32초)을 충분히 보여 주는 길이이다. 초반 2초 안에 음식과 캐릭터를 명확히 보여 주고, 마지막 2초만 잔향과 최종 포즈로 사용한다.`;
  const antiFreezeStoryboard = `${motionSafeStoryboard}\n\n━━━━━━━━━━━━━━━━━━\n\n[최우선 장면 순서 — 단계별 복사 문장에 이미 반영됨]\n1단계 0–8초: 발견만 한다. 음식은 온전하며, 마지막은 냄새를 맡는 중간 동작이다.\n2단계 8–16초: 섭취만 한다. 같은 음식에 한 번의 한입 자국을 남기고, 끝에 최초 변화 빛만 작게 시작한다.\n3단계 16–24초: 변화가 시작되어 50–70%까지만 진행하고, 마지막도 움직이는 중간 동작이다.\n4단계 24–32초: 완전 변화한다. 완성 후 마지막 1.5초는 얼굴과 정확히 9개 꼬리가 보이는 차분한 최종 포즈로 의도적으로 멈춘다.\n\n[최우선: Extend 끝 멈춤 방지 — 1~3단계에만 적용]\n1~3단계 영상의 마지막 프레임은 ‘완료된 정지 포즈’가 아니라 다음 움직임으로 이어질 중간 동작이어야 한다. 마지막 1.5초에도 고개 회전·귀의 작은 반응·꼬리의 호·호흡에 따른 가슴 움직임·변신 빛의 미세한 흐름 중 최소 3가지를 동시에 계속 움직인다. 카메라도 아주 느린 동일 방향 이동을 멈추지 않는다.\n\n영어로 2·3단계 Extend 프롬프트 끝에 반드시 추가: “The final frame must be caught mid-motion, never a held pose. Motion continues visibly through the last frame: ongoing head turn, ear reaction, breathing, tail arc, flowing transformation light, and slow camera drift. Do not pause, settle, freeze, or resolve the action at the end.”\n\n예외: 4단계는 최종 영상이므로 완전 변화 후 마지막 1.5초에만 의도적으로 정지 포즈를 유지한다.\n\n재생성 규칙: 1~3단계의 마지막 1초가 멈춘 결과는 다음 Extend의 재료로 쓰지 않는다. 바로 이전 단계의 마지막 0.5–1초가 아직 움직이는 버전을 선택해 같은 Extend 프롬프트를 다시 생성한다. 멈춘 영상을 다시 Extend하면 멈춤이 다음 영상에도 이어진다.`;
  $('result-title').textContent = `${current.title} · Google Flow 스토리보드`;
  $('output').textContent = antiFreezeStoryboard;
  setStageCopyActions(true);
  await saveStoryboard(current, antiFreezeStoryboard);
  $('regenerate-storyboard').disabled = false;
  $('copy').disabled = false;
};
$('regenerate-storyboard').onclick = async () => {
  if (!current) return;
  const key = storyboardKey(current);
  const cache = readStoryboardCache();
  current.previousStoryboard = current.storyboard || cache[key] || '';
  delete cache[key];
  localStorage.setItem(STORYBOARD_CACHE_KEY, JSON.stringify(cache));
  current.storyboard = null;
  await $('storyboard').onclick();
};
$('original-prompt').onclick = () => {
  if (!current?.prompt) return;
  $('result-title').textContent = `${current.title || '보관된 결과'} · Gemini OMNI`;
  $('output').textContent = current.omniPrompt || current.omni_prompt || current.prompt;
  setStageCopyActions(false);
  $('copy').disabled = false;
};
$('flow-prompt').onclick = () => {
  if (!current?.prompt) return;
  $('result-title').textContent = `${current.title || '보관된 결과'} · Google Flow`;
  $('output').textContent = current.flowPrompt || current.flow_prompt || current.prompt;
  setStageCopyActions(false);
  $('copy').disabled = false;
};
$('archive').onclick = archiveCurrent;
$('sync-local').onclick = uploadLocalArchive;
$('copy').onclick = async () => { await navigator.clipboard.writeText($('output').textContent); $('copy').textContent = '복사됨'; setTimeout(()=>$('copy').textContent='복사',1300); };
$('copy-full-storyboard').onclick = async () => { const storyboard = current?.storyboard || savedStoryboard(current) || $('output').textContent; await navigator.clipboard.writeText(storyboard); const button = $('copy-full-storyboard'); button.textContent = '전체 복사됨'; setTimeout(() => button.textContent = '전체 스토리보드', 1200); };
document.querySelectorAll('#stage-copy-actions [data-stage]').forEach(button => { button.onclick = () => copyStage(Number(button.dataset.stage)); });
function restoreOpenedArchive(){
  try {
    const saved = localStorage.getItem('tailframe-opened-archive');
    if (!saved) return;
    localStorage.removeItem('tailframe-opened-archive');
    current = JSON.parse(saved);
    if (!current?.prompt) return;
    current.omniPrompt ||= current.omni_prompt || current.prompt;
    current.flowPrompt ||= current.flow_prompt || current.prompt;
    const preservedStoryboard = current.storyboard || savedStoryboard(current);
    const isExtendStoryboard = preservedStoryboard?.includes('[Google Flow · Veo 3.1 Lite Extend 단계별 제작 v6 · TikTok 32초]');
    $('result-title').textContent = isExtendStoryboard ? `${current.title} · 저장된 스토리보드` : (current.title || '보관된 프롬프트');
    $('output').textContent = isExtendStoryboard ? preservedStoryboard : current.omniPrompt;
    setStageCopyActions(isExtendStoryboard);
    $('original-prompt').disabled = false;
    $('flow-prompt').disabled = false;
    $('storyboard').disabled = false;
    $('regenerate-storyboard').disabled = Boolean(isExtendStoryboard);
    $('copy').disabled = false;
    $('archive').disabled = true;
    $('archive').textContent = '보관됨';
  } catch (error) { console.warn('보관 결과를 열지 못했습니다.', error); }
}

async function checkForUpdate(manual = false) {
  if (!window.updater) return;
  const button = $('check-update');
  button.disabled = true; button.textContent = '확인 중…';
  const result = await window.updater.check();
  button.disabled = false;
  if (result.available) {
    button.textContent = `v${result.version} 업데이트`;
    button.onclick = async () => {
      if (!confirm(`v${result.version} 업데이트를 내려받고 앱을 다시 시작할까요?`)) return;
      button.disabled = true; button.textContent = '업데이트 준비 중…';
      const applied = await window.updater.apply();
      if (!applied.started) { button.disabled = false; button.textContent = applied.message || '업데이트 확인'; }
    };
  } else button.textContent = manual && result.error ? '업데이트 연결 실패' : '최신 버전';
}
$('check-update').onclick = () => checkForUpdate(true);
setTimeout(() => checkForUpdate(false), 1200);

// The prompt maker starts from local data immediately; cloud archive connection is loaded after the page appears.
window.connectSupabase = initSupabase;
loadLocalArchive();
restoreOpenedArchive();
