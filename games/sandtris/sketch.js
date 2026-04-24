function HSVtoRGB(_0x258b09, _0x543b2c, _0x227e8e) {
  var _0x144ace;
  var _0x440e38;
  var _0x3a7c96;
  var _0x58e37c;
  var _0x5eb92a;
  var _0x19fb97;
  var _0x702531;
  var _0xc25e27;
  if (arguments.length === 1) {
    _0x543b2c = _0x258b09.s;
    _0x227e8e = _0x258b09.v;
    _0x258b09 = _0x258b09.h;
  }
  _0x58e37c = Math.floor(_0x258b09 * 6);
  _0x5eb92a = _0x258b09 * 6 - _0x58e37c;
  _0x19fb97 = _0x227e8e * (1 - _0x543b2c);
  _0x702531 = _0x227e8e * (1 - _0x5eb92a * _0x543b2c);
  _0xc25e27 = _0x227e8e * (1 - (1 - _0x5eb92a) * _0x543b2c);
  switch (_0x58e37c % 6) {
    case 0:
      _0x144ace = _0x227e8e;
      _0x440e38 = _0xc25e27;
      _0x3a7c96 = _0x19fb97;
      break;
    case 1:
      _0x144ace = _0x702531;
      _0x440e38 = _0x227e8e;
      _0x3a7c96 = _0x19fb97;
      break;
    case 2:
      _0x144ace = _0x19fb97;
      _0x440e38 = _0x227e8e;
      _0x3a7c96 = _0xc25e27;
      break;
    case 3:
      _0x144ace = _0x19fb97;
      _0x440e38 = _0x702531;
      _0x3a7c96 = _0x227e8e;
      break;
    case 4:
      _0x144ace = _0xc25e27;
      _0x440e38 = _0x19fb97;
      _0x3a7c96 = _0x227e8e;
      break;
    case 5:
      _0x144ace = _0x227e8e;
      _0x440e38 = _0x19fb97;
      _0x3a7c96 = _0x702531;
      break;
  }
  return {
    r: Math.round(_0x144ace * 255),
    g: Math.round(_0x440e38 * 255),
    b: Math.round(_0x3a7c96 * 255),
  };
}
var gridBG = [24, 21, 17];
var gameBG = [68, 60, 51];
var grid = [];
var scl = 4;
var padding = 4;
var columns = 100;
var rows = 160;
var buff;
var t = 0;
var playerBlock;
var nextBlock;
var vis;
var fullLine;
var cleartime = 0;
var placed = false;
var linesCleared = 0;
var poopbutt = 0;
var RENAMETHIS = 0;
var gameOffset = scl * 4;
var nextOffset;
var gameRes;
var placeSound = 0.1;
var lineSound = 0.1;
var gameMusic = 0.1;
var pixelFont;
var gameOver = true;
var paused = true;
var startScreen;
var pauseScreen;
var aboutScreen;
var gameoverScreen;
var gameoverText;
var timeText = '00:00';
var levelSlider;
var levelText;
var difficulty = 1;
var sfxSlider1;
var sfxSlider2;
var musSlider1;
var musSlider2;
var musicText;
var lpfilter;
var vel = 0.5;
var dupChance = 0.5;
var scoreSubmitted = true;
let userId;
var lbUrl = 'https://fanrco.pythonanywhere.com';
var btnControls = {
  fast: false,
  rotate: false,
  down: false,
  left: false,
  right: false,
};
function setButton(_0x927f01, _0x25e4e3) {
  btnControls[_0x927f01] = _0x25e4e3;
}
function generateScoreHash(
  _0x50588b,
  _0xcd8beb,
  _0x56059f,
  _0x753d2c,
  _0x4746ff
) {
  const _0x4fca4f =
    _0x50588b +
    ':' +
    _0xcd8beb +
    ':' +
    _0x56059f +
    ':' +
    _0x753d2c +
    ':' +
    _0x4746ff;
  const _0x5c8a1b = new TextEncoder();
  const _0x53d10e = _0x5c8a1b.encode(_0x4fca4f);
  return crypto.subtle
    .digest('SHA-256', _0x53d10e)
    .then((_0x2b282a) => {
      const _0x1a0096 = Array.from(new Uint8Array(_0x2b282a));
      const _0x290a96 = _0x1a0096
        .map((_0x615307) => _0x615307.toString(16).padStart(2, '0'))
        .join('');
      return _0x290a96 + '|' + t;
    })
    .catch((_0x4ab5ea) => {
      console.error('Error generating score hash:', _0x4ab5ea);
      return null;
    });
}
function handleReturnMessage(_0x23ffc2) {
  scoreSubmitted = false;
}

