/**
 * Myanmar Shinpyu Ordination Invitation Scripts
 * 3D Book Page-Turn Functionality with Bilingual Content Loading
 */

// Book state
let currentPage = 0;
const totalPages = 4; // Now 4 pages (8 sides)
let isFlipping = false;
let touchStartX = 0;
let touchEndX = 0;

// DOM Elements
let pages = [];
let prevBtn = null;
let nextBtn = null;
let pageIndicator = null;
let audio = null;
let bgMusic = null;

/**
 * Initialize Book
 */
document.addEventListener('DOMContentLoaded', function() {
  // Load content first, then initialize book
  loadContent().then(() => {
    initializeElements();
    initializeEventListeners();
    updateBookState();
  });
});

/**
 * Load Content from JSON
 */
async function loadContent() {
  try {
    const response = await fetch('./data/content.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Wrap DOM rendering in requestAnimationFrame to reduce layout reflow
    requestAnimationFrame(() => {
      // Populate DOM elements
      populateContent(data);
      
      // Populate Myanmar content page
      populateMyanmarContent(data.ceremonies);
      
      // Populate English content page
      populateEnglishContent(data.ceremonies);
      
      // Update page title
      document.title = data.event?.title_en || 'Myanmar Shinpyu Invitation';
    });
    
    console.log('Content loaded successfully');
    
    // Initialize media (background music and page backgrounds)
    if (data.media) {
      initBackgroundMusic(data.media.backgroundMusic);
      initPageBackgrounds(data.media.pages);
    }
    
  } catch (error) {
    console.error('Failed to load content:', error);
    // Use fallback content
    useFallbackContent();
  }
}

/**
 * Populate DOM with Content Data
 */
function populateContent(data) {
  // Event details (Cover page)
  if (data.event) {
    setText('eventTitle', data.event.title_mm);
    setText('eventSubtitle', data.event.title_en);
    setText('eventFamily', data.event.family);
    setText('eventYear', data.event.year);
  }
  
  // General content
  if (data.general) {
    setText('invitationMm', data.general.invitation_mm);
    setText('invitationEn', data.general.invitation_en);
    setText('blessingMm', data.general.blessing_mm);
    setText('blessingEn', data.general.blessing_en);
    setText('rsvpDetails', data.general.rsvp);
    setText('contactNumber', data.general.contact);
    setText('footerText', data.general.footer_text);
  }
}

/**
 * Initialize Background Music
 * @param {Object} musicConfig - Background music configuration
 */
function initBackgroundMusic(musicConfig) {
  if (!musicConfig || !musicConfig.enabled || !bgMusic) {
    console.log('Background music disabled or not available');
    return;
  }
  
  try {
    // Store config but don't set src until user interaction
    const musicFile = musicConfig.file;
    const volume = musicConfig.volume || 0.5;
    const loop = musicConfig.loop !== false; // Default to true
    
    // Only load and play after first user interaction (browser safe)
    const playMusic = () => {
      // Set src only when user has interacted
      if (!bgMusic.src) {
        bgMusic.src = musicFile;
        bgMusic.volume = volume;
        bgMusic.loop = loop;
      }
      bgMusic.play().catch(err => {
        console.log('Background music autoplay prevented:', err.message);
      });
    };
    
    // Listen for first interaction
    document.body.addEventListener('click', playMusic, { once: true });
    document.body.addEventListener('touchstart', playMusic, { once: true });
    
    console.log('Background music ready (will load on first interaction)');
  } catch (error) {
    console.error('Failed to initialize background music:', error);
  }
}

/**
 * Initialize Page Backgrounds
 * @param {Object} pageBackgrounds - Page background image paths
 */
function initPageBackgrounds(pageBackgrounds) {
  if (!pageBackgrounds) {
    console.log('No page backgrounds configured');
    return;
  }
  
  try {
    // Map page names to page elements
    const pageMap = {
      'cover': 0,
      'myanmar': 1,
      'english': 2,
      'rsvp': 3
    };
    
    Object.keys(pageBackgrounds).forEach(pageName => {
      const pageIndex = pageMap[pageName];
      const bgImage = pageBackgrounds[pageName];
      
      if (pageIndex !== undefined && pages[pageIndex] && bgImage) {
        const page = pages[pageIndex];
        const front = page.querySelector('.page-front');
        const back = page.querySelector('.page-back');
        
        if (front) {
          front.style.backgroundImage = `url(${bgImage})`;
        }
        if (back) {
          back.style.backgroundImage = `url(${bgImage})`;
        }
      }
    });
    
    console.log('Page backgrounds initialized');
  } catch (error) {
    console.error('Failed to initialize page backgrounds:', error);
  }
}

/**
 * Populate Myanmar Content Page
 */
function populateMyanmarContent(ceremonies) {
  const container = document.getElementById('myanmarContent');
  
  if (!container || !ceremonies || !Array.isArray(ceremonies)) {
    console.warn('Myanmar content container or data not found');
    return;
  }
  
  // Clear existing content
  container.innerHTML = '';
  
  // Loop through ceremonies array and create Myanmar ceremony blocks
  ceremonies.forEach(ceremony => {
    const block = document.createElement('div');
    block.classList.add('ceremony-block-mm');
    
    // Add ceremony image if available
    const imageHtml = ceremony.image ? `<img class="ceremony-image" src="${ceremony.image}" alt="${ceremony.label_mm}" loading="lazy" decoding="async">` : '';
    
    block.innerHTML = `
      <h3 class="ceremony-label-mm">${ceremony.label_mm}</h3>
      ${imageHtml}
      <p class="ceremony-desc-mm">${ceremony.description_mm}</p>
      <div class="ceremony-details-mm">
        <p><strong>နေ့ရက်:</strong> ${ceremony.date}</p>
        <p><strong>အချိန်:</strong> ${ceremony.time}</p>
        <p><strong>နေရာ:</strong> ${ceremony.venue}</p>
        <p>${ceremony.address}</p>
      </div>
    `;
    
    container.appendChild(block);
  });
}

/**
 * Populate English Content Page
 */
function populateEnglishContent(ceremonies) {
  const container = document.getElementById('englishContent');
  
  if (!container || !ceremonies || !Array.isArray(ceremonies)) {
    console.warn('English content container or data not found');
    return;
  }
  
  // Clear existing content
  container.innerHTML = '';
  
  // Loop through ceremonies array and create English ceremony blocks
  ceremonies.forEach(ceremony => {
    const block = document.createElement('div');
    block.classList.add('ceremony-block-en');
    
    // Add ceremony image if available
    const imageHtml = ceremony.image ? `<img class="ceremony-image" src="${ceremony.image}" alt="${ceremony.label_en}" loading="lazy" decoding="async">` : '';
    
    block.innerHTML = `
      <h3 class="ceremony-label-en">${ceremony.label_en}</h3>
      ${imageHtml}
      <p class="ceremony-desc-en">${ceremony.description_en}</p>
      <div class="ceremony-details-en">
        <p><strong>Date:</strong> ${ceremony.date}</p>
        <p><strong>Time:</strong> ${ceremony.time}</p>
        <p><strong>Venue:</strong> ${ceremony.venue}</p>
        <p>${ceremony.address}</p>
      </div>
    `;
    
    container.appendChild(block);
  });
}

/**
 * Helper function to safely set text content
 */
function setText(elementId, text) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = text || '';
  }
}

