// Import modules
import { initShaderProgram } from './shader.js';
import { generateSierpinskiPoints } from './gasket.js';
import { initWebGL } from './webgl-setup.js';
import { ZoomController } from './zoom-controller.js';

const canvas = document.getElementById("sierpinski-canvas");
const gl = initWebGL(canvas);
const numPoints = 50000
let zoomController = new ZoomController(gl, canvas, regenerateFractal);

function regenerateFractal() {
    let zoomLevel = zoomController.getZoomLevel(); 
    let center = zoomController.getCenter();
    if (bufferId) {
        gl.deleteBuffer(bufferId); // clean up previous buffer
    }

    bufferId = generateSierpinskiPoints(gl, numPoints, zoomLevel, center.x, center.y);
    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.POINTS, 0, numPoints);
}

let bufferId;

zoomController.initialize(canvas);

// program for vertex shaders
const vsSource = `
    attribute vec2 aPosition;
    void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
        gl_PointSize = 1.0;
    }
`;

// fragment shader program
const fsSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // black color
    }
`;

// shader program where all the lighting for vertices are made.
const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

gl.useProgram(shaderProgram);

let position = gl.getAttribLocation(shaderProgram, 'aPosition');
gl.enableVertexAttribArray(position);

regenerateFractal();