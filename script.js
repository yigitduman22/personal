document.addEventListener('DOMContentLoaded', function() {
    // Menu interactivity
    document.querySelectorAll('.menu-list a').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.menu-list a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Navigation interactivity
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // News card click handlers for "Devamını Oku" links
    document.querySelectorAll('.news-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const title = this.closest('.news-card').querySelector('.news-title').textContent;
            alert(`"${title}" sayfası açılıyor...`);
        });
    });

    // Quick access buttons
    document.querySelectorAll('.btn.btn-outline-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior if href="#"
            if (this.textContent.includes('İzin Talebi')) {
                alert('İzin talep formu açılıyor...');
            } else if (this.textContent.includes('Bordro')) {
                alert('Bordro sorgulama sayfası açılıyor...');
            } else if (this.textContent.includes('Performans')) {
                alert('Performans raporu açılıyor...');
            }
        });
    });
});