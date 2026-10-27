/**
 * Vote Citoyen — Interactions simulées
 * Aucune persistance, aucun backend.
 */

(function () {
  'use strict';

  // Connexion
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      if (!email || !password) {
        alert('Veuillez remplir tous les champs.');
        return;
      }
      // Redirection simulée vers vote
      window.location.href = 'vote.html';
    });
  }

  // Vote
  const voteForm = document.getElementById('vote-form');
  if (voteForm) {
    voteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const selected = document.querySelector('input[name="option"]:checked');
      if (!selected) {
        alert('Veuillez sélectionner une option avant de valider.');
        return;
      }
      window.location.href = 'resultat.html';
    });
  }

  // Résultat : rien de dynamique requis (texte fixe dans HTML)
})();
