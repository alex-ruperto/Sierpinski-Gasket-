export class ZoomController {
    constructor(gl, regenerateFractalCallback){
        this.gl = gl;
        this.regenerateFractal = regenerateFractalCallback;
        this.zoomLevel = 1; //initial zoom level.
    }

    initialize(canvas) {
        canvas.addEventListener('wheel', (event) => {
            event.preventDefault();
            this.zoomLevel += Math.sign(event.deltaY * -0.1);
            this.zoomLevel = Math.max(1, this.zoomLevel);
            this.regenerateFractal();
        });
    }

    

    getZoomLevel(){
        return this.zoomLevel
    }
}