/**
 * Fallback Content when JSON fails to load
 */
function useFallbackContent() {
  // Fallback event data
  setText('eventTitle', 'မြန်မာရှင်ပြု ရဟန်းခံ မင်္ဂလာ');
  setText('eventSubtitle', 'Novitiation and Ordination Ceremony');
  setText('eventFamily', 'မိသားစု');
  setText('eventYear', '၂၀၂၆');
  
  // Fallback general content
  setText('invitationMm', 'ဖိတ်ကြားပါသည်။');
  setText('invitationEn', 'You are cordially invited.');
  setText('blessingMm', 'ဆုတောင်းပေးပါသည်။');
  setText('blessingEn', 'May you be blessed.');
  setText('rsvpDetails', 'ကျေးဇူးပြု၍ အကြိုသတင်းပို့ပေးပါရန်။');
  setText('contactNumber', '၀၉ ၁၂၃ ၄၅၆ ၇၈၉');
  setText('footerText', 'ဖိတ်ကြားပါသည်။');
  
  // Fallback ceremonies
  const fallbackCeremonies = [
    {
      label_mm: 'ရှင်ပြု',
      label_en: 'Novitiation Ceremony',
      description_mm: 'ရှင်ပြုပွဲဖိတ်ကြားပါသည်။',
      description_en: 'Novitiation ceremony description.',
      date: '၁၃ ဧပြီ ၂၀၂၆',
      time: 'နံနက် ၉ နာရီ',
      venue: 'ဘုန်းတော်ကြီးကျောင်း',
      address: 'ရန်ကုန်မြို့',
      image: './assets/images/shinpyu.jpg'
    },
    {
      label_mm: 'ရဟန်းခံ',
      label_en: 'Ordination Ceremony',
      description_mm: 'ရဟန်းခံပွဲဖိတ်ကြားပါသည်။',
      description_en: 'Ordination ceremony description.',
      date: '၁၅ ဧပြီ ၂၀၂၆',
      time: 'နံနက် ၉ နာရီ',
      venue: 'ဘုန်းတော်ကြီးကျောင်း',
      address: 'ရန်ကုန်မြို့',
      image: './assets/images/rahadan.jpg'
    }
  ];
  
  populateMyanmarContent(fallbackCeremonies);
  populateEnglishContent(fallbackCeremonies);
  console.log('Using fallback content');
}

