document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const documentCards = document.querySelectorAll(".document-card");

    // 📌 SAYFA AÇILIŞ ANİMASYONU
    documentCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

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

// 📥 İNDİRME BUTONU ANİMASYONU
function downloadDocument(fileName, buttonElement) {
    alert(`${fileName} dosyası indiriliyor...`);

    const originalText = buttonElement.innerHTML;

    buttonElement.innerHTML = `
        <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor;">
            <path d="M12,4V2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
        </svg>
        İndiriliyor...
    `;

    setTimeout(() => {
        buttonElement.innerHTML = `
            <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor;">
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
            </svg>
            Tamamlandı
        `;

        setTimeout(() => {
            buttonElement.innerHTML = originalText;
        }, 2000);
    }, 1500);
}

// 👁 ÖNİZLEME BUTONU (PDF, Word, Excel)
function previewDocument(fullUrl) {
    const ext = fullUrl.split('.').pop().toLowerCase();
    let viewerUrl = '';

    if (ext === 'pdf') {
        viewerUrl = fullUrl;
    } 
    else if (['doc', 'docx', 'xls', 'xlsx'].includes(ext)) {
        viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fullUrl)}&embedded=true`;
    } 
    else {
        alert('Bu dosya türü önizlenemiyor.');
        return;
    }

    window.open(viewerUrl, '_blank');
}
// Sayfa yüklendiğinde 'Dökümanlar' filtresini uygula
document.addEventListener("DOMContentLoaded", function () {
    const defaultFilter = "protocol";
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
                window.location.href = "mevzuatlar.html";
            } else if (target === "training") {
                window.location.href = "egitimler.html";
            }
        });
    });
});
