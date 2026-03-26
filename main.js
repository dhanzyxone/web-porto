// ========== DATA ORGANISASI ==========
const organizationData = {
    halcom: {
        title: "PT. Halcom Integrated Solution",
        role: "Junior Project Manager",
        description: "Bertanggung jawab dalam mengelola proyek IT, koordinasi tim pengembang, monitoring progress proyek, dan memastikan deliverables sesuai dengan timeline. Berhasil menyelesaikan 3 proyek dengan tingkat kepuasan klien 95%.",
        date: "Januari - Februari 2026",
        tags: ["Project Management", "Agile", "Team Coordination", "Client Handling"],
        logo: "PT Halcom.png"
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

// ========== TYPING EFFECT (BERULANG TERUS) ==========
document.addEventListener('DOMContentLoaded', function () {
    const texts = [
        "Halo, Saya Dhaffa Harfansyah",
        "Web Developer & AI Enthusiast",
        "Vibes Code | Create Impact"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typingText');

    function typeEffect() {
        if (!typingElement) return;

        const currentText = texts[textIndex];

        if (isDeleting) {
            // Menghapus karakter
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Mengetik karakter
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        // Jika sudah selesai mengetik
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }

        // Jika sudah selesai menghapus
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeEffect, 500);
            return;
        }

        // Kecepatan mengetik/menghapus
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }

    typeEffect();
    console.log('✅ Typing Effect Aktif!');
});

// ========== SKILL ANIMASI (AKTIF SAAT SCROLL) ==========
document.addEventListener('DOMContentLoaded', function () {
    const skillSection = document.getElementById('skill');
    const fills = document.querySelectorAll('.progress-fill');
    const percentSpans = document.querySelectorAll('.skill-percent');
    let animated = false;

    function animateSkills() {
        if (animated) return;

        fills.forEach((fill, index) => {
            const targetPercent = parseInt(fill.getAttribute('data-percent'));
            if (isNaN(targetPercent)) return;

            // Animate progress bar
            fill.style.width = targetPercent + '%';

            // Animate angka persen
            let currentPercent = 0;
            const duration = 1200;
            const interval = 20;
            const step = (targetPercent / duration) * interval;

            const counter = setInterval(() => {
                currentPercent += step;
                if (currentPercent >= targetPercent) {
                    currentPercent = targetPercent;
                    clearInterval(counter);
                }
                if (percentSpans[index]) {
                    percentSpans[index].textContent = Math.floor(currentPercent) + '%';
                }
            }, interval);
        });

        animated = true;
    }

    function resetSkills() {
        fills.forEach(fill => {
            fill.style.width = '0%';
        });
        percentSpans.forEach(span => {
            span.textContent = '0%';
        });
        animated = false;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
            } else {
                resetSkills();
            }
        });
    }, { threshold: 0.3 });

    if (skillSection) {
        observer.observe(skillSection);
    }

    console.log('✅ Skill Animasi Aktif!');
});

// ========== CIRCULAR CAROUSEL INFINITE LOOP ==========
document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('orgCircularTrack');
    const cards = document.querySelectorAll('.org-circular-card');
    const prevBtn = document.getElementById('orgPrev');
    const nextBtn = document.getElementById('orgNext');
    const indicatorsContainer = document.getElementById('orgIndicators');
    const modal = document.getElementById('orgModal');
    const closeModal = document.getElementById('closeModal');

    if (!track || cards.length === 0) return;

    let currentIndex = 2;
    const totalCards = cards.length;
    let autoPlay;
    let startX = 0, currentX = 0, isDragging = false;
    let cardWidth = 110;

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

    function updateTrackPosition() {
        cardWidth = getCardWidth();
        const container = document.querySelector('.org-circular-wrapper');
        if (!container) return;

        const containerWidth = container.offsetWidth;
        const centerOffset = (containerWidth / 2) - (cardWidth / 2);
        const scrollPosition = (currentIndex * cardWidth) - centerOffset;

        track.style.transform = `translateX(-${Math.max(0, scrollPosition)}px)`;
    }

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

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateActive();
        updateTrackPosition();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateActive();
        updateTrackPosition();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateActive();
        updateTrackPosition();
    }

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

    // Drag mouse
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

        // Touch swipe
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

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const orgId = card.getAttribute('data-org');
            showModal(orgId);
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            startAutoPlay();
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                startAutoPlay();
            }
        });
    }

    createIndicators();
    updateActive();
    setTimeout(() => {
        updateTrackPosition();
    }, 100);
    startAutoPlay();

    console.log('✅ Circular Carousel Aktif! Total ' + totalCards + ' logo');
});

// ========== TOMBOL KENALAN ==========
document.addEventListener('DOMContentLoaded', function () {
    const greetBtn = document.getElementById('greetBtn');
    if (greetBtn) {
        greetBtn.addEventListener('click', function () {
            alert("Hai! Terima kasih sudah mampir 👋\nSaya Dhaffa, senang berkenalan denganmu! Yuk kolaborasi buat project keren 🚀");
        });
    }
});

// ========== SMOOTH SCROLL ==========
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ========== SECTION FADE IN ==========
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

console.log('✅ Website siap! Semua animasi berjalan dengan baik');