let gameContainer = document.getElementById('game-container');

function clearGame() {
    gameContainer.innerHTML = ''; // Clear previous game state
}

// Function to start the microgravity game
function startMicrogravityGame() {
    clearGame();
    const microgravityScript = document.createElement('script');
    microgravityScript.src = 'games/microgravity.js';
    gameContainer.appendChild(microgravityScript);
}

// Function to start the click game
function startClickGame() {
    clearGame();
    const clickGameScript = document.createElement('script');
    clickGameScript.src = 'games/click_game.js';
    gameContainer.appendChild(clickGameScript);
}

// Function to start the falling blocks game
function startFallingBlocksGame() {
    clearGame();
    const fallingBlocksScript = document.createElement('script');
    fallingBlocksScript.src = 'games/falling_blocks.js';
    gameContainer.appendChild(fallingBlocksScript);
}

// Function to start the memory game
function startMemoryGame() {
    clearGame();
    const memoryGameScript = document.createElement('script');
    memoryGameScript.src = 'games/memory_game.js';
    gameContainer.appendChild(memoryGameScript);
}

// Function to start the maze game
function startMazeGame() {
    clearGame();
    const mazeGameScript = document.createElement('script');
    mazeGameScript.src = 'games/maze_game.js';
    gameContainer.appendChild(mazeGameScript);
}
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Load sounds
const backgroundSound = new Audio('assets/background.mp3');
const collectSound = new Audio('assets/collect.mp3');

// Astronaut
const astronautImg = new Image();
astronautImg.src = 'assets/astronaut.png';
const astronaut = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    speed: 5
};

// Satellites
const satelliteImg = new Image();
satelliteImg.src = 'assets/satellite.png';
let satellites = [];
const satelliteCount = 10;

// Initialize satellites
function initSatellites() {
    for (let i = 0; i < satelliteCount; i++) {
        satellites.push({
            x: Math.random() * (canvas.width - 50),
            y: Math.random() * (canvas.height - 200),
            width: 30,
            height: 30,
            collected: false,
            dx: (Math.random() * 2 - 1) * 2,
            dy: (Math.random() * 2 - 1) * 2
        });
    }
}

// Handle keyboard input
const keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw astronaut
    ctx.drawImage(astronautImg, astronaut.x, astronaut.y, astronaut.width, astronaut.height);

    // Draw and move satellites
    satellites.forEach(satellite => {
        if (!satellite.collected) {
            ctx.drawImage(satelliteImg, satellite.x, satellite.y, satellite.width, satellite.height);
            satellite.x += satellite.dx;
            satellite.y += satellite.dy;

            // Check boundaries and reverse direction if needed
            if (satellite.x < 0 || satellite.x > canvas.width - satellite.width) {
                satellite.dx = -satellite.dx;
            }
            if (satellite.y < 0 || satellite.y > canvas.height - satellite.height) {
                satellite.dy = -satellite.dy;
            }
        }
    });

    // Move astronaut
    if (keys['ArrowLeft'] && astronaut.x > 0) {
        astronaut.x -= astronaut.speed;
    }
    if (keys['ArrowRight'] && astronaut.x < canvas.width - astronaut.width) {
        astronaut.x += astronaut.speed;
    }
    if (keys['ArrowUp'] && astronaut.y > 0) {
        astronaut.y -= astronaut.speed;
    }
    if (keys['ArrowDown'] && astronaut.y < canvas.height - astronaut.height) {
        astronaut.y += astronaut.speed;
    }

    // Check for collisions
    satellites.forEach(satellite => {
        if (!satellite.collected && 
            astronaut.x < satellite.x + satellite.width && 
            astronaut.x + astronaut.width > satellite.x &&
            astronaut.y < satellite.y + satellite.height && 
            astronaut.y + astronaut.height > satellite.y) {
            satellite.collected = true;
            collectSound.play();
        }
    });

    // Check if all satellites collected
    if (satellites.every(s => s.collected)) {
        alert('All satellites collected! Well done!');
        resetGame();
    }

    requestAnimationFrame(gameLoop);
}

// Reset game
function resetGame() {
    satellites.forEach(s => s.collected = false);
    initSatellites();
}

// Start game
function startGame() {
    initSatellites();
    backgroundSound.loop = true;
    backgroundSound.play();
    document.getElementById('menu').style.display = 'none'; // Hide menu
    canvas.style.display = 'block'; // Show canvas
    gameLoop();
}

// Function placeholders for other games
function openSpaceInvaders() {
    // Logic to open space invaders game
    alert('Space Invaders Game not implemented yet.');
}

function openPlanetExplorer() {
    // Logic to open planet explorer game
    alert('Planet Explorer Game not implemented yet.');
}

function openMicrogravity() {
    // Logic to open microgravity game
    alert('Microgravity Game not implemented yet.');
}
