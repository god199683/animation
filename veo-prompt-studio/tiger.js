const $ = id => document.getElementById(id);
const pick = list => list[Math.floor(Math.random() * list.length)];
const themes = ['바람에 날아간 빨간 리본', '처음 만난 반딧불이', '눈 덮인 발자국', '숲속에 떨어진 작은 종', '비 온 뒤 무지개 웅덩이', '사라진 밤송이', '달빛 아래 피어난 꽃', '따뜻한 찻잔의 김', '나뭇잎 배의 여행', '노란 나비의 초대'];
const places = ['이른 아침의 대나무 숲', '비 온 뒤 이끼 낀 돌길', '햇살 드는 산속 오두막 앞마당', '눈이 살짝 쌓인 소나무 숲', '벚꽃잎이 흩날리는 개울가', '호숫가의 작은 나무 데크', '달빛 비추는 고요한 정원', '가을빛 단풍 아래 숲길'];
const actions = ['호기심에 고개를 갸웃하며 냄새를 맡는다', '두 앞발로 조심스럽게 굴려 본다', '작은 발걸음으로 뒤따라간다', '깜짝 놀랐다가 꼬리를 살랑인다', '용기를 내어 한 걸음 가까이 다가간다', '기쁨에 앞발을 살짝 들어 인사한다'];
let current = null;

function clip(number, text){ return `[클립 ${number} | 8초]\n${text}`; }
function build(){
  const theme = $('theme').value.trim() || pick(themes);
  const place = $('place').value.trim() || pick(places);
  const note = $('notes').value.trim();
  const a1 = pick(actions), a2 = pick(actions), a3 = pick(actions);
  const identity = 'the same tiny baby white tiger: creamy white fur, clear soft charcoal stripes, round amber-gold eyes, pink nose, small rounded ears, short fluffy tail, oversized paws, gentle childlike expression';
  const world = 'soft luminous storybook 3D animation, warm pastel cinematic lighting, delicate fur detail, shallow depth of field, vertical 9:16, no text, no logo, no watermark';
  const extra = note ? ` Additional user direction: ${note}.` : '';
  const clips = [
    clip(1, `Generate one 8-second vertical 9:16 video. ${identity}. Set in ${place}. Episode theme: ${theme}. The baby tiger enters naturally, ${a1}, and notices the first subtle clue. Keep one stable medium-wide camera view and continuous gentle motion. ${world}.${extra} End mid-motion with the tiger looking toward the clue; do not resolve the episode, freeze, fade, or cut.`),
    clip(2, `Generate one 8-second vertical 9:16 continuation from the supplied saved final frame of clip 1. Use it as the only Start Frame. Preserve the exact same baby white tiger, stripe layout, eye color, fur, setting, lighting, camera axis, and clue. Frame 1 must match the supplied frame exactly. The tiger takes two small believable steps and ${a2}, revealing a little more about ${theme}. No new character, no duplicate prop, no background jump, no music restart, no text. End while the action is still continuing.`),
    clip(3, `Generate one 8-second vertical 9:16 continuation from the supplied saved final frame of clip 2. Use it as the only Start Frame. Preserve the identical baby white tiger and continuous ${place} world. The tiger carefully approaches the same clue, ${a3}, and discovers one small concrete detail that makes the episode more interesting. Keep the same prop state, camera height, lens, lighting direction, and spatial layout. End during a curious movement; no pose reset, teleport, fade, or unrelated animal.`),
    clip(4, `Generate one 8-second vertical 9:16 continuation from the supplied saved final frame of clip 3. Use it as the only Start Frame. Preserve the exact tiger, clue, setting, lighting, and camera axis. Show a gentle exploration beat: the tiger interacts physically and believably with the same clue using one paw or nose, then a harmless small complication connected to ${theme} begins. Keep all movement continuous and end before the complication is solved. No cut, fade, duplicated prop, or new location.`),
    clip(5, `Generate one 8-second vertical 9:16 continuation from the supplied saved final frame of clip 4. Use it as the only Start Frame. Preserve every visible object and the exact state of the harmless complication. The baby tiger reacts with a realistic brief hesitation, then chooses a simple brave action to help resolve ${theme}. Keep the same continuous world; allow background movement only through visible walking and gentle camera tracking. End mid-action, not at the solution.`),
    clip(6, `Generate one 8-second vertical 9:16 continuation from the supplied saved final frame of clip 5. Use it as the only Start Frame. Keep the same white tiger identity, clue, prop state, location, light, lens, and camera axis. Show the tiger's action gradually working: one clear physical cause and effect, no magic jump, no instant solution. The tiger makes one quiet authentic tiger-cub chirrup, never a dog bark. End with the resolution almost achieved and movement continuing.`),
    clip(7, `Generate one 8-second vertical 9:16 continuation from the supplied saved final frame of clip 6. Use it as the only Start Frame. Preserve exact continuity. Let the baby tiger complete the gentle solution to ${theme} through one small readable action, then notice the positive result with a warm surprised expression. Do not introduce a new plot, prop, animal, person, or scene. Keep the tiger naturally active through the final frame for a soft handoff.`),
    clip(8, `Generate one 8-second vertical 9:16 continuation from the supplied saved final frame of clip 7. Use it as the only Start Frame. Preserve the exact same baby white tiger, all charcoal stripes, amber-gold eyes, clue, ${place}, lighting, and camera axis. Give the 64-second episode a gentle emotionally satisfying ending: the tiger makes a soft blink, one quiet tiger cub chirrup, and one tail sway while appreciating the resolved ${theme}. Only in the final second, settle into a relaxed natural pose. ${world}. No human dialogue, no dog-like bark, no sudden scene change, text, logo, or fade to black.`)
  ];
  return { title: `${theme} · ${place}`, full: `[Google Flow · 아기 백호 최소 1분 에피소드 · 8클립 / 총 64초]\n\n${clips.join('\n\n━━━━━━━━━━━━━━━━━━\n\n')}\n\n[제작 순서]\n클립 1을 먼저 생성합니다. 각 클립의 마지막 프레임을 저장하여 바로 다음 클립의 유일한 Start Frame으로 넣고, 클립 2부터 8까지 순서대로 연결합니다. 원본 아기 백호 이미지를 추가 Reference로 넣을 수 있지만 Start Frame을 대체하면 안 됩니다.`, clips };
}
async function copy(text, button){
  try { await navigator.clipboard.writeText(text); const original = button.textContent; button.textContent = '복사됨'; setTimeout(() => { button.textContent = original; }, 1100); }
  catch { alert('복사에 실패했습니다. 출력창에서 직접 복사해 주세요.'); }
}
$('generate').onclick = () => { current = build(); $('title').textContent = current.title; $('output').textContent = current.full; $('copy-all').disabled = false; document.querySelectorAll('[data-clip]').forEach(button => { button.disabled = false; }); };
$('copy-all').onclick = () => current && copy(current.full, $('copy-all'));
document.querySelectorAll('[data-clip]').forEach(button => button.onclick = () => current && copy(current.clips[Number(button.dataset.clip) - 1], button));