/**
 * Initialize DOM Elements
 */
function initializeElements() {
  pages = document.querySelectorAll('.page');
  prevBtn = document.querySelector('.prev-btn');
  nextBtn = document.querySelector('.next-btn');
  pageIndicator = document.querySelector('.page-indicator');
  audio = document.getElementById('temple-bell');
  bgMusic = document.getElementById('bgMusic');
  
  if (!pages.length) {
    console.error('No pages found');
    return;
  }
}

/**
 * Initialize Event Listeners
 */
function initializeEventListeners() {
  // Navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', goToPrevPage);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', goToNextPage);
  }
  
  // Click on pages
  pages.forEach((page, index) => {
    page.addEventListener('click', function(e) {
      // Don't flip if clicking on interactive elements
      if (e.target.closest('.contact-value')) return;
      
      if (index === currentPage && currentPage < totalPages - 1) {
        goToNextPage();
      } else if (index === currentPage - 1 && currentPage > 0) {
        goToPrevPage();
      }
    });
  });
  
  // Touch/Swipe support
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
  
  // Keyboard navigation
  document.addEventListener('keydown', handleKeyboard);
  
  // Contact copy functionality
  initCopyToClipboard();
}

/**
 * Go to Previous Page
 */
function goToPrevPage() {
  if (isFlipping || currentPage <= 0) return;
  
  isFlipping = true;
  currentPage--;
  
  // Play audio
  playTempleBell();
  
  // Update page
  const page = pages[currentPage];
  if (page) {
    page.classList.remove('flipped');
  }
  
  updateBookState();
  
  setTimeout(() => {
    isFlipping = false;
  }, 600);
}

/**
 * Go to Next Page
 */
function goToNextPage() {
  if (isFlipping || currentPage >= totalPages) return;
  
  isFlipping = true;
  
  // Play audio
  playTempleBell();
  
  // Update page
  const page = pages[currentPage];
  if (page) {
    page.classList.add('flipped');
  }
  
  currentPage++;
  updateBookState();
  
  setTimeout(() => {
    isFlipping = false;
  }, 600);
}

/**
 * Update Book State
 */
function updateBookState() {
  // Update z-index for proper stacking using data-page-index
  pages.forEach((page) => {
    const pageIndex = parseInt(page.dataset.pageIndex);
    if (pageIndex < currentPage) {
      // Flipped pages
      page.style.zIndex = pageIndex + 1;
    } else {
      // Unflipped pages (reverse order)
      page.style.zIndex = totalPages - pageIndex;
    }
  });
  
  // Update buttons
  if (prevBtn) {
    prevBtn.disabled = currentPage === 0;
  }
  
  if (nextBtn) {
    nextBtn.disabled = currentPage === totalPages;
  }
  
  // Update indicator
  if (pageIndicator) {
    const actualPage = Math.min(currentPage * 2 + 1, 8);
    pageIndicator.textContent = `${actualPage} / 8`;
  }
}

/**
 * Play Temple Bell Audio
 */
function playTempleBell() {
  if (!audio) return;
  
  audio.currentTime = 0;
  audio.volume = 0.3;
  
  audio.play().catch(function(error) {
    console.log('Audio playback prevented:', error);
  });
}

/**
 * Handle Touch Start
 */
function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

/**
 * Handle Touch End
 */
function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}

/**
 * Handle Swipe Gesture
 */
function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next page
      goToNextPage();
    } else {
      // Swipe right - previous page
      goToPrevPage();
    }
  }
}

/**
 * Handle Keyboard Navigation
 */
function handleKeyboard(e) {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    goToPrevPage();
  } else if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    goToNextPage();
  }
}

/**
 * Copy to Clipboard Functionality
 */
function initCopyToClipboard() {
  const contactValue = document.getElementById('contactNumber');
  
  if (contactValue) {
    contactValue.addEventListener('click', function(e) {
      e.stopPropagation();
      const text = this.textContent;
      
      if (!text || text === 'Contact Not Available') return;
      
      navigator.clipboard.writeText(text).then(function() {
        const originalText = contactValue.textContent;
        contactValue.textContent = 'Copied!';
        contactValue.style.color = '#2e7d32';
        
        setTimeout(function() {
          contactValue.textContent = originalText;
          contactValue.style.color = '';
        }, 1500);
      }).catch(function(err) {
        console.error('Failed to copy:', err);
      });
    });
  }
}

// Expose utility functions globally
window.ShingyuInvitation = {
  goToPage: function(pageNum) {
    while (currentPage < pageNum && currentPage < totalPages) {
      goToNextPage();
    }
    while (currentPage > pageNum && currentPage > 0) {
      goToPrevPage();
    }
  },
  reloadContent: loadContent
};
