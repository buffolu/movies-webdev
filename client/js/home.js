// Particle effect generation when mouse moves
document.addEventListener('mousemove', function (event) {
    /*
    js only to handle mouse particles.
    was not made by me.
    */
    
    let particlesContainer = document.querySelector('.particle-container');
    
    // Create a new particle element
    let particle = document.createElement('div');
    particle.classList.add('particle');
  
    // Set random size for the particle
    const particleSize = Math.random() * 5 + 5; // Random size between 5px and 10px
    particle.style.width = `${particleSize}px`;
    particle.style.height = `${particleSize}px`;
  
    // Position the particle at the mouse location (centered)
    particle.style.left = `${event.pageX - particleSize / 2}px`;  // Center the particle on the cursor
    particle.style.top = `${event.pageY - particleSize / 2}px`;  // Center the particle on the cursor
  
    // Add random colors to particles for variation
    particle.style.backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
  
    // Set custom properties to move particles outward
    const maxDistance = 150; // Maximum distance particles will travel
    const angle = Math.random() * 2 * Math.PI; // Random angle for direction
  
    const xOffset = Math.cos(angle) * maxDistance;
    const yOffset = Math.sin(angle) * maxDistance;
  
    // Apply the custom properties
    particle.style.setProperty('--x', `${xOffset}px`);
    particle.style.setProperty('--y', `${yOffset}px`);
  
    // Append the particle to the container
    particlesContainer.appendChild(particle);
  
    // Remove particle after animation duration (1 second)
    setTimeout(() => {
      particlesContainer.removeChild(particle);
    }, 1000); // Duration of the particle animation (1s)
  });
  