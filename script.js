document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bg-music");
    const musicButton = document.getElementById("music-btn");
    const videos = document.querySelectorAll("video");

    // Saat video diputar, mute BGM
    videos.forEach(video => {
        video.addEventListener("play", function () {
            if (!audio.paused) {
                audio.muted = true;
            }
        });

        // Saat video dijeda atau selesai, unmute BGM
        video.addEventListener("pause", function () {
            audio.muted = false;
        });

        video.addEventListener("ended", function () {
            audio.muted = false;
        });
    });

    // Kontrol Musik
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
});
