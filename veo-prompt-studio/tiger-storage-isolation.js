function tigerLocalArchiveRecords(){
  const records=[];
  const storageKeys=new Set([key(),'tiger-food-video:signed-out']);
  storageKeys.forEach(storageKey=>{
    try{
      const stored=JSON.parse(localStorage.getItem(storageKey)||'[]');
      if(Array.isArray(stored)) records.push(...stored);
    }catch{}
  });
  return [...new Map(records.filter(item=>item?.signature?.startsWith('tiger-food:')).map(item=>[item.signature,item])).values()];
}
async function uploadTigerLocalArchive(){
  if(!db||!user)return;
  const {data,error}=await db.from('veo_prompt_archive').select('signature').eq('user_id',user).like('signature','tiger-food:%');
  if(error){sync('수파베이스 백호 보관함 설정 필요');return}
  const cloudSignatures=new Set((data||[]).map(item=>item.signature));
  let uploaded=0;
  for(const item of tigerLocalArchiveRecords()){
    if(cloudSignatures.has(item.signature))continue;
    const row={user_id:user,title:item.title||item.food||'아기 백호 음식 에피소드',food:item.food||item.title||'아기 백호 음식',signature:item.signature,prompt:item.prompt||item.flowPrompt||item.storyboard||'아기 백호 음식 에피소드',flow_prompt:item.flowPrompt||item.prompt||null,summary:item.summary||null,storyboard:item.storyboard||null};
    if(item.created_at)row.created_at=item.created_at;
    const {error:insertError}=await db.from('veo_prompt_archive').insert(row);
    if(!insertError)uploaded++;
  }
  await load();
  if(uploaded)sync(`아기 백호 로컬 보관함 ${uploaded}개를 수파베이스에 저장함`,true);
}
async function initTigerFoodArchiveIsolation(){
  try {
    db = window.supabase.createClient(CONFIG.url, CONFIG.anonKey, { auth:{ persistSession:true, autoRefreshToken:true, detectSessionInUrl:false } });
    const originalFrom = db.from.bind(db);
    db.from = table => originalFrom(table === 'veo_prompt_archive' ? 'tiger_food_archive' : table);
    let { data:{ session } } = await db.auth.getSession();
    if (session?.user?.is_anonymous) { await db.auth.signOut(); session = null; }
    user = session?.user?.id || null;
    await load();
    await uploadTigerLocalArchive();
  } catch { await load(); }
}
window.connectTigerSupabase = initTigerFoodArchiveIsolation;
