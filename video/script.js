document.addEventListener('DOMContentLoaded', function() {
    // --- NAVBAR DROPDOWN SİSTEMİ ---
    const navDropdown = document.querySelector('.nav-dropdown');
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    const dropdownMenu = document.querySelector('.nav-dropdown-menu');

    if (navDropdown && dropdownToggle && dropdownMenu) {
        // Dropdown toggle butonuna tıklama
        dropdownToggle.addEventListener('click', function(e) {
           
            e.stopPropagation();
            
            
            // Profil menüsünü kapat
            const profileMenu = document.getElementById('profileMenu');
            const profileBtn = document.getElementById('profileBtn');
            if (profileMenu && profileBtn) {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
            
            // Dropdown menüyü aç/kapat
            navDropdown.classList.toggle('active');
        });

        // Dropdown menü item'larına tıklama
        const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                
                console.log('Dropdown item clicked:', this.textContent.trim());
                // Burada sayfa yönlendirmesi veya işlem yapılabilir
                
                // Menüyü kapat
                navDropdown.classList.remove('active');
            });
        });

        // Sayfa herhangi bir yerine tıklandığında dropdown'ları kapat
        document.addEventListener('click', function(e) {
            if (!navDropdown.contains(e.target)) {
                navDropdown.classList.remove('active');
            }
        });

        // ESC tuşu ile dropdown'ı kapat
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                navDropdown.classList.remove('active');
            }
        });

        // Dropdown menü hover efektleri
        dropdownMenu.addEventListener('mouseenter', function() {
            // Mouse menü üzerindeyken menüyü açık tut
        });

        dropdownMenu.addEventListener('mouseleave', function() {
            // Mouse menü dışına çıktığında kapat (isteğe bağlı)
            // setTimeout(() => {
            //     navDropdown.classList.remove('active');
            // }, 300);
        });
    }

    // --- PROFİL DROPDOWN SİSTEMİ ---
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');

    if (profileBtn && profileMenu) {
        // Profil butonuna tıklama
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Navbar dropdown'ını kapat
            if (navDropdown) {
                navDropdown.classList.remove('active');
            }
            
            profileMenu.classList.toggle('show');
            profileBtn.classList.toggle('active');
        });

        // Sayfa herhangi bir yerine tıklandığında menüyü kapat
        document.addEventListener('click', function(e) {
            if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
        });

        // Çıkış yap butonuna tıklama
        const logoutBtn = profileMenu.querySelector('.logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                
                if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
                    // Burada çıkış işlemi yapılacak
                    console.log('Çıkış yapılıyor...');
                    // window.location.href = '/logout'; // Gerçek uygulamada bu şekilde yönlendirme yapılır
                }
            });
        }

        // ESC tuşu ile menüyü kapat
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
        });
    }
});
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });
    document.addEventListener('DOMContentLoaded', () => {

    const videoData = {
        'baskan': [
            { title: 'Gebze\'de OFFROAD Heyecanı', embedUrl: 'https://www.youtube.com/embed/qLqYPQgUPEc' },
            { title: 'Gebze\'yi Sağlama Aldık', embedUrl: 'https://www.youtube.com/embed/GWfDmGr6tlg' },
            { title: 'Atık Sonu | End of Waste', embedUrl: 'https://www.youtube.com/embed/eUBQYWMZyH8' },
            { title: 'Yeni Projeler Tanıtımı', embedUrl: 'https://www.youtube.com/embed/sQ_ylQ7hU2M' }
        ],
        'etkinlikler': [
            { title: 'E-Atık | Kent Madenciliği', embedUrl: 'https://www.youtube.com/embed/pAHStsCd9jo' },
            { title: 'Türkiye Panorama II', embedUrl: 'https://www.youtube.com/embed/w_Fou1nFtsQ' },
            { title: 'Çam Şeşi Bırakma, Ormanlarımızı Hep Yaşat', embedUrl: 'https://www.youtube.com/embed/Uy8Z1HOkT1U' }
        ],
        'personel-kurum': [
            { title: 'Personel Eğitim Semineri', embedUrl: 'https://www.youtube.com/embed/video-id-10' },
            { title: 'Yeni Çalışan Oryantasyonu', embedUrl: 'https://www.youtube.com/embed/video-id-11' },
            { title: 'Kurumsal Tanıtım', embedUrl: 'https://www.youtube.com/embed/video-id-12' }
        ],
        'shorts': [
            { title: 'Doğa Manzaraları', embedUrl: 'https://www.youtube.com/embed/short-id-1' },
            { title: 'Şehir Hayatı Kesitleri', embedUrl: 'https://www.youtube.com/embed/short-id-2' },
            { title: 'Lezzetli Tarifler', embedUrl: 'https://www.youtube.com/embed/short-id-3' },
            { title: 'Günlük Anlar', embedUrl: 'https://www.youtube.com/embed/short-id-4' },
            { title: 'Eğlenceli Videolar', embedUrl: 'https://www.youtube.com/embed/short-id-5' },
            { title: 'Teknoloji İpuçları', embedUrl: 'https://www.youtube.com/embed/short-id-6' },
            { title: 'Çocuklarla Zaman', embedUrl: 'https://www.youtube.com/embed/short-id-7' },
            { title: 'Hobi Fikirleri', embedUrl: 'https://www.youtube.com/embed/short-id-8' },
            { title: 'Evcil Hayvanlar', embedUrl: 'https://www.youtube.com/embed/short-id-9' },
            { title: 'Mizah Videoları', embedUrl: 'https://www.youtube.com/embed/short-id-10' }
        ]
    };

    const tabsContainer = document.querySelector('.video-tabs');
    const videoListContainer = document.getElementById('videoListContainer');
    
    function renderVideos(category) {
        videoListContainer.innerHTML = '';
        const videos = videoData.hasOwnProperty(category) ? videoData[category] : [];

        videos.forEach(video => {
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item';
            videoItem.innerHTML = `
                <iframe src="${video.embedUrl}" frameborder="0" allowfullscreen></iframe>
                <h3>${video.title}</h3>
            `;
            videoListContainer.appendChild(videoItem);
        });
    }

    tabsContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const currentActiveTab = document.querySelector('.tab-button.active');
            if (currentActiveTab) {
                currentActiveTab.classList.remove('active');
            }
            event.target.classList.add('active');

            const category = event.target.dataset.category;
            renderVideos(category);
        }
    });

    renderVideos('baskan');
});