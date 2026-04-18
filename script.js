// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements that need to animate
    const animateElements = document.querySelectorAll('.fade-in-up, .fade-in, .slide-in-left, .slide-in-right');
    animateElements.forEach(el => observer.observe(el));

    // --- AJAX Form Submission & Toast ---
    const ecoForm = document.querySelector('.eco-form');
    const successToast = document.getElementById('successToast');
    const closeToastBtn = document.getElementById('closeToast');

    if (ecoForm) {
        ecoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = ecoForm.querySelector('.btn-network');
            const originalText = btn.innerText;
            btn.innerText = "Sisteme İletiliyor...";
            btn.disabled = true;

            fetch(ecoForm.action, {
                method: 'POST',
                body: new FormData(ecoForm),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    successToast.classList.add('show');
                    ecoForm.reset();
                    setTimeout(() => {
                        successToast.classList.remove('show');
                    }, 6000);
                } else {
                    alert("Ağa bağlanırken bir hata oluştu.");
                }
            }).catch(error => {
                alert("Bağlantı hatası lütfen tekrar deneyin.");
            }).finally(() => {
                btn.innerText = originalText;
                btn.disabled = false;
            });
        });
    }

    if (closeToastBtn) {
        closeToastBtn.addEventListener('click', () => {
            successToast.classList.remove('show');
        });
    }

});
