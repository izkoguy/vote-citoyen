/**
 * Vote Citoyen — Interactions simulées
 * Aucune persistance, aucun backend, aucune collecte de données.
 */

(function () {
  'use strict';

  // État de connexion fictif (non persistant, paramètre URL minimal)
  // Au chargement initial et après actualisation : toujours déconnecté
  window.isConnected = false;
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('demo')) {
    window.isConnected = true;
  }

  function updateNavState() {
    const btn = document.getElementById('nav-login-btn');
    const profile = document.getElementById('profile-wrapper');
    if (!btn || !profile) return;
    if (window.isConnected) {
      btn.style.display = 'none';
      profile.style.display = 'inline-flex';
    } else {
      btn.style.display = 'inline-flex';
      profile.style.display = 'none';
    }
  }

  function openProfileMenu() {
    const menu = document.getElementById('profile-menu');
    const btn = document.getElementById('profile-btn');
    if (menu) menu.classList.add('open');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    // Fermer Preview State si ouvert
    const previewMenu = document.getElementById('preview-state-menu');
    const previewBtn = document.getElementById('preview-state-btn');
    if (previewMenu && previewMenu.classList.contains('open')) {
      previewMenu.classList.remove('open');
      if (previewBtn) previewBtn.setAttribute('aria-expanded', 'false');
    }
  }

  function closeProfileMenu() {
    const menu = document.getElementById('profile-menu');
    const btn = document.getElementById('profile-btn');
    if (menu) menu.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function toggleProfileMenu() {
    const menu = document.getElementById('profile-menu');
    if (!menu) return;
    if (menu.classList.contains('open')) closeProfileMenu();
    else openProfileMenu();
  }

  function connectUser() {
    window.isConnected = true;
    updateNavState();
  }

  function navigateWithDemo(url) {
    const separator = url.includes('?') ? '&' : '?';
    window.location.href = url + separator + 'demo=1';
  }

  function disconnectUser() {
    window.isConnected = false;
    closeProfileMenu();
    updateNavState();
    window.location.href = 'index.html';
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateNavState();

    const navLoginBtn = document.getElementById('nav-login-btn');
    if (navLoginBtn) {
      navLoginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'connexion.html';
      });
    }

    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn) {
      profileBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleProfileMenu();
      });
    }

    const previewBtn = document.getElementById('preview-state-btn');
    const previewMenu = document.getElementById('preview-state-menu');
    if (previewBtn && previewMenu) {
      previewBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (previewMenu.classList.contains('open')) {
          previewMenu.classList.remove('open');
          previewBtn.setAttribute('aria-expanded', 'false');
        } else {
          previewMenu.classList.add('open');
          previewBtn.setAttribute('aria-expanded', 'true');
          // Fermer Profil si ouvert
          const profileMenu = document.getElementById('profile-menu');
          const profileBtn = document.getElementById('profile-btn');
          if (profileMenu && profileMenu.classList.contains('open')) {
            profileMenu.classList.remove('open');
            if (profileBtn) profileBtn.setAttribute('aria-expanded', 'false');
          }
        }
      });
    }

    const logoutBtn = document.getElementById('profile-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        disconnectUser();
      });
    }

    document.addEventListener('click', function (e) {
      const profileWrapper = document.getElementById('profile-wrapper');
      if (profileWrapper && !profileWrapper.contains(e.target)) {
        closeProfileMenu();
      }
      const previewWrapper = document.getElementById('preview-state-btn');
      const previewMenu = document.getElementById('preview-state-menu');
      if (previewMenu && previewMenu.classList.contains('open')) {
        if (!previewWrapper || !previewWrapper.contains(e.target)) {
          previewMenu.classList.remove('open');
          if (previewWrapper) previewWrapper.setAttribute('aria-expanded', 'false');
        }
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeProfileMenu();
        const previewMenu = document.getElementById('preview-state-menu');
        const previewBtn = document.getElementById('preview-state-btn');
        if (previewMenu && previewMenu.classList.contains('open')) {
          previewMenu.classList.remove('open');
          if (previewBtn) previewBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Récapitulatif du choix sur la page résultats
    const recapEl = document.getElementById('recap-choix');
    if (recapEl) {
      const params = new URLSearchParams(window.location.search);
      const choix = params.get('choix');
      if (choix === 'blanc') {
        recapEl.innerHTML = '<strong>Vote blanc</strong> — Vous avez choisi le vote blanc. Ce choix est distinct d\'un candidat et n\'est attribué à aucun d\'entre eux.';
      } else if (choix) {
        const noms = {
          delarbre: 'Monsieur Delarbre',
          jeremy: 'Jérémy',
          nahil: 'Nahil',
          lea: 'Michou',
          thomas: 'Michael Jackson',
          camille: 'Jul'
        };
        const nom = noms[choix] || choix;
        recapEl.innerHTML = '<strong>' + nom + '</strong> — Votre choix a été enregistré dans le cadre de cette démonstration fictive. Aucun vote réel n\'a été transmis ni enregistré.';
      }
    }
  });

  // Connexion via formulaire
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      connectUser();
      navigateWithDemo('verification.html');
    });
  }

  // Skip connexion (bouton secondaire sur connexion.html)
  const skipBtn = document.querySelector('a[href="verification.html"]');
  if (skipBtn && skipBtn.closest('.form-actions')) {
    skipBtn.addEventListener('click', function (e) {
      e.preventDefault();
      connectUser();
      navigateWithDemo('verification.html');
    });
  }

  // Vérification — simulation identité
  window.simulateIdentite = function () {
    const state = document.getElementById('sim-identite-state');
    const btn = document.querySelector('#panel-identite button');
    if (!state || !btn) return;
    state.innerHTML = '<span class="sim-icon" aria-hidden="true">✓</span><span>Simulation réussie — démonstration fictive</span>';
    state.classList.add('success');
    btn.textContent = 'Simulation terminée';
    btn.disabled = true;
    document.getElementById('panel-identite').classList.add('hidden');
    document.getElementById('panel-visage').classList.remove('hidden');
    document.querySelectorAll('.progress-step').forEach((step, i) => {
      if (i === 0) step.classList.add('active');
      else step.classList.remove('active');
    });
  };

  // Vérification — simulation visage
  window.simulateVisage = function () {
    const state = document.getElementById('sim-visage-state');
    const btn = document.querySelector('#panel-visage button');
    if (!state || !btn) return;
    state.innerHTML = '<span class="sim-icon" aria-hidden="true">✓</span><span>Simulation réussie — démonstration fictive</span>';
    state.classList.add('success');
    btn.textContent = 'Simulation terminée';
    btn.disabled = true;
    const continuer = document.getElementById('btn-continuer');
    if (continuer) continuer.style.display = 'inline-flex';
    document.querySelectorAll('.progress-step').forEach((step, i) => {
      if (i === 1) step.classList.add('active');
      else step.classList.remove('active');
    });
  };

  // Vote
  const voteForm = document.getElementById('vote-form');
  if (voteForm) {
    voteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const selected = document.querySelector('input[name="candidat"]:checked');
      if (!selected) {
        alert('Veuillez sélectionner un candidat ou le vote blanc avant de valider.');
        return;
      }
      const separator = 'resultat.html'.includes('?') ? '&' : '?';
      window.location.href = 'resultat.html' + separator + 'choix=' + encodeURIComponent(selected.value) + '&demo=1';
    });
  }

  // Résultats — navigation simulée
  window.showWaiting = function () {
    document.getElementById('confirmation-section').classList.add('hidden');
    document.getElementById('waiting-section').classList.remove('hidden');
    document.getElementById('results-section').classList.add('hidden');
  };

  window.showResults = function () {
    document.getElementById('confirmation-section').classList.add('hidden');
    document.getElementById('waiting-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

})();
