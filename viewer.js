/* ============================================================
   DemoCUA / General CUA step viewer page
   ============================================================ */
(function () {
  "use strict";

  var I18N = window.UIMATE_I18N || { en: {}, zh: {} };
  var DEMOS = window.UIMATE_DEMOS || [];
  var STORE_KEY = "uimate.lang";

  var params = new URLSearchParams(location.search);
  var demoKey = (params.get("demo") || "").trim();
  var startStep = parseInt(params.get("step") || "0", 10);
  if (isNaN(startStep) || startStep < 0) startStep = 0;

  function resolveInitialLang() {
    var fromQuery = params.get("lang");
    if (fromQuery === "zh" || fromQuery === "en") return fromQuery;
    try {
      var stored = localStorage.getItem(STORE_KEY);
      if (stored === "zh" || stored === "en") return stored;
    } catch (e) { /* ignore */ }
    return /^zh\b/i.test(navigator.language || "") ? "zh" : "en";
  }

  var lang = resolveInitialLang();

  function t(key) {
    var dict = I18N[lang] || I18N.en;
    return dict[key] != null ? dict[key] : (I18N.en[key] != null ? I18N.en[key] : key);
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = t(el.getAttribute("data-i18n"));
      if (/[<&]/.test(value)) el.innerHTML = value;
      else el.textContent = value;
    });
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });
  }

  document.querySelectorAll(".lang-switch button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      lang = btn.dataset.lang;
      try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* ignore */ }
      applyLang();
      renderDemoTabs();
      renderHeading();
      renderActiveStep();
      updateUrl(true);
    });
  });

  var burger = document.getElementById("navBurger");
  var navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
  }

  function demoSlug(d) {
    return (d.id || "").replace(/^democua-/, "") || d.id;
  }

  function listViewerDemos() {
    return DEMOS.filter(function (d) {
      return d && d.ready !== false && d.stepsSrc;
    });
  }

  function findDemo(key) {
    var list = listViewerDemos();
    if (!list.length) return null;
    if (!key) return list[0];
    for (var i = 0; i < list.length; i++) {
      var d = list[i];
      var slug = demoSlug(d);
      if (d.id === key || slug === key || (d.stepsSrc || "").indexOf("/" + key + "/") !== -1) {
        return d;
      }
    }
    return list[0];
  }

  function runVideoSrc(d) {
    return (d && (d.runSrc || d.src)) || "";
  }

  var demo = findDemo(demoKey);
  var tabsEl = document.getElementById("viewerDemoTabs");
  var stepImage = document.getElementById("demoStepImage");
  var stepVideo = document.getElementById("demoStepVideo");
  var stepEmptyEl = document.getElementById("demoStepEmpty");
  var stepCountEl = document.getElementById("demoStepCount");
  var stepSubtaskEl = document.getElementById("demoStepSubtask");
  var stepThinkingEl = document.getElementById("demoStepThinking");
  var stepActionEl = document.getElementById("demoStepAction");
  var stepPrevBtn = document.getElementById("demoStepPrev");
  var stepNextBtn = document.getElementById("demoStepNext");
  var subtaskFieldEl = stepSubtaskEl && stepSubtaskEl.closest(".demo-step-field");

  var activeSteps = [];
  var activeStepIndex = 0;
  var stepSeekToken = 0;
  var loadToken = 0;
  var hasSubtasks = false;
  var useImages = false;

  function updateUrl(replace) {
    if (!demo) return;
    var next = new URL(location.href);
    next.searchParams.set("demo", demoSlug(demo));
    next.searchParams.set("step", String(activeStepIndex));
    next.searchParams.set("lang", lang);
    var method = replace ? "replaceState" : "pushState";
    history[method](null, "", next.pathname + next.search);
  }

  function renderDemoTabs() {
    if (!tabsEl) return;
    var list = listViewerDemos();
    tabsEl.innerHTML = "";
    list.forEach(function (item) {
      var copy = item[lang] || item.en;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "demo-tab" + (demo && item.id === demo.id ? " is-active" : "");
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", String(!!(demo && item.id === demo.id)));
      btn.textContent = copy.tab || demoSlug(item);
      btn.addEventListener("click", function () {
        if (demo && item.id === demo.id) return;
        selectDemo(item, 0, true);
      });
      tabsEl.appendChild(btn);
    });
  }

  function renderHeading() {
    var titleEl = document.getElementById("viewerTitle");
    var ledeEl = document.getElementById("viewerLede");
    if (!demo) {
      if (titleEl) titleEl.textContent = t("demo.step.label");
      if (ledeEl) ledeEl.textContent = t("demo.step.missing");
      document.title = "UI-Mate — " + t("demo.step.label");
      return;
    }
    var copy = demo[lang] || demo.en;
    if (titleEl) titleEl.textContent = copy.tab || copy.title || t("demo.step.label");
    if (ledeEl) ledeEl.textContent = copy.title || "";
    document.title = "UI-Mate — " + (copy.tab || t("demo.step.label"));
  }

  function showEmpty(on) {
    if (!stepEmptyEl) return;
    if (on) stepEmptyEl.classList.remove("is-hidden");
    else stepEmptyEl.classList.add("is-hidden");
  }

  function seekStepFrame(step) {
    var token = ++stepSeekToken;
    if (useImages && stepImage) {
      if (stepVideo) {
        stepVideo.hidden = true;
        stepVideo.removeAttribute("src");
      }
      var src = step && step.shot;
      if (!src) {
        stepImage.hidden = true;
        showEmpty(true);
        return;
      }
      stepImage.hidden = false;
      var onLoad = function () {
        if (token !== stepSeekToken) return;
        stepImage.removeEventListener("load", onLoad);
        stepImage.removeEventListener("error", onError);
        showEmpty(false);
      };
      var onError = function () {
        if (token !== stepSeekToken) return;
        stepImage.removeEventListener("load", onLoad);
        stepImage.removeEventListener("error", onError);
        showEmpty(true);
      };
      stepImage.addEventListener("load", onLoad);
      stepImage.addEventListener("error", onError);
      if (stepImage.getAttribute("src") === src && stepImage.complete && stepImage.naturalWidth) {
        onLoad();
      } else {
        stepImage.src = src;
      }
      return;
    }

    if (!stepVideo) return;
    if (stepImage) stepImage.hidden = true;
    stepVideo.hidden = false;
    if (!stepVideo.src) return;
    var frame = step && step.i != null ? Number(step.i) : activeStepIndex;
    if (!isFinite(frame) || frame < 0) frame = 0;
    var onSeeked = function () {
      if (token !== stepSeekToken) return;
      stepVideo.removeEventListener("seeked", onSeeked);
      stepVideo.pause();
      showEmpty(false);
    };
    stepVideo.pause();
    stepVideo.addEventListener("seeked", onSeeked);
    try {
      if (Math.abs((stepVideo.currentTime || 0) - frame) < 0.001) {
        stepVideo.currentTime = frame > 0 ? frame - 0.001 : 0.001;
      }
      stepVideo.currentTime = frame;
    } catch (e) {
      stepVideo.removeEventListener("seeked", onSeeked);
    }
  }

  function renderActiveStep() {
    if (subtaskFieldEl) subtaskFieldEl.hidden = !hasSubtasks;
    if (!activeSteps.length) {
      if (stepCountEl) stepCountEl.textContent = "—";
      if (stepSubtaskEl) stepSubtaskEl.textContent = "—";
      if (stepThinkingEl) stepThinkingEl.textContent = "—";
      if (stepActionEl) stepActionEl.textContent = "—";
      return;
    }
    var step = activeSteps[activeStepIndex] || activeSteps[0];
    if (stepCountEl) {
      var label =
        "Step " + (activeStepIndex + 1) + " / " + activeSteps.length;
      if (step.merged && step.merged > 1) label += " · ×" + step.merged;
      stepCountEl.textContent = label;
    }
    if (stepSubtaskEl) {
      if (hasSubtasks && step.subtask) {
        var idx = step.subtask_index != null ? step.subtask_index : step.subtask_id;
        var total = step.subtask_total != null ? step.subtask_total : null;
        stepSubtaskEl.textContent =
          (idx != null ? idx + (total != null ? "/" + total : "") + ". " : "") +
          step.subtask;
      } else {
        stepSubtaskEl.textContent = "—";
      }
    }
    if (stepThinkingEl) {
      stepThinkingEl.textContent = step.thinking || "—";
      stepThinkingEl.scrollTop = 0;
    }
    if (stepActionEl) stepActionEl.textContent = step.action || "—";
    if (stepPrevBtn) stepPrevBtn.disabled = activeStepIndex <= 0;
    if (stepNextBtn) stepNextBtn.disabled = activeStepIndex >= activeSteps.length - 1;
    seekStepFrame(step);
  }

  function setStepIndex(next, replaceUrl) {
    if (!activeSteps.length) return;
    activeStepIndex = Math.min(Math.max(next, 0), activeSteps.length - 1);
    renderActiveStep();
    updateUrl(replaceUrl !== false);
  }

  function clearStepUi() {
    activeSteps = [];
    activeStepIndex = 0;
    hasSubtasks = false;
    useImages = false;
    if (stepCountEl) stepCountEl.textContent = "—";
    if (stepSubtaskEl) stepSubtaskEl.textContent = "—";
    if (stepThinkingEl) stepThinkingEl.textContent = "—";
    if (stepActionEl) stepActionEl.textContent = "—";
    if (subtaskFieldEl) subtaskFieldEl.hidden = true;
    showEmpty(true);
    if (stepImage) {
      stepImage.hidden = true;
      stepImage.removeAttribute("src");
    }
    if (stepVideo) {
      stepVideo.hidden = true;
      stepVideo.removeAttribute("src");
      stepVideo.load();
    }
  }

  function loadCurrentDemo(initialStep) {
    var token = ++loadToken;
    clearStepUi();
    renderHeading();
    renderDemoTabs();
    if (!demo || !demo.stepsSrc) return;

    fetch(demo.stepsSrc)
      .then(function (res) {
        if (!res.ok) throw new Error("steps fetch failed");
        return res.json();
      })
      .then(function (payload) {
        if (token !== loadToken) return;
        activeSteps = payload.steps || [];
        hasSubtasks = !!(payload.subtasks && payload.subtasks.length);
        useImages = activeSteps.some(function (s) { return !!(s && s.shot); });
        var target = Math.min(Math.max(initialStep || 0, 0), Math.max(activeSteps.length - 1, 0));

        if (useImages) {
          setStepIndex(target, true);
          return;
        }

        var videoSrc = runVideoSrc(demo);
        if (stepVideo && videoSrc) {
          stepVideo.hidden = false;
          stepVideo.src = videoSrc;
          stepVideo.load();
          stepVideo.addEventListener(
            "loadeddata",
            function () {
              if (token !== loadToken) return;
              showEmpty(false);
              setStepIndex(target, true);
            },
            { once: true }
          );
          stepVideo.addEventListener(
            "error",
            function () {
              if (token !== loadToken) return;
              showEmpty(true);
            },
            { once: true }
          );
        } else {
          setStepIndex(target, true);
        }
      })
      .catch(function () {
        if (token !== loadToken) return;
        showEmpty(true);
      });
  }

  function selectDemo(nextDemo, step, pushUrl) {
    demo = nextDemo;
    startStep = step || 0;
    renderDemoTabs();
    renderHeading();
    if (pushUrl) updateUrl(false);
    else updateUrl(true);
    loadCurrentDemo(startStep);
  }

  if (stepPrevBtn) stepPrevBtn.addEventListener("click", function () { setStepIndex(activeStepIndex - 1, true); });
  if (stepNextBtn) stepNextBtn.addEventListener("click", function () { setStepIndex(activeStepIndex + 1, true); });

  document.addEventListener("keydown", function (e) {
    if (!activeSteps.length) return;
    if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setStepIndex(activeStepIndex - 1, true);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setStepIndex(activeStepIndex + 1, true);
    }
  });

  window.addEventListener("popstate", function () {
    var nextParams = new URLSearchParams(location.search);
    var nextKey = (nextParams.get("demo") || "").trim();
    var nextStep = parseInt(nextParams.get("step") || "0", 10);
    if (isNaN(nextStep) || nextStep < 0) nextStep = 0;
    var nextLang = nextParams.get("lang");
    if (nextLang === "zh" || nextLang === "en") {
      lang = nextLang;
      applyLang();
    }
    var nextDemo = findDemo(nextKey);
    if (!demo || !nextDemo || nextDemo.id !== demo.id) {
      selectDemo(nextDemo, nextStep, false);
    } else {
      setStepIndex(nextStep, true);
    }
  });

  applyLang();
  renderDemoTabs();
  renderHeading();
  if (!demo) {
    showEmpty(true);
    return;
  }
  updateUrl(true);
  loadCurrentDemo(startStep);
})();
