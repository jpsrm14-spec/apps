/* Simulação do Copiô: do cartão conectado ao backup conferido. */
(function () {
  var LOGO = '<svg viewBox="14 14 228 228"><rect x="26" y="26" width="204" height="204" rx="52" fill="#F1EADD" stroke="#17161A" stroke-width="9"/><path d="M100,80 L127,57 L154,80" fill="none" stroke="#17161A" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="M99,105 H153 L179,131 V193 Q179,203 169,203 H99 Q89,203 89,193 V115 Q89,105 99,105 Z" fill="#17161A"/><path d="M92,98 H146 L172,124 V186 Q172,196 162,196 H92 Q82,196 82,186 V108 Q82,98 92,98 Z" fill="#E2452F" stroke="#17161A" stroke-width="9" stroke-linejoin="round"/><path d="M104,152 L120,168 L150,134" fill="none" stroke="#F1EADD" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICO = {
    foto: '<svg viewBox="0 0 40 40"><rect x="4" y="10" width="32" height="24" rx="5" fill="#2F5FE0" stroke="#17161A" stroke-width="2.6"/><rect x="13" y="6" width="12" height="6" rx="2" fill="#17161A"/><circle cx="20" cy="22" r="7" fill="#F1EADD" stroke="#17161A" stroke-width="2.6"/></svg>',
    video: '<svg viewBox="0 0 40 40"><rect x="3" y="11" width="24" height="19" rx="4" fill="#E2452F" stroke="#17161A" stroke-width="2.6"/><path d="M27 17l9-5v17l-9-5z" fill="#F1EADD" stroke="#17161A" stroke-width="2.6" stroke-linejoin="round"/></svg>',
    audio: '<svg viewBox="0 0 40 40"><rect x="13" y="4" width="14" height="22" rx="7" fill="#FFD9A0" stroke="#17161A" stroke-width="2.6"/><path d="M8 20a12 12 0 0 0 24 0M20 32v5" fill="none" stroke="#17161A" stroke-width="2.6" stroke-linecap="round"/></svg>',
    outro: '<svg viewBox="0 0 40 40"><path d="M9 4h15l8 8v24H9z" fill="#FBF7EF" stroke="#17161A" stroke-width="2.6" stroke-linejoin="round"/></svg>'
  };
  var css = '<style>' +
    '.cp{position:absolute;inset:0;background:#F1EADD;padding:16px 22px;color:#17161A}' +
    '.cph{display:flex;align-items:center;gap:10px;margin-bottom:12px}.cph svg{width:38px;height:38px}' +
    '.cph b{font:800 24px/1 "Avenir Next",system-ui;letter-spacing:.06em}.cph small{margin-left:auto;font-size:12px;color:#5A554E}.cph small b{font:700 12px system-ui;letter-spacing:0;color:#17161A;text-decoration:underline;text-decoration-color:#E2452F}' +
    '.cpg{display:grid;grid-template-columns:1.08fr 1fr;gap:16px}' +
    '.sx{background:#FBF7EF;border:2.5px solid #17161A;border-radius:12px;box-shadow:4px 4px 0 #17161A;padding:11px 14px;margin-bottom:12px;transition:opacity .3s}' +
    '.sx.off{opacity:.4;box-shadow:none}' +
    '.sx h3{margin:0 0 9px;font-size:14px;display:flex;align-items:center;gap:8px}.sx h3 i{font-style:normal;background:#17161A;color:#F1EADD;width:22px;height:22px;border-radius:6px;display:grid;place-items:center;font-size:12px}' +
    '.cardx{display:flex;justify-content:space-between;align-items:center;border:2.5px solid #17161A;border-radius:9px;padding:8px 11px;background:#F1EADD;opacity:0;transform:translateY(-6px);transition:.35s}' +
    '.cardx.in{opacity:1;transform:none}.cardx.sel{background:#2F5FE0;color:#fff}.cardx small{display:block;font-size:11.5px;opacity:.8}.cardx strong{font-size:14px}' +
    '.wait{font-size:13px;color:#5A554E}' +
    '.segx{display:inline-flex;border:2.5px solid #17161A;border-radius:9px;overflow:hidden;background:#F1EADD;margin-bottom:9px}' +
    '.segx span{padding:4px 12px;font-weight:600;font-size:12.5px;border-right:2.5px solid #17161A}.segx span:last-child{border:0}.segx span.on{background:#17161A;color:#F1EADD}' +
    '.cats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}' +
    '.cat{border:2.5px solid #17161A;border-radius:11px;background:#fff;box-shadow:3px 3px 0 #17161A;text-align:center;padding:7px 4px 6px;transition:.2s}' +
    '.cat svg{width:34px;height:34px;display:block;margin:0 auto 2px}.cat b{display:block;font-size:12.5px}.cat small{display:block;font-size:11px;color:#5A554E}' +
    '.cat.zero{background:transparent;border-color:#D8CEBC;box-shadow:none}.cat.zero svg{filter:grayscale(1);opacity:.35}.cat.zero b,.cat.zero small{color:#8C867C}' +
    '.sum{margin:8px 0 0;font-size:12.5px}' +
    '.lb{font-size:12px;font-weight:700;margin:0 0 4px}' +
    '.inp{border:2.5px solid #17161A;border-radius:9px;background:#fff;padding:5px 9px;font-size:14px;min-height:31px;transition:box-shadow .2s}.inp.f{box-shadow:3px 3px 0 #2F5FE0}' +
    '.inp:empty::before{content:attr(data-ph);color:#8C867C}' +
    '.two{display:grid;grid-template-columns:1fr 1fr;gap:12px}' +
    '.chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}.chp{border:2px solid #17161A;border-radius:99px;padding:1px 9px;font-size:11.5px;font-weight:600;background:#F1EADD}.chp.sel{background:#17161A;color:#F1EADD}' +
    '.pv{margin-top:9px;background:#17161A;color:#F1EADD;border-radius:9px;padding:7px 10px;font:12px Menlo,monospace;line-height:1.55}.pv i{font-style:normal;color:#B9B2A6}.pv b{color:#FFD9A0}' +
    '.dest{border:2.5px solid #17161A;border-radius:9px;background:#F1EADD;padding:6px 10px;font-size:12.5px;margin-bottom:6px}.dest b{display:block;font-size:13.5px}' +
    '.go{display:block;text-align:center;background:#D8CEBC;color:#5A554E;border:2.5px solid #9B9486;border-radius:12px;padding:10px;font-size:17px;font-weight:800;transition:.25s}' +
    '.go.ok{background:#E2452F;color:#17161A;border-color:#17161A;box-shadow:4px 4px 0 #17161A}' +
    /* cartão SD entrando */
    '.sd{position:absolute;right:-90px;bottom:40px;width:64px;height:84px;transition:right .9s cubic-bezier(.2,.8,.2,1),opacity .4s;z-index:5}.sd.in{right:30px}.sd.gone{opacity:0}' +
    /* tela de cópia */
    '.run{position:absolute;inset:0;background:#F1EADD;padding:30px 60px;opacity:0;pointer-events:none;transition:opacity .35s;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}.run.in{opacity:1}' +
    '.pct{font:800 96px/1 "Avenir Next",system-ui;letter-spacing:-.04em}.pct small{font-size:40px}' +
    '.barx{height:30px;border:2.5px solid #17161A;border-radius:9px;background:#fff;padding:4px;margin:16px 0 10px}.barx i{display:block;height:100%;width:0;background:repeating-linear-gradient(90deg,#E2452F 0 11px,transparent 11px 15px)}' +
    '.now{font:13px Menlo,monospace;color:#5A554E;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.badge{width:64px;height:64px;border:2.5px solid #17161A;border-radius:18px;box-shadow:4px 4px 0 #17161A;background:#2F5FE0;display:none;place-items:center;margin-bottom:14px}.badge.in{display:grid;animation:cpop .45s cubic-bezier(.3,1.6,.5,1)}@keyframes cpop{from{transform:scale(0)}}.badge svg{width:34px;height:34px}' +
    '.rules{list-style:none;margin:0;padding:0;border:2.5px solid #17161A;border-radius:11px;overflow:hidden;font-size:13px}.rules li{display:flex;justify-content:space-between;padding:7px 12px;background:#fff}.rules li:nth-child(odd){background:#F1EADD}.rules li b{font-weight:700}' +
    '.ftree{background:#17161A;color:#F1EADD;border-radius:11px;padding:12px 14px;font:12.5px/1.75 Menlo,monospace;margin-top:12px}.ftree b{color:#FFD9A0;font-weight:600}.ftree i{font-style:normal;color:#B9B2A6}' +
    '</style>';

  var html = css + '<div class="cp">' +
    '<div class="cph">' + LOGO + '<b>COPIÔ</b><small>por <b>Criô</b></small></div>' +
    '<div class="cpg"><div>' +
      '<div class="sx" id="s1"><h3><i>1</i>Cartão</h3><div class="wait" id="wait">Conecte um cartão de memória…</div>' +
        '<div class="cardx" id="card"><span><strong>EOS_DIGITAL</strong><small>Canon EOS R6 · 64 GB · 418 arquivos</small></span><span style="font-size:12px;font-weight:700">Selecionado</span></div></div>' +
      '<div class="sx off" id="s2"><h3><i>2</i>O que copiar</h3>' +
        '<div class="segx"><span class="on" id="pAll">Tudo</span><span id="pToday">Hoje</span><span>A partir de…</span></div>' +
        '<div class="cats">' +
          '<div class="cat">' + ICO.foto + '<b>Fotos</b><small id="nF">326</small></div>' +
          '<div class="cat">' + ICO.video + '<b>Vídeos</b><small id="nV">86</small></div>' +
          '<div class="cat">' + ICO.audio + '<b>Áudios</b><small id="nA">6</small></div>' +
          '<div class="cat zero">' + ICO.outro + '<b>Outros</b><small>0</small></div>' +
        '</div><p class="sum" id="sum"><b>418 arquivos</b> · 71,2 GB</p></div>' +
    '</div><div>' +
      '<div class="sx off" id="s3"><h3><i>3</i>Quem captou</h3><div class="two">' +
        '<div><p class="lb">Profissional</p><div class="inp" id="prof" data-ph="ex.: Sales"></div><div class="chips"><span class="chp">Clis</span><span class="chp">Sales</span></div></div>' +
        '<div><p class="lb">Câmera <span style="font-weight:400;color:#5A554E">· reconhecida</span></p><div class="inp" id="cam">CanonR6</div><div class="chips"><span class="chp sel">CanonR6</span><span class="chp">CanonR8</span></div></div>' +
        '</div><div class="pv" id="pv"><i>MVI_1000.MP4</i><br>→ <span id="pvp">?/VIDEO/</span><b id="pvn">MVI_1000_CanonR6.MP4</b></div></div>' +
      '<div class="sx off" id="s4"><h3><i>4</i>Evento</h3><div class="dest" id="dest">Escolha a pasta do evento</div>' +
        '<div class="chips"><span class="chp" id="ev1">Casamento Ana e Leo</span><span class="chp">Ensaio Bia</span><span class="chp">Chá revelação</span></div></div>' +
      '<div class="go" id="go">Iniciar backup</div>' +
    '</div></div>' +
    '<svg class="sd" id="sd" viewBox="0 0 64 84"><path d="M4 4h40l16 16v58a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" fill="#2F5FE0" stroke="#17161A" stroke-width="3.5" stroke-linejoin="round"/><g fill="#FFD9A0" stroke="#17161A" stroke-width="2"><rect x="12" y="10" width="6" height="14" rx="1.5"/><rect x="22" y="10" width="6" height="14" rx="1.5"/><rect x="32" y="10" width="6" height="14" rx="1.5"/></g><rect x="12" y="44" width="40" height="22" rx="4" fill="#F1EADD" stroke="#17161A" stroke-width="2.5"/><text x="32" y="60" font-size="11" font-weight="800" text-anchor="middle" font-family="system-ui">64GB</text></svg>' +
    '<div class="run" id="run"><div>' +
      '<div class="badge" id="badge"><svg viewBox="0 0 34 34"><path d="M8 18l6 6 12-14" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
      '<div class="pct" id="pct">0<small>%</small></div>' +
      '<div class="barx"><i id="bar"></i></div><div class="now" id="now">Preparando…</div></div>' +
      '<div><ul class="rules" id="rules"><li><span>Arquivos</span><b id="r1">0 de 316</b></li><li><span>Conferidos com o original</span><b id="r2">0</b></li><li><span>Sobrescritos</span><b>0</b></li><li><span>Repetidos (já estavam lá)</span><b>0</b></li></ul>' +
      '<div class="ftree">Casamento Ana e Leo/<br>└ <b>Sales</b>/<br>&nbsp;&nbsp;├ FOTO/ <i>248</i><br>&nbsp;&nbsp;├ VIDEO/ <i>64</i><br>&nbsp;&nbsp;└ AUDIO/ <i>4</i></div></div>' +
    '</div>' +
  '</div>';

  var FILES = ["IMG_4410_CanonR6_Sales.CR3", "IMG_4466_CanonR6_Sales.CR3", "MVI_1003_CanonR6_Sales.MP4", "IMG_4521_CanonR6_Sales.CR3", "MVI_1011_CanonR6_Sales.MP4", "IMG_4602_CanonR6_Sales.CR3", "ZOOM0004_CanonR6_Sales.WAV", "IMG_4655_CanonR6_Sales.CR3"];

  window.SIM = {
    title: "Copiô · backup do cartão",
    html: html,
    steps: [
      {
        label: "Conectou o cartão", caption: "Conectou o cartão no leitor: o Copiô abre sozinho e já mostra o que tem nele.",
        run: function (a) {
          return a.wait(500).then(function () { a.show("#sd"); return a.wait(1200); }).then(function () {
            a.$("#sd").classList.add("gone"); a.$("#wait").style.display = "none"; a.show("#card"); return a.wait(600);
          }).then(function () { return a.click("#card"); }).then(function () {
            a.$("#card").classList.add("sel"); a.$("#s2").classList.remove("off"); return a.wait(600);
          });
        }
      },
      {
        label: "Escolheu o que copiar", caption: "Fotos, vídeos e áudios separados por tipo e por data. Aqui, só o que foi gravado hoje.",
        run: function (a) {
          return a.click("#pToday").then(function () {
            a.$("#pAll").classList.remove("on"); a.$("#pToday").classList.add("on");
            return Promise.all([a.count("#nF", 326, 248, 700), a.count("#nV", 86, 64, 700), a.count("#nA", 6, 4, 700)]);
          }).then(function () {
            a.$("#sum").innerHTML = "<b>316 arquivos</b> · 54,8 GB · só de hoje";
            a.$("#s3").classList.remove("off"); return a.wait(900);
          });
        }
      },
      {
        label: "Disse quem captou", caption: "Cada arquivo leva a câmera e quem captou no nome. A câmera o Copiô reconhece sozinho.",
        run: function (a) {
          return a.click("#prof").then(function () {
            a.$("#prof").classList.add("f"); return a.type("#prof", "Sales", 9);
          }).then(function () {
            a.$("#prof").classList.remove("f");
            a.$("#pvp").textContent = "Sales/VIDEO/"; a.$("#pvn").textContent = "MVI_1000_CanonR6_Sales.MP4";
            a.$("#s4").classList.remove("off"); return a.wait(1200);
          });
        }
      },
      {
        label: "Escolheu o evento", caption: "Uma pasta por evento e, dentro dela, uma por profissional. Todos os cartões da mesma pessoa vão juntos.",
        run: function (a) {
          return a.click("#ev1").then(function () {
            a.$("#ev1").classList.add("sel");
            a.$("#dest").innerHTML = "<b>Casamento Ana e Leo</b>HD Externo › 2026 › Casamento Ana e Leo";
            a.$("#go").classList.add("ok"); return a.wait(800);
          });
        }
      },
      {
        label: "Backup conferido", caption: "Copia sem sobrescrever nada e relê cada arquivo comparando com o original. Só diz “completo” quando tudo bate.",
        run: function (a) {
          var k = 0;
          return a.click("#go").then(function () {
            a.show("#run");
            var tick = setInterval(function () { a.$("#now") && (a.$("#now").textContent = FILES[k++ % FILES.length]); }, 420);
            return Promise.all([
              a.count("#pct", 0, 100, 4400, function (n) { a.$("#bar").style.width = n + "%"; return Math.round(n) + "<small>%</small>"; }),
              a.count("#r1", 0, 316, 4400, function (n) { return Math.round(n) + " de 316"; }),
              a.count("#r2", 0, 316, 4600)
            ]).then(function () { clearInterval(tick); }, function (e) { clearInterval(tick); throw e; });
          }).then(function () {
            a.$("#pct").innerHTML = "100<small>%</small>";
            a.$("#now").innerHTML = "<b style=\"color:#17161A;font-family:system-ui;font-size:16px\">Backup completo. 316 arquivos conferidos.</b>";
            a.show("#badge"); return a.wait(3200);
          });
        }
      }
    ]
  };
})();
