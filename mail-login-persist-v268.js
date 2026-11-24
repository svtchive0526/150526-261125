/* SHINDO V268 — mail login persistence reinforcement.
   Runs after the existing login handler. No credentials are stored. */
(() => {
  'use strict';
  const REMEMBER_KEY = 'svter_mail_remembered_v77';
  const $ = (id) => document.getElementById(id);
  const isRemembered = () => {
    try { return localStorage.getItem(REMEMBER_KEY) === '1'; }
    catch (_) { return false; }
  };

  // Recover only a session that the existing valid-credentials login form saved.
  function restoreRememberedMail() {
    if (!isRemembered()) return;
    const login = $('login-page');
    const mail = $('mail-page');
    if (!login || !mail) return;

    const lock = $('svter-lock');
    if (lock) {
      lock.classList.remove('lock-visible', 'lock-unlocking', 'pin-open');
      lock.style.display = 'none';
      lock.setAttribute('aria-hidden', 'true');
    }
    for (const id of ['fiction-disclaimer', 'loading', 'title-interlude']) {
      const el = $(id);
      if (el) {
        el.classList.add('dismissed');
        el.style.display = 'none';
      }
    }
    document.documentElement.classList.remove('svter-resuming-lock');
    document.body.classList.add('sh-browser-unlocked');
    $('app')?.classList.add('ready');
    login.style.display = 'none';
    mail.style.display = 'block';
  }

  function install() {
    const form = $('login-form');
    const login = $('login-page');
    const checkbox = $('svter-remember-login');

    // The existing login validator runs first. Mirror *only a successful login*.
    // Checking the box by itself never authenticates the player.
    if (form && checkbox) {
      form.addEventListener('submit', () => {
        queueMicrotask(() => {
          const succeeded = $('login-error')?.hidden === true &&
            $('mail-page')?.style.display === 'block' &&
            $('login-page')?.style.display === 'none';
          if (!succeeded) return;
          try {
            if (checkbox.checked) localStorage.setItem(REMEMBER_KEY, '1');
            else localStorage.removeItem(REMEMBER_KEY);
          } catch (_) { /* Browser storage may be disabled. */ }
        });
      });
    }

    // Restore after browser back/forward cache, reopening the tab, or a tab UI
    // that mistakenly reveals the login panel despite a remembered session.
    window.addEventListener('pageshow', restoreRememberedMail);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) restoreRememberedMail();
    });
    window.addEventListener('storage', (event) => {
      if (event.key === REMEMBER_KEY) restoreRememberedMail();
    });
    if (login && typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver(() => {
        if (isRemembered() && login.style.display !== 'none') {
          restoreRememberedMail();
        }
      });
      observer.observe(login, { attributes: true, attributeFilter: ['style'] });
    }
    restoreRememberedMail();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once: true });
  } else {
    install();
  }
})();
