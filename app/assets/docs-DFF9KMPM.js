import{a as be,s as ve,t as te}from"./language-CDKmbKlT.js";const Ce=`---
title: Use it in Chrome
description: With the UI-Mate browser extension connected, the assistant opens pages, looks things up, and fills in forms in your own Chrome, using the sign-ins you already have.
---
## What it can do {#what}

Once connected, each task gets its own blue tab group in your Chrome, keeping its pages together. The assistant browses, clicks, and types in those tabs, and sites you're signed in to just work. You can take over or stop at any time.

## Requirements {#requirements}

- Google Chrome 120 or later.
- The extension ships with UI-Mate and loads from a folder the app provides. There's nothing to download from a store.

## Connect your browser {#connect}

Open **Settings → Browser** and follow the steps in the **Connect your browser** card. You only do this once; Chrome reconnects by itself afterwards.

1. **Open extensions page**: click the button, or type \`chrome://extensions\` in Chrome's address bar.
2. **Turn on Developer mode**: use the Developer mode switch in the top-right corner of that page.
3. **Load the UI-Mate extension**: in UI-Mate, click **Copy folder path**. In Chrome, click Load unpacked, press ++⌘++ ++Shift++ ++G++ in the folder window, paste the path, press Return, then click Select.
4. **It connects by itself**: within a few seconds of loading, the extension connects to UI-Mate. There is nothing to paste.

If it doesn't connect (for example, because automatic connection is off), use a connection code: in UI-Mate, click **Copy connection code**. In Chrome's toolbar, open Extensions (the puzzle icon) → **UI-Mate Browser** → **Use a connection code instead**, paste the code, and connect. The code is valid for 3 minutes and works once; if it expires, click **Copy a new code**.

![Settings → Browser: connect Chrome in four steps.](image:browser)

When it's done, the settings page shows **Chrome connected**.

> [!NOTE]
> The extension's pop-up is in English, for example \`Connected to UI-Mate\`.

## Once connected {#connected}

- The settings page lists **Browser tasks** and their tabs, with **Take over**, **Resume**, and **Stop**.
- Clicking a tab the task is using in Chrome pauses the assistant until you return control.
- To pair again, for example after reinstalling, click **Pair again**. To stop using it, click **Disconnect**. Disconnecting turns automatic connection off, so Chrome doesn't connect again by itself; to use it again, click **Turn on automatic connection**.
- **Disconnect** in the extension's pop-up disconnects only that Chrome profile. Click **Connect to UI-Mate** there to connect it again.
- If several Chrome profiles on this Mac have the extension, the one that connected first keeps the connection.
- If an unfamiliar copy of the extension tries to pair, the app asks **Allow this Chrome extension to control task tabs?**. If you don't recognize it, click **Don't allow**.

## If the browser disconnects {#disconnected}

When Chrome closes or the extension disconnects, tasks that use the browser show **Connect Chrome to continue**. Open Chrome and make sure the extension is turned on. It reconnects by itself without a new code. Then click **Continue task**.

When it continues, the assistant looks at the page again first. It doesn't automatically repeat a click or submission that was interrupted, so you won't get duplicate orders or messages.

## If the extension needs updating {#update-extension}

After UI-Mate updates, the extension in Chrome may still be the old version. Tasks then show **Update the Chrome extension to continue**. Follow the card:

- In \`chrome://extensions\`, find **UI-Mate Browser** and click reload; or
- if you loaded it from a different folder before, remove it, then load it from the app's folder as in step 3 above.

**Continue task** stays unavailable until the extension is updated.

## Limits {#limits}

- Protected fields such as password boxes, file uploads, complex online editors, and content embedded from other sites aren't guaranteed to work.
- Enter passwords and verification codes on the page yourself.
- Only Google Chrome is supported for now.
`,Ae=`---
title: Key concepts
description: Tasks and runs, assistants and models, Stealth and Takeover, and how demos, workflows, and skills differ.
---
## Tasks and runs {#task-and-run}

- A **task** is a conversation. Typing a goal on the home screen creates a new task.
- A **run** is one round of work by the assistant. A task can have several runs. Sending a follow-up, clicking **Run again**, or continuing after an interruption each adds a run to the same task.

At the top right of a task you can switch between **Full conversation** and **Run N**.

## Assistants and model connections {#assistant-and-model}

- The **assistant** is the program that plans steps and calls tools. UI-Mate offers **Codex** and **Claude Code**.
- A **model connection** is the model service behind the assistant, which you set up yourself; see [Connect a model](page:models).

The connection must match the assistant's interface: Codex uses the OpenAI protocol, and Claude Code uses the Anthropic Messages protocol.

## Computer modes {#computer-mode}

| Mode | How it works | Good for |
| --- | --- | --- |
| **Stealth** | Background first; foreground when needed. The assistant works in the app windows already on your screen and stays off your mouse and keyboard where it can | Keeping on with your own work, or tasks that touch only a few windows |
| **Takeover** | Uses your current desktop, mouse, keyboard, and focus, just like a person at the computer | Apps that don't work well in the background, or when you won't be using the computer |

In Stealth, if an action can't be done in the background, the assistant waits until you've stopped using the keyboard and mouse for about 2 seconds. Then it briefly brings that window to the front, does the action, and returns to the background. It won't take over an app you're actively using. For details, see [Start a task: choose a computer mode](page:tasks#computer-mode).

## Workspace {#workspace}

The **workspace** is where the assistant reads and writes files. If you don't choose one, UI-Mate creates a separate folder for each task. If you choose your own folder, the assistant can read the files in it and puts its output in a subfolder starting with \`ui-mate-output-\`.

## Demos, workflows, and skills {#demos-workflows-skills}

| Name | What it is |
| --- | --- |
| **Recording** (demo) | The screen, actions, and context captured while you do something yourself |
| **Workflow** | Reusable steps made from a recording. In **Demo CUA** task mode, the assistant follows it |
| **Skill** | A Markdown note with tips and rules for a kind of task, loaded by keyword or by hand |

Demos and workflows are guidance, not frame-by-frame playback. The assistant still decides based on what's on screen now. See [Record demos and workflows](page:recording) and [Skills](page:skills).

## Result checks {#result-checks}

A finished task only means the assistant stopped. **Result checks** let you describe a correct result up front, such as a file that must exist or the total of a CSV column. After the assistant finishes, the app checks the files independently and shows a verdict. See [Review results](page:results#checks).
`,Ie=`---
title: While it runs
description: Watch what the assistant is doing, add instructions, answer questions, take over, or stop at any time.
---
## Watch what it's doing {#watch}

- The conversation shows the current step and elapsed time live, such as **Thinking**, **Looking at the computer**, **Using the computer**, **Opening a page**, **Checking the result**, or **Running a command**. When a round ends it collapses to **Worked for X**. Click **View steps** to expand it.
- The **Computer** tab in the side panel shows a live view. Click **Open in a separate window** to keep it in a corner of your screen.
- In Takeover, a blue border appears at the screen edge, and a step card appears at the top right. It shows:
  - the task, the app being used, and the elapsed time;
  - the current **Step N**, what it is doing, and the assistant's explanation;
  - the last few steps, newest first, each with its step number and the clock time it happened (hh:mm:ss).

  The card ignores clicks. To step in, click **Take over** or **Stop** in the UI-Mate window.

![A running task: the conversation shows **Using the computer…**, and the side panel shows the window it's working in, with **Take over** and **Stop**.](image:task-running)

## Add instructions {#follow-up}

Type in the input box at the bottom of the task page, for example "Use English column headers" or "Only this month's data". Messages sent while it runs are queued: **Message queued. It will be delivered after the current turn.**

## Take over {#take-over}

When the assistant is stuck or off track, do it yourself:

1. On the computer view or in the separate window, click **Take over**, or type \`/takeover\`. The status changes to **You're in control**. The assistant's input stops immediately, and any queued actions are dropped.
2. Do the step yourself, such as signing in, selecting a file, or closing a pop-up.
3. Click **Resume** (**Return control** when the panel has no live view), or type \`/return\`. The assistant takes a fresh look at the screen before continuing.

> [!NOTE]
> Clicking a tab the assistant is using in Chrome also pauses it until you return control.

## Stop a task {#stop}

- Click **Stop** at the top right of the task page, or **Stop** in the separate computer window.
- Or type \`/stop\` in the input box: **Stop this run and keep the conversation and files**.

The status shows **Stopping**, then ends. The conversation, files, and completed steps are kept, so you can send another message or click **Run again** later. Quitting UI-Mate also stops running local tasks.

> [!WARNING]
> There's no global keyboard shortcut to stop a task yet. In Takeover, use **Stop** in the small window or on the task page.

## Answer questions and confirm actions {#questions}

- When the assistant needs information, a **Needs your input** card appears. Type in **Type your answer…** and click **Send answer**.
- With Claude Code, some commands and tools ask for your confirmation first, with **Allow this action** and **Deny**. The card title names the tool, for example \`Allow Bash?\`.
- Don't type passwords or verification codes into the conversation. Enter them in the app yourself, or **Take over** first.

## Needs your input {#needs-you}

When a task stops because of something outside it, its status becomes **Needs your input**, and a count appears next to **Recents** in the sidebar. The common cases:

![The card shown when the model connection fails: fix the connection, then click **Test and continue**.](image:recovery)

| Card | What to do |
| --- | --- |
| **Restore the model connection to continue** | Click **Edit model connection**, fix it, then click **Test and continue** |
| **Connect Chrome to continue** | Click **Open Browser settings**, reconnect, then click **Continue task** |
| **Update the Chrome extension to continue** | Reload the extension in Chrome as the card describes, then click **Continue task** |

Brief model service failures are retried automatically first; the card appears only if they keep failing. Click **Stop task** if you don't want to continue. For causes, see [Troubleshooting](page:troubleshooting).

## Commands while it runs {#commands}

Type \`/\` in the task page input box to use these:

| Command | What it does |
| --- | --- |
| \`/stop\` | Stop the current run |
| \`/takeover\` · \`/return\` | Take over / return control |
| \`/record\` | Pause the assistant and record a demo for this task |
| \`/computer\` | View the task screen and computer controls |
| \`/activity\` | View tool calls, status, and activity |
| \`/files\` | View files created during this run |
| \`/process\` | Step through the screens and actions of this run |
| \`/export\` | Export trajectory |
| \`/library\` | Open Library |
`,Se=`---
title: Install and launch
description: Download the DMG for your chip, drag it to Applications, open it for the first time, and keep it up to date.
---
## Requirements {#requirements}

| Item | Requirement |
| --- | --- |
| System | macOS 14 or later |
| Chip | Apple silicon (M series) or Intel. The download page lists a DMG per chip and says so when one isn't available yet |
| Model | A working model connection; see [Connect a model](page:models) |
| Other | Nothing else to install. Node, Python, and command-line tools are included |

## Download {#download}

1. Open the [download page](../releases/).
2. Choose a release channel. **Stable** is for everyday use; **Preview** gets new features earlier.
3. Choose your Mac's chip. If you're not sure, open the Apple menu → About This Mac.
4. Download the file named \`UI-Mate-version-mac-chip.dmg\`.

## Install {#install-app}

1. Double-click the downloaded DMG.
2. Drag **UI-Mate** into the Applications folder.
3. Eject the DMG.
4. Open UI-Mate from Applications or Launchpad.

> [!WARNING]
> Don't run the app straight from the DMG window. A copy running from the DMG confuses the macOS permission settings later. You may then see "not allowed" even though the switch is on.

## First launch {#first-launch}

The app opens on the home screen, titled **What would you like to do?**. UI-Mate needs no sign-up or sign-in. The user center at the bottom of the sidebar shows **No account needed**.

- **Interface language** follows your macOS language. To change it, open the user center at the bottom of the sidebar → **Language**, then choose **English** or **简体中文**.
- **No model connection yet**: a hint below the input box says **Add a model connection compatible with this assistant.** with an **Add model connection** button. Complete [Connect a model](page:models) first.
- **System permissions** aren't requested at launch. You're asked the first time the assistant needs to see the screen or use an app; see [Allow system access](page:permissions).

## Update to a new version {#update}

The app checks for a new version at launch and every 6 hours:

- When one is available, a banner shows **UI-Mate X is available**, and the sidebar shows **Update available**.
- To check yourself, open **Settings → Updates** and click **Check for updates**. The page shows your **Current version** and its channel. The channel matches the build you installed: Stable checks for stable releases, Preview checks for previews.

From 0.4.2 on, you can update from inside the app:

1. Click **Download and install**. UI-Mate downloads the new version and checks its signature and notarization.
2. When **Restart to update** appears, click it. While a task, a recording or a replay is running, the button stays disabled until it finishes or you stop it.
3. UI-Mate quits, swaps in the new version and opens again. Your chats, model connections and system permissions stay.

If the new version doesn't start properly, UI-Mate puts the previous version back and says so in **Settings → Updates**.

In a few cases the app can't update itself and shows **Download DMG** instead: when UI-Mate runs straight from the disk image, when it isn't in a folder it can write to, and in 0.4.1 and earlier. To install by hand:

1. Finish or stop any running task (**Stop** on the task page).
2. Press ++⌘Q++ to quit UI-Mate completely.
3. Open the new DMG, drag UI-Mate into Applications, and choose Replace.

> [!NOTE]
> Early 0.4 previews don't have the update banner yet. Install a new version once from the [download page](../releases/), and you'll be notified from then on.

## Upgrading from v0.3 {#from-v03}

- v0.3 doesn't show this update. Download and install the DMG yourself. The new version has the same name and replaces v0.3 when installed. To keep v0.3, rename it in Applications first.
- Allow Screen Recording and Accessibility again the first time you use the new version.
- Conversations, model settings, and long-term memory from v0.3 don't carry over. Connect your model again in the new version. The old data stays on your Mac untouched.
- Bring v0.3 recordings over with **Import recordings** in **Library**. By default they're in Documents/GUI_recorder.

## Uninstall {#uninstall}

1. Stop running tasks and press ++⌘Q++ to quit.
2. Drag UI-Mate from Applications to the Trash.
3. To also delete task history, screenshots, recordings, and saved connections, delete the data folder \`~/Library/Application Support/UI-Mate-v04\`. This can't be undone.
4. Optionally remove UI-Mate from the Accessibility and Screen Recording lists in System Settings → Privacy & Security.
`,_e=`---
title: The workbench
description: Where the sidebar, home input box, task page, Library, and Settings are, and what each is for.
---
## Sidebar {#sidebar}

| Item | What it does |
| --- | --- |
| **New task** (++⌘N++) | Back to the home screen to type a new goal |
| **Search chats** (++⌘K++) | Filter earlier chats by title |
| **Library** | Recordings, workflows, and skills |
| **Recents** | The 12 most recent unarchived chats, pinned ones first. Click this heading to open all chats; the number of tasks waiting for you shows next to it |
| **Settings** (++⌘,++) | Models, browser, permissions, notifications, and updates |
| User center **You · Local** | Language, usage guide, app updates, and bug reports |

A separate bug button at the bottom of the sidebar lets you [report a problem](page:results#feedback).

## Home input box {#composer}

![Home: the sidebar on the left, your goal in the input box, and the task mode, model, and computer mode menus below it.](image:home)

The home screen is titled **What would you like to do?**. Type a goal and press ++Enter++ or click **Start task**. The bottom of the input box has three menus:

- **Task mode**: **General** (work from your goal) or **Demo CUA** (follow a workflow from Library). You can also **Record a demo** from here.
- **Model**: choose the assistant (Codex or Claude Code) and model connection.
- **Computer mode**: **Stealth** or **Takeover**; see [Key concepts](page:concepts#computer-mode).

**Attach** on the left adds files or images. Typing \`/\` opens the command menu; see [Slash commands](page:tasks#slash-commands).

## Task page {#task-page}

When you open a task:

![A finished task: the conversation and result in the middle, and the **Files** tab listing the output and its result check.](image:results)

- **The header** shows the run status, task mode, assistant, model, workspace, and token count. On the right are **View steps**, then **Stop** while it runs or **Run again** after it ends, and the "…" menu.
- **The middle** is the conversation: your messages, the assistant's replies, the steps in progress, and cards that need your answer.
- **The side panel** has three tabs: **Computer** (live view), **Activity** (steps and token usage), and **Files** (files created in this run).
- **The input box at the bottom** sends follow-ups, even while the task runs.

## Task list {#tasks-page}

Click the **Recents** heading in the sidebar to open **Chats and tasks**, which you can filter by **All chats**, **Pinned**, or **Archived**. Each task's "…" menu (**Manage chat**) has:

- **Rename**
- **Export trajectory**: export the run history as a zip; see [Review results](page:results#export)
- **Pin chat**
- **Archive chat** / **Restore chat**
- **Delete chat**: deletes permanently, after asking you to confirm

## Library {#library}

**Library** is where you **record or import demos for Codex or Claude Code to follow.** It contains:

![Library: record a workflow, reusable workflows, and skills.](image:library)

- **Record a workflow**: start a new recording.
- **Reusable workflows**: prepared workflows. **Use workflow** starts a new task right away.
- **Skills**: built-in skills and your own. **Open skills folder** shows them in Finder.
- **Recordings**: every recording, where you can edit steps, learn in chat, or create a workflow.

See [Record demos and workflows](page:recording) and [Skills](page:skills).

## Settings {#settings}

Clicking **Settings** turns the sidebar into the settings menu:

- **General**: default model, vision model, result checks, computer mode, and workspace.
- **Notifications**: get notified when a task needs you, finishes, or fails; see [Phone and notifications](page:phone#notifications).
- **Updates**: see your version and check for updates.
- **Integrations**: **Assistant** (which assistant new tasks use, and whether each can run on this Mac), **Models**, **Browser**, **Permissions**.

Click **Back to app** to return to the workbench. If you came from a card inside a task, **Return to task** appears at the top.
`,Te=`---
title: Connect a model
description: UI-Mate doesn't include a model. Add a model connection, pass the test, then choose Codex or Claude Code as your assistant.
---
At every step the assistant sends the task, a screenshot, and tool results to a model. Then it acts on the model's answer. So before you start a task, you need at least one model connection that has passed the test.

## Open model settings {#open-settings}

- In the sidebar, click **Settings** (++⌘,++). Under **Integrations**, choose **Models**, then click **Add connection**.
- Or click **Add model connection** in the hint below the input box on the home screen.

## Choose a connection type {#connection-type}

| Type | Use it for |
| --- | --- |
| **API Key** | A model provider (OpenAI, Anthropic, or another OpenAI-compatible service), or a gateway your organization runs |
| **VLM Host** | A local or self-hosted model server; just enter its address |

## Fill in the connection {#fill-in}

| Field | What to enter |
| --- | --- |
| **Provider** | OpenAI, Anthropic, or **Other (OpenAI-compatible or custom URL)** |
| **Base URL** / **Server URL** | The service's API address, usually ending in \`/v1\` |
| **Multi-provider gateway** | Turn on if your key is for a gateway that reaches several model providers, such as your company's model gateway. Leave it off for an OpenAI or Anthropic key |
| **Model** | The model name, exactly as your provider spells it |
| Key | Paste the API key from your provider |
| **Name (optional)** | A label that helps you tell connections apart |

**Advanced settings** has **API protocol** (default **Automatic (recommended)**), **Provider route** (for a multi-provider gateway), **Authentication**, and **Context length (tokens)**. Keep the defaults unless your provider says otherwise.

Keys are encrypted on this Mac and never shown again after you save.

### Use it for {#roles}

Each connection can have one or more roles:

- **Assistant**: the main model that carries out tasks.
- **Vision**: reads screenshots to decide where to click.
- **Recording processing**: writes step captions for recorded demos and splits them into subtasks; see [Record demos and workflows](page:recording#after).

Click **Save connection** when you're done.

To try another model or key with the same settings, click **Duplicate** on a saved connection. The copy opens with every field filled in and "copy" added to its name. It keeps the original's key until you enter another one; if you change the address, enter the key again.

## Test the connection {#test}

![Models: each connection shows its text, vision, and tool call checks.](image:models)

Click **Test connection**. The app checks **Text**, **Vision**, and **Tool calls**, and marks each **Passed**, **Failed**, or **Not tested**. The connection card then shows one of these:

- **Text and tools ready**: you can start tasks.
- **Needs attention**: a check failed. Follow the hint, fix it, and test again.
- **Not tested**: not checked yet.

> [!NOTE]
> **Start task** on the home screen stays disabled until the text and tool checks pass. Test again after changing the model, address, or key.

## Choose an assistant: Codex or Claude Code {#assistant}

UI-Mate includes two assistants. Both use the same computer and file tools:

| Assistant | Model interface it needs |
| --- | --- |
| **Codex** (default) | OpenAI protocol: Responses or Chat Completions |
| **Claude Code** | Anthropic Messages protocol |

You don't have to match them by hand:

- **Test connection** also tries the other assistant's protocol at the same address. If the service answers both (gateways often do), the connection works with both assistants, and each uses its own protocol. The connection card shows **For Codex and Claude Code**.
- The **Model** menu at the bottom of the input box lists every model. Models the current assistant can't use are at the end, marked **switches to …**; choosing one switches the assistant for you.

The same **Model** menu also sets the **Reasoning effort**, for Codex and Claude Code alike: Default, Extra high, High, Medium or Low. Default leaves it to the assistant: extra high for Codex, high for Claude Code. Lower answers faster; higher plans more carefully. The button shows the current level, such as **gpt-6.1-terra · High**. Levels the model's check found it doesn't take are greyed out. To set which assistant new tasks use, go to **Settings → Integrations → Assistant** and choose under **New tasks use**. The same page's **On this Mac** section shows each assistant as **Available** or **Not ready**. Existing conversations keep the assistant they started with.

## Vision model {#vision}

**Settings → General → Vision model** defaults to **Use assistant model**. If your assistant model can't read images, or you want a dedicated model to locate things on screen, choose another connection with the **Vision** role here.

## If it won't connect {#trouble}

When the test fails, check the model name, address, and key against the hint. For common causes and fixes, see [Troubleshooting: model connection fails](page:troubleshooting#model).
`,xe=`---
title: UI-Mate Guide
nav: UI-Mate Guide
description: Use UI-Mate as a hands-on partner on your Mac. Install it, connect a model, hand over a task, and step in whenever you need to.
---
This guide is for everyday UI-Mate users. You don't need to know how it works inside. Describe the result you want in one sentence. The assistant reads the screen, works in your apps and files, and gets it done. While it works you can watch, add instructions, take over, or stop at any time.

![The assistant working in Stealth mode: the conversation on the left, the window it's working in on the right.](image:task-running)

## Start here {#start-here}

1. [Install and launch](page:install): download the DMG, drag the app to Applications, and open it from there.
2. [Connect a model](page:models): add a model connection and pass the test so the assistant can start.
3. [Allow system access](page:permissions): the first time it uses your computer, turn on Accessibility and Screen Recording when asked.
4. [Start a task](page:tasks): type a goal on the home screen and press ++Enter++.

> [!TIP]
> Start with a small task that is easy to check, such as "Create notes.txt in the workspace and write today's date in it". It confirms your model, permissions, and computer mode all work.

## What it can do {#what-it-does}

- **Work in your Mac apps**: click, type, and switch windows in apps you're already signed in to, keeping your sessions.
- **Handle files**: read and write files in the workspace, produce reports, tidy spreadsheets, rename files in bulk.
- **Work in Chrome**: once the browser extension is connected, open pages, fill in forms, and look things up in your own Chrome.
- **Learn your way of working**: record a demo once, and it refers to your steps in similar tasks later.

## How this guide is organized {#how-this-guide-is-organized}

| Section | Read it when |
| --- | --- |
| [Get started](page:install) | Installing for the first time, connecting a model, allowing access, learning the key terms |
| [Use the workbench](page:interface) | Day-to-day work: the interface, starting tasks, controls while it runs, reviewing results |
| [Teach your way of working](page:recording) | Recording demos, turning them into workflows, adding know-how with skills |
| [Browser and phone](page:browser) | Letting the assistant use Chrome, checking on tasks from your phone |
| [Help and reference](page:troubleshooting) | Fixing problems, keyboard shortcuts, file locations, and privacy |

## Three things to remember {#three-things}

- **You can always stop**: **Stop** at the top right of a task ends the current run. The conversation and files are kept.
- **You can take over**: if it goes off track, click **Take over** on the computer view and do it yourself, then click **Resume** to let it carry on.
- **"Finished" doesn't mean "correct"**: a finished run only means the assistant stopped. For files that matter, set up [result checks](page:results#checks) so the app verifies them independently.

## Requirements {#requirements}

macOS 14 or later; a Mac with Apple silicon or an Intel chip (choose your chip on the [download page](../releases/)); and a working model connection. Everything else UI-Mate needs is included in the app. You don't need to install Node, Python, or command-line tools.
`,Me=`---
title: Allow system access
description: To see the screen and use your apps, the assistant needs macOS Accessibility and Screen Recording access. The app guides you through it, and no restart is needed.
---
## What's needed {#which}

| Permission | What it's for |
| --- | --- |
| **Accessibility** | Lets UI-Mate read and operate app interfaces |
| **Screen Recording** | UI-Mate uses screenshots to know where to click. Recording demos needs it too |
| **Chrome extension** (optional) | Lets the assistant work in your Chrome; see [Use it in Chrome](page:browser) |

The first time the assistant controls another app, macOS may also ask whether UI-Mate can control it. Click Allow.

Permissions aren't requested all at once at launch. The app asks the first time it needs to see the screen or use your computer.

## Allow access in the app {#grant}

1. Open **Settings → Permissions**. The page is titled **Enable UI-Mate computer use**.
2. On the **Accessibility** row, click **Allow**. System Settings opens to the right page with a small guide panel next to it.
3. Drag the UI-Mate tile from the guide panel into the list above. If UI-Mate is already in the list, turn on its switch instead.
4. When the panel shows access is allowed, click **Back to UI-Mate**.
5. Repeat for **Screen Recording**.

![Permissions: Accessibility is allowed; Screen Recording still needs **Allow**.](image:permissions)

Once both rows show **Allowed**, the page says **Local computer tasks are ready. The Chrome extension is optional.**

> [!TIP]
> You don't need to restart the app. The page checks again on its own and updates within a few seconds.

## Asked again during a task {#in-task}

If a permission is missing while a task runs, the computer panel shows **Accessibility permission needed** or **Screen recording permission needed**. Click **Accessibility settings** or **Screen recording settings**, turn the switch on, then click **Retry after granting access**.

## The switch is on but access is still denied {#still-denied}

After an update or reinstall, the old entry in System Settings sometimes doesn't match the new app. To fix it:

1. Make sure there's only one UI-Mate in Applications and that you opened it from there, not from the DMG.
2. In the Accessibility or Screen Recording list in System Settings, select UI-Mate and click "−" to remove it.
3. Go back to **Settings → Permissions** in UI-Mate, click **Allow** again, and follow the guide to add it back.

## Which apps the assistant may use {#app-access}

Besides the system permissions, the assistant asks you before it uses an app:

- In background mode, the first time it connects or opens an app, the conversation shows **Allow UI-Mate to use X?**.
- In Takeover, before it starts, it asks **Allow full control of this Mac?**, because it uses your screen, mouse, keyboard and focus and sees every app on screen.

Each time you can choose:

| Choice | Effect |
| --- | --- |
| **Allow in this conversation** | Not asked again for the rest of this conversation; a new conversation asks again |
| **Always allow** | Not asked again in any conversation |
| **Deny** | The assistant doesn't use it for the rest of this run, and finds another way or asks you |

A window you choose yourself in the computer window isn't asked about.

In **Settings → Permissions**, under **App access**, you can turn on **Allow all apps** or **Always allow full control in Takeover**, and remove apps from **Always allowed apps** one by one.

## What happens once access is allowed {#what-it-sees}

- Screenshots and interface details are read only when a task needs them. They're sent with the task to the model connection you configured, so it can decide the next step.
- Screenshots for each step are kept on your Mac so you can review them in [View steps](page:results#steps).
- You can turn these permissions off in System Settings at any time. The assistant then can no longer see the screen or use apps.

For more, see [Privacy and data](page:reference#privacy).
`,Ue=`---
title: Phone and notifications
description: Check on and handle tasks from your phone on the same local network, or get notified through Feishu, DingTalk, or WeCom.
---
> [!WARNING]
> Phone Connection is a preview. It works only on the same Wi-Fi or local network, hasn't been verified on every phone, and may change. The phone page is currently in Chinese. Phone Connection closes when you quit UI-Mate.

## What your phone can do {#what}

- Start a new task, and follow its progress and conversation.
- Approve or deny confirmations.
- Answer the assistant's questions and add instructions.
- Stop a task.
- Download a task's output to the phone (up to 25 MB per file).

By default, a phone sees only the tasks it started. Share existing tasks from the computer separately. The phone can't control the computer's screen.

## Turn on Phone Connection {#enable}

1. In UI-Mate's menu bar, open \`Phone Connection\` → \`Enable Phone Connection…\`.
2. Choose a computer address your phone can reach, usually your Wi-Fi address.

If the phone can't open it even on the same Wi-Fi, a router's guest network isolation, a firewall, or a VPN may be blocking it.

## Install the connection certificate {#certificate}

The phone browser needs to trust a certificate created on this computer to connect securely. You only do this once:

1. In the menu bar, choose \`Phone Connection\` → \`Export connection certificate…\`, save the \`.cer\` file, and note the SHA-256 fingerprint shown.
2. Transfer the certificate to the phone (for example with AirDrop), check the fingerprint, and install it.
3. On iPhone, after installing the profile, turn on full trust for it in Settings → General → About → Certificate Trust Settings. On Android, import it from the system's certificate installation settings.

> [!NOTE]
> Transfer only the exported public certificate. Don't copy any other files from UI-Mate's data folder. Don't connect by dismissing the browser's certificate warning.

## Pair {#pair}

1. In the menu bar, choose \`Phone Connection\` → \`Generate pairing code…\`. The window shows the connection address and a pairing code like \`XXXX-XXXX-XXXX\`. The code is valid for 5 minutes and works once. \`Copy URL and code\` copies both.
2. Open the address in your phone's browser and enter the code.
3. The computer asks \`Allow "phone name" to connect to this computer?\`. If it's your phone, click \`Allow pairing\`.

After pairing, the phone stays signed in for 7 days.

## Manage devices {#devices}

In the menu bar, open \`Phone Connection\` → \`Paired devices\` and pick a device:

- \`Share an existing task\`: share a task from the computer with it.
- \`Revoke this device\`: revoke it so it can no longer connect.

The phone can also disconnect itself. When you no longer need it, choose \`Disable Phone Connection\` to turn the feature off.

## Native iOS app {#ios}

The native iOS app isn't publicly available yet. Use your phone's browser for now.

## Notifications {#notifications}

When you're away from the computer, UI-Mate can notify you through your work chat. Open **Settings → Notifications** and choose one of two options:

- **Group bot**: enter a Feishu, DingTalk, or WeCom group bot webhook. It sends notifications only.
- **WeCom smart bot**: after setting it up, send the 6-digit **Pairing code** to the bot within 10 minutes. You can then reply in WeCom to answer questions or add instructions, or tap Approve or Deny on a card. You can also send \`status\`, \`help\`, \`stop\`, or \`#task-id stop\`.

Choose when to be notified: **Needs you**, **Finished**, and **Failed or interrupted**.

> [!NOTE]
> Notifications are also a preview. They pass through your chat provider's servers. UI-Mate redacts the notification text, but send them only to groups or chats you trust.
`,Ne=`---
title: Record demos and workflows
description: For unfamiliar software or a fixed internal process, show it once, then turn the recording into a workflow you can reuse.
---
A demo is guidance for the assistant. It looks at how you did it, but still decides based on what's on screen now instead of copying frame by frame. So it can usually cope when the interface changes a little. The flip side is that it won't necessarily repeat every step of your demo.

## Record a demo {#record}

1. Open **Library**. In the **Record a workflow** card, fill in **Demo name (optional)**.
2. Click **Start recording**, then do the task as you normally would.

You can also choose **Record a demo** from the **Task mode** menu on the home screen, or type \`/record\` there. Both open Library and start recording right away.

Recording needs **Screen Recording** access; see [Allow system access](page:permissions).

## While recording {#while-recording}

Once recording starts, a small pill at the top of the screen shows \`Recording\` and the elapsed time. There are three ways to finish:

- Click \`Stop\` on the pill. You can drag the pill around, and it's left out of the recording.
- Click the recording icon in the menu bar and choose \`Stop and save\`.
- Go back to UI-Mate and click **Stop recording** in Library.

> [!TIP]
> Move slowly, record one main flow at a time, and keep passwords and other sensitive details out of the recording. There's no keyboard shortcut to stop recording yet.

## Record during a task {#during-task}

If you'd rather show the assistant yourself in the middle of a task, click **Record demo** or type \`/record\`. The assistant pauses, and **Recording demo** appears at the top. Finish the recording, then return control to the assistant.

When the assistant gets stuck, it may also ask you for a demo, with a **Start demo** button on the card.

## After recording {#after}

When you stop, a **Recording ready** card appears:

- **Preview / Edit**: look through the recorded steps.
- **Process**: use a model to name the demo, caption each step, and split it into subtasks. This needs a model connection with the **Recording processing** role; see [Connect a model](page:models#roles).
- **Learn in chat**: open a conversation where the assistant learns this demo, so you can add explanations.
- **Dismiss**: deal with it later.

If only the click on Stop was captured, the recording is marked **No actions captured**. Record it again.

## Edit steps {#edit}

In Library's recording list, click **Edit steps** to open **View and edit steps**:

![The step editor: the step list on the left, and the screen before and after the selected step on the right.](image:step-editor)

- Change the task goal and each step's action and **Note**.
- **Move up**, **Move down**, or **Delete step**; group steps with **Subtask** and **Add subtask**.
- Each step can also carry notes on what you observed, intended, expected, and what to check afterwards.
- **Undo** (++⌘Z++) and **Redo** (++Shift++ ++⌘Z++). Click **Save changes** when done, or **Process with model** to regenerate the captions.

After you save, workflows created from the old version need to be created again.

## Create and use a workflow {#workflow}

1. Click **Create workflow** on a recording. It appears under **Reusable workflows**, labelled **Guided replay** with its step count.
2. Click **Review steps & evidence** to check it, or **Create recipe** to add the goal, inputs it needs, and success criteria.
3. Click **Use workflow**. A new task opens in **Demo CUA** mode, with the workflow shown on the home screen and **Change workflow** or **Remove workflow** available.
4. Type the specific goal for this time and start the task.

## Import and export {#import-export}

- **Import recordings**: click it at the top right of Library and choose a recording folder, or a folder containing several recordings. A summary shows how many were imported, skipped, and failed. The app keeps its own copy and leaves the originals untouched. v0.3 recordings are in Documents/GUI_recorder by default.
- **Export workflow**: click it in a workflow's details. It exports a folder (with \`SKILL.md\`, \`workflow.json\`, and the recording) and shows it in Finder.

> [!WARNING]
> Recordings and exported workflows contain screen images and whatever you typed. Before sharing, check there's nothing others shouldn't see.
`,Re=`---
title: Shortcuts and file locations
description: Common keyboard shortcuts, where UI-Mate keeps its files on your Mac, and which data leaves your Mac.
---
## Keyboard shortcuts {#shortcuts}

| Shortcut | What it does |
| --- | --- |
| ++⌘N++ | New task |
| ++⌘K++ | Search chats |
| ++⌘,++ | Open Settings |
| ++Enter++ | Send a message / start a task |
| ++Shift++ ++Enter++ or ++Option++ ++Enter++ | New line |
| ++Esc++ | Close menus and dialogs |
| Arrow keys | Previous or next step on the steps page |
| ++⌘Z++ / ++Shift++ ++⌘Z++ | Undo / redo in the step editor |
| ++⌘Q++ | Quit UI-Mate completely |

## File locations {#files}

| Content | Location |
| --- | --- |
| Data folder | \`~/Library/Application Support/UI-Mate-v04\` |
| Default task workspaces | \`workspaces/\` in the data folder |
| Screenshots of each step | \`runs/\` in the data folder |
| Recordings | \`tools/recordings/\` in the data folder |
| Exported workflows | \`tools/exports/\` in the data folder |
| Skills | \`skills/\` in the data folder |
| Exported trajectories | \`~/Documents/exported_traj/\` |

In Finder, press ++⌘++ ++Shift++ ++G++ and paste a path to open it. Screenshots stay on your Mac so you can review them later.

## Privacy and data {#privacy}

- **No account needed.** Tasks, conversations, screenshots, and recordings are stored on your Mac.
- **What goes to the model**: while a task runs, the goal, conversation, screenshots, and tool results are sent to the model connection you configured. Choose a provider you trust.
- **Keys** are encrypted on this Mac and never shown again after you save them.
- **Browser**: the assistant works only in the task's own tab group.
- **Bug reports** only open a public GitHub draft for you to review and submit. No logs or screenshots are attached.
- **Update checks** read public release information only and don't upload your data.
`,Le=`---
title: Review results
description: Open the files it produced, step through each action, verify results independently, export the record, or report a problem.
---
## Conversation and files {#in-chat}

When the assistant finishes, it explains what it did in the conversation. The **Files** tab in the side panel lists the files created in this run; click one to open it.

## Step through it {#steps}

Click **View steps** at the top right of the task page to open **Steps in this run**. For each step you can see:

- the screen the model **Seen** and the screen **After** the action;
- the assistant's **Thinking**;
- the exact **Tool calls** and their results.

![The steps page: the step list on the left; on the right, what the model saw at this step, its thinking, and its tool calls.](image:steps)

Use the arrow keys to move between steps. If a step went wrong, tell the assistant in the conversation.

## Result checks {#checks}

**Result checks** let the app verify files independently after the assistant finishes, instead of taking "done" at its word.

1. Before you start the task, open **Settings → General → Result checks** and click **Configure checks**.
2. Click **Add check**, choose a condition, and fill in the **File in task folder** and the expected value.
3. Click **Save checks** and go back to the home screen. "N result checks" appears below the input box.
4. Start the task. The checks are saved with it and run again on **Run again**. Set them up again for your next new task.

Available conditions:

| Condition | Example |
| --- | --- |
| **File exists** | \`report.xlsx\` was created |
| **Text contains** | \`summary.md\` mentions "East region" |
| **Text matches exactly** | \`result.txt\` contains exactly \`42\` |
| **JSON contains values** | \`status\` in \`result.json\` is \`done\` |
| **CSV row count** | \`orders.csv\` has 128 rows, not counting the header |
| **CSV column total** | the "Amount" column in \`orders.csv\` adds up to \`10234.50\`, optionally with **Only check matching rows** |

![When the checks pass, **File checks passed** appears under the task title and in the **Files** tab.](image:results)

After the run you'll see **File checks passed**, **File checks failed**, or **Could not verify**. Tasks without checks show **Not independently verified**. If a check fails, click **Ask assistant to fix**.

## Run again {#runs}

After a task ends, **Run again** at the top right runs the same goal again and records it as a new run in the same task. With several runs, switch between **Full conversation** and **Run N**.

## Token usage {#tokens}

The task header shows how many tokens the task used. **Token usage** in the **Activity** tab breaks this down into **Input**, **Cached**, **Output**, and **Total**, plus the running total for the **Whole conversation**.

## Export trajectory {#export}

Choose **Export trajectory** from the task's "…" menu, type \`/export\`, or click **Export trajectory** on the steps page. The task's run history is exported as a zip to Documents/exported_traj by default and shown in Finder.

> [!WARNING]
> An exported trajectory contains screenshots of every step and the conversation, which may include personal or work information. Review it before sharing.

## Report a problem {#feedback}

Click the bug button in the sidebar, or **Report a bug** in the user center:

1. Fill in **Summary** and **What happened?**.
2. Click **Continue to GitHub**. Your browser opens a draft of a public GitHub issue.
3. Review it on GitHub and submit it yourself.

The draft contains only what you typed and the app version. No logs, screenshots, file paths, or keys are attached, and nothing is sent automatically. Because the issue is public, leave out private information.
`,Ee=`---
title: Skills
description: Write the key points and rules for a kind of task in a Markdown file, and the assistant brings them along to related tasks.
---
## What a skill is {#what}

A skill is a Markdown note with tips for a piece of software or a kind of task, such as "how to search for a contact in WeCom" or "rules for filling in expense claims". When a task starts, relevant skills are added to the assistant's context. UI-Mate comes with a few built-in skills, and you can write your own.

## Browse skills {#browse}

Open **Library → Skills**. Each skill shows where it came from and how it loads:

- Source: **Built-in**, **Built-in · edited**, or **Yours**.
- Loading: **Loads automatically for: …**, or **Loads only when you add it**.

Click **Use in a new task** to start a task with that skill.

## How skills load {#how-loaded}

- **Automatically**: a skill loads when its keywords appear in your message, up to 3 per message. Skills marked **Auto** appear above the input box; click × to skip one for this message.
- **By hand**: type \`/skill-name\` in the input box and pick it from the menu.

Under each sent message, **Skills: …** lists what was loaded, with **· auto** for automatic ones.

> [!NOTE]
> Tasks started from your phone or the WeCom bot load only automatically matched skills.

## Write your own {#write}

1. In **Library → Skills**, click **Open skills folder**.
2. Create a \`.md\` file, or a folder containing \`SKILL.md\`. The file name (or folder name) is the name you type after \`/\`.
3. Start the file with a short header, then write the body:

\`\`\`
---
name: Expense helper
description: Rules for our expense claims
keywords: expense, invoice, travel
---
## Fill in an expense claim <!--kw: claim, reimburse-->
- The invoice date must fall within the trip
- Round amounts to two decimal places
\`\`\`

- \`keywords\` are comma-separated; any one of them in a message loads the skill. Without keywords, the skill loads only when you add it.
- Body sections whose \`##\` heading carries a \`<!--kw: …-->\` tag (or starts with \`操作\`) are operations: the one that best fits the task goal is used. Everything before the first operation is always included.
- No restart needed: your next message uses the updated file. Each file can be up to 256 KB.

If you edit a built-in skill it shows **Built-in · edited**, and app updates won't overwrite your changes.
`,$e=`---
title: Start a task
description: Describe the goal clearly, pick a computer mode and workspace, and add attachments or a workflow when it helps.
---
## Describe the goal {#describe}

In the home input box, describe the **result** you want rather than step-by-step instructions. A good goal usually says:

- What the result looks like: "Summarize the East region orders in \`sales.csv\` by month and save them as \`east-monthly.xlsx\`."
- Which apps or sites to use: "Send this file to the project group in WeCom."
- Any limits: "Don't change the original file", "Show me before sending."

Press ++Enter++ to send. ++Shift++ ++Enter++ or ++Option++ ++Enter++ adds a new line.

> [!TIP]
> For actions that can't be undone, like sending, submitting, or deleting, add "ask me first" to the goal. The assistant can stop and wait for your answer with a question card.

## Choose a computer mode {#computer-mode}

Pick one in the **Computer mode** menu at the bottom of the input box, or type \`/stealth\` or \`/takeover\`:

![The Computer mode menu](image:computer-mode)

- **Stealth**: background first; foreground when needed. The assistant works in the app windows already on your screen and keeps their sign-ins, so you can keep using your computer.
- **Takeover**: uses your current desktop, mouse, keyboard, and focus. While it runs, a blue border and **UI-Mate is controlling your computer** appear at the screen edge. Don't use the computer at the same time.

About Stealth:

- When an action can't be done in the background, the assistant waits until you've stopped using the keyboard and mouse for about 2 seconds. Then it briefly brings that window to the front, and the computer panel shows **Assistant using foreground**. It won't take over an app you're actively using. Once a run goes to the front, it stays there until the run ends, so it doesn't keep switching while you try to follow it.
- Apps differ in how well they support background control. If one keeps failing, switch to Takeover for a steadier result.
- To see the window the assistant is working in, open that app directly at any time, or click **Open app** in the computer panel.

Change the default in **Settings → General → Computer mode**.

## Choose a workspace {#workspace}

Type \`/workspace\`, or go to **Settings → General → Workspace** and click **Choose folder**.

- Without one, each task gets its own folder.
- With your own folder, the assistant can read the files in it. Its output goes in a subfolder starting with \`ui-mate-output-\`, kept apart from your originals.

## Add attachments {#attachments}

Click **Attach** at the left of the input box, drop files in, or paste an image. Up to 8 files, 10 MB each, 30 MB in total.

## Slash commands {#slash-commands}

Type \`/\` in the home input box to open the command menu. Use ++↑++ ++↓++ to move, ++Enter++ or ++Tab++ to choose, and ++Esc++ to close.

| Command | What it does |
| --- | --- |
| \`/general\` | General mode: work from your goal |
| \`/demo\` | Demo CUA: follow a workflow from Library |
| \`/record\` | Record a demo |
| \`/model\` | Choose a model |
| \`/workspace\` | Choose a workspace |
| \`/stealth\` · \`/takeover\` | Switch computer mode |
| \`/browser\` | Open browser settings |
| \`/settings\` | Open Settings |
| \`/new\` | Start a new task |

Installed skills appear in the menu too; type \`/skill-name\` to add one; see [Skills](page:skills#how-loaded). A different set of commands is available inside a running task; see [While it runs](page:control#commands).

## Follow a workflow {#with-workflow}

If you've recorded a similar task and made it into a workflow, choose **Demo CUA** in **Task mode**, or click **Use workflow** on a workflow in Library. The workflow being followed shows above the input box, with **Change workflow** and **Remove workflow**. See [Record demos and workflows](page:recording#workflow).

## Bring in Chrome {#browser}

For work on web pages, first connect the Chrome extension in **Settings → Browser**. The assistant then works in its own group of tabs in your Chrome; see [Use it in Chrome](page:browser).
`,Oe=`---
title: Troubleshooting
description: Find the cause and the fix by what you're seeing.
---
## Start task is disabled {#start-disabled}

- No model connection has passed the test yet. Go to **Settings → Models** and click **Test connection** until it shows **Text and tools ready**.
- The selected connection doesn't match the assistant. Codex needs the OpenAI protocol, and Claude Code needs the Anthropic Messages protocol. Pick a compatible connection in the **Model** menu at the bottom of the input box; see [Choose an assistant](page:models#assistant).
- The \`/\` command menu is still open. Press ++Esc++ to close it.

## Model connection fails {#model}

When a task shows **Restore the model connection to continue**, the card states the cause. Common ones:

| Cause | What to do |
| --- | --- |
| Wrong key, or no access to the model | Click **Edit model connection** and paste the key again |
| Out of quota, or too many requests | Wait a while, or switch to another connection |
| Network, proxy, or address problem | Check the **Base URL** and that your network can reach it |
| The provider doesn't have this model | Check the **Model** name letter by letter |
| Protocol mismatch | In **Advanced settings**, set **API protocol** to **Automatic (recommended)**, or follow your provider's docs |

After fixing it, click **Test and continue**. Brief service failures are retried automatically a few times first, so when the card appears you usually need to change a setting.

## Permissions still show as not allowed {#permissions}

See [The switch is on but access is still denied](page:permissions#still-denied).

## Clicks do nothing or land in the wrong place {#click}

- Check that Accessibility and Screen Recording both show **Allowed**.
- While it runs, avoid moving the target window, changing resolution, or switching displays.
- In Stealth, some apps don't accept background input. Let it switch to the foreground, or use **Takeover** instead.
- Click **Take over**, do that step yourself, then click **Resume**.

## A window jumps to the front in Stealth {#foreground}

That's expected. When an action can't be done in the background, the assistant waits until you've stopped using the keyboard and mouse for about 2 seconds. Then it briefly brings the window to the front to do it, and the computer panel shows **Assistant using foreground**. It waits while you're using the keyboard or mouse. Once a run goes to the front, the window stays there until the run ends. If you don't want this, **Take over** or **Stop** the task.

## Chrome problems {#chrome}

- **Connect Chrome to continue**: see [If the browser disconnects](page:browser#disconnected).
- **Update the Chrome extension to continue**: see [If the extension needs updating](page:browser#update-extension).

## The task finished, but the result is wrong {#wrong-result}

"Finished" only means the run ended. You can:

- Click **View steps** to find the step that went wrong.
- Say what's wrong in the conversation and ask it to fix it.
- For files that matter, set up [result checks](page:results#checks) before the next run.
- For a fixed process, record a [demo](page:recording) for it to follow.

## A recording shows "No actions captured" {#recording-empty}

Check that **Screen Recording** and **Accessibility** are allowed, then record again. After starting, actually do the steps before you stop the recording.

## What happens when I quit the app {#quit}

Running local tasks stop and Phone Connection closes. Tasks, conversations, files, and recordings are kept. Next time you can send another message or click **Run again**.

## Still stuck {#feedback}

Click the bug button in the sidebar to [report a problem](page:results#feedback), describing what you did and what you saw. You can also check [existing reports](https://github.com/UI-Mate/ui-mate.github.io/issues) for the same issue.
`,De=`---
title: 在 Chrome 中使用
description: 连接 UI-Mate 浏览器扩展后，助手在你自己的 Chrome 里打开网页、查资料、填写表单，沿用已有的登录状态。
---
## 能做什么 {#what}

连接后，每个任务会在你的 Chrome 里有一组蓝色的专用标签页，相关页面集中在一起。助手在这些标签页里浏览、点击和输入，你已经登录的网站可以直接使用。你随时可以接管或停止。

## 要求 {#requirements}

- Google Chrome 120 或更高版本。
- 扩展随 UI-Mate 一起提供，从 App 给出的文件夹加载，不需要去应用商店下载。

## 连接浏览器 {#connect}

打开 **设置 → 浏览器**，按 **连接浏览器** 卡片里的步骤操作。只需设置一次，之后 Chrome 会自动重新连接。

1. **打开扩展页面**：点按钮，或在 Chrome 地址栏输入 \`chrome://extensions\`。
2. **打开开发者模式**：打开该页面右上角的「开发者模式」开关。
3. **加载 UI-Mate 扩展**：在 UI-Mate 里点 **复制文件夹路径**；回到 Chrome 点「加载已解压的扩展程序」，在选择窗口按 ++⌘++ ++Shift++ ++G++，粘贴路径后回车，再点「选择」。
4. **自动连接**：加载后几秒内，扩展会自己连上 UI-Mate，不需要粘贴什么。

没有自动连上时（比如关掉了自动连接），改用连接码：在 UI-Mate 里点 **复制连接码**；在 Chrome 工具栏点拼图图标 → **UI-Mate Browser** → **Use a connection code instead**，粘贴连接码并连接。连接码 3 分钟内有效，只能用一次，过期了点 **复制新连接码**。

![设置 → 浏览器：按四个步骤连接 Chrome。](image:browser)

完成后，设置页显示 **Chrome 已连接**。

> [!NOTE]
> 扩展弹窗里的文字目前是英文，例如 \`Connected to UI-Mate\`。

## 连接之后 {#connected}

- 设置页会列出 **浏览器任务** 和它们打开的标签页，可以 **接管**、**继续** 或 **停止**。
- 在 Chrome 里点击任务正在使用的标签页，助手会暂停，等你交还控制。
- 需要换一台电脑或重新配对时，点 **重新配对**；不想再使用时点 **断开连接**。断开后自动连接会关闭，Chrome 不会自己连回来；想再用时点 **打开自动连接**。
- 在扩展弹窗里点 **Disconnect** 只断开这个 Chrome 用户资料，点 **Connect to UI-Mate** 可以再连上。
- 同一台电脑上有多个 Chrome 用户资料都装了扩展时，先连上的那个保持连接。
- 如果有一份没见过的扩展副本来配对，App 会询问 **允许这个 Chrome 扩展操作任务标签页吗？**，不认识就点 **不允许**。

## 浏览器断开了 {#disconnected}

Chrome 关闭或扩展断开时，用到浏览器的任务会显示 **连接 Chrome 后继续**。打开 Chrome 并确认扩展已启用，它会自动重新连接，不需要新的连接码；然后点 **继续任务**。

继续后助手会先重新查看页面，不会自动重做中断时的点击或提交，避免重复下单、重复发送。

## 扩展需要更新 {#update-extension}

UI-Mate 更新后，Chrome 里的扩展可能还是旧版本，任务会显示 **更新 Chrome 扩展后继续**。按卡片说明操作：

- 在 \`chrome://extensions\` 里找到 **UI-Mate Browser**，点重新加载；或者
- 如果之前是从别的文件夹加载的，先移除它，再按上面的第 3 步从 App 给出的文件夹加载。

更新前 **继续任务** 不可用。

## 使用限制 {#limits}

- 密码框等受保护的输入框、文件上传、复杂的在线编辑器，以及嵌在页面里的其他网站内容，不保证能操作。
- 涉及密码和验证码时，请自己在页面上输入。
- 目前只支持 Google Chrome。
`,We=`---
title: 核心概念
description: 分清任务和运行、助手和模型、后台模式和接管模式，以及演示、工作流和技能。
---
## 任务与运行 {#task-and-run}

- **任务** 就是一个对话。你在首页写下目标，就新建了一个任务。
- **运行** 是助手的一轮工作。一个任务可以有多次运行：发送后续消息、点 **重新运行**，或在中断后继续，都会在同一个任务里产生新的运行。

任务页右上角可以在 **完整对话** 和 **第 N 次运行** 之间切换查看。

## 助手与模型连接 {#assistant-and-model}

- **助手** 是负责规划步骤、调用工具的程序。UI-Mate 提供 **Codex** 和 **Claude Code** 两种。
- **模型连接** 是助手背后的模型服务，由你配置，见 [连接模型](page:models)。

同一个模型连接要和助手的接口兼容：Codex 用 OpenAI 协议，Claude Code 用 Anthropic Messages 协议。

## 电脑模式 {#computer-mode}

| 模式 | 怎么工作 | 适合 |
| --- | --- | --- |
| **后台模式**（Stealth） | 后台优先，必要时短暂使用前台。助手直接在你屏幕上原有的 App 窗口里操作，尽量不占用你的鼠标和键盘 | 你还要继续用电脑，或者任务只涉及少数几个窗口 |
| **接管模式**（Takeover） | 使用当前桌面、鼠标、键盘和焦点，和人操作电脑一样 | 后台操作不顺利的 App，或你不打算同时使用电脑 |

后台模式下，如果某个动作在后台做不了，助手会等你停止使用键盘和鼠标约 2 秒后，短暂把那个窗口切到前台完成，然后回到后台。你正在使用的 App 不会被抢走。详细说明见 [发起任务：选择电脑模式](page:tasks#computer-mode)。

## 工作目录 {#workspace}

**工作目录** 是助手读写文件的地方。没有指定时，UI-Mate 会为每个任务单独建一个文件夹；指定了你自己的文件夹时，助手可以读取里面的文件，产出放在其中以 \`ui-mate-output-\` 开头的子文件夹里。

## 演示、工作流与技能 {#demos-workflows-skills}

| 名称 | 是什么 |
| --- | --- |
| **录制**（演示） | 你亲手操作一遍时录下的画面、动作和环境 |
| **工作流** | 由录制整理出的可复用步骤。任务模式选 **演示 CUA** 时，助手参考它来做 |
| **技能** | 一份 Markdown 说明，写着某类任务的要点和规则，按关键词自动或手动加载 |

演示和工作流是给助手的参考，不是逐帧回放：助手仍会根据当前屏幕自己判断。见 [录制演示与工作流](page:recording) 和 [技能](page:skills)。

## 结果检查 {#result-checks}

任务显示结束，只表示助手停下了。**结果检查** 让你预先写好「正确结果长什么样」，例如某个文件存在、CSV 某列合计等于多少；助手结束后，App 独立检查文件并给出结论。见 [查看结果](page:results#checks)。
`,ze=`---
title: 运行中的控制
description: 看助手正在做什么，补充要求、回答问题、接手操作或随时停止。
---
## 看它在做什么 {#watch}

- 对话里会实时显示当前步骤和已用时间，例如 **正在思考**、**正在查看电脑**、**正在操作电脑**、**正在打开网页**、**正在检查结果**、**正在运行命令**。一轮结束后折叠成 **已工作 X**，点 **查看步骤** 展开。
- 右侧面板的 **电脑** 标签显示实时画面，可以点 **在独立窗口中打开**，放到屏幕一角看着它做。
- 接管模式下，屏幕边缘出现蓝色边框，右上角出现一张步骤卡片，显示：
  - 任务、正在操作的 App 和已用时间；
  - 当前是 **第 N 步**、在做什么，以及助手的说明；
  - 最近几步，最新的在最上面，每一步带步骤号和发生的时刻（时:分:秒）。

  卡片不响应点击。要接手，在 UI-Mate 小窗里点 **接管** 或 **停止**。

![运行中的任务：对话里显示 **正在操作电脑**，右侧是助手正在操作的窗口，可以 **接管** 或 **停止**。](image:task-running)

## 补充要求 {#follow-up}

在任务页底部的输入框里直接写，例如「表头用中文」「只处理本月的数据」。运行中发送的消息会排队，提示 **消息已加入队列，将在当前轮次结束后发送。**

## 自己接手 {#take-over}

助手卡住或走偏时，你可以自己来：

1. 在电脑画面或独立小窗里点 **接管**（面板还没有实时画面时，按钮叫 **接管控制**），或输入 \`/takeover\`。状态变为 **由你操作**，助手的输入会立即停止，排队中的动作也会作废。
2. 自己完成那一步，例如登录、选中某个文件、关掉弹窗。
3. 点 **继续**（没有实时画面时叫 **交还控制权**），或输入 \`/return\`。助手会先重新看一眼屏幕，再接着做。

> [!NOTE]
> 在 Chrome 里点击助手正在使用的标签页，也会让助手暂停，等你交还控制。

## 停止任务 {#stop}

- 任务页右上角的 **停止**，或电脑小窗里的 **停止**。
- 在输入框输入 \`/stop\`：**停止本轮运行并保留对话和文件**。

停止后，状态会先显示 **正在停止**，再结束。对话、文件和已完成的步骤都会保留，之后可以继续发消息或 **重新运行**。退出 UI-Mate 也会停止正在运行的本机任务。

> [!WARNING]
> 目前没有停止任务的全局快捷键。接管模式下请通过小窗或任务页的 **停止** 按钮结束。

## 回答问题与确认操作 {#questions}

- 助手需要信息时，会显示 **需要你的输入** 卡片。在 **输入你的回答…** 里写好，点 **发送回答**。
- 使用 Claude Code 时，它在执行某些命令或工具前会请你确认，卡片上有 **允许此操作** 和 **拒绝**。确认卡片的标题可能是英文，例如 \`Allow Bash?\`。
- 密码、验证码这类信息不要发在对话里；在目标 App 里自己输入，或先 **接管** 再填写。

## 需要你处理 {#needs-you}

当任务因为外部原因停下，状态会变成 **需要你处理**，侧栏 **最近对话** 旁也会显示数量。常见的有：

![模型连接出问题时的卡片：改好连接后点 **检测并继续**。](image:recovery)

| 卡片 | 怎么做 |
| --- | --- |
| **修复模型连接后继续** | 点 **编辑模型连接** 修正后，点 **检测并继续** |
| **连接 Chrome 后继续** | 点 **打开浏览器设置** 重新连接，再点 **继续任务** |
| **更新 Chrome 扩展后继续** | 按卡片说明在 Chrome 里重新加载扩展，再点 **继续任务** |

模型服务的短暂故障会先自动重试，仍然失败才会出现卡片。不想继续时点 **停止任务**。具体原因见 [常见问题](page:troubleshooting)。

## 运行中的命令 {#commands}

任务页的输入框里输入 \`/\` 可以用这些命令：

| 命令 | 作用 |
| --- | --- |
| \`/stop\` | 停止本轮运行 |
| \`/takeover\` · \`/return\` | 接管控制 / 交还控制权 |
| \`/record\` | 暂停助手，为当前任务录制演示 |
| \`/computer\` | 查看任务画面和电脑控制选项 |
| \`/activity\` | 查看工具调用、状态和活动 |
| \`/files\` | 查看本轮运行创建的文件 |
| \`/process\` | 逐步查看本轮运行的画面和动作 |
| \`/export\` | 导出轨迹 |
| \`/library\` | 打开资料库 |
`,Pe=`---
title: 安装与启动
description: 下载对应芯片的 DMG，拖进「应用程序」，第一次打开，以及之后如何更新。
---
## 系统要求 {#requirements}

| 项目 | 要求 |
| --- | --- |
| 系统 | macOS 14 或更高版本 |
| 芯片 | Apple 芯片（M 系列）或 Intel 芯片。下载页按芯片提供 DMG，某种芯片暂时没有安装包时会直接说明 |
| 模型 | 需要一个可用的模型连接，见 [连接模型](page:models) |
| 其他 | 无需另装 Node、Python 或命令行工具，安装包已包含 |

## 下载 {#download}

1. 打开 [下载页](../releases/)。
2. 选择发布渠道：**正式版** 适合日常使用，**预览版** 会更早拿到新功能。
3. 选择 Mac 芯片。不确定的话，点屏幕左上角苹果菜单 →「关于本机」查看。
4. 点下载，得到 \`UI-Mate-版本号-mac-芯片.dmg\`。

## 安装 {#install-app}

1. 双击下载好的 DMG。
2. 把 **UI-Mate** 拖进「应用程序」文件夹。
3. 推出 DMG。
4. 从「应用程序」或启动台打开 UI-Mate。

> [!WARNING]
> 不要在 DMG 窗口里直接双击运行。从 DMG 里运行的副本会让后面的系统授权对不上，出现「明明打开了开关却仍提示未授权」。

## 第一次打开 {#first-launch}

打开后是首页，标题是 **你想完成什么任务？**。UI-Mate 不需要注册或登录，侧栏底部的用户中心显示 **无需登录**。

- **界面语言** 跟随 macOS 的语言；也可以在侧栏底部的用户中心 → **语言** 切换 **English** 或 **简体中文**。
- **还没有模型连接** 时，输入框下方会提示 **请添加与此助手兼容的模型连接。**，并给出 **添加模型连接** 按钮。先完成 [连接模型](page:models)。
- **系统权限** 不会在启动时弹出，等第一次需要看屏幕或操作 App 时再提示，见 [授予系统权限](page:permissions)。

## 更新到新版本 {#update}

App 在启动时和之后每 6 小时检查一次新版本：

- 有新版本时，顶部出现 **UI-Mate X 现已可用**，侧栏也会显示 **有新版本可用**。
- 也可以手动检查：**设置 → 更新** → **检查更新**。页面会显示 **当前版本** 和所在渠道。渠道由你安装的版本决定：正式版检查正式版，预览版检查预览版。

从 0.4.2 起，可以在 App 里直接更新：

1. 点 **下载并安装**。UI-Mate 会下载新版本，并校验它的签名和公证。
2. 显示 **重启并更新** 后点它。有任务、录制或回放正在运行时，按钮是灰的，等结束或停止后再点。
3. UI-Mate 会退出，换成新版本后重新打开。对话、模型连接和系统权限都会保留。

如果新版本没能正常启动，UI-Mate 会自动换回原来的版本，并在 **设置 → 更新** 里说明。

下面几种情况没法在 App 里直接更新，页面会显示 **下载 DMG**，需要手动安装：直接在磁盘映像里运行 UI-Mate、UI-Mate 不在可写的文件夹里、0.4.1 及更早的版本。手动安装的步骤：

1. 先结束正在运行的任务（任务页的 **停止**）。
2. 按 ++⌘Q++ 完全退出 UI-Mate。
3. 打开新的 DMG，把 UI-Mate 拖进「应用程序」并选择替换。

> [!NOTE]
> 较早的 0.4 预览版还没有更新提示，需要手动到[下载页](../releases/)安装一次新版，之后就会自动提示。

## 从 v0.3 升级 {#from-v03}

- v0.3 里不会出现这次更新的提示，需要手动下载 DMG 安装。新版与 v0.3 同名，安装时会替换它；想保留 v0.3，先在「应用程序」里给它改名。
- 第一次使用新版时，需要重新授予屏幕录制和辅助功能权限。
- v0.3 的对话、模型设置和长期记忆不会带到新版，需要重新连接模型；旧数据仍留在电脑上，不会被修改。
- v0.3 的录制可以在 **资料库** 里点 **导入录制** 带过来，默认位置是「文稿/GUI_recorder」。

## 卸载 {#uninstall}

1. 结束正在运行的任务，按 ++⌘Q++ 退出。
2. 把「应用程序」里的 UI-Mate 拖到废纸篓。
3. 如果也想删除任务记录、截图、录制和保存的连接，删除数据文件夹 \`~/Library/Application Support/UI-Mate-v04\`（删除后无法恢复）。
4. 可以在「系统设置 → 隐私与安全性」的辅助功能、屏幕录制列表里移除 UI-Mate。
`,qe=`---
title: 工作台界面
description: 侧栏、首页输入框、任务页、资料库和设置分别在哪里，各自用来做什么。
---
## 侧栏 {#sidebar}

| 入口 | 作用 |
| --- | --- |
| **新建任务**（++⌘N++） | 回到首页，写下新的目标 |
| **搜索对话**（++⌘K++） | 按标题筛选以前的对话 |
| **资料库** | 录制、工作流和技能 |
| **最近对话** | 最近 12 个未归档的对话，置顶的排在前面。点这个标题打开全部对话，需要你处理的任务数显示在它旁边 |
| **设置**（++⌘,++） | 模型、浏览器、本机权限、通知和更新 |
| 用户中心 **我 · 本机** | 切换语言、使用指南、应用更新、反馈问题 |

侧栏底部还有一个单独的 bug 按钮，用来 [反馈问题](page:results#feedback)。

## 首页输入框 {#composer}

![首页：左边是侧栏，下方输入框写目标，输入框下面是任务模式、模型和电脑模式菜单。](image:home)

首页标题是 **你想完成什么任务？**。输入框里写目标，按 ++Enter++ 或点 **开始任务** 发出。输入框底部有三个菜单：

- **任务模式**：**通用**（根据目标执行）或 **演示 CUA**（参考资料库里的工作流），也可以从这里 **录制演示**。
- **模型**：选择助手（Codex 或 Claude Code）和模型连接。
- **电脑模式**：**后台模式** 或 **接管模式**，见 [核心概念](page:concepts#computer-mode)。

左侧的 **添加附件** 可以带上文件或图片。输入 \`/\` 会弹出命令菜单，见 [斜杠命令](page:tasks#slash-commands)。

## 任务页 {#task-page}

点开一个任务后：

![一个已完成的任务：中间是对话和结果，右侧 **文件** 标签列出产出的文件和结果检查。](image:results)

- **标题栏** 显示运行状态、任务模式、助手、模型、工作目录和 token 用量。右侧有 **查看步骤**、**停止**（运行中）或 **重新运行**（结束后），以及「…」菜单。
- **中间** 是对话：你的消息、助手的回复、正在进行的步骤，以及需要你回答的卡片。
- **右侧面板** 有三个标签：**电脑**（实时画面）、**活动**（步骤与 token 用量）、**文件**（本次产出的文件）。
- **底部输入框** 用来发后续消息，运行中也可以发。

## 任务列表 {#tasks-page}

点侧栏的 **最近对话** 标题，打开 **对话与任务** 页面，可以按 **所有对话**、**已置顶**、**已归档** 筛选。每个任务的「…」菜单（**管理对话**）里有：

- **重命名**
- **导出轨迹**：把运行记录导出为 zip，见 [查看结果](page:results#export)
- **置顶对话**
- **归档对话** / **恢复对话**
- **删除对话**：永久删除，会先请你确认

## 资料库 {#library}

**资料库** 页面用来 **录制或导入演示，让 Codex 或 Claude Code 参考执行。** 里面有：

![资料库：录制工作流、可复用的工作流和技能。](image:library)

- **录制工作流**：开始一段新录制。
- **可复用的工作流**：整理好的工作流，可以 **使用工作流** 直接开一个新任务。
- **技能**：查看内置和自己写的技能，可以 **打开技能文件夹**。
- **录制**：所有录制，可以编辑步骤、在对话中学习或创建工作流。

详见 [录制演示与工作流](page:recording) 和 [技能](page:skills)。

## 设置 {#settings}

点 **设置** 后，侧栏变成设置目录：

- **通用**：默认模型、视觉模型、结果检查、电脑模式和工作目录。
- **通知**：任务需要你、完成或失败时提醒你，见 [手机与消息通知](page:phone#notifications)。
- **更新**：查看版本和检查更新。
- **集成**：**助手**（新任务默认用哪个助手，以及本机能否运行）、**模型**、**浏览器**、**本机权限**。

点 **返回应用** 回到工作台。如果你是从任务里的提示卡片进入设置的，顶部会有 **返回任务**。
`,Ge=`---
title: 连接模型
description: UI-Mate 本身不带模型。添加一个模型连接、通过检测，再选择用 Codex 还是 Claude Code 当助手。
---
助手每一步都要把任务、屏幕截图和工具结果发给模型，再按模型的回答操作电脑。所以开始任务前，需要至少一个通过检测的模型连接。

## 打开模型设置 {#open-settings}

- 侧栏点 **设置**（++⌘,++），在 **集成** 下选择 **模型**，点 **添加连接**。
- 或者在首页输入框下方的提示里点 **添加模型连接**。

## 选择连接方式 {#connection-type}

| 连接方式 | 适合 |
| --- | --- |
| **API Key** | 模型服务商（OpenAI、Anthropic，或其他兼容 OpenAI 接口的服务），或你所在组织提供的网关 |
| **VLM Host** | 本地或自托管的模型服务，填写服务地址即可 |

## 填写连接 {#fill-in}

| 字段 | 填什么 |
| --- | --- |
| **服务商** | OpenAI、Anthropic，或 **其他（OpenAI 兼容或自定义地址）** |
| **基础地址** / **服务地址** | 服务的 API 地址，通常以 \`/v1\` 结尾 |
| **多服务商网关** | Key 来自能调用多家模型的网关（比如公司内部的模型网关）时勾选；直接用 OpenAI、Anthropic 的 Key 不用勾 |
| **模型** | 模型名，必须和服务商提供的名称完全一致 |
| 密钥 | 服务商给你的 API Key，粘贴进去即可 |
| **名称（可选）** | 方便自己区分的名字 |

**高级设置** 里有 **API 协议**（默认 **自动（推荐）**）、**服务商路由**（勾选多服务商网关后出现）、**认证方式** 和 **上下文长度（tokens）**。一般保持默认；只有服务商明确要求时再改。

密钥加密保存在这台 Mac 上，保存后不会再显示。

### 用途 {#roles}

每个连接可以勾选一个或多个用途：

- **助手**：执行任务的主模型。
- **视觉**：看懂截图，判断该点哪里。
- **录制处理**：给录制的演示写步骤说明、拆分子任务，见 [录制演示与工作流](page:recording#after)。

填好后点 **保存连接**。

想用同样的设置换个模型或 Key 试试，可以在已保存的连接上点 **复制**。副本会带上所有设置，名称后面加上「副本」。副本默认沿用原连接的密钥，填写新密钥即替换；如果改了地址，需要重新填写密钥。

## 测试连接 {#test}

![模型页：每个连接都显示文本、视觉和工具调用的检测结果。](image:models)

点 **测试连接**，App 会依次检查 **文本**、**视觉** 和 **工具调用**，每项显示 **已通过**、**未通过** 或 **未测试**。卡片上的状态是：

- **文本和工具已就绪**：可以开始任务。
- **需要处理**：有检查没通过，按提示修改后再测。
- **未测试**：还没检测过。

> [!NOTE]
> 文本和工具调用检测通过前，首页的 **开始任务** 按钮是灰的。换了模型、地址或密钥之后，需要重新检测。

## 选择助手：Codex 或 Claude Code {#assistant}

UI-Mate 内置两种助手，它们使用同一套电脑操作和文件工具：

| 助手 | 需要的模型接口 |
| --- | --- |
| **Codex**（默认） | OpenAI 协议：Responses 或 Chat Completions |
| **Claude Code** | Anthropic Messages 协议 |

不用自己去对协议：

- **测试连接** 时，App 会用同一个地址顺带试另一个助手的协议。服务两种都支持时（多服务商网关常常是这样），这个连接两个助手都能用，各自用自己的协议，连接卡片上会显示 **可用于 Codex、Claude Code**。
- 首页输入框底部的 **模型** 菜单会列出所有模型。当前助手用不了的排在最后，标着 **将切换到 …**，选中后会自动切换助手。

同一个 **模型** 菜单里还能选 **推理强度**，Codex 和 Claude Code 都适用：默认、超高、高、中、低。“默认”交给助手决定：Codex 用超高，Claude Code 用高。越低回得越快，越高规划越仔细。按钮上会显示当前档位，比如 **gpt-6.1-terra · 高**。模型检测时如果报出它只支持部分档位，其余档位会置灰。新任务默认用哪个助手，在 **设置 → 集成 → 助手** 的 **新任务使用** 里设置；同一页的 **本机运行环境** 会显示每种助手是 **可用** 还是 **未就绪**。已有对话继续使用开始时的助手。

## 视觉模型 {#vision}

**设置 → 通用 → 视觉模型** 默认是 **使用助手模型**。如果助手模型不能看图，或你想用专门的视觉模型判断点击位置，在这里选择另一个勾选了 **视觉** 用途的连接。

## 连不上怎么办 {#trouble}

检测失败时，按提示核对模型名、地址和密钥。常见原因和处理方法见 [常见问题：模型连接失败](page:troubleshooting#model)。
`,Be=`---
title: UI-Mate 使用指南
nav: UI-Mate 使用指南
description: 把 UI-Mate 当作 Mac 上的电脑搭档：安装、连接模型、发出任务，在需要时接手。
---
这份指南写给日常使用 UI-Mate 的人，不需要了解它的内部实现。你用一句话说明想要的结果，助手看屏幕、操作 App、整理文件把事情做完；过程中你随时可以查看、补充要求、接手或停止。

![助手在后台模式下操作表格：左边是对话，右边是它正在操作的窗口。](image:task-running)

## 从这里开始 {#start-here}

1. [安装与启动](page:install)：下载 DMG，拖进「应用程序」，从那里打开。
2. [连接模型](page:models)：添加一个模型连接并通过检测，助手才能开始工作。
3. [授予系统权限](page:permissions)：第一次操作电脑时，按提示打开辅助功能和屏幕录制。
4. [发起任务](page:tasks)：在首页写下目标，按 ++Enter++ 开始。

> [!TIP]
> 第一次用，可以先给一个能检查结果的小任务，例如「在工作目录里新建 notes.txt，写入今天的日期」，确认模型、权限和电脑模式都正常。

## 它能帮你做什么 {#what-it-does}

- **操作 Mac 上的 App**：在你已经登录的 App 里点击、输入、切换窗口，沿用你的登录状态。
- **处理文件**：读写工作目录里的文件，生成报告、整理表格、批量改名。
- **在 Chrome 里办事**：连接浏览器扩展后，在你自己的 Chrome 里打开网页、填写表单、查资料。
- **学你的做法**：你录一遍演示，它在之后的同类任务里参考你的步骤。

## 侧栏怎么组织 {#how-this-guide-is-organized}

| 分组 | 什么时候看 |
| --- | --- |
| [开始使用](page:install) | 第一次安装、连接模型、授权，以及弄清几个常用词 |
| [使用工作台](page:interface) | 日常干活：界面、发起任务、运行中的控制、查看结果 |
| [教它你的做法](page:recording) | 录制演示、整理成工作流，用技能补充领域知识 |
| [浏览器与手机](page:browser) | 让助手使用 Chrome，在手机上查看和处理任务 |
| [帮助与参考](page:troubleshooting) | 遇到问题、快捷键、文件位置和隐私说明 |

## 先记住三件事 {#three-things}

- **随时可以停**：任务页右上角的 **停止** 会结束本轮运行，对话和文件都会保留。
- **你可以接手**：觉得它走偏了，在电脑画面上点 **接管** 自己操作，做完点 **继续** 让它接着做。
- **「完成」不等于「做对」**：运行结束只说明助手停下了。重要的文件结果，可以预先设置 [结果检查](page:results#checks)，让 App 独立核对。

## 系统要求 {#requirements}

macOS 14 或更高版本；Apple 芯片或 Intel 芯片的 Mac（在[下载页](../releases/)选择芯片）；一个可用的模型连接。安装包已经包含运行所需的组件，不需要另装 Node、Python 或命令行工具。
`,Fe=`---
title: 授予系统权限
description: 助手要看屏幕、操作 App，需要 macOS 的辅助功能和屏幕录制权限。在 App 里按引导授权即可，不需要重启。
---
## 需要哪些权限 {#which}

| 权限 | 用途 |
| --- | --- |
| **辅助功能** | 允许 UI-Mate 读取并操作应用界面 |
| **屏幕录制** | UI-Mate 通过截图判断该点哪里；录制演示也需要它 |
| **Chrome 扩展**（可选） | 让助手在你的 Chrome 里工作，见 [在 Chrome 中使用](page:browser) |

第一次让助手控制另一个 App 时，macOS 还可能弹窗询问是否允许 UI-Mate 控制它，点允许即可。

权限不会在启动时一次性弹出。第一次需要看屏幕或操作电脑时，App 才会提示你授权。

## 在 App 里授权 {#grant}

1. 打开 **设置 → 本机权限**，页面标题是 **启用 UI-Mate 电脑操作**。
2. 在 **辅助功能** 一行点 **允许**。系统设置会打开对应页面，旁边出现一个小引导面板。
3. 把引导面板里的 UI-Mate 图标拖到上方列表里；如果列表里已经有 UI-Mate，直接打开它的开关。
4. 面板显示已允许后，点 **返回 UI-Mate**。
5. 对 **屏幕录制** 重复一遍。

![本机权限页：辅助功能已允许，屏幕录制还需要点 **允许**。](image:permissions)

两项都显示 **已允许** 后，页面会提示 **本机电脑任务已就绪。Chrome 扩展为可选项。**

> [!TIP]
> 不需要重启 App。权限页会自动重新检查，几秒内就会更新状态。

## 任务中途提示缺权限 {#in-task}

如果任务运行时缺少权限，电脑面板会显示 **需要辅助功能权限** 或 **需要屏幕录制权限**。点旁边的 **辅助功能设置** 或 **屏幕录制设置** 去打开开关，再点 **授权后重试**。

## 开关已打开却仍提示未授权 {#still-denied}

更新或替换安装后，系统设置里的旧条目有时和新版对不上。可以这样处理：

1. 确认「应用程序」里只有一个 UI-Mate，并且是从这里打开的，而不是 DMG 里的副本。
2. 在系统设置的辅助功能或屏幕录制列表里选中 UI-Mate，点「−」删除。
3. 回到 UI-Mate 的 **本机权限** 页面，重新点 **允许**，按引导把它加回去。

## 允许助手使用哪些 App {#app-access}

除了系统权限，助手每次要用一个 App 之前也会先问你：

- 后台模式下，助手第一次连接或打开某个 App 时，对话里会出现 **允许 UI-Mate 使用「X」？**。
- 接管模式下，助手开始操作前会先问 **允许 UI-Mate 完全控制这台电脑？**，因为它会用你的屏幕、鼠标、键盘和焦点，能看到屏幕上的所有 App。

每次可以选：

| 选项 | 效果 |
| --- | --- |
| **仅在此对话中允许** | 这个对话之后的消息都不再问；新对话会重新询问 |
| **始终允许** | 以后所有对话都不再问 |
| **拒绝** | 这次运行里助手不再使用它，会换别的办法或问你 |

你自己在电脑小窗里选的窗口不会再问。

在 **设置 → 本机权限** 的 **App 访问** 里，可以打开 **允许操作所有 App** 或 **接管模式始终允许完全控制**，也可以把 **始终允许的 App** 逐个移除。

## 授权后会发生什么 {#what-it-sees}

- 截图和界面信息只在任务需要时读取，并随任务发给你配置的模型连接，用来决定下一步。
- 每一步的截图会保存在本机，方便你在 [查看步骤](page:results#steps) 里回看。
- 你可以随时在系统设置里关闭这些权限，关闭后助手就不能再看屏幕或操作 App。

更多说明见 [隐私与数据](page:reference#privacy)。
`,je=`---
title: 手机与消息通知
description: 在同一个局域网里用手机查看和处理任务，或让 UI-Mate 通过飞书、钉钉、企业微信提醒你。
---
> [!WARNING]
> 手机连接是预览功能：只能在同一个 Wi-Fi 或局域网内使用，还没有在所有手机上完成验证，之后可能调整。电脑上的菜单和对话框目前是英文。退出 UI-Mate 后连接会关闭。

## 手机能做什么 {#what}

- 发起新任务，查看进度和对话。
- 处理确认：**允许本次** 或 **拒绝**。
- 回答助手的问题，补充要求。
- **停止任务**。
- 把任务产出 **下载到手机**（单个文件不超过 25 MB）。

手机默认只能看到自己发起的任务。电脑上已有的任务需要单独共享给它。手机不能远程操作电脑屏幕。

## 开启手机连接 {#enable}

1. 在 UI-Mate 的菜单栏打开 \`Phone Connection\` → \`Enable Phone Connection…\`。
2. 选择一个手机能访问到的电脑地址（通常是你的 Wi-Fi 地址）。

如果手机和电脑连着同一个 Wi-Fi 却打不开，可能是路由器的访客网络隔离、防火墙或 VPN 挡住了。

## 安装连接证书 {#certificate}

手机浏览器需要信任这台电脑生成的证书，才能安全连接。只需做一次：

1. 菜单栏 \`Phone Connection\` → \`Export connection certificate…\`，保存 \`.cer\` 文件，记下显示的 SHA-256 指纹。
2. 把证书传到手机上（例如 AirDrop），核对指纹后安装。
3. iPhone 安装描述文件后，还要到「设置 → 通用 → 关于本机 → 证书信任设置」打开它的完全信任。Android 请在系统的证书安装设置里导入。

> [!NOTE]
> 只传导出的公共证书。不要复制 UI-Mate 数据文件夹里的其他文件。不要靠忽略浏览器的证书警告来连接。

## 配对 {#pair}

1. 菜单栏 \`Phone Connection\` → \`Generate pairing code…\`。窗口里有连接地址和形如 \`XXXX-XXXX-XXXX\` 的配对码，5 分钟内有效，只能用一次。可以点 \`Copy URL and code\` 复制。
2. 在手机浏览器里打开这个地址，输入配对码。
3. 电脑上会弹出 \`Allow "手机名" to connect to this computer?\`，确认是你的手机后点 \`Allow pairing\`。

配对后，手机登录状态保持 7 天。

## 管理设备 {#devices}

在菜单栏 \`Phone Connection\` → \`Paired devices\` 里选择一台设备：

- \`Share an existing task\`：把电脑上已有的任务共享给它。
- \`Revoke this device\`：撤销这台设备，它之后无法再访问。

手机上也可以选择「断开此设备」。不再需要时，选 \`Disable Phone Connection\` 关闭整个功能。

## 原生 iOS App {#ios}

原生 iOS App 还没有公开发布，目前请使用手机浏览器。

## 消息通知 {#notifications}

不在电脑旁时，也可以让 UI-Mate 通过办公软件提醒你。打开 **设置 → 通知**，两种方式二选一：

- **群机器人**：填写飞书、钉钉或企业微信群机器人的 Webhook，只发提醒。
- **企业微信智能机器人**：配置后在 10 分钟内把 6 位 **配对码** 发给机器人。之后可以在企业微信里回复来回答问题、补充要求，或在卡片上点 **允许** / **拒绝**。也可以发送 \`状态\`、\`帮助\`、\`停止\`，或 \`#任务编号 停止\`。

可以分别选择在这些时候提醒：**需要你处理**、**任务完成**、**失败或中断**。

> [!NOTE]
> 消息通知同样是预览功能。提醒会经过对应办公软件的服务器，UI-Mate 会对提醒内容做脱敏，但仍建议只发到你信任的群或会话。
`,He=`---
title: 录制演示与工作流
description: 遇到不熟悉的软件或固定的内部流程，先录一遍给它看，再整理成可以反复使用的工作流。
---
演示是给助手的参考：它会看你怎么做，但仍按当前屏幕的实际情况自己判断，不会逐帧照搬。所以界面有些变化时它一般也能继续，反过来也不保证每一步都和演示一样。

## 录制一段演示 {#record}

1. 打开 **资料库**，在 **录制工作流** 卡片里填写 **演示名称（可选）**。
2. 点 **开始录制**，然后像平时一样操作一遍。

也可以在首页 **任务模式** 菜单里选 **录制演示**，或在首页输入 \`/record\`，都会打开资料库并立即开始录制。

录制需要 **屏幕录制** 权限，见 [授予系统权限](page:permissions)。

## 录制中 {#while-recording}

开始后，屏幕顶部会出现一个小浮条，显示 \`Recording\` 和已录时长。结束录制有三种方式：

- 点小浮条上的 \`Stop\`。浮条可以拖动，不会被录进画面。
- 点菜单栏里的录制图标，选 \`Stop and save\`。
- 回到 UI-Mate，在资料库点 **停止录制**。

> [!TIP]
> 动作放慢一点；一次只录一条主线流程；不要录进密码等敏感信息。目前没有结束录制的快捷键。

## 在任务中录制 {#during-task}

任务进行中觉得「还是我做给你看吧」：点 **录制演示** 或输入 \`/record\`，助手会暂停，顶部显示 **正在录制演示**。录完后结束录制，再把控制交还给助手。

助手自己卡住时，也可能请你演示一遍，这时卡片上会有 **开始演示** 按钮。

## 录完之后 {#after}

结束后会出现 **录制已就绪** 卡片：

- **预览 / 编辑**：查看录下的步骤。
- **去处理**：用模型给演示命名、为每一步写说明，并拆分成子任务。需要一个勾选了 **录制处理** 用途的模型连接，见 [连接模型](page:models#roles)。
- **在对话中学习**：打开一个对话，让助手学习这段演示，你可以在对话里补充说明。
- **忽略**：先不处理。

如果只录到了点击停止，录制会标为 **没有录到操作**，重新录一遍即可。

## 编辑步骤 {#edit}

在资料库的录制列表里点 **编辑步骤**，打开 **查看与编辑步骤**：

![步骤编辑器：左边是步骤列表，右边是这一步操作前后的画面。](image:step-editor)

- 修改任务目标、每一步的动作和 **说明**。
- **上移**、**下移**、**删除步骤**；用 **子任务** 和 **添加子任务** 分组。
- 每一步还可以补充观察、意图、预期和操作后验证等说明。
- **撤销**（++⌘Z++）、**重做**（++Shift++ ++⌘Z++），改完点 **保存修改**；也可以点 **用模型处理** 重新生成说明。

保存修改后，之前由旧版本创建的工作流需要重新创建。

## 创建并使用工作流 {#workflow}

1. 在录制上点 **创建工作流**。它会出现在 **可复用的工作流** 里，标为 **引导式回放** 并显示步骤数。
2. 可以点 **查看步骤与依据** 检查内容，或 **整理说明** 补充目标、需要的输入和成功标准。
3. 点 **使用工作流**，会新建一个任务并进入 **演示 CUA** 模式；首页显示正在参考的工作流，可以 **更换工作流** 或 **移除工作流**。
4. 写下这次的具体目标并开始任务。

## 导入与导出 {#import-export}

- **导入录制**：在资料库右上角点它，选择一个录制文件夹，或包含多段录制的文件夹。完成后会显示导入、跳过和失败的数量。App 会保存一份自己的副本，不改动原文件。v0.3 的录制默认在「文稿/GUI_recorder」。
- **导出流程**：在工作流详情里点它，会导出一个文件夹（包含 \`SKILL.md\`、\`workflow.json\` 和录制内容）并在访达中显示。

> [!WARNING]
> 录制和导出的流程包含屏幕画面和你输入的内容。分享前确认里面没有不该给别人看的信息。
`,Ke=`---
title: 快捷键与文件位置
description: 常用快捷键、UI-Mate 在电脑上保存文件的位置，以及哪些数据会离开你的 Mac。
---
## 快捷键 {#shortcuts}

| 快捷键 | 作用 |
| --- | --- |
| ++⌘N++ | 新建任务 |
| ++⌘K++ | 搜索对话 |
| ++⌘,++ | 打开设置 |
| ++Enter++ | 发送消息 / 开始任务 |
| ++Shift++ ++Enter++ 或 ++Option++ ++Enter++ | 换行 |
| ++Esc++ | 关闭菜单和对话框 |
| 方向键 | 在步骤页里切换上一步、下一步 |
| ++⌘Z++ / ++Shift++ ++⌘Z++ | 在步骤编辑器里撤销 / 重做 |
| ++⌘Q++ | 完全退出 UI-Mate |

## 文件位置 {#files}

| 内容 | 位置 |
| --- | --- |
| 数据文件夹 | \`~/Library/Application Support/UI-Mate-v04\` |
| 任务的默认工作目录 | 数据文件夹里的 \`workspaces/\` |
| 每一步的截图 | 数据文件夹里的 \`runs/\` |
| 录制 | 数据文件夹里的 \`tools/recordings/\` |
| 导出的工作流 | 数据文件夹里的 \`tools/exports/\` |
| 技能 | 数据文件夹里的 \`skills/\` |
| 导出的轨迹 | \`~/Documents/exported_traj/\` |

在访达中按 ++⌘++ ++Shift++ ++G++，粘贴路径就能打开。截图会一直保留在本机，方便之后回看。

## 隐私与数据 {#privacy}

- **不需要账号**。任务、对话、截图和录制都保存在你的 Mac 上。
- **发给模型的内容**：任务进行时，目标、对话、截图和工具结果会发给你配置的模型连接。请选择你信任的服务商。
- **密钥** 加密保存在这台 Mac 上，保存后不会再显示。
- **浏览器**：助手只在任务自己的标签页分组里操作。
- **反馈** 只会打开一份公开的 GitHub 草稿，由你检查后提交，不会附带日志或截图。
- **新版本检查** 只读取公开的发布信息，不上传你的数据。
`,Xe=`---
title: 查看结果
description: 查看产出的文件，逐步回看每一步，用结果检查独立核对，导出记录或反馈问题。
---
## 对话和文件 {#in-chat}

助手结束后，会在对话里说明做了什么。右侧面板的 **文件** 标签列出本次运行产出的文件，点一下就能打开。

## 逐步回看 {#steps}

点任务页右上角的 **查看步骤**，打开 **本次运行的步骤**。每一步都可以看到：

- **模型看到的** 画面和 **执行后** 的画面；
- 助手的 **思考**；
- 具体的 **工具调用** 和结果。

![步骤页：左边是步骤列表，右边是这一步模型看到的画面、思考过程和工具调用。](image:steps)

用方向键在步骤之间切换。觉得某一步做错了，回到对话里直接告诉助手。

## 结果检查 {#checks}

**结果检查** 让 App 在助手结束后独立核对文件，而不是只听助手说「完成了」。

1. 在开始任务之前，打开 **设置 → 通用 → 结果检查**，点 **配置检查**。
2. 点 **添加检查**，选择检查条件，填写 **任务文件夹中的文件** 和期望值。
3. 点 **保存检查**，回到首页。输入框下方会显示「N 项结果检查」。
4. 发出任务。检查条件随这个任务保存，**重新运行** 时也会再次检查；下一个新任务需要重新配置。

可以使用的检查条件：

| 条件 | 例子 |
| --- | --- |
| **文件存在** | \`报告.xlsx\` 已生成 |
| **包含指定文字** | \`总结.md\` 里提到「华东」 |
| **文本完全匹配** | \`结果.txt\` 的内容正好是 \`42\` |
| **JSON 包含指定值** | \`result.json\` 里 \`status\` 等于 \`done\` |
| **CSV 行数** | \`订单.csv\` 有 128 行（不含表头） |
| **CSV 列合计** | \`订单.csv\` 的「金额」列合计等于 \`10234.50\`，可以 **仅检查匹配行** |

![检查通过后，任务标题下和 **文件** 标签里都会显示 **文件检查通过**。](image:results)

运行结束后会显示 **文件检查通过**、**文件检查未通过** 或 **无法验证**。没有配置检查的任务显示 **未独立验证**。检查没通过时，可以点 **让助手修复**。

## 重新运行 {#runs}

任务结束后，右上角的 **重新运行** 会用同样的目标再跑一次，结果作为新的运行记在同一个任务里。有多次运行时，可以在 **完整对话** 和 **第 N 次运行** 之间切换。

## Token 用量 {#tokens}

任务标题旁显示本任务用了多少 token。在右侧 **活动** 标签的 **Token 用量** 里能看到 **输入**、**缓存命中**、**输出**、**合计**，以及 **整个对话** 的累计。

## 导出轨迹 {#export}

在任务的「…」菜单选 **导出轨迹**、输入 \`/export\`，或在步骤页点 **导出轨迹**，会把这个任务的运行记录导出为 zip，默认保存在「文稿/exported_traj」，完成后在访达中显示。

> [!WARNING]
> 导出的轨迹包含每一步的截图和对话内容，可能有个人或工作信息。分享前先检查一遍。

## 反馈问题 {#feedback}

点侧栏的 bug 按钮，或用户中心里的 **反馈问题**：

1. 填写 **问题概述** 和 **具体发生了什么？**。
2. 点 **前往 GitHub 确认**，浏览器会打开一份公开的 GitHub Issue 草稿。
3. 在 GitHub 上检查内容后自己提交。

草稿里只有你填写的文字和应用版本，不会附带日志、截图、文件路径或密钥，也不会自动发送。因为是公开的，请不要写入隐私信息。
`,Ve=`---
title: 技能
description: 用一份 Markdown 写下某类任务的要点和规则，让助手在相关任务里自动带上。
---
## 技能是什么 {#what}

技能是一份 Markdown 说明，写着某个软件或某类任务的操作要点，例如「企业微信里怎么搜索联系人」「报销单的填写规则」。任务开始时，相关的技能会加到助手的上下文里。UI-Mate 自带几份内置技能，你也可以自己写。

## 查看技能 {#browse}

打开 **资料库 → 技能**。每个技能会标明来源和加载方式：

- 来源：**内置**、**内置 · 已修改** 或 **自定义**。
- 加载方式：**自动加载关键词：…**，或 **仅手动加载**。

点 **在新任务中使用**，会带着这个技能新建任务。

## 技能怎么生效 {#how-loaded}

- **自动**：你的消息里出现技能的关键词时自动加载，每条消息最多 3 个。输入框上方会出现带 **自动** 标记的技能，点 × 可以让这条消息不加载它。
- **手动**：在输入框输入 \`/技能名\`，从菜单里选择。

发出的消息下方会显示 **技能：…**，自动加载的会标 **· 自动**。

> [!NOTE]
> 从手机或企业微信机器人发起的任务，只会加载自动匹配的技能。

## 写自己的技能 {#write}

1. 在 **资料库 → 技能** 点 **打开技能文件夹**。
2. 新建一个 \`.md\` 文件，或新建一个文件夹并在里面放 \`SKILL.md\`。文件名（或文件夹名）就是 \`/\` 后面的技能名。
3. 文件开头写一段简单的信息，下面写正文：

\`\`\`
---
name: 报销助手
description: 公司报销单的填写规则
keywords: 报销, 发票, 差旅
---
## 操作：填写报销单
- 发票日期必须在出差期间内
- 金额保留两位小数
\`\`\`

- \`keywords\` 用逗号分隔，消息里出现任意一个就会自动加载；不写关键词则只能手动加载。
- 正文里以 \`## 操作\` 开头（或标题带 \`<!--kw: 关键词-->\` 标记）的小节是操作段，会按任务目标挑选最合适的使用；第一个操作段之前的内容总会带上。
- 保存后不需要重启，下一条消息就会用上新的内容。单个文件不超过 256 KB。

修改内置技能后会标为 **内置 · 已修改**，更新 App 时不会覆盖你的修改。
`,Ye=`---
title: 发起任务
description: 写清楚目标，选好电脑模式和工作目录，必要时带上附件或参考一个工作流。
---
## 写清楚目标 {#describe}

在首页输入框里写你要的 **结果**，而不是一步步的指令。好的目标通常说清楚：

- 要做成什么样：「把 \`销售.csv\` 里华东区的订单按月汇总，生成 \`华东月报.xlsx\`」。
- 用到哪些 App 或网页：「在企业微信里把这份文件发给项目群」。
- 有哪些限制：「不要修改原文件」「发送前先给我看一下」。

按 ++Enter++ 发出，++Shift++ ++Enter++ 或 ++Option++ ++Enter++ 换行。

> [!TIP]
> 涉及发送、提交、删除这类不可撤销的操作时，在目标里写上「做之前先问我」。助手可以通过提问卡片停下来等你确认。

## 选择电脑模式 {#computer-mode}

在输入框底部的 **电脑模式** 菜单里选择，或输入 \`/stealth\`、\`/takeover\`：

![电脑模式菜单](image:computer-mode)

- **后台模式**：后台优先，必要时短暂使用前台。助手在你屏幕上原有的 App 窗口里直接操作，沿用这些 App 的登录状态；你可以一边继续用电脑。
- **接管模式**：使用当前桌面、鼠标、键盘和焦点。运行时屏幕边缘会出现蓝色边框和 **UI-Mate 正在操作你的电脑**，这时请不要同时操作电脑。

关于后台模式，需要知道：

- 某个动作在后台做不了时，助手会等你停止使用键盘和鼠标约 2 秒，再短暂把那个窗口切到前台完成，电脑面板会显示 **助手正在前台操作**。它不会抢你正在使用的 App。一旦切到前台，这次运行会一直留在前台直到结束，不会来回切换，方便你看清它在做什么。
- 不同 App 对后台操作的支持程度不同。某个 App 反复操作不顺时，换成接管模式更稳。
- 想看助手正在操作的窗口，随时可以直接打开那个 App，或在电脑面板里点 **打开应用**。

默认模式在 **设置 → 通用 → 电脑模式** 里修改。

## 选择工作目录 {#workspace}

输入 \`/workspace\`，或在 **设置 → 通用 → 工作目录** 点 **选择文件夹**。

- 不选时，每个任务有自己单独的文件夹。
- 选了自己的文件夹时，助手可以读取里面的文件，产出放在其中以 \`ui-mate-output-\` 开头的子文件夹里，不会和你的原文件混在一起。

## 添加附件 {#attachments}

点输入框左侧的 **添加附件**，或直接拖入文件、粘贴图片。最多 8 个文件，单个不超过 10 MB，合计不超过 30 MB。

## 斜杠命令 {#slash-commands}

在首页输入框里输入 \`/\` 打开命令菜单，用 ++↑++ ++↓++ 选择，++Enter++ 或 ++Tab++ 确认，++Esc++ 关闭。

| 命令 | 作用 |
| --- | --- |
| \`/general\` | 通用模式，根据目标执行 |
| \`/demo\` | 演示 CUA，参考资料库中的工作流 |
| \`/record\` | 录制演示 |
| \`/model\` | 选择模型 |
| \`/workspace\` | 选择工作目录 |
| \`/stealth\` · \`/takeover\` | 切换电脑模式 |
| \`/browser\` | 打开浏览器设置 |
| \`/settings\` | 打开设置 |
| \`/new\` | 新建任务 |

装好的技能也会出现在菜单里，输入 \`/技能名\` 手动加载，见 [技能](page:skills#how-loaded)。任务进行中还有另一组命令，见 [运行中的控制](page:control#commands)。

## 参考一个工作流 {#with-workflow}

如果你录过类似任务的演示并整理成了工作流：在 **任务模式** 里选 **演示 CUA**，或在资料库里对某个工作流点 **使用工作流**。输入框上方会显示正在参考的工作流，可以 **更换工作流** 或 **移除工作流**。见 [录制演示与工作流](page:recording#workflow)。

## 让 Chrome 参与 {#browser}

需要在网页上操作时，先在 **设置 → 浏览器** 连接 Chrome 扩展。之后助手会在你的 Chrome 里单独开一组标签页工作，见 [在 Chrome 中使用](page:browser)。
`,Ze=`---
title: 常见问题
description: 按看到的现象查找原因和处理方法。
---
## 「开始任务」按钮是灰的 {#start-disabled}

- 还没有通过检测的模型连接：到 **设置 → 模型** 点 **测试连接**，直到显示 **文本和工具已就绪**。
- 所选的模型连接和助手不兼容：Codex 需要 OpenAI 协议，Claude Code 需要 Anthropic Messages 协议。在输入框底部的 **模型** 菜单里换一个兼容的连接，见 [选择助手](page:models#assistant)。
- \`/\` 命令菜单还开着：按 ++Esc++ 关闭。

## 模型连接失败 {#model}

任务中出现 **修复模型连接后继续** 时，卡片会写明原因。常见情况：

| 原因 | 怎么办 |
| --- | --- |
| 密钥错误，或没有使用该模型的权限 | 点 **编辑模型连接**，重新粘贴密钥 |
| 额度用完或请求太频繁 | 稍等一会儿，或换一个连接 |
| 网络、代理或地址有误 | 核对 **基础地址**，确认网络能访问 |
| 服务商没有这个模型 | 逐字核对 **模型** 名称 |
| 接口协议不匹配 | **高级设置** 里的 **API 协议** 选 **自动（推荐）**，或按服务商文档选择 |

改好后点 **检测并继续**。模型服务的短暂故障会先自动重试几次，所以出现卡片时通常需要你修改设置。

## 权限一直显示未授权 {#permissions}

见 [开关已打开却仍提示未授权](page:permissions#still-denied)。

## 点击没反应，或点错了位置 {#click}

- 先确认辅助功能和屏幕录制都显示 **已允许**。
- 运行时尽量不要移动目标窗口、改分辨率或切换显示器。
- 后台模式下某些 App 不接受后台操作：可以等它切到前台完成，或改用 **接管模式**。
- 点 **接管** 自己做完那一步，再点 **继续**。

## 后台模式下窗口突然跑到前台 {#foreground}

这是正常的：某个动作在后台做不了时，助手会在你停止操作约 2 秒后，短暂把那个窗口切到前台完成，电脑面板显示 **助手正在前台操作**。你正在使用键盘或鼠标时它会等待，不会切换。一旦切到前台，这次运行会一直留在前台直到结束。不希望这样时，可以 **接管** 或 **停止** 任务。

## Chrome 相关 {#chrome}

- 显示 **连接 Chrome 后继续**：见 [浏览器断开了](page:browser#disconnected)。
- 显示 **更新 Chrome 扩展后继续**：见 [扩展需要更新](page:browser#update-extension)。

## 任务显示完成，但结果不对 {#wrong-result}

「完成」只表示这次运行结束了。可以：

- 点 **查看步骤**，找到出错的那一步。
- 在对话里直接说哪里不对，让它修改。
- 对重要的文件结果，下次开始前配置 [结果检查](page:results#checks)。
- 对固定流程，录一段 [演示](page:recording) 给它参考。

## 录制显示「没有录到操作」 {#recording-empty}

确认已允许 **屏幕录制** 和 **辅助功能**，然后重新录制；开始后实际操作一遍，再结束录制。

## 退出 App 会怎样 {#quit}

正在运行的本机任务会停止，手机连接会关闭。任务、对话、文件和录制都会保留，下次打开可以继续发消息或 **重新运行**。

## 还是解决不了 {#feedback}

点侧栏的 bug 按钮 [反馈问题](page:results#feedback)，写清楚你做了什么、看到了什么。也可以先看看 [已有反馈](https://github.com/UI-Mate/ui-mate.github.io/issues) 里有没有同样的问题。
`,Qe=""+new URL("browser-DuIivSHM.webp",import.meta.url).href,Je=""+new URL("computer-mode-2h9c7ciH.webp",import.meta.url).href,en=""+new URL("home-G0bv-vvW.webp",import.meta.url).href,nn=""+new URL("library-8tbhoFLP.webp",import.meta.url).href,tn=""+new URL("models-B0xalwPb.webp",import.meta.url).href,on=""+new URL("permissions-BLswVu0A.webp",import.meta.url).href,sn=""+new URL("recovery-D3JGS58O.webp",import.meta.url).href,an=""+new URL("results-DOsm9-F3.webp",import.meta.url).href,rn=""+new URL("step-editor-BovAVEdR.webp",import.meta.url).href,cn=""+new URL("steps-Df-XYXqL.webp",import.meta.url).href,dn=""+new URL("task-running-DeJsR5qr.webp",import.meta.url).href,ln=""+new URL("browser-DMduPj3z.webp",import.meta.url).href,hn=""+new URL("computer-mode-B-fyllet.webp",import.meta.url).href,pn=""+new URL("home-BXaScFOv.webp",import.meta.url).href,un=""+new URL("library--szar6Zy.webp",import.meta.url).href,mn=""+new URL("models-pyZNfJ5c.webp",import.meta.url).href,gn=""+new URL("permissions-4JxGGHwd.webp",import.meta.url).href,wn=""+new URL("recovery-CxL6-mEU.webp",import.meta.url).href,fn=""+new URL("results-BAAEw8f0.webp",import.meta.url).href,kn=""+new URL("step-editor-Bgz6uEvo.webp",import.meta.url).href,yn=""+new URL("steps-Cna4_WnT.webp",import.meta.url).href,bn=""+new URL("task-running-D6EUqEJ1.webp",import.meta.url).href,R="overview",H=[{id:"home",pages:["overview"]},{id:"start",label:{"zh-CN":"开始使用",en:"Get started"},pages:["install","models","permissions","concepts"]},{id:"workbench",label:{"zh-CN":"使用工作台",en:"Use the workbench"},pages:["interface","tasks","control","results"]},{id:"teach",label:{"zh-CN":"教它你的做法",en:"Teach your way of working"},pages:["recording","skills"]},{id:"more",label:{"zh-CN":"浏览器与手机",en:"Browser and phone"},pages:["browser","phone"]},{id:"help",label:{"zh-CN":"帮助与参考",en:"Help and reference"},pages:["troubleshooting","reference"]}],T=H.flatMap(e=>e.pages),vn={tip:{"zh-CN":"提示",en:"Tip"},note:{"zh-CN":"说明",en:"Note"},warning:{"zh-CN":"注意",en:"Important"},anchor:{"zh-CN":"链接到本节",en:"Link to this section"},zoom:{"zh-CN":"查看大图",en:"Enlarge image"},closeImage:{"zh-CN":"关闭大图",en:"Close image"},titleSuffix:{"zh-CN":"UI-Mate 使用指南",en:"UI-Mate Guide"},copyMarkdown:{"zh-CN":"复制 Markdown",en:"Copy Markdown"},copied:{"zh-CN":"已复制",en:"Copied"},copyFailed:{"zh-CN":"复制失败",en:"Copy failed"},previous:{"zh-CN":"上一篇",en:"Previous"},next:{"zh-CN":"下一篇",en:"Next"},searchEmpty:{"zh-CN":"输入关键词，搜索整份使用指南。",en:"Type to search the whole guide."},searchNone:{"zh-CN":"没有找到相关内容，换个说法试试。",en:"No matches. Try different words."},searchCount:{"zh-CN":"{n} 个结果",en:"{n} results"}};function g(e,n,o={}){return vn[e][n==="en"?"en":"zh-CN"].replace(/\{(\w+)\}/g,(s,a)=>String(o[a]??""))}function Cn(e){const n=T.indexOf(e);return{previous:n>0?T[n-1]:"",next:n>=0&&n<T.length-1?T[n+1]:""}}function K(e){return H.find(n=>n.pages.includes(e))}const An=new Set(["tip","note","warning"]),In=/^[a-z0-9][a-z0-9-]*$/;function r(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Sn(e){const n=String(e).replace(/\r\n?/g,`
`),o=/^---\n([\s\S]*?)\n---\n?/.exec(n),t={};if(o)for(const s of o[1].split(`
`)){const a=/^([a-zA-Z]+):\s*(.*)$/.exec(s.trim());a&&(t[a[1]]=a[2])}return{meta:t,body:o?n.slice(o[0].length):n}}function _n(e){const n=/^page:([a-z0-9-]+)(?:#([a-z0-9-]+))?$/.exec(e);return n?{kind:"page",page:n[1],anchor:n[2]??""}:/^#[a-z0-9-]+$/.test(e)?{kind:"anchor",anchor:e.slice(1)}:/^https:\/\/[^\s"'<>]+$/.test(e)?{kind:"external",href:e}:/^\.\.?\/[A-Za-z0-9_./?=&#-]*$/.test(e)?{kind:"relative",href:e}:{kind:"invalid"}}const ce=/`([^`]+)`|\+\+([^+]+)\+\+|\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;function y(e,n){let o="",t=0;const s=new RegExp(ce.source,"g");for(let a=s.exec(e);a;a=s.exec(e)){o+=r(e.slice(t,a.index));const[,l,u,d,w,A]=a;l!==void 0?o+=`<code>${r(l)}</code>`:u!==void 0?o+=`<kbd>${r(u)}</kbd>`:d!==void 0?o+=Tn(d,w,n):o+=`<strong>${y(A,n)}</strong>`,t=s.lastIndex}return o+r(e.slice(t))}function Tn(e,n,o){const t=_n(n),s=y(e,o);return o.links.push({target:n,...t}),t.kind==="page"?`<a href="${r(o.pageHref(t.page,t.anchor))}" data-page="${t.page}"${t.anchor?` data-anchor="${t.anchor}"`:""}>${s}</a>`:t.kind==="anchor"?`<a href="#${t.anchor}">${s}</a>`:t.kind==="external"?`<a href="${r(t.href)}" target="_blank" rel="noopener noreferrer">${s}<span class="external-mark" aria-hidden="true">↗</span></a>`:t.kind==="relative"?`<a href="${r(t.href)}">${s}</a>`:s}function S(e){return String(e).replace(new RegExp(ce.source,"g"),(n,o,t,s,a,l)=>o??t??S(s!==void 0?s:l))}function oe(e){return e.trim().replace(/^\|/,"").replace(/\|$/,"").split("|").map(n=>n.trim())}const xn=/^(```|#{2,4}\s|[-*]\s|\d+\.\s|>|\||---+\s*$|!\[)/,Mn=/^!\[([^\]]*)\]\(image:([a-z0-9-]+)\)\s*$/;function de(e,n){let o="",t=0;for(;t<e.length;){const s=e[t];if(!s.trim()){t+=1;continue}if(s.startsWith("```")){const i=[];for(t+=1;t<e.length&&!e[t].startsWith("```");)i.push(e[t++]);t+=1,o+=`<pre><code>${r(i.join(`
`))}</code></pre>`,n.text.push(i.join(" "));continue}const a=/^(#{2,4})\s+(.+?)(?:\s+\{#([^}]+)\})?\s*$/.exec(s);if(a){const i=a[1].length,p=a[3]??"";In.test(p)||n.errors.push(`Heading “${a[2]}” needs an explicit {#id}.`);const h=S(a[2]);n.headings.push({level:i,id:p,text:h}),n.sections.push({id:p,heading:h,text:[]}),n.text=n.sections.at(-1).text,o+=`<h${i} id="${r(p)}">${y(a[2],n)}<a class="heading-anchor" href="#${r(p)}" aria-label="${r(n.labels.anchor)}: ${r(h)}">#</a></h${i}>`,t+=1;continue}if(/^---+\s*$/.test(s)){o+="<hr />",t+=1;continue}const l=Mn.exec(s);if(l){const[,i,p]=l,h=n.image(p);if(n.images.push(p),!h)n.errors.push(`Image “${p}” is missing.`);else{const I=Math.round(h.width/2),k=Math.round(h.height/2),ne=r(S(i));o+=`<figure class="doc-figure"><a class="doc-zoom" href="${r(h.src)}" data-zoom aria-label="${r(n.labels.zoom)}: ${ne}"><img src="${r(h.src)}" alt="${ne}" width="${I}" height="${k}" loading="lazy" decoding="async" /></a>${i?`<figcaption>${y(i,n)}</figcaption>`:""}</figure>`}t+=1;continue}if(s.startsWith("|")&&/^\|?\s*:?-{2,}/.test(e[t+1]??"")){const i=oe(s);t+=2;const p=[];for(;t<e.length&&e[t].startsWith("|");)p.push(oe(e[t++]));o+='<div class="table-wrap"><table><thead><tr>'+i.map(h=>`<th>${y(h,n)}</th>`).join("")+"</tr></thead><tbody>",o+=p.map(h=>"<tr>"+i.map((I,k)=>`<td>${y(h[k]??"",n)}</td>`).join("")+"</tr>").join(""),o+="</tbody></table></div>",n.text.push([i,...p].flat().map(S).join(" "));continue}if(s.startsWith(">")){const i=[];for(;t<e.length&&e[t].startsWith(">");)i.push(e[t++].replace(/^>\s?/,""));const p=/^\[!([a-z]+)\]\s*$/i.exec(i[0]??""),h=p&&An.has(p[1].toLowerCase())?p[1].toLowerCase():"note";p&&i.shift();const I=n.labels[h];o+=`<aside class="callout callout-${h}"><p class="callout-title">${r(I)}</p>${de(i,n)}</aside>`;continue}const u=/^(?:([-*])|(\d+)\.)\s+(.*)$/,d=u.exec(s);if(d){const i=d[2]!==void 0,p=i?Number(d[2]):1,h=[];for(;t<e.length;){const k=u.exec(e[t]);if(k&&k[2]!==void 0===i){h.push(k[3]),t+=1;continue}if(h.length&&/^\s{2,}\S/.test(e[t])){h[h.length-1]+=` ${e[t].trim()}`,t+=1;continue}break}const I=i?"ol":"ul";o+=`<${I}${i&&p!==1?` start="${p}"`:""}>`+h.map(k=>`<li>${y(k,n)}</li>`).join("")+`</${I}>`,n.text.push(h.map(S).join(" "));continue}const w=[];for(;t<e.length&&e[t].trim()&&!(w.length&&xn.test(e[t]));)w.push(e[t++].trim());const A=w.join(" ");o+=`<p>${y(A,n)}</p>`,n.text.push(S(A))}return o}const se={tip:"Tip",note:"Note",warning:"Warning",anchor:"Link to section",zoom:"Enlarge image"};function Un(e,{pageHref:n=(s,a)=>`?page=${s}${a?`#${a}`:""}`,labels:o=se,image:t=()=>null}={}){const s={id:"",heading:"",text:[]},a={pageHref:n,image:t,labels:{...se,...o},headings:[],sections:[s],text:s.text,links:[],images:[],errors:[]},l=de(String(e).replace(/\r\n?/g,`
`).split(`
`),a),u=a.sections.map(d=>({...d,text:d.text.join(" ").replace(/\s+/g," ").trim()})).filter(d=>d.id||d.text);return{html:l,headings:a.headings,sections:u,links:a.links,images:a.images,errors:a.errors}}function Nn(e){const n=[];return e.forEach(({id:o,meta:t,sections:s},a)=>{const l=t.description??"",u=s.find(d=>!d.id);n.push({page:o,title:t.title,heading:"",anchor:"",text:`${l} ${u?.text??""}`.trim(),order:a*1e3}),s.filter(d=>d.id).forEach((d,w)=>n.push({page:o,title:t.title,heading:d.heading,anchor:d.id,text:d.text,order:a*1e3+w+1}))}),n}function Rn(e,n){let o=0;for(let t=e.indexOf(n);t>=0&&o<4;t=e.indexOf(n,t+n.length))o+=1;return o}function Ln(e,n,o=20){const t=String(n).toLowerCase().split(/\s+/).filter(Boolean);if(!t.length)return[];const s=[];for(const a of e){const l=a.title.toLowerCase(),u=a.heading.toLowerCase(),d=a.text.toLowerCase();if(!t.every(i=>l.includes(i)||u.includes(i)||d.includes(i)))continue;let w=0;for(const i of t)w+=(l.includes(i)?6:0)+(u.includes(i)?8:0)+Rn(d,i);const A=t.join(" ");!a.heading&&t.every(i=>l.includes(i))&&(w+=4),!a.heading&&l===A&&(w+=30),u===A&&(w+=12),s.push({...a,score:w,snippet:En(a.text,t)})}return s.sort((a,l)=>l.score-a.score||a.order-l.order).slice(0,o)}function En(e,n,o=36){const t=e.toLowerCase(),s=n.map(d=>t.indexOf(d)).filter(d=>d>=0),a=s.length?Math.min(...s):0,l=Math.max(0,a-o),u=Math.min(e.length,a+o*2);return`${l>0?"…":""}${e.slice(l,u)}${u<e.length?"…":""}`}function ae(e,n){const o=n.filter(Boolean).sort((s,a)=>a.length-s.length);if(!o.length)return r(e);const t=new RegExp(`(${o.map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")})`,"gi");return String(e).split(t).map((s,a)=>a%2?`<mark>${r(s)}</mark>`:r(s)).join("")}const $n={"en/browser":[1720,1528],"en/computer-mode":[1800,461],"en/home":[2560,1600],"en/library":[2560,1600],"en/models":[1720,1528],"en/permissions":[1720,1238],"en/recovery":[1261,1272],"en/results":[2560,1600],"en/step-editor":[1808,1239],"en/steps":[2560,1600],"en/task-running":[2560,1600],"zh-CN/browser":[1720,1528],"zh-CN/computer-mode":[1800,392],"zh-CN/home":[2560,1600],"zh-CN/library":[2560,1600],"zh-CN/models":[1720,1528],"zh-CN/permissions":[1720,1238],"zh-CN/recovery":[1261,1267],"zh-CN/results":[2560,1600],"zh-CN/step-editor":[1808,1231],"zh-CN/steps":[2560,1600],"zh-CN/task-running":[2560,1600]},On=Object.assign({"../content/docs/en/browser.md":Ce,"../content/docs/en/concepts.md":Ae,"../content/docs/en/control.md":Ie,"../content/docs/en/install.md":Se,"../content/docs/en/interface.md":_e,"../content/docs/en/models.md":Te,"../content/docs/en/overview.md":xe,"../content/docs/en/permissions.md":Me,"../content/docs/en/phone.md":Ue,"../content/docs/en/recording.md":Ne,"../content/docs/en/reference.md":Re,"../content/docs/en/results.md":Le,"../content/docs/en/skills.md":Ee,"../content/docs/en/tasks.md":$e,"../content/docs/en/troubleshooting.md":Oe,"../content/docs/zh-CN/browser.md":De,"../content/docs/zh-CN/concepts.md":We,"../content/docs/zh-CN/control.md":ze,"../content/docs/zh-CN/install.md":Pe,"../content/docs/zh-CN/interface.md":qe,"../content/docs/zh-CN/models.md":Ge,"../content/docs/zh-CN/overview.md":Be,"../content/docs/zh-CN/permissions.md":Fe,"../content/docs/zh-CN/phone.md":je,"../content/docs/zh-CN/recording.md":He,"../content/docs/zh-CN/reference.md":Ke,"../content/docs/zh-CN/results.md":Xe,"../content/docs/zh-CN/skills.md":Ve,"../content/docs/zh-CN/tasks.md":Ye,"../content/docs/zh-CN/troubleshooting.md":Ze}),Dn=Object.assign({"../content/docs/images/en/browser.webp":Qe,"../content/docs/images/en/computer-mode.webp":Je,"../content/docs/images/en/home.webp":en,"../content/docs/images/en/library.webp":nn,"../content/docs/images/en/models.webp":tn,"../content/docs/images/en/permissions.webp":on,"../content/docs/images/en/recovery.webp":sn,"../content/docs/images/en/results.webp":an,"../content/docs/images/en/step-editor.webp":rn,"../content/docs/images/en/steps.webp":cn,"../content/docs/images/en/task-running.webp":dn,"../content/docs/images/zh-CN/browser.webp":ln,"../content/docs/images/zh-CN/computer-mode.webp":hn,"../content/docs/images/zh-CN/home.webp":pn,"../content/docs/images/zh-CN/library.webp":un,"../content/docs/images/zh-CN/models.webp":mn,"../content/docs/images/zh-CN/permissions.webp":gn,"../content/docs/images/zh-CN/recovery.webp":wn,"../content/docs/images/zh-CN/results.webp":fn,"../content/docs/images/zh-CN/step-editor.webp":kn,"../content/docs/images/zh-CN/steps.webp":yn,"../content/docs/images/zh-CN/task-running.webp":bn}),Wn=document.querySelector("#docs-shell"),zn=document.querySelector("#sidebar"),X=document.querySelector("#sidebar-backdrop"),L=document.querySelector("#doc-content"),le=document.querySelector(".docs-topbar"),he=document.querySelector("#doc-nav"),Pn=document.querySelector("#doc-group"),qn=document.querySelector("#doc-title"),Gn=document.querySelector("#doc-lead"),Bn=document.querySelector("#doc-body"),pe=document.querySelector("#doc-toc"),Fn=document.querySelector("#doc-pager"),$=document.querySelector("#copy-markdown"),G=document.querySelector("#copy-markdown-label"),ie=document.querySelector("#copy-status"),m=document.querySelector("#search-dialog"),v=document.querySelector("#search-input"),jn=document.querySelector("#search-status"),N=document.querySelector("#search-results"),z=document.querySelector("#sidebar-open"),Hn=window.matchMedia("(min-width: 901px)"),ue=window.matchMedia("(prefers-color-scheme: dark)"),me={title:"docsTitle",description:"docsDescription"},O=new Map,D=new Map,x=new Set;let f=ge(),b=[],_=0,B=0;function V(e,n,o){try{return e==="get"?localStorage.getItem(n):localStorage.setItem(n,o)}catch{return null}}function ge(){const e=new URLSearchParams(window.location.search).get("page");return T.includes(e)?e:R}function C(e,n=""){const o=new URLSearchParams,t=new URLSearchParams(window.location.search).get("lang");(t==="en"||t==="zh-CN")&&o.set("lang",t),e!==R&&o.set("page",e);const s=o.toString();return`${window.location.pathname}${s?`?${s}`:""}${n?`#${n}`:""}`}function E(e,n){const o=`${e}/${n}`;if(!O.has(o)){const{meta:t,body:s}=Sn(On[`../content/docs/${e}/${n}.md`]??""),a={tip:g("tip",e),note:g("note",e),warning:g("warning",e),anchor:g("anchor",e),zoom:g("zoom",e)};O.set(o,{meta:t,markdown:s,...Un(s,{pageHref:C,labels:a,image:l=>we(e,l)})})}return O.get(o)}function we(e,n){const o=Dn[`../content/docs/images/${e}/${n}.webp`],t=$n[`${e}/${n}`];return o&&t?{src:o,width:t[0],height:t[1]}:null}function Y(){O.clear(),D.clear()}function re(e){const n=E(c,e);return`<a class="nav-link" href="${r(C(e))}" data-page="${e}"${e===f?' aria-current="page"':""}>${r(n.meta.nav||n.meta.title)}</a>`}function Kn(){he.innerHTML=H.map(e=>{if(!e.label)return e.pages.map(re).join("");const n=!x.has(e.id);return`<div class="nav-group"><button class="nav-group-toggle" type="button" aria-expanded="${n}" aria-controls="nav-group-${e.id}" data-group="${e.id}"><span>${r(e.label[c])}</span><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m6 8 4 4 4-4" /></svg></button><div class="nav-group-pages" id="nav-group-${e.id}"${n?"":" hidden"}>${e.pages.map(re).join("")}</div></div>`}).join("")}function Xn(e){pe.innerHTML=`<ol>${e.filter(n=>n.level===2).map(n=>`<li><a href="#${r(n.id)}" data-toc="${r(n.id)}">${r(n.text)}</a></li>`).join("")}</ol>`,ke()}function Vn(){const{previous:e,next:n}=Cn(f),o=(t,s)=>{if(!t)return"";const a=E(c,t);return`<a class="pager-link pager-${s}" href="${r(C(t))}" data-page="${t}" rel="${s==="next"?"next":"prev"}"><span>${r(g(s==="next"?"next":"previous",c))}</span><strong>${r(a.meta.nav||a.meta.title)}</strong></a>`};Fn.innerHTML=o(e,"previous")+o(n,"next")}function Yn(){const e=document.querySelector("#language-toggle"),n=new URL(window.location.href);n.searchParams.set("lang",c==="en"?"zh-CN":"en"),e.setAttribute("href",`${n.pathname}${n.search}${n.hash}`)}function P(){const e=E(c,f),n=K(f);Pn.textContent=n?.label?.[c]??"",qn.textContent=e.meta.title,Gn.textContent=e.meta.description??"",Bn.innerHTML=e.html,document.title=f===R?e.meta.title:`${e.meta.title} — ${g("titleSuffix",c)}`,document.querySelector('meta[name="description"]').content=e.meta.description||te("docsDescription",c),v.placeholder=te("docsSearchPlaceholder",c),window.clearTimeout(B),$.classList.remove("is-done"),G.textContent=g("copyMarkdown",c),Kn(),Xn(e.headings),Vn(),Yn()}function Z(e){const n=e?document.getElementById(e):null;n?n.scrollIntoView({behavior:"instant",block:"start"}):window.scrollTo({top:0,behavior:"instant"})}function fe(e,n=""){const o=e!==f;f=e;const t=C(e,n);t!==`${window.location.pathname}${window.location.search}${window.location.hash}`&&window.history.pushState(null,"",t),x.delete(K(e)?.id),o&&P(),U({restoreFocus:!1}),(o||n)&&Z(n),o&&!n&&L.focus({preventScroll:!0})}function ke(){const e=[...pe.querySelectorAll("a[data-toc]")];if(!e.length)return;const n=e.map(s=>document.getElementById(s.dataset.toc)).filter(Boolean);let o=n[0]?.id;for(const s of n)if(s.getBoundingClientRect().top<=140)o=s.id;else break;window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4&&window.scrollY>0&&(o=n.at(-1)?.id);for(const s of e)s.classList.toggle("is-active",s.dataset.toc===o)}let q=0;window.addEventListener("scroll",()=>{q||(q=window.requestAnimationFrame(()=>{q=0,ke()}))},{passive:!0});function Zn(){const e=E(c,f),n=t=>new URL(t,window.location.href).href,o=e.markdown.replace(/\]\(image:([a-z0-9-]+)\)/g,(t,s)=>{const a=we(c,s);return a?`](${n(a.src)})`:t}).replace(/\]\(page:([a-z0-9-]+)(?:#([a-z0-9-]+))?\)/g,(t,s,a)=>`](${n(C(s,a))})`).replace(/\]\((\.\.?\/[^)\s]*)\)/g,(t,s)=>`](${n(s)})`).replace(/\]\((#[a-z0-9-]+)\)/g,(t,s)=>`](${n(`${C(f)}${s}`)})`).replace(/[ \t]+\{#[a-z0-9-]+\}[ \t]*$/gm,"").replace(/\+\+([^+]+)\+\+/g,"`$1`").trim();return`# ${e.meta.title}

${e.meta.description?`${e.meta.description}

`:""}${o}
`}async function Qn(e){try{return await navigator.clipboard.writeText(e),!0}catch{const n=document.createElement("textarea");n.value=e,n.className="visually-hidden",n.setAttribute("readonly",""),document.body.append(n),n.select();let o=!1;try{o=document.execCommand("copy")}catch{}return n.remove(),o}}$.addEventListener("click",async()=>{const e=await Qn(Zn()),n=g(e?"copied":"copyFailed",c);G.textContent=n,ie.textContent=n,$.classList.toggle("is-done",e),window.clearTimeout(B),B=window.setTimeout(()=>{G.textContent=g("copyMarkdown",c),ie.textContent="",$.classList.remove("is-done")},2e3)});function Jn(){return D.has(c)||D.set(c,Nn(T.map(e=>({id:e,...E(c,e)})))),D.get(c)}function Q(){const e=v.value.trim(),n=e.toLowerCase().split(/\s+/).filter(Boolean);b=e?Ln(Jn(),e):[],_=0,jn.textContent=e?b.length?g("searchCount",c,{n:b.length}):g("searchNone",c):g("searchEmpty",c),N.innerHTML=b.map((o,t)=>{const s=o.heading||o.title,a=o.heading?o.title:K(o.page)?.label?.[c]??"";return`<li role="option" id="search-option-${t}" aria-selected="${t===0}"><a href="${r(C(o.page,o.anchor))}" data-page="${o.page}"${o.anchor?` data-anchor="${r(o.anchor)}"`:""} tabindex="-1"${t===0?' class="is-active"':""}><span class="search-result-title">${ae(s,n)}${a?`<small>${r(a)}</small>`:""}</span>${o.snippet?`<span class="search-result-snippet">${ae(o.snippet,n)}</span>`:""}</a></li>`}).join(""),ye()}function ye(){const e=[...N.querySelectorAll('[role="option"]')];e.forEach((s,a)=>{s.setAttribute("aria-selected",String(a===_)),s.firstElementChild.classList.toggle("is-active",a===_)});const n=e[_];if(!n){v.removeAttribute("aria-activedescendant");return}v.setAttribute("aria-activedescendant",n.id);const o=N.getBoundingClientRect(),t=n.getBoundingClientRect();t.top<o.top?N.scrollTop-=o.top-t.top:t.bottom>o.bottom&&(N.scrollTop+=t.bottom-o.bottom)}let W=null;m.addEventListener("close",()=>{(m.contains(document.activeElement)||document.activeElement===document.body)&&((W?.isConnected?W:L).focus({preventScroll:!0}),(m.contains(document.activeElement)||document.activeElement===document.body)&&L.focus({preventScroll:!0})),W=null});function F(){m.open||(W=document.activeElement instanceof HTMLElement&&document.activeElement!==document.body?document.activeElement:null,U({restoreFocus:!1}),m.showModal(),Q(),v.focus(),v.select())}v.addEventListener("input",Q);v.addEventListener("keydown",e=>{if(!e.isComposing){if(e.key==="ArrowDown"||e.key==="ArrowUp"){if(e.preventDefault(),!b.length)return;_=(_+(e.key==="ArrowDown"?1:-1)+b.length)%b.length,ye()}else if(e.key==="Enter"){e.preventDefault();const n=b[_];if(!n)return;m.close(),fe(n.page,n.anchor)}}});document.querySelector("#search-close").addEventListener("click",()=>m.close());m.addEventListener("click",e=>{e.target===m&&m.close()});for(const e of document.querySelectorAll("[data-search-open]"))e.addEventListener("click",F);document.querySelector("#search-modifier").textContent=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";document.addEventListener("keydown",e=>{const n=e.target instanceof HTMLElement&&(e.target.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="k"?(e.preventDefault(),m.open?m.close():F()):e.key==="/"&&!n&&!m.open&&!e.metaKey&&!e.ctrlKey?(e.preventDefault(),F()):e.key==="Escape"&&document.body.classList.contains("sidebar-open")&&U()});const M=document.querySelector("#image-dialog"),j=M.querySelector("img");M.addEventListener("click",()=>M.close());M.addEventListener("close",()=>{j.removeAttribute("src")});document.addEventListener("click",e=>{const n=e.target.closest("a[data-zoom]");if(n&&e.button===0&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey){e.preventDefault();const s=n.querySelector("img");j.src=s.currentSrc||s.src,j.alt=s.alt,M.querySelector("button").setAttribute("aria-label",g("closeImage",c)),M.showModal();return}const o=e.target.closest("[data-group]");if(o){const s=o.dataset.group;x.has(s)?x.delete(s):x.add(s);const a=!x.has(s);o.setAttribute("aria-expanded",String(a)),document.getElementById(`nav-group-${s}`).hidden=!a;return}const t=e.target.closest("a[data-page]");!t||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||(e.preventDefault(),m.open&&m.close(),fe(t.dataset.page,t.dataset.anchor??""))});window.addEventListener("popstate",()=>{const e=ge(),n=new URLSearchParams(window.location.search).get("lang"),o=(n==="en"||n==="zh-CN")&&n!==c;o&&(c=n,be(document,c,me),Y()),!(e===f&&!o)&&(f=e,P(),Z(decodeURIComponent(window.location.hash.slice(1))))});function J(e){Wn.classList.toggle("is-collapsed",e),document.querySelector("#sidebar-expand").hidden=!e,V("set","ui-mate-docs-sidebar",e?"collapsed":"open")}function et(){document.body.classList.add("sidebar-open"),X.hidden=!1,z.setAttribute("aria-expanded","true"),L.inert=!0,le.inert=!0,(he.querySelector('[aria-current="page"]')??zn.querySelector("a, button"))?.focus()}function U({restoreFocus:e=!0}={}){document.body.classList.contains("sidebar-open")&&(document.body.classList.remove("sidebar-open"),X.hidden=!0,z.setAttribute("aria-expanded","false"),L.inert=!1,le.inert=!1,e&&z.focus())}document.querySelector("#sidebar-collapse").addEventListener("click",()=>{J(!0),document.querySelector("#sidebar-expand").focus()});document.querySelector("#sidebar-expand").addEventListener("click",()=>{J(!1),document.querySelector("#sidebar-collapse").focus()});z.addEventListener("click",et);document.querySelector("#sidebar-close").addEventListener("click",()=>U());X.addEventListener("click",()=>U());Hn.addEventListener("change",()=>U({restoreFocus:!1}));V("get","ui-mate-docs-sidebar")==="collapsed"&&J(!0);function nt(){return document.documentElement.dataset.theme||(ue.matches?"dark":"light")}function ee(){for(const e of document.querySelectorAll("[data-theme-choice]"))e.setAttribute("aria-pressed",String(e.dataset.themeChoice===nt()))}for(const e of document.querySelectorAll("[data-theme-choice]"))e.addEventListener("click",()=>{document.documentElement.dataset.theme=e.dataset.themeChoice,V("set","ui-mate-docs-theme",e.dataset.themeChoice),ee()});ue.addEventListener("change",ee);ee();let c=ve(me,e=>{c=e,Y(),P(),m.open&&Q()});new URLSearchParams(window.location.search).get("page")!==null&&f===R&&window.history.replaceState(null,"",C(R));Y();P();window.location.hash&&window.requestAnimationFrame(()=>Z(decodeURIComponent(window.location.hash.slice(1))));
