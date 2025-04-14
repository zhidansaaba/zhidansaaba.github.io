document.addEventListener("DOMContentLoaded", function () {
    // Background Music Control
    const audio = document.getElementById("bg-music");
    const musicButton = document.getElementById("music-btn");
    const videos = document.querySelectorAll("video");

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

    // Video and Audio Handling
    videos.forEach(video => {
        video.addEventListener("play", function () {
            if (!audio.paused) {
                audio.muted = true;
            }
        });

        video.addEventListener("pause", function () {
            audio.muted = false;
        });

        video.addEventListener("ended", function () {
            audio.muted = false;
        });
    });

    // Music Button Control
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

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-card, .skill-item, .social-icon');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial state for animated elements
    document.querySelectorAll('.category-card, .skill-item, .social-icon').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Call the animation function on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Smooth scrolling for all navigation links
    document.querySelectorAll('.nav-link, .btn').forEach(link => {
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
});