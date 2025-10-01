// Mobile menu toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('active');
});

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');
const fadeInOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeInOnScroll.observe(el));

// Testimonial slider
const dots = document.querySelectorAll('.slider-dot');
const track = document.querySelector('.testimonial-track');

dots.forEach(dot => {
    dot.addEventListener('click', function() {
        const slideIndex = this.getAttribute('data-slide');
        track.style.transform = `translateX(-${slideIndex * 100}%)`;
        
        dots.forEach(d => d.classList.remove('active'));
        this.classList.add('active');
    });
});

// Product category filtering
const categoryBtns = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');

// Mobile scroll indicator functionality
function initMobileScrollIndicator() {
    if (window.innerWidth > 768) return;
    
    const productGrid = document.querySelector('.product-grid');
    const scrollDots = document.querySelectorAll('.scroll-dot');
    
    if (!productGrid || !scrollDots.length) return;
    
    function updateScrollIndicator() {
        const scrollPosition = productGrid.scrollLeft;
        const cards = productGrid.querySelectorAll('.product-card');
        
        if (cards.length === 0) return;
        
        const cardWidth = cards[0].offsetWidth + 20; // width + gap
        const activeIndex = Math.round(scrollPosition / cardWidth);
        
        scrollDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }
    
    // Add click functionality to scroll dots
    scrollDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            const cards = productGrid.querySelectorAll('.product-card');
            if (cards.length > 0) {
                const cardWidth = cards[0].offsetWidth + 20;
                productGrid.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    productGrid.addEventListener('scroll', updateScrollIndicator);
    productGrid.hasScrollListener = true;
}

// Main product category filtering
categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // Update active button
        categoryBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Filter products
        productCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Reinitialize mobile scroll indicator after filtering
        if (window.innerWidth <= 768) {
            setTimeout(initMobileScrollIndicator, 100);
        }
    });
});

// Initialize everything when page loads
window.addEventListener('load', function() {
    // Initialize mobile scroll indicator if on mobile
    if (window.innerWidth <= 768) {
        initMobileScrollIndicator();
    }
});

// Update on window resize
window.addEventListener('resize', function() {
    // Reinitialize mobile scroll indicator when switching to mobile
    if (window.innerWidth <= 768) {
        const productGrid = document.querySelector('.product-grid');
        if (productGrid && !productGrid.hasScrollListener) {
            initMobileScrollIndicator();
        }
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            document.querySelector('nav ul').classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.querySelector('nav ul');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth <= 768 && 
        nav.classList.contains('active') && 
        !nav.contains(event.target) && 
        !menuBtn.contains(event.target)) {
        nav.classList.remove('active');
    }
});



// horizontal scroll for benefit and ingeradients sections//
// Ingredients Slider
const ingredientsTrack = document.querySelector('.ingredients-track');
const ingredientsCards = document.querySelectorAll('.ingredient-card');
const ingredientsDots = document.querySelectorAll('.ingredients-slider .slider-dot');
const ingredientsPrevBtn = document.querySelector('.ingredients-slider .prev-btn');
const ingredientsNextBtn = document.querySelector('.ingredients-slider .next-btn');

// Benefits Slider
const benefitsTrack = document.querySelector('.benefits-track');
const benefitsCards = document.querySelectorAll('.benefit-card');
const benefitsDots = document.querySelectorAll('.benefits-slider .slider-dot');
const benefitsPrevBtn = document.querySelector('.benefits-slider .prev-btn');
const benefitsNextBtn = document.querySelector('.benefits-slider .next-btn');

function initSlider(track, cards, dots, prevBtn, nextBtn) {
    let currentSlide = 0;
    const cardWidth = cards[0].offsetWidth + 30; // width + gap
    const visibleCards = Math.floor(track.offsetWidth / cardWidth);
    const totalSlides = Math.ceil(cards.length / visibleCards);

    function updateSlider() {
        const translateX = -currentSlide * cardWidth * visibleCards;
        track.style.transform = `translateX(${translateX}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Next button
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });

    // Previous button
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // Auto-slide (optional)
    let autoSlide = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000);

    // Pause auto-slide on hover
    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 5000);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const newCardWidth = cards[0].offsetWidth + 30;
        const newVisibleCards = Math.floor(track.offsetWidth / newCardWidth);
        const newTotalSlides = Math.ceil(cards.length / newVisibleCards);
        
        if (currentSlide >= newTotalSlides) {
            currentSlide = newTotalSlides - 1;
        }
        updateSlider();
    });
}

// Initialize both sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (ingredientsTrack) initSlider(ingredientsTrack, ingredientsCards, ingredientsDots, ingredientsPrevBtn, ingredientsNextBtn);
    if (benefitsTrack) initSlider(benefitsTrack, benefitsCards, benefitsDots, benefitsPrevBtn, benefitsNextBtn);
});



//horizontal scroll for why choose us section//
// Why Choose Slider
const whyChooseTrack = document.querySelector('.why-choose-track');
const whyChooseCards = document.querySelectorAll('.feature-card');
const whyChooseDots = document.querySelectorAll('.why-choose-slider .slider-dot');
const whyChoosePrevBtn = document.querySelector('.why-choose-slider .prev-btn');
const whyChooseNextBtn = document.querySelector('.why-choose-slider .next-btn');

// Update the DOMContentLoaded event listener to include Why Choose slider
document.addEventListener('DOMContentLoaded', () => {
    if (ingredientsTrack) initSlider(ingredientsTrack, ingredientsCards, ingredientsDots, ingredientsPrevBtn, ingredientsNextBtn);
    if (benefitsTrack) initSlider(benefitsTrack, benefitsCards, benefitsDots, benefitsPrevBtn, benefitsNextBtn);
    if (whyChooseTrack) initSlider(whyChooseTrack, whyChooseCards, whyChooseDots, whyChoosePrevBtn, whyChooseNextBtn);
});


// Simple scroll functionality for the horizontal slider
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.certifications-horizontal-container');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dots = document.querySelectorAll('.dot');
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    });
  }
  
  // Update dots based on scroll position
  if (container) {
    container.addEventListener('scroll', function() {
      const scrollPos = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const dotIndex = Math.floor((scrollPos / scrollWidth) * dots.length);
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === dotIndex);
      });
    });
  }
  
  // Click on dots to scroll to position
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      const containerWidth = container.clientWidth;
      container.scrollTo({ left: index * containerWidth, behavior: 'smooth' });
    });
  });
});