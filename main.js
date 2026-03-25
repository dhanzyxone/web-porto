// Skill Progress Animation
function initSkillAnimation() {
    const skillSection = document.getElementById('skill');
    const skillItems = document.querySelectorAll('.skill-item');
    let hasAnimated = false;

    // Fungsi untuk mereset animasi
    function resetAnimations() {
        skillItems.forEach(item => {
            const fill = item.querySelector('.progress-fill');
            const percentSpan = item.querySelector('.skill-percent');
            if (fill) fill.style.width = '0%';
            if (percentSpan) percentSpan.textContent = '0%';
        });
        hasAnimated = false;
    }

    // Fungsi untuk menjalankan animasi
    function animateSkills() {
        if (hasAnimated) return;

        skillItems.forEach(item => {
            const percent = item.getAttribute('data-percent');
            const fill = item.querySelector('.progress-fill');
            const percentSpan = item.querySelector('.skill-percent');

            if (fill && percentSpan) {
                // Animasi progress bar
                fill.style.width = percent + '%';

                // Animasi angka persentase
                let currentPercent = 0;
                const duration = 1500; // 1.5 detik
                const interval = 20; // update setiap 20ms
                const step = (percent / duration) * interval;

                const counter = setInterval(() => {
                    currentPercent += step;
                    if (currentPercent >= percent) {
                        currentPercent = percent;
                        clearInterval(counter);
                    }
                    percentSpan.textContent = Math.floor(currentPercent) + '%';
                }, interval);
            }
        });

        hasAnimated = true;
    }

    // Intersection Observer untuk mendeteksi saat skill section terlihat
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Saat masuk viewport, jalankan animasi
                animateSkills();
            } else {
                // Saat keluar viewport, reset animasi
                resetAnimations();
            }
        });
    }, { threshold: 0.3 }); // 30% section terlihat

    if (skillSection) {
        observer.observe(skillSection);
    }
}

// Inisialisasi saat halaman load
document.addEventListener('DOMContentLoaded', function () {
    initSkillAnimation();
});

// Optional: Tambahkan efek hover pada skill item
const style = document.createElement('style');
style.textContent = `
    .skill-item {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
    }
    
    .skill-item:hover {
        transform: translateX(5px);
    }
    
    .skill-item:hover .progress-fill {
        filter: brightness(1.1);
    }
`;
document.head.appendChild(style);