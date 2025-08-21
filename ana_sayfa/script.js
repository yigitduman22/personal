// Galeri fotoğrafları array'i - Başlık ve açıklamalarla
const detayGorseller = [
    {
        resim: "/images/8-mart-dunya-kadinlar-gunu-programi_8383.jpg",
        baslik: "8 Mart Dünya Kadınlar Günü Programı",
        aciklama: "Kadın personelimizin özel günü kutlandı"
    },
    {
        resim: "/images/24-kas-m-o-retmenler-gunu_2947.jpg",
        baslik: "24 Kasım Öğretmenler Günü Ziyareti",
        aciklama: "Öğretmenlerimizi unutmadık"
    },
    {
        resim: "/images/personel-bayramla-ma-programi_5965.jpg",
        baslik: "Personel Bayramlaşma Programı",
        aciklama: "Geleneksel bayram buluşması"
    },
    {
        resim: "/images/personel-ftar-program_109.jpg",
        baslik: "Personel İftar Programı",
        aciklama: "Ramazan birlikteliği"
    },
    {
        resim: "/images/personel-p-kn-k-programi_9118.jpg",
        baslik: "Personel Piknik Programı",
        aciklama: "Doğayla baş başa keyifli anlar"
    },
    {
        resim: "/images/personellerimizin-a-z-ve-di-sa-l-n-onemsiyoruz_7091.jpg",
        baslik: "Ağız ve Diş Sağlığı Taraması",
        aciklama: "Sağlık önceliğimiz"
    },
    {
        resim: "/images/pesonel-ftar-programi_3732.jpg",
        baslik: "İkinci İftar Buluşması",
        aciklama: "Bereketin paylaşıldığı anlar"
    },
    {
        resim: "/images/stajyer-donem-sonu-etk-nl_6028.jpg",
        baslik: "Stajyer Dönem Sonu Etkinliği",
        aciklama: "Başarılı staj dönemi sona erdi"
    },
    {
        resim: "/images/stajyer-f-lm-okuma-programi_3604.jpg",
        baslik: "Stajyer Film Okuma Programı",
        aciklama: "Kültürel gelişim etkinlikleri"
    },
    {
        resim: "/images/stajyer-o-renci-oryantasyonu_2177.jpg",
        baslik: "Stajyer Öğrenci Oryantasyonu",
        aciklama: "Yeni dönem hazırlıkları"
    },
    {
        resim: "/images/stajyer-oryantasyon-e-t-m_8697.jpg",
        baslik: "Stajyer Oryantasyon Eğitimi",
        aciklama: "Kapsamlı eğitim programı"
    },
    {
        resim: "/images/ulusal-da-bisikleti-kupas-yar-lar_128.jpg",
        baslik: "Ulusal Dağ Bisikleti Kupası",
        aciklama: "Heyecan dolu yarışlar"
    }
];

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
            
                stopAutoSlide();
                showPrevImage();
                setTimeout(resumeAutoSlide, 10000);
            } else if (e.key === 'ArrowRight') {
             
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
    
    // --- YENİ EKLENEN DUYURULAR VE SAYFALANDIRMA SİSTEMİ ---
    // Örnek Duyuru Verileri (Toplam 15 adet, 5 sayfa eder)
    const tumDuyurular = [
        { resim: '/images/stajyer-oryantasyon-e-t-m_8697.jpg', baslik: 'Stajyer Oryantasyon Eğitimi Tamamlandı', aciklama: 'Belediyemizde yeni döneme başlayan stajyer öğrencilerimiz için oryantasyon programı düzenlendi.' },
        { resim: '/images/personel-bayramla-ma-programi_5965.jpg', baslik: 'Geleneksel Bayramlaşma Töreni Gerçekleşti', aciklama: 'Kurban Bayramı vesilesiyle tüm personelimizin katılımıyla coşkulu bir bayramlaşma programı yapıldı.' },
        { resim: '/images/8-mart-dunya-kadinlar-gunu-programi_8383.jpg', baslik: '8 Mart Dünya Kadınlar Günü Kutlandı', aciklama: 'Belediyemizdeki kadın personelimizin Dünya Kadınlar Günü\'nü özel bir etkinlikle kutladık.' },
        { resim: '/images/personel-ftar-program_109.jpg', baslik: 'Personel İftar Programı Büyük İlgi Gördü', aciklama: 'Ramazan ayının manevi atmosferinde personelimizle birlikte iftar sofrasında buluştuk.' },
        { resim: '/images/24-kas-m-o-retmenler-gunu_2947.jpg', baslik: 'Öğretmenler Günü Unutulmadı', aciklama: 'Gebze\'deki öğretmenlerimizi bu özel günlerinde yalnız bırakmadık ve çeşitli ziyaretler gerçekleştirdik.' },
        { resim: '/images/ulusal-da-bisikleti-kupas-yar-lar_128.jpg', baslik: 'Dağ Bisikleti Kupası Gebze\'de Nefes Kesti', aciklama: 'Türkiye Ulusal Dağ Bisikleti Kupası\'nın bir ayağına ev sahipliği yapmanın gururunu yaşadık.' },
        { resim: '/images/personellerimizin-a-z-ve-di-sa-l-n-onemsiyoruz_7091.jpg', baslik: 'Personelimize Ağız ve Diş Sağlığı Taraması', aciklama: 'Çalışanlarımızın sağlığını önemsiyor, düzenli olarak sağlık taramaları gerçekleştiriyoruz.' },
        { resim: '/images/personel-p-kn-k-programi_9118.jpg', baslik: 'Yaz Sezonunu Piknikle Açtık', aciklama: 'Yoğun çalışma temposuna mola vererek tüm birimlerimizin katıldığı bir piknik organizasyonu düzenledik.' },
        { resim: '/images/stajyer-f-lm-okuma-programi_3604.jpg', baslik: 'Stajyerlerle Film Okuma Etkinliği', aciklama: 'Gençlerimizin vizyonunu geliştirmek amacıyla film okuma ve analiz programları düzenliyoruz.' },
        { resim: '/images/pesonel-ftar-programi_3732.jpg', baslik: 'İkinci Geleneksel İftar Buluşması', aciklama: 'Personelimiz ve aileleriyle birlikte Ramazan ayının bereketini paylaştığımız iftar programımız.' },
        { resim: '/images/stajyer-donem-sonu-etk-nl_6028.jpg', baslik: 'Stajyer Dönem Sonu Veda Programı', aciklama: 'Staj dönemini başarıyla tamamlayan öğrencilerimiz için bir veda ve teşekkür etkinliği düzenlendi.' },
        { resim: '/images/stajyer-o-renci-oryantasyonu_2177.jpg', baslik: 'Yeni Stajyerlerimize "Hoş Geldin" Dedik', aciklama: 'Belediye çalışmalarını yakından tanımaları için yeni stajyerlerimize yönelik bir oryantasyon yapıldı.' },
        { resim: '/images/8-mart-dunya-kadinlar-gunu-programi_8383.jpg', baslik: 'Kadın Personelimize Özel İkramlar', aciklama: '8 Mart kapsamında belediyemizdeki tüm kadın çalışanlarımıza küçük bir jest hazırladık.' },
        { resim: '/images/personel-bayramla-ma-programi_5965.jpg', baslik: 'Ramazan Bayramı Buluşması', aciklama: 'Ramazan Bayramı dolayısıyla personelimizle bir araya gelerek bayramlaştık.' },
        { resim: '/images/personel-ftar-program_109.jpg', baslik: 'Birlik ve Beraberlik İftarı', aciklama: 'İftar programımız, personelimiz arasındaki birlik ve beraberliği pekiştirdi.' },
    ];

    const duyurularListesi = document.getElementById('duyurular-listesi');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const sayfaBilgisi = document.getElementById('sayfa-bilgisi');

    if (duyurularListesi && prevButton && nextButton && sayfaBilgisi) {
        let gecerliSayfa = 1;
        const duyuruSayisiSayfaBasi = 5;
        const toplamSayfa = Math.min(5, Math.ceil(tumDuyurular.length / duyuruSayisiSayfaBasi)); // En fazla 5 sayfa olacak

        // Duyuruları sayfaya göre render eden fonksiyon
        function renderDuyurular() {
            // Mevcut listeyi temizle
            duyurularListesi.innerHTML = '';

            // Gösterilecek duyuruların başlangıç ve bitiş indeksini hesapla
            const baslangic = (gecerliSayfa - 1) * duyuruSayisiSayfaBasi;
            const bitis = baslangic + duyuruSayisiSayfaBasi;
            const gosterilecekDuyurular = tumDuyurular.slice(baslangic, bitis);

            // Her bir duyuru için HTML oluştur ve listeye ekle
            gosterilecekDuyurular.forEach(duyuru => {
                const duyuruElementi = `
                    <a href="#" class="duyuru-item">
                        <img src="${duyuru.resim}" alt="${duyuru.baslik}" class="duyuru-resim">
                        <div class="duyuru-icerik">
                            <h3 class="duyuru-baslik">${duyuru.baslik}</h3>
                            <p class="duyuru-aciklama">${duyuru.aciklama}</p>
                        </div>
                    </a>
                `;
                duyurularListesi.innerHTML += duyuruElementi;
            });

            // Sayfalandırma kontrollerini güncelle
            updatePaginationControls();
        }

        // Sayfalandırma butonlarını ve bilgi metnini güncelleyen fonksiyon
        function updatePaginationControls() {
            sayfaBilgisi.textContent = `Sayfa ${gecerliSayfa} / ${toplamSayfa}`;
            prevButton.disabled = gecerliSayfa === 1;
            nextButton.disabled = gecerliSayfa === toplamSayfa;
        }

        // Önceki sayfa butonuna tıklama olayı
        prevButton.addEventListener('click', () => {
            if (gecerliSayfa > 1) {
                gecerliSayfa--;
                renderDuyurular();
            }
        });

        // Sonraki sayfa butonuna tıklama olayı
        nextButton.addEventListener('click', () => {
            if (gecerliSayfa < toplamSayfa) {
                gecerliSayfa++;
                renderDuyurular();
            }
        });

        // Sayfa ilk yüklendiğinde ilk 3 duyuruyu göster
        if(toplamSayfa > 0) {
            renderDuyurular();
        }
    }
        document.addEventListener('DOMContentLoaded', function() {
            const dropdowns = document.querySelectorAll('.nav-dropdown');
            
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('mouseenter', () => {
                    dropdown.classList.add('active');
                });
                
                dropdown.addEventListener('mouseleave', () => {
                    dropdown.classList.remove('active');
                });
            });
        });
});