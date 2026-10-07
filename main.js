document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        event.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('.model-card').forEach(card => {
    const navigateToContact = event => {
        if (event.target.closest('a')) return;
        event.preventDefault();
        document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });
    };

    card.addEventListener('click', navigateToContact);
    card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            navigateToContact(event);
        }
    });
});

document.querySelectorAll('[data-before-after]').forEach(comparison => {
    const slider = comparison.querySelector('.before-after__range');

    slider.addEventListener('input', () => {
        comparison.style.setProperty('--comparison-position', `${slider.value}%`);
    });
});

document.querySelectorAll('[data-project-gallery]').forEach(gallery => {
    const projects = {
        nogal: {
            name: 'Casa El Nogal',
            images: [
                'img/nogal/nogal-1.jpeg',
                'img/nogal/nogal-2.jpeg',
                'img/nogal/nogal-3.jpeg',
                'img/nogal/nogal-4.jpeg',
                'img/nogal/nogal-5.jpeg'
            ]
        },
        alerce: {
            name: 'Casa Lo Alerce',
            images: [
                'img/alerce/lo-alerce-1.jpeg',
                'img/alerce/lo-alerce-2.jpeg',
                'img/alerce/lo-alerce-2 (1).jpeg',
                'img/alerce/lo-alerce-4.jpeg',
                'img/alerce/lo-alerce-7.jpeg'
            ]
        },
        roble: {
            name: 'Casa El Roble',
            images: [
                'img/roble/El-Roble-1.jpeg',
                'img/roble/El-Roble-2.jpeg',
                'img/roble/El-Roble-3.jpeg',
                'img/roble/El-Roble-4.jpeg',
                'img/roble/El-Roble-5.jpeg'
            ]
        }
    };
    const mainImage = gallery.querySelector('.project-gallery__main-image');
    const counter = gallery.querySelector('.project-gallery__counter');
    const thumbnails = gallery.querySelector('.project-gallery__thumbnails');
    const stage = gallery.querySelector('.project-gallery__stage');
    let currentProject = gallery.dataset.project;
    let currentImage = 0;
    let dragStartX = null;

    const showImage = (index, direction = 'next') => {
        const project = projects[currentProject];
        currentImage = (index + project.images.length) % project.images.length;
        const source = project.images[currentImage];
        mainImage.classList.remove('is-sliding-next', 'is-sliding-previous');
        mainImage.src = source;
        void mainImage.offsetWidth;
        mainImage.classList.add(direction === 'previous' ? 'is-sliding-previous' : 'is-sliding-next');
        mainImage.alt = `${project.name}, fotografía ${currentImage + 1} de ${project.images.length}`;
        counter.textContent = `${currentImage + 1} / ${project.images.length}`;
        thumbnails.replaceChildren(...project.images.map((image, imageIndex) => {
            const button = document.createElement('button');
            const thumbnail = document.createElement('img');
            button.className = `project-gallery__thumbnail${imageIndex === currentImage ? ' is-active' : ''}`;
            button.type = 'button';
            button.setAttribute('aria-label', `Ver foto ${imageIndex + 1} de ${project.name}`);
            button.setAttribute('aria-current', imageIndex === currentImage ? 'true' : 'false');
            thumbnail.src = image;
            thumbnail.alt = '';
            thumbnail.loading = 'lazy';
            button.append(thumbnail);
            button.addEventListener('click', () => showImage(imageIndex, imageIndex < currentImage ? 'previous' : 'next'));
            return button;
        }));
    };

    gallery.querySelectorAll('.project-gallery__tab').forEach(tab => {
        tab.addEventListener('click', () => {
            currentProject = tab.dataset.project;
            gallery.dataset.project = currentProject;
            gallery.querySelectorAll('.project-gallery__tab').forEach(projectTab => {
                const isActive = projectTab === tab;
                projectTab.classList.toggle('is-active', isActive);
                projectTab.setAttribute('aria-pressed', String(isActive));
            });
            showImage(0, 'next');
        });
    });

    gallery.querySelector('.project-gallery__arrow--previous').addEventListener('click', () => showImage(currentImage - 1, 'previous'));
    gallery.querySelector('.project-gallery__arrow--next').addEventListener('click', () => showImage(currentImage + 1, 'next'));

    stage.addEventListener('pointerdown', event => {
        if (event.target.closest('button') || event.button !== 0) return;
        dragStartX = event.clientX;
        stage.classList.add('is-dragging');
        stage.setPointerCapture(event.pointerId);
    });

    stage.addEventListener('pointerup', event => {
        if (dragStartX === null) return;
        const dragDistance = event.clientX - dragStartX;
        dragStartX = null;
        stage.classList.remove('is-dragging');
        if (Math.abs(dragDistance) < 45) return;
        const direction = dragDistance < 0 ? 'next' : 'previous';
        showImage(currentImage + (direction === 'next' ? 1 : -1), direction);
    });

    stage.addEventListener('pointercancel', () => {
        dragStartX = null;
        stage.classList.remove('is-dragging');
    });

    showImage(0);
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
