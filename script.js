/**
 * Vote Citoyen — Interactions simulées
 * Aucune persistance, aucun backend, aucune collecte de données.
 */

(function () {
  'use strict';

  // État de connexion fictif (non persistant)
  window.isConnected = false;

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
    if (menu) menu.classList.add('open');
  }

  function closeProfileMenu() {
    const menu = document.getElementById('profile-menu');
    if (menu) menu.classList.remove('open');
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

    const logoutBtn = document.getElementById('profile-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        disconnectUser();
      });
    }

    document.addEventListener('click', function (e) {
      const wrapper = document.getElementById('profile-wrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        closeProfileMenu();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeProfileMenu();
    });
  });

  // Connexion via formulaire
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      connectUser();
      window.location.href = 'verification.html';
    });
  }

  // Skip connexion (bouton secondaire sur connexion.html)
  const skipBtn = document.querySelector('a[href="verification.html"]');
  if (skipBtn && skipBtn.closest('.form-actions')) {
    skipBtn.addEventListener('click', function (e) {
      connectUser();
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
        alert('Veuillez sélectionner un candidat avant de valider.');
        return;
      }
      window.location.href = 'resultat.html';
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
