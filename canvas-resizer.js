// note: this requires main.js to work first.

import { gl, regenerateFractal } from './main.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('sierpinski-canvas');
    function resizeCanvas() {
        const maxHeight = window.innerHeight;
        const maxWidth = window.innerWidth;
        const aspectRatio = 4 / 3;

        let newWidth = maxWidth;
        let newHeight = newWidth / aspectRatio;

        if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = newHeight * aspectRatio;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        gl.viewport(0, 0, canvas.width, canvas.height);

        regenerateFractal();
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
});