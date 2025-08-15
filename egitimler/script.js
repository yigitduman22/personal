document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const documentCards = document.querySelectorAll(".document-card");

    // 🔍 ARAMA
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        documentCards.forEach(card => {
            const title = card.querySelector(".document-title").textContent.toLowerCase();
            const description = card.querySelector(".document-description").textContent.toLowerCase();
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    // 📂 FİLTRELEME
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const filterValue = this.getAttribute("data-filter");
            const searchTerm = searchInput.value.toLowerCase();

            documentCards.forEach(card => {
                const category = card.getAttribute("data-category");
                const title = card.querySelector(".document-title").textContent.toLowerCase();
                const description = card.querySelector(".document-description").textContent.toLowerCase();

                const matchesFilter = (filterValue === "all" || category === filterValue);
                const matchesSearch = (title.includes(searchTerm) || description.includes(searchTerm));

                if (matchesFilter && matchesSearch) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});



// 👁 ÖNİZLEME BUTONU (PDF, Word, Excel)
function previewYouTubeVideo(url) {
    const videoId = url.split("v=")[1];
    const embedUrl = "https://www.youtube.com/embed/" + videoId;

    const previewWindow = window.open("", "Video Önizleme", "width=800,height=600");
    previewWindow.document.write(`
        <html>
            <head>
                <title>Video Önizleme</title>
            </head>
            <body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;background:#000;">
                <iframe width="100%" height="100%" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>
            </body>
        </html>
    `);
}

// Sayfa yüklendiğinde 'Dökümanlar' filtresini uygula
document.addEventListener("DOMContentLoaded", function () {
    const defaultFilter = "training";
    const searchTerm = ""; // Arama kutusu boş

    document.querySelectorAll(".document-card").forEach(card => {
        const category = card.getAttribute("data-category");
        const title = card.querySelector(".document-title").textContent.toLowerCase();
        const description = card.querySelector(".document-description").textContent.toLowerCase();

        const matchesFilter = (category === defaultFilter);
        const matchesSearch = (title.includes(searchTerm) || description.includes(searchTerm));

        if (matchesFilter && matchesSearch) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const target = button.dataset.filter;

            // Yönlendirme için sayfa isimlerini burada belirt
            if (target === "protocol") {
                window.location.href = "/protokoller/protokol.html";
            } else if (target === "document") {
                window.location.href = "/dokumanlar/dokumanlar.html";
            } else if (target === "regulation") {
                window.location.href = "/mevzuatlar/mevzuat.html";
            } else if (target === "training") {
                window.location.href = "/egitimler/egitim.html";
            }
        });
    });
});