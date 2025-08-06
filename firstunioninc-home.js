// Simple slider logic
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0;

function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
    dots[i].classList.toggle('active', i === idx);
  });
  current = idx;
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => showSlide(i));
});

// Auto-slide every 6 seconds
setInterval(() => {
  let next = (current + 1) % slides.length;
  showSlide(next);
}, 6000);

// Login form validation with specific credentials
document.querySelector('.login-box form').addEventListener('submit', e => {
  e.preventDefault();
  
  const accountNumber = document.querySelector('input[type="text"]').value;
  const password = document.querySelector('input[type="password"]').value;
  
  // Check for specific credentials
  if (accountNumber === '0242309021' && password === 'AltCtrl22') {
    // Redirect to dashboard or success page
    window.location.href = 'dashboard.html'; // You can change this to your desired page
  } else {
    alert('Invalid account number or password. Please try again.');
  }
});

document.getElementById('chatBtn').addEventListener('click', function() {
  alert('Chat support coming soon!');
});

const galleryData = [
    {
        id: 1,
        title: "Welcome to Aurelius HQ",
        description: "A luxurious neoclassical bank headquarters with Roman columns, marble steps, and gold-lettered “Aurelius Incorporated” above the entrance. Clear blue sky, early morning light, cinematic tone.",
         image: "https://www.shutterstock.com/image-photo/young-happy-diverse-professional-international-600nw-2346440481.jpg"
    },
    {
        id: 2,
        title: " Foundations of Trust",
        description: "A grand neoclassical bank building with marble columns, engraved “Aurelius Incorporated” in gold above the entrance, shot at sunrise with warm light reflecting off the facade. Symbol of strength and tradition.",
        image: "https://s47295.pcdn.co/wp-content/uploads/2023/03/10_Finance_Generic-900x450.jpg"
    },
    {
        id: 3,
        title: "Modern Wealth Management",
        description: "Futuristic, glass-walled office with financial advisors meeting clients, digital charts and financial graphs floating as AR elements in the background. Luxury meets innovation",
        image: "https://i0.wp.com/london-post.co.uk/wp-content/uploads/2023/12/IMG_4901.jpeg?fit=1170%2C724&ssl=1"
    },
    {
        id: 4,
        title: "Elite Private Banking Experience",
        description: "Elegant lounge interior with leather armchairs, gold accents, and a private banker discussing discreet financial matters with a well-dressed client over coffee.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYgeYTV9KlJrD5cdIuZSEQFAW22URz1lzWKA&s"
    },
    {
        id: 5,
        title: "Global Reach",
        description: "A world map with gold glowing dots connecting major cities, overlaid with Aurelius Incorporated’s logo in the center. Represents international banking network and client base",
        image: "https://www.travelinc.com/wp-content/uploads/2018/08/Global-Reach.jpg"
    },
    {
        id: 6,
        title: "Aurelius Heritage Wall",
        description: "Marble wall inside a bank lobby engraved with historical Roman quotes about honor and wealth, flanked by laurel wreaths and golden plaques celebrating milestones.",
        image: "https://smartasset.com/wp-content/uploads/sites/2/2024/06/iStock-1440268097.jpg"
    },
    {
        id: 7,
        title: " Digital Wealth Management",
        description: "",
        image: "https://cdn-res.keymedia.com/cms/images/ca/155/0399_638041139805427252.jpg"
    },
    {
        id: 8,
        title: "Alpine Lake",
        description: "A young professional using a sleek mobile banking app on a modern phone. In the background, abstract data charts float in the air, representing AI-driven financial insights.",
        image: "https://www.bankfive.com/getmedia/1fd127c0-a8d6-4fb4-9cc3-4d0311a6185e/10-7-mobile-banking-app_1.jpg?width=800&height=500&ext=.jpg"
    }
];

let currentIndex = 0;
const itemsPerLoad = 4;

// Initialize gallery
function initGallery() {
    loadGalleryItems();
    setupEventListeners();
}

// Load gallery items
function loadGalleryItems() {
    const galleryGrid = document.getElementById('galleryGrid');
    const endIndex = Math.min(currentIndex + itemsPerLoad, galleryData.length);
    
    for (let i = currentIndex; i < endIndex; i++) {
        const item = galleryData[i];
        const galleryItem = createGalleryItem(item);
        galleryGrid.appendChild(galleryItem);
    }
    
    currentIndex = endIndex;
    
    // Hide load more button if all items are loaded
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (currentIndex >= galleryData.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// Create gallery item element
function createGalleryItem(item) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="gallery-image">
        <div class="gallery-overlay">
            <h3 class="gallery-item-title">${item.title}</h3>
            <p class="gallery-item-description">${item.description}</p>
        </div>
    `;
    
    // Add click event for lightbox
    galleryItem.addEventListener('click', () => {
        openLightbox(item.image, item.title);
    });
    
    return galleryItem;
}

// Setup event listeners
function setupEventListeners() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    
    loadMoreBtn.addEventListener('click', loadGalleryItems);
    
    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Open lightbox
function openLightbox(imageSrc, title) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    lightboxImage.src = imageSrc;
    lightboxImage.alt = title;
    lightbox.style.display = 'flex';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);