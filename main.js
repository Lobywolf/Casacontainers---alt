document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        event.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const siteHeader = document.querySelector('header');
let previousScrollPosition = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition <= 24) {
        siteHeader.classList.remove('header--visible');
        siteHeader.classList.remove('header--hidden');
    } else if (currentScrollPosition > previousScrollPosition) {
        siteHeader.classList.add('header--hidden');
        siteHeader.classList.remove('header--visible');
    } else {
        siteHeader.classList.add('header--visible');
        siteHeader.classList.remove('header--hidden');
    }

    previousScrollPosition = currentScrollPosition;
}, { passive: true });

const reelsTrack = document.getElementById('reels-track');
const instagramProfile = 'https://www.instagram.com/casascontainersmcl/';
const previewReels = [
    {
        title: 'Diseños que se adaptan',
        preview: 'Conoce una casa pensada para disfrutar cada espacio.',
        likes: '454 Me gusta',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Así construimos tu casa',
        preview: 'Te mostramos parte del proceso y nuestras terminaciones.',
        likes: '1.166 Me gusta',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Proyectos terminados',
        preview: 'Mira el resultado final de nuestros proyectos modulares.',
        likes: '738 Me gusta',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80'
    }
];

previewReels.forEach(reel => {
    const reelCard = document.createElement('a');
    reelCard.className = 'reel-card';
    reelCard.href = instagramProfile;
    reelCard.target = '_blank';
    reelCard.rel = 'noopener';
    reelCard.innerHTML = `<div class="reel-profile"><img src="img/LOGO_OFICIAL-scaled-97x97.png" alt=""><strong>containershome.cl</strong><span aria-hidden="true">•••</span></div><div class="reel-media" style="background-image: url('${reel.image}')"><span class="reel-play" aria-hidden="true">▶</span></div><div class="reel-content"><div class="reel-likes" aria-label="${reel.likes}"><span aria-hidden="true">♡</span>${reel.likes}</div><strong>${reel.title}</strong><p>${reel.preview}</p><span>Ver más en Instagram ↗</span></div>`;
    reelsTrack.appendChild(reelCard);
});

document.querySelectorAll('.reels-control').forEach(control => {
    control.addEventListener('click', () => {
        const reel = reelsTrack.querySelector('.reel-card');
        reelsTrack.scrollBy({
            left: Number(control.dataset.direction) * (reel.offsetWidth + 18),
            behavior: 'smooth'
        });
    });
});
