// ========== DOM HAZIR OLDUĞUNDA ÇALIŞACAK KODLAR ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sayfa yüklendi, JavaScript başlatılıyor...');

    // ========== NAVBAR DROPDOWN SİSTEMİ ==========
    const navDropdown = document.querySelector('.nav-dropdown');
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    const dropdownMenu = document.querySelector('.nav-dropdown-menu');

    if (navDropdown && dropdownToggle && dropdownMenu) {
        console.log('Navbar dropdown elemanları bulundu');

        // Dropdown toggle butonuna tıklama
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Navbar dropdown tıklandı');
            
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
                e.preventDefault();
                console.log('Dropdown item tıklandı:', this.textContent.trim());
                
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
    } else {
        console.log('Navbar dropdown elemanları bulunamadı');
    }

    // ========== PROFİL DROPDOWN SİSTEMİ ==========
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');

    if (profileBtn && profileMenu) {
        console.log('Profil buton ve menü bulundu');

        // Profil butonuna tıklama
        profileBtn.addEventListener('click', function(e) {
            console.log('Profil butonuna tıklandı');
            e.preventDefault();
            e.stopPropagation();
            
            // Navbar dropdown'ını kapat
            if (navDropdown) {
                navDropdown.classList.remove('active');
            }
            
            // Profil menüsünü aç/kapat
            profileMenu.classList.toggle('show');
            profileBtn.classList.toggle('active');
            
            console.log('Profil menü durumu:', profileMenu.classList.contains('show'));
        });

        // Sayfa herhangi bir yerine tıklandığında menüyü kapat
        document.addEventListener('click', function(e) {
            if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
        });

        // Profil menü item'larına tıklama
        const profileMenuItems = profileMenu.querySelectorAll('.profile-menu-item');
        profileMenuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Profil menü item tıklandı:', this.textContent.trim());
                
                // Çıkış yap butonuna özel işlem
                if (this.classList.contains('logout')) {
                    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
                        console.log('Çıkış yapılıyor...');
                        // window.location.href = '/logout'; // Gerçek uygulamada kullanılır
                        alert('Çıkış işlemi simülasyonu - Gerçek uygulamada yönlendirme yapılacak');
                    }
                } else {
                    // Diğer menü itemları için işlem
                    alert('Bu özellik henüz aktif değil: ' + this.textContent.trim());
                }
                
                // Menüyü kapat
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            });
        });

        // ESC tuşu ile menüyü kapat
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
        });
    } else {
        console.log('Profil buton veya menü bulunamadı');
        console.log('profileBtn:', profileBtn);
        console.log('profileMenu:', profileMenu);
    }

    // ========== ARAMA FONKSİYONU ==========
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        console.log('Arama input bulundu');
        
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const surveyItems = document.querySelectorAll('.survey-item');
            let hasResults = false;

            console.log('Arama yapılıyor:', searchTerm);

            surveyItems.forEach(item => {
                const title = item.querySelector('.survey-title');
                const desc = item.querySelector('.survey-desc');
                
                if (title && desc) {
                    const titleText = title.textContent.toLowerCase();
                    const descText = desc.textContent.toLowerCase();
                    
                    if (titleText.includes(searchTerm) || descText.includes(searchTerm)) {
                        item.style.display = 'block';
                        hasResults = true;
                    } else {
                        item.style.display = 'none';
                    }
                }
            });

            // Boş durum mesajını göster/gizle
            const emptyState = document.getElementById('emptyState');
            if (emptyState) {
                if (!hasResults && searchTerm !== '') {
                    emptyState.classList.remove('d-none');
                } else {
                    emptyState.classList.add('d-none');
                }
            }
        });
    } else {
        console.log('Arama input bulunamadı');
    }

    // ========== YENİ FİLTRE TAB SİSTEMİ ==========
    const filterTabs = document.querySelectorAll('.filter-tab');
    if (filterTabs.length > 0) {
        console.log('Filtre tabları bulundu:', filterTabs.length);
        
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                console.log('Filtre tab tıklandı:', this.getAttribute('data-filter'));
                
                // Aktif filtre tabını güncelle
                filterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');
                const surveyItems = document.querySelectorAll('.survey-item');
                let hasResults = false;

                surveyItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        hasResults = true;
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Boş durum mesajını göster/gizle
                const emptyState = document.getElementById('emptyState');
                if (emptyState) {
                    if (!hasResults) {
                        emptyState.classList.remove('d-none');
                    } else {
                        emptyState.classList.add('d-none');
                    }
                }
            });
        });
    } else {
        console.log('Filtre tabları bulunamadı');
    }

    // ========== BİLDİRİM SİSTEMİ ==========
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        console.log('Bildirim bell bulundu');
        
        notificationBell.addEventListener('click', function() {
            console.log('Bildirim tıklandı');
            alert('3 yeni bildiriminiz var:\n• Yeni anket: Personel Memnuniyet Anketi\n• Anket hatırlatması: Eğitim İhtiyaç Analizi\n• Sonuçlar hazır: İş Ortamı Değerlendirme');
        });
    }

    // ========== ANKET KARTLARI İNTERAKSİYONU ==========
    const surveyBtns = document.querySelectorAll('.survey-btn');
    surveyBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Anket butonu tıklandı');
            
            if (this.classList.contains('completed')) {
                alert('Anket sonuçları görüntüleniyor...');
            } else if (this.classList.contains('expired')) {
                alert('Bu anketin süresi dolmuştur.');
            } else {
                alert('Ankete yönlendiriliyor...');
            }
        });
    });

    // ========== SIRALAMA SİSTEMİ ==========
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        console.log('Sıralama select bulundu');
        
        sortSelect.addEventListener('change', function(e) {
            const sortType = e.target.value;
            console.log('Sıralama seçildi:', sortType);
            
            const surveyContainer = document.getElementById('surveyContainer');
            const surveyItems = Array.from(surveyContainer.querySelectorAll('.survey-item'));
            
            // Sıralama işlemi
            surveyItems.sort((a, b) => {
                switch(sortType) {
                    case 'En Yeni':
                        return sortByDate(a, b, false); // Yeniden eskiye
                    case 'En Eski':
                        return sortByDate(a, b, true);  // Eskiden yeniye
                    case 'Popülerlik':
                        return sortByPopularity(a, b);
                    default:
                        return sortByDate(a, b, false); // Varsayılan: En yeni
                }
            });
            
            // Sıralanmış öğeleri DOM'a tekrar ekle
            surveyItems.forEach(item => {
                surveyContainer.appendChild(item);
            });
            
            // Smooth scroll efekti
            surveyContainer.style.opacity = '0.7';
            setTimeout(() => {
                surveyContainer.style.opacity = '1';
            }, 150);
        });
    } else {
        console.log('Sıralama select bulunamadı');
    }

    console.log('Tüm JavaScript event listener\'ları başarıyla yüklendi');
});

