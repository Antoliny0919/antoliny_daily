window.addEventListener('load', function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.dataset.animation === 'highlight') {
                    entry.target.classList.replace('before:w-0', 'before:w-full');
                }
            }
        })
    }, observerOptions)

    const highlightElements = document.querySelectorAll('[data-animation="highlight"]');
    highlightElements.forEach(element => {
        const color = element.dataset.highlightColor;
        let light_from = '';
        let light_to = '';
        let dark_from = '';
        let dark_to = '';
        if (color) {
            [light_from, light_to, dark_from, dark_to] = color.split(',');
        }
        element.classList.add(
            ...[
                'highlight',
                'before:w-0',
                light_from && `before:from-${light_from}!`,
                light_to && `before:to-${light_to}!`,
                dark_from && `dark:before:from-${dark_from}`,
                dark_to && `dark:before:from-${dark_to}`,
            ].filter(Boolean),
        );
        observer.observe(element);
    });
});
