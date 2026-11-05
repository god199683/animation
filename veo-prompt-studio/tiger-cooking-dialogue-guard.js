(() => {
  const blocked = ['앗, 향기가 간질간질해요!', '향기가 간질간질해요', '맛있다는 말을 들으면 힘이 나요.', '예쁘게 담아 드릴게요.', '제가 직접 만들었어요.', '따뜻할 때 드셔 보세요.', '손님, 달콤한 하루 되세요!'];
  const applyCookingDialogueGuard = item => {
    if (!item?.food || !Array.isArray(item.prompts)) return;
    const plan = tigerCookingPlan(item.food), cookingEnd = plan.length + 1;
    item.prompts = item.prompts.map((prompt, index) => {
      const clip = index + 1;
      if (clip < 2 || clip > cookingEnd) return prompt;
      const stage = plan[clip - 2];
      let clean = prompt;
      blocked.forEach(line => { clean = clean.replaceAll(line, ''); });
      clean = clean.replace(/DIALOGUE:[^\n]*/, `DIALOGUE: the baby white tiger speaks exactly one short Korean cooking-process line, “${stage.line}”.`);
      const clipFourSpeechLock = clip === 4 ? `\n\nCLIP 4 SPEECH-TRACK LOCK — Use exactly ONE spoken utterance in the entire 8-second clip: the quoted sentence “${stage.line}”, once only, spoken clearly between seconds 1.5 and 4.5 while the matching action is visibly happening. Before and after it, use silence apart from cooking foley and ambience. Do not add a second sentence, ad-lib, inner thought, exclamation, sniff reaction, animal sound, humming, narration, or trailing phrase. Do not mention an itchy nose, ticklish scent, pleasant smell, or any other sensory reaction. If clear pronunciation requires a pause, pause inside the same quoted sentence only; never replace it with new words.` : '';
      return `${clean}\n\nCOOKING DIALOGUE FINAL GUARD — ABSOLUTE HIGHEST PRIORITY: This is cooking clip ${clip}. Speak only “${stage.line}” exactly once because that is the visible food-specific cooking action. Never say “앗, 향기가 간질간질해요”, any scent reaction, praise, plating, serving, tasting, selling, greeting, invitation, farewell, or unrelated reaction.${clipFourSpeechLock}`;
    });
  };
  if (typeof finalEpisode === 'function') {
    const base = finalEpisode;
    finalEpisode = data => { const item = base(data); applyCookingDialogueGuard(item); return item; };
  }
  document.getElementById('regenerate')?.addEventListener('click', () => {
    applyCookingDialogueGuard(current);
    if (current && typeof render === 'function') render();
  });
})();
