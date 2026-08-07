/* ============================================================
   UI-Mate project page — bilingual copy + page data
   Edit copy here; index.html only carries data-i18n keys.
   ============================================================ */

window.UIMATE_I18N = {
  en: {
    "skip": "Skip to content",

    "nav.overview": "Overview",
    "nav.approach": "Approach",
    "nav.results": "Results",
    "nav.demos": "Demos",
    "nav.citation": "Citation",

    "hero.badge": "Technical Report",
    "hero.title": "Advancing Open-Weight Foundation GUI Agents<br>with In-Context Demonstrations",
    "hero.tagline": "Strong general computer use — plus one demonstration when the instruction alone is not enough.",
    "hero.team": "Tencent HY Frontier &middot; Multimodal Agent Team",
    "hero.fineprint": "Links marked with a dashed border are not public yet.",

    "link.paper": "Technical Report",
    "link.arxiv": "Preprint",
    "link.code": "Code",
    "link.model": "Model Weights",
    "link.video": "Watch Demos",

    "kicker.overview": "01 — Overview",
    "overview.title": "What UI-Mate is",
    "overview.lede": "An open-weight foundation GUI agent: environment-grounded training plus in-context demonstration learning — show a procedure once instead of spelling every convention in a prompt.",
    "overview.fig": "General computer use plus demo-guided execution. One demonstration lifts long-horizon scores without turning the agent into a replay script.",

    "hl.osworld.k": "OSWorld-Verified",
    "hl.osworld.n": "Open-weight SOTA",
    "hl.waa.k": "WindowsAgentArena",
    "hl.waa.n": "Open-weight SOTA",
    "hl.worker.k": "OSWorkerBench",
    "hl.worker.n": "Strict / progress · +17.7 / +24.5 vs base",
    "hl.demo.k": "+ one demo",
    "hl.demo.n": "OSWorker paired · strict success",

    "kicker.approach": "02 — Approach",
    "approach.title": "Three pieces",
    "approach.lede": "A closed-loop data and training stack, demonstration-guided execution, and an office benchmark that isolates what a demo adds.",
    "approach.1.h": "Environment-grounded training",
    "approach.1.p": "Closed-loop data flywheel: task &amp; environment construction, filtered rollouts, capability-tree rebalancing, then SFT + online RL.",
    "approach.2.h": "In-context demonstrations",
    "approach.2.p": "Record once, then turn it into a captioned subtask workflow. The live screenshot stays authoritative — the demo is guidance, not a script.",
    "approach.3.h": "OSWorkerBench",
    "approach.3.p": "100 long-horizon office tasks across 41 apps. Paired demos isolate what one demonstration adds beyond baseline skill.",

    "flow.off.badge": "Offline",
    "flow.off.title": "Capture and structure a demonstration",
    "flow.off.1.h": "Record demo",
    "flow.off.1.p": "Native recorder · before/after screen for every action",
    "flow.off.2.h": "Pair evidence",
    "flow.off.2.p": "Before / after screens + raw clicks, keys, text",
    "flow.off.3.h": "Caption each step",
    "flow.off.3.p": "VLM: observation · intent · action · verify",
    "flow.off.4.h": "Group subtasks",
    "flow.off.4.p": "71 events → 6 subtasks with completion criteria",
    "flow.off.5.h": "Review &amp; save",
    "flow.off.5.p": "Human edit → reusable demo in the library",
    "flow.off.5.tag": "Reusable",
    "flow.bridge": "parsed into a subtask plan",
    "flow.on.badge": "Online",
    "flow.on.title": "Demo-in-the-loop at every step",
    "flow.on.shot.h": "Live screenshot",
    "flow.on.shot.p": "Authoritative live pixels",
    "flow.on.harness.h": "Harness Workflow Hook",
    "flow.on.harness.p": "Exposes only the active subtask",
    "flow.on.harness.meta": "Current subtask · milestones · advance pointer",
    "flow.on.status.write": "Current: Write sheet",
    "flow.on.status.export": "Current: Export",
    "flow.on.status.done": "Task finished",
    "flow.on.agent.h": "Agent",
    "flow.on.agent.p": "Decides from screen + guidance",
    "flow.on.desk.h": "Desktop",
    "flow.on.desk.p": "Real mouse &amp; keyboard",
    "flow.on.s1": "Navigate",
    "flow.on.s2": "Filter",
    "flow.on.s3": "Extract",
    "flow.on.s4": "Write sheet",
    "flow.on.s5": "Export",
    "flow.on.s6": "Done",
    "flow.edge.obs": "live pixels",
    "flow.edge.guide": "guidance",
    "flow.edge.act": "action",
    "flow.edge.next": "next observation",
    "flow.edge.done": "subtask_complete",
    "flow.on.note": "Harness keeps the checklist; the run ends after one or two subtasks complete.",

    "kicker.results": "03 — Results",
    "res.title": "Open-weight CUA — and more reliable with one demo",
    "res.lede": "One demonstration lifts scores on GameDev, OSWorld, and OSWorker paired subsets.",
    "res.chart.h": "Effect of one demonstration",
    "res.chart.note": "Average task score, without vs. with demo.",
    "res.chart.wo": "Without demo",
    "res.chart.w": "With one demo",
    "res.sub.gamedev": "GameDev",
    "res.sub.osworld": "OSWorld subset",
    "res.sub.osworker": "OSWorker subset",

    "kicker.demos": "04 — Demos",
    "demo.title": "See it run",
    "demo.lede": "General CUA on a real macOS desktop. DemoCUA clips coming next.",
    "demo.empty": "Drop the recording into <code>assets/demos/</code> to replace this placeholder.",
    "demo.f.mode": "Mode",
    "demo.f.platform": "Platform",
    "demo.f.instr": "Instruction",

    "kicker.citation": "05 — Citation",
    "cite.title": "Cite this work",
    "cite.lede": "If UI-Mate is useful in your research, please cite the technical report.",
    "cite.copy": "Copy",
    "cite.copied": "Copied",
    "cite.note": "Update the entry with the arXiv identifier and full author list once the report is public.",

    "foot.team": "Tencent HY Frontier &middot; Multimodal Agent Team",
    "foot.legal": "&copy; 2026 Tencent. Page template released for research communication."
  },

  zh: {
    "skip": "跳到正文",

    "nav.overview": "概览",
    "nav.approach": "方法",
    "nav.results": "结果",
    "nav.demos": "演示",
    "nav.citation": "引用",

    "hero.badge": "技术报告",
    "hero.title": "Advancing Open-Weight Foundation GUI Agents<br>with In-Context Demonstrations",
    "hero.tagline": "Strong general computer use — plus one demonstration when the instruction alone is not enough.",
    "hero.team": "腾讯混元Frontier &middot; Multimodal Agent团队",
    "hero.fineprint": "虚线边框的链接尚未公开。",

    "link.paper": "技术报告",
    "link.arxiv": "预印本",
    "link.code": "代码",
    "link.model": "模型权重",
    "link.video": "观看演示",

    "kicker.overview": "01 — 概览",
    "overview.title": "UI-Mate 是什么",
    "overview.lede": "开源权重的通用 GUI 智能体：环境驱动训练 + 上下文演示学习——流程演示一次即可，不必把所有约定写进提示。",
    "overview.fig": "通用计算机使用 + 演示引导执行。一段演示提升长程任务分数，而不会把智能体变成回放脚本。",

    "hl.osworld.k": "OSWorld-Verified",
    "hl.osworld.n": "Open-weight SOTA",
    "hl.waa.k": "WindowsAgentArena",
    "hl.waa.n": "Open-weight SOTA",
    "hl.worker.k": "OSWorkerBench",
    "hl.worker.n": "Strict / progress · +17.7 / +24.5 vs base",
    "hl.demo.k": "+ one demo",
    "hl.demo.n": "OSWorker paired · strict success",

    "kicker.approach": "02 — 方法",
    "approach.title": "三块拼图",
    "approach.lede": "闭环数据与训练栈、演示引导执行，以及能把演示收益单独拆出来的办公长程基准。",
    "approach.1.h": "环境驱动训练",
    "approach.1.p": "闭环数据飞轮：任务与环境构建、过滤轨迹、能力树再平衡，再进入 SFT + 在线 RL。",
    "approach.2.h": "上下文演示",
    "approach.2.p": "录一次 → 切成带说明的子任务工作流。运行时以实时截图为准；演示是参考，不是脚本。",
    "approach.3.h": "OSWorkerBench",
    "approach.3.p": "100 个长程办公任务，覆盖 41 个应用。配对演示用来单独看出：相对基线能力，一段演示到底多带来多少。",

    "flow.off.badge": "离线",
    "flow.off.title": "录制并结构化一段演示",
    "flow.off.1.h": "录制演示",
    "flow.off.1.p": "原生录制器 · 每一步都有前后截图",
    "flow.off.2.h": "配对证据",
    "flow.off.2.p": "前后截图 + 点击 / 按键 / 文本等原始事件",
    "flow.off.3.h": "逐步说明",
    "flow.off.3.p": "VLM：观测 · 意图 · 动作 · 校验",
    "flow.off.4.h": "归并子任务",
    "flow.off.4.p": "71 个事件 → 6 个子任务及完成条件",
    "flow.off.5.h": "审阅并保存",
    "flow.off.5.p": "人工修订 → 可复用演示入库",
    "flow.off.5.tag": "可复用",
    "flow.bridge": "解析为子任务计划",
    "flow.on.badge": "在线",
    "flow.on.title": "每一步都在 Demo-in-the-loop",
    "flow.on.shot.h": "实时截图",
    "flow.on.shot.p": "以当前屏幕像素为准",
    "flow.on.harness.h": "Harness Workflow Hook",
    "flow.on.harness.p": "只展开当前子任务",
    "flow.on.harness.meta": "当前子任务 · 关键里程碑 · 推进指针",
    "flow.on.status.write": "当前：写入表格",
    "flow.on.status.export": "当前：导出",
    "flow.on.status.done": "任务完成",
    "flow.on.agent.h": "智能体",
    "flow.on.agent.p": "结合屏幕与参考做决策",
    "flow.on.desk.h": "桌面",
    "flow.on.desk.p": "真实鼠标与键盘",
    "flow.on.s1": "导航",
    "flow.on.s2": "筛选",
    "flow.on.s3": "抽取",
    "flow.on.s4": "写入表格",
    "flow.on.s5": "导出",
    "flow.on.s6": "完成",
    "flow.edge.obs": "实时像素",
    "flow.edge.guide": "guidance",
    "flow.edge.act": "action",
    "flow.edge.next": "下一观测",
    "flow.edge.done": "subtask_complete",
    "flow.on.note": "Harness 维护 checklist；完成一两个子任务后整段任务结束。",

    "kicker.results": "03 — 结果",
    "res.title": "开源权重 CUA —— 一段演示后更可靠",
    "res.lede": "一段演示在 GameDev、OSWorld、OSWorker 配对子集上都会抬高分数。",
    "res.chart.h": "一段演示带来的提升",
    "res.chart.note": "平均任务分，无演示 vs. 有演示。",
    "res.chart.wo": "无演示",
    "res.chart.w": "有演示",
    "res.sub.gamedev": "GameDev",
    "res.sub.osworld": "OSWorld 子集",
    "res.sub.osworker": "OSWorker 子集",

    "kicker.demos": "04 — 演示",
    "demo.title": "实际运行",
    "demo.lede": "真实 macOS 桌面上的 General CUA。DemoCUA 片段后续补充。",
    "demo.empty": "把录屏文件放进 <code>assets/demos/</code> 即可替换这个占位。",
    "demo.f.mode": "模式",
    "demo.f.platform": "平台",
    "demo.f.instr": "指令",

    "kicker.citation": "05 — 引用",
    "cite.title": "引用本工作",
    "cite.lede": "如果 UI-Mate 对你的研究有帮助，欢迎引用这份技术报告。",
    "cite.copy": "复制",
    "cite.copied": "已复制",
    "cite.note": "技术报告公开后，请补上 arXiv 编号与完整作者名单。",

    "foot.team": "腾讯混元Frontier &middot; Multimodal Agent团队",
    "foot.legal": "&copy; 2026 Tencent. 本页模板用于研究成果传播。"
  }
};

