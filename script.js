(function () {
    // --- Carousel Logic ---
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (track && prevBtn && nextBtn) {
        const scrollAmount = () => track.querySelector('.screenshot-slot').offsetWidth + 14;

        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });

        function updateButtons() {
            prevBtn.disabled = track.scrollLeft <= 4;
            nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
        }

        track.addEventListener('scroll', updateButtons);
        updateButtons();
        window.addEventListener('resize', updateButtons);
    }

    // --- Language Switcher Logic ---
    const langBtns = document.querySelectorAll('.lang-btn');
    const htmlTag = document.documentElement;

    function setLanguage(lang) {
        if (!lang || (lang !== 'tr' && lang !== 'en')) return;
        
        htmlTag.setAttribute('lang', lang);
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        localStorage.setItem('preferred-lang', lang);
        
        // Update URL without reloading (optional, helps for re-sharing)
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url);
    }

    if (langBtns.length > 0) {
        langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                setLanguage(btn.dataset.lang);
            });
        });

        // Initialize Language priority:
        // 1. URL Parameter (?lang=en)
        // 2. Local Storage (Previous preference)
        // 3. Default (tr)
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        const savedLang = localStorage.getItem('preferred-lang');
        
        const initialLang = (urlLang === 'tr' || urlLang === 'en') ? urlLang : (savedLang || 'en');
        setLanguage(initialLang);
    }
})();
