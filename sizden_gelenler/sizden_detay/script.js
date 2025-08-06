// DOM Elements
const profileBtn = document.getElementById('profileBtn');
const profileMenu = document.getElementById('profileMenu');
const navDropdown = document.querySelector('.nav-dropdown');
const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
const dropdownMenu = document.querySelector('.nav-dropdown-menu');

// Gallery Elements
const mainArticleImage = document.getElementById('mainArticleImage');
const galleryTrack = document.getElementById('galleryTrack');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryPrevBtn = document.getElementById('galleryPrevBtn');
const galleryNextBtn = document.getElementById('galleryNextBtn');

// Department Slider Elements
const departmentSlider = document.querySelector('.departments-slider');
const deptTrack = document.querySelector('.departments-track');
const departmentItems = document.querySelectorAll('.department-item');
const prevDeptBtn = document.getElementById('prevDeptBtn');
const nextDeptBtn = document.getElementById('nextDeptBtn');
const currentDeptPage = document.getElementById('currentDeptPage');
const totalDeptPages = document.getElementById('totalDeptPages');

// Article Elements
const articleTitle = document.getElementById('articleTitle');
const articleDate = document.getElementById('articleDate');
const articleViews = document.getElementById('articleViews');
const articleBody = document.getElementById('articleBody');
const articleCategory = document.getElementById('articleCategory');
const breadcrumbTitle = document.getElementById('breadcrumbTitle');

// Global Variables
let currentGalleryIndex = 0;
let currentDeptIndex = 0;
let totalDeptItems = departmentItems.length;
let autoSlideInterval;
let viewCount = 0;

// Sayfa yüklendiğinde başlangıç fonksiyonlarını çalıştır
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sayfa yüklendi - JavaScript başlatılıyor...');
    
    // Tüm fonksiyonları başlat
    initializeNavigation();
    initializeGallery();
    initializeDepartmentSlider();
    initializeArticleData();
    initializeViewCounter();
    
    console.log('Tüm JavaScript fonksiyonları başarıyla başlatıldı');
});

// ========== NAVİGASYON FONKSİYONLARI ==========

function initializeNavigation() {
    console.log('Navigasyon başlatılıyor...');
    
    // Navbar dropdown functionality
    if (navDropdown && dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Profil menüsünü kapat
            if (profileMenu && profileBtn) {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
            
            // Dropdown'u aç/kapat
            navDropdown.classList.toggle('active');
        });
        
        // Dışarıya tıklandığında dropdown'u kapat
        document.addEventListener('click', function(e) {
            if (!navDropdown.contains(e.target)) {
                navDropdown.classList.remove('active');
            }
        });
        
        // Escape tuşu ile dropdown'u kapat
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                navDropdown.classList.remove('active');
            }
        });
    }

    // Profile dropdown functionality
    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Navbar dropdown'unu kapat
            if (navDropdown) {
                navDropdown.classList.remove('active');
            }
            
            // Profil menüsünü aç/kapat
            profileMenu.classList.toggle('show');
            profileBtn.classList.toggle('active');
        });
        
        // Dışarıya tıklandığında profil menüsünü kapat
        document.addEventListener('click', function(e) {
            if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
        });
        
        // Çıkış butonuna tıklama olayı
        const logoutBtn = profileMenu.querySelector('.logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
                    console.log('Kullanıcı çıkış yapıyor...');
                    // Burada çıkış işlemi yapılabilir
                    // window.location.href = '/giris_sayfasi/login.html';
                }
            });
        }
        
        // Escape tuşu ile profil menüsünü kapat
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
        });
    }
    
    console.log('Navigasyon başarıyla başlatıldı');
}

// ========== GALERİ FONKSİYONLARI ==========

