let currentIndex = 0;
const slides = document.querySelectorAll('.slide');

// Create thumbnails dynamically for all slides
const thumbnailsContainer = document.querySelector('.thumbnails');
thumbnailsContainer.innerHTML = ''; // Clear existing thumbnails

slides.forEach((slide, index) => {
    const img = slide.querySelector('img');
    const thumbnail = document.createElement('img');
    thumbnail.src = img.src;
    thumbnail.alt = img.alt + ' thumbnail';
    thumbnail.onclick = () => currentSlide(index);
    if (index === 0) thumbnail.classList.add('active');
    thumbnailsContainer.appendChild(thumbnail);
});

const thumbnails = document.querySelectorAll('.thumbnails img');

function showSlide(index) {
    if (index >= slides.length) currentIndex = 0;
    if (index < 0) currentIndex = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    slides[currentIndex].classList.add('active');
    thumbnails[currentIndex].classList.add('active');

    // Scroll both the main slide and thumbnail into view
    const activeSlide = slides[currentIndex];
    const activeThumb = thumbnails[currentIndex];
    
    // Scroll main slide into view
    activeSlide.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });

    // Scroll thumbnail into center view
    const containerWidth = thumbnailsContainer.offsetWidth;
    const thumbWidth = activeThumb.offsetWidth;
    const scrollLeft = activeThumb.offsetLeft - (containerWidth/2) + (thumbWidth/2);
    
    thumbnailsContainer.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
    });
}

function changeSlide(direction) {
    currentIndex += direction;
    showSlide(currentIndex);
}

function currentSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
}

// Handle mouse wheel scroll
document.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        changeSlide(1); // Scroll down - next slide
    } else {
        changeSlide(-1); // Scroll up - previous slide
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const thumbnailsContainer = document.querySelector('.thumbnails');
    const thumbPrev = document.querySelector('.thumb-prev');
    const thumbNext = document.querySelector('.thumb-next');
    
    // Scroll amount for each click (adjust as needed)
    const scrollAmount = 200;

    thumbPrev.addEventListener('click', () => {
        thumbnailsContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    thumbNext.addEventListener('click', () => {
        thumbnailsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
});