function getCookie(_0x489841) {
  const _0x39d5dc = '; ' + document.cookie;
  const _0x39a503 = _0x39d5dc.split('; ' + _0x489841 + '=');
  if (_0x39a503.length === 2) {
    return _0x39a503.pop().split(';').shift();
  }
}
function setCookie(_0x116ab0, _0x59bb97, _0x3c89d6) {
  const _0x28f1d9 = new Date();
  _0x28f1d9.setTime(_0x28f1d9.getTime() + _0x3c89d6 * 24 * 60 * 60 * 1000);
  document.cookie =
    _0x116ab0 +
    '=' +
    _0x59bb97 +
    '; expires=' +
    _0x28f1d9.toUTCString() +
    '; path=/';
}
function generateUserId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (_0x163903) {
      var _0x207008 = (Math.random() * 16) | 0;
      var _0x2b01e9 = _0x163903 == 'x' ? _0x207008 : (_0x207008 & 3) | 8;
      return _0x2b01e9.toString(16);
    }
  );
}
var brick = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 2, 2, 0, 1, 0],
  [0, 1, 0, 2, 2, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
var staticbrick = [
  [2, 0, 0, 0, 0, 0, 0, 2],
  [0, 1, 2, 1, 1, 2, 1, 0],
  [0, 2, 1, 1, 1, 1, 2, 0],
  [0, 1, 1, 0, 0, 1, 1, 0],
  [0, 1, 1, 0, 0, 1, 1, 0],
  [0, 2, 1, 1, 1, 1, 2, 0],
  [0, 1, 2, 1, 1, 2, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 2],
];
var cols = [102, 196, 340, 50];
var blockType = [
  [
    [0, 0, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 1, 1, 0, 1, 1],
  ],
  [
    [0, 0, 0, 1, 1, 0, 0, 2],
    [0, 0, 1, 0, 2, 0, 2, 1],
    [0, 2, 1, 2, 1, 1, 1, 0],
    [0, 0, 0, 1, 1, 1, 2, 1],
  ],
  [
    [0, 0, 1, 0, 1, 1, 1, 2],
    [0, 1, 1, 1, 2, 1, 2, 0],
    [0, 0, 0, 1, 0, 2, 1, 2],
    [0, 0, 0, 1, 1, 0, 2, 0],
  ],
  [
    [0, 0, 1, 0, 1, 1, 2, 1],
    [0, 1, 0, 2, 1, 1, 1, 0],
    [0, 0, 1, 0, 1, 1, 2, 1],
    [0, 1, 0, 2, 1, 1, 1, 0],
  ],
  [
    [0, 1, 1, 1, 1, 0, 2, 0],
    [0, 0, 0, 1, 1, 1, 1, 2],
    [0, 1, 1, 1, 1, 0, 2, 0],
    [0, 0, 0, 1, 1, 1, 1, 2],
  ],
  [
    [0, 0, 1, 0, 2, 0, 1, 1],
    [0, 1, 1, 0, 1, 1, 1, 2],
    [1, 0, 0, 1, 1, 1, 2, 1],
    [0, 0, 0, 1, 0, 2, 1, 1],
  ],
  [
    [0, 0, 1, 0, 2, 0, 3, 0],
    [0, 0, 0, 1, 0, 2, 0, 3],
    [0, 0, 1, 0, 2, 0, 3, 0],
    [0, 0, 0, 1, 0, 2, 0, 3],
  ],
];
var blockWidth = [
  [1, 1, 1, 1],
  [1, 2, 1, 2],
  [1, 2, 1, 2],
  [2, 1, 2, 1],
  [2, 1, 2, 1],
  [2, 1, 2, 1],
  [3, 0, 3, 0],
];
var blockHeight = [
  [1, 1, 1, 1],
  [2, 1, 2, 1],
  [2, 1, 2, 1],
  [1, 2, 1, 2],
  [1, 2, 1, 2],
  [1, 2, 1, 2],
  [0, 3, 0, 3],
];
function preload() {
  userId = getCookie('userId');
  if (!userId) {
    userId = generateUserId();
    setCookie('userId', userId, 9999);
  }
  soundFormats('mp3', 'ogg');
  placeSound = loadSound('sounds/place');
  lineSound = loadSound('sounds/line');
  gameMusic = loadSound('sounds/music');
  pixelFont = loadFont('fonts/retroFont.ttf');
}
function Block(_0x3213cb, _0x25b8ee) {
  this.pos = createVector(0, 0);
  this.grav = vel;
  this.sprite = null;
  this.grid = [];
  this.type = 0;
  this.col = 0;
  this.static = false;
  this.rot = 0;
  this.rotReset = true;
  this.clearGrid = function () {
    this.grid = [];
    for (let _0x4b0f18 = 0; _0x4b0f18 < 32; _0x4b0f18++) {
      this.grid.push(new Array(32).fill(null));
    }
  };
  this.renderBlock = function () {
    this.clearGrid();
    AddBlock(
      this.grid,
      0,
      31,
      blockType[this.type][this.rot],
      this.col,
      this.static
    );
    renderFromArray(this.grid, this.sprite);
  };
  this.newBlock = function () {
    this.static = false;
    this.sprite = createImage(32, 32);
    this.type = int(random(blockType.length));
    this.col = int(random(4));
    this.pos = createVector(
      int(columns / 2 - (blockWidth[this.type][0] + 1)),
      0
    );
    this.renderBlock();
  };
  this.show = function () {
    image(
      this.sprite,
      this.pos.x * scl,
      (this.pos.y - 32) * scl,
      scl * 32,
      scl * 32
    );
  };
  this.update = function () {
    let _0x21027b = Math.floor(this.pos.x);
    let _0x2278cb = Math.floor(this.pos.y);
    if (_0x2278cb + 1 >= rows) {
      placed = true;
    } else {
      for (let _0xdee824 = 0; _0xdee824 < 4; _0xdee824++) {
        let _0x5a682d = _0xdee824 * 2;
        let _0x566852 = blockType[this.type][this.rot][_0x5a682d];
        let _0x224794 = blockType[this.type][this.rot][_0x5a682d + 1];
        let _0x596568 = int(_0x21027b + _0x566852 * 8);
        let _0x44627e = int(_0x2278cb - _0x224794 * 8);
        if (_0x44627e <= 0) {
          continue;
        }
        for (let _0x57d6b3 = 0; _0x57d6b3 < 8; _0x57d6b3++) {
          if (grid[_0x44627e + 1][_0x596568 + _0x57d6b3] != null) {
            if (grid[_0x44627e][_0x596568 + _0x57d6b3]) {
              this.pos.y -= 1;
            }
            placed = true;
          }
        }
      }
    }
    if (placed) {
      if (this.pos.y - (blockHeight[this.type][this.rot] + 1) * 8 < 0) {
        gameOver = true;
        gameOverScore();
        gameoverScreen.open = true;
      }
      AddBlock(
        grid,
        _0x21027b,
        min(_0x2278cb, rows - 1),
        blockType[this.type][this.rot],
        this.col,
        this.static
      );
      placeSound.play();
      return;
    }
    this.pos.y += this.grav;
  };
  this.rotate = function () {
    this.rot = (this.rot + 1) % 4;
    this.clearGrid();
    this.sprite = createImage(32, 32);
    AddBlock(
      this.grid,
      0,
      31,
      blockType[this.type][this.rot],
      this.col,
      this.static
    );
    renderFromArray(this.grid, this.sprite);
    let _0x427b1c = blockWidth[this.type][this.rot] + 1;
    if (this.pos.x > columns - _0x427b1c * 8) {
      this.pos.x = columns - _0x427b1c * 8;
    }
  };
  this.controls = function () {
    let _0xf7e439 = 1;
    if (keyIsDown(16) || keyIsDown(17) || btnControls.fast === true) {
      _0xf7e439 = 2;
    }
    if (keyIsDown(UP_ARROW) || btnControls.rotate === true) {
      if (this.rotReset) {
        this.rotate();
        this.rotReset = false;
      }
    } else {
      this.rotReset = true;
    }
    if (keyIsDown(LEFT_ARROW) || btnControls.left === true) {
      this.pos.x -= _0xf7e439;
      if (this.pos.x < 0) {
        this.pos.x = 0;
      }
    }
    if (keyIsDown(RIGHT_ARROW) || btnControls.right === true) {
      this.pos.x += _0xf7e439;
      let _0x5e0aa3 = blockWidth[this.type][this.rot] + 1;
      if (this.pos.x > columns - _0x5e0aa3 * 8) {
        this.pos.x = columns - _0x5e0aa3 * 8;
      }
    }
    if (keyIsDown(DOWN_ARROW) || btnControls.down === true) {
      this.pos.y += 1;
      poopbutt += 1;
    }
  };
}
function resetGame() {
  scoreSubmitted = false;
  poopbutt = 0;
  linesCleared = 0;
  staticCount = 0;
  t = 0;
  lpfilter.freq(10000);
  placed = false;
  buff = createImage(columns, rows);
  grid = [];
  for (let _0x222a7b = 0; _0x222a7b < rows; _0x222a7b++) {
    grid[_0x222a7b] = [];
    for (let _0x3f2233 = 0; _0x3f2233 < columns; _0x3f2233++) {
      grid[_0x222a7b].push(null);
    }
  }
  playerBlock = new Block(width / 2 - gameOffset, 0);
  playerBlock.newBlock();
  nextBlock = new Block(width / 2 - gameOffset, 0);
  nextBlock.newBlock();
}
function startGame() {
  resetGame();
  paused = false;
  gameOver = false;
  startScreen.open = false;
  gameMusic.stop();
}
function unpauseGame() {
  lpfilter.freq(10000);
  paused = false;
  pauseScreen.open = false;
}
function newGame() {
  pauseScreen.open = false;
  gameoverScreen.open = false;
  startScreen.open = true;
  gameMusic.stop();
}
function SFXvolume(_0x33cfc8) {
  let _0x1a7e9d = _0x33cfc8 / 10;
  placeSound.setVolume(_0x1a7e9d / 2);
  lineSound.setVolume(_0x1a7e9d / 2);
  sfxSlider1.value = _0x33cfc8;
  sfxSlider2.value = _0x33cfc8;
}
function MUSvolume(_0x496050) {
  let _0x457f1f = _0x496050 / 10;
  gameMusic.setVolume(_0x457f1f / 2);
  musSlider1.value = _0x496050;
  musSlider2.value = _0x496050;
}
function toggleAbout() {
  aboutScreen.open = !aboutScreen.open;
  startScreen.open = !startScreen.open;
}
function gameOverScore() {
  gameoverText.innerHTML = '';
  gameoverText.innerHTML += 'SCORE: ' + poopbutt;
  gameoverText.innerHTML += ' LINES: ' + linesCleared;
}
function shareText() {
  let _0xfe62e9 = '';
  let _0x46f3cb = difficulty.toString();
  let _0x2b14e6 = linesCleared.toString();
  let _0x535d2e = poopbutt.toString();
  _0xfe62e9 += 'LEVEL: ' + _0x46f3cb + ' '.repeat(6 - _0x46f3cb.length) + '| ';
  _0xfe62e9 += 'LINES: ' + _0x2b14e6 + ' '.repeat(6 - _0x2b14e6.length) + '\n';
  _0xfe62e9 += 'SCORE: ' + _0x535d2e + ' '.repeat(9 - _0x535d2e.length) + '| ';
  _0xfe62e9 += 'TIME: ' + timeText + ' '.repeat(7 - timeText.length) + '\n';
  _0xfe62e9 += 'Play now at https://sandtris.com/';
  navigator.clipboard.writeText(_0xfe62e9);
  alert('Share Text Copied to Clipboard!');
}
function setup() {
  startScreen = document.getElementById('startpage');
  pauseScreen = document.getElementById('pausepage');
  gameoverScreen = document.getElementById('gameoverpage');
  aboutScreen = document.getElementById('aboutpage');
  sfxSlider1 = document.getElementById('sfx1Slider');
  sfxSlider2 = document.getElementById('sfx2Slider');
  musSlider1 = document.getElementById('mus1Slider');
  musSlider2 = document.getElementById('mus2Slider');
  gameoverText = document.getElementById('gameoverText');
  gameRes = createVector(columns * scl, rows * scl);
  nextOffset = gameRes.x + gameOffset;
  cnv = createCanvas(gameRes.x + gameOffset * 11, gameRes.y);
  cnv.parent('cnv');
  textFont(pixelFont);
  frameRate(60);
  noSmooth();
  lpfilter = new p5.LowPass();
  lpfilter.freq(10000);
  gameMusic.disconnect();
  gameMusic.connect(lpfilter);
  gameMusic.setVolume(0.5);
  SFXvolume(1);
  MUSvolume(1);
  resetGame();
  console.log('Now with more sand!');
}
function AddBlock(
  _0x1d2fce,
  _0x3b96ca,
  _0xdedac,
  _0x2a7399,
  _0x356f16,
  _0x223b87
) {
  for (let _0x1f5d49 = 0; _0x1f5d49 < 4; _0x1f5d49++) {
    AddSingleBrick(
      _0x1d2fce,
      _0x3b96ca + _0x2a7399[_0x1f5d49 * 2] * 8,
      _0xdedac - _0x2a7399[_0x1f5d49 * 2 + 1] * 8,
      _0x356f16,
      _0x223b87
    );
  }
}
function AddSingleBrick(_0x37fadb, _0x589f28, _0x27da01, _0x234e9b, _0x5a8549) {
  let _0x234263 = brick;
  if (_0x5a8549) {
    _0x234263 = staticbrick;
  }
  for (let _0x11e7b7 = 0; _0x11e7b7 < 8; _0x11e7b7++) {
    for (let _0xc7639e = 0; _0xc7639e < 8; _0xc7639e++) {
      if (_0x27da01 - _0x11e7b7 < 0) {
        continue;
      }
      let _0x560b10 = HSVtoRGB(
        cols[_0x234e9b] / 360,
        0.9 - _0x5a8549 / 3,
        map(_0x234263[_0x11e7b7][_0xc7639e], 0, 2, 0.6, 1)
      );
      _0x37fadb[_0x27da01 - _0x11e7b7][_0x589f28 + _0xc7639e] = [
        _0x234e9b,
        _0x560b10.r,
        _0x560b10.g,
        _0x560b10.b,
        0,
        _0x5a8549,
      ];
    }
  }
}
function renderFromArray(_0x11b33a, _0x158c70) {
  let _0xa4e96d = _0x11b33a.length;
  let _0x20e288 = _0x11b33a[0].length;
  _0x158c70.loadPixels();
  for (let _0xde07d = 0; _0xde07d < _0xa4e96d; _0xde07d++) {
    for (let _0x14a522 = 0; _0x14a522 < _0x20e288; _0x14a522++) {
      let _0x35b9d4 = (_0xde07d * _0x20e288 + _0x14a522) * 4;
      if (_0x11b33a[_0xde07d][_0x14a522] == null) {
        _0x158c70.pixels[_0x35b9d4] = 0;
        _0x158c70.pixels[_0x35b9d4 + 1] = 0;
        _0x158c70.pixels[_0x35b9d4 + 2] = 0;
        _0x158c70.pixels[_0x35b9d4 + 3] = 0;
        continue;
      }
      _0x158c70.pixels[_0x35b9d4] = _0x11b33a[_0xde07d][_0x14a522][1];
      _0x158c70.pixels[_0x35b9d4 + 1] = _0x11b33a[_0xde07d][_0x14a522][2];
      _0x158c70.pixels[_0x35b9d4 + 2] = _0x11b33a[_0xde07d][_0x14a522][3];
      _0x158c70.pixels[_0x35b9d4 + 3] = 255;
    }
  }
  _0x158c70.updatePixels();
}
function updateLogic(_0x1680ad, _0x2d6ef6) {
  if (grid[_0x2d6ef6][_0x1680ad] == null) {
    return;
  }
  grid[_0x2d6ef6][_0x1680ad][4] = 0;
  if (_0x2d6ef6 >= rows - 1) {
    return;
  }
  if (grid[_0x2d6ef6 + 1][_0x1680ad] == null) {
    grid[_0x2d6ef6 + 1][_0x1680ad] = grid[_0x2d6ef6][_0x1680ad];
    grid[_0x2d6ef6][_0x1680ad] = null;
    return;
  }
  if (grid[_0x2d6ef6][_0x1680ad][5]) {
    return;
  }
  let _0x283ea8 = _0x1680ad > 0 && grid[_0x2d6ef6 + 1][_0x1680ad - 1] == null;
  let _0x2337b5 =
    _0x1680ad < columns - 1 && grid[_0x2d6ef6 + 1][_0x1680ad + 1] == null;
  if (_0x283ea8 && _0x2337b5) {
    if (random() < 0.5) {
      grid[_0x2d6ef6 + 1][_0x1680ad - 1] = grid[_0x2d6ef6][_0x1680ad];
      grid[_0x2d6ef6][_0x1680ad] = null;
      return;
    }
    grid[_0x2d6ef6 + 1][_0x1680ad + 1] = grid[_0x2d6ef6][_0x1680ad];
    grid[_0x2d6ef6][_0x1680ad] = null;
    return;
  }
  if (_0x283ea8) {
    grid[_0x2d6ef6 + 1][_0x1680ad - 1] = grid[_0x2d6ef6][_0x1680ad];
    grid[_0x2d6ef6][_0x1680ad] = null;
    return;
  }
  if (_0x2337b5) {
    grid[_0x2d6ef6 + 1][_0x1680ad + 1] = grid[_0x2d6ef6][_0x1680ad];
    grid[_0x2d6ef6][_0x1680ad] = null;
    return;
  }
}
function updateGrid() {
  if (t % 4 == 0) {
    for (let _0x3cbdb = rows - 1; _0x3cbdb >= 0; _0x3cbdb--) {
      for (let _0x193425 = 0; _0x193425 < columns; _0x193425++) {
        updateLogic(_0x193425, _0x3cbdb);
      }
    }
    return;
  }
  if (t % 4 == 2) {
    for (let _0x35348e = rows - 1; _0x35348e >= 0; _0x35348e--) {
      for (let _0x5bebc2 = columns - 1; _0x5bebc2 >= 0; _0x5bebc2--) {
        updateLogic(_0x5bebc2, _0x35348e);
      }
    }
  }
}
function checkLine() {
  vis = [];
  for (let _0x265cae = 0; _0x265cae < rows; _0x265cae++) {
    vis = [];
    fullLine = false;
    if (grid[_0x265cae][0] == null || grid[_0x265cae][0][4] == 1) {
      continue;
    }
    floodFill(0, _0x265cae, grid[_0x265cae][0][0]);
    if (!fullLine) {
      continue;
    }
    return;
  }
}
function floodFill(_0x10f679, _0x3966c8, _0x55d456) {
  if (
    _0x10f679 < 0 ||
    _0x10f679 >= columns ||
    _0x3966c8 < 0 ||
    _0x3966c8 >= rows ||
    grid[_0x3966c8][_0x10f679] == null ||
    grid[_0x3966c8][_0x10f679][4] == 1 ||
    grid[_0x3966c8][_0x10f679][0] != _0x55d456
  ) {
    return;
  }
  if (_0x10f679 == columns - 1) {
    fullLine = true;
  }
  grid[_0x3966c8][_0x10f679][4] = 1;
  vis.push([_0x10f679, _0x3966c8]);
  floodFill(_0x10f679 + 1, _0x3966c8, _0x55d456);
  floodFill(_0x10f679 - 1, _0x3966c8, _0x55d456);
  floodFill(_0x10f679, _0x3966c8 + 1, _0x55d456);
  floodFill(_0x10f679, _0x3966c8 - 1, _0x55d456);
}
function setLineColor(_0x5aa98b) {
  let _0x4afd55 = 255;
  if (_0x5aa98b % 10 < 5) {
    _0x4afd55 = 0;
  }
  for (let _0xe6f106 of vis) {
    grid[_0xe6f106[1]][_0xe6f106[0]][1] = _0x4afd55;
    grid[_0xe6f106[1]][_0xe6f106[0]][2] = _0x4afd55;
    grid[_0xe6f106[1]][_0xe6f106[0]][3] = _0x4afd55;
  }
}
function deleteLine(_0x48f9ac) {
  for (let _0x48f196 of vis) {
    grid[_0x48f196[1]][_0x48f196[0]] = null;
  }
  poopbutt += vis.length;
  vis = [];
}
function UI() {
  renderFromArray(grid, buff);
  noStroke();
  background(gameBG[0], gameBG[1], gameBG[2]);
  fill(gridBG[0], gridBG[1], gridBG[2]);
  rect(0, 0, columns * scl, rows * scl);
  image(buff, 0, 0, columns * scl, rows * scl);
  if (!gameOver && !placed) {
    playerBlock.show();
  }
  fill(gridBG[0], gridBG[1], gridBG[2]);
  rect(nextOffset, gameOffset * 2, gameOffset * 10, gameOffset * 10);
  image(
    nextBlock.sprite,
    nextOffset + (5 - (blockWidth[nextBlock.type][0] + 1)) * gameOffset,
    (5 - (6 - blockHeight[nextBlock.type][0]) + 1) * gameOffset,
    scl * 32,
    scl * 32
  );
  let _0x3b68cc = Math.floor(t / 3600);
  let _0x5dcccf = Math.floor(t / 60) % 60;
  if (_0x3b68cc < 10) {
    _0x3b68cc = '0' + _0x3b68cc;
  }
  if (_0x5dcccf < 10) {
    _0x5dcccf = '0' + _0x5dcccf;
  }
  timeText = _0x3b68cc + ':' + _0x5dcccf;
  fill(230).stroke(0).strokeWeight(8).textSize(32);
  text(timeText, nextOffset - 2, gameOffset * 16);
  text('LINES:', nextOffset - 2, gameOffset * 19);
  text(linesCleared, nextOffset - 2, gameOffset * 21);
  text('SCORE:', nextOffset - 2, gameOffset * 24);
  text(poopbutt, nextOffset - 2, gameOffset * 26);
  text('LEVEL:', nextOffset - 2, gameOffset * 29);
  text(difficulty, nextOffset - 2, gameOffset * 31);
}
function keyPressed() {
  if (keyCode === 80) {
    if (gameOver) {
      return;
    }
    if (paused) {
      lpfilter.freq(10000);
    } else {
      lpfilter.freq(200);
    }
    paused = !paused;
    pauseScreen.open = !pauseScreen.open;
  }
}
function GameLogic() {
  if (paused) {
    return;
  }
  if (gameOver) {
    gameMusic.stop();
    return;
  }
  if (fullLine) {
    if (cleartime == 0) {
      linesCleared += 1;
      lineSound.play();
    }
    cleartime += 1;
    setLineColor(cleartime);
    if (cleartime > 30) {
      deleteLine();
      cleartime = 0;
      fullLine = false;
    }
    return;
  }
  if (placed) {
    if (!gameMusic.isPlaying()) {
      gameMusic.loop();
    }
    playerBlock = nextBlock;
    nextBlock = new Block(width / 2, 0);
    nextBlock.newBlock();
    if (playerBlock.col == nextBlock.col) {
      if (random() < dupChance) {
        nextBlock.col = (nextBlock.col + 1) % 4;
        nextBlock.renderBlock();
      }
    }
    placed = false;
  }
  difficulty = Math.min(Math.floor(linesCleared / 10), 9) + 1;
  vel = 0.5 + difficulty * 0.1;
  dupChance = 0.5 + difficulty * 0.02;
  updateGrid();
  playerBlock.update();
  playerBlock.controls();
  checkLine();
  t += 1;
}
function draw() {
  UI();
  GameLogic();
}
