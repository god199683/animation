const $ = id => document.getElementById(id);
const pick = items => items[Math.floor(Math.random() * items.length)];
const taleSeeds = {
  '콩쥐팥쥐': ['a forgotten garden, a small act of courage, and a celebration earned through kindness', 'sparkling K-pop dance-pop'],
  '흥부와 놀부': ['a wounded bird, an unexpected gift, and generosity that changes a village', 'warm upbeat folk-pop'],
  '선녀와 나무꾼': ['a moonlit lake, a promise about freedom, and a journey between two worlds', 'dreamy synth-pop'],
  '빨간 모자': ['a brave courier crossing an enchanted forest to protect family', 'playful pop-punk'],
  '신데렐라': ['a hidden maker, one night of self-belief, and a future chosen on her own terms', 'glamorous disco-pop'],
  '이상한 나라의 앨리스': ['a curious traveler solving surreal riddles in a shifting dream world', 'quirky electro-pop'],
  '오즈의 마법사': ['four strangers walking a luminous road toward the courage already inside them', 'cinematic dance-pop']
};
function makePack() {
  const tale = $('tale').value; const [motif, defaultGenre] = taleSeeds[tale]; const rawMinutes = $('minutes').value.trim(); const minutes = Number(rawMinutes);
  if (rawMinutes && (!Number.isFinite(minutes) || minutes < 1)) { alert('음악 길이는 최소 1분 이상으로 입력해 주세요.'); return null; }
  const duration = minutes >= 1 ? `${Math.ceil(minutes)} minutes` : 'at least 1 minute, with no upper time limit'; const clipCount = minutes >= 1 ? Math.ceil(minutes) : 5;
  const tone = $('tone').value.trim() || defaultGenre; const notes = $('notes').value.trim(); const signature = `${tale}|${tone}|${notes}|${duration}`.toLowerCase(); if (readArchive().some(item => item.signature === signature)) { alert('동화 음악 보관함에 같은 기획이 있습니다. 조건을 바꿔 새롭게 생성해 주세요.'); return null; } const title = `${tale}의 달빛 노래`;
  const song = `Create an original Korean TikTok-ready song inspired only by the public-domain source tale “${tale}.” Required duration: ${duration}. Reimagine it as a wholly new story about ${motif}. Genre and energy: ${tone}. ${notes ? `Creator direction: ${notes}` : ''}\n\nDo not copy, reference, imitate, or evoke any modern adaptation, film, animation, illustration, soundtrack, character design, dialogue, or copyrighted lyrics associated with this tale. Use newly invented character names, locations, imagery, plot details, melody, and Korean lyrics. Short original English hook phrases are allowed, but Korean remains the primary language. Make it a self-contained song of at least one minute with a memorable first-12-second hook, clear emotional lift, and a satisfying original ending. If it needs multiple Flow generations, use Extend or Remix while preserving vocal identity, key, tempo family, sound palette, and story continuity.`;
  const clips = Array.from({ length: clipCount }, (_, index) => `[CLIP ${String(index + 1).padStart(2, '0')}] Create one original vertical 9:16 Google Flow music-video clip for the song “${title}.” Use the matching completed song section as audio reference. Fairy-tale visual world: a new world inspired by ${motif}; never use any modern adaptation’s recognizable designs. Keep the same original lead character, wardrobe palette, magical prop, color grade, and lens language from the preceding clip. This clip advances the new story through ${['discovery and movement', 'a magical clue', 'a choice and consequence', 'a burst of hope', 'a moving handoff'][index % 5]}. Begin from the previous clip’s final state and end in motion leading into the next. Natural Korean lip sync only if vocals exist. No text overlays, logos, watermarks, celebrity likenesses, copyrighted characters, frozen pose, or fade to black.`);
  const video = `Create the ${clipCount} Google Flow clips below one at a time for the original fairy-tale music video “${title}.” Use the completed song audio as reference. Target duration: ${duration}. Use Flow’s available clip duration and Extend as needed, retaining the prior last frame and exact visual identity.\n\n${clips.join('\n\n')}`;
  return { title, signature, song, video, clips, summary: `${tale} · ${tone} · ${duration}` };
}
let current = null;
function archiveKey() { return 'fairytale-music-archive'; }
function readArchive() { try { const saved = JSON.parse(localStorage.getItem(archiveKey()) || '[]'); return Array.isArray(saved) ? saved : []; } catch { return []; } }
async function copy(value, button, label) { await navigator.clipboard.writeText(value); const old = button.textContent; button.textContent = label; setTimeout(() => button.textContent = old, 1000); }
function show() { $('title').textContent = `${current.title} · 동화 음악 제작 패키지`; $('output').textContent = `[노래 프롬프트]\n\n${current.song}\n\n━━━━━━━━━━━━━━━━━━\n\n[뮤직비디오 클립별 프롬프트]\n\n${current.video}`; ['copy-song', 'copy-video', 'copy-clips', 'open-song', 'archive-tale'].forEach(id => $(id).disabled = false); const root = $('clip-actions'); root.hidden = false; root.innerHTML = '<span>뮤비 클립별 복사</span>'; current.clips.forEach((clip, index) => { const button = document.createElement('button'); button.textContent = `클립 ${index + 1}`; button.onclick = () => copy(clip, button, '복사됨'); root.append(button); }); }
$('generate').onclick = () => { current = makePack(); if (current) show(); };
$('copy-song').onclick = () => current && copy(current.song, $('copy-song'), '복사됨');
$('copy-video').onclick = () => current && copy(current.video, $('copy-video'), '복사됨');
$('copy-clips').onclick = () => current && copy(current.clips.join('\n\n'), $('copy-clips'), `클립 ${current.clips.length}개 복사됨`);
$('open-song').onclick = () => current && navigator.clipboard.writeText(current.song).finally(() => window.open('https://www.flowmusic.app', '_blank', 'noopener'));
$('archive-tale').onclick = () => { if (!current) return; localStorage.setItem(archiveKey(), JSON.stringify([{ ...current, created_at: new Date().toISOString() }, ...readArchive()])); $('archive-tale').disabled = true; $('archive-tale').textContent = '보관됨'; };
