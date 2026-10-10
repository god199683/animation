const CONFIG = { url: 'https://pxzerharmpbxvmuomsfo.supabase.co', anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXAiLCJyZWYiOiJweHplcmhhcm1wYnh2bXVvbXNmbyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzkwODQwLCJleHAiOjIxMDY0MTYyNDh9.9O5gSipGaZ66XSnp9FjI9tkIvcir3XZnvp6JBNyPV4A' };
CONFIG.anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4emVyaGFybXBieHZtdW9tc2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NDAyNDAsImV4cCI6MjEwNjQxNjI0MH0.9O5gSipGaZ66XSnp9FjI9tkIvcir3XZnvp6JBNyPV4A';
const $ = id => document.getElementById(id);
const STORY_MODES = ['비밀을 추적하는 미스터리', '엇갈린 기억의 로맨스', '상처를 회복하는 성장극', '관계를 시험하는 휴먼 드라마', '시간 제한이 있는 스릴러', '현실과 환상이 겹치는 판타지'];
const CLIP_BEATS = ['강한 도입 이미지와 인물의 즉각적 목표', '작은 단서 또는 관계의 균열', '행동으로 드러나는 갈등', '예상 밖의 정보 또는 감정 전환', '선택을 강요하는 압박', '감정이 꺾이거나 깊어지는 반응', '다음 편을 부르는 결정적 행동', '마지막 1초의 훅'];
let dbClient = null, userId = null, archive = [], current = null;
const normal = value => String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
const localKey = () => `tailframe-drama-archive:${userId || 'signed-out'}`;
const setSync = (text, online = false) => { $('sync-status').textContent = text; $('sync-status').parentElement.classList.toggle('online', online); };
const readLocal = () => { try { const data = JSON.parse(localStorage.getItem(localKey()) || '[]'); return Array.isArray(data) ? data : []; } catch { return []; } };
const writeLocal = items => localStorage.setItem(localKey(), JSON.stringify(items));
const splitKeywords = text => [...new Set(String(text || '').split(/[\n,/#]+/).map(v => v.trim()).filter(Boolean))];
const episodeCountFor = keys => Math.max(3, Math.min(8, 2 + Math.ceil(keys.length / 2)));
const clipCountFor = seconds => seconds === 30 ? 4 : seconds === 45 ? 6 : 8;
function signatureFor(keys, tone, seconds, mode) { return [keys.map(normal).sort().join('|'), normal(tone), seconds, mode].join('::'); }
function titleFor(keys, mode) { const [a = '비밀', b = '약속'] = keys; const templates = [`${a}의 마지막 ${b}`, `${b}가 남긴 ${a}`, `${a}, ${b}를 지나`, `${a}를 기억하는 ${b}`]; return templates[Math.floor(Math.random() * templates.length)]; }
function episodeArc(index, total) {
  if (index === 1) return '세계관과 주인공의 결핍을 보여 주고, 피할 수 없는 사건을 시작한다.';
  if (index === total) return '처음의 결핍을 다른 선택으로 마주하고, 감정적 결말과 여운을 남긴다.';
  if (index === Math.ceil(total / 2)) return '사건의 진짜 의미를 뒤집는 중간 반전을 드러낸다.';
  return '새 단서가 관계를 흔들고, 주인공이 더 큰 대가를 치르는 선택을 하게 한다.';
}
function dialogueFor(key, beat, episode) { return `“${key} 때문에… 나는 아직 돌아갈 수 없어.” — ${episode}화, ${beat}`; }
function makeClip(episode, clip, clipCount, keys, tone, mode) {
  const focus = keys[(episode + clip - 2) % keys.length];
  const next = keys[(episode + clip - 1) % keys.length];
  const beat = CLIP_BEATS[Math.min(clip - 1, CLIP_BEATS.length - 1)];
  const end = clip === clipCount ? `End on a decisive unresolved image involving ${next}; keep motion and room tone alive through the final frame.` : `End mid-action with the character's eye-line, prop position, lighting, camera axis, and ambient sound ready to continue into clip ${clip + 1}.`;
  const prompt = `Generate an 8-second vertical 9:16 cinematic drama clip, episode ${episode}, clip ${clip} of ${clipCount}. Genre: ${mode}. Tone: ${tone || 'emotionally grounded cinematic drama'}. This clip's story beat: ${beat}. Focus on ${focus}; let ${next} create the next pressure point. Preserve the same lead character appearance, wardrobe, location world, time of day, lighting direction, lens, camera axis, and ambient sound from the prior clip. Use one clear action, one readable emotional turn, and natural Korean dialogue only if essential: "${dialogueFor(focus, beat, episode)}". No captions, subtitles, logo, montage, unexplained new character, jump cut, reset, or music restart. ${end}`;
  return { clip, beat, focus, prompt };
}
function buildDrama(keys, tone, seconds, attempt = 0) {
  const mode = STORY_MODES[attempt % STORY_MODES.length];
  const signature = signatureFor(keys, tone, seconds, mode);
  if (archive.some(item => item.signature === signature) && attempt < STORY_MODES.length - 1) return buildDrama(keys, tone, seconds, attempt + 1);
  const episodeCount = episodeCountFor(keys), clipCount = clipCountFor(seconds), title = titleFor(keys, mode);
  const episodes = Array.from({ length: episodeCount }, (_, offset) => {
    const number = offset + 1, arc = episodeArc(number, episodeCount);
    const clips = Array.from({ length: clipCount }, (_, clipOffset) => makeClip(number, clipOffset + 1, clipCount, keys, tone, mode));
    return { number, arc, clips, ending: number === episodeCount ? '감정적 결말과 다음 이야기를 상상하게 하는 마지막 이미지.' : `${keys[(number + 1) % keys.length]}에 대한 답을 미루는 다음 화 훅.` };
  });
  const header = `[드라마 제작 패키지]\n\n제목: ${title}\n장르: ${mode}\n핵심 키워드: ${keys.join(' · ')}\n톤: ${tone || '감정선이 선명한 시네마틱 드라마'}\n총 ${episodeCount}편 · 회당 약 ${clipCount * 8}초 · 회당 ${clipCount}개 클립(각 8초)\n\n[시리즈 성경]\n주인공은 키워드 ${keys[0]}을(를) 피할 수 없고, 매 회차마다 관계·목표·비밀 중 하나를 잃거나 얻는다. 모든 회차는 같은 인물의 외형, 핵심 소품, 세계관, 색보정, 사운드 질감을 유지한다. 클립을 연결할 때 다음 클립은 직전 클립의 마지막 프레임과 같은 자세·시선·소품·조명·카메라 축에서 시작한다.\n`;
  const body = episodes.map(ep => `\n━━━━━━━━━━━━━━━━━━\n\n[${ep.number}화 · 약 ${clipCount * 8}초]\n회차 목표: ${ep.arc}\n엔딩 훅: ${ep.ending}\n\n` + ep.clips.map(c => `[클립 ${c.clip} · 8초]\n장면 기능: ${c.beat}\n대본/Flow 프롬프트:\n${c.prompt}`).join('\n\n')).join('');
  return { id: crypto.randomUUID(), title, signature, keywords: keys, tone, duration_seconds: clipCount * 8, episode_count: episodeCount, episodes, script: header + body, summary: `${mode} · ${episodeCount}편 · 회당 ${clipCount * 8}초 · ${keys.join(', ')}`, created_at: new Date().toISOString() };
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
$('generate-drama').onclick = () => { const keys = splitKeywords($('keywords').value); if (keys.length < 2) return alert('서로 다른 핵심 키워드를 두 개 이상 입력해 주세요.'); const seconds = Number($('episode-duration').value); current = buildDrama(keys, $('tone').value.trim(), seconds); $('result-title').textContent = `${current.title} · ${current.episode_count}부작`; $('output').textContent = current.script; $('copy').disabled = false; $('archive').disabled = archive.some(item => item.signature === current.signature); $('archive').textContent = $('archive').disabled ? '이미 보관됨' : '보관'; renderCopyButtons(); };
$('copy').onclick = async () => { if (!current) return; await navigator.clipboard.writeText(current.script); $('copy').textContent = '복사됨'; setTimeout(() => $('copy').textContent = '전체 복사', 1100); };
$('archive').onclick = archiveCurrent;
window.connectSupabase = async () => { try { dbClient = window.supabase.createClient(CONFIG.url, CONFIG.anonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } }); const { data: { session } } = await dbClient.auth.getSession(); userId = session?.user?.is_anonymous ? null : session?.user?.id; if (!userId) { setSync('PC 드라마 보관함 사용 중'); return; } const { data, error } = await dbClient.from('drama_archive').select('*').order('created_at', { ascending: false }); if (error) { setSync('PC 드라마 보관함 사용 중'); return; } archive = [...(data || []), ...readLocal().filter(l => !(data || []).some(c => c.signature === l.signature))]; setSync('Supabase 드라마 보관함 연결됨', true); } catch { setSync('PC 드라마 보관함 사용 중'); } };
if (location.search.includes('opened=archive')) { try { current = JSON.parse(localStorage.getItem('tailframe-opened-drama') || 'null'); if (current) { $('result-title').textContent = `${current.title} · ${current.episode_count}부작`; $('output').textContent = current.script; $('copy').disabled = false; $('archive').disabled = true; $('archive').textContent = '보관됨'; renderCopyButtons(); } } catch {} }
archive = readLocal();
