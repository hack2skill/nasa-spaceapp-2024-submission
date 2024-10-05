// microgravity.js
const microgravityCanvas = document.createElement('canvas');
const mgCtx = microgravityCanvas.getContext('2d');

microgravityCanvas.width = 800;
microgravityCanvas.height = 600;
document.body.appendChild(microgravityCanvas);
microgravityCanvas.style.display = 'none';

const gravityImg = new Image();
gravityImg.src = 'assets/spaceship.png';

let gravityObj = {
    x: 400,
    y: 300,
    width: 50,
    height: 50,
    speedX: 0,
    speedY: 0,
    gravity: 0.2,
    friction: 0.98
};

function microgravityGameLoop() {
    mgCtx.clearRect(0, 0, microgravityCanvas.width, microgravityCanvas.height);
    
    gravityObj.speedY += gravityObj.gravity; // Apply gravity
    gravityObj.y += gravityObj.speedY;
    gravityObj.x += gravityObj.speedX;

    // Apply friction
    gravityObj.speedX *= gravityObj.friction;

    // Draw the spaceship
    mgCtx.drawImage(gravityImg, gravityObj.x, gravityObj.y, gravityObj.width, gravityObj.height);

    // Check for boundaries
    if (gravityObj.y > microgravityCanvas.height) {
        gravityObj.y = microgravityCanvas.height - gravityObj.height;
        gravityObj.speedY *= -0.7; // Bounce effect
    }

    requestAnimationFrame(microgravityGameLoop);
}

// Start Microgravity Game
function openMicrogravity() {
    document.getElementById('menu').style.display = 'none'; // Hide menu
    microgravityCanvas.style.display = 'block'; // Show microgravity canvas
    gravityObj = { x: 400, y: 300, width: 50, height: 50, speedX: 0, speedY: 0, gravity: 0.2, friction: 0.98 }; // Reset object
    microgravityGameLoop();
}

// Control with arrow keys
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            gravityObj.speedX = -5;
            break;
        case 'ArrowRight':
            gravityObj.speedX = 5;
            break;
    }
});
