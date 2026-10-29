(() => {
  const button = document.getElementById('regenerate');
  if (!button) return;
  const identity = `\n\nTIGER IDENTITY LOCK — HIGHEST PRIORITY: attach the user's original baby white tiger reference image as an additional Reference/Ingredient in EVERY clip. This is the same individual baby white tiger, never a new tiger. Preserve the exact creamy-white fur color, the exact charcoal stripe layout and stripe count, amber-gold eye color, small pink nose, rounded ears, short fluffy tail, oversized paws, childlike body proportions, face shape, and scale from the reference image and the previous final frame. No aging, growth, breed change, orange fur, darker fur, altered stripes, different eye color, long tail, adult tiger body, clothing change, transformation, replacement tiger, duplicate tiger, or extra limbs. The baby tiger’s appearance must be identical from clip 1 through clip 8.\n\nCAMERA CONTINUITY LOCK — Treat the previous final frame as the exact first frame. Preserve the same camera height, lens focal length, camera axis, framing scale, horizon, depth of field, lighting direction, and room geometry. Use only one slow, smooth, physically plausible camera move during this 8-second clip: subtle handheld breathing, a gentle short dolly, or a very small pan that follows the tiger’s real movement. Never cut, snap-zoom, whip-pan, orbit, jump to a new angle, reframe suddenly, or change background layout. End while the camera is still moving gently so the next clip can continue naturally.\n\nPROP CONTINUITY LOCK — Every ingredient, bowl, plate, utensil, stove/grill, tray, packaging material, table object, furniture item, and background object must already be physically present in the previous frame or enter visibly through a hand or frame edge. Never make any object pop into existence, appear through magic, materialize during a cut, duplicate, vanish, swap, teleport, change color, or change size. Keep each unused tool and packaging item visibly parked in its established position until it is naturally picked up, moved by a visible hand or paw, used, and set down again. Never replace a real prop with a similar-looking prop between frames.`;
  const update = () => { button.disabled = !current; };
  new MutationObserver(update).observe(document.getElementById('output'), { childList:true, characterData:true, subtree:true });
  button.addEventListener('click', () => {
    if (!current) return;
    const stages = tigerCookingStages(current.food);
    current.prompts = Array.from({length:8}, (_, i) => {
      const clip = i + 1;
      let prompt = finalSalePrompt(current, clip)
        .replaceAll('제가 직접 만들었어요!', '')
        .replaceAll('예쁘게 담아 드릴게요.', '')
        .replaceAll('I made it myself!', '');
      if (clip === 1) {
        prompt = prompt.replace(/DIALOGUE: speak exactly one short Korean line, “[^”]*”\./, `DIALOGUE: the baby white tiger speaks exactly this one Korean menu-introduction sentence, “오늘 만들 음식은 ${current.food}예요.”`);
        prompt += `\n\nCLIP 1 DIALOGUE OVERRIDE — HIGHEST PRIORITY: Speak only the quoted menu-introduction sentence once. Never say “제가 직접 만들었어요” or any generic introduction.`;
      } else if (stages[clip]) {
        const stage = stages[clip];
        prompt = prompt
          .replace(/ACTION: the baby tiger [^\n]*/, `ACTION: the baby tiger ${stage.action}.`)
          .replace(/DIALOGUE: speak exactly one short Korean line, “[^”]*”\./, `DIALOGUE: the baby white tiger speaks exactly one short Korean cooking-process line, “${stage.line}”.`);
        prompt += `\n\nCOOKING-STAGE OVERRIDE — HIGHEST PRIORITY: This is cooking clip ${clip}. The baby white tiger alone performs and explains exactly the quoted food-specific cooking step. Never say “제가 직접 만들었어요”, “예쁘게 담아 드릴게요”, a greeting, serving line, invitation, or any generic dialogue in clips 2–4.`;
      }
      return `${prompt}${identity}`;
    });
    view = 'prompts';
    render();
  });
  update();
})();
