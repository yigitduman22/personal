document.addEventListener('DOMContentLoaded', () => {

    // ===================================================================
    // ADIM 1: "SAHTE VERİ TABANIMIZ" (VİDEO LİSTESİ)
    // ===================================================================
    const videos = [
        { id: 'qLqYPQgUPEc', title: 'Gebze Offroad Heyecanı', description: 'Nefes kesen anlar...', category: 'etkinlikler', duration: '15:22' },
        { id: 'GWfDmGr6tlg', title: 'Yeni Personel İçin İSG Eğitimi', description: 'İş sağlığı ve güvenliği temelleri.', category: 'egitimler', duration: '45:10' },
        { id: 'eUBQYWMZyH8', title: 'Bayramlaşma Töreni Duyurusu', description: 'Tüm personelimiz davetlidir.', category: 'duyurular', duration: '01:30' },
        { id: 'pAHStsCd9jo', title: 'Belediye Pikniği 2025', description: 'Geçtiğimiz haftadan kalanlar...', category: 'etkinlikler', duration: '05:48' },
        { id: 'psmlNSPRDsM', title: 'Video Başlığı 5', description: 'Açıklama...', category: 'duyurular', duration: '00:00' },
        { id: 'ABIqjRnV5dU', title: 'Video Başlığı 6', description: 'Açıklama...', category: 'egitimler', duration: '00:00' },
        { id: 'xot-DBvkkq4', title: 'Video Başlığı 7', description: 'Açıklama...', category: 'etkinlikler', duration: '00:00' },
        { id: 'BiY2WK24UHY', title: 'Video Başlığı 8', description: 'Açıklama...', category: 'duyurular', duration: '00:00' },
        { id: 'uUFZvM9kqf4', title: 'Video Başlığı 9', description: 'Açıklama...', category: 'egitimler', duration: '00:00' },
        { id: 'qdPXmtKXXc4', title: 'Video Başlığı 10', description: 'Açıklama...', category: 'etkinlikler', duration: '00:00' },
        { id: '3ePuzpC2S0Q', title: 'Video Başlığı 11', description: 'Açıklama...', category: 'duyurular', duration: '00:00' },
        { id: 'IEc5W0JyADU', title: 'Video Başlığı 12', description: 'Açıklama...', category: 'egitimler', duration: '00:00' },
        { id: 'RhD1ArYsuKo', title: 'Video Başlığı 13', description: 'Açıklama...', category: 'etkinlikler', duration: '00:00' },
        { id: 'G2KNC3OAnjE', title: 'Video Başlığı 14', description: 'Açıklama...', category: 'duyurular', duration: '00:00' },
        { id: 'Z2dH2UIXb8Y', title: 'Video Başlığı 15', description: 'Açıklama...', category: 'egitimler', duration: '00:00' },
        { id: 'QRizu8RhGnU', title: 'Video Başlığı 16', description: 'Açıklama...', category: 'etkinlikler', duration: '00:00' },
        { id: 'YXat3fIWc7w', title: 'Video Başlığı 17', description: 'Açıklama...', category: 'duyurular', duration: '00:00' },
        { id: 'e65zC48s8Wc', title: 'Video Başlığı 18', description: 'Açıklama...', category: 'egitimler', duration: '00:00' },
        { id: '-0Wxna6PjqQ', title: 'Video Başlığı 19', description: 'Açıklama...', category: 'etkinlikler', duration: '00:00' },
        { id: 'c0vbYSFwMzU', title: 'Video Başlığı 20', description: 'Açıklama...', category: 'duyurular', duration: '00:00' },
        { id: 'RhVDYrAb0xQ', title: 'Video Başlığı 21', description: 'Açıklama...', category: 'egitimler', duration: '00:00' },
        { id: 'aUQ3uIAfL-k', title: 'Video Başlığı 22', description: 'Açıklama...', category: 'etkinlikler', duration: '00:00' },
        { id: 'D1b-CZYtCTg', title: 'Video Başlığı 23', description: 'Açıklama...', category: 'duyurular', duration: '00:00' }
    ];

    // ===================================================================
    // ADIM 2: FONKSİYONLAR VE OLAY DİNLEYİCİLER
    // ===================================================================

    const videoGrid = document.getElementById('video-grid');
    const searchInput = document.getElementById('video-search-input');
    const filterButtons = document.querySelectorAll('.nav-pills .nav-link');
    const noResultsMessage = document.getElementById('no-results-message');
    const paginationContainer = document.querySelector('.pagination');
    const videoModalEl = document.getElementById('videoModal');
    const youtubeIframe = document.getElementById('youtube-iframe');

    const itemsPerPage = 8;
    let currentPage = 1;

    const renderVideos = (items) => {
        videoGrid.innerHTML = '';
        if (items.length === 0) return;
        items.forEach(video => {
            const cardHTML = `
                <div class="col video-item" data-category="${video.category}">
                    <div class="card video-card h-100 shadow-sm" data-bs-toggle="modal" data-bs-target="#videoModal" data-youtube-id="${video.id}">
                        <div class="card-thumbnail">
                            <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" class="card-img-top" alt="${video.title}">
                            <div class="play-icon-overlay"><i class="fas fa-play"></i></div>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${video.title}</h5>
                            <p class="card-text small">${video.description}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted"><i class="fas fa-tag me-1"></i> ${video.category}</small>
                            <small class="text-muted"><i class="fas fa-clock me-1"></i> ${video.duration}</small>
                        </div>
                    </div>
                </div>`;
            videoGrid.innerHTML += cardHTML;
        });
    };
    
    const updateDisplay = () => {
        const selectedCategory = document.querySelector('.nav-pills .nav-link.active').getAttribute('data-category');
        const searchTerm = searchInput.value.toLowerCase();
        const filteredItems = videos.filter(video => {
            const categoryMatch = (selectedCategory === 'all' || video.category === selectedCategory);
            const searchMatch = video.title.toLowerCase().includes(searchTerm);
            return categoryMatch && searchMatch;
        });
        
        const paginatedItems = paginate(filteredItems);
        renderVideos(paginatedItems);
        
        noResultsMessage.style.display = filteredItems.length === 0 ? 'block' : 'none';
        setupPagination(filteredItems);
    };

    const paginate = (items) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return items.slice(startIndex, endIndex);
    }

    const setupPagination = (items) => {
        const totalPages = Math.ceil(items.length / itemsPerPage);
        paginationContainer.innerHTML = '';
        if (totalPages <= 1) {
            paginationContainer.style.display = 'none';
            return;
        }
        paginationContainer.style.display = 'flex';
        // ... (sayfalama butonlarını oluşturma mantığı)
        paginationContainer.innerHTML += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="#" data-page="${currentPage - 1}">Önceki</a></li>`;
        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.innerHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        }
        paginationContainer.innerHTML += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}"><a class="page-link" href="#" data-page="${currentPage + 1}">Sonraki</a></li>`;
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentPage = 1;
            updateDisplay();
        });
    });

    searchInput.addEventListener('input', () => {
        currentPage = 1;
        updateDisplay();
    });

    paginationContainer.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target;
        if (target.tagName === 'A' && !target.parentElement.classList.contains('disabled')) {
            currentPage = parseInt(target.getAttribute('data-page'));
            updateDisplay();
        }
    });

    videoModalEl.addEventListener('show.bs.modal', (event) => {
        const clickedElement = event.relatedTarget;
        if (clickedElement) {
            const youtubeId = clickedElement.getAttribute('data-youtube-id');
            if (youtubeId) {
                youtubeIframe.setAttribute('src', `https://www.youtube.com/embed/${youtubeId}?autoplay=1`);
            }
        }
    });
    
    videoModalEl.addEventListener('hidden.bs.modal', () => {
        youtubeIframe.setAttribute('src', '');
    });

    updateDisplay();
});