/* ============================================================ */
/* LUXURY MOBILE NAVIGATION DRAWER — FASHION COMFORT GROUP       */
/* ============================================================ */
(function() {
  function initMobileNav() {
    var nav = document.querySelector('.ds-nav');
    if (!nav) return;
    var inner = nav.querySelector('.ds-nav-inner');
    if (!inner) return;

    // Check if hamburger already exists
    if (inner.querySelector('.ds-hamburger')) return;

    // Determine if we are inside a subfolder
    var isSubfolder = window.location.pathname.includes('/Main/') ||
                      window.location.pathname.includes('/Manufacturing/') ||
                      window.location.pathname.includes('/Our%20History/') ||
                      window.location.pathname.includes('/Our History/') ||
                      window.location.pathname.includes('/Products/') ||
                      window.location.pathname.includes('/Responsibility/') ||
                      window.location.pathname.includes('/LYK%20Project/') ||
                      window.location.pathname.includes('/LYK Project/');
    var prefix = isSubfolder ? '../' : '';

    // Hamburger button
    var hamburger = document.createElement('button');
    hamburger.className = 'ds-hamburger';
    hamburger.setAttribute('aria-label', 'Toggle Navigation Menu');
    hamburger.setAttribute('type', 'button');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    inner.appendChild(hamburger);

    // Overlay
    var overlay = document.createElement('div');
    overlay.className = 'ds-mobile-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(11,19,12,0.6);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);z-index:1001;opacity:0;visibility:hidden;transition:opacity 0.3s ease, visibility 0.3s ease;pointer-events:none;';
    document.body.appendChild(overlay);

    // Active page detection
    var currentFile = window.location.pathname.split('/').pop() || 'index.html';

    var links = [
      { href: prefix + 'index.html', label: 'Home', i18nKey: 'nav.home' },
      { href: prefix + 'index.html#about', label: 'About ASDWA', i18nKey: 'nav.about' },
      { href: prefix + 'manufacturing.html', label: 'Manufacturing & Machinery', i18nKey: 'nav.manufacturing', page: 'manufacturing.html' },
      { href: prefix + 'products.html', label: 'Brand Productions', i18nKey: 'nav.products', page: 'products.html' },
      { href: prefix + 'responsibility.html', label: 'Sustainability & Solar', i18nKey: 'nav.responsibility', page: 'responsibility.html' },
      { href: prefix + 'our-history.html', label: 'Our Heritage (20+ Yrs)', i18nKey: 'nav.history', page: 'our-history.html' },
      { href: prefix + 'lyk.html', label: 'LYK Innovation Lab', i18nKey: 'nav.lyk', page: 'lyk.html' },
      { href: prefix + 'contact.html', label: 'Contact & Delegation Tour', i18nKey: 'nav.contact', page: 'contact.html' }
    ];

    // Mobile menu drawer
    var menu = document.createElement('div');
    menu.className = 'ds-mobile-drawer';
    menu.style.cssText = 'position:fixed;top:16px;right:16px;bottom:16px;width:calc(100vw - 32px);max-width:340px;background:rgba(17,29,19,0.98);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(201,169,97,0.35);border-radius:24px;box-shadow:0 24px 60px rgba(0,0,0,0.6);z-index:1002;transform:translateX(calc(100% + 32px));opacity:0;visibility:hidden;transition:transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease, visibility 0s linear 0.35s;display:flex;flex-direction:column;padding:32px 26px 24px;overflow-y:auto;';

    var headerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.1);">' +
      '<div style="display:flex;align-items:center;gap:10px;">' +
        '<div style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#E8CC8A,#A6863C);display:flex;align-items:center;justify-content:center;font-weight:700;color:#111D13;font-size:14px;font-family:\'Outfit\',sans-serif;">A</div>' +
        '<div>' +
          '<div style="font-family:\'Playfair Display\',serif;font-size:16px;color:#FFFFFF;font-weight:600;line-height:1.1;">ASDWA</div>' +
          '<div style="font-family:\'Outfit\',sans-serif;font-size:9px;letter-spacing:0.18em;color:#C9A961;text-transform:uppercase;">FASHION LTD.</div>' +
        '</div>' +
      '</div>' +
      '<button id="mobile-menu-close-btn" aria-label="Close Menu" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);width:32px;height:32px;border-radius:50%;color:#FFFFFF;font-size:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;">&times;</button>' +
      '</div>';

    var linksHTML = links.map(function(l) {
      var isCurrent = (l.page && currentFile === l.page) || (!l.page && currentFile === 'index.html' && l.href.includes('#about') && window.location.hash === '#about');
      var i18nAttr = l.i18nKey ? ' data-i18n="' + l.i18nKey + '"' : '';
      var activeStyle = isCurrent ? 'color:#C9A961;font-weight:600;' : 'color:rgba(255,255,255,0.85);';
      var indicator = isCurrent ? '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#C9A961;margin-left:auto;"></span>' : '';
      return '<a href="' + l.href + '"' + i18nAttr + ' style="display:flex;align-items:center;justify-content:space-between;font-family:\'Outfit\',sans-serif;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);transition:color 0.2s ease;' + activeStyle + '">' +
             '<span>' + l.label + '</span>' + indicator + '</a>';
    }).join('');

    var langBtnStyle = 'flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);border-radius:8px;font-family:\'Outfit\',sans-serif;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.7);cursor:pointer;padding:8px;display:flex;align-items:center;justify-content:center;gap:6px;transition:all 0.2s ease;';
    var flagStyle = 'width:16px;height:11px;display:inline-block;vertical-align:middle;flex-shrink:0;';
    var flagEN = '<svg style="' + flagStyle + '" viewBox="0 0 60 30"><clipPath id="ms_en"><circle cx="30" cy="15" r="15"/></clipPath><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="4" clip-path="url(#ms_en)"/><path d="M30,0V30 M0,15H60" stroke="#fff" stroke-width="10"/><path d="M30,0V30 M0,15H60" stroke="#C8102E" stroke-width="6"/></svg>';
    var flagES = '<svg style="' + flagStyle + '" viewBox="0 0 6 4"><rect width="6" height="4" fill="#c60b1e"/><rect y="1" width="6" height="2" fill="#ffc400"/></svg>';
    var flagJA = '<svg style="' + flagStyle + '" viewBox="0 0 60 40"><rect width="60" height="40" fill="#fff"/><circle cx="30" cy="20" r="12" fill="#bc002d"/></svg>';

    var footerHTML = '<div style="margin-top:auto;padding-top:20px;">' +
      '<div style="font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#C9A961;font-weight:600;margin-bottom:10px;">Select Language</div>' +
      '<div style="display:flex;gap:8px;">' +
        '<button style="' + langBtnStyle + '" class="ml-btn ds-mobile-lang-btn" data-lang="en" onclick="if(window.i18n) i18n.switchLanguage(\'en\')">' + flagEN + 'EN</button>' +
        '<button style="' + langBtnStyle + '" class="ml-btn ds-mobile-lang-btn" data-lang="es" onclick="if(window.i18n) i18n.switchLanguage(\'es\')">' + flagES + 'ES</button>' +
        '<button style="' + langBtnStyle + '" class="ml-btn ds-mobile-lang-btn" data-lang="ja" onclick="if(window.i18n) i18n.switchLanguage(\'ja\')">' + flagJA + 'JA</button>' +
      '</div>' +
      '<div style="margin-top:16px;font-size:10px;color:rgba(255,255,255,0.45);text-align:center;letter-spacing:0.04em;">© 2026 ASDWA Fashion Ltd. • Narsingdi & Dhaka</div>' +
    '</div>';

    menu.innerHTML = headerHTML + '<div style="display:flex;flex-direction:column;">' + linksHTML + '</div>' + footerHTML;
    document.body.appendChild(menu);

    function updateActiveLang() {
      var currentLang = (typeof i18n !== 'undefined' && i18n.currentLang) ? i18n.currentLang : (localStorage.getItem('fc-lang') || 'en');
      menu.querySelectorAll('.ml-btn').forEach(function(btn) {
        if (btn.dataset.lang === currentLang) {
          btn.style.color = '#FFFFFF';
          btn.style.borderColor = '#C9A961';
          btn.style.background = 'rgba(201,169,97,0.2)';
        } else {
          btn.style.color = 'rgba(255,255,255,0.7)';
          btn.style.borderColor = 'rgba(255,255,255,0.15)';
          btn.style.background = 'rgba(255,255,255,0.05)';
        }
      });
    }
    updateActiveLang();

    var isOpen = false;

    function openMenu() {
      isOpen = true;
      hamburger.classList.add('open');
      menu.style.transform = 'translateX(0)';
      menu.style.opacity = '1';
      menu.style.visibility = 'visible';
      menu.style.transition = 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease, visibility 0s linear 0s';
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
      overlay.style.pointerEvents = 'auto';
      document.body.style.overflow = 'hidden';
      updateActiveLang();
    }

    function closeMenu() {
      isOpen = false;
      hamburger.classList.remove('open');
      menu.style.transform = 'translateX(calc(100% + 32px))';
      menu.style.opacity = '0';
      menu.style.transition = 'transform 0.3s ease-in, opacity 0.2s ease, visibility 0s linear 0.3s';
      menu.style.visibility = 'hidden';
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      overlay.style.pointerEvents = 'none';
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      if (isOpen) closeMenu(); else openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    var closeBtn = menu.querySelector('#mobile-menu-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    menu.addEventListener('click', function(e) {
      if (e.target.tagName === 'A' || e.target.closest('a')) {
        closeMenu();
      }
      var btn = e.target.closest('.ml-btn');
      if (btn) {
        setTimeout(updateActiveLang, 50);
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });

    window.closeMobileMenu = closeMenu;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();
