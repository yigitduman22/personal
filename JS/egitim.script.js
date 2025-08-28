document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const documentCards = document.querySelectorAll(".document-card");

    // 🔍 ARAMA
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        documentCards.forEach(card => {
            const title = card.querySelector(".document-title").textContent.toLowerCase();
            const description = card.querySelector(".document-description").textContent.toLowerCase();
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    // 📂 FİLTRELEME
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const filterValue = this.getAttribute("data-filter");
            const searchTerm = searchInput.value.toLowerCase();

            documentCards.forEach(card => {
                const category = card.getAttribute("data-category");
                const title = card.querySelector(".document-title").textContent.toLowerCase();
                const description = card.querySelector(".document-description").textContent.toLowerCase();

                const matchesFilter = (filterValue === "all" || category === filterValue);
                const matchesSearch = (title.includes(searchTerm) || description.includes(searchTerm));

                if (matchesFilter && matchesSearch) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});



// 👁 ÖNİZLEME BUTONU (PDF, Word, Excel)
function previewYouTubeVideo(url) {
    const videoId = url.split("v=")[1];
    const embedUrl = "https://www.youtube.com/embed/" + videoId;

    const previewWindow = window.open("", "Video Önizleme", "width=800,height=600");
    previewWindow.document.write(`
        <html>
            <head>
                <title>Video Önizleme</title>
            </head>
            <body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;background:#000;">
                <iframe width="100%" height="100%" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>
            </body>
        </html>
    `);
}

// Sayfa yüklendiğinde 'Dökümanlar' filtresini uygula
document.addEventListener("DOMContentLoaded", function () {
    const defaultFilter = "training";
    const searchTerm = ""; // Arama kutusu boş

    document.querySelectorAll(".document-card").forEach(card => {
        const category = card.getAttribute("data-category");
        const title = card.querySelector(".document-title").textContent.toLowerCase();
        const description = card.querySelector(".document-description").textContent.toLowerCase();

        const matchesFilter = (category === defaultFilter);
        const matchesSearch = (title.includes(searchTerm) || description.includes(searchTerm));

        if (matchesFilter && matchesSearch) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const target = button.dataset.filter;

            // Yönlendirme için sayfa isimlerini burada belirt
            if (target === "protocol") {
                window.location.href = "/protokoller/protokol.html";
            } else if (target === "document") {
                window.location.href = "/dokumanlar/dokumanlar.html";
            } else if (target === "regulation") {
                window.location.href = "/mevzuatlar/mevzuat.html";
            } else if (target === "training") {
                window.location.href = "/egitimler/egitim.html";
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {

    // --- Gerekli Bütün HTML Elementlerini Seçme ---
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');
    const menuToggleBtn = document.querySelector('.mobile-menu-toggle');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const navDropdown = document.querySelector('.nav-dropdown');
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');

    // --- MOBİL YAN MENÜ SİSTEMİ ---
    if (menuToggleBtn && sideMenu && closeMenuBtn && menuBackdrop) {
        // Menüyü aç
        menuToggleBtn.addEventListener('click', function() {
            sideMenu.classList.add('active');
            menuBackdrop.classList.add('active');
        });

        // Menüyü kapat (X butonu ile)
        closeMenuBtn.addEventListener('click', function() {
            sideMenu.classList.remove('active');
            menuBackdrop.classList.remove('active');
        });

        // Menüyü kapat (arka plana tıklayarak)
        menuBackdrop.addEventListener('click', function() {
            sideMenu.classList.remove('active');
            menuBackdrop.classList.remove('active');
        });
    }

    // --- PROFİL AÇILIR MENÜ SİSTEMİ ---
    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (navDropdown) navDropdown.classList.remove('active'); // Diğer menüyü kapat
            profileMenu.classList.toggle('show');
            profileBtn.classList.toggle('active');
        });
    }

    // --- MASAÜSTÜ NAVBAR AÇILIR MENÜ SİSTEMİ ---
    if (navDropdown && dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault(); // Sayfanın en üstüne gitmesini engelle
            e.stopPropagation();
            if (profileMenu) profileMenu.classList.remove('show'); // Diğer menüyü kapat
            navDropdown.classList.toggle('active');
        });
    }

    // --- Sayfada Boş Bir Yere veya ESC Tuşuna Basınca Menüleri Kapat ---
    document.addEventListener('click', function(e) {
        if (profileMenu && !profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
            profileMenu.classList.remove('show');
            profileBtn.classList.remove('active');
        }
        if (navDropdown && !navDropdown.contains(e.target)) {
            navDropdown.classList.remove('active');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (profileMenu) {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
            if (navDropdown) navDropdown.classList.remove('active');
            if (sideMenu) {
                sideMenu.classList.remove('active');
                menuBackdrop.classList.remove('active');
            }
        }
    });

});
(function(){
  // Ayarlar
  const GRID_SEL = '#documentsGrid';
  const CARD_SEL = '.document-card';
  const SEARCH_SEL = '#searchInput';
  const FILTER_BTNS_SEL = '.filter-btn';
  const DEFAULT_PAGE_SIZE = 6;

  const grid = document.querySelector(GRID_SEL);
  if(!grid) return;

  // Pagination bar oluştur
  const bar = document.createElement('div');
  bar.className = 'pagination-bar';
  bar.innerHTML = `
    <div class="page-size">
      <label for="pageSizeSel">Sayfa başı:</label>
      <select id="pageSizeSel">
        <option>6</option>
        <option>9</option>
        <option selected>12</option>
        <option>15</option>
        <option>18</option>
      </select>
    </div>
    <div class="pagination" id="paginationBtns"></div>
    <div class="page-info" id="pageInfo"></div>
  `;
  grid.after(bar);

  // Elemanlar
  const pageSizeSel = bar.querySelector('#pageSizeSel');
  const pagBtns = bar.querySelector('#paginationBtns');
  const pageInfo = bar.querySelector('#pageInfo');

  // Başlangıç değeri
  pageSizeSel.value = String(DEFAULT_PAGE_SIZE);

  // Durum
  let currentPage = 1;

  // Yardımcılar
  const cards = () => Array.from(document.querySelectorAll(CARD_SEL));
  const visibleCards = () => cards().filter(c => c.style.display !== 'none'); // filtre/arama sonrası görünenler
  const totalPages = () => Math.max(1, Math.ceil(visibleCards().length / getPageSize()));
  const getPageSize = () => parseInt(pageSizeSel.value, 10) || DEFAULT_PAGE_SIZE;

  function applyPage(page){
    const vis = visibleCards();
    const size = getPageSize();
    const lastPage = Math.max(1, Math.ceil(vis.length / size));
    currentPage = Math.min(Math.max(1, page), lastPage);

    // Önce tüm kartlardan pagination gizleme sınıfını kaldır
    cards().forEach(c => c.classList.remove('paginate-hide'));

    // Sonra sadece görünür olanları sayfalara böl
    const start = (currentPage - 1) * size;
    const end = start + size;
    vis.forEach((c, i) => {
      if(i < start || i >= end){
        c.classList.add('paginate-hide');
      }
    });

    renderButtons();
    pageInfo.textContent = `${vis.length === 0 ? 'Kayıt yok' : `${start+1}-${Math.min(end, vis.length)} / ${vis.length}`} (Sayfa ${currentPage}/${lastPage})`;
  }

  function renderButtons(){
    const last = totalPages();
    pagBtns.innerHTML = '';

    const mkBtn = (label, page, disabled=false, active=false) => {
      const b = document.createElement('button');
      b.className = 'page-btn' + (active ? ' active' : '');
      b.textContent = label;
      b.disabled = disabled;
      if(!disabled && !active){
        b.addEventListener('click', () => applyPage(page));
      }
      return b;
    };

    // Prev
    pagBtns.appendChild(mkBtn('«', currentPage-1, currentPage===1));

    // Sayı butonları (akıllı kısaltma)
    const pushPage = p => pagBtns.appendChild(mkBtn(String(p), p, false, p===currentPage));
    const pushEllipsis = () => {
      const s = document.createElement('span');
      s.className = 'page-ellipsis';
      s.textContent = '…';
      pagBtns.appendChild(s);
    };

    if(last <= 7){
      for(let p=1;p<=last;p++) pushPage(p);
    } else {
      // 1, 2 ... mid-1, mid, mid+1 ... last-1, last
      pushPage(1);
      if(currentPage > 3) pushPage(2);
      if(currentPage > 4) pushEllipsis();

      const start = Math.max(3, currentPage-1);
      const end = Math.min(last-2, currentPage+1);
      for(let p=start; p<=end; p++) pushPage(p);

      if(currentPage < last-3) pushEllipsis();
      if(currentPage < last-2) pushPage(last-1);
      pushPage(last);
    }

    // Next
    pagBtns.appendChild(mkBtn('»', currentPage+1, currentPage===last));
  }

  // Filtre/arama değiştiğinde pagination'ı sıfırla
  function refreshAfterFilter(){
    // Filtre/arama başka kodlarda display:block/none ayarlıyor.
    // Biz sadece sayfa bölmesini güncelliyoruz.
    currentPage = 1;
    // Önce tüm kartlardan paginate-hide'ı kaldır (aksi halde görünmeyen kalmasın)
    cards().forEach(c => c.classList.remove('paginate-hide'));
    // Sonra yeni sayfayı uygula
    // Bir tick geciktir (diğer event handler'lar biter bitmez)
    setTimeout(() => applyPage(1), 0);
  }

  // Olay bağla: arama ve filtre butonları (mevcut dinleyicilerle çakışmaz)
  const searchInput = document.querySelector(SEARCH_SEL);
  if(searchInput){
    searchInput.addEventListener('input', refreshAfterFilter);
  }
  document.querySelectorAll(FILTER_BTNS_SEL).forEach(btn => {
    btn.addEventListener('click', refreshAfterFilter);
  });

  // Sayfa boyutu değişimi
  pageSizeSel.addEventListener('change', () => applyPage(1));

  // İlk yüklemede (senin DOMContentLoaded filtreleri çalıştıktan sonra) başlat
  window.addEventListener('load', () => setTimeout(() => applyPage(1), 0));
})();