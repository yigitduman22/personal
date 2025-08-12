document.addEventListener('DOMContentLoaded', function() {
    // Sayfa yüklendiğinde saygı duruşu efekti
    initRespectMoment();
    
    // Sayfalama butonları
    initPagination();
    
    // Kart hover efektleri
    initCardEffects();
    
    // Lazy loading fotoğraflar için
    initLazyLoading();
});

// Saygı duruşu efekti
function initRespectMoment() {
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        pageHeader.classList.add('respect-moment');
    }
}

// Sayfalama işlevselliği
function initPagination() {
    const paginationLinks = document.querySelectorAll('.page-link');
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Disabled link kontrolü
            if (this.closest('.page-item').classList.contains('disabled')) {
                return;
            }
            
            // Active state güncelleme
            document.querySelectorAll('.page-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Sayı linkiyse active yap
            if (!isNaN(this.textContent.trim())) {
                this.closest('.page-item').classList.add('active');
            }
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Burada AJAX ile yeni vefat bilgileri yüklenebilir
            loadVefatData(this.textContent.trim());
        });
    });
}

// Vefat verilerini yükleme (simüle edilmiş)
function loadVefatData(page) {
    console.log(`Sayfa ${page} vefat bilgileri yükleniyor...`);
    
    // Loading efekti
    showLoadingEffect();
    
    // Simüle edilmiş AJAX gecikme
    setTimeout(() => {
        hideLoadingEffect();
        // Burada gerçek uygulamada API'den veri çekilir
    }, 1000);
}

// Loading efekti
function showLoadingEffect() {
    const vefatGrid = document.getElementById('vefatGrid');
    vefatGrid.style.opacity = '0.5';
    vefatGrid.style.transition = 'opacity 0.3s ease';
}

function hideLoadingEffect() {
    const vefatGrid = document.getElementById('vefatGrid');
    vefatGrid.style.opacity = '1';
}

// Kart hover efektleri
function initCardEffects() {
    const vefatCards = document.querySelectorAll('.vefat-card');
    
    vefatCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Memorial icon animasyonu
            const icon = this.querySelector('.memorial-icon i');
            if (icon) {
                icon.style.transform = 'rotate(10deg) scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.memorial-icon i');
            if (icon) {
                icon.style.transform = 'none';
            }
        });
        
        // Kart tıklama efekti (detay modal açılabilir)
        card.addEventListener('click', function() {
            const personName = this.querySelector('.person-name').textContent;
            console.log(`${personName} için detay açılıyor...`);
            // showPersonDetail(personName); // Modal açma fonksiyonu
        });
    });
}

// Lazy loading fotoğraflar için
function initLazyLoading() {
    const images = document.querySelectorAll('.person-photo img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(() => {
                        img.style.opacity = '1';
                    }, 100);
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Detay modal fonksiyonu (isteğe bağlı)
function showPersonDetail(personName) {
    // Modal HTML'i oluştur ve göster
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div class="modal fade" id="personDetailModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${personName} - Detaylı Bilgi</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p>Burada ${personName} hakkında detaylı bilgiler yer alabilir.</p>
                        <p>Çalışma geçmişi, başarıları, anılar vb.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Bootstrap modal'ı başlat
    const bsModal = new bootstrap.Modal(document.getElementById('personDetailModal'));
    bsModal.show();
    
    // Modal kapandığında DOM'dan kaldır
    document.getElementById('personDetailModal').addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(modal);
    });
}

// Arama fonksiyonu (isteğe bağlı)
function searchVefatRecords(searchTerm) {
    const cards = document.querySelectorAll('.vefat-card');
    
    cards.forEach(card => {
        const personName = card.querySelector('.person-name').textContent.toLowerCase();
        const personPosition = card.querySelector('.person-position').textContent.toLowerCase();
        
        if (personName.includes(searchTerm.toLowerCase()) || 
            personPosition.includes(searchTerm.toLowerCase())) {
            card.style.display = 'block';
            card.style.animation = 'fadeInCard 0.5s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC tuşu ile modal kapat
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            const modal = bootstrap.Modal.getInstance(openModal);
            modal.hide();
        }
    }
    
    // Arrow keys ile sayfalama
    if (e.key === 'ArrowLeft') {
        const prevBtn = document.querySelector('.page-item:first-child .page-link');
        if (prevBtn && !prevBtn.closest('.page-item').classList.contains('disabled')) {
            prevBtn.click();
        }
    }
    
    if (e.key === 'ArrowRight') {
        const nextBtn = document.querySelector('.page-item:last-child .page-link');
        if (nextBtn && !nextBtn.closest('.page-item').classList.contains('disabled')) {
            nextBtn.click();
        }
    }
});

// Yazdırma fonksiyonu
function printVefatRecords() {
    window.print();
}

// Export fonksiyonu (PDF olarak)
function exportToPDF() {
    console.log('PDF export işlemi başlatılıyor...');
    // Burada PDF export kütüphanesi kullanılabilir (jsPDF, html2pdf vb.)
}