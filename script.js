// ===================================
// Mobile Navigation Toggle
// ===================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

// Navbar blijft nu altijd hetzelfde tijdens scrollen
// Scroll effect verwijderd om de mooie transparante balk te behouden

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Image Gallery Lightbox
// ===================================
let galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxCounter = document.querySelector('.lightbox-counter');

let currentImageIndex = 0;
let images = Array.from(galleryItems).map(item => {
    return item.querySelector('img').src;
});

// Open lightbox
function attachGalleryClickHandlers() {
    galleryItems = document.querySelectorAll('.gallery-item:not(.hidden)');
    images = Array.from(galleryItems).map(item => {
        return item.querySelector('img').src;
    });
    
    galleryItems.forEach((item, index) => {
        const clickHandler = () => {
            if (!editMode) {
                currentImageIndex = index;
                openLightbox();
            }
        };
        item.removeEventListener('click', clickHandler);
        item.addEventListener('click', clickHandler);
    });
}

attachGalleryClickHandlers();

function openLightbox() {
    lightbox.classList.add('active');
    updateLightboxImage();
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

function updateLightboxImage() {
    lightboxImage.src = images[currentImageIndex];
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
}

// Close lightbox
lightboxClose.addEventListener('click', closeLightbox);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Previous image
lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
});

// Next image
lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    } else if (e.key === 'ArrowRight') {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxImage();
    }
});

// ===================================
// Contact Modal Handling
// ===================================
const contactModal = document.getElementById('contactModal');
const openContactModalBtn = document.getElementById('openContactModal');
const closeContactModalBtn = document.querySelector('.contact-modal-close');

if (openContactModalBtn) {
    openContactModalBtn.addEventListener('click', () => {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeContactModalBtn) {
    closeContactModalBtn.addEventListener('click', () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
if (contactModal) {
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal && contactModal.classList.contains('active')) {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===================================
// Contact Form Handling with Web3Forms
// ===================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Verzenden...';
        formStatus.textContent = '';
        formStatus.className = 'form-status';
        
        // Get form data
        const formData = new FormData(contactForm);
        
        try {
            // Send to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Success message
                formStatus.textContent = '✓ Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.';
                formStatus.className = 'form-status success';
                contactForm.reset();
                
                // Close modal after 2 seconds
                setTimeout(() => {
                    if (contactModal) {
                        contactModal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                }, 2000);
            } else {
                // Error message
                formStatus.textContent = '✗ Er is iets misgegaan. Probeer het opnieuw of stuur een email naar pietiebeerke@gmail.com';
                formStatus.className = 'form-status error';
            }
        } catch (error) {
            // Network error
            formStatus.textContent = '✗ Netwerkfout. Controleer uw internetverbinding en probeer het opnieuw.';
            formStatus.className = 'form-status error';
        }
        
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    });
}

// ===================================
// Scroll Animations (Fade in on scroll)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.highlight-card, .feature-card, .gallery-item, .contact-info, .contact-form');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// Lazy Loading Images
// ===================================
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger load
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
} else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(img => {
        img.src = img.src;
    });
}

// Page load animation removed to prevent background image flash
// Parallax effect removed to keep consistent background brightness

// ===================================
// Add active state to navigation based on scroll position
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Console Welcome Message
// ===================================
console.log('%c🏡 Eiken Woning', 'font-size: 20px; font-weight: bold; color: #2d5016;');
console.log('%cEen handgemaakte woning op het Noord-Belgische platteland', 'font-size: 14px; color: #4a7c3c;');
console.log('%cWebsite gebouwd met zorg en aandacht voor detail', 'font-size: 12px; color: #8b9d77;');

// ===================================
// Edit Mode - Drag & Drop and Hide Images
// ===================================
let editMode = false;
let draggedElement = null;
let editButton, exportButton, clearCacheButton;
let autoScrollInterval = null;

