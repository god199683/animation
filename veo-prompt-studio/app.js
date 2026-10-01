/* VEO Prompt Studio — all generated history is stored only after the user presses Archive. */
const CONFIG = {
  url: 'https://pxzerharmpbxvmuomsfo.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXAiLCJyZWYiOiJweHplcmhhcm1wYnh2bXVvbXNmbyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzkwODQwMjQwLCJleHAiOjIxMDY0MTYyNDh9.9O5gSipGaZ66XSnp9FjI9tkIvcir3XZnvp6JBNyPV4A'
};
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
const sounds = ['뀨웅!','먕~','앙?','끼잉!','우웅?'];
let supabase = null, userId = null, archive = [], current = null;
const pick = (items) => items[Math.floor(Math.random() * items.length)];
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
  return { title, food, signature, prompt: text, summary: `${place} · ${method[0]} · ${ending}` };
}

async function initSupabase(){
  try {
    supabase = window.supabase.createClient(CONFIG.url, CONFIG.anonKey);
    let { data: { session } } = await supabase.auth.getSession();
    if (!session) { const { error } = await supabase.auth.signInAnonymously(); if (error) throw error; ({ data: { session } } = await supabase.auth.getSession()); }
    userId = session?.user?.id; if (!userId) throw new Error('익명 세션을 만들 수 없습니다.');
    setSync('Supabase 보관함 연결됨', true); await loadArchive();
  } catch (error) { console.warn(error); setSync('이 브라우저의 임시 보관함 사용 중'); loadLocalArchive(); }
}
function loadLocalArchive(){ archive = JSON.parse(localStorage.getItem('veo-prompt-archive') || '[]'); renderArchive(); }
async function loadArchive(){ const { data, error } = await supabase.from('veo_prompt_archive').select('*').order('created_at',{ascending:false}); if (error) { console.warn(error); loadLocalArchive(); return; } archive = data || []; renderArchive(); }
function renderArchive(){ $('archive-count').textContent = archive.length; const root = $('archive-list'); root.innerHTML = ''; if (!archive.length){ root.innerHTML = '<p class="empty">아직 보관한 프롬프트가 없습니다.</p>'; return; } const template = $('archive-item'); archive.forEach(item => { const node = template.content.cloneNode(true); node.querySelector('h3').textContent = item.title; node.querySelector('.archive-meta').textContent = new Date(item.created_at || Date.now()).toLocaleString('ko-KR'); node.querySelector('.archive-summary').textContent = item.summary || ''; node.querySelector('.view').onclick = () => show(item); node.querySelector('.remove').onclick = () => removeArchive(item.id); root.append(node); }); }
function show(item){ current = item; $('result-title').textContent = item.title; $('output').textContent = item.prompt; $('copy').disabled = false; $('archive').disabled = true; $('archive').textContent = '보관됨'; window.scrollTo({top:0,behavior:'smooth'}); }
async function removeArchive(id){ if (!confirm('이 보관 결과를 삭제할까요?')) return; if (supabase && userId) { const { error } = await supabase.from('veo_prompt_archive').delete().eq('id',id); if (error) return alert(`삭제하지 못했습니다: ${error.message}`); await loadArchive(); } else { archive = archive.filter(x=>x.id !== id); localStorage.setItem('veo-prompt-archive',JSON.stringify(archive)); renderArchive(); } }
async function archiveCurrent(){ if (!current) return; const item = { ...current, id: crypto.randomUUID(), user_id:userId, created_at:new Date().toISOString() }; if (hasConflict(item.signature)) return alert('동일한 구조의 결과가 이미 보관되어 있습니다. 새 프롬프트를 생성해 주세요.'); if (supabase && userId) { const { error } = await supabase.from('veo_prompt_archive').insert({user_id:userId,title:item.title,food:item.food,signature:item.signature,prompt:item.prompt,summary:item.summary}); if (error) return alert(`보관하지 못했습니다: ${error.message}`); await loadArchive(); } else { archive.unshift(item); localStorage.setItem('veo-prompt-archive',JSON.stringify(archive)); renderArchive(); } $('archive').disabled = true; $('archive').textContent = '보관됨'; }
$('generate').onclick = () => { current = buildPrompt(selectedInputs()); $('result-title').textContent = current.title; $('output').textContent = current.prompt; $('copy').disabled = false; $('archive').disabled = false; $('archive').textContent = '보관'; };
$('archive').onclick = archiveCurrent;
$('copy').onclick = async () => { await navigator.clipboard.writeText(current.prompt); $('copy').textContent = '복사됨'; setTimeout(()=>$('copy').textContent='복사',1300); };
$('refresh').onclick = () => supabase && userId ? loadArchive() : loadLocalArchive();
initSupabase();