function initializeGallery() {
    console.log('Galeri başlatılıyor...');
    
    if (!galleryItems.length || !mainArticleImage) {
        console.log('Galeri elemanları bulunamadı');
        return;
    }
    
    // Küçük resimlere tıklama olaylarını ekle
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            showGalleryImage(index);
        });
    });
    
    // Galeri kontrol butonları
    if (galleryPrevBtn) {
        galleryPrevBtn.addEventListener('click', function() {
            showGalleryImage(currentGalleryIndex - 1);
        });
    }
    
    if (galleryNextBtn) {
        galleryNextBtn.addEventListener('click', function() {
            showGalleryImage(currentGalleryIndex + 1);
        });
    }
    
    // Klavye navigasyonu
    document.addEventListener('keydown', function(e) {
        if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') {
            return; // Input alanlarında klavye navigasyonunu devre dışı bırak
        }
        
        if (e.key === 'ArrowLeft') {
            showGalleryImage(currentGalleryIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showGalleryImage(currentGalleryIndex + 1);
        }
    });
    
    // İlk resmi göster
    showGalleryImage(0);
    updateGalleryButtons();
    
    console.log('Galeri başarıyla başlatıldı');
}

function showGalleryImage(index) {
    if (index < 0 || index >= galleryItems.length) {
        return;
    }
    
    const selectedItem = galleryItems[index];
    const newImageSrc = selectedItem.dataset.image;
    
    if (!newImageSrc) {
        console.error('Resim kaynağı bulunamadı:', selectedItem);
        return;
    }
    
    // Ana resmi değiştir
    if (mainArticleImage) {
        mainArticleImage.src = newImageSrc;
        mainArticleImage.alt = selectedItem.querySelector('img').alt || 'Makale Resmi';
    }
    
    // Önceki aktif öğeyi pasif yap
    galleryItems.forEach(item => item.classList.remove('active'));
    
    // Yeni aktif öğeyi belirle
    selectedItem.classList.add('active');
    
    // Mevcut index'i güncelle
    currentGalleryIndex = index;
    
    // Butonları güncelle
    updateGalleryButtons();
    
    // Küçük resimlerin görünürlüğünü kontrol et
    scrollGalleryToActive();
}

function updateGalleryButtons() {
    if (galleryPrevBtn) {
        galleryPrevBtn.disabled = currentGalleryIndex === 0;
    }
    if (galleryNextBtn) {
        galleryNextBtn.disabled = currentGalleryIndex === galleryItems.length - 1;
    }
}

function scrollGalleryToActive() {
    const activeItem = galleryItems[currentGalleryIndex];
    if (activeItem && galleryTrack) {
        const itemWidth = activeItem.offsetWidth + 10; // 10px gap
        const trackWidth = galleryTrack.parentElement.offsetWidth;
        const itemOffsetLeft = activeItem.offsetLeft;
        
        // Eğer aktif öğe görünür alanda değilse kaydır
        let scrollLeft = itemOffsetLeft - (trackWidth / 2) + (itemWidth / 2);
        scrollLeft = Math.max(0, Math.min(scrollLeft, galleryTrack.scrollWidth - trackWidth));
        
        galleryTrack.style.transform = `translateX(-${scrollLeft}px)`;
    }
}

// ========== DEPARTMAN SLIDER FONKSİYONLARI ==========

function initializeDepartmentSlider() {
    console.log('Departman slider başlatılıyor...');
    
    if (!deptTrack || !departmentItems.length) {
        console.log('Departman slider elemanları bulunamadı');
        return;
    }
    
    // Toplam sayfa sayısını güncelle
    if (totalDeptPages) {
        totalDeptPages.textContent = totalDeptItems;
    }
    
    // Başlangıç pozisyonunu ayarla
    showDepartmentItem(0);
    
    // Otomatik kaydırmayı başlat
    startAutoSlide();
    
    // İleri/Geri butonlarına tıklama olaylarını ekle
    if (prevDeptBtn) {
        prevDeptBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showDepartmentItem(currentDeptIndex - 1);
            resetAutoSlide();
        });
    }
    
    if (nextDeptBtn) {
        nextDeptBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showDepartmentItem(currentDeptIndex + 1);
            resetAutoSlide();
        });
    }

    // Fare ile üzerine gelindiğinde otomatik kaydırmayı durdur/başlat
    if (departmentSlider) {
        departmentSlider.addEventListener('mouseenter', pauseAutoSlide);
        departmentSlider.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Touch/swipe desteği ekle
    addTouchSupport();
    
    console.log('Departman slider başarıyla başlatıldı');
}

