// DOM Elements
const profileBtn = document.getElementById('profileBtn');
const profileMenu = document.getElementById('profileMenu');
const navDropdown = document.querySelector('.nav-dropdown');
const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
const dropdownMenu = document.querySelector('.nav-dropdown-menu');

// === DİĞER MÜDÜRLÜKLER SLİDER FONKSİYONALİTESİ (DÜZELTME) ===

// DOM Elements for departments slider
const departmentSlider = document.querySelector('.departments-slider');
const deptTrack = document.querySelector('.departments-track'); // ID yerine class kullanımı
const departmentItems = document.querySelectorAll('.department-item');
const prevDeptBtn = document.getElementById('prevDeptBtn');
const nextDeptBtn = document.getElementById('nextDeptBtn');
const currentDeptPage = document.getElementById('currentDeptPage');
const totalDeptPages = document.getElementById('totalDeptPages');

let currentDeptIndex = 0;
const totalDeptItems = departmentItems.length;
let autoSlideInterval;

// Sayfa yüklendiğinde olay dinleyicilerini ve slider'ı başlat
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM yüklendi'); // Debug için
    setupEventListeners();
    
    // Sadece slider elemanları sayfada mevcutsa slider'ı başlat
    if (deptTrack && departmentItems.length > 0) {
        console.log('Slider başlatılıyor...', {
            deptTrack: deptTrack,
            departmentItems: departmentItems.length,
            totalDeptItems: totalDeptItems
        });
        initDepartmentsSlider();
    } else {
        console.log('Slider elemanları bulunamadı:', {
            deptTrack: deptTrack,
            departmentItemsLength: departmentItems.length
        });
    }
});

// Navbar ve Profil menüsü için olay dinleyicilerini kuran fonksiyon
function setupEventListeners() {
    // Navbar dropdown functionality
    if (navDropdown && dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (profileMenu && profileBtn) {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
            navDropdown.classList.toggle('active');
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

    // Profile dropdown functionality
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
}

// Slider'ı başlatan ana fonksiyon
function initDepartmentsSlider() {
    console.log('initDepartmentsSlider çalışıyor');
    
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
        prevDeptBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Önceki butona tıklandı');
            showDepartmentItem(currentDeptIndex - 1);
            resetAutoSlide();
        });
    }
    
    if (nextDeptBtn) {
        nextDeptBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Sonraki butona tıklandı');
            showDepartmentItem(currentDeptIndex + 1);
            resetAutoSlide();
        });
    }

    // Fare ile üzerine gelindiğinde otomatik kaydırmayı durdur/başlat
    if (departmentSlider) {
        departmentSlider.addEventListener('mouseenter', pauseAutoSlide);
        departmentSlider.addEventListener('mouseleave', startAutoSlide);
    }
    
    console.log('Slider başarıyla başlatıldı');
}

// Belirtilen slaytı gösteren fonksiyon
function showDepartmentItem(index) {
    console.log('showDepartmentItem çağrıldı:', { index, currentDeptIndex, totalDeptItems });
    
    // Sınırları kontrol et
    if (index < 0 || index >= totalDeptItems) {
        console.log('Index sınır dışında:', index);
        return;
    }
    
    // Yeni pozisyonu yüzde (%) olarak hesapla
    const offset = -index * 100;
    console.log('Offset hesaplandı:', offset);
    
    // `deptTrack` elementini CSS transform ile yatayda kaydır
    if (deptTrack) {
        deptTrack.style.transform = `translateX(${offset}%)`;
        console.log('Transform uygulandı:', `translateX(${offset}%)`);
    }
    
    // Mevcut slayt index'ini güncelle
    currentDeptIndex = index;
    
    // Sayfa numarasını güncelle
    if (currentDeptPage) {
        currentDeptPage.textContent = index + 1;
    }
    
    // Butonların (ileri/geri) aktif/pasif durumunu güncelle
    updateDepartmentButtons();
}

// İleri/Geri butonlarının durumunu günceller
function updateDepartmentButtons() {
    if (prevDeptBtn) {
        prevDeptBtn.disabled = currentDeptIndex === 0;
        prevDeptBtn.style.opacity = currentDeptIndex === 0 ? '0.5' : '1';
    }
    if (nextDeptBtn) {
        nextDeptBtn.disabled = currentDeptIndex === totalDeptItems - 1;
        nextDeptBtn.style.opacity = currentDeptIndex === totalDeptItems - 1 ? '0.5' : '1';
    }
    console.log('Butonlar güncellendi:', { 
        currentIndex: currentDeptIndex, 
        prevDisabled: currentDeptIndex === 0, 
        nextDisabled: currentDeptIndex === totalDeptItems - 1 
    });
}

// Otomatik kaydırmayı başlatan fonksiyon
function startAutoSlide() {
    pauseAutoSlide(); // Başlamadan önce mevcut bir interval varsa temizle
    autoSlideInterval = setInterval(() => {
        // Eğer son slaytta ise başa dön, değilse bir sonrakine geç
        const nextIndex = currentDeptIndex === totalDeptItems - 1 ? 0 : currentDeptIndex + 1;
        console.log('Otomatik geçiş:', { currentDeptIndex, nextIndex });
        showDepartmentItem(nextIndex);
    }, 4000); // Her 4 saniyede bir slaytı değiştir
    console.log('Otomatik kaydırma başlatıldı');
}

// Otomatik kaydırmayı durduran fonksiyon
function pauseAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
        console.log('Otomatik kaydırma durduruldu');
    }
}

// Otomatik kaydırma sayacını sıfırlayıp yeniden başlatan fonksiyon
function resetAutoSlide() {
    console.log('Otomatik kaydırma sıfırlanıyor');
    pauseAutoSlide();
    startAutoSlide();
}