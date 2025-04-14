document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bg-music");
    const musicButton = document.getElementById("music-btn");
    
    // Typing animation for hero text
    const textElement = document.getElementById("typing-text");
    const textContent = textElement.textContent;
    textElement.textContent = "";
    let i = 0;

    function typeWriter() {
        if (i < textContent.length) {
            textElement.textContent += textContent.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);

    // Background Music Control
    musicButton.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            musicButton.classList.add("playing");
            musicButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            musicButton.classList.remove("playing");
            musicButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scroll 
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (event) {
            if (this.getAttribute('href').startsWith('#')) {
                event.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                window.scrollTo({
                    top: target.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // CHARACTER ANIMATION
    // Running animation
    const runningAnimation = anime({
        targets: '#character',
        translateX: {
            value: '+=5',
            duration: 100,
            easing: 'easeInOutSine',
            direction: 'alternate'
        },
        translateY: {
            value: '-=2',
            duration: 100,
            easing: 'easeInOutQuad',
            direction: 'alternate'
        },
        loop: true,
        autoplay: false
    });
    
    // Arm and leg animation
    const limbAnimation = anime({
        targets: [
            '#character .character-arm-left',
            '#character .character-arm-right',
            '#character .character-leg-left',
            '#character .character-leg-right'
        ],
        rotate: function(el, i) {
            // Alternate rotation for limbs
            const angles = [30, -30, 30, -30];
            return [angles[i], -angles[i]];
        },
        duration: 200,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true,
        autoplay: false
    });
    
    // Obstacle animation
    const obstacleAnimation = anime({
        targets: '#obstacle',
        translateX: {
            value: -1000,
            duration: 3000,
            easing: 'linear'
        },
        loop: true,
        autoplay: false
    });
    
    // Jump animation
    function jumpAnimation() {
        anime({
            targets: '#character',
            translateY: [
                { value: -100, duration: 500, easing: 'easeOutQuad' },
                { value: 0, duration: 500, easing: 'easeInQuad' }
            ],
            complete: function() {
                setTimeout(jumpAnimation, 5000); // Jump again after 5 seconds
            }
        });
        
        // Synchronize arm and leg positions during jump
        anime({
            targets: '#character .character-arm-left',
            rotate: [
                { value: -70, duration: 500 },
                { value: 30, duration: 500 }
            ],
            easing: 'easeInOutSine'
        });
        
        anime({
            targets: '#character .character-arm-right',
            rotate: [
                { value: -70, duration: 500 },
                { value: 30, duration: 500 }
            ],
            easing: 'easeInOutSine'
        });
        
        anime({
            targets: '#character .character-leg-left',
            rotate: [
                { value: -30, duration: 500 },
                { value: 30, duration: 500 }
            ],
            easing: 'easeInOutSine'
        });
        
        anime({
            targets: '#character .character-leg-right',
            rotate: [
                { value: 30, duration: 500 },
                { value: -30, duration: 500 }
            ],
            easing: 'easeInOutSine'
        });
    }
    
    // Start character animations
    runningAnimation.play();
    limbAnimation.play();
    obstacleAnimation.play();
    
    // Trigger jump animation after 2 seconds
    setTimeout(jumpAnimation, 2000);
    
    // BASIC ANIMATIONS
    
    // Fade Animation
    anime({
        targets: '#fade-animation .animation-element',
        opacity: [1, 0.2, 1],
        duration: 2000,
        loop: true,
        easing: 'easeInOutSine',
        autoplay: true
    });
    
    // Scale Animation
    anime({
        targets: '#scale-animation .animation-element',
        scale: [1, 1.5, 0.8, 1],
        duration: 2500,
        loop: true,
        easing: 'easeInOutExpo',
        autoplay: true
    });
    
    // Rotate Animation
    anime({
        targets: '#rotate-animation .animation-element',
        rotate: '1turn',
        duration: 2000,
        loop: true,
        easing: 'easeInOutQuad',
        autoplay: true
    });
    
    // ADVANCED ANIMATIONS
    
    // Path Animation
    anime({
        targets: '#path-animation .animation-element',
        keyframes: [
            {translateX: 80, translateY: -40, duration: 1000},
            {translateX: 0, translateY: 40, duration: 1000},
            {translateX: -80, translateY: -40, duration: 1000},
            {translateX: 0, translateY: 0, duration: 1000}
        ],
        easing: 'easeOutElastic(1, .6)',
        loop: true,
        autoplay: true
    });
    
    // Elastic Animation
    anime({
        targets: '#elastic-animation .animation-element',
        translateX: [
            {value: 80, duration: 1000, elasticity: 600},
            {value: -80, duration: 1000, elasticity: 600},
            {value: 0, duration: 1000, elasticity: 600}
        ],
        scaleX: [
            {value: 1.5, duration: 1000, delay: 0},
            {value: 0.75, duration: 1000, delay: 1000},
            {value: 1, duration: 1000, delay: 2000}
        ],
        loop: true,
        autoplay: true
    });
    
    // Color Animation
    anime({
        targets: '#color-animation .animation-element',
        backgroundColor: [
            '#795548',
            '#deb6a1',
            '#a1887f',
            '#8d6e63',
            '#795548'
        ],
        duration: 4000,
        easing: 'easeInOutQuad',
        loop: true,
        autoplay: true
    });
    
    // TEXT ANIMATION
    // Split text into characters for animation
    const text = document.querySelector('#animated-text');
    text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");
    
    // Animate each character
    anime({
        targets: '#animated-text span',
        translateY: [-20, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1500,
        delay: (el, i) => 80 * i,
        loop: true,
        direction: 'alternate',
        autoplay: true
    });
});