/* ------------------------------------------------------------
   Demo-effect chart — without vs. with one demonstration.
   Values are percentages; `max` is 100 for bar normalisation.
   ------------------------------------------------------------ */
window.UIMATE_CHART = [
  { key: "res.sub.gamedev", max: 100, wo: 76.8, w: 81.2 },
  { key: "res.sub.osworld", max: 100, wo: 40.3, w: 65.8 },
  { key: "res.sub.osworker", max: 100, wo: 64.1, w: 74.9 }
];

/* ------------------------------------------------------------
   Demo reel. General CUA clips are live; DemoCUA slots stay
   placeholders until more recordings land in Demos/.
   ------------------------------------------------------------ */
window.UIMATE_DEMOS = [
  {
    id: "general-1",
    ready: true,
    src: "Demos/Genral/demo1.mp4",
    poster: "assets/demos/general-1.jpg",
    en: {
      tab: "General · 2048",
      title: "Play 2048 from the screen alone",
      desc: "UI-Mate reads the live board, plans merges, and drives arrow keys on a real Chrome window — no demonstration attached.",
      mode: "General CUA",
      platform: "macOS · Apple silicon",
      instr: "Please play 2048 at https://2048game.com/ and try to merge into larger tiles."
    },
    zh: {
      tab: "通用 · 2048",
      title: "只靠屏幕玩 2048",
      desc: "UI-Mate 观察实时棋盘、规划合并，并在真实 Chrome 窗口里按下方向键——不挂演示。",
      mode: "General CUA",
      platform: "macOS · Apple 芯片",
      instr: "请在https://2048game.com/网页玩 2048，尽量合成更大的数字"
    }
  },
  {
    id: "general-2",
    ready: true,
    src: "Demos/Genral/demo2.mp4",
    poster: "assets/demos/general-2.jpg",
    en: {
      tab: "General · Books",
      title: "Fill authors from Safari into Excel",
      desc: "Cross-app general CUA: open books.csv in Excel, look up each title in Safari, write Author/Year, sort, and save books_filled.xlsx.",
      mode: "General CUA",
      platform: "macOS · Apple silicon",
      instr: "There is a books.csv on the Desktop with one column of book titles. Open it in Excel; for each book, look up the author and first publication year in Safari; add Author and Year columns and fill them in; then sort all rows by Year ascending; finally save as books_filled.xlsx on the Desktop."
    },
    zh: {
      tab: "通用 · 书目",
      title: "用 Safari 查作者，填回 Excel",
      desc: "跨应用的通用 CUA：用 Excel 打开 books.csv，在 Safari 查作者与首版年份，补全后按年份排序并另存。",
      mode: "General CUA",
      platform: "macOS · Apple 芯片",
      instr: "桌面上有一个 books.csv,里面只有一列书名。请用 Excel 打开它,然后对每一本书,去 Safari 查出它的作者和首次出版年份,在表格里新增 Author 和 Year 两列并填上;填完后,把所有行按 Year 从早到晚排序;最后另存到桌面,文件名 books_filled.xlsx。"
    }
  }
];
