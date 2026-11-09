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

  // PWA: register the service worker (needs https, or localhost for previews)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {
        /* offline support is a bonus; the site works without it */
      });
    });
  }

  // PWA: show our own "Install app" button when the browser says the site is installable
  var installBtn = document.getElementById('installBtn');
  var installEvent = null;
  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    installEvent = event;
    if (installBtn) installBtn.hidden = false;
  });
  if (installBtn) {
    installBtn.addEventListener('click', function () {
      if (!installEvent) return;
      installEvent.prompt();
      installEvent.userChoice.finally(function () {
        installEvent = null;
        installBtn.hidden = true;
      });
    });
  }
  window.addEventListener('appinstalled', function () {
    if (installBtn) installBtn.hidden = true;
  });
})();
