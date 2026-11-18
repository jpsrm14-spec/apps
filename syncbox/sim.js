/* Simulação do Sync Box dentro do Premiere. */
(function () {
  var NOTE = '<svg viewBox="0 0 24 24"><path d="M11 18V4q6 1 7 6" fill="none" stroke="#E2452F" stroke-width="2.8" stroke-linecap="round"/><ellipse cx="8" cy="18" rx="4" ry="3" fill="#E2452F"/></svg>';
  var PLAYI = '<svg viewBox="0 0 24 24"><path d="M7 5l12 7-12 7z" fill="#E2452F" stroke="#E2452F" stroke-width="2.5" stroke-linejoin="round"/></svg>';
  var WAVE = '<svg viewBox="0 0 24 24"><path d="M2 12l4-5 4 11 4-11 4 11 4-6" fill="none" stroke="#E2452F" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var FOLDER = '<svg viewBox="0 0 24 24"><path d="M2 6a2 2 0 0 1 2-2h6l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" fill="#6EA8FE" stroke="#2b5bb5" stroke-width="1.4"/></svg>';
  var BIN = '<svg viewBox="0 0 16 16"><path d="M1 4a1 1 0 0 1 1-1h4l1.5 1.5H14a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z" fill="#b9b9b9"/></svg>';
  var CLIPV = '<i class="pv" style="background:#7b9be8"></i>', CLIPA = '<i class="pv" style="background:#5fbf8f"></i>';
  var LOGO = '<svg viewBox="20 20 216 216"><rect x="26" y="26" width="204" height="204" rx="52" fill="#F1EADD" stroke="#17161A" stroke-width="9"/><rect x="73" y="51" width="124" height="162" rx="16" fill="#17161A"/><rect x="66" y="44" width="124" height="162" rx="16" fill="#2F5FE0" stroke="#17161A" stroke-width="9"/><g stroke="#17161A" stroke-width="7" fill="#F1EADD"><rect x="80" y="58" width="96" height="40" rx="9"/><rect x="80" y="106" width="96" height="40" rx="9"/><rect x="80" y="154" width="96" height="40" rx="9"/></g><path d="M104 88V68q10 1 13 10" fill="none" stroke="#E2452F" stroke-width="6" stroke-linecap="round"/><ellipse cx="99" cy="88" rx="7" ry="5.5" fill="#E2452F"/><path d="M95 116l15 10-15 10z" fill="#E2452F"/><path d="M92 174l6-8 6 16 6-16 6 8" fill="none" stroke="#E2452F" stroke-width="6" stroke-linecap="round"/></svg>';

  var css = '<style>' +
    '.pr{position:absolute;inset:0;background:#1d1d1d;color:#d6d6d6;font-size:12px}' +
    '.pr-top{height:26px;background:#2b2b2b;border-bottom:1px solid #111;display:flex;align-items:center;padding:0 12px;gap:10px;color:#9a9a9a;font-size:11.5px}' +
    '.pr-top b{color:#e6e6e6;font-weight:600}' +
    '.pnl{position:absolute;background:#232323;border:1px solid #111;border-radius:4px;overflow:hidden}' +
    '.pnl h4{margin:0;font-size:11px;font-weight:600;color:#cfcfcf;padding:6px 10px;border-bottom:1px solid #111;background:#262626}' +
    '.pnl h4 span{color:#4da3ff;border-bottom:2px solid #4da3ff;padding-bottom:4px}' +
    '#pj{left:6px;top:32px;width:262px;height:502px}' +
    '#mon{left:274px;top:32px;width:352px;height:236px}' +
    '#tl{left:274px;top:274px;width:352px;height:260px}' +
    '.mon-img{position:absolute;left:12px;right:12px;top:34px;bottom:30px;border-radius:2px;background:linear-gradient(160deg,#f3c79a 0%,#d68a6a 35%,#7a5a8a 70%,#2d2a4a 100%)}' +
    '.mon-img::after{content:"";position:absolute;left:38%;top:30%;width:24%;height:70%;border-radius:40% 40% 0 0;background:rgba(30,20,30,.55)}' +
    '.mon-tc{position:absolute;bottom:8px;left:12px;color:#4da3ff;font:600 11px Menlo,monospace}' +
    '.ptree{padding:6px 0}' +
    '.it{display:flex;align-items:center;gap:7px;height:0;opacity:0;overflow:hidden;padding:0 10px;white-space:nowrap;transition:height .35s,opacity .35s,background .3s}' +
    '.it.in{height:24px;opacity:1}' +
    '.it svg{width:14px;height:14px;flex:none}' +
    '.it .pv{width:16px;height:11px;border-radius:2px;flex:none;display:block}' +
    '.it.l1{padding-left:26px}.it.l2{padding-left:44px}' +
    '.it.hl{background:#2f4f86;color:#fff}' +
    '.it small{margin-left:auto;color:#777;font-size:10.5px}' +
    '.trk{display:flex;align-items:center;height:30px;border-bottom:1px solid #161616;position:relative}' +
    '.trk b{width:34px;text-align:center;font-size:10.5px;color:#9a9a9a;font-weight:600;background:#262626;height:100%;display:grid;place-items:center;border-right:1px solid #111}' +
    '.ruler{height:22px;border-bottom:1px solid #111;background:repeating-linear-gradient(90deg,#3a3a3a 0 1px,transparent 1px 22px);margin-left:34px}' +
    '.clip{position:absolute;top:4px;height:22px;border-radius:3px;font-size:10px;color:#111;padding:3px 6px;white-space:nowrap;overflow:hidden;font-weight:600;opacity:0;transform:scaleX(.2);transform-origin:left;transition:.4s}' +
    '.clip.in{opacity:1;transform:none}' +
    '.clip.v{background:#8fa8ec}.clip.a{background:#6fcf9b}.clip.s{background:#e8b26a}' +
    '.head{position:absolute;top:22px;bottom:0;left:190px;width:2px;background:#4da3ff}' +
    /* painel Sync Box */
    '#sb{position:absolute;right:6px;top:32px;width:322px;height:502px;background:#F1EADD;border:1px solid #111;border-radius:4px;padding:10px;color:#17161A;display:flex;flex-direction:column;gap:9px;overflow:hidden}' +
    '.sbh{display:flex;align-items:center;gap:8px}.sbh svg{width:30px;height:30px}.sbh b{font:800 18px "Avenir Next",system-ui;letter-spacing:-.02em}' +
    '.sbh small{margin-left:auto;font-size:10px;color:#5A554E;text-align:right;line-height:1.15}' +
    '.sbc{background:#fff;border:2px solid #17161A;border-radius:11px;box-shadow:3px 3px 0 #17161A;padding:8px 10px}' +
    '.sbc.blue{box-shadow:4px 4px 0 #2F5FE0}.sbc.red{box-shadow:4px 4px 0 #E2452F}' +
    '.st{display:flex;align-items:center;gap:7px;font:700 14px "Avenir Next",system-ui}' +
    '.dt{width:10px;height:10px;border-radius:50%;border:2px solid #17161A;background:#2E9E5B}.dt.busy{background:#2F5FE0;animation:sbp .6s infinite}' +
    '@keyframes sbp{50%{transform:scale(.7)}}' +
    '.tg{margin-left:auto;width:36px;height:20px;border-radius:99px;border:2px solid #17161A;background:#D8CEBC;position:relative;transition:.2s}' +
    '.tg::after{content:"";position:absolute;top:2px;left:2px;width:12px;height:12px;border-radius:50%;background:#fff;border:2px solid #17161A;transition:.2s}' +
    '.tg.on{background:#2F5FE0}.tg.on::after{left:18px}' +
    '.drw{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:7px}' +
    '.drw div{border:2px solid #17161A;border-radius:8px;background:#FBF7EF;text-align:center;padding:3px 0 2px;font-size:9px;font-weight:700;color:#5A554E;letter-spacing:.04em}' +
    '.drw svg{width:15px;height:15px;display:block;margin:0 auto}.drw b{display:block;font:800 15px "Avenir Next",system-ui;color:#17161A;line-height:1.1}' +
    '.drw b.pop{animation:sbpop .5s}@keyframes sbpop{40%{transform:scale(1.5);color:#E2452F}}' +
    '.vb{margin-top:7px;border:2px solid #17161A;border-radius:8px;background:#FBF7EF;box-shadow:2px 2px 0 #17161A;text-align:center;font-weight:700;font-size:12px;padding:4px}' +
    '.sde-h{display:flex;align-items:center;gap:7px;font:800 13px "Avenir Next",system-ui}' +
    '.sde-h small{display:block;font:500 10px system-ui;color:#5A554E}' +
    '.sde-b{display:none;margin-top:6px;gap:5px;flex-wrap:wrap}.sde-b.in{display:flex}' +
    '.pp{display:inline-flex;align-items:center;gap:4px;border:2px solid #17161A;border-radius:99px;padding:1px 8px 1px 2px;font-size:11px;font-weight:600;background:#FBF7EF}' +
    '.pp i{width:15px;height:15px;border-radius:50%;border:1.5px solid #17161A;color:#fff;font:800 8px system-ui;display:grid;place-items:center;font-style:normal}' +
    '.pp b{font-weight:800}' +
    '.ck{display:none;background:#FFD9A0;border:2px solid #17161A;border-radius:11px;box-shadow:4px 4px 0 #E2452F;padding:8px 10px;font-size:11.5px}' +
    '.ck.in{display:block}.ck.ok{background:#CDEBD6;box-shadow:4px 4px 0 #2E9E5B}' +
    '.ck ul{list-style:none;margin:6px 0;padding:0;display:grid;gap:3px}.ck li{background:#FBF7EF;border:1.5px solid #17161A;border-radius:6px;padding:2px 6px;font-size:10.5px;display:flex;justify-content:space-between}' +
    '.ckb{display:inline-block;background:#2F5FE0;color:#fff;border:2px solid #17161A;border-radius:8px;box-shadow:2px 2px 0 #17161A;font-weight:700;font-size:11.5px;padding:3px 10px}' +
    '.log{flex:1;display:flex;flex-direction:column;gap:5px;overflow:hidden}' +
    '.log h5{margin:0;font:800 13px "Avenir Next",system-ui}' +
    '.ev{display:flex;align-items:center;gap:7px;background:#FBF7EF;border:2px solid #17161A;border-radius:8px;padding:4px 6px;animation:evin .35s ease-out}' +
    '@keyframes evin{from{opacity:0;transform:translateY(-6px)}}' +
    '.ev .ic{width:24px;height:24px;border:1.5px solid #17161A;border-radius:6px;background:#F1EADD;display:grid;place-items:center;flex:none}.ev .ic svg{width:15px;height:15px}' +
    '.ev b{display:block;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px}' +
    '.ev small{font-size:9.5px;color:#5A554E}.ev small i{font-style:normal;background:#2F5FE0;color:#fff;border-radius:99px;padding:0 6px;font-weight:700;margin-right:4px}' +
    /* Finder */
    '#fd{position:absolute;left:40px;top:96px;width:420px;background:#f6f6f6;border:1px solid #9b9b9b;border-radius:10px;box-shadow:0 18px 40px rgba(0,0,0,.45);color:#222;font-size:12.5px;opacity:0;transform:translateY(14px) scale(.97);transition:.35s;pointer-events:none;overflow:hidden}' +
    '#fd.in{opacity:1;transform:none}' +
    '.fdt{height:34px;background:#e9e9e9;border-bottom:1px solid #cfcfcf;display:flex;align-items:center;gap:7px;padding:0 12px}' +
    '.fdt i{width:11px;height:11px;border-radius:50%;background:#ff5f57}.fdt i:nth-child(2){background:#febc2e}.fdt i:nth-child(3){background:#28c840}' +
    '.fdt b{margin-left:10px;font-weight:600;font-size:12.5px}' +
    '.fdb{padding:6px 0;min-height:120px}' +
    '.fr{display:flex;align-items:center;gap:8px;padding:5px 14px;white-space:nowrap}.fr svg{width:18px;height:18px;flex:none}' +
    '.fr span{flex:1;overflow:hidden;text-overflow:ellipsis}.fr small{color:#888;font-size:11px}' +
    '.fr.hl{background:#2f6fe0;color:#fff}.fr.hl small{color:#dfe8ff}' +
    '.fr.l1{padding-left:34px}' +
    '.fbar{width:90px;height:7px;border-radius:9px;background:#ddd;overflow:hidden}.fbar i{display:block;height:100%;width:0;background:#2f6fe0;transition:width .25s linear}' +
    '</style>';

  var html = css +
    '<div class="pr">' +
      '<div class="pr-top"><b>Premiere Pro</b> Ana e Leo.prproj</div>' +
      '<div class="pnl" id="pj"><h4><span>Projeto: Ana e Leo</span></h4><div class="ptree">' +
        '<div class="it in">' + BIN + 'BRUTOS<small>48 itens</small></div>' +
        '<div class="it in">' + CLIPV + 'Sequência · Filme<small></small></div>' +
        '<div class="it" id="p-gh">' + CLIPA + 'Golden Hour.mp3</div>' +
        '<div class="it" id="p-wh">' + CLIPA + 'Whoosh 01.wav</div>' +
        '<div class="it" id="b-mi">' + BIN + 'MIDIA IMPORTADA</div>' +
        '<div class="it l1" id="b-mu">' + BIN + 'MUSICAS</div>' +
        '<div class="it l2" id="m-gh">' + CLIPA + 'Golden Hour.mp3</div>' +
        '<div class="it l2" id="m-cv">' + CLIPA + 'Valsa piano.wav</div>' +
        '<div class="it l1" id="b-ef">' + BIN + 'EFEITOS SONOROS</div>' +
        '<div class="it l2" id="m-wh">' + CLIPA + 'Whoosh 01.wav</div>' +
        '<div class="it l2" id="m-sh">' + CLIPA + 'Camera Shutter.wav</div>' +
        '<div class="it l1" id="b-vi">' + BIN + 'VIDEOS</div>' +
        '<div class="it l2" id="m-dr">' + CLIPV + 'drone praia.mp4</div>' +
        '<div class="it" id="b-sd">' + BIN + 'SAME DAY EDIT</div>' +
        '<div class="it l1" id="b-cl">' + BIN + 'Clis</div>' +
        '<div class="it l2" id="m-c1">' + CLIPV + 'MVI_2231_CanonR6_Clis.MP4</div>' +
      '</div></div>' +
      '<div class="pnl" id="mon"><h4><span>Programa: Filme</span></h4><div class="mon-img"></div><div class="mon-tc">00:01:12:08</div></div>' +
      '<div class="pnl" id="tl"><h4><span>Filme</span></h4><div class="ruler"></div>' +
        '<div class="trk"><b>V1</b><div class="clip v in" style="left:40px;width:120px">MVI_0981.MP4</div><div class="clip v in" style="left:162px;width:150px">MVI_0990.MP4</div></div>' +
        '<div class="trk"><b>A1</b><div class="clip a in" style="left:40px;width:272px;opacity:.75">áudio da câmera</div></div>' +
        '<div class="trk" id="trA2"><b>A2</b><div class="clip a" id="c-gh" style="left:40px;width:272px">Golden Hour.mp3</div></div>' +
        '<div class="trk" id="trA3"><b>A3</b><div class="clip s" id="c-wh" style="left:150px;width:40px">Whoosh</div></div>' +
        '<div class="trk"><b>A4</b></div>' +
        '<div class="head"></div>' +
      '</div>' +
      '<div id="sb">' +
        '<div class="sbh">' + LOGO + '<b>Sync Box</b><small>por<br><b style="font:700 10px system-ui">Sales Wed.</b></small></div>' +
        '<div class="sbc blue"><div class="st"><span class="dt" id="dt"></span><span id="stt">Sincronizando</span><span class="tg on"></span></div>' +
          '<div class="drw"><div>' + NOTE + '<b id="n-mu">0</b>MÚSICAS</div><div>' + PLAYI + '<b id="n-vi">0</b>VÍDEOS</div><div>' + WAVE + '<b id="n-ef">0</b>EFEITOS</div></div>' +
          '<div class="vb" id="verify">Verificar projeto</div></div>' +
        '<div class="sbc" id="sdec"><div class="sde-h"><span>Same Day Edit<small>vídeo novo entra sozinho no projeto</small></span><span class="tg" id="sdet"></span></div>' +
          '<div class="sde-b" id="sdeb"><span class="pp"><i style="background:#2F5FE0">C</i>Clis <b id="n-cl">0</b></span><span class="pp"><i style="background:#E2452F">D</i>Drone <b>0</b></span><span class="pp"><i style="background:#E8A33A">S</i>Sales <b>0</b></span></div></div>' +
        '<div class="ck" id="ck"><b id="ckt">3 de 51 arquivos fora da pasta (420 MB)</b>' +
          '<ul id="ckl"><li><span>Valsa piano.wav</span><span>48 MB</span></li><li><span>Camera Shutter.wav</span><span>1 MB</span></li><li><span>drone praia.mp4</span><span>371 MB</span></li></ul>' +
          '<span class="ckb" id="bring">Trazer todos agora</span></div>' +
        '<div class="sbc log" id="log"><h5>Atividade</h5></div>' +
      '</div>' +
      '<div id="fd"><div class="fdt"><i></i><i></i><i></i><b id="fdn">Downloads</b></div><div class="fdb" id="fdb"></div></div>' +
    '</div>';

  function ev(a, icon, name, chip, verb) {
    var log = a.$("#log"), d = document.createElement("div");
    d.className = "ev";
    d.innerHTML = '<span class="ic">' + icon + "</span><div><b>" + name + "</b><small><i>" + chip + "</i>" + verb + "</small></div>";
    log.insertBefore(d, log.children[1] || null);
    while (log.children.length > 6) log.removeChild(log.lastChild);
  }
  function bump(a, sel, n) { var e = a.$(sel); e.textContent = n; e.classList.remove("pop"); e.offsetWidth; e.classList.add("pop"); }
  function busy(a, on, txt) { a.$("#dt").className = "dt" + (on ? " busy" : ""); a.$("#stt").textContent = txt || (on ? "Guardando…" : "Sincronizando"); }
  function finder(a, title, rows) {
    a.$("#fdn").textContent = title;
    a.$("#fdb").innerHTML = rows.map(function (r) {
      return '<div class="fr ' + (r.cls || "") + '" id="' + (r.id || "") + '">' + (r.icon || FOLDER) + "<span>" + r.name + "</span>" + (r.right || "") + "</div>";
    }).join("");
  }
  var FILE_A = '<svg viewBox="0 0 24 24"><path d="M5 2h9l5 5v15H5z" fill="#fff" stroke="#999"/><path d="M10 17v-7q4 1 4 4" fill="none" stroke="#E2452F" stroke-width="1.8"/><circle cx="9" cy="17" r="1.8" fill="#E2452F"/></svg>';
  var FILE_V = '<svg viewBox="0 0 24 24"><path d="M5 2h9l5 5v15H5z" fill="#fff" stroke="#999"/><path d="M9 11l6 3.5-6 3.5z" fill="#2F5FE0"/></svg>';

  function download(a, name, size) {
    finder(a, "Downloads", [
      { name: "Contrato Ana e Leo.pdf", icon: FILE_V.replace("#2F5FE0", "#999"), right: "<small>ontem</small>" },
      { id: "dl", name: name, icon: FILE_A, right: '<span class="fbar"><i id="fbi"></i></span>' }
    ]);
    a.show("#fd");
    return a.wait(500).then(function () {
      a.$("#fbi").style.width = "100%";
      return a.wait(1100);
    }).then(function () {
      a.$("#dl").lastChild.outerHTML = "<small>" + size + "</small>";
    });
  }

  window.SIM = {
    title: "Premiere Pro · Sync Box",
    html: html,
    steps: [
      {
        label: "Baixou uma música", caption: "Você baixa uma música do jeito de sempre e ela cai na pasta Downloads.",
        run: function (a) { return a.move("#pj", 0, 120).then(function () { return download(a, "Golden Hour.mp3", "8,9 MB"); }).then(function () { return a.wait(400); }); }
      },
      {
        label: "Arrastou para o Premiere", caption: "Arrasta direto para a timeline. Até aqui, o arquivo continua lá em Downloads, fora do projeto.",
        run: function (a) {
          return a.drag("#dl", "#trA2", '<div style="background:#2f6fe0;color:#fff;padding:3px 8px;border-radius:5px;font-size:12px">Golden Hour.mp3</div>')
            .then(function () { a.show("#c-gh"); a.show("#p-gh"); a.$("#p-gh").classList.add("hl"); a.hide("#fd"); return a.wait(700); });
        }
      },
      {
        label: "Guardou na gaveta certa", caption: "Em 2 segundos o Sync Box copia para a pasta do projeto, em MIDIA IMPORTADA › MUSICAS, e religa o clipe. Sem importar de novo.",
        run: function (a) {
          busy(a, true);
          return a.wait(900).then(function () {
            busy(a, false);
            a.hide("#p-gh"); a.show("#b-mi"); a.show("#b-mu"); a.show("#m-gh"); a.$("#m-gh").classList.add("hl");
            bump(a, "#n-mu", 1);
            ev(a, NOTE, "Golden Hour.mp3", "Músicas", "copiado");
            finder(a, "Ana e Leo › MIDIA IMPORTADA › MUSICAS", [{ name: "Golden Hour.mp3", icon: FILE_A, cls: "hl", right: "<small>agora</small>" }]);
            a.show("#fd");
            return a.wait(2200);
          }).then(function () { a.hide("#fd"); a.$("#m-gh").classList.remove("hl"); });
        }
      },
      {
        label: "Áudio curto vira efeito", caption: "Um whoosh de 2 segundos? Ele percebe pelo nome e pela duração e guarda em EFEITOS SONOROS.",
        run: function (a) {
          return download(a, "Whoosh 01.wav", "410 KB").then(function () {
            return a.drag("#dl", "#trA3", '<div style="background:#2f6fe0;color:#fff;padding:3px 8px;border-radius:5px;font-size:12px">Whoosh 01.wav</div>');
          }).then(function () {
            a.hide("#fd"); a.show("#c-wh"); a.show("#p-wh"); busy(a, true);
            return a.wait(1000);
          }).then(function () {
            busy(a, false); a.hide("#p-wh"); a.show("#b-ef"); a.show("#m-wh");
            bump(a, "#n-ef", 1); ev(a, WAVE, "Whoosh 01.wav", "Efeitos", "copiado");
            return a.wait(900);
          });
        }
      },
      {
        label: "Verificou o projeto antigo", caption: "Instalou no meio de um projeto? Verificar projeto mostra o que está fora da pasta e traz tudo com um clique.",
        run: function (a) {
          return a.click("#verify").then(function () {
            var c = a.$("#ck"); c.classList.remove("ok"); a.$("#ckt").textContent = "3 de 51 arquivos fora da pasta (420 MB)";
            a.$("#ckl").style.display = ""; a.$("#bring").style.display = ""; a.show("#ck");
            return a.wait(1500);
          }).then(function () { return a.click("#bring"); }).then(function () {
            busy(a, true, "Guardando… (3)");
            return a.wait(600);
          }).then(function () {
            a.show("#m-cv"); bump(a, "#n-mu", 2); ev(a, NOTE, "Valsa piano.wav", "Músicas", "copiado"); return a.wait(500);
          }).then(function () {
            a.show("#m-sh"); bump(a, "#n-ef", 2); ev(a, WAVE, "Camera Shutter.wav", "Efeitos", "copiado"); return a.wait(700);
          }).then(function () {
            a.show("#b-vi"); a.show("#m-dr"); bump(a, "#n-vi", 1); ev(a, PLAYI, "drone praia.mp4", "Vídeos", "copiado"); busy(a, false);
            var c = a.$("#ck"); c.classList.add("ok"); a.$("#ckt").textContent = "✓ Tudo certo. Os 51 arquivos estão dentro da pasta do projeto.";
            a.$("#ckl").style.display = "none"; a.$("#bring").style.display = "none";
            return a.wait(1800);
          }).then(function () { a.hide("#ck"); });
        }
      },
      {
        label: "Same Day Edit", caption: "No casamento, ligue o Same Day Edit: cada vídeo que a equipe manda para a pasta dela entra sozinho no projeto, em SAME DAY EDIT › pessoa.",
        run: function (a) {
          return a.click("#sdet").then(function () {
            a.$("#sdet").classList.add("on"); a.$("#sdec").classList.add("red"); a.show("#sdeb");
            finder(a, "CASAMENTO › SAME DAY", [
              { name: "Clis" }, { id: "nv", name: "MVI_2231_CanonR6_Clis.MP4", icon: FILE_V, cls: "l1", right: '<span class="fbar"><i id="fbi"></i></span>' },
              { name: "Drone" }, { name: "Sales" }
            ]);
            a.show("#fd");
            return a.wait(600);
          }).then(function () {
            a.$("#fbi").style.transition = "width 2.2s linear"; a.$("#fbi").style.width = "100%";
            a.$("#stt").textContent = "Esperando a cópia terminar…"; a.$("#dt").className = "dt busy";
            return a.wait(2500);
          }).then(function () {
            a.$("#nv").lastChild.outerHTML = "<small>1,2 GB</small>";
            busy(a, false);
            a.show("#b-sd"); a.show("#b-cl"); a.show("#m-c1"); a.$("#m-c1").classList.add("hl");
            bump(a, "#n-cl", 1); ev(a, PLAYI, "MVI_2231_CanonR6_Clis.MP4", "Clis", "entrou no projeto");
            return a.wait(2400);
          }).then(function () { a.hide("#fd"); });
        }
      }
    ]
  };
})();
