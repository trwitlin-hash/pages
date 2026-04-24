gameurl = 'http://games.vn/games/core-ball/';
imgUrl = 'http://games.vn/games/core-ball/icon.png';
openid = '';
var v = new RegExp('[?&]openid=([^?&]*)[&]?', 'i');
var v2 = window.location.search.match(v);
if (v2 == null) {
  ('');
} else {
  v2[1];
}
if (v2) {
  openid = v2[1];
}
if (typeof window.define == 'undefined') {
  window.define = function () {};
  window.define.amd = 1;
}
if (typeof window.$AJB == 'undefined') {
  window.$AJB = {};
}
$AJB.lib = {};
$AJB.general = {};
$AJB.page = {};
$AJB.lib.stopEvent = function () {
  'use strict';

  return function (p) {
    if (p) {
      if (p.preventDefault) {
        p.preventDefault();
        p.stopPropagation();
      } else {
        p.returnValue = false;
        p.cancelBubble = true;
      }
    }
  };
};
$AJB.lib.Storage = function () {
  'use strict';

  var vO = {
    setValue: function (p2, p3) {
      if (window.localStorage) {
        window.localStorage[p2] = p3;
      }
    },
    getValue: function (p4) {
      if (window.localStorage) {
        return window.localStorage[p4];
      } else {
        return undefined;
      }
    },
  };
  return vO;
};
$AJB.general.BeginStage = function () {
  'use strict';

  function f(p5) {
    function f2() {
      v6(v3, 'click', function () {
        vV7.fire(vLSStart, vLN0);
      });
      v5.innerHTML = v8.isAndroid
        ? 'GO'
        : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"/></svg>';
    }
    var v3 = p5.getElementsByClassName('button')[0];
    var v4 = p5.getElementsByClassName('text')[0];
    var v5 = document.getElementById('txtAr');
    var vO2 = {
      show: function () {
        p5.style.display = '';
      },
      hide: function () {
        p5.style.display = 'none';
      },
      level: function (p6) {
        vLN0 = p6;
        v4.innerHTML = 'level ' + p6;
      },
      on: function (p7, p8) {
        vV7.add(p7, p8);
      },
      off: function (p9, p10) {
        vV7.remove(p9, p10);
      },
    };
    f2();
    return vO2;
  }
  var v6 = $AJB.lib.addEvent();
  var v7 = $AJB.lib.CustEvent();
  var v8 = $AJB.lib.util();
  var vV7 = v7();
  var vLN0 = 0;
  var vLSStart = 'start';
  return f;
};
$AJB.general.Switcher = function () {
  'use strict';

  function f3(p11, p12, p13) {
    var v9;
    var v10;
    var v11 = null;
    var v12 = false;
    var vO3 = {
      point: [0, 0],
      enabled: false,
      color: '#c8c8c8',
      update: function () {
        var v13 = vO3.point;
        var vLN30 = 30;
        if (vO3.enabled) {
          if (v10 === 0) {
            v9 = vO3.color;
            if (v13[0] < p12 / 2) {
              v13[0] = Math.min(v13[0] + vLN30, p12 / 2);
              vO3.point = v13;
            } else {
              vO3.point = v13;
              v12 = true;
            }
          } else if (v10 === 1) {
            v9 = '#000';
            if (v13[0] > p12 / 2) {
              v13[0] = Math.max(v13[0] - vLN30, p12 / 2);
              vO3.point = v13;
            } else {
              vO3.point = v13;
              v12 = true;
            }
          }
        }
      },
      render: function () {
        var v14 = vO3.point;
        if (vO3.enabled) {
          p11.fillStyle = v9;
          p11.fillRect(v14[0] - p12 / 2, v14[1] - p13 / 2, p12, p13);
          if (v12) {
            vO3.enabled = false;
            if (v11) {
              v11();
            }
          }
        }
      },
      switchStage: function (p14, p15) {
        if (p14 === 0) {
          vO3.point = [-p12 / 2, p13 / 2];
        } else if (p14 === 1) {
          p11.fillStyle = vO3.color;
          p11.fillRect(0, 0, p12, p13);
          vO3.point = [p12 + p12 / 2, p13 / 2];
        }
        vO3.enabled = true;
        v12 = false;
        v10 = p14;
        v11 = p15;
      },
    };
    return vO3;
  }
  return f3;
};
$AJB.lib.addEvent = function () {
  var v15 = $AJB.lib.util();
  var vO4 = {
    click: 'touchstart',
    mousedown: 'touchstart',
    mouseup: 'touchend',
  };
  return function (p16, p17, p18, p19) {
    if (p16.addEventListener) {
      p16.addEventListener(v15.isMobile ? vO4[p17] || p17 : p17, p18, p19);
    } else if (p16.attachEvent) {
      p16.attachEvent('on' + p17, p18);
    } else {
      p16['on' + p17] = p18;
    }
  };
};
$AJB.general.Levels = function () {
  'use strict';

  function f4(p20, p21) {
    return function () {
      var vLN02 = 0;
      return function () {
        return (vLN02 += (p20 * p21) % 360);
      };
    };
  }
  function f5(p22, p23) {
    return function () {
      var vLN03 = 0;
      var vLN1 = 1;
      var v16 = +new Date();
      return function () {
        var v17 = +new Date();
        if (v17 - v16 > p23) {
          vLN1 = -vLN1;
          v16 = v17;
        }
        return (vLN03 += (vLN1 * p22) % 360);
      };
    };
  }
  function f6(p24, p25, p26, p27) {
    return function () {
      var vLN04 = 0;
      var v18 = +new Date();
      return function () {
        var v19 = +new Date();
        if (v19 - v18 > p26) {
          p24 = p25 - p24;
          v18 = v19;
        }
        return (vLN04 += (p24 * p27) % 360);
      };
    };
  }
  function f7(p28) {
    var vLN12 = 1;
    v23(document.body, 'mousedown', function () {
      vLN12 = -vLN12;
    });
    return function () {
      var vLN05 = 0;
      return function () {
        return (vLN05 += (p28 * vLN12) % 360);
      };
    };
  }
  function f8(p29, p30, p31, p32) {
    v23(document.body, 'mousedown', function () {
      p32 = -p32;
    });
    return function () {
      var vLN06 = 0;
      var v20 = +new Date();
      return function () {
        var v21 = +new Date();
        if (v21 - v20 > p31) {
          p29 = p30 - p29;
          v20 = v21;
        }
        return (vLN06 += (p29 * p32) % 360);
      };
    };
  }
  function f9(p33, p34, p35, p36) {
    vO5[p33] = {
      childs: vO7[p34],
      queueCount: p35,
      round: vO6[p36],
    };
  }
  var v22;
  var v23 = $AJB.lib.addEvent();
  var vO5 = {};
  var vO6 = {
    A1: f4(1.5, 1),
    A2: f4(1.5, -1),
    B1: f4(2.5, 1),
    B2: f4(2.5, -1),
    C1: f5(2.2, 3000),
    C2: f5(3.5, 2000),
    D1: f6(2, 2.3, 1200, 1),
    D2: f6(2, 2.3, 1200, -1),
    D3: f6(4, 4.5, 1700, 1),
    D4: f6(4, 4.5, 1700, -1),
    D5: f6(4, 4.5, 1700, 1),
    D6: f6(4, 4.5, 1700, -1),
    E1: f7(2),
    E2: f8(2, 2.3, 1000, 1),
  };
  var vO7 = {
    0: [],
    2: [0, 180],
    3: [0, 120, 240],
    4: [0, 90, 180, 270],
    5: [0, 72, 144, 216, 288],
    6: [0, 60, 120, 180, 240, 300],
    7: [0, 52, 103, 155, 206, 258, 309],
    8: [0, 45, 90, 135, 180, 225, 270, 315],
    9: [0, 40, 80, 120, 160, 200, 240, 280, 320],
    10: [0, 36, 72, 108, 144, 180, 216, 252, 288, 324],
    11: [0, 33, 66, 99, 131, 164, 197, 230, 262, 295, 328],
    12: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
    13: [0, 28, 56, 84, 111, 139, 167, 194, 222, 250, 277, 305, 333],
    14: [0, 26, 52, 78, 103, 129, 155, 180, 206, 232, 258, 283, 309, 335],
    15: [0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336],
    16: [
      0, 23, 45, 68, 90, 113, 135, 158, 180, 203, 225, 248, 270, 293, 315, 338,
    ],
  };
  var vO8 = {
    1: ['4', 8, 'A1'],
    2: ['6', 10, 'A1'],
    3: ['2', 20, 'A1'],
    4: ['8', 12, 'A2'],
    5: ['12', 8, 'A1'],
    6: ['10', 10, 'A2'],
    7: ['12', 13, 'A1'],
    8: ['16', 3, 'A2'],
    9: ['0', 26, 'A2'],
    10: ['16', 10, 'A1'],
    11: ['10', 8, 'B1'],
    12: ['6', 12, 'B2'],
    13: ['12', 4, 'B1'],
    14: ['8', 14, 'B2'],
    15: ['8', 6, 'B1'],
    16: ['5', 10, 'B2'],
    17: ['6', 12, 'B1'],
    18: ['8', 14, 'B2'],
    19: ['0', 23, 'B1'],
    20: ['10', 13, 'B2'],
    21: ['4', 12, 'C1'],
    22: ['6', 10, 'C1'],
    23: ['8', 12, 'C1'],
    24: ['7', 14, 'C1'],
    25: ['2', 18, 'C1'],
    26: ['4', 18, 'C1'],
    27: ['0', 24, 'C1'],
    28: ['4', 10, 'C2'],
    29: ['6', 13, 'C2'],
    30: ['4', 20, 'C1'],
    31: ['6', 8, 'D1'],
    32: ['2', 12, 'D2'],
    33: ['3', 14, 'D2'],
    34: ['3', 18, 'D1'],
    35: ['8', 12, 'D1'],
    36: ['7', 15, 'D2'],
    37: ['16', 8, 'D2'],
    38: ['0', 23, 'D1'],
    39: ['12', 12, 'D1'],
    40: ['12', 15, 'D2'],
    41: ['5', 10, 'E1'],
    42: ['6', 12, 'E1'],
    43: ['3', 15, 'E1'],
    44: ['3', 19, 'E1'],
    45: ['0', 24, 'E1'],
    46: ['2', 15, 'E2'],
    47: ['4', 16, 'E2'],
    48: ['12', 8, 'E2'],
    49: ['3', 20, 'E2'],
    50: ['16', 14, 'E2'],
    51: ['4', 6, 'D3'],
    52: ['4', 12, 'D4'],
    53: ['6', 13, 'D3'],
    54: ['0', 24, 'D4'],
    55: ['4', 21, 'D3'],
    56: ['16', 16, 'A1'],
    57: ['4', 24, 'C1'],
    58: ['4', 26, 'D1'],
    59: ['4', 25, 'E2'],
    60: ['13', 19, 'E2'],
  };
  for (v22 in vO8) {
    f9(v22, vO8[v22][0], vO8[v22][1], vO8[v22][2]);
  }
  return vO5;
};
$AJB.general.Collide = function () {
  'use strict';

  var v24 = $AJB.lib.util();
  var vO9 = {
    check: function (p37, p38, p39) {
      var v25 = p37.childs();
      var v26 = v25.length;
      var v27 = Math.ceil(p38.rad() * 2);
      for (p39 = p39 || 1; v26--; ) {
        if (
          p38 !== v25[v26].ball &&
          v24.getPointDistance(p38.pos(), v25[v26].ball.pos()) <=
            v27 + Math.ceil(p39 * 2)
        ) {
          return true;
        }
      }
      return false;
    },
  };
  return vO9;
};
$AJB.general.Tween = function () {
  'use strict';

  var vO10 = {
    simple: function (p40, p41, p42, p43) {
      var v28 = (p41 - p40) / p43;
      var v29 = +new Date();
      if (p43 > v29 - p42) {
        vO10.isEnd = false;
        return p40 + (v29 - p42) * v28;
      } else {
        vO10.isEnd = true;
        return p41;
      }
    },
    isEnd: true,
  };
  return vO10;
};
$AJB.general.BallQueue = function () {
  'use strict';

  function f10(p44, p45, p46, p47, p48) {
    function f11() {
      var v30;
      var v31;
      var v_0x1b3870 = f12(p44);
      var v32 = v_0x1b3870.length;
      for (v30 = 0; v32 > v30; v30++) {
        v31 = v45(p47, null, v_0x1b3870[v30], null, p48);
        v31.pos(p45, p46 + v31.rad() * 3 * v30);
        vA2.push(v31);
      }
    }
    function f12(p49) {
      for (var vP49 = p49, vA = []; vP49--; ) {
        vA.push(vP49 + 1);
      }
      return vA;
    }
    var v33;
    var vA2 = [];
    var vA3 = [];
    var v_0x1b79f6 = v44();
    p48 = p48 || 1;
    v33 = {
      ballList: vA2,
      add: function () {},
      remove: function (p50) {
        var v34 = vA2[p50];
        vA2.splice(p50, 1);
        return v34;
      },
      clear: function () {
        vA3 = [];
        vA2 = [];
      },
      popup: function () {
        var v35 = vA2.shift();
        v35.st = +new Date();
        v35.sv = v35.pos().y;
        vA3.push(v35);
      },
      update: function () {
        var v36;
        var v37;
        var v38;
        var v39 = vA3.length;
        var v40 = vA2.length;
        if (v39) {
          v37 = vA3[0].rad();
          v36 = p46 - v37 * 3;
          while (v39--) {
            vA3[v39].pos(p45, v46.simple(vA3[v39].sv, v36, vA3[v39].st, 50));
            v38 = vA3[vA3.length - 1].pos().y;
            if (vA3[v39].pos().y === v36) {
              v_0x1b79f6.fire(vLSPopup, vA3[v39]);
              vA3.splice(v39, 1);
            }
          }
          while (v40--) {
            vA2[v40].pos(p45, v38 + v37 * 3 * (v40 + 1));
          }
        }
      },
      render: function () {
        for (var v41 = vA2.length, v42 = vA3.length; v41--; ) {
          vA2[v41].render();
        }
        while (v42--) {
          vA3[v42].render();
        }
      },
      on: function (p51, p52) {
        v_0x1b79f6.add(p51, p52);
      },
      off: function (p53, p54) {
        v_0x1b79f6.remove(p53, p54);
      },
      destroy: function () {
        for (var v43 = vA2.length; v43--; ) {
          vA2[v43].destroy();
        }
        v_0x1b79f6.destroy();
      },
    };
    f11();
    return v33;
  }
  var v44 = $AJB.lib.CustEvent();
  var v45 = $AJB.general.Ball();
  var v46 = $AJB.general.Tween();
  var vLSPopup = 'popup';
  return f10;
};
$AJB.general.Ball = function () {
  'use strict';

  function f13(p55, p56, p57, p58, p59) {
    function f14() {
      var v47 = v49.getTextWidth(p55, 0, 0, p57, p58);
      v49.drawText(p55, vLN07 - v47 / 2, vLN08 + p58 / 3, p57, p58, 'black');
    }
    var v48;
    var vLN07 = 0;
    var vLN08 = 0;
    p59 = p59 || 1;
    p56 = (p56 || 12) * p59;
    p58 = (p58 || 15) * p59;
    return (v48 = {
      pos: function (p60, p61) {
        if (typeof p60 != 'undefined') {
          vLN07 = p60;
        }
        if (typeof p61 != 'undefined') {
          vLN08 = p61;
        }
        return {
          x: vLN07,
          y: vLN08,
        };
      },
      scale: function (p62) {
        if (typeof p62 != 'undefined') {
          p59 = p62;
        }
        return p59;
      },
      rad: function (p63) {
        if (typeof p63 != 'undefined') {
          p56 = p63;
        }
        return p56;
      },
      render: function (p64) {
        v49.drawCircle(p55, vLN07, vLN08, p56, '#ffffff');
        if (typeof p57 != 'undefined') {
          f14(p57);
        } else if (typeof p64 != 'undefined') {
          f14(p64);
        }
      },
      destroy: function () {
        v48 = null;
      },
    });
  }
  var v49 = $AJB.lib.util();
  return f13;
};
$AJB.lib.util = function () {
  'use strict';

  return {
    drawCircle: function (p65, p66, p67, p68, p69) {
      p65.beginPath();
      p65.arc(p66, p67, p68, 0, Math.PI * 2, false);
      p65.fillStyle = p69 || 'red';
      p65.fill();
    },
    drawLine: function (p70, p71, p72, p73, p74, p75, p76) {
      p70.strokeStyle = p75 || 'red';
      p70.lineWidth = p76 || 1;
      p70.beginPath();
      p70.moveTo(p71, p72);
      p70.lineTo(p73, p74);
      p70.stroke();
    },
    drawText: function (p77, p78, p79, p80, p81, p82) {
      p77.font = p81 + 'px Verdana';
      p77.fillStyle = p82 || 'red';
      p77.fillText(p80, p78, p79);
    },
    getTextWidth: function (p83, p84, p85, p86, p87, p88) {
      p83.font = p87 + 'px Verdana';
      p83.fillStyle = p88 || 'red';
      return p83.measureText(p86).width;
    },
    getPointDistance: function (p89, p90) {
      return Math.floor(
        Math.sqrt(
          Math.floor(Math.pow(p89.x - p90.x, 2)) +
            Math.floor(Math.pow(p89.y - p90.y, 2))
        )
      );
    },
    isMobile: /(mobile|iphone|ipod|ipad|ios|android|windows phone)/i.test(
      navigator.userAgent
    ),
    isAndroid: /android/i.test(navigator.userAgent),
    isWeixin: /MicroMessenger/i.test(navigator.userAgent),
  };
};
$AJB.general.Core = function () {
  'use strict';

  function f15(p91, p92, p93, p94, p95) {
    function f16() {
      var v50;
      var v51;
      var v52;
      var v53;
      for (var v54 = vA4.length; v54--; ) {
        v50 =
          Math.cos(((vA4[v54].angle + v56.angle()) * Math.PI) / 180) *
            3 *
            vLN50 *
            p95 +
          v57;
        v51 =
          Math.sin(((vA4[v54].angle + v56.angle()) * Math.PI) / 180) *
            3 *
            vLN50 *
            p95 +
          v58;
        v52 = v50 / Math.abs(v50);
        v53 = v51 / Math.abs(v51);
        vA4[v54].ball.pos(v50, v51);
      }
    }
    var v55;
    var v56;
    var vLN09 = 0;
    var vA4 = [];
    var vLN50 = 50;
    var v57 = p91.width / 2;
    var v58 = vLN50 * 4 * p95;
    p95 = p95 || 1;
    v55 = v64(p92, vLN50, p93, p94, p95);
    v55.pos(v57, v58);
    return (v56 = {
      pos: v55.pos,
      scale: v55.scale,
      rad: v55.rad,
      angle: function (p96) {
        if (typeof p96 != 'undefined') {
          vLN09 = p96;
        }
        return vLN09;
      },
      addChild: function (p97, p98) {
        vA4.push({
          angle: p97,
          ball: p98,
        });
      },
      clear: function () {
        vA4 = [];
      },
      childs: function () {
        return vA4;
      },
      update: function () {
        f16();
      },
      render: function () {
        var v59;
        var v60 = vA4.length;
        var v61 = p91.width;
        var v62 = p91.height;
        p92.clearRect(0, 0, v61, v62);
        v59 = 0;
        for (; v60 > v59; v59++) {
          v63.drawLine(
            p92,
            v57,
            v58,
            vA4[v59].ball.pos().x,
            vA4[v59].ball.pos().y,
            '#ffffff',
            p95 * 1.5
          );
          vA4[v59].ball.render();
        }
        v55.render();
      },
      destroy: function () {
        v56.clear();
        v55 = null;
        v56 = null;
      },
    });
  }
  var v63 = $AJB.lib.util();
  var v64 = $AJB.general.Ball();
  return f15;
};
$AJB.lib.CustEvent = function () {
  return function (p99) {
    function f17(p100) {
      return Object.prototype.toString.call(p100).slice(8, -1).toLowerCase();
    }
    var vO11 = {};
    if (!p99) {
      p99 = {};
    }
    return {
      add: function (p101, p102) {
        if (f17(p102) === 'function') {
          var vVO11 = vO11;
          p101 = p101.toLowerCase();
          if (!vVO11[p101]) {
            vVO11[p101] = [];
          }
          vVO11[p101].push(p102);
        }
      },
      remove: function (p103, p104) {
        var v65;
        var v66 = vO11[p103];
        p103 = p103.toLowerCase();
        if (f17(p104) === 'function' && v66 && v66.length) {
          for (v65 = v66.length - 1; v65 >= 0; v65--) {
            if (v66[v65] === p104) {
              v66.splice(v65, 1);
            }
          }
        }
      },
      fire: function (p105) {
        var v67;
        var v68;
        var v69;
        var v70;
        p105 = p105.toLowerCase();
        v67 = vO11[p105];
        if (v67 && v67.length) {
          v68 = Array.prototype.slice.call(arguments, 1);
          v70 = v67.length;
          v69 = 0;
          for (; v70 > v69; v69++) {
            v67[v69].apply(p99, v68);
          }
        }
      },
      destroy: function () {
        var v71;
        var v72 = vO11.length - 1;
        for (v71 = v72; v71 >= 0; v71--) {
          evts.splice(v71, 1);
        }
      },
    };
  };
};
$AJB.general.Scene = function () {
  'use strict';

  function f18(p106, p107, p108, p109) {
    function f19(p110) {
      var v73 = p110.childs;
      var v74 = v73.length;
      v89 = p110.round();
      if (v87) {
        v87.destroy();
      }
      v87 = v94(p107, p108, vLN13, 50, p109);
      while (v74--) {
        v87.addChild(v73[v74], v95(p108, null, '', null, p109));
      }
      if (v88) {
        v88.destroy();
      }
      v88 = v96(
        p110.queueCount,
        p107.width / 2,
        v87.pos().y + v87.rad() * 4,
        p108,
        p109
      );
      v88.on('popup', function (p111) {
        v87.addChild(90 - v87.angle(), p111);
        if (v97.check(v87, p111, p109)) {
          v90 = p111;
          f24();
        } else if (!v88.ballList.length) {
          f23();
        }
      });
    }
    function f20() {
      if (v89) {
        v87.angle(v89());
        v87.update();
        v88.update();
      }
    }
    function f21() {
      var v75;
      var v76;
      var v77;
      var v78;
      var v79 = v87.childs();
      var v80 = v79.length;
      var vLN25 = 25;
      for (p106.style.backgroundColor = v85.bgColor; v80--; ) {
        v75 = v79[v80].angle + v87.angle();
        v76 = Math.cos((v75 * Math.PI) / 180) * vLN25;
        v77 = Math.sin((v75 * Math.PI) / 180) * vLN25;
        v78 = v79[v80].ball.pos();
        v79[v80].ball.pos(v78.x + v76, v78.y + v77);
      }
    }
    function f22(p112) {
      var v81;
      var vA5 = [25, 15, 20, 15];
      var v82 = vA5.length;
      var vLN200 = 200;
      var v83 = vLN200 / v82;
      v87.update();
      v81 = 1;
      for (; v82 >= v81; v81++) {
        if (p112 > v83 * v81) {
          v90.rad(vA5[v81 - 1] * p109);
        }
      }
    }
    function f23() {
      if (vLSRun !== 'pass') {
        p106.style.backgroundColor = '#1CB01A';
        vLSRun = 'pass';
        v86 = +new Date();
      }
    }
    function f24() {
      if (p108 !== 'fail') {
        p106.style.backgroundColor = '#B8111C';
        vLSRun = 'fail';
        v86 = +new Date();
      }
    }
    function f25() {
      var vLSToBeContinued = 'to be continued...';
      var v84 = v99.getTextWidth(p108, 0, 0, vLSToBeContinued, p109 * 30);
      v99.drawText(
        p108,
        (p107.width - v84) / 2,
        p109 * 200,
        vLSToBeContinued,
        p109 * 30,
        'yellow'
      );
    }
    var v85;
    var v86;
    var v87;
    var v88;
    var v89;
    var v90;
    var vLSRun = 'run';
    var vLN13 = 1;
    return (v85 = {
      enabled: false,
      run: function (p113) {
        var v91 = v98[p113];
        vLN13 = p113;
        if (v91) {
          v85.enabled = true;
          f19(v91);
          p106.style.backgroundColor = '#000';
          vLSRun = 'run';
        } else {
          f25();
        }
      },
      shot: function () {
        if (v88 && v88.ballList.length) {
          v88.popup();
        }
      },
      update: function () {
        var v92;
        if (v85.enabled) {
          if (vLSRun === 'run') {
            f20();
          } else if (vLSRun === 'pass') {
            f21();
            if (+new Date() - v86 > 1000) {
              vLSRun = '';
              vV93.fire(vLSPassed);
            }
          } else if (vLSRun === 'fail') {
            v92 = +new Date() - v86;
            f22(v92);
            if (v92 > 1000) {
              vLSRun = '';
              vV93.fire(vLSFailed);
            }
          }
        }
      },
      render: function () {
        if (v85.enabled) {
          v87.render();
          v88.render();
        }
      },
      on: function (p114, p115) {
        vV93.add(p114, p115);
      },
      off: function (p116, p117) {
        vV93.remove(p116, p117);
      },
    });
  }
  var v93 = $AJB.lib.CustEvent();
  var v94 = $AJB.general.Core();
  var v95 = $AJB.general.Ball();
  var v96 = $AJB.general.BallQueue();
  var v97 = $AJB.general.Collide();
  var v98 = $AJB.general.Levels();
  var v99 = $AJB.lib.util();
  var vLSPassed = 'passed';
  var vLSFailed = 'failed';
  var vV93 = v93();
  return f18;
};
$AJB.general.Game = function () {
  'use strict';

  function f26() {
    var v100 =
      document.body.scrollWidth || document.documentElement.scrollWidth;
    var v101 =
      document.body.scrollHeight || document.documentElement.scrollHeight;
    v116.width = v100;
    v116.height = v101;
    v107 = v110(v122, v100, v101);
    v117.style.backgroundColor = v107.color;
    v117.style.width = v100 + 'px';
    v117.style.height = v101 + 'px';
    v108 = v101 / 560;
  }
  function f27() {
    v119.href = vLSCoreBallLevellevelHt.replace(/#\{level\}/, v123);
  }
  function f28() {
    if (v114.isWeixin) {
      v112(v119, 'mousedown', function () {
        v121.style.display = '';
      });
    } else if (v114.isMobile) {
      f27();
    }
  }
  function f29(p118) {
    v123 = +p118;
    v113.setValue(vLSCoreballlevel, v123);
    document.title = vLSCoreBallLevellevel.replace(/\#\{level\}/, v123);
    GlobalLevel = v123;
    vV111.level(v123);
    if (!v114.isWeixin && v114.isMobile) {
      f27();
    }
  }
  function f30() {
    v112(document.body, 'mousedown', function (p119) {
      var v102;
      if (p119 && p119.changedTouches) {
        for (v102 = p119.changedTouches.length; v102--; ) {
          v106.shot();
        }
      } else {
        v106.shot();
      }
      if (p119.target.getAttribute('data-capture') != '1') {
        v115(p119);
      }
    });
    v112(v121, 'mousedown', function () {
      v121.style.display = 'none';
    });
    v112(v120, 'mousedown', function () {
      if (!v124) {
        v124 = true;
        v118.style.display = '';
        f29(1);
        setTimeout(function () {
          v118.style.display = 'none';
          v124 = false;
        }, 1000);
      }
    });
    v106.on('passed', function () {
      v107.switchStage(0, function () {
        v106.enabled = false;
        f29(v123 + 1);
        v116.style.display = 'none';
        vV111.show();
      });
    });
    v106.on('failed', function () {
      v107.switchStage(0, function () {
        v106.enabled = false;
        v116.style.display = 'none';
        vV111.level(v123);
        vV111.show();
      });
    });
    vV111.on('start', function () {
      v116.style.display = '';
      vV111.hide();
      v107.switchStage(1, function () {
        v106.run(v123);
      });
    });
  }
  function f31() {
    window.clearTimeout(vLN010);
    v106.update();
    v106.render();
    v107.update();
    v107.render();
    vLN010 = window.setTimeout(f31, 1000 / vLN60);
  }
  function f32() {
    f26();
    v106 = v109(document.body, v116, v122, v108);
    f30();
    f28();
    vV111.level(v123);
    vV111.show();
    f31();
  }
  var v106;
  var v107;
  var v108;
  var v109 = $AJB.general.Scene();
  var v110 = $AJB.general.Switcher();
  var v111 = $AJB.general.BeginStage();
  var v112 = $AJB.lib.addEvent();
  var v113 = $AJB.lib.Storage();
  var v114 = $AJB.lib.util();
  var v115 = $AJB.lib.stopEvent();
  var v116 = document.getElementById('stage');
  var v117 = document.getElementById('begin');
  var v118 = document.getElementById('tip');
  var v119 = document.getElementById('btnFW');
  var v120 = document.getElementById('btnReset');
  var v121 = document.getElementById('wxArrow');
  var v122 = v116.getContext('2d');
  var vLN60 = 60;
  var vLSCoreballlevel = 'core-ball-level';
  var vLSCoreBallLevellevel = 'Core Ball，Level #{level}';
  var vLSCoreBallLevellevelHt = 'Core Ball，Level #{level}';
  var vV111 = v111(v117);
  var v123 = +v113.getValue(vLSCoreballlevel) || 1;
  var v124 = false;
  var vLN010 = 0;
  var vO12 = {
    start: f32,
    shareTitle: vLSCoreBallLevellevel,
    shareLevel: v123,
  };
  return vO12;
};
$AJB.page.index = function () {
  'use strict';

  var v125 = $AJB.general.Game();
  v125.start();
};
$AJB.page.index();
GlobalLevel = $AJB.general.Game().shareLevel;
var vO13 = {
  x: function () {
    if (typeof XMLHttpRequest !== 'undefined') {
      return new XMLHttpRequest();
    }
    var vA6 = [
      'MSXML2.XmlHttp.5.0',
      'MSXML2.XmlHttp.4.0',
      'MSXML2.XmlHttp.3.0',
      'MSXML2.XmlHttp.2.0',
      'Microsoft.XmlHttp',
    ];
    var v126;
    for (var vLN011 = 0; vLN011 < vA6.length; vLN011++) {
      try {
        v126 = new ActiveXObject(vA6[vLN011]);
        break;
      } catch (e) {}
    }
    return v126;
  },
};
vO13.send = function (p133, p134, p135, p136, p137) {
  var v127 = vO13.x();
  v127.open(p135, p133, p137);
  v127.onreadystatechange = function () {
    if (v127.readyState == 4) {
      p134(v127.responseText);
    }
  };
  if (p135 == 'POST') {
    v127.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  }
  v127.send(p136);
};
vO13.get = function (p138, p139, p140, p141) {
  var vA7 = [];
  for (var v128 in p139) {
    vA7.push(encodeURIComponent(v128) + '=' + encodeURIComponent(p139[v128]));
  }
  vO13.send(p138 + '?' + vA7.join('&'), p140, 'GET', null, p141);
};
vO13.post = function (p142, p143, p144, p145) {
  var vA8 = [];
  for (var v129 in p143) {
    vA8.push(encodeURIComponent(v129) + '=' + encodeURIComponent(p143[v129]));
  }
  vO13.send(p142, p144, 'POST', vA8.join('&'), p145);
};
