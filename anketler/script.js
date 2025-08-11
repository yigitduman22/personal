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

    // ========== FİLTRE FONKSİYONU ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        console.log('Filtre butonları bulundu:', filterBtns.length);
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                console.log('Filtre tıklandı:', this.getAttribute('data-filter'));
                
                // Aktif filtre butonunu güncelle
                filterBtns.forEach(b => b.classList.remove('filter-active'));
                this.classList.add('filter-active');

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
        console.log('Filtre butonları bulunamadı');
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
    
    // Toast'ı ekle ve göster
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    const toastElement = toastContainer.lastElementChild;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    
    // Toast kapandıktan sonra DOM'dan kaldır
    toastElement.addEventListener('hidden.bs.toast', function () {
        this.remove();
    });
}

console.log('JavaScript dosyası tamamen yüklendi');