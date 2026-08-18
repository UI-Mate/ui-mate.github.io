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
    en: "UI-Mate: Advancing Open-Weight Foundation GUI Agents with In-Context Demonstrations",
    zh: "UI-Mate: Advancing Open-Weight Foundation GUI Agents with In-Context Demonstrations"
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

  var sections = ["overview", "demos", "approach", "results", "app", "citation"]
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
      var unit = row.max === 100 ? "%" : "";
      var denom = row.max === 100 ? "" : "<small>/" + row.max + "</small>";
      var wrap = document.createElement("div");
      wrap.className = "crow";
      wrap.innerHTML =
        '<div class="crow-label">' + label + denom + "</div>" +
        '<div class="cbars">' +
          '<div class="cbar cbar-a">' +
            '<span class="cbar-track"><span class="cbar-fill" data-pct="' + pct(row.wo, row.max) + '"></span></span>' +
            '<span class="cbar-val">' + row.wo.toFixed(1) + unit + "</span>" +
          "</div>" +
          '<div class="cbar cbar-b">' +
            '<span class="cbar-track"><span class="cbar-fill" data-pct="' + pct(row.w, row.max) + '"></span></span>' +
            '<span class="cbar-val">' + row.w.toFixed(1) + unit + "</span>" +
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
  var noDemoVideo = document.getElementById("demoNoDemoVideo");
  var noDemoEmptyEl = document.getElementById("demoNoDemoEmpty");
  var humanVideo = document.getElementById("demoHumanVideo");
  var humanEmptyEl = document.getElementById("demoHumanEmpty");
  var subtasksEl = document.getElementById("demoSubtasks");
  var paneTabsEl = document.getElementById("demoPaneTabs");
  var guideEl = document.getElementById("demoGuide");
  var viewerLinkEl = document.getElementById("demoViewerLink");
  var paneRunEl = document.getElementById("demoPaneRun");
  var paneNoDemoEl = document.getElementById("demoPaneNoDemo");
  var paneDemoEl = document.getElementById("demoPaneDemo");
  var paneSubtaskEl = document.getElementById("demoPaneSubtask");
  var playerBarEl = document.getElementById("demoPlayerBar");
  var playerPlayBtn = document.getElementById("demoPlayerPlay");
  var playerTimeEl = document.getElementById("demoPlayerTime");
  var playerSeekEl = document.getElementById("demoPlayerSeek");
  var playerSpeedEl = document.getElementById("demoPlayerSpeed");

  var stepsCache = {};
  var activePane = "run";
  var activeSubtasks = [];
  var expandedSubtaskId = null;
  var playbackRate = 1;
  var seekDragging = false;
  var allDemoVideos = [video, noDemoVideo, humanVideo];

  function isDemoCua(demo) {
    return !!(demo && demo.kind === "democua");
  }

  function hasStepViewer(demo) {
    return !!(demo && demo.stepsSrc);
  }

  function demoSlug(demo) {
    if (!demo) return "";
    if (demo.viewer) return demo.viewer;
    return String(demo.id || "").replace(/^democua-/, "");
  }

  function demoRunSrc(demo) {
    if (!demo) return "";
    return demo.runSrc || demo.src || "";
  }

  function activePlayerVideo() {
    if (activePane === "nodemo") return noDemoVideo;
    if (activePane === "demo") return humanVideo;
    return video;
  }

  function formatPlayerTime(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    var s = Math.floor(sec);
    var m = Math.floor(s / 60);
    var r = s % 60;
    return m + ":" + String(r).padStart(2, "0");
  }

  function applyPlaybackRate() {
    if (playerSpeedEl) playerSpeedEl.value = String(playbackRate);
    allDemoVideos.forEach(function (el) {
      if (el) el.playbackRate = playbackRate;
    });
  }

  function syncPlayerBar() {
    var el = activePlayerVideo();
    if (!playerBarEl) return;
    if (!el || activePane === "subtask" || !el.getAttribute("src")) {
      playerBarEl.hidden = true;
      return;
    }
    playerBarEl.hidden = false;
    var dur = isFinite(el.duration) ? el.duration : 0;
    var cur = isFinite(el.currentTime) ? el.currentTime : 0;
    if (playerSeekEl && !seekDragging) {
      playerSeekEl.max = dur > 0 ? String(dur) : "0";
      playerSeekEl.value = String(cur);
    }
    if (playerTimeEl) {
      playerTimeEl.textContent = formatPlayerTime(cur) + " / " + formatPlayerTime(dur);
    }
    if (playerPlayBtn) {
      playerPlayBtn.classList.toggle("is-playing", !el.paused && !el.ended);
    }
    applyPlaybackRate();
  }

  function updatePlayerVisibility() {
    syncPlayerBar();
  }

  function pauseOther(active) {
    allDemoVideos.forEach(function (el) {
      if (el && el !== active && !el.paused) el.pause();
    });
  }

  function wireVideoSrc(el, empty, src, poster, ready) {
    if (!el) return;
    el.pause();
    el.removeAttribute("poster");

    if (!ready || !src) {
      if (empty) empty.classList.remove("is-hidden");
      el.removeAttribute("src");
      el.load();
      syncPlayerBar();
      return;
    }

    if (empty) empty.classList.add("is-hidden");
    if (poster) el.poster = poster;
    el.src = src;
    el.playbackRate = playbackRate;
    el.load();
    syncPlayerBar();
  }

  function setPane(pane) {
    activePane = pane || "run";
    if (paneTabsEl) {
      paneTabsEl.querySelectorAll(".demo-pane-tab").forEach(function (btn) {
        var on = btn.getAttribute("data-pane") === activePane;
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-selected", String(on));
      });
    }
    if (paneRunEl) {
      paneRunEl.hidden = activePane !== "run";
      paneRunEl.classList.toggle("is-active", activePane === "run");
    }
    if (paneNoDemoEl) {
      paneNoDemoEl.hidden = activePane !== "nodemo";
      paneNoDemoEl.classList.toggle("is-active", activePane === "nodemo");
    }
    if (paneDemoEl) {
      paneDemoEl.hidden = activePane !== "demo";
      paneDemoEl.classList.toggle("is-active", activePane === "demo");
    }
    if (paneSubtaskEl) {
      paneSubtaskEl.hidden = activePane !== "subtask";
      paneSubtaskEl.classList.toggle("is-active", activePane === "subtask");
    }
    if (activePane !== "run" && video && !video.paused) video.pause();
    if (activePane !== "nodemo" && noDemoVideo && !noDemoVideo.paused) noDemoVideo.pause();
    if (activePane !== "demo" && humanVideo && !humanVideo.paused) humanVideo.pause();
    maybeSeekHighlight();
    updatePlayerVisibility();
  }

  function maybeSeekHighlight() {
    var demo = DEMOS[activeDemo];
    if (!demo) return;
    if (activePane === "run" && video && demo.runSeek != null) {
      seekWhenReady(video, Number(demo.runSeek));
    }
    if (activePane === "nodemo" && noDemoVideo && demo.noDemoSeek != null) {
      seekWhenReady(noDemoVideo, Number(demo.noDemoSeek));
    }
    if (activePane === "demo" && humanVideo && demo.demoSeek != null) {
      seekWhenReady(humanVideo, Number(demo.demoSeek));
    }
  }

  function seekWhenReady(el, t) {
    if (!el || !isFinite(t) || t < 0) return;
    var apply = function () {
      if (!isFinite(el.duration) || el.duration <= 0) return;
      try { el.currentTime = Math.min(t, Math.max(el.duration - 0.05, 0)); } catch (e) {}
      syncPlayerBar();
    };
    if (el.readyState >= 1 && isFinite(el.duration) && el.duration > 0) apply();
    else el.addEventListener("loadedmetadata", apply, { once: true });
  }

  function renderSubtasks(subs) {
    activeSubtasks = subs || [];
    if (!subtasksEl) return;
    subtasksEl.innerHTML = "";
    activeSubtasks.forEach(function (item, i) {
      var sid = item.id != null ? item.id : i + 1;
      var index = i + 1;
      var li = document.createElement("li");
      li.setAttribute("data-subtask-id", String(sid));
      if (expandedSubtaskId === sid) li.classList.add("is-open");

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "demo-subtask-jump";
      btn.setAttribute("aria-expanded", String(expandedSubtaskId === sid));
      btn.textContent = index + ". " + (item.title || ("Subtask " + index));
      btn.addEventListener("click", function () {
        expandedSubtaskId = expandedSubtaskId === sid ? null : sid;
        renderSubtasks(activeSubtasks);
      });

      var detail = document.createElement("div");
      detail.className = "demo-subtask-detail";
      detail.hidden = expandedSubtaskId !== sid;
      detail.textContent = item.criterion || t("demo.step.noDetail");

      li.appendChild(btn);
      li.appendChild(detail);
      subtasksEl.appendChild(li);
    });
  }

  function loadStepsForDemo(demo) {
    if (!isDemoCua(demo) || !demo.stepsSrc) {
      renderSubtasks([]);
      return;
    }
    if (stepsCache[demo.stepsSrc]) {
      renderSubtasks(stepsCache[demo.stepsSrc].subtasks || []);
      return;
    }
    fetch(demo.stepsSrc)
      .then(function (res) {
        if (!res.ok) throw new Error("steps fetch failed");
        return res.json();
      })
      .then(function (payload) {
        stepsCache[demo.stepsSrc] = payload;
        if (DEMOS[activeDemo] === demo) renderSubtasks(payload.subtasks || []);
      })
      .catch(function () {
        if (DEMOS[activeDemo] === demo) {
          var copy = demo[lang] || demo.en;
          renderSubtasks((copy && copy.subtasks) || []);
        }
      });
  }

  function renderDemoExtras(demo) {
    var democua = isDemoCua(demo);
    var copy = (demo && (demo[lang] || demo.en)) || {};
    if (paneTabsEl) {
      paneTabsEl.hidden = !democua;
      var runTabBtn = paneTabsEl.querySelector('.demo-pane-tab[data-pane="run"]');
      var noDemoTabBtn = paneTabsEl.querySelector('.demo-pane-tab[data-pane="nodemo"]');
      var demoTabBtn = paneTabsEl.querySelector('.demo-pane-tab[data-pane="demo"]');
      if (runTabBtn) {
        runTabBtn.hidden = false;
        runTabBtn.textContent = copy.runLabel || t("demo.run.label");
      }
      if (noDemoTabBtn) {
        noDemoTabBtn.hidden = !(demo && (demo.noDemoSrc || demo.noDemoPending));
        noDemoTabBtn.textContent = copy.noDemoLabel || t("demo.nodemo.label");
      }
      if (demoTabBtn) {
        demoTabBtn.hidden = !(demo && (demo.demoSrc || demo.demoPending));
        demoTabBtn.textContent = copy.demoLabel || t("demo.demo.label");
      }
    }
    if (guideEl) guideEl.hidden = true;
    if (viewerLinkEl) {
      viewerLinkEl.hidden = !hasStepViewer(demo);
      if (hasStepViewer(demo)) {
        var slug = demoSlug(demo);
        var stepQ = demo.viewerStep != null ? "&step=" + encodeURIComponent(demo.viewerStep) : "";
        viewerLinkEl.href = "viewer.html?demo=" + encodeURIComponent(slug) + "&lang=" + lang + stepQ;
      }
    }

    if (!democua) {
      setPane("run");
      if (paneNoDemoEl) paneNoDemoEl.hidden = true;
      if (paneDemoEl) paneDemoEl.hidden = true;
      if (paneSubtaskEl) paneSubtaskEl.hidden = true;
      wireVideoSrc(noDemoVideo, noDemoEmptyEl, null, null, false);
      wireVideoSrc(humanVideo, humanEmptyEl, null, null, false);
      if (subtasksEl) subtasksEl.innerHTML = "";
      expandedSubtaskId = null;
      return;
    }

    if (!demo.stepsSrc) renderSubtasks(copy.subtasks || []);
    wireVideoSrc(
      noDemoVideo,
      noDemoEmptyEl,
      demo.noDemoSrc,
      null,
      !!(demo.ready && demo.noDemoSrc)
    );
    wireVideoSrc(
      humanVideo,
      humanEmptyEl,
      demo.demoSrc,
      null,
      !!(demo.ready && demo.demoSrc)
    );
    setPane("run");
    loadStepsForDemo(demo);
  }

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

  function setDemoTitle(el, title) {
    if (!el) return;
    var marker = "w/ demo";
    var idx = title ? title.indexOf(marker) : -1;
    if (idx < 0) {
      el.textContent = title || "—";
      return;
    }
    el.textContent = "";
    if (idx > 0) el.appendChild(document.createTextNode(title.slice(0, idx)));
    var accent = document.createElement("span");
    accent.className = "demo-title-accent";
    accent.textContent = marker;
    el.appendChild(accent);
    if (idx + marker.length < title.length) {
      el.appendChild(document.createTextNode(title.slice(idx + marker.length)));
    }
  }

  function renderDemoMeta() {
    var demo = DEMOS[activeDemo];
    if (!demo) return;
    var copy = demo[lang] || demo.en;

    setDemoTitle(document.getElementById("demoTitle"), copy.title);
    // A blank line in `desc` separates the prose from the trailing score readout.
    var descParts = String(copy.desc).split(/\n{2,}/);
    var scoreEl = document.getElementById("demoScore");
    document.getElementById("demoDesc").textContent = descParts[0].trim();
    scoreEl.textContent = descParts.length > 1 ? descParts.slice(1).join(" ").trim() : "";
    scoreEl.hidden = !scoreEl.textContent;
    document.getElementById("demoMode").textContent = copy.mode;
    document.getElementById("demoPlatform").textContent = copy.platform;
    document.getElementById("demoInstr").textContent = '"' + copy.instr + '"';
    document.getElementById("demoBarTitle").textContent = "UI-Mate — " + copy.tab;
    renderDemoExtras(demo);
  }

  function selectDemo(index) {
    activeDemo = index;
    expandedSubtaskId = null;
    var demo = DEMOS[index];

    tabsEl.querySelectorAll(".demo-tab").forEach(function (btn, i) {
      btn.classList.toggle("is-active", i === index);
      btn.setAttribute("aria-selected", String(i === index));
    });

    renderDemoMeta();

    if (!video || !demo) return;

    pauseOther(null);
    wireVideoSrc(video, emptyEl, demoRunSrc(demo), demo.poster, !!(demo.ready && demoRunSrc(demo)));
    applyPlaybackRate();
    updatePlayerVisibility();
  }

  if (paneTabsEl) {
    paneTabsEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".demo-pane-tab");
      if (!btn) return;
      setPane(btn.getAttribute("data-pane"));
    });
  }

  if (playerPlayBtn) {
    playerPlayBtn.addEventListener("click", function () {
      var el = activePlayerVideo();
      if (!el || !el.getAttribute("src")) return;
      if (el.paused || el.ended) {
        pauseOther(el);
        el.play().catch(function () {});
      } else {
        el.pause();
      }
      syncPlayerBar();
    });
  }

  if (playerSeekEl) {
    var commitSeek = function () {
      var el = activePlayerVideo();
      if (!el) return;
      var next = Number(playerSeekEl.value);
      if (!isFinite(next)) return;
      try { el.currentTime = next; } catch (e) {}
      syncPlayerBar();
    };
    playerSeekEl.addEventListener("pointerdown", function () { seekDragging = true; });
    playerSeekEl.addEventListener("pointerup", function () {
      seekDragging = false;
      commitSeek();
    });
    playerSeekEl.addEventListener("input", function () {
      if (!playerTimeEl) return;
      var el = activePlayerVideo();
      var dur = el && isFinite(el.duration) ? el.duration : Number(playerSeekEl.max) || 0;
      playerTimeEl.textContent =
        formatPlayerTime(Number(playerSeekEl.value)) + " / " + formatPlayerTime(dur);
    });
    playerSeekEl.addEventListener("change", function () {
      seekDragging = false;
      commitSeek();
    });
  }

  if (playerSpeedEl) {
    playerSpeedEl.addEventListener("change", function () {
      playbackRate = Number(playerSpeedEl.value) || 1;
      applyPlaybackRate();
    });
  }

  function bindPlayerEvents(el) {
    if (!el) return;
    ["timeupdate", "loadedmetadata", "durationchange", "play", "pause", "ended", "seeked"].forEach(function (evt) {
      el.addEventListener(evt, syncPlayerBar);
    });
  }
  bindPlayerEvents(video);
  bindPlayerEvents(noDemoVideo);
  bindPlayerEvents(humanVideo);

  if (video) {
    video.addEventListener("play", function () { pauseOther(video); applyPlaybackRate(); });
    video.addEventListener("loadeddata", function () { emptyEl.classList.add("is-hidden"); syncPlayerBar(); });
    video.addEventListener("error", function () { emptyEl.classList.remove("is-hidden"); syncPlayerBar(); });
    video.addEventListener("click", function () {
      if (!video.getAttribute("src")) return;
      if (video.paused) video.play().catch(function () {});
      else video.pause();
    });
  }
  if (noDemoVideo) {
    noDemoVideo.addEventListener("play", function () { pauseOther(noDemoVideo); applyPlaybackRate(); });
    noDemoVideo.addEventListener("loadeddata", function () {
      if (noDemoEmptyEl) noDemoEmptyEl.classList.add("is-hidden");
      syncPlayerBar();
    });
    noDemoVideo.addEventListener("error", function () {
      if (noDemoEmptyEl) noDemoEmptyEl.classList.remove("is-hidden");
      syncPlayerBar();
    });
    noDemoVideo.addEventListener("click", function () {
      if (!noDemoVideo.getAttribute("src")) return;
      if (noDemoVideo.paused) noDemoVideo.play().catch(function () {});
      else noDemoVideo.pause();
    });
  }
  if (humanVideo) {
    humanVideo.addEventListener("play", function () { pauseOther(humanVideo); applyPlaybackRate(); });
    humanVideo.addEventListener("loadeddata", function () {
      if (humanEmptyEl) humanEmptyEl.classList.add("is-hidden");
      syncPlayerBar();
    });
    humanVideo.addEventListener("error", function () {
      if (humanEmptyEl) humanEmptyEl.classList.remove("is-hidden");
      syncPlayerBar();
    });
    humanVideo.addEventListener("click", function () {
      if (!humanVideo.getAttribute("src")) return;
      if (humanVideo.paused) humanVideo.play().catch(function () {});
      else humanVideo.pause();
    });
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

  /* ---------- demo flow animation --------------------------- */

  var flowEl = document.getElementById("demoFlow");
  var FLOW_TICK_MS = 900;
  var flowTimer = null;
  var flowPhase = -1;
  var flowActive = false;
  var flowSubtask = 3; // Write sheet

  // Offline once, then finish 2 subtasks and end the task.
  var FLOW_BEATS = [
    { offline: 0 },
    { offline: 1 },
    { offline: 2 },
    { offline: 3 },
    { offline: 4 },
    { bridge: true },
    { online: ["shot", "harness"], edges: ["obs"], keepOffline: true, status: "flow.on.status.write", subtask: 3 },
    { online: ["harness", "agent"], edges: ["guide"], keepOffline: true, status: "flow.on.status.write", subtask: 3 },
    { online: ["agent", "desk"], edges: ["act"], keepOffline: true, status: "flow.on.status.write", subtask: 3 },
    { online: ["desk", "shot"], edges: ["next"], keepOffline: true, status: "flow.on.status.write", subtask: 3 },
    { online: ["agent", "harness"], edges: ["done"], keepOffline: true, status: "flow.on.status.write", subtask: 3, advance: true },
    { online: ["shot", "harness"], edges: ["obs"], keepOffline: true, status: "flow.on.status.export", subtask: 4 },
    { online: ["harness", "agent"], edges: ["guide"], keepOffline: true, status: "flow.on.status.export", subtask: 4 },
    { online: ["agent", "desk"], edges: ["act"], keepOffline: true, status: "flow.on.status.export", subtask: 4 },
    { online: ["agent", "harness"], edges: ["done"], keepOffline: true, status: "flow.on.status.export", subtask: 4, advance: true },
    { online: ["harness", "agent", "desk", "shot"], edges: [], keepOffline: true, status: "flow.on.status.done", subtask: 6, finished: true },
    { online: ["harness", "agent", "desk", "shot"], edges: [], keepOffline: true, status: "flow.on.status.done", subtask: 6, finished: true },
    { online: ["harness", "agent", "desk", "shot"], edges: [], keepOffline: true, status: "flow.on.status.done", subtask: 6, finished: true }
  ];

  function setChecklist(current) {
    var items = flowEl.querySelectorAll("#flowCheck li");
    var finished = current >= items.length;
    items.forEach(function (li, i) {
      li.classList.toggle("is-done", finished || i < current);
      li.classList.toggle("is-current", !finished && i === current);
    });
  }

  function setStatus(key) {
    var el = document.getElementById("flowStatus");
    if (!el || !key) return;
    el.setAttribute("data-i18n", key);
    el.textContent = t(key);
  }

  function applyBeat(beat) {
    if (!flowEl || !beat) return;

    flowEl.classList.toggle("is-bridging", !!beat.bridge);

    var cards = flowEl.querySelectorAll(".flow-card");
    var arrows = flowEl.querySelectorAll(".flow-offline .flow-arrow");
    var offlineIdx = beat.offline != null ? beat.offline : -1;
    var offlineDone = !!beat.keepOffline || !!beat.bridge;

    cards.forEach(function (el) {
      var n = Number(el.getAttribute("data-step"));
      var active = offlineIdx === n;
      var done = offlineDone ? true : (offlineIdx >= 0 && n < offlineIdx);
      el.classList.toggle("is-active", active);
      el.classList.toggle("is-done", done && !active);
    });
    arrows.forEach(function (el, i) {
      el.classList.toggle("is-lit", offlineDone || offlineIdx > i);
    });

    var roles = beat.online || [];
    flowEl.querySelectorAll(".flow-node").forEach(function (el) {
      var role = el.getAttribute("data-role");
      var on = roles.indexOf(role) !== -1;
      el.classList.toggle("is-active", on && !beat.finished);
      el.classList.toggle("is-finished", !!beat.finished && on);
    });

    var litEdges = beat.edges || [];
    flowEl.querySelectorAll(".flow-link").forEach(function (el) {
      el.classList.toggle("is-lit", litEdges.indexOf(el.getAttribute("data-edge")) !== -1);
    });

    if (beat.subtask != null) flowSubtask = beat.subtask;
    if (beat.advance) flowSubtask = Math.min(flowSubtask + 1, 6);
    setChecklist(flowSubtask);
    if (beat.status) setStatus(beat.status);
  }

  function tickFlow() {
    var next = flowPhase + 1;
    if (next >= FLOW_BEATS.length) next = 0;
    flowPhase = next;
    applyBeat(FLOW_BEATS[flowPhase]);
  }

  function startFlow() {
    if (!flowEl || flowActive) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      flowEl.querySelectorAll(".flow-card, .flow-node").forEach(function (el) {
        el.classList.add("is-finished");
      });
      flowEl.querySelectorAll(".flow-link, .flow-arrow").forEach(function (el) {
        el.classList.add("is-lit");
      });
      setChecklist(6);
      setStatus("flow.on.status.done");
      return;
    }
    flowActive = true;
    flowPhase = -1;
    flowSubtask = 3;
    tickFlow();
    flowTimer = setInterval(tickFlow, FLOW_TICK_MS);
  }

  function stopFlow() {
    flowActive = false;
    if (flowTimer) {
      clearInterval(flowTimer);
      flowTimer = null;
    }
  }

  if (flowEl && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) startFlow();
        else stopFlow();
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }).observe(flowEl);
  } else if (flowEl) {
    startFlow();
  }

  /* ---------- app docs tabs --------------------------------- */

  var appTabs = document.querySelectorAll("[data-app-tab]");
  var appPanels = document.querySelectorAll("[data-app-panel]");

  function setAppTab(name) {
    if (!name) return;
    appTabs.forEach(function (btn) {
      var on = btn.getAttribute("data-app-tab") === name;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", String(on));
    });
    appPanels.forEach(function (panel) {
      var on = panel.getAttribute("data-app-panel") === name;
      panel.classList.toggle("is-active", on);
      if (on) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
    });
  }

  function tabFromHash() {
    var hash = (location.hash || "").replace(/^#/, "");
    return hash === "deploy" || hash === "usage" ? hash : null;
  }

  appTabs.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.getAttribute("data-app-tab");
      setAppTab(name);
      if (location.hash !== "#" + name) {
        history.replaceState(null, "", "#" + name);
      }
    });
  });

  window.addEventListener("hashchange", function () {
    var name = tabFromHash();
    if (name) setAppTab(name);
  });

  var initialTab = tabFromHash();
  if (initialTab) setAppTab(initialTab);

  /* ---------- pending links --------------------------------- */

  document.querySelectorAll("a.is-pending, .is-pending a").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });

  /* ---------- scroll reveal ---------------------------------- */

  var revealTargets = document.querySelectorAll(
    ".sec-head, .highlight-row, .fig, .pillar, .metric, .table-card, .chart-card, " +
    ".demo-tabs, .demo-panel, .cite-card, .flow, .app-links, .app-block, .app-route"
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
