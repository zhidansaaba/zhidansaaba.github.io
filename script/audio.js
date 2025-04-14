
document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bg-music");
    const musicButton = document.getElementById("music-btn");
    const audioCards = document.querySelectorAll(".audio-card");
    const columns = document.querySelectorAll(".audio-container-row .col");
    const firstRowCols = document.querySelectorAll(".first-row");
    const secondRowCols = document.querySelectorAll(".second-row");

    // Setup custom audio players
    const customPlayers = document.querySelectorAll('.custom-audio-player');
    customPlayers.forEach(player => {
        const playPauseBtn = player.querySelector('.play-pause-btn');
        const progressBar = player.querySelector('.progress-bar');
        const audioElement = player.querySelector('audio');

        // Play/Pause functionality
        playPauseBtn.addEventListener('click', function () {
            if (audioElement.paused) {
                // Pause background music if it's playing
                if (!audio.paused) {
                    audio.muted = true;
                }

                // Pause all other audio elements
                document.querySelectorAll('.custom-audio-player audio').forEach(a => {
                    if (a !== audioElement && !a.paused) {
                        a.pause();
                        a.parentElement.querySelector('.play-pause-btn i').className = 'fas fa-play';
                    }
                });

                audioElement.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                audioElement.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                audio.muted = false;
            }
        });

        // Update progress bar
        audioElement.addEventListener('timeupdate', function () {
            const percentage = (audioElement.currentTime / audioElement.duration) * 100;
            progressBar.style.width = percentage + '%';
        });

        // Click on progress bar to seek
        player.querySelector('.progress-container').addEventListener('click', function (e) {
            const progressContainer = this;
            const rect = progressContainer.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audioElement.currentTime = percent * audioElement.duration;
        });

        // Handle end of audio
        audioElement.addEventListener('ended', function () {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            progressBar.style.width = '0%';
            audio.muted = false;
        });
    });

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

    // Add event listeners to audio cards
    audioCards.forEach((card, index) => {
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
            audioCards.forEach(c => c.classList.remove("expanded"));
            columns.forEach(col => {
                col.classList.remove("expanded");
                col.classList.remove("shrink-first-row");
                col.classList.remove("shrink-second-row");
            });
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
