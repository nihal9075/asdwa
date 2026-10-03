/* ============================================================ */
/* LUXURY MOBILE NAVIGATION DRAWER — ASDWA FASHION LTD.          */
/* High-performance, touch-friendly, accessible drawer navigation*/
/* ============================================================ */
(function() {
  'use strict';

  function initMobileNav() {
    var nav = document.querySelector('.ds-nav') || document.getElementById('navbar');
    if (!nav) return;

    var hamburger = nav.querySelector('.ds-hamburger') || document.getElementById('nav-toggle');
    if (!hamburger) {
      var inner = nav.querySelector('.ds-nav-inner');
      if (inner) {
        hamburger = document.createElement('button');
        hamburger.className = 'ds-hamburger';
        hamburger.id = 'nav-toggle';
        hamburger.setAttribute('aria-label', 'Toggle Navigation Menu');
        hamburger.setAttribute('type', 'button');
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        inner.appendChild(hamburger);
      }
    }

    if (!hamburger) return;

    // Check if drawer already exists
    if (document.querySelector('.ds-mobile-drawer')) return;

    // Detect current page
    var currentFile = window.location.pathname.split('/').pop() || 'index.html';
    if (!currentFile || currentFile === '' || currentFile === 'asdwa') currentFile = 'index.html';
    if (currentFile && !currentFile.includes('.')) currentFile += '.html';

    // Navigation links
    var links = [
      { href: 'index.html#about', label: 'About ASDWA', i18nKey: 'nav.about', page: 'index.html' },
      { href: 'manufacturing.html', label: 'Manufacturing & Machinery', i18nKey: 'nav.manufacturing', page: 'manufacturing.html' },
      { href: 'products.html', label: 'Products & Portfolio', i18nKey: 'nav.products', page: 'products.html' },
      { href: 'responsibility.html', label: 'Sustainability & Solar', i18nKey: 'nav.responsibility', page: 'responsibility.html' },
      { href: 'our-history.html', label: 'Our Heritage (20+ Yrs)', i18nKey: 'nav.history', page: 'our-history.html' },
      { href: 'lyk.html', label: 'LYK Innovation Lab', i18nKey: 'nav.lyk', page: 'lyk.html' },
      { href: 'contact.html', label: 'Contact & Delegation Tour', i18nKey: 'nav.contact', page: 'contact.html' }
    ];

    // Create Backdrop Overlay
    var overlay = document.createElement('div');
    overlay.className = 'ds-mobile-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(8,16,10,0.75);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:9998;opacity:0;visibility:hidden;transition:opacity 0.3s cubic-bezier(0.16,1,0.3,1), visibility 0.3s ease;pointer-events:none;';
    document.body.appendChild(overlay);

    // Create Drawer Container
    var drawer = document.createElement('aside');
    drawer.className = 'ds-mobile-drawer';
    drawer.setAttribute('aria-label', 'Mobile Navigation');
    drawer.style.cssText = 'position:fixed;top:12px;right:12px;bottom:12px;width:calc(100vw - 24px);max-width:350px;background:rgba(12,22,15,0.98);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(201,169,97,0.35);border-radius:24px;box-shadow:0 24px 60px rgba(0,0,0,0.75);z-index:9999;transform:translateX(calc(100% + 24px));opacity:0;visibility:hidden;transition:transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease, visibility 0s linear 0.35s;display:flex;flex-direction:column;padding:24px 20px;overflow-y:auto;-webkit-overflow-scrolling:touch;';

    // Drawer Header
    var headerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:18px;margin-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.1);">' +
      '<a href="index.html" style="display:flex;align-items:center;gap:10px;text-decoration:none;">' +
        '<div style="width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,#E8CC8A,#A6863C);display:flex;align-items:center;justify-content:center;font-weight:800;color:#111D13;font-size:15px;font-family:\'Playfair Display\',serif;box-shadow:0 2px 8px rgba(0,0,0,0.3);">A</div>' +
        '<div>' +
          '<div style="font-family:\'Playfair Display\',serif;font-size:17px;color:#FFFFFF;font-weight:700;letter-spacing:0.12em;line-height:1.1;">ASDWA</div>' +
          '<div style="font-family:\'Outfit\',sans-serif;font-size:8.5px;letter-spacing:0.2em;color:#C9A961;text-transform:uppercase;font-weight:600;">FASHION LTD.</div>' +
        '</div>' +
      '</a>' +
      '<button id="mobile-drawer-close" aria-label="Close navigation" style="width:40px;height:40px;min-width:40px;min-height:40px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(201,169,97,0.3);color:#FFFFFF;font-size:22px;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s ease;">&times;</button>' +
      '</div>';

    // Links HTML
    var linksHTML = '<nav style="display:flex;flex-direction:column;gap:4px;">' +
      links.map(function(l) {
        var isCurrent = (currentFile === l.page && (l.page !== 'index.html' || window.location.hash !== '#about')) ||
                        (currentFile === 'index.html' && l.page === 'index.html');
        var activeClass = isCurrent ? ' active' : '';
        var activeStyle = isCurrent
          ? 'background:rgba(201,169,97,0.16);color:#FFFFFF;border-color:rgba(201,169,97,0.45);font-weight:600;'
          : 'background:transparent;color:rgba(255,255,255,0.85);border-color:transparent;';
        var indicator = isCurrent ? '<span style="width:7px;height:7px;border-radius:50%;background:#C9A961;box-shadow:0 0 8px #C9A961;"></span>' : '';

        return '<a href="' + l.href + '" class="ds-mobile-nav-link' + activeClass + '" data-i18n="' + l.i18nKey + '" style="display:flex;align-items:center;justify-content:space-between;min-height:46px;padding:12px 14px;border-radius:10px;border:1px solid;font-family:\'Outfit\',sans-serif;font-size:13.5px;letter-spacing:0.05em;text-transform:uppercase;text-decoration:none;transition:all 0.2s ease;' + activeStyle + '">' +
               '<span>' + l.label + '</span>' + indicator + '</a>';
      }).join('') +
      '</nav>';

    // CTA Button
    var ctaHTML = '<div style="margin:18px 0 14px;">' +
      '<a href="contact.html" class="ds-btn ds-btn-gold" style="width:100%;min-height:48px;display:flex;align-items:center;justify-content:center;text-align:center;border-radius:12px;font-size:12.5px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Book Delegation Tour &rarr;</a>' +
      '</div>';

    // Language Selector HTML
    var langBtnStyle = 'flex:1;min-height:38px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.18);border-radius:8px;font-family:\'Outfit\',sans-serif;font-size:11.5px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.8);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;transition:all 0.2s ease;';
    var flagStyle = 'width:15px;height:10px;display:inline-block;vertical-align:middle;flex-shrink:0;border-radius:1px;';
    var flagEN = '<svg style="' + flagStyle + '" viewBox="0 0 60 30"><clipPath id="md_en"><circle cx="30" cy="15" r="15"/></clipPath><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="4" clip-path="url(#md_en)"/><path d="M30,0V30 M0,15H60" stroke="#fff" stroke-width="10"/><path d="M30,0V30 M0,15H60" stroke="#C8102E" stroke-width="6"/></svg>';
    var flagES = '<svg style="' + flagStyle + '" viewBox="0 0 6 4"><rect width="6" height="4" fill="#c60b1e"/><rect y="1" width="6" height="2" fill="#ffc400"/></svg>';
    var flagJA = '<svg style="' + flagStyle + '" viewBox="0 0 60 40"><rect width="60" height="40" fill="#fff"/><circle cx="30" cy="20" r="12" fill="#bc002d"/></svg>';

    var langHTML = '<div style="margin-top:auto;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);">' +
      '<div style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#C9A961;font-weight:700;margin-bottom:8px;">Select Language</div>' +
      '<div style="display:flex;gap:8px;">' +
        '<button type="button" style="' + langBtnStyle + '" class="ds-mobile-lang-btn" data-lang="en">' + flagEN + 'EN</button>' +
        '<button type="button" style="' + langBtnStyle + '" class="ds-mobile-lang-btn" data-lang="es">' + flagES + 'ES</button>' +
        '<button type="button" style="' + langBtnStyle + '" class="ds-mobile-lang-btn" data-lang="ja">' + flagJA + 'JA</button>' +
      '</div>' +
      '<div style="margin-top:14px;font-size:10px;color:rgba(255,255,255,0.45);text-align:center;letter-spacing:0.04em;">&copy; 2026 ASDWA Fashion Ltd. &bull; Narsingdi &amp; Dhaka</div>' +
      '</div>';

    drawer.innerHTML = headerHTML + linksHTML + ctaHTML + langHTML;
    document.body.appendChild(drawer);

    // Language buttons styling update
    function updateActiveLang() {
      var currentLang = (typeof i18n !== 'undefined' && i18n.currentLang) ? i18n.currentLang : (localStorage.getItem('fc-lang') || 'en');
      drawer.querySelectorAll('.ds-mobile-lang-btn').forEach(function(btn) {
        if (btn.dataset.lang === currentLang) {
          btn.style.color = '#111D13';
          btn.style.borderColor = '#C9A961';
          btn.style.background = '#C9A961';
          btn.style.boxShadow = '0 2px 8px rgba(201,169,97,0.3)';
        } else {
          btn.style.color = 'rgba(255,255,255,0.75)';
          btn.style.borderColor = 'rgba(255,255,255,0.18)';
          btn.style.background = 'rgba(255,255,255,0.06)';
          btn.style.boxShadow = 'none';
        }
      });
    }

    updateActiveLang();
    window.updateMobileNavLang = updateActiveLang;

    // Open/Close logic
    var isOpen = false;

    function openDrawer() {
      isOpen = true;
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');

      drawer.style.transform = 'translateX(0)';
      drawer.style.opacity = '1';
      drawer.style.visibility = 'visible';
      drawer.style.transition = 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease, visibility 0s linear 0s';

      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
      overlay.style.pointerEvents = 'auto';

      document.body.style.overflow = 'hidden';
      updateActiveLang();
    }

    function closeDrawer() {
      isOpen = false;
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');

      drawer.style.transform = 'translateX(calc(100% + 24px))';
      drawer.style.opacity = '0';
      drawer.style.transition = 'transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease, visibility 0s linear 0.3s';
      drawer.style.visibility = 'hidden';

      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      overlay.style.pointerEvents = 'none';

      document.body.style.overflow = '';
    }

    // Toggle click on hamburger
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Close on overlay click
    overlay.addEventListener('click', closeDrawer);

    // Close on close button click
    var closeBtn = drawer.querySelector('#mobile-drawer-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeDrawer();
      });
    }

    // Close on link click
    drawer.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        closeDrawer();
      });
    });

    // Language switcher click inside drawer
    drawer.querySelectorAll('.ds-mobile-lang-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        var lang = this.dataset.lang;
        if (typeof i18n !== 'undefined' && i18n.switchLanguage) {
          i18n.switchLanguage(lang);
        }
        updateActiveLang();
      });
    });

    // Escape key closes drawer
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen) {
        closeDrawer();
      }
    });

    // Close drawer if resized to desktop (>= 1140px)
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 1140 && isOpen) {
        closeDrawer();
      }
    });

    window.closeMobileMenu = closeDrawer;
    window.openMobileMenu = openDrawer;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();
