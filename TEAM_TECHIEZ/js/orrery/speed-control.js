// speed-control.js

import { TWEEN } from 'tween.js';

class SpeedControl {
    constructor() {
        this.currentSpeed = 1;
        this.minSpeed = 0.1;
        this.maxSpeed = 10;
        this.speedStep = 0.1;
    }

    increaseSpeed() {
        if (this.currentSpeed < this.maxSpeed) {
            this.currentSpeed = Math.min(this.currentSpeed + this.speedStep, this.maxSpeed);
            this.updateSpeedDisplay();
        }
    }

    decreaseSpeed() {
        if (this.currentSpeed > this.minSpeed) {
            this.currentSpeed = Math.max(this.currentSpeed - this.speedStep, this.minSpeed);
            this.updateSpeedDisplay();
        }
    }

    setSpeed(speed) {
        this.currentSpeed = Math.max(this.minSpeed, Math.min(speed, this.maxSpeed));
        this.updateSpeedDisplay();
    }

    updateSpeedDisplay() {
        document.getElementById('speedDisplay').textContent = `Current Speed: ${this.currentSpeed.toFixed(1)}x`;
    }

    animateSpeedChange(targetSpeed, duration = 1000) {
        new TWEEN.Tween(this)
            .to({ currentSpeed: targetSpeed }, duration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(() => this.updateSpeedDisplay())
            .start();
    }
}

export const speedControl = new SpeedControl();

// Event listeners
document.getElementById('speedUp').addEventListener('click', () => speedControl.increaseSpeed());
document.getElementById('slowDown').addEventListener('click', () => speedControl.decreaseSpeed());
document.getElementById('resetSpeed').addEventListener('click', () => speedControl.setSpeed(1));