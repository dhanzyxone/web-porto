// ========== DATA ORGANISASI (LENGKAP DENGAN INFORMASI) ==========
const organizationData = {
    halcom: {
        title: "PT. Halcom Integrated Solution",
        role: "Junior Project Manager",
        description: "Bertanggung jawab dalam mengelola proyek IT, koordinasi tim pengembang, monitoring progress proyek, dan memastikan deliverables sesuai dengan timeline. Berhasil menyelesaikan 3 proyek dengan tingkat kepuasan klien 95%.",
        date: "2024 - Sekarang",
        tags: ["Project Management", "Agile", "Team Coordination", "Client Handling"],
        logo: " Januari - Februari 2026 - PT Halcom.png"
    },
    hydtech: {
        title: "Hydtech",
        role: "Junior Web Developer, AI, and Data Scientist",
        description: "Mengembangkan aplikasi web berbasis AI, mengimplementasikan model machine learning untuk prediksi data, dan melakukan analisis data untuk mendukung keputusan bisnis. Berkontribusi dalam pengembangan 5+ fitur AI.",
        date: "2026",
        tags: ["Web Development", "AI/ML", "Data Science", "Python"],
        logo: "Hydtech.png"
    },
    dangau: {
        title: "Dangau Studio",
        role: "Event Organizer",
        description: "Mengorganisir berbagai acara kreatif seperti workshop, pameran seni, dan konser musik. Berhasil menyelenggarakan 8+ event dengan total peserta 2000+ orang. Mengelola tim volunteer dan koordinasi dengan vendor.",
        date: "2025 - Sekarang",
        tags: ["Event Planning", "Team Management", "Vendor Coordination", "Creative Direction"],
        logo: "Dangau.jpg"
    },
    diktisaintek: {
        title: "Dikti Saintek",
        role: "Relawan Sosial",
        description: "Berpartisipasi dalam program pengabdian masyarakat, mengajar di daerah terpencil, dan membantu distribusi bantuan sosial. Berhasil menjangkau 5 desa binaan dengan program edukasi dan kesehatan.",
        date: "2025 - Sekarang",
        tags: ["Social Work", "Community Service", "Education", "Humanitarian"],
        logo: "Diktisaintek.jpg"
    },
    hipmi: {
        title: "Himpunan Pengusaha Muda Indonesia (HIPMI) PT Sumbar",
        role: "Kompartemen External",
        description: "Mengelola komunikasi publik dan media sosial organisasi, membuat konten kreatif, membangun branding, dan meningkatkan engagement. Berhasil meningkatkan followers sebesar 150% dalam 6 bulan.",
        date: "2025 - 2028",
        tags: ["Public Relations", "Social Media", "Content Creation", "Branding"],
        logo: "Hipmi PT sumbar.jpg"
    },
    hipmi_pnp: {
        title: "Himpunan Pengusaha Muda Indonesia (HIPMI) PT PNP",
        role: "Public Relations Specialist",
        description: "Menjalin hubungan dengan media, menyusun press release, mengelola komunikasi eksternal, dan membangun networking dengan mitra. Berhasil menjalin kerjasama dengan 10+ perusahaan mitra.",
        date: "2024 - 2026",
        tags: ["Public Relations", "Media Relations", "Networking", "Communication"],
        logo: "Hipmi PT PNP.jpg"
    },
    rubik: {
        title: "Rubik (Ruang Bisnis dan Kewirausahaan)",
        role: "Social Media Management",
        description: "Mengelola akun media sosial, merencanakan konten strategis, menganalisis engagement, dan meningkatkan brand awareness. Berhasil meningkatkan engagement rate sebesar 200%.",
        date: "2025 - Sekarang",
        tags: ["Social Media", "Content Strategy", "Analytics", "Digital Marketing"],
        logo: "Rubik.jpg"
    },
    ruangrasa: {
        title: "Ruang Rasa Ruang Budaya",
        role: "Event Organizer",
        description: "Mengorganisir acara seni dan budaya, pameran, pertunjukan musik, dan diskusi budaya. Berhasil menyelenggarakan 12+ acara dengan total pengunjung 3000+ orang.",
        date: "Periode Februari - Maret 2026",
        tags: ["Event Organizer", "Art & Culture", "Community Building", "Creative"],
        logo: "ruangrasaruangbudaya.jpg"
    }
};

