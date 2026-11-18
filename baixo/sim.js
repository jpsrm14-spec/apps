/* Simulação do Baixô: cola o link, escolhe a qualidade e baixa. */
(function () {
  var LOGO = '<svg viewBox="0 0 256 256"><rect x="30" y="34" width="208" height="208" rx="54" fill="#17161A"/><rect x="18" y="20" width="208" height="208" rx="54" fill="#2F5FE0" stroke="#17161A" stroke-width="9"/><path d="M60 54v26M184 54v26" stroke="#F1EADD" stroke-width="9" stroke-linecap="round"/><path d="M106 40h32v46h26l-42 42-42-42h26z" fill="#E2452F" stroke="#17161A" stroke-width="9" stroke-linejoin="round"/><path d="M58 124h128v60a22 22 0 0 1-22 22H80a22 22 0 0 1-22-22z" fill="#F1EADD" stroke="#17161A" stroke-width="9" stroke-linejoin="round"/><circle cx="100" cy="158" r="10" fill="#17161A"/><circle cx="144" cy="158" r="10" fill="#17161A"/><path d="M110 178q12 11 24 0" fill="none" stroke="#17161A" stroke-width="7" stroke-linecap="round"/></svg>';
  var IV = '<svg viewBox="0 0 32 32"><rect x="4" y="9" width="24" height="16" rx="3" fill="#2F5FE0" stroke="#17161A" stroke-width="2.4"/><path d="M14 13v8l6-4z" fill="#F1EADD"/></svg>';
  var IA = '<svg viewBox="0 0 32 32"><rect x="3" y="8" width="26" height="18" rx="3" fill="#E2452F" stroke="#17161A" stroke-width="2.2"/><rect x="7" y="11" width="18" height="8" rx="2" fill="#FBF7EF" stroke="#17161A" stroke-width="1.6"/><circle cx="12" cy="15" r="2.4" fill="#F1EADD" stroke="#17161A" stroke-width="1.4"/><circle cx="20" cy="15" r="2.4" fill="#F1EADD" stroke="#17161A" stroke-width="1.4"/></svg>';
  var OK = '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="#2F5FE0" stroke="#17161A" stroke-width="2.4"/><path d="M10.5 16.5l4 4 7-8" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var FOLDER = '<svg viewBox="0 0 24 24"><path d="M2 6a2 2 0 0 1 2-2h6l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" fill="#6EA8FE" stroke="#2b5bb5" stroke-width="1.4"/></svg>';
  var MP3 = '<svg viewBox="0 0 24 24"><path d="M5 2h9l5 5v15H5z" fill="#fff" stroke="#999"/><path d="M10 17v-7q4 1 4 4" fill="none" stroke="#E2452F" stroke-width="1.8"/><circle cx="9" cy="17" r="1.8" fill="#E2452F"/></svg>';
  var MP4 = '<svg viewBox="0 0 24 24"><path d="M5 2h9l5 5v15H5z" fill="#fff" stroke="#999"/><path d="M9 11l6 3.5-6 3.5z" fill="#2F5FE0"/></svg>';

  var css = '<style>' +
    '.bx{position:absolute;inset:0;background:#F1EADD;padding:14px 20px;color:#17161A}' +
    '.bxh{display:flex;align-items:center;gap:10px;margin-bottom:10px}.bxh svg{width:38px;height:38px}.bxh b{font:800 24px/1 "Avenir Next",system-ui;letter-spacing:.06em}' +
    '.bxh .aj{margin-left:auto;border:2px solid #17161A;border-radius:8px;padding:3px 10px;font-size:12px;font-weight:600;background:#FBF7EF}.bxh small{font-size:12px;color:#5A554E}.bxh small b{font:700 12px system-ui;letter-spacing:0;color:#17161A;text-decoration:underline;text-decoration-color:#E2452F}' +
    '.box{background:#FBF7EF;border:2.5px solid #17161A;border-radius:12px;box-shadow:4px 4px 0 #17161A;padding:10px 12px}' +
    '.topr{display:flex;align-items:center;gap:9px;margin-bottom:12px}' +
    '.sg{display:inline-flex;border:2.5px solid #17161A;border-radius:9px;overflow:hidden;background:#F1EADD;flex:none}.sg span{padding:4px 11px;font-weight:600;font-size:12.5px;border-right:2.5px solid #17161A}.sg span:last-child{border:0}.sg span.on{background:#17161A;color:#F1EADD}' +
    '.url{flex:1;border:2.5px solid #17161A;border-radius:9px;background:#fff;padding:5px 10px;font:13px Menlo,monospace;min-height:31px;white-space:nowrap;overflow:hidden}.url:empty::before{content:"Cole o link de um vídeo, playlist ou canal do YouTube";color:#8C867C;font-family:system-ui}' +
    '.pb{border:2.5px solid #17161A;border-radius:9px;background:#2F5FE0;color:#fff;font-weight:700;font-size:13px;padding:5px 14px;box-shadow:3px 3px 0 #17161A;flex:none}' +
    '.cols{display:grid;grid-template-columns:1.12fr 1fr;gap:14px}' +
    '#pick{height:392px;position:relative}' +
    '.emp{position:absolute;inset:0;display:grid;place-items:center;color:#5A554E;font-size:13px;text-align:center}' +
    '.load{position:absolute;inset:0;display:none;place-items:center}.load.in{display:grid}.load i{width:30px;height:30px;border:4px solid #D8CEBC;border-top-color:#E2452F;border-radius:50%;animation:bxs .7s linear infinite}@keyframes bxs{to{transform:rotate(360deg)}}' +
    '.vid{display:none}.vid.in{display:block;animation:bxin .4s}@keyframes bxin{from{opacity:0;transform:translateY(6px)}}' +
    '.vh{display:flex;gap:11px;margin-bottom:11px}.th{width:132px;height:74px;border:2.5px solid #17161A;border-radius:9px;flex:none;position:relative;overflow:hidden}' +
    '.th::after{content:"";position:absolute;left:50%;top:50%;width:26px;height:18px;margin:-9px 0 0 -13px;background:#E2452F;border-radius:5px}' +
    '.vh strong{display:block;font-size:14.5px;line-height:1.3}.vh small{display:block;font-size:12px;color:#5A554E;margin:2px 0 6px}' +
    '.tl{display:flex;gap:8px;margin-bottom:9px;align-items:center}' +
    '.tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}' +
    '.tile{border:2.5px solid #17161A;border-radius:10px;background:#fff;padding:6px 7px;transition:.15s}.tile big{display:block;font:800 18px/1.1 Menlo,monospace;letter-spacing:-.04em}.tile strong{display:block;font-size:11.5px}.tile small{font-size:10.5px;color:#5A554E}' +
    '.tile.sel{background:#2F5FE0;color:#fff;box-shadow:3px 3px 0 #17161A;transform:translate(-2px,-2px)}.tile.sel small{color:#DCE5FF}' +
    '.save{display:flex;gap:9px;align-items:center;margin-top:12px}.fold{flex:1;display:flex;align-items:center;gap:8px;border:2.5px solid #17161A;border-radius:9px;background:#F1EADD;padding:5px 9px;font-size:12.5px}.fold svg{width:20px;height:20px}.fold small{color:#5A554E}' +
    '.go{border:2.5px solid #17161A;border-radius:10px;background:#E2452F;color:#17161A;font-weight:800;font-size:16px;padding:7px 22px;box-shadow:3px 3px 0 #17161A}' +
    '#dl h3{margin:0 0 9px;font-size:15px;display:flex;align-items:center;gap:8px}#dl h3 i{font-style:normal;border:2px solid #17161A;border-radius:99px;padding:0 8px;font-size:11.5px;background:#F1EADD}#dl h3 u{margin-left:auto;font-size:12px;font-weight:500;color:#5A554E;text-underline-offset:3px}' +
    '#dl{height:392px;overflow:hidden}.jbs{display:flex;flex-direction:column;gap:9px}' +
    '.jb{border:2.5px solid #17161A;border-radius:11px;background:#fff;padding:8px 10px;display:grid;grid-template-columns:40px 1fr;gap:10px;align-items:center;animation:bxin .4s}' +
    '.jb .ic{width:40px;height:40px;border:2.5px solid #17161A;border-radius:10px;background:#F1EADD;display:grid;place-items:center}.jb .ic svg{width:28px;height:28px}' +
    '.jb b{display:block;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.jb small{display:flex;gap:6px;align-items:center;font-size:11.5px;color:#5A554E;margin-top:1px}' +
    '.jb small em{font-style:normal;font-size:10.5px;font-weight:700;border:2px solid #17161A;border-radius:99px;padding:0 6px;background:#F1EADD;color:#17161A}' +
    '.jb .br{grid-column:2;height:14px;border:2px solid #17161A;border-radius:6px;padding:2px;background:#fff}.jb .br i{display:block;height:100%;width:0;background:repeating-linear-gradient(90deg,#E2452F 0 7px,transparent 7px 10px)}' +
    '.jb.done{background:#FBF7EF}.jb.done .br{display:none}' +
    '#fd{position:absolute;left:470px;top:150px;width:440px;background:#f6f6f6;border:1px solid #9b9b9b;border-radius:10px;box-shadow:0 18px 40px rgba(0,0,0,.35);color:#222;font-size:12.5px;opacity:0;transform:translateY(14px) scale(.97);transition:.35s;overflow:hidden}#fd.in{opacity:1;transform:none}' +
    '.fdt{height:32px;background:#e9e9e9;border-bottom:1px solid #cfcfcf;display:flex;align-items:center;gap:7px;padding:0 12px}.fdt i{width:11px;height:11px;border-radius:50%;background:#ff5f57}.fdt i:nth-child(2){background:#febc2e}.fdt i:nth-child(3){background:#28c840}.fdt b{margin-left:10px;font-weight:600}' +
    '.fr{display:flex;align-items:center;gap:8px;padding:4px 14px}.fr svg{width:17px;height:17px}.fr span{flex:1}.fr small{color:#888}.fr.l1{padding-left:34px}' +
    '</style>';

  var html = css + '<div class="bx">' +
    '<div class="bxh">' + LOGO + '<b>BAIXÔ</b><span class="aj">Ajustes</span><small>por <b>Sales Wed.</b></small></div>' +
    '<div class="box topr"><div class="sg"><span class="on">Link</span><span>Buscar</span></div><div class="url" id="url"></div><span class="pb" id="paste">Colar link</span></div>' +
    '<div class="cols">' +
      '<div class="box" id="pick"><div class="emp" id="emp">Cole um link para ver as qualidades disponíveis.</div><div class="load" id="load"><i></i></div>' +
        '<div class="vid" id="vid">' +
          '<div class="vh"><div class="th" id="th"></div><div><strong id="vt">Videoclipe oficial</strong><small id="vs">Canal da banda · 4:12</small>' +
            '<div class="sg" id="segL" style="display:none"><span>Só este vídeo</span><span class="on">Playlist inteira</span></div></div></div>' +
          '<div class="tl"><div class="sg"><span class="on" id="tVid">Vídeo</span><span id="tAud">Só áudio</span></div><div class="sg" id="fmt"><span class="on">MP4</span><span>MOV</span></div></div>' +
          '<div class="tiles" id="tiles"></div>' +
          '<div class="save"><div class="fold">' + FOLDER + '<span><b>Downloads</b><br><small>pasta dos downloads</small></span></div><span class="go" id="go">Baixar</span></div>' +
        '</div></div>' +
      '<div class="box" id="dl"><h3>Downloads<i id="nj">0</i><u id="open">Abrir pasta</u></h3><div class="jbs" id="jobs"></div></div>' +
    '</div>' +
    '<div id="fd"><div class="fdt"><i></i><i></i><i></i><b>Downloads</b></div><div style="padding:6px 0" id="fdb"></div></div>' +
  '</div>';

  function tiles(a, list) {
    a.$("#tiles").innerHTML = list.map(function (t, i) {
      return '<div class="tile" id="t' + i + '"><big>' + t[0] + "</big><strong>" + t[1] + "</strong><small>" + t[2] + "</small></div>";
    }).join("");
  }
  function job(a, id, icon, title, chip, status) {
    var d = document.createElement("div");
    d.className = "jb"; d.id = id;
    d.innerHTML = '<span class="ic">' + icon + "</span><div><b>" + title + "</b><small><em>" + chip + '</em><span class="s">' + status + '</span></small></div><span class="br"><i></i></span>';
    var js = a.$("#jobs"); js.insertBefore(d, js.firstChild);
    a.$("#nj").textContent = js.children.length;
    return d;
  }
  function prog(a, d, from, to, ms, label) {
    return a.count(d.querySelector(".s"), from, to, ms, function (n) { d.querySelector(".br i").style.width = n + "%"; return label(n); });
  }

  window.SIM = {
    title: "Baixô · vídeos e músicas do YouTube",
    html: html,
    reset: function (stage) { stage.querySelector("#th").style.background = "linear-gradient(135deg,#f3c79a,#d1607a 55%,#3b2f63)"; },
    steps: [
      {
        label: "Colou o link", caption: "Copiou o link no YouTube e clicou em Colar link. O Baixô mostra o vídeo e todas as qualidades que existem.",
        run: function (a) {
          return a.click("#paste").then(function () { return a.type("#url", "youtube.com/watch?v=dQ8…", 30); }).then(function () {
            a.$("#emp").style.display = "none"; a.show("#load"); return a.wait(900);
          }).then(function () {
            a.hide("#load");
            tiles(a, [["4K", "2160p · 60 fps", "412 MB"], ["2K", "1440p · 60 fps", "236 MB"], ["HD", "1080p · 60 fps", "148 MB"], ["720", "720p", "64 MB"]]);
            a.show("#vid"); return a.wait(900);
          });
        }
      },
      {
        label: "Escolheu a qualidade", caption: "Vídeo na maior resolução que existir, com o melhor áudio. O tamanho aparece antes de baixar.",
        run: function (a) { return a.click("#t0").then(function () { a.$("#t0").classList.add("sel"); return a.wait(700); }); }
      },
      {
        label: "Baixou", caption: "Entra na lista de downloads com a velocidade e o andamento. Dá para pausar e continuar depois.",
        run: function (a) {
          var d;
          return a.click("#go").then(function () {
            d = job(a, "j1", IV, "Videoclipe oficial [2160p].mp4", "MP4 · 2160p", "");
            return prog(a, d, 0, 100, 3400, function (n) { return "Baixando o vídeo · " + Math.round(n) + "% · 48 MB/s"; });
          }).then(function () {
            d.classList.add("done"); d.querySelector(".ic").innerHTML = OK; d.querySelector(".s").textContent = "Concluído · 412 MB";
            return a.wait(900);
          });
        }
      },
      {
        label: "Playlist só no áudio", caption: "Cole o link de uma playlist ou canal, escolha Só áudio em MP3 320 e baixe tudo de uma vez, numerado.",
        run: function (a) {
          return a.click("#paste").then(function () {
            a.$("#vid").classList.remove("in");
            return a.type("#url", "youtube.com/playlist?list=PL7…", 30);
          }).then(function () {
            a.show("#load"); return a.wait(800);
          }).then(function () {
            a.hide("#load");
            a.$("#th").style.background = "linear-gradient(135deg,#9fd3c7,#2F5FE0 60%,#17161A)";
            a.$("#vt").textContent = "Minha playlist"; a.$("#vs").textContent = "24 vídeos · 1 h 31 min";
            a.$("#segL").style.display = "inline-flex";
            tiles(a, [["4K", "2160p", "9,8 GB"], ["HD", "1080p", "3,4 GB"], ["720", "720p", "1,5 GB"], ["480", "480p", "780 MB"]]);
            a.show("#vid"); return a.wait(700);
          }).then(function () { return a.click("#tAud"); }).then(function () {
            a.$("#tVid").classList.remove("on"); a.$("#tAud").classList.add("on");
            a.$("#fmt").innerHTML = "<span class=\"on\">MP3</span><span>M4A</span><span>WAV</span>";
            tiles(a, [["320", "MP3 320 kbps", "com capa · 210 MB"], ["M4A", "Original", "180 MB"], ["WAV", "Sem compressão", "1,1 GB"], ["128", "MP3 128 kbps", "84 MB"]]);
            return a.wait(500);
          }).then(function () { return a.click("#t0"); }).then(function () {
            a.$("#t0").classList.add("sel"); return a.click("#go");
          }).then(function () {
            var d = job(a, "j2", IA, "Minha playlist", "MP3 320", "");
            return prog(a, d, 0, 100, 3600, function (n) { return "Baixando o áudio · " + Math.max(1, Math.round(n * 0.24)) + " de 24"; }).then(function () {
              d.classList.add("done"); d.querySelector(".ic").innerHTML = OK; d.querySelector(".s").textContent = "Concluído · 24 músicas";
              return a.wait(600);
            });
          });
        }
      },
      {
        label: "Tudo na pasta", caption: "Os arquivos ficam na pasta que você escolheu: o vídeo com a resolução no nome e a playlist numerada, com capa.",
        run: function (a) {
          return a.click("#open").then(function () {
            a.$("#fdb").innerHTML =
              '<div class="fr">' + MP4 + "<span>Videoclipe oficial [2160p].mp4</span><small>412 MB</small></div>" +
              '<div class="fr">' + FOLDER + "<span>Minha playlist</span><small>24 itens</small></div>" +
              '<div class="fr l1">' + MP3 + "<span>001 - Primeira faixa.mp3</span><small>8,4 MB</small></div>" +
              '<div class="fr l1">' + MP3 + "<span>002 - Segunda faixa.mp3</span><small>9,1 MB</small></div>" +
              '<div class="fr l1">' + MP3 + "<span>003 - Terceira faixa.mp3</span><small>7,7 MB</small></div>" +
              '<div class="fr l1" style="color:#888"><span>…</span></div>';
            a.show("#fd"); return a.wait(3000);
          });
        }
      }
    ]
  };
})();
