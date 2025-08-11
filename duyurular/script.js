// script.js — TEMİZ, GÜNCEL SÜRÜM

document.addEventListener('DOMContentLoaded', () => {
  /* ========= NAVBAR DROPDOWN ========= */
  const navDropdown   = document.querySelector('.nav-dropdown');
  const dropdownToggle= document.querySelector('.nav-dropdown-toggle');
  const dropdownMenu  = document.querySelector('.nav-dropdown-menu');

  if (navDropdown && dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // profil menüyü kapat
      const profileMenu = document.getElementById('profileMenu');
      const profileBtn  = document.getElementById('profileBtn');
      profileMenu?.classList.remove('show');
      profileBtn?.classList.remove('active');

      navDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!navDropdown.contains(e.target)) navDropdown.classList.remove('active');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') navDropdown.classList.remove('active');
    });
  }

  /* ========= PROFIL DROPDOWN ========= */
  const profileBtn  = document.getElementById('profileBtn');
  const profileMenu = document.getElementById('profileMenu');
  if (profileBtn && profileMenu) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // nav menüyü kapat
      navDropdown?.classList.remove('active');

      profileMenu.classList.toggle('show');
      profileBtn.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
        profileMenu.classList.remove('show');
        profileBtn.classList.remove('active');
      }
    });

    const logoutBtn = profileMenu.querySelector('.logout');
    logoutBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
        console.log('Çıkış yapılıyor...');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        profileMenu.classList.remove('show');
        profileBtn.classList.remove('active');
      }
    });
  }

  /* ========= DUYURU KARTLARI: ANİMASYON + FİLTRE/ARAMA ========= */
  const searchInput = document.getElementById('searchInput'); // "Duyuru ara..."
  const sortSelect  = document.getElementById('sortSelect');  // all / insan / bilgi
  const cards       = Array.from(document.querySelectorAll('.document-card'));

  // açılış animasyonu
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'all 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 120);
  });

  function applyFilters() {
    const q    = (searchInput?.value || '').trim().toLowerCase();
    const type = (sortSelect?.value || 'all').toLowerCase(); // all | insan | bilgi

    cards.forEach(card => {
      const cardType = (card.dataset.type || '').toLowerCase(); // "insan" / "bilgi"
      const title = card.querySelector('.document-title')?.textContent.toLowerCase() || '';
      const desc  = card.querySelector('.document-description')?.textContent.toLowerCase() || '';

      const matchesType   = (type === 'all') || (cardType === type);
      const matchesSearch = !q || title.includes(q) || desc.includes(q);

      card.style.display = (matchesType && matchesSearch) ? '' : 'none';
    });
  }

  // ilk yüklemede hepsi görünsün
  applyFilters();

  // olay bağla
  sortSelect?.addEventListener('change', applyFilters);
  searchInput?.addEventListener('input', applyFilters);
});

/* ========= (İSTEĞE BAĞLI) DOSYA ÖNİZLEME / İNDİRME =========
   Preview/Download butonları kullanacaksan, aşağıdaki yardımcıları
   butonların onclick'ine bağlayabilirsin.
*/
function previewDocument(fullUrl) {
  const ext = (fullUrl.split('.').pop() || '').toLowerCase();
  let viewerUrl = '';
  if (ext === 'pdf') {
    viewerUrl = fullUrl;
  } else if (['doc', 'docx', 'xls', 'xlsx'].includes(ext)) {
    viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fullUrl)}&embedded=true`;
  } else {
    alert('Bu dosya türü önizlenemiyor.');
    return;
  }
  window.open(viewerUrl, '_blank');
}

function downloadDocument(fileName, buttonElement) {
  alert(`${fileName} dosyası indiriliyor...`);
  const original = buttonElement.innerHTML;
  buttonElement.innerHTML = `
    <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor">
      <path d="M12,4V2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path>
    </svg> İndiriliyor...`;
  setTimeout(() => {
    buttonElement.innerHTML = `
      <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor">
        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>
      </svg> Tamamlandı`;
    setTimeout(() => (buttonElement.innerHTML = original), 2000);
  }, 1500);
}
