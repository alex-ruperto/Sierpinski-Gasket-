// Import modules
import { initShaderProgram } from './shader.js';
import { generateSierpinskiPoints } from './gasket.js';
import { initWebGL } from './webgl-setup.js';
import { ZoomController } from './zoom-controller.js';

const canvas = document.getElementById("sierpinski-canvas");
export const gl = initWebGL(canvas);
const numPoints = 300000
let zoomController = new ZoomController(gl, canvas, regenerateFractal);

export function regenerateFractal() {
    let zoomLevel = zoomController.getZoomLevel(); 
    let center = zoomController.getCenter();
    if (bufferId) {
        gl.deleteBuffer(bufferId); // clean up previous buffer
    }

    bufferId = generateSierpinskiPoints(gl, numPoints, zoomLevel, center.x, center.y);
    render();
}

function render() {
    // calculate the aspect ratio of the canvas
    const aspectRatio = canvas.clientWidth / canvas.clientHeight;

    // set aspect ratio uniform to the shader
    gl.uniform1f(uAspectRatioLoc, aspectRatio);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.POINTS, 0, numPoints);
}

let bufferId;

zoomController.setupMouseHandlers(canvas);

// GLSL (OpenGL Shading Language) program for vertex shaders
const vsSource = `
    attribute vec2 aPosition;
    uniform float uAspectRatio; // uniform var for aspect ratio

    void main() {
        // apply aspect ratio correction to vertex positions
        vec2 position = aPosition;

        if (uAspectRatio > 1.0) {
            position.x = position.x / uAspectRatio;
        } else {
            position.y = position.y * uAspectRatio;
        }
        gl_Position = vec4(position, 0.0, 1.0);
        gl_PointSize = 1.0;
    }
`;

// GLSL (OpenGL Shading Language) fragment shader program
const fsSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // black color
    }
`;

// shader program where all the lighting for vertices are made.
const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

// ask gl for location of the uniform variable uAspectRatio from shaderProgram to set to new value for the aspect ratio of canvas
const uAspectRatioLoc = gl.getUniformLocation(shaderProgram, 'uAspectRatio'); 

gl.useProgram(shaderProgram);

let position = gl.getAttribLocation(shaderProgram, 'aPosition');
gl.enableVertexAttribArray(position);

regenerateFractal();
