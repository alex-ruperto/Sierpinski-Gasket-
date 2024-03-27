// Import modules
import { initShaderProgram } from './shader.js';
import { generateSierpinskiPoints } from './gasket.js';
import { initWebGL } from './webgl-setup.js';

const canvas = document.getElementById("sierpinski-canvas");
const gl = initWebGL(canvas);
const numPoints = 100000; // number of points in the sierpinski gasket
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
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // white color
    }

`;
let bufferId = generateSierpinskiPoints(gl, numPoints);

// shader program where all the lighting for vertices are made.
const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

gl.useProgram(shaderProgram);

let position = gl.getAttribLocation(shaderProgram, 'aPosition');
gl.enableVertexAttribArray(position)
gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
gl.drawArrays(gl.POINTS, 0, numPoints)