async function initTigerFoodArchiveIsolation(){
  try {
    db = window.supabase.createClient(CONFIG.url, CONFIG.anonKey, { auth:{ persistSession:true, autoRefreshToken:true, detectSessionInUrl:false } });
    const originalFrom = db.from.bind(db);
    db.from = table => originalFrom(table === 'veo_prompt_archive' ? 'tiger_food_archive' : table);
    let { data:{ session } } = await db.auth.getSession();
    if (session?.user?.is_anonymous) { await db.auth.signOut(); session = null; }
    user = session?.user?.id || null;
    await load();
  } catch { await load(); }
}
window.connectTigerSupabase = initTigerFoodArchiveIsolation;
