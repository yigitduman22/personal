document.addEventListener('DOMContentLoaded', function() {
    
    // =================================================================
    // MEVCUT NAVBAR VE PROFİL DROPDOWN KODLARINIZ OLDUĞU GİBİ KORUNDU
    // =================================================================
    const navDropdown = document.querySelector('.nav-dropdown');
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    const dropdownMenu = document.querySelector('.nav-dropdown-menu');

    if (navDropdown && dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
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
            if (profileBtn && !profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                profileMenu.classList.remove('show');
                profileBtn.classList.remove('active');
            }
        });
        const logoutBtn = profileMenu.querySelector('.logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
                    console.log('Çıkış yapılıyor...');
                }
            });
        }
    }

    // ========================================================
    // GÜNCELLENMİŞ DOĞUM GÜNÜ LİSTELEME VE ETKİLEŞİM KODLARI
    // ========================================================

    // Örnek personel verisi (Departman bilgisi eklendi)
    const personeller = [
        { id: 1, ad: "Tümay", soyad: "AKSAN", dogumTarihi: "1995-08-14", departman: "Bilgi İşlem", fotoUrl: "/images/dogum_gunu/37604190820-tumay-aksan_3957.jpg" },
        { id: 2, ad: "Yavuz", soyad: "AĞAÇ", dogumTarihi: "1992-08-14", departman: "İnsan Kaynakları", fotoUrl: "/images/dogum_gunu/32980582726-yavuz-a-ac_5843.jpg" },
        { id: 3, ad: "Zeynep", soyad: "YILMAZ", dogumTarihi: "1995-08-14", departman: "Mali Hizmetler", fotoUrl: "/images/dogum_gunu/manzara.jpg" },
        { id: 4, ad: "Fatih", soyad: "SULTAN MEHMET", dogumTarihi: "1990-08-14", departman: "Fen İşleri", fotoUrl: "/images/dogum_gunu/Fatih.jpg" },
    ];

    const bugun = new Date();
    const bugunAy = String(bugun.getMonth() + 1).padStart(2, "0");
    const bugunGun = String(bugun.getDate()).padStart(2, "0");

    const bugunDoganlar = personeller.filter(p => {
        const [, ay, gun] = p.dogumTarihi.split("-");
        return ay === bugunAy && gun === bugunGun;
    });

    const listeElementi = document.getElementById("personelListesi");
    const bosMesajElementi = document.getElementById("bosMesaj");

    if (bugunDoganlar.length > 0) {
        bugunDoganlar.forEach(personel => {
            // Yeni kart yapısına uygun HTML oluşturuluyor
            const cardHtml = `
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="birthday-card">
                        <img src="${personel.fotoUrl}" class="card-img-top" alt="${personel.ad} ${personel.soyad}">
                        <div class="card-body">
                            <div>
                                <h5 class="card-title">${personel.ad} ${personel.soyad} <i class="fa-solid fa-cake-candles" style="color: #f39c12;"></i></h5>
                                <p class="card-text">${personel.departman}</p>
                            </div>
                            <button class="btn kutla-btn">
                                <i class="fa-solid fa-gift"></i> Kutla!
                            </button>
                        </div>
                    </div>
                </div>
            `;
            listeElementi.innerHTML += cardHtml;
        });
    } else {
        bosMesajElementi.classList.remove("d-none");
    }

    // "Kutla!" butonlarına tıklama olayını ekle
    document.querySelectorAll('.kutla-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            const card = event.target.closest('.birthday-card');
            patlatKonfeti(card);
        });
    });

    // Belirli bir elementin üzerinden konfeti patlatan fonksiyon
    function patlatKonfeti(element) {
        const rect = element.getBoundingClientRect();
        const x = (rect.left + rect.right) / 2 / window.innerWidth;
        const y = (rect.top + rect.bottom) / 2 / window.innerHeight;

        confetti({
            particleCount: 150,
            spread: 90,
            origin: { x, y },
            colors: ['#f39c12', '#f1c40f', '#e67e22', '#ffffff']
        });
    }
});