document.addEventListener("DOMContentLoaded", function () {
    // Music control
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
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add descriptions under each font
    addFontDescriptions();

    // Remove transition text element (Beautiful Typography)
    const transitionContainer = document.querySelector('.transition-container');
    if (transitionContainer) {
        transitionContainer.remove();
    }

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
});

// Function to add font descriptions
function addFontDescriptions() {
    // Font descriptions
    const fontDescriptions = {
        'montserrat-animation': 'A geometric sans-serif typeface with clean lines and modern feel. Perfect for headlines and UI elements.',
        'playfair-animation': 'An elegant serif font with dramatic thick/thin transitions. Ideal for headings and editorial design.',
        'roboto-animation': 'A neo-grotesque sans-serif with natural reading rhythm. Android\'s system font, excellent for interfaces and body text.',
        'lora-animation': 'A well-balanced contemporary serif with moderate contrast. Perfect for body text in both print and digital formats.',
        'poppins-animation': 'A geometric sans-serif with friendly curves. Versatile for headings and body text with excellent readability.',
        'merriweather-animation': 'A traditional serif designed for on-screen reading with strong serifs and open forms. Great for long-form text.',
        'abril-animation': 'A display font with strong presence and contrast. Inspired by advertising typefaces from the 19th century.',
        'bebas-animation': 'A condensed sans-serif with uppercase-only characters. Perfect for impactful headlines and posters.',
        'dancing-animation': 'A lively casual script with bouncing baseline. Adds warmth and personality to designs like invitations and greeting cards.',
        'pacifico-animation': 'A fun, brush script font with a casual feel. Inspired by 1950s American surf culture, great for friendly branding.'
    };

    // Add description to each font card
    for (const [fontId, description] of Object.entries(fontDescriptions)) {
        const fontStage = document.getElementById(fontId);
        if (fontStage) {
            const fontCard = fontStage.closest('.font-card');

            // Check if description already exists
            let descriptionDiv = fontCard.querySelector('.font-description');

            if (!descriptionDiv) {
                // Create description element if it doesn't exist
                descriptionDiv = document.createElement('div');
                descriptionDiv.className = 'font-description';
                descriptionDiv.textContent = description;

                // Append to font card
                fontCard.appendChild(descriptionDiv);
            }
        }
    }
}