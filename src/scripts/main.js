(function () {
  // Mobile sidenav toggle
  var toggle = document.getElementById('navToggle');
  var sidenav = document.getElementById('sidenav');
  var backdrop = document.getElementById('sidenavBackdrop');

  function closeNav() {
    sidenav.classList.remove('open');
    backdrop.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  function toggleNav() {
    var open = sidenav.classList.toggle('open');
    backdrop.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  if (toggle) toggle.addEventListener('click', toggleNav);
  if (backdrop) backdrop.addEventListener('click', closeNav);
  sidenav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeNav);
  });

  // Syntax highlighting (hljs is loaded from CDN in template.html)
  if (window.hljs) {
    document.querySelectorAll('pre code').forEach(function (block) {
      window.hljs.highlightElement(block);
    });
  }

  // Copy-to-clipboard button for every code block
  document.querySelectorAll('.code-block').forEach(function (block) {
    var btn = block.querySelector('.copy-btn');
    var code = block.querySelector('code');
    if (!btn || !code) return;
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(code.innerText).then(function () {
        var original = btn.textContent;
        btn.textContent = 'Copied';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 1400);
      });
    });
  });
})();
