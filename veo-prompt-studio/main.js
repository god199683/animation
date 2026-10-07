const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const https = require('https');
const crypto = require('crypto');
const { spawn } = require('child_process');

// Some Windows GPUs/drivers fail Electron's Chromium GPU child process. The studio is a text-first tool,
// so disabling acceleration gives it a reliable renderer without affecting its features.
app.disableHardwareAcceleration();
let mainWindow;
const REPOSITORY = 'god199683/animation';
const APP_VERSION = require('./package.json').version;

const request = (url) => new Promise((resolve, reject) => {
  https.get(url, { headers: { 'User-Agent': 'Tailframe-VEO-Prompt-Studio' } }, response => {
    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) return resolve(request(response.headers.location));
    if (response.statusCode !== 200) return reject(new Error(`Update server returned ${response.statusCode}`));
    const chunks = []; response.on('data', chunk => chunks.push(chunk)); response.on('end', () => resolve(Buffer.concat(chunks)));
  }).on('error', reject);
});
const compareVersions = (a, b) => {
  const left = String(a).replace(/^v/, '').split('.').map(Number), right = String(b).replace(/^v/, '').split('.').map(Number);
  for (let i = 0; i < Math.max(left.length, right.length); i++) { const diff = (left[i] || 0) - (right[i] || 0); if (diff) return diff; }
  return 0;
};
async function latestRelease() {
  const release = JSON.parse((await request(`https://api.github.com/repos/${REPOSITORY}/releases/latest`)).toString('utf8'));
  const asset = release.assets?.find(item => item.name === 'Tailframe-VEO-Prompt-Studio-win.zip');
  if (!asset) throw new Error('업데이트 파일을 찾지 못했습니다.');
  return { version: release.tag_name.replace(/^v/, ''), url: asset.browser_download_url, digest: asset.digest || '', notes: release.body || '' };
}
ipcMain.handle('updater:check', async () => {
  try { const release = await latestRelease(); return { available: compareVersions(release.version, APP_VERSION) > 0, current: APP_VERSION, ...release }; }
  catch (error) { return { available: false, current: APP_VERSION, error: error.message }; }
});
ipcMain.handle('updater:apply', async () => {
  const release = await latestRelease();
  if (compareVersions(release.version, APP_VERSION) <= 0) return { started: false, message: '이미 최신 버전입니다.' };
  const zip = await request(release.url);
  if (release.digest.startsWith('sha256:')) {
    const actual = crypto.createHash('sha256').update(zip).digest('hex');
    if (actual !== release.digest.slice(7)) throw new Error('업데이트 파일 검증에 실패했습니다.');
  }
  const tempRoot = path.join(os.tmpdir(), 'tailframe-update'); fs.mkdirSync(tempRoot, { recursive: true });
  const zipPath = path.join(tempRoot, 'update.zip'); fs.writeFileSync(zipPath, zip);
  const scriptPath = path.join(tempRoot, 'apply-update.ps1');
  const appDir = path.dirname(process.execPath); const appExe = process.execPath;
  const script = `$ErrorActionPreference='Stop'\n$pidToWait=${process.pid}\nwhile (Get-Process -Id $pidToWait -ErrorAction SilentlyContinue) { Start-Sleep -Milliseconds 300 }\n$staging=Join-Path $env:TEMP 'tailframe-update-staging'\nRemove-Item -LiteralPath $staging -Recurse -Force -ErrorAction SilentlyContinue\nExpand-Archive -LiteralPath '${zipPath.replace(/'/g, "''")}' -DestinationPath $staging -Force\n$source=(Get-ChildItem -LiteralPath $staging -Directory | Select-Object -First 1).FullName\nCopy-Item -LiteralPath (Join-Path $source '*') -Destination '${appDir.replace(/'/g, "''")}' -Recurse -Force\nStart-Process -FilePath '${appExe.replace(/'/g, "''")}'\n`;
  fs.writeFileSync(scriptPath, script.replace('Copy-Item -LiteralPath', 'Copy-Item -Path'), 'utf8');
  spawn(process.env.SystemRoot + '\\System32\\WindowsPowerShell\\v1.0\\powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', scriptPath], { detached: true, stdio: 'ignore', windowsHide: true }).unref();
  setTimeout(() => app.quit(), 200);
  return { started: true };
});

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1440,
    height: 960,
    minWidth: 980,
    minHeight: 720,
    backgroundColor: '#1c1729',
    show: false,
    autoHideMenuBar: true,
    title: 'Tailframe — OMNI Prompt Studio',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow = window;
  window.loadFile(path.join(__dirname, 'index.html'));
  window.once('ready-to-show', () => window.show());
  // Do not leave the app running invisibly if Chromium misses ready-to-show after a cache/profile reset.
  setTimeout(() => { if (!window.isDestroyed() && !window.isVisible()) window.show(); }, 2000);
  window.webContents.on('render-process-gone', () => {
    // Keep the app open and restore the workspace if Chromium's renderer is interrupted.
    setTimeout(() => { if (!window.isDestroyed()) window.loadFile(path.join(__dirname, 'index.html')); }, 500);
  });
  window.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('browser-window-created', (_event, window) => { mainWindow = window; });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
