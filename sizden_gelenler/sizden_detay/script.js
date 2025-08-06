// DOM Elements
const profileBtn = document.getElementById('profileBtn');
const profileMenu = document.getElementById('profileMenu');
const navDropdown = document.querySelector('.nav-dropdown');
const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
const dropdownMenu = document.querySelector('.nav-dropdown-menu');

// === DİĞER MÜDÜRLÜKLER SLİDER FONKSİYONALİTESİ (YENİLENDİ) ===

// DOM Elements for departments slider
const departmentSlider = document.querySelector('.departments-slider');
const deptTrack = document.getElementById('deptTrack'); // Kaydırma kanalı (track) elementi
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
    setupEventListeners();
    
    // Sadece slider elemanları sayfada mevcutsa slider'ı başlat
    if (deptTrack && departmentItems.length > 0) {
        initDepartmentsSlider();
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
    totalDeptPages.textContent = totalDeptItems;
    
    // Başlangıç pozisyonunu ayarla
    showDepartmentItem(0);
    
    // Otomatik kaydırmayı başlat
    startAutoSlide();
    
    // İleri/Geri butonlarına tıklama olaylarını ekle
    prevDeptBtn.addEventListener('click', () => {
        showDepartmentItem(currentDeptIndex - 1);
        resetAutoSlide(); // Kullanıcı müdahale ettiğinde sayacı sıfırla
    });
    
    nextDeptBtn.addEventListener('click', () => {
        showDepartmentItem(currentDeptIndex + 1);
        resetAutoSlide(); // Kullanıcı müdahale ettiğinde sayacı sıfırla
    });

    // Fare ile üzerine gelindiğinde otomatik kaydırmayı durdur/başlat
    if (departmentSlider) {
        departmentSlider.addEventListener('mouseenter', pauseAutoSlide);
        departmentSlider.addEventListener('mouseleave', startAutoSlide);
    }
}

// Belirtilen slaytı gösteren fonksiyon
function showDepartmentItem(index) {
    // Butonlar için sınırı kontrol et, döngüsel geçişi engelle
    if (index < 0 || index >= totalDeptItems) {
        return;
    }
    
    // Yeni pozisyonu yüzde (%) olarak hesapla
    const offset = -index * 100;
    
    // `deptTrack` elementini CSS transform ile yatayda kaydır
    deptTrack.style.transform = `translateX(${offset}%)`;
    
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
    }
    if (nextDeptBtn) {
        nextDeptBtn.disabled = currentDeptIndex === totalDeptItems - 1;
    }
}

// Otomatik kaydırmayı başlatan fonksiyon
function startAutoSlide() {
    pauseAutoSlide(); // Başlamadan önce mevcut bir interval varsa temizle
    autoSlideInterval = setInterval(() => {
        // Bir sonraki index'i bul. Eğer son slaytta ise başa (index 0) dön.
        const nextIndex = (currentDeptIndex + 1) % totalDeptItems;
        showDepartmentItem(nextIndex);
    }, 5000); // Her 5 saniyede bir slaytı değiştir
}

// Otomatik kaydırmayı durduran fonksiyon
function pauseAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Otomatik kaydırma sayacını sıfırlayıp yeniden başlatan fonksiyon
function resetAutoSlide() {
    pauseAutoSlide();
    startAutoSlide();
}