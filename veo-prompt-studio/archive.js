const CONFIG = {
  url: 'https://pxzerharmpbxvmuomsfo.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4emVyaGFybXBieHZtdW9tc2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NDAyNDAsImV4cCI6MjEwNjQxNjI0MH0.9O5gSipGaZ66XSnp9FjI9tkIvcir3XZnvp6JBNyPV4A'
};
CONFIG.anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4emVyaGFybXBieHZtdW9tc2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NDAyNDAsImV4cCI6MjEwNjQxNjI0MH0.9O5gSipGaZ66XSnp9FjI9tkIvcir3XZnvp6JBNyPV4A';
const $ = id => document.getElementById(id);
let dbClient = null, userId = null, archive = [];
function setSync(message, online = false) { $('sync-status').textContent = message; $('sync-status').parentElement.classList.toggle('online', online); }
function localArchiveKey() { return `veo-prompt-archive:${userId || 'signed-out'}`; }
function readLocalArchive() { try { const saved = JSON.parse(localStorage.getItem(localArchiveKey()) || '[]'); return Array.isArray(saved) ? saved.map(item => ({ ...item, storage: 'local' })) : []; } catch { return []; } }
function renderArchive() {
  $('archive-count').textContent = archive.length;
  const root = $('archive-list'); root.innerHTML = '';
  if (!archive.length) { root.innerHTML = '<p class="empty">아직 보관한 프롬프트가 없습니다.</p>'; return; }
  const template = $('archive-item');
  archive.forEach(item => {
    const node = template.content.cloneNode(true);
    node.querySelector('h3').textContent = item.title;
    node.querySelector('.archive-meta').textContent = new Date(item.created_at || Date.now()).toLocaleString('ko-KR');
    node.querySelector('.archive-summary').textContent = item.summary || '';
    node.querySelector('.view').onclick = () => view(item);
    node.querySelector('.remove').onclick = () => removeArchive(item.id);
    root.append(node);
  });
}
function view(item) {
  localStorage.setItem('tailframe-opened-archive', JSON.stringify(item));
  window.location.href = 'index.html?opened=archive';
}
function loadLocalArchive() { archive = readLocalArchive(); renderArchive(); }
async function loadArchive() {
  if (!dbClient || !userId) return loadLocalArchive();
  const { data, error } = await dbClient.from('veo_prompt_archive').select('*').order('created_at', { ascending: false });
  if (error) { setSync('이 기기의 보관함 사용 중'); return loadLocalArchive(); }
  const cloud = (data || []).map(item => ({ ...item, storage: 'cloud' }));
  const localOnly = readLocalArchive().filter(local => !cloud.some(remote => remote.id === local.id || remote.signature === local.signature));
  archive = [...cloud, ...localOnly].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)); renderArchive();
}
async function removeArchive(id) {
  if (!confirm('이 보관 결과를 삭제할까요? 삭제하면 중복 방지 이력에서도 제외됩니다.')) return;
  const item = archive.find(entry => entry.id === id);
  const remainingLocal = readLocalArchive()
    .filter(entry => entry.id !== id && (!item?.signature || entry.signature !== item.signature))
    .map(({ storage, ...entry }) => entry);
  localStorage.setItem(localArchiveKey(), JSON.stringify(remainingLocal));
  if (item?.storage === 'cloud' && dbClient && userId) {
    const { error } = await dbClient.from('veo_prompt_archive').delete().eq('id', id); if (error) return alert(`삭제하지 못했습니다: ${error.message}`);
  }
  await loadArchive();
}
async function initSupabase() {
  try {
    dbClient = window.supabase.createClient(CONFIG.url, CONFIG.anonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } });
    let { data: { session } } = await dbClient.auth.getSession();
    if (session?.user?.is_anonymous) { await dbClient.auth.signOut(); session = null; }
    userId = session?.user?.id; if (!userId) { window.location.replace('index.html?login=1'); return; }
    setSync('Supabase 보관함 연결됨', true); await loadArchive();
  } catch (error) { console.warn(error); setSync('이 기기의 보관함 사용 중'); loadLocalArchive(); }
}
$('refresh').onclick = loadArchive;
window.connectSupabase = initSupabase;
loadLocalArchive();
