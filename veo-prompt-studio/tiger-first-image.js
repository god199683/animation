(() => {
  const actions = document.getElementById('clip-actions');
  if (!actions) return;
  const button = document.createElement('button');
  button.dataset.clip = '0'; button.disabled = true; button.textContent = '0 첫 이미지';
  actions.querySelector('span')?.after(button);
  const firstImage = x => `[0 FIRST IMAGE | Google Flow image generation only]\nCreate ONE vertical 9:16 reference image, NOT a video. Attach the user's original baby white tiger image as the primary Reference/Ingredient.\n\nTIGER IDENTITY LOCK: preserve the exact same individual baby white tiger: creamy-white fur, exact charcoal stripe layout and stripe count, amber-gold eyes, small pink nose, rounded ears, short fluffy tail, oversized paws, childlike proportions, face shape, and scale. No adult tiger, orange fur, altered stripes, clothing, transformation, duplicate tiger, extra limbs, or different animal.\n\nSCENE: ${x.place}. Show the baby tiger at a safe practical cooking counter, grill, cart, or worktable with the intact measured ingredients for exactly one ${x.food}. Establish the lighting direction, camera height, lens, camera axis, tools, counter layout, and food placement that every clip 1–8 will preserve. The tiger is curious and ready to cook; no finished dish, no eating, no customer or guest yet. Storybook animation style, vertical 9:16, no readable text, logo, watermark, or extra food.`;
  const copy = async (text, target) => { try { await navigator.clipboard.writeText(text); const label = target.textContent; target.textContent = '복사됨'; setTimeout(() => target.textContent = label, 1200); } catch { alert('복사에 실패했습니다.'); } };
  button.addEventListener('click', () => current && copy(firstImage(current), button));
  document.getElementById('copy-all').onclick = () => current && copy(`[0 첫 이미지]\n${firstImage(current)}\n\n━━━━━━━━━━━━━━━━━━\n\n${current.prompts.join('\n\n━━━━━━━━━━━━━━━━━━\n\n')}`, document.getElementById('copy-all'));
})();
