/* Simulação do JXLmini encolhendo a pasta de um casamento. Classes com prefixo jx- para não colidir com a página. */
(function () {
  var LOGO = '<svg viewBox="0 0 120 120"><rect x="4" y="4" width="112" height="112" rx="30" fill="#F2B33D" stroke="#17161A" stroke-width="6"/><rect x="39" y="26" width="42" height="56" rx="6" fill="#FBF7EF" stroke="#17161A" stroke-width="5"/><rect x="45" y="32" width="30" height="31" rx="2.5" fill="#2F5FE0" stroke="#17161A" stroke-width="3"/><path d="M45 63l9-12 6 7 4-5 11 10z" fill="#17161A"/><circle cx="68" cy="39" r="3.4" fill="#FBF7EF"/><ellipse cx="54" cy="71" rx="2" ry="2.8" fill="#17161A"/><ellipse cx="66" cy="71" rx="2" ry="2.8" fill="#17161A"/><path d="M11 49h11v-8l11 14-11 14v-8H11z" fill="#E2452F" stroke="#17161A" stroke-width="3.5" stroke-linejoin="round"/><path d="M109 49H98v-8L87 55l11 14v-8h11z" fill="#E2452F" stroke="#17161A" stroke-width="3.5" stroke-linejoin="round"/></svg>';
  var FOTOS = [["IMG_2574.jpg", 4.6, .74], ["IMG_2581.jpg", 6.1, .88], ["IMG_9772.jpg", 7.3, .74], ["IMG_9871.jpg", 6.7, .84],
               ["IMG_3120.jpg", 5.2, .8], ["IMG_3187.jpg", 6.4, .86]];
  var css = '<style>' +
    '.jx{position:absolute;inset:0;background:#F1EADD;color:#17161A;font:13px Inter,system-ui,sans-serif}' +
    '.jx-top{height:28px;background:#e7e1d5;border-bottom:1px solid #cfc6b5;display:flex;align-items:center;gap:7px;padding:0 12px;font-size:12px;color:#5A554E}' +
    '.jx-top i{width:11px;height:11px;border-radius:50%;background:#e2584d;display:inline-block}.jx-top i+i{background:#e7b33d}.jx-top i+i+i{background:#4fbf5d}' +
    '.jx-top b{margin-left:8px;color:#17161A}' +
    '.jx-hd{position:absolute;left:18px;top:40px;display:flex;align-items:center;gap:10px}' +
    '.jx-hd svg{width:40px;height:40px;filter:drop-shadow(3px 3px 0 #17161A)}' +
    '.jx-hd b{font:800 26px "Bricolage Grotesque",system-ui;letter-spacing:-.04em}.jx-hd b span{color:#E2452F}' +
    '.jx-card{position:absolute;background:#FBF7EF;border:2.5px solid #17161A;border-radius:14px;box-shadow:4px 4px 0 #17161A;padding:12px}' +
    '#jx-left{left:18px;top:94px;width:420px;height:428px}#jx-right{left:456px;top:94px;width:486px;height:428px}' +
    '.jx-h{font:800 14px "Bricolage Grotesque",system-ui;display:flex;align-items:center;gap:7px;margin-bottom:9px}' +
    '.jx-h i{font-style:normal;width:22px;height:22px;border-radius:7px;border:2px solid #17161A;background:#F2B33D;display:grid;place-items:center;font-size:11px;transform:rotate(-6deg)}' +
    '.jx-drop{border:2.5px dashed #17161A;border-radius:11px;height:58px;display:grid;place-items:center;font-weight:700;font-size:12px;color:#5A554E;transition:.25s}' +
    '.jx-drop.hot{background:#FCE6B6;border-style:solid;color:#17161A}' +
    '.jx-fmts{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}' +
    '.jx-f{border:2.5px solid #17161A;border-radius:11px;background:#fff;padding:7px 9px;font-weight:800;font-size:12.5px;transition:.25s}.jx-f small{display:block;font-weight:500;font-size:10.5px;color:#5A554E}' +
    '.jx-f.on{background:#17161A;color:#F1EADD;box-shadow:3px 3px 0 var(--c)}.jx-f.on small{color:#CFC7B8}' +
    '.jx-pre{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px}' +
    '.jx-p{border:2.5px solid #17161A;border-radius:11px;background:#fff;padding:7px 8px;font-weight:800;font-size:12.5px;transition:.25s}.jx-p b{display:block;font:800 17px "Bricolage Grotesque",system-ui}' +
    '.jx-p.on{background:#FCE6B6;box-shadow:3px 3px 0 #17161A;transform:translate(-2px,-2px)}' +
    '.jx-go{position:absolute;left:12px;right:12px;bottom:12px;height:46px;border:2.5px solid #17161A;border-radius:13px;background:#E2452F;color:#fff;font:800 17px Inter,system-ui;display:grid;place-items:center;box-shadow:4px 4px 0 #17161A;transition:.12s}' +
    '.jx-go.press{transform:translate(4px,4px);box-shadow:0 0 0 #17161A}' +
    '.jx-row{display:grid;grid-template-columns:14px 1fr 120px 92px;gap:8px;align-items:center;height:0;opacity:0;overflow:hidden;border-bottom:1.5px solid #D8CEBC;transition:height .3s,opacity .3s;font-size:12.5px}' +
    '.jx-row.in{height:34px;opacity:1}' +
    '.jx-row .d{width:11px;height:11px;border-radius:50%;border:2px solid #17161A;background:#fff}.jx-row.ok .d{background:#2E9E5B}.jx-row.run .d{background:#F2B33D}' +
    '.jx-row .t{height:10px;border:2px solid #17161A;border-radius:99px;background:#fff;overflow:hidden}.jx-row .t i{display:block;height:100%;width:100%;background:#E2452F;transition:width .5s,background .3s}' +
    '.jx-row.ok .t i{background:#2E9E5B}.jx-row .s{text-align:right;color:#5A554E}.jx-row .s b{color:#17161A}' +
    '.jx-res{position:absolute;left:12px;right:12px;bottom:12px;display:flex;gap:10px;align-items:center;opacity:0;transform:translateY(10px);transition:.4s}' +
    '.jx-res.in{opacity:1;transform:none}.jx-box{border:2.5px solid #17161A;border-radius:11px;background:#fff;padding:6px 12px}.jx-box small{display:block;font-size:10px;font-weight:800;color:#5A554E}.jx-box b{font:800 20px "Bricolage Grotesque",system-ui}' +
    '.jx-box.g{background:#C9EBD6}.jx-badge{margin-left:auto;width:78px;height:78px;border-radius:50%;background:#E2452F;color:#fff;border:2.5px solid #17161A;box-shadow:3px 3px 0 #17161A;display:grid;place-items:center;font:800 22px "Bricolage Grotesque",system-ui;transform:rotate(-8deg)}' +
    '.jx-cmp{position:absolute;inset:40px 30px 30px;background:#2A2826;border:2.5px solid #17161A;border-radius:14px;box-shadow:6px 6px 0 #17161A;opacity:0;transform:scale(.95);transition:.35s;overflow:hidden}.jx-cmp.in{opacity:1;transform:none}' +
    '.jx-im{position:absolute;inset:0;background:linear-gradient(#5f86e8,#2F5FE0)}.jx-im svg{position:absolute;left:0;bottom:0;width:100%;height:62%}.jx-im b{position:absolute;right:18%;top:14%;width:70px;height:70px;border-radius:50%;background:#F1EADD}' +
    '.jx-top2{clip-path:inset(0 0 0 50%);transition:clip-path 1.6s ease-in-out}.jx-hand{position:absolute;top:0;bottom:0;left:50%;border-left:3px solid #fff;transition:left 1.6s ease-in-out}' +
    '.jx-lab{position:absolute;top:12px;background:#17161A;color:#fff;border:2px solid #fff;border-radius:99px;padding:2px 11px;font-weight:800;font-size:12px}' +
    '.jx-toast{position:absolute;left:50%;bottom:24px;transform:translate(-50%,40px);opacity:0;background:#17161A;color:#F1EADD;border-radius:12px;padding:9px 16px;font-weight:800;box-shadow:4px 4px 0 #E2452F;transition:.4s}.jx-toast.in{opacity:1;transform:translate(-50%,0)}' +
    '</style>';
  var MTN = '<svg viewBox="0 0 100 60" preserveAspectRatio="none"><path d="M0 60L30 14l20 24 14-16 36 38z" fill="#17161A"/></svg>';
  var rows = FOTOS.map(function (f, i) {
    return '<div class="jx-row" id="jx-r' + i + '"><span class="d"></span><span>' + f[0] + '</span><span class="t"><i></i></span><span class="s">' + f[1].toFixed(1).replace(".", ",") + ' MB</span></div>';
  }).join("");
  var html = css + '<div class="jx"><div class="jx-top"><i></i><i></i><i></i><b>JXLmini</b></div>' +
    '<div class="jx-hd">' + LOGO + '<b>JXL<span>mini</span></b></div>' +
    '<div class="jx-card" id="jx-left"><div class="jx-h"><i>1</i>Quais fotos?</div><div class="jx-drop" id="jx-drop">Solte aqui a pasta da entrega</div>' +
    '<div class="jx-h" style="margin-top:14px"><i style="background:#2F5FE0;color:#fff">2</i>Quanto encolher?</div>' +
    '<div class="jx-fmts"><div class="jx-f on" id="jx-fx" style="--c:#2F5FE0">JPEG XL<small>o formato novo</small></div><div class="jx-f" id="jx-fj" style="--c:#E2452F">JPEG mais leve<small>abre em tudo</small></div></div>' +
    '<div class="jx-pre"><div class="jx-p">Idêntica<b>−18%</b></div><div class="jx-p on">Mini<b>−75%</b></div><div class="jx-p">Micro<b>−87%</b></div></div>' +
    '<div class="jx-go" id="jx-go">Encolher!</div></div>' +
    '<div class="jx-card" id="jx-right"><div class="jx-h"><i style="background:#E2452F;color:#fff">3</i><span id="jx-st">Esperando a pasta</span></div>' + rows +
    '<div class="jx-res" id="jx-res"><div class="jx-box"><small>ANTES</small><b>36,3 MB</b></div><b>→</b><div class="jx-box g"><small>DEPOIS</small><b id="jx-after">8,5 MB</b></div><div class="jx-badge" id="jx-pct">−77%</div></div></div>' +
    '<div class="jx-cmp" id="jx-cmp"><div class="jx-im"><b></b>' + MTN + '</div><div class="jx-im jx-top2" id="jx-top2"><b></b>' + MTN + '</div><div class="jx-hand" id="jx-hand"></div>' +
    '<span class="jx-lab" style="left:12px">JPEG original · 7,3 MB</span><span class="jx-lab" style="right:12px;background:#2E9E5B">JXL · 1,9 MB</span></div>' +
    '<div class="jx-toast" id="jx-toast"></div></div>';

  function reset(a) {
    FOTOS.forEach(function (f, i) { var r = a.$("#jx-r" + i); r.className = "jx-row"; r.querySelector("i").style.width = "100%"; r.querySelector(".s").innerHTML = f[1].toFixed(1).replace(".", ",") + " MB"; });
    a.hide("#jx-res"); a.hide("#jx-cmp"); a.hide("#jx-toast");
    a.$("#jx-st").textContent = "Esperando a pasta";
    a.$("#jx-fx").classList.add("on"); a.$("#jx-fj").classList.remove("on");
  }
  function toast(a, t, ms) { var e = a.$("#jx-toast"); e.textContent = t; a.show("#jx-toast"); return a.wait(ms).then(function () { a.hide("#jx-toast"); }); }

  window.SIM = {
    title: "JXLmini · encolhendo a pasta de um casamento",
    html: html,
    reset: function (stage) {},
    steps: [
      {
        label: "Solte a pasta", caption: "Arraste a pasta da entrega (pode ser o casamento inteiro: as subpastas vêm junto).",
        run: function (a) {
          reset(a);
          return a.drag("#jx-drop", "#jx-drop", '<div style="background:#fff;border:2px solid #17161A;border-radius:8px;padding:4px 9px;font-weight:700;font-size:12px">📁 Casamento Ana &amp; Leo</div>')
            .then(function () { a.$("#jx-drop").classList.add("hot"); return a.wait(300); })
            .then(function () {
              a.$("#jx-drop").classList.remove("hot");
              var p = Promise.resolve();
              FOTOS.forEach(function (f, i) { p = p.then(function () { a.show("#jx-r" + i); return a.wait(140); }); });
              return p;
            }).then(function () { a.$("#jx-st").textContent = "6 fotos · 36,3 MB"; return a.wait(600); });
        }
      },
      {
        label: "Escolha o formato", caption: "JPEG XL fica bem mais leve. JPEG mais leve continua .jpg e abre em qualquer celular. O modo Mini é o recomendado.",
        run: function (a) {
          return a.click("#jx-fj").then(function () { a.$("#jx-fj").classList.add("on"); a.$("#jx-fx").classList.remove("on"); return a.wait(700); })
            .then(function () { return a.click("#jx-fx"); })
            .then(function () { a.$("#jx-fx").classList.add("on"); a.$("#jx-fj").classList.remove("on"); return a.wait(700); });
        }
      },
      {
        label: "Encolher!", caption: "Cada foto é recomprimida no ponto em que o olho não vê diferença. Data, câmera e perfil de cor vão junto.",
        run: function (a) {
          return a.click("#jx-go").then(function () {
            a.$("#jx-go").classList.add("press"); return a.wait(150);
          }).then(function () {
            a.$("#jx-go").classList.remove("press"); a.$("#jx-st").textContent = "Encolhendo…";
            var p = Promise.resolve();
            FOTOS.forEach(function (f, i) {
              p = p.then(function () {
                var r = a.$("#jx-r" + i); r.classList.add("run");
                return a.wait(260).then(function () {
                  var after = f[1] * (1 - f[2]);
                  r.classList.remove("run"); r.classList.add("ok");
                  r.querySelector("i").style.width = Math.round((1 - f[2]) * 100) + "%";
                  r.querySelector(".s").innerHTML = f[1].toFixed(1).replace(".", ",") + " → <b>" + after.toFixed(1).replace(".", ",") + " MB</b>";
                });
              });
            });
            return p;
          }).then(function () { a.$("#jx-st").textContent = "Prontinho!"; a.show("#jx-res"); return toast(a, "🎉 27,8 MB a menos", 1600); });
        }
      },
      {
        label: "Compare", caption: "Arraste a barra e compare o original com a versão leve, inteira ou com zoom. Se não notar diferença, era essa a ideia.",
        run: function (a) {
          a.show("#jx-cmp"); var t = a.$("#jx-top2"), h = a.$("#jx-hand");
          return a.wait(500).then(function () { t.style.clipPath = "inset(0 0 0 15%)"; h.style.left = "15%"; return a.wait(1700); })
            .then(function () { t.style.clipPath = "inset(0 0 0 85%)"; h.style.left = "85%"; return a.wait(1700); })
            .then(function () { t.style.clipPath = "inset(0 0 0 50%)"; h.style.left = "50%"; return a.wait(1800); });
        }
      }
    ]
  };
})();
