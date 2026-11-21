/**
 * Vote Citoyen — Interactions réelles avec Supabase
 * Authentification anonyme, vote réel, résultats depuis la base de données.
 */

// Configuration Supabase - À REMPLIR AVEC VOS CLÉS
const SUPABASE_URL = 'https://gdnvbjmxukdgmkvwngob.supabaseClient.co';
const SUPABASE_ANON_KEY = 'sb_publishable_YP0k0VVFyKdvn9zlL8frYA_liKWDJJ1';

// Client Supabase global
let supabaseClient = null;

// Noms des candidats pour l'affichage
const CANDIDAT_NOMS = {
  delarbre: 'Monsieur Delarbre',
  jeremy: 'Jérémy',
  nahil: 'Nahil',
  lea: 'Michou',
  thomas: 'Michael Jackson',
  camille: 'Jul',
  blanc: 'Vote blanc'
};

// Initialisation Supabase au chargement
async function initSupabase() {
  if (typeof window.supabase === 'undefined') {
    console.error('supabase-js non chargé. Vérifiez le script CDN.');
    return;
  }
  
  supabase = window.supabaseClient.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  // Authentification anonyme automatique
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) {
    const { error } = await supabaseClient.auth.signInAnonymously();
    if (error) {
      console.error('Erreur auth anonyme:', error.message);
    }
  }
  
  // Écouter les changements d'auth (refresh token, etc.)
  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      console.log('Utilisateur anonyme connecté:', session.user.id);
    }
  });
}

// Helpers communs
async function getScrutinState() {
  if (!supabase) await initSupabase();
  const { data, error } = await supabaseClient.from('scrutin').select('ouvert').single();
  if (error) {
    console.error('Erreur lecture scrutin:', error.message);
    return null;
  }
  return data?.ouvert ?? false;
}

function showMessage(elementId, message, type = 'info') {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.className = 'admin-status ' + type;
  el.style.display = 'block';
}

function hideMessage(elementId) {
  const el = document.getElementById(elementId);
  if (el) el.style.display = 'none';
}

function setButtonsDisabled(buttons, disabled) {
  buttons.forEach(btn => {
    if (btn) btn.disabled = disabled;
  });
}

// ============================================
// LOGIQUE COMMUNE À TOUTES LES PAGES
// ============================================

document.addEventListener('DOMContentLoaded', async function () {
  // Initialiser Supabase dès que possible
  await initSupabase();
  
  // Navigation commune (inchangée)
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
  
  // Logique spécifique à chaque page
  const path = window.location.pathname.split('/').pop();
  
  if (path === 'vote.html' || path === '') {
    initVotePage();
  } else if (path === 'resultat.html') {
    initResultatPage();
  } else if (path === 'waiting.html') {
    initWaitingPage();
  } else if (path === 'admin.html') {
    initAdminPage();
  }
});

// ============================================
// NAVIGATION / PROFIL (inchangé)
// ============================================

let isConnected = false;

function updateNavState() {
  const btn = document.getElementById('nav-login-btn');
  const profile = document.getElementById('profile-wrapper');
  if (!btn || !profile) return;
  if (isConnected) {
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
  isConnected = true;
  updateNavState();
}

function disconnectUser() {
  isConnected = false;
  closeProfileMenu();
  updateNavState();
  window.location.href = 'index.html';
}

// ============================================
// PAGE CONNEXION (simplifiée - juste navigation)
// ============================================

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
    e.preventDefault();
    connectUser();
    window.location.href = 'verification.html';
  });
}

// ============================================
// PAGE VÉRIFICATION (inchangée - simulation visuelle)
// ============================================

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

// ============================================
// PAGE VOTE - Vote réel via Supabase
// ============================================

