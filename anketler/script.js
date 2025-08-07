// Ankete Katıl butonu tıklanırsa yönlendir
document.querySelector('.btn-primary').addEventListener('click', function (e) {
    e.preventDefault();
    alert("Anket sayfasına yönlendiriliyorsunuz...");
    // window.location.href = 'anket-sayfasi.html';
});

document.addEventListener('DOMContentLoaded', function() {
    // --- MOBILE MENU TOGGLE ---
    const mobileToggleBtn = document.getElementById('mobileToggleBtn');
    const navLinks = document.getElementById('navLinks');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    if (mobileToggleBtn && navLinks && mobileOverlay) {
        mobileToggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('show');
            mobileOverlay.classList.toggle('show');
            
            // Icon değiştir
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('show')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Overlay'e tıklandığında menüyü kapat
        mobileOverlay.addEventListener('click', function() {
            navLinks.classList.remove('show');
            mobileOverlay.classList.remove('show');
            const icon = mobileToggleBtn.querySelector('i');
            icon.className = 'fas fa-bars';
        });
        
        // Window resize kontrolü
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 992) {
                navLinks.classList.remove('show');
                mobileOverlay.classList.remove('show');
                const icon = mobileToggleBtn.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    }

    // --- NAVBAR DROPDOWN SİSTEMİ ---
    const navDropdown = document.querySelector('.nav-dropdown');
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    const dropdownMenu = document.querySelector('.nav-dropdown-menu');

    if (navDropdown && dropdownToggle && dropdownMenu) {
        // Mobile ve desktop için farklı davranış
        function isMobile() {
            return window.innerWidth < 992;
        }
        
        // Dropdown toggle butonuna tıklama
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Mobile'da her zaman toggle yap
            if (isMobile()) {
                // Profil menüsünü kapat
                const profileMenu = document.getElementById('profileMenu');
                const profileBtn = document.getElementById('profileBtn');
                if (profileMenu && profileBtn) {
                    profileMenu.classList.remove('show');
                    profileBtn.classList.remove('active');
                }
                
                // Dropdown menüyü aç/kapat
                navDropdown.classList.toggle('active');
                return;
            }
            
            // Desktop'ta hover sistemi çalışsın, click'i engelle
            return false;
        });

        // Desktop hover sistemi
        if (!isMobile()) {
            navDropdown.addEventListener('mouseenter', function() {
                if (!isMobile()) {
                    this.classList.add('hover');
                }
            });
            
            navDropdown.addEventListener('mouseleave', function() {
                if (!isMobile()) {
                    this.classList.remove('hover');
                }
            });
        }

        // Dropdown menü item'larına tıklama
        const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                console.log('Dropdown item clicked:', this.textContent.trim());
                
                // Mobile'da menüyü kapat
                if (isMobile()) {
                    navDropdown.classList.remove('active');
                    navLinks.classList.remove('show');
                    mobileOverlay.classList.remove('show');
                    const icon = mobileToggleBtn.querySelector('i');
                    icon.className = 'fas fa-bars';
                }
            });
        });

        // Sayfa herhangi bir yerine tıklandığında dropdown'ları kapat (sadece mobile)
        document.addEventListener('click', function(e) {
            if (isMobile() && !navDropdown.contains(e.target)) {
                navDropdown.classList.remove('active');
            }
        });

        // ESC tuşu ile dropdown'ı kapat
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                navDropdown.classList.remove('active');
                navDropdown.classList.remove('hover');
            }
        });
        
        // Window resize'da hover/click modunu güncelle
        window.addEventListener('resize', function() {
            if (isMobile()) {
                navDropdown.classList.remove('hover');
            } else {
                navDropdown.classList.remove('active');
            }
        });
    }

    // --- PROFİL DROPDOWN SİSTEMİ ---
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');

    if (profileBtn && profileMenu) {
        // Profil butonuna tıklama
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Navbar dropdown'ını kapat
            if (navDropdown) {
                navDropdown.classList.remove('active');
                navDropdown.classList.remove('hover');
            }
            
            profileMenu.classList.toggle('show');
            profileBtn.classList.toggle('active');
        });

        // Sayfa herhangi bir yerine tıklandığında menüyü kapat
        document.addEventListener('click', function(e) {
            if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
        });

        // Çıkış yap butonuna tıklama
        const logoutBtn = profileMenu.querySelector('.logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
                    console.log('Çıkış yapılıyor...');
                    // window.location.href = '/logout';
                }
            });
        }

        // ESC tuşu ile menüyü kapat
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
        });
    }
    
    // --- TOUCH/SWIPE SUPPORT FOR MOBILE ---
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 100;
        const swipeDistance = touchEndX - touchStartX;
        
        // Sağdan sola swipe - menüyü kapat
        if (swipeDistance < -swipeThreshold && navLinks && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            mobileOverlay.classList.remove('show');
            const icon = mobileToggleBtn.querySelector('i');
            icon.className = 'fas fa-bars';
        }
        
        // Soldan sağa swipe - menüyü aç (sadece menü kapalıyken)
        if (swipeDistance > swipeThreshold && touchStartX < 50 && navLinks && !navLinks.classList.contains('show')) {
            navLinks.classList.add('show');
            mobileOverlay.classList.add('show');
            const icon = mobileToggleBtn.querySelector('i');
            icon.className = 'fas fa-times';
        }
    }
    
    // --- SMOOTH SCROLLING FOR MOBILE ---
    // Mobile safari için scroll problemi çözümü
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.body.style.webkitOverflowScrolling = 'touch';
    }
    
    // --- RESPONSIVE IMAGE LOADING ---
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.alt = 'Resim yüklenemedi';
        });
    });
    
    // --- VIEWPORT HEIGHT FIX FOR MOBILE ---
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', function() {
        setTimeout(setViewportHeight, 100);
    });
});