// Initialize edit mode buttons
function initializeEditModeButtons() {
    console.log('Initializing edit mode buttons...');
    
    // Create edit mode toggle button (hidden)
    editButton = document.createElement('button');
    editButton.className = 'edit-mode-toggle';
    editButton.innerHTML = '✏️';
    editButton.title = 'Bewerk galerij';
    editButton.style.display = 'none'; // Hidden - gallery order is finalized
    document.body.appendChild(editButton);
    console.log('Edit button created (hidden)');

    // Create export config button
    exportButton = document.createElement('button');
    exportButton.className = 'export-config-button';
    exportButton.innerHTML = '💾';
    exportButton.title = 'Exporteer configuratie';
    exportButton.style.display = 'none';
    document.body.appendChild(exportButton);
    console.log('Export button created');

    // Create clear cache button
    clearCacheButton = document.createElement('button');
    clearCacheButton.className = 'clear-cache-button';
    clearCacheButton.innerHTML = '🔄';
    clearCacheButton.title = 'Reset cache';
    clearCacheButton.style.display = 'none';
    document.body.appendChild(clearCacheButton);
    console.log('Clear cache button created');

    editButton.addEventListener('click', () => {
        editMode = !editMode;
        const gallerySection = document.querySelector('.gallery-section');
        
        if (editMode) {
            editButton.innerHTML = '✓';
            editButton.classList.add('active');
            gallerySection.classList.add('edit-mode');
            
            // Force visibility with inline styles
            exportButton.style.cssText = 'display: block !important; position: fixed !important; bottom: 90px !important; right: 30px !important; z-index: 99999 !important; background: linear-gradient(135deg, #4a7c3c, #2d5016) !important; color: white !important; padding: 15px 25px !important; border-radius: 50px !important; border: none !important; cursor: pointer !important; font-size: 0.95rem !important; font-weight: 600 !important;';
            clearCacheButton.style.cssText = 'display: block !important; position: fixed !important; bottom: 150px !important; right: 30px !important; z-index: 99999 !important; background: linear-gradient(135deg, #8b9d77, #6b7d57) !important; color: white !important; padding: 15px 25px !important; border-radius: 50px !important; border: none !important; cursor: pointer !important; font-size: 0.95rem !important; font-weight: 600 !important;';
            
            console.log('Edit mode enabled, buttons should be visible');
            console.log('Export button styles:', exportButton.style.cssText);
            console.log('Clear cache button styles:', clearCacheButton.style.cssText);
            enableEditMode();
        } else {
            editButton.innerHTML = '✏️';
            editButton.classList.remove('active');
            gallerySection.classList.remove('edit-mode');
            exportButton.style.display = 'none';
            clearCacheButton.style.display = 'none';
            disableEditMode();
            saveGalleryOrder();
        }
    });

    exportButton.addEventListener('click', () => {
        exportGalleryConfig();
    });

    clearCacheButton.addEventListener('click', () => {
        if (confirm('Browser cache wissen en herladen vanaf gallery-config.json?')) {
            localStorage.removeItem('galleryOrder');
            location.reload();
        }
    });
}

// Call initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEditModeButtons);
} else {
    initializeEditModeButtons();
}

