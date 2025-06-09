// This script is only for development and hot-reloading.

const WS_PORT = 8080;

function connect() {
  const ws = new WebSocket(`ws://localhost:${WS_PORT}`);

  ws.onopen = () => {
    console.log('[Background] WebSocket connection established.');
  };

  ws.onmessage = (event) => {
    if (event.data === 'reload') {
      console.log('[Background] Reloading extension...');
      chrome.runtime.reload();
    }
  };

  ws.onclose = () => {
    console.log('[Background] WebSocket connection closed. Reconnecting in 1 second...');
    setTimeout(connect, 1000); // 尝试重连
  };

  ws.onerror = (error) => {
    console.error('[Background] WebSocket error:', error);
    ws.close(); // 这会触发 onclose 中的重连逻辑
  };
}

connect(); 