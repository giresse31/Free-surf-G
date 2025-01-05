
// Créer la scène
const scene = new THREE.Scene();

// Ajouter une caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

// Ajouter un rendu avec fond transparent
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // 0x000000 = noir, 0 = transparence
document.getElementById('globet').appendChild(renderer.domElement);

// Créer une sphère pour le globe
const geometry = new THREE.SphereGeometry(.8, 32, 32);
const texture = new THREE.TextureLoader().load('https://res.cloudinary.com/ddqfmqin7/image/upload/v1734443681/worldwide-connection-blue-background-illustration_53876-63933.jpg_uymm6x.jpg');
const material = new THREE.MeshStandardMaterial({ map: texture });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Ajouter une lumière directionnelle (simulant le soleil)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Ajouter une lumière ambiante pour éclairer uniformément
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Lumière ambiante
scene.add(ambientLight);

// Ajouter une lumière hémisphérique (pour une lumière plus uniforme)
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(hemisphereLight);

// Mettre à jour l'aspect de la caméra et la taille du renderer lorsque la fenêtre est redimensionnée
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Fonction d'animation
function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.002; // Rotation de gauche à droite
  renderer.render(scene, camera);
}

animate();



// function pour changer le background color du header
window.addEventListener('scroll', () => {
  const header = document.getElementById('header-section');

  if (window.scrollY > 0) {
    header.style.backgroundColor = '#d3e8fc';
  } else {
    header.style.backgroundColor = '#f8f9fa';
  }
});




// Sélctionner tous éléments FAQ
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.fat-question');

  question.addEventListener('click', () => {
    // Fermer les autres FAQ ouvertes
    faqItems.forEach(i => {
      if (i !== item) i.classList.remove('active');
    });

    //Activer ou désactiver la FAQ actuelle
    item.classList.toggle('active');
  });
});








// faire scroller les vpn
const containerCont = document.querySelectorAll('.container-cont');

const scrollAmount = 300;

containerCont.forEach(wrapper => {

  const container = wrapper.querySelector('.container');
  const scrollLeftBtn = wrapper.querySelector('.button-left');
  const scrollRightBtn = wrapper.querySelector('.button-right');

  scrollLeftBtn.addEventListener('click', () => {
    container.scrollLeft -= scrollAmount;
  });

  scrollRightBtn.addEventListener('click', () => {
    container.scrollLeft += scrollAmount;
  });
});



// Initialisation des variables pour le premier formulaire
const textArea = document.getElementById('vpnId-textarea');
const updateButton = document.getElementById('updateButton');
const confirmIcon = document.querySelector('.confirme-action');
let dataId;
let isVpnIdConfirmed = false; // Variable pour suivre la confirmation

let ticketCount = parseInt(localStorage.getItem('ticketCount')) || 1;
let lastResetDate = localStorage.getItem('lastResetDate') || getFormattedDate(new Date());

if (lastResetDate !== getFormattedDate(new Date())) {
  ticketCount = 1;
  localStorage.setItem('ticketCount', ticketCount);
  localStorage.setItem('lastResetDate', getFormattedDate(new Date()));
}

