// Runs before first paint so a saved light/dark choice does not flash.
// Without a saved choice the page follows the system appearance.
(function () {
  try {
    var saved = localStorage.getItem('ui-mate-docs-theme');
    if (saved === 'light' || saved === 'dark') document.documentElement.setAttribute('data-theme', saved);
  } catch (error) {}
})();
