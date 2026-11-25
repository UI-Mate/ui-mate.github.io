(function () {
  try {
    var saved = localStorage.getItem('ui-mate-docs-theme');
    if (saved === 'light' || saved === 'dark') document.documentElement.setAttribute('data-theme', saved);
  } catch (error) {}
})();
