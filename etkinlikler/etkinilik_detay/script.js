let filteredData = [...newsData];
let currentPage = 1;
const itemsPerPage = 8; // 4'lü grid için 8 kart gösteriyoruz


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

document.addEventListener('DOMContentLoaded', function() {
    updateTotalCount();
    renderNews();
    setupEventListeners();
});

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