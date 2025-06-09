import chokidar from 'chokidar';
import { exec } from 'child_process';
import { WebSocketServer } from 'ws';

// 配置
const WATCH_PATHS = ['app', 'components', 'public', 'lib', 'scripts', 'next.config.mjs', 'tsconfig.json']; // 需要监听的源文件目录
const BUILD_COMMAND = 'npm run build';
const WS_PORT = 8080; // WebSocket 服务器端口

// 1. 初始化 WebSocket 服务器
const wss = new WebSocketServer({ port: WS_PORT });
console.log(`[Watcher] WebSocket server started on port ${WS_PORT}`);
wss.on('connection', ws => {
  console.log('[Watcher] Chrome extension connected.');
});

function broadcastReload() {
  console.log('[Watcher] Broadcasting reload to all clients...');
  wss.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send('reload');
    }
  });
}

let isBuilding = false;

// 将构建逻辑封装成一个函数
function runBuild() {
  if (isBuilding) {
    console.log('[Watcher] Build already in progress.');
    return;
  }

  console.log('[Watcher] Triggering build...');
  isBuilding = true;

  const buildProcess = exec(BUILD_COMMAND);

  // 打印构建过程的输出
  buildProcess.stdout.pipe(process.stdout);
  buildProcess.stderr.pipe(process.stderr);

  // 构建完成后发送重载消息
  buildProcess.on('close', (code) => {
    isBuilding = false;
    if (code === 0) {
      console.log('[Watcher] Build completed successfully. Notifying extension to reload.');
      broadcastReload();
    } else {
      console.error(`[Watcher] Build failed with exit code ${code}.`);
    }
  });
}

// 2. 初始化 Chokidar 文件监听器
const watcher = chokidar.watch(WATCH_PATHS, {
  ignored: /(^|[\\/])\\../, // 忽略点文件
  persistent: true,
  ignoreInitial: true, // 忽略初始化的扫描
});

console.log(`[Watcher] Watching for file changes in: ${WATCH_PATHS.join(', ')}`);

// 3. 定义文件变化时的处理逻辑
watcher.on('all', (event, path) => {
  console.log(`[Watcher] Detected ${event} in '${path}'.`);
  runBuild();
});

// 4. 在启动时执行一次初始构建
console.log('[Watcher] Performing initial build...');
runBuild(); 