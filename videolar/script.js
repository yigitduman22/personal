document.addEventListener('DOMContentLoaded', () => {

    // --- Gerekli HTML Elemanlarını Seçiyoruz ---
    const filterButtons = document.querySelectorAll('.nav-pills .nav-link');
    const searchInput = document.getElementById('video-search-input');
    const videoItems = document.querySelectorAll('#video-grid .video-item');
    const noResultsMessage = document.getElementById('no-results-message');
    
    // Yeni Modal Elemanları
    const videoModalEl = document.getElementById('videoModal');
    const youtubeIframe = document.getElementById('youtube-iframe');

    // --- Ana Filtreleme Fonksiyonumuz ---
    const performFilter = () => {
        // ... (Bu fonksiyon aynı kalıyor, değişiklik yok) ...
        const selectedCategory = document.querySelector('.nav-pills .nav-link.active').getAttribute('data-category');
        const searchTerm = searchInput.value.toLowerCase();
        let visibleCount = 0;

        videoItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const itemTitle = item.querySelector('.card-title').textContent.toLowerCase();
            const categoryMatch = (selectedCategory === 'all' || itemCategory === selectedCategory);
            const searchMatch = itemTitle.includes(searchTerm);

            if (categoryMatch && searchMatch) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        if (visibleCount === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    };

    // --- Olay Dinleyicileri ---
    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            performFilter();
        });
    });

    searchInput.addEventListener('input', performFilter);

    // --- MODAL VİDEO OYNATMA MANTIĞI (YENİ EKLENDİ) ---
    // Modal açılmadan hemen önce bu olay tetiklenir
    videoModalEl.addEventListener('show.bs.modal', (event) => {
        // Tıklanan kartı buluyoruz (event.relatedTarget)
        const clickedCard = event.relatedTarget;
        const youtubeId = clickedCard.getAttribute('data-youtube-id');
        
        if (youtubeId) {
            // Iframe'in src'sini autoplay parametresi ile güncelliyoruz
            youtubeIframe.setAttribute('src', `https://www.youtube.com/embed/${youtubeId}?autoplay=1`);
        }
    });

    // --- MODAL KAPANDIĞINDA VİDEOYU DURDURMA MANTIĞI ---
    // Bu çok önemli, yoksa video arkada çalmaya devam eder!
    videoModalEl.addEventListener('hidden.bs.modal', () => {
        youtubeIframe.setAttribute('src', '');
    });
});