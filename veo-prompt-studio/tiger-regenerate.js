(() => {
  const button = document.getElementById('regenerate');
  if (!button) return;
  const identity = `\n\nTIGER IDENTITY LOCK — HIGHEST PRIORITY: attach the user's original baby white tiger reference image as an additional Reference/Ingredient in EVERY clip. This is the same individual baby white tiger, never a new tiger. Preserve the exact creamy-white fur color, the exact charcoal stripe layout and stripe count, amber-gold eye color, small pink nose, rounded ears, short fluffy tail, oversized paws, childlike body proportions, face shape, and scale from the reference image and the previous final frame. No aging, growth, breed change, orange fur, darker fur, altered stripes, different eye color, long tail, adult tiger body, clothing change, transformation, replacement tiger, duplicate tiger, or extra limbs. The baby tiger’s appearance must be identical from clip 1 through clip 8.`;
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
