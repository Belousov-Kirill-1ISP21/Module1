
class Slider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.slidesContainer = document.getElementById('slides');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateSlider();
    }

    setupEventListeners() {

        document.querySelectorAll('.next-btn').forEach(btn => {
            btn.addEventListener('click', () => this.next());
        });
        
        document.querySelectorAll('.prev-btn').forEach(btn => {
            btn.addEventListener('click', () => this.prev());
        });


        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });


        setInterval(() => this.next(), 5000);
    }

    next() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlider();
    }

    prev() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }

    updateSlider() {

        this.slidesContainer.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        
 
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new Slider();
});


document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});