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