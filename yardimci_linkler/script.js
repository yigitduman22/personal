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

    // --- YARDIMCI LİNKLER SİSTEMİ - GÜNCELLENMİŞ ---
    
    // Tüm link butonlarını seç (artık <a> tag'leri)
    const linkButtons = document.querySelectorAll('.link-btn');
    const linkCards = document.querySelectorAll('.link-card');
    
    // Link butonları artık doğrudan <a> tag'leri olduğu için onclick event'i gerekmiyor
    // Sadece analytics ve animasyon için event listener ekliyoruz
    linkButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Tıklama animasyonu
            this.style.transform = 'translateY(2px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Analytics için log
            const cardTitle = this.closest('.link-card').querySelector('h4').textContent;
            const url = this.getAttribute('href');
            
            console.log(`${cardTitle} linkine tıklandı: ${url}`);
            
            // Loading animasyonu göster
            showLoadingState(this);
            
            // Kısa bir gecikme sonrası loading'i kaldır (link açılacak)
            setTimeout(() => {
                hideLoadingState(this);
            }, 500);
            
            // Ziyaret edilen linki kaydet (memory storage kullanılıyor)
            saveVisitedLink(url, cardTitle);
        });
        
        // Hover efektleri için ek JavaScript
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('loading')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('loading')) {
                this.style.transform = '';
            }
        });
    });
    
    // Loading state fonksiyonları
    function showLoadingState(button) {
        button.classList.add('loading');
        const originalText = button.innerHTML;
        button.setAttribute('data-original-text', originalText);
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yükleniyor...';
        button.style.pointerEvents = 'none';
    }
    
    function hideLoadingState(button) {
        button.classList.remove('loading');
        const originalText = button.getAttribute('data-original-text');
        if (originalText) {
            button.innerHTML = originalText;
        }
        button.style.pointerEvents = 'auto';
        button.removeAttribute('data-original-text');
    }
    
    // Kartların hover animasyonları - Kurum içi kartlar için özel animasyonlar
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Kart hover olduğunda ikon/resim animasyonu
            const icon = this.querySelector('.card-icon i');
            const image = this.querySelector('.system-logo');
            
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
            if (image) {
                // Kurum içi kartlarda daha büyük scale animasyonu
                const isKurumIci = this.getAttribute('data-category') === 'kurum-ici';
                const scaleValue = isKurumIci ? '1.08' : '1.05';
                image.style.transform = `scale(${scaleValue})`;
            }
            
            // Kartın background animasyonu - Kurum içi kartlarda daha büyük hareket
            const isKurumIci = this.getAttribute('data-category') === 'kurum-ici';
            const translateValue = isKurumIci ? '-12px' : '-10px';
            this.style.transform = `translateY(${translateValue})`;
        });
        
        card.addEventListener('mouseleave', function() {
            // Mouse çıktığında animasyonu sıfırla
            const icon = this.querySelector('.card-icon i');
            const image = this.querySelector('.system-logo');
            
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
            if (image) {
                image.style.transform = 'scale(1)';
            }
            
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Kategori bazlı filtreleme fonksiyonu
    function filterCards(category) {
        const cards = document.querySelectorAll('.link-card');
        
        cards.forEach((card, index) => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'flex';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                // Staggered animation - Kurum içi kartlarda daha yavaş animasyon
                const isKurumIci = card.getAttribute('data-category') === 'kurum-ici';
                const delayMultiplier = isKurumIci ? 120 : 100;
                
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * delayMultiplier);
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
    
    // Arama fonksiyonu
    function searchCards(searchTerm) {
        const cards = document.querySelectorAll('.link-card');
        const term = searchTerm.toLowerCase().trim();
        
        if (term === '') {
            // Boş arama - tüm kartları göster
            filterCards('all');
            return;
        }
        
        cards.forEach((card, index) => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('p');
            const descriptionText = description ? description.textContent.toLowerCase() : '';
            
            if (title.includes(term) || descriptionText.includes(term)) {
                card.style.display = 'flex';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
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
    
    // Sayfa yükleme animasyonu - Kurum içi özel animasyonlarla
    function showPageLoadingAnimation() {
        const sections = document.querySelectorAll('.links-section');
        
        sections.forEach((section, sectionIndex) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                section.style.transition = 'all 0.6s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
                
                // Her section'daki kartları da animasyon ile göster
                const cards = section.querySelectorAll('.link-card');
                cards.forEach((card, cardIndex) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    
                    // Kurum içi kartlarda daha uzun animasyon süresi
                    const isKurumIci = card.getAttribute('data-category') === 'kurum-ici';
                    const animationDelay = isKurumIci ? 150 : 100;
                    
                    setTimeout(() => {
                        card.style.transition = 'all 0.6s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, (cardIndex * animationDelay) + 200);
                });
            }, sectionIndex * 300);
        });
    }
    
    // Intersection Observer ile scroll animasyonları
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Kartları sırayla animasyon ile göster
                    const cards = entry.target.querySelectorAll('.link-card');
                    cards.forEach((card, index) => {
                        const isKurumIci = card.getAttribute('data-category') === 'kurum-ici';
                        const delayMultiplier = isKurumIci ? 120 : 100;
                        
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * delayMultiplier);
                    });
                }
            });
        }, observerOptions);
        
        // Tüm section'ları observe et
        const sections = document.querySelectorAll('.links-section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Grid düzenini kontrol et (responsive için)
    function checkGridLayout() {
        const kurumGrid = document.querySelector('.kurum-ici-grid');
        const websiteGrid = document.querySelector('.website-grid');
        const portalGrid = document.querySelector('.portal-grid');
        const faydaliGrid = document.querySelector('.faydali-grid');
        
        const screenWidth = window.innerWidth;
        
        // Ekran boyutuna göre grid sütun sayısını ayarla
        if (screenWidth < 576) {
            // Mobil: tüm gridlerde 1 sütun
            if (kurumGrid) kurumGrid.style.gridTemplateColumns = '1fr';
            if (websiteGrid) websiteGrid.style.gridTemplateColumns = '1fr';
            if (portalGrid) portalGrid.style.gridTemplateColumns = '1fr';
            if (faydaliGrid) faydaliGrid.style.gridTemplateColumns = '1fr';
        } else if (screenWidth < 768) {
            // Küçük tablet: 2 sütun
            if (kurumGrid) kurumGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            if (websiteGrid) websiteGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            if (portalGrid) portalGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            if (faydaliGrid) faydaliGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else if (screenWidth < 992) {
            // Tablet: 3 sütun
            if (kurumGrid) kurumGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            if (websiteGrid) websiteGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            if (portalGrid) portalGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            if (faydaliGrid) faydaliGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        } else {
            // Desktop: orijinal düzen - kurum içi 5 sütun, diğerleri farklı
            if (kurumGrid) kurumGrid.style.gridTemplateColumns = 'repeat(5, 1fr)';
            if (websiteGrid) websiteGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
            if (portalGrid) portalGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            if (faydaliGrid) faydaliGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        }
    }
    
    // Logo ile perfect hizalama fonksiyonu - GÜNCELLENMİŞ
    function alignWithLogo() {
        const logo = document.querySelector('.logo-img');
        const logoContainer = document.querySelector('.logo-container');
        const navContainer = document.querySelector('.nav-container');
        const pageHeader = document.querySelector('.page-header h1');
        const sectionTitles = document.querySelectorAll('.section-title h2');
        const grids = document.querySelectorAll('.kurum-ici-grid, .website-grid, .portal-grid, .faydali-grid');
        const footerContent = document.querySelector('.footer-content');
        
        if (logo && logoContainer && navContainer && window.innerWidth > 768) {
            // Nav container'ın sol padding'ini hesapla
            const navContainerRect = navContainer.getBoundingClientRect();
            const logoContainerRect = logoContainer.getBoundingClientRect();
            
            // Logo container'ın nav container içindeki pozisyonunu hesapla
            const logoOffsetFromNavContainer = logoContainerRect.left - navContainerRect.left;
            
            // Ana container'ın genişlik oranını hesapla
            const mainContainer = document.querySelector('.main-container');
            const mainContainerRect = mainContainer.getBoundingClientRect();
            const bodyWidth = document.body.clientWidth;
            
            // Logo pozisyonunu main container koordinat sistemine çevir
            const logoPositionInMain = logoOffsetFromNavContainer;
            
            console.log('Logo hizalama hesaplamaları:', {
                logoOffsetFromNavContainer,
                logoPositionInMain,
                navContainerWidth: navContainerRect.width,
                mainContainerWidth: mainContainerRect.width
            });
            
            // Sayfa başlığını logo ile hizala
            if (pageHeader) {
                pageHeader.style.paddingLeft = logoPositionInMain + 'px';
            }
            
            // Section başlıklarını logo ile hizala
            sectionTitles.forEach(title => {
                title.style.paddingLeft = logoPositionInMain + 'px';
            });
            
            // Grid'leri logo ile hizala
            grids.forEach(grid => {
                grid.style.paddingLeft = logoPositionInMain + 'px';
                grid.style.paddingRight = logoPositionInMain + 'px';
            });
            
            // Footer'ı da logo ile hizala
            if (footerContent) {
                footerContent.style.paddingLeft = logoPositionInMain + 'px';
            }
            
        } else if (window.innerWidth <= 768) {
            // Mobilde hizalamayı sıfırla
            if (pageHeader) pageHeader.style.paddingLeft = '1rem';
            
            sectionTitles.forEach(title => {
                title.style.paddingLeft = '1.5rem';
            });
            
            grids.forEach(grid => {
                grid.style.paddingLeft = '0';
                grid.style.paddingRight = '0';
            });
            
            if (footerContent) {
                footerContent.style.paddingLeft = '1rem';
            }
        }
    }
    
    // Sayfa performansını optimize et
    function optimizePagePerformance() {
        // Lazy loading için intersection observer
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        // Tüm resimleri observe et
        const images = document.querySelectorAll('.system-logo[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Hata yakalama ve logging
    function setupErrorHandling() {
        window.addEventListener('error', function(e) {
            console.error('JavaScript hatası:', {
                message: e.message,
                filename: e.filename,
                line: e.lineno,
                column: e.colno,
                error: e.error
            });
        });
        
        window.addEventListener('unhandledrejection', function(e) {
            console.error('Promise hatası:', e.reason);
        });
    }
    
    // Klavye navigasyonu - Kurum içi kartlar için özel davranış
    function setupKeyboardNavigation() {
        let currentCardIndex = 0;
        const allCards = Array.from(document.querySelectorAll('.link-card'));
        
        document.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'Tab':
                    // Tab navigasyonu - varsayılan davranış
                    break;
                    
                case 'Enter':
                    // Enter tuşu ile aktif elementi tıkla
                    if (document.activeElement.classList.contains('link-btn')) {
                        document.activeElement.click();
                    }
                    break;
                    
                case 'ArrowRight':
                case 'ArrowDown':
                    // Sağ/aşağı ok tuşu - sonraki karta git
                    e.preventDefault();
                    currentCardIndex = Math.min(currentCardIndex + 1, allCards.length - 1);
                    focusCard(allCards[currentCardIndex]);
                    break;
                    
                case 'ArrowLeft':
                case 'ArrowUp':
                    // Sol/yukarı ok tuşu - önceki karta git
                    e.preventDefault();
                    currentCardIndex = Math.max(currentCardIndex - 1, 0);
                    focusCard(allCards[currentCardIndex]);
                    break;
                    
                case 'Home':
                    // Home tuşu - ilk karta git
                    e.preventDefault();
                    currentCardIndex = 0;
                    focusCard(allCards[currentCardIndex]);
                    break;
                    
                case 'End':
                    // End tuşu - son karta git
                    e.preventDefault();
                    currentCardIndex = allCards.length - 1;
                    focusCard(allCards[currentCardIndex]);
                    break;
            }
        });
        
        function focusCard(card) {
            if (card) {
                const button = card.querySelector('.link-btn');
                if (button) {
                    button.focus();
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Kurum içi kartlarda özel focus efekti
                    const isKurumIci = card.getAttribute('data-category') === 'kurum-ici';
                    if (isKurumIci) {
                        card.style.boxShadow = '0 0 20px rgba(40, 167, 69, 0.3)';
                        setTimeout(() => {
                            card.style.boxShadow = '';
                        }, 2000);
                    }
                }
            }
        }
    }
    
    // Memory storage için visitedLinks array'i
    let visitedLinksMemory = [];
    
    // Son ziyaret edilen linkler - Memory storage kullanarak
    function saveVisitedLink(url, title) {
        // Aynı link varsa kaldır (en üste çıkarmak için)
        visitedLinksMemory = visitedLinksMemory.filter(link => link.url !== url);
        
        // Yeni linki başa ekle
        visitedLinksMemory.unshift({
            url: url,
            title: title,
            timestamp: Date.now(),
            category: getCardCategory(title)
        });
        
        // En fazla 10 link sakla
        visitedLinksMemory = visitedLinksMemory.slice(0, 10);
        
        console.log('Son ziyaret edilen linkler:', visitedLinksMemory);
    }
    
    // Kart kategorisini başlığa göre tespit et
    function getCardCategory(title) {
        const kurumIciCards = document.querySelectorAll('[data-category="kurum-ici"] h4');
        const websiteCards = document.querySelectorAll('[data-category="website"] h4');
        const portalCards = document.querySelectorAll('[data-category="portal"] h4');
        const faydaliCards = document.querySelectorAll('[data-category="faydali"] h4');
        
        for (let card of kurumIciCards) {
            if (card.textContent.trim() === title.trim()) return 'kurum-ici';
        }
        for (let card of websiteCards) {
            if (card.textContent.trim() === title.trim()) return 'website';
        }
        for (let card of portalCards) {
            if (card.textContent.trim() === title.trim()) return 'portal';
        }
        for (let card of faydaliCards) {
            if (card.textContent.trim() === title.trim()) return 'faydali';
        }
        
        return 'unknown';
    }
    
    // Scroll pozisyonunu memory'de sakla
    let scrollMemory = 0;
    
    function setupScrollMemory() {
        // Scroll pozisyonunu kaydet
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                scrollMemory = window.scrollY;
            }, 250);
        });
        
        // Sayfa yeniden yüklendiğinde scroll pozisyonunu geri yükle
        if (scrollMemory > 0) {
            setTimeout(() => {
                window.scrollTo(0, scrollMemory);
            }, 100);
        }
    }
    
    // Footer üstündeki beyaz alanı kaldır ve hizala
    function removeFooterWhitespace() {
        const contentArea = document.querySelector('.content-area');
        const footer = document.querySelector('footer');
        
        if (contentArea && footer) {
            // Content area'nın alt margin'ini sıfırla
            contentArea.style.marginBottom = '0';
            contentArea.style.paddingBottom = '2rem';
            
            // Footer'ın üst margin'ini sıfırla
            footer.style.marginTop = '0';
        }
    }
    
    // Kurum içi kartları özel vurgulama
    function highlightKurumIciCards() {
        const kurumIciCards = document.querySelectorAll('[data-category="kurum-ici"]');
        
        kurumIciCards.forEach((card, index) => {
            // Kurum içi kartlara özel CSS class ekle
            card.classList.add('kurum-ici-special');
            
                    // Her 3. kurum içi kartına özel animasyon
                    // Örneğin: her 3. kartı vurgula
                                if ((index + 1) % 3 === 0) {
                                    card.classList.add('highlighted');
                                }
                            });
                        }
                // <-- Add this closing brace to end DOMContentLoaded
            });
    