document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bg-music");
    const musicButton = document.getElementById("music-btn");
    const imageCards = document.querySelectorAll(".image-card");
    const columns = document.querySelectorAll(".image-container-row .col");
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

    // Create popup elements
    createImagePopup();

    // Add event listeners to image cards
    imageCards.forEach((card, index) => {
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
            imageCards.forEach(c => c.classList.remove("expanded"));
            columns.forEach(col => {
                col.classList.remove("expanded");
                col.classList.remove("shrink-first-row");
                col.classList.remove("shrink-second-row");
            });
        });

        // Click event for popup
        card.addEventListener("click", function() {
            const imgSrc = card.querySelector('.image-thumbnail').src;
            const title = card.querySelector('.card-title').textContent;
            const format = card.querySelector('.image-format').textContent;
            
            // Get all details
            let details = {};
            const detailsDiv = card.querySelector('.image-details');
            
            // Get photographer/creator info
            const creatorElem = detailsDiv.querySelector('p:nth-child(2)');
            if (creatorElem) {
                details.creator = creatorElem.textContent;
            }
            
            // Get resolution or dimensions
            const resolutionElem = detailsDiv.querySelector('p:nth-child(3)');
            if (resolutionElem) {
                details.resolution = resolutionElem.textContent;
            }
            
            // Get date info
            const dateElem = detailsDiv.querySelector('p:nth-child(4)');
            if (dateElem) {
                details.date = dateElem.textContent;
            }
            
            // Get file size
            const sizeElem = detailsDiv.querySelector('p:nth-child(5)');
            if (sizeElem) {
                details.size = sizeElem.textContent;
            }
            
            // Get description
            const descriptionElem = detailsDiv.querySelector('.image-description p');
            if (descriptionElem) {
                details.description = descriptionElem.textContent;
            }
            
            // Open popup with this info
            openImagePopup(imgSrc, title, format, details);
        });
    });

    // Function to create the popup structure
    function createImagePopup() {
        // Create popup overlay
        const popupOverlay = document.createElement('div');
        popupOverlay.className = 'popup-overlay';
        popupOverlay.id = 'imagePopup';
        
        // Create popup content
        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content';
        
        // Create popup header
        const popupHeader = document.createElement('div');
        popupHeader.className = 'popup-header';
        
        const popupTitle = document.createElement('h2');
        popupTitle.className = 'popup-title';
        popupTitle.id = 'popupTitle';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'popup-close';
        closeButton.innerHTML = '&times;';
        closeButton.onclick = closeImagePopup;
        
        popupHeader.appendChild(popupTitle);
        popupHeader.appendChild(closeButton);
        
        // Create popup body
        const popupBody = document.createElement('div');
        popupBody.className = 'popup-body';
        
        // Image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'popup-image-container';
        
        const popupImage = document.createElement('img');
        popupImage.className = 'popup-image';
        popupImage.id = 'popupImage';
        
        imageContainer.appendChild(popupImage);
        
        // Details container
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'popup-details';
        
        const formatBadge = document.createElement('div');
        formatBadge.className = 'popup-format';
        formatBadge.id = 'popupFormat';
        
        const detailsList = document.createElement('div');
        detailsList.id = 'popupDetailsList';
        
        const descriptionHeader = document.createElement('h3');
        descriptionHeader.textContent = 'Description';
        
        const description = document.createElement('div');
        description.className = 'popup-description';
        description.id = 'popupDescription';
        
        detailsContainer.appendChild(formatBadge);
        detailsContainer.appendChild(detailsList);
        detailsContainer.appendChild(descriptionHeader);
        detailsContainer.appendChild(description);
        
        // Assemble popup
        popupBody.appendChild(imageContainer);
        popupBody.appendChild(detailsContainer);
        
        popupContent.appendChild(popupHeader);
        popupContent.appendChild(popupBody);
        
        popupOverlay.appendChild(popupContent);
        
        // Add to document
        document.body.appendChild(popupOverlay);
        
        // Close popup when clicking outside
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                closeImagePopup();
            }
        });
        
        // Close popup with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeImagePopup();
            }
        });
    }

    // Function to open popup
    function openImagePopup(imgSrc, title, format, details) {
        const popup = document.getElementById('imagePopup');
        const popupImage = document.getElementById('popupImage');
        const popupTitle = document.getElementById('popupTitle');
        const popupFormat = document.getElementById('popupFormat');
        const detailsList = document.getElementById('popupDetailsList');
        const popupDescription = document.getElementById('popupDescription');
        
        // Set content
        popupImage.src = imgSrc;
        popupTitle.textContent = title;
        popupFormat.textContent = format;
        
        // Clear previous details
        detailsList.innerHTML = '';
        
        // Add details
        if (details.creator) {
            const creatorEl = document.createElement('p');
            creatorEl.innerHTML = details.creator;
            detailsList.appendChild(creatorEl);
        }
        
        if (details.resolution) {
            const resolutionEl = document.createElement('p');
            resolutionEl.innerHTML = details.resolution;
            detailsList.appendChild(resolutionEl);
        }
        
        if (details.date) {
            const dateEl = document.createElement('p');
            dateEl.innerHTML = details.date;
            detailsList.appendChild(dateEl);
        }
        
        if (details.size) {
            const sizeEl = document.createElement('p');
            sizeEl.innerHTML = details.size;
            detailsList.appendChild(sizeEl);
        }
        
        // Description
        popupDescription.textContent = details.description || '';
        
        // Show popup
        popup.classList.add('active');
        
        // Prevent body scrolling when popup is open
        document.body.style.overflow = 'hidden';
    }

    // Function to close popup
    function closeImagePopup() {
        const popup = document.getElementById('imagePopup');
        popup.classList.remove('active');
        
        // Re-enable body scrolling
        document.body.style.overflow = '';
    }

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