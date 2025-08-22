// Filtreleme fonksiyonunu güncelle
document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sortSelect');
    const allCards = document.querySelectorAll('.document-card');
    const searchInput = document.getElementById('searchInput');

    // Filtre değişikliği
    sortSelect.addEventListener('change', function () {
        const selectedType = this.value;
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        allCards.forEach(card => {
            const cardType = card.dataset.type;
            const cardCategory = card.dataset.category;
            
            // Arama terimi kontrolü
            let matchesSearch = true;
            if (searchTerm) {
                const title = card.querySelector('.document-title').textContent.toLowerCase();
                const description = card.querySelector('.document-description').textContent.toLowerCase();
                matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            }

            // Filtre mantığı
            let shouldShow = false;
            
            if (selectedType === 'all') {
                // Tümü seçiliyse tüm kartları göster
                shouldShow = true;
            } else if (selectedType === 'genel') {
                // Kurum İçi Linkler - 10 kart
                shouldShow = (cardCategory === 'link' && cardType === 'genel');
            } else if (selectedType === 'memur') {
                // Website Linkler - 4 kart  
                shouldShow = (cardCategory === 'link' && cardType === 'memur');
            } else if (selectedType === 'sozlesmeli') {
                // Bilgi Portalları - 3 kart
                shouldShow = (cardCategory === 'link' && cardType === 'sozlesmeli');
            } else if (selectedType === 'isci') {
                // Faydalı Linkler - 3 kart
                shouldShow = (cardCategory === 'link' && cardType === 'isci');
            } else {
                // Mevcut mevzuat kartları için
                shouldShow = (cardCategory === 'link' && (selectedType === 'all' || cardType === selectedType));
            }

            // Gösterme/gizleme
            if (shouldShow && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Sonuç sayısını güncelle
        updateResultCount();
    });

    // Arama fonksiyonu
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const selectedType = sortSelect.value;
            
            allCards.forEach(card => {
                const cardType = card.dataset.type;
                const cardCategory = card.dataset.category;
                const title = card.querySelector('.document-title').textContent.toLowerCase();
                const description = card.querySelector('.document-description').textContent.toLowerCase();
                
                const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
                
                // Filtre mantığı (yukarıdaki ile aynı)
                let shouldShow = false;
                
                if (selectedType === 'all') {
                    shouldShow = true;
                } else if (selectedType === 'genel') {
                    shouldShow = (cardCategory === 'link' && cardType === 'genel');
                } else if (selectedType === 'memur') {
                    shouldShow = (cardCategory === 'link' && cardType === 'memur');
                } else if (selectedType === 'sozlesmeli') {
                    shouldShow = (cardCategory === 'link' && cardType === 'sozlesmeli');
                } else if (selectedType === 'isci') {
                    shouldShow = (cardCategory === 'link' && cardType === 'isci');
                } else {
                    shouldShow = (cardCategory === 'link' && (selectedType === 'all' || cardType === selectedType));
                }

                if (shouldShow && matchesSearch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            updateResultCount();
        });
    }

    // Filtreleme fonksiyonunu güncelle
document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sortSelect');
    const allCards = document.querySelectorAll('.document-card');
    const searchInput = document.getElementById('searchInput');

    // Filtre değişikliği
    sortSelect.addEventListener('change', function () {
        const selectedType = this.value;
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        allCards.forEach(card => {
            const cardType = card.dataset.type;
            const cardCategory = card.dataset.category;
            
            // Arama terimi kontrolü
            let matchesSearch = true;
            if (searchTerm) {
                const title = card.querySelector('.document-title').textContent.toLowerCase();
                const description = card.querySelector('.document-description').textContent.toLowerCase();
                matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            }

            // Filtre mantığı
            let shouldShow = false;
            
            if (selectedType === 'all') {
                // Tümü seçiliyse tüm kartları göster
                shouldShow = true;
            } else if (selectedType === 'genel') {
                // Kurum İçi Linkler - 10 kart
                shouldShow = (cardCategory === 'link' && cardType === 'genel');
            } else if (selectedType === 'memur') {
                // Website Linkler - 4 kart  
                shouldShow = (cardCategory === 'link' && cardType === 'memur');
            } else if (selectedType === 'sozlesmeli') {
                // Bilgi Portalları - 3 kart
                shouldShow = (cardCategory === 'link' && cardType === 'sozlesmeli');
            } else if (selectedType === 'isci') {
                // Faydalı Linkler - 3 kart
                shouldShow = (cardCategory === 'link' && cardType === 'isci');
            } else {
                // Mevcut mevzuat kartları için
                shouldShow = (cardCategory === 'link' && (selectedType === 'all' || cardType === selectedType));
            }

            // Gösterme/gizleme
            if (shouldShow && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Sonuç sayısını güncelle
        updateResultCount();
    });

    // Arama fonksiyonu
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const selectedType = sortSelect.value;
            
            allCards.forEach(card => {
                const cardType = card.dataset.type;
                const cardCategory = card.dataset.category;
                const title = card.querySelector('.document-title').textContent.toLowerCase();
                const description = card.querySelector('.document-description').textContent.toLowerCase();
                
                const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
                
                // Filtre mantığı (yukarıdaki ile aynı)
                let shouldShow = false;
                
                if (selectedType === 'all') {
                    shouldShow = true;
                } else if (selectedType === 'genel') {
                    shouldShow = (cardCategory === 'link' && cardType === 'genel');
                } else if (selectedType === 'memur') {
                    shouldShow = (cardCategory === 'link' && cardType === 'memur');
                } else if (selectedType === 'sozlesmeli') {
                    shouldShow = (cardCategory === 'link' && cardType === 'sozlesmeli');
                } else if (selectedType === 'isci') {
                    shouldShow = (cardCategory === 'link' && cardType === 'isci');
                } else {
                    shouldShow = (cardCategory === 'link' && (selectedType === 'all' || cardType === selectedType));
                }

                if (shouldShow && matchesSearch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            updateResultCount();
        });
    }

    // Sonuç sayısını güncelleme fonksiyonu
    function updateResultCount() {
        const visibleCards = document.querySelectorAll('.document-card[style*="display: block"], .document-card:not([style*="display: none"])');
        const resultsHeader = document.querySelector('.results-header');
        
        if (resultsHeader) {
            let countText = resultsHeader.querySelector('.result-count');
            if (!countText) {
                countText = document.createElement('span');
                countText.className = 'result-count';
                countText.style.cssText = 'margin-right: 15px; font-weight: 600; color: #344e75;';
                resultsHeader.insertBefore(countText, sortSelect);
            }
            countText.textContent = `${visibleCards.length} sonuç bulundu`;
        }
    }

    // Sayfa yüklendiğinde sonuç sayısını göster
    setTimeout(updateResultCount, 100);
});

    // Sayfa yüklendiğinde sonuç sayısını göster
    setTimeout(updateResultCount, 100);
});