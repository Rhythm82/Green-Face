// slider.js

// Array of image paths for the slider
const images = [
    'log.jpg',
    'pic 231617.png',  // replace with your actual image filenames
    'pic 233112.png',
    'pic2.jpg',
    'pic 232636.png',
    'pic 231905.png',
    'room.jpg',
    'pic 232636.png',
  ];
  
  let currentIndex = 0;
  const sliderImage = document.getElementById('slider-image');
  
  // Function to change the image in the slider
  function changeImage() {
    currentIndex = (currentIndex + 1) % images.length;  // Loop back to the first image
    sliderImage.src = images[currentIndex];
  }
  
  // Set interval to change the image every 1 second
  setInterval(changeImage, 1300);


  
  // Function to open the popup
function openPopup() {
    document.getElementById('login-popup').classList.remove('hidden'); // Show the popup
}

// Function to close the popup
function closePopup() {
    document.getElementById('login-popup').classList.add('hidden'); // Hide the popup
}
// Function to handle the login action and redirect to book.html
function login() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    // Simple validation
    if (name && phone) {
        alert('Login successful!\nName: ' + name + '\nPhone: ' + phone);
        
        // Redirect to book.html after successful login
        window.location.href = "book.html";
    } else {
        alert('Please enter both your name and phone number.');
    }
}