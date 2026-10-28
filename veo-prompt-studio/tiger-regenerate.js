(() => {
  const button = document.getElementById('regenerate');
  if (!button) return;
  const identity = `\n\nTIGER IDENTITY LOCK — HIGHEST PRIORITY: attach the user's original baby white tiger reference image as an additional Reference/Ingredient in EVERY clip. This is the same individual baby white tiger, never a new tiger. Preserve the exact creamy-white fur color, the exact charcoal stripe layout and stripe count, amber-gold eye color, small pink nose, rounded ears, short fluffy tail, oversized paws, childlike body proportions, face shape, and scale from the reference image and the previous final frame. No aging, growth, breed change, orange fur, darker fur, altered stripes, different eye color, long tail, adult tiger body, clothing change, transformation, replacement tiger, duplicate tiger, or extra limbs. The baby tiger’s appearance must be identical from clip 1 through clip 8.\n\nCAMERA CONTINUITY LOCK — Treat the previous final frame as the exact first frame. Preserve the same camera height, lens focal length, camera axis, framing scale, horizon, depth of field, lighting direction, and room geometry. Use only one slow, smooth, physically plausible camera move during this 8-second clip: subtle handheld breathing, a gentle short dolly, or a very small pan that follows the tiger’s real movement. Never cut, snap-zoom, whip-pan, orbit, jump to a new angle, reframe suddenly, or change background layout. End while the camera is still moving gently so the next clip can continue naturally.\n\nPROP CONTINUITY LOCK — Every ingredient, bowl, plate, utensil, stove/grill, tray, packaging material, table object, furniture item, and background object must already be physically present in the previous frame or enter visibly through a hand or frame edge. Never make any object pop into existence, appear through magic, materialize during a cut, duplicate, vanish, swap, teleport, change color, or change size. Keep each unused tool and packaging item visibly parked in its established position until it is naturally picked up, moved by a visible hand or paw, used, and set down again. Never replace a real prop with a similar-looking prop between frames.`;
  const update = () => { button.disabled = !current; };
  new MutationObserver(update).observe(document.getElementById('output'), { childList:true, characterData:true, subtree:true });
  button.addEventListener('click', () => {
    if (!current) return;
    current.prompts = Array.from({length:8}, (_, i) => `${finalSalePrompt(current, i + 1)}${identity}`);
    view = 'prompts';
    render();
  });
  update();
})();
