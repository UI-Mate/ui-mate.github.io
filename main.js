/* ============================================================
   UI-Mate project page — interactions
   ============================================================ */
(function () {
  "use strict";

  var I18N = window.UIMATE_I18N;
  var DEMOS = window.UIMATE_DEMOS || [];
  var CHART = window.UIMATE_CHART || [];
  var STORE_KEY = "uimate.lang";

  var TITLES = {
    en: "UI-Mate: Advancing Foundation GUI Agents with In-Context Demonstrations",
    zh: "UI-Mate：以上下文演示推进通用 GUI 智能体"
  };

  var lang = resolveInitialLang();
  var activeDemo = 0;

  /* ---------- language ---------------------------------------- */

  function resolveInitialLang() {
    var fromQuery = new URLSearchParams(location.search).get("lang");
    if (fromQuery === "zh" || fromQuery === "en") return fromQuery;

    var stored = null;
    try { stored = localStorage.getItem(STORE_KEY); } catch (e) { /* private mode */ }
    if (stored === "zh" || stored === "en") return stored;

    return /^zh\b/i.test(navigator.language || "") ? "zh" : "en";
  }

  function t(key) {
    var dict = I18N[lang] || I18N.en;
    return dict[key] != null ? dict[key] : (I18N.en[key] != null ? I18N.en[key] : key);
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.title = TITLES[lang];

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = t(el.getAttribute("data-i18n"));
      // Copy may carry inline markup (<strong>, <code>, entities).
      if (/[<&]/.test(value)) el.innerHTML = value;
      else el.textContent = value;
    });

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });

    renderChart();
    renderDemoTabs();
    renderDemoMeta();
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* ignore */ }
    applyLang();
  }

  document.querySelectorAll(".lang-switch button").forEach(function (btn) {
    btn.addEventListener("click", function () { setLang(btn.dataset.lang); });
  });

  /* ---------- nav: stuck state, scrollspy, mobile ------------- */

  var nav = document.getElementById("nav");
  var navLinks = document.getElementById("navLinks");
  var burger = document.getElementById("navBurger");

  function onScroll() {
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  burger.addEventListener("click", function () {
    var open = navLinks.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });

  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  var sections = ["overview", "capabilities", "method", "results", "demos", "citation"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = entry.target.id;
      document.querySelectorAll(".nav-links a").forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(function (s) { spy.observe(s); });

  /* ---------- results chart ---------------------------------- */

  var chartEl = document.getElementById("chart");
  var chartShown = false;

  function renderChart() {
    if (!chartEl) return;
    chartEl.innerHTML = "";

    CHART.forEach(function (row) {
      var label = t(row.key).replace(/<[^>]*>/g, "");
      var wrap = document.createElement("div");
      wrap.className = "crow";
      wrap.innerHTML =
        '<div class="crow-label">' + label + "<small>/" + row.max + "</small></div>" +
        '<div class="cbars">' +
          '<div class="cbar cbar-a">' +
            '<span class="cbar-track"><span class="cbar-fill" data-pct="' + pct(row.wo, row.max) + '"></span></span>' +
            '<span class="cbar-val">' + row.wo.toFixed(2) + "</span>" +
          "</div>" +
          '<div class="cbar cbar-b">' +
            '<span class="cbar-track"><span class="cbar-fill" data-pct="' + pct(row.w, row.max) + '"></span></span>' +
            '<span class="cbar-val">' + row.w.toFixed(2) + "</span>" +
          "</div>" +
        "</div>";
      chartEl.appendChild(wrap);
    });

    if (chartShown) growBars();
  }

  function pct(value, max) {
    // Floor at 1.5% so near-zero subsets stay visible as a sliver.
    return Math.max(1.5, (value / max) * 100).toFixed(2);
  }

  function growBars() {
    chartEl.querySelectorAll(".cbar-fill").forEach(function (fill) {
      fill.style.width = fill.dataset.pct + "%";
    });
  }

  if (chartEl) {
    new IntersectionObserver(function (entries, obs) {
      if (!entries[0].isIntersecting) return;
      chartShown = true;
      growBars();
      obs.disconnect();
    }, { threshold: 0.25 }).observe(chartEl);
  }

  /* ---------- demo reel -------------------------------------- */

  var tabsEl = document.getElementById("demoTabs");
  var video = document.getElementById("demoVideo");
  var emptyEl = document.getElementById("demoEmpty");

  function renderDemoTabs() {
    if (!tabsEl) return;
    tabsEl.innerHTML = "";

    DEMOS.forEach(function (demo, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "demo-tab" + (i === activeDemo ? " is-active" : "");
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", String(i === activeDemo));
      btn.textContent = (demo[lang] || demo.en).tab;
      btn.addEventListener("click", function () { selectDemo(i); });
      tabsEl.appendChild(btn);
    });
  }

  function renderDemoMeta() {
    var demo = DEMOS[activeDemo];
    if (!demo || !video) return;
    var copy = demo[lang] || demo.en;

    document.getElementById("demoTitle").textContent = copy.title;
    document.getElementById("demoDesc").textContent = copy.desc;
    document.getElementById("demoMode").textContent = copy.mode;
    document.getElementById("demoPlatform").textContent = copy.platform;
    document.getElementById("demoInstr").textContent = '"' + copy.instr + '"';
    document.getElementById("demoBarTitle").textContent = "UI-Mate — " + copy.tab;
  }

  function selectDemo(index) {
    activeDemo = index;
    var demo = DEMOS[index];

    tabsEl.querySelectorAll(".demo-tab").forEach(function (btn, i) {
      btn.classList.toggle("is-active", i === index);
      btn.setAttribute("aria-selected", String(i === index));
    });

    renderDemoMeta();

    if (!video || !demo) return;

    // Overlay stays until the browser confirms the file actually loaded.
    emptyEl.classList.remove("is-hidden");
    video.pause();
    video.removeAttribute("poster");

    // Requesting a not-yet-added clip would only produce console 404s.
    if (!demo.ready || !demo.src) {
      video.removeAttribute("src");
      video.load();
      return;
    }

    if (demo.poster) video.poster = demo.poster;
    video.src = demo.src;
    video.load();
  }

  if (video) {
    video.addEventListener("loadeddata", function () { emptyEl.classList.add("is-hidden"); });
    video.addEventListener("error", function () { emptyEl.classList.remove("is-hidden"); });
  }

  /* ---------- bibtex copy ------------------------------------ */

  var copyBtn = document.getElementById("copyBib");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var text = document.getElementById("bibtex").textContent;
      var label = copyBtn.querySelector("span");

      var done = function () {
        label.textContent = t("cite.copied");
        copyBtn.classList.add("is-done");
        setTimeout(function () {
          label.textContent = t("cite.copy");
          copyBtn.classList.remove("is-done");
        }, 1800);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done);
      } else {
        // file:// and plain http need the legacy path.
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
        document.body.removeChild(ta);
      }
    });
  }

  /* ---------- scroll reveal ---------------------------------- */

  var revealTargets = document.querySelectorAll(
    ".sec-head, .abstract, .highlight-row, .card, .pipeline, .split-main, .split-side, " +
    ".subset, .table-card, .chart-card, .take, .demo-tabs, .demo-stage, .cite-card"
  );

  if ("IntersectionObserver" in window) {
    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        obs.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    revealTargets.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 3) * 70 + "ms";
      revealer.observe(el);
    });
  }

  /* ---------- boot ------------------------------------------- */

  applyLang();
  selectDemo(0);
})();
