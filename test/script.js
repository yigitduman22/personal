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

    // Doğum Günü Verileri ve Sayfalandırma Mantığı
    const allBirthdays = [
        { name: 'Ayşe Yılmaz', department: 'İnsan Kaynakları', date: '23 Temmuz', img: 'https://via.placeholder.com/60/2c5aa0/FFFFFF?text=P1' },
        { name: 'Mehmet Can', department: 'Bilgi İşlem', date: '23 Temmuz', img: 'https://via.placeholder.com/60/4fc3f7/FFFFFF?text=P2' },
        { name: 'Zeynep Demir', department: 'Mali Hizmetler', date: '23 Temmuz', img: 'https://via.placeholder.com/60/1e3a5f/FFFFFF?text=P3' },
        { name: 'Ahmet Veli', department: 'Basın Yayın', date: '24 Temmuz', img: 'https://via.placeholder.com/60/d3d3d3/000000?text=P4' },
        { name: 'Elif Kaya', department: 'Fen İşleri', date: '24 Temmuz', img: 'https://via.placeholder.com/60/FF5733/FFFFFF?text=P5' },
        { name: 'Burak Akın', department: 'Park ve Bahçeler', date: '25 Temmuz', img: 'https://via.placeholder.com/60/33FF57/FFFFFF?text=P6' },
        { name: 'Selin Polat', department: 'Zabıta', date: '25 Temmuz', img: 'https://via.placeholder.com/60/5733FF/FFFFFF?text=P7' },
        { name: 'Can Mert', department: 'Temizlik İşleri', date: '26 Temmuz', img: 'https://via.placeholder.com/60/FF33A1/FFFFFF?text=P8' },
        { name: 'Deniz Sönmez', department: 'İmar Müdürlüğü', date: '26 Temmuz', img: 'https://via.placeholder.com/60/33A1FF/FFFFFF?text=P9' },
        { name: 'Gamze Çelik', department: 'Hukuk İşleri', date: '27 Temmuz', img: 'https://via.placeholder.com/60/A1FF33/FFFFFF?text=P10' },
        { name: 'Fatih Yıldız', department: 'Veteriner İşleri', date: '27 Temmuz', img: 'https://via.placeholder.com/60/FFD700/FFFFFF?text=P11' },
        { name: 'Derya Özdemir', department: 'Sosyal Hizmetler', date: '28 Temmuz', img: 'https://via.placeholder.com/60/800080/FFFFFF?text=P12' },
        { name: 'Umut Duran', department: 'Kültür ve Sanat', date: '28 Temmuz', img: 'https://via.placeholder.com/60/008080/FFFFFF?text=P13' },
        { name: 'Pınar Güneş', department: 'Emlak İstimlak', date: '29 Temmuz', img: 'https://via.placeholder.com/60/FF4500/FFFFFF?text=P14' },
        { name: 'Kaan Demirci', department: 'Yazı İşleri', date: '29 Temmuz', img: 'https://via.placeholder.com/60/8A2BE2/FFFFFF?text=P15' },
    ];

    const birthdaysPerPage = 3; // Sayfa başına 3 doğum günü
    const maxPagesToShow = 5;   // Maksimum 5 sayfa gösterilsin
    let currentPage = 1;

    const birthdayListDiv = document.getElementById('birthday-list');
    const paginationUl = document.getElementById('birthday-pagination');

    function renderBirthdays() {
        birthdayListDiv.innerHTML = ''; // Önceki kartları temizle

        const startIndex = (currentPage - 1) * birthdaysPerPage;
        const endIndex = startIndex + birthdaysPerPage;
        const birthdaysToRender = allBirthdays.slice(startIndex, endIndex);

        birthdaysToRender.forEach(person => {
            const birthdayCard = `
                <div class="birthday-card text-center p-2 border rounded-3 d-flex flex-column align-items-center">
                    <img src="${person.img}" alt="Personel Resmi" class="rounded-circle mb-2 border border-primary border-2" style="width: 60px; height: 60px; object-fit: cover;">
                    <h6 class="fw-bold mb-0">${person.name}</h6>
                    <p class="text-secondary mb-0" style="font-size: 0.85rem;">${person.department}</p>
                    <p class="text-primary fw-bold mb-0" style="font-size: 0.9rem;">${person.date}</p>
                </div>
            `;
            birthdayListDiv.insertAdjacentHTML('beforeend', birthdayCard);
        });
        renderPagination();
    }

    function renderPagination() {
        paginationUl.innerHTML = ''; // Önceki sayfalandırma düğmelerini temizle

        const totalPages = Math.ceil(allBirthdays.length / birthdaysPerPage);
        const effectiveTotalPages = Math.min(totalPages, maxPagesToShow); // Maksimum 5 sayfa

        // "Önceki" düğmesi
        const prevLi = document.createElement('li');
        prevLi.classList.add('page-item');
        if (currentPage === 1) {
            prevLi.classList.add('disabled');
        }
        prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>`;
        prevLi.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                renderBirthdays();
            }
        });
        paginationUl.appendChild(prevLi);

        // Sayfa numaraları
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        // Eğer son sayfa 5'ten azsa, başlangıcı ayarla
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageLi = document.createElement('li');
            pageLi.classList.add('page-item');
            if (i === currentPage) {
                pageLi.classList.add('active');
            }
            pageLi.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            pageLi.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = i;
                renderBirthdays();
            });
            paginationUl.appendChild(pageLi);
        }

        // "Sonraki" düğmesi
        const nextLi = document.createElement('li');
        nextLi.classList.add('page-item');
        if (currentPage === totalPages || totalPages === 0) { // totalPages 0 olduğunda da devre dışı bırak
            nextLi.classList.add('disabled');
        }
        nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>`;
        nextLi.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                renderBirthdays();
            }
        });
        paginationUl.appendChild(nextLi);
    }

    // İlk yüklemede doğum günlerini göster
    renderBirthdays();
});