function getFormattedDate(date) {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

textArea.addEventListener('input', () => {
  if (textArea.value.trim() === '') {
    resetTextAreaStyles(textArea, updateButton, confirmIcon);
  } else {
    adjustTextAreaHeight(textArea);
  }
});

updateButton.addEventListener('click', () => {
  const textAreaValue = textArea.value.trim();
  if (textAreaValue === '') {
    alert("Veuillez entrer votre ID VPN avant de confirmer.");
    return;
  }
  dataId = textAreaValue;
  updateButton.setAttribute('data-vpnId', textAreaValue);
  confirmIcon.style.display = 'inline-block';
  updateButton.style.backgroundColor = '#02e002';
  isVpnIdConfirmed = true; // Marque l'ID comme confirmé
});

// Gestion du modal et des boutons d'achat
const modal = document.getElementById('payment-modal');
const closeModal = document.getElementById('close-modal');
const whatsappBtn = document.getElementById('whatsapp-btn');
const telegramBtn = document.getElementById('telegram-btn');

let selectedFile, selectedOption, selectedPrice;

document.querySelectorAll('.buy-btn').forEach(button => {
  button.addEventListener('click', () => {
    selectedFile = button.getAttribute('data-file');
    selectedOption = button.getAttribute('data-option');
    selectedPrice = button.getAttribute('data-price');
    modal.classList.add('active');
  });
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
});

whatsappBtn.addEventListener('click', () => {
  if (!isVpnIdConfirmed) {
    alert("Veuillez enregistrer votre ID VPN avant de continuer.");
    return;
  }
  if (validateVpnId(textArea)) sendMessage('WhatsAppWeb', selectedFile, selectedOption, selectedPrice, dataId, ticketCount++);
});

telegramBtn.addEventListener('click', () => {
  if (!isVpnIdConfirmed) {
    alert("Veuillez enregistrer votre ID VPN avant de continuer.");
    return;
  }
  if (validateVpnId(textArea)) sendMessage('TelegramWeb', selectedFile, selectedOption, selectedPrice, dataId, ticketCount++);
});

// Gestion du formulaire pour les fichiers gratuits
const textArea2 = document.getElementById('vpnId-textarea2');
const updateButton2 = document.getElementById('updateButton2');
const confirmIcon2 = document.querySelector('.confirme-action2');
const modal2 = document.getElementById('free-modal');
const closeModal2 = document.getElementById('close-free-modal');
const whatsappBtn2 = document.getElementById('whatsapp-btn2');
const telegramBtn2 = document.getElementById('telegram-btn2');
const freeBtn = document.getElementById('freeBtn');
let dataId2;
let isVpnId2Confirmed = false; // Pour le deuxième formulaire

let ticketCount2 = parseInt(localStorage.getItem('ticketCount2')) || 1;
let lastResetDate2 = localStorage.getItem('lastResetDate2') || getFormattedDate(new Date());

if (lastResetDate2 !== getFormattedDate(new Date())) {
  ticketCount2 = 1;
  localStorage.setItem('ticketCount2', ticketCount2);
  localStorage.setItem('lastResetDate2', getFormattedDate(new Date()));
}

textArea2.addEventListener('input', () => {
  if (textArea2.value.trim() === '') {
    resetTextAreaStyles(textArea2, updateButton2, confirmIcon2);
  } else {
    adjustTextAreaHeight(textArea2);
  }
});

updateButton2.addEventListener('click', () => {
  const textAreaValue2 = textArea2.value.trim();
  if (textAreaValue2 === '') {
    alert("Veuillez entrer votre ID VPN avant de confirmer.");
    return;
  }
  dataId2 = textAreaValue2;
  updateButton2.setAttribute('data-vpnId2', textAreaValue2);
  confirmIcon2.style.display = 'inline-block';
  updateButton2.style.backgroundColor = '#02e002';
  isVpnId2Confirmed = true; // Marque l'ID comme confirmé
});

freeBtn.addEventListener('click', () => {
  modal2.classList.add('active');
});

closeModal2.addEventListener('click', () => {
  modal2.classList.remove('active');
});

whatsappBtn2.addEventListener('click', () => {
  if (!isVpnId2Confirmed) {
    alert("Veuillez enregistrer votre ID VPN avant de continuer.");
    return;
  }
  if (validateVpnId(textArea2)) sendMessage('WhatsAppWeb', freeBtn.getAttribute('data-file2'), freeBtn.getAttribute('data-option2'), freeBtn.getAttribute('data-price2'), dataId2, ticketCount2++);
});

telegramBtn2.addEventListener('click', () => {
  if (!isVpnId2Confirmed) {
    alert("Veuillez enregistrer votre ID VPN avant de continuer.");
    return;
  }
  if (validateVpnId(textArea2)) sendMessage('TelegramWeb', freeBtn.getAttribute('data-file2'), freeBtn.getAttribute('data-option2'), freeBtn.getAttribute('data-price2'), dataId2, ticketCount2++);
});

// Fonctions utilitaires
function validateVpnId(input) {
  const vpnId = input.value.trim();
  if (vpnId === '') {
    alert("Veuillez entrer votre ID VPN dans le champ prévu.");
    return false;
  }
  return true;
}

function sendMessage(platform, file, option, price, vpnId, ticket) {
  localStorage.setItem('ticketCount', ticket);
  const now = new Date();
  const formattedDate = getFormattedDate(now);
  const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  let salutation;
  const hour = now.getHours();
  if (hour >= 5 && hour < 12) {
    salutation = '𝘽𝙊𝙉𝙅𝙊𝙐𝙍';
  } else if (hour >= 12 && hour < 18) {
    salutation = '𝘽𝙊𝙉𝙉𝙀 𝘼𝙋𝙍𝙀̀𝙎-𝙈𝙄𝘿𝙄';
  } else {
    salutation = '𝘽𝙊𝙉𝙎𝙊𝙄𝙍';
  }

  const userMessage = encodeURIComponent(`
TICKET: ${ticket} du ${formattedDate} ${formattedTime}

   ${salutation}, 𝙅𝙀 𝙑𝙀𝙐𝙓 𝙐𝙉 𝙁𝙄𝘾𝙃𝙄𝙀𝙍:


    - Nom du fichier: ${file}

    - Pass: ${option}

    - Prix: ${price}

    - VPN ID: ${vpnId}
`);

  const redirectURL = platform === 'WhatsAppWeb' ? `https://wa.me/?text=${userMessage}` : `https://t.me/Payment_FreeSurf?text=${userMessage}`;
  const isMobile = /iphone|android/i.test(navigator.userAgent);

  if (!isMobile) alert(`Vous serez redirigé vers ${platform}. Assurez-vous d'être connecté.`);
  window.open(redirectURL, '_blank');
  modal.classList.remove('active');
  modal2.classList.remove('active');
  textArea2.value = '';
  textArea.value = '';
  confirmIcon.style.display = 'none';
  confirmIcon2.style.display = 'none';
  updateButton.style.backgroundColor = '#ffc107';
  updateButton2.style.backgroundColor = '#ffc107';
}

function resetTextAreaStyles(textArea, button, icon) {
  textArea.style.height = '20px';
  textArea.style.padding = '0.5rem';
  button.style.backgroundColor = '#ffc107';
  icon.style.display = 'none';
}

function adjustTextAreaHeight(textArea) {
  textArea.style.height = 'auto';
  textArea.style.height = `${textArea.scrollHeight}px`;
  textArea.style.padding = '5px';
}



// Barre de recherche
const searchBar = document.getElementById('searchbar');
const files = document.querySelectorAll('.file');
const navContainer = document.getElementById('nav-container');
const openNavbar = document.getElementById('navbar-icon');
const closeNavbar = document.getElementById('close-navbar');
const searchBarIcon = document.getElementById('searchBarIcon');

// Vérifie si toutes les lettres de `target` sont présentes dans `input`, indépendamment de l'ordre
function fuzzyMatch(input, target) {
  const inputLetters = input.split('');
  return inputLetters.every(letter => target.includes(letter));
}

// Fonction de recherche
searchBar.addEventListener('input', function () {
  const searchTerm = searchBar.value.trim().toLowerCase();

  if (searchTerm.length >= 2) {
    let foundMatch = false;

    files.forEach(file => {
      const fileName = file.getAttribute('data-name').toLowerCase();

      if (fuzzyMatch(searchTerm, fileName)) {
        file.classList.remove('hidden');
        foundMatch = true;
      } else {
        file.classList.add('hidden');
      }
    });

    if (!foundMatch) {
      files.forEach(file => file.classList.remove('hidden'));
    }
  } else {
    files.forEach(file => file.classList.remove('hidden'));
  }
});



function searchAndScroll() {
  const searchTerm = searchBar.value.trim().toLowerCase();
  if (!searchTerm) return;

  let matchedFile = null;

  for (const file of files) {
    const fileName = file.getAttribute('data-name').toLowerCase();
    if (fuzzyMatch(searchTerm, fileName)) {
      matchedFile = file;
      break;
    }
  }

  if (matchedFile) {
    // Pour les écrans ≤ 767.5px
    if (window.innerWidth <= 767.5) {
      navContainer.style.display = 'none'; // Cacher le navContainer
      openNavbar.style.display = 'block'; // Afficher openNavbar
    }

    // Scroller jusqu'au fichier correspondant
    matchedFile.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Ajout des événements "click" et "Enter"
searchBarIcon.addEventListener('click', searchAndScroll);
searchBar.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    searchAndScroll();
  }
});



// Gestion de la navbar
openNavbar.addEventListener('click', () => {
  navContainer.style.display = 'flex';
});

closeNavbar.addEventListener('click', () => {
  navContainer.style.display = 'none';
});




// redirection de boutton de navbar
const homeBtn = document.getElementById('acceuil-btn');

homeBtn.addEventListener('click', () => {
  window.location.href = 'Sff-acceuil.html';
});