function showDepartmentItem(index) {
    if (index < 0 || index >= totalDeptItems) {
        return;
    }
    
    // Yeni pozisyonu yüzde (%) olarak hesapla
    const offset = -index * 100;
    
    // `deptTrack` elementini CSS transform ile yatayda kaydır
    if (deptTrack) {
        deptTrack.style.transform = `translateX(${offset}%)`;
    }
    
    // Mevcut slayt index'ini güncelle
    currentDeptIndex = index;
    
    // Sayfa numarasını güncelle
    if (currentDeptPage) {
        currentDeptPage.textContent = index + 1;
    }
    
    // Butonların durumunu güncelle
    updateDepartmentButtons();
}

function updateDepartmentButtons() {
    if (prevDeptBtn) {
        prevDeptBtn.disabled = currentDeptIndex === 0;
        prevDeptBtn.style.opacity = currentDeptIndex === 0 ? '0.5' : '1';
    }
    if (nextDeptBtn) {
        nextDeptBtn.disabled = currentDeptIndex === totalDeptItems - 1;
        nextDeptBtn.style.opacity = currentDeptIndex === totalDeptItems - 1 ? '0.5' : '1';
    }
}

function startAutoSlide() {
    pauseAutoSlide();
    autoSlideInterval = setInterval(() => {
        const nextIndex = currentDeptIndex === totalDeptItems - 1 ? 0 : currentDeptIndex + 1;
        showDepartmentItem(nextIndex);
    }, 4000);
}

function pauseAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

function resetAutoSlide() {
    pauseAutoSlide();
    startAutoSlide();
}

// Touch/Swipe desteği
function addTouchSupport() {
    if (!departmentSlider) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    departmentSlider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        pauseAutoSlide();
    });
    
    departmentSlider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        
        const deltaX = Math.abs(touchEndX - touchStartX);
        const deltaY = Math.abs(touchEndY - touchStartY);
        
        // Yatay kaydırma dikey kaydırmadan daha fazlaysa
        if (deltaX > deltaY && deltaX > 50) {
            if (touchEndX < touchStartX) {
                // Sola kaydırma - sonraki slayt
                showDepartmentItem(currentDeptIndex + 1);
            } else {
                // Sağa kaydırma - önceki slayt
                showDepartmentItem(currentDeptIndex - 1);
            }
        }
        
        resetAutoSlide();
    });
}

// ========== MAKALE VERİSİ FONKSİYONLARI ==========

function initializeArticleData() {
    console.log('Makale verisi başlatılıyor...');
    
    // URL'den makale ID'sini al (eğer varsa)
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (articleId) {
        loadArticleData(articleId);
    } else {
        // Varsayılan makale verisi
        setDefaultArticleData();
    }
    
    // Tarihi güncelle
    updateArticleDate();
    
    console.log('Makale verisi başarıyla yüklendi');
}

function loadArticleData(articleId) {
    // Gerçek uygulamada burada API çağrısı yapılabilir
    console.log('Makale yükleniyor, ID:', articleId);
    
    // Örnek makale verileri
    const articleData = {
        '1': {
            title: 'Eğitim Faaliyetleri Hakkında Bilgilendirme',
            category: 'İnsan Kaynakları Ve Eğitim Müdürlüğü',
            content: 'Müdürlüğümüz koordinatörlüğünde yürütülen çalışmalar kapsamında, kurumumuzun çeşitli birimlerinde görev yapan personellerin ihtiyaç duyduğu eğitimler titizlikle planlanarak başarıyla tamamlanmıştır.',
            breadcrumb: 'Eğitim Faaliyetleri'
        },
        '2': {
            title: 'Altyapı Çalışmaları Devam Ediyor',
            category: 'Fen İşleri Müdürlüğü',
            content: 'Kent genelinde sürdürülen altyapı çalışmaları kapsamında yeni projeler hayata geçiriliyor.',
            breadcrumb: 'Altyapı Çalışmaları'
        },
        '3': {
            title: 'Altyapı Çalışmaları Devam Ediyor',
            category: 'Fen İşleri Müdürlüğü',
            content: 'Kent genelinde sürdürülen altyapı çalışmaları kapsamında yeni projeler hayata geçiriliyor.',
            breadcrumb: 'Altyapı Çalışmaları'
        },
        '4': {
            title: 'Altyapı Çalışmaları Devam Ediyor',
            category: 'Fen İşleri Müdürlüğü',
            content: 'Kent genelinde sürdürülen altyapı çalışmaları kapsamında yeni projeler hayata geçiriliyor.',
            breadcrumb: 'Altyapı Çalışmaları'
        }
    };
    
    const data = articleData[articleId];
    if (data) {
        if (articleTitle) articleTitle.textContent = data.title;
        if (articleCategory) articleCategory.textContent = data.category;
        if (articleBody) articleBody.textContent = data.content;
        if (breadcrumbTitle) breadcrumbTitle.textContent = data.breadcrumb;
        
        // Sayfa başlığını güncelle
        document.title = `${data.title} - Gebze Belediyesi Personel Portalı`;
    }
}

