document.addEventListener('DOMContentLoaded', function() {
    // ========== NAVİGASYON VE PROFİL DROPDOWN SİSTEMİ ==========
    
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

        const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                console.log('Dropdown item clicked:', this.textContent.trim());
                navDropdown.classList.remove('active');
            });
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

    // Profil dropdown
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

    // ========== KATEGORİ TAB SİSTEMİ (PAGİNATİON KALDIRILDI) ==========
    
    const categoryTabs = document.querySelectorAll('.category-tab');
    const linksSections = document.querySelectorAll('.links-section');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Tüm tab'ları inaktif yap
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Tıklanan tab'ı aktif yap
            this.classList.add('active');
            
            // Tüm section'ları gizle
            linksSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Hedef section'ı göster
            const targetSection = document.getElementById(targetCategory);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Section değişiminde kartları animasyonla göster
                animateCardsIn(targetSection);
            }
        });
    });

    // ========== ARAMA SİSTEMİ ==========
    
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            performSearch(searchTerm);
        });
    }

    function performSearch(searchTerm) {
        const allCards = document.querySelectorAll('.link-card');
        
        if (searchTerm === '') {
            // Arama boşsa tüm kartları göster
            allCards.forEach(card => {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
            return;
        }

        // Arama terimi varsa kartları filtrele
        allCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                // Animasyonla göster
                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // ========== KART ANİMASYONLARI ==========
    
    function animateCardsIn(section) {
        const cards = section.querySelectorAll('.link-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Sayfa yüklendiğinde ilk section'ın kartlarını animasyonla göster
    const initialSection = document.querySelector('.links-section.active');
    if (initialSection) {
        setTimeout(() => {
            animateCardsIn(initialSection);
        }, 300);
    }

    // ========== KART HOVER EFEKTLERİ ==========
    
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // ========== BUTON CLİCK ANİMASYONLARI ==========
    
    const reviewButtons = document.querySelectorAll('.review-btn');
    
    reviewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Tıklama animasyonu
            this.style.transform = 'translateY(2px) scale(0.98)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 150);
            
            // Kartın başlığını al (analytics için)
            const cardTitle = this.closest('.link-card').querySelector('h3').textContent;
            console.log(`${cardTitle} kartına tıklandı`);
            
            // Loading animasyonu göster
            showButtonLoading(this);
            
            // 500ms sonra loading'i kaldır
            setTimeout(() => {
                hideButtonLoading(this);
            }, 500);
        });
    });

    function showButtonLoading(button) {
        const originalText = button.textContent;
        button.setAttribute('data-original-text', originalText);
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yükleniyor...';
        button.style.pointerEvents = 'none';
    }

    function hideButtonLoading(button) {
        const originalText = button.getAttribute('data-original-text');
        if (originalText) {
            button.textContent = originalText;
        }
        button.style.pointerEvents = 'auto';
        button.removeAttribute('data-original-text');
    }

    // ========== KLAVYE NAVİGASYONU ==========
    
    document.addEventListener('keydown', function(e) {
        const activeSection = document.querySelector('.links-section.active');
        if (!activeSection) return;
        
        const visibleCards = activeSection.querySelectorAll('.link-card:not([style*="display: none"])');
        let focusedIndex = Array.from(visibleCards).findIndex(card => 
            card.querySelector('.review-btn:focus')
        );

        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                focusedIndex = Math.min(focusedIndex + 1, visibleCards.length - 1);
                if (visibleCards[focusedIndex]) {
                    visibleCards[focusedIndex].querySelector('.review-btn').focus();
                }
                break;
                
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                focusedIndex = Math.max(focusedIndex - 1, 0);
                if (visibleCards[focusedIndex]) {
                    visibleCards[focusedIndex].querySelector('.review-btn').focus();
                }
                break;
                
            case 'Home':
                e.preventDefault();
                if (visibleCards[0]) {
                    visibleCards[0].querySelector('.review-btn').focus();
                }
                break;
                
            case 'End':
                e.preventDefault();
                if (visibleCards[visibleCards.length - 1]) {
                    visibleCards[visibleCards.length - 1].querySelector('.review-btn').focus();
                }
                break;
        }
    });

    // ========== SCROLL ANİMASYONLARI ==========
    
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        const elements = document.querySelectorAll('.link-card, .category-tab, .search-container');
        elements.forEach(el => observer.observe(el));
    }

    // ========== PERFORMANS OPTİMİZASYONU ==========
    
    // Debounced resize handler
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            handleResponsiveLayout();
        }, 250);
    });

    function handleResponsiveLayout() {
        const screenWidth = window.innerWidth;
        const cardGrids = document.querySelectorAll('.card-grid');
        
        cardGrids.forEach(grid => {
            const isKurumIci = grid.classList.contains('kurum-ici-grid');
            
            if (screenWidth < 576) {
                grid.style.gridTemplateColumns = '1fr';
            } else if (screenWidth < 768) {
                grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            } else if (screenWidth < 1024) {
                grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            } else {
                grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
            }
            
            // Kurum içi grid için özel 4-4-2 düzeni (sadece desktop'ta)
            if (isKurumIci && screenWidth >= 1024) {
                const cards = grid.querySelectorAll('.link-card');
                cards.forEach((card, index) => {
                    if (index === 8 || index === 9) { // 9. ve 10. kartlar
                        card.style.gridColumn = '2 / 4';
                    } else {
                        card.style.gridColumn = 'auto';
                    }
                });
            }
        });
    }

    // ========== HATA YÖNETİMİ ==========
    
    window.addEventListener('error', function(e) {
        console.error('JavaScript Hatası:', {
            message: e.message,
            filename: e.filename,
            line: e.lineno,
            column: e.colno
        });
    });

    // ========== BAŞLANGIÇ KURULUMU ==========
    
    // Sayfa yüklendiğinde gerekli ayarları yap
    function initializePage() {
        // İlk kategori tab'ını aktif yap
        const firstTab = document.querySelector('.category-tab');
        if (firstTab && !document.querySelector('.category-tab.active')) {
            firstTab.click();
        }
        
        // Scroll animasyonlarını başlat
        setupScrollAnimations();
        
        // Responsive layout'u ayarla
        handleResponsiveLayout();
        
        console.log('Yardımcı Linkler sayfası başarıyla yüklendi');
    }

    // ========== MEMORY STORAGE (LOCALSTORAGE YERİNE) ==========
    
    // Memory'de son ziyaret edilen linkler
    let visitedLinks = [];
    let searchHistory = [];
    
    function saveVisitedLink(title, url) {
        const linkData = {
            title: title,
            url: url,
            timestamp: Date.now(),
            category: getCurrentCategory()
        };
        
        // Aynı link varsa kaldır
        visitedLinks = visitedLinks.filter(link => link.url !== url);
        
        // Başa ekle
        visitedLinks.unshift(linkData);
        
        // En fazla 10 link sakla
        visitedLinks = visitedLinks.slice(0, 10);
        
        console.log('Son ziyaret edilen link kaydedildi:', linkData);
    }
    
    function getCurrentCategory() {
        const activeTab = document.querySelector('.category-tab.active');
        return activeTab ? activeTab.getAttribute('data-category') : 'unknown';
    }
    
    function saveSearchTerm(term) {
        if (term && !searchHistory.includes(term)) {
            searchHistory.unshift(term);
            searchHistory = searchHistory.slice(0, 5); // Son 5 arama
        }
    }

    // Link kartlarına tıklama olaylarını ekle
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('review-btn')) {
            const card = e.target.closest('.link-card');
            const title = card.querySelector('h3').textContent;
            const url = e.target.getAttribute('onclick')?.match(/window\.open\('([^']+)'/)?.[1];
            
            if (title && url) {
                saveVisitedLink(title, url);
            }
        }
    });

    // Arama geçmişini kaydet
    if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const term = this.value.trim();
                if (term) {
                    saveSearchTerm(term);
                }
            }
        });
    }

    // ========== ACCESSIBILITY İYİLEŞTİRMELERİ ==========
    
    // Tab tuşu ile navigasyon için focus görünürlüğünü artır
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });

    // ARIA labelları dinamik olarak güncelle
    function updateARIALabels() {
        const activeTab = document.querySelector('.category-tab.active');
        if (activeTab) {
            activeTab.setAttribute('aria-selected', 'true');
        }
        
        categoryTabs.forEach(tab => {
            if (tab !== activeTab) {
                tab.setAttribute('aria-selected', 'false');
            }
        });
    }

    // Tab değişimlerinde ARIA güncelle
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', updateARIALabels);
    });

    // ========== SMOOTH SCROLL EFEKTİ ==========
    
    function smoothScrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Kategori değişimlerinde yukarı kaydır
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            setTimeout(() => {
                const headerSection = document.querySelector('.header-section');
                if (headerSection) {
                    headerSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 300);
        });
    });

    // ========== KATEGORI SPESİFİK ANİMASYONLAR ==========
    
    // Her kategori için farklı giriş animasyonları
    function applyCategorySpecificAnimations(categoryId) {
        const section = document.getElementById(categoryId);
        if (!section) return;

        const cards = section.querySelectorAll('.link-card');
        
        switch(categoryId) {
            case 'kurum-ici':
                // Soldan sağa kayma animasyonu
                cards.forEach((card, index) => {
                    card.style.transform = 'translateX(-50px)';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.transform = 'translateX(0)';
                        card.style.opacity = '1';
                    }, index * 100);
                });
                break;
                
            case 'web-site':
                // Yukarıdan aşağı kayma animasyonu
                cards.forEach((card, index) => {
                    card.style.transform = 'translateY(-50px)';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.transform = 'translateY(0)';
                        card.style.opacity = '1';
                    }, index * 150);
                });
                break;
                
            case 'bilgi-portal':
                // Scale animasyonu
                cards.forEach((card, index) => {
                    card.style.transform = 'scale(0.8)';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.transform = 'scale(1)';
                        card.style.opacity = '1';
                    }, index * 120);
                });
                break;
                
            case 'faydali':
                // Sağdan sola kayma animasyonu
                cards.forEach((card, index) => {
                    card.style.transform = 'translateX(50px)';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.transform = 'translateX(0)';
                        card.style.opacity = '1';
                    }, index * 100);
                });
                break;
        }
    }

    // Kategori değişimlerinde spesifik animasyonları uygula
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            setTimeout(() => {
                applyCategorySpecificAnimations(categoryId);
            }, 100);
        });
    });

    // ========== PERFORMANCE MONİTORİNG ==========
    
    // Performans metrikleri
    let performanceMetrics = {
        pageLoadTime: 0,
        cardRenderTime: 0,
        searchResponseTime: 0
    };

    // Sayfa yükleme süresini ölç
    window.addEventListener('load', function() {
        performanceMetrics.pageLoadTime = performance.now();
        console.log('Sayfa yükleme süresi:', performanceMetrics.pageLoadTime.toFixed(2), 'ms');
    });

    // Arama performansını ölç
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const startTime = performance.now();
            const searchTerm = this.value.toLowerCase().trim();
            performSearch(searchTerm);
            performanceMetrics.searchResponseTime = performance.now() - startTime;
            
            if (searchTerm.length > 2) {
                console.log('Arama süresi:', performanceMetrics.searchResponseTime.toFixed(2), 'ms');
            }
        });
    }

    // ========== SAYFA İNİTİALİZASYONU ==========
    
    // Tüm kurulumları başlat
    initializePage();
    
    // Sayfa tamamen yüklendiğinde son kontrolleri yap
    window.addEventListener('load', function() {
        // Tüm resimler yüklendi, son animasyonları başlat
        setTimeout(() => {
            const loadingCards = document.querySelectorAll('.link-card');
            loadingCards.forEach((card, index) => {
                card.style.transition = 'all 0.3s ease';
                card.style.transform = 'translateY(0)';
            });
        }, 100);
    });

    // ========== DEBUG VE GELİŞTİRİCİ ARAÇLARI ==========
    
    // Development mode kontrolü
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1';
    
    if (isDevelopment) {
        console.log('Development mode aktif');
        
        // Debug bilgilerini konsola yaz
        window.debugInfo = {
            visitedLinks: () => visitedLinks,
            searchHistory: () => searchHistory,
            currentCategory: getCurrentCategory
        };
        
        console.log('Debug araçları window.debugInfo içinde mevcut');
    }

});

// ========== GLOBAL YARDIMCI FONKSİYONLAR ==========

// Kategori değiştirme fonksiyonu (dış erişim için)
window.switchCategory = function(categoryName) {
    const targetTab = document.querySelector(`[data-category="${categoryName}"]`);
    if (targetTab) {
        targetTab.click();
    }
};

// Arama yapma fonksiyonu (dış erişim için)
window.performGlobalSearch = function(term) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = term;
        searchInput.dispatchEvent(new Event('input'));
    }
};

// Sayfa durumunu alma fonksiyonu
window.getPageState = function() {
    return {
        currentCategory: document.querySelector('.category-tab.active')?.getAttribute('data-category'),
        searchTerm: document.getElementById('searchInput')?.value
    };
};