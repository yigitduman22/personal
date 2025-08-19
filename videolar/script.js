document.addEventListener('DOMContentLoaded', () => {

    const filterButtons = document.querySelectorAll('.nav-pills .nav-link');
    const videoItems = document.querySelectorAll('#video-grid .video-item');

    // Animasyonun bitmesini beklemek için süre (CSS'deki transition ile aynı olmalı)
    const animationDuration = 300; // 0.3s = 300ms

    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const selectedCategory = button.getAttribute('data-category');

            // Butonların aktif durumunu güncelle
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Videoları filtrele
            videoItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                const shouldBeVisible = (selectedCategory === 'all' || itemCategory === selectedCategory);

                if (shouldBeVisible) {
                    // Zaten görünürse bir şey yapma, değilse göster
                    if (item.classList.contains('hide')) {
                        item.classList.remove('hide');
                        item.style.display = 'block'; // Animasyon için görünür yap
                    }
                } else {
                    // Zaten gizliyse bir şey yapma, değilse gizle
                    if (!item.classList.contains('hide')) {
                        item.classList.add('hide');
                        // Animasyon bittikten sonra elemanı DOM'dan kaldır ki yer kaplamasın
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, animationDuration);
                    }
                }
            });
        });
    });
});