async function initVotePage() {
  const voteForm = document.getElementById('vote-form');
  if (!voteForm) return;
  
  // Vérifier l'état du scrutin au chargement
  const ouvert = await getScrutinState();
  if (ouvert === false) {
    // Scrutin fermé -> rediriger vers résultats
    window.location.href = 'resultat.html';
    return;
  }
  if (ouvert === null) {
    // Erreur de lecture
    alert('Impossible de vérifier l\'état du scrutin. Veuillez réessayer.');
    return;
  }
  
  voteForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const selected = document.querySelector('input[name="candidat"]:checked');
    if (!selected) {
      alert('Veuillez sélectionner un candidat ou le vote blanc avant de valider.');
      return;
    }
    
    const candidat = selected.value;
    const submitBtn = voteForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enregistrement…';
    
    try {
      const { error } = await supabaseClient.rpc('enregistrer_vote', { p_candidat: candidat });
      
      if (error) {
        if (error.message.includes('Déjà voté')) {
          alert('Vous ne pouvez pas voter deux fois.');
        } else if (error.message.includes('Scrutin fermé')) {
          alert('Le scrutin vient d\'être fermé. Vous ne pouvez plus voter.');
          window.location.href = 'resultat.html';
        } else {
          alert('Erreur lors du vote : ' + error.message);
        }
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
      }
      
      // Succès -> rediriger vers page d'attente
      window.location.href = 'waiting.html';
      
    } catch (err) {
      console.error('Erreur vote:', err);
      alert('Erreur inattendue. Veuillez réessayer.');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// ============================================
// PAGE ATTENTE - Polling de l'état du scrutin
// ============================================

let pollingInterval = null;

async function initWaitingPage() {
  const statusEl = document.getElementById('waiting-status');
  
  async function checkScrutin() {
    const ouvert = await getScrutinState();
    if (ouvert === false) {
      // Scrutin fermé -> arrêter le polling et rediriger
      if (pollingInterval) clearInterval(pollingInterval);
      if (statusEl) statusEl.textContent = 'Scrutin fermé. Redirection vers les résultats…';
      window.location.href = 'resultat.html';
    } else if (ouvert === null) {
      if (statusEl) statusEl.textContent = 'Erreur de connexion. Nouvelle tentative dans 5 secondes…';
    } else {
      if (statusEl) statusEl.textContent = 'Scrutin en cours. Vérification automatique…';
    }
  }
  
  // Vérification immédiate
  await checkScrutin();
  
  // Polling toutes les 5 secondes
  pollingInterval = setInterval(checkScrutin, 5000);
  
  // Nettoyer à la sortie de la page
  window.addEventListener('beforeunload', () => {
    if (pollingInterval) clearInterval(pollingInterval);
  });
}

// ============================================
// PAGE RÉSULTATS - Résultats réels depuis la DB
// ============================================

async function initResultatPage() {
  // Vérifier l'état du scrutin
  const ouvert = await getScrutinState();
  if (ouvert === true) {
    // Scrutin encore ouvert -> rediriger vers attente
    window.location.href = 'waiting.html';
    return;
  }
  if (ouvert === null) {
    alert('Impossible de vérifier l\'état du scrutin.');
    return;
  }
  
  // Scrutin fermé -> charger les vrais résultats
  await loadRealResults();
  
  // Masquer les sections de simulation
  const confirmationSection = document.getElementById('confirmation-section');
  const waitingSection = document.getElementById('waiting-section');
  const resultsSection = document.getElementById('results-section');
  
  if (confirmationSection) confirmationSection.classList.add('hidden');
  if (waitingSection) waitingSection.classList.add('hidden');
  if (resultsSection) resultsSection.classList.remove('hidden');
}

async function loadRealResults() {
  const { data: votes, error } = await supabaseClient.from('votes').select('candidat');
  
  if (error) {
    console.error('Erreur chargement votes:', error.message);
    document.getElementById('results-section').innerHTML = 
      '<p class="demo-note">Erreur lors du chargement des résultats.</p>';
    return;
  }
  
  // Compter les votes par candidat
  const counts = {};
  let total = 0;
  
  votes.forEach(v => {
    counts[v.candidat] = (counts[v.candidat] || 0) + 1;
    total++;
  });
  
  // Mettre à jour l'affichage
  updateResultsDisplay(counts, total);
}

function updateResultsDisplay(counts, total) {
  const chartContainer = document.querySelector('.results-chart');
  if (!chartContainer) return;
  
  // Ordre d'affichage fixe
  const order = ['delarbre', 'jeremy', 'nahil', 'lea', 'thomas', 'camille', 'blanc'];
  const colors = [
    'var(--bleu-profond)',
    'var(--bleu-moyen)',
    '#2a5a8a',
    '#3a6a9a',
    '#4a7aaa',
    '#5a8aba',
    '#6a9aba'
  ];
  
  let html = '';
  
  order.forEach((key, index) => {
    const count = counts[key] || 0;
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
    const nom = CANDIDAT_NOMS[key] || key;
    const color = colors[index];
    
    html += `
      <div class="chart-row" aria-label="${nom} : ${percent} %">
        <div class="chart-name">${nom}</div>
        <div class="chart-bar-container">
          <div class="chart-bar" style="width: ${percent}%; background: ${color};"></div>
        </div>
        <div class="chart-percent">${percent} %</div>
      </div>
    `;
  });
  
  chartContainer.innerHTML = html;
  
  // Mettre à jour la note
  const noteEl = document.querySelector('.results-summary + div .demo-note');
  if (noteEl) {
    noteEl.textContent = `Résultats calculés à partir de ${total} vote${total > 1 ? 's' : ''} réel${total > 1 ? 's' : ''}.`;
  }
}

// ============================================
// PAGE ADMIN - Actions via Edge Function
// ============================================

async function initAdminPage() {
  const codeInput = document.getElementById('admin-code');
  const btnOpen = document.getElementById('btn-open');
  const btnClose = document.getElementById('btn-close');
  const btnCount = document.getElementById('btn-count');
  const btnReset = document.getElementById('btn-reset');
  const voteCountEl = document.getElementById('vote-count');
  const statusEl = document.getElementById('admin-status');
  
  const allButtons = [btnOpen, btnClose, btnCount, btnReset];
  
  // Activer les boutons quand le code est saisi
  codeInput.addEventListener('input', () => {
    const hasCode = codeInput.value.trim().length > 0;
    setButtonsDisabled(allButtons, !hasCode);
  });
  
  // Charger le compteur initial
  await refreshVoteCount();
  
  // Actions
  btnOpen.addEventListener('click', () => adminAction('open'));
  btnClose.addEventListener('click', () => adminAction('close'));
  btnCount.addEventListener('click', () => refreshVoteCount());
  btnReset.addEventListener('click', () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser TOUS les votes ? Cette action est irréversible.')) {
      adminAction('reset');
    }
  });
  
  async function adminAction(action) {
    const code = codeInput.value.trim();
    if (!code) {
      showMessage('admin-status', 'Veuillez entrer le code administrateur.', 'error');
      return;
    }
    
    setButtonsDisabled(allButtons, true);
    hideMessage('admin-status');
    
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/admin-actions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ action, code })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Erreur serveur');
      }
      
      if (action === 'count') {
        voteCountEl.textContent = result.count;
        showMessage('admin-status', `${result.count} vote${result.count > 1 ? 's' : ''} enregistré${result.count > 1 ? 's' : ''}.`, 'success');
      } else if (action === 'reset') {
        voteCountEl.textContent = '0';
        showMessage('admin-status', 'Scrutin réinitialisé avec succès.', 'success');
      } else {
        showMessage('admin-status', `Scrutin ${action === 'open' ? 'ouvert' : 'fermé'} avec succès.`, 'success');
        await refreshVoteCount();
      }
      
    } catch (err) {
      showMessage('admin-status', err.message, 'error');
    } finally {
      setButtonsDisabled(allButtons, !codeInput.value.trim());
    }
  }
  
  async function refreshVoteCount() {
    const code = codeInput.value.trim();
    if (!code) {
      voteCountEl.textContent = '—';
      return;
    }
    
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/admin-actions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ action: 'count', code })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        voteCountEl.textContent = result.count;
      } else {
        voteCountEl.textContent = 'Erreur';
      }
    } catch (err) {
      voteCountEl.textContent = 'Erreur';
    }
  }
}

// Exposer les fonctions globales pour les onclick inline existants
window.showWaiting = function () {
  const confirmationSection = document.getElementById('confirmation-section');
  const waitingSection = document.getElementById('waiting-section');
  const resultsSection = document.getElementById('results-section');
  if (confirmationSection) confirmationSection.classList.add('hidden');
  if (waitingSection) waitingSection.classList.remove('hidden');
  if (resultsSection) resultsSection.classList.add('hidden');
};

window.showResults = function () {
  const confirmationSection = document.getElementById('confirmation-section');
  const waitingSection = document.getElementById('waiting-section');
  const resultsSection = document.getElementById('results-section');
  if (confirmationSection) confirmationSection.classList.add('hidden');
  if (waitingSection) waitingSection.classList.add('hidden');
  if (resultsSection) resultsSection.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
