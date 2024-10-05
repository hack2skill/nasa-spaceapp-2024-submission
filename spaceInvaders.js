// spaceInvaders.js
const spaceInvadersCanvas = document.createElement('canvas');
const siCtx = spaceInvadersCanvas.getContext('2d');

spaceInvadersCanvas.width = 800;
spaceInvadersCanvas.height = 600;
document.body.appendChild(spaceInvadersCanvas);
spaceInvadersCanvas.style.display = 'none';

let player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    speed: 5,
    health: 3 // Player health
};

let bullets = [];
let enemies = [];
let score = 0;
const enemyRows = 5;
const enemyCols = 10;

// Initialize enemies
function initEnemies() {
    for (let i = 0; i < enemyRows; i++) {
        for (let j = 0; j < enemyCols; j++) {
            enemies.push({
                x: j * 70 + 50,
                y: i * 50 + 30,
                width: 50,
                height: 50,
                alive: true
            });
        }
    }
}

// Start Space Invaders Game
function openSpaceInvaders() {
    document.getElementById('menu').style.display = 'none'; // Hide menu
    spaceInvadersCanvas.style.display = 'block'; // Show canvas
    initEnemies();
    spaceInvadersGameLoop();
}

// Game loop for Space Invaders
function spaceInvadersGameLoop() {
    siCtx.clearRect(0, 0, spaceInvadersCanvas.width, spaceInvadersCanvas.height);
    
    // Draw player
    siCtx.fillStyle = 'white';
    siCtx.fillRect(player.x, player.y, player.width, player.height);

    // Draw health
    siCtx.fillStyle = 'red';
    for (let i = 0; i < player.health; i++) {
        siCtx.fillRect(10 + i * 20, 10, 15, 15); // Health bars
    }

    // Draw bullets
    bullets.forEach(bullet => {
        bullet.y -= 5;
        siCtx.fillStyle = 'yellow';
        siCtx.fillRect(bullet.x, bullet.y, 5, 20);
    });

    // Filter out bullets that are off-screen
    bullets = bullets.filter(b => b.y > 0);

    // Draw enemies
    enemies.forEach(enemy => {
        if (enemy.alive) {
            siCtx.fillStyle = 'red';
            siCtx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        }
    });

    // Check for collisions
    bullets.forEach(bullet => {
        enemies.forEach(enemy => {
            if (enemy.alive &&
                bullet.x < enemy.x + enemy.width &&
                bullet.x + 5 > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + 20 > enemy.y) {
                enemy.alive = false;
                bullet.y = -20; // Move bullet off-screen
                score += 10; // Increase score
            }
        });
    });

    // Player movement
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] && player.x < spaceInvadersCanvas.width - player.width) {
        player.x += player.speed;
    }

    // Enemy movement
    enemies.forEach(enemy => {
        if (enemy.alive) {
            enemy.y += 0.5; // Move enemies down
        }
    });

    // Check for enemy collisions with player
    enemies.forEach(enemy => {
        if (enemy.alive && enemy.y + enemy.height >= player.y) {
            player.health -= 1; // Decrease player health
            enemy.alive = false; // Remove enemy
            if (player.health <= 0) {
                alert('Game Over! Your score: ' + score);
                document.location.reload(); // Reload game
            }
        }
    });

    // Display score
    siCtx.fillStyle = 'white';
    siCtx.fillText('Score: ' + score, 10, 30);

    requestAnimationFrame(spaceInvadersGameLoop);
}

// Shooting bullets
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        bullets.push({ x: player.x + player.width / 2 - 2.5, y: player.y });
    }
});

// Track key presses
const keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});
