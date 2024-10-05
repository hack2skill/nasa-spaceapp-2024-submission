// planetExplorer.js
const planetExplorerCanvas = document.createElement('canvas');
const peCtx = planetExplorerCanvas.getContext('2d');

planetExplorerCanvas.width = 800;
planetExplorerCanvas.height = 600;
document.body.appendChild(planetExplorerCanvas);
planetExplorerCanvas.style.display = 'none';

const planetImg = new Image();
planetImg.src = 'assets/planet.png';

const explorerImg = new Image();
explorerImg.src = 'assets/astronaut.png'; // Astronaut image for the explorer

let explorer = {
    x: 400,
    y: 300,
    width: 50,
    height: 50,
    speed: 3
};

let items = [];
let score = 0;

// Generate random items on the planet
function generateItems() {
    for (let i = 0; i < 5; i++) {
        items.push({
            x: Math.random() * (planetExplorerCanvas.width - 30),
            y: Math.random() * (planetExplorerCanvas.height - 30),
            width: 30,
            height: 30,
            collected: false
        });
    }
}

// Start Planet Explorer Game
function openPlanetExplorer() {
    document.getElementById('menu').style.display = 'none'; // Hide menu
    planetExplorerCanvas.style.display = 'block'; // Show canvas
    generateItems();
    planetExplorerGameLoop();
}

// Game loop for Planet Explorer
function planetExplorerGameLoop() {
    peCtx.clearRect(0, 0, planetExplorerCanvas.width, planetExplorerCanvas.height);
    
    // Draw the planet
    peCtx.drawImage(planetImg, 0, 0, planetExplorerCanvas.width, planetExplorerCanvas.height);

    // Draw the explorer
    peCtx.drawImage(explorerImg, explorer.x, explorer.y, explorer.width, explorer.height);

    // Draw items
    items.forEach(item => {
        if (!item.collected) {
            peCtx.fillStyle = 'yellow';
            peCtx.fillRect(item.x, item.y, item.width, item.height);
        }
    });

    // Check for item collection
    items.forEach(item => {
        if (!item.collected &&
            explorer.x < item.x + item.width &&
            explorer.x + explorer.width > item.x &&
            explorer.y < item.y + item.height &&
            explorer.y + explorer.height > item.y) {
            item.collected = true; // Mark item as collected
            score += 10; // Increase score
        }
    });

    // Display score
    peCtx.fillStyle = 'white';
    peCtx.fillText('Score: ' + score, 10, 30);

    requestAnimationFrame(planetExplorerGameLoop);
}

// Control the explorer
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            if (explorer.y > 0) explorer.y -= explorer.speed;
            break;
        case 'ArrowDown':
            if (explorer.y < planetExplorerCanvas.height - explorer.height) explorer.y += explorer.speed;
            break;
        case 'ArrowLeft':
            if (explorer.x > 0) explorer.x -= explorer.speed;
            break;
        case 'ArrowRight':
            if (explorer.x < planetExplorerCanvas.width - explorer.width) explorer.x += explorer.speed;
            break;
    }
});
