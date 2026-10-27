(() => {
  const button = document.getElementById('tiktok-description');
  const output = document.getElementById('output');
  const title = document.getElementById('result-title') || document.getElementById('title');
  if (!button || !output || !title) return;
  const initialOutput = output.textContent.trim();
  const copy = async text => {
    try { await navigator.clipboard?.writeText(text); return true; } catch {}
    const area = document.createElement('textarea'); area.value = text; area.style.cssText = 'position:fixed;opacity:0'; document.body.append(area); area.select(); const ok = document.execCommand('copy'); area.remove(); return ok;
  };
  const details = () => {
    const heading = title.textContent.trim().replace(/ · .+$/, '');
    const source = output.textContent;
    const food = heading.match(/(?:노베의|아기 백호의|여우의)?\s*(.+?)(?:\s*요리|\s*음식| ·|$)/)?.[1]?.trim();
    if (/노베/.test(`${heading} ${source}`)) return { heading, line: food ? `노베가 ${food}을(를) 직접 만들고 주인에게 전하는 따뜻한 요리 이야기예요.` : '노베가 정성껏 요리해 주인에게 전하는 따뜻한 이야기예요.', tags: '#노베 #여우요리 #판타지애니 #AI애니메이션 #힐링영상 #TikTok' };
    if (/백호|tiger/i.test(`${heading} ${source}`)) return { heading, line: food ? `아기 백호가 ${food}을(를) 만드는 귀여운 1분 요리 에피소드예요.` : '아기 백호의 귀여운 1분 요리 에피소드예요.', tags: '#아기백호 #백호 #동물애니 #AI영상 #요리영상 #TikTok' };
    return { heading, line: food ? `${food}을(를) 만나 변화하는 아홉 꼬리 여우의 판타지 숏폼이에요.` : '아홉 꼬리 여우의 작고 신비로운 판타지 숏폼이에요.', tags: '#구미호 #여우애니 #판타지 #AI애니메이션 #숏폼 #TikTok' };
  };
  const generate = () => { const d = details(); return `✨ ${d.heading}\n\n${d.line}\n끝까지 보면 노베와 친구들의 귀여운 마무리를 만날 수 있어요.\n\n${d.tags}`; };
  const refresh = () => { button.disabled = output.textContent.trim() === initialOutput && /준비 완료/.test(title.textContent); };
  new MutationObserver(refresh).observe(output, { childList:true, characterData:true, subtree:true });
  new MutationObserver(refresh).observe(title, { childList:true, characterData:true, subtree:true });
  button.addEventListener('click', async () => { const text = generate(); output.textContent = `[TikTok 업로드 소개글]\n\n${text}`; const ok = await copy(text); button.textContent = ok ? '소개글 복사됨' : 'TikTok 소개글'; setTimeout(() => { button.textContent = 'TikTok 소개글'; }, 1400); });
  refresh();
})();
