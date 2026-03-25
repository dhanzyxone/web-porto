// ========== FOCUS CAROUSEL INFINITE LOOP ==========
document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('focusTrack');
    const items = document.querySelectorAll('.focus-carousel-item');
    const prevBtn = document.getElementById('focusPrev');
    const nextBtn = document.getElementById('focusNext');
    const dotsContainer = document.getElementById('focusDots');

    let currentIndex = 2;
    const totalItems = items.length;
    let autoPlay;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    // Update tampilan
    function updateFocus() {
        items.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        updateDots();
        centerActiveItem();
    }

    // Center item aktif
    function centerActiveItem() {
        const container = document.querySelector('.focus-carousel-container');
        const trackEl = document.querySelector('.focus-carousel-track');
        const activeItem = document.querySelector('.focus-carousel-item.active');

        if (activeItem && container && trackEl) {
            const containerWidth = container.offsetWidth;
            const itemWidth = activeItem.offsetWidth;
            const itemLeft = activeItem.offsetLeft;
            let scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);
            if (scrollPosition < 0) scrollPosition = 0;
            trackEl.style.transform = `translateX(-${scrollPosition}px)`;
        }
    }

    // Next slide (infinite loop)
    function nextSlide() {
        if (currentIndex < totalItems - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Kembali ke awal
        }
        updateFocus();
    }

    // Prev slide (infinite loop)
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalItems - 1; // Kembali ke akhir
        }
        updateFocus();
    }

    // Go to slide
    function goToSlide(index) {
        currentIndex = index;
        updateFocus();
    }

    // Create dots
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalItems; i++) {
            const dot = document.createElement('div');
            dot.classList.add('focus-dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i);
                stopAutoPlay();
                startAutoPlay();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = document.querySelectorAll('.focus-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Auto play
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
        if (Math.abs(diff) > 50) {
            if (diff > 0) prevSlide();
            else nextSlide();
        }
        isDragging = false;
        track.style.cursor = 'grab';
        startAutoPlay();
    });

    // ========== TOUCH SWIPE HP ==========
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
        if (Math.abs(diff) > 50) {
            if (diff > 0) prevSlide();
            else nextSlide();
        }
        isDragging = false;
        startAutoPlay();
    });

    // Tombol
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopAutoPlay(); startAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAutoPlay(); startAutoPlay(); });

    // Hover pause
    const carousel = document.querySelector('.focus-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }

    window.addEventListener('resize', () => setTimeout(centerActiveItem, 100));

    // Init
    createDots();
    updateFocus();
    startAutoPlay();
    console.log('✅ Carousel Aktif! Infinite loop');
});

// ========== TYPING EFFECT BERULANG (INFINITE) ==========
document.addEventListener('DOMContentLoaded', function () {
    const texts = [
        "Halo, Saya Dhaffa Harfansyah",
        "Web Developer & AI Enthusiast",
        "Mahasiswa D4 Bisnis Digital",
        "Vibes Code | Create Impact"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typingText');

    function typeEffect() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeEffect, 500);
            return;
        }

        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }

    if (typingElement) {
        typeEffect();
    }

    console.log('✅ Typing Effect Aktif! Berulang terus');
});

// ========== SKILL ANIMASI SAAT SCROLL ==========
document.addEventListener('DOMContentLoaded', function () {
    const skillSection = document.getElementById('skill');
    const progressBars = document.querySelectorAll('.progress-fill');
    let animated = false;

    function animateSkills() {
        if (animated) return;
        progressBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent') || bar.parentElement.parentElement.querySelector('.skill-percent')?.textContent.replace('%', '') || '80';
            bar.style.width = percent + '%';
        });
        animated = true;
    }

    function resetSkills() {
        progressBars.forEach(bar => {
            bar.style.width = '0%';
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

    if (skillSection) observer.observe(skillSection);
});