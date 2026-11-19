/* Simulação do Maestrô separando uma música. Classes com prefixo mo- para não colidir com a página. */
(function () {
  var LOGO = '<svg viewBox="60 60 870 870"><rect x="82" y="82" width="824" height="824" rx="190" fill="#E2452F" stroke="#17161A" stroke-width="36"/><g fill="none" stroke-linecap="round"><path d="M560 470c40-40 80 40 120 0s80 40 120 0" stroke="#17161A" stroke-width="64"/><path d="M560 470c40-40 80 40 120 0s80 40 120 0" stroke="#F2B33D" stroke-width="30"/><path d="M560 590c40-40 80 40 120 0s80 40 120 0" stroke="#17161A" stroke-width="64"/><path d="M560 590c40-40 80 40 120 0s80 40 120 0" stroke="#2F5FE0" stroke-width="30"/><path d="M560 710c40-40 80 40 120 0s80 40 120 0" stroke="#17161A" stroke-width="64"/><path d="M560 710c40-40 80 40 120 0s80 40 120 0" stroke="#FBF7EF" stroke-width="30"/></g><path d="M478 268L742 176" stroke="#17161A" stroke-width="30" stroke-linecap="round"/><circle cx="752" cy="172" r="26" fill="#FBF7EF" stroke="#17161A" stroke-width="20"/><path d="M470 660V250" stroke="#17161A" stroke-width="44" stroke-linecap="round"/><ellipse cx="350" cy="680" rx="150" ry="118" transform="rotate(-18 350 680)" fill="#FBF7EF" stroke="#17161A" stroke-width="36"/><ellipse cx="304" cy="676" rx="17" ry="24" fill="#17161A"/><ellipse cx="392" cy="652" rx="17" ry="24" fill="#17161A"/><path d="M318 728q40 26 84-10" fill="none" stroke="#17161A" stroke-width="18" stroke-linecap="round"/><g stroke="#17161A" stroke-width="18" stroke-linejoin="round" fill="#F2B33D"><path d="M374 812l-74-38v88z"/><path d="M374 812l74-38v88z"/><circle cx="374" cy="812" r="22"/></g></svg>';
  var TR = [["vocals", "Voz", "#E2452F", 55, 40], ["drums", "Bateria", "#F2B33D", 62, 32], ["bass", "Baixo", "#2E9E5B", 45, 30], ["other", "Outros", "#9B6BDF", 50, 28]];
  var SV = [["vocals", "Voz", "#F8B4A8"], ["instrumental", "Instrumental", "#C4D2FA"], ["drums", "Bateria", "#FCE0A6"], ["bass", "Baixo", "#BFE6CE"], ["other", "Outros", "#DCCBF6"]];
  var seed = 7;
  function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  function wave(c, b, v) { var s = ""; for (var i = 0; i < 64; i++) s += '<span style="height:' + Math.max(8, Math.min(96, b + (rnd() * 2 - 1) * v)) + '%;background:' + c + '"></span>'; return s; }
  var css = '<style>' +
    '.mo{position:absolute;inset:0;background:#F1EADD;color:#17161A;font:13px Inter,system-ui,sans-serif}' +
    '.mo-top{height:28px;background:#e7e1d5;border-bottom:1px solid #cfc6b5;display:flex;align-items:center;gap:7px;padding:0 12px;font-size:12px;color:#5A554E}' +
    '.mo-top i{width:11px;height:11px;border-radius:50%;background:#e2584d;display:inline-block}.mo-top i+i{background:#e7b33d}.mo-top i+i+i{background:#4fbf5d}.mo-top b{margin-left:8px;color:#17161A}' +
    '.mo-hd{position:absolute;left:18px;top:40px;display:flex;align-items:center;gap:10px}' +
    '.mo-hd svg{width:40px;height:40px;filter:drop-shadow(3px 3px 0 #17161A)}' +
    '.mo-hd b{font:800 26px "Bricolage Grotesque",system-ui;letter-spacing:-.04em}.mo-hd b span{color:#E2452F}' +
    '.mo-card{position:absolute;background:#FBF7EF;border:2.5px solid #17161A;border-radius:14px;box-shadow:4px 4px 0 #17161A;padding:12px}' +
    '#mo-left{left:18px;top:94px;width:330px;height:428px}#mo-right{left:366px;top:94px;width:576px;height:428px}' +
    '.mo-h{font:800 14px "Bricolage Grotesque",system-ui;display:flex;align-items:center;gap:7px;margin-bottom:9px}' +
    '.mo-h i{font-style:normal;width:22px;height:22px;border-radius:7px;border:2px solid #17161A;background:#F2B33D;display:grid;place-items:center;font-size:11px;transform:rotate(-6deg)}' +
    '.mo-h i.b{background:#2F5FE0;color:#fff}.mo-h i.r{background:#E2452F;color:#fff}.mo-h i.g{background:#2E9E5B;color:#fff}' +
    '.mo-drop{border:2.5px dashed #17161A;border-radius:11px;height:62px;display:grid;place-items:center;font-weight:700;font-size:12px;color:#5A554E;transition:.25s}' +
    '.mo-drop.hot{background:#FCE6B6;border-style:solid;color:#17161A}' +
    '.mo-song{display:none;align-items:center;gap:10px;border:2.5px solid #17161A;border-radius:11px;background:#fff;padding:8px 10px;height:62px}.mo-song.in{display:flex}' +
    '.mo-disc{width:34px;height:34px;border-radius:50%;border:2.5px solid #17161A;background:radial-gradient(circle,#FBF7EF 0 18%,#17161A 19% 25%,#E2452F 26%)}.mo-song.run .mo-disc{animation:mospin 1.4s linear infinite}' +
    '@keyframes mospin{to{transform:rotate(360deg)}}' +
    '.mo-song b{display:block;font-size:13px}.mo-song small{color:#5A554E;font-size:11px}' +
    '.mo-ana{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}' +
    '.mo-selo{border:2.5px solid #17161A;border-radius:11px;padding:6px 10px;height:84px;position:relative}' +
    '.mo-selo small{font-size:10px;font-weight:900;letter-spacing:.08em}.mo-selo b{display:block;font:900 30px Inter,system-ui;letter-spacing:-.04em;line-height:1.1}.mo-selo em{font-style:normal;font-size:11px;color:#3C3832}' +
    '.mo-k{background:#D3DDFA}.mo-bpm{background:#FCE6B6}' +
    '.mo-met{position:absolute;right:8px;top:8px;width:26px;height:36px}.mo-met .p{transform-origin:13px 30px}.mo.beat .mo-met .p{animation:moswing .6s ease-in-out infinite alternate}' +
    '@keyframes moswing{from{transform:rotate(-24deg)}to{transform:rotate(24deg)}}' +
    '.mo-q{display:grid;gap:6px;margin-top:12px}.mo-qb{border:2.5px solid #17161A;border-radius:10px;background:#fff;padding:5px 9px;font-weight:800;font-size:12px;transition:.25s}.mo-qb small{display:block;font-weight:500;color:#5A554E;font-size:10.5px}' +
    '.mo-qb.on{background:#17161A;color:#F1EADD;box-shadow:3px 3px 0 #F2B33D}.mo-qb.on small{color:#CFC7B8}' +
    '.mo-go{margin-top:12px;background:#E2452F;color:#fff;border:2.5px solid #17161A;border-radius:12px;box-shadow:3px 3px 0 #17161A;font-weight:900;font-size:17px;text-align:center;padding:8px;transition:.12s}' +
    '.mo-go.press{transform:translate(3px,3px);box-shadow:0 0 0 #17161A}' +
    '.mo-empty{position:absolute;inset:44px 12px 12px;display:grid;place-items:center;color:#9B9486;font-weight:700;font-size:14px;border:2.5px dashed #D8CEBC;border-radius:11px}' +
    '.mo-run{position:absolute;left:12px;right:12px;top:44px;display:none}.mo-run.in{display:block}' +
    '.mo-fun{font:800 15px "Bricolage Grotesque",system-ui;margin-bottom:10px;height:20px}' +
    '.mo-lane{display:grid;grid-template-columns:78px 1fr;gap:8px;align-items:center;margin-bottom:8px;font-weight:800;font-size:12px}' +
    '.mo-eq{height:30px;border:2px solid #17161A;border-radius:8px;background:#fff;display:flex;align-items:flex-end;gap:3px;padding:3px 5px;overflow:hidden}' +
    '.mo-eq span{flex:1;border-radius:2px;height:20%;opacity:.25;animation:moeq .8s ease-in-out infinite alternate}.mo-eq span.lit{opacity:1}' +
    '@keyframes moeq{to{height:92%}}' +
    '.mo-bar{height:16px;border:2.5px solid #17161A;border-radius:99px;background:#fff;overflow:hidden;margin-top:12px}.mo-bar i{display:block;height:100%;width:0;background:repeating-linear-gradient(-45deg,#E2452F 0 8px,#EC6A55 8px 16px);transition:width .3s}' +
    '.mo-mix{position:absolute;left:12px;right:12px;top:44px;display:none;border:2.5px solid #17161A;border-radius:11px;background:#fff;overflow:hidden}.mo-mix.in{display:block}' +
    '.mo-tp{background:#17161A;color:#F1EADD;display:flex;align-items:center;gap:10px;padding:6px 10px}' +
    '.mo-play{width:30px;height:30px;border-radius:50%;background:#E2452F;border:2px solid #F1EADD;display:grid;place-items:center}.mo-play svg{width:12px;height:12px;fill:#fff}' +
    '.mo-tp b{font:700 12px ui-monospace,Menlo,monospace;color:#F2B33D}.mo-tp .sp{flex:1}' +
    '.mo-kb{border:2px solid #17161A;background:#FBF7EF;color:#17161A;border-radius:8px;font-weight:800;font-size:11px;padding:2px 8px;transition:.2s}.mo-kb.on{background:#F2B33D}' +
    '.mo-trk{display:grid;grid-template-columns:118px 1fr;border-top:1.5px solid #D8CEBC;height:38px}' +
    '.mo-trk .hd{display:flex;align-items:center;gap:5px;padding:0 8px;background:#FBF7EF;border-right:1.5px solid #D8CEBC;font-weight:900;font-size:12px}' +
    '.mo-trk .hd i{width:10px;height:10px;border-radius:3px;border:2px solid #17161A;flex-shrink:0}.mo-trk .hd .nm{flex:1}' +
    '.mo-ms{width:20px;height:18px;border:1.8px solid #17161A;border-radius:5px;font-size:9.5px;font-weight:900;display:grid;place-items:center;background:#fff;transition:.2s}' +
    '.mo-ms.m.on{background:#E2452F;color:#fff}.mo-ms.s.on{background:#F2B33D}' +
    '.mo-wv{display:flex;align-items:center;gap:2px;padding:0 6px;position:relative;transition:opacity .3s}.mo-wv span{flex:1;border-radius:1.5px;opacity:.55}' +
    '.mo-trk.off .mo-wv{opacity:.2}' +
    '.mo-ph{position:absolute;top:0;bottom:0;width:2px;background:#17161A;left:6px;transition:left .1s linear}' +
    '.mo-save{position:absolute;left:12px;right:12px;bottom:12px;display:none}.mo-save.in{display:block}' +
    '.mo-tiles{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}' +
    '.mo-t{border:2.5px solid #17161A;border-radius:10px;background:#fff;padding:5px 7px;font-weight:900;font-size:11.5px;position:relative;transition:.25s}' +
    '.mo-t:after{content:"";position:absolute;right:5px;top:5px;width:11px;height:11px;border-radius:50%;border:2px solid #17161A;background:#fff}' +
    '.mo-t.on{box-shadow:3px 3px 0 #17161A;transform:translate(-1px,-1px)}.mo-t.on:after{background:#17161A}' +
    '.mo-sv{display:flex;align-items:center;gap:10px;margin-top:8px}.mo-svb{background:#E2452F;color:#fff;border:2.5px solid #17161A;border-radius:11px;box-shadow:3px 3px 0 #17161A;font-weight:900;font-size:14px;padding:6px 14px;transition:.12s}' +
    '.mo-svb.press{transform:translate(3px,3px);box-shadow:none}.mo-sv small{color:#5A554E;font-size:11px}' +
    '.mo-toast{position:absolute;left:50%;top:44px;transform:translateX(-50%) translateY(20px);background:#17161A;color:#F1EADD;border-radius:12px;padding:9px 16px;font-weight:800;font-size:14px;box-shadow:4px 4px 0 #E2452F;opacity:0;transition:.35s;white-space:nowrap;z-index:5}' +
    '.mo-toast.in{opacity:1;transform:translateX(-50%) translateY(0)}' +
    '</style>';

  var lanes = "", trks = "", tiles = "";
  TR.forEach(function (t) {
    var eq = ""; for (var i = 0; i < 30; i++) eq += '<span style="background:' + t[2] + ';animation-delay:-' + (rnd()).toFixed(2) + 's;animation-duration:' + (.5 + rnd() * .6).toFixed(2) + 's"></span>';
    lanes += '<div class="mo-lane"><span>' + t[1] + '</span><div class="mo-eq">' + eq + '</div></div>';
    trks += '<div class="mo-trk" id="mo-t-' + t[0] + '"><div class="hd"><i style="background:' + t[2] + '"></i><span class="nm">' + t[1] + '</span><span class="mo-ms m">M</span><span class="mo-ms s">S</span></div><div class="mo-wv">' + wave(t[2], t[3], t[4]) + '<span class="mo-ph"></span></div></div>';
  });
  SV.forEach(function (s) { tiles += '<div class="mo-t" id="mo-s-' + s[0] + '" style="--c:' + s[2] + '">' + s[1] + '</div>'; });

  var html = css + '<div class="mo">' +
    '<div class="mo-top"><i></i><i></i><i></i><b>Maestrô</b></div>' +
    '<div class="mo-hd">' + LOGO + '<b>Maestr<span>ô</span></b></div>' +
    '<div class="mo-card" id="mo-left"><div class="mo-h"><i>1</i>Qual música?</div>' +
    '<div class="mo-drop" id="mo-drop">Solte a música aqui</div>' +
    '<div class="mo-song" id="mo-song"><div class="mo-disc"></div><div><b>Nossa Música.mp3</b><small>4:12 · 9,8 MB</small></div></div>' +
    '<div class="mo-ana"><div class="mo-selo mo-k"><small>TOM</small><b id="mo-key">—</b><em id="mo-keys"></em></div>' +
    '<div class="mo-selo mo-bpm"><small>BPM</small><b id="mo-bpmv">—</b><em id="mo-bpms"></em><svg class="mo-met" viewBox="0 0 26 36"><path d="M6 34h14L16 3h-6z" fill="#FBF7EF" stroke="#17161A" stroke-width="2"/><g class="p"><path d="M13 30V7" stroke="#17161A" stroke-width="2"/><rect x="9" y="11" width="8" height="6" rx="1.5" fill="#E2452F" stroke="#17161A" stroke-width="1.6"/></g></svg></div></div>' +
    '<div class="mo-h" style="margin-top:14px"><i class="b">2</i>Separar tudo</div>' +
    '<div class="mo-q"><div class="mo-qb on" id="mo-q1">⚡ Rápida<small>voz, bateria, baixo e outros</small></div><div class="mo-qb" id="mo-q3">🎸 Com guitarra e piano<small>6 faixas</small></div></div>' +
    '<div class="mo-go" id="mo-go">Separar!</div></div>' +
    '<div class="mo-card" id="mo-right"><div class="mo-h"><i class="r">3</i><span id="mo-rt">Ouça como ficou</span></div>' +
    '<div class="mo-empty" id="mo-empty">as faixas aparecem aqui</div>' +
    '<div class="mo-run" id="mo-run"><div class="mo-fun" id="mo-fun"></div>' + lanes + '<div class="mo-bar"><i id="mo-pb"></i></div></div>' +
    '<div class="mo-mix" id="mo-mix"><div class="mo-tp"><span class="mo-play"><svg viewBox="0 0 12 12" id="mo-pi"><path d="M2 1l9 5-9 5z"/></svg></span><b id="mo-tm">0:00 / 4:12</b><span class="sp"></span><span class="mo-kb" id="mo-kara">Sem a voz</span><span class="mo-kb" id="mo-all">Todas</span></div>' + trks + '</div>' +
    '<div class="mo-save" id="mo-save"><div class="mo-h" style="margin-bottom:6px"><i class="g">4</i>O que você quer salvar?</div><div class="mo-tiles">' + tiles + '</div>' +
    '<div class="mo-sv"><span class="mo-svb" id="mo-svb">Salvar</span><small id="mo-svs">marque as faixas</small></div></div>' +
    '</div><div class="mo-toast" id="mo-toast"></div></div>';

  var FUN = ["Tirando o vocalista do palco…", "Convencendo o baterista a tocar sozinho…", "Procurando o baixo…", "Afinando os violinos…"];
  var playT = null;

  function stopPlay() { if (playT) { clearInterval(playT); playT = null; } }
  function reset(a) {
    stopPlay();
    a.$(".mo").classList.remove("beat");
    a.$("#mo-drop").style.display = ""; a.$("#mo-drop").classList.remove("hot"); a.hide("#mo-song"); a.$("#mo-song").classList.remove("run");
    a.$("#mo-key").textContent = "—"; a.$("#mo-keys").textContent = ""; a.$("#mo-bpmv").textContent = "—"; a.$("#mo-bpms").textContent = "";
    a.$("#mo-empty").style.display = ""; a.hide("#mo-run"); a.hide("#mo-mix"); a.hide("#mo-save"); a.hide("#mo-toast");
    a.$("#mo-pb").style.width = "0"; a.$("#mo-rt").textContent = "Ouça como ficou";
    a.$$(".mo-eq span").forEach(function (s) { s.classList.remove("lit"); });
    a.$$(".mo-trk").forEach(function (t) { t.classList.remove("off"); t.querySelector(".m").classList.remove("on"); t.querySelector(".s").classList.remove("on"); });
    a.$$(".mo-t").forEach(function (t) { t.classList.remove("on"); t.style.background = "#fff"; });
    a.$("#mo-kara").classList.remove("on");
    a.$("#mo-svs").textContent = "marque as faixas";
    a.$$(".mo-ph").forEach(function (p) { p.style.left = "6px"; });
  }
  function toast(a, t, ms) { var e = a.$("#mo-toast"); e.textContent = t; a.show("#mo-toast"); return a.wait(ms).then(function () { a.hide("#mo-toast"); }); }
  function mute(a, id, m) { var t = a.$("#mo-t-" + id); t.querySelector(".m").classList.toggle("on", m); t.classList.toggle("off", m); }
  function play(a) {
    if (a.fast) return;
    stopPlay(); var x = 0;
    a.$("#mo-pi").innerHTML = '<path d="M2 1h3v10H2zM7 1h3v10H7z"/>';
    playT = setInterval(function () {
      x = (x + 0.6) % 100;
      a.$$(".mo-ph").forEach(function (p) { p.style.left = "calc(6px + " + x + "% * .96)"; });
      var s = Math.round(x / 100 * 252); a.$("#mo-tm").textContent = Math.floor(s / 60) + ":" + ("0" + s % 60).slice(-2) + " / 4:12";
    }, 60);
  }
  function tile(a, id, on) { var t = a.$("#mo-s-" + id); t.classList.toggle("on", on); t.style.background = on ? t.style.getPropertyValue("--c") : "#fff"; }

  window.SIM = {
    title: "Maestrô · separando uma música",
    html: html,
    reset: function () {},
    steps: [
      {
        label: "Solte a música", caption: "Arraste a música (ou um vídeo). Na hora ele mostra o tom, com a relativa, e o BPM.",
        run: function (a) {
          reset(a);
          return a.drag("#mo-drop", "#mo-drop", '<div style="background:#fff;border:2px solid #17161A;border-radius:8px;padding:4px 9px;font-weight:700;font-size:12px">🎵 Nossa Música.mp3</div>')
            .then(function () { a.$("#mo-drop").classList.add("hot"); return a.wait(250); })
            .then(function () { a.$("#mo-drop").style.display = "none"; a.show("#mo-song"); return a.wait(500); })
            .then(function () { a.$("#mo-key").textContent = "Am"; a.$("#mo-keys").textContent = "Lá menor · relativa Dó"; return a.count("#mo-bpmv", 60, 100, 700); })
            .then(function () { a.$("#mo-bpms").textContent = "meio tempo: 50"; a.$(".mo").classList.add("beat"); return a.wait(900); });
        }
      },
      {
        label: "Separar tudo", caption: "Sem escolher nada antes: ele separa todas as faixas de uma vez. A rápida já fica ótima; com guitarra e piano saem 6 faixas.",
        run: function (a) {
          return a.click("#mo-go").then(function () {
            a.$("#mo-go").classList.add("press"); return a.wait(140);
          }).then(function () {
            a.$("#mo-go").classList.remove("press"); a.$("#mo-empty").style.display = "none"; a.show("#mo-run"); a.$("#mo-song").classList.add("run");
            a.$("#mo-rt").textContent = "A orquestra está tocando";
            var p = Promise.resolve(), spans = a.$$(".mo-eq"), k = 0;
            for (var i = 1; i <= 10; i++) (function (i) {
              p = p.then(function () {
                if (i % 3 === 1) a.$("#mo-fun").textContent = FUN[k++ % FUN.length];
                a.$("#mo-pb").style.width = (i * 10) + "%";
                spans.forEach(function (eq) { var s = eq.children, lit = Math.round(i / 10 * s.length); for (var j = 0; j < s.length; j++) s[j].classList.toggle("lit", j < lit); });
                return a.wait(330);
              });
            })(i);
            return p;
          }).then(function () { a.$("#mo-song").classList.remove("run"); return toast(a, "🎉 4 faixas separadas!", 1200); });
        }
      },
      {
        label: "Ouça como ficou", caption: "Uma mesa de som com cada faixa. M cala, S deixa só ela, e “Sem a voz” vira karaokê na hora.",
        run: function (a) {
          a.hide("#mo-run"); a.show("#mo-mix"); a.$("#mo-rt").textContent = "Ouça como ficou";
          play(a);
          return a.wait(900).then(function () { return a.click("#mo-t-vocals .s"); })
            .then(function () { a.$("#mo-t-vocals .s").classList.add("on"); ["drums", "bass", "other"].forEach(function (id) { a.$("#mo-t-" + id).classList.add("off"); }); return a.wait(1300); })
            .then(function () { return a.click("#mo-t-vocals .s"); })
            .then(function () { a.$("#mo-t-vocals .s").classList.remove("on"); ["drums", "bass", "other"].forEach(function (id) { a.$("#mo-t-" + id).classList.remove("off"); }); return a.click("#mo-kara"); })
            .then(function () { a.$("#mo-kara").classList.add("on"); mute(a, "vocals", true); return a.wait(1500); });
        }
      },
      {
        label: "Escolha e salve", caption: "Marque o que quer: cada instrumento separado ou só o instrumental num arquivo. No Premiere e no DaVinci, as faixas entram na timeline alinhadas ao clipe.",
        run: function (a) {
          a.show("#mo-save");
          return a.wait(300).then(function () { return a.click("#mo-s-instrumental"); })
            .then(function () { tile(a, "instrumental", true); a.$("#mo-svs").textContent = "1 faixa · WAV"; return a.click("#mo-s-drums"); })
            .then(function () { tile(a, "drums", true); a.$("#mo-svs").textContent = "2 faixas · WAV"; return a.click("#mo-svb"); })
            .then(function () { a.$("#mo-svb").classList.add("press"); return a.wait(150); })
            .then(function () { a.$("#mo-svb").classList.remove("press"); stopPlay(); return toast(a, "✓ 2 faixas salvas em “Stems - Nossa Música”", 2000); });
        }
      }
    ]
  };
})();