// ========== FAVORİ TOGGLE FONKSİYONU (GLOBAL) ==========
function toggleFavorite(btn) {
    console.log('Favori toggle çağrıldı');
    
    const icon = btn.querySelector('i');
    const textNodes = Array.from(btn.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
    
    if (icon) {
        if (icon.classList.contains('far')) {
            // Favoriye ekle
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.classList.remove('btn-outline-warning');
            btn.classList.add('btn-warning');
            
            // Text node'u güncelle
            textNodes.forEach(node => {
                if (node.textContent.trim().includes('Favoriye Ekle')) {
                    node.textContent = ' Favorilerden Çıkar';
                }
            });
            
            console.log('Favoriye eklendi');
        } else {
            // Favorilerden çıkar
            icon.classList.remove('fas');
            icon.classList.add('far');
            btn.classList.remove('btn-warning');
            btn.classList.add('btn-outline-warning');
            
            // Text node'u güncelle
            textNodes.forEach(node => {
                if (node.textContent.trim().includes('Favorilerden Çıkar')) {
                    node.textContent = ' Favoriye Ekle';
                }
            });
            
            console.log('Favorilerden çıkarıldı');
        }
    }
}

// ========== SIRALAMA YARDIMCI FONKSİYONLARI ==========

// Tarihe göre sıralama
function sortByDate(a, b, ascending = true) {
    const dateA = extractDate(a);
    const dateB = extractDate(b);
    
    if (!dateA || !dateB) return 0;
    
    return ascending ? dateA - dateB : dateB - dateA;
}

// Popülerliğe göre sıralama (katılım oranına göre)
function sortByPopularity(a, b) {
    const participationA = extractParticipation(a);
    const participationB = extractParticipation(b);
    
    return participationB - participationA; // Yüksekten düşüğe
}

// Anket kartından tarihi çıkar
function extractDate(surveyItem) {
    const dateElement = surveyItem.querySelector('.survey-date');
    if (!dateElement) return null;
    
    const dateText = dateElement.textContent;
    // Tarih formatı: "09.10.2024 - 15.11.2024" 
    const dateMatch = dateText.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    
    if (dateMatch) {
        const [, day, month, year] = dateMatch;
        return new Date(year, month - 1, day); // JavaScript ayları 0-11 arası
    }
    
    return null;
}

// Katılım oranını çıkar
function extractParticipation(surveyItem) {
    const participationElement = surveyItem.querySelector('.participation-rate');
    if (!participationElement) return 0;
    
    const participationText = participationElement.textContent;
    // Format: "Katılım: 45/120 kişi" veya "%37"
    
    // Yüzde değerini ara
    const percentMatch = participationText.match(/(\d+)%/);
    if (percentMatch) {
        return parseInt(percentMatch[1]);
    }
    
    // Oran değerini ara (45/120)
    const ratioMatch = participationText.match(/(\d+)\/(\d+)/);
    if (ratioMatch) {
        const [, current, total] = ratioMatch;
        return Math.round((parseInt(current) / parseInt(total)) * 100);
    }
    
    return 0;
}

// ========== YARDIMCI FONKSİYONLAR ==========
// Smooth scroll fonksiyonu
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Loading state gösterme
function showLoading(element) {
    if (element) {
        element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yükleniyor...';
        element.disabled = true;
    }
}

// Loading state gizleme
function hideLoading(element, originalText) {
    if (element) {
        element.innerHTML = originalText;
        element.disabled = false;
    }
}

// Toast mesaj gösterme (Bootstrap kullanarak)
function showToast(message, type = 'info') {
    const toastHTML = `
        <div class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    // Toast container'ı oluştur (yoksa)
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Toast'ı ekle
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = toastHTML.trim();
    const toastElement = tempDiv.firstChild;
    
    toastContainer.appendChild(toastElement);
    
    // Bootstrap Toast'ı başlat
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 5000
    });
    
    toast.show();
    
    // Temizleme için event listener
    toastElement.addEventListener('hidden.bs.toast', function () {
        toastElement.remove();
    });
}