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

document.addEventListener("DOMContentLoaded", () => {
    // Test verisi
    const personeller = [
        { id: 1, 
          ad: "Tümay", 
          soyad: "AKSAN", 
          dogumTarihi: "1995-08-13", 
          fotoUrl: "/images/dogum_gunu/37604190820-tumay-aksan_3957.jpg" },

        { id: 2, 
          ad: "Yavuz", 
          soyad: "AĞAÇ", 
          dogumTarihi: "1988-03-05", 
          fotoUrl: "/images/dogum_gunu/32980582726-yavuz-a-ac_5843.jpg" },

        { id: 3, 
          ad: "Yavuz", 
          soyad: "AĞAÇ", 
          dogumTarihi: "1992-08-13", 
          fotoUrl: "/images/dogum_gunu/32980582726-yavuz-a-ac_5843.jpg" },

        { id: 4, 
          ad: "Yavuz", 
          soyad: "SULTAN SELİM", 
          dogumTarihi: "1992-08-14", 
          fotoUrl: "/images/dogum_gunu/Selim.jpg" },

        { id: 5, 
          ad: "Fatih", 
          soyad: "SULTAN MEHMET", 
          dogumTarihi: "1990-08-14", 
          fotoUrl: "/images/dogum_gunu/Fatih.jpg" },

          { id: 6, 
            ad: "Zeynep", 
            soyad: "YILMAZ", 
            dogumTarihi: "1995-08-14", 
            fotoUrl: "/images/dogum_gunu/Zeynep.jpg" }
    ];

    const bugun = new Date();
    const ay = String(bugun.getMonth() + 1).padStart(2, "0");
    const gun = String(bugun.getDate()).padStart(2, "0");
    const tarihYazi = bugun.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

    const bugunkuler = personeller.filter(p => {
        const [yil, ayStr, gunStr] = p.dogumTarihi.split("-");
        return ayStr === ay && gunStr === gun;
    });

    const liste = document.getElementById("personelListesi");
    const bosMesaj = document.getElementById("bosMesaj");

    if (bugunkuler.length > 0) {
    bugunkuler.forEach(p => {
        liste.innerHTML += `
            <div class="col-md-4">
                <div class="card p-3 text-center shadow-sm h-100">
                    <img src="${p.fotoUrl}" alt="${p.ad}" class="mx-auto d-block">
                    <h5 class="mt-3">${p.ad} ${p.soyad} </h5>
                    <small class="text-secondary"> ${tarihYazi}</small>
                </div>
            </div>
        `;
    });
    } else {
        bosMesaj.classList.remove("d-none");
    }
});

  // Sayfa yüklendiğinde konfeti patlat
    window.addEventListener('load', () => {
        const duration = 2 * 1000; // 2 saniye
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    });
    // Konfeti patlatma fonksiyonu
function patlatKonfeti() {
    const duration = 1500;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// MutationObserver ile personel eklenmesini izle
// (Bu bölüm kaldırıldı çünkü aşağıda zaten tanımlı)

// Rastgele renk setleri
const renkSetleri = [
    ['#F4A300', '#FFD369', '#FF6B6B'], // turuncu & sarı & kırmızı
    ['#4CAF50', '#81C784', '#A5D6A7'], // yeşil tonları
    ['#2196F3', '#64B5F6', '#90CAF9'], // mavi tonları
    ['#9C27B0', '#BA68C8', '#E1BEE7'], // mor tonları
    ['#E91E63', '#F48FB1', '#F8BBD0']  // pembe tonları
];

// Konfeti patlatma (renkli)
function patlatKonfeti() {
    const renkler = renkSetleri[Math.floor(Math.random() * renkSetleri.length)];
    const duration = 1500;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: renkler
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: renkler
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// MutationObserver ile personel eklenmesini izle
const personelListesi = document.getElementById("personelListesi");

const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            patlatKonfeti();
        }
    }
});

observer.observe(personelListesi, { childList: true });