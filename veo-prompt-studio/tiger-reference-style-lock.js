(() => {
  const lock = `\n\nTIGER REFERENCE STYLE LOCK — ABSOLUTE HIGHEST PRIORITY: The attached user image is the one immutable source of truth. Reproduce its exact baby white tiger, never a generic substitute: ivory-white fluffy fur; the same fine charcoal-gray stripe placement across the forehead, cheeks, body, and legs; huge pale icy blue-gray eyes; small blush-pink triangular nose; tiny baby fangs; rounded pink-inner ears; oversized soft paws; short fluffy tail; and the pink cherry-blossom accessory above the left ear. Match the source image’s exact face proportions, childlike expression, fur length, body scale, stripe count, and stripe placement. Match its exact polished soft realistic 3D visual style: individually visible soft fur strands, warm peach-and-cream light, delicate golden bokeh, shallow depth of field, and scattered pale-pink blossom petals. The image reference outranks every older generic descriptor. Never use amber/gold eyes, orange fur, altered or heavy stripes, generic storybook art, flat anime, cel shading, live-action realism, a different 3D rendering style, an adult tiger, clothing, transformation, duplicate tiger, extra limbs, or another animal.`;
  const apply = item => {
    if (!item?.prompts) return;
    item.prompts = item.prompts.map(prompt => prompt.includes('TIGER REFERENCE STYLE LOCK') ? prompt : `${prompt}${lock}`);
  };
  if (typeof finalEpisode === 'function') {
    const base = finalEpisode;
    finalEpisode = data => { const item = base(data); apply(item); return item; };
  }
  const regenerate = document.getElementById('regenerate');
  regenerate?.addEventListener('click', () => {
    apply(current);
    if (current && typeof render === 'function') render();
  });
})();
