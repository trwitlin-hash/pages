
// Url Blocker
(() => {
  const blockList = [/unity3d\.com/i, /sessions\.bugsnag\.com/i];

  function isBlocked(url) {
    return blockList.some((rx) => rx.test(url));
  }

  const originalFetch = window.fetch;
  window.fetch = async function (...args) {
    const url = args[0]?.toString?.() || '';
    if (isBlocked(url)) {
      console.warn('Blocked fetch: ', url);
      return new Response('', { status: 204, statusText: 'No Content' });
    }
    return originalFetch.apply(this, args);
  };

  const OriginalXHR = window.XMLHttpRequest;
  window.XMLHttpRequest = function () {
    const xhr = new OriginalXHR();
    const origOpen = xhr.open;
    const origSend = xhr.send;

    let blocked = false;

    xhr.open = function (method, url, ...rest) {
      blocked = isBlocked(url);
      if (blocked) console.warn('Blocked xhr:', url);
      return origOpen.call(this, method, url, ...rest);
    };

    xhr.send = function (...args) {
      if (blocked) {
        setTimeout(() => {
          xhr.readyState = 4;
          xhr.status = 204;
          xhr.statusText = 'No Content';
          xhr.responseText = '';
          xhr.response = '';
          if (typeof xhr.onreadystatechange === 'function')
            xhr.onreadystatechange();
          if (typeof xhr.onload === 'function') xhr.onload();
        });
        return;
      }
      return origSend.apply(this, args);
    };

    return xhr;
  };
})();

// Popup / navigation blocker (catches ActionScript getURL via window.open)
(() => {
  const _open = window.open;
  window.open = function (url, ...args) {
    if (!url || url === '' || url === 'about:blank') {
      return _open.apply(this, [url, ...args]);
    }
    console.warn('Blocked window.open:', url);
    return null;
  };
})();

// Event disabler
(() => {
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key.toLowerCase() === 'w') {
      e.preventDefault();
      e.stopPropagation();
    }
  });
})();

// Devtools (Konami code)
(() => {
  const loadEruda = async () => {
    if (typeof window.eruda != 'undefined') return;

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/eruda';
    script.onload = () => {
      window.eruda.init();
    };
    document.body.appendChild(script);
  };

  const combo = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA',
  ];

  var t = 0;
  document.addEventListener('keydown', function n(i) {
    if ((t = combo[t] === i.code ? t + 1 : 0) > 9) {
      try { loadEruda(); } catch (i) {}
      document.removeEventListener('keydown', n);
    }
  });
})();
