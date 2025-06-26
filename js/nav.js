document.addEventListener('DOMContentLoaded', function() {
    const topNavbar = document.querySelector('.top-navbar');
    const mainNav = document.getElementById('main-nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // If we're scrolling down and past a threshold (e.g., 50px)
      if (scrollTop > 50 && scrollTop > lastScrollTop) {
        topNavbar.classList.add('hidden');
        mainNav.classList.add('at-top');
      } 
      // If we're scrolling back to the top
      else if (scrollTop <= 50) {
        topNavbar.classList.remove('hidden');
        mainNav.classList.remove('at-top');
      }
      
      lastScrollTop = scrollTop;
    });
  });