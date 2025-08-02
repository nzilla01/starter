
  setTimeout(() => {
    const flash = document.getElementById('flash-message');
    if (flash) {
      flash.style.transition = "opacity 1s ease-out";
      flash.style.opacity = "0";
      setTimeout(() => flash.remove(), 1000); 
    }
  }, 20000);

