document.getElementById('signupBtn').addEventListener('click', () => {
  document.getElementById('signupForm').classList.remove('hidden');
  document.getElementById('signupBtn').classList.add('hidden'); // masquer le bouton
});

document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  localStorage.setItem('userEmail', email);

  document.getElementById('signupForm').classList.add('hidden');
  document.getElementById('paymentSection').classList.remove('hidden');
});

document.getElementById('payBtn').addEventListener('click', () => {
  const method = document.getElementById('paymentMethod').value;
  const phoneCode = document.getElementById('countryCode').value;
  const phoneNumber = document.getElementById('phoneNumber').value;

  if (!method || !phoneNumber) {
    alert('Veuillez remplir tous les champs de paiement.');
    return;
  }

  const fullPhone = `${phoneCode}${phoneNumber}`;
  const email = localStorage.getItem('userEmail');
  const referralCode = btoa(email);
  const referralLink = `${window.location.origin}?ref=${referralCode}`;

  document.getElementById('paymentSection').classList.add('hidden');
  document.getElementById('confirmation').classList.remove('hidden');
  document.getElementById('referralLink').textContent = referralLink;

  console.log(`Paiement reçu de ${fullPhone}`);
  console.log(`Lien envoyé à ${email} : ${referralLink}`);
});

// Bouton copier
document.getElementById('copyBtn').addEventListener('click', () => {
  const link = document.getElementById('referralLink').textContent;
  navigator.clipboard.writeText(link).then(() => {
    alert("Lien copié !");
  }).catch(() => {
    alert("Échec de la copie.");
  });
});

// Enregistrement du service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(() => {
    console.log('Service Worker enregistré.');
  });
}
