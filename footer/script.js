// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all links that have hash in href
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Add click event listener to each link
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        // Only prevent default if the href is not just "#"
        if(this.getAttribute('href') !== '#') {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if(targetElement) {
            // Smooth scroll to the target element
            window.scrollTo({
              top: targetElement.offsetTop - 70, // Offset for header height
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Modal functionality
    const calculatorsLink = document.getElementById('calculators-link');
    const glossaryLink = document.getElementById('glossary-link');
    const calculatorsModal = document.getElementById('calculators-modal');
    const glossaryModal = document.getElementById('glossary-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    
    // Open calculators modal
    calculatorsLink.addEventListener('click', function(e) {
      e.preventDefault();
      calculatorsModal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
    
    // Open glossary modal
    glossaryLink.addEventListener('click', function(e) {
      e.preventDefault();
      glossaryModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
    
    // Close modals when clicking close button
    closeButtons.forEach(button => {
      button.addEventListener('click', function() {
        calculatorsModal.style.display = 'none';
        glossaryModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
      });
    });
    
    // Close modals when clicking outside of modal content
    window.addEventListener('click', function(e) {
      if (e.target === calculatorsModal) {
        calculatorsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
      if (e.target === glossaryModal) {
        glossaryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
    
    // Add animation to content cards on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.1 });
    
    // Observe all content cards
    document.querySelectorAll('.content-card').forEach(card => {
      observer.observe(card);
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add fade-in class for animation
    document.head.insertAdjacentHTML('beforeend', `
      <style>
        .fade-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      </style>
    `);
  });