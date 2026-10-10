const CONFIG = { url: 'https://pxzerharmpbxvmuomsfo.supabase.co', anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXAiLCJyZWYiOiJweHplcmhhcm1wYnh2bXVvbXNmbyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzkwODQwLCJleHAiOjIxMDY0MTYyNDh9.9O5gSipGaZ66XSnp9FjI9tkIvcir3XZnvp6JBNyPV4A' };
CONFIG.anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4emVyaGFybXBieHZtdW9tc2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NDAyNDAsImV4cCI6MjEwNjQxNjI0MH0.9O5gSipGaZ66XSnp9FjI9tkIvcir3XZnvp6JBNyPV4A';
const $ = id => document.getElementById(id);
const STORY_MODES = ['비밀을 추적하는 미스터리', '엇갈린 기억의 로맨스', '상처를 회복하는 성장극', '관계를 시험하는 휴먼 드라마', '시간 제한이 있는 스릴러', '현실과 환상이 겹치는 판타지'];
const CLIP_BEATS = ['강한 도입 이미지와 인물의 즉각적 목표', '작은 단서 또는 관계의 균열', '행동으로 드러나는 갈등', '예상 밖의 정보 또는 감정 전환', '선택을 강요하는 압박', '감정이 꺾이거나 깊어지는 반응', '다음 편을 부르는 결정적 행동', '마지막 1초의 훅'];
const NAME_HEADS = ['가온', '노을', '다온', '라온', '루아', '마린', '미온', '보름', '새론', '소담', '시온', '아린', '여울', '유담', '이든', '자온', '채온', '하린'];
const NAME_TAILS = ['결', '린', '온', '솔', '담', '율', '윤', '람', '빈', '별', '하', '루'];
const CHARACTER_VISUALS = [
  { silhouette: 'slender young adult with a calm, intelligent gaze', hair: 'soft black bob with one loose strand', wardrobe: 'charcoal wool coat, ivory knit top, and a small brass-key pendant', palette: 'winter navy, muted ivory, aged brass' },
  { silhouette: 'warm-eyed young adult with a restrained, observant presence', hair: 'dark chestnut hair tied low', wardrobe: 'deep olive jacket, cream shirt, and a weathered leather watch', palette: 'olive, cream, warm brown' },
  { silhouette: 'sharp-featured young adult with guarded eyes and a gentle expression underneath', hair: 'short ash-brown hair with a natural side part', wardrobe: 'midnight-blue overshirt, soft gray scarf, and a thin silver ring', palette: 'midnight blue, gray, silver' },
  { silhouette: 'quiet young adult with luminous eyes and an understated confidence', hair: 'long dark hair loosely braided', wardrobe: 'rust-colored cardigan, black trousers, and a tiny glass charm', palette: 'rust, black, amber' }
];
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
let dbClient = null, userId = null, archive = [], current = null;
const normal = value => String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
const localKey = () => `tailframe-drama-archive:${userId || 'signed-out'}`;
const setSync = (text, online = false) => { $('sync-status').textContent = text; $('sync-status').parentElement.classList.toggle('online', online); };
const readLocal = () => { try { const data = JSON.parse(localStorage.getItem(localKey()) || '[]'); return Array.isArray(data) ? data : []; } catch { return []; } };
const writeLocal = items => localStorage.setItem(localKey(), JSON.stringify(items));
const splitKeywords = text => [...new Set(String(text || '').split(/[\n,/#]+/).map(v => v.trim()).filter(Boolean))];
const episodeCountFor = keys => Math.max(3, Math.min(8, 2 + Math.ceil(keys.length / 2)));
const clipCountFor = seconds => seconds === 30 ? 4 : seconds === 45 ? 6 : 8;
function makeOriginalName(used = new Set()) { let name = ''; do { name = `${NAME_HEADS[Math.floor(Math.random() * NAME_HEADS.length)]}${NAME_TAILS[Math.floor(Math.random() * NAME_TAILS.length)]}`; } while (used.has(name)); used.add(name); return name; }
function signatureFor(keys, tone, seconds, mode, cast) { return [keys.map(normal).sort().join('|'), normal(tone), seconds, mode, cast.lead, cast.counterpart].join('::'); }
function keywordKey(keys, tone, seconds) { return [keys.map(normal).sort().join('|'), seconds].join('::'); }
function usedVariantIds(keys, tone, seconds) {
  const key = keywordKey(keys, tone, seconds);
  return new Set(archive.filter(item => keywordKey(String(item.keywords || '').split(/,\s*/), item.tone || '', item.duration_seconds || seconds) === key)
    .map(item => item.story_variant || (String(item.script || '').match(/\[기획 코드: ([^\]]+)\]/) || [])[1]).filter(Boolean));
}
function titleFor(keys, mode) { const [a = '비밀', b = '약속'] = keys; const templates = [`${a}의 마지막 ${b}`, `${b}가 남긴 ${a}`, `${a}, ${b}를 지나`, `${a}를 기억하는 ${b}`]; return templates[Math.floor(Math.random() * templates.length)]; }
function episodeArc(index, total) {
  if (index === 1) return '세계관과 주인공의 결핍을 보여 주고, 피할 수 없는 사건을 시작한다.';
  if (index === total) return '처음의 결핍을 다른 선택으로 마주하고, 감정적 결말과 여운을 남긴다.';
  if (index === Math.ceil(total / 2)) return '사건의 진짜 의미를 뒤집는 중간 반전을 드러낸다.';
  return '새 단서가 관계를 흔들고, 주인공이 더 큰 대가를 치르는 선택을 하게 한다.';
}
function dialogueFor(key, clip, episode, cast) {
  const lines = [
    `“${key}을(를) 찾는 건, 잊기 위해서가 아니야.”`,
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
function sceneDirection(episode, clip, clipCount, keys, cast) {
  const focus = keys[(episode + clip - 2) % keys.length];
  const pressure = keys[(episode + clip - 1) % keys.length];
  const starts = ['낡은 소품을 손끝으로 확인하며', '상대의 표정을 읽으려 한 박자 멈췄다가', '닫히려는 문을 붙잡으며', '숨긴 메시지를 발견한 뒤', '한 걸음 물러서며', '결심한 듯 시선을 들며', '상대에게 선택을 건네며', '대답 대신 행동으로 옮기며'];
  const turns = ['의심을 확신으로 바꾼다', '감춘 상처가 드러난다', '둘 사이의 신뢰가 흔들린다', '이전 장면의 단서가 다른 의미를 얻는다', '피할 수 없던 선택을 받아들인다', '관계의 주도권이 뒤바뀐다', '작지만 돌이킬 수 없는 약속을 한다', '다음 장면을 강하게 요구하는 결정을 내린다'];
  return `${cast.lead}은(는) ${starts[(clip - 1) % starts.length]} “${focus}”의 의미를 좇는다. ${cast.counterpart}의 짧은 반응으로 ${pressure}가 새로운 압박으로 떠오르고, ${cast.lead}은(는) ${turns[(episode + clip - 2) % turns.length]}.`;
}
function makeClip(episode, clip, clipCount, keys, tone, mode, cast) {
  const focus = keys[(episode + clip - 2) % keys.length];
  const next = keys[(episode + clip - 1) % keys.length];
  const beat = CLIP_BEATS[Math.min(clip - 1, CLIP_BEATS.length - 1)];
  const end = clip === clipCount ? `End on a decisive unresolved image involving ${next}; keep motion and room tone alive through the final frame.` : `End mid-action with the character's eye-line, prop position, lighting, camera axis, and ambient sound ready to continue into clip ${clip + 1}.`;
  const direction = sceneDirection(episode, clip, clipCount, keys, cast);
  const line = dialogueFor(focus, clip, episode, cast);
  const prompt = `Generate an 8-second vertical 9:16 cinematic Korean short-drama clip, episode ${episode}, clip ${clip} of ${clipCount}. Genre: ${mode}. Tone: ${tone || 'emotionally grounded cinematic drama'}. Use the locked original character designs supplied for ${cast.lead} and ${cast.counterpart}; exact same faces, hair, wardrobe, age range, body proportions, and signature props. They must never resemble, imitate, or be named after a real person, celebrity, famous fictional character, existing franchise, or copyrighted character identity. Story action: ${direction} Focus on ${focus}; ${next} becomes the pressure point. Start from the preceding final frame with matching pose, eye-line, prop placement, time of day, lighting direction, lens, camera axis, and continuous room tone. One sustained action, one visible emotional turn, and no more than this natural Korean line if dialogue is needed: "${line}". Sound: continuous subtle room tone, footsteps/fabric/prop foley synced to movement, restrained score that carries over without restarting. No captions, subtitles, logo, montage, unexplained person, jump cut, reset, face drift, costume change, or music restart. ${end}`;
  return { clip, beat, focus, direction, line, prompt };
}
function buildDrama(keys, tone, seconds, attempt = 0) {
  const mode = STORY_MODES[attempt % STORY_MODES.length];
  const usedVariants = usedVariantIds(keys, tone, seconds);
  const candidates = STORY_VARIANTS.filter(variant => !usedVariants.has(variant.id));
  const variant = (candidates.length ? candidates : STORY_VARIANTS)[Math.floor(Math.random() * (candidates.length || STORY_VARIANTS.length))];
  const usedNames = new Set();
  const leadVisual = CHARACTER_VISUALS[Math.floor(Math.random() * CHARACTER_VISUALS.length)];
  let counterpartVisual = CHARACTER_VISUALS[Math.floor(Math.random() * CHARACTER_VISUALS.length)];
  if (counterpartVisual === leadVisual) counterpartVisual = CHARACTER_VISUALS[(CHARACTER_VISUALS.indexOf(leadVisual) + 1) % CHARACTER_VISUALS.length];
  const imagePrompt = (name, role, visual) => `Create a single original character reference portrait for a Korean vertical short drama. Character name: ${name}; role: ${role}. ${visual.silhouette}; ${visual.hair}; wearing ${visual.wardrobe}. Palette: ${visual.palette}. Waist-up, three-quarter view, natural skin texture, cinematic soft key light, simple neutral studio background, 9:16 composition. This is a newly invented fictional character only. Do not depict, imitate, resemble, name, or borrow visual traits from any real person, celebrity, famous fictional character, existing franchise, or copyrighted character. No logos, text, watermark, or recognizable branded clothing.`;
  const cast = { lead: makeOriginalName(usedNames), counterpart: makeOriginalName(usedNames) };
  cast.leadImagePrompt = imagePrompt(cast.lead, 'lead', leadVisual);
  cast.counterpartImagePrompt = imagePrompt(cast.counterpart, 'counterpart', counterpartVisual);
  const signature = signatureFor(keys, tone, seconds, mode, cast);
  if (archive.some(item => item.signature === signature) && attempt < STORY_MODES.length - 1) return buildDrama(keys, tone, seconds, attempt + 1);
  const episodeCount = episodeCountFor(keys), clipCount = clipCountFor(seconds), title = titleFor(keys, mode);
  const episodes = Array.from({ length: episodeCount }, (_, offset) => {
    const number = offset + 1, arc = episodeArc(number, episodeCount);
    const clips = Array.from({ length: clipCount }, (_, clipOffset) => makeClip(number, clipOffset + 1, clipCount, keys, tone, mode, cast));
    const premiseBeat = number === 1 ? variant.premise : number === Math.ceil(episodeCount / 2) ? variant.twist : number === episodeCount ? variant.ending : variant.conflict;
    return { number, arc: `${arc} 이번 회차 핵심 사건: ${premiseBeat}`, clips, ending: number === episodeCount ? variant.ending : `${keys[(number + 1) % keys.length]}에 대한 답을 미루는 다음 화 훅.` };
  });
  const header = `[드라마 제작 패키지]\n\n제목: ${title}\n장르: ${mode}\n핵심 키워드: ${keys.join(' · ')}\n톤: ${tone || '감정선이 선명한 시네마틱 드라마'}\n총 ${episodeCount}편 · 회당 약 ${clipCount * 8}초 · 회당 ${clipCount}개 클립(각 8초)\n\n[오리지널 등장인물]\n- ${cast.lead}: 주인공. ${keys[0]}을(를) 피하려 하지만 결국 그 진실을 스스로 선택해야 하는 인물.\n- ${cast.counterpart}: 상대역. 주인공이 원하는 답을 알고 있으나, 답을 주는 대가를 감추고 있는 인물.\n이름·외형·인물 설정은 이 시리즈를 위해 새로 만들었다. 유명인·실존 인물·기존 작품·프랜차이즈·저작권 캐릭터를 닮게 하거나 사용하지 않는다.\n\n[캐릭터 기준 이미지 프롬프트]\n아래 두 프롬프트로 먼저 인물 기준 이미지를 각각 만든 뒤, 이후 모든 클립에 해당 이미지를 참조 이미지로 넣으세요.\n\n${cast.lead} 기준 이미지:\n${cast.leadImagePrompt}\n\n${cast.counterpart} 기준 이미지:\n${cast.counterpartImagePrompt}\n\n[시리즈 성경]\n${cast.lead}은(는) ${keys[0]}을(를) 피할 수 없고, ${cast.counterpart}와의 관계에서 매 회차마다 신뢰·목표·비밀 중 하나를 얻거나 잃는다. 대사는 설명이 아니라 선택과 감정을 드러내야 하며, 침묵·시선·손의 움직임 같은 행동으로도 감정을 전달한다. 모든 회차는 같은 인물 외형, 핵심 소품, 세계관, 색보정, 사운드 질감을 유지한다. 클립을 연결할 때 다음 클립은 직전 마지막 프레임의 자세·시선·소품·조명·카메라 축에서 시작한다.\n`;
  const body = episodes.map(ep => `\n━━━━━━━━━━━━━━━━━━\n\n[${ep.number}화 · 약 ${clipCount * 8}초]\n회차 목표: ${ep.arc}\n엔딩 훅: ${ep.ending}\n\n` + ep.clips.map(c => `[클립 ${c.clip} · 8초]\n장면 기능: ${c.beat}\n대본: ${c.direction}\n핵심 대사: ${c.line}\n연출/Flow 프롬프트:\n${c.prompt}`).join('\n\n')).join('');
  const uniqueHeader = header.replace('[오리지널 등장인물]', `[기획 코드: ${variant.id}]\n\n[로그라인]\n${variant.premise}. ${variant.conflict}.\n\n[오리지널 등장인물]`);
  return { id: crypto.randomUUID(), title, signature, story_variant: variant.id, keywords: keys, tone, cast, duration_seconds: clipCount * 8, episode_count: episodeCount, episodes, script: uniqueHeader + body, summary: `${mode} · ${cast.lead}·${cast.counterpart} · ${episodeCount}편 · 회당 ${clipCount * 8}초`, created_at: new Date().toISOString() };
}
function renderCopyButtons() {
  const characterRoot = $('character-copy-actions'); characterRoot.innerHTML = '';
  if (current?.cast?.leadImagePrompt) {
    characterRoot.hidden = false;
    const label = document.createElement('span'); label.textContent = '캐릭터 기준 이미지 프롬프트'; characterRoot.append(label);
    [['주인공 이미지', current.cast.leadImagePrompt], ['상대역 이미지', current.cast.counterpartImagePrompt]].forEach(([text, prompt]) => {
      const button = document.createElement('button'); button.textContent = text; button.onclick = async () => { await navigator.clipboard.writeText(prompt); const old = button.textContent; button.textContent = '복사됨'; setTimeout(() => button.textContent = old, 900); }; characterRoot.append(button);
    });
  } else characterRoot.hidden = true;
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
$('generate-drama').onclick = () => { const keys = splitKeywords($('keywords').value); if (keys.length < 2) return alert('서로 다른 핵심 키워드를 두 개 이상 입력해 주세요.'); const seconds = Number($('episode-duration').value); current = buildDrama(keys, $('tone').value.trim(), seconds); $('result-title').textContent = `${current.title} · ${current.episode_count}부작`; $('output').textContent = current.script; $('copy').disabled = false; $('archive').disabled = archive.some(item => item.signature === current.signature); $('archive').textContent = $('archive').disabled ? '이미 보관됨' : '보관'; renderCopyButtons(); };
$('copy').onclick = async () => { if (!current) return; await navigator.clipboard.writeText(current.script); $('copy').textContent = '복사됨'; setTimeout(() => $('copy').textContent = '전체 복사', 1100); };
$('archive').onclick = archiveCurrent;
window.connectSupabase = async () => { try { dbClient = window.supabase.createClient(CONFIG.url, CONFIG.anonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } }); const { data: { session } } = await dbClient.auth.getSession(); userId = session?.user?.is_anonymous ? null : session?.user?.id; if (!userId) { setSync('PC 드라마 보관함 사용 중'); return; } const { data, error } = await dbClient.from('drama_archive').select('*').order('created_at', { ascending: false }); if (error) { setSync('PC 드라마 보관함 사용 중'); return; } archive = [...(data || []), ...readLocal().filter(l => !(data || []).some(c => c.signature === l.signature))]; setSync('Supabase 드라마 보관함 연결됨', true); } catch { setSync('PC 드라마 보관함 사용 중'); } };
if (location.search.includes('opened=archive')) { try { current = JSON.parse(localStorage.getItem('tailframe-opened-drama') || 'null'); if (current) { $('result-title').textContent = `${current.title} · ${current.episode_count}부작`; $('output').textContent = current.script; $('copy').disabled = false; $('archive').disabled = true; $('archive').textContent = '보관됨'; renderCopyButtons(); } } catch {} }
archive = readLocal();
