/* Simulação do Sincrô sincronizando um casamento. Classes com prefixo sx- para não colidir com a página. */
(function () {
  var CAM = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"><rect x="2.5" y="6" width="13" height="12" rx="2"/><path d="M15.5 10.5l6-3.5v10l-6-3.5z"/></svg>';
  var MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><rect x="8.5" y="2.5" width="7" height="12" rx="3.5"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3.5"/></svg>';
  var FOLDER = '<svg viewBox="0 0 24 24"><path d="M2 6a2 2 0 0 1 2-2h6l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" fill="#6EA8FE" stroke="#2b5bb5" stroke-width="1.4"/></svg>';
  var LOGO = '<svg viewBox="0 0 120 120"><rect x="4" y="4" width="112" height="112" rx="30" fill="#FBF7EF" stroke="#17161A" stroke-width="7"/><path d="M16 42h10l4-9 5 18 5-14 4 10 4-5h56" fill="none" stroke="#2F5FE0" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 62h10l4-9 5 18 5-14 4 10 4-5h56" fill="none" stroke="#17161A" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 82h10l4-9 5 18 5-14 4 10 4-5h56" fill="none" stroke="#E2452F" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><line x1="35" y1="16" x2="35" y2="104" stroke="#17161A" stroke-width="4" stroke-dasharray="5 5"/></svg>';
  var DEV = [
    { id: "a", name: "Câmera fixa", c: "#2F5FE0", l: "#D3DDFA", ic: CAM, clips: [[2, 30], [33, 26], [61, 30]] },
    { id: "b", name: "Câmera 2", c: "#E2452F", l: "#F8CFC7", ic: CAM, clips: [[6, 7], [15, 5], [24, 9], [40, 6], [50, 8], [66, 7], [78, 6]] },
    { id: "c", name: "Câmera 3", c: "#F2B33D", l: "#FCE6B6", ic: CAM, clips: [[9, 6], [19, 8], [35, 7], [46, 5], [58, 9], [72, 8], [84, 5]] },
    { id: "d", name: "Gravador", c: "#2E9E5B", l: "#C9EBD6", ic: MIC, clips: [[0, 92]] }
  ];

  var css = '<style>' +
    '.sx{position:absolute;inset:0;background:#F1EADD;color:#17161A;font:13px Inter,system-ui,sans-serif}' +
    '.sx-top{height:28px;background:#e7e1d5;border-bottom:1px solid #cfc6b5;display:flex;align-items:center;gap:7px;padding:0 12px;font-size:12px;color:#5A554E}' +
    '.sx-top i{width:11px;height:11px;border-radius:50%;background:#e2584d;display:inline-block}.sx-top i+i{background:#e7b33d}.sx-top i+i+i{background:#4fbf5d}' +
    '.sx-top b{margin-left:8px;color:#17161A}' +
    '.sx-hd{position:absolute;left:18px;top:40px;display:flex;align-items:center;gap:10px}' +
    '.sx-hd svg{width:40px;height:40px;filter:drop-shadow(3px 3px 0 #17161A)}' +
    '.sx-hd b{font:800 26px "Bricolage Grotesque",system-ui;letter-spacing:-.04em}.sx-hd b span{color:#E2452F}' +
    '.sx-card{position:absolute;background:#FBF7EF;border:2.5px solid #17161A;border-radius:14px;box-shadow:4px 4px 0 #17161A}' +
    '#sx-left{left:18px;top:94px;width:268px;height:428px;padding:12px}' +
    '.sx-h{font:800 14px "Bricolage Grotesque",system-ui;display:flex;align-items:center;gap:7px;margin-bottom:9px}' +
    '.sx-h i{font-style:normal;width:22px;height:22px;border-radius:7px;border:2px solid #17161A;background:#F2B33D;display:grid;place-items:center;font-size:11px;transform:rotate(-6deg)}' +
    '.sx-drop{border:2.5px dashed #17161A;border-radius:11px;height:66px;display:grid;place-items:center;text-align:center;font-weight:700;font-size:12px;color:#5A554E;transition:.25s}' +
    '.sx-drop.hot{background:#DCE5FF;border-style:solid;color:#17161A}' +
    '.sx-dev{display:flex;align-items:center;gap:8px;background:#fff;border:2.5px solid #17161A;border-radius:11px;padding:6px 8px;margin-top:8px;height:0;opacity:0;overflow:hidden;padding-block:0;transition:height .35s,opacity .35s,padding .35s;box-shadow:3px 3px 0 var(--c)}' +
    '.sx-dev.in{height:44px;opacity:1;padding-block:6px}' +
    '.sx-dev .ic{width:28px;height:28px;border-radius:8px;border:2px solid #17161A;background:var(--c);display:grid;place-items:center;flex:none;transform:rotate(-4deg)}.sx-dev .ic svg{width:17px;height:17px}' +
    '.sx-dev b{font-size:13px;flex:1}.sx-dev small{font-size:11px;color:#5A554E}' +
    '.sx-star{border:2px solid #17161A;border-radius:99px;font-size:10.5px;font-weight:800;padding:0 7px;background:#F1EADD;transition:.3s}' +
    '.sx-star.on{background:#F2B33D;transform:rotate(-4deg)}' +
    '.sx-go{position:absolute;left:12px;right:12px;bottom:12px;height:46px;border:2.5px solid #17161A;border-radius:13px;background:#E2452F;color:#fff;font:800 17px Inter,system-ui;display:grid;place-items:center;box-shadow:4px 4px 0 #17161A;transition:.15s}' +
    '.sx-go.press{transform:translate(4px,4px);box-shadow:0 0 0 #17161A}' +
    '#sx-right{left:302px;top:94px;width:640px;height:428px;padding:12px;overflow:hidden}' +
    '.sx-ph{display:flex;align-items:center;gap:9px;font-weight:800;font-size:13.5px;height:24px}' +
    '.sx-ph .dot{width:11px;height:11px;border-radius:50%;background:#E2452F;border:2px solid #17161A;animation:sxbob 1s infinite}' +
    '@keyframes sxbob{50%{transform:translateY(-3px)}}' +
    '.sx-bar{flex:1;height:13px;border:2px solid #17161A;border-radius:99px;background:#fff;overflow:hidden}.sx-bar i{display:block;height:100%;width:0;background:repeating-linear-gradient(-45deg,#2F5FE0 0 8px,#4F7BF0 8px 16px);transition:width .5s}' +
    '.sx-tl{position:absolute;left:12px;right:12px;top:48px;bottom:58px;border:2.5px solid #17161A;border-radius:12px;background:#fff;overflow:hidden}' +
    '.sx-ln{position:absolute;left:0;right:0;height:62px;border-bottom:1.5px solid #D8CEBC}' +
    '.sx-nm{position:absolute;left:0;top:0;bottom:0;width:96px;background:#FBF7EF;border-right:2px solid #17161A;display:flex;align-items:center;gap:6px;padding:0 7px;font-weight:800;font-size:11px;z-index:3}' +
    '.sx-nm i{width:8px;height:24px;border-radius:4px;border:2px solid #17161A;background:var(--c)}' +
    '.sx-pile{position:absolute;left:96px;top:0;bottom:0;width:92px;background:repeating-linear-gradient(45deg,#0000 0 8px,#17161A0a 8px 16px);border-right:2px dashed #D8CEBC;transition:opacity .5s}' +
    '.sx-c{position:absolute;left:0;top:14px;height:32px;border:2px solid #17161A;border-radius:7px;background:var(--l);transition:transform .9s cubic-bezier(.34,1.56,.64,1),width .9s cubic-bezier(.34,1.56,.64,1),box-shadow .3s;opacity:0}' +
    '.sx-c.in{opacity:1}' +
    '.sx-c::before{content:"";position:absolute;left:4px;top:10px;width:7px;height:7px;border-radius:50%;border:1.5px solid #17161A;background:#2E9E5B;opacity:0;transition:.3s}' +
    '.sx-c.ok::before{opacity:1}' +
    '.sx-c.act{box-shadow:0 0 0 3px #2F5FE0}' +
    '.sx-c.wob{animation:sxwob 1.4s ease-in-out infinite}@keyframes sxwob{50%{margin-top:-3px}}' +
    '.sx-scan{position:absolute;top:0;bottom:0;width:0;border-left:3px dashed #E2452F;z-index:4;left:190px;opacity:0}' +
    '.sx-scan.in{opacity:1;animation:sxscan 1.6s linear infinite}@keyframes sxscan{from{left:190px}to{left:100%}}' +
    '.sx-head{position:absolute;top:0;bottom:0;width:0;border-left:3px solid #E2452F;z-index:5;left:96px;opacity:0}' +
    '.sx-head.in{opacity:1}' +
    '.sx-head::before{content:"";position:absolute;left:-8px;top:0;border:7px solid transparent;border-top:10px solid #E2452F}' +
    '.sx-tools{position:absolute;left:12px;right:12px;bottom:10px;height:40px;display:flex;align-items:center;gap:10px;opacity:0;transition:.4s}' +
    '.sx-tools.in{opacity:1}' +
    '.sx-play{width:38px;height:38px;border-radius:50%;border:2.5px solid #17161A;background:#E2452F;color:#fff;display:grid;place-items:center;box-shadow:3px 3px 0 #17161A}.sx-play svg{width:16px;height:16px}' +
    '.sx-time{font:700 15px "IBM Plex Mono",Menlo,monospace;min-width:92px}' +
    '.sx-pill{border:2px solid #17161A;border-radius:99px;padding:3px 11px;font-size:12px;font-weight:700;background:#fff;transition:.3s}.sx-pill.on{background:#DCE5FF}' +
    '.sx-exp{margin-left:auto;border:2.5px solid #17161A;border-radius:11px;background:#2F5FE0;color:#fff;font-weight:800;font-size:12.5px;padding:7px 12px;box-shadow:3px 3px 0 #17161A}' +
    '.sx-ms{position:absolute;right:6px;top:19px;display:flex;gap:3px;opacity:0;transition:.3s}.sx-tools.in~.sx-tl .sx-ms{opacity:1}' +
    '.sx-ms b{width:19px;height:19px;border:1.5px solid #17161A;border-radius:5px;font-size:9.5px;display:grid;place-items:center;background:#fff}.sx-ms b.on{background:#F2B33D}' +
    '.sx-toast{position:absolute;left:50%;bottom:22px;transform:translate(-50%,120%);background:#17161A;color:#F1EADD;border-radius:13px;padding:10px 18px;font-weight:800;font-size:14px;box-shadow:4px 4px 0 #E2452F;opacity:0;transition:.5s cubic-bezier(.34,1.56,.64,1);white-space:nowrap;z-index:9}' +
    '.sx-toast.in{opacity:1;transform:translate(-50%,0)}' +
    '#sx-pr{position:absolute;left:150px;top:120px;width:660px;height:300px;background:#1d1d1d;border:1px solid #000;border-radius:10px;box-shadow:0 20px 50px rgba(0,0,0,.5);color:#ccc;font-size:11px;opacity:0;transform:translateY(16px) scale(.97);transition:.4s;overflow:hidden;z-index:8}' +
    '#sx-pr.in{opacity:1;transform:none}' +
    '.sx-prt{height:24px;background:#2b2b2b;display:flex;align-items:center;padding:0 10px;color:#9a9a9a}.sx-prt b{color:#eee;margin-right:8px}' +
    '.sx-trk{height:30px;border-bottom:1px solid #111;position:relative;margin-left:44px}.sx-trk em{position:absolute;left:-44px;width:40px;top:0;bottom:0;display:grid;place-items:center;font-style:normal;color:#999;background:#262626}' +
    '.sx-pc{position:absolute;top:4px;height:22px;border-radius:3px;opacity:.95}' +
    '</style>';

  function lanes() {
    var h = '';
    DEV.forEach(function (d, k) {
      h += '<div class="sx-ln" style="top:' + (k * 62) + 'px;--c:' + d.c + '"><div class="sx-nm"><i></i>' + d.name +
        '<span class="sx-ms"><b>M</b><b class="' + (k === 0 ? '' : '') + '">S</b></span></div></div>';
    });
    return h;
  }
  function clips() {
    var h = '';
    DEV.forEach(function (d, k) {
      d.clips.forEach(function (c, j) {
        h += '<div class="sx-c" id="sx-' + d.id + j + '" style="--l:' + d.l + ';top:' + (k * 62 + 14) + 'px"></div>';
      });
    });
    return h;
  }
  var trk = function (cls, items) {
    return '<div class="sx-trk"><em>' + cls + '</em>' + items.map(function (i) {
      return '<div class="sx-pc" style="left:' + i[0] + '%;width:' + i[1] + '%;background:' + i[2] + '"></div>';
    }).join('') + '</div>';
  };
  var html = css +
    '<div class="sx">' +
      '<div class="sx-top"><i></i><i></i><i></i><b>Sincrô</b></div>' +
      '<div class="sx-hd">' + LOGO + '<b>Sincr<span>ô</span></b></div>' +
      '<div class="sx-card" id="sx-left"><div class="sx-h"><i>1</i>Quem gravou?</div>' +
        '<div class="sx-drop" id="sx-drop">Solte aqui as pastas<br>das câmeras e do gravador</div>' +
        DEV.map(function (d) {
          return '<div class="sx-dev" id="sx-d' + d.id + '" style="--c:' + d.c + '"><span class="ic">' + d.ic + '</span><b>' + d.name +
            '<br><small>' + (d.id === 'd' ? '1 arquivo' : d.clips.length + ' arquivos') + '</small></b>' +
            (d.id === 'a' ? '<span class="sx-star" id="sx-star">☆ referência</span>' : '') + '</div>';
        }).join('') +
        '<div class="sx-go" id="sx-go">Sincronizar</div></div>' +
      '<div class="sx-card" id="sx-right"><div class="sx-ph"><span class="dot"></span><span id="sx-pt">Esperando as pastas</span><span class="sx-bar"><i id="sx-bi"></i></span></div>' +
        '<div class="sx-tools" id="sx-tools"><span class="sx-play" id="sx-play"><svg viewBox="0 0 24 24" fill="#fff"><path d="M7 4.5v15l13-7.5z"/></svg></span><span class="sx-time" id="sx-time">0:00.000</span>' +
          '<span class="sx-pill" id="sx-split">Separar no fone (E/D)</span><span class="sx-exp" id="sx-exp">Exportar XML para Premiere</span></div>' +
        '<div class="sx-tl" id="sx-tl">' + lanes() + '<div class="sx-pile" id="sx-pile"></div>' + clips() +
          '<div class="sx-scan" id="sx-scan"></div><div class="sx-head" id="sx-head"></div></div>' +
      '</div>' +
      '<div id="sx-pr"><div class="sx-prt"><b>Premiere Pro</b> Sequência · Sincronizado</div>' +
        trk('V3', [[3, 8, '#5fbf8f'], [16, 5, '#5fbf8f'], [27, 10, '#5fbf8f'], [44, 7, '#5fbf8f'], [56, 8, '#e8b26a'], [72, 7, '#5fbf8f']]) +
        trk('V2', [[8, 7, '#5fbf8f'], [20, 6, '#5fbf8f'], [38, 9, '#5fbf8f'], [60, 8, '#5fbf8f'], [80, 6, '#5fbf8f']]) +
        trk('V1', [[2, 31, '#5fbf8f'], [35, 28, '#5fbf8f'], [65, 32, '#5fbf8f']]) +
        trk('A1', [[2, 31, '#5fbf8f'], [35, 28, '#5fbf8f'], [65, 32, '#5fbf8f']]) +
        trk('A2', [[3, 8, '#5fbf8f'], [16, 5, '#5fbf8f'], [27, 10, '#5fbf8f'], [44, 7, '#5fbf8f'], [56, 8, '#e8b26a'], [72, 7, '#5fbf8f']]) +
        trk('A3', [[8, 7, '#5fbf8f'], [20, 6, '#5fbf8f'], [38, 9, '#5fbf8f'], [60, 8, '#5fbf8f'], [80, 6, '#5fbf8f']]) +
        trk('A4', [[0, 98, '#4fb3c4']]) +
      '</div>' +
      '<div class="sx-toast" id="sx-toast"></div>' +
    '</div>';

  var TW = 640 - 24 - 96 - 8; // largura útil da timeline
  function px(p) { return 96 + 4 + p / 100 * TW; }
  function pile(a) {
    a.$("#sx-pile").style.opacity = 1;
    DEV.forEach(function (d, k) {
      d.clips.forEach(function (c, j) {
        var el = a.$("#sx-" + d.id + j), r = (Math.sin(k * 7 + j * 3) * 8).toFixed(1);
        el.style.transitionDelay = "0s";
        el.style.width = "44px";
        el.style.transform = "translateX(" + (104 + (j % 4) * 10) + "px) rotate(" + r + "deg)";
        el.classList.remove("ok", "act"); el.classList.add("in", "wob");
      });
    });
  }
  function place(a, d, j) {
    var el = a.$("#sx-" + d.id + j), c = d.clips[j];
    el.classList.remove("wob", "act");
    el.style.width = (c[1] / 100 * TW) + "px";
    el.style.transform = "translateX(" + px(c[0]) + "px) rotate(0deg)";
    el.classList.add("ok");
  }
  function toast(a, t, ms) { var e = a.$("#sx-toast"); e.textContent = t; e.classList.add("in"); return a.wait(ms || 1800).then(function () { e.classList.remove("in"); }); }
  function reset(a) {
    DEV.forEach(function (d) { a.hide("#sx-d" + d.id); d.clips.forEach(function (c, j) { var e = a.$("#sx-" + d.id + j); e.className = "sx-c"; }); });
    a.$("#sx-star").className = "sx-star"; a.$("#sx-star").textContent = "☆ referência";
    a.hide("#sx-tools"); a.hide("#sx-head"); a.hide("#sx-scan"); a.hide("#sx-pr");
    a.$("#sx-pt").textContent = "Esperando as pastas"; a.$("#sx-bi").style.width = "0";
  }

  window.SIM = {
    title: "Sincrô · sincronizando um casamento",
    html: html,
    steps: [
      {
        label: "Solte as pastas", caption: "Arraste as pastas de cada câmera e do gravador (ou a pasta do evento inteira). Cada aparelho vira um cartão.",
        run: function (a) {
          reset(a);
          return a.drag("#sx-drop", "#sx-drop", '<div style="display:flex;align-items:center;gap:6px;background:#fff;border:2px solid #17161A;border-radius:8px;padding:4px 8px;font-weight:700;font-size:12px"><span style="width:18px;height:18px;display:block">' + FOLDER + '</span>CASAMENTO</div>')
            .then(function () {
              a.$("#sx-drop").classList.add("hot");
              return a.wait(300);
            }).then(function () {
              a.$("#sx-drop").classList.remove("hot");
              var p = Promise.resolve();
              DEV.forEach(function (d) { p = p.then(function () { a.show("#sx-d" + d.id); return a.wait(260); }); });
              return p;
            }).then(function () { a.$("#sx-pt").textContent = "4 aparelhos, 18 arquivos"; return a.wait(600); });
        }
      },
      {
        label: "Marque a câmera fixa", caption: "A câmera fixa, que grava quase tudo, vira a referência do sincronismo.",
        run: function (a) {
          return a.click("#sx-star").then(function () {
            var s = a.$("#sx-star"); s.classList.add("on"); s.textContent = "★ referência";
            return a.wait(900);
          });
        }
      },
      {
        label: "Sincronizar", caption: "O Sincrô ouve cada clipe, procura o mesmo som nos outros aparelhos e as peças voam para o lugar.",
        run: function (a) {
          return a.click("#sx-go").then(function () {
            a.$("#sx-go").classList.add("press");
            return a.wait(150);
          }).then(function () {
            a.$("#sx-go").classList.remove("press");
            pile(a);
            a.$("#sx-pt").textContent = "Ouvindo cada clipe"; a.$("#sx-bi").style.width = "30%";
            return a.wait(900);
          }).then(function () {
            a.show("#sx-scan"); a.$("#sx-pt").textContent = "Procurando o mesmo som"; a.$("#sx-bi").style.width = "62%";
            return a.wait(1500);
          }).then(function () {
            a.hide("#sx-scan"); a.$("#sx-pt").textContent = "Encaixando as peças"; a.$("#sx-bi").style.width = "88%";
            var order = [], p = Promise.resolve();
            DEV.forEach(function (d) { d.clips.forEach(function (c, j) { order.push([d, j]); }); });
            order.sort(function (x, y) { return (x[0].id === "d" || x[0].id === "a" ? 0 : 1) - (y[0].id === "d" || y[0].id === "a" ? 0 : 1); });
            order.forEach(function (o) { p = p.then(function () { a.$("#sx-" + o[0].id + o[1]).classList.add("act"); place(a, o[0], o[1]); return a.wait(170); }); });
            return p;
          }).then(function () {
            a.$("#sx-pile").style.opacity = 0; a.$("#sx-bi").style.width = "100%"; a.$("#sx-pt").textContent = "Prontinho!";
            return toast(a, "🎉 18 clipes encaixados pelo som", 1700);
          });
        }
      },
      {
        label: "Ouça como ficou", caption: "Toque a timeline, silencie (M) ou isole (S) trilhas e separe cada uma num lado do fone para conferir o sync.",
        run: function (a) {
          a.show("#sx-tools");
          return a.click("#sx-play").then(function () {
            a.show("#sx-head"); var h = a.$("#sx-head"), t = 0;
            h.style.transition = "left 3.2s linear"; h.style.left = "96px"; h.offsetWidth; h.style.left = (96 + TW * .45) + "px";
            var tm = a.$("#sx-time"), start = Date.now();
            var iv = setInterval(function () { var s = 1712 + (Date.now() - start) / 1000 * 9; tm.textContent = Math.floor(s / 60) + ":" + (s % 60).toFixed(3).padStart(6, "0"); }, 60);
            return a.wait(1400).then(function () { return a.click("#sx-split"); }).then(function () {
              a.$("#sx-split").classList.add("on"); return a.wait(1900);
            }).then(function () { clearInterval(iv); });
          });
        }
      },
      {
        label: "Mande pro editor", caption: "Exporte para o Premiere (XML) ou DaVinci (FCPXML). Cada câmera numa trilha, áudio estéreo, e o projeto .sincro salvo junto.",
        run: function (a) {
          return a.click("#sx-exp").then(function () {
            return toast(a, "✅ XML e projeto .sincro salvos", 1300);
          }).then(function () { a.show("#sx-pr"); return a.wait(2600); });
        }
      }
    ]
  };
})();
