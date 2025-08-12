document.addEventListener('DOMContentLoaded', function() {
    // --- NAVBAR DROPDOWN SİSTEMİ ---
    const navDropdown = document.querySelector('.nav-dropdown');
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    const dropdownMenu = document.querySelector('.nav-dropdown-menu');

    if (navDropdown && dropdownToggle && dropdownMenu) {
        // Dropdown toggle butonuna tıklama
        dropdownToggle.addEventListener('click', function(e) {
           
            e.stopPropagation();
            
            
            // Profil menüsünü kapat
            const profileMenu = document.getElementById('profileMenu');
            const profileBtn = document.getElementById('profileBtn');
            if (profileMenu && profileBtn) {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
            
            // Dropdown menüyü aç/kapat
            navDropdown.classList.toggle('active');
        });

        // Dropdown menü item'larına tıklama
        const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                
                console.log('Dropdown item clicked:', this.textContent.trim());
                // Burada sayfa yönlendirmesi veya işlem yapılabilir
                
                // Menüyü kapat
                navDropdown.classList.remove('active');
            });
        });

        // Sayfa herhangi bir yerine tıklandığında dropdown'ları kapat
        document.addEventListener('click', function(e) {
            if (!navDropdown.contains(e.target)) {
                navDropdown.classList.remove('active');
            }
        });

        // ESC tuşu ile dropdown'ı kapat
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                navDropdown.classList.remove('active');
            }
        });

        // Dropdown menü hover efektleri
        dropdownMenu.addEventListener('mouseenter', function() {
            // Mouse menü üzerindeyken menüyü açık tut
        });

        dropdownMenu.addEventListener('mouseleave', function() {
            // Mouse menü dışına çıktığında kapat (isteğe bağlı)
            // setTimeout(() => {
            //     navDropdown.classList.remove('active');
            // }, 300);
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
                    // Burada çıkış işlemi yapılacak
                    console.log('Çıkış yapılıyor...');
                    // window.location.href = '/logout'; // Gerçek uygulamada bu şekilde yönlendirme yapılır
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
});