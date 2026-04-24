const runtimecanvas = 'resources/FNAF1HTML5.cch';
const parts = 8;

// -----------------
const map = new Map();

function updateProgress(id, percent) {
  document.getElementById(id + '-bar').style.width = percent + '%';
  document.getElementById(id + '-text').innerText = percent + '%';
}

async function intercept() {
  const ogfetch = window.fetch;
  window.fetch = async function (input, init) {
    if (typeof input === 'string' && input.startsWith('resources/')) {
      const fileName = input.split('/').pop();
      if (map.has(fileName)) {
        return ogfetch(map.get(fileName), init);
      }
    }
    return ogfetch(input, init);
  };

  const ogopen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    if (url.startsWith('resources/')) {
      const fileName = url.split('/').pop();
      if (map.has(fileName)) {
        url = map.get(fileName);
      }
    }
    return ogopen.apply(this, arguments);
  };

  const types = [HTMLImageElement, HTMLAudioElement, HTMLVideoElement];
  for (const Tag of types) {
    const descriptor = Object.getOwnPropertyDescriptor(Tag.prototype, 'src');
    if (descriptor && descriptor.set) {
      Object.defineProperty(Tag.prototype, 'src', {
        configurable: true,
        enumerable: true,
        get: descriptor.get,
        set: function (val) {
          if (typeof val === 'string' && val.startsWith('resources/')) {
            const fileName = val.split('/').pop();
            if (map.has(fileName)) {
              val = map.get(fileName);
            }
          }
          descriptor.set.call(this, val);
        },
      });
    }
  }
}

async function extract() {
  const res = await fetch('resources.zip');

  const contentLength = res.headers.get('Content-Length');
  const total = parseInt(contentLength, 10);
  const reader = res.body.getReader();
  let loaded = 0;
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.length;
    updateProgress('download', Math.floor((loaded / total) * 100));
  }

  const arrayBuffer = await new Blob(chunks).arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);
  const files = Object.keys(zip.files).filter((name) => !zip.files[name].dir);
  const totalFiles = files.length;

  for (let i = 0; i < totalFiles; i++) {
    const file = zip.files[files[i]];
    const blob = await file.async('blob');
    const url = URL.createObjectURL(blob);
    map.set(files[i], url);
    updateProgress('extract', Math.floor(((i + 1) / totalFiles) * 100));
  }
}

async function wedone() {
  await extract();
  await intercept();

  const script = document.createElement('script');
  script.src = 'Runtime.js';
  script.onload = () => {
    new Runtime('MMFCanvas', runtimecanvas);
  };
  document.getElementById('progress-container').style.display = 'none';
  document.head.appendChild(script);
}

wedone();