function setDefaultArticleData() {
    // HTML'de zaten varsayılan veriler mevcut, ekstra bir işlem yapılmıyor
    console.log('Varsayılan makale verisi kullanılıyor');
}

function updateArticleDate() {
    if (articleDate) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        };
        articleDate.textContent = now.toLocaleDateString('tr-TR', options);
    }
}

// ========== GÖRÜNTÜLENME SAYACI ==========

function initializeViewCounter() {
    console.log('Görüntülenme sayacı başlatılıyor...');
    
    // Sayfa yüklendiğinde görüntülenme sayısını artır
    incrementViewCount();
    
    // Sayfa açık kaldığı süreyi takip et
    trackPageTime();
}

function incrementViewCount() {
    // LocalStorage'dan önceki görüntülenme sayısını al
    const currentViews = localStorage.getItem('articleViews') || '0';
    viewCount = parseInt(currentViews) + 1;
    
    // Yeni sayıyı kaydet
    localStorage.setItem('articleViews', viewCount.toString());
    
    // Sayfada göster
    if (articleViews) {
        articleViews.textContent = viewCount;
    }
    
    console.log('Görüntülenme sayısı güncellendi:', viewCount);
}

function trackPageTime() {
    const startTime = Date.now();
    
    // Sayfa kapatılırken süreyi kaydet
    window.addEventListener('beforeunload', function() {
        const timeSpent = Date.now() - startTime;
        console.log('Sayfada geçirilen süre:', Math.round(timeSpent / 1000), 'saniye');
        
        // Gerçek uygulamada bu veri analitik sistemine gönderilebilir
    });
}

// ========== YARDIMCI FONKSİYONLAR ==========

// Sayfa içi yumuşak kaydırma
function smoothScrollTo(element, duration = 1000) {
    if (!element) return;
    
    const targetPosition = element.offsetTop - 100; // 100px üstten boşluk
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Responsive kontrolleri
function handleResize() {
    // Galeri ve slider boyutlarını yeniden hesapla
    if (galleryItems.length > 0) {
        scrollGalleryToActive();
    }
    
    // Departman slider'ı yeniden konumlandır
    if (deptTrack && currentDeptIndex >= 0) {
        showDepartmentItem(currentDeptIndex);
    }
}

// Resize olayını dinle
window.addEventListener('resize', debounce(handleResize, 250));

// Debounce yardımcı fonksiyonu
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

// Sayfa görünürlük değişikliklerini takip et
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Sayfa gizlendi - otomatik kaydırmayı durdur
        pauseAutoSlide();
        console.log('Sayfa gizlendi - otomatik kaydırma durduruldu');
    } else {
        // Sayfa görünür oldu - otomatik kaydırmayı başlat
        startAutoSlide();
        console.log('Sayfa görünür oldu - otomatik kaydırma başlatıldı');
    }
});

// Hata yakalama
window.addEventListener('error', function(e) {
    console.error('JavaScript hatası:', e.error);
});

// Console'da bilgi mesajı
console.log('🚀 Gebze Belediyesi Haber Detay Sayfası JavaScript\'i başarıyla yüklendi!');
console.log('📝 Özellikler: Navigasyon, Galeri, Slider, Görüntülenme Sayacı');
console.log('🔧 Geliştirici: Bilgi İşlem Müdürlüğü');