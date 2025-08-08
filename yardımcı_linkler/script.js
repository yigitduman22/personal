document.addEventListener('DOMContentLoaded', function() {
    // --- NAVBAR DROPDOWN SİSTEMİ ---
    const navDropdown = document.querySelector('.nav-dropdown');
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    const dropdownMenu = document.querySelector('.nav-dropdown-menu');

    if (navDropdown && dropdownToggle && dropdownMenu) {
        // Dropdown toggle butonuna tıklama
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
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
                e.preventDefault();
                if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
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

    // --- YARDIMCI LİNKLER SİSTEMİ ---
    
    // Tüm link butonlarını seç
    const linkButtons = document.querySelectorAll('.link-btn');
    
    // Her link butonuna tıklama event'i ekle
    linkButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Data-url attribute'undan URL'yi al
            const url = this.getAttribute('data-url');
            const cardTitle = this.closest('.link-card').querySelector('h4').textContent;
            
            if (url) {
                // Tıklama animasyonu
                this.style.transform = 'translateY(2px)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Console'a log yazdır (debug için)
                console.log(`${cardTitle} linkine tıklandı: ${url}`);
                
                // Onay dialog'u göster
                if (confirm(`${cardTitle} sitesine yönlendirilmek istediğinizden emin misiniz?\n\nURL: ${url}`)) {
                    // Yeni sekmede aç
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            } else {
                console.warn('Bu kart için URL tanımlanmamış:', cardTitle);
                alert('Bu link henüz aktif değil.');
            }
        });
        
        // Hover efektleri için ek JavaScript
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Kartların hover animasyonları
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Kart hover olduğunda ikon animasyonu
            const icon = this.querySelector('.card-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Mouse çıktığında animasyonu sıfırla
            const icon = this.querySelector('.card-icon i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Kategori bazlı filtreleme (gelecekte kullanılabilir)
    function filterCards(category) {
        const cards = document.querySelectorAll('.link-card');
        
        cards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'flex';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    }
    
    // Arama fonksiyonu (gelecekte kullanılabilir)
    function searchCards(searchTerm) {
        const cards = document.querySelectorAll('.link-card');
        const term = searchTerm.toLowerCase();
        
        cards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(term) || description.includes(term)) {
                card.style.display = 'flex';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    }
    
    // Loading animasyonu (sayfa yüklenirken)
    function showLoadingAnimation() {
        linkCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Sayfa yüklendiğinde loading animasyonunu çalıştır
    showLoadingAnimation();
    
    // Scroll animasyonları
    function handleScrollAnimations() {
        const sections = document.querySelectorAll('.links-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s ease';
            observer.observe(section);
        });
    }
    
    // Scroll animasyonlarını başlat
    handleScrollAnimations();
    
    // Performance için scroll throttling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = requestAnimationFrame(function() {
            // Scroll ile ilgili işlemler burada yapılabilir
        });
    });
    
    // Sayfa boyutu değiştiğinde responsive ayarlamalar
    window.addEventListener('resize', function() {
        // Responsive ayarlamalar burada yapılabilir
        console.log('Sayfa boyutu değişti:', window.innerWidth);
    });
    
    // Klavye navigasyonu
    document.addEventListener('keydown', function(e) {
        // Tab tuşu ile navigasyon
        if (e.key === 'Tab') {
            // Tab navigasyonu için ek işlemler yapılabilir
        }
        
        // Enter tuşu ile link açma
        if (e.key === 'Enter' && document.activeElement.classList.contains('link-btn')) {
            document.activeElement.click();
        }
    });
    
    // Hata yakalama
    window.addEventListener('error', function(e) {
        console.error('JavaScript hatası:', e.error);
    });
    
    // Console'a başlangıç mesajı
    console.log('Yardımcı Linkler sayfası başarıyla yüklendi!');
    console.log('Toplam link kartı sayısı:', linkCards.length);
    console.log('Toplam link butonu sayısı:', linkButtons.length);
});