function enableEditMode() {
    const allGalleryItems = document.querySelectorAll('.gallery-item');
    
    allGalleryItems.forEach(item => {
        // Make items draggable
        item.setAttribute('draggable', 'true');
        
        // Add hide button if not already present
        if (!item.querySelector('.hide-image-btn')) {
            const hideBtn = document.createElement('button');
            hideBtn.className = 'hide-image-btn';
            hideBtn.innerHTML = item.classList.contains('hidden') ? '👁️' : '🚫';
            hideBtn.title = item.classList.contains('hidden') ? 'Tonen' : 'Verbergen';
            hideBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleImageVisibility(item, hideBtn);
            });
            item.appendChild(hideBtn);
        }
        
        // Drag events
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragleave', handleDragLeave);
        
        // Keyboard selection
        item.addEventListener('click', handleImageSelect);
        item.setAttribute('tabindex', '0');
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function disableEditMode() {
    const allGalleryItems = document.querySelectorAll('.gallery-item');
    
    allGalleryItems.forEach(item => {
        item.removeAttribute('draggable');
        item.removeAttribute('tabindex');
        item.classList.remove('keyboard-selected');
        
        // Remove hide buttons
        const hideBtn = item.querySelector('.hide-image-btn');
        if (hideBtn) {
            hideBtn.remove();
        }
        
        // Remove drag events
        item.removeEventListener('dragstart', handleDragStart);
        item.removeEventListener('dragover', handleDragOver);
        item.removeEventListener('drop', handleDrop);
        item.removeEventListener('dragend', handleDragEnd);
        item.removeEventListener('dragenter', handleDragEnter);
        item.removeEventListener('dragleave', handleDragLeave);
        
        // Remove keyboard selection
        item.removeEventListener('click', handleImageSelect);
    });
    
    // Remove keyboard navigation
    document.removeEventListener('keydown', handleKeyboardNavigation);
    selectedImageForKeyboard = null;
    
    attachGalleryClickHandlers();
}

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    
    return false;
}

function handleDragEnter(e) {
    if (this !== draggedElement) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedElement !== this) {
        const galleryGrid = document.querySelector('.gallery-grid');
        const allItems = [...galleryGrid.children];
        const draggedIndex = allItems.indexOf(draggedElement);
        const targetIndex = allItems.indexOf(this);
        
        if (draggedIndex < targetIndex) {
            this.parentNode.insertBefore(draggedElement, this.nextSibling);
        } else {
            this.parentNode.insertBefore(draggedElement, this);
        }
    }
    
    this.classList.remove('drag-over');
    return false;
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    const allItems = document.querySelectorAll('.gallery-item');
    allItems.forEach(item => {
        item.classList.remove('drag-over');
    });
    
    // Clear auto-scroll interval
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
    
    // Save the new order
    saveGalleryOrder();
}

// Keyboard navigation functions
function handleImageSelect(e) {
    // Don't select if clicking hide button
    if (e.target.classList.contains('hide-image-btn')) {
        return;
    }
    
    e.stopPropagation();
    
    // Remove previous selection
    const allItems = document.querySelectorAll('.gallery-item');
    allItems.forEach(item => item.classList.remove('keyboard-selected'));
    
    // Select this item
    this.classList.add('keyboard-selected');
    selectedImageForKeyboard = this;
    
    // Scroll into view
    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function handleKeyboardNavigation(e) {
    if (!selectedImageForKeyboard) return;
    
    const galleryGrid = document.querySelector('.gallery-grid');
    const allItems = [...galleryGrid.children].filter(item =>
        !item.classList.contains('hidden') ||
        document.querySelector('.gallery-section').classList.contains('edit-mode')
    );
    const currentIndex = allItems.indexOf(selectedImageForKeyboard);
    
    if (currentIndex === -1) return;
    
    // Get grid column count
    const gridStyle = window.getComputedStyle(galleryGrid);
    const gridColumns = gridStyle.gridTemplateColumns.split(' ').length;
    
    let targetIndex = currentIndex;
    let shouldMove = false;
    
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            if (currentIndex > 0) {
                targetIndex = currentIndex - 1;
                shouldMove = true;
            }
            break;
        case 'ArrowRight':
            e.preventDefault();
            if (currentIndex < allItems.length - 1) {
                targetIndex = currentIndex + 1;
                shouldMove = true;
            }
            break;
        case 'ArrowUp':
            e.preventDefault();
            if (currentIndex >= gridColumns) {
                targetIndex = currentIndex - gridColumns;
                shouldMove = true;
            }
            break;
        case 'ArrowDown':
            e.preventDefault();
            if (currentIndex + gridColumns < allItems.length) {
                targetIndex = currentIndex + gridColumns;
                shouldMove = true;
            }
            break;
        case 'Escape':
            e.preventDefault();
            selectedImageForKeyboard.classList.remove('keyboard-selected');
            selectedImageForKeyboard = null;
            break;
    }
    
    if (shouldMove && targetIndex !== currentIndex) {
        // Swap the elements
        const targetItem = allItems[targetIndex];
        
        if (currentIndex < targetIndex) {
            galleryGrid.insertBefore(selectedImageForKeyboard, targetItem.nextSibling);
        } else {
            galleryGrid.insertBefore(selectedImageForKeyboard, targetItem);
        }
        
        // Scroll into view
        selectedImageForKeyboard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Save the new order
        saveGalleryOrder();
    }
}

function toggleImageVisibility(item, button) {
    item.classList.toggle('hidden');
    
    if (item.classList.contains('hidden')) {
        button.innerHTML = '👁️';
        button.title = 'Tonen';
        item.style.opacity = '0.3';
    } else {
        button.innerHTML = '🚫';
        button.title = 'Verbergen';
        item.style.opacity = '1';
    }
    
    saveGalleryOrder();
}

function saveGalleryOrder() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const items = [...galleryGrid.children];
    
    const order = items.map((item, index) => ({
        index: index,
        dataIndex: item.getAttribute('data-index'),
        hidden: item.classList.contains('hidden')
    }));
    
    // Save to localStorage as backup
    localStorage.setItem('galleryOrder', JSON.stringify(order));
    
    // Only re-attach gallery click handlers if NOT in edit mode
    const gallerySection = document.querySelector('.gallery-section');
    if (!gallerySection.classList.contains('edit-mode')) {
        attachGalleryClickHandlers();
    }
    
    // Show notification
    showNotification('Wijzigingen opgeslagen! Klik op "💾 Exporteer Configuratie" om het bestand te downloaden.');
}

function loadGalleryOrder() {
    // Try to load from gallery-config.json
    fetch('gallery-config.json?' + new Date().getTime()) // Cache busting
        .then(response => {
            if (!response.ok) throw new Error('Config file not found');
            return response.json();
        })
        .then(config => {
            if (config.galleryOrder && config.galleryOrder.length > 0) {
                applyGalleryOrder(config.galleryOrder);
                console.log('Gallery order loaded from gallery-config.json');
            } else {
                console.log('No gallery order in config, using default');
            }
        })
        .catch(error => {
            console.log('Could not load gallery-config.json, using default order:', error.message);
        });
}

function loadFromLocalStorage() {
    const savedOrder = localStorage.getItem('galleryOrder');
    if (!savedOrder) return;
    
    try {
        const order = JSON.parse(savedOrder);
        applyGalleryOrder(order);
    } catch (e) {
        console.error('Error loading gallery order from localStorage:', e);
    }
}

function applyGalleryOrder(order) {
    const galleryGrid = document.querySelector('.gallery-grid');
    const items = [...galleryGrid.children];
    
    // Create a map of data-index to element
    const itemMap = new Map();
    items.forEach(item => {
        itemMap.set(item.getAttribute('data-index'), item);
    });
    
    // Reorder and apply hidden state
    order.forEach((orderItem, index) => {
        const item = itemMap.get(orderItem.dataIndex);
        if (item) {
            galleryGrid.appendChild(item);
            if (orderItem.hidden) {
                item.classList.add('hidden');
                item.style.opacity = '0.3';
            }
        }
    });
    
    attachGalleryClickHandlers();
}

function exportGalleryConfig() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const items = [...galleryGrid.children];
    
    const order = items.map((item, index) => ({
        index: index,
        dataIndex: item.getAttribute('data-index'),
        hidden: item.classList.contains('hidden')
    }));
    
    const config = {
        version: "1.0",
        lastUpdated: new Date().toISOString(),
        galleryOrder: order
    };
    
    // Create blob and download as gallery-config.json
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gallery-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('✓ gallery-config.json gedownload! Vervang het bestand in je project en push naar GitHub Pages.');
}

function showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.gallery-notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'gallery-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Load saved order on page load
loadGalleryOrder();

// Made with Bob
