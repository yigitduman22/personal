// Sample data - Bu veriler gerçek uygulamada API'den gelecek
const newsData = [
    {
        id: 1,
        title: "İnsan Kaynakları ve Eğitim Müdürlüğü",
        excerpt: "6734 ve 6735 Sayılı Kanun Eğitimi - Biyomedikal Eğitimi - Üniversite Eğitimi - Oryantasyon Eğitimi - Fen Programlama Eğitimi - Mevzuat Eğitimi - Teknoloji Çalışma Eğitimi...",
        category: "insan-kaynaklari",
        categoryName: "İnsan Kaynakları ve Eğitim Müdürlüğ",
        date: "06.11.2023",
        views: 91,
        image: "/images/sizden_gelenler/insan_kaynaklari/nsan-kaynaklar-ve-e-itim-mudurlu-u_1547.jpg",
       
        
    },
    {
        id: 2,
        title: "Fen İşleri Müdürlüğü",
        excerpt: "Köprülü Geçmis Mahallesi, 503 Sokak'taki çalışmalar...Köprülü Geçmis Mahallesi, 503 Sokak'taki çalışmalar...",
        category: "fen-isleri",
        categoryName: "Fen İşleri Müdürlüğü",
        date: "19.10.2023",
        views: 145,
        image: "/images/sizden_gelenler/fen_isleri/fen-leri-mudurlu-u_3604.jpg"
    },
    {
        id: 3,
        title: "Temizlik İşleri Müdürlüğü",
        excerpt: "Kül, katkısız ve tüm güzelleştirme organlarından şeye çeşit kurtarıcılar...Kül, katkısız ve tüm güzelleştirme organlarından şeye çeşit kurtarıcılar...",
        category: "temizlik",
        categoryName: "Temizlik İşleri Müdürlüğü",
        date: "19.10.2023",
        views: 78,
        image: "/images/sizden_gelenler/temizlik_isleri/temizlik-leri-mudurlu-u_2142.jpg"
    },
    {
        id: 4,
        title: "Veteriner İşleri Müdürlüğü",
        excerpt: "4 Ekim Dünya Hayvanları Koruma Günü nedeniyle 4 Ekim boyunca...4 Ekim Dünya Hayvanları Koruma Günü nedeniyle 4 Ekim boyunca...",
        category: "veteriner",
        categoryName: "Veteriner İşleri Müdürlüğü",
        date: "17.10.2023",
        views: 234,
        image: "/images/sizden_gelenler/veteriner_isleri/veteriner-leri-mudurlu-u_547.jpg"
    },
    {
        id: 5,
        title: "Park ve Bahçeler Müdürlüğü",
        excerpt: "Bağışlanmış günlük programı göbildirinde park ve yeşil alanlarımızda...",
        category: "park-bahce",
        categoryName: "Park ve Bahçeler Müdürlüğü",
        date: "17.10.2023",
        views: 156,
        image: "/images/sizden_gelenler/park_bahce/park-ve-bahceler-mudurlu-u_357.jpg"
    },
    {
        id: 6,
        title: "İnsan Kaynakları Eğitim Semineri",
        excerpt: "Personel gelişimi için düzenlenen eğitim seminerimiz tamamlandı. Katılımcılarımız başarı sertifikalarını aldı...",
        category: "insan-kaynaklari",
        categoryName: "İnsan Kaynakları ve Eğitim Müdürlüğü",
        date: "15.10.2023",
        views: 189,
        image: "/images/sizden_gelenler/insan_kaynaklari/nsan-kaynaklar-ve-e-itim-mudurlu-u_4846.jpg"
    },
    {
        id: 7,
        title: "Yol Bakım ve Onarım Çalışmaları",
        excerpt: "Şehrimizin çeşitli bölgelerinde gerçekleştirilen yol bakım ve onarım çalışmaları devam ediyor...",
        category: "fen-isleri",
        categoryName: "Fen İşleri Müdürlüğü",
        date: "12.10.2023",
        views: 267,
        image: "/images/sizden_gelenler/fen_isleri/fen-leri-mudurlu-u_8989.jpg"
    },
    {
        id: 8,
        title: "Çevre Temizlik Kampanyası",
        excerpt: "Doğal yaşam alanlarının korunması için başlatılan temizlik kampanyası büyük ilgi gördü...",
        category: "temizlik",
        categoryName: "Temizlik İşleri Müdürlüğü",
        date: "10.10.2023",
        views: 198,
        image: "/images/sizden_gelenler/temizlik_isleri/temizlik-leri-mudurlu-u_6633.jpg"
    },
    {
        id: 9,
        title: "Dijital Dönüşüm Eğitimi",
        excerpt: "Personelimize yönelik dijital dönüşüm ve teknoloji kullanımı eğitimi başarıyla tamamlandı...",
        category: "insan-kaynaklari",
        categoryName: "Zabıta Müdürlüğü",
        date: "08.10.2023",
        views: 312,
        image: "/images/sizden_gelenler/zabıta/zab-ta-mudurlu-u_6319.jpg"
    },
    {
        id: 10,
        title: "Altyapı Geliştirme Projesi",
        excerpt: "Şehir merkezindeki altyapı geliştirme ve modernizasyon çalışmaları hızla devam ediyor...",
        category: "fen-isleri",
        categoryName: "Fen İşleri Müdürlüğü",
        date: "05.10.2023",
        views: 423,
        image: "/images/sizden_gelenler/fen_isleri/fen-leri-mudurlu-u_8989.jpg"
    },
    {
        id: 11,
        title: "Sokak Hayvanları Bakım Programı",
        excerpt: "Sokak hayvanlarının sağlık kontrolü ve bakım programı kapsamında çalışmalar sürdürülüyor...",
        category: "veteriner",
        categoryName: "Veteriner İşleri Müdürlüğü",
        date: "03.10.2023",
        views: 186,
        image: "/images/sizden_gelenler/veteriner_isleri/veteriner-leri-mudurlu-u_547.jpg"
    },
    {
        id: 12,
        title: "Yeşil Alan Düzenleme Çalışması",
        excerpt: "Kent genelindeki park ve yeşil alanların bakım ve düzenleme çalışmaları tamamlandı...",
        category: "park-bahce",
        categoryName: "Park ve Bahçeler Müdürlüğü",
        date: "01.10.2023",
        views: 278,
        image: "/images/sizden_gelenler/park_bahce/park-ve-bahceler-mudurlu-u_4188.jpg",
    
    }
];

let filteredData = [...newsData];
let currentPage = 1;
const itemsPerPage = 8; // 4'lü grid için 8 kart gösteriyoruz

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');
const newsGrid = document.getElementById('newsGrid');
const resultsCount = document.getElementById('resultsCount');
const totalNews = document.getElementById('totalNews');
const loadingSpinner = document.getElementById('loadingSpinner');
const noResults = document.getElementById('noResults');
const pagination = document.getElementById('pagination');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateTotalCount();
    renderNews();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // Navbar dropdown functionality from your existing code
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

    // Search functionality
    if (searchInput && searchBtn) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            handleFilter(this.dataset.category);
        });
    });

    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
}

// Search function
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        filteredData = [...newsData];
    } else {
        filteredData = newsData.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.excerpt.toLowerCase().includes(query) ||
            item.categoryName.toLowerCase().includes(query)
        );
    }
    
    currentPage = 1;
    renderNews();
}

// Filter function
function handleFilter(category) {
    if (category === 'all') {
        filteredData = [...newsData];
    } else {
        filteredData = newsData.filter(item => item.category === category);
    }
    
    currentPage = 1;
    renderNews();
}

// Sort function
function handleSort() {
    const sortType = sortSelect.value;
    
    switch (sortType) {
        case 'newest':
            filteredData.sort((a, b) => new Date(b.date.split('.').reverse().join('-')) - new Date(a.date.split('.').reverse().join('-')));
            break;
        case 'oldest':
            filteredData.sort((a, b) => new Date(a.date.split('.').reverse().join('-')) - new Date(b.date.split('.').reverse().join('-')));
            break;
        case 'most-viewed':
            filteredData.sort((a, b) => b.views - a.views);
            break;
        case 'alphabetical':
            filteredData.sort((a, b) => a.title.localeCompare(b.title, 'tr'));
            break;
    }
    
    renderNews();
}

// Render news function
function renderNews() {
    showLoading();
    
    setTimeout(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentItems = filteredData.slice(startIndex, endIndex);
        
        if (currentItems.length === 0) {
            showNoResults();
        } else {
            showNewsGrid(currentItems);
        }
        
        updateResultsCount();
        renderPagination();
        hideLoading();
    }, 500);
}

// Show loading
function showLoading() {
    if (loadingSpinner) loadingSpinner.classList.remove('d-none');
    if (newsGrid) newsGrid.classList.add('d-none');
    if (noResults) noResults.classList.add('d-none');
}

// Hide loading
function hideLoading() {
    if (loadingSpinner) loadingSpinner.classList.add('d-none');
}

// Show news grid
function showNewsGrid(items) {
    if (newsGrid) {
        newsGrid.classList.remove('d-none');
        if (noResults) noResults.classList.add('d-none');
        
        newsGrid.innerHTML = items.map(item => `
            <div class="news-card" onclick="openNewsDetail(${item.id})">
                <img src="${item.image}" alt="${item.title}" class="news-image" loading="lazy">
                <div class="news-content">
                    <span class="news-category">${item.categoryName}</span>
                    <h3 class="news-title">${item.title}</h3>
                    <p class="news-excerpt">${item.excerpt}</p>
                    <div class="news-meta">
                        <span class="news-date">
                            <i class="fas fa-calendar-alt"></i>
                            ${item.date}
                        </span>
                        <span class="news-views">
                            <i class="fas fa-eye"></i>
                            ${item.views}
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Show no results
function showNoResults() {
    if (newsGrid) newsGrid.classList.add('d-none');
    if (noResults) noResults.classList.remove('d-none');
}

// Update results count
function updateResultsCount() {
    if (resultsCount) {
        resultsCount.innerHTML = `<strong>${filteredData.length}</strong> sonuç bulundu`;
    }
}

// Update total count
function updateTotalCount() {
    if (totalNews) {
        totalNews.textContent = newsData.length;
    }
}

// Render pagination
function renderPagination() {
    if (!pagination) return;
    
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `
            <li class="page-item">
                <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">
                    <i class="fas fa-chevron-left"></i>
                </a>
            </li>
        `;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `
                <li class="page-item active">
                    <span class="page-link">${i}</span>
                </li>
            `;
        } else if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `
                <li class="page-item">
                    <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += `
                <li class="page-item disabled">
                    <span class="page-link">...</span>
                </li>
            `;
        }
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `
            <li class="page-item">
                <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">
                    <i class="fas fa-chevron-right"></i>
                </a>
            </li>
        `;
    }
    
    pagination.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    currentPage = page;
    renderNews();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Open news detail (placeholder)
function openNewsDetail(id) {
    // Bu fonksiyon gerçek uygulamada detay sayfasına yönlendirme yapacak
    console.log('Haber detayı açılıyor:', id);
    window.location.href = `/sizden_gelenler/sizden_detay/sizden.html?${id}`;
}

// Debounce function
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