(() => {
  const button = document.getElementById('regenerate');
  if (!button) return;
  const identity = `\n\nTIGER IDENTITY LOCK — HIGHEST PRIORITY: attach the user's original baby white tiger reference image as an additional Reference/Ingredient in EVERY clip. This is the same individual baby white tiger, never a new tiger. Preserve the exact creamy-white fur color, the exact charcoal stripe layout and stripe count, amber-gold eye color, small pink nose, rounded ears, short fluffy tail, oversized paws, childlike body proportions, face shape, and scale from the reference image and the previous final frame. No aging, growth, breed change, orange fur, darker fur, altered stripes, different eye color, long tail, adult tiger body, clothing change, transformation, replacement tiger, duplicate tiger, or extra limbs. The baby tiger’s appearance must be identical from clip 1 through clip 8.\n\nCAMERA CONTINUITY LOCK — Treat the previous final frame as the exact first frame. Preserve the same camera height, lens focal length, camera axis, framing scale, horizon, depth of field, lighting direction, and room geometry. Use only one slow, smooth, physically plausible camera move during this 8-second clip: subtle handheld breathing, a gentle short dolly, or a very small pan that follows the tiger’s real movement. Never cut, snap-zoom, whip-pan, orbit, jump to a new angle, reframe suddenly, or change background layout. End while the camera is still moving gently so the next clip can continue naturally.\n\nPROP CONTINUITY LOCK — Every ingredient, bowl, plate, utensil, stove/grill, tray, packaging material, table object, furniture item, and background object must already be physically present in the previous frame or enter visibly through a hand or frame edge. Never make any object pop into existence, appear through magic, materialize during a cut, duplicate, vanish, swap, teleport, change color, or change size. Keep each unused tool and packaging item visibly parked in its established position until it is naturally picked up, moved by a visible hand or paw, used, and set down again. Never replace a real prop with a similar-looking prop between frames.`;
  const update = () => { button.disabled = !current; };
  new MutationObserver(update).observe(document.getElementById('output'), { childList:true, characterData:true, subtree:true });
  button.addEventListener('click', () => {
    if (!current) return;
    const plan = tigerCookingPlan(current.food);
    const cookingEnd = plan.length + 1;
    const clipCount = cookingEnd + 4;
    current.clipCount = clipCount;
    current.prompts = Array.from({length:clipCount}, (_, i) => {
      const clip = i + 1;
      let prompt = finalSalePrompt(current, clip)
        .replaceAll('제가 직접 만들었어요!', '')
        .replaceAll('예쁘게 담아 드릴게요.', '')
        .replaceAll('맛있다는 말을 들으면 힘이 나요.', '')
        .replaceAll('따뜻할 때 드셔 보세요.', '')
        .replaceAll('손님, 달콤한 하루 되세요!', '')
        .replaceAll('I made it myself!', '');
      if (clip === 1) {
        prompt = prompt.replace(/DIALOGUE:[^\n]*/, `DIALOGUE: the baby white tiger speaks exactly this one Korean menu-introduction sentence, “오늘 만들 음식은 ${current.food}예요.”`);
        prompt += `\n\nCLIP 1 DIALOGUE OVERRIDE — ABSOLUTE HIGHEST PRIORITY: Speak only the quoted menu-introduction sentence once, then silently prepare ingredients. Never say “제가 만들었어요”, “제가 직접 만들었어요”, “완성됐어요”, “맛있다는 말을 들으면 힘이 나요”, or any generic introduction, praise, invitation, serving, or ending line.`;
      } else if (clip >= 2 && clip <= cookingEnd) {
        const stage = plan[clip - 2];
        prompt = prompt
          .replace(/ACTION: the baby tiger [^\n]*/, `ACTION: the baby tiger ${stage.action}.`)
          .replace(/DIALOGUE:[^\n]*/, `DIALOGUE: the baby white tiger speaks exactly one short Korean cooking-process line, “${stage.line}”.`);
        prompt += `\n\nCOOKING-STAGE OVERRIDE — ABSOLUTE HIGHEST PRIORITY: This is cooking step ${clip-1} of ${plan.length}. The baby white tiger alone performs and says the quoted food-specific cooking sentence. Delete and ignore every older dialogue instruction. Never say “맛있다는 말을 들으면 힘이 나요”, “따뜻할 때 드셔 보세요”, “제가 직접 만들었어요”, “예쁘게 담아 드릴게요”, “만들었어요”, a greeting, serving line, invitation, menu introduction, praise, reaction, or any generic dialogue in cooking clips. No guest, tasting, plating, packaging, selling, or ending may appear until all ${plan.length} cooking steps are complete. If wording needs to vary for natural speech, use only a short natural paraphrase of this exact visible cooking step.${tigerDetailedStepLock(stage,clip-2,plan.length,current.food)}`;
      }
      return `${prompt}${identity}`;
    });
    view = 'prompts';
    render();
  });
  update();
})();
