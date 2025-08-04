// DOM Elements
const profileBtn = document.getElementById('profileBtn'); 
const profileMenu = document.getElementById('profileMenu'); 
const navDropdown = document.querySelector('.nav-dropdown'); 
const dropdownToggle = document.querySelector('.nav-dropdown-toggle'); 
const dropdownMenu = document.querySelector('.nav-dropdown-menu'); 

// === DİĞER MÜDÜRLÜKLER SLİDER FONKSİYONALİTESİ ===

// DOM Elements for departments slider
const departmentItems = document.querySelectorAll('.department-item'); 
const prevDeptBtn = document.getElementById('prevDeptBtn'); 
const nextDeptBtn = document.getElementById('nextDeptBtn'); 
const currentDeptPage = document.getElementById('currentDeptPage'); 
const totalDeptPages = document.getElementById('totalDeptPages'); 

let currentDeptIndex = 0; 
const totalDeptItems = departmentItems.length; 
let autoSlideInterval;

// Initialize Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    initDepartmentsSlider();
}); 
// Event Listeners
function setupEventListeners() {
    // Navbar dropdown functionality
    if (navDropdown && dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Close profile menu if open
            if (profileMenu && profileBtn) {
                profileMenu.classList.remove('show'); 
                profileBtn.classList.remove('active'); 
            }

            navDropdown.classList.toggle('active'); // Toggle 'active' class
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

            // Close navbar dropdown if open
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
                    // Burada çıkış yapma işlemleri (örn. oturumu sonlandırma, yönlendirme) eklenebilir. 
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

// Initialize departments slider
function initDepartmentsSlider() {
    if (departmentItems.length === 0) return;
    // Set total pages
    totalDeptPages.textContent = totalDeptItems; 
    
    // Show first item
    showDepartmentItem(0);
    // Start auto slide
    startAutoSlide(); 
    
    // Add event listeners
    if (prevDeptBtn) {
        prevDeptBtn.addEventListener('click', () => {
            if (currentDeptIndex > 0) {
                showDepartmentItem(currentDeptIndex - 1);
            }
            // Reset auto slide timer
            resetAutoSlide(); 
        });
    } 
    
    if (nextDeptBtn) {
        nextDeptBtn.addEventListener('click', () => {
            if (currentDeptIndex < totalDeptItems - 1) {
                showDepartmentItem(currentDeptIndex + 1);
            }
            // Reset auto slide timer
            resetAutoSlide();
        }); 
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentDeptIndex > 0) {
            showDepartmentItem(currentDeptIndex - 1);
            resetAutoSlide();
        } else if (e.key === 'ArrowRight' && currentDeptIndex < totalDeptItems - 1) {
            showDepartmentItem(currentDeptIndex + 1); 
            resetAutoSlide();
        }
    });
    // Pause auto slide on hover
    const sliderContainer = document.querySelector('.departments-slider'); 
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', pauseAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    } 
}

// Start automatic sliding
function startAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    } 
    
    autoSlideInterval = setInterval(() => {
        if (currentDeptIndex < totalDeptItems - 1) {
            showDepartmentItem(currentDeptIndex + 1);
        } else {
            // Loop back to first item
            showDepartmentItem(0);
        }
    }, 3000); // Change slide every 3 seconds 
}

// Pause automatic sliding
function pauseAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    } 
}

// Reset auto slide timer
function resetAutoSlide() {
    pauseAutoSlide();
    startAutoSlide();
} 

// Show specific department item
function showDepartmentItem(index) {
    // Hide all items
    departmentItems.forEach(item => {
        item.classList.remove('active');
    });
    // Show current item
    if (departmentItems[index]) { 
        departmentItems[index].classList.add('active');
    } 
    
    // Update current index
    currentDeptIndex = index;
    // Update page number
    if (currentDeptPage) { 
        currentDeptPage.textContent = index + 1;
    } 
    
    // Update button states
    updateDepartmentButtons();
} 

// Update department navigation buttons
function updateDepartmentButtons() {
    if (prevDeptBtn) {
        prevDeptBtn.disabled = currentDeptIndex === 0;
    } 
    
    if (nextDeptBtn) {
        nextDeptBtn.disabled = currentDeptIndex === totalDeptItems - 1;
    } 
}