                let currentIndex = 0;
        const slides = document.querySelectorAll('.slide');

        function showNextSlide() {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            document.getElementById('sliderImages').style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        setInterval(showNextSlide, 2000); // Change image every 3 seconds

        // Explorer Card Slider Functionality
        function moveSlider(direction) {
            const slider = document.getElementById('explorerSlider');
            const cardWidth = document.querySelector('.explorer-card').offsetWidth;
            const currentScroll = slider.scrollLeft;

            slider.scrollLeft = currentScroll + (direction * cardWidth);
        }
