     // Galeri fotoğrafları array'i - Başlık ve açıklamalarla
const detayGorseller = [
    {
        resim: "/images/off-road-foto/gebze-de-off-road-heyecan_120.jpg",
        
    },
    {
        resim: "/images/off-road-foto/gebze-de-off-road-heyecan_2075.jpg",
        
    },
    {
        resim: "/images/off-road-foto/gebze-de-off-road-heyecan_2143.jpg",
        
    },
    {
        resim: "/images/off-road-foto/gebze-de-off-road-heyecan_3569.jpg",
        
    },
    {
        resim: "/images/off-road-foto/gebze-de-off-road-heyecan_3911.jpg",
        
    },
    {
        resim: "/images/off-road-foto/gebze-de-off-road-heyecan_4046.jpg",
        
    },
    {
        resim: "/images/off-road-foto/gebze-de-off-road-heyecan_4564.jpg",
       
    },
    {
        resim: "/images/off-road-foto/gebze-de-off-road-heyecan_4975.jpg",
       
    },
    {
        resim: "/images/off-road-foto/gebze-de-off-road-heyecan_5429.jpg",
       
    },
    
];
   // --- GALERİ SİSTEMİ ---
    const mainImage = document.getElementById('main-haber-gorsel');
    const mainTitle = document.getElementById('ana-haber-baslik');
    const galleryTrack = document.getElementById('gallery-track');
    const galleryDotsContainer = document.getElementById('gallery-dots');

    if (mainImage && mainTitle && galleryTrack && detayGorseller.length > 1) {
        const itemsPerView = 5;
        const totalGroups = Math.ceil(detayGorseller.length / itemsPerView);
        let currentGroupIndex = 0;
        let selectedImageIndex = 0;
        let autoSlideInterval;
        let isAutoPlaying = true;

        // Ok butonlarını oluştur
        const mainImageContainer = mainImage.parentElement;
        mainImageContainer.classList.add('main-image-container');
        
        const prevArrow = document.createElement('button');
        prevArrow.className = 'gallery-arrow prev';
        prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        const nextArrow = document.createElement('button');
        nextArrow.className = 'gallery-arrow next';
        nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        mainImageContainer.appendChild(prevArrow);
        mainImageContainer.appendChild(nextArrow);

        // Sonsuz döngü için görselleri çoğalt
        const galleryItems = [...detayGorseller, ...detayGorseller, ...detayGorseller];
        
        // Galeriyi ve noktaları oluştur
        galleryItems.forEach((gorsel, index) => {
            const originalIndex = index % detayGorseller.length;
            const thumbnail = document.createElement('div');
            thumbnail.className = 'gallery-thumbnail';
            thumbnail.innerHTML = `
                <img src="${gorsel.resim}" alt="${gorsel.baslik}" class="gallery-thumbnail-image">
            `;
            thumbnail.dataset.index = originalIndex;
            galleryTrack.appendChild(thumbnail);
        });

        for (let i = 0; i < totalGroups; i++) {
             const dot = document.createElement('div');
             dot.className = 'gallery-dot';
             dot.dataset.groupIndex = i;
             galleryDotsContainer.appendChild(dot);
        }

        const thumbnails = galleryTrack.querySelectorAll('.gallery-thumbnail');
        const dots = galleryDotsContainer.querySelectorAll('.gallery-dot');
        
        // Ana görsel ve başlık güncelleme fonksiyonu
        function updateGallery(newIndex) {
            selectedImageIndex = newIndex;
            const selectedItem = detayGorseller[selectedImageIndex];
            
            mainImage.style.opacity = '0';
            mainTitle.style.opacity = '0';
            
            setTimeout(() => {
                mainImage.src = selectedItem.resim;
                mainTitle.textContent = selectedItem.baslik;
                mainImage.style.opacity = '1';
                mainTitle.style.opacity = '1';
            }, 250);
            
            thumbnails.forEach(thumb => {
                thumb.classList.toggle('active', parseInt(thumb.dataset.index) === selectedImageIndex);
            });

            // Aktif thumbnail görünür alanda mı kontrol et
            ensureThumbnailVisible(selectedImageIndex);
        }
        
        // Dot'ları güncelle
        function updateDots() {
             dots.forEach(dot => {
                 dot.classList.toggle('active', parseInt(dot.dataset.groupIndex) === currentGroupIndex);
             });
        }
        
        // Grup değiştirme
        function setGroup(groupIndex) {
            currentGroupIndex = groupIndex;
            const itemWidth = thumbnails[0].offsetWidth + 8;
            const groupWidth = itemWidth * itemsPerView;
            galleryTrack.style.transform = `translateX(-${currentGroupIndex * groupWidth}px)`;
            updateDots();
        }

        // Aktif thumbnail'ın görünür olmasını sağla
        function ensureThumbnailVisible(imageIndex) {
            const groupIndex = Math.floor(imageIndex / itemsPerView);
            if (groupIndex !== currentGroupIndex) {
                setGroup(groupIndex);
            }
        }

        // Otomatik slider başlat
        function startAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            
            autoSlideInterval = setInterval(() => {
                if (isAutoPlaying) {
                    const nextIndex = (selectedImageIndex + 1) % detayGorseller.length;
                    updateGallery(nextIndex);
                }
            }, 4000); // 4 saniyede bir değiş
        }

        // Otomatik slider durdur
        function stopAutoSlide() {
            isAutoPlaying = false;
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        }

        // Otomatik slider yeniden başlat
        function resumeAutoSlide() {
            isAutoPlaying = true;
            startAutoSlide();
        }

        // Önceki fotoğraf
        function showPrevImage() {
            const prevIndex = selectedImageIndex === 0 ? detayGorseller.length - 1 : selectedImageIndex - 1;
            updateGallery(prevIndex);
        }

        // Sonraki fotoğraf
        function showNextImage() {
            const nextIndex = (selectedImageIndex + 1) % detayGorseller.length;
            updateGallery(nextIndex);
        }

        // Event listener'lar
        prevArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            stopAutoSlide();
            showPrevImage();
            setTimeout(resumeAutoSlide, 10000);
        });

        nextArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            stopAutoSlide();
            showNextImage();
            setTimeout(resumeAutoSlide, 10000);
        });

        // Thumbnail tıklama
        galleryTrack.addEventListener('click', (e) => {
            const thumbnail = e.target.closest('.gallery-thumbnail');
            if (thumbnail) {
                stopAutoSlide();
                updateGallery(parseInt(thumbnail.dataset.index));
                setTimeout(resumeAutoSlide, 10000);
            }
        });

        // Dot tıklama
        galleryDotsContainer.addEventListener('click', (e) => {
             const dot = e.target.closest('.gallery-dot');
             if (dot) {
                 setGroup(parseInt(dot.dataset.groupIndex));
             }
        });

        // Klavye kontrolleri
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                stopAutoSlide();
                showPrevImage();
                setTimeout(resumeAutoSlide, 10000);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                stopAutoSlide();
                showNextImage();
                setTimeout(resumeAutoSlide, 10000);
            }
        });

        // Ana görsel hover olayları
        mainImageContainer.addEventListener('mouseenter', () => {
            stopAutoSlide();
        });

        mainImageContainer.addEventListener('mouseleave', () => {
            resumeAutoSlide();
        });

        // Başlangıç durumu
        updateGallery(0);
        updateDots();
        startAutoSlide();
    }
    
      // DOM Elements
const profileBtn = document.getElementById('profileBtn');
const profileMenu = document.getElementById('profileMenu');
const navDropdown = document.querySelector('.nav-dropdown');
const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
const dropdownMenu = document.querySelector('.nav-dropdown-menu');

// Initialize Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
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
document.addEventListener("DOMContentLoaded", function () {
    const newsList = document.getElementById("other-news-list");
    // Burada herhangi bir sayfalama yok, tüm haberler listede
    // Scroll ile kullanıcı aşağı indikçe görebilir
});
