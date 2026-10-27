/**
 * Vote Citoyen — Interactions simulées
 * Aucune persistance, aucun backend, aucune collecte de données.
 */

(function () {
  'use strict';

  // Connexion
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
      const password = document.getElementById('password') ? document.getElementById('password').value.trim() : '';
      // Aucune validation stricte requise — démonstration fictive
      window.location.href = 'verification.html';
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
    // Afficher le panneau visage
    document.getElementById('panel-identite').classList.add('hidden');
    document.getElementById('panel-visage').classList.remove('hidden');
    // Mettre à jour la progression
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
    // Afficher le bouton continuer
    const continuer = document.getElementById('btn-continuer');
    if (continuer) continuer.style.display = 'inline-flex';
    // Mettre à jour la progression
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
