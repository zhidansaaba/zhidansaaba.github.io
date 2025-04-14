document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bg-music");
    const musicButton = document.getElementById("music-btn");
    const videoPlayers = document.querySelectorAll(".video-player video");
    const videoCards = document.querySelectorAll(".video-card");
    const columns = document.querySelectorAll(".video-container-row .col");
    const firstRowCols = document.querySelectorAll(".first-row");
    const secondRowCols = document.querySelectorAll(".second-row");

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

    // Add event listeners to video cards
    videoCards.forEach((card, index) => {
        const isFirstRow = columns[index].classList.contains("first-row");

        // Hover effect
        card.addEventListener("mouseenter", function () {
            // Add expanded class to current card
            card.classList.add("expanded");
            columns[index].classList.add("expanded");

            // If card is in first row, only shrink other first row cards
            if (isFirstRow) {
                firstRowCols.forEach((col) => {
                    if (!col.contains(card)) {
                        col.classList.add("shrink-first-row");
                    }
                });
            }
            // If card is in second row, only shrink other second row cards
            else {
                secondRowCols.forEach((col) => {
                    if (!col.contains(card)) {
                        col.classList.add("shrink-second-row");
                    }
                });
            }
        });

        card.addEventListener("mouseleave", function () {
            // Remove all expanded and shrink classes
            videoCards.forEach(c => c.classList.remove("expanded"));
            columns.forEach(col => {
                col.classList.remove("expanded");
                col.classList.remove("shrink-first-row");
                col.classList.remove("shrink-second-row");
            });
        });
    });

    // When video in card plays, mute BGM
    videoPlayers.forEach(player => {
        player.addEventListener("play", function () {
            if (!audio.paused) {
                audio.muted = true;
            }
        });

        // When video in card pauses or ends, unmute BGM
        player.addEventListener("pause", function () {
            audio.muted = false;
        });

        player.addEventListener("ended", function () {
            audio.muted = false;
        });
    });

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