// ========== CIRCULAR CAROUSEL INFINITE LOOP (FOKUS TENGAH) ==========
document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('orgCircularTrack');
    const cards = document.querySelectorAll('.org-circular-card');
    const prevBtn = document.getElementById('orgPrev');
    const nextBtn = document.getElementById('orgNext');
    const indicatorsContainer = document.getElementById('orgIndicators');
    const modal = document.getElementById('orgModal');
    const closeModal = document.getElementById('closeModal');

    if (!track || cards.length === 0) return;

    let currentIndex = 2; // Mulai dari index tengah
    const totalCards = cards.length;
    let autoPlay;
    let startX = 0, currentX = 0, isDragging = false;
    let cardWidth = 110; // Default width + gap

    // Hitung lebar card + gap
    function getCardWidth() {
        const firstCard = cards[0];
        if (firstCard) {
            const style = getComputedStyle(firstCard);
            const marginLeft = parseFloat(style.marginLeft) || 0;
            const marginRight = parseFloat(style.marginRight) || 0;
            return firstCard.offsetWidth + marginLeft + marginRight + 20;
        }
        return 110;
    }

    // Update posisi track agar card aktif berada di tengah
    function updateTrackPosition() {
        cardWidth = getCardWidth();
        const container = document.querySelector('.org-circular-wrapper');
        if (!container) return;

        const containerWidth = container.offsetWidth;
        const centerOffset = (containerWidth / 2) - (cardWidth / 2);
        const scrollPosition = (currentIndex * cardWidth) - centerOffset;

        track.style.transform = `translateX(-${Math.max(0, scrollPosition)}px)`;
    }

    // Update active class (hanya satu yang aktif)
    function updateActive() {
        cards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        updateIndicators();
    }

    // Update indicators dots
    function updateIndicators() {
        if (!indicatorsContainer) return;
        const dots = indicatorsContainer.querySelectorAll('.org-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Buat indicators
    function createIndicators() {
        if (!indicatorsContainer) return;
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < totalCards; i++) {
            const dot = document.createElement('div');
            dot.classList.add('org-dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i);
                stopAutoPlay();
                startAutoPlay();
            });
            indicatorsContainer.appendChild(dot);
        }
    }

    // Next slide (infinite loop)
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateActive();
        updateTrackPosition();
    }

    // Prev slide (infinite loop)
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateActive();
        updateTrackPosition();
    }

    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateActive();
        updateTrackPosition();
    }

    // Auto play setiap 3 detik
    function startAutoPlay() {
        if (autoPlay) clearInterval(autoPlay);
        autoPlay = setInterval(() => {
            nextSlide();
        }, 3000);
    }

    function stopAutoPlay() {
        if (autoPlay) {
            clearInterval(autoPlay);
            autoPlay = null;
        }
    }

    // ========== DRAG GESER ==========
    if (track) {
        track.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            startX = e.clientX;
            track.style.cursor = 'grabbing';
            stopAutoPlay();
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentX = e.clientX;
        });

        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            const diff = currentX - startX;
            if (Math.abs(diff) > 30) {
                if (diff > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
            }
            isDragging = false;
            track.style.cursor = 'grab';
            startAutoPlay();
        });

        // Touch swipe untuk HP
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoPlay();
        });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        track.addEventListener('touchend', () => {
            if (!isDragging) return;
            const diff = currentX - startX;
            if (Math.abs(diff) > 30) {
                if (diff > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
            }
            isDragging = false;
            startAutoPlay();
        });
    }

    // Tombol navigasi
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }

    // Hover pause
    const container = document.querySelector('.org-circular-container');
    if (container) {
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);
    }

    // Resize handler
    window.addEventListener('resize', () => {
        setTimeout(updateTrackPosition, 100);
    });

    // ========== MODAL POPUP ==========
    function showModal(orgId) {
        const data = organizationData[orgId];
        if (!data || !modal) return;

        const modalLogoImg = document.getElementById('modalLogoImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalRole = document.getElementById('modalRole');
        const modalDesc = document.getElementById('modalDesc');
        const modalDate = document.getElementById('modalDate');
        const modalTags = document.getElementById('modalTags');

        if (modalLogoImg) {
            modalLogoImg.src = data.logo;
            modalLogoImg.onerror = function () {
                this.src = 'https://placehold.co/120x120/2563eb/white?text=Logo';
            };
            modalLogoImg.alt = data.title;
        }
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalRole) modalRole.textContent = data.role;
        if (modalDesc) modalDesc.textContent = data.description;
        if (modalDate) modalDate.innerHTML = `<i class="fas fa-calendar-alt"></i> ${data.date}`;

        if (modalTags && data.tags) {
            modalTags.innerHTML = data.tags.map(tag => `<span>#${tag}</span>`).join('');
        }

        modal.classList.add('active');
        stopAutoPlay();
    }

    // Event klik pada card
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const orgId = card.getAttribute('data-org');
            showModal(orgId);
        });
    });

    // Tutup modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            startAutoPlay();
        });
    }

    // Tutup modal dengan klik di luar
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                startAutoPlay();
            }
        });
    }

    // Inisialisasi
    createIndicators();
    updateActive();
    setTimeout(() => {
        updateTrackPosition();
    }, 100);
    startAutoPlay();

    console.log('✅ Circular Carousel Aktif! Total ' + totalCards + ' logo');
});