// 📂 GELİŞTİRİLMİŞ FİLTRELEME FONKSİYONU
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    const linkCards = document.querySelectorAll(".link-card");

    // 🎯 KATEGORİ TANIMLARI
    const categoryDefinitions = {
        "kurum-ici": "Kurum İçi Linkler",
        "website": "Website Linkler", 
        "bilgi": "Bilgi Portalları",
        "faydalı": "Faydalı Linkler"
    };

    // 🔢 KATEGORİ SAYILARıNı GÜNCELLE
    function updateCategoryCount() {
        const visibleCards = document.querySelectorAll('.link-card[style*="flex"], .link-card:not([style*="none"])');
        const totalCount = visibleCards.length;
        
        // Seçili kategoriyi kontrol et
        const selectedCategory = sortSelect.value;
        let categoryText = "Tüm Yardımcı Linkler";
        
        if (selectedCategory !== "all") {
            const categoryCount = document.querySelectorAll(`.link-card[data-category="${selectedCategory}"][style*="flex"], .link-card[data-category="${selectedCategory}"]:not([style*="none"])`).length;
            categoryText = `${categoryDefinitions[selectedCategory]} (${categoryCount})`;
        } else {
            categoryText = `Tüm Yardımcı Linkler (${totalCount})`;
        }
        
        // Dropdown seçeneğini güncelle
        sortSelect.querySelector(`option[value="${selectedCategory}"]`).textContent = categoryText;
    }
    // 🔍 ARAMA FONKSİYONU
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        linkCards.forEach(card => {
            const title = card.querySelector(".link-title").textContent.toLowerCase();
            
            if (title.includes(searchTerm)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });

    // 📂 FİLTRELEME FONKSİYONU
    sortSelect.addEventListener("change", function () {
        const selectedCategory = this.value;
        const searchTerm = searchInput.value.toLowerCase().trim();

        linkCards.forEach(card => {
            const cardCategory = card.getAttribute("data-category");
            const title = card.querySelector(".link-title").textContent.toLowerCase();

            const matchesFilter = (selectedCategory === "all" || cardCategory === selectedCategory);
            const matchesSearch = (searchTerm === "" || title.includes(searchTerm));

            if (matchesFilter && matchesSearch) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });

    // 🎯 NAVBAR DROPDOWN FONKSİYONU
    const navDropdown = document.querySelector('.nav-dropdown');
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    const dropdownMenu = document.querySelector('.nav-dropdown-menu');

    if (navDropdown && dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const profileMenu = document.getElementById('profileMenu');
            const profileBtn = document.getElementById('profileBtn');
            if (profileMenu && profileBtn) {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
            
            navDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!navDropdown.contains(e.target)) {
                navDropdown.classList.remove('active');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                navDropdown.classList.remove('active');
            }
        });
    }

    // 👤 PROFİL DROPDOWN FONKSİYONU
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');

    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (navDropdown) {
                navDropdown.classList.remove('active');
            }
            
            profileMenu.classList.toggle('show');
            profileBtn.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
        });

        const logoutBtn = profileMenu.querySelector('.logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
                    console.log('Çıkış yapılıyor...');
                    // Burada çıkış işlemi yapılacak
                }
            });
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
        });
    }

    // 📱 MOBİL MENÜ FONKSİYONU
    const menuToggleBtn = document.querySelector('.mobile-menu-toggle');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const menuBackdrop = document.getElementById('menuBackdrop');

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

    // 🎨 KART ANİMASYON EFEKTLERİ
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 🔧 SAYFA YÜKLENDİKTEN SONRA BAŞLANGIÇ AYARLARI
    // Tüm kartları görünür yap
    linkCards.forEach(card => {
        card.style.display = "flex";
    });

    console.log("Yardımcı Linkler sayfası yüklendi!");
});

// 🌐 HARİCİ LİNK AÇMA FONKSİYONU
function openExternalLink(url) {
    if (url && url !== '#') {
        window.open(url, '_blank', 'noopener,noreferrer');
    } else {
        console.log('Link henüz tanımlanmamış');
    }
}

// 📊 PERFORMANS OPTİMİZASYONU İÇİN DEBOUNCE FONKSİYONU
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 🔍 ARAMA İNPUTUNA DEBOUNCE UYGULA
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    
    if (searchInput) {
        const debouncedSearch = debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            const linkCards = document.querySelectorAll(".link-card");
            
            linkCards.forEach(card => {
                const title = card.querySelector(".link-title").textContent.toLowerCase();
                
                if (title.includes(searchTerm)) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        }, 300);
        
        searchInput.addEventListener("input", debouncedSearch);
    }
});