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
    clip(3, `Generate one 8-second vertical 9:16 continuation from the supplied saved final frame of clip 2. Use it as the only Start Frame. Preserve the identical baby white tiger and continuous ${place} world. The tiger faces one small harmless obstacle or surprise connected to ${theme}, briefly hesitates, then ${a3}. Keep the same prop state, camera height, lens, lighting direction, and spatial layout. The tiger remains actively moving through the last frame; no pose reset, teleport, fade, or unrelated animal.`),
    clip(4, `Generate one 8-second vertical 9:16 continuation from the supplied saved final frame of clip 3. Use it as the only Start Frame. Preserve the exact same baby white tiger, all stripes, amber-gold eyes, place, clue, lighting, and camera axis. Give ${theme} a gentle, emotionally satisfying resolution through one small physical action; keep it simple and visually clear. The tiger makes a natural happy reaction—soft blink, quiet tiger cub chirrup, and one tail sway—then settles into a relaxed final pose only in the final second. ${world}. No human dialogue, no dog-like bark, no sudden scene change, text, logo, or fade to black.`)
  ];
  return { title: `${theme} · ${place}`, full: `[Google Flow · 아기 백호 32초 에피소드]\n\n${clips.join('\n\n━━━━━━━━━━━━━━━━━━\n\n')}\n\n[제작 순서]\n클립 1을 먼저 생성합니다. 클립 1의 마지막 프레임을 저장하여 클립 2의 유일한 Start Frame으로 넣고, 같은 방식으로 클립 3·4까지 연결합니다. 원본 아기 백호 이미지를 추가 Reference로 넣을 수 있지만 Start Frame을 대체하면 안 됩니다.`, clips };
}
async function copy(text, button){
  try { await navigator.clipboard.writeText(text); const original = button.textContent; button.textContent = '복사됨'; setTimeout(() => { button.textContent = original; }, 1100); }
  catch { alert('복사에 실패했습니다. 출력창에서 직접 복사해 주세요.'); }
}
$('generate').onclick = () => { current = build(); $('title').textContent = current.title; $('output').textContent = current.full; $('copy-all').disabled = false; document.querySelectorAll('[data-clip]').forEach(button => { button.disabled = false; }); };
$('copy-all').onclick = () => current && copy(current.full, $('copy-all'));
document.querySelectorAll('[data-clip]').forEach(button => button.onclick = () => current && copy(current.clips[Number(button.dataset.clip) - 1], button));
