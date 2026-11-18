/* Motor das simulações dos apps (Copiô, Baixô, Sync Box).
   Cada página define window.SIM = { title, html, reset(stage), steps:[{label, caption, run: async a => {}}] }
   e tem <div data-sim></div> onde a simulação é montada. */
(function () {
  var W = 960, H = 540;
  var CURSOR = '<svg viewBox="0 0 26 30" aria-hidden="true"><path d="M3 2l19 16-9 1.6 5.4 8.6-3.6 2-5.2-8.8L3 25z" fill="#fff" stroke="#17161A" stroke-width="2.4" stroke-linejoin="round"/></svg>';
  var PLAY = '<svg viewBox="0 0 12 12"><path d="M2 1l9 5-9 5z" fill="currentColor"/></svg>';
  var PAUSE = '<svg viewBox="0 0 12 12"><path d="M2 1h3v10H2zM7 1h3v10H7z" fill="currentColor"/></svg>';

  function Cancel() {}

  function mount(host, S) {
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    host.classList.add("sim");
    host.innerHTML =
      '<div class="sim-frame"><div class="sim-bar"><i></i><i></i><i></i><span></span>' +
      '<button type="button" class="sim-pp"></button></div>' +
      '<div class="sim-view"><div class="sim-stage" role="img"></div></div></div>' +
      '<ol class="sim-steps"></ol><p class="sim-cap" aria-live="polite"></p>';
    var view = host.querySelector(".sim-view"), stage = host.querySelector(".sim-stage");
    var bar = host.querySelector(".sim-bar span"), pp = host.querySelector(".sim-pp");
    var list = host.querySelector(".sim-steps"), cap = host.querySelector(".sim-cap");
    bar.textContent = S.title;
    stage.setAttribute("aria-label", "Simulação animada: " + S.title);

    S.steps.forEach(function (st, i) {
      var li = document.createElement("li");
      li.innerHTML = '<button type="button"><b>' + (i + 1) + "</b>" + st.label + "</button>";
      li.firstChild.onclick = function () { start(i, true); };
      list.appendChild(li);
    });
    var chips = list.querySelectorAll("button");

    // escala o palco 960x540 para a largura disponível
    function fit() {
      var s = view.clientWidth / W;
      stage.style.transform = "scale(" + s + ")";
      view.style.height = Math.round(H * s) + "px";
    }
    fit();
    if (window.ResizeObserver) new ResizeObserver(fit).observe(view); else window.addEventListener("resize", fit);

    var token = 0, playing = false, visible = false, current = 0, cursor, cx = 700, cy = 420;

    function build() {
      stage.innerHTML = S.html + '<div class="sim-cursor">' + CURSOR + "</div>";
      cursor = stage.querySelector(".sim-cursor");
      placeCursor(cx, cy, true);
      if (S.reset) S.reset(stage);
    }
    function placeCursor(x, y, instant) {
      cx = x; cy = y;
      if (instant) cursor.style.transition = "none";
      cursor.style.transform = "translate(" + x + "px," + y + "px)";
      if (instant) { cursor.offsetWidth; cursor.style.transition = ""; }
    }
    function rel(el) { // centro do elemento em coordenadas do palco (sem escala)
      var s = view.clientWidth / W, r = el.getBoundingClientRect(), b = stage.getBoundingClientRect();
      return { x: (r.left - b.left + r.width / 2) / s, y: (r.top - b.top + r.height / 2) / s };
    }

    function api(my, fast) {
      function alive() { if (my !== token) throw new Cancel(); }
      var a = {
        fast: fast,
        stage: stage,
        $: function (sel) { return typeof sel === "string" ? stage.querySelector(sel) : sel; },
        $$: function (sel) { return stage.querySelectorAll(sel); },
        wait: function (ms) {
          alive();
          if (fast) return Promise.resolve();
          return new Promise(function (ok, no) {
            var t0 = Date.now();
            (function tick() {
              if (my !== token) return no(new Cancel());
              if (!playing) { t0 = Date.now() - (tick.el || 0); return setTimeout(tick, 120); }
              tick.el = Date.now() - t0;
              if (tick.el >= ms) return ok();
              setTimeout(tick, Math.min(60, ms - tick.el));
            })();
          });
        },
        move: function (sel, dx, dy, ms) {
          alive();
          var el = a.$(sel); if (!el) return Promise.resolve();
          var p = rel(el), x = p.x + (dx || 0), y = p.y + (dy || 0);
          if (fast) { placeCursor(x, y, true); return Promise.resolve(); }
          var d = Math.hypot(x - cx, y - cy), t = ms || Math.max(380, Math.min(900, d * 1.3));
          cursor.style.transitionDuration = t + "ms";
          placeCursor(x, y);
          return a.wait(t + 60);
        },
        click: function (sel, dx, dy) {
          return a.move(sel, dx, dy).then(function () {
            alive();
            var el = a.$(sel);
            if (fast) return;
            cursor.classList.remove("press"); cursor.offsetWidth; cursor.classList.add("press");
            if (el) { el.classList.add("sim-pressed"); setTimeout(function () { el.classList.remove("sim-pressed"); }, 220); }
            return a.wait(260);
          });
        },
        grab: function (on) { cursor.classList.toggle("grab", !!on); },
        // arrasta um "fantasma" do elemento até o destino
        drag: function (sel, target, ghostHTML) {
          var el = a.$(sel), ghost;
          return a.move(el).then(function () {
            alive();
            ghost = document.createElement("div");
            ghost.className = "sim-ghost";
            ghost.innerHTML = ghostHTML || el.outerHTML;
            cursor.appendChild(ghost);
            a.grab(true);
            return a.move(target, 0, 0, 1100);
          }).then(function () {
            if (ghost) ghost.remove();
            a.grab(false);
          });
        },
        type: function (sel, text, cps) {
          var el = a.$(sel), i = 0, prop = "value" in el && el.tagName === "INPUT" ? "value" : "textContent";
          if (fast) { el[prop] = text; return Promise.resolve(); }
          el[prop] = "";
          return (function next() {
            if (i >= text.length) return Promise.resolve();
            el[prop] += text.charAt(i++);
            return a.wait(1000 / (cps || 16)).then(next);
          })();
        },
        // conta um número de "from" até "to" num elemento
        count: function (sel, from, to, ms, fmt) {
          var el = a.$(sel); fmt = fmt || function (n) { return Math.round(n); };
          if (fast) { el.innerHTML = fmt(to); return Promise.resolve(); }
          var steps = Math.max(1, Math.round((ms || 1000) / 50)), k = 0;
          return (function next() {
            k++;
            el.innerHTML = fmt(from + (to - from) * Math.min(1, k / steps));
            if (k >= steps) return Promise.resolve();
            return a.wait(50).then(next);
          })();
        },
        show: function (sel) { var e = a.$(sel); if (e) e.classList.add("in"); },
        hide: function (sel) { var e = a.$(sel); if (e) e.classList.remove("in"); }
      };
      return a;
    }

    function mark(i) {
      current = i;
      chips.forEach(function (c, k) { c.classList.toggle("on", k === i); c.classList.toggle("done", k < i); });
      if (list.scrollWidth > list.clientWidth) list.scrollTo({ left: chips[i].offsetLeft - 16, behavior: "smooth" });
      cap.innerHTML = "<b>" + (i + 1) + ". " + S.steps[i].label + "</b> · " + S.steps[i].caption;
    }

    function start(from, user) {
      var my = ++token;
      if (user && !reduce) setPlaying(true);
      build();
      stage.classList.add("fast");
      var a = api(my, true), p = Promise.resolve();
      for (var i = 0; i < from; i++) (function (st) { p = p.then(function () { return st.run(a); }); })(S.steps[i]);
      p.then(function () {
        stage.offsetWidth; stage.classList.remove("fast");
        if (reduce) { // sem animação: mostra o resultado do passo escolhido
          stage.classList.add("fast");
          mark(from);
          return S.steps[from].run(api(my, true));
        }
        var b = api(my, false), q = Promise.resolve();
        S.steps.forEach(function (st, k) {
          if (k < from) return;
          q = q.then(function () { mark(k); return st.run(b); }).then(function () { return b.wait(900); });
        });
        return q.then(function () { return b.wait(2600); }).then(function () { if (my === token) start(0); });
      }).catch(function (e) { if (!(e instanceof Cancel)) console.error(e); });
    }

    function setPlaying(v) {
      playing = v && visible;
      pp.innerHTML = (v ? PAUSE + "Pausar" : PLAY + "Assistir");
      pp.setAttribute("aria-pressed", v ? "true" : "false");
      pp.dataset.want = v ? "1" : "";
    }
    pp.onclick = function () {
      if (reduce) { start((current + 1) % S.steps.length, true); return; }
      setPlaying(!pp.dataset.want);
    };

    // só anda quando está na tela
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        setPlaying(!!pp.dataset.want);
      }, { threshold: 0.35 }).observe(view);
    } else visible = true;

    setPlaying(!reduce);
    if (reduce) { pp.innerHTML = PLAY + "Próximo passo"; start(S.steps.length - 1); } else start(0);
  }

  function boot() {
    var host = document.querySelector("[data-sim]");
    if (host && window.SIM) mount(host, window.SIM);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
