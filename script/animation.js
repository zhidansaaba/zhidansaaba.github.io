document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bg-music");
    const musicButton = document.getElementById("music-btn");
    const animationCards = document.querySelectorAll(".animation-card");
    const columns = document.querySelectorAll(".animation-container-row .col");
    const firstRowCols = document.querySelectorAll(".first-row");
    const secondRowCols = document.querySelectorAll(".second-row");
    const popup = document.getElementById('animationPopup');
    const closeButton = document.querySelector('.popup-close');

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

    // Add event listeners to animation cards
    animationCards.forEach((card, index) => {
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
            
            // Play video when hovering
            const video = card.querySelector('video');
            if (video) {
                video.play().catch(e => {
                    // Autoplay might be blocked, handle gracefully
                    console.log("Video autoplay prevented:", e);
                });
            }
        });

        card.addEventListener("mouseleave", function () {
            // Remove all expanded and shrink classes
            animationCards.forEach(c => c.classList.remove("expanded"));
            columns.forEach(col => {
                col.classList.remove("expanded");
                col.classList.remove("shrink-first-row");
                col.classList.remove("shrink-second-row");
            });
            
            // Pause video when not hovering
            const video = card.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0; // Reset video to beginning
            }
        });

        // Click event for popup
        card.addEventListener("click", function() {
            const video = card.querySelector('.animation-thumbnail');
            const videoSource = card.querySelector('.animation-thumbnail source');
            const title = card.querySelector('.card-title').textContent;
            const format = card.querySelector('.animation-format').textContent;
            
            let videoSrc = "";
            let posterSrc = "";
            
            if (video && videoSource) {
                videoSrc = videoSource.src;
                posterSrc = video.poster;
            }
            
            // Get all details
            let details = {};
            const detailsDiv = card.querySelector('.animation-details');
            
            // Get example info
            const exampleElem = detailsDiv.querySelector('p:nth-child(2)');
            if (exampleElem) {
                details.example = exampleElem.textContent;
            }
            
            // Get studio info
            const studioElem = detailsDiv.querySelector('p:nth-child(3)');
            if (studioElem) {
                details.studio = studioElem.textContent;
            }
            
            // Get description
            const descriptionElem = detailsDiv.querySelector('.animation-description p');
            if (descriptionElem) {
                details.description = descriptionElem.textContent;
            }
            
            // Open popup with this info
            openAnimationPopup(videoSrc, posterSrc, title, format, details);
        });
    });

    // Function to open popup
    function openAnimationPopup(videoSrc, posterSrc, title, format, details) {
        const popupImage = document.getElementById('popupImage');
        const popupTitle = document.getElementById('popupTitle');
        const popupFormat = document.getElementById('popupFormat');
        const detailsList = document.getElementById('popupDetailsList');
        const popupDescription = document.getElementById('popupDescription');
        
        // Set content
        popupTitle.textContent = title;
        popupFormat.textContent = format;
        
        // Clear previous details
        detailsList.innerHTML = '';
        
        // Add details
        if (details.example) {
            const exampleEl = document.createElement('p');
            exampleEl.innerHTML = details.example;
            detailsList.appendChild(exampleEl);
        }
        
        if (details.studio) {
            const studioEl = document.createElement('p');
            studioEl.innerHTML = details.studio;
            detailsList.appendChild(studioEl);
        }
        
        // Description
        popupDescription.textContent = details.description || '';
        
        // Handle video in popup
        if (popupImage.tagName === 'IMG') {
            // Create a video element to replace the image
            const videoElement = document.createElement('video');
            videoElement.id = 'popupImage';
            videoElement.className = 'popup-image';
            videoElement.controls = true;
            videoElement.autoplay = true;
            videoElement.poster = posterSrc;
            
            const sourceElement = document.createElement('source');
            sourceElement.src = videoSrc;
            sourceElement.type = 'video/mp4';
            
            videoElement.appendChild(sourceElement);
            
            // Replace the image with the video
            popupImage.parentNode.replaceChild(videoElement, popupImage);
        } else {
            // It's already a video element
            const source = popupImage.querySelector('source') || document.createElement('source');
            source.src = videoSrc;
            source.type = 'video/mp4';
            
            if (!popupImage.contains(source)) {
                popupImage.appendChild(source);
            }
            
            popupImage.poster = posterSrc;
            popupImage.load(); // Reload the video with new source
            
            try {
                popupImage.play();
            } catch (e) {
                console.log("Could not autoplay video in popup:", e);
            }
        }
        
        // Show popup
        popup.classList.add('active');
        
        // Prevent body scrolling when popup is open
        document.body.style.overflow = 'hidden';
    }

    // Function to close popup
    function closeAnimationPopup() {
        popup.classList.remove('active');
        
        // Stop video playback when closing popup
        const popupVideo = document.getElementById('popupImage');
        if (popupVideo && popupVideo.tagName === 'VIDEO') {
            popupVideo.pause();
        }
        
        // Re-enable body scrolling
        document.body.style.overflow = '';
    }

    // Close popup when clicking close button
    closeButton.addEventListener('click', closeAnimationPopup);
    
    // Close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closeAnimationPopup();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAnimationPopup();
        }
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
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 60,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});