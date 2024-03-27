export class ZoomController {
    constructor(gl, canvas, regenerateFractalCallback){
        this.gl = gl;
        this.canvas = canvas;
        this.regenerateFractal = regenerateFractalCallback;
        this.zoomLevel = 1; // initial zoom level.
        this.centerX = 0; // initial center X
        this.centerY = 0; // initial center Y
        this.setupMouseHandlers();
    }

    initialize(canvas) {
        canvas.addEventListener('wheel', (event) => {
            event.preventDefault();
            const zoomDirection = Math.sign(event.deltaY) * -1; // invert deltaY to get natural zoom direction
            this.zoomLevel = adjustZoomLevel(zoomLevel, zoomDirection);
            this.zoomLevel = Math.max(1, this.zoomLevel);
            this.regenerateFractal();
        });
    }

    setupMouseHandlers(){
        this.canvas.addEventListener('mousemove', (e) => {
            // update mouse position based on e.clientX, e.clientY
        });

        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY= e.clientY - rect.top;
            // update zoom level and center based on wheel event and moues position
            this.adjustZoom(e.deltaY, mouseX, mouseY);
            this.regenerateFractal();
        });
    }



    adjustZoom(deltaY, mouseX, mouseY){
        // adjust as needed
        const zoomSensitivity = 0.0005;
        const zoomFactor = deltaY * zoomSensitivity;

        // calculate zoom level
        this.zoomLevel -= zoomFactor;
        this.zoomLevel = Math.max(this.zoomLevel, 0.1); // prevent zoom level from going below 0.1

        // Convert screen coordinates (mouseX, mouseY) to fractal coordinates
        // This conversion depends on your current view and should be adjusted according to your coordinate system
        // For simplicity, assuming the canvas directly maps to a [-1, 1] range in both axes
        const fractalX = (mouseX / this.canvas.width) * 2 - 1;
        const fractalY = (mouseY / this.canvas.height) * -2 + 1; // Inverting Y to match typical mathematical coordinates

        // Update the center based on zoom direction - this simplistic approach may need refinement
        this.centerX += fractalX * zoomFactor;
        this.centerY += fractalY * zoomFactor;
    }

    getZoomLevel(){
        return this.zoomLevel;
    }

    getCenter() {
        return { x: this.centerX, y: this.